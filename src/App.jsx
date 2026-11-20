import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { MobileBottomNav } from './components/MobileBottomNav';
import { Footer } from './components/Footer';
import { Toast } from './components/Toast';
import { LoginPromptModal } from './components/LoginPromptModal';

// Customer Pages
import { HomePage } from './pages/HomePage';
import { ServicesPage } from './pages/ServicesPage';
import { ShopPage } from './pages/ShopPage';
import { CategoriesPage } from './pages/CategoriesPage';
import { OffersPage } from './pages/OffersPage';
import { ProductDetailsPage } from './pages/ProductDetailsPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { MyOrdersPage } from './pages/MyOrdersPage';
import { ProfilePage } from './pages/ProfilePage';
import { UserLoginPage } from './pages/UserLoginPage';
import { RegisterPage } from './pages/RegisterPage';

// Admin Pages
import { AdminLoginPage } from './pages/AdminLoginPage';
import { AdminLayout } from './layouts/AdminLayout';
import { AdminDashboardPage } from './pages/admin/AdminDashboardPage';
import { AdminProductsPage } from './pages/admin/AdminProductsPage';
import { AdminCategoriesPage } from './pages/admin/AdminCategoriesPage';
import { AdminOrdersPage } from './pages/admin/AdminOrdersPage';
import { AdminCustomersPage } from './pages/admin/AdminCustomersPage';
import { AdminSellersPage } from './pages/admin/AdminSellersPage';
import { AdminOffersPage } from './pages/admin/AdminOffersPage';
import { AdminReportsPage } from './pages/admin/AdminReportsPage';
import { AdminSettingsPage } from './pages/admin/AdminSettingsPage';

function MainRouter() {
  const { isGuest, isAdmin } = useAuth();
  const { currentPage, navigate } = useApp();
  const [adminNavParams, setAdminNavParams] = useState({});
  const [adminSelectedOrder, setAdminSelectedOrder] = useState(null);

  // Normalize path
  const normalizedPath = currentPage.startsWith('/') ? currentPage : `/${currentPage}`;

  // Handle admin route redirects safely via useEffect
  useEffect(() => {
    if ((normalizedPath === '/admin/login' || normalizedPath === '/admin-login') && isAdmin) {
      navigate('/admin/dashboard');
    } else if (normalizedPath.startsWith('/admin') && normalizedPath !== '/admin/login' && normalizedPath !== '/admin-login' && !isAdmin) {
      navigate('/admin/login');
    }
  }, [normalizedPath, isAdmin, navigate]);

  // 1. Admin Login Route (/admin/login)
  if (normalizedPath === '/admin/login' || normalizedPath === '/admin-login') {
    if (isAdmin) {
      return null;
    }
    return (
      <>
        <AdminLoginPage />
        <Toast />
      </>
    );
  }

  // 2. Admin Dashboard & Management Routes (/admin/*)
  if (normalizedPath.startsWith('/admin')) {
    if (!isAdmin) {
      return (
        <>
          <AdminLoginPage />
          <Toast />
        </>
      );
    }

    // Determine active tab from URL path
    let activeTab = 'dashboard';
    if (normalizedPath === '/admin/products') activeTab = 'products';
    else if (normalizedPath === '/admin/categories') activeTab = 'categories';
    else if (normalizedPath === '/admin/orders') activeTab = 'orders';
    else if (normalizedPath === '/admin/customers') activeTab = 'customers';
    else if (normalizedPath === '/admin/sellers') activeTab = 'sellers';
    else if (normalizedPath === '/admin/offers') activeTab = 'offers';
    else if (normalizedPath === '/admin/reports') activeTab = 'reports';
    else if (normalizedPath === '/admin/settings') activeTab = 'settings';
    else if (normalizedPath === '/admin' || normalizedPath === '/admin/dashboard') activeTab = 'dashboard';

    const handleAdminTabChange = (tab, params = {}) => {
      setAdminNavParams(params);
      navigate(`/admin/${tab}`);
    };

    return (
      <>
        <AdminLayout activeTab={activeTab} onTabChange={handleAdminTabChange}>
          {activeTab === 'dashboard' && (
            <AdminDashboardPage
              onNavigateTab={handleAdminTabChange}
              onSelectOrder={(order) => {
                setAdminSelectedOrder(order);
                handleAdminTabChange('orders');
              }}
            />
          )}
          {activeTab === 'products' && (
            <AdminProductsPage initialOpenAdd={adminNavParams.openAddModal} />
          )}
          {activeTab === 'categories' && <AdminCategoriesPage />}
          {activeTab === 'orders' && (
            <AdminOrdersPage selectedOrderFromDashboard={adminSelectedOrder} />
          )}
          {activeTab === 'customers' && <AdminCustomersPage />}
          {activeTab === 'sellers' && <AdminSellersPage />}
          {activeTab === 'offers' && <AdminOffersPage />}
          {activeTab === 'reports' && <AdminReportsPage />}
          {activeTab === 'settings' && <AdminSettingsPage />}
        </AdminLayout>
        <Toast />
      </>
    );
  }

  // 3. Customer & Guest Side Routes
  const renderCustomerPage = () => {
    const route = normalizedPath.startsWith('/') ? normalizedPath.slice(1) : normalizedPath;
    switch (route) {
      case '':
      case 'home':
        return <HomePage />;
      case 'services':
        return <ServicesPage />;
      case 'shop':
        return <ShopPage />;
      case 'categories':
        return <CategoriesPage />;
      case 'offers':
        return <OffersPage />;
      case 'product-details':
        return <ProductDetailsPage />;
      case 'cart':
        return <CartPage />;
      case 'checkout':
        if (isAdmin) {
          navigate('/admin/dashboard');
          return null;
        }
        return isGuest ? <UserLoginPage defaultReturnUrl="/checkout" /> : <CheckoutPage />;
      case 'orders':
        if (isAdmin) {
          navigate('/admin/dashboard');
          return null;
        }
        return isGuest ? <UserLoginPage defaultReturnUrl="/orders" /> : <MyOrdersPage />;
      case 'profile':
      case 'wishlist':
      case 'addresses':
      case 'settings':
        if (isAdmin) {
          navigate('/admin/dashboard');
          return null;
        }
        return isGuest ? (
          <UserLoginPage defaultReturnUrl={`/${route}`} />
        ) : (
          <ProfilePage initialTab={route === 'profile' ? 'profile' : route} />
        );
      case 'login':
        if (isAdmin) {
          navigate('/admin/dashboard');
          return null;
        }
        return <UserLoginPage />;
      case 'register':
        if (isAdmin) {
          navigate('/admin/dashboard');
          return null;
        }
        return <RegisterPage />;
      default:
        if (route.startsWith('product/')) {
          return <ProductDetailsPage />;
        }
        return <HomePage />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen w-full max-w-full overflow-x-hidden">
      <Navbar />
      <main className="flex-1 pb-20 lg:pb-0 w-full max-w-full overflow-x-hidden">{renderCustomerPage()}</main>
      <Footer />
      <MobileBottomNav />
      <LoginPromptModal />
      <Toast />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppProvider>
        <MainRouter />
      </AppProvider>
    </AuthProvider>
  );
}
