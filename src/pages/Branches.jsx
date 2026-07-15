import React, { useState, useEffect } from 'react';
import {
  Building,
  MapPin,
  Phone,
  Mail,
  Globe,
  Plus,
  Search,
  Filter,
  ChevronRight,
  Edit,
  Trash2,
  X,
  Check,
  Loader2,
  Users,
  Clock,
  Calendar,
  Star,
  StarOff,
  MessageSquare,
  Share2,
  Eye,
  MoreVertical,
  User,
  Award,
  Briefcase,
  Home,
  AlertCircle,
  Download,
  Printer,
  Navigation,
  ExternalLink,
} from 'lucide-react';
import { Link } from 'react-router-dom';

// --- Branch Card Component ---
const BranchCard = ({ branch, onViewDetails, onEdit, onDelete }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
      <div className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <Building size={24} className="text-green-600" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-gray-800">{branch.name}</h3>
              <div className="flex items-center gap-2 mt-0.5">
                <span className={`text-xs px-2 py-0.5 rounded-full ${
                  branch.status === 'Active' 
                    ? 'bg-green-100 text-green-700' 
                    : branch.status === 'Inactive'
                    ? 'bg-red-100 text-red-700'
                    : 'bg-yellow-100 text-yellow-700'
                }`}>
                  {branch.status || 'Active'}
                </span>
                <span className="text-xs text-gray-400">•</span>
                <span className="text-xs text-gray-500">{branch.type || 'Branch'}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={() => onViewDetails(branch)}
              className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Eye size={16} className="text-gray-400 hover:text-blue-600" />
            </button>
            <button
              onClick={() => onEdit(branch)}
              className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Edit size={16} className="text-gray-400 hover:text-blue-600" />
            </button>
            <button
              onClick={() => onDelete(branch)}
              className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Trash2 size={16} className="text-gray-400 hover:text-red-600" />
            </button>
          </div>
        </div>

        <div className="mt-3 space-y-1.5 text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <MapPin size={14} className="text-gray-400 flex-shrink-0" />
            <span>{branch.location || 'Location not specified'}</span>
          </div>
          {branch.phone && (
            <div className="flex items-center gap-2">
              <Phone size={14} className="text-gray-400 flex-shrink-0" />
              <span>{branch.phone}</span>
            </div>
          )}
          {branch.email && (
            <div className="flex items-center gap-2">
              <Mail size={14} className="text-gray-400 flex-shrink-0" />
              <span className="truncate">{branch.email}</span>
            </div>
          )}
        </div>

        {branch.description && (
          <p className="mt-2 text-sm text-gray-600 line-clamp-2">{branch.description}</p>
        )}

        <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-3 text-xs text-gray-500">
            {branch.manager && (
              <span className="flex items-center gap-1">
                <User size={12} />
                {branch.manager}
              </span>
            )}
            {branch.employees && (
              <span className="flex items-center gap-1">
                <Users size={12} />
                {branch.employees} employees
              </span>
            )}
          </div>
          <button
            onClick={() => onViewDetails(branch)}
            className="text-xs text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
          >
            View Details
            <ChevronRight size={12} />
          </button>
        </div>
      </div>
    </div>
  );
};

// --- Branch Details Modal ---
const BranchDetailsModal = ({ isOpen, onClose, branch }) => {
  if (!isOpen || !branch) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center">
                <Building size={28} className="text-green-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-800">{branch.name}</h2>
                <span className={`text-xs px-2 py-0.5 rounded-full ${
                  branch.status === 'Active' 
                    ? 'bg-green-100 text-green-700' 
                    : branch.status === 'Inactive'
                    ? 'bg-red-100 text-red-700'
                    : 'bg-yellow-100 text-yellow-700'
                }`}>
                  {branch.status || 'Active'}
                </span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X size={20} className="text-gray-500" />
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-semibold text-gray-700 mb-2">Location</h4>
              <div className="flex items-center gap-2 text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                <MapPin size={16} className="text-gray-400 flex-shrink-0" />
                <span>{branch.location || 'Location not specified'}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {branch.phone && (
                <div>
                  <h4 className="text-sm font-semibold text-gray-700 mb-1">Phone</h4>
                  <div className="flex items-center gap-2 text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                    <Phone size={16} className="text-gray-400 flex-shrink-0" />
                    <span>{branch.phone}</span>
                  </div>
                </div>
              )}
              {branch.email && (
                <div>
                  <h4 className="text-sm font-semibold text-gray-700 mb-1">Email</h4>
                  <div className="flex items-center gap-2 text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                    <Mail size={16} className="text-gray-400 flex-shrink-0" />
                    <span className="truncate">{branch.email}</span>
                  </div>
                </div>
              )}
            </div>

            {branch.manager && (
              <div>
                <h4 className="text-sm font-semibold text-gray-700 mb-1">Branch Manager</h4>
                <div className="flex items-center gap-2 text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                  <User size={16} className="text-gray-400 flex-shrink-0" />
                  <span>{branch.manager}</span>
                </div>
              </div>
            )}

            {branch.description && (
              <div>
                <h4 className="text-sm font-semibold text-gray-700 mb-1">Description</h4>
                <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg leading-relaxed">
                  {branch.description}
                </p>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              {branch.employees && (
                <div className="bg-gray-50 p-3 rounded-lg text-center">
                  <Users size={20} className="mx-auto text-gray-400 mb-1" />
                  <p className="text-sm font-semibold text-gray-800">{branch.employees}</p>
                  <p className="text-xs text-gray-500">Employees</p>
                </div>
              )}
              {branch.established && (
                <div className="bg-gray-50 p-3 rounded-lg text-center">
                  <Calendar size={20} className="mx-auto text-gray-400 mb-1" />
                  <p className="text-sm font-semibold text-gray-800">{branch.established}</p>
                  <p className="text-xs text-gray-500">Established</p>
                </div>
              )}
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200 flex gap-3">
            {branch.location && (
              <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-4 rounded-lg transition-colors flex items-center justify-center gap-2">
                <Navigation size={18} />
                Get Directions
              </button>
            )}
            <button 
              onClick={onClose}
              className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-2.5 px-4 rounded-lg transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Add/Edit Branch Modal ---
const BranchFormModal = ({ isOpen, onClose, onSubmit, editingBranch }) => {
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    phone: '',
    email: '',
    manager: '',
    description: '',
    status: 'Active',
    type: 'Branch',
    employees: '',
    established: '',
  });

  useEffect(() => {
    if (editingBranch) {
      setFormData(editingBranch);
    } else {
      setFormData({
        name: '',
        location: '',
        phone: '',
        email: '',
        manager: '',
        description: '',
        status: 'Active',
        type: 'Branch',
        employees: '',
        established: '',
      });
    }
  }, [editingBranch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-800">
              {editingBranch ? 'Edit Branch' : 'Add New Branch'}
            </h2>
            <button
              onClick={onClose}
              className="p-1 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X size={20} className="text-gray-500" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Branch Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                placeholder="Enter branch name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Location *
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                placeholder="Enter branch location"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone
                </label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                  placeholder="Enter phone number"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                  placeholder="Enter email address"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Branch Manager
              </label>
              <input
                type="text"
                name="manager"
                value={formData.manager}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                placeholder="Enter manager name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="3"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                placeholder="Enter branch description"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none bg-white"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                  <option value="Pending">Pending</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Type
                </label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none bg-white"
                >
                  <option value="Branch">Branch</option>
                  <option value="Head Office">Head Office</option>
                  <option value="Regional Office">Regional Office</option>
                  <option value="Sub-Branch">Sub-Branch</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Employees
                </label>
                <input
                  type="number"
                  name="employees"
                  value={formData.employees}
                  onChange={handleChange}
                  min="0"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                  placeholder="Number of employees"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Established
                </label>
                <input
                  type="text"
                  name="established"
                  value={formData.established}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                  placeholder="e.g., 2020"
                />
              </div>
            </div>

            <div className="flex gap-3 pt-3">
              <button
                type="submit"
                className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-2.5 px-4 rounded-lg transition-colors"
              >
                {editingBranch ? 'Update Branch' : 'Add Branch'}
              </button>
              <button
                type="button"
                onClick={onClose}
                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-2.5 px-4 rounded-lg transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

// --- Main Branches Component ---
const Branches = () => {
  const [branches, setBranches] = useState([]);
  const [filteredBranches, setFilteredBranches] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [editingBranch, setEditingBranch] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Load branches from localStorage
  useEffect(() => {
    const storedBranches = localStorage.getItem('branches');
    if (storedBranches) {
      try {
        const parsed = JSON.parse(storedBranches);
        setBranches(parsed);
        setFilteredBranches(parsed);
      } catch (e) {
        console.warn('Invalid branches data');
      }
    } else {
      // Add some default branches
      const defaultBranches = [
        {
          id: 1,
          name: 'Kathmandu Main',
          location: 'Kathmandu, Nepal',
          phone: '+977-1-4234567',
          email: 'kathmandu@company.com',
          manager: 'Mr. Rajesh Sharma',
          description: 'Main headquarters and administrative office.',
          status: 'Active',
          type: 'Head Office',
          employees: 25,
          established: '2010',
        },
        {
          id: 2,
          name: 'Pokhara Branch',
          location: 'Pokhara, Nepal',
          phone: '+977-61-5234567',
          email: 'pokhara@company.com',
          manager: 'Ms. Sita Adhikari',
          description: 'Regional office serving the western region.',
          status: 'Active',
          type: 'Regional Office',
          employees: 15,
          established: '2015',
        },
        {
          id: 3,
          name: 'Lalitpur Branch',
          location: 'Lalitpur, Nepal',
          phone: '+977-1-5234567',
          email: 'lalitpur@company.com',
          manager: 'Mr. Hari Gurung',
          description: 'Branch office in the valley.',
          status: 'Active',
          type: 'Branch',
          employees: 10,
          established: '2018',
        },
        {
          id: 4,
          name: 'Biratnagar Branch',
          location: 'Biratnagar, Nepal',
          phone: '+977-21-5234567',
          email: 'biratnagar@company.com',
          manager: 'Mr. Krishna Rai',
          description: 'Branch serving the eastern region.',
          status: 'Inactive',
          type: 'Branch',
          employees: 8,
          established: '2020',
        },
      ];
      localStorage.setItem('branches', JSON.stringify(defaultBranches));
      setBranches(defaultBranches);
      setFilteredBranches(defaultBranches);
    }
  }, []);

  // Filter branches
  useEffect(() => {
    let filtered = branches;
    
    if (searchTerm) {
      filtered = filtered.filter(b => 
        b.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        b.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        b.manager?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        b.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (filterStatus !== 'all') {
      filtered = filtered.filter(b => b.status === filterStatus);
    }
    
    setFilteredBranches(filtered);
  }, [searchTerm, filterStatus, branches]);

  // Save branches to localStorage
  const saveBranches = (updatedBranches) => {
    localStorage.setItem('branches', JSON.stringify(updatedBranches));
    setBranches(updatedBranches);
  };

  // Add branch
  const addBranch = (branchData) => {
    setIsLoading(true);
    setTimeout(() => {
      const newBranch = {
        ...branchData,
        id: Date.now(),
      };
      const updatedBranches = [newBranch, ...branches];
      saveBranches(updatedBranches);
      setIsLoading(false);
      setIsFormModalOpen(false);
    }, 500);
  };

  // Edit branch
  const editBranch = (branchData) => {
    setIsLoading(true);
    setTimeout(() => {
      const updatedBranches = branches.map(b => 
        b.id === branchData.id ? { ...branchData } : b
      );
      saveBranches(updatedBranches);
      setIsLoading(false);
      setIsFormModalOpen(false);
      setEditingBranch(null);
    }, 500);
  };

  // Delete branch
  const deleteBranch = (branch) => {
    if (window.confirm(`Are you sure you want to delete "${branch.name}"?`)) {
      const updatedBranches = branches.filter(b => b.id !== branch.id);
      saveBranches(updatedBranches);
    }
  };

  // Stats
  const totalBranches = branches.length;
  const activeBranches = branches.filter(b => b.status === 'Active').length;
  const inactiveBranches = branches.filter(b => b.status === 'Inactive').length;

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Branches</h1>
            <p className="text-sm text-gray-500">Manage and view all branch locations</p>
          </div>
          <button
            onClick={() => {
              setEditingBranch(null);
              setIsFormModalOpen(true);
            }}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
          >
            <Plus size={18} />
            Add Branch
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          <div className="bg-white rounded-lg shadow p-3 border border-gray-200">
            <p className="text-xs text-gray-500">Total Branches</p>
            <p className="text-lg font-bold text-gray-800">{totalBranches}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-3 border border-gray-200">
            <p className="text-xs text-gray-500">Active</p>
            <p className="text-lg font-bold text-green-600">{activeBranches}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-3 border border-gray-200">
            <p className="text-xs text-gray-500">Inactive</p>
            <p className="text-lg font-bold text-red-600">{inactiveBranches}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-3 border border-gray-200">
            <p className="text-xs text-gray-500">Head Office</p>
            <p className="text-lg font-bold text-blue-600">
              {branches.filter(b => b.type === 'Head Office').length}
            </p>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-xl shadow p-4 border border-gray-200 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search branches..."
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
              />
            </div>
            <div className="flex gap-2">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none bg-white"
              >
                <option value="all">All Status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
                <option value="Pending">Pending</option>
              </select>
            </div>
          </div>
        </div>

        {/* Branches List */}
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 size={32} className="text-green-600 animate-spin" />
          </div>
        ) : filteredBranches.length === 0 ? (
          <div className="bg-white rounded-xl shadow p-12 border border-gray-200 text-center">
            <Building size={48} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-lg font-medium text-gray-800 mb-2">No branches found</h3>
            <p className="text-sm text-gray-500">
              {searchTerm || filterStatus !== 'all'
                ? 'Try adjusting your search or filters'
                : 'Add your first branch to get started'}
            </p>
            {!searchTerm && filterStatus === 'all' && (
              <button
                onClick={() => {
                  setEditingBranch(null);
                  setIsFormModalOpen(true);
                }}
                className="mt-4 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors inline-flex items-center gap-2"
              >
                <Plus size={18} />
                Add Branch
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredBranches.map((branch) => (
              <BranchCard
                key={branch.id}
                branch={branch}
                onViewDetails={(b) => {
                  setSelectedBranch(b);
                  setIsDetailsModalOpen(true);
                }}
                onEdit={(b) => {
                  setEditingBranch(b);
                  setIsFormModalOpen(true);
                }}
                onDelete={deleteBranch}
              />
            ))}
          </div>
        )}
      </div>

      {/* Branch Details Modal */}
      <BranchDetailsModal
        isOpen={isDetailsModalOpen}
        onClose={() => {
          setIsDetailsModalOpen(false);
          setSelectedBranch(null);
        }}
        branch={selectedBranch}
      />

      {/* Add/Edit Branch Modal */}
      <BranchFormModal
        isOpen={isFormModalOpen}
        onClose={() => {
          setIsFormModalOpen(false);
          setEditingBranch(null);
        }}
        onSubmit={editingBranch ? editBranch : addBranch}
        editingBranch={editingBranch}
      />
    </div>
  );
};

export default Branches;