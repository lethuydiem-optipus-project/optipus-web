import { supabase } from "../../services/supabase";

import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { Mail, Lock, User, Loader2, AlertCircle } from 'lucide-react';

interface AuthFormProps {
  initialView?: 'login' | 'register';
  onSuccess?: () => void;
  className?: string;
}

export const AuthForm: React.FC<AuthFormProps> = ({
  initialView = 'login',
  onSuccess,
  className = ''
}) => {
  const [view, setView] = useState<'login' | 'register'>(initialView);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const clearError = () => setError(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      if (view === 'register') {
        // 1. Sign up
        const { error: signUpError } = await supabase.auth.signUp({
          email: formData.email,
          password: formData.password,
        });
        if (signUpError) throw signUpError;

        // 2. Auto sign in
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email: formData.email,
          password: formData.password,
        });
        if (signInError) throw signInError;

        if (onSuccess) onSuccess();
        return;
      }

      // Login
      const { error: loginError } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });
      if (loginError) throw loginError;

      if (onSuccess) onSuccess();

    } catch (err: any) {
      setError(err.message || 'Có lỗi xảy ra');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={className}>
      <div className="text-center mb-8">
        <h2 className="text-3xl font-display font-bold text-zinc-900 mb-2">
          {view === 'login' ? 'Đăng Nhập' : 'Tạo Tài Khoản'}
        </h2>
        <p className="text-zinc-500">
          {view === 'login'
            ? 'Chào mừng bạn quay trở lại với ProNotion'
            : 'Tham gia cùng 4,500+ doanh nghiệp khác'}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="p-3 rounded-lg bg-red-50 border border-red-100 text-red-600 text-sm flex items-center gap-2 animate-in slide-in-from-top-1">
            <AlertCircle size={16} />
            {error}
          </div>
        )}

        {view === 'register' && (
          <div className="relative">
            <User className="absolute left-4 top-3.5 text-zinc-400 w-5 h-5" />
            <input
              type="text"
              required
              placeholder="Họ và tên"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-zinc-200 bg-zinc-50/50 focus:bg-white focus:ring-2 focus:ring-brand-100 focus:border-brand-300 outline-none transition-all placeholder:text-zinc-400"
            />
          </div>
        )}

        <div className="relative">
          <Mail className="absolute left-4 top-3.5 text-zinc-400 w-5 h-5" />
          <input
            type="email"
            required
            placeholder="Email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            className="w-full pl-12 pr-4 py-3 rounded-xl border border-zinc-200 bg-zinc-50/50 focus:bg-white focus:ring-2 focus:ring-brand-100 focus:border-brand-300 outline-none transition-all placeholder:text-zinc-400"
          />
        </div>

        <div className="relative">
          <Lock className="absolute left-4 top-3.5 text-zinc-400 w-5 h-5" />
          <input
            type="password"
            required
            placeholder="Mật khẩu"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            className="w-full pl-12 pr-4 py-3 rounded-xl border border-zinc-200 bg-zinc-50/50 focus:bg-white focus:ring-2 focus:ring-brand-100 focus:border-brand-300 outline-none transition-all placeholder:text-zinc-400"
          />
        </div>

        <Button
          type="submit"
          size="lg"
          className="w-full shadow-lg shadow-brand-500/20 mt-4"
          disabled={isLoading}
        >
          {isLoading ? (
            <Loader2 className="w-5 h-5 animate-spin mx-auto" />
          ) : view === 'login' ? (
            'Đăng Nhập'
          ) : (
            'Đăng Ký'
          )}
        </Button>
      </form>

      <div className="mt-6 text-center text-sm text-zinc-500">
        {view === 'login' ? (
          <>
            Chưa có tài khoản?{' '}
            <button
              onClick={() => {
                setView('register');
                clearError();
              }}
              className="text-brand-600 font-bold hover:underline"
            >
              Đăng ký ngay
            </button>
          </>
        ) : (
          <>
            Đã có tài khoản?{' '}
            <button
              onClick={() => {
                setView('login');
                clearError();
              }}
              className="text-brand-600 font-bold hover:underline"
            >
              Đăng nhập
            </button>
          </>
        )}
      </div>
    </div>
  );
};
