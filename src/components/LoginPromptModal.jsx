import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useApp } from '../context/AppContext';
import { Lock, Sparkles, X, ArrowRight } from 'lucide-react';

export const LoginPromptModal = () => {
  const { loginPrompt, closeLoginPrompt } = useAuth();
  const { navigate } = useApp();

  if (!loginPrompt.isOpen) return null;

  const handleGoToLogin = () => {
    const returnTarget = loginPrompt.redirectPath || '/checkout';
    closeLoginPrompt();
    navigate('login', { returnUrl: returnTarget });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-md bg-white dark:bg-[#1E2026] rounded-2xl shadow-2xl border border-amber-200/40 dark:border-gray-800 p-6 sm:p-8 text-center transition-all transform scale-100">
        {/* Close Icon */}
        <button
          onClick={closeLoginPrompt}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors p-1"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Icon & Sparkle */}
        <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-amber-100 dark:bg-amber-950/40 flex items-center justify-center text-maroon-700 dark:text-amber-400 shadow-inner">
          <Lock className="w-8 h-8" />
        </div>

        {/* Heading & Subtitle */}
        <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Login Required
        </h3>
        <p className="text-base text-gray-600 dark:text-gray-300 mb-6">
          {loginPrompt.message || 'Login required to place your order.'}
        </p>

        <p className="text-xs text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/30 p-2.5 rounded-lg border border-amber-200 dark:border-amber-900/50 mb-6 flex items-center justify-center gap-1.5 font-medium">
          <Sparkles className="w-4 h-4 flex-shrink-0" />
          You will return right back to your checkout after login!
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={closeLoginPrompt}
            className="flex-1 px-5 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            Continue Browsing
          </button>
          <button
            onClick={handleGoToLogin}
            className="flex-1 px-5 py-2.5 rounded-xl bg-gradient-to-r from-maroon-800 to-red-600 hover:from-maroon-900 hover:to-red-700 text-white font-medium shadow-md shadow-red-900/20 flex items-center justify-center gap-1.5 transition-all"
          >
            <span>Login</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
