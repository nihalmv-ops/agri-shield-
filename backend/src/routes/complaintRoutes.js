import express from 'express';
import {
  getComplaints,
  getComplaintById,
  createComplaint,
  updateComplaintStatus,
  deleteComplaint
} from '../controllers/complaintController.js';
import { protect, officerOnly } from '../middleware/auth.js';

const router = express.Router();

router.use(protect); // All complaint routes require auth

router.route('/')
  .get(getComplaints)
  .post(createComplaint);

router.route('/:id')
  .get(getComplaintById)
  .delete(deleteComplaint);

// Status and compensation updates by Forest Officer
router.patch('/:id/status', officerOnly, updateComplaintStatus);

export default router;

