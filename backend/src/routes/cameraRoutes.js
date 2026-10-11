import express from 'express';
import {
  getCameras,
  getCameraById,
  simulateCameraDetection
} from '../controllers/cameraController.js';
import { protect, officerOnly } from '../middleware/auth.js';

const router = express.Router();

router.route('/')
  .get(getCameras);

router.route('/:id')
  .get(getCameraById);

router.post('/:id/simulate', protect, officerOnly, simulateCameraDetection);

export default router;
