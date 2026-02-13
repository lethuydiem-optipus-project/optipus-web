
import React from 'react';
import { Section } from './ui/Section';
import { Button } from './ui/Button';
import { Star, ArrowRight, ArrowUpRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { templates } from '../data/templates';

const Pricing: React.FC = () => {
  const navigate = useNavigate();

  // Select the first 3 templates to display as pricing options
  const displayedTemplates = templates.slice(0, 3);

  const handleNavigate = (id: string) => {
    navigate(`/templates/${id}`);
  };

  return (
    <Section id="pricing" className="bg-white relative overflow-visible">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 relative z-10">
        <div className="max-w-2xl">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-zinc-900 mb-4 tracking-tight">
            Predictable Pricing.
          </h2>
          <p className="text-lg text-zinc-500">
            Transparent one-time costs. No hidden fees or subscriptions.
          </p>
        </div>
        <div className="flex-shrink-0">
            <Link to="/templates">
              <Button variant="outline" className="rounded-full px-6 group border-zinc-200">
                Explore more <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform"/>
              </Button>
            </Link>
        </div>
      </div>

      {/* Pricing Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
        {displayedTemplates.map((template, idx) => {
          // Simulate "featured" styling for the middle item or bestseller
          const isFeatured = idx === 1 || template.bestseller;
          
          return (
            <div 
              key={template.id} 
              onClick={() => handleNavigate(template.id)}
              className="group flex flex-col bg-white rounded-2xl border border-zinc-200 overflow-hidden hover:shadow-[0_20px_40px_-15px_rgba(168,85,247,0.15)] transition-all duration-300 transform hover:-translate-y-1 hover:scale-[1.02] cursor-pointer"
            >
              
              {/* Visual Thumbnail */}
              <div className="relative h-48 overflow-hidden bg-zinc-100">
                 <img 
                   src={template.image} 
                   alt={template.title} 
                   className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 group-hover:-translate-y-2"
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                 
                 {/* Category Badge */}
                 <div className="absolute top-4 left-4 z-20">
                   <span className={`text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wider backdrop-blur-md shadow-sm border ${
                     isFeatured 
                       ? 'bg-brand-500/90 text-white border-brand-400' 
                       : 'bg-white/90 text-zinc-800 border-white/50'
                   }`}>
                     {template.category}
                   </span>
                 </div>
              </div>

              {/* Card Content */}
              <div className="p-6 flex flex-col flex-1">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-zinc-900 font-display">{template.title}</h3>
                  {/* Rating Badge */}
                  <div className="flex items-center gap-1 bg-zinc-50 border border-zinc-100 px-2 py-1 rounded-full text-[11px] font-bold text-zinc-700">
                    <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                    {template.rating}
                  </div>
                </div>

                <p className="text-sm text-zinc-500 mb-6 leading-relaxed line-clamp-2">
                  {template.description}
                </p>

                {/* Tags/Features */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {template.features.slice(0, 2).map((tag, tIdx) => (
                    <span key={tIdx} className="text-[10px] font-semibold bg-zinc-50 border border-zinc-100 text-zinc-500 px-2.5 py-1 rounded-full uppercase tracking-wide">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Card Footer: Price & Action */}
                <div className="mt-auto flex items-center justify-between pt-5 border-t border-zinc-50">
                   <div className="flex flex-col">
                     {/* Price Display */}
                     {template.originalPrice && (
                       <span className="text-sm font-medium text-zinc-400 line-through mb-1 decoration-zinc-300">
                         {template.originalPrice}
                       </span>
                     )}
                     <div className="flex items-baseline gap-1">
                       <span className="text-4xl font-bold text-zinc-900 tracking-tighter">{template.price}</span>
                       <span className="text-xs font-bold text-zinc-400 uppercase tracking-wide">USD</span>
                     </div>
                   </div>
                   <Button 
                     variant="outline" 
                     size="sm" 
                     className="rounded-full px-5 border-zinc-200 text-zinc-600 hover:text-brand-600 hover:border-brand-200 hover:bg-brand-50 group/btn"
                     onClick={(e) => {
                       e.stopPropagation();
                       handleNavigate(template.id);
                     }}
                   >
                     View details <ArrowUpRight className="w-3 h-3 ml-1 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                   </Button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Section>
  );
};

export default Pricing;
