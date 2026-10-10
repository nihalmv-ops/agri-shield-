import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { 
  Shield, 
  Leaf, 
  Search, 
  Bell, 
  Menu, 
  X, 
  Camera, 
  ShieldAlert, 
  UserCircle,
  ExternalLink,
  SlidersHorizontal,
  ChevronDown,
  Heart,
  Plus,
  Package,
  ShoppingBag,
  PackagePlus
} from 'lucide-react';
import Button from './Button';
import { getFavorites } from '../utils/marketplaceStorage';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [favoritesCount, setFavoritesCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const updateFavCount = () => {
      const favs = getFavorites();
      setFavoritesCount(favs.length);
    };

    updateFavCount();
    window.addEventListener('agrishield_favorites_updated', updateFavCount);
    return () => {
      window.removeEventListener('agrishield_favorites_updated', updateFavCount);
    };
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/marketplace?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Marketplace', path: '/marketplace' },
    { name: 'Wildlife Alerts', path: '/wildlife-alerts' },
    { name: 'AI Camera', path: '/wildlife-camera', badge: 'AI' },
    { name: 'Complaints', path: '/complaints' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#063B2A] text-white border-b border-emerald-900/40 backdrop-blur-md bg-opacity-95 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-3 group shrink-0">
            <div className="relative w-11 h-11 rounded-xl bg-gradient-to-br from-emerald-400 to-[#063B2A] p-0.5 shadow-md group-hover:scale-105 transition-transform duration-300">
              <div className="w-full h-full bg-[#071A14] rounded-[10px] flex items-center justify-center relative overflow-hidden">
                <Shield className="w-6 h-6 text-emerald-400 stroke-[2.2]" />
                <Leaf className="w-3.5 h-3.5 text-accent absolute bottom-1 right-1.5 fill-emerald-400/30" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-xl sm:text-2xl font-black tracking-tight text-white flex items-center gap-1 group-hover:text-emerald-300 transition-colors">
                Agri<span className="text-emerald-400 font-bold">Shield</span>
              </span>
              <span className="text-[10px] tracking-wider text-emerald-300/80 uppercase font-medium">
                Farmers • Forests • Future
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            {navLinks.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  `relative px-3.5 py-2 text-sm font-medium transition-all rounded-lg flex items-center gap-1.5 ${
                    isActive
                      ? 'text-emerald-300 font-semibold bg-emerald-900/40'
                      : 'text-gray-200 hover:text-white hover:bg-emerald-900/20'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <span>{item.name}</span>
                    {item.badge && (
                      <span className="text-[9px] uppercase px-1.5 py-0.2 bg-emerald-500 text-[#071A14] font-bold rounded">
                        {item.badge}
                      </span>
                    )}
                    {isActive && (
                      <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-emerald-400 rounded-full" />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Search, Notifications, Favorites & Sell Button */}
          <div className="hidden md:flex items-center gap-2.5">
            {/* Search Input Bar */}
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                placeholder="Search products, spices..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-40 lg:w-56 pl-9 pr-7 py-1.5 text-xs bg-[#071A14]/70 border border-emerald-800/60 rounded-full text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-emerald-400 focus:border-emerald-400 transition-all focus:w-64"
              />
              <Search className="w-3.5 h-3.5 text-emerald-400 absolute left-3 top-1/2 -translate-y-1/2" />
              {searchQuery && (
                <button
                  type="submit"
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-emerald-400 hover:text-white"
                >
                  ↵
                </button>
              )}
            </form>

            {/* Favourites Button */}
            <Link
              to="/favourites"
              className="relative p-2 text-gray-300 hover:text-rose-400 hover:bg-emerald-900/40 rounded-full transition-colors"
              title="Saved Favourites"
              aria-label="View saved favourites"
            >
              <Heart className="w-5 h-5" />
              {favoritesCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-rose-500 text-white rounded-full text-[10px] font-black flex items-center justify-center ring-2 ring-[#063B2A] animate-scaleIn">
                  {favoritesCount}
                </span>
              )}
            </Link>

            {/* Notifications Button */}
            <div className="relative">
              <button
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className="relative p-2 text-gray-300 hover:text-white hover:bg-emerald-900/40 rounded-full transition-colors"
                aria-label="View notifications"
              >
                <Bell className="w-5 h-5" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-emerald-400 rounded-full ring-2 ring-[#063B2A] animate-pulse"></span>
              </button>

              {/* Notification Popover Dropdown */}
              {notificationsOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white text-gray-800 rounded-2xl shadow-xl border border-gray-100 p-4 z-50 animate-fadeIn">
                  <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                    <span className="text-sm font-bold text-[#063B2A]">Recent Alerts</span>
                    <span className="text-[11px] text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full font-medium">3 New</span>
                  </div>
                  <div className="divide-y divide-gray-100 text-xs">
                    <div className="py-2.5">
                      <p className="font-semibold text-gray-900">🐘 Elephant detected in Wayanad</p>
                      <p className="text-gray-500 text-[11px]">CAM-023 • 96% AI confidence</p>
                    </div>
                    <div className="py-2.5">
                      <p className="font-semibold text-gray-900">🌾 Fresh Harvest: Wayanad Pepper</p>
                      <p className="text-gray-500 text-[11px]">By Spice World • 250 kg available</p>
                    </div>
                    <div className="py-2.5">
                      <p className="font-semibold text-gray-900">✅ Complaint #077 Resolved</p>
                      <p className="text-gray-500 text-[11px]">Solar fencing repaired at Chalakudy</p>
                    </div>
                  </div>
                  <Link 
                    to="/wildlife-alerts" 
                    onClick={() => setNotificationsOpen(false)}
                    className="block text-center text-xs font-semibold text-emerald-700 pt-3 border-t border-gray-100 hover:underline"
                  >
                    View All Wildlife Alerts →
                  </Link>
                </div>
              )}
            </div>

            {/* My Listings Link */}
            <Link
              to="/my-listings"
              className="p-2 text-gray-300 hover:text-emerald-300 hover:bg-emerald-900/40 rounded-full transition-colors hidden xl:flex"
              title="My Listings"
            >
              <Package className="w-5 h-5" />
            </Link>

            {/* Sell Product Button (Standout CTA) */}
            <Link
              to="/sell-product"
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#10B981] hover:bg-[#0ea371] text-[#071A14] font-black text-xs rounded-full shadow-glow-emerald transition-all transform hover:scale-102 active:scale-98"
            >
              <Plus className="w-4 h-4 stroke-[2.5]" />
              <span>Sell Product</span>
            </Link>

            {/* Auth Buttons */}
            <div className="flex items-center gap-1.5 pl-1 border-l border-emerald-800/60">
              <Link
                to="/login"
                className="px-3 py-1.5 text-xs font-semibold text-gray-200 hover:text-white hover:bg-emerald-900/40 rounded-lg transition-colors"
              >
                Login
              </Link>
              <Link
                to="/profile"
                className="p-1.5 text-gray-300 hover:text-white hover:bg-emerald-900/40 rounded-full transition-colors"
                title="User Profile"
              >
                <UserCircle className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Mobile Right Bar: Heart, Bell, Menu */}
          <div className="flex items-center gap-1 md:hidden">
            <Link
              to="/favourites"
              className="relative p-2 text-gray-300 hover:text-rose-400"
              aria-label="View favourites"
            >
              <Heart className="w-5 h-5" />
              {favoritesCount > 0 && (
                <span className="absolute 1 top-1 right-1 w-3.5 h-3.5 bg-rose-500 text-white rounded-full text-[9px] font-black flex items-center justify-center">
                  {favoritesCount}
                </span>
              )}
            </Link>

            <button
              onClick={() => setNotificationsOpen(!notificationsOpen)}
              className="p-2 text-gray-300 hover:text-white"
              aria-label="Toggle notifications"
            >
              <Bell className="w-5 h-5" />
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-gray-300 hover:text-white focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#071A14] border-b border-emerald-900/50 px-4 pt-3 pb-6 space-y-3 animate-fadeIn">
          {/* Mobile Search */}
          <form onSubmit={handleSearchSubmit} className="relative mb-3">
            <input
              type="text"
              placeholder="Search products, animals..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm bg-emerald-950/60 border border-emerald-800 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-emerald-400"
            />
            <Search className="w-4 h-4 text-emerald-400 absolute left-3 top-1/2 -translate-y-1/2" />
          </form>

          {/* Sell CTA on Mobile */}
          <Link
            to="/sell-product"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center justify-center gap-2 w-full py-3 bg-[#10B981] text-[#071A14] rounded-2xl font-black text-xs shadow-glow-emerald"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            <span>Post Free Agricultural Listing</span>
          </Link>

          <div className="space-y-1 pt-2">
            {navLinks.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium ${
                    isActive
                      ? 'bg-emerald-800/40 text-emerald-300'
                      : 'text-gray-300 hover:bg-emerald-900/30 hover:text-white'
                  }`
                }
              >
                <span>{item.name}</span>
                {item.badge && (
                  <span className="text-[10px] px-2 py-0.5 bg-emerald-500 text-black font-bold rounded">
                    {item.badge}
                  </span>
                )}
              </NavLink>
            ))}

            <Link
              to="/my-listings"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium text-gray-300 hover:bg-emerald-900/30 hover:text-white"
            >
              <div className="flex items-center gap-2">
                <Package className="w-4 h-4 text-emerald-400" />
                <span>My Listings</span>
              </div>
            </Link>

            <Link
              to="/favourites"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium text-gray-300 hover:bg-emerald-900/30 hover:text-white"
            >
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-rose-400" />
                <span>Saved Favourites</span>
              </div>
              {favoritesCount > 0 && (
                <span className="text-[10px] px-2 py-0.5 bg-rose-500 text-white font-bold rounded-full">
                  {favoritesCount}
                </span>
              )}
            </Link>

            <Link
              to="/officer/dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium text-emerald-400 bg-emerald-950/40 border border-emerald-800/50 mt-2"
            >
              <span>Forest Officer Portal</span>
              <ShieldAlert className="w-4 h-4" />
            </Link>
          </div>

          <div className="pt-3 border-t border-emerald-900/50 flex flex-col gap-2">
            <div className="grid grid-cols-2 gap-2">
              <Button
                to="/login"
                variant="outline"
                size="md"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full"
              >
                Login
              </Button>
              <Button
                to="/register"
                variant="primary"
                size="md"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full bg-[#10B981]"
              >
                Register
              </Button>
            </div>
            <Link
              to="/profile"
              onClick={() => setMobileMenuOpen(false)}
              className="text-xs text-center text-gray-400 hover:text-white py-1 flex items-center justify-center gap-1.5"
            >
              <UserCircle className="w-3.5 h-3.5" />
              <span>User Profile & Settings</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
