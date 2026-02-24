import React, { useState } from 'react';
import { Section } from './ui/Section';
import { Button } from './ui/Button';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { CouponService } from '../services/couponService';
import { supabase } from "../services/supabase";
import { useEffect } from "react";


import {
  ArrowLeft,
  CheckCircle,
  ShieldCheck,
  Mail,
  HelpCircle,
  Loader2,
  AlertCircle,
} from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Modal } from './ui/Modal';

type PaymentStatus = 'idle' | 'pending' | 'success' | 'error';

interface PaymentState {
  status: PaymentStatus;
  transactionId?: string;
  errorMessage?: string;
}

const CheckoutPage: React.FC = () => {
  const { user } = useAuth();
  console.log("CURRENT SESSION USER:", user?.id);
  const { items: cartItems, placeOrder } = useCart();
  
  const location = useLocation();
  const navigate = useNavigate();

  const [paymentState, setPaymentState] = useState<PaymentState>({
    status: 'idle',
  });
  const [qrUrl, setQrUrl] = useState<string | null>(null);
  const [showQr, setShowQr] = useState(false);
  const [paymentCode, setPaymentCode] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });

  const [couponCode, setCouponCode] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState<any>(null);
  const [discount, setDiscount] = useState<number>(0);
  const [couponError, setCouponError] = useState<string | null>(null);

  const directItem = location.state?.directPurchase;

  const checkoutItems = directItem
    ? [
        {
          ...directItem,
          quantity: 1,
          price:
            parseFloat(
              directItem.price.replace(/[^0-9.]/g, '')
            ) || 0,
        },
      ]
    : cartItems.filter(item => item.selected);

  const subtotal = checkoutItems.reduce(
    (sum: number, item: any) =>
      sum + item.price * item.quantity,
    0
  );

  const finalTotal = Math.max(0, subtotal - discount);
  useEffect(() => {
    if (!paymentCode || !showQr) return;

    console.log("Start polling...");

    const interval = setInterval(async () => {
      console.log("Polling with code:", paymentCode);

      const { data, error } = await supabase
        .from("orders")
        .select("status")
        .eq("payment_code", paymentCode)
        .single();

      if (error) {
        console.log("Polling error:", error);
        return;
      }

      console.log("Order status:", data?.status);

      if (data?.status === "paid") {
        clearInterval(interval);
        console.log("Payment detected!");

        setShowQr(false);

        setPaymentState({
          status: "success",
          transactionId: paymentCode,
        });
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [paymentCode, showQr]);

  // ✅ APPLY COUPON – dùng CouponService.applyCoupon
  const handleApplyCoupon = async () => {
    if (!user) return;
    console.log("USER ID APPLY:", user.id); // 👈 thêm dòng này
    setCouponError(null);

    try {
      const normalizedItems = checkoutItems.map(item => ({
        product_id: item.id,  // map lại đúng field
        price: item.price,
        quantity: item.quantity,
      }));

      const res = await CouponService.applyCoupon(
        couponCode,
        normalizedItems,
        user.id
      );


      setAppliedCoupon(res);
      setCouponApplied(true);
      setDiscount(res.final_discount || 0);
    } catch (err: any) {
      setCouponError(err?.message || 'Mã không hợp lệ');
      setCouponApplied(false);
      setAppliedCoupon(null);
      setDiscount(0);
    }
  };


const handlePaymentProcess = async (
  e: React.FormEvent
) => {
  e.preventDefault();

  // 🔥 VALIDATE EMAIL TRƯỚC
  if (!formData.email) {
    alert("Vui lòng nhập email nhận hàng");
    return;
  }



  setPaymentState({ status: 'pending' });

  try {
    const result = await placeOrder(appliedCoupon || undefined, formData.email);

    // result phải trả về order (nếu chưa thì báo mình)
    const order = result;
    setPaymentCode(order.payment_code);
    console.log("PAYMENT CODE SET:", order.payment_code);

    const qr = `https://img.vietqr.io/image/MB-7109092004-compact2.png?amount=${order.final_amount}&addInfo=${order.payment_code}&accountName=LE%20THUY%20DIEM`;

    setQrUrl(qr);
    setShowQr(true);
    setPaymentState({ status: 'idle' });
  } catch (err: any) {
    console.error('Payment Error:', err);

    // 🔥 User đã dùng coupon rồi
    if (err?.message?.includes('USER_ALREADY_USED')) {
      setPaymentState({
        status: 'error',
        errorMessage: 'Bạn đã sử dụng mã giảm giá này rồi.',
      });
      return;
    }

    // 🔥 Coupon hết lượt toàn hệ thống
    if (err?.message?.includes('max_uses')) {
      setPaymentState({
        status: 'error',
        errorMessage: 'Mã giảm giá đã hết lượt sử dụng.',
      });
      return;
    }

    // 🔥 Lỗi chung
    setPaymentState({
      status: 'error',
      errorMessage:
        err?.message ||
        'Không thể xử lý thanh toán, vui lòng thử lại.',
    });
  }
};


  const handleSuccessClose = () => {
    setPaymentState({ status: 'idle' });
    navigate('/');
  };

  const handleContinueShopping = () => {
    navigate('/templates');
  };

  if (
    checkoutItems.length === 0 &&
    paymentState.status !== 'success'
  ) {
    return (
      <div className="pt-32 pb-20 min-h-screen bg-white text-center">
        <Section>
          <h2 className="text-2xl font-bold mb-4">
            Chưa có sản phẩm nào được chọn
          </h2>
          <p className="text-zinc-500 mb-6">
            Vui lòng chọn sản phẩm trong giỏ hàng để
            thanh toán.
          </p>
          <Link to="/cart">
            <Button>Quay lại giỏ hàng</Button>
          </Link>
        </Section>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-20 min-h-screen bg-zinc-50 relative">
    {/* QR MODAL */}
    <Modal
      isOpen={showQr}
      onClose={() => setShowQr(false)}
      maxWidth="max-w-5xl"
    >
      <div className="w-full max-w-4xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

          {/* LEFT – QR */}
          <div className="flex flex-col items-center">
            <h2 className="text-2xl font-bold mb-6">
              Quét mã để thanh toán
            </h2>

            {qrUrl && (
              <div className="bg-white p-4 rounded-xl shadow-inner">
                <img
                  src={qrUrl}
                  alt="QR thanh toán"
                  className="w-80 aspect-square object-contain drop-shadow-lg"
                />
              </div>
            )}
          </div>

          {/* RIGHT – INFO */}
          <div className="space-y-6">

            <div>
              <div className="text-sm text-zinc-500 mb-2">
                Nội dung chuyển khoản
              </div>

              <div className="font-mono text-xl font-bold text-brand-600 bg-zinc-100 px-4 py-3 rounded-xl">
                {paymentCode}
              </div>
            </div>

            <div className="text-sm text-zinc-600 space-y-3">
              <p>
                Vui lòng chuyển khoản <span className="font-semibold">
                đúng số tiền và nội dung
                </span> để hệ thống tự động xác nhận.
              </p>

              <p className="text-xs text-zinc-500">
                Thanh toán sẽ được xử lý tự động trong vòng 5–30 giây sau khi chuyển khoản thành công.
              </p>

              <p className="text-xs text-zinc-500">
                Nếu gặp sự cố, vui lòng liên hệ hotline:
                <span className="font-semibold"> 098 897 1620</span>
              </p>
            </div>

          </div>

        </div>
      </div>
    </Modal>
      {/* SUCCESS MODAL */}
      <Modal
        isOpen={paymentState.status === 'success'}
        onClose={handleSuccessClose}
      >
        <div className="flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mb-6 border border-green-100 ring-4 ring-green-50/50">
            <CheckCircle
              className="w-8 h-8 text-green-500"
              strokeWidth={2.5}
            />
          </div>

          <h2 className="text-2xl font-bold mb-2">
            Đặt hàng thành công
          </h2>
          <p className="text-zinc-500 mb-6">
            Template sẽ được gửi đến bạn trong vài phút
            tới.
          </p>

          <div className="bg-zinc-50 rounded-xl p-4 w-full mb-6 border">
            <div className="flex items-center gap-2 mb-2">
              <Mail size={16} />
              <span className="text-sm font-bold">
                Email nhận hàng
              </span>
            </div>
            <div className="text-sm text-zinc-600">
              {formData.email}
            </div>
            {paymentState.transactionId && (
              <div className="text-xs text-zinc-400 mt-1 font-mono">
                Ref: {paymentState.transactionId}
              </div>
            )}
          </div>

          <Button
            onClick={handleSuccessClose}
            className="w-full mb-3"
          >
            Quay về trang chủ
          </Button>
          <Button
            variant="secondary"
            onClick={handleContinueShopping}
            className="w-full"
          >
            Tiếp tục xem templates
          </Button>

          <div className="mt-4 text-xs text-zinc-400 flex items-center gap-2">
            <HelpCircle size={14} /> Nếu cần hỗ trợ, vui
            lòng liên hệ ProNotion
          </div>
        </div>
      </Modal>

      <Section className="!py-10">
        <div className="mb-8">
          <Link
            to={
              directItem
                ? `/templates/${directItem.id}`
                : '/cart'
            }
            className="inline-flex items-center text-zinc-500 hover:text-zinc-900 transition-colors font-medium"
          >
            <ArrowLeft size={16} className="mr-2" />{' '}
            {directItem
              ? 'Quay lại sản phẩm'
              : 'Quay lại giỏ hàng'}
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* FORM & SUMMARY GIỮ NGUYÊN UI */}
          {/* ⬇️ PHẦN DƯỚI KHÔNG ĐỔI GIAO DIỆN ⬇️ */}

          {/* Checkout Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-2xl p-8 border border-zinc-200 shadow-sm">
              <h2 className="text-2xl font-bold text-zinc-900 mb-6 font-display">Thông tin thanh toán</h2>
              
              <form onSubmit={handlePaymentProcess} className="space-y-6">
                <div className="space-y-2">
                    <label className="text-sm font-bold text-zinc-700">Email nhận hàng <span className="text-red-500">*</span></label>
                    <input 
                        type="email" 
                        required 
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        disabled={paymentState.status === 'pending'}
                        className="w-full px-4 py-3 rounded-xl border border-zinc-300 focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 outline-none transition-all disabled:bg-zinc-100 disabled:text-zinc-400"
                        placeholder="example@gmail.com"
                    />
                    <p className="text-xs text-zinc-400">Chúng tôi sẽ gửi link tải sản phẩm qua email này.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-zinc-700">Họ và tên</label>
                        <input 
                            type="text" 
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                            disabled={paymentState.status === 'pending'}
                            className="w-full px-4 py-3 rounded-xl border border-zinc-300 focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 outline-none transition-all disabled:bg-zinc-100 disabled:text-zinc-400"
                            placeholder="Nguyễn Văn A"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-zinc-700">Số điện thoại</label>
                        <input 
                            type="tel" 
                            value={formData.phone}
                            onChange={(e) => setFormData({...formData, phone: e.target.value})}
                            disabled={paymentState.status === 'pending'}
                            className="w-full px-4 py-3 rounded-xl border border-zinc-300 focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 outline-none transition-all disabled:bg-zinc-100 disabled:text-zinc-400"
                            placeholder="0912..."
                        />
                    </div>
                </div>

                {paymentState.status === 'error' && (
                  <div className="bg-red-50 border border-red-100 text-red-600 p-4 rounded-xl flex items-center gap-3 animate-in fade-in slide-in-from-top-2">
                    <AlertCircle size={20} className="flex-shrink-0" />
                    <p className="text-sm font-medium">{paymentState.errorMessage}</p>
                  </div>
                )}

                <div className="pt-6 border-t border-zinc-100">
                    <Button 
                      type="submit" 
                      size="lg" 
                      className="w-full text-lg shadow-xl shadow-brand-500/20 disabled:opacity-70 disabled:cursor-not-allowed"
                      disabled={paymentState.status === 'pending'}
                    >
                        {paymentState.status === 'pending' ? (
                          <>
                            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                            Đang xử lý...
                          </>
                        ) : (
                          `Thanh toán $${finalTotal.toFixed(2)}`
                        )}
                    </Button>
                    <div className="flex items-center justify-center gap-2 mt-4 text-xs text-zinc-400">
                        <ShieldCheck size={14} /> Thanh toán an toàn và bảo mật
                    </div>
                </div>
              </form>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-5">
             <div className="bg-white rounded-2xl p-8 border border-zinc-200 shadow-sm sticky top-28">
                <h3 className="font-bold text-lg text-zinc-900 mb-6">Tóm tắt đơn hàng</h3>
                
                <div className="max-h-80 overflow-y-auto pr-2 space-y-4 mb-6 custom-scrollbar">
                    {checkoutItems.map((item: any) => (
                        <div key={item.id} className="flex gap-4 items-start">
                            <div className="w-16 h-16 bg-zinc-100 rounded-lg overflow-hidden flex-shrink-0">
                                <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                            </div>
                            <div className="flex-1">
                                <h4 className="font-bold text-sm text-zinc-900 line-clamp-2">{item.title}</h4>
                                <div className="text-xs text-zinc-500 mt-1">Số lượng: {item.quantity}</div>
                            </div>
                            <div className="font-mono text-sm font-medium">
                                ${(item.price * item.quantity).toFixed(2)}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Coupon Section */}
                <div className="mb-6 pt-6 border-t border-zinc-100">
                  <label className="text-xs font-bold text-zinc-500 uppercase tracking-wide mb-2 block">Mã giảm giá</label>
                  <div className="flex gap-2">
                    <input 
                      type="text" 
                      placeholder="Nhập mã..." 
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      disabled={couponApplied || paymentState.status === 'pending'}
                      className="flex-1 px-3 py-2 rounded-lg border border-zinc-200 focus:outline-none focus:border-brand-300 focus:ring-2 focus:ring-brand-100 text-sm disabled:bg-zinc-50"
                    />
                    <Button 
                      variant="secondary" 
                      size="sm" 
                      onClick={handleApplyCoupon}
                      disabled={couponApplied || !couponCode || paymentState.status === 'pending'}
                      className={couponApplied ? 'opacity-50 cursor-not-allowed' : ''}
                    >
                      {couponApplied ? 'Đã áp dụng' : 'Áp dụng'}
                    </Button>
                  </div>
                {couponError && (
                  <div className="mt-2 text-sm text-red-500 flex items-center gap-2">
                    <AlertCircle size={16} />
                    <span>{couponError}</span>
                  </div>
                )}

                  
                </div>

                <div className="border-t border-zinc-100 pt-4 space-y-3 text-sm">
                    <div className="flex justify-between text-zinc-600">
                        <span>Tổng số lượng</span>
                        <span>{checkoutItems.reduce((acc: number, item: any) => acc + item.quantity, 0)} items</span>
                    </div>
                    <div className="flex justify-between text-zinc-600">
                        <span>Tạm tính</span>
                        <span>${subtotal.toFixed(2)}</span>
                    </div>
                    {appliedCoupon && (
                      <div className="flex justify-between text-green-600">
                        <span>Giảm giá</span>
                        <span>-{discount.toLocaleString()}₫</span>
                      </div>
                    )}
                    <div className="flex justify-between text-xl font-bold text-zinc-900 pt-3 border-t border-zinc-100">
                        <span>Tổng cộng</span>
                        <span className="text-brand-600">${finalTotal.toFixed(2)}</span>
                    </div>
                </div>
             </div>
          </div>
        </div>
      </Section>
    </div>
  );
};

export default CheckoutPage;
