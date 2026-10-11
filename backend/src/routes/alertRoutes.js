import express from 'express';
import {
  getAlerts,
  getAlertById,
  createAlert,
  verifyAlert,
  dismissAlert,
  dispatchSquad,
  triggerSiren,
  broadcastAlert,
  createAndBroadcastAlert,
  getAlertTrends
} from '../controllers/alertController.js';
import { protect, officerOnly } from '../middleware/auth.js';

const router = express.Router();

// Public trends endpoint for high-resolution spline chart
router.get('/trends', getAlertTrends);

router.route('/')
  .get(getAlerts)
  .post(protect, officerOnly, createAlert);

router.route('/:id')
  .get(getAlertById);

// Officer tactical action endpoints
router.post('/broadcast-new', protect, officerOnly, createAndBroadcastAlert);
router.patch('/:id/verify', protect, officerOnly, verifyAlert);
router.patch('/:id/dismiss', protect, officerOnly, dismissAlert);
router.post('/:id/dispatch', protect, officerOnly, dispatchSquad);
router.post('/:id/siren', protect, officerOnly, triggerSiren);
router.post('/:id/broadcast', protect, officerOnly, broadcastAlert);

export default router;

