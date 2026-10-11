import mongoose from 'mongoose';

const activityLogSchema = new mongoose.Schema(
  {
    activityId: {
      type: String,
      required: true,
      unique: true
    },
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    time: {
      type: String,
      default: () => new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })
    },
    type: {
      type: String,
      enum: ['alert', 'complaint', 'verified', 'farmer', 'siren', 'dispatch', 'system'],
      default: 'system'
    },
    icon: {
      type: String,
      default: 'Radio'
    },
    color: {
      type: String,
      default: 'emerald'
    },
    officer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  {
    timestamps: true
  }
);

const ActivityLog = mongoose.model('ActivityLog', activityLogSchema);
export default ActivityLog;

