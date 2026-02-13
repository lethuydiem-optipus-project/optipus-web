import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Zap, User, ShoppingBag, LogOut, ChevronDown } from 'lucide-react';
import { Button } from './ui/Button';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { AuthModal } from './auth/AuthModal';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Auth & Dropdown states
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authView, setAuthView] = useState<'login' | 'register'>('login');
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const location = useLocation();
  const { cartCount } = useCart();
  const { user, isAuthenticated, signOut } = useAuth();
  const userMenuRef = useRef<HTMLDivElement>(null);

  // ===== USER DISPLAY (SUPABASE SAFE) =====
  const displayName =
    user?.user_metadata?.name ||
    user?.email?.split('@')[0] ||
    'User';
  const displayRole =
    user?.user_metadata?.role || 'user';


  const displayInitial = displayName.charAt(0).toUpperCase();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);

    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  /* ================= AUTH ACTIONS ================= */

  const openLogin = () => {
    setAuthView('login');
    setIsAuthModalOpen(true);
    setIsMobileMenuOpen(false);
  };

  const openRegister = () => {
    setAuthView('register');
    setIsAuthModalOpen(true);
    setIsMobileMenuOpen(false);
  };

  const handleAvatarClick = () => {
    if (!isAuthenticated) {
      setAuthView('login');
      setIsAuthModalOpen(true);
      setIsMobileMenuOpen(false);
    } else {
      setIsUserMenuOpen((prev) => !prev);
    }
  };

  const handleLogout = async () => {
    await signOut();

    setIsUserMenuOpen(false);
    setAuthView('login');        // reset về login
    setIsAuthModalOpen(false);  // đảm bảo modal đóng
  };

  /* ================= NAV ACTIVE ================= */

  const isHome = location.pathname === '/';
  const isTemplates = location.pathname === '/templates';
  const isBlog = location.pathname === '/blog';
  const isContact = location.pathname === '/contact';

  const navLinkClasses = (isActive: boolean) =>
    `px-4 py-2 text-base font-medium rounded-full transition-all duration-200 ${
      isActive
        ? 'text-brand-600 bg-brand-50/50'
        : 'text-zinc-600 hover:text-brand-600 hover:bg-brand-50/50'
    }`;

  const mobileLinkClasses = (isActive: boolean) =>
    `font-medium p-2 text-lg transition-colors ${
      isActive ? 'text-brand-600' : 'text-zinc-600 hover:text-brand-600'
    }`;

  return (
    <>
      <AuthModal
        key={authView}   // 🔴 BẮT BUỘC
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        initialView={authView}
      />

      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out border-b ${
          isScrolled
            ? 'bg-white/80 backdrop-blur-xl border-brand-100/50 py-3 shadow-sm'
            : 'bg-transparent border-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between relative">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 z-20">
            <Zap className="text-brand-600 w-6 h-6" />
            <span className="font-bold tracking-tighter text-zinc-900 font-display uppercase text-xl">
              Pro<span className="text-zinc-400">Notion</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <Link to="/" className={navLinkClasses(isHome)}>Trang chủ</Link>
            <Link to="/templates" className={navLinkClasses(isTemplates)}>Templates</Link>
            <Link to="/blog" className={navLinkClasses(isBlog)}>Blog</Link>
            <Link to="/contact" className={navLinkClasses(isContact)}>Liên hệ</Link>
          </nav>

          {/* Right */}
          <div className="hidden md:flex items-center gap-4 z-20">
            <Link to="/cart" className="relative p-2 text-zinc-500 hover:text-brand-600">
              <ShoppingBag size={22} />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 w-4 h-4 bg-brand-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            {isAuthenticated && user ? (
              <div className="relative" ref={userMenuRef}>
                <button
                  onClick={handleAvatarClick}
                  className="flex items-center gap-2 pl-2 pr-1 py-1 rounded-full hover:bg-zinc-50"
                >
                  <div className="w-8 h-8 rounded-full bg-brand-100 flex items-center justify-center text-brand-600 font-bold">
                    {displayInitial}
                  </div>
                  <ChevronDown size={14} />
                </button>

                {isUserMenuOpen && (
                  <div className="absolute top-full right-0 mt-2 w-64 bg-white rounded-2xl border border-zinc-100 shadow-xl p-4">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-full bg-brand-100 flex items-center justify-center text-brand-600 font-bold">
                        {displayInitial}
                      </div>
                      <div>
                        <h4 className="font-bold text-zinc-900 text-sm">{displayName}</h4>

                        <p className="text-xs text-zinc-500 truncate">{user.email}</p>

                        <p className="text-xs text-brand-600 font-medium capitalize mt-0.5">
                          Role: {displayRole}
                        </p>
                      </div>
                    </div>

                    <div className="text-xs text-zinc-400 mb-4 break-all">
                      ID: {user.id}
                    </div>

                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full justify-start text-red-500 hover:bg-red-50"
                      onClick={handleLogout}
                    >
                      <LogOut size={16} className="mr-2" /> Đăng xuất
                    </Button>
                  </div>
                )}
              </div>
            ) : (
              <>
                {/* LEFT: REGISTER */}
                <Button variant="ghost" size="sm" onClick={openRegister}>
                  Đăng ký
                </Button>

                {/* AVATAR: LOGIN */}
                <div
                  className="w-9 h-9 rounded-full bg-zinc-100 flex items-center justify-center cursor-pointer"
                  onClick={handleAvatarClick}
                >
                  <User size={18} />
                </div>
              </>
            )}
          </div>

          {/* Mobile */}
          <div className="flex md:hidden items-center gap-4 z-20">
            <Link to="/cart" className="relative p-2 text-zinc-500">
              <ShoppingBag size={22} />
            </Link>
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white p-6 shadow-xl">
            <Link to="/" className={mobileLinkClasses(isHome)}>Trang chủ</Link>
            <Link to="/templates" className={mobileLinkClasses(isTemplates)}>Templates</Link>
            <Link to="/blog" className={mobileLinkClasses(isBlog)}>Blog</Link>
            <Link to="/contact" className={mobileLinkClasses(isContact)}>Liên hệ</Link>
          </div>
        )}
      </header>
    </>
  );
};

export default Header;
