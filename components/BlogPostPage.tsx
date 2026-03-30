
import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Section } from './ui/Section';
import { BlogService, BlogPost } from '../data/blogPosts';
import { ArrowLeft, Calendar, Clock, User, Facebook, Twitter, Linkedin, Loader2, Instagram } from 'lucide-react';

const BlogPostPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch post data
  useEffect(() => {
    const loadPost = async () => {
      setLoading(true);
      if (!slug) return;
      
      const foundPost = await BlogService.getPostBySlug(slug);
      
      if (foundPost) {
        setPost(foundPost);
        // Dynamic SEO Title
        document.title = `${foundPost.title} - OptiPus Blog`;
      } else {
        // Handle 404
        navigate('/blog');
      }
      setLoading(false);
    };

    loadPost();

    // Cleanup title on unmount
    return () => {
      document.title = 'Optipus | Template Notion Quản Lý Cuộc Sống & Công Việc';
    };
  }, [slug, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <Loader2 className="w-8 h-8 animate-spin text-brand-600" />
      </div>
    );
  }

  if (!post) return null;

  return (
    <article className="pt-24 pb-20 min-h-screen bg-white">
      {/* Hero Header */}
      <div className="bg-zinc-50 border-b border-zinc-100 pb-16 pt-10">
        <Section className="!py-0">
          <Link to="/blog" className="inline-flex items-center text-sm font-medium text-zinc-500 hover:text-brand-600 transition-colors mb-8">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Blog
          </Link>
          
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block px-3 py-1 rounded-full bg-brand-50 border border-brand-100 text-brand-700 text-xs font-bold uppercase tracking-wider mb-6">
              {post.category}
            </div>
            
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-display font-bold text-zinc-900 mb-8 leading-tight">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-zinc-500">
              <div className="flex items-center gap-2">
                 <div className="w-8 h-8 rounded-full bg-white border border-zinc-200 flex items-center justify-center text-zinc-400">
                    <User size={14} />
                 </div>
                 <span className="font-medium text-zinc-900">{post.author}</span>
              </div>
              <div className="flex items-center gap-2">
                 <Calendar size={16} />
                 <span>{post.date}</span>
              </div>
              <div className="flex items-center gap-2">
                 <Clock size={16} />
                 <span>{post.readTime}</span>
              </div>
            </div>
          </div>
        </Section>
      </div>

      {/* Featured Image */}
      <div className="max-w-5xl mx-auto px-6 -mt-10 mb-16 relative z-10">
        <div className="aspect-video w-full rounded-2xl overflow-hidden shadow-2xl shadow-zinc-200/50 border border-zinc-200">
          <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
        </div>
      </div>

      {/* Content Body */}
      <Section className="!py-0">
        <div className="max-w-5xl mx-auto px-6">
          
          {/* Main Content - Rendering Raw HTML */}
          <div >
            <div
              className="prose prose-zinc max-w-none
              prose-headings:font-display prose-headings:font-bold prose-headings:text-zinc-900
              prose-p:text-zinc-700 prose-p:text-[17px]
              prose-strong:text-zinc-900
              prose-li:text-zinc-700 prose-li:text-[17px] prose-li:text-justify
              prose-img:rounded-2xl prose-img:shadow-md prose-img:my-8
              prose-ul:my-6 prose-ul:pl-5
              prose-ol:my-6 prose-ol:pl-5
              [&>h2]:text-3xl [&>h2]:leading-tight [&>h2]:mt-14 [&>h2]:mb-6 [&>h2]:font-display [&>h2]:font-bold [&>h2]:text-zinc-900
              [&>h3]:text-2xl [&>h3]:leading-snug [&>h3]:mt-10 [&>h3]:mb-4 [&>h3]:font-display [&>h3]:font-bold [&>h3]:text-zinc-900
              [&>p]:mb-6
              [&>blockquote]:border-l-4 [&>blockquote]:border-brand-300 [&>blockquote]:pl-4 [&>blockquote]:italic [&>blockquote]:text-zinc-600
              [&_a]:font-semibold [&_a]:text-brand-700 [&_a]:underline [&_a]:decoration-2 [&_a]:underline-offset-4 hover:[&_a]:text-brand-600
              [&_.blog-float-wrap]:not-prose
              [&_.blog-float-wrap]:my-10
              [&_.blog-float-image]:float-none
              [&_.blog-float-image]:w-full
              [&_.blog-float-image]:max-w-full
              [&_.blog-float-image]:mb-6
              md:[&_.blog-float-image]:float-right
              md:[&_.blog-float-image]:w-[380px]
              md:[&_.blog-float-image]:ml-8
              md:[&_.blog-float-image]:mb-4
              [&_.blog-float-image_img]:w-full
              [&_.blog-float-image_img]:rounded-2xl
              [&_.blog-float-image_img]:shadow-md
              [&_.blog-float-wrap_p]:text-zinc-700
              [&_.blog-float-wrap_p]:text-[17px]
              [&_.blog-float-wrap_p]:mb-5
              [&_.blog-float-wrap]:after:block
              [&_.blog-float-wrap]:after:clear-both
              [&>p]:mb-5
              [&_p]:text-justify
              [&_.blog-float-wrap_p]:leading-[1.55]
              [&_.blog-float-wrap_p]:text-justify
              [&_p]:leading-[1.55]
              [&_p]:text-justify
              [&_p]:text-zinc-700
              [&_li]:leading-[1.55]
              "
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

             {/* Share / Tags Footer */}
             <div className="mt-16 pt-8 border-t border-zinc-100 flex flex-col sm:flex-row justify-between items-center gap-6">
                <p className="text-zinc-400 text-sm font-medium">Chia sẻ bài viết:</p>
                <div className="flex gap-2">
                   <button className="p-2 rounded-full border border-zinc-200 text-zinc-500 hover:text-brand-600 hover:border-brand-200 transition-colors">
                      <Instagram size={18} />
                   </button>
                   <button className="p-2 rounded-full border border-zinc-200 text-zinc-500 hover:text-blue-600 hover:border-blue-200 transition-colors">
                      <Facebook size={18} />
                   </button>
                   <button className="p-2 rounded-full border border-zinc-200 text-zinc-500 hover:text-blue-700 hover:border-blue-200 transition-colors">
                      <Linkedin size={18} />
                   </button>
                </div>
             </div>
          </div>

        </div>
      </Section>
    </article>
  );
};

export default BlogPostPage;
