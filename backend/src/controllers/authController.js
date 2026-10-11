import User from '../models/User.js';
import { generateToken } from '../utils/generateToken.js';
import ActivityLog from '../models/ActivityLog.js';

// @desc    Register a new Farmer or Normal User
// @route   POST /api/auth/register
// @access  Public
export const registerUser = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      phone,
      role = 'user',
      address,
      district,
      state,
      farmDetails
    } = req.body;

    if (!name || !email || !password || !phone) {
      return res.status(400).json({
        success: false,
        message: 'Please provide name, email, password, and phone number.'
      });
    }

    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'An account with this email address already exists.'
      });
    }

    // Role cannot be officer from public user registration
    const userRole = role === 'farmer' ? 'farmer' : 'user';

    const user = await User.create({
      name,
      email: email.toLowerCase(),
      password,
      phone,
      role: userRole,
      address: address || '',
      district: district || 'Wayanad',
      state: state || 'Kerala',
      isVerifiedFarmer: userRole === 'farmer',
      farmDetails: userRole === 'farmer' ? farmDetails || {} : {}
    });

    // Log registration
    try {
      await ActivityLog.create({
        activityId: `ACT-${Date.now().toString().slice(-4)}`,
        title: `${userRole === 'farmer' ? 'Farmer' : 'User'} registered: ${user.name}`,
        description: `New account registered in ${user.district}, Kerala.`,
        type: 'farmer',
        icon: 'Trees',
        color: 'emerald'
      });
    } catch (e) {
      console.warn('Activity log write error:', e.message);
    }

    const token = generateToken(user._id, user.role);

    res.status(201).json({
      success: true,
      message: `${userRole === 'farmer' ? 'Farmer' : 'User'} account created successfully.`,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        avatar: user.avatar,
        district: user.district,
        state: user.state,
        isVerifiedFarmer: user.isVerifiedFarmer,
        farmDetails: user.farmDetails
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Error registering user'
    });
  }
};

// @desc    Login Farmer or User
// @route   POST /api/auth/login
// @access  Public
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide email and password.'
      });
    }

    const user = await User.findOne({ email: email.toLowerCase() }).select('+password');
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials. User not found.'
      });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials. Password incorrect.'
      });
    }

    if (user.status === 'suspended') {
      return res.status(403).json({
        success: false,
        message: 'This account has been suspended by the Forest Officer administrator.'
      });
    }

    const token = generateToken(user._id, user.role);

    res.status(200).json({
      success: true,
      message: 'Logged in successfully',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        avatar: user.avatar,
        district: user.district,
        state: user.state,
        isVerifiedFarmer: user.isVerifiedFarmer,
        farmDetails: user.farmDetails
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Error during login'
    });
  }
};

// @desc    Register a new Forest Officer
// @route   POST /api/auth/officer-register
// @access  Public
export const registerOfficer = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      phone,
      badgeNumber,
      rank,
      division,
      range,
      station
    } = req.body;

    if (!name || !email || !password || !phone) {
      return res.status(400).json({
        success: false,
        message: 'Please provide official name, email, password, and phone number.'
      });
    }

    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'An officer account with this official email already exists.'
      });
    }

    const officer = await User.create({
      name,
      email: email.toLowerCase(),
      password,
      phone,
      role: 'officer',
      district: 'Wayanad',
      state: 'Kerala',
      officerDetails: {
        badgeNumber: badgeNumber || `KL-FD-${Math.floor(1000 + Math.random() * 9000)}`,
        rank: rank || 'Range Forest Officer',
        division: division || 'Wayanad Wildlife Division',
        range: range || 'Muthanga Forest Range',
        station: station || 'Sultan Bathery Range Headquarters'
      }
    });

    const token = generateToken(officer._id, 'officer');

    res.status(201).json({
      success: true,
      message: 'Forest Officer credentials accredited and registered.',
      token,
      officer: {
        id: officer._id,
        name: officer.name,
        email: officer.email,
        phone: officer.phone,
        role: officer.role,
        avatar: officer.avatar,
        officerDetails: officer.officerDetails
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Error registering Forest Officer'
    });
  }
};

// @desc    Login Forest Officer (Admin)
// @route   POST /api/auth/officer-login
// @access  Public
export const loginOfficer = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide official email and password.'
      });
    }

    const officer = await User.findOne({ email: email.toLowerCase() }).select('+password');
    if (!officer) {
      return res.status(401).json({
        success: false,
        message: 'Forest Officer credentials not found.'
      });
    }

    if (officer.role !== 'officer') {
      return res.status(403).json({
        success: false,
        message: 'Access Denied: You do not possess Forest Officer administrative privileges.'
      });
    }

    const isMatch = await officer.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Incorrect Forest Department security password.'
      });
    }

    const token = generateToken(officer._id, 'officer');

    res.status(200).json({
      success: true,
      message: 'Forest Officer authenticated. Security clearance active.',
      token,
      officer: {
        id: officer._id,
        name: officer.name,
        email: officer.email,
        phone: officer.phone,
        role: officer.role,
        avatar: officer.avatar,
        district: officer.district,
        officerDetails: officer.officerDetails
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Error logging in Forest Officer'
    });
  }
};

// @desc    Get Current User or Officer Profile
// @route   GET /api/auth/me
// @access  Private
export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate('favourites');
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.status(200).json({
      success: true,
      user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Error fetching user profile'
    });
  }
};

// @desc    Update Profile Details
// @route   PUT /api/auth/profile
// @access  Private
export const updateProfile = async (req, res) => {
  try {
    const {
      name,
      phone,
      address,
      district,
      avatar,
      farmDetails,
      officerDetails
    } = req.body;

    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User profile not found'
      });
    }

    if (name) user.name = name;
    if (phone) user.phone = phone;
    if (address !== undefined) user.address = address;
    if (district) user.district = district;
    if (avatar) user.avatar = avatar;

    if (user.role === 'farmer' && farmDetails) {
      user.farmDetails = { ...user.farmDetails, ...farmDetails };
    }

    if (user.role === 'officer' && officerDetails) {
      user.officerDetails = { ...user.officerDetails, ...officerDetails };
    }

    await user.save();

    res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Error updating profile'
    });
  }
};

