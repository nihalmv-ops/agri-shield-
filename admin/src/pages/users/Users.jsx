import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { 
  Users as UsersIcon, 
  Search, 
  Filter, 
  Eye, 
  Phone, 
  MapPin, 
  ShieldCheck, 
  CheckCircle2, 
  X, 
  UserPlus 
} from 'lucide-react';
import StatusBadge from '../../components/StatusBadge';
import EmptyState from '../../components/EmptyState';
import { initialUsers } from '../../data/users';

const Users = () => {
  const [users, setUsers] = useState(initialUsers);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRole, setSelectedRole] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [toastMessage, setToastMessage] = useState('');

  const handleToggleStatus = (id) => {
    setUsers(prev => prev.map(u => {
      if (u.id === id) {
        const nextStatus = u.status === 'Active' ? 'Suspended' : 'Active';
        setToastMessage(`User ${u.name} status updated to ${nextStatus}`);
        return { ...u, status: nextStatus };
      }
      return u;
    }));
    setTimeout(() => setToastMessage(''), 3000);
  };

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const matchesSearch = 
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.phone.includes(searchQuery) ||
        user.location.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesRole = selectedRole === 'All' || user.accountType === selectedRole;
      const matchesStatus = selectedStatus === 'All' || user.status === selectedStatus;

      return matchesSearch && matchesRole && matchesStatus;
    });
  }, [users, searchQuery, selectedRole, selectedStatus]);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedRole('All');
    setSelectedStatus('All');
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      
      {/* Toast Feedback */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#071A14] text-white px-5 py-3 rounded-2xl shadow-2xl border border-emerald-500/50 flex items-center gap-3">
          <CheckCircle2 className="w-5 h-5 text-[#10B981]" />
          <span className="text-xs font-bold">{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-2xl bg-blue-100 flex items-center justify-center text-blue-700">
              <UsersIcon className="w-5 h-5" />
            </div>
            <h1 className="text-2xl font-black text-[#063B2A] tracking-tight">
              Platform User Directory
            </h1>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Registered accounts across farmers and consumers with role governance
          </p>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="bg-white rounded-3xl p-4 sm:p-5 border border-emerald-950/10 shadow-soft space-y-4">
        <div className="relative">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by name, email, phone number, or city..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#F5F8F6] text-xs text-[#071A14] pl-10 pr-10 py-3 rounded-2xl border border-transparent focus:border-emerald-300 focus:bg-white focus:outline-none transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        <div className="grid grid-cols-2 gap-3 text-xs sm:w-80">
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1">
              Account Role
            </label>
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="w-full bg-[#F5F8F6] py-2 px-3 rounded-xl border border-gray-200 text-gray-800 font-semibold focus:outline-none focus:border-emerald-300"
            >
              <option value="All">All Roles</option>
              <option value="Farmer">Farmer (Producer)</option>
              <option value="User">User (Consumer)</option>
            </select>
          </div>

          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1">
              Status
            </label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full bg-[#F5F8F6] py-2 px-3 rounded-xl border border-gray-200 text-gray-800 font-semibold focus:outline-none focus:border-emerald-300"
            >
              <option value="All">All Statuses</option>
              <option value="Active">Active</option>
              <option value="Suspended">Suspended</option>
            </select>
          </div>
        </div>

        <div className="flex items-center justify-between text-xs pt-1 border-t border-gray-100 text-gray-500">
          <span>
            Showing <strong className="text-[#063B2A]">{filteredUsers.length}</strong> of {users.length} accounts
          </span>
          {(searchQuery || selectedRole !== 'All' || selectedStatus !== 'All') && (
            <button onClick={resetFilters} className="text-[#10B981] font-bold hover:underline">
              Reset Filters
            </button>
          )}
        </div>
      </div>

      {/* Users Table */}
      {filteredUsers.length === 0 ? (
        <EmptyState
          title="No Users Found"
          message="No user records matched your current query."
          actionText="Clear Filters"
          onAction={resetFilters}
        />
      ) : (
        <div className="bg-white rounded-3xl border border-emerald-950/10 shadow-soft overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-[#F5F8F6] text-gray-500 uppercase tracking-wider font-extrabold text-[10px] border-b border-gray-100">
                  <th className="py-3.5 px-4">User</th>
                  <th className="py-3.5 px-4">Account Type</th>
                  <th className="py-3.5 px-4">Phone</th>
                  <th className="py-3.5 px-4">Location</th>
                  <th className="py-3.5 px-4">Joined</th>
                  <th className="py-3.5 px-4">Activity Reports</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredUsers.map((u) => (
                  <tr key={u.id} className="hover:bg-emerald-50/50 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-gray-900">
                      <div className="flex items-center gap-3">
                        <img
                          src={u.avatar}
                          alt={u.name}
                          className="w-9 h-9 rounded-xl object-cover border border-emerald-950/10"
                        />
                        <div>
                          <span>{u.name}</span>
                          <span className="text-[10px] text-gray-400 block font-normal">{u.email}</span>
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        u.accountType === 'Farmer'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        {u.accountType}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 font-mono text-gray-600">
                      {u.phone}
                    </td>

                    <td className="py-3.5 px-4 text-gray-600">
                      {u.location}
                    </td>

                    <td className="py-3.5 px-4 text-gray-500">
                      {u.joinedDate}
                    </td>

                    <td className="py-3.5 px-4 font-semibold text-gray-700">
                      {u.wildlifeReportsCount || 0} sightings • {u.complaintsCount || 0} claims
                    </td>

                    <td className="py-3.5 px-4">
                      <StatusBadge status={u.status} size="xs" />
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => handleToggleStatus(u.id)}
                          className={`px-2 py-1 rounded-xl text-[10px] font-bold transition-colors ${
                            u.status === 'Active'
                              ? 'bg-rose-50 text-rose-700 hover:bg-rose-100'
                              : 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                          }`}
                        >
                          {u.status === 'Active' ? 'Suspend' : 'Activate'}
                        </button>
                        <Link
                          to={`/admin/users/${u.id}`}
                          className="p-1.5 text-gray-400 hover:text-[#063B2A] rounded-xl hover:bg-gray-100"
                        >
                          <Eye className="w-4 h-4" />
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

    </div>
  );
};

export default Users;
