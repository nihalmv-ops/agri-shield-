import mongoose from 'mongoose';

const complaintSchema = new mongoose.Schema(
  {
    complaintId: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    type: {
      type: String,
      required: [true, 'Please specify incident type'],
      enum: [
        'Crop Damage',
        'Animal Attack',
        'Wildlife Sighting',
        'Fence Breach',
        'Livestock Predation',
        'Infrastructure Damage'
      ]
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    reporter: {
      type: String,
      required: [true, 'Please provide reporter name'],
      trim: true
    },
    phone: {
      type: String,
      required: [true, 'Please provide contact phone number'],
      trim: true
    },
    location: {
      type: String,
      required: [true, 'Please provide district/location'],
      trim: true
    },
    subLocation: {
      type: String,
      default: '',
      trim: true
    },
    coordinates: {
      lat: { type: Number },
      lng: { type: Number }
    },
    date: {
      type: String,
      default: () => new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
    },
    time: {
      type: String,
      default: () => new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })
    },
    priority: {
      type: String,
      enum: ['Low', 'Medium', 'High', 'Critical'],
      default: 'Medium'
    },
    status: {
      type: String,
      enum: [
        'Pending',
        'Under Review',
        'Verified',
        'Compensation Approved',
        'Rejected',
        'Resolved'
      ],
      default: 'Pending'
    },
    description: {
      type: String,
      required: [true, 'Please describe the wildlife damage incident']
    },
    image: {
      type: String,
      default: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=800&q=80'
    },
    evidenceImages: [
      {
        type: String
      }
    ],
    compensationClaimed: {
      type: String,
      default: 'N/A'
    },
    compensationApproved: {
      type: Number,
      default: 0
    },
    officerNotes: {
      type: String,
      default: 'Complaint logged into forest department triage pipeline. Pending field assessment.'
    },
    assignedOfficer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    assignedOfficerName: {
      type: String,
      default: ''
    },
    resolutionDate: {
      type: Date
    }
  },
  {
    timestamps: true
  }
);

const Complaint = mongoose.model('Complaint', complaintSchema);
export default Complaint;

