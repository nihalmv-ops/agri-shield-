import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import Marketplace from './pages/Marketplace';
import ProductDetails from './pages/ProductDetails';
import Complaints from './pages/Complaints';
import WildlifeAlerts from './pages/WildlifeAlerts';
import WildlifeCamera from './pages/WildlifeCamera';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';

// Forest Officer Suite
import OfficerLogin from './pages/officer/OfficerLogin';
import OfficerRegister from './pages/officer/OfficerRegister';
import OfficerDashboard from './pages/officer/OfficerDashboard';
import OfficerAlerts from './pages/officer/OfficerAlerts';
import OfficerComplaints from './pages/officer/OfficerComplaints';

// Scroll to top on route change helper
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);
  return null;
};

// Layout wrapper to conditionally show public Navbar/Footer
const Layout = ({ children }) => {
  const location = useLocation();
  const isOfficerDashboard = location.pathname.startsWith('/officer/dashboard');

  return (
    <div className="flex flex-col min-h-screen bg-[#F5F8F6]">
      {!isOfficerDashboard && <Navbar />}
      <div className="flex-1">
        {children}
      </div>
      {!isOfficerDashboard && <Footer />}
    </div>
  );
};

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Layout>
        <Routes>
          {/* Public & Citizen / Farmer Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/marketplace/:id" element={<ProductDetails />} />
          <Route path="/complaints" element={<Complaints />} />
          <Route path="/wildlife-alerts" element={<WildlifeAlerts />} />
          <Route path="/wildlife-camera" element={<WildlifeCamera />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />

          {/* Forest Officer Administration Routes */}
          <Route path="/officer/login" element={<OfficerLogin />} />
          <Route path="/officer/register" element={<OfficerRegister />} />
          <Route path="/officer/dashboard" element={<OfficerDashboard />} />
          <Route path="/officer/alerts" element={<OfficerAlerts />} />
          <Route path="/officer/complaints" element={<OfficerComplaints />} />

          {/* Catch-all fallback redirecting to Home */}
          <Route path="*" element={<Home />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
