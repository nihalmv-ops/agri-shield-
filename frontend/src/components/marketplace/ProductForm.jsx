import React, { useState, useEffect } from 'react';
import { 
  Camera, 
  Upload, 
  MapPin, 
  IndianRupee, 
  Package, 
  Tag, 
  AlertCircle, 
  CheckCircle2, 
  X, 
  Phone, 
  User, 
  Sparkles,
  Image as ImageIcon
} from 'lucide-react';
import { MARKETPLACE_CATEGORIES, KERALA_DISTRICTS } from '../../data/marketplaceProducts';
import Button from '../Button';

const PRICE_UNITS = [
  { value: 'kg', label: 'Per kg' },
  { value: 'gram', label: 'Per gram' },
  { value: 'litre', label: 'Per litre' },
  { value: 'piece', label: 'Per piece' },
  { value: 'bag', label: 'Per bag' },
  { value: 'item', label: 'Per item' }
];

const QUANTITY_UNITS = [
  { value: 'kg', label: 'kg' },
  { value: 'grams', label: 'grams' },
  { value: 'litres', label: 'litres' },
  { value: 'pieces', label: 'pieces' },
  { value: 'bags', label: 'bags' },
  { value: 'items', label: 'items' }
];

const DEFAULT_IMAGES = [
  'https://images.unsplash.com/photo-1546470427-227c7369a489?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&w=800&q=80'
];

const ProductForm = ({
  initialData = null,
  onSubmit,
  isEditing = false,
  submitLabel = 'Post Listing Now'
}) => {
  const [formData, setFormData] = useState({
    name: '',
    category: 'Vegetables',
    description: '',
    price: '',
    priceUnit: 'kg',
    quantity: '',
    quantityUnit: 'kg',
    location: '',
    district: 'Wayanad',
    condition: 'Fresh Harvest',
    sellerName: 'Rahul Kumar',
    sellerPhone: '+91 98471 23456',
    sellerWhatsApp: '919847123456',
    image: '',
    images: []
  });

  const [imageUrlInput, setImageUrlInput] = useState('');
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || '',
        category: initialData.category || 'Vegetables',
        description: initialData.description || '',
        price: initialData.price || '',
        priceUnit: initialData.priceUnit || 'kg',
        quantity: initialData.quantity || '',
        quantityUnit: initialData.quantityUnit || 'kg',
        location: initialData.location || '',
        district: initialData.district || 'Wayanad',
        condition: initialData.condition || 'Fresh Harvest',
        sellerName: initialData.sellerName || 'Rahul Kumar',
        sellerPhone: initialData.sellerPhone || '+91 98471 23456',
        sellerWhatsApp: initialData.sellerWhatsApp || '919847123456',
        image: initialData.image || '',
        images: initialData.images && initialData.images.length > 0 
          ? initialData.images 
          : (initialData.image ? [initialData.image] : [])
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleAddImageUrl = (e) => {
    e.preventDefault();
    if (!imageUrlInput.trim()) return;

    const newImages = [...formData.images, imageUrlInput.trim()];
    setFormData((prev) => ({
      ...prev,
      image: prev.image || imageUrlInput.trim(),
      images: newImages
    }));
    setImageUrlInput('');
    if (errors.images) {
      setErrors((prev) => ({ ...prev, images: null }));
    }
  };

  const handlePickDefaultImage = (url) => {
    if (!formData.images.includes(url)) {
      setFormData((prev) => ({
        ...prev,
        image: prev.image || url,
        images: [...prev.images, url]
      }));
      if (errors.images) {
        setErrors((prev) => ({ ...prev, images: null }));
      }
    }
  };

  const handleRemoveImage = (indexToRemove) => {
    const updatedImages = formData.images.filter((_, idx) => idx !== indexToRemove);
    setFormData((prev) => ({
      ...prev,
      images: updatedImages,
      image: updatedImages.length > 0 ? updatedImages[0] : ''
    }));
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const dataUrl = reader.result;
      setFormData((prev) => ({
        ...prev,
        image: prev.image || dataUrl,
        images: [...prev.images, dataUrl]
      }));
      if (errors.images) {
        setErrors((prev) => ({ ...prev, images: null }));
      }
    };
    reader.readAsDataURL(file);
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Product name is required';
    }
    if (!formData.category) {
      newErrors.category = 'Category is required';
    }
    if (!formData.description.trim() || formData.description.trim().length < 15) {
      newErrors.description = 'Description must be at least 15 characters long';
    }
    if (!formData.price || Number(formData.price) <= 0) {
      newErrors.price = 'Price must be greater than zero';
    }
    if (!formData.quantity || Number(formData.quantity) <= 0) {
      newErrors.quantity = 'Quantity must be greater than zero';
    }
    if (!formData.location.trim()) {
      newErrors.location = 'Town/Village location is required';
    }
    if (!formData.district || formData.district === 'All Districts') {
      newErrors.district = 'Please select a valid district';
    }
    if (!formData.images || formData.images.length === 0) {
      newErrors.images = 'At least one product image is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) {
      window.scrollTo({ top: 120, behavior: 'smooth' });
      return;
    }

    setIsSubmitting(true);
    onSubmit({
      ...formData,
      price: Number(formData.price),
      quantity: Number(formData.quantity),
      image: formData.images[0]
    });
  };

  const categoryOptions = MARKETPLACE_CATEGORIES.filter((c) => c.id !== 'all');
  const districtOptions = KERALA_DISTRICTS.filter((d) => d !== 'All Districts');

  return (
    <form onSubmit={handleSubmit} className="space-y-8 animate-fadeIn">
      
      {/* 1. Basic Product Info */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-emerald-950/10 shadow-soft space-y-6">
        <div>
          <h2 className="text-xl font-black text-[#063B2A] flex items-center gap-2">
            <Tag className="w-5 h-5 text-emerald-600" />
            <span>Product Details</span>
          </h2>
          <p className="text-xs text-gray-500 mt-1">
            Specify the title, category and descriptive details of your agricultural listing
          </p>
        </div>

        {/* Product Title */}
        <div>
          <label className="block text-xs font-bold text-gray-700 mb-1.5">
            Product Title <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g. Fresh Red Tomatoes, Raw Turmeric Rhizomes, Palakkadan Matta Rice"
            className={`w-full p-3.5 bg-[#F5F8F6] text-xs sm:text-sm font-semibold rounded-2xl border transition-all ${
              errors.name ? 'border-rose-400 focus:border-rose-500' : 'border-gray-200 focus:border-emerald-400'
            } focus:bg-white focus:outline-none`}
          />
          {errors.name && (
            <p className="text-[11px] text-rose-500 font-bold mt-1.5 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>{errors.name}</span>
            </p>
          )}
        </div>

        {/* Category & Condition Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1.5">
              Category <span className="text-rose-500">*</span>
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full p-3.5 bg-[#F5F8F6] text-xs sm:text-sm font-bold rounded-2xl border border-gray-200 focus:border-emerald-400 focus:bg-white focus:outline-none cursor-pointer"
            >
              {categoryOptions.map((cat) => (
                <option key={cat.id} value={cat.name}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1.5">
              Product Nature / Condition
            </label>
            <select
              name="condition"
              value={formData.condition}
              onChange={handleChange}
              className="w-full p-3.5 bg-[#F5F8F6] text-xs sm:text-sm font-bold rounded-2xl border border-gray-200 focus:border-emerald-400 focus:bg-white focus:outline-none cursor-pointer"
            >
              <option value="Fresh Harvest">Fresh Harvest (Perishable/Fresh)</option>
              <option value="Processed / Cured">Processed / Cured (Dry Spices, Grains)</option>
              <option value="New">Brand New (Seeds, Tools, Equipment)</option>
              <option value="Used - Good">Used - Good Condition (Machinery, Implements)</option>
            </select>
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-xs font-bold text-gray-700 mb-1.5">
            Full Description <span className="text-rose-500">*</span>
          </label>
          <textarea
            name="description"
            rows={4}
            value={formData.description}
            onChange={handleChange}
            placeholder="Describe the quality, harvest freshness, organic methods, packaging, or pickup instructions..."
            className={`w-full p-3.5 bg-[#F5F8F6] text-xs sm:text-sm font-medium rounded-2xl border transition-all ${
              errors.description ? 'border-rose-400 focus:border-rose-500' : 'border-gray-200 focus:border-emerald-400'
            } focus:bg-white focus:outline-none leading-relaxed`}
          />
          <div className="flex justify-between items-center mt-1 text-[11px] text-gray-400">
            <span>Minimum 15 characters</span>
            <span>{formData.description.length} characters</span>
          </div>
          {errors.description && (
            <p className="text-[11px] text-rose-500 font-bold mt-1 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>{errors.description}</span>
            </p>
          )}
        </div>

      </div>

      {/* 2. Price & Available Stock */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-emerald-950/10 shadow-soft space-y-6">
        <div>
          <h2 className="text-xl font-black text-[#063B2A] flex items-center gap-2">
            <IndianRupee className="w-5 h-5 text-emerald-600" />
            <span>Price & Quantity</span>
          </h2>
          <p className="text-xs text-gray-500 mt-1">
            Set clear transparent pricing with matching measurement units
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          
          {/* Price Block */}
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1.5">
              Unit Price (₹) <span className="text-rose-500">*</span>
            </label>
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-emerald-800 font-extrabold text-sm">₹</span>
                <input
                  type="number"
                  name="price"
                  min="1"
                  step="any"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="e.g. 60"
                  className={`w-full pl-9 pr-3.5 py-3.5 bg-[#F5F8F6] text-xs sm:text-sm font-black rounded-2xl border transition-all ${
                    errors.price ? 'border-rose-400' : 'border-gray-200 focus:border-emerald-400'
                  } focus:bg-white focus:outline-none`}
                />
              </div>

              <select
                name="priceUnit"
                value={formData.priceUnit}
                onChange={handleChange}
                className="w-36 p-3.5 bg-[#F5F8F6] text-xs font-bold rounded-2xl border border-gray-200 focus:border-emerald-400 focus:bg-white focus:outline-none cursor-pointer"
              >
                {PRICE_UNITS.map((u) => (
                  <option key={u.value} value={u.value}>
                    {u.label}
                  </option>
                ))}
              </select>
            </div>
            {errors.price && (
              <p className="text-[11px] text-rose-500 font-bold mt-1.5">
                {errors.price}
              </p>
            )}
          </div>

          {/* Quantity Block */}
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1.5">
              Available Quantity <span className="text-rose-500">*</span>
            </label>
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <input
                  type="number"
                  name="quantity"
                  min="1"
                  step="any"
                  value={formData.quantity}
                  onChange={handleChange}
                  placeholder="e.g. 100"
                  className={`w-full px-3.5 py-3.5 bg-[#F5F8F6] text-xs sm:text-sm font-black rounded-2xl border transition-all ${
                    errors.quantity ? 'border-rose-400' : 'border-gray-200 focus:border-emerald-400'
                  } focus:bg-white focus:outline-none`}
                />
              </div>

              <select
                name="quantityUnit"
                value={formData.quantityUnit}
                onChange={handleChange}
                className="w-32 p-3.5 bg-[#F5F8F6] text-xs font-bold rounded-2xl border border-gray-200 focus:border-emerald-400 focus:bg-white focus:outline-none cursor-pointer"
              >
                {QUANTITY_UNITS.map((u) => (
                  <option key={u.value} value={u.value}>
                    {u.label}
                  </option>
                ))}
              </select>
            </div>
            {errors.quantity && (
              <p className="text-[11px] text-rose-500 font-bold mt-1.5">
                {errors.quantity}
              </p>
            )}
          </div>

        </div>
      </div>

      {/* 3. Product Photography */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-emerald-950/10 shadow-soft space-y-6">
        <div>
          <h2 className="text-xl font-black text-[#063B2A] flex items-center gap-2">
            <Camera className="w-5 h-5 text-emerald-600" />
            <span>Product Photos</span>
          </h2>
          <p className="text-xs text-gray-500 mt-1">
            Real photos attract 5x more buyers. Upload images or enter high-resolution image URLs
          </p>
        </div>

        {/* Existing Image Thumbnails */}
        {formData.images.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
            {formData.images.map((imgUrl, idx) => (
              <div key={idx} className="relative h-28 rounded-2xl overflow-hidden border-2 border-emerald-500 shadow-xs group">
                <img src={imgUrl} alt={`Product preview ${idx + 1}`} className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={() => handleRemoveImage(idx)}
                  className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-rose-600 text-white flex items-center justify-center text-xs opacity-90 hover:opacity-100 shadow-md"
                  aria-label="Remove photo"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
                {idx === 0 && (
                  <span className="absolute bottom-1.5 left-1.5 text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-[#063B2A]/90 text-white">
                    Primary
                  </span>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Image Upload & URL input */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* File Upload Box */}
          <label className="border-2 border-dashed border-gray-300 hover:border-emerald-500 p-5 rounded-2xl flex flex-col items-center justify-center text-center cursor-pointer bg-[#F5F8F6] hover:bg-emerald-50/50 transition-all">
            <Upload className="w-7 h-7 text-emerald-600 mb-2" />
            <span className="text-xs font-bold text-gray-800">Upload from Device</span>
            <span className="text-[10px] text-gray-400 mt-0.5">JPEG, PNG, WebP supported</span>
            <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
          </label>

          {/* Web Image URL Entry */}
          <div className="p-4 bg-[#F5F8F6] rounded-2xl border border-gray-200 flex flex-col justify-between space-y-2">
            <div>
              <span className="text-xs font-bold text-gray-800 block">Or Add Image Web URL:</span>
              <span className="text-[10px] text-gray-400 block mb-2">Paste Unsplash, Cloudinary or direct image link</span>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="url"
                placeholder="https://..."
                value={imageUrlInput}
                onChange={(e) => setImageUrlInput(e.target.value)}
                className="flex-1 px-3 py-2 text-xs bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-emerald-400"
              />
              <button
                type="button"
                onClick={handleAddImageUrl}
                className="px-4 py-2 bg-[#063B2A] text-white text-xs font-bold rounded-xl hover:bg-emerald-900 transition-colors"
              >
                Add
              </button>
            </div>
          </div>
        </div>

        {/* Quick Demo Photo Presets */}
        <div>
          <span className="text-[11px] font-bold text-gray-500 block mb-2">
            Quick Demo Photos (Click to attach):
          </span>
          <div className="flex flex-wrap gap-2">
            {DEFAULT_IMAGES.map((url, i) => (
              <button
                key={i}
                type="button"
                onClick={() => handlePickDefaultImage(url)}
                className="w-12 h-12 rounded-xl overflow-hidden border border-gray-200 hover:border-emerald-500 hover:scale-105 transition-all shadow-xs"
              >
                <img src={url} alt="preset" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {errors.images && (
          <p className="text-[11px] text-rose-500 font-bold flex items-center gap-1">
            <AlertCircle className="w-3.5 h-3.5" />
            <span>{errors.images}</span>
          </p>
        )}
      </div>

      {/* 4. Location & Contact Details */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-emerald-950/10 shadow-soft space-y-6">
        <div>
          <h2 className="text-xl font-black text-[#063B2A] flex items-center gap-2">
            <MapPin className="w-5 h-5 text-emerald-600" />
            <span>Location & Direct Seller Contact</span>
          </h2>
          <p className="text-xs text-gray-500 mt-1">
            Help nearby buyers find you and connect directly via WhatsApp or phone
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1.5">
              District <span className="text-rose-500">*</span>
            </label>
            <select
              name="district"
              value={formData.district}
              onChange={handleChange}
              className="w-full p-3.5 bg-[#F5F8F6] text-xs sm:text-sm font-bold rounded-2xl border border-gray-200 focus:border-emerald-400 focus:bg-white focus:outline-none cursor-pointer"
            >
              {districtOptions.map((dist) => (
                <option key={dist} value={dist}>
                  {dist}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1.5">
              Town / Village / Panchayath <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="e.g. Sultan Bathery, Kumily, Aluva, Chittur"
              className={`w-full p-3.5 bg-[#F5F8F6] text-xs sm:text-sm font-semibold rounded-2xl border transition-all ${
                errors.location ? 'border-rose-400' : 'border-gray-200 focus:border-emerald-400'
              } focus:bg-white focus:outline-none`}
            />
            {errors.location && (
              <p className="text-[11px] text-rose-500 font-bold mt-1.5">
                {errors.location}
              </p>
            )}
          </div>
        </div>

        {/* Seller Info */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-gray-100">
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1.5">
              Seller Name
            </label>
            <input
              type="text"
              name="sellerName"
              value={formData.sellerName}
              onChange={handleChange}
              className="w-full p-3 bg-[#F5F8F6] text-xs font-semibold rounded-2xl border border-gray-200 focus:outline-none focus:border-emerald-400"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1.5">
              Direct Contact Phone
            </label>
            <input
              type="tel"
              name="sellerPhone"
              value={formData.sellerPhone}
              onChange={handleChange}
              className="w-full p-3 bg-[#F5F8F6] text-xs font-semibold rounded-2xl border border-gray-200 focus:outline-none focus:border-emerald-400"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1.5">
              WhatsApp Number
            </label>
            <input
              type="text"
              name="sellerWhatsApp"
              value={formData.sellerWhatsApp}
              onChange={handleChange}
              className="w-full p-3 bg-[#F5F8F6] text-xs font-semibold rounded-2xl border border-gray-200 focus:outline-none focus:border-emerald-400"
            />
          </div>
        </div>

      </div>

      {/* Submit Button */}
      <div className="flex items-center justify-end gap-3 pt-4">
        <Button
          type="submit"
          variant="primary"
          size="lg"
          disabled={isSubmitting}
          className="w-full sm:w-auto px-10 py-4 bg-gradient-to-r from-[#10B981] to-[#063B2A] hover:opacity-95 text-white font-black text-sm rounded-2xl shadow-xl shadow-emerald-950/20 active:scale-98 transition-all"
        >
          {isSubmitting ? (
            <span>Processing Listing...</span>
          ) : (
            <span className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-300" />
              <span>{submitLabel}</span>
            </span>
          )}
        </Button>
      </div>

    </form>
  );
};

export default ProductForm;
