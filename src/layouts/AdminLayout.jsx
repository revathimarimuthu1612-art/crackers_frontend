import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useApp } from '../context/AppContext';
import {
  LayoutDashboard,
  Package,
  Layers,
  ShoppingBag,
  Users,
  Building2,
  Tag,
  BarChart3,
  Settings,
  LogOut,
  Menu,
  X,
  Flame,
  Sun,
  Moon,
  ExternalLink,
  User,
} from 'lucide-react';

export const AdminLayout = ({ activeTab, onTabChange, children }) => {
  const { admin, adminLogout } = useAuth();
  const { theme, setTheme, navigate, showToast } = useApp();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'products', label: 'Products', icon: Package },
    { id: 'categories', label: 'Categories', icon: Layers },
    { id: 'orders', label: 'Orders', icon: ShoppingBag },
    { id: 'customers', label: 'Customers', icon: Users },
    { id: 'sellers', label: 'Sellers / Manufacturers', icon: Building2 },
    { id: 'offers', label: 'Offers', icon: Tag },
    { id: 'reports', label: 'Reports', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const handleLogout = () => {
    adminLogout();
    showToast('Admin logged out successfully', 'info');
    navigate('/admin/login');
  };

  return (
    <div className="h-screen w-full flex overflow-hidden bg-gray-100 dark:bg-[#111215] text-gray-900 dark:text-gray-100 transition-colors duration-200">
      {/* Mobile Sidebar Backdrop */}
      {mobileMenuOpen && (
        <div
          onClick={() => setMobileMenuOpen(false)}
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden transition-opacity"
        ></div>
      )}

      {/* Sidebar (Permanently Stationed on Desktop, Drawer on Mobile) */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 h-full z-40 bg-[#16181D] text-gray-300 flex flex-col justify-between border-r border-gray-800 shrink-0 transition-all duration-300 shadow-xl lg:shadow-none ${
          sidebarCollapsed ? 'lg:w-20' : 'lg:w-64'
        } ${
          mobileMenuOpen ? 'w-64 translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="flex flex-col flex-1 min-h-0">
          {/* Admin Header / Logo */}
          <div className="h-16 px-4 flex items-center justify-between border-b border-gray-800 shrink-0">
            <div className="flex items-center gap-3 overflow-hidden">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-500 to-red-600 flex items-center justify-center text-gray-950 font-bold flex-shrink-0 shadow">
                <Flame className="w-5 h-5" />
              </div>
              {!sidebarCollapsed && (
                <div className="truncate">
                  <span className="font-black text-white text-sm tracking-tight block">
                    Admin Panel
                  </span>
                  <span className="text-[10px] text-amber-400 uppercase tracking-wider block -mt-0.5 font-semibold">
                    Sivakasi Sparkles
                  </span>
                </div>
              )}
            </div>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="lg:hidden text-gray-400 hover:text-white p-1 rounded-lg"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links - Internal smooth scrolling if window height is small */}
          <nav className="p-3 space-y-1 overflow-y-auto flex-1 custom-admin-scrollbar">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onTabChange(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-amber-500 text-gray-950 font-bold shadow-md shadow-amber-500/20'
                      : 'text-gray-400 hover:text-white hover:bg-gray-800/60'
                  }`}
                  title={sidebarCollapsed ? item.label : undefined}
                >
                  <Icon className="w-4 h-4 flex-shrink-0" />
                  {!sidebarCollapsed && <span className="truncate">{item.label}</span>}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="p-3 border-t border-gray-800 space-y-1 shrink-0 bg-[#16181D]">
          <button
            onClick={() => navigate('home')}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold text-gray-400 hover:text-amber-400 hover:bg-gray-800/60 transition-colors"
            title="View Live Website"
          >
            <ExternalLink className="w-4 h-4 flex-shrink-0" />
            {!sidebarCollapsed && <span className="truncate">View Live Store</span>}
          </button>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold text-rose-400 hover:bg-rose-950/30 transition-colors"
            title="Logout"
          >
            <LogOut className="w-4 h-4 flex-shrink-0" />
            {!sidebarCollapsed && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content Area - Pinned header, independently scrollable content screen */}
      <div className="flex-1 flex flex-col h-full min-w-0 overflow-hidden">
        {/* Top Navbar */}
        <header className="h-16 shrink-0 bg-white dark:bg-[#16181D] border-b border-gray-200 dark:border-gray-800 px-4 sm:px-6 flex items-center justify-between z-30 shadow-xs">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
              aria-label="Open menu"
            >
              <Menu className="w-5 h-5" />
            </button>
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="hidden lg:block p-2 rounded-lg text-gray-500 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              title="Toggle Sidebar"
              aria-label="Toggle Sidebar"
            >
              <Menu className="w-5 h-5" />
            </button>
            <button
              onClick={() => onTabChange('settings')}
              className="hidden sm:flex items-center gap-2 px-2.5 py-1.5 rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-left"
              title="Click to view & edit Admin Profile"
            >
              <div className="w-7 h-7 rounded-lg bg-amber-500 text-gray-950 font-bold text-xs flex items-center justify-center shadow-sm">
                <User className="w-4 h-4 text-gray-950" />
              </div>
              <div>
                <span className="text-[10px] text-gray-400 font-medium block leading-tight">Admin Profile</span>
                <span className="text-xs font-bold text-gray-900 dark:text-white block leading-tight">
                  {admin?.name || 'Project Administrator'}
                </span>
              </div>
            </button>
          </div>

          <div className="flex items-center gap-3">
            {/* Quick Theme Toggle in Admin Header */}
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="px-3 py-1.5 rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300 text-xs flex items-center gap-1.5 transition-colors"
              title="Toggle Theme"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-gray-600" />}
              <span className="hidden md:inline capitalize text-[11px] font-semibold">{theme}</span>
            </button>

            <button
              onClick={() => navigate('home')}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-100 dark:bg-amber-950/40 text-amber-900 dark:text-amber-300 text-xs font-bold hover:bg-amber-200 dark:hover:bg-amber-900/50 transition-colors"
            >
              <span>Customer Store</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>
        </header>

        {/* Content Body (the white screen area) - Smooth independent scroll */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden p-4 sm:p-6 lg:p-8 bg-gray-50/70 dark:bg-[#111215]">
          <div className="max-w-7xl mx-auto w-full pb-12">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};
