import React from 'react';
import { Button } from './ui/Button';
import { PlayCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero: React.FC = () => {
  return (
    <div className="relative pt-24 pb-16 md:pt-40 md:pb-20 overflow-hidden min-h-[80vh] flex items-center bg-white">
      {/* Background Ambience - Tối ưu bằng Radial Gradient thay vì Blur filter */}
      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[360px] md:w-[1000px] md:h-[600px] pointer-events-none z-0 opacity-50"
        style={{
          background: 'radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, transparent 70%)'
        }}
      ></div>
      <div 
        className="absolute bottom-0 right-0 w-[420px] h-[320px] md:w-[800px] md:h-[600px] pointer-events-none z-0 opacity-40"
        style={{
          background: 'radial-gradient(circle, rgba(244, 63, 94, 0.1) 0%, transparent 70%)'
        }}
      ></div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-center">
          
          {/* Content - Giữ order-1 trên mobile để ưu tiên LCP (chữ hiện sớm nhất) */}
          <div className="flex flex-col justify-center order-1">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold text-zinc-900 leading-[1.05] tracking-tighter uppercase mb-6">
              <span className="text-transparent bg-clip-text bg-gradient-to-b from-zinc-900 via-zinc-800 to-zinc-500">
                OptiPus
              </span>
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 via-brand-500 to-accent-400">
                Giải pháp quản trị
              </span>
              <br />
              <span className="text-zinc-900">Thông Minh</span>
            </h1>

            <div className="flex flex-col gap-6 mt-4">
              <div className="max-w-xl">
                <p className="text-lg md:text-2xl text-zinc-600 font-light leading-relaxed">
                  Hệ sinh thái Template Notion chuẩn hóa quy trình làm việc và học tập. Giúp bạn quản lý deadline, tối ưu hóa hiệu suất và làm chủ thời gian.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                <Link to="/templates" className="w-full md:w-auto">
                  <Button size="lg" className="w-full shadow-lg shadow-brand-500/20">
                    Khám Phá Template
                  </Button>
                </Link>
                <Link to="/templates" className="w-full md:w-auto">
                  <Button variant="outline" size="lg" className="w-full group">
                    <span className="mr-2">Xem Demo</span>
                    <PlayCircle size={20} className="group-hover:text-brand-500 transition-colors" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Dashboard Preview - Order-2 trên mobile, chỉ hiển thị khi cần thiết */}
          <div className="hidden md:block relative w-full order-2 mb-8 lg:mb-0">
            <div className="relative z-10 border border-zinc-200 rounded-xl bg-white/95 overflow-hidden shadow-2xl transition-transform hover:scale-[1.01] duration-500">
              {/* Header */}
              <div className="h-10 border-b border-zinc-100 bg-zinc-50/70 flex items-center px-4 justify-between font-sans">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-400 opacity-60"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-400 opacity-60"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-green-400 opacity-60"></div>
                </div>
                <div className="text-[10px] font-mono text-zinc-400 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-400 animate-pulse"></span>
                  SYSTEM_ONLINE
                </div>
              </div>

              {/* Mockup Content */}
              <div className="p-4 md:p-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="col-span-1 space-y-4">
                  <div className="p-4 bg-zinc-50 border border-zinc-100 rounded-lg">
                    <div className="text-[10px] text-zinc-400 uppercase tracking-widest font-bold mb-3">Thói quen</div>
                    <div className="flex items-end justify-between mb-2">
                      <span className="text-sm font-medium text-zinc-700">Deep Work</span>
                      <span className="text-brand-600 text-xs font-mono">92%</span>
                    </div>
                    <div className="w-full h-1.5 bg-zinc-200 rounded-full overflow-hidden">
                      <div className="h-full bg-brand-500 w-[92%]"></div>
                    </div>
                  </div>

                  <div className="p-4 bg-zinc-50 border border-zinc-100 rounded-lg">
                    <div className="text-[10px] text-zinc-400 uppercase tracking-widest font-bold mb-2">Ngân sách</div>
                    <div className="text-xl font-bold text-zinc-900">12.000.000đ</div>
                    <div className="text-[10px] text-emerald-600 font-mono mt-1">▲ 14.2%</div>
                  </div>
                </div>

                <div className="col-span-1 md:col-span-2">
                  <div className="p-5 bg-white border border-zinc-100 rounded-lg h-full relative flex flex-col">
                    <h3 className="text-sm font-bold text-zinc-900 mb-4 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-brand-500"></span>
                      Dự Án Đang Chạy
                    </h3>
                    <div className="space-y-2.5">
                      {['Ra mắt Project Alpha', 'Thiết kế lại Website'].map((name, i) => (
                        <div key={i} className={`flex items-center justify-between p-2.5 rounded border ${i === 0 ? 'bg-brand-50 border-brand-100' : 'border-zinc-50'}`}>
                          <span className={`text-xs ${i === 0 ? 'text-zinc-900 font-medium' : 'text-zinc-500'}`}>{name}</span>
                          <div className={`w-7 h-3.5 rounded-full ${i === 0 ? 'bg-brand-200' : 'bg-zinc-100'} relative`}>
                             <div className={`absolute top-0.5 ${i === 0 ? 'right-0.5 bg-brand-600' : 'left-0.5 bg-zinc-400'} w-2.5 h-2.5 rounded-full`}></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative Glows - Tối ưu bằng Gradient */}
            <div 
              className="absolute -bottom-10 -right-10 w-64 h-64 pointer-events-none z-0"
              style={{ background: 'radial-gradient(circle, rgba(99, 102, 241, 0.1) 0%, transparent 70%)' }}
            ></div>
          </div>
        </div>

        {/* Clients/Roles Section */}
        <div className="mt-16 md:mt-24 pt-8 border-t border-zinc-100">
          <p className="text-zinc-400 text-[10px] font-bold tracking-[0.2em] mb-8 uppercase">
            Giải pháp tối ưu cho hơn 1000+ người dùng
          </p>
          <div className="flex flex-wrap gap-x-12 gap-y-6 items-center opacity-30 grayscale transition-all hover:grayscale-0 hover:opacity-100">
            {['STUDENTS', 'FREELANCERS', 'STARTUPS', 'MARKETERS', 'CREATORS'].map((item) => (
              <span key={item} className="text-sm md:text-base font-display font-black text-zinc-900 tracking-tighter">
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;