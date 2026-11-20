# Sivakasi Sparkles - Crackers & Fireworks E-Commerce & Management System
### Final Year College Project Presentation Ready Application

A complete, presentation-ready web application built primarily for a **college final-year project demonstration** adhering to the **90% Frontend + 10% Backend** architecture.

---

## 🌟 Key Project Highlights

- **Aesthetic & Brand Style**: Warm maroon, festive orange, red, cream, dark charcoal, and subtle gold accents. Modern, user-friendly, responsive, and practical for non-technical users.
- **Two Login Types Only**:
  1. **User Login**: Mobile / Email + Password (returns to intended page e.g. Checkout).
  2. **Admin Login**: Professional management portal console.
- **Guest-First Shopping Experience**: Guests can explore Home, Services, Categories, Shop, Search, Filter, Sort, Product Details, Specifications, Safety guidelines, and Offers.
- **Contextual Login Guard**: If a guest clicks "Buy Now" or "Proceed to Checkout", a friendly modal appears:
  > *"Login required to place your order."*  
  > Buttons: **[Login]** | **[Continue Browsing]**
- **Cart & Order Flow**: Full quantity selector `[-] [1] [+]`, festival discount calculation, free delivery thresholds, realistic payment selection (UPI, Card, COD), and confetti-powered order confirmation with order ID (`#CRK10256`).
- **Order Tracking Stepper**: Visual 5-stage stepper (`Order Placed` ➔ `Confirmed` ➔ `Processing` ➔ `Shipped` ➔ `Delivered`).
- **Complete Admin Panel**:
  - **Dashboard**: KPI cards (Total Sales, Orders, Products, Customers), 2026 Season Revenue Growth Chart, Low Stock Alerts, Quick Actions.
  - **Product Management**: Full Add/Edit/Delete modal forms, category tags, stock levels, image URLs, and delete confirmation dialogs.
  - **Category Management**: Add, Edit, Delete, and Activate/Deactivate category status.
  - **Order Management**: Status filter tabs, customer addresses, purchased items, and status updating (`Pending` ➔ `Processing` ➔ `Shipped` ➔ `Delivered`).
  - **Customer Directory**: Customer spend history, order count, and individual order history drawers.
  - **Sellers / Manufacturers**: Sivakasi factory records, PESO licenses, and status toggles (`Approve` / `Deactivate`).
  - **Offers & Promos**: Create coupons, discount percentages, validity dates, and toggle active promos.
  - **Reports & Analytics**: Gross Merchandise Value, Average Order Value, Top 5 selling fireworks, and Category share analysis.
- **Theme System**: Persisted in `localStorage`. Strict configuration inside `Profile -> Settings -> Theme` (Light / Dark).

---

## 🛠️ Technology Stack

| Layer | Technologies |
|---|---|
| **Frontend (90%)** | React 19, Tailwind CSS 3.4, Lucide React Icons, Canvas Confetti, Vite 8 |
| **Backend (10%)** | PHP 8, RESTful JSON Endpoints, PDO MySQL, Password Hashing |
| **Database** | MySQL / MariaDB (Compatible with XAMPP & WampServer) |

---

## 🚀 Running the Project

### 1. Frontend (Instant Demo)
```bash
cd "C:\Users\M Revathi\.gemini\antigravity-ide\scratch\crackers-ecommerce"
npm install
npm run dev
```
Open **`http://localhost:5173/`** in your browser.

### 2. PHP Backend (For XAMPP / College Evaluation)
1. Copy or symlink the folder `crackers-ecommerce` into `C:/xampp/htdocs/crackers-ecommerce`.
2. Open **phpMyAdmin** (`http://localhost/phpmyadmin/`).
3. Import `backend/api/schema.sql` to create `crackers_ecommerce_db` and seed default demo accounts.
4. The PHP endpoints are located in `backend/api/`:
   - `register.php` (User account creation)
   - `login.php` (User authentication)
   - `admin_login.php` (Admin authentication)
   - `place_order.php` (Order placement & item persistence)
   - `get_orders.php` (Retrieve orders)
   - `config.php` (CORS headers, JSON responses, PDO connection)

> **Note for Viva/Evaluator**: The React application features a dual-layer API service (`src/services/api.js`). It attempts to connect to the PHP backend, and seamlessly operates with localStorage demo persistence if MySQL is not running—guaranteeing 100% flawless presentation without server setup errors.

---

## 🔑 Demo Credentials

| Role | Username / Identifier | Password | Access Location |
|---|---|---|---|
| **User (Customer)** | `user@crackers.com` or `9841012345` | `user123` | Main Navbar -> **[Login]** |
| **Admin** | `admin@crackers.com` | `admin123` | Footer -> **[Go to Admin Portal Login]** |

---

## 📁 Project File Structure

```
crackers-ecommerce/
├── backend/
│   └── api/
│       ├── config.php        # CORS, JSON helper, PDO connection
│       ├── register.php      # User registration
│       ├── login.php         # User authentication
│       ├── admin_login.php   # Admin authentication
│       ├── place_order.php   # Order placement API
│       ├── get_orders.php    # Orders list API
│       └── schema.sql        # MySQL Database Schema & seed data
├── src/
│   ├── components/
│   │   ├── Navbar.jsx            # Desktop & tablet navigation, search, cart badge
│   │   ├── MobileBottomNav.jsx   # Mobile bottom navigation
│   │   ├── Footer.jsx            # Footer links, safety, admin entry
│   │   ├── ProductCard.jsx       # View, Add to Cart, Buy Now, Wishlist
│   │   ├── CategoryCard.jsx      # Dynamic category cards with counts
│   │   ├── OrderDetailsModal.jsx # 5-step live order tracking stepper
│   │   ├── LoginPromptModal.jsx  # Guest login modal
│   │   └── Toast.jsx             # Floating notification system
│   ├── context/
│   │   ├── AuthContext.jsx       # Guest vs User vs Admin auth logic
│   │   └── AppContext.jsx        # Products, Cart, Orders, Theme, Wishlist
│   ├── data/
│   │   └── initialData.js        # 22 Products, 8 Categories, 10 Orders, 8 Customers, 5 Sellers, 5 Offers
│   ├── layouts/
│   │   └── AdminLayout.jsx       # Collapsible sidebar & admin header
│   ├── pages/
│   │   ├── HomePage.jsx          # Hero, Categories, Offers, Popular Products, Why Choose Us
│   │   ├── ServicesPage.jsx      # 6 Functional cards & Safety First guide
│   │   ├── ShopPage.jsx          # Filter sidebar, live search, sorting, catalog
│   │   ├── CategoriesPage.jsx    # Categories catalog
│   │   ├── OffersPage.jsx        # Coupons, codes, discounts
│   │   ├── ProductDetailsPage.jsx# Large image, specs, quantity, related products
│   │   ├── CartPage.jsx          # Cart items, qty controls, order summary
│   │   ├── CheckoutPage.jsx      # Delivery form, UPI/Card/COD, confetti
│   │   ├── MyOrdersPage.jsx      # Order history with live tracking stepper
│   │   ├── ProfilePage.jsx       # Profile, Orders, Wishlist, Addresses, Settings (Theme)
│   │   ├── UserLoginPage.jsx     # User login with return-to-checkout
│   │   ├── RegisterPage.jsx      # User registration
│   │   ├── AdminLoginPage.jsx    # Professional Admin login
│   │   └── admin/
│   │       ├── AdminDashboardPage.jsx   # KPIs, Revenue chart, Low stock
│   │       ├── AdminProductsPage.jsx    # Full CRUD product management
│   │       ├── AdminCategoriesPage.jsx  # Category management
│   │       ├── AdminOrdersPage.jsx      # Order fulfillment & status updater
│   │       ├── AdminCustomersPage.jsx   # Customer directory & history
│   │       ├── AdminSellersPage.jsx     # Sivakasi manufacturers management
│   │       ├── AdminOffersPage.jsx      # Offer & promotion management
│   │       ├── AdminReportsPage.jsx     # Business analytics & charts
│   │       └── AdminSettingsPage.jsx    # Theme configuration
│   ├── services/
│   │   └── api.js            # Dual API connector (PHP + Client fallback)
│   ├── App.jsx               # Main router & modal guards
│   ├── index.css             # Tailwind base & custom festive styles
│   └── main.jsx
├── tailwind.config.js
└── package.json
```
