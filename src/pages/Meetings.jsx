import React, { useState, useEffect } from 'react';
import {
  Calendar,
  Clock,
  Users,
  Video,
  MapPin,
  Plus,
  Search,
  Filter,
  ChevronRight,
  CheckCircle,
  XCircle,
  Clock as ClockIcon,
  Calendar as CalendarIcon,
  User,
  Mail,
  Phone,
  Link,
  Download,
  Edit,
  Trash2,
  AlertCircle,
  Loader2,
  MessageSquare,
  FileText,
  Mic,
  Camera,
  Share2,
  MoreVertical,
  Check,
  X,
  UserPlus,
  UserMinus,
  Star,
  StarOff,
} from 'lucide-react';

// --- Meeting Card Component ---
const MeetingCard = ({ meeting, onJoin, onEdit, onDelete, onStatusChange }) => {
  const statusColors = {
    scheduled: 'bg-blue-100 text-blue-700',
    ongoing: 'bg-green-100 text-green-700',
    completed: 'bg-gray-100 text-gray-700',
    cancelled: 'bg-red-100 text-red-700',
  };

  const statusIcons = {
    scheduled: <ClockIcon size={14} />,
    ongoing: <Video size={14} />,
    completed: <CheckCircle size={14} />,
    cancelled: <XCircle size={14} />,
  };

  const getStatusLabel = (status) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-base font-semibold text-gray-800 truncate">
              {meeting.title}
            </h3>
            <span className={`text-xs px-2 py-0.5 rounded-full flex items-center gap-1 ${statusColors[meeting.status]}`}>
              {statusIcons[meeting.status]}
              {getStatusLabel(meeting.status)}
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
            <span className="flex items-center gap-1">
              <CalendarIcon size={14} />
              {meeting.date}
            </span>
            <span className="flex items-center gap-1">
              <Clock size={14} />
              {meeting.time}
            </span>
            <span className="flex items-center gap-1">
              <Users size={14} />
              {meeting.attendees || 0} attendees
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          {meeting.status === 'scheduled' || meeting.status === 'ongoing' ? (
            <button
              onClick={() => onJoin(meeting)}
              className="flex-1 sm:flex-none bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-1"
            >
              <Video size={16} />
              Join
            </button>
          ) : (
            <button
              onClick={() => onJoin(meeting)}
              className="flex-1 sm:flex-none bg-gray-200 hover:bg-gray-300 text-gray-600 px-4 py-1.5 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-1 cursor-not-allowed opacity-60"
              disabled
            >
              <Video size={16} />
              Ended
            </button>
          )}
          <div className="relative group">
            <button className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
              <MoreVertical size={18} className="text-gray-400" />
            </button>
            <div className="absolute right-0 top-full mt-1 bg-white rounded-lg shadow-lg border border-gray-200 py-1 min-w-[150px] hidden group-hover:block z-10">
              <button
                onClick={() => onEdit(meeting)}
                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
              >
                <Edit size={14} />
                Edit
              </button>
              <button
                onClick={() => onStatusChange(meeting)}
                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
              >
                <Check size={14} />
                Mark as Completed
              </button>
              <button
                onClick={() => onDelete(meeting)}
                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
              >
                <Trash2 size={14} />
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
      {meeting.description && (
        <p className="mt-2 text-sm text-gray-600 line-clamp-2">{meeting.description}</p>
      )}
      {meeting.location && (
        <div className="mt-2 flex items-center gap-1 text-sm text-gray-500">
          <MapPin size={14} />
          {meeting.location}
        </div>
      )}
    </div>
  );
};

// --- Create Meeting Modal ---
const CreateMeetingModal = ({ isOpen, onClose, onSubmit, editingMeeting }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    attendees: 0,
    type: 'online',
    status: 'scheduled',
  });

  useEffect(() => {
    if (editingMeeting) {
      setFormData(editingMeeting);
    } else {
      setFormData({
        title: '',
        description: '',
        date: '',
        time: '',
        location: '',
        attendees: 0,
        type: 'online',
        status: 'scheduled',
      });
    }
  }, [editingMeeting]);

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
              {editingMeeting ? 'Edit Meeting' : 'Schedule New Meeting'}
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
                Meeting Title *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                placeholder="Enter meeting title"
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
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                placeholder="Enter meeting description"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date *
                </label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Time *
                </label>
                <input
                  type="time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Location / Meeting Link
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                placeholder="Enter meeting location or meeting link"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Meeting Type
              </label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              >
                <option value="online">Online</option>
                <option value="in-person">In-Person</option>
                <option value="hybrid">Hybrid</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Attendees
              </label>
              <input
                type="number"
                name="attendees"
                value={formData.attendees}
                onChange={handleChange}
                min="0"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                placeholder="Number of attendees"
              />
            </div>

            <div className="flex gap-3 pt-3">
              <button
                type="submit"
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-4 rounded-lg transition-colors"
              >
                {editingMeeting ? 'Update Meeting' : 'Schedule Meeting'}
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

// --- Main Meetings Component ---
const Meetings = () => {
  const [meetings, setMeetings] = useState([]);
  const [filteredMeetings, setFilteredMeetings] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMeeting, setEditingMeeting] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Load meetings from localStorage
  useEffect(() => {
    const storedMeetings = localStorage.getItem('meetings');
    if (storedMeetings) {
      try {
        const parsed = JSON.parse(storedMeetings);
        setMeetings(parsed);
        setFilteredMeetings(parsed);
      } catch (e) {
        console.warn('Invalid meetings data');
      }
    } else {
      // Add some default meetings
      const today = new Date();
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);

      const defaultMeetings = [
        {
          id: 1,
          title: 'Team Standup Meeting',
          description: 'Daily standup to discuss progress and blockers',
          date: today.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
          time: '10:00 AM',
          location: 'Zoom Meeting',
          attendees: 5,
          type: 'online',
          status: 'scheduled',
        },
        {
          id: 2,
          title: 'Project Review',
          description: 'Review project milestones and deliverables',
          date: tomorrow.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
          time: '2:30 PM',
          location: 'Conference Room A',
          attendees: 8,
          type: 'in-person',
          status: 'scheduled',
        },
        {
          id: 3,
          title: 'Client Meeting',
          description: 'Discuss project requirements and timeline',
          date: yesterday.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
          time: '11:00 AM',
          location: 'Google Meet',
          attendees: 3,
          type: 'online',
          status: 'completed',
        },
      ];
      localStorage.setItem('meetings', JSON.stringify(defaultMeetings));
      setMeetings(defaultMeetings);
      setFilteredMeetings(defaultMeetings);
    }
  }, []);

  // Filter meetings
  useEffect(() => {
    let filtered = meetings;
    
    if (searchTerm) {
      filtered = filtered.filter(m => 
        m.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        m.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (filterStatus !== 'all') {
      filtered = filtered.filter(m => m.status === filterStatus);
    }
    
    setFilteredMeetings(filtered);
  }, [searchTerm, filterStatus, meetings]);

  // Save meetings to localStorage
  const saveMeetings = (updatedMeetings) => {
    localStorage.setItem('meetings', JSON.stringify(updatedMeetings));
    setMeetings(updatedMeetings);
  };

  // Add meeting
  const addMeeting = (meetingData) => {
    setIsLoading(true);
    setTimeout(() => {
      const newMeeting = {
        ...meetingData,
        id: Date.now(),
        status: meetingData.status || 'scheduled',
      };
      const updatedMeetings = [newMeeting, ...meetings];
      saveMeetings(updatedMeetings);
      setIsLoading(false);
      setIsModalOpen(false);
    }, 500);
  };

  // Edit meeting
  const editMeeting = (meetingData) => {
    setIsLoading(true);
    setTimeout(() => {
      const updatedMeetings = meetings.map(m => 
        m.id === meetingData.id ? { ...meetingData } : m
      );
      saveMeetings(updatedMeetings);
      setIsLoading(false);
      setIsModalOpen(false);
      setEditingMeeting(null);
    }, 500);
  };

  // Delete meeting
  const deleteMeeting = (meeting) => {
    if (window.confirm(`Are you sure you want to delete "${meeting.title}"?`)) {
      const updatedMeetings = meetings.filter(m => m.id !== meeting.id);
      saveMeetings(updatedMeetings);
    }
  };

  // Update meeting status
  const updateStatus = (meeting) => {
    const updatedMeetings = meetings.map(m => {
      if (m.id === meeting.id) {
        return { ...m, status: m.status === 'scheduled' ? 'completed' : 'scheduled' };
      }
      return m;
    });
    saveMeetings(updatedMeetings);
  };

  // Join meeting
  const joinMeeting = (meeting) => {
    if (meeting.location && (meeting.location.includes('http') || meeting.location.includes('meet'))) {
      window.open(meeting.location, '_blank');
    } else {
      alert(`Joining meeting: ${meeting.title}\nLocation: ${meeting.location || 'Online'}`);
    }
  };

  // Stats
  const totalMeetings = meetings.length;
  const scheduledMeetings = meetings.filter(m => m.status === 'scheduled').length;
  const ongoingMeetings = meetings.filter(m => m.status === 'ongoing').length;
  const completedMeetings = meetings.filter(m => m.status === 'completed').length;

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Meetings</h1>
            <p className="text-sm text-gray-500">Manage and schedule your meetings</p>
          </div>
          <button
            onClick={() => {
              setEditingMeeting(null);
              setIsModalOpen(true);
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
          >
            <Plus size={18} />
            Schedule Meeting
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          <div className="bg-white rounded-lg shadow p-3 border border-gray-200">
            <p className="text-xs text-gray-500">Total</p>
            <p className="text-lg font-bold text-gray-800">{totalMeetings}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-3 border border-gray-200">
            <p className="text-xs text-gray-500">Scheduled</p>
            <p className="text-lg font-bold text-blue-600">{scheduledMeetings}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-3 border border-gray-200">
            <p className="text-xs text-gray-500">Ongoing</p>
            <p className="text-lg font-bold text-green-600">{ongoingMeetings}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-3 border border-gray-200">
            <p className="text-xs text-gray-500">Completed</p>
            <p className="text-lg font-bold text-gray-600">{completedMeetings}</p>
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
                placeholder="Search meetings..."
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
            </div>
            <div className="flex gap-2">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white"
              >
                <option value="all">All Status</option>
                <option value="scheduled">Scheduled</option>
                <option value="ongoing">Ongoing</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>
        </div>

        {/* Meetings List */}
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 size={32} className="text-blue-600 animate-spin" />
          </div>
        ) : filteredMeetings.length === 0 ? (
          <div className="bg-white rounded-xl shadow p-12 border border-gray-200 text-center">
            <Calendar size={48} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-lg font-medium text-gray-800 mb-2">No meetings found</h3>
            <p className="text-sm text-gray-500">
              {searchTerm || filterStatus !== 'all' 
                ? 'Try adjusting your search or filters'
                : 'Schedule your first meeting to get started'}
            </p>
            {!searchTerm && filterStatus === 'all' && (
              <button
                onClick={() => {
                  setEditingMeeting(null);
                  setIsModalOpen(true);
                }}
                className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors inline-flex items-center gap-2"
              >
                <Plus size={18} />
                Schedule Meeting
              </button>
            )}
          </div>
        ) : (
          <div className="space-y-3">
            {filteredMeetings.map((meeting) => (
              <MeetingCard
                key={meeting.id}
                meeting={meeting}
                onJoin={joinMeeting}
                onEdit={(m) => {
                  setEditingMeeting(m);
                  setIsModalOpen(true);
                }}
                onDelete={deleteMeeting}
                onStatusChange={updateStatus}
              />
            ))}
          </div>
        )}
      </div>

      {/* Create/Edit Modal */}
      <CreateMeetingModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingMeeting(null);
        }}
        onSubmit={editingMeeting ? editMeeting : addMeeting}
        editingMeeting={editingMeeting}
      />
    </div>
  );
};

export default Meetings;