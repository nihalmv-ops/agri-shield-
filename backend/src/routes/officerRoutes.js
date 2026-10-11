import express from 'express';
import {
  getDashboardStats,
  getFarmersDirectory,
  getUsersDirectory,
  verifyFarmer,
  toggleUserStatus,
  generateSitRep
} from '../controllers/officerStatsController.js';
import { protect, officerOnly } from '../middleware/auth.js';

const router = express.Router();

router.use(protect);
router.use(officerOnly);

// Dashboard situation room KPIs
router.get('/stats', getDashboardStats);

// Directory management
router.get('/farmers', getFarmersDirectory);
router.get('/users', getUsersDirectory);

// Farmer accreditation & user suspensions
router.patch('/farmers/:id/verify', verifyFarmer);
router.patch('/users/:id/status', toggleUserStatus);

// Situation report data
router.get('/sitrep', generateSitRep);

export default router;
