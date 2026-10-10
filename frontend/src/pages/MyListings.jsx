import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Package, 
  Plus, 
  Edit3, 
  Trash2, 
  Eye, 
  CheckCircle, 
  XCircle, 
  AlertTriangle, 
  ArrowRight, 
  MapPin, 
  Tag, 
  Clock, 
  Check,
  Search,
  ExternalLink
} from 'lucide-react';
import Button from '../components/Button';
import { 
  getOwnerProducts, 
  toggleSoldStatus, 
  deleteProduct 
} from '../utils/marketplaceStorage';

const MyListings = () => {
  const navigate = useNavigate();
  const [listings, setListings] = useState([]);
  const [filterStatus, setFilterStatus] = useState('all');
  const [deleteModalListing, setDeleteModalListing] = useState(null);
  const [toastMessage, setToastMessage] = useState('');

  const loadListings = () => {
    const data = getOwnerProducts();
    setListings(data);
  };

  useEffect(() => {
    loadListings();
  }, []);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const handleToggleStatus = (id) => {
    const newStatus = toggleSoldStatus(id);
    loadListings();
    showToast(`Listing marked as ${newStatus}`);
  };

  const handleDeleteConfirm = () => {
    if (deleteModalListing) {
      deleteProduct(deleteModalListing.id);
      loadListings();
      showToast(`Listing "${deleteModalListing.name}" has been deleted.`);
      setDeleteModalListing(null);
    }
  };

  // Filter listings by status
  const filteredListings = listings.filter((item) => {
    if (filterStatus === 'available') return item.status === 'Available';
    if (filterStatus === 'sold') return item.status === 'Sold';
    return true;
  });

  const totalCount = listings.length;
  const availableCount = listings.filter((l) => l.status === 'Available').length;
  const soldCount = listings.filter((l) => l.status === 'Sold').length;

  return (
    <div className="min-h-screen bg-[#F5F8F6] py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Toast Alert */}
        {toastMessage && (
          <div className="fixed bottom-6 right-6 z-50 bg-[#063B2A] text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-2.5 text-xs font-bold animate-fadeIn border border-emerald-500/30">
            <CheckCircle className="w-4 h-4 text-emerald-400" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Header with Stats & New Listing CTA */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
              Seller Dashboard
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-[#063B2A] mt-1">
              My Agricultural Listings
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              Manage your live produce, edit prices, mark as sold, or delete completed listings.
            </p>
          </div>

          <Button
            to="/sell-product"
            variant="primary"
            size="md"
            icon={Plus}
            className="bg-[#10B981] hover:bg-[#0ea371] text-white rounded-2xl font-black shadow-glow-emerald self-start md:self-auto shrink-0"
          >
            Post New Product
          </Button>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-white p-5 rounded-3xl border border-emerald-950/10 shadow-soft flex items-center justify-between">
            <div>
              <span className="text-xs text-gray-500 font-semibold">Total Listings</span>
              <p className="text-2xl font-black text-[#063B2A] mt-0.5">{totalCount}</p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
              <Package className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white p-5 rounded-3xl border border-emerald-950/10 shadow-soft flex items-center justify-between">
            <div>
              <span className="text-xs text-gray-500 font-semibold">Available for Sale</span>
              <p className="text-2xl font-black text-emerald-700 mt-0.5">{availableCount}</p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
              <Check className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white p-5 rounded-3xl border border-emerald-950/10 shadow-soft flex items-center justify-between">
            <div>
              <span className="text-xs text-gray-500 font-semibold">Marked as Sold</span>
              <p className="text-2xl font-black text-rose-600 mt-0.5">{soldCount}</p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center font-bold">
              <XCircle className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* Tabs Filter */}
        <div className="flex items-center gap-2 mb-6 border-b border-gray-200 pb-3">
          <button
            onClick={() => setFilterStatus('all')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              filterStatus === 'all'
                ? 'bg-[#063B2A] text-white shadow-xs'
                : 'bg-white text-gray-600 hover:bg-gray-100'
            }`}
          >
            All Listings ({totalCount})
          </button>
          <button
            onClick={() => setFilterStatus('available')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              filterStatus === 'available'
                ? 'bg-[#063B2A] text-white shadow-xs'
                : 'bg-white text-gray-600 hover:bg-gray-100'
            }`}
          >
            Active & Available ({availableCount})
          </button>
          <button
            onClick={() => setFilterStatus('sold')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              filterStatus === 'sold'
                ? 'bg-[#063B2A] text-white shadow-xs'
                : 'bg-white text-gray-600 hover:bg-gray-100'
            }`}
          >
            Sold Out ({soldCount})
          </button>
        </div>

        {/* Listings List */}
        {filteredListings.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-emerald-950/10 shadow-soft max-w-lg mx-auto space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 mx-auto flex items-center justify-center">
              <Package className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-black text-[#063B2A]">
              {filterStatus === 'all' ? 'No Listings Found' : `No ${filterStatus} Listings`}
            </h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              {filterStatus === 'all'
                ? "You haven't posted any agricultural products for sale yet. Post your first listing to start reaching buyers."
                : `You currently don't have any items under the "${filterStatus}" status.`}
            </p>
            <div className="pt-2">
              <Button
                to="/sell-product"
                variant="primary"
                size="md"
                className="bg-[#10B981] hover:bg-[#0ea371] text-white rounded-2xl"
              >
                Post Your First Product
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredListings.map((item) => {
              const isItemSold = item.status === 'Sold';
              const thumb = (item.images && item.images.length > 0) ? item.images[0] : item.image;
              const unit = item.priceUnit || item.unit || 'kg';

              return (
                <div
                  key={item.id}
                  className={`bg-white rounded-3xl p-5 border transition-all shadow-soft flex flex-col md:flex-row items-start md:items-center justify-between gap-5 ${
                    isItemSold ? 'border-gray-200 opacity-90' : 'border-emerald-950/10 hover:border-emerald-500/30'
                  }`}
                >
                  {/* Left: Thumbnail & Details */}
                  <div className="flex items-start sm:items-center gap-4 w-full md:w-auto">
                    <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden bg-gray-100 shrink-0 border border-gray-200">
                      <img
                        src={thumb}
                        alt={item.name}
                        className={`w-full h-full object-cover ${isItemSold ? 'grayscale-40' : ''}`}
                      />
                      {isItemSold && (
                        <span className="absolute inset-0 bg-black/40 flex items-center justify-center text-[10px] font-black uppercase text-white tracking-wider">
                          Sold
                        </span>
                      )}
                    </div>

                    <div className="space-y-1 overflow-hidden">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                          {item.category}
                        </span>
                        <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${
                          isItemSold ? 'bg-rose-100 text-rose-700' : 'bg-emerald-100 text-emerald-800'
                        }`}>
                          {item.status}
                        </span>
                        <span className="text-[11px] text-gray-400">
                          {item.postedDate || 'Active'}
                        </span>
                      </div>

                      <h3 className="text-base sm:text-lg font-black text-[#071A14] truncate">
                        {item.name}
                      </h3>

                      <div className="flex items-center gap-3 text-xs text-gray-500 flex-wrap">
                        <span className="font-extrabold text-[#063B2A] text-sm sm:text-base">
                          ₹{item.price.toLocaleString('en-IN')} <span className="text-xs text-gray-500 font-normal">/ {unit}</span>
                        </span>
                        <span>•</span>
                        <span>Qty: <strong>{item.quantity} {item.quantityUnit || unit}</strong></span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-emerald-600" />
                          <span>{item.location}</span>
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Right: Actions */}
                  <div className="flex items-center gap-2 w-full md:w-auto justify-end pt-3 md:pt-0 border-t md:border-t-0 border-gray-100 shrink-0 flex-wrap">
                    <Link
                      to={`/marketplace/${item.id}`}
                      className="inline-flex items-center gap-1 px-3.5 py-2 bg-[#F5F8F6] hover:bg-emerald-50 text-gray-700 hover:text-emerald-800 rounded-xl text-xs font-bold transition-all border border-gray-200"
                      title="View public listing"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>View</span>
                    </Link>

                    <Link
                      to={`/edit-product/${item.id}`}
                      className="inline-flex items-center gap-1 px-3.5 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 rounded-xl text-xs font-bold transition-all border border-emerald-200"
                      title="Edit listing details"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>Edit</span>
                    </Link>

                    <button
                      onClick={() => handleToggleStatus(item.id)}
                      className={`inline-flex items-center gap-1 px-3.5 py-2 rounded-xl text-xs font-bold transition-all border ${
                        isItemSold
                          ? 'bg-emerald-600 text-white border-emerald-600 hover:bg-emerald-700'
                          : 'bg-amber-50 text-amber-800 border-amber-200 hover:bg-amber-100'
                      }`}
                      title={isItemSold ? 'Mark product available for sale' : 'Mark product as sold out'}
                    >
                      {isItemSold ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Mark Available</span>
                        </>
                      ) : (
                        <>
                          <XCircle className="w-3.5 h-3.5" />
                          <span>Mark as Sold</span>
                        </>
                      )}
                    </button>

                    <button
                      onClick={() => setDeleteModalListing(item)}
                      className="p-2 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-xl transition-all border border-transparent hover:border-rose-200"
                      title="Delete listing"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>

      {/* Delete Confirmation Modal */}
      {deleteModalListing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-rose-200 text-[#071A14] space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>

            <div className="text-center space-y-1">
              <h3 className="text-lg font-black text-[#063B2A]">
                Delete Agricultural Listing?
              </h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                Are you sure you want to delete <strong className="text-gray-900 font-bold">"{deleteModalListing.name}"</strong>? This will permanently remove the listing and buyers will no longer be able to find it.
              </p>
            </div>

            <div className="pt-2 flex items-center justify-end gap-3">
              <button
                onClick={() => setDeleteModalListing(null)}
                className="w-full py-2.5 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-2xl text-xs font-bold transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                className="w-full py-2.5 px-4 bg-rose-600 hover:bg-rose-700 text-white rounded-2xl text-xs font-bold transition-all shadow-sm"
              >
                Yes, Delete Listing
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default MyListings;
