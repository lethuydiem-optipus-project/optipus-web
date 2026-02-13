import React, { useState, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { LoginRequiredModal } from '../components/ui/LoginRequiredModal';

interface PendingAction {
  type: 'ADD_TO_CART' | 'BUY_NOW';
  product: any;
  redirectAfter?: string;
}

export const useLoginGuard = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const requireAuth = useCallback((
    actionCallback: () => void, 
    pendingActionData?: PendingAction
  ) => {
    if (isAuthenticated) {
      actionCallback();
    } else {
      if (pendingActionData) {
        localStorage.setItem('pendingAction', JSON.stringify(pendingActionData));
      }
      
      setIsModalOpen(true);
      
      setTimeout(() => {
        setIsModalOpen(false);
        navigate('/login');
      }, 3000);
    }
  }, [isAuthenticated, navigate]);

  return {
    requireAuth,
    LoginGuardModal: () => React.createElement(LoginRequiredModal, {
      isOpen: isModalOpen,
      onClose: () => setIsModalOpen(false)
    })
  };
};