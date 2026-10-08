import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';

// Layout
import AdminLayout from './layouts/AdminLayout';

// Pages
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Alerts from './pages/alerts/Alerts';
import AlertDetails from './pages/alerts/AlertDetails';
import Complaints from './pages/complaints/Complaints';
import ComplaintDetails from './pages/complaints/ComplaintDetails';
import Farmers from './pages/farmers/Farmers';
import FarmerDetails from './pages/farmers/FarmerDetails';
import Users from './pages/users/Users';
import UserDetails from './pages/users/UserDetails';
import Products from './pages/products/Products';
import ProductDetails from './pages/products/ProductDetails';
import Activity from './pages/Activity';
import Profile from './pages/Profile';

// Auto scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        
        {/* Officer Login */}
        <Route path="/admin/login" element={<Login />} />

        {/* Forest Officer Admin Layout */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          
          {/* Wildlife Alerts */}
          <Route path="alerts" element={<Alerts />} />
          <Route path="alerts/:id" element={<AlertDetails />} />

          {/* Grievances & Loss Claims */}
          <Route path="complaints" element={<Complaints />} />
          <Route path="complaints/:id" element={<ComplaintDetails />} />

          {/* Farmers Directory */}
          <Route path="farmers" element={<Farmers />} />
          <Route path="farmers/:id" element={<FarmerDetails />} />

          {/* User Directory */}
          <Route path="users" element={<Users />} />
          <Route path="users/:id" element={<UserDetails />} />

          {/* Marketplace Oversight */}
          <Route path="products" element={<Products />} />
          <Route path="products/:id" element={<ProductDetails />} />

          {/* System Audit & Profile */}
          <Route path="activity" element={<Activity />} />
          <Route path="profile" element={<Profile />} />
        </Route>

        {/* Default Landing & Fallback Redirects */}
        <Route path="/" element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
