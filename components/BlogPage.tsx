
import React, { useState, useEffect } from 'react';
import { Section } from './ui/Section';
import { Button } from './ui/Button';
import { ArrowRight, Clock, Calendar, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { BlogService, BlogPost } from '../data/blogPosts';

const categories = [
  'All',
  'Foundation',
  'Tutorials',
  'Comparison',
  'Templates',
  'Brand Story'
];

const BlogPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const data = await BlogService.getAllPosts();
        setPosts(data);
      } catch (error) {
        console.error("Failed to fetch posts", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const filteredPosts = activeCategory === 'All' 
    ? posts 
    : posts.filter(post => post.category === activeCategory);

  return (
    <div className="pt-24 pb-20 min-h-screen bg-white">
      <Section className="!py-10">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-6xl font-display font-bold text-zinc-900 mb-6 tracking-tight">
            Insights & <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-accent-500">Updates</span>
          </h1>
          <p className="text-lg md:text-xl text-zinc-500 leading-relaxed">
            Các bài viết chuyên sâu về hệ thống quản lý năng suất, hướng dẫn sử dụng template và xu hướng quản lý công việc trong tương lai
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-16">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === cat
                  ? 'bg-zinc-900 text-white shadow-lg shadow-zinc-900/20 scale-105'
                  : 'bg-white text-zinc-600 border border-zinc-200 hover:bg-zinc-50 hover:text-zinc-900 hover:border-zinc-300'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-brand-600" />
          </div>
        )}

        {/* Blog Grid */}
        {!loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <article 
                key={post.id} 
                className="group flex flex-col bg-white rounded-2xl border border-zinc-100 overflow-hidden hover:shadow-[0_20px_40px_-15px_rgba(168,85,247,0.1)] hover:border-brand-100 transition-all duration-300"
              >
                {/* Image Container */}
                <Link to={`/blog/${post.slug}`} className="relative h-56 overflow-hidden block">
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="bg-white/95 backdrop-blur-md text-zinc-800 text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wider shadow-sm border border-zinc-100">
                      {post.category}
                    </span>
                  </div>
                </Link>

                {/* Content */}
                <div className="p-6 flex flex-col flex-1">
                  {/* Meta Data */}
                  <div className="flex items-center gap-4 text-xs text-zinc-400 font-medium mb-4">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" />
                      {post.date}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" />
                      {post.readTime}
                    </div>
                  </div>

                  <Link to={`/blog/${post.slug}`} className="block">
                    <h2 className="text-xl font-bold text-zinc-900 font-display mb-3 leading-tight group-hover:text-brand-600 transition-colors">
                      {post.title}
                    </h2>
                  </Link>
                  
                  <p className="text-sm text-zinc-500 mb-6 leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>

                  <div className="mt-auto pt-6 border-t border-zinc-50 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-zinc-100 flex items-center justify-center text-[10px] font-bold text-zinc-500">
                          {post.author.charAt(0)}
                      </div>
                      <span className="text-xs font-medium text-zinc-500">{post.author}</span>
                    </div>
                    
                    <Link to={`/blog/${post.slug}`} className="text-sm font-bold text-brand-600 flex items-center gap-1 group/link cursor-pointer">
                      Đọc Thêm <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {!loading && filteredPosts.length === 0 && (
          <div className="text-center py-20">
            <p className="text-zinc-400 text-lg">No posts found in this category.</p>
            <Button 
              variant="outline" 
              className="mt-4"
              onClick={() => setActiveCategory('All')}
            >
              View all posts
            </Button>
          </div>
        )}
      </Section>
    </div>
  );
};

export default BlogPage;
