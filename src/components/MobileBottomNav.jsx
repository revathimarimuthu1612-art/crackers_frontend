import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useApp } from '../context/AppContext';
import { Home, ShoppingBag, ShoppingCart, Package, User } from 'lucide-react';

export const MobileBottomNav = () => {
  const { isGuest, isAdmin, openLoginPrompt } = useAuth();
  const { currentPage, navigate, cartCount } = useApp();

  const handleOrdersClick = () => {
    if (isAdmin) {
      navigate('/admin/dashboard');
    } else if (isGuest) {
      openLoginPrompt('/orders', 'Please login to view your order history.');
    } else {
      navigate('orders');
    }
  };

  const handleProfileClick = () => {
    if (isAdmin) {
      navigate('/admin/dashboard');
    } else if (isGuest) {
      navigate('login');
    } else {
      navigate('profile');
    }
  };

  const navItems = [
    { id: 'home', label: 'Home', icon: Home, onClick: () => navigate('home') },
    { id: 'shop', label: 'Shop', icon: ShoppingBag, onClick: () => navigate('shop') },
    {
      id: 'cart',
      label: 'Cart',
      icon: ShoppingCart,
      badge: cartCount > 0 ? cartCount : null,
      onClick: () => navigate('cart'),
    },
    { id: 'orders', label: 'Orders', icon: Package, onClick: handleOrdersClick },
    {
      id: isAdmin ? 'admin' : isGuest ? 'login' : 'profile',
      label: isAdmin ? 'Admin' : isGuest ? 'Login' : 'Profile',
      icon: User,
      onClick: handleProfileClick,
    },
  ];

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-[#15161A]/95 backdrop-blur-md border-t border-amber-200/50 dark:border-gray-800 py-1.5 px-2 shadow-lg transition-colors">
      <div className="grid grid-cols-5 gap-1 text-center">
        {navItems.map((item) => {
          const isActive = currentPage === item.id;
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={item.onClick}
              className={`flex flex-col items-center justify-center py-1 rounded-xl transition-all relative ${
                isActive
                  ? 'text-red-700 dark:text-amber-400 font-bold'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
              }`}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 ${isActive ? 'scale-110' : ''} transition-transform`} />
                {item.badge && (
                  <span className="absolute -top-1.5 -right-2.5 bg-red-600 text-white text-[10px] font-bold px-1.5 py-0.2 rounded-full min-w-[16px] text-center shadow">
                    {item.badge}
                  </span>
                )}
              </div>
              <span className="text-[11px] mt-1">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
