import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Public Citizen & Farmer Pages
import Home from './pages/Home';
import Marketplace from './pages/Marketplace';
import ProductDetails from './pages/ProductDetails';
import Complaints from './pages/Complaints';
import WildlifeAlerts from './pages/WildlifeAlerts';
import WildlifeCamera from './pages/WildlifeCamera';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';

// Forest Officer Administration Module
import OfficerLayout from './components/officer/OfficerLayout';
import OfficerLogin from './pages/officer/OfficerLogin';
import OfficerRegister from './pages/officer/OfficerRegister';
import OfficerDashboard from './pages/officer/OfficerDashboard';
import OfficerAlerts from './pages/officer/OfficerAlerts';
import OfficerAlertDetails from './pages/officer/OfficerAlertDetails';
import OfficerComplaints from './pages/officer/OfficerComplaints';
import OfficerComplaintDetails from './pages/officer/OfficerComplaintDetails';
import OfficerUsers from './pages/officer/OfficerUsers';
import OfficerFarmers from './pages/officer/OfficerFarmers';
import OfficerActivity from './pages/officer/OfficerActivity';
import OfficerProfile from './pages/officer/OfficerProfile';

// Scroll restoration helper
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);
  return null;
};

// Layout for Public / Citizen pages
const PublicLayout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-[#F5F8F6]">
      <Navbar />
      <div className="flex-1">
        {children}
      </div>
      <Footer />
    </div>
  );
};

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        {/* Forest Officer Dedicated Auth Pages (Standalone) */}
        <Route path="/officer/login" element={<OfficerLogin />} />
        <Route path="/officer/register" element={<OfficerRegister />} />

        {/* Forest Officer Dedicated Administrator Layout */}
        <Route path="/officer" element={<OfficerLayout />}>
          <Route index element={<Navigate to="/officer/dashboard" replace />} />
          <Route path="dashboard" element={<OfficerDashboard />} />
          <Route path="alerts" element={<OfficerAlerts />} />
          <Route path="alerts/:id" element={<OfficerAlertDetails />} />
          <Route path="complaints" element={<OfficerComplaints />} />
          <Route path="complaints/:id" element={<OfficerComplaintDetails />} />
          <Route path="users" element={<OfficerUsers />} />
          <Route path="farmers" element={<OfficerFarmers />} />
          <Route path="activity" element={<OfficerActivity />} />
          <Route path="profile" element={<OfficerProfile />} />
        </Route>

        {/* Public Citizen & Farmer Platform Routes */}
        <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
        <Route path="/marketplace" element={<PublicLayout><Marketplace /></PublicLayout>} />
        <Route path="/marketplace/:id" element={<PublicLayout><ProductDetails /></PublicLayout>} />
        <Route path="/complaints" element={<PublicLayout><Complaints /></PublicLayout>} />
        <Route path="/wildlife-alerts" element={<PublicLayout><WildlifeAlerts /></PublicLayout>} />
        <Route path="/wildlife-camera" element={<PublicLayout><WildlifeCamera /></PublicLayout>} />
        <Route path="/login" element={<PublicLayout><Login /></PublicLayout>} />
        <Route path="/register" element={<PublicLayout><Register /></PublicLayout>} />
        <Route path="/profile" element={<PublicLayout><Profile /></PublicLayout>} />

        {/* Catch-all fallback redirecting to Home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
