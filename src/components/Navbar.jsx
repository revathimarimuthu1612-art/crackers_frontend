import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useApp } from '../context/AppContext';
import {
  Sparkles,
  Search,
  ShoppingCart,
  User,
  Package,
  Heart,
  LogOut,
  ChevronDown,
  Menu,
  X,
  Flame,
  ShieldCheck,
} from 'lucide-react';

export const Navbar = () => {
  const { user, isUser, isGuest, isAdmin, logout } = useAuth();
  const {
    cartCount,
    wishlist,
    currentPage,
    navigate,
    globalSearch,
    setGlobalSearch,
    showToast,
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (currentPage !== 'shop') {
      navigate('shop', { search: globalSearch });
    }
  };

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'services', label: 'Services' },
    { id: 'shop', label: 'Shop' },
    { id: 'categories', label: 'Categories' },
    { id: 'offers', label: 'Offers' },
  ];

  // If customer user is logged in, also show My Orders in customer desktop menu
  if (isUser) {
    navLinks.push({ id: 'orders', label: 'My Orders' });
  }

  const handleLogoutClick = () => {
    logout();
    setProfileDropdownOpen(false);
    showToast('Logged out successfully', 'info');
    navigate('home');
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-[#15161A]/95 backdrop-blur-md border-b border-amber-200/50 dark:border-gray-800 transition-colors duration-200">
      {/* Top Banner Notice */}
      <div className="bg-gradient-to-r from-maroon-900 via-red-800 to-amber-700 text-amber-100 text-[11px] sm:text-xs py-1.5 px-3 sm:px-4 text-center font-medium flex items-center justify-center gap-1.5 overflow-hidden">
        <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse flex-shrink-0" />
        <span className="truncate sm:whitespace-normal">
          Diwali Festival Booking Open! Flat 10% Extra Discount Applied.
        </span>
        <span className="hidden lg:inline bg-amber-400/20 px-2 py-0.5 rounded text-[11px] font-semibold border border-amber-300/30 flex-shrink-0">
          PESO Certified Sivakasi Fireworks
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-2 sm:gap-4">
          {/* Brand Logo */}
          <button
            onClick={() => navigate('home')}
            className="flex items-center gap-2 sm:gap-3 group text-left focus:outline-none min-w-0 flex-shrink"
          >
            <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-maroon-800 to-red-600 flex items-center justify-center text-amber-300 shadow-md shadow-red-900/20 group-hover:scale-105 transition-transform flex-shrink-0">
              <Flame className="w-5 h-5 sm:w-6 sm:h-6 animate-pulse" />
            </div>
            <div className="min-w-0">
              <span className="text-base sm:text-xl lg:text-2xl font-black tracking-tight text-gray-900 dark:text-white flex items-center gap-1 sm:gap-1.5 whitespace-nowrap">
                Sivakasi <span className="text-red-600 dark:text-amber-400">Sparkles</span>
              </span>
              <span className="hidden sm:block text-[11px] font-medium uppercase tracking-wider text-amber-800 dark:text-amber-400/80 -mt-1 truncate">
                E-Commerce & Management
              </span>
            </div>
          </button>

          {/* Search Bar (Desktop & Tablet) */}
          <form
            onSubmit={handleSearchSubmit}
            className="hidden md:flex flex-1 min-w-[220px] max-w-md mx-2 xl:mx-4 relative"
          >
            <div className="relative w-full flex items-center">
              <input
                type="text"
                value={globalSearch}
                onChange={(e) => setGlobalSearch(e.target.value)}
                placeholder="Search crackers, rockets, sparklers..."
                className="w-full pl-10 pr-10 py-2.5 rounded-full border-2 border-amber-300 dark:border-gray-700 bg-white dark:bg-[#1E2026] text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 text-xs sm:text-sm font-medium focus:outline-none focus:border-maroon-700 dark:focus:border-amber-400 focus:ring-2 focus:ring-maroon-700/20 shadow-sm transition-all"
              />
              <Search className="w-4 h-4 text-maroon-800 dark:text-amber-400 absolute left-3.5" />
              {globalSearch ? (
                <button
                  type="button"
                  onClick={() => setGlobalSearch('')}
                  className="absolute right-3.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                >
                  <X className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="submit"
                  className="absolute right-2 p-1.5 rounded-full bg-maroon-800 dark:bg-amber-500 text-white dark:text-gray-950 hover:opacity-90 transition-opacity"
                  title="Search"
                >
                  <Search className="w-3 h-3" />
                </button>
              )}
            </div>
          </form>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5">
            {navLinks.map((link) => {
              const isActive = currentPage === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => navigate(link.id)}
                  className={`px-2.5 xl:px-3 py-2 rounded-lg text-xs xl:text-sm font-semibold transition-all whitespace-nowrap ${
                    isActive
                      ? 'text-red-700 dark:text-amber-400 bg-red-50 dark:bg-amber-950/30'
                      : 'text-gray-700 dark:text-gray-300 hover:text-red-700 dark:hover:text-amber-400 hover:bg-gray-100/60 dark:hover:bg-gray-800/40'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* User Actions & Auth */}
          <div className="flex items-center gap-1.5 sm:gap-3 flex-shrink-0">
            {/* Wishlist Icon */}
            {isUser && (
              <button
                onClick={() => navigate('profile', { tab: 'wishlist' })}
                className="relative p-2 sm:p-2.5 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                title="Wishlist"
              >
                <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 dark:text-gray-300 hover:text-red-600" />
                {wishlist.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-amber-500 text-white text-[10px] sm:text-[11px] font-bold flex items-center justify-center shadow">
                    {wishlist.length}
                  </span>
                )}
              </button>
            )}

            {/* Cart Icon */}
            <button
              onClick={() => navigate('cart')}
              className="relative p-2 sm:p-2.5 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              title="Cart"
            >
              <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700 dark:text-gray-300" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-red-600 text-white text-[10px] sm:text-[11px] font-bold flex items-center justify-center shadow-md animate-pulse">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Customer Login vs Profile */}
            {isUser ? (
              <div className="relative">
                <button
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="flex items-center gap-1.5 sm:gap-2 p-1.5 sm:pl-2 sm:pr-3 sm:py-1.5 rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/80 transition-colors"
                >
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-gradient-to-tr from-maroon-700 to-amber-500 flex items-center justify-center text-white font-bold text-xs sm:text-sm shadow">
                    <User className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
                  </div>
                  <div className="hidden sm:block text-left text-xs">
                    <span className="font-semibold text-gray-900 dark:text-white block truncate max-w-[100px]">
                      {user?.name || 'Account'}
                    </span>
                    <span className="text-gray-500 dark:text-gray-400 block -mt-0.5">
                      Customer
                    </span>
                  </div>
                  <ChevronDown className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-gray-500" />
                </button>

                {/* Profile Dropdown */}
                {profileDropdownOpen && (
                  <div
                    onMouseLeave={() => setProfileDropdownOpen(false)}
                    className="absolute right-0 mt-2 w-52 bg-white dark:bg-[#1E2026] rounded-xl shadow-xl border border-gray-200 dark:border-gray-800 py-2 z-50 animate-fade-in"
                  >
                    <div className="px-4 py-2 border-b border-gray-100 dark:border-gray-800">
                      <p className="text-xs text-gray-500 dark:text-gray-400">Signed in as</p>
                      <p className="text-sm font-bold text-gray-900 dark:text-white truncate">
                        {user.name}
                      </p>
                    </div>

                    <button
                      onClick={() => {
                        navigate('profile');
                        setProfileDropdownOpen(false);
                      }}
                      className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-amber-50 dark:hover:bg-gray-800 flex items-center gap-2"
                    >
                      <User className="w-4 h-4 text-maroon-700 dark:text-amber-400" />
                      <span>My Profile</span>
                    </button>

                    <button
                      onClick={() => {
                        navigate('orders');
                        setProfileDropdownOpen(false);
                      }}
                      className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-amber-50 dark:hover:bg-gray-800 flex items-center gap-2"
                    >
                      <Package className="w-4 h-4 text-maroon-700 dark:text-amber-400" />
                      <span>My Orders</span>
                    </button>

                    <button
                      onClick={() => {
                        navigate('profile', { tab: 'settings' });
                        setProfileDropdownOpen(false);
                      }}
                      className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-amber-50 dark:hover:bg-gray-800 flex items-center gap-2"
                    >
                      <ShieldCheck className="w-4 h-4 text-maroon-700 dark:text-amber-400" />
                      <span>Theme & Settings</span>
                    </button>

                    <div className="border-t border-gray-100 dark:border-gray-800 my-1"></div>

                    <button
                      onClick={handleLogoutClick}
                      className="w-full px-4 py-2 text-left text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 flex items-center gap-2 font-medium"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Logout</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => navigate('login')}
                className="flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-xl bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-700 hover:to-amber-700 text-white font-bold text-xs sm:text-sm shadow-md hover:shadow-red-900/30 transition-all hover:scale-105 active:scale-95"
              >
                <User className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span>Login</span>
              </button>
            )}

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-1.5 sm:p-2 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="md:hidden pb-3">
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              type="text"
              value={globalSearch}
              onChange={(e) => setGlobalSearch(e.target.value)}
              placeholder="Search crackers, rockets, flower pots..."
              className="w-full pl-9 pr-8 py-2 rounded-full border border-gray-300 dark:border-gray-700 bg-amber-50/40 dark:bg-gray-800/60 text-gray-900 dark:text-gray-100 text-sm focus:outline-none"
            />
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
          </form>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-gray-200 dark:border-gray-800 space-y-1 animate-fade-in">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => {
                  navigate(link.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                  currentPage === link.id
                    ? 'text-red-700 dark:text-amber-400 bg-red-50 dark:bg-amber-950/30'
                    : 'text-gray-700 dark:text-gray-300'
                }`}
              >
                {link.label}
              </button>
            ))}

            <div className="pt-2 border-t border-gray-100 dark:border-gray-800 space-y-1">
              {isUser ? (
                <button
                  onClick={() => {
                    navigate('/profile');
                    setMobileMenuOpen(false);
                  }}
                  className="w-full text-left px-4 py-2 text-xs font-bold text-gray-900 dark:text-white"
                >
                  My Customer Account ({user.name}) →
                </button>
              ) : (
                <button
                  onClick={() => {
                    navigate('/login');
                    setMobileMenuOpen(false);
                  }}
                  className="w-full text-left px-4 py-2 text-xs font-bold text-maroon-700 dark:text-amber-400"
                >
                  Customer Login →
                </button>
              )}

            </div>
          </div>
        )}
      </div>
    </header>
  );
};
