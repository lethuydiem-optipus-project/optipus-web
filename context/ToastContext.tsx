
import React, { createContext, useContext, useState, useCallback, useRef } from 'react';
import { X, Check, ShoppingCart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export interface ToastData {
  id: string;
  title: string;
  image: string;
  price: number;
}

interface ToastContextType {
  showToast: (product: ToastData) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toast, setToast] = useState<ToastData | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const navigate = useNavigate();

  const showToast = useCallback((product: ToastData) => {
    if (timerRef.current) clearTimeout(timerRef.current);
    
    setToast(product);
    setIsVisible(true);
    
    timerRef.current = setTimeout(() => {
      setIsVisible(false);
    }, 4000);
  }, []);

  const closeToast = () => {
    setIsVisible(false);
    if (timerRef.current) clearTimeout(timerRef.current);
  };

  const handleNavigateToCart = () => {
    closeToast();
    navigate('/cart');
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className={`fixed bottom-6 right-6 z-[100] transition-all duration-500 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0 pointer-events-none'}`}>
        {toast && (
          <div className="bg-white rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.12)] border border-zinc-100 p-5 max-w-sm w-full relative overflow-hidden flex flex-col gap-4">
             <div className="absolute top-0 left-0 w-1 h-full bg-brand-500"></div>
             <button onClick={closeToast} className="absolute top-2 right-2 text-zinc-400 hover:text-zinc-600 p-1">
               <X size={16} />
             </button>
             
             <div className="flex items-center gap-2">
               <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center text-green-600 flex-shrink-0">
                 <Check size={12} strokeWidth={3} />
               </div>
               <span className="font-bold text-zinc-900 text-sm">Đã thêm vào giỏ hàng</span>
             </div>

             <div className="flex gap-4">
               <div className="w-14 h-14 rounded-lg bg-zinc-100 overflow-hidden flex-shrink-0 border border-zinc-200">
                 <img src={toast.image} alt={toast.title} className="w-full h-full object-cover" />
               </div>
               <div className="flex-1 min-w-0">
                 <h4 className="font-bold text-sm text-zinc-900 truncate">{toast.title}</h4>
                 <div className="text-zinc-500 text-sm">{toast.price.toLocaleString("vi-VN")}đ</div>
               </div>
             </div>

             <button 
               onClick={handleNavigateToCart}
               className="w-full bg-zinc-900 hover:bg-brand-600 text-white text-xs font-bold py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors"
             >
               <ShoppingCart size={14} /> Xem giỏ hàng
             </button>
          </div>
        )}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
