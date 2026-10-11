import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide full name'],
      trim: true
    },
    email: {
      type: String,
      required: [true, 'Please provide an email address'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        'Please provide a valid email address'
      ]
    },
    password: {
      type: String,
      required: [true, 'Please provide a password'],
      minlength: [6, 'Password must be at least 6 characters long'],
      select: false
    },
    phone: {
      type: String,
      required: [true, 'Please provide a contact phone number'],
      trim: true
    },
    role: {
      type: String,
      enum: ['user', 'farmer', 'officer'],
      default: 'user'
    },
    avatar: {
      type: String,
      default: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80'
    },
    address: {
      type: String,
      default: ''
    },
    district: {
      type: String,
      default: 'Wayanad'
    },
    state: {
      type: String,
      default: 'Kerala'
    },
    isVerifiedFarmer: {
      type: Boolean,
      default: false
    },
    // Dedicated farmer fields
    farmDetails: {
      farmName: { type: String, default: '' },
      acres: { type: String, default: '' },
      cropTypes: [{ type: String }],
      taluk: { type: String, default: '' },
      village: { type: String, default: '' },
      sectorZone: { type: String, default: 'Sector 4 (Muthanga Buffer Fringe)' },
      nearestCamera: { type: String, default: 'CAM-023' },
      fenceStatus: { type: String, default: 'Solar Energized (8.2 kV)' },
      riskLevel: {
        type: String,
        enum: ['Low', 'Medium', 'High', 'Critical'],
        default: 'Medium'
      }
    },
    // Dedicated Forest Officer fields
    officerDetails: {
      badgeNumber: { type: String, default: '' },
      rank: { type: String, default: 'Forest Range Officer' },
      division: { type: String, default: 'Wayanad Wildlife Division' },
      range: { type: String, default: 'Muthanga Forest Range' },
      station: { type: String, default: 'Sultan Bathery Command Post' }
    },
    favourites: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
      }
    ],
    status: {
      type: String,
      enum: ['active', 'suspended'],
      default: 'active'
    }
  },
  {
    timestamps: true
  }
);

// Hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Compare password method
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);
export default User;
