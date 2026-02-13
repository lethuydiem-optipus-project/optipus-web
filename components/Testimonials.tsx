
import React, { useState } from 'react';
import { Section } from './ui/Section';
import { Button } from './ui/Button';
import { Quote, Plus, Minus, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Testimonials: React.FC = () => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const people = [
    {
      name: "Patrick Nawrocki",
      role: "UX Manager @ Superhabits",
      image: "https://picsum.photos/400/500?grayscale&random=1",
      quote: "ProNotion transformed our chaotic Jira backlog into a streamlined predictive engine. We ship 2x faster now."
    },
    {
      name: "Pri Patel",
      role: "Product Designer @ Lightdash",
      image: "https://picsum.photos/400/500?grayscale&random=2",
      quote: "The ability to connect disparate data points and see the future of our roadmap is a superpower. It's truly a second brain."
    },
    {
      name: "Rob West",
      role: "CEO @ Kingdom Advisors",
      image: "https://picsum.photos/400/500?grayscale&random=3",
      quote: "I stopped reacting to fires and started preventing them. The ROI on this system is immeasurable for our operations."
    }
  ];

  const faqs = [
    {
      question: "Tôi có cần tài khoản Notion trả phí không?",
      answer: "Không, các mẫu của chúng tôi hoạt động hoàn hảo với phiên bản miễn phí của Notion. Tuy nhiên, với các nhóm lớn, gói Team hoặc Enterprise có thể mang lại thêm lợi ích."
    },
    {
      question: "Tôi có thể tuỳ chỉnh các mẫu không?",
      answer: "Có. Bạn có toàn quyền chỉnh sửa, mở rộng và tuỳ biến các template để phù hợp với quy trình làm việc của mình."
    },
    {
      question: "Hệ thống này có phù hợp cho người mới bắt đầu không?",
      answer: "Hoàn toàn phù hợp. Các template được thiết kế rõ ràng, có hướng dẫn và dễ sử dụng ngay cả với người mới."
    },
    {
      question: "Cập nhật hoạt động như thế nào?",
      answer: "Bạn sẽ nhận được các bản cập nhật miễn phí khi template được cải tiến hoặc bổ sung tính năng mới."
    },
    {
      question: "Bạn có hoàn tiền không?",
      answer: "Nếu bạn gặp vấn đề kỹ thuật hoặc template không đúng mô tả, hãy liên hệ để được hỗ trợ hoàn tiền theo chính sách."
    }
  ];

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <Section id="testimonials" className="bg-white overflow-hidden py-24 md:py-32 relative">
      {/* Ambient Lighting / Aura */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full md:w-[600px] h-full bg-gradient-to-b from-brand-50/0 via-brand-50/80 to-brand-50/0 blur-3xl pointer-events-none z-0"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-brand-100/30 blur-[100px] rounded-full pointer-events-none z-0"></div>

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
        
        {/* Left Column: Testimonials */}
        <div className="flex flex-col">
          <div className="mb-12 text-left">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-zinc-900 mb-6 tracking-tight">
              What People <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-purple-400">Are Saying</span>
            </h2>
            <p className="text-lg text-zinc-500 leading-relaxed max-w-xl">
              Real feedback from designers and teams who use ProNotion every day. Discover how our predictive tools transformed their workflow.
            </p>
          </div>

          {/* 3-Card Spotlight Layout (Fixed) */}
          <div className="relative w-full h-[500px] flex items-center justify-center perspective-[1200px] mb-8 isolate">
            
            {/* Left Card - Secondary (Behind) */}
            <div className="hidden lg:flex absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-[90%] w-[340px] p-8 flex-col bg-white/60 backdrop-blur-sm border border-zinc-100/50 rounded-[2.5rem] shadow-xl z-10 scale-[0.8] opacity-50 transition-all duration-500 [transform:rotateY(15deg)] hover:opacity-70 hover:scale-[0.82] cursor-default select-none">
               <div className="mb-6 opacity-50">
                  <Quote className="text-brand-200 w-12 h-12 fill-brand-100/50" />
               </div>
               <div className="mb-6 flex-1">
                  <p className="text-lg font-medium text-zinc-600 leading-relaxed line-clamp-4">
                    "{people[0].quote}"
                  </p>
               </div>
               <div className="mt-auto flex items-center gap-3 pt-4 border-t border-zinc-100/50">
                 <img src={people[0].image} alt={people[0].name} className="w-10 h-10 rounded-full object-cover grayscale opacity-70" />
                 <div>
                   <h4 className="text-sm font-bold text-zinc-700">{people[0].name}</h4>
                 </div>
               </div>
            </div>

            {/* Right Card - Secondary (Behind) */}
            <div className="hidden lg:flex absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-[10%] w-[340px] p-8 flex-col bg-white/60 backdrop-blur-sm border border-zinc-100/50 rounded-[2.5rem] shadow-xl z-10 scale-[0.8] opacity-50 transition-all duration-500 [transform:rotateY(-15deg)] hover:opacity-70 hover:scale-[0.82] cursor-default select-none">
               <div className="mb-6 opacity-50">
                  <Quote className="text-brand-200 w-12 h-12 fill-brand-100/50" />
               </div>
               <div className="mb-6 flex-1">
                  <p className="text-lg font-medium text-zinc-600 leading-relaxed line-clamp-4">
                    "{people[2].quote}"
                  </p>
               </div>
               <div className="mt-auto flex items-center gap-3 pt-4 border-t border-zinc-100/50">
                 <img src={people[2].image} alt={people[2].name} className="w-10 h-10 rounded-full object-cover grayscale opacity-70" />
                 <div>
                   <h4 className="text-sm font-bold text-zinc-700">{people[2].name}</h4>
                 </div>
               </div>
            </div>

            {/* Center Card - Primary (Focus) */}
            <div className="relative z-20 w-full max-w-[420px] p-10 flex flex-col bg-white rounded-[2.5rem] shadow-[0_30px_80px_-20px_rgba(168,85,247,0.2)] border border-white/80 ring-1 ring-brand-100/50 transition-all duration-500 hover:-translate-y-2">
               {/* Large Quote Icon */}
               <div className="mb-6">
                  <Quote className="text-brand-200 w-16 h-16 fill-brand-50" strokeWidth={1} />
               </div>
               
               {/* Text */}
               <div className="mb-10 flex-1">
                  <p className="text-2xl font-medium text-zinc-800 leading-relaxed tracking-tight">
                    "{people[1].quote}"
                  </p>
               </div>

               {/* User Info */}
               <div className="mt-auto flex items-center gap-4 border-t border-zinc-50 pt-6">
                  <img src={people[1].image} alt={people[1].name} className="w-14 h-14 rounded-full object-cover ring-4 ring-brand-50 shadow-sm" />
                  <div>
                    <h4 className="text-lg font-bold text-zinc-900">{people[1].name}</h4>
                    <p className="text-xs font-bold text-brand-600 uppercase tracking-widest">{people[1].role}</p>
                  </div>
               </div>
               
               {/* Subtle Glows */}
               <div className="absolute top-10 right-10 w-32 h-32 bg-brand-100/30 blur-3xl rounded-full -z-10 pointer-events-none"></div>
               <div className="absolute bottom-10 left-10 w-32 h-32 bg-accent-100/20 blur-3xl rounded-full -z-10 pointer-events-none"></div>
            </div>

          </div>
          
          <div className="flex justify-start pl-4 md:pl-0">
             <Link to="/blog">
               <Button variant="outline" className="rounded-full px-8 py-3 border-zinc-200 hover:border-brand-300 hover:text-brand-700 bg-white/50 backdrop-blur-sm">
                 View More Stories
               </Button>
             </Link>
          </div>
        </div>

        {/* Right Column: FAQ */}
        <div className="flex flex-col pt-4 lg:pt-0">
          <div className="mb-10">
            <span className="text-brand-600 font-bold text-xs uppercase tracking-widest mb-3 block">Hỗ trợ</span>
            <h2 className="text-4xl font-display font-bold text-zinc-900 mb-4">
              Câu hỏi <br/> thường gặp
            </h2>
            <p className="text-zinc-500 mb-6 text-sm leading-relaxed max-w-sm">
              Không tìm thấy câu trả lời bạn cần? Hãy liên hệ với đội ngũ hỗ trợ của chúng tôi.
            </p>
            <Link to="/contact" className="inline-flex items-center text-sm font-bold text-brand-600 hover:text-brand-700 transition-colors group">
              Liên hệ hỗ trợ <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="space-y-0 border-t border-zinc-100">
            {faqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div 
                  key={idx} 
                  className={`border-b border-zinc-100 transition-colors duration-300 ${isOpen ? 'bg-zinc-50/50' : 'bg-transparent'}`}
                >
                  <button 
                    onClick={() => toggleFaq(idx)}
                    className="w-full py-5 flex items-start justify-between text-left group transition-all duration-200 active:scale-[0.98] outline-none"
                  >
                    <span className={`font-medium pr-8 text-lg transition-colors duration-300 ${isOpen ? 'text-brand-600' : 'text-zinc-900 group-hover:text-brand-600'}`}>
                      {faq.question}
                    </span>
                    
                    {/* Animated Icon Container */}
                    <span className={`relative flex items-center justify-center w-8 h-8 rounded-full transition-colors duration-300 ${isOpen ? 'bg-brand-100' : 'bg-zinc-50 group-hover:bg-brand-50'}`}>
                      {/* Plus Icon (Closed State) */}
                      <Plus 
                        size={16} 
                        className={`absolute transition-all duration-300 ease-out ${isOpen ? 'opacity-0 rotate-90 scale-50' : 'opacity-100 rotate-0 scale-100 text-zinc-400 group-hover:text-brand-600'}`} 
                      />
                      {/* Minus Icon (Open State) */}
                      <Minus 
                        size={16} 
                        className={`absolute transition-all duration-300 ease-out ${isOpen ? 'opacity-100 rotate-0 scale-100 text-brand-600' : 'opacity-0 -rotate-90 scale-50'}`} 
                      />
                    </span>
                  </button>
                  
                  {/* Grid Rows Animation for Height */}
                  <div 
                    className={`grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${
                      isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                    }`}
                  >
                    <div className="overflow-hidden">
                      {/* Content Opacity & Slide Animation */}
                      <div className={`transition-all duration-500 ease-out delay-75 ${isOpen ? 'opacity-100 translate-y-0 pb-6' : 'opacity-0 -translate-y-4 pb-0'}`}>
                        <p className="text-zinc-500 text-base leading-relaxed pr-8 pl-1 border-l-2 border-brand-100 ml-1">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </Section>
  );
};

export default Testimonials;
