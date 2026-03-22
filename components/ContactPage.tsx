
import { Helmet } from "react-helmet-async";
import React, { useState } from 'react';
import { Section } from './ui/Section';
import { Button } from './ui/Button';
import { Facebook, Instagram, Phone, Video, Mail, Send } from 'lucide-react';
import { SuccessModal } from './ui/SuccessModal';

const ContactPage: React.FC = () => {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formState);
    setIsSuccessOpen(true);
    setFormState({ name: '', email: '', message: '' });
  };

  const contactChannels = [
    {
      name: 'TikTok',
      icon: <Video className="w-6 h-6" />,
      link: 'https://www.tiktok.com/@optipus.notion',
      description: 'Follow video ngắn',
      color: 'hover:text-pink-500 hover:border-pink-200 hover:bg-pink-50'
    },
    {
      name: 'Facebook',
      icon: <Facebook className="w-6 h-6" />,
      link: 'https://www.facebook.com/optipus.vn',
      description: 'Fanpage chính thức',
      color: 'hover:text-blue-600 hover:border-blue-200 hover:bg-blue-50'
    },
    {
      name: 'Hotline / Zalo',
      icon: <Phone className="w-6 h-6" />,
      link: 'https://zalo.me/0988971620',
      description: '098 897 1620',
      color: 'hover:text-green-600 hover:border-green-200 hover:bg-green-50'
    },
    {
      name: 'Instagram',
      icon: <Instagram className="w-6 h-6" />,
      link: 'https://www.instagram.com/optipus_tp_notion',
      description: 'Behind the scenes',
      color: 'hover:text-orange-600 hover:border-orange-200 hover:bg-orange-50'
    }
  ];

  return (
    <>
      <Helmet>
        <title>Liên Hệ OptiPus | Hỗ Trợ Template Notion</title>

        <meta
          name="description"
          content="Liên hệ OptiPus để được hỗ trợ về template Notion, hợp tác hoặc gửi góp ý. Kết nối với chúng tôi qua Facebook, TikTok, Zalo hoặc gửi tin nhắn trực tiếp."
        />

        <meta
          property="og:title"
          content="Liên Hệ OptiPus | Hỗ Trợ Template Notion"
        />

        <meta
          property="og:description"
          content="Kết nối với OptiPus qua Facebook, TikTok, Zalo hoặc gửi tin nhắn trực tiếp."
        />

        <meta property="og:image" content="/og-cover.png" />
      </Helmet>

      <div className="pt-24 pb-20 min-h-screen bg-white">

      <SuccessModal 
        isOpen={isSuccessOpen} 
        onClose={() => setIsSuccessOpen(false)} 
      />
      
      <Section className="!py-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-6xl font-display font-bold text-zinc-900 mb-6 tracking-tight">
            Liên Hệ <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-accent-500">OptiPus</span>
          </h1>
          <p className="text-sm md:text-base text-zinc-500 leading-relaxed">
            Bạn có câu hỏi hoặc góp ý? <br /> Kết nối ngay với chúng tôi qua các kênh bên dưới hoặc gửi tin nhắn trực tiếp.
          </p>
        </div>

        {/* Social Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {contactChannels.map((channel, idx) => (
            <a
              key={idx}
              href={channel.link}
              className={`group flex flex-col items-center text-center p-8 bg-white rounded-2xl border border-zinc-100 transition-all duration-300 hover:shadow-lg ${channel.color}`}
            >
              <div className="w-12 h-12 rounded-full bg-zinc-50 flex items-center justify-center text-zinc-600 mb-4 group-hover:scale-110 transition-transform duration-300 border border-zinc-100 group-hover:bg-white">
                {channel.icon}
              </div>
              <h3 className="text-lg font-bold text-zinc-900 mb-1">{channel.name}</h3>
              <p className="text-sm text-zinc-500">{channel.description}</p>
            </a>
          ))}
        </div>

        {/* Feedback Form */}
        <div className="max-w-2xl mx-auto bg-white rounded-3xl border border-zinc-100 p-8 md:p-12 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)]">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-full bg-brand-50 flex items-center justify-center text-brand-600">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-zinc-900">Gửi Góp Ý</h2>
              <p className="text-sm text-zinc-500">Chúng tôi sẽ phản hồi sớm nhất có thể.</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-700">Tên của bạn (Tùy chọn)</label>
                <input
                  type="text"
                  value={formState.name}
                  onChange={(e) => setFormState({...formState, name: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border border-zinc-200 bg-zinc-50/50 focus:bg-white focus:ring-2 focus:ring-brand-100 focus:border-brand-300 outline-none transition-all placeholder:text-zinc-400"
                  placeholder="Nhập tên..."
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-700">Email <span className="text-red-500">*</span></label>
                <input
                  type="email"
                  required
                  value={formState.email}
                  onChange={(e) => setFormState({...formState, email: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border border-zinc-200 bg-zinc-50/50 focus:bg-white focus:ring-2 focus:ring-brand-100 focus:border-brand-300 outline-none transition-all placeholder:text-zinc-400"
                  placeholder="email@example.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-700">Nội dung <span className="text-red-500">*</span></label>
              <textarea
                required
                rows={4}
                value={formState.message}
                onChange={(e) => setFormState({...formState, message: e.target.value})}
                className="w-full px-4 py-3 rounded-xl border border-zinc-200 bg-zinc-50/50 focus:bg-white focus:ring-2 focus:ring-brand-100 focus:border-brand-300 outline-none transition-all placeholder:text-zinc-400 resize-none"
                placeholder="Chia sẻ ý kiến của bạn..."
              />
            </div>

            <Button type="submit" size="lg" className="w-full md:w-auto shadow-lg shadow-brand-500/20">
              Gửi Tin Nhắn <Send className="w-4 h-4 ml-2" />
            </Button>
          </form>
        </div>
      </Section>
    </div>
    </>
  );
};

export default ContactPage;
