import CameraTrap from '../models/CameraTrap.js';
import WildlifeAlert from '../models/WildlifeAlert.js';
import ActivityLog from '../models/ActivityLog.js';

// @desc    Get all camera traps & telemetry
// @route   GET /api/cameras
// @access  Public
export const getCameras = async (req, res) => {
  try {
    const cameras = await CameraTrap.find().sort({ cameraId: 1 });
    res.status(200).json({
      success: true,
      count: cameras.length,
      cameras
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Error fetching camera traps'
    });
  }
};

// @desc    Get camera trap by ID
// @route   GET /api/cameras/:id
// @access  Public
export const getCameraById = async (req, res) => {
  try {
    const camera = await CameraTrap.findOne({
      $or: [{ _id: req.params.id }, { cameraId: req.params.id }]
    });

    if (!camera) {
      return res.status(404).json({
        success: false,
        message: 'Camera trap not found'
      });
    }

    res.status(200).json({
      success: true,
      camera
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Error fetching camera details'
    });
  }
};

// @desc    Simulate AI camera trigger event
// @route   POST /api/cameras/:id/simulate
// @access  Private (Officer only)
export const simulateCameraDetection = async (req, res) => {
  try {
    const { species = 'Asian Elephant', confidence = 95, imageUrl } = req.body;
    const camera = await CameraTrap.findOne({
      $or: [{ _id: req.params.id }, { cameraId: req.params.id }]
    });

    if (!camera) {
      return res.status(404).json({
        success: false,
        message: 'Camera trap not found'
      });
    }

    const defaultImage =
      imageUrl ||
      (species.includes('Leopard')
        ? 'https://images.unsplash.com/photo-1456926631375-92c8ce872def?auto=format&fit=crop&w=1200&q=80'
        : species.includes('Boar')
        ? 'https://images.unsplash.com/photo-1570481662006-a3a1374699e8?auto=format&fit=crop&w=1200&q=80'
        : 'https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?auto=format&fit=crop&w=1200&q=80');

    // Update camera state
    camera.status = 'Triggered';
    camera.lastAnimal = species;
    camera.lastConfidence = confidence;
    camera.lastTriggerTime = new Date().toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    });
    camera.liveImageUrl = defaultImage;
    await camera.save();

    // Generate new WildlifeAlert
    const count = await WildlifeAlert.countDocuments();
    const alertId = `AL-${String(count + 1).padStart(3, '0')}`;

    const newAlert = await WildlifeAlert.create({
      alertId,
      animal: species.includes('Elephant') ? 'Elephant' : species.includes('Leopard') ? 'Leopard' : 'Wild Boar',
      confidence,
      location: camera.sector,
      coordinates: camera.coordinates,
      source: 'AI Camera',
      camera: camera.cameraId,
      status: 'Pending Verification',
      severity: species.includes('Elephant') || species.includes('Leopard') ? 'Critical' : 'High',
      image: defaultImage,
      zone: `${camera.sector} Boundary`,
      description: `Neural optical model detected ${species} with ${confidence}% confidence at node ${camera.cameraId}.`,
      sensorData: {
        temperature: camera.temperature,
        battery: camera.battery,
        solarCharge: camera.solar,
        signal: camera.signal
      }
    });

    // Log Activity
    try {
      await ActivityLog.create({
        activityId: `ACT-${Date.now().toString().slice(-4)}`,
        title: `AI detected ${species} on ${camera.cameraId}`,
        description: `Neural vision trigger at ${camera.name} (${confidence}% confidence).`,
        type: 'alert',
        icon: 'Radio',
        color: 'rose'
      });
    } catch (e) {
      console.warn('Activity log error:', e.message);
    }

    res.status(200).json({
      success: true,
      message: `AI detection simulated on ${camera.cameraId}!`,
      camera,
      alert: newAlert
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Error simulating camera detection'
    });
  }
};
