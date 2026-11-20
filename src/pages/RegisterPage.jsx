import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useApp } from '../context/AppContext';
import { Flame, User, Mail, Phone, Lock, ArrowRight, CheckCircle2 } from 'lucide-react';

export const RegisterPage = () => {
  const { register } = useAuth();
  const { pageParams, navigate, showToast } = useApp();

  const [form, setForm] = useState({
    fullName: '',
    mobile: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successNotice, setSuccessNotice] = useState(false);

  const returnTarget = pageParams?.returnUrl || 'home';

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!form.fullName || !form.mobile || !form.email || !form.password) {
      setErrorMessage('Please fill in all required fields.');
      return;
    }

    if (form.password !== form.confirmPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }

    if (form.password.length < 6) {
      setErrorMessage('Password must be at least 6 characters long.');
      return;
    }

    setLoading(true);
    const res = await register(form);
    setLoading(false);

    if (res.success) {
      setSuccessNotice(true);
      showToast('Account created successfully.', 'success');
      setTimeout(() => {
        navigate(returnTarget);
      }, 1400);
    } else {
      setErrorMessage(res.message || 'Registration failed.');
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-3 sm:px-4 py-8 sm:py-12 animate-fade-in w-full">
      <div className="w-full max-w-md bg-white dark:bg-[#1E2026] rounded-2xl sm:rounded-3xl border border-gray-200 dark:border-gray-800 p-5 sm:p-8 shadow-xl space-y-5 sm:space-y-6">
        <div className="text-center space-y-2">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-br from-maroon-800 to-red-600 flex items-center justify-center text-amber-300 shadow-md">
            <Flame className="w-7 h-7" />
          </div>
          <h1 className="text-2xl font-black text-gray-900 dark:text-white">
            Create Account
          </h1>
          <p className="text-xs text-gray-500">
            Join Sivakasi Sparkles for fast festival bookings and direct discounts
          </p>
        </div>

        {/* Success message banner */}
        {successNotice && (
          <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200 text-xs font-bold flex items-center gap-2 animate-bounce-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            <span>Account created successfully. Redirecting to your shopping flow...</span>
          </div>
        )}

        {errorMessage && (
          <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-rose-700 dark:text-rose-300 text-xs font-semibold">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3.5">
          <div>
            <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
              Full Name *
            </label>
            <div className="relative">
              <input
                type="text"
                required
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
                placeholder="e.g. Ramesh Kumar"
                className="w-full pl-9 pr-3 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#15161A] text-xs font-medium focus:outline-none focus:ring-2 focus:ring-red-600/30"
              />
              <User className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-2.5" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
              Mobile Number *
            </label>
            <div className="relative">
              <input
                type="tel"
                required
                name="mobile"
                value={form.mobile}
                onChange={handleChange}
                placeholder="10-digit mobile number"
                className="w-full pl-9 pr-3 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#15161A] text-xs font-medium focus:outline-none focus:ring-2 focus:ring-red-600/30"
              />
              <Phone className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-2.5" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
              Email Address *
            </label>
            <div className="relative">
              <input
                type="email"
                required
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="e.g. ramesh@example.com"
                className="w-full pl-9 pr-3 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#15161A] text-xs font-medium focus:outline-none focus:ring-2 focus:ring-red-600/30"
              />
              <Mail className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-2.5" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
              Password *
            </label>
            <div className="relative">
              <input
                type="password"
                required
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Minimum 6 characters"
                className="w-full pl-9 pr-3 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#15161A] text-xs font-medium focus:outline-none focus:ring-2 focus:ring-red-600/30"
              />
              <Lock className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-2.5" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
              Confirm Password *
            </label>
            <div className="relative">
              <input
                type="password"
                required
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                placeholder="Re-enter password"
                className="w-full pl-9 pr-3 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#15161A] text-xs font-medium focus:outline-none focus:ring-2 focus:ring-red-600/30"
              />
              <Lock className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-2.5" />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-maroon-800 to-red-600 hover:from-maroon-900 text-white font-extrabold text-xs shadow-md transition-all flex items-center justify-center gap-2 pt-3"
          >
            <span>{loading ? 'Creating Account...' : 'Create Account'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="pt-3 border-t border-gray-100 dark:border-gray-800 text-center text-xs text-gray-500">
          <span>Already registered? </span>
          <button
            onClick={() => navigate('login', { returnUrl: returnTarget })}
            className="font-bold text-red-700 dark:text-amber-400 hover:underline"
          >
            Login to Account
          </button>
        </div>
      </div>
    </div>
  );
};
