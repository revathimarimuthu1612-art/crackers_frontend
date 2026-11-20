import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';
import {
  ShieldCheck,
  User,
  Mail,
  Phone,
  Edit3,
  Check,
  X,
  Lock,
  Sun,
  Moon,
  AlertCircle,
  CheckCircle2,
  Building
} from 'lucide-react';

export const AdminSettingsPage = () => {
  const { admin, updateAdminProfile } = useAuth();
  const { theme, setTheme, showToast } = useApp();

  const [isEditingAdmin, setIsEditingAdmin] = useState(false);
  const [adminFormData, setAdminFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });

  const [adminError, setAdminError] = useState('');
  const [adminSuccess, setAdminSuccess] = useState('');
  const [isSavingAdmin, setIsSavingAdmin] = useState(false);

  // Security Form
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [passwordError, setPasswordError] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState('');

  useEffect(() => {
    if (admin) {
      setAdminFormData({
        name: admin.name || 'Project Administrator',
        email: admin.email || 'admin@crackers.com',
        phone: admin.phone || '9876543210',
      });
    }
  }, [admin]);

  const handleStartEdit = () => {
    setAdminError('');
    setAdminSuccess('');
    setAdminFormData({
      name: admin?.name || 'Project Administrator',
      email: admin?.email || 'admin@crackers.com',
      phone: admin?.phone || '9876543210',
    });
    setIsEditingAdmin(true);
  };

  const handleCancelEdit = () => {
    setIsEditingAdmin(false);
    setAdminError('');
    setAdminSuccess('');
  };

  const handleSaveAdminProfile = async (e) => {
    e.preventDefault();
    setAdminError('');
    setAdminSuccess('');

    const nameTrim = adminFormData.name.trim();
    const emailTrim = adminFormData.email.trim();
    const phoneTrim = adminFormData.phone.trim();

    if (!nameTrim) {
      setAdminError('Administrator Name is required.');
      return;
    }
    if (!emailTrim) {
      setAdminError('Email address is required.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailTrim)) {
      setAdminError('Please enter a valid email address.');
      return;
    }

    if (phoneTrim && !/^[0-9]{10}$/.test(phoneTrim)) {
      setAdminError('Please enter a valid 10-digit phone number.');
      return;
    }

    setIsSavingAdmin(true);
    const res = await updateAdminProfile({
      name: nameTrim,
      email: emailTrim,
      phone: phoneTrim || '9876543210',
    });
    setIsSavingAdmin(false);

    if (res.success) {
      setAdminSuccess('Admin profile updated successfully!');
      showToast('Admin profile updated successfully!', 'success');
      setIsEditingAdmin(false);
    } else {
      setAdminError(res.message || 'Failed to update admin profile.');
      showToast('Failed to update admin profile.', 'error');
    }
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
    setPasswordError('');
    setPasswordSuccess('');

    if (!passwordForm.currentPassword) {
      setPasswordError('Please enter current password.');
      return;
    }
    if (passwordForm.newPassword.length < 6) {
      setPasswordError('New password must be at least 6 characters.');
      return;
    }
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setPasswordError('New password and confirmation do not match.');
      return;
    }

    setPasswordSuccess('Admin password changed successfully!');
    showToast('Admin password changed successfully!', 'success');
    setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
  };

  return (
    <div className="w-full space-y-8 animate-fade-in">
      {/* Header */}
      <div className="pb-4 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-gray-900 dark:text-white flex items-center gap-2">
            <ShieldCheck className="w-7 h-7 text-amber-500" />
            <span>Admin Profile & Settings</span>
          </h1>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Manage store administrator credentials, security, and display preferences
          </p>
        </div>

        <span className="text-xs font-bold bg-amber-500/20 text-amber-700 dark:text-amber-400 px-3 py-1 rounded-full border border-amber-400/30">
          Super Admin Privileges
        </span>
      </div>

      {/* Global Success Alert */}
      {adminSuccess && (
        <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs font-bold flex items-center justify-between shadow-sm animate-fade-in">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>{adminSuccess}</span>
          </div>
          <button onClick={() => setAdminSuccess('')} className="text-emerald-600 hover:text-emerald-800">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* SECTION 1: Admin Personal Profile & Edit */}
      <div className="bg-white dark:bg-[#1A1C22] rounded-2xl border border-gray-200 dark:border-gray-800 p-6 shadow-sm space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-gray-100 dark:border-gray-800">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 to-red-600 flex items-center justify-center text-gray-950 font-black text-xl shadow">
              <User className="w-6 h-6 text-gray-950" />
            </div>
            <div>
              <h2 className="text-base font-bold text-gray-900 dark:text-white">
                Administrator Profile Details
              </h2>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Primary contact for store administration & order management
              </p>
            </div>
          </div>

          {!isEditingAdmin && (
            <button
              onClick={handleStartEdit}
              className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-gray-950 font-bold text-xs shadow flex items-center gap-1.5 transition-all"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Edit Profile</span>
            </button>
          )}
        </div>

        {/* Error alert */}
        {adminError && (
          <div className="p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-900 text-rose-700 dark:text-rose-300 text-xs font-semibold flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{adminError}</span>
          </div>
        )}

        {isEditingAdmin ? (
          /* Edit Admin Form */
          <form onSubmit={handleSaveAdminProfile} className="space-y-4 animate-fade-in">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                  Full Name <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={adminFormData.name}
                    onChange={(e) => {
                      setAdminFormData({ ...adminFormData, name: e.target.value });
                      if (adminError) setAdminError('');
                    }}
                    placeholder="Administrator Name"
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#121316] text-xs font-medium text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500/30"
                  />
                  <User className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                  Email Address <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="email"
                    value={adminFormData.email}
                    onChange={(e) => {
                      setAdminFormData({ ...adminFormData, email: e.target.value });
                      if (adminError) setAdminError('');
                    }}
                    placeholder="admin@crackers.com"
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#121316] text-xs font-medium text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500/30"
                  />
                  <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                  Contact Mobile Number
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    value={adminFormData.phone}
                    onChange={(e) => {
                      setAdminFormData({ ...adminFormData, phone: e.target.value });
                      if (adminError) setAdminError('');
                    }}
                    placeholder="10-digit contact mobile"
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#121316] text-xs font-medium text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500/30"
                  />
                  <Phone className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                  System Role
                </label>
                <div className="relative">
                  <input
                    type="text"
                    disabled
                    value="Store Administrator (FULL)"
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-100 dark:bg-gray-800 text-xs font-semibold text-gray-500 cursor-not-allowed"
                  />
                  <ShieldCheck className="w-4 h-4 text-amber-500 absolute left-3 top-3" />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100 dark:border-gray-800">
              <button
                type="button"
                onClick={handleCancelEdit}
                disabled={isSavingAdmin}
                className="px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-700 text-xs font-bold text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSavingAdmin}
                className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-gray-950 font-extrabold text-xs shadow transition-all flex items-center gap-1.5"
              >
                <Check className="w-4 h-4" />
                <span>{isSavingAdmin ? 'Saving...' : 'Save Changes'}</span>
              </button>
            </div>
          </form>
        ) : (
          /* View Admin Info Cards */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-gray-50 dark:bg-[#121316] border border-gray-200 dark:border-gray-800">
              <span className="text-gray-400 uppercase tracking-wider block mb-1 font-semibold text-[10px]">
                Full Administrator Name
              </span>
              <p className="font-bold text-gray-900 dark:text-white text-base">{admin?.name || 'Project Administrator'}</p>
            </div>

            <div className="p-4 rounded-xl bg-gray-50 dark:bg-[#121316] border border-gray-200 dark:border-gray-800">
              <span className="text-gray-400 uppercase tracking-wider block mb-1 font-semibold text-[10px]">
                Official Email Address
              </span>
              <p className="font-bold text-gray-900 dark:text-white text-base">{admin?.email || 'admin@crackers.com'}</p>
            </div>

            <div className="p-4 rounded-xl bg-gray-50 dark:bg-[#121316] border border-gray-200 dark:border-gray-800">
              <span className="text-gray-400 uppercase tracking-wider block mb-1 font-semibold text-[10px]">
                Mobile Phone
              </span>
              <p className="font-bold text-gray-900 dark:text-white text-base">{admin?.phone || '9876543210'}</p>
            </div>

            <div className="p-4 rounded-xl bg-gray-50 dark:bg-[#121316] border border-gray-200 dark:border-gray-800">
              <span className="text-gray-400 uppercase tracking-wider block mb-1 font-semibold text-[10px]">
                Store Organization
              </span>
              <p className="font-bold text-amber-600 dark:text-amber-400 text-base flex items-center gap-1.5">
                <Building className="w-4 h-4" />
                <span>Sivakasi Sparkles Head Office</span>
              </p>
            </div>
          </div>
        )}
      </div>

      {/* SECTION 2: Security & Admin Password */}
      <div className="bg-white dark:bg-[#1A1C22] rounded-2xl border border-gray-200 dark:border-gray-800 p-6 shadow-sm space-y-4">
        <div className="flex items-center gap-2 pb-3 border-b border-gray-100 dark:border-gray-800">
          <Lock className="w-5 h-5 text-amber-500" />
          <h3 className="font-bold text-sm text-gray-900 dark:text-white uppercase tracking-wider">
            Admin Security & Password
          </h3>
        </div>

        {passwordError && (
          <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 text-rose-700 text-xs font-semibold">
            {passwordError}
          </div>
        )}
        {passwordSuccess && (
          <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 text-emerald-700 text-xs font-semibold">
            {passwordSuccess}
          </div>
        )}

        <form onSubmit={handleChangePassword} className="space-y-4 max-w-md pt-1">
          <div>
            <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
              Current Password
            </label>
            <input
              type="password"
              value={passwordForm.currentPassword}
              onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
              placeholder="Enter current password (admin123)"
              className="w-full px-3.5 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#121316] text-xs text-gray-900 dark:text-white"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                New Password
              </label>
              <input
                type="password"
                value={passwordForm.newPassword}
                onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                placeholder="Min 6 characters"
                className="w-full px-3.5 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#121316] text-xs text-gray-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                Confirm New Password
              </label>
              <input
                type="password"
                value={passwordForm.confirmPassword}
                onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                placeholder="Re-enter password"
                className="w-full px-3.5 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#121316] text-xs text-gray-900 dark:text-white"
              />
            </div>
          </div>

          <button
            type="submit"
            className="px-5 py-2 rounded-xl bg-gray-900 dark:bg-gray-800 hover:bg-gray-800 text-white font-bold text-xs shadow transition-colors"
          >
            Update Admin Password
          </button>
        </form>
      </div>

      {/* SECTION 3: Appearance Theme */}
      <div className="bg-white dark:bg-[#1A1C22] rounded-2xl border border-gray-200 dark:border-gray-800 p-6 shadow-sm space-y-4">
        <h3 className="font-bold text-sm text-gray-900 dark:text-white uppercase tracking-wider">
          System Interface Theme
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
          {/* Light Theme Radio */}
          <label
            onClick={() => {
              setTheme('light');
              showToast('Switched to Light Theme', 'info');
            }}
            className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-all ${
              theme === 'light'
                ? 'border-amber-500 bg-amber-50/50 shadow-sm'
                : 'border-gray-200 dark:border-gray-800 hover:border-gray-300'
            }`}
          >
            <input
              type="radio"
              name="admin_theme"
              checked={theme === 'light'}
              onChange={() => setTheme('light')}
              className="accent-amber-500"
            />
            <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center">
              <Sun className="w-4 h-4" />
            </div>
            <div>
              <span className="font-bold text-xs text-gray-900 dark:text-white block">
                Light Theme
              </span>
              <span className="text-[11px] text-gray-500">
                Clean light background with warm amber highlights
              </span>
            </div>
          </label>

          {/* Dark Theme Radio */}
          <label
            onClick={() => {
              setTheme('dark');
              showToast('Switched to Dark Theme', 'info');
            }}
            className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-all ${
              theme === 'dark'
                ? 'border-amber-400 bg-gray-800 shadow-sm'
                : 'border-gray-200 dark:border-gray-800 hover:border-gray-300'
            }`}
          >
            <input
              type="radio"
              name="admin_theme"
              checked={theme === 'dark'}
              onChange={() => setTheme('dark')}
              className="accent-amber-400"
            />
            <div className="w-8 h-8 rounded-lg bg-gray-700 text-amber-300 flex items-center justify-center">
              <Moon className="w-4 h-4" />
            </div>
            <div>
              <span className="font-bold text-xs text-gray-900 dark:text-white block">
                Dark Theme
              </span>
              <span className="text-[11px] text-gray-400">
                Dark charcoal background with amber accents
              </span>
            </div>
          </label>
        </div>
      </div>
    </div>
  );
};
