import mongoose from 'mongoose';

const wildlifeAlertSchema = new mongoose.Schema(
  {
    alertId: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    animal: {
      type: String,
      required: true,
      enum: ['Elephant', 'Leopard', 'Wild Boar', 'Tiger', 'Bison/Gaur', 'Sloth Bear', 'Others']
    },
    confidence: {
      type: Number,
      default: 90,
      min: 0,
      max: 100
    },
    location: {
      type: String,
      required: true,
      trim: true
    },
    coordinates: {
      type: String,
      default: '11.6854° N, 76.1320° E'
    },
    date: {
      type: String,
      default: () => new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
    },
    time: {
      type: String,
      default: () => new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })
    },
    source: {
      type: String,
      enum: ['AI Camera', 'Farmer Hotline', 'Ranger Patrol', 'Acoustic Sensor'],
      default: 'AI Camera'
    },
    camera: {
      type: String,
      default: 'CAM-023'
    },
    status: {
      type: String,
      enum: ['Pending Verification', 'Verified', 'Dismissed', 'Resolved'],
      default: 'Pending Verification'
    },
    severity: {
      type: String,
      enum: ['Critical', 'High', 'Moderate', 'Low'],
      default: 'High'
    },
    image: {
      type: String,
      required: true
    },
    zone: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    suggestedAction: {
      type: String,
      default: 'Deploy rapid response unit, broadcast SMS alert, test acoustic deterrent.'
    },
    officerNotes: {
      type: String,
      default: 'Camera trap automated neural vision trigger logged into command console.'
    },
    sensorData: {
      temperature: { type: String, default: '21°C' },
      battery: { type: String, default: '98%' },
      solarCharge: { type: String, default: '94%' },
      signal: { type: String, default: 'Strong 5G' }
    },
    broadcastSent: {
      type: Boolean,
      default: false
    },
    sirenTriggered: {
      type: Boolean,
      default: false
    },
    patrolDispatched: {
      type: Boolean,
      default: false
    },
    dispatchedSquad: {
      type: String,
      default: ''
    }
  },
  {
    timestamps: true
  }
);

const WildlifeAlert = mongoose.model('WildlifeAlert', wildlifeAlertSchema);
export default WildlifeAlert;

