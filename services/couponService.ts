import { supabase } from './supabase'

type CartItem = {
  product_id: string
  price: number
  quantity: number
}

type ApplyCouponResult = {
  coupon_id: string
  discount_amount: number
  subtotal_eligible: number
  final_discount: number
}

export class CouponService {
  static async applyCoupon(
    couponCode: string,
    cartItems: CartItem[],
    userId: string
  ): Promise<ApplyCouponResult> {

    if (!cartItems.length) {
      throw new Error('Cart is empty')
    }

    /** 1️⃣ Lấy coupon */
    const { data: coupon, error } = await supabase
      .from('coupons')
      .select('*')
      .eq('code', couponCode)
      .eq('is_active', true)
      .single()

    if (error || !coupon) {
      throw new Error('COUPON_INVALID')
    }

    /** 2️⃣ Check coupon đã đạt max_uses chưa */
    if (
      coupon.max_uses &&
      coupon.used_count >= coupon.max_uses
    ) {
      throw new Error('COUPON_MAX_USED')
    }

    /** 3️⃣ Check user đã từng dùng chưa */
    const { data: existingOrder } = await supabase
      .from('orders')
      .select('id')
      .eq('user_id', userId)
      .eq('coupon_id', coupon.id)
      .limit(1)

    if (existingOrder && existingOrder.length > 0) {
      throw new Error('USER_ALREADY_USED')
    }

    /** 4️⃣ Xác định sản phẩm được áp dụng */
    let eligibleProductIds: string[] = []

    if (coupon.apply_scope === 'all') {
      eligibleProductIds = cartItems.map(i => i.product_id)
    }

    if (coupon.apply_scope === 'products') {
      const { data: couponProducts } = await supabase
        .from('coupon_products')
        .select('product_id')
        .eq('coupon_id', coupon.id)

      eligibleProductIds =
        couponProducts?.map(p => p.product_id) || []
    }

    /** 5️⃣ Tính subtotal eligible */
    const eligibleItems = cartItems.filter(item =>
      eligibleProductIds.includes(item.product_id)
    )

    const subtotalEligible = eligibleItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    )

    if (subtotalEligible <= 0) {
      throw new Error(
        'Coupon không áp dụng cho các sản phẩm trong giỏ'
      )
    }

    /** 6️⃣ Tính discount */
    let discount = 0

    if (coupon.discount_type === 'fixed') {
      discount = coupon.discount_value
    }

    if (coupon.discount_type === 'percent') {
      discount =
        (subtotalEligible * coupon.discount_value) / 100
    }

    /** 7️⃣ Clamp discount */
    discount = Math.min(discount, subtotalEligible)
    discount = Math.max(discount, 0)

    return {
      coupon_id: coupon.id,
      discount_amount: discount,
      subtotal_eligible: subtotalEligible,
      final_discount: discount
    }
  }
}
