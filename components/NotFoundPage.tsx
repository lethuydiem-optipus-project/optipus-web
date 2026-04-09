import React from 'react';
import { Link } from 'react-router-dom';
import { Section } from './ui/Section';

const NotFoundPage: React.FC = () => {
  return (
    <div className="pt-24 pb-20 min-h-screen bg-white">
      <Section className="!py-16">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-sm font-semibold tracking-[0.2em] text-zinc-400 uppercase mb-4">
            404
          </p>

          <h1 className="text-4xl md:text-6xl font-display font-bold text-zinc-900 mb-6">
            Không tìm thấy trang
          </h1>

          <p className="text-lg text-zinc-500 leading-relaxed mb-8">
            Trang bạn đang tìm có thể đã bị xoá, đổi đường dẫn hoặc hiện không tồn tại.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/"
              className="px-6 py-3 rounded-full bg-zinc-900 text-white font-medium hover:bg-zinc-800 transition-colors"
            >
              Về trang chủ
            </Link>
          </div>
        </div>
      </Section>
    </div>
  );
};

export default NotFoundPage;