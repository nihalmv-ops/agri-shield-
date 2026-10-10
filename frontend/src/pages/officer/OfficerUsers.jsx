import React, { useState, useMemo } from 'react';
import { 
  Users, 
  Search, 
  MapPin, 
  Mail, 
  Calendar, 
  CheckCircle2, 
  X, 
  Eye, 
  Phone, 
  UserCheck 
} from 'lucide-react';
import StatusBadge from '../../components/officer/StatusBadge';
import Button from '../../components/Button';
import { registeredUsers } from '../../data/users';

const OfficerUsers = () => {
  const [users, setUsers] = useState(registeredUsers);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUserModal, setSelectedUserModal] = useState(null);

  const filteredUsers = useMemo(() => {
    return users.filter((u) => {
      return !searchQuery ||
        u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        u.location.toLowerCase().includes(searchQuery.toLowerCase());
    });
  }, [users, searchQuery]);

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-50 text-emerald-800 border border-emerald-200 mb-1">
            <Users className="w-3.5 h-3.5 text-emerald-600" />
            <span>Community Registry</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#063B2A]">
            Registered Users
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
            Directory of registered citizens, consumers, and reporting residents in fringe forest zones.
          </p>
        </div>

        <div className="text-xs text-gray-500 bg-white px-4 py-2 rounded-2xl border border-gray-200 self-start sm:self-auto font-medium">
          Total Users: <strong className="text-gray-900">{users.length}</strong>
        </div>
      </div>

      {/* Search Input (Prompt Section 14 Requirement) */}
      <div className="bg-white rounded-3xl p-5 border border-emerald-950/10 shadow-soft">
        <div className="relative max-w-md">
          <input
            type="text"
            placeholder="Search users by name, email, or district..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
          />
          <Search className="w-4 h-4 text-emerald-600 absolute left-3.5 top-1/2 -translate-y-1/2" />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Users Table / Responsive Cards (Prompt Section 14 Requirement) */}
      <div className="bg-white rounded-3xl border border-emerald-950/10 shadow-soft overflow-hidden">
        
        {/* Desktop Table View */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-50/80 border-b border-gray-200 text-gray-500 uppercase tracking-wider font-extrabold text-[11px]">
              <tr>
                <th className="py-4 px-6">Name</th>
                <th className="py-4 px-6">Email</th>
                <th className="py-4 px-6">Location</th>
                <th className="py-4 px-6">Joined Date</th>
                <th className="py-4 px-6">Status</th>
                <th className="py-4 px-6 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 font-medium">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-emerald-50/40 transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-9 h-9 rounded-full object-cover border border-emerald-500"
                      />
                      <div>
                        <p className="font-extrabold text-gray-900">{user.name}</p>
                        <p className="text-[11px] text-gray-400 font-mono">{user.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-gray-600 font-medium">{user.email}</td>
                  <td className="py-4 px-6 text-gray-700">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      {user.location}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-gray-600">{user.joinedDate}</td>
                  <td className="py-4 px-6">
                    <StatusBadge status={user.status} size="xs" />
                  </td>
                  <td className="py-4 px-6 text-right">
                    <button
                      onClick={() => setSelectedUserModal(user)}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold bg-gray-100 hover:bg-emerald-100 text-gray-800 hover:text-emerald-900 transition-colors"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>View</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards View */}
        <div className="md:hidden divide-y divide-gray-100">
          {filteredUsers.map((user) => (
            <div key={user.id} className="p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-10 h-10 rounded-full object-cover border border-emerald-500"
                  />
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm">{user.name}</h4>
                    <p className="text-[11px] text-gray-500">{user.email}</p>
                  </div>
                </div>
                <StatusBadge status={user.status} size="xs" />
              </div>

              <div className="flex items-center justify-between text-xs text-gray-500 pt-1">
                <span>{user.location}</span>
                <span>Joined: {user.joinedDate}</span>
              </div>

              <button
                onClick={() => setSelectedUserModal(user)}
                className="w-full py-2 bg-gray-100 hover:bg-emerald-50 text-gray-800 font-bold text-xs rounded-xl flex items-center justify-center gap-1"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>View Details</span>
              </button>
            </div>
          ))}
        </div>

      </div>

      {/* User Detail Modal */}
      {selectedUserModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-emerald-900/10 space-y-5">
            <div className="flex items-start justify-between pb-3 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <img
                  src={selectedUserModal.avatar}
                  alt={selectedUserModal.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-emerald-500"
                />
                <div>
                  <h3 className="text-base font-black text-gray-900">{selectedUserModal.name}</h3>
                  <p className="text-xs text-gray-500 font-mono">{selectedUserModal.id}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedUserModal(null)}
                className="text-gray-400 hover:text-gray-600 p-1 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2.5 text-xs">
              <div className="flex justify-between py-1 border-b border-gray-100">
                <span className="text-gray-500">Email Address:</span>
                <strong className="text-gray-900">{selectedUserModal.email}</strong>
              </div>
              <div className="flex justify-between py-1 border-b border-gray-100">
                <span className="text-gray-500">Phone Number:</span>
                <strong className="text-gray-900">{selectedUserModal.phone}</strong>
              </div>
              <div className="flex justify-between py-1 border-b border-gray-100">
                <span className="text-gray-500">District / Ward:</span>
                <strong className="text-gray-900">{selectedUserModal.location}</strong>
              </div>
              <div className="flex justify-between py-1 border-b border-gray-100">
                <span className="text-gray-500">Account Enrolled:</span>
                <strong className="text-gray-900">{selectedUserModal.joinedDate}</strong>
              </div>
              <div className="flex justify-between py-1 border-b border-gray-100">
                <span className="text-gray-500">Complaints Filed:</span>
                <strong className="text-emerald-800">{selectedUserModal.complaintsFiled} Reports</strong>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-gray-500">Wildlife Sighting Reports:</span>
                <strong className="text-emerald-800">{selectedUserModal.wildlifeSightings || 2} Alerts Filed</strong>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <Button
                variant="primary"
                size="sm"
                onClick={() => setSelectedUserModal(null)}
                className="bg-[#063B2A] text-white"
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default OfficerUsers;
