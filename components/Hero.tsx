import React from 'react';
import { Button } from './ui/Button';
import { PlayCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero: React.FC = () => {
  return (
    <div className="relative pt-24 pb-16 md:pt-40 md:pb-20 overflow-hidden min-h-[80vh] flex items-center">
      {/* Background Ambience */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[360px] md:w-[1000px] md:h-[600px] bg-brand-500/10 blur-[80px] md:blur-[120px] rounded-full pointer-events-none z-0"></div>
      <div className="absolute bottom-0 right-0 w-[420px] h-[320px] md:w-[800px] md:h-[600px] bg-accent-400/10 blur-[70px] md:blur-[120px] rounded-full pointer-events-none z-0"></div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-center">
          {/* Content */}
          <div className="flex flex-col justify-center order-2 lg:order-1">
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
                  Hệ sinh thái Template Notion chuẩn hóa quy trình làm việc và học tập. Giúp bạn quản lý deadline, tối ưu hóa hiệu suất và làm chủ thời gian một cách khoa học nhất.
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
                    <span className="mr-2">Xem Demo</span>
                    <PlayCircle size={20} className="group-hover:text-brand-500 transition-colors" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Dashboard Preview */}
          <div className="relative w-full order-1 lg:order-2 mb-8 lg:mb-0">
            <div className="relative z-10 border border-zinc-200 rounded-xl bg-white/95 overflow-hidden shadow-xl md:shadow-2xl">
              {/* Header */}
              <div className="h-10 border-b border-zinc-100 bg-zinc-50/70 flex items-center px-4 justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/20 border border-red-500/50"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20 border border-yellow-500/50"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500/20 border border-green-500/50"></div>
                </div>
                <div className="text-[10px] font-mono text-zinc-400 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-400"></span>
                  SYSTEM_ONLINE
                </div>
              </div>

              {/* Content */}
              <div className="p-4 md:p-8 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                <div className="col-span-1 space-y-4">
                  <div className="p-4 bg-zinc-50 border border-zinc-100 rounded-lg">
                    <div className="text-[10px] text-zinc-400 uppercase tracking-widest font-bold mb-3">
                      Thói quen hàng ngày
                    </div>
                    <div className="flex items-end justify-between mb-2">
                      <span className="text-sm font-medium text-zinc-700">Deep Work</span>
                      <span className="text-brand-600 text-xs font-mono">92%</span>
                    </div>
                    <div className="w-full h-1 bg-zinc-200 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-brand-500 to-accent-400 w-[92%]"></div>
                    </div>
                  </div>

                  <div className="p-4 bg-zinc-50 border border-zinc-100 rounded-lg">
                    <div className="text-[10px] text-zinc-400 uppercase tracking-widest font-bold mb-2">
                      Ngân sách tháng này
                    </div>
                    <div className="text-2xl font-display font-bold text-zinc-900 tracking-tight">
                      12.000.000đ
                    </div>
                    <div className="text-[10px] text-emerald-600 flex items-center gap-1 mt-1 font-mono">
                      ▲ 14.2% so với tháng trước
                    </div>
                  </div>
                </div>

                <div className="col-span-1 md:col-span-2">
                  <div className="p-5 md:p-6 bg-white border border-zinc-100 rounded-lg h-full relative overflow-hidden flex flex-col">
                    <div className="absolute top-0 right-0 p-4 opacity-5 text-8xl font-display font-bold text-zinc-900 leading-none -mt-4 -mr-4 select-none">
                      Q3
                    </div>

                    <h3 className="text-sm font-bold text-zinc-900 mb-5 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-500"></span>
                      Dự Án Đang Chạy
                    </h3>

                    <div className="space-y-3 flex-1">
                      {[
                        { name: 'Ra mắt Project Alpha', active: true },
                        { name: 'Thiết kế lại Website', active: false },
                        { name: 'Chiến lược Q4', active: false },
                      ].map((project, i) => (
                        <div
                          key={i}
                          className={`flex items-center justify-between p-3 rounded border ${
                            project.active
                              ? 'bg-brand-50 border-brand-200'
                              : 'bg-transparent border-zinc-100'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-1.5 h-1.5 rounded-full ${
                                project.active ? 'bg-brand-500' : 'bg-zinc-300'
                              }`}
                            ></div>
                            <span
                              className={`text-xs font-medium ${
                                project.active ? 'text-zinc-900' : 'text-zinc-500'
                              }`}
                            >
                              {project.name}
                            </span>
                          </div>

                          <div
                            className={`w-8 h-4 rounded-full border flex items-center px-0.5 ${
                              project.active
                                ? 'bg-brand-100 border-brand-200 justify-end'
                                : 'bg-zinc-100 border-zinc-200 justify-start'
                            }`}
                          >
                            <div
                              className={`w-3 h-3 rounded-full ${
                                project.active ? 'bg-accent-400' : 'bg-zinc-400'
                              }`}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-6 pt-4 border-t border-zinc-100 space-y-1">
                      <div className="font-mono text-[10px] text-brand-600">
                        {'>'} đang_tạo_báo_cáo...
                      </div>
                      <div className="font-mono text-[10px] text-zinc-400">
                        {'>'} tối_ưu_hóa_cấu_trúc_database... hoàn tất.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative Glows */}
            <div className="absolute -bottom-12 -right-12 w-48 h-48 md:w-80 md:h-80 bg-brand-200/40 blur-[60px] md:blur-[90px] rounded-full z-0 pointer-events-none"></div>
            <div className="absolute -top-6 -left-6 w-24 h-24 md:w-32 md:h-32 bg-accent-100/40 blur-[30px] md:blur-[45px] rounded-full z-0 pointer-events-none"></div>
          </div>
        </div>

        <div className="mt-16 md:mt-24 pt-8">
          <p className="text-zinc-400 text-xs font-bold tracking-widest mb-6 uppercase">
            Giải pháp tối ưu cho hơn 1000+ người dùng
          </p>
          <div className="flex flex-wrap gap-6 md:gap-12 items-center opacity-40">
            <div className="text-lg md:text-xl font-display font-bold text-zinc-900">STUDENTS</div>
            <div className="text-lg md:text-xl font-display font-bold text-zinc-900">FREELANCERS</div>
            <div className="text-lg md:text-xl font-display font-bold text-zinc-900">STARTUPS</div>
            <div className="text-lg md:text-xl font-display font-bold text-zinc-900">MARKETERS</div>
            <div className="text-lg md:text-xl font-display font-bold text-zinc-900">CREATORS</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;