import { Handler } from "@netlify/functions";
import { createClient } from "@supabase/supabase-js";

import { sendEmail } from "./services/emailService";
import { emailLayout } from "./email-templates/layout";
import { paymentSuccessContent } from "./email-templates/paymentSuccess";

const supabase = createClient(
  process.env.VITE_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export const handler: Handler = async (event) => {
  console.log("WEBHOOK PROCESS STARTED");

  try {
    const body = JSON.parse(event.body || "{}");
    const { content, transferAmount, referenceCode } = body;

    if (!content) {
      return { statusCode: 400, body: "Missing payment content" };
    }

    // 🔥 1. Extract payment code (PNxxxx)
    const match = content.match(/PN\d+/);
    const paymentCode = match ? match[0] : null;

    if (!paymentCode) {
      return { statusCode: 400, body: "Payment code not found" };
    }

    // 🔥 2. Find order
    const { data: order, error: orderError } = await supabase
      .from("orders")
      .select("*")
      .eq("payment_code", paymentCode)
      .single();

    if (orderError || !order) {
      return { statusCode: 404, body: "Order not found" };
    }

    // 🔥 3. Prevent duplicate processing (CHỈ chặn khi đã trả tiền VÀ đã gửi mail)
    if (order.status === "paid" && order.email_sent) {
      return { statusCode: 200, body: "Already fully processed" };
    }

    // 🔥 4. Check amount match (bỏ qua nếu đơn free)
    if (order.final_amount > 0 && Number(order.final_amount) !== Number(transferAmount)) {
      console.log("ERROR: Amount mismatch", order.final_amount, transferAmount);
      return { statusCode: 400, body: "Amount mismatch" };
    }

    // 🔥 5. Fetch order items + join products
    const { data: orderItems, error: itemsError } = await supabase
      .from("order_items")
      .select(`
        *,
        products (
          title,
          download_url
        )
      `)
      .eq("order_id", order.id);

    if (itemsError || !orderItems || orderItems.length === 0) {
      return { statusCode: 400, body: "Order items not found" };
    }

    // 🔥 6. Update order to paid (Chỉ update nếu chưa paid)
    if (order.status !== "paid") {
      const { error: updateError } = await supabase
        .from("orders")
        .update({
          status: "paid",
          sepay_txn_id: referenceCode || null,
          paid_at: new Date().toISOString(),
        })
        .eq("id", order.id);

      if (updateError) {
        throw new Error("Failed to update order status");
      }
    }

    // 🔥 7. Send Email (Chỉ gửi nếu chưa gửi)
    if (!order.email_sent) {
      // Build email content với Optional Chaining an toàn
      const emailContent = paymentSuccessContent({
        orderCode: order.payment_code,
        products: orderItems.map((item: any) => ({
          name: item.products?.title || "Sản phẩm không xác định",
          downloadUrl: item.products?.download_url || "#",
        })),
      });

      const html = emailLayout({
        title: "Thanh toán thành công 🎉",
        content: emailContent,
      });

      console.log("SENDING EMAIL TO:", order.email);
      await sendEmail({
        to: order.email,
        subject: `OPTIPUS | Xác nhận thanh toán đơn hàng - ${order.payment_code} thành công`,
        html,
      });

      // Update email_sent = true sau khi gửi thành công
      await supabase
        .from("orders")
        .update({ email_sent: true })
        .eq("id", order.id);

      console.log("EMAIL SENT AND FLAG UPDATED");
    }

    return {
      statusCode: 200,
      body: "Payment confirmed and email sent",
    };
  } catch (error: any) {
    console.error("Webhook error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Server error", error: error.message }),
    };
  }
};