
import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { Modal } from '../ui/Modal';
import { CheckCircle } from 'lucide-react';

export const PendingActionHandler: React.FC = () => {
  const { user } = useAuth();
  const { addToCart, clearCart, selectAll } = useCart();
  const navigate = useNavigate();
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (user) {
      const pendingActionRaw = localStorage.getItem('pendingAction');
      if (pendingActionRaw) {
        try {
          const action = JSON.parse(pendingActionRaw);
          
          if (action.type === 'ADD_TO_CART') {
            addToCart(action.product);
          } else if (action.type === 'BUY_NOW') {
            // For Buy Now, we might want to clear cart first to focus on this item, or just select it.
            // Prompt says: Clear cart, Add product, Mark selected
            clearCart();
            // We need to wait for clearCart? It's synchronous in our context.
            // Add product
            addToCart(action.product); 
            // addToCart selects it by default in our context implementation
          }

          // Show success popup
          setShowSuccess(true);
          
          // Clear storage
          localStorage.removeItem('pendingAction');

          // Redirect
          if (action.redirectAfter) {
            setTimeout(() => {
                // If it's a direct purchase, we might need to pass state. 
                // Our checkout page uses location.state for direct items.
                if (action.type === 'BUY_NOW') {
                     navigate(action.redirectAfter, { state: { directPurchase: action.product } });
                } else {
                     navigate(action.redirectAfter);
                }
                setShowSuccess(false);
            }, 2000);
          } else {
             setTimeout(() => setShowSuccess(false), 2000);
          }

        } catch (e) {
          console.error("Failed to parse pending action", e);
          localStorage.removeItem('pendingAction');
        }
      }
    }
  }, [user, addToCart, clearCart, navigate]);

  return (
    <Modal isOpen={showSuccess}>
       <div className="text-center py-6">
          <div className="w-16 h-16 bg-brand-50 rounded-full flex items-center justify-center mb-6 mx-auto">
             <CheckCircle className="w-8 h-8 text-brand-500" />
          </div>
          <h2 className="text-xl font-bold text-zinc-900 mb-2">🎉 Đã thêm sản phẩm vào giỏ hàng!</h2>
          <p className="text-zinc-500">Chúng ta tiếp tục thôi nào 🚀</p>
       </div>
    </Modal>
  );
};
