import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useApp } from '../context/AppContext';
import { Flame, Lock, User, Eye, EyeOff, ArrowRight } from 'lucide-react';

export const UserLoginPage = ({ defaultReturnUrl }) => {
  const { user, isAdmin, login, adminLogin } = useAuth();
  const { pageParams, navigate, showToast } = useApp();

  // If already logged in as Admin, redirect directly to admin dashboard
  React.useEffect(() => {
    if (isAdmin) {
      navigate('/admin/dashboard');
    }
  }, [isAdmin, navigate]);

  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [forgotModalOpen, setForgotModalOpen] = useState(false);

  // Preserve user's intended destination (e.g. checkout, orders, profile)
  const returnTarget = pageParams?.returnUrl || defaultReturnUrl || 'profile';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    const cleanIdentifier = identifier.trim();
    const cleanPassword = password.trim();

    if (!cleanIdentifier && !cleanPassword) {
      setErrorMessage('Please enter your email or mobile number.');
      return;
    }

    if (!cleanIdentifier) {
      setErrorMessage('Please enter your email or mobile number.');
      return;
    }

    if (!cleanPassword) {
      setErrorMessage('Please enter your password.');
      return;
    }

    setLoading(true);

    // Smart Admin Routing: seamless login into Admin Dashboard if Admin credentials used
    if (cleanIdentifier.toLowerCase() === 'admin@crackers.com') {
      const adminRes = await adminLogin(cleanIdentifier, cleanPassword);
      setLoading(false);
      if (adminRes.success) {
        showToast('Signed in as Store Administrator', 'success');
        navigate('/admin/dashboard');
        return;
      } else {
        setErrorMessage(adminRes.message || 'Invalid admin credentials.');
        return;
      }
    }

    const res = await login(cleanIdentifier, cleanPassword);
    setLoading(false);

    if (res.success) {
      showToast(`Welcome back, ${res.user.name}!`, 'success');
      // Return user to the page/action they originally intended to visit
      navigate(returnTarget);
    } else {
      setErrorMessage('Invalid email/mobile or password.');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-3 sm:px-4 py-8 sm:py-12 animate-fade-in w-full">
      <div className="w-full max-w-md bg-white dark:bg-[#1E2026] rounded-2xl sm:rounded-3xl border border-gray-200 dark:border-gray-800 p-5 sm:p-8 shadow-xl space-y-5 sm:space-y-6">

        {/* Brand Header */}
        <div className="text-center space-y-2">
          <button
            type="button"
            onClick={() => navigate('/admin/login')}
            className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-br from-maroon-800 to-red-600 flex items-center justify-center text-amber-300 shadow-md shadow-red-900/20 hover:scale-105 active:scale-95 transition-transform cursor-pointer"
            title="Admin Login"
          >
            <Flame className="w-7 h-7" />
          </button>
          <h1 className="text-2xl font-black text-gray-900 dark:text-white">
            User Login
          </h1>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Sign in to manage orders, wishlist, and complete checkout
          </p>
        </div>


        {/* Error message */}
        {errorMessage && (
          <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-rose-700 dark:text-rose-300 text-xs font-semibold">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
              Mobile Number or Email
            </label>
            <div className="relative">
              <input
                type="text"
                value={identifier}
                onChange={(e) => {
                  setIdentifier(e.target.value);
                  if (errorMessage) setErrorMessage('');
                }}
                placeholder="Enter 10-digit mobile or email"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#15161A] text-xs font-medium text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-600/30"
              />
              <User className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-xs font-bold text-gray-700 dark:text-gray-300">
                Password
              </label>
              <button
                type="button"
                onClick={() => setForgotModalOpen(true)}
                className="text-[11px] font-semibold text-red-700 dark:text-amber-400 hover:underline"
              >
                Forgot Password?
              </button>
            </div>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (errorMessage) setErrorMessage('');
                }}
                placeholder="Enter password"
                className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#15161A] text-xs font-medium text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-600/30"
              />
              <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-3 text-gray-400 hover:text-gray-600"
                title={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-maroon-800 to-red-600 hover:from-maroon-900 hover:to-red-700 text-white font-extrabold text-sm shadow-md transition-all flex items-center justify-center gap-2"
          >
            <span>{loading ? 'Logging in...' : 'Login'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="pt-4 border-t border-gray-100 dark:border-gray-800 text-center text-xs text-gray-500">
          <span>Don't have an account? </span>
          <button
            onClick={() => navigate('register', { returnUrl: returnTarget })}
            className="font-bold text-red-700 dark:text-amber-400 hover:underline"
          >
            Create New Account
          </button>
        </div>

      </div>

      {/* Forgot Password Assistance Modal */}
      {forgotModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-sm bg-white dark:bg-[#1E2026] rounded-2xl p-6 text-center space-y-4 shadow-2xl">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
              Password Reset Assistance
            </h3>
            <p className="text-xs text-gray-500">
              Please enter your registered mobile number or email address, or contact our support team at <span className="font-semibold text-gray-700 dark:text-gray-300">+91 9943830644</span> for immediate account assistance.
            </p>
            <button
              onClick={() => setForgotModalOpen(false)}
              className="w-full py-2.5 rounded-xl bg-maroon-800 text-white font-bold text-xs"
            >
              Understood
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
