import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide product name'],
      trim: true
    },
    category: {
      type: String,
      required: [true, 'Please select a product category'],
      enum: [
        'Vegetables',
        'Fruits',
        'Rice & Grains',
        'Spices',
        'Seeds',
        'Fertilizers',
        'Farming Equipment',
        'Farm Tools',
        'Dairy Products',
        'Other Agricultural Products'
      ]
    },
    price: {
      type: Number,
      required: [true, 'Please specify price in INR'],
      min: [0, 'Price must be positive']
    },
    priceUnit: {
      type: String,
      default: 'kg',
      trim: true
    },
    quantity: {
      type: Number,
      default: 1,
      min: [1, 'Quantity must be at least 1']
    },
    quantityUnit: {
      type: String,
      default: 'kg',
      trim: true
    },
    description: {
      type: String,
      required: [true, 'Please provide detailed product description']
    },
    image: {
      type: String,
      required: [true, 'Please provide at least one product photo']
    },
    images: [
      {
        type: String
      }
    ],
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    sellerName: {
      type: String,
      required: true
    },
    sellerPhone: {
      type: String,
      required: true
    },
    sellerWhatsApp: {
      type: String,
      default: ''
    },
    sellerBio: {
      type: String,
      default: ''
    },
    sellerMemberSince: {
      type: String,
      default: 'January 2026'
    },
    location: {
      type: String,
      required: [true, 'Please provide local area or town name'],
      trim: true
    },
    district: {
      type: String,
      required: [true, 'Please provide Kerala district'],
      trim: true
    },
    state: {
      type: String,
      default: 'Kerala'
    },
    isOrganic: {
      type: Boolean,
      default: false
    },
    status: {
      type: String,
      enum: ['active', 'sold', 'hidden'],
      default: 'active'
    },
    views: {
      type: Number,
      default: 0
    },
    reports: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        reason: { type: String, required: true },
        details: { type: String, default: '' },
        createdAt: { type: Date, default: Date.now }
      }
    ],
    featured: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

// Virtual for formatted price
productSchema.virtual('formattedPrice').get(function () {
  return `₹${this.price.toLocaleString('en-IN')}`;
});

// Text index for search
productSchema.index({ name: 'text', description: 'text', location: 'text', district: 'text' });

const Product = mongoose.model('Product', productSchema);
export default Product;

