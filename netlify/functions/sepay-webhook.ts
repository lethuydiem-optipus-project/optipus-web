import { Handler } from "@netlify/functions";
import { createClient } from "@supabase/supabase-js";

import { sendEmail } from "./services/emailService";
import { emailLayout } from "./email-templates/layout";
import { paymentSuccessContent } from "./email-templates/paymentSuccess";

const supabase = createClient(
  process.env.VITE_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);
console.log(
  "SERVICE ROLE LENGTH:",
  process.env.SUPABASE_SERVICE_ROLE_KEY?.length
);

console.log(
  "SERVICE ROLE START:",
  process.env.SUPABASE_SERVICE_ROLE_KEY?.slice(0, 20)
);
export const handler: Handler = async (event) => {
  console.log("WEBHOOK VERSION 2 - SMTP ENABLED");
  console.log("RAW BODY:", event.body);
  try {
    const body = JSON.parse(event.body || "{}");
    console.log("PARSED BODY:", body);

    const { content, transferAmount, referenceCode } = body;

    if (!content) {
      console.log("ERROR: Missing content");
      return {
        statusCode: 400,
        body: "Missing payment content",
      };
    }

    // 🔥 Extract payment code (PNxxxx)
    const match = content.match(/PN\d+/);
    const paymentCode = match ? match[0] : null;

    if (!paymentCode) {
      console.log("ERROR: Payment code not found");
      return {
        statusCode: 400,
        body: "Payment code not found",
      };
    }

    // 🔥 Find order
    const { data: order, error: orderError } = await supabase
      .from("orders")
      .select("*")
      .eq("payment_code", paymentCode)
      .single();

    if (orderError || !order) {
      return {
        statusCode: 404,
        body: "Order not found",
      };
    }

    // 🔥 Check amount match
    if (Number(order.final_amount) !== Number(transferAmount)) {
    console.log("ERROR: Amount mismatch",
        order.final_amount,
        transferAmount
      );
      return {
        statusCode: 400,
        body: "Amount mismatch",
      };
    }

    // 🔥 Prevent duplicate processing
    if (order.status === "paid") {
      return {
        statusCode: 200,
        body: "Already processed",
      };
    }

    // 🔥 Fetch order items + join products
    const { data: orderItems, error: itemsError } = await supabase
      .from("order_items")
      .select(`
        *,
        products (
          title,
          download_url
        )s
      `)
      .eq("order_id", order.id);

console.log("ORDER ITEMS:", orderItems);
console.log("ITEM ERROR:", itemsError);

    if (itemsError || !orderItems || orderItems.length === 0) {
      return {
        statusCode: 400,
        body: "Order items not found",
      };
    }

    // 🔥 Update order to paid
    const { data: updateData, error: updateError } = await supabase
      .from("orders")
      .update({
        status: "paid",
        sepay_txn_id: referenceCode,
        paid_at: new Date().toISOString(),
      })
      .eq("id", order.id)
      .select();
    
    if (order.email_sent) {
      console.log("EMAIL ALREADY SENT - SKIP");
      return {
        statusCode: 200,
        body: "Already processed",
      };
    }

    if (updateError) {
      console.log("ERROR: Failed to update order");
      return {
        statusCode: 500,
        body: "Failed to update order",
      };
    }

    // 🔥 Build email content
    const emailContent = paymentSuccessContent({
      orderCode: order.order_code,
      products: orderItems.map((item: any) => ({
        name: item.products.title,
        downloadUrl: item.products.download_url,
      })),
    });

    const html = emailLayout({
      title: "Thanh toán thành công 🎉",
      content: emailContent,
    });

    console.log("SENDING EMAIL TO:", order.email);
    // 🔥 Send email
    await sendEmail({
      to: order.email,
      subject: `Tải template của bạn - ${order.payment_code}`,
      html,
    });
    console.log("EMAIL SEND FUNCTION FINISHED");

    // 🔥 update email_sent = true
    await supabase
      .from("orders")
      .update({ email_sent: true })
      .eq("id", order.id);

    console.log("EMAIL_SENT FLAG UPDATED");    

    return {
      statusCode: 200,
      body: "Payment confirmed and email sent",
    };
  } catch (error) {
    console.error("Webhook error:", error);
    return {
      statusCode: 500,
      body: "Server error",
    };
  }
};
