
import React from 'react';
import { Modal } from './Modal';
import { Loader2 } from 'lucide-react';

interface LoginRequiredModalProps {
  isOpen: boolean;
  onClose?: () => void;
}

export const LoginRequiredModal: React.FC<LoginRequiredModalProps> = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="text-center py-6">
        <div className="text-5xl mb-6">🥺</div>
        <h2 className="text-2xl font-display font-bold text-zinc-900 mb-3">Bạn ơi đăng nhập nhaaa {'<3'}</h2>
        <p className="text-zinc-500 mb-8 px-4">Đăng nhập để lưu giỏ hàng và mua template nè ✨</p>
        <div className="flex items-center justify-center gap-2 text-brand-600 font-medium bg-brand-50 py-3 px-4 rounded-xl">
          <Loader2 className="w-4 h-4 animate-spin" />
          <span>Đang chuyển đến trang đăng nhập...</span>
        </div>
      </div>
    </Modal>
  );
};
