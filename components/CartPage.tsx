
import React from 'react';
import { Section } from './ui/Section';
import { Button } from './ui/Button';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, CheckSquare, Square } from 'lucide-react';
import { useCart } from '../context/CartContext';

const CartPage: React.FC = () => {
  const { items, updateQuantity, removeFromCart, toggleSelection, selectAll, cartTotal } = useCart();
  const navigate = useNavigate();

  // Selected items logic
  const selectedItemsCount = items.filter(item => item.selected).length;
  const isAllSelected = items.length > 0 && items.every(item => item.selected);

  // Final total is just the cart total since coupons are applied at checkout
  const finalTotal = cartTotal;

  if (items.length === 0) {
    return (
      <div className="pt-32 pb-20 min-h-screen bg-white">
        <Section className="flex flex-col items-center justify-center text-center">
          <div className="w-24 h-24 bg-zinc-50 rounded-full flex items-center justify-center mb-6">
            <ShoppingBag className="w-10 h-10 text-zinc-300" />
          </div>
          <h2 className="text-2xl font-bold text-zinc-900 mb-2">Giỏ hàng chưa có sản phẩm nào</h2>
          <p className="text-zinc-500 mb-8 max-w-md">
            Có vẻ như bạn chưa thêm bất kỳ template nào vào giỏ. Khám phá kho template của chúng tôi để bắt đầu.
          </p>
          <Link to="/templates">
            <Button>Khám Phá Templates</Button>
          </Link>
        </Section>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-20 min-h-screen bg-white">
      <Section className="!py-10">
        <h1 className="text-3xl md:text-4xl font-display font-bold text-zinc-900 mb-8 tracking-tight">
          Giỏ Hàng <span className="text-zinc-400">({items.length})</span>
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Cart Items List */}
          <div className="lg:col-span-8 space-y-4">
            {/* Header for list */}
            <div className="flex items-center gap-4 pb-4 border-b border-zinc-100">
               <button 
                 onClick={() => selectAll(!isAllSelected)}
                 className="flex items-center gap-2 text-sm font-medium text-zinc-600 hover:text-zinc-900"
               >
                 {isAllSelected ? <CheckSquare className="text-brand-600" size={20} /> : <Square className="text-zinc-300" size={20} />}
                 Chọn tất cả ({items.length})
               </button>
            </div>

            {items.map((item) => (
              <div key={item.id} className={`flex flex-col sm:flex-row items-center gap-4 p-4 rounded-2xl border transition-all duration-300 ${item.selected ? 'bg-white border-brand-200 shadow-sm' : 'bg-zinc-50/50 border-zinc-100 opacity-80'}`}>
                
                {/* Checkbox */}
                <button 
                  onClick={() => toggleSelection(item.id)}
                  className="flex-shrink-0 text-zinc-400 hover:text-brand-600 transition-colors"
                >
                  {item.selected ? (
                    <CheckSquare className="text-brand-600" size={24} />
                  ) : (
                    <Square className="text-zinc-300 hover:text-zinc-400" size={24} />
                  )}
                </button>

                {/* Thumbnail */}
                <div className="w-full sm:w-24 h-24 rounded-xl overflow-hidden bg-zinc-100 flex-shrink-0">
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                </div>

                {/* Details */}
                <div className="flex-1 w-full text-center sm:text-left">
                  <h3 className="font-bold text-zinc-900 text-lg mb-1">{item.title}</h3>
                  <p className="text-sm text-zinc-500 mb-3">{item.category}</p>
                  <div className="font-bold text-brand-600">{item.price.toLocaleString("vi-VN")}đ</div>
                </div>

                {/* Quantity & Actions */}
                <div className="flex items-center gap-4 sm:gap-6">
                  <div className="flex items-center gap-2 bg-zinc-50 rounded-lg p-1 border border-zinc-200">
                    <button 
                      onClick={() => updateQuantity(item.id, -1)}
                      className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-white text-zinc-500 hover:text-zinc-900 transition-colors"
                      disabled={item.quantity <= 1}
                    >
                      <Minus size={14} />
                    </button>
                    <span className="text-sm font-bold w-6 text-center">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.id, 1)}
                      className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-white text-zinc-500 hover:text-zinc-900 transition-colors"
                    >
                      <Plus size={14} />
                    </button>
                  </div>

                  <div className="font-mono font-medium text-zinc-700 w-20 text-right">
                    {(item.price * item.quantity).toLocaleString("vi-VN")}đ
                  </div>

                  <button 
                    onClick={() => removeFromCart(item.id)}
                    className="p-2 text-zinc-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Cart Summary */}
          <div className="lg:col-span-4">
            <div className="bg-white rounded-2xl p-6 md:p-8 border border-zinc-200 sticky top-28 shadow-sm">
              <h3 className="font-bold text-xl text-zinc-900 mb-6 font-display">Tổng Đơn Hàng</h3>

              <div className="space-y-4 mb-8 pb-6 border-b border-zinc-100">
                <div className="flex justify-between text-zinc-600 text-sm">
                  <span>Đã chọn</span>
                  <span className="font-bold">{selectedItemsCount} sản phẩm</span>
                </div>
                <div className="flex justify-between text-zinc-600">
                  <span>Tạm tính</span>
                  <span className="font-mono">{cartTotal.toLocaleString("vi-VN")}đ</span>
                </div>
                <div className="flex justify-between text-xl font-bold text-zinc-900 pt-2">
                  <span>Tổng cộng</span>
                  <span className="font-mono text-brand-600">{finalTotal.toLocaleString("vi-VN")}đ</span>
                </div>
              </div>

              <Button 
                size="lg" 
                className="w-full shadow-xl shadow-brand-500/20" 
                onClick={() => navigate('/checkout')}
                disabled={selectedItemsCount === 0}
              >
                Tiến hành thanh toán <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              
              <div className="mt-4 text-center">
                <Link to="/templates" className="text-sm text-zinc-500 hover:text-brand-600 font-medium">
                  Tiếp tục mua sắm
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
};

export default CartPage;
