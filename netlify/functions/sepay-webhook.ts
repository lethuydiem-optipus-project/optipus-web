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
          name,
          download_url
        )
      `)
      .eq("order_id", order.id);

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
      })
      .eq("id", order.id)
      .select();

    console.log("UPDATE DATA:", updateData);
    console.log("UPDATE ERROR:", updateError);

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
        name: item.products.name,
        downloadUrl: item.products.download_url,
      })),
    });

    const html = emailLayout({
      title: "Thanh toán thành công 🎉",
      content: emailContent,
    });

    // 🔥 Send email
    /*await sendEmail({
      to: order.email,
      subject: `Tải template của bạn - ${order.order_code}`,
      html,
    });*/

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