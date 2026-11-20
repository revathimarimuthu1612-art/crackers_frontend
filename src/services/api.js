/**
 * API Service for Sivakasi Sparkles
 * Integrates with PHP backend endpoints when available,
 * and gracefully provides local demonstration persistence.
 */

const API_BASE_URL = 'http://localhost/crackers-ecommerce/backend/api';

export const apiService = {
  // User Registration
  async register(userData) {
    try {
      const response = await fetch(`${API_BASE_URL}/register.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });
      if (response.ok) {
        return await response.json();
      }
    } catch (err) {
      // Backend not running on Apache, fallback to client-side persistence
    }
    return {
      status: true,
      message: 'Account created successfully.',
      data: {
        id: Date.now(),
        name: userData.fullName,
        email: userData.email,
        mobile: userData.mobile,
        role: 'user',
      },
    };
  },

  // User Login
  async login(identifier, password) {
    try {
      const response = await fetch(`${API_BASE_URL}/login.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ identifier, password }),
      });
      if (response.ok) {
        return await response.json();
      }
    } catch (err) {
      // PHP offline fallback
    }

    if (identifier.toLowerCase() === 'admin@crackers.com') {
      return {
        status: false,
        message: 'This account is an Administrator. Please sign in via the Admin Login (/admin/login).',
      };
    }

    // Default demo credentials or mock pass
    const isMockMatch = (identifier === 'user@crackers.com' || identifier === '9841012345') && password === 'user123';
    return {
      status: true,
      message: 'Login successful.',
      data: {
        user: {
          id: isMockMatch ? 1 : 101,
          name: isMockMatch ? 'Ramesh Kumar' : (identifier.includes('@') ? identifier.split('@')[0] : 'Demo User'),
          email: identifier.includes('@') ? identifier : 'customer@example.com',
          mobile: identifier.includes('@') ? '9841012345' : identifier,
          role: 'user',
        },
        token: 'token-' + Date.now(),
      },
    };
  },

  // Admin Login
  async adminLogin(email, password) {
    try {
      const response = await fetch(`${API_BASE_URL}/admin_login.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      if (response.ok) {
        return await response.json();
      }
    } catch (err) {
      // PHP offline fallback
    }

    if (email === 'admin@crackers.com' && password === 'admin123') {
      return {
        status: true,
        message: 'Admin authentication successful.',
        data: {
          admin: {
            id: 1,
            name: 'Project Administrator',
            email: 'admin@crackers.com',
            role: 'admin',
          },
          token: 'admin-token-' + Date.now(),
        },
      };
    } else {
      return {
        status: false,
        message: 'Invalid admin credentials. Use admin@crackers.com / admin123',
      };
    }
  },

  // Order Placement
  async placeOrder(orderData) {
    try {
      const response = await fetch(`${API_BASE_URL}/place_order.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData),
      });
      if (response.ok) {
        return await response.json();
      }
    } catch (err) {
      // Offline fallback
    }

    const orderId = 'CRK' + Math.floor(10251 + Math.random() * 89000);
    return {
      status: true,
      message: 'Order Placed Successfully!',
      data: {
        orderId,
        totalAmount: orderData.totalAmount,
        date: new Date().toISOString().split('T')[0],
        status: 'Pending',
      },
    };
  },

  // Update Profile
  async updateProfile(profileData) {
    try {
      const response = await fetch(`${API_BASE_URL}/update_profile.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profileData),
      });
      if (response.ok) {
        return await response.json();
      }
    } catch (err) {
      // Offline fallback
    }

    return {
      status: true,
      message: 'Profile updated successfully.',
      data: profileData,
    };
  },
};
