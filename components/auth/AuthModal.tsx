
import React, { useState, useEffect } from 'react';
import { Modal } from '../ui/Modal';
import { AuthForm } from './AuthForm';
import { CheckCircle } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialView?: 'login' | 'register';
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, initialView = 'login' }) => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [currentInitialView, setCurrentInitialView] = useState(initialView);

  useEffect(() => {
    if (isOpen) {
        setIsSuccess(false);
        setCurrentInitialView(initialView);
    }
  }, [isOpen, initialView]);

  const handleSuccess = () => {
    setIsSuccess(true);
    setTimeout(() => {
      onClose();
      setTimeout(() => setIsSuccess(false), 300);
    }, 1200);
  };

  if (isSuccess) {
    return (
      <Modal isOpen={isOpen} onClose={() => {}}>
        <div className="flex flex-col items-center justify-center py-8 text-center animate-in fade-in zoom-in duration-300">
          <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mb-6 border border-green-100 ring-4 ring-green-50/50">
            <CheckCircle className="w-10 h-10 text-green-500 animate-in zoom-in spin-in-12 duration-500" strokeWidth={3} />
          </div>
          <h2 className="text-2xl font-bold text-zinc-900 mb-2">
            Thành công!
          </h2>
          <p className="text-zinc-500">Đang chuyển hướng...</p>
        </div>
      </Modal>
    );
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <AuthForm initialView={currentInitialView} onSuccess={handleSuccess} />
    </Modal>
  );
};
