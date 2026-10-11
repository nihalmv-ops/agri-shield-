import Complaint from '../models/Complaint.js';
import ActivityLog from '../models/ActivityLog.js';

// @desc    Get complaints (Officer sees all; User sees own)
// @route   GET /api/complaints
// @access  Private
export const getComplaints = async (req, res) => {
  try {
    const { status, type, priority, search, page = 1, limit = 50 } = req.query;
    const query = {};

    // Restrict normal users to their own complaints
    if (req.user.role !== 'officer') {
      query.user = req.user._id;
    }

    if (status && status !== 'All') {
      query.status = status;
    }

    if (type && type !== 'All') {
      query.type = type;
    }

    if (priority && priority !== 'All') {
      query.priority = priority;
    }

    if (search && search.trim()) {
      const searchRegex = new RegExp(search.trim(), 'i');
      query.$or = [
        { complaintId: searchRegex },
        { reporter: searchRegex },
        { location: searchRegex },
        { subLocation: searchRegex },
        { description: searchRegex }
      ];
    }

    const pageNum = parseInt(page, 10) || 1;
    const limitNum = parseInt(limit, 10) || 50;
    const skip = (pageNum - 1) * limitNum;

    const total = await Complaint.countDocuments(query);
    const complaints = await Complaint.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNum);

    res.status(200).json({
      success: true,
      count: complaints.length,
      total,
      page: pageNum,
      totalPages: Math.ceil(total / limitNum),
      complaints
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Error fetching complaints'
    });
  }
};

// @desc    Get single complaint by ID
// @route   GET /api/complaints/:id
// @access  Private
export const getComplaintById = async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id);
    if (!complaint) {
      return res.status(404).json({
        success: false,
        message: 'Complaint record not found'
      });
    }

    // Verify access
    if (
      req.user.role !== 'officer' &&
      complaint.user &&
      complaint.user.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({
        success: false,
        message: 'Unauthorized access to this complaint record'
      });
    }

    res.status(200).json({
      success: true,
      complaint
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Error fetching complaint details'
    });
  }
};

// @desc    File a new wildlife damage complaint
// @route   POST /api/complaints
// @access  Private
export const createComplaint = async (req, res) => {
  try {
    const {
      type,
      location,
      subLocation,
      description,
      image,
      evidenceImages = [],
      compensationClaimed,
      priority = 'High',
      coordinates
    } = req.body;

    if (!type || !description || !location) {
      return res.status(400).json({
        success: false,
        message: 'Please provide incident type, location, and description.'
      });
    }

    // Auto-generate official complaint ticket number
    const count = await Complaint.countDocuments();
    const complaintId = `CMP-${String(count + 1).padStart(3, '0')}`;

    const defaultImage =
      image ||
      (evidenceImages && evidenceImages.length > 0 ? evidenceImages[0] : 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=800&q=80');

    const complaint = await Complaint.create({
      complaintId,
      type,
      user: req.user._id,
      reporter: req.user.name,
      phone: req.user.phone,
      location,
      subLocation: subLocation || `${location} Sector`,
      coordinates: coordinates || { lat: 11.6854, lng: 76.1320 },
      priority,
      status: 'Pending',
      description,
      image: defaultImage,
      evidenceImages: evidenceImages.length > 0 ? evidenceImages : [defaultImage],
      compensationClaimed: compensationClaimed || 'Under Assessment',
      officerNotes: 'Complaint logged into forest department triage pipeline. Pending field assessment.'
    });

    // Log tactical activity
    try {
      await ActivityLog.create({
        activityId: `ACT-${Date.now().toString().slice(-4)}`,
        title: `New ${type} complaint by ${req.user.name}`,
        description: `Ticket #${complaintId} filed for ${type} in ${location}.`,
        type: 'complaint',
        icon: 'MessageSquareWarning',
        color: 'amber'
      });
    } catch (e) {
      console.warn('Activity log error:', e.message);
    }

    res.status(201).json({
      success: true,
      message: `Complaint ticket #${complaintId} registered with the Forest Department.`,
      complaint
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Error registering complaint'
    });
  }
};

// @desc    Update complaint status, officer notes, or approve compensation (Forest Officer only)
// @route   PATCH /api/complaints/:id/status
// @access  Private (Officer only)
export const updateComplaintStatus = async (req, res) => {
  try {
    const { status, officerNotes, compensationApproved } = req.body;
    const complaint = await Complaint.findById(req.params.id);

    if (!complaint) {
      return res.status(404).json({
        success: false,
        message: 'Complaint record not found'
      });
    }

    if (status) complaint.status = status;
    if (officerNotes) complaint.officerNotes = officerNotes;
    if (compensationApproved !== undefined) {
      complaint.compensationApproved = Number(compensationApproved);
    }

    complaint.assignedOfficer = req.user._id;
    complaint.assignedOfficerName = req.user.name;

    if (status === 'Resolved' || status === 'Compensation Approved') {
      complaint.resolutionDate = new Date();
    }

    await complaint.save();

    // Log officer decision
    try {
      await ActivityLog.create({
        activityId: `ACT-${Date.now().toString().slice(-4)}`,
        title: `Complaint #${complaint.complaintId} marked ${complaint.status}`,
        description: `Officer ${req.user.name} updated complaint status: ${officerNotes || 'Decision recorded'}.`,
        type: 'verified',
        icon: 'CheckCircle2',
        color: status === 'Compensation Approved' ? 'emerald' : 'blue'
      });
    } catch (e) {
      console.warn('Activity log error:', e.message);
    }

    res.status(200).json({
      success: true,
      message: `Complaint #${complaint.complaintId} updated successfully.`,
      complaint
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Error updating complaint status'
    });
  }
};

// @desc    Delete complaint
// @route   DELETE /api/complaints/:id
// @access  Private (Officer or Creator)
export const deleteComplaint = async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id);
    if (!complaint) {
      return res.status(404).json({
        success: false,
        message: 'Complaint record not found'
      });
    }

    if (
      req.user.role !== 'officer' &&
      complaint.user?.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({
        success: false,
        message: 'Unauthorized: You cannot delete this complaint'
      });
    }

    await complaint.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Complaint record removed successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Error deleting complaint'
    });
  }
};
