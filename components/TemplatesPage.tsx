import React, { useState, useEffect } from 'react';
import { Section } from './ui/Section';
import { Button } from './ui/Button';
import { Check, Star, ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import { Link } from 'react-router-dom';
import { useLoginGuard } from '../hooks/useLoginGuard';

import { ProductService } from '../services/productService';
import { adaptProductToTemplate } from '../adapters/productAdapter';

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
    <div className="pt-24 pb-20 min-h-screen bg-white">
      <LoginGuardModal />
      <Section className="!py-10">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-display font-bold text-zinc-900 mb-4 tracking-tight">
              Latest Templates
            </h1>
            <p className="text-lg text-zinc-500">
              Premium systems to accelerate your workflow. Duplicatable to your workspace in seconds.
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
              className="group bg-white rounded-2xl border border-zinc-200 overflow-hidden hover:shadow-[0_20px_40px_-15px_rgba(168,85,247,0.15)] hover:border-brand-200 transition-all duration-300 flex flex-col"
            >
              {/* Thumbnail */}
              <Link to={`/templates/${template.slug}`} className="relative h-56 overflow-hidden block cursor-pointer">
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
                    <h3 className="text-xl font-bold text-zinc-900 font-display">
                      {template.title}
                    </h3>
                  </div>
                </Link>

                <p className="text-sm text-zinc-500 mb-6 leading-relaxed">
                  {template.description}
                </p>

                {/* Features List */}
                <div className="space-y-2 mb-8 flex-1">
                  {template.features.map((feature: string, idx: number) => (
                    <div key={idx} className="flex items-center gap-2.5">
                      <div className="flex-shrink-0 w-4 h-4 rounded-full bg-green-50 flex items-center justify-center">
                        <Check className="w-3 h-3 text-green-600" strokeWidth={3} />
                      </div>
                      <span className="text-sm text-zinc-600">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Footer */}
                <div className="pt-5 border-t border-zinc-50 flex flex-col gap-4">
                  <div className="flex justify-between items-center">
                    <div>
                      {template.originalPrice && (
                        <div className="text-sm text-zinc-400 line-through font-medium mb-1">
                          {template.originalPrice}
                        </div>
                      )}
                      <div className="text-2xl font-bold text-zinc-900 tracking-tight">
                        {template.price}
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
                      <ShoppingCart size={16} /> Add to Cart
                    </Button>
                    <Link to={`/templates/${template.slug}`} className="w-full">
                      <Button
                        variant="secondary"
                        size="sm"
                        className="w-full flex items-center justify-center gap-2 bg-zinc-50 border-zinc-200 hover:border-brand-200 hover:text-brand-600"
                      >
                        View Details
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
  );
};

export default TemplatesPage;
