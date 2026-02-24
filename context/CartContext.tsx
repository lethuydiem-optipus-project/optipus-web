import React, {
  createContext,
  useContext,
  useState,
  useEffect,
} from 'react';
import { useAuth } from './AuthContext';
import { CartService } from '../services/cartService';
import { OrderService } from '../services/orderService';
import { supabase } from '../services/supabase';

/* =======================
   Types
======================= */

export interface CartItem {
  id: string; // product id (UUID)
  title: string;
  price: number;
  priceDisplay: string;
  image: string;
  category: string;
  quantity: number;
  selected: boolean;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (product: any) => Promise<void>;
  removeFromCart: (id: string) => Promise<void>;
  updateQuantity: (id: string, delta: number) => Promise<void>;
  toggleSelection: (id: string) => void;
  selectAll: (isSelected: boolean) => void;
  clearCart: () => void;
  cartCount: number;
  cartTotal: number;
  placeOrder: (coupon?: any, email?: string) => Promise<any>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

/* =======================
   Provider
======================= */

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { user } = useAuth();
  const [items, setItems] = useState<CartItem[]>([]);

  /* =======================
     LOAD CART
  ======================= */

  useEffect(() => {
    const loadCart = async () => {
      if (!user) {
        setItems([]);
        return;
      }

      const res = await CartService.getUserCart(user.id);
      if (res.error) {
        console.error('Load cart error:', res.error);
        return;
      }

      const mappedItems: CartItem[] = res.data.map((row: any) => {
        const product = row.products;

        const price =
          typeof product.price === 'number'
            ? product.price
            : parseFloat(String(product.price || '0'));

        return {
          id: product.id,
          title: product.title,
          price,
          priceDisplay: price.toLocaleString('vi-VN', {
            style: 'currency',
            currency: 'VND',
          }),
          image: product.cover_image,
          category: product.tag,
          quantity: row.quantity,
          selected: true,
        };
      });

      setItems(mappedItems);
    };

    loadCart();
  }, [user]);

  /* =======================
     ADD TO CART
  ======================= */

  const addToCart = async (product: any) => {
    if (!user) return;

    const result = await CartService.getCartItem(user.id, product.id);
    const existingItem = result.data;

    let finalQuantity = 1;

    if (existingItem) {
      const res = await CartService.updateCartItem(
        existingItem.id,
        existingItem.quantity + 1
      );
      if (res.error) return console.error(res.error);
      finalQuantity = res.data.quantity;
    } else {
      const res = await CartService.insertCartItem(user.id, product.id);
      if (res.error) return console.error(res.error);
      finalQuantity = res.data.quantity;
    }

    setItems(prev => {
      const otherItems = prev.filter(i => i.id !== product.id);

      const numericPrice =
        typeof product.price === 'number'
          ? product.price
          : parseFloat(String(product.price || '0').replace(/[^0-9.]/g, '')) || 0;

      return [
        ...otherItems,
        {
          id: product.id,
          title: product.title,
          price: numericPrice,
          priceDisplay: numericPrice.toLocaleString('vi-VN', {
            style: 'currency',
            currency: 'VND',
          }),
          image: product.image,
          category: product.category,
          quantity: finalQuantity,
          selected: true,
        },
      ];
    });
  };

  /* =======================
     UPDATE QUANTITY
  ======================= */

  const updateQuantity = async (productId: string, delta: number) => {
    if (!user) return;

    const item = items.find(i => i.id === productId);
    if (!item) return;

    const newQuantity = Math.max(1, item.quantity + delta);

    const res = await CartService.updateCartQuantity(
      user.id,
      productId,
      newQuantity
    );

    if (res.error) return console.error(res.error);

    setItems(prev =>
      prev.map(i =>
        i.id === productId ? { ...i, quantity: newQuantity } : i
      )
    );
  };

  /* =======================
     REMOVE ITEM
  ======================= */

  const removeFromCart = async (productId: string) => {
    if (!user) return;

    const res = await CartService.removeCartItem(user.id, productId);
    if (res.error) return console.error(res.error);

    setItems(prev => prev.filter(item => item.id !== productId));
  };

  /* =======================
     PLACE ORDER
  ======================= */

  const placeOrder = async (coupon?: any, email?: string) => {
    console.log("EMAIL RECEIVED IN placeOrder:", email);
    if (!user) throw new Error('Not authenticated');

    const selectedItems = items.filter(i => i.selected);
    if (selectedItems.length === 0) {
      throw new Error('No items selected');
    }

    const totalAmount = selectedItems.reduce(
      (sum, i) => sum + i.price * i.quantity,
      0
    );

    // 1) Create order
    const orderRes = await OrderService.createOrder(user.id, totalAmount, email );
    if (orderRes.error) throw orderRes.error;

    const orderId = orderRes.data.id;

    // 2) Insert order items
    const orderItemsPayload = selectedItems.map(item => ({
      product_id: item.id,
      title_snapshot: item.title,
      price_snapshot: item.price,
      quantity: item.quantity,
    }));

    const itemsRes = await OrderService.insertOrderItems(orderId, orderItemsPayload);
    if (itemsRes.error) throw itemsRes.error;

    // 3) Apply coupon (if exists)
    if (coupon) {
      const discountAmount = coupon.final_discount;
      const finalAmount = Math.max(0, totalAmount - discountAmount);

      // 🔥 2️⃣ Sau đó mới update order
      const applyRes = await OrderService.applyCouponToOrder(
        orderId,
        coupon.coupon_id,
        discountAmount,
        finalAmount
      );

      if (applyRes.error) throw applyRes.error;
    }
    // 4) Fetch updated order (to get final_amount + payment_code)
    const { data: updatedOrder, error: fetchError } =
      await supabase
        .from('orders')
        .select('*')
        .eq('id', orderId)
        .single();

    if (fetchError) throw fetchError;

    return updatedOrder;
      };

  /* =======================
     UI HELPERS
  ======================= */

  const toggleSelection = (id: string) => {
    setItems(prev =>
      prev.map(item =>
        item.id === id
          ? { ...item, selected: !item.selected }
          : item
      )
    );
  };

  const selectAll = (isSelected: boolean) => {
    setItems(prev =>
      prev.map(item => ({ ...item, selected: isSelected }))
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  /* =======================
     Derived
  ======================= */

  const cartCount = items.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const cartTotal = items
    .filter(item => item.selected)
    .reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        toggleSelection,
        selectAll,
        clearCart,
        cartCount,
        cartTotal,
        placeOrder,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

/* =======================
   Hook
======================= */

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
