
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from './ui/Button';
import { Section } from './ui/Section';
import { Link } from 'react-router-dom';

const CallToAction: React.FC = () => {
  return (
    <Section className="bg-zinc-50">
      <div className="relative rounded-2xl overflow-hidden bg-zinc-900 border border-zinc-800 p-12 md:p-20 text-center shadow-2xl">
         <div className="absolute inset-0 bg-gradient-to-r from-brand-900/30 to-accent-900/10 z-0"></div>
         <div className="absolute top-0 right-0 p-40 bg-brand-500/10 blur-[100px] rounded-full"></div>
         
         <div className="relative z-10 max-w-2xl mx-auto">
           <h2 className="text-4xl md:text-6xl font-display font-bold text-white mb-6">Ngừng Phản Ứng. <br/> Bắt Đầu Dự Đoán.</h2>
           <p className="text-zinc-400 mb-8">Gia nhập cùng 4,500+ công ty đang sử dụng ProNotion để xây dựng tương lai cho hoạt động của họ.</p>
           <Link to="/templates">
             <Button size="lg">Bắt Đầu Miễn Phí <ArrowRight className="ml-2 w-5 h-5"/></Button>
           </Link>
         </div>
      </div>
    </Section>
  );
};

export default CallToAction;
