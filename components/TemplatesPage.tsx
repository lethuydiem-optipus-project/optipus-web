import { Helmet } from "react-helmet-async";
import React, { useState, useEffect } from 'react';
import { Section } from './ui/Section';
import { Button } from './ui/Button';
import { Star, ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import { Link } from 'react-router-dom';
import { useLoginGuard } from '../hooks/useLoginGuard';

import { ProductService } from '../services/productService';
import { adaptProductToTemplate } from '../adapters/productAdapter';
import { trackEvent } from '../services/analytics';

const categories = ['All', 'Education', 'Work', 'Lifestyle', 'Other'];

const TemplatesPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [templates, setTemplates] = useState<any[]>([]);

  const { addToCart } = useCart();
  const { showToast } = useToast();
  const { requireAuth, LoginGuardModal } = useLoginGuard();

  useEffect(() => {
    ProductService.getAll().then((products) => {
      const adapted = products.map(adaptProductToTemplate);
      setTemplates(adapted);
    });
  }, []);

  const filteredTemplates =
    activeCategory === 'All'
      ? templates
      : templates.filter((t) => t.category === activeCategory);

  const handleAddToCart = (e: React.MouseEvent, template: any) => {
    e.preventDefault();
    e.stopPropagation();

    trackEvent("add_to_cart", {
      template_name: template.title,
      template_slug: template.slug,
      price: template.price
    });
    requireAuth(
      () => {
        addToCart(template);
        showToast(template);
      },
      {
        type: 'ADD_TO_CART',
        product: template,
        redirectAfter: '/templates',
      }
    );
  };

  return (
    <>
      <Helmet>
        <title>Kho Template Notion Quản Lý Công Việc & Học Tập | OptiPus</title>

        <meta
          name="description"
          content="Khám phá bộ sưu tập template Notion giúp quản lý công việc, lập kế hoạch nội dung và tăng năng suất. Phù hợp cho sinh viên, creator và marketer."
        />

        <meta
          property="og:title"
          content="Kho Template Notion Quản Lý Công Việc & Học Tập | OptiPus"
        />

        <meta
          property="og:description"
          content="Bộ template Notion giúp quản lý công việc, content và dự án hiệu quả."
        />

        <meta property="og:image" content="/og-cover.png" />
      </Helmet>

      <div className="pt-24 pb-20 min-h-screen bg-white">
      <LoginGuardModal />
      <Section className="!py-10">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap- mb-12">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-display font-bold text-zinc-900 mb-4 tracking-tight">
               Templates mới nhất
            </h1>
            <p className="text-lg text-zinc-500">
              Tối ưu quy trình với hệ thống quản trị thông minh. Nhân bản vào Workspace của bạn chỉ trong tích tắc.
            </p>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === cat
                  ? 'bg-zinc-900 text-white shadow-lg shadow-zinc-900/20 transform scale-105'
                  : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200 hover:text-zinc-900'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTemplates.map((template) => (
            <div
              key={template.id}
              // Thêm h-full để các card trong cùng 1 hàng luôn cao bằng nhau
              className="group bg-white rounded-2xl border border-zinc-200 overflow-hidden hover:shadow-[0_20px_40px_-15px_rgba(168,85,247,0.15)] hover:border-brand-200 transition-all duration-300 flex flex-col h-full"
            >
              {/* Thumbnail - Ảnh vuông 1:1, bo góc trên */}
              <Link to={`/templates/${template.slug}`}
              className="relative aspect-square overflow-hidden rounded-t-2xl block cursor-pointer">
                <img
                  src={template.image}
                  alt={template.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-60"></div>

                {/* Badges */}
                <div className="absolute top-4 left-4">
                  <span className="bg-white/90 backdrop-blur-md text-zinc-800 text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wider shadow-sm">
                    {template.category}
                  </span>
                </div>

                {template.bestseller && (
                  <div className="absolute top-4 right-4">
                    <span className="bg-brand-600 text-white text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wider shadow-lg shadow-brand-500/30">
                      Bestseller
                    </span>
                  </div>
                )}
              </Link>

              {/* Content */}
              <div className="p-6 flex flex-col flex-1">
                <Link to={`/templates/${template.slug}`} className="block group-hover:text-brand-600 transition-colors">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-lg font-bold text-zinc-900 font-display">
                      {template.title}
                    </h3>
                  </div>
                </Link>

                {/* Mô tả: Giới hạn 2 dòng, tự thêm "...", cố định chiều cao tối thiểu để card ko bị lệch */}
                <p className="text-xs text-zinc-500 mb-0 leading-relaxed line-clamp-2 min-h-[40px]">
                  {template.description}
                </p>
                <div className="w-32 h-0.5 bg-brand-500 mb-2 my-2 mx-auto"></div>
                {/* Footer - mt-auto đẩy phần này xuống sát đáy card */}
                <div className="pt-0 border-t border-zinc-50 flex flex-col gap-4">
                  <div className="flex justify-between items-center">
                    <div>
                      {template.originalPrice && (
                        <div className="text-sm text-zinc-400 line-through font-medium mb-1">
                          {template.originalPrice.toLocaleString("vi-VN")}đ
                        </div>
                      )}
                      <div className="text-2xl font-bold text-zinc-900 tracking-tight">
                        {template.price.toLocaleString("vi-VN")}đ
                      </div>
                    </div>
                    <div className="flex items-center gap-1 bg-zinc-50 px-2 py-1 rounded text-xs font-bold text-zinc-600">
                      <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" /> {template.rating}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <Button
                      variant="primary"
                      size="sm"
                      className="w-full flex items-center justify-center gap-2"
                      onClick={(e) => handleAddToCart(e, template)}
                    >
                      <ShoppingCart size={16} /> Thêm giỏ hàng
                    </Button>
                    <Link to={`/templates/${template.slug}`} className="w-full">
                      <Button
                        variant="secondary"
                        size="sm"
                        className="w-full flex items-center justify-center gap-2 bg-zinc-50 border-zinc-200 hover:border-brand-200 hover:text-brand-600"
                      >
                        Xem chi tiết
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>
    </div>
  </>  
  );
};

export default TemplatesPage;