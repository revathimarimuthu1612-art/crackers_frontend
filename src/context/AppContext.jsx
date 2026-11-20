import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  INITIAL_CATEGORIES,
  INITIAL_PRODUCTS,
  INITIAL_ORDERS,
  INITIAL_CUSTOMERS,
  INITIAL_SELLERS,
  INITIAL_OFFERS,
} from '../data/initialData';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // Theme: 'light' or 'dark', strictly saved in localStorage
  const [theme, setThemeState] = useState(() => {
    return localStorage.getItem('crackers_theme') || 'light';
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('crackers_theme', theme);
  }, [theme]);

  const setTheme = (newTheme) => {
    if (newTheme === 'light' || newTheme === 'dark') {
      setThemeState(newTheme);
    }
  };

  // Toast Notification state
  const [toast, setToast] = useState({
    show: false,
    message: '',
    type: 'success', // 'success' | 'info' | 'warning' | 'error'
  });

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast(prev => ({ ...prev, show: false }));
    }, 3200);
  };

  // Products State
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('crackers_products');
    if (!saved) return INITIAL_PRODUCTS;
    try {
      const parsed = JSON.parse(saved);
      if (parsed.some(p => p.image && p.image.includes('unsplash.com'))) {
        return INITIAL_PRODUCTS;
      }
      return parsed;
    } catch (e) {
      return INITIAL_PRODUCTS;
    }
  });

  useEffect(() => {
    localStorage.setItem('crackers_products', JSON.stringify(products));
  }, [products]);

  // Categories State
  const [categories, setCategories] = useState(() => {
    const saved = localStorage.getItem('crackers_categories');
    if (!saved) return INITIAL_CATEGORIES;
    try {
      const parsed = JSON.parse(saved);
      if (parsed.some(c => c.image && c.image.includes('unsplash.com'))) {
        return INITIAL_CATEGORIES;
      }
      return parsed;
    } catch (e) {
      return INITIAL_CATEGORIES;
    }
  });

  useEffect(() => {
    localStorage.setItem('crackers_categories', JSON.stringify(categories));
  }, [categories]);

  // Orders State
  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem('crackers_orders');
    const rawOrders = saved ? JSON.parse(saved) : INITIAL_ORDERS;
    return rawOrders.map((o) => ({
      ...o,
      items: o.items.map((item) => {
        const matchedProd = INITIAL_PRODUCTS.find(
          (p) => p.id === item.id || p.name.toLowerCase() === item.name.toLowerCase()
        );
        let realImg = matchedProd?.image;
        if (!realImg || realImg.includes('unsplash.com')) {
          if (item.name.toLowerCase().includes('sparkler')) realImg = '/products/sparklers-box-real.jpg';
          else if (item.name.toLowerCase().includes('rocket')) realImg = '/products/sky-rockets-real.jpg';
          else if (item.name.toLowerCase().includes('flower pot') || item.name.toLowerCase().includes('pot')) realImg = '/products/flower-pots-real.jpg';
          else if (item.name.toLowerCase().includes('aerial') || item.name.toLowerCase().includes('shot')) realImg = '/products/aerial-shots-real.jpg';
          else if (item.name.toLowerCase().includes('chakkar')) realImg = '/products/ground-chakkar-real.jpg';
          else if (item.name.toLowerCase().includes('snapper') || item.name.toLowerCase().includes('pop')) realImg = '/products/pop-pop-snappers.jpg';
          else realImg = '/products/sivakasi-1000-wala-real.jpg';
        }
        return { ...item, image: realImg };
      }),
    }));
  });

  useEffect(() => {
    localStorage.setItem('crackers_orders', JSON.stringify(orders));
  }, [orders]);

  // Customers State
  const [customers, setCustomers] = useState(() => {
    const saved = localStorage.getItem('crackers_customers');
    return saved ? JSON.parse(saved) : INITIAL_CUSTOMERS;
  });

  useEffect(() => {
    localStorage.setItem('crackers_customers', JSON.stringify(customers));
  }, [customers]);

  // Sellers State
  const [sellers, setSellers] = useState(() => {
    const saved = localStorage.getItem('crackers_sellers');
    return saved ? JSON.parse(saved) : INITIAL_SELLERS;
  });

  useEffect(() => {
    localStorage.setItem('crackers_sellers', JSON.stringify(sellers));
  }, [sellers]);

  // Offers State
  const [offers, setOffers] = useState(() => {
    const saved = localStorage.getItem('crackers_offers');
    return saved ? JSON.parse(saved) : INITIAL_OFFERS;
  });

  useEffect(() => {
    localStorage.setItem('crackers_offers', JSON.stringify(offers));
  }, [offers]);

  // Cart State
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('crackers_cart');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('crackers_cart', JSON.stringify(cart));
  }, [cart]);

  // Wishlist State
  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem('crackers_wishlist');
    return saved ? JSON.parse(saved) : [1, 2, 7];
  });

  useEffect(() => {
    localStorage.setItem('crackers_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  // Read initial path from window.location.pathname
  const getInitialPath = () => {
    if (typeof window !== 'undefined') {
      const p = window.location.pathname;
      return p || '/';
    }
    return '/';
  };

  // Navigation State
  const [currentPage, setCurrentPage] = useState(getInitialPath);
  const [pageParams, setPageParams] = useState({});
  const [globalSearch, setGlobalSearch] = useState('');

  // Handle browser back and forward buttons
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPage(window.location.pathname || '/');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Cart Actions
  const addToCart = (product, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    showToast(`Added ${product.name} to cart!`, 'success');
  };

  const updateCartQuantity = (productId, delta) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const removeFromCart = (productId) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
    showToast('Item removed from cart', 'info');
  };

  const clearCart = () => {
    setCart([]);
  };

  // Wishlist Actions
  const toggleWishlist = (product) => {
    const exists = wishlist.includes(product.id);
    if (exists) {
      setWishlist((prev) => prev.filter((id) => id !== product.id));
      showToast(`Removed from wishlist`, 'info');
    } else {
      setWishlist((prev) => [...prev, product.id]);
      showToast(`Added to wishlist!`, 'success');
    }
  };

  const isInWishlist = (productId) => wishlist.includes(productId);

  // Admin Product Actions
  const addProduct = (newProduct) => {
    const product = {
      ...newProduct,
      id: Date.now(),
      rating: 4.8,
      reviewsCount: 1,
      price: Number(newProduct.price),
      originalPrice: Number(newProduct.originalPrice || Math.round(Number(newProduct.price) * 1.3)),
      stock: Number(newProduct.stock || 50),
    };
    setProducts((prev) => [product, ...prev]);
    showToast('Product added successfully.', 'success');
    return product;
  };

  const updateProduct = (updatedProduct) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === updatedProduct.id ? { ...p, ...updatedProduct } : p))
    );
    showToast('Product updated successfully.', 'success');
  };

  const deleteProduct = (productId) => {
    setProducts((prev) => prev.filter((p) => p.id !== productId));
    showToast('Product deleted successfully.', 'warning');
  };

  // Admin Category Actions
  const addCategory = (category) => {
    const cat = {
      ...category,
      id: category.name.toLowerCase().replace(/\s+/g, '-'),
      count: 0,
      active: true,
    };
    setCategories((prev) => [...prev, cat]);
    showToast(`Category "${cat.name}" added!`, 'success');
  };

  const updateCategory = (id, updated) => {
    setCategories((prev) =>
      prev.map((c) => (c.id === id ? { ...c, ...updated } : c))
    );
    showToast('Category updated successfully!', 'success');
  };

  const toggleCategoryStatus = (id) => {
    setCategories((prev) =>
      prev.map((c) => (c.id === id ? { ...c, active: !c.active } : c))
    );
    showToast('Category status updated!', 'info');
  };

  const deleteCategory = (id) => {
    setCategories((prev) => prev.filter((c) => c.id !== id));
    showToast('Category removed!', 'warning');
  };

  // Admin Order Actions
  const updateOrderStatus = (orderId, newStatus, customToast) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
    );
    if (customToast) {
      showToast(customToast, newStatus === 'Rejected' ? 'warning' : 'success');
    } else {
      showToast(`Order #${orderId} marked as ${newStatus}`, 'success');
    }
  };

  // Add new customer order
  const addNewOrder = (orderData) => {
    setOrders((prev) => [orderData, ...prev]);
    return orderData;
  };

  // Admin Offers Actions
  const addOffer = (offer) => {
    const newOffer = {
      ...offer,
      id: 'OFFER-' + Date.now().toString().slice(-4),
      active: true,
    };
    setOffers((prev) => [newOffer, ...prev]);
    showToast('Offer created successfully!', 'success');
  };

  const updateOffer = (id, updated) => {
    setOffers((prev) =>
      prev.map((o) => (o.id === id ? { ...o, ...updated } : o))
    );
    showToast('Offer updated successfully!', 'success');
  };

  const deleteOffer = (id) => {
    setOffers((prev) => prev.filter((o) => o.id !== id));
    showToast('Offer deleted!', 'warning');
  };

  const toggleOfferStatus = (id) => {
    setOffers((prev) =>
      prev.map((o) => (o.id === id ? { ...o, active: !o.active } : o))
    );
    showToast('Offer status updated!', 'info');
  };

  // Admin Seller Actions
  const updateSellerStatus = (id, newStatus) => {
    setSellers((prev) =>
      prev.map((s) => (s.id === id ? { ...s, status: newStatus } : s))
    );
    if (newStatus === 'Active') {
      showToast('Seller approved successfully.', 'success');
    } else if (newStatus === 'Inactive') {
      showToast('Seller deactivated.', 'info');
    } else {
      showToast(`Seller status updated to ${newStatus}.`, 'info');
    }
  };

  const toggleSellerStatus = (id) => {
    setSellers((prev) =>
      prev.map((s) => {
        if (s.id === id) {
          const nextStatus = s.status === 'Active' || s.status === 'Approved' ? 'Inactive' : 'Active';
          return { ...s, status: nextStatus };
        }
        return s;
      })
    );
    showToast('Seller status updated!', 'info');
  };

  // Admin Customer Actions
  const toggleCustomerStatus = (id) => {
    setCustomers((prev) =>
      prev.map((c) => {
        if (c.id === id) {
          const nextStatus = c.status === 'Active' ? 'Deactive' : 'Active';
          return { ...c, status: nextStatus };
        }
        return c;
      })
    );
    showToast('Customer account status updated!', 'info');
  };

  // Navigation Helper
  const navigate = (page, params = {}) => {
    let targetPath = page;
    if (targetPath === 'home') targetPath = '/';
    else if (!targetPath.startsWith('/')) targetPath = `/${targetPath}`;

    setCurrentPage(targetPath);
    setPageParams(params);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (typeof window !== 'undefined' && window.location.pathname !== targetPath) {
      window.history.pushState(null, '', targetPath);
    }
  };

  // Cart calculations
  const cartSubtotal = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const cartDiscount = Math.round(cartSubtotal * 0.1); // 10% auto festive discount
  const deliveryFee = cartSubtotal > 1000 || cartSubtotal === 0 ? 0 : 99;
  const cartTotal = Math.max(0, cartSubtotal - cartDiscount + deliveryFee);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <AppContext.Provider
      value={{
        theme,
        setTheme,
        toast,
        showToast,
        products,
        categories,
        orders,
        customers,
        sellers,
        offers,
        cart,
        cartCount,
        cartSubtotal,
        cartDiscount,
        deliveryFee,
        cartTotal,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        wishlist,
        toggleWishlist,
        isInWishlist,
        currentPage,
        pageParams,
        navigate,
        globalSearch,
        setGlobalSearch,
        addProduct,
        updateProduct,
        deleteProduct,
        addCategory,
        updateCategory,
        toggleCategoryStatus,
        deleteCategory,
        updateOrderStatus,
        addNewOrder,
        addOffer,
        updateOffer,
        deleteOffer,
        toggleOfferStatus,
        updateSellerStatus,
        toggleSellerStatus,
        toggleCustomerStatus,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
