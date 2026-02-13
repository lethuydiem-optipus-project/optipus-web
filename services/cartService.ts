import { supabase } from './supabase';

export const CartService = {
  /**
   * Lấy 1 cart item theo user + product
   */
  async getCartItem(userId: string, productId: string) {
    const { data, error } = await supabase
      .from('cart_items')
      .select('*')
      .eq('user_id', userId)
      .eq('product_id', productId)
      .maybeSingle();

    return { data, error };
  },

  /**
   * Update quantity cart item
   */
  async updateCartItem(cartItemId: string, quantity: number) {
    const { data, error } = await supabase
      .from('cart_items')
      .update({ quantity })
      .eq('id', cartItemId)
      .select()
      .single();

    return { data, error };
  },

  async getUserCart(userId: string) {
    const { data, error } = await supabase
      .from('cart_items')
      .select(`
        id,
        product_id,
        quantity,
        products (
          id,
          title,
          price,
          cover_image,
          tag
        )
      `)
      .eq('user_id', userId);

    return { data, error };
  },

  /**
   * Update quantity theo user + product
   */
  async updateCartQuantity(
    userId: string,
    productId: string,
    quantity: number
  ) {
    const { data, error } = await supabase
      .from('cart_items')
      .update({ quantity })
      .eq('user_id', userId)
      .eq('product_id', productId)
      .select()
      .single();

    return { data, error };
  },

  /**
   * Remove cart item
   */
  async removeCartItem(userId: string, productId: string) {
    const { error } = await supabase
      .from('cart_items')
      .delete()
      .eq('user_id', userId)
      .eq('product_id', productId);

    return { error };
  },
  
  /**
   * Insert cart item mới
   */
  async insertCartItem(userId: string, productId: string) {
    const { data, error } = await supabase
      .from('cart_items')
      .insert({
        user_id: userId,
        product_id: productId,
        quantity: 1,
      })
      .select()
      .single();

    return { data, error };
  },
};
