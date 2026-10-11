import express from 'express';
import {
  registerUser,
  loginUser,
  registerOfficer,
  loginOfficer,
  getMe,
  updateProfile
} from '../controllers/authController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/officer-register', registerOfficer);
router.post('/officer-login', loginOfficer);

// Private profile routes
router.get('/me', protect, getMe);
router.put('/profile', protect, updateProfile);

export default router;

