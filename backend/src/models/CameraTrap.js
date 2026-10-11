import mongoose from 'mongoose';

const cameraTrapSchema = new mongoose.Schema(
  {
    cameraId: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    name: {
      type: String,
      required: true
    },
    sector: {
      type: String,
      required: true
    },
    coordinates: {
      type: String,
      default: '11.6854° N, 76.1320° E'
    },
    status: {
      type: String,
      enum: ['Online', 'Offline', 'Maintenance', 'Triggered'],
      default: 'Online'
    },
    lastAnimal: {
      type: String,
      default: 'Asian Elephant'
    },
    lastConfidence: {
      type: Number,
      default: 95
    },
    lastTriggerTime: {
      type: String,
      default: 'Just now'
    },
    battery: {
      type: String,
      default: '98%'
    },
    solar: {
      type: String,
      default: '94%'
    },
    temperature: {
      type: String,
      default: '21°C'
    },
    signal: {
      type: String,
      default: '5G Strong'
    },
    liveImageUrl: {
      type: String,
      default: 'https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?auto=format&fit=crop&w=1200&q=80'
    }
  },
  {
    timestamps: true
  }
);

const CameraTrap = mongoose.model('CameraTrap', cameraTrapSchema);
export default CameraTrap;
