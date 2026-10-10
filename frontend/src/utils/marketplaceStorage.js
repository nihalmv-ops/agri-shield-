import { initialMarketplaceProducts } from '../data/marketplaceProducts';
import { sampleProducts } from '../data/mockData';

const PRODUCTS_KEY = 'agrishield_marketplace_products';
const FAVORITES_KEY = 'agrishield_favorites';
const REPORTS_KEY = 'agrishield_reported_listings';

// Helper to safely get from localStorage
const getStored = (key, fallback) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch (error) {
    console.error(`Error reading ${key} from localStorage:`, error);
    return fallback;
  }
};

// Helper to safely set in localStorage
const setStored = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error writing ${key} to localStorage:`, error);
  }
};

// Initialize products from sample data if not already present
export const getProducts = () => {
  const products = getStored(PRODUCTS_KEY, null);
  if (!products || !Array.isArray(products) || products.length === 0) {
    setStored(PRODUCTS_KEY, initialMarketplaceProducts);
    return initialMarketplaceProducts;
  }
  return products;
};

// Get a single product by ID
export const getProductById = (id) => {
  const products = getProducts();
  const found = products.find((p) => String(p.id) === String(id));
  if (found) return found;

  // Fallback to sampleProducts if ID came from legacy mock data
  const legacyFound = sampleProducts.find((p) => String(p.id) === String(id));
  if (legacyFound) {
    return {
      ...legacyFound,
      district: legacyFound.location ? legacyFound.location.split(',')[0].trim() : 'Kerala',
      priceUnit: legacyFound.unit || 'kg',
      quantity: legacyFound.quantityAvailable || 100,
      sellerName: legacyFound.seller ? legacyFound.seller.name : 'Local Farmer',
      sellerPhone: legacyFound.seller ? legacyFound.seller.phone : '+91 98471 23456',
      sellerWhatsApp: '919847123456',
      sellerBio: legacyFound.seller ? legacyFound.seller.farmName : '',
      sellerMemberSince: 'Member since 2024',
      images: [legacyFound.image]
    };
  }
  return null;
};

// Add a new product listing (owner is set to true)
export const saveProduct = (productData) => {
  const products = getProducts();
  const newProduct = {
    ...productData,
    id: `prod-${Date.now()}`,
    timestamp: Date.now(),
    postedDate: 'Just now',
    status: 'Available',
    isOwner: true,
    sellerId: productData.sellerId || 'seller-current-user',
    sellerMemberSince: 'Joined 2026',
    images: productData.images && productData.images.length > 0 
      ? productData.images 
      : [productData.image || 'https://images.unsplash.com/photo-1546470427-227c7369a489?auto=format&fit=crop&w=800&q=80']
  };

  const updatedProducts = [newProduct, ...products];
  setStored(PRODUCTS_KEY, updatedProducts);
  return newProduct;
};

// Update an existing product listing
export const updateProduct = (id, updatedData) => {
  const products = getProducts();
  const index = products.findIndex((p) => String(p.id) === String(id));
  if (index === -1) return null;

  const existing = products[index];
  const updatedProduct = {
    ...existing,
    ...updatedData,
    images: updatedData.images && updatedData.images.length > 0 
      ? updatedData.images 
      : (updatedData.image ? [updatedData.image] : existing.images)
  };

  products[index] = updatedProduct;
  setStored(PRODUCTS_KEY, products);
  return updatedProduct;
};

// Delete a product listing
export const deleteProduct = (id) => {
  const products = getProducts();
  const filtered = products.filter((p) => String(p.id) !== String(id));
  setStored(PRODUCTS_KEY, filtered);

  // Also remove from favorites if present
  const favorites = getFavorites();
  if (favorites.includes(String(id))) {
    setStored(FAVORITES_KEY, favorites.filter((favId) => favId !== String(id)));
  }
  return true;
};

// Toggle status between 'Available' and 'Sold'
export const toggleSoldStatus = (id) => {
  const products = getProducts();
  const product = products.find((p) => String(p.id) === String(id));
  if (!product) return null;

  const newStatus = product.status === 'Sold' ? 'Available' : 'Sold';
  product.status = newStatus;
  setStored(PRODUCTS_KEY, products);
  return newStatus;
};

// Get listings belonging to current user / owner
export const getOwnerProducts = () => {
  const products = getProducts();
  return products.filter((p) => p.isOwner === true || p.sellerId === 'seller-current-user' || p.sellerId === 'seller-rahul');
};

// Get listings by specific seller ID
export const getSellerProducts = (sellerId) => {
  const products = getProducts();
  return products.filter((p) => String(p.sellerId) === String(sellerId));
};

// --- Favorites Management ---
export const getFavorites = () => {
  return getStored(FAVORITES_KEY, ['prod-001', 'prod-005']);
};

export const isFavorite = (productId) => {
  const favorites = getFavorites();
  return favorites.includes(String(productId));
};

export const toggleFavorite = (productId) => {
  const favorites = getFavorites();
  const idStr = String(productId);
  let updatedFavorites;
  let isNowFav;

  if (favorites.includes(idStr)) {
    updatedFavorites = favorites.filter((id) => id !== idStr);
    isNowFav = false;
  } else {
    updatedFavorites = [...favorites, idStr];
    isNowFav = true;
  }

  setStored(FAVORITES_KEY, updatedFavorites);
  window.dispatchEvent(new Event('agrishield_favorites_updated'));
  return isNowFav;
};

export const getFavoriteProducts = () => {
  const favorites = getFavorites();
  const products = getProducts();
  return products.filter((p) => favorites.includes(String(p.id)));
};

// --- Report Listings Management ---
export const reportListing = (reportData) => {
  const reports = getStored(REPORTS_KEY, []);
  const newReport = {
    id: `rep-${Date.now()}`,
    timestamp: Date.now(),
    dateStr: new Date().toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }),
    ...reportData
  };

  reports.push(newReport);
  setStored(REPORTS_KEY, reports);
  return newReport;
};

export const getReports = () => {
  return getStored(REPORTS_KEY, []);
};
