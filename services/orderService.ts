import { supabase } from './supabase';

export const OrderService = {

  /* ===============================
     CREATE ORDER
  =============================== */
  async createOrder(userId: string, totalAmount: number, email: string) {
    const paymentCode = `PN${Date.now()}`;

    const { data, error } = await supabase
      .from('orders')
      .insert({
        user_id: userId,
        total_amount: totalAmount,
        final_amount: totalAmount,
        status: 'pending',
        payment_code: paymentCode,
        email: email,
      })
      .select()
      .single();

    if (data) {
      console.log("Payment code:", paymentCode);
    }

    return { data, error };
  },

  /* ===============================
     INSERT ORDER ITEMS
  =============================== */
  async insertOrderItems(
    orderId: string,
    items: {
      product_id: string;
      title_snapshot: string;
      price_snapshot: number;
      quantity: number;
    }[]
  ) {
    const { error } = await supabase
      .from('order_items')
      .insert(
        items.map(item => ({
          order_id: orderId,
          ...item,
        }))
      );

    return { error };
  },

  /* ===============================
     APPLY COUPON TO ORDER
  =============================== */
  async applyCouponToOrder(
    orderId: string,
    couponId: string,
    discountAmount: number,
    finalAmount: number
  ) {
    const { error } = await supabase
      .from('orders')
      .update({
        coupon_id: couponId,        // lưu UUID
        discount_amount: discountAmount,
        final_amount: finalAmount,
      })
      .eq('id', orderId);

    return { error };
  },

  /* ===============================
     INCREASE COUPON USED COUNT
     - enforce 1 user chỉ dùng 1 lần
     - auto disable khi đạt max_uses
  =============================== */
  async increaseCouponUsed(
    couponId: string,
    userId: string
  ) {
    const { error } = await supabase.rpc(
      'increment_coupon_used',
      {
        coupon_id_input: couponId,
        user_id_input: userId,
      }
    );

    if (error) {
      throw error;
    }

    return { error };
  },
};
