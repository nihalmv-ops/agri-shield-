import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, AlertTriangle, CheckCircle2, Edit3 } from 'lucide-react';
import ProductForm from '../components/marketplace/ProductForm';
import { getProductById, updateProduct } from '../utils/marketplaceStorage';
import Button from '../components/Button';

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const item = getProductById(id);
    setProduct(item);
    setLoading(false);
  }, [id]);

  const handleUpdate = (formData) => {
    updateProduct(id, formData);
    setSuccess(true);
    setTimeout(() => {
      navigate('/my-listings');
    }, 1500);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F5F8F6] flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-emerald-600"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-[#F5F8F6] py-16 px-4 flex items-center justify-center">
        <div className="max-w-md w-full bg-white rounded-3xl p-8 border border-emerald-950/10 shadow-soft text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-rose-50 text-rose-500 mx-auto flex items-center justify-center">
            <AlertTriangle className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-black text-[#063B2A]">Listing Not Found</h2>
          <p className="text-xs text-gray-500">
            The agricultural product listing you are trying to edit does not exist or has been removed.
          </p>
          <div className="pt-2">
            <Button
              to="/my-listings"
              variant="outlineDark"
              size="md"
              className="w-full"
            >
              Return to My Listings
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F8F6] py-8 sm:py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <div className="flex items-center justify-between mb-6 text-xs text-gray-500">
          <button
            onClick={() => navigate('/my-listings')}
            className="inline-flex items-center gap-1.5 font-bold text-[#063B2A] hover:text-emerald-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to My Listings</span>
          </button>
          
          <div className="flex items-center gap-2">
            <Link to="/my-listings" className="hover:underline text-gray-600">My Listings</Link>
            <span>/</span>
            <span className="font-bold text-[#063B2A]">Edit Listing</span>
          </div>
        </div>

        {/* Success Alert */}
        {success && (
          <div className="mb-6 p-4 rounded-2xl bg-emerald-100 border border-emerald-300 text-emerald-900 flex items-center gap-3 text-xs font-bold animate-fadeIn">
            <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0" />
            <span>Listing updated successfully! Redirecting to your dashboard...</span>
          </div>
        )}

        {/* Page Title */}
        <div className="bg-[#063B2A] text-white rounded-3xl p-6 sm:p-8 mb-8 shadow-soft flex items-center justify-between flex-wrap gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30 mb-2">
              <Edit3 className="w-3.5 h-3.5" />
              <span>Editing Listing #{product.id}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white">
              Edit: {product.name}
            </h1>
            <p className="text-xs text-emerald-100/90 mt-1">
              Update photos, revise price per unit, adjust available stock, or refine description.
            </p>
          </div>

          <Link
            to={`/marketplace/${product.id}`}
            className="px-4 py-2 bg-emerald-900/80 hover:bg-emerald-900 text-white rounded-xl text-xs font-bold transition-all border border-emerald-700/60"
          >
            Preview Public Page
          </Link>
        </div>

        {/* Form */}
        <ProductForm
          initialData={product}
          onSubmit={handleUpdate}
          isEditing={true}
          submitLabel="Save Changes"
        />

      </div>
    </div>
  );
};

export default EditProduct;
