import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';

import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import HowItWorks from './components/HowItWorks';
import Testimonials from './components/Testimonials';
import Pricing from './components/Pricing';
import Footer from './components/Footer';

import TemplatesPage from './components/TemplatesPage';
import BlogPage from './components/BlogPage';
import BlogPostPage from './components/BlogPostPage';
import ContactPage from './components/ContactPage';
import CartPage from './components/CartPage';
import CheckoutPage from './components/CheckoutPage';
import TemplateDetailPage from './components/TemplateDetailPage';
import AdminDashboard from './components/admin/AdminDashboard';
import LoginPage from './components/LoginPage';

import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { PendingActionHandler } from './components/auth/PendingActionHandler';
import { CartProvider } from './context/CartContext';
import { ToastProvider } from './context/ToastContext';
import { AuthProvider } from './context/AuthContext';

/* =======================
   Scroll to top on route change
======================= */
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

/* =======================
   Home page
======================= */
const HomePage: React.FC = () => (
  <>
    <Hero />
    <Features />
    <Pricing />
    <HowItWorks />
    <Testimonials />
  </>
);

/* =======================
   App
======================= */
const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ToastProvider>
          <CartProvider>
            <ScrollToTop />
            <PendingActionHandler />

            <div className="min-h-screen bg-white text-zinc-900 selection:bg-brand-500 selection:text-white overflow-x-hidden">
              <div className="relative z-10">
                <Header />

                <main>
                  <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/templates" element={<TemplatesPage />} />
                    <Route
                      path="/templates/:slug"
                      element={<TemplateDetailPage />}
                    />
                    <Route path="/blog" element={<BlogPage />} />
                    <Route path="/blog/:slug" element={<BlogPostPage />} />
                    <Route path="/contact" element={<ContactPage />} />
                    <Route path="/cart" element={<CartPage />} />
                    <Route path="/login" element={<LoginPage />} />

                    {/* Protected User Routes */}
                    <Route element={<ProtectedRoute />}>
                      <Route path="/checkout" element={<CheckoutPage />} />
                    </Route>

                    {/* Protected Admin Routes */}
                    <Route element={<ProtectedRoute requiredRole="admin" />}>
                      <Route path="/admin" element={<AdminDashboard />} />
                    </Route>
                  </Routes>
                </main>

                <Footer />
              </div>
            </div>
          </CartProvider>
        </ToastProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
