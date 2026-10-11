import express from 'express';
import {
  getActivities,
  createActivity
} from '../controllers/activityController.js';
import { protect, officerOnly } from '../middleware/auth.js';

const router = express.Router();

router.route('/')
  .get(getActivities)
  .post(protect, officerOnly, createActivity);

export default router;
