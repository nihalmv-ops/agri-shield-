import express from 'express';
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  toggleProductStatus,
  toggleFavourite,
  getMyFavourites,
  getMyListings,
  reportProduct
} from '../controllers/productController.js';
import { protect, optionalAuth } from '../middleware/auth.js';

const router = express.Router();

// Specific routes first to prevent collision with :id
router.get('/user/favourites', protect, getMyFavourites);
router.get('/user/my-listings', protect, getMyListings);

// General listings
router.route('/')
  .get(optionalAuth, getProducts)
  .post(protect, createProduct);

// Single listing operations
router.route('/:id')
  .get(getProductById)
  .put(protect, updateProduct)
  .delete(protect, deleteProduct);

// Actions on single listing
router.patch('/:id/status', protect, toggleProductStatus);
router.post('/:id/favourite', protect, toggleFavourite);
router.post('/:id/report', protect, reportProduct);

export default router;
