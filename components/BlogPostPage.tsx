
import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Section } from './ui/Section';
import { BlogService, BlogPost } from '../data/blogPosts';
import { ArrowLeft, Calendar, Clock, User, Facebook, Twitter, Linkedin, Loader2 } from 'lucide-react';

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
        document.title = `${foundPost.title} - ProNotion Blog`;
      } else {
        // Handle 404
        navigate('/blog');
      }
      setLoading(false);
    };

    loadPost();

    // Cleanup title on unmount
    return () => {
      document.title = 'ProNotion - High Performance Templates';
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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Main Content - Rendering Raw HTML */}
          <div className="lg:col-span-8 lg:col-start-3">
             <div 
               className="prose prose-lg prose-zinc max-w-none 
               prose-headings:font-display prose-headings:font-bold prose-headings:text-zinc-900 
               prose-p:text-zinc-600 prose-p:leading-relaxed 
               prose-a:text-brand-600 prose-a:no-underline hover:prose-a:text-brand-500
               prose-strong:text-zinc-900 
               prose-li:text-zinc-600
               [&>h3]:text-2xl [&>h3]:mt-10 [&>h3]:mb-4
               [&>p]:mb-6
               [&>ul]:list-disc [&>ul]:pl-5 [&>ul]:mb-6
               [&>ol]:list-decimal [&>ol]:pl-5 [&>ol]:mb-6
               "
               dangerouslySetInnerHTML={{ __html: post.content }}
             />

             {/* Share / Tags Footer */}
             <div className="mt-16 pt-8 border-t border-zinc-100 flex flex-col sm:flex-row justify-between items-center gap-6">
                <p className="text-zinc-400 text-sm font-medium">Share this article:</p>
                <div className="flex gap-2">
                   <button className="p-2 rounded-full border border-zinc-200 text-zinc-500 hover:text-brand-600 hover:border-brand-200 transition-colors">
                      <Twitter size={18} />
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
