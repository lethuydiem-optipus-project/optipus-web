import { Handler } from "@netlify/functions";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.VITE_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export const handler: Handler = async (event) => {
  try {
    const body = JSON.parse(event.body || "{}");

    const { content, amount, transaction_id } = body;

    if (!content) {
      return {
        statusCode: 400,
        body: "Missing payment content",
      };
    }

    const { data: order } = await supabase
      .from("orders")
      .select("*")
      .eq("payment_code", content)
      .single();

    if (!order) {
      return {
        statusCode: 404,
        body: "Order not found",
      };
    }

    await supabase
      .from("orders")
      .update({
        status: "paid",
        sepay_txn_id: transaction_id,
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