
import React from 'react';
import { Section } from './ui/Section';
import { Button } from './ui/Button';
import { Link } from 'react-router-dom';

const HowItWorks: React.FC = () => {
  return (
    <Section id="how-it-works" className="bg-white py-24 md:py-32 relative overflow-hidden">
      {/* Background Aura */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-brand-100/40 blur-[120px] rounded-full pointer-events-none z-0 mix-blend-multiply"></div>

      <div className="relative z-10 flex flex-col items-center text-center mb-20 max-w-3xl mx-auto px-4">
        {/* Pill Label */}
        <div className="inline-block px-4 py-1.5 mb-8 rounded-full border border-brand-100 bg-brand-50/80 backdrop-blur-sm shadow-sm">
            <span className="text-xs font-bold tracking-[0.15em] text-brand-600 uppercase">
                QUY TRÌNH
            </span>
        </div>
        
        {/* Headline */}
        <h2 className="text-4xl md:text-6xl font-display font-bold text-zinc-900 mb-6 leading-tight tracking-tight">
          Cách OptiPus <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-purple-400">Vận Hành</span>
        </h2>
        
        {/* Subtitle */}
        <p className="text-lg md:text-xl text-zinc-500 leading-relaxed">
          Một hệ thống nhất quán giúp đơn giản hóa hành trình từ những ý tưởng thô đến kết quả thực tế. Cá nhân hóa không gian làm việc, tối ưu hóa quy trình và làm chủ mọi kế hoạch.
        </p>
      </div>

      {/* Steps Row */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-0 mb-16 max-w-7xl mx-auto">
        {/* Step 1 */}
        <div className="flex flex-col items-center text-center px-6 relative group">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-brand-50 to-brand-100 border border-brand-200 flex items-center justify-center text-2xl font-bold text-brand-700 mb-6 shadow-sm group-hover:scale-110 transition-transform duration-500">
            1
          </div>
          <h3 className="text-xl font-bold text-zinc-900 mb-3 group-hover:text-brand-700 transition-colors">Chọn Template Phù Hợp</h3>
          <p className="text-zinc-500 text-sm leading-relaxed max-w-xs mx-auto">
            Khám phá kho thư viện đa dạng của Optipus và chọn bộ Template phù hợp với nhu cầu học tập, quản lý tài chính hoặc dự án cá nhân của bạn.
          </p>
          
          {/* Mobile Divider (Bottom) */}
          <div className="md:hidden w-full h-px bg-zinc-100 mt-12"></div>
        </div>

        {/* Vertical Divider 1 (Desktop) */}
        <div className="hidden md:block absolute top-4 bottom-4 left-1/3 w-px bg-gradient-to-b from-transparent via-zinc-200/50 to-transparent"></div>

        {/* Step 2 */}
        <div className="flex flex-col items-center text-center px-6 relative group">
           <div className="w-16 h-16 rounded-full bg-gradient-to-br from-brand-50 to-brand-100 border border-brand-200 flex items-center justify-center text-2xl font-bold text-brand-700 mb-6 shadow-sm group-hover:scale-110 transition-transform duration-500 delay-100">
            2
          </div>
          <h3 className="text-xl font-bold text-zinc-900 mb-3 group-hover:text-brand-700 transition-colors">Cá Nhân Hóa Template</h3>
          <p className="text-zinc-500 text-sm leading-relaxed max-w-xs mx-auto">
            Dễ dàng tùy chỉnh các trường dữ liệu và cấu trúc theo thói quen của riêng bạn. Hệ thống sẽ giúp bạn tổ chức thông tin một cách khoa học và tự động.
          </p>

          {/* Mobile Divider (Bottom) */}
          <div className="md:hidden w-full h-px bg-zinc-100 mt-12"></div>
        </div>

        {/* Vertical Divider 2 (Desktop) */}
        <div className="hidden md:block absolute top-4 bottom-4 left-2/3 w-px bg-gradient-to-b from-transparent via-zinc-200/50 to-transparent"></div>

        {/* Step 3 */}
        <div className="flex flex-col items-center text-center px-6 relative group">
           <div className="w-16 h-16 rounded-full bg-gradient-to-br from-brand-50 to-brand-100 border border-brand-200 flex items-center justify-center text-2xl font-bold text-brand-700 mb-6 shadow-sm group-hover:scale-110 transition-transform duration-500 delay-200">
            3
          </div>
          <h3 className="text-xl font-bold text-zinc-900 mb-3 group-hover:text-brand-700 transition-colors">Theo Dõi & Tối Ưu</h3>
          <p className="text-zinc-500 text-sm leading-relaxed max-w-xs mx-auto">
            Bắt đầu vận hành quy trình mới, theo dõi tiến độ qua các Dashboard trực quan và nhận cảnh báo về deadline để luôn chủ động trong mọi tình huống.
          </p>
        </div>
      </div>

      {/* CTA */}
      <div className="relative z-10 flex justify-center mt-12">
        <Link to="/templates">
          <Button size="lg" className="rounded-full px-10 shadow-lg shadow-brand-500/20 hover:shadow-brand-500/40">
            Bắt Đầu Ngay
          </Button>
        </Link>
      </div>
    </Section>
  );
};

export default HowItWorks;
