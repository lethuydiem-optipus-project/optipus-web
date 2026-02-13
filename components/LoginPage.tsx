import { supabase } from "../services/supabase";

import React from 'react';
import { Section } from './ui/Section';
import { AuthForm } from './auth/AuthForm';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  // Redirect is handled by PendingActionHandler or default
  const handleSuccess = () => {
     // If there is a pending action, PendingActionHandler will handle redirect.
     // We can add a small delay or check here, but relying on the global handler is cleaner for separation of concerns.
     // However, if there is NO pending action, we should go home or dashboard.
     const hasPending = localStorage.getItem('pendingAction');
     if (!hasPending) {
         setTimeout(() => navigate('/'), 100);
     }
  };

  return (
    <div className="pt-24 pb-20 min-h-screen bg-zinc-50 flex flex-col justify-center">
      <Section className="!py-10">
        <div className="max-w-md mx-auto">
          <Link to="/" className="inline-flex items-center text-zinc-500 hover:text-zinc-900 mb-8 transition-colors">
            <ArrowLeft size={16} className="mr-2" /> Quay lại trang chủ
          </Link>
          
          <div className="bg-white rounded-3xl p-8 md:p-10 border border-zinc-200 shadow-xl shadow-zinc-200/50">
             <AuthForm onSuccess={handleSuccess} />
          </div>
        </div>
      </Section>
    </div>
  );
};

export default LoginPage;
