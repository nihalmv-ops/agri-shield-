import Product from '../models/Product.js';
import User from '../models/User.js';

// @desc    Get all marketplace products with filtering, search & pagination
// @route   GET /api/products
// @access  Public
export const getProducts = async (req, res) => {
  try {
    const {
      category,
      district,
      search,
      minPrice,
      maxPrice,
      isOrganic,
      status = 'active',
      sort = 'newest',
      page = 1,
      limit = 24
    } = req.query;

    const query = {};

    // Filter by status (default 'active' for public)
    if (status && status !== 'all') {
      query.status = status;
    }

    // Filter by category
    if (category && category !== 'all' && category !== 'All Categories') {
      query.category = category;
    }

    // Filter by district
    if (district && district !== 'All' && district !== 'All Districts') {
      query.district = district;
    }

    // Filter by organic
    if (isOrganic === 'true') {
      query.isOrganic = true;
    }

    // Filter by price range
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    // Search query across name, description, and location
    if (search && search.trim()) {
      const searchRegex = new RegExp(search.trim(), 'i');
      query.$or = [
        { name: searchRegex },
        { description: searchRegex },
        { location: searchRegex },
        { district: searchRegex },
        { sellerName: searchRegex }
      ];
    }

    // Sort order
    let sortOptions = { createdAt: -1 };
    if (sort === 'price-low') {
      sortOptions = { price: 1 };
    } else if (sort === 'price-high') {
      sortOptions = { price: -1 };
    } else if (sort === 'popular') {
      sortOptions = { views: -1 };
    }

    const pageNum = parseInt(page, 10) || 1;
    const limitNum = parseInt(limit, 10) || 24;
    const skip = (pageNum - 1) * limitNum;

    const total = await Product.countDocuments(query);
    const products = await Product.find(query)
      .sort(sortOptions)
      .skip(skip)
      .limit(limitNum)
      .populate('seller', 'name phone avatar isVerifiedFarmer');

    res.status(200).json({
      success: true,
      count: products.length,
      total,
      page: pageNum,
      totalPages: Math.ceil(total / limitNum),
      products
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Error fetching marketplace products'
    });
  }
};

// @desc    Get single product details
// @route   GET /api/products/:id
// @access  Public
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate(
      'seller',
      'name email phone avatar isVerifiedFarmer farmDetails district createdAt'
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product listing not found'
      });
    }

    // Increment view count
    product.views += 1;
    await product.save({ validateBeforeSave: false });

    res.status(200).json({
      success: true,
      product
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Error fetching product details'
    });
  }
};

// @desc    Create a new product listing (OLX style)
// @route   POST /api/products
// @access  Private (Farmer or User)
export const createProduct = async (req, res) => {
  try {
    const {
      name,
      category,
      price,
      priceUnit = 'kg',
      quantity = 1,
      quantityUnit = 'kg',
      description,
      image,
      images = [],
      location,
      district,
      isOrganic = false
    } = req.body;

    if (!name || !category || !price || !description || !location || !district) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required product details: name, category, price, description, location, district.'
      });
    }

    // Default primary image if not provided
    const primaryImage =
      image ||
      (images && images.length > 0 ? images[0] : 'https://images.unsplash.com/photo-1546470427-227c7369a489?auto=format&fit=crop&w=800&q=80');

    const product = await Product.create({
      name,
      category,
      price: Number(price),
      priceUnit,
      quantity: Number(quantity),
      quantityUnit,
      description,
      image: primaryImage,
      images: images && images.length > 0 ? images : [primaryImage],
      seller: req.user._id,
      sellerName: req.user.name,
      sellerPhone: req.user.phone,
      sellerWhatsApp: req.user.phone.replace(/[^0-9]/g, ''),
      sellerBio: req.user.farmDetails?.farmName || `${req.user.district} agricultural cultivator`,
      sellerMemberSince: `Member since ${new Date(req.user.createdAt || Date.now()).getFullYear()}`,
      location,
      district,
      state: 'Kerala',
      isOrganic: Boolean(isOrganic)
    });

    res.status(201).json({
      success: true,
      message: 'Product listed on AgriShield marketplace successfully!',
      product
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Error creating product listing'
    });
  }
};

// @desc    Update product listing
// @route   PUT /api/products/:id
// @access  Private (Seller or Forest Officer)
export const updateProduct = async (req, res) => {
  try {
    let product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product listing not found'
      });
    }

    // Verify ownership or officer role
    if (
      product.seller.toString() !== req.user._id.toString() &&
      req.user.role !== 'officer'
    ) {
      return res.status(403).json({
        success: false,
        message: 'Unauthorized: You are not permitted to modify this listing.'
      });
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      success: true,
      message: 'Listing updated successfully',
      product
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Error updating product'
    });
  }
};

// @desc    Delete product listing
// @route   DELETE /api/products/:id
// @access  Private (Seller or Forest Officer)
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product listing not found'
      });
    }

    if (
      product.seller.toString() !== req.user._id.toString() &&
      req.user.role !== 'officer'
    ) {
      return res.status(403).json({
        success: false,
        message: 'Unauthorized: You can only delete your own listings.'
      });
    }

    await product.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Product listing deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Error deleting product'
    });
  }
};

// @desc    Toggle product sold / active status
// @route   PATCH /api/products/:id/status
// @access  Private (Seller)
export const toggleProductStatus = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product listing not found'
      });
    }

    if (
      product.seller.toString() !== req.user._id.toString() &&
      req.user.role !== 'officer'
    ) {
      return res.status(403).json({
        success: false,
        message: 'Unauthorized'
      });
    }

    const { status } = req.body;
    product.status = status || (product.status === 'active' ? 'sold' : 'active');
    await product.save();

    res.status(200).json({
      success: true,
      message: `Product status updated to ${product.status}`,
      product
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Error updating product status'
    });
  }
};

// @desc    Toggle favourite on a product
// @route   POST /api/products/:id/favourite
// @access  Private
export const toggleFavourite = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const productId = req.params.id;

    const isFav = user.favourites.some(
      (id) => id.toString() === productId.toString()
    );

    if (isFav) {
      user.favourites = user.favourites.filter(
        (id) => id.toString() !== productId.toString()
      );
    } else {
      user.favourites.push(productId);
    }

    await user.save();

    res.status(200).json({
      success: true,
      isFavourite: !isFav,
      message: isFav ? 'Removed from saved favourites' : 'Added to saved favourites',
      favourites: user.favourites
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Error toggling favourite'
    });
  }
};

// @desc    Get user favourites
// @route   GET /api/products/user/favourites
// @access  Private
export const getMyFavourites = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate('favourites');
    res.status(200).json({
      success: true,
      favourites: user.favourites || []
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Error fetching favourites'
    });
  }
};

// @desc    Get current user's listings
// @route   GET /api/products/user/my-listings
// @access  Private
export const getMyListings = async (req, res) => {
  try {
    const listings = await Product.find({ seller: req.user._id }).sort({
      createdAt: -1
    });

    res.status(200).json({
      success: true,
      count: listings.length,
      listings
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Error fetching user listings'
    });
  }
};

// @desc    Report listing
// @route   POST /api/products/:id/report
// @access  Private
export const reportProduct = async (req, res) => {
  try {
    const { reason, details } = req.body;
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product listing not found'
      });
    }

    product.reports.push({
      user: req.user._id,
      reason: reason || 'Inappropriate or fraudulent listing',
      details: details || ''
    });

    await product.save();

    res.status(200).json({
      success: true,
      message: 'Listing reported to moderators. Thank you for keeping the community safe.'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Error reporting product'
    });
  }
};

