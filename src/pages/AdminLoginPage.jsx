import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useApp } from '../context/AppContext';
import { ShieldCheck, Lock, Mail, Eye, EyeOff, ArrowRight } from 'lucide-react';

export const AdminLoginPage = () => {
  const { admin, isAdmin, adminLogin } = useAuth();
  const { navigate, showToast } = useApp();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // If already logged in as Admin, redirect directly to admin dashboard
  useEffect(() => {
    if (isAdmin) {
      navigate('/admin/dashboard');
    }
  }, [isAdmin, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    const cleanEmail = email.trim();
    const cleanPassword = password.trim();

    // Frontend Validation
    if (!cleanEmail && !cleanPassword) {
      setErrorMessage('Please enter your email.');
      return;
    }

    if (!cleanEmail) {
      setErrorMessage('Please enter your email.');
      return;
    }

    if (!cleanPassword) {
      setErrorMessage('Please enter your password.');
      return;
    }

    setLoading(true);
    const res = await adminLogin(cleanEmail, cleanPassword);
    setLoading(false);

    if (res.success) {
      showToast('Signed in successfully', 'success');
      navigate('/admin/dashboard');
    } else {
      setErrorMessage('Invalid email or password.');
    }
  };

  if (isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#111215] text-gray-900 dark:text-gray-100 flex flex-col justify-center items-center px-4 py-12 transition-colors duration-200">
      <div className="w-full max-w-md bg-white dark:bg-[#1A1C22] rounded-2xl border border-gray-200 dark:border-gray-800 p-8 shadow-xl space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 mx-auto rounded-xl bg-maroon-800 dark:bg-gray-800 text-white dark:text-amber-400 flex items-center justify-center shadow-md">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Admin Login
          </h1>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Sign in to manage your store
          </p>
        </div>

        {/* Validation / Authentication Error Box */}
        {errorMessage && (
          <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-900 text-rose-700 dark:text-rose-300 text-xs font-semibold">
            {errorMessage}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1.5">
              Email
            </label>
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errorMessage) setErrorMessage('');
                }}
                placeholder="admin@crackers.com"
                className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#121316] text-gray-900 dark:text-white text-xs font-medium focus:outline-none focus:ring-2 focus:ring-maroon-800/30 dark:focus:ring-amber-500/30 transition-all"
              />
              <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
            </div>
          </div>

          <div>
            <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1.5">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (errorMessage) setErrorMessage('');
                }}
                placeholder="Enter password"
                className="w-full pl-9 pr-10 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#121316] text-gray-900 dark:text-white text-xs font-medium focus:outline-none focus:ring-2 focus:ring-maroon-800/30 dark:focus:ring-amber-500/30 transition-all"
              />
              <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                title={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-maroon-800 hover:bg-maroon-900 dark:bg-amber-500 dark:hover:bg-amber-600 text-white dark:text-gray-950 font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 mt-2"
          >
            <span>{loading ? 'Authenticating...' : 'Login'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Back to Website */}
        <div className="pt-4 border-t border-gray-100 dark:border-gray-800 text-center">
          <button
            type="button"
            onClick={() => navigate('/')}
            className="text-xs font-semibold text-gray-600 dark:text-gray-400 hover:text-maroon-800 dark:hover:text-white transition-colors"
          >
            ← Back to Website
          </button>
        </div>
      </div>
    </div>
  );
};
