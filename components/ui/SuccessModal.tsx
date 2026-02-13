
import React from 'react';
import { Modal } from './Modal';
import { Button } from './Button';
import { CheckCircle } from 'lucide-react';

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  message?: React.ReactNode;
  brandNote?: string;
  buttonText?: string;
}

export const SuccessModal: React.FC<SuccessModalProps> = ({
  isOpen,
  onClose,
  title = "Thông tin của bạn đã được ghi nhận",
  message = "Cảm ơn bạn đã gửi thông tin. Chúng tôi sẽ phản hồi bạn trong thời gian sớm nhất.",
  brandNote = "— ProNotion",
  buttonText = "Đóng"
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col items-center text-center">
        <div className="w-16 h-16 bg-brand-50 rounded-full flex items-center justify-center mb-6 border border-brand-100 ring-4 ring-brand-50/50">
          <CheckCircle className="w-8 h-8 text-brand-500" strokeWidth={2.5} />
        </div>
        
        <h2 className="text-2xl font-display font-bold text-zinc-900 mb-3">
          {title}
        </h2>
        
        <div className="text-zinc-500 mb-6 leading-relaxed max-w-xs mx-auto">
          {message}
        </div>
        
        {brandNote && (
          <p className="text-sm text-zinc-400 mb-8 italic">
            {brandNote}
          </p>
        )}
        
        <Button onClick={onClose} className="w-full justify-center">
          {buttonText}
        </Button>
      </div>
    </Modal>
  );
};
