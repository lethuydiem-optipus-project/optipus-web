import { Helmet } from "react-helmet-async";
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Section } from './ui/Section';
import { Button } from './ui/Button';
import { ShoppingCart, Star, Check, Zap, ShieldCheck } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import { useLoginGuard } from '../hooks/useLoginGuard';

import { ProductService } from '../services/productService';
import { adaptProductToTemplate } from '../adapters/productAdapter';
import { trackEvent } from '../services/analytics';

const TemplateDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { showToast } = useToast();
  const { requireAuth, LoginGuardModal } = useLoginGuard();

  const [activeTab, setActiveTab] = useState<'description' | 'additional'>('description');
  const [template, setTemplate] = useState<any>(null);
  const [allTemplates, setAllTemplates] = useState<any[]>([]);
  const [activeImage, setActiveImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [galleryIndex, setGalleryIndex] = useState(0);

  useEffect(() => {
    if (!slug) return;

    const loadData = async () => {
      setLoading(true);

      const product = await ProductService.getBySlug(slug);
      const all = await ProductService.getAll();

      if (product) {
        const adapted = adaptProductToTemplate(product);
        setTemplate(adapted);

        // set ảnh chính
        setActiveImage(adapted.image);
        // TRACK VIEW TEMPLATE (GA4)
        trackEvent("view_template", {
          template_name: adapted.title,
          template_slug: adapted.slug,
          price: adapted.price
        });

      } else {
        setTemplate(null);
      }

      setAllTemplates(all.map(adaptProductToTemplate));

      setLoading(false);
      window.scrollTo(0, 0);
    };

    loadData();
  }, [slug]);



  if (loading) {
    return (
      <div className="pt-32 pb-20 min-h-screen flex items-center justify-center">
        <div className="text-zinc-400 text-lg">Loading template...</div>
      </div>
    );
  }

  if (!template) {
    return (
      <div className="pt-32 pb-20 min-h-screen bg-white text-center">
        <h2 className="text-2xl font-bold">Template Not Found</h2>
        <Button onClick={() => navigate('/templates')} className="mt-4">
          Back to Templates
        </Button>
      </div>
    );
  }


  const handleAddToCart = (e: React.MouseEvent) => {
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
        redirectAfter: `/templates/${template.slug}`,
      }
    );
  };

  const handleBuyNow = () => {
  trackEvent("buy_now_click", {
    template_name: template.title,
    template_slug: template.slug,
    price: template.price
  });
    requireAuth(
      () => {
        navigate('/checkout', { state: { directPurchase: template } });
      },
      {
        type: 'BUY_NOW',
        product: template,
        redirectAfter: '/checkout',
      }
    );
  };

  const relatedTemplates = allTemplates
    .filter(t => t.id !== template.id)
    .slice(0, 3);


  const finalRelated =
    relatedTemplates.length < 3
      ? [
          ...relatedTemplates,
          ...allTemplates.filter(
            (t) => t.id !== template.id && t.category !== template.category
          ),
        ].slice(0, 3)
      : relatedTemplates;

  const galleryImages = [
    template.image,
    ...(template.gallery || [])
  ];

  const nextGallery = () => {
    if (galleryIndex + 4 < galleryImages.length) {
      setGalleryIndex(galleryIndex + 1);
    }
  };

  const prevGallery = () => {
    if (galleryIndex > 0) {
      setGalleryIndex(galleryIndex - 1);
    }
  };

  return (
    <>
      <Helmet prioritizeSeoTags>

      <title>
      {template
      ? `${template.title} Notion Template | Optipus`
      : "Template Notion | Optipus"}
      </title>

      <meta
      name="description"
      content={template?.shortDescription  || ""}
      />

      <meta
      name="keywords"
      content={`${template?.title || ""}, template notion, notion template`}
      />

      <link
      rel="canonical"
      href={
      template
      ? `https://optipus.vn/templates/${template.slug}`
      : "https://optipus.vn/templates"
      }
      />

      <meta name="robots" content="index, follow" />

      <meta name="author" content="Optipus" />

      <meta
      property="og:title"
      content={template ? `${template.title} | Optipus` : "Template Notion | Optipus"}
      />

      <meta
      property="og:description"
      content={template?.short_description || ""}
      />

      <meta
      property="og:image"
      content={template?.image || "/og-cover.png"}
      />

      <meta
      property="og:url"
      content={
      template
      ? `https://optipus.vn/templates/${template.slug}`
      : "https://optipus.vn/templates"
      }
      />

      <meta property="og:type" content="product" />

      </Helmet>

      <div className="pt-24 pb-20 min-h-screen bg-white">

      <LoginGuardModal />
      <Section className="!py-10">
        {/* Breadcrumb */}
        <div className="text-sm text-zinc-500 mb-8 flex items-center gap-2">
          <Link to="/templates" className="hover:text-brand-600">
            Templates
          </Link>
          <span>/</span>
          <span className="text-zinc-900 font-medium">
            {template.title}
          </span>
        </div>


        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 mb-20">
          {/* Images */}
          <div className="space-y-4">
            <div className="aspect-square w-full rounded-2xl overflow-hidden bg-zinc-100 border border-zinc-200 flex items-center justify-center">
              <img
                src={activeImage || template.image}
                alt={template.title}
                className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105"
                onError={(e) => {
                  e.currentTarget.src = template.image;
                }}
              />
            </div>

            {/* Gallery */}
{/* Gallery Carousel */}
            <div className="relative">

              {/* Thumbnails */}
              <div className="grid grid-cols-4 gap-4">
                {galleryImages
                  .slice(galleryIndex, galleryIndex + 4)
                  .map((img: string, i: number) => (
                    <button
                      key={i}
                      onClick={() => setActiveImage(img)}
                      className={`aspect-square rounded-lg overflow-hidden border transition-all ${
                        activeImage === img
                          ? "border-brand-500 ring-2 ring-brand-100"
                          : "border-zinc-200 hover:border-zinc-300"
                      }`}
                    >
                      <img
                        src={img}
                        className="w-full h-full object-contain"
                      />
                    </button>
                  ))}
              </div>

              {/* Prev */}
              {galleryIndex > 0 && (
                <button
                  onClick={prevGallery}
                  className="absolute -left-4 top-1/2 -translate-y-1/2 bg-white shadow-md border rounded-full w-8 h-8 flex items-center justify-center"
                >
                  ‹
                </button>
              )}

              {/* Next */}
              {galleryIndex + 4 < galleryImages.length && (
                <button
                  onClick={nextGallery}
                  className="absolute -right-4 top-1/2 -translate-y-1/2 bg-white shadow-md border rounded-full w-8 h-8 flex items-center justify-center"
                >
                  ›
                </button>
              )}

            </div>
          </div>

          {/* Details */}
          <div>
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="px-3 py-1 rounded-full bg-brand-50 text-brand-700 text-xs font-bold uppercase tracking-wider border border-brand-100">
                {template.category}
              </span>
              {template.bestseller && (
                <span className="px-3 py-1 rounded-full bg-amber-50 text-amber-700 text-xs font-bold uppercase tracking-wider border border-amber-100 flex items-center gap-1">
                  <Zap size={12} fill="currentColor" /> Bestseller
                </span>
              )}
            </div>

            <h1 className="text-4xl md:text-5xl font-display font-bold text-zinc-900 mb-4">
              {template.title}
            </h1>

            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-1 text-yellow-500">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={18}
                    fill={i < Math.floor(template.rating) ? 'currentColor' : 'none'}
                    className={i >= Math.floor(template.rating) ? 'text-zinc-300' : ''}
                  />
                ))}
              </div>
              <span className="text-sm text-zinc-500">(24 Reviews)</span>
            </div>

            <div className="flex items-baseline gap-3 mb-8 pb-8 border-b border-zinc-100">
              <span className="text-4xl font-bold text-zinc-900">{template.price.toLocaleString("vi-VN")}đ</span>
              {template.originalPrice && (
                <span className="text-xl text-zinc-400 line-through">
                  {template.originalPrice.toLocaleString("vi-VN")}đ
                </span>
              )}
            </div>

            <p className="text-lg text-zinc-600 mb-8">
              {template.description}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Button size="lg" className="flex-1" onClick={handleAddToCart}>
                <ShoppingCart size={20} className="mr-2" /> Add to Cart
              </Button>
              <Button
                variant="secondary"
                size="lg"
                className="flex-1 border-brand-200 hover:bg-brand-50 text-brand-700"
                onClick={handleBuyNow}
              >
                Buy Now
              </Button>
            </div>

            <div className="bg-zinc-50 rounded-xl p-5 space-y-3 border border-zinc-100">
              <div className="flex items-center gap-3 text-sm text-zinc-600">
                <Check size={18} className="text-green-500" /> Instant Download
              </div>
              <div className="flex items-center gap-3 text-sm text-zinc-600">
                <Check size={18} className="text-green-500" /> Lifetime Updates
              </div>
              <div className="flex items-center gap-3 text-sm text-zinc-600">
                <ShieldCheck size={18} className="text-brand-500" /> 30-Day Money Back Guarantee
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-20">
          <div className="flex gap-8 border-b border-zinc-200 mb-8">
            <button
              onClick={() => setActiveTab('description')}
              className={`pb-4 text-lg font-bold ${
                activeTab === 'description'
                  ? 'text-brand-600 border-b-2 border-brand-600'
                  : 'text-zinc-400'
              }`}
            >
              Description
            </button>
            <button
              onClick={() => setActiveTab('additional')}
              className={`pb-4 text-lg font-bold ${
                activeTab === 'additional'
                  ? 'text-brand-600 border-b-2 border-brand-600'
                  : 'text-zinc-400'
              }`}
            >
              Additional Information
            </button>
          </div>

          <div className="max-w-4xl text-zinc-600 space-y-4">
            {activeTab === 'description' ? (
              <>
                <p className="text-lg">{template.description}</p>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {template.features.map((f: string, i: number) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-brand-500 rounded-full" />
                      {f}
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <div>No additional information available.</div>
            )}
          </div>
        </div>

        {/* Related */}
        <div>
          <h3 className="text-2xl font-bold mb-8">You May Also Like</h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {finalRelated.map((item) => (
              <Link
                key={item.id + item.slug}
                to={`/templates/${item.slug}`}
                className="group block"
              >
                <div className="aspect-[16/10] rounded-xl overflow-hidden bg-zinc-100 mb-3 flex items-center justify-center">
                  <img
                    src={item.image}
                    className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                <h4 className="font-bold text-lg text-zinc-900 group-hover:text-brand-600 transition-colors">
                  {item.title}
                </h4>

                <div className="text-zinc-500 font-medium">
                  {item.price.toLocaleString("vi-VN")}đ
                </div>
              </Link>
            ))}
          </div>
        </div>

      </Section>
    </div>
    </>
  );
};

export default TemplateDetailPage;
