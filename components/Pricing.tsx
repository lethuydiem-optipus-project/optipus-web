import React, { useEffect, useState } from "react";
import { Section } from "./ui/Section";
import { Button } from "./ui/Button";
import { Star, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";

import { useCart } from "../context/CartContext";
import { useToast } from "../context/ToastContext";
import { useLoginGuard } from "../hooks/useLoginGuard";

import { ProductService } from "../services/productService";
import { adaptProductToTemplate } from "../adapters/productAdapter";
import { trackEvent } from '../services/analytics';

const Pricing: React.FC = () => {
  const [templates, setTemplates] = useState<any[]>([]);

  const { addToCart } = useCart();
  const { showToast } = useToast();
  const { requireAuth, LoginGuardModal } = useLoginGuard();

  useEffect(() => {
    ProductService.getAll().then((products) => {
      const adapted = products.map(adaptProductToTemplate);

      // 🔥 SORT
      const topTemplates = adapted
        .sort((a, b) => {
          if (b.rating !== a.rating) {
            return b.rating - a.rating; // rating cao trước
          }
          return b.price - a.price; // nếu rating bằng → giá cao hơn trước
        })
        .slice(0, 3);

      setTemplates(topTemplates);
    });
  }, []);

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
        type: "ADD_TO_CART",
        product: template,
        redirectAfter: "/templates",
      }
    );
  };

  return (
    <Section id="pricing" className="bg-white">
      <LoginGuardModal />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
        <div className="max-w-2xl">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-zinc-900 mb-4 tracking-tight">
            Templates Tiêu Biểu
          </h2>

          <p className="text-lg text-zinc-500">
            Những template được đánh giá cao nhất bởi người dùng.
          </p>
        </div>

        <Link to="/templates">
          <Button variant="secondary">Xem tất cả</Button>
        </Link>
      </div>

      {/* Templates */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {templates.map((template) => (
          <div
            key={template.id}
            className="group bg-white rounded-2xl border border-zinc-200 overflow-hidden hover:shadow-[0_20px_40px_-15px_rgba(168,85,247,0.15)] hover:border-brand-200 transition-all duration-300 flex flex-col h-full"
          >
            {/* Thumbnail */}
            <Link
              to={`/templates/${template.slug}`}
              className="relative aspect-square overflow-hidden rounded-t-2xl block"
            >
              <img
                src={template.image}
                alt={template.title}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-60"></div>

              {/* Category */}
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
              <Link
                to={`/templates/${template.slug}`}
                className="block group-hover:text-brand-600 transition-colors"
              >
                <h3 className="text-lg font-bold text-zinc-900 font-display mb-3">
                  {template.title}
                </h3>
              </Link>

              <p className="text-xs text-zinc-500 leading-relaxed line-clamp-2 min-h-[40px]">
                {template.description}
              </p>

              <div className="w-32 h-0.5 bg-brand-500 my-3 mx-auto"></div>

              {/* Footer */}
              <div className="mt-auto flex flex-col gap-4">
                <div className="flex justify-between items-center">
                  <div>
                    {template.originalPrice && (
                      <div className="text-sm text-zinc-400 line-through font-medium">
                        {template.originalPrice.toLocaleString("vi-VN")}đ
                      </div>
                    )}

                    <div className="text-2xl font-bold text-zinc-900">
                      {template.price.toLocaleString("vi-VN")}đ
                    </div>
                  </div>

                  <div className="flex items-center gap-1 bg-zinc-50 px-2 py-1 rounded text-xs font-bold text-zinc-600">
                    <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                    {template.rating}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <Button
                    variant="primary"
                    size="sm"
                    className="flex items-center justify-center gap-2"
                    onClick={(e) => handleAddToCart(e, template)}
                  >
                    <ShoppingCart size={16} /> Thêm giỏ hàng
                  </Button>

                  <Link to={`/templates/${template.slug}`}>
                    <Button
                      variant="secondary"
                      size="sm"
                      className="w-full bg-zinc-50 border-zinc-200 hover:border-brand-200 hover:text-brand-600"
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
  );
};

export default Pricing;