import { Handler } from "@netlify/functions";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.VITE_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export const handler: Handler = async (event) => {
  try {
    const body = JSON.parse(event.body || "{}");

    const { content, transferAmount, referenceCode } = body;

    if (!content) {
      return {
        statusCode: 400,
        body: "Missing payment content",
      };
    }

    // 🔥 Extract PN code
    const match = content.match(/PN\d+/);
    const paymentCode = match ? match[0] : null;

    if (!paymentCode) {
      return {
        statusCode: 400,
        body: "Payment code not found in content",
      };
    }

    // 🔥 Find order
    const { data: order } = await supabase
      .from("orders")
      .select("*")
      .eq("payment_code", paymentCode)
      .single();

    if (!order) {
      return {
        statusCode: 404,
        body: "Order not found",
      };
    }

    // 🔥 Optional: check amount match
    if (Number(order.final_amount) !== Number(transferAmount)) {
      return {
        statusCode: 400,
        body: "Amount mismatch",
      };
    }

    // 🔥 Update order
    await supabase
      .from("orders")
      .update({
        status: "paid",
        sepay_txn_id: referenceCode,
      })
      .eq("id", order.id);

    return {
      statusCode: 200,
      body: "Payment confirmed",
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: "Server error",
    };
  }
};