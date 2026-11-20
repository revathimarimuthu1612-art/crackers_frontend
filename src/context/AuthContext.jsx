import React, { createContext, useContext, useState, useEffect } from 'react';
import { apiService } from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('crackers_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [admin, setAdmin] = useState(() => {
    const saved = localStorage.getItem('crackers_admin');
    return saved ? JSON.parse(saved) : null;
  });

  const [loginPrompt, setLoginPrompt] = useState({
    isOpen: false,
    message: 'Login required to place your order.',
    redirectPath: '/checkout',
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('crackers_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('crackers_user');
    }
  }, [user]);

  useEffect(() => {
    if (admin) {
      localStorage.setItem('crackers_admin', JSON.stringify(admin));
    } else {
      localStorage.removeItem('crackers_admin');
    }
  }, [admin]);

  const openLoginPrompt = (redirectPath = '/checkout', message = 'Login required to place your order.') => {
    setLoginPrompt({
      isOpen: true,
      message,
      redirectPath,
    });
  };

  const closeLoginPrompt = () => {
    setLoginPrompt(prev => ({ ...prev, isOpen: false }));
  };

  const login = async (identifier, password) => {
    const res = await apiService.login(identifier, password);
    if (res.status && res.data?.user) {
      const userData = { ...res.data.user, role: 'USER' };
      setUser(userData);
      // Ensure User login completely clears any Admin session
      setAdmin(null);
      localStorage.removeItem('crackers_admin');
      return { success: true, user: userData };
    }
    return { success: false, message: res.message || 'Login failed' };
  };

  const register = async (userData) => {
    const res = await apiService.register(userData);
    if (res.status && res.data) {
      const newUser = { ...res.data, role: 'USER' };
      setUser(newUser);
      setAdmin(null);
      localStorage.removeItem('crackers_admin');
      return { success: true, user: newUser };
    }
    return { success: false, message: res.message || 'Registration failed' };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('crackers_user');
  };

  const updateUserProfile = async (updatedData) => {
    try {
      const payload = { ...user, ...updatedData };
      const res = await apiService.updateProfile(payload);
      if (res.status) {
        const newUser = { ...user, ...updatedData };
        setUser(newUser);
        localStorage.setItem('crackers_user', JSON.stringify(newUser));
        return { success: true, user: newUser, message: res.message || 'Profile updated successfully.' };
      }
      return { success: false, message: res.message || 'Failed to update profile.' };
    } catch (err) {
      return { success: false, message: 'An error occurred while updating profile.' };
    }
  };

  const adminLogin = async (email, password) => {
    const res = await apiService.adminLogin(email, password);
    if (res.status && res.data?.admin) {
      const adminData = { ...res.data.admin, role: 'ADMIN' };
      setAdmin(adminData);
      // Ensure Admin login completely clears any User customer session
      setUser(null);
      localStorage.removeItem('crackers_user');
      return { success: true, admin: adminData };
    }
    return { success: false, message: res.message || 'Admin authentication failed' };
  };

  const adminLogout = () => {
    setAdmin(null);
    localStorage.removeItem('crackers_admin');
  };

  const updateAdminProfile = async (updatedData) => {
    try {
      const newAdmin = { ...admin, ...updatedData };
      setAdmin(newAdmin);
      localStorage.setItem('crackers_admin', JSON.stringify(newAdmin));
      return { success: true, admin: newAdmin, message: 'Admin profile updated successfully.' };
    } catch (err) {
      return { success: false, message: 'An error occurred while updating admin profile.' };
    }
  };

  const role = admin ? 'ADMIN' : user ? 'USER' : null;
  
  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: !!(user || admin),
        role,
        user,
        admin,
        isGuest: !user && !admin,
        isUser: !!user && !admin,
        isAdmin: !!admin,
        loginPrompt,
        openLoginPrompt,
        closeLoginPrompt,
        login,
        register,
        logout,
        updateUserProfile,
        adminLogin,
        adminLogout,
        updateAdminProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
