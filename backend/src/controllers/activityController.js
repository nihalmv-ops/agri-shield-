import ActivityLog from '../models/ActivityLog.js';

// @desc    Get all recent activity stream items
// @route   GET /api/activity
// @access  Public (or Private)
export const getActivities = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit, 10) || 30;
    const activities = await ActivityLog.find()
      .sort({ createdAt: -1 })
      .limit(limit);

    res.status(200).json({
      success: true,
      count: activities.length,
      activities
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Error fetching activity logs'
    });
  }
};

// @desc    Create an activity log
// @route   POST /api/activity
// @access  Private (Officer only)
export const createActivity = async (req, res) => {
  try {
    const { title, description, type, icon, color } = req.body;
    if (!title || !description) {
      return res.status(400).json({
        success: false,
        message: 'Please provide title and description'
      });
    }

    const activityId = `ACT-${Date.now().toString().slice(-4)}`;
    const activity = await ActivityLog.create({
      activityId,
      title,
      description,
      type: type || 'system',
      icon: icon || 'Radio',
      color: color || 'emerald',
      officer: req.user?._id
    });

    res.status(201).json({
      success: true,
      activity
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Error creating activity log'
    });
  }
};

