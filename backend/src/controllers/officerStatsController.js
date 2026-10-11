import User from '../models/User.js';
import WildlifeAlert from '../models/WildlifeAlert.js';
import Complaint from '../models/Complaint.js';
import CameraTrap from '../models/CameraTrap.js';
import ActivityLog from '../models/ActivityLog.js';

// @desc    Get Situation Room Dashboard KPIs & Stats
// @route   GET /api/officer/stats
// @access  Private (Officer only)
export const getDashboardStats = async (req, res) => {
  try {
    const [
      activeAlertsCount,
      verifiedAlertsCount,
      pendingComplaintsCount,
      resolvedComplaintsCount,
      farmersCount,
      usersCount,
      onlineCamerasCount,
      totalCamerasCount,
      complaints
    ] = await Promise.all([
      WildlifeAlert.countDocuments({ status: 'Pending Verification' }),
      WildlifeAlert.countDocuments({ status: 'Verified' }),
      Complaint.countDocuments({ status: 'Pending' }),
      Complaint.countDocuments({ status: { $in: ['Resolved', 'Compensation Approved'] } }),
      User.countDocuments({ role: 'farmer' }),
      User.countDocuments({ role: 'user' }),
      CameraTrap.countDocuments({ status: 'Online' }),
      CameraTrap.countDocuments(),
      Complaint.find().select('compensationApproved')
    ]);

    const totalApprovedCompensation = complaints.reduce(
      (sum, c) => sum + (c.compensationApproved || 0),
      0
    );

    res.status(200).json({
      success: true,
      stats: {
        activeAlerts: activeAlertsCount,
        verifiedAlerts: verifiedAlertsCount,
        pendingComplaints: pendingComplaintsCount,
        resolvedComplaints: resolvedComplaintsCount,
        registeredFarmers: farmersCount,
        registeredUsers: usersCount,
        onlineCameras: onlineCamerasCount,
        totalCameras: totalCamerasCount,
        sensorNetworkHealth: totalCamerasCount > 0 ? Math.round((onlineCamerasCount / totalCamerasCount) * 100) : 100,
        totalApprovedCompensation,
        defconLevel: activeAlertsCount > 5 ? 'DEFCON 2 - HIGH' : activeAlertsCount > 0 ? 'DEFCON 3 - ELEVATED' : 'DEFCON 4 - NORMAL'
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Error fetching situation room statistics'
    });
  }
};

// @desc    Get Farmers Protected Directory
// @route   GET /api/officer/farmers
// @access  Private (Officer only)
export const getFarmersDirectory = async (req, res) => {
  try {
    const { search, riskLevel, district } = req.query;
    const query = { role: 'farmer' };

    if (riskLevel && riskLevel !== 'All') {
      query['farmDetails.riskLevel'] = riskLevel;
    }

    if (district && district !== 'All') {
      query.district = district;
    }

    if (search && search.trim()) {
      const searchRegex = new RegExp(search.trim(), 'i');
      query.$or = [
        { name: searchRegex },
        { email: searchRegex },
        { phone: searchRegex },
        { 'farmDetails.farmName': searchRegex },
        { district: searchRegex }
      ];
    }

    const farmers = await User.find(query).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: farmers.length,
      farmers
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Error fetching farmers directory'
    });
  }
};

// @desc    Get All Registered Users
// @route   GET /api/officer/users
// @access  Private (Officer only)
export const getUsersDirectory = async (req, res) => {
  try {
    const { search, role, status } = req.query;
    const query = {};

    if (role && role !== 'All') {
      query.role = role;
    }

    if (status && status !== 'All') {
      query.status = status;
    }

    if (search && search.trim()) {
      const searchRegex = new RegExp(search.trim(), 'i');
      query.$or = [
        { name: searchRegex },
        { email: searchRegex },
        { phone: searchRegex },
        { district: searchRegex }
      ];
    }

    const users = await User.find(query).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: users.length,
      users
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Error fetching users directory'
    });
  }
};

// @desc    Verify farmer accreditation
// @route   PATCH /api/officer/farmers/:id/verify
// @access  Private (Officer only)
export const verifyFarmer = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Farmer record not found'
      });
    }

    user.isVerifiedFarmer = !user.isVerifiedFarmer;
    await user.save();

    // Log action
    try {
      await ActivityLog.create({
        activityId: `ACT-${Date.now().toString().slice(-4)}`,
        title: `Farmer accreditation ${user.isVerifiedFarmer ? 'Verified' : 'Unverified'}`,
        description: `Officer ${req.user.name} modified accreditation for ${user.name}.`,
        type: 'farmer',
        icon: 'Trees',
        color: user.isVerifiedFarmer ? 'emerald' : 'amber'
      });
    } catch (e) {
      console.warn('Activity log error:', e.message);
    }

    res.status(200).json({
      success: true,
      message: `Farmer accreditation set to ${user.isVerifiedFarmer ? 'Verified' : 'Unverified'}`,
      isVerifiedFarmer: user.isVerifiedFarmer
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Error updating farmer verification'
    });
  }
};

// @desc    Toggle user status (active / suspended)
// @route   PATCH /api/officer/users/:id/status
// @access  Private (Officer only)
export const toggleUserStatus = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User record not found'
      });
    }

    user.status = user.status === 'active' ? 'suspended' : 'active';
    await user.save();

    // Log action
    try {
      await ActivityLog.create({
        activityId: `ACT-${Date.now().toString().slice(-4)}`,
        title: `Account #${user._id.toString().slice(-6)} set to ${user.status}`,
        description: `Officer ${req.user.name} changed status of ${user.name} (${user.email}).`,
        type: 'system',
        icon: 'ShieldAlert',
        color: user.status === 'active' ? 'emerald' : 'rose'
      });
    } catch (e) {
      console.warn('Activity log error:', e.message);
    }

    res.status(200).json({
      success: true,
      message: `User status changed to ${user.status}`,
      status: user.status
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Error toggling user status'
    });
  }
};

// @desc    Generate official Situation Report (SitRep) data packet
// @route   GET /api/officer/sitrep
// @access  Private (Officer only)
export const generateSitRep = async (req, res) => {
  try {
    const [recentAlerts, recentComplaints, activeCameras] = await Promise.all([
      WildlifeAlert.find().sort({ createdAt: -1 }).limit(5),
      Complaint.find().sort({ createdAt: -1 }).limit(5),
      CameraTrap.find().sort({ cameraId: 1 })
    ]);

    const sitRep = {
      reportId: `SITREP-${new Date().getFullYear()}-${Date.now().toString().slice(-5)}`,
      generatedAt: new Date().toISOString(),
      officerInCharge: req.user.name,
      badge: req.user.officerDetails?.badgeNumber || 'KL-FD-7741',
      division: req.user.officerDetails?.division || 'Wayanad Wildlife Division',
      tacticalThreatStatus: recentAlerts.some(a => a.severity === 'Critical') ? 'DEFCON 2 - HIGH' : 'DEFCON 4 - STABLE',
      summary: 'Forest buffer perimeter optical sensor network operational. Early warning acoustic deterrents primed.',
      recentAlerts,
      recentComplaints,
      sensorSummary: {
        totalSensors: activeCameras.length,
        operational: activeCameras.filter(c => c.status === 'Online').length
      }
    };

    res.status(200).json({
      success: true,
      sitRep
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Error generating SitRep'
    });
  }
};
