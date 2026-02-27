
import React, { useState } from 'react';
import { ArrowRight, Twitter, Linkedin, Facebook, Instagram, Zap } from 'lucide-react';
import { Button } from './ui/Button';
import { SuccessModal } from './ui/SuccessModal';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSuccessOpen(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-white pb-8 pt-0 relative z-10">
      <SuccessModal 
        isOpen={isSuccessOpen} 
        onClose={() => setIsSuccessOpen(false)}
        title="Đăng ký thành công"
        message="Cảm ơn bạn đã quan tâm. Bạn sẽ nhận được những cập nhật mới nhất từ OptiPus qua email."
      />

      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* Unified Card Container */}
        <div className="bg-white rounded-[2.5rem] border border-brand-100/50 shadow-2xl shadow-brand-900/5 overflow-hidden relative isolate ring-1 ring-zinc-100">
           
           {/* CTA Section (Top of Card) */}
           <div className="relative py-20 px-8 md:px-20 text-center">
              {/* Soft Gradient Background */}
              <div className="absolute inset-0 bg-gradient-to-b from-brand-50/80 via-white to-white z-[-1]"></div>
              
              {/* Glow Effect */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-3xl bg-brand-100/30 blur-3xl rounded-full z-[-1] pointer-events-none mix-blend-multiply"></div>

              <div className="max-w-3xl mx-auto relative z-10">
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-zinc-900 mb-6 tracking-tight">
                  Làm Chủ Quy Trình. <br/>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-purple-500">Khai Phá Tiềm Năng.</span>
                </h2>
                <p className="text-lg text-zinc-500 mb-10 leading-relaxed max-w-2xl mx-auto">
                  Tham gia cùng cộng đồng 5,000+ người dùng đang tối ưu hóa cuộc sống và công việc cùng hệ sinh thái Optipus.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                   <Link to="/templates" className="w-full sm:w-auto">
                     <Button size="lg" className="w-full rounded-full px-10 shadow-lg shadow-brand-500/20">
                        Nhận Template Ngay
                     </Button>
                   </Link>
                   <Link to="/contact" className="w-full sm:w-auto">
                     <Button variant="secondary" size="lg" className="w-full rounded-full px-10 border-brand-200 text-brand-700 hover:bg-brand-50 hover:border-brand-300">
                        Tư Vấn Giải Pháp
                     </Button>
                   </Link>
                </div>
              </div>
           </div>

           {/* Footer Content Section (Bottom of Card) */}
           <div className="bg-white pt-10 pb-12 px-8 md:px-16 border-t border-dashed border-zinc-200/60">
             <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
               
               {/* Brand & Newsletter */}
               <div className="lg:col-span-5 space-y-8">
                 <div className="flex items-center gap-2">
                   <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-500 to-purple-600 flex items-center justify-center text-white shadow-md shadow-brand-500/20">
                      <Zap size={18} fill="currentColor" />
                   </div>
                   <span className="font-display font-bold text-xl text-zinc-900 tracking-tight">OptiPus</span>
                 </div>
                 
                 <div className="max-w-sm">
                    <p className="text-sm font-bold text-zinc-900 mb-3">Đăng Ký Nhận Tin</p>
                    <form onSubmit={handleSubscribe} className="flex gap-2 relative">
                      <input 
                        type="email" 
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="email@company.com" 
                        className="flex-1 bg-zinc-50 border border-zinc-200 rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-brand-100 focus:border-brand-300 outline-none transition-all placeholder:text-zinc-400"
                      />
                      <button type="submit" className="bg-zinc-900 hover:bg-brand-600 text-white px-3 py-2 rounded-lg transition-colors absolute right-1 top-1 bottom-1 flex items-center justify-center">
                        <ArrowRight size={16} />
                      </button>
                    </form>
                    <p className="text-xs text-zinc-400 mt-3 font-medium">Cập nhật sản phẩm & mẹo hay hàng tuần.</p>
                 </div>

                 <div className="flex gap-3">
                    {[Facebook, Instagram, Twitter, Linkedin].map((Icon, i) => (
                      <a key={i} href="#" className="p-2.5 rounded-full bg-zinc-50 border border-zinc-100 text-zinc-400 hover:bg-brand-50 hover:text-brand-600 hover:border-brand-200 transition-all">
                        <Icon size={18} />
                      </a>
                    ))}
                 </div>
               </div>

               {/* Spacer */}
               <div className="hidden lg:block lg:col-span-1"></div>

               {/* Links Columns */}
               <div className="lg:col-span-6 grid grid-cols-2 md:grid-cols-3 gap-8 text-sm">
                  <div>
                    <h4 className="font-bold text-zinc-900 mb-6">Sản Phẩm</h4>
                    <ul className="space-y-4 text-zinc-500">
                      <li><Link to="/templates" className="hover:text-brand-600 transition-colors">Tính Năng</Link></li>
                      <li><Link to="/templates" className="hover:text-brand-600 transition-colors">Templates</Link></li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-zinc-900 mb-6">Công Ty</h4>
                    <ul className="space-y-4 text-zinc-500">
                      <li><a href="#" className="hover:text-brand-600 transition-colors">Về Optipus</a></li>
                      <li><a href="#" className="hover:text-brand-600 transition-colors">Đánh giá</a></li>
                      <li><Link to="/contact" className="hover:text-brand-600 transition-colors">Liên Hệ</Link></li>
                      <li><Link to="#" className="hover:text-brand-600 transition-colors">Site map</Link></li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-zinc-900 mb-6">Tài Nguyên</h4>
                    <ul className="space-y-4 text-zinc-500">
                      <li><Link to="/blog" className="hover:text-brand-600 transition-colors">Blog</Link></li>
                      <li><Link to="/contact" className="hover:text-brand-600 transition-colors">Cộng Đồng</Link></li>
                      <li><Link to="/contact" className="hover:text-brand-600 transition-colors">Trợ Giúp</Link></li>
                    </ul>
                  </div>
               </div>
             </div>

             {/* Bottom Bar */}
             <div className="pt-8 border-t border-zinc-100 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-zinc-400 font-medium">
               <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
                 <span>© 2025 ProNotion Inc.</span>
                 <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-green-50 border border-green-100 text-green-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                    <span>All systems operational</span>
                 </div>
               </div>
               <div className="flex gap-6">
                 <a href="#" className="hover:text-brand-600 transition-colors">Quyền Riêng Tư</a>
                 <a href="#" className="hover:text-brand-600 transition-colors">Điều Khoản</a>
                 <a href="#" className="hover:text-brand-600 transition-colors">Bảo Mật</a>
               </div>
             </div>
           </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
