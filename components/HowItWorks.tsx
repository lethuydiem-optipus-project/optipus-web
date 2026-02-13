
import React from 'react';
import { Section } from './ui/Section';
import { Button } from './ui/Button';
import { Link } from 'react-router-dom';

const HowItWorks: React.FC = () => {
  return (
    <Section id="how-it-works" className="bg-white py-24 md:py-32 relative overflow-hidden">
      {/* Background Aura */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-brand-100/40 blur-[120px] rounded-full pointer-events-none z-0 mix-blend-multiply"></div>

      <div className="relative z-10 flex flex-col items-center text-center mb-20 max-w-3xl mx-auto px-4">
        {/* Pill Label */}
        <div className="inline-block px-4 py-1.5 mb-8 rounded-full border border-brand-100 bg-brand-50/80 backdrop-blur-sm shadow-sm">
            <span className="text-xs font-bold tracking-[0.15em] text-brand-600 uppercase">
                Methodology
            </span>
        </div>
        
        {/* Headline */}
        <h2 className="text-4xl md:text-6xl font-display font-bold text-zinc-900 mb-6 leading-tight tracking-tight">
          How ProNotion <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-purple-400">Works</span>
        </h2>
        
        {/* Subtitle */}
        <p className="text-lg md:text-xl text-zinc-500 leading-relaxed">
           A unified platform that streamlines the journey from raw data to actionable foresight. Connect your sources, train models continuously, and prevent incidents.
        </p>
      </div>

      {/* Steps Row */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-0 mb-16 max-w-7xl mx-auto">
        {/* Step 1 */}
        <div className="flex flex-col items-center text-center px-6 relative group">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-brand-50 to-brand-100 border border-brand-200 flex items-center justify-center text-2xl font-bold text-brand-700 mb-6 shadow-sm group-hover:scale-110 transition-transform duration-500">
            1
          </div>
          <h3 className="text-xl font-bold text-zinc-900 mb-3 group-hover:text-brand-700 transition-colors">Connect Your Data</h3>
          <p className="text-zinc-500 text-sm leading-relaxed max-w-xs mx-auto">
            Integrate ProNotion with your existing workspace. It automatically ingests your schema and normalizes historical data.
          </p>
          
          {/* Mobile Divider (Bottom) */}
          <div className="md:hidden w-full h-px bg-zinc-100 mt-12"></div>
        </div>

        {/* Vertical Divider 1 (Desktop) */}
        <div className="hidden md:block absolute top-4 bottom-4 left-1/3 w-px bg-gradient-to-b from-transparent via-zinc-200/50 to-transparent"></div>

        {/* Step 2 */}
        <div className="flex flex-col items-center text-center px-6 relative group">
           <div className="w-16 h-16 rounded-full bg-gradient-to-br from-brand-50 to-brand-100 border border-brand-200 flex items-center justify-center text-2xl font-bold text-brand-700 mb-6 shadow-sm group-hover:scale-110 transition-transform duration-500 delay-100">
            2
          </div>
          <h3 className="text-xl font-bold text-zinc-900 mb-3 group-hover:text-brand-700 transition-colors">Continuous Learning</h3>
          <p className="text-zinc-500 text-sm leading-relaxed max-w-xs mx-auto">
            ProNotion trains custom models on your specific environment, constantly refining its accuracy as new data flows in.
          </p>

          {/* Mobile Divider (Bottom) */}
          <div className="md:hidden w-full h-px bg-zinc-100 mt-12"></div>
        </div>

        {/* Vertical Divider 2 (Desktop) */}
        <div className="hidden md:block absolute top-4 bottom-4 left-2/3 w-px bg-gradient-to-b from-transparent via-zinc-200/50 to-transparent"></div>

        {/* Step 3 */}
        <div className="flex flex-col items-center text-center px-6 relative group">
           <div className="w-16 h-16 rounded-full bg-gradient-to-br from-brand-50 to-brand-100 border border-brand-200 flex items-center justify-center text-2xl font-bold text-brand-700 mb-6 shadow-sm group-hover:scale-110 transition-transform duration-500 delay-200">
            3
          </div>
          <h3 className="text-xl font-bold text-zinc-900 mb-3 group-hover:text-brand-700 transition-colors">Predict & Prevent</h3>
          <p className="text-zinc-500 text-sm leading-relaxed max-w-xs mx-auto">
            View forecasts on dashboards or trigger webhooks to automate preventative actions. One-click integrations make execution seamless.
          </p>
        </div>
      </div>

      {/* CTA */}
      <div className="relative z-10 flex justify-center mt-12">
        <Link to="/templates">
          <Button size="lg" className="rounded-full px-10 shadow-lg shadow-brand-500/20 hover:shadow-brand-500/40">
            Get Started
          </Button>
        </Link>
      </div>
    </Section>
  );
};

export default HowItWorks;
