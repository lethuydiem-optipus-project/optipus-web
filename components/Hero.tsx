
import React, { useEffect, useState } from 'react';
import { Button } from './ui/Button';
import { PlayCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative pt-32 pb-20 md:pt-48 md:pb-20 overflow-hidden min-h-[90vh] flex items-center">
      {/* Background Ambience */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-brand-500/10 blur-[120px] rounded-full pointer-events-none z-0 mix-blend-multiply"></div>
      <div className="absolute bottom-0 right-0 w-[800px] h-[600px] bg-accent-400/10 blur-[120px] rounded-full pointer-events-none z-0"></div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 w-full">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Content (Left) */}
          <div className="flex flex-col justify-center order-2 lg:order-1">
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-display font-bold text-zinc-900 leading-[0.85] tracking-tighter uppercase mb-8">
              <span className="text-transparent bg-clip-text bg-gradient-to-b from-zinc-900 via-zinc-800 to-zinc-500">ProNotion</span><br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 via-brand-500 to-accent-400">Hệ Điều Hành</span><br />
              <span className="text-zinc-900 drop-shadow-xl">Doanh Nghiệp</span>
            </h1>
            
            <div className="flex flex-col gap-8 mt-6">
              <div className="max-w-xl">
                <p className="text-xl md:text-2xl text-zinc-600 font-light leading-relaxed">
                  Phân tích workflow của bạn trong thời gian thực để loại bỏ sự hỗn loạn, phát hiện điểm nghẽn và dự báo thành công—giúp đội ngũ của bạn hành động trước khi deadline trôi qua.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                <Link to="/templates" className="w-full md:w-auto">
                  <Button size="lg" className="w-full">
                    Khám Phá Template
                  </Button>
                </Link>
                <Link to="/templates" className="w-full md:w-auto">
                  <Button variant="outline" size="lg" className="w-full group">
                    <span className="mr-2">Xem Demo</span> <PlayCircle size={20} className="group-hover:text-brand-500 transition-colors"/>
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Dashboard Preview / Floating UI (Right) */}
          <div 
            className="perspective-container relative w-full order-1 lg:order-2 mb-12 lg:mb-0 transition-transform duration-100 ease-out"
            style={{ transform: `translateY(${scrollY * 0.15}px)` }}
          >
            <div className="relative z-10 rotate-3d animate-float border border-zinc-200 rounded-xl bg-white/90 backdrop-blur-md overflow-hidden shadow-[0_50px_100px_-20px_rgba(168,85,247,0.15)]">
              {/* Fake UI Header */}
              <div className="h-10 border-b border-zinc-100 bg-zinc-50/50 flex items-center px-4 justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/20 border border-red-500/50"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20 border border-yellow-500/50"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500/20 border border-green-500/50"></div>
                </div>
                <div className="text-[10px] font-mono text-zinc-400 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-400 animate-pulse"></span>
                  SYSTEM_ONLINE
                </div>
              </div>

              {/* Fake UI Content */}
              <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Left Col - Stats */}
                <div className="col-span-1 space-y-4">
                   {/* Deep Work Card */}
                   <div className="p-4 bg-zinc-50 border border-zinc-100 rounded-lg shadow-sm">
                      <div className="text-[10px] text-zinc-400 uppercase tracking-widest font-bold mb-3">Thói quen hàng ngày</div>
                      <div className="flex items-end justify-between mb-2">
                        <span className="text-sm font-medium text-zinc-700">Deep Work</span>
                        <span className="text-brand-600 text-xs font-mono">92%</span>
                      </div>
                      <div className="w-full h-1 bg-zinc-200 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-brand-500 to-accent-400 w-[92%] shadow-[0_0_10px_rgba(168,85,247,0.3)]"></div>
                      </div>
                   </div>
                   
                   {/* Revenue Card */}
                   <div className="p-4 bg-zinc-50 border border-zinc-100 rounded-lg shadow-sm">
                      <div className="text-[10px] text-zinc-400 uppercase tracking-widest font-bold mb-2">Dự báo doanh thu</div>
                      <div className="text-2xl font-display font-bold text-zinc-900 tracking-tight">$42,300</div>
                      <div className="text-[10px] text-emerald-600 flex items-center gap-1 mt-1 font-mono">
                        ▲ 14.2% so với tháng trước
                      </div>
                   </div>
                </div>

                {/* Middle Col - Main Projects */}
                <div className="col-span-1 md:col-span-2">
                  <div className="p-6 bg-white border border-zinc-100 rounded-lg h-full relative overflow-hidden flex flex-col shadow-sm">
                    <div className="absolute top-0 right-0 p-4 opacity-5 text-9xl font-display font-bold text-zinc-900 leading-none -mt-6 -mr-6 select-none">Q3</div>
                    <h3 className="text-sm font-bold text-zinc-900 mb-6 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-500"></span>
                      Dự Án Đang Chạy
                    </h3>
                    
                    <div className="space-y-3 flex-1">
                       {[
                         { name: "Ra mắt Project Alpha", active: true },
                         { name: "Thiết kế lại Website", active: false },
                         { name: "Chiến lược Q4", active: false }
                       ].map((project, i) => (
                         <div key={i} className={`flex items-center justify-between p-3 rounded border transition-all duration-300 ${project.active ? 'bg-brand-50 border-brand-200' : 'bg-transparent border-zinc-100 hover:border-zinc-200'}`}>
                           <div className="flex items-center gap-3">
                             <div className={`w-1.5 h-1.5 rounded-full ${project.active ? 'bg-brand-500 shadow-[0_0_8px_rgba(168,85,247,0.4)]' : 'bg-zinc-300'}`}></div>
                             <span className={`text-xs font-medium ${project.active ? 'text-zinc-900' : 'text-zinc-500'}`}>{project.name}</span>
                           </div>
                           <div className={`w-8 h-4 rounded-full border flex items-center px-0.5 transition-colors ${project.active ? 'bg-brand-100 border-brand-200 justify-end' : 'bg-zinc-100 border-zinc-200 justify-start'}`}>
                             <div className={`w-3 h-3 rounded-full ${project.active ? 'bg-accent-400' : 'bg-zinc-400'}`}></div>
                           </div>
                         </div>
                       ))}
                    </div>

                    <div className="mt-6 pt-4 border-t border-zinc-100 space-y-1">
                      <div className="font-mono text-[10px] text-brand-600">{'>'} đang_tạo_báo_cáo...</div>
                      <div className="font-mono text-[10px] text-zinc-400">{'>'} tối_ưu_hóa_cấu_trúc_database... hoàn tất.</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Decorative Glows */}
            <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-brand-200/50 blur-[100px] rounded-full z-0 pointer-events-none mix-blend-multiply"></div>
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-accent-100/50 blur-[50px] rounded-full z-0 pointer-events-none mix-blend-multiply"></div>
          </div>
        </div>

        {/* Clients Section moved inside Hero to keep it compact if needed, but styling remains consistent */}
        <div className="mt-20 md:mt-32 pt-10">
           <p className="text-zinc-400 text-xs font-bold tracking-widest mb-8 uppercase">Được tin dùng bởi các nhà đổi mới tại</p>
           <div className="flex flex-wrap gap-8 md:gap-16 items-center opacity-40 grayscale hover:grayscale-0 transition-all duration-500">
             <div className="text-xl font-display font-bold text-zinc-900">ACME<span className="font-light">CORP</span></div>
             <div className="text-xl font-display font-bold text-zinc-900">VORTEX</div>
             <div className="text-xl font-display font-bold text-zinc-900">STRATOS</div>
             <div className="text-xl font-display font-bold text-zinc-900">HYPERION</div>
             <div className="text-xl font-display font-bold text-zinc-900">NEXUS</div>
           </div>
        </div>

      </div>
    </div>
  );
};

export default Hero;
