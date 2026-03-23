
import React from 'react';
import { Section } from './ui/Section';
import { Activity, Layout, GitGraph, Database, Cpu, Globe } from 'lucide-react';
import { Button } from './ui/Button';
import { Link } from 'react-router-dom';

const features = [
  {
    icon: <Layout className="w-6 h-6" />,
    title: "Second Brain OS",
    description: "Trung tâm lưu trữ và phân loại kiến thức, giúp bạn chuyển hóa ý tưởng thành các dự án hành động cụ thể.",
    stat: "98.2",
    statLabel: "Focus Score"
  },
  {
    icon: <GitGraph className="w-6 h-6" />,
    title: "Project Pipelines",
    description: "Theo dõi tiến độ qua Kanban và Timeline tự động. Trực quan hóa mọi giai đoạn mà không cần cập nhật thủ công.",
    stat: "45.0",
    statLabel: "Hours Saved"
  },
  {
    icon: <Database className="w-6 h-6" />,
    title: "Quản Lý Tài Chính",
    description: "Kiểm soát dòng tiền, ngân sách và mục tiêu tiết kiệm thông qua các cơ sở dữ liệu liên kết thông minh.",
    stat: "12.4",
    statLabel: "Tiết Kiệm"
  }
];

const Features: React.FC = () => {
  return (
    <Section id="features">
      <div className="mb-16 max-w-2xl">
        <h2 className="text-5xl md:text-7xl font-display font-bold text-zinc-900 uppercase tracking-tighter mb-6">
          QUẢN TRỊ <br />
          <span className="text-zinc-400">TỐI ƯU</span>
        </h2>
        <p className="text-lg text-zinc-600">
          Triển khai các hệ thống quản trị thông minh giúp tự động hóa lộ trình học tập và làm việc. Optipus xóa bỏ khoảng cách giữa những ghi chú rời rạc và kết quả thực tế.
        </p>
        <div className="mt-8">
           <Link to="/templates">
             <Button variant="outline">Xem thêm</Button>
           </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {features.map((feature, idx) => (
          <div key={idx} className="group relative bg-white border border-zinc-200 p-8 rounded-xl overflow-hidden hover:shadow-xl hover:border-accent-200 transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-brand-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-8">
                <div className="p-3 bg-zinc-50 rounded-lg text-accent-500 group-hover:text-white group-hover:bg-brand-500 transition-colors border border-zinc-100">
                  {feature.icon}
                </div>
                <div className="text-xs font-mono text-brand-600 bg-brand-50 px-2 py-1 rounded border border-brand-100">
                  {feature.stat} {feature.statLabel}
                </div>
              </div>

              <h3 className="text-xl font-bold text-zinc-900 mb-3">{feature.title}</h3>
              <p className="text-sm text-zinc-600 leading-relaxed mb-6">
                {feature.description}
              </p>

              {/* Mini Graph Visualization */}
              <div className="h-16 w-full flex items-end gap-1 opacity-50 group-hover:opacity-100 transition-opacity">
                {[40, 60, 45, 70, 50, 80, 65, 90, 75, 100].map((h, i) => (
                  <div key={i} className="flex-1 bg-zinc-200 rounded-t-sm group-hover:bg-brand-400 transition-colors duration-500" style={{ height: `${h}%` }}></div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Large Feature */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white border border-zinc-200 rounded-xl p-8 md:p-12 flex flex-col justify-center relative overflow-hidden group hover:shadow-lg transition-all">
          <div className="relative z-10">
            <div className="w-12 h-12 bg-zinc-50 rounded-full flex items-center justify-center text-accent-500 mb-6 border border-zinc-200">
              <Cpu />
            </div>
            <h3 className="text-2xl font-bold text-zinc-900 mb-2">Quy Trình Tự Động</h3>
            <p className="text-zinc-600">Hệ thống liên kết dữ liệu giúp tự động hóa việc nhắc lịch, tính toán ngân sách và cập nhật tiến độ học tập.</p>
          </div>
          {/* Decorative Grid */}
          <div className="absolute inset-0 z-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        </div>

        <div className="bg-white border border-zinc-200 rounded-xl p-8 md:p-12 relative overflow-hidden group hover:shadow-lg transition-all">
           <div className="space-y-3 font-mono text-sm relative z-10">
             <div className="flex items-center gap-3 text-green-600">
               <span className="w-2 h-2 rounded-full bg-green-500"></span>
               Đang cập nhật lịch thi mới...
               <span className="ml-auto text-zinc-400">12:04:45</span>
             </div>
             <div className="flex items-center gap-3 text-green-600">
               <span className="w-2 h-2 rounded-full bg-green-500"></span>
               Đã đồng bộ ngân sách tháng 2
               <span className="ml-auto text-zinc-400">12:04:42</span>
             </div>
             <div className="flex items-center gap-3 text-yellow-600">
               <span className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse"></span>
               Đang tối ưu lộ trình học tập...
             </div>
           </div>
           
           <div className="mt-8 relative z-10">
             <h3 className="text-2xl font-bold text-zinc-900 mb-2">Kiểm Soát Thời Gian Thực</h3>
             <p className="text-zinc-600">Nhận thông báo ngay lập tức về các deadline sắp tới và điều chỉnh khối lượng công việc phù hợp.</p>
           </div>
        </div>
      </div>
    </Section>
  );
};

export default Features;
