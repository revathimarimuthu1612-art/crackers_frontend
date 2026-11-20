import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useApp } from '../context/AppContext';
import { ProductCard } from '../components/ProductCard';
import { MyOrdersPage } from './MyOrdersPage';
import {
  User,
  Package,
  Heart,
  MapPin,
  Settings,
  LogOut,
  Sun,
  Moon,
  Mail,
  Phone,
  Edit3,
  Check,
  X,
  Plus,
  Trash2,
  Lock,
  Bell,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  ShoppingCart
} from 'lucide-react';

export const ProfilePage = ({ initialTab = 'profile' }) => {
  const { user, isGuest, isAdmin, logout, updateUserProfile } = useAuth();
  const { theme, setTheme, pageParams, products, wishlist, toggleWishlist, addToCart, orders, navigate, showToast } = useApp();

  // If Admin attempts to access customer Profile, redirect immediately to Admin Dashboard
  useEffect(() => {
    if (isAdmin) {
      navigate('/admin/dashboard');
    }
  }, [isAdmin, navigate]);

  const [activeTab, setActiveTab] = useState(initialTab || pageParams?.tab || 'profile');

  // Edit Profile state
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editFormData, setEditFormData] = useState({
    fullName: '',
    email: '',
    mobile: '',
  });
  const [profileError, setProfileError] = useState('');
  const [profileSuccess, setProfileSuccess] = useState('');
  const [isSavingProfile, setIsSavingProfile] = useState(false);

  // Addresses State (Persisted in localStorage)
  const [addresses, setAddresses] = useState(() => {
    const saved = localStorage.getItem('crackers_user_addresses');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return [
      {
        id: 1,
        label: 'Home',
        fullName: user?.name || 'Customer Name',
        phone: user?.mobile || '9841012345',
        street: 'Flat 402, Sai Residency, T. Nagar',
        city: 'Chennai',
        state: 'Tamil Nadu',
        pincode: '600017',
        isDefault: true,
      },
      {
        id: 2,
        label: 'Office',
        fullName: user?.name || 'Customer Name',
        phone: user?.mobile || '9841012345',
        street: 'Tech Park, 3rd Floor, Guindy',
        city: 'Chennai',
        state: 'Tamil Nadu',
        pincode: '600032',
        isDefault: false,
      }
    ];
  });

  const [addressModalOpen, setAddressModalOpen] = useState(false);
  const [editingAddressId, setEditingAddressId] = useState(null);
  const [addressForm, setAddressForm] = useState({
    label: 'Home',
    fullName: '',
    phone: '',
    street: '',
    city: '',
    state: '',
    pincode: '',
    isDefault: false,
  });

  // Settings State: Preferences & Security
  const [notifications, setNotifications] = useState({
    emailUpdates: true,
    smsAlerts: true,
    promotions: false,
  });

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [passwordError, setPasswordError] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState('');

  // Synchronize tab if passed via props or params
  useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    } else if (pageParams?.tab) {
      setActiveTab(pageParams.tab);
    }
  }, [initialTab, pageParams?.tab]);

  // Sync edit form whenever user object changes
  useEffect(() => {
    if (user) {
      setEditFormData({
        fullName: user.name || '',
        email: user.email || '',
        mobile: user.mobile || '',
      });
    }
  }, [user]);

  // Persist addresses
  useEffect(() => {
    localStorage.setItem('crackers_user_addresses', JSON.stringify(addresses));
  }, [addresses]);

  if (isAdmin) {
    return null;
  }

  if (isGuest) {
    return (
      <div className="max-w-md mx-auto px-4 py-16 text-center animate-fade-in">
        <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-amber-100 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 flex items-center justify-center">
          <User className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Profile Access
        </h2>
        <p className="text-xs sm:text-sm text-gray-500 mb-6">
          Please login to view and manage your profile, orders, addresses, and wishlist.
        </p>
        <button
          onClick={() => navigate('login', { returnUrl: 'profile' })}
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-maroon-800 to-red-600 text-white font-bold text-xs shadow hover:from-maroon-900"
        >
          Login to Your Account
        </button>
      </div>
    );
  }

  const wishlistProducts = products.filter((p) => wishlist.includes(p.id));

  const handleLogout = () => {
    logout();
    showToast('Logged out successfully', 'info');
    navigate('login');
  };

  // Profile Edit Handlers
  const handleStartEditProfile = () => {
    setProfileError('');
    setProfileSuccess('');
    setEditFormData({
      fullName: user?.name || '',
      email: user?.email || '',
      mobile: user?.mobile || '',
    });
    setIsEditingProfile(true);
  };

  const handleCancelEditProfile = () => {
    setIsEditingProfile(false);
    setProfileError('');
    setProfileSuccess('');
    setEditFormData({
      fullName: user?.name || '',
      email: user?.email || '',
      mobile: user?.mobile || '',
    });
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setProfileError('');
    setProfileSuccess('');

    const nameTrim = editFormData.fullName.trim();
    const emailTrim = editFormData.email.trim();
    const mobileTrim = editFormData.mobile.trim();

    // 1. Required fields validation
    if (!nameTrim) {
      setProfileError('Full Name is required.');
      return;
    }
    if (!emailTrim) {
      setProfileError('Email address is required.');
      return;
    }
    if (!mobileTrim) {
      setProfileError('Mobile number is required.');
      return;
    }

    // 2. Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailTrim)) {
      setProfileError('Please enter a valid email address (e.g. name@domain.com).');
      return;
    }

    // 3. Mobile number validation (Must be 10 digits)
    const mobileRegex = /^[0-9]{10}$/;
    if (!mobileRegex.test(mobileTrim)) {
      setProfileError('Please enter a valid 10-digit mobile number.');
      return;
    }

    setIsSavingProfile(true);

    const res = await updateUserProfile({
      name: nameTrim,
      email: emailTrim,
      mobile: mobileTrim,
    });

    setIsSavingProfile(false);

    if (res.success) {
      setProfileSuccess('Profile updated successfully!');
      showToast('Profile details updated successfully!', 'success');
      setIsEditingProfile(false);
    } else {
      setProfileError(res.message || 'Failed to update profile. Please try again.');
      showToast(res.message || 'Profile update failed.', 'error');
    }
  };

  // Address CRUD Handlers
  const handleOpenAddAddress = () => {
    setEditingAddressId(null);
    setAddressForm({
      label: 'Home',
      fullName: user?.name || '',
      phone: user?.mobile || '',
      street: '',
      city: 'Chennai',
      state: 'Tamil Nadu',
      pincode: '',
      isDefault: addresses.length === 0,
    });
    setAddressModalOpen(true);
  };

  const handleOpenEditAddress = (addr) => {
    setEditingAddressId(addr.id);
    setAddressForm({ ...addr });
    setAddressModalOpen(true);
  };

  const handleSaveAddress = (e) => {
    e.preventDefault();
    if (!addressForm.street || !addressForm.city || !addressForm.pincode) {
      showToast('Please fill in all address details', 'warning');
      return;
    }

    let updatedList = [...addresses];

    if (addressForm.isDefault) {
      updatedList = updatedList.map((a) => ({ ...a, isDefault: false }));
    }

    if (editingAddressId) {
      updatedList = updatedList.map((a) =>
        a.id === editingAddressId ? { ...addressForm, id: editingAddressId } : a
      );
      showToast('Address updated successfully', 'success');
    } else {
      const newAddr = { ...addressForm, id: Date.now() };
      updatedList.push(newAddr);
      showToast('New address added', 'success');
    }

    setAddresses(updatedList);
    setAddressModalOpen(false);
  };

  const handleDeleteAddress = (id) => {
    const updated = addresses.filter((a) => a.id !== id);
    setAddresses(updated);
    showToast('Address removed', 'info');
  };

  const handleSetDefaultAddress = (id) => {
    const updated = addresses.map((a) => ({
      ...a,
      isDefault: a.id === id,
    }));
    setAddresses(updated);
    showToast('Default delivery address updated', 'info');
  };

  // Password Change Handler
  const handleChangePasswordSubmit = (e) => {
    e.preventDefault();
    setPasswordError('');
    setPasswordSuccess('');

    if (!passwordForm.currentPassword) {
      setPasswordError('Please enter your current password.');
      return;
    }
    if (passwordForm.newPassword.length < 6) {
      setPasswordError('New password must be at least 6 characters.');
      return;
    }
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setPasswordError('New password and confirm password do not match.');
      return;
    }

    setPasswordSuccess('Password changed successfully!');
    showToast('Password updated successfully!', 'success');
    setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in">
      {/* Header Profile Badge */}
      <div className="bg-white dark:bg-[#1E2026] rounded-2xl border border-gray-200 dark:border-gray-800 p-6 shadow-sm flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6">
        <div className="flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-maroon-800 to-amber-500 flex items-center justify-center text-white text-3xl font-black shadow-lg">
            <User className="w-9 h-9 text-white" />
          </div>
          <div>
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3">
              <h1 className="text-2xl font-black text-gray-900 dark:text-white">
                {user?.name}
              </h1>
              <span className="text-[10px] font-bold uppercase tracking-wider bg-amber-100 dark:bg-amber-950/50 text-amber-800 dark:text-amber-300 px-2 py-0.5 rounded">
                Verified Customer
              </span>
            </div>
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 mt-2 text-xs text-gray-500">
              <span className="flex items-center gap-1">
                <Mail className="w-3.5 h-3.5 text-gray-400" />
                {user?.email}
              </span>
              <span className="flex items-center gap-1">
                <Phone className="w-3.5 h-3.5 text-gray-400" />
                {user?.mobile}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleStartEditProfile}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-maroon-800 to-red-600 hover:from-maroon-900 hover:to-red-700 text-white text-xs font-bold shadow-md flex items-center gap-1.5 transition-all"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Edit Profile</span>
          </button>
          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded-xl border border-rose-200 dark:border-rose-900 text-rose-700 dark:text-rose-400 text-xs font-bold hover:bg-rose-50 dark:hover:bg-rose-950/40 flex items-center gap-1.5 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Sidebar Tabs + Content */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Navigation Tabs */}
        <aside className="space-y-1 bg-white dark:bg-[#1E2026] rounded-2xl border border-gray-200 dark:border-gray-800 p-3 h-fit shadow-sm">
          {[
            { id: 'profile', label: 'My Profile', icon: User },
            { id: 'orders', label: 'My Orders', icon: Package, count: orders.length },
            { id: 'wishlist', label: 'Wishlist', icon: Heart, count: wishlist.length },
            { id: 'addresses', label: 'Addresses', icon: MapPin, count: addresses.length },
            { id: 'settings', label: 'Settings', icon: Settings },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs font-bold transition-all ${
                  isActive
                    ? 'bg-red-50 dark:bg-amber-950/40 text-red-700 dark:text-amber-300 border-l-4 border-maroon-800 dark:border-amber-400'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </div>
                {tab.count !== undefined && (
                  <span className="text-[10px] bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded-full font-bold">
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}

          <div className="pt-2 border-t border-gray-100 dark:border-gray-800">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-xs font-bold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>
        </aside>

        {/* Tab Content Container */}
        <main className="md:col-span-3">
          {/* Global Profile Success Banner */}
          {profileSuccess && (
            <div className="mb-6 p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs font-bold flex items-center justify-between shadow-sm animate-fade-in">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>{profileSuccess}</span>
              </div>
              <button onClick={() => setProfileSuccess('')} className="text-emerald-600 hover:text-emerald-800">
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* TAB 1: My Profile */}
          {activeTab === 'profile' && (
            <div className="bg-white dark:bg-[#1E2026] rounded-2xl border border-gray-200 dark:border-gray-800 p-6 shadow-sm space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-gray-800">
                <div>
                  <h3 className="font-bold text-lg text-gray-900 dark:text-white">
                    Personal Information
                  </h3>
                  <p className="text-xs text-gray-500">Manage your name, email address, and mobile number</p>
                </div>
                {!isEditingProfile && (
                  <button
                    onClick={handleStartEditProfile}
                    className="px-3.5 py-1.5 rounded-xl bg-red-50 dark:bg-amber-950/40 text-red-700 dark:text-amber-300 hover:bg-red-100 text-xs font-bold flex items-center gap-1.5 transition-colors"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>Edit Details</span>
                  </button>
                )}
              </div>

              {/* Error Box */}
              {profileError && (
                <div className="p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-900 text-rose-700 dark:text-rose-300 text-xs font-semibold flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{profileError}</span>
                </div>
              )}

              {isEditingProfile ? (
                /* Edit Profile Form */
                <form onSubmit={handleSaveProfile} className="space-y-5 animate-fade-in">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={editFormData.fullName}
                        onChange={(e) => {
                          setEditFormData({ ...editFormData, fullName: e.target.value });
                          if (profileError) setProfileError('');
                        }}
                        placeholder="Enter full name"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#15161A] text-xs font-medium text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-600/30"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        value={editFormData.email}
                        onChange={(e) => {
                          setEditFormData({ ...editFormData, email: e.target.value });
                          if (profileError) setProfileError('');
                        }}
                        placeholder="customer@example.com"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#15161A] text-xs font-medium text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-600/30"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                        Mobile Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        value={editFormData.mobile}
                        onChange={(e) => {
                          setEditFormData({ ...editFormData, mobile: e.target.value });
                          if (profileError) setProfileError('');
                        }}
                        placeholder="10-digit mobile number"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#15161A] text-xs font-medium text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-600/30"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                        Account Role
                      </label>
                      <input
                        type="text"
                        disabled
                        value={user?.role || 'Customer'}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-100 dark:bg-gray-800 text-xs font-medium text-gray-500 cursor-not-allowed capitalize"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100 dark:border-gray-800">
                    <button
                      type="button"
                      onClick={handleCancelEditProfile}
                      disabled={isSavingProfile}
                      className="px-5 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 text-xs font-bold text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isSavingProfile}
                      className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-maroon-800 to-red-600 hover:from-maroon-900 hover:to-red-700 text-white font-extrabold text-xs shadow-md transition-all flex items-center gap-1.5"
                    >
                      <Check className="w-4 h-4" />
                      <span>{isSavingProfile ? 'Saving...' : 'Save Changes'}</span>
                    </button>
                  </div>
                </form>
              ) : (
                /* View Profile Details */
                <div className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
                    <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/40 border border-gray-100 dark:border-gray-800">
                      <span className="text-gray-400 uppercase tracking-wider block mb-1 font-semibold text-[10px]">
                        Full Name
                      </span>
                      <p className="font-bold text-gray-900 dark:text-white text-base">{user?.name}</p>
                    </div>

                    <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/40 border border-gray-100 dark:border-gray-800">
                      <span className="text-gray-400 uppercase tracking-wider block mb-1 font-semibold text-[10px]">
                        Email Address
                      </span>
                      <p className="font-bold text-gray-900 dark:text-white text-base">{user?.email}</p>
                    </div>

                    <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/40 border border-gray-100 dark:border-gray-800">
                      <span className="text-gray-400 uppercase tracking-wider block mb-1 font-semibold text-[10px]">
                        Mobile Number
                      </span>
                      <p className="font-bold text-gray-900 dark:text-white text-base">{user?.mobile}</p>
                    </div>

                    <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/40 border border-gray-100 dark:border-gray-800">
                      <span className="text-gray-400 uppercase tracking-wider block mb-1 font-semibold text-[10px]">
                        Account Status
                      </span>
                      <p className="font-bold text-emerald-600 text-base capitalize flex items-center gap-1.5">
                        <ShieldCheck className="w-4 h-4" />
                        <span>Active Verified Customer</span>
                      </p>
                    </div>
                  </div>

                  {/* Summary Cards */}
                  <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-100 dark:border-gray-800">
                    <div className="p-4 rounded-xl bg-amber-50/50 dark:bg-amber-950/30 border border-amber-200/50 dark:border-amber-900/50 text-center">
                      <span className="text-2xl font-black text-maroon-800 dark:text-amber-400 block">{orders.length}</span>
                      <span className="text-[11px] font-bold text-gray-600 dark:text-gray-400">Total Orders</span>
                    </div>

                    <div className="p-4 rounded-xl bg-amber-50/50 dark:bg-amber-950/30 border border-amber-200/50 dark:border-amber-900/50 text-center">
                      <span className="text-2xl font-black text-maroon-800 dark:text-amber-400 block">{wishlist.length}</span>
                      <span className="text-[11px] font-bold text-gray-600 dark:text-gray-400">Wishlist Items</span>
                    </div>

                    <div className="p-4 rounded-xl bg-amber-50/50 dark:bg-amber-950/30 border border-amber-200/50 dark:border-amber-900/50 text-center">
                      <span className="text-2xl font-black text-maroon-800 dark:text-amber-400 block">{addresses.length}</span>
                      <span className="text-[11px] font-bold text-gray-600 dark:text-gray-400">Saved Addresses</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: My Orders (Embedded Full Orders Component) */}
          {activeTab === 'orders' && (
            <div className="bg-white dark:bg-[#1E2026] rounded-2xl border border-gray-200 dark:border-gray-800 p-6 shadow-sm">
              <MyOrdersPage />
            </div>
          )}

          {/* TAB 3: Wishlist */}
          {activeTab === 'wishlist' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-gray-200 dark:border-gray-800">
                <h3 className="font-bold text-lg text-gray-900 dark:text-white">
                  My Wishlist ({wishlistProducts.length})
                </h3>
                <button
                  onClick={() => navigate('shop')}
                  className="text-xs font-bold text-red-700 dark:text-amber-400 hover:underline flex items-center gap-1"
                >
                  <span>Explore More Crackers</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {wishlistProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {wishlistProducts.map((p) => (
                    <div key={p.id} className="relative group">
                      <ProductCard product={p} />
                      <div className="mt-2 flex gap-2">
                        <button
                          onClick={() => addToCart(p)}
                          className="flex-1 py-2 rounded-xl bg-maroon-800 hover:bg-maroon-900 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow transition-colors"
                        >
                          <ShoppingCart className="w-3.5 h-3.5" />
                          <span>Add to Cart</span>
                        </button>
                        <button
                          onClick={() => toggleWishlist(p)}
                          className="p-2 rounded-xl border border-rose-200 dark:border-rose-900 text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                          title="Remove from Wishlist"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-white dark:bg-[#1E2026] rounded-2xl border border-dashed border-gray-300 dark:border-gray-800 p-12 text-center space-y-4">
                  <div className="w-12 h-12 mx-auto rounded-full bg-rose-50 dark:bg-rose-950/40 text-rose-500 flex items-center justify-center">
                    <Heart className="w-6 h-6" />
                  </div>
                  <p className="text-sm font-semibold text-gray-500">
                    Your wishlist is empty. Save your favorite fireworks to order them anytime!
                  </p>
                  <button
                    onClick={() => navigate('shop')}
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-maroon-800 to-red-600 text-white font-bold text-xs shadow hover:from-maroon-900"
                  >
                    Browse Crackers Catalog
                  </button>
                </div>
              )}
            </div>
          )}

          {/* TAB 4: Addresses */}
          {activeTab === 'addresses' && (
            <div className="bg-white dark:bg-[#1E2026] rounded-2xl border border-gray-200 dark:border-gray-800 p-6 shadow-sm space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-gray-800">
                <div>
                  <h3 className="font-bold text-lg text-gray-900 dark:text-white">
                    Saved Delivery Addresses
                  </h3>
                  <p className="text-xs text-gray-500">Manage your festival shipment delivery locations</p>
                </div>
                <button
                  onClick={handleOpenAddAddress}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-maroon-800 to-red-600 hover:from-maroon-900 text-white text-xs font-bold shadow flex items-center gap-1.5 transition-all"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Address</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {addresses.map((addr) => (
                  <div
                    key={addr.id}
                    className={`p-5 rounded-2xl border transition-all space-y-3 relative ${
                      addr.isDefault
                        ? 'border-amber-400 dark:border-amber-500 bg-amber-50/40 dark:bg-amber-950/20 shadow-sm'
                        : 'border-gray-200 dark:border-gray-800 bg-white dark:bg-[#15161A]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-gray-900 dark:text-white">
                          {addr.label}
                        </span>
                        {addr.isDefault && (
                          <span className="text-[10px] bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 px-2 py-0.5 rounded font-bold">
                            Default
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => handleOpenEditAddress(addr)}
                          className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors"
                          title="Edit address"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteAddress(addr.id)}
                          className="p-1.5 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/40 text-rose-500 transition-colors"
                          title="Delete address"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <div className="text-xs space-y-1 text-gray-700 dark:text-gray-300">
                      <p className="font-bold text-gray-900 dark:text-white">{addr.fullName}</p>
                      <p className="font-medium">{addr.street}</p>
                      <p>{addr.city}, {addr.state} - {addr.pincode}</p>
                      <p className="text-gray-500 pt-1">Phone: {addr.phone}</p>
                    </div>

                    {!addr.isDefault && (
                      <button
                        onClick={() => handleSetDefaultAddress(addr.id)}
                        className="text-[11px] font-bold text-maroon-800 dark:text-amber-400 hover:underline pt-1 block"
                      >
                        Set as Default Address
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: Settings (Theme & Preferences & Password) */}
          {activeTab === 'settings' && (
            <div className="bg-white dark:bg-[#1E2026] rounded-2xl border border-gray-200 dark:border-gray-800 p-6 shadow-sm space-y-8">
              {/* Theme Selection */}
              <div>
                <h3 className="font-bold text-lg text-gray-900 dark:text-white">
                  Appearance Theme
                </h3>
                <p className="text-xs text-gray-500 mt-0.5">
                  Select your preferred color theme for Sivakasi Sparkles
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                  {/* Light Theme */}
                  <label
                    onClick={() => {
                      setTheme('light');
                      showToast('Switched to Light Theme', 'info');
                    }}
                    className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-all ${
                      theme === 'light'
                        ? 'border-maroon-700 bg-amber-50/50 shadow-sm'
                        : 'border-gray-200 dark:border-gray-800 hover:border-gray-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="theme_select"
                      checked={theme === 'light'}
                      onChange={() => setTheme('light')}
                      className="accent-maroon-700"
                    />
                    <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center">
                      <Sun className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="font-bold text-xs text-gray-900 dark:text-white block">
                        Light Theme
                      </span>
                      <span className="text-[11px] text-gray-500">
                        Cream/white background with warm maroon accents
                      </span>
                    </div>
                  </label>

                  {/* Dark Theme */}
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
                      name="theme_select"
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
                        Dark charcoal background with warm golden accents
                      </span>
                    </div>
                  </label>
                </div>
              </div>

              {/* Notification Preferences */}
              <div className="pt-6 border-t border-gray-100 dark:border-gray-800 space-y-4">
                <div className="flex items-center gap-2">
                  <Bell className="w-5 h-5 text-maroon-800 dark:text-amber-400" />
                  <div>
                    <h4 className="font-bold text-sm text-gray-900 dark:text-white">
                      Notification Preferences
                    </h4>
                    <p className="text-xs text-gray-500">Choose how you receive order and offer alerts</p>
                  </div>
                </div>

                <div className="space-y-3 pt-2 text-xs">
                  <label className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-gray-800/40 border border-gray-100 dark:border-gray-800 cursor-pointer">
                    <span className="font-semibold text-gray-800 dark:text-gray-200">Email Order Dispatch Updates</span>
                    <input
                      type="checkbox"
                      checked={notifications.emailUpdates}
                      onChange={(e) => {
                        setNotifications({ ...notifications, emailUpdates: e.target.checked });
                        showToast('Notification preference saved', 'info');
                      }}
                      className="w-4 h-4 accent-maroon-800 rounded"
                    />
                  </label>

                  <label className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-gray-800/40 border border-gray-100 dark:border-gray-800 cursor-pointer">
                    <span className="font-semibold text-gray-800 dark:text-gray-200">SMS Delivery Tracking Alerts</span>
                    <input
                      type="checkbox"
                      checked={notifications.smsAlerts}
                      onChange={(e) => {
                        setNotifications({ ...notifications, smsAlerts: e.target.checked });
                        showToast('Notification preference saved', 'info');
                      }}
                      className="w-4 h-4 accent-maroon-800 rounded"
                    />
                  </label>
                </div>
              </div>

              {/* Security & Password */}
              <div className="pt-6 border-t border-gray-100 dark:border-gray-800 space-y-4">
                <div className="flex items-center gap-2">
                  <Lock className="w-5 h-5 text-maroon-800 dark:text-amber-400" />
                  <div>
                    <h4 className="font-bold text-sm text-gray-900 dark:text-white">
                      Password & Security
                    </h4>
                    <p className="text-xs text-gray-500">Update your customer account password</p>
                  </div>
                </div>

                {passwordError && (
                  <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 text-rose-700 text-xs font-semibold">
                    {passwordError}
                  </div>
                )}
                {passwordSuccess && (
                  <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 text-emerald-700 text-xs font-semibold">
                    {passwordSuccess}
                  </div>
                )}

                <form onSubmit={handleChangePasswordSubmit} className="space-y-4 max-w-md pt-2">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                      Current Password
                    </label>
                    <input
                      type="password"
                      value={passwordForm.currentPassword}
                      onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                      placeholder="Enter current password"
                      className="w-full px-3.5 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#15161A] text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                      New Password
                    </label>
                    <input
                      type="password"
                      value={passwordForm.newPassword}
                      onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                      placeholder="Enter new password (min 6 chars)"
                      className="w-full px-3.5 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#15161A] text-xs"
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
                      placeholder="Re-enter new password"
                      className="w-full px-3.5 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#15161A] text-xs"
                    />
                  </div>

                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-maroon-800 to-red-600 text-white font-bold text-xs shadow hover:from-maroon-900"
                  >
                    Update Password
                  </button>
                </form>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Address Modal (Add / Edit) */}
      {addressModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-lg bg-white dark:bg-[#1E2026] rounded-2xl p-6 shadow-2xl space-y-4 border border-gray-200 dark:border-gray-800">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-gray-800">
              <h3 className="text-base font-bold text-gray-900 dark:text-white">
                {editingAddressId ? 'Edit Address' : 'Add New Delivery Address'}
              </h3>
              <button onClick={() => setAddressModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveAddress} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1">Address Label</label>
                  <select
                    value={addressForm.label}
                    onChange={(e) => setAddressForm({ ...addressForm, label: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#15161A]"
                  >
                    <option value="Home">Home</option>
                    <option value="Office">Office</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={addressForm.fullName}
                    onChange={(e) => setAddressForm({ ...addressForm, fullName: e.target.value })}
                    placeholder="Recipient name"
                    className="w-full px-3 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#15161A]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    required
                    value={addressForm.phone}
                    onChange={(e) => setAddressForm({ ...addressForm, phone: e.target.value })}
                    placeholder="10-digit phone"
                    className="w-full px-3 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#15161A]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1">Pincode</label>
                  <input
                    type="text"
                    required
                    value={addressForm.pincode}
                    onChange={(e) => setAddressForm({ ...addressForm, pincode: e.target.value })}
                    placeholder="600017"
                    className="w-full px-3 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#15161A]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1">Street / House No / Area</label>
                <input
                  type="text"
                  required
                  value={addressForm.street}
                  onChange={(e) => setAddressForm({ ...addressForm, street: e.target.value })}
                  placeholder="Flat No, Building Name, Street"
                  className="w-full px-3 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#15161A]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1">City</label>
                  <input
                    type="text"
                    required
                    value={addressForm.city}
                    onChange={(e) => setAddressForm({ ...addressForm, city: e.target.value })}
                    placeholder="Chennai"
                    className="w-full px-3 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#15161A]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1">State</label>
                  <input
                    type="text"
                    required
                    value={addressForm.state}
                    onChange={(e) => setAddressForm({ ...addressForm, state: e.target.value })}
                    placeholder="Tamil Nadu"
                    className="w-full px-3 py-2 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#15161A]"
                  />
                </div>
              </div>

              <label className="flex items-center gap-2 pt-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={addressForm.isDefault}
                  onChange={(e) => setAddressForm({ ...addressForm, isDefault: e.target.checked })}
                  className="w-4 h-4 accent-maroon-800 rounded"
                />
                <span className="font-semibold text-gray-700 dark:text-gray-300">Set as default delivery address</span>
              </label>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-gray-100 dark:border-gray-800">
                <button
                  type="button"
                  onClick={() => setAddressModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-maroon-800 to-red-600 text-white font-extrabold shadow hover:from-maroon-900"
                >
                  Save Address
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
