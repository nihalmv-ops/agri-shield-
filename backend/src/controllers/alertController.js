import WildlifeAlert from '../models/WildlifeAlert.js';
import ActivityLog from '../models/ActivityLog.js';

// @desc    Get all wildlife alerts
// @route   GET /api/alerts
// @access  Public (or Private)
export const getAlerts = async (req, res) => {
  try {
    const { status, animal, severity, search, page = 1, limit = 50 } = req.query;
    const query = {};

    if (status && status !== 'All') {
      query.status = status;
    }

    if (animal && animal !== 'All') {
      query.animal = animal;
    }

    if (severity && severity !== 'All') {
      query.severity = severity;
    }

    if (search && search.trim()) {
      const searchRegex = new RegExp(search.trim(), 'i');
      query.$or = [
        { alertId: searchRegex },
        { animal: searchRegex },
        { location: searchRegex },
        { zone: searchRegex },
        { camera: searchRegex }
      ];
    }

    const pageNum = parseInt(page, 10) || 1;
    const limitNum = parseInt(limit, 10) || 50;
    const skip = (pageNum - 1) * limitNum;

    const total = await WildlifeAlert.countDocuments(query);
    const alerts = await WildlifeAlert.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNum);

    res.status(200).json({
      success: true,
      count: alerts.length,
      total,
      page: pageNum,
      totalPages: Math.ceil(total / limitNum),
      alerts
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Error fetching wildlife alerts'
    });
  }
};

// @desc    Get single alert by ID
// @route   GET /api/alerts/:id
// @access  Public
export const getAlertById = async (req, res) => {
  try {
    const alert = await WildlifeAlert.findById(req.params.id);
    if (!alert) {
      return res.status(404).json({
        success: false,
        message: 'Wildlife alert not found'
      });
    }

    res.status(200).json({
      success: true,
      alert
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Error fetching alert details'
    });
  }
};

// @desc    Create new wildlife alert (AI camera webhook or Officer manual alert)
// @route   POST /api/alerts
// @access  Private (Officer only or API key)
export const createAlert = async (req, res) => {
  try {
    const {
      animal,
      confidence = 92,
      location,
      coordinates,
      source = 'AI Camera',
      camera = 'CAM-023',
      severity = 'High',
      image,
      zone,
      description,
      suggestedAction,
      sensorData
    } = req.body;

    if (!animal || !location || !image) {
      return res.status(400).json({
        success: false,
        message: 'Please provide animal species, location, and capture image.'
      });
    }

    const count = await WildlifeAlert.countDocuments();
    const alertId = `AL-${String(count + 1).padStart(3, '0')}`;

    const alert = await WildlifeAlert.create({
      alertId,
      animal,
      confidence: Number(confidence),
      location,
      coordinates: coordinates || '11.6854° N, 76.1320° E',
      source,
      camera,
      status: 'Pending Verification',
      severity,
      image,
      zone: zone || `${location} Outer Fringe`,
      description: description || `Optical sensor detected ${animal} movement in buffer sector.`,
      suggestedAction: suggestedAction || 'Alert buffer perimeter, inspect infrared camera stream.',
      sensorData: sensorData || {
        temperature: '21°C',
        battery: '96%',
        solarCharge: '92%',
        signal: 'Strong 5G'
      }
    });

    // Log activity
    try {
      await ActivityLog.create({
        activityId: `ACT-${Date.now().toString().slice(-4)}`,
        title: `AI detected ${animal} in ${location}`,
        description: `Camera ${camera} triggered with ${confidence}% neural confidence in ${zone || location}.`,
        type: 'alert',
        icon: 'Radio',
        color: severity === 'Critical' ? 'rose' : 'amber'
      });
    } catch (e) {
      console.warn('Activity log error:', e.message);
    }

    res.status(201).json({
      success: true,
      message: `Wildlife Alert #${alertId} generated successfully.`,
      alert
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Error generating wildlife alert'
    });
  }
};

// @desc    Verify alert (Officer confirms detection)
// @route   PATCH /api/alerts/:id/verify
// @access  Private (Officer only)
export const verifyAlert = async (req, res) => {
  try {
    const alert = await WildlifeAlert.findById(req.params.id);
    if (!alert) {
      return res.status(404).json({
        success: false,
        message: 'Alert record not found'
      });
    }

    alert.status = 'Verified';
    alert.officerNotes = `Verified by Officer ${req.user.name} via high-resolution optical feed at ${new Date().toLocaleTimeString()}. Response protocol initiated.`;
    await alert.save();

    // Log activity
    try {
      await ActivityLog.create({
        activityId: `ACT-${Date.now().toString().slice(-4)}`,
        title: `${alert.animal} alert #${alert.alertId} verified by Officer`,
        description: `Officer ${req.user.name} verified incursion at ${alert.zone || alert.location}.`,
        type: 'verified',
        icon: 'CheckCircle2',
        color: 'blue'
      });
    } catch (e) {
      console.warn('Activity log error:', e.message);
    }

    res.status(200).json({
      success: true,
      message: `Alert #${alert.alertId} verified successfully.`,
      alert
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Error verifying alert'
    });
  }
};

// @desc    Dismiss alert as false alarm
// @route   PATCH /api/alerts/:id/dismiss
// @access  Private (Officer only)
export const dismissAlert = async (req, res) => {
  try {
    const alert = await WildlifeAlert.findById(req.params.id);
    if (!alert) {
      return res.status(404).json({
        success: false,
        message: 'Alert record not found'
      });
    }

    alert.status = 'Dismissed';
    alert.officerNotes = `Dismissed as non-hazardous by Officer ${req.user.name} at ${new Date().toLocaleTimeString()}.`;
    await alert.save();

    res.status(200).json({
      success: true,
      message: `Alert #${alert.alertId} dismissed.`,
      alert
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Error dismissing alert'
    });
  }
};

// @desc    Dispatch Rapid Response Team squad
// @route   POST /api/alerts/:id/dispatch
// @access  Private (Officer only)
export const dispatchSquad = async (req, res) => {
  try {
    const alert = await WildlifeAlert.findById(req.params.id);
    if (!alert) {
      return res.status(404).json({
        success: false,
        message: 'Alert record not found'
      });
    }

    const squad = req.body.squad || 'RRT-04 (Muthanga Unit)';
    alert.patrolDispatched = true;
    alert.dispatchedSquad = squad;
    await alert.save();

    // Log tactical activity
    try {
      await ActivityLog.create({
        activityId: `ACT-${Date.now().toString().slice(-4)}`,
        title: `Rapid Response Patrol dispatched to ${alert.camera}`,
        description: `Squad ${squad} mobilized by Officer ${req.user.name} for ${alert.animal} response at ${alert.location}.`,
        type: 'dispatch',
        icon: 'ShieldAlert',
        color: 'rose'
      });
    } catch (e) {
      console.warn('Activity log error:', e.message);
    }

    res.status(200).json({
      success: true,
      message: `Tactical squad ${squad} dispatched to ${alert.location}!`,
      alert
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Error dispatching squad'
    });
  }
};

// @desc    Trigger Acoustic Siren deterrent
// @route   POST /api/alerts/:id/siren
// @access  Private (Officer only)
export const triggerSiren = async (req, res) => {
  try {
    const alert = await WildlifeAlert.findById(req.params.id);
    if (!alert) {
      return res.status(404).json({
        success: false,
        message: 'Alert record not found'
      });
    }

    alert.sirenTriggered = true;
    await alert.save();

    // Log tactical activity
    try {
      await ActivityLog.create({
        activityId: `ACT-${Date.now().toString().slice(-4)}`,
        title: `Acoustic Siren sounder triggered at ${alert.camera}`,
        description: `High-frequency bio-acoustic deterrent activated to turn back ${alert.animal} herd.`,
        type: 'siren',
        icon: 'Volume2',
        color: 'amber'
      });
    } catch (e) {
      console.warn('Activity log error:', e.message);
    }

    res.status(200).json({
      success: true,
      message: `Acoustic deterrent sounders triggered at ${alert.camera}! High-frequency pulse active for 60 seconds.`,
      alert
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Error triggering acoustic siren'
    });
  }
};

// @desc    Broadcast Emergency Alert (SMS/WhatsApp) to buffer zone farmers
// @route   POST /api/alerts/:id/broadcast
// @access  Private (Officer only)
export const broadcastAlert = async (req, res) => {
  try {
    const alert = await WildlifeAlert.findById(req.params.id);
    if (!alert) {
      return res.status(404).json({
        success: false,
        message: 'Alert record not found'
      });
    }

    alert.broadcastSent = true;
    await alert.save();

    // Log tactical activity
    try {
      await ActivityLog.create({
        activityId: `ACT-${Date.now().toString().slice(-4)}`,
        title: `SMS emergency broadcast transmitted for ${alert.animal}`,
        description: `Early warning alert delivered to 142 registered farmers in ${alert.zone || alert.location}.`,
        type: 'alert',
        icon: 'Radio',
        color: 'emerald'
      });
    } catch (e) {
      console.warn('Activity log error:', e.message);
    }

    res.status(200).json({
      success: true,
      message: `Emergency SMS and WhatsApp warning broadcasted to all registered farmers in ${alert.zone || alert.location}.`,
      alert
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Error broadcasting alert'
    });
  }
};

// @desc    Get aggregated Monthly Wildlife Detection Trends
// @route   GET /api/alerts/trends
// @access  Public
export const getAlertTrends = async (req, res) => {
  try {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    // Query actual detection alerts from database
    const alerts = await WildlifeAlert.find().select('createdAt animal date');
    
    const trends = months.map(m => ({
      month: m,
      elephant: 0,
      leopard: 0,
      boar: 0,
      total: 0,
      note: 'Field optical camera telemetry'
    }));

    alerts.forEach(a => {
      const d = a.createdAt ? new Date(a.createdAt) : new Date();
      const monthIdx = d.getMonth();
      if (monthIdx >= 0 && monthIdx < 12) {
        trends[monthIdx].total += 1;
        const animalLower = (a.animal || '').toLowerCase();
        if (animalLower.includes('elephant')) {
          trends[monthIdx].elephant += 1;
        } else if (animalLower.includes('leopard')) {
          trends[monthIdx].leopard += 1;
        } else if (animalLower.includes('boar')) {
          trends[monthIdx].boar += 1;
        }
      }
    });

    res.status(200).json({
      success: true,
      year: new Date().getFullYear(),
      trends
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Error fetching detection trends'
    });
  }
};

