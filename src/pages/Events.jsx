import React, { useState, useEffect } from 'react';
import {
  Calendar,
  Clock,
  MapPin,
  Search,
  Filter,
  ChevronRight,
  Users,
  Image,
  Calendar as CalendarIcon,
  Clock as ClockIcon,
  User,
  Mail,
  Phone,
  Link,
  Download,
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
  Heart,
  Share,
  Bookmark,
  Eye,
  Tag,
  Globe,
  Award,
  Sparkles,
  TrendingUp,
  Zap,
} from 'lucide-react';

// --- Event Card Component ---
const EventCard = ({ event, onViewDetails }) => {
  const statusColors = {
    upcoming: 'bg-blue-100 text-blue-700',
    ongoing: 'bg-green-100 text-green-700',
    completed: 'bg-gray-100 text-gray-700',
    cancelled: 'bg-red-100 text-red-700',
  };

  const statusIcons = {
    upcoming: <ClockIcon size={14} />,
    ongoing: <Zap size={14} />,
    completed: <Check size={14} />,
    cancelled: <X size={14} />,
  };

  const getStatusLabel = (status) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
      {event.image && (
        <div className="w-full h-48 bg-gray-200 relative">
          <img 
            src={event.image} 
            alt={event.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-3 right-3">
            <span className={`text-xs px-2 py-0.5 rounded-full flex items-center gap-1 ${statusColors[event.status]}`}>
              {statusIcons[event.status]}
              {getStatusLabel(event.status)}
            </span>
          </div>
        </div>
      )}
      <div className="p-4">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <h3 className="text-base font-semibold text-gray-800 truncate">
              {event.title}
            </h3>
            {event.category && (
              <span className="inline-flex items-center gap-1 text-xs text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full mt-1">
                <Tag size={12} />
                {event.category}
              </span>
            )}
          </div>
          <button
            onClick={() => onViewDetails(event)}
            className="text-blue-600 hover:text-blue-700 text-sm font-medium whitespace-nowrap flex items-center gap-1"
          >
            View Details
            <ChevronRight size={14} />
          </button>
        </div>

        <p className="mt-2 text-sm text-gray-600 line-clamp-2">
          {event.description}
        </p>

        <div className="mt-3 space-y-1.5 text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <CalendarIcon size={14} className="text-gray-400" />
            <span>{event.date}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock size={14} className="text-gray-400" />
            <span>{event.time}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin size={14} className="text-gray-400" />
            <span className="truncate">{event.location}</span>
          </div>
        </div>

        <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-4 text-xs text-gray-500">
            <span className="flex items-center gap-1">
              <Users size={14} />
              {event.attendees || 0} attending
            </span>
            {event.speaker && (
              <span className="flex items-center gap-1">
                <User size={14} />
                {event.speaker}
              </span>
            )}
          </div>
          <div className="flex items-center gap-1">
            <button className="p-1.5 hover:bg-gray-100 rounded-full transition-colors">
              <Heart size={16} className="text-gray-400 hover:text-red-500" />
            </button>
            <button className="p-1.5 hover:bg-gray-100 rounded-full transition-colors">
              <Share size={16} className="text-gray-400 hover:text-blue-500" />
            </button>
            <button className="p-1.5 hover:bg-gray-100 rounded-full transition-colors">
              <Bookmark size={16} className="text-gray-400 hover:text-yellow-500" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Event Details Modal ---
const EventDetailsModal = ({ isOpen, onClose, event }) => {
  if (!isOpen || !event) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {event.image && (
          <div className="w-full h-64 bg-gray-200 relative">
            <img 
              src={event.image} 
              alt={event.title}
              className="w-full h-full object-cover rounded-t-2xl"
            />
            <button
              onClick={onClose}
              className="absolute top-3 right-3 p-1.5 bg-white/90 hover:bg-white rounded-full transition-colors"
            >
              <X size={20} className="text-gray-700" />
            </button>
          </div>
        )}
        <div className="p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">{event.title}</h2>
              {event.category && (
                <span className="inline-flex items-center gap-1 text-xs text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full mt-1">
                  <Tag size={12} />
                  {event.category}
                </span>
              )}
            </div>
            <span className={`text-xs px-2 py-0.5 rounded-full flex items-center gap-1 ${event.status === 'upcoming' ? 'bg-blue-100 text-blue-700' : event.status === 'ongoing' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
              {event.status === 'upcoming' ? <ClockIcon size={14} /> : event.status === 'ongoing' ? <Zap size={14} /> : <Check size={14} />}
              {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
            </span>
          </div>

          <div className="mt-4 space-y-2 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <CalendarIcon size={16} className="text-gray-400" />
              <span><strong>Date:</strong> {event.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={16} className="text-gray-400" />
              <span><strong>Time:</strong> {event.time}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin size={16} className="text-gray-400" />
              <span><strong>Location:</strong> {event.location}</span>
            </div>
            {event.organizer && (
              <div className="flex items-center gap-2">
                <User size={16} className="text-gray-400" />
                <span><strong>Organizer:</strong> {event.organizer}</span>
              </div>
            )}
            {event.speaker && (
              <div className="flex items-center gap-2">
                <Mic size={16} className="text-gray-400" />
                <span><strong>Speaker:</strong> {event.speaker}</span>
              </div>
            )}
            <div className="flex items-center gap-2">
              <Users size={16} className="text-gray-400" />
              <span><strong>Attendees:</strong> {event.attendees || 0} people</span>
            </div>
          </div>

          <div className="mt-4">
            <h4 className="font-semibold text-gray-800 mb-2">About this event</h4>
            <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-wrap">
              {event.fullDescription || event.description}
            </p>
          </div>

          {event.agenda && event.agenda.length > 0 && (
            <div className="mt-4">
              <h4 className="font-semibold text-gray-800 mb-2">Agenda</h4>
              <div className="space-y-2">
                {event.agenda.map((item, index) => (
                  <div key={index} className="flex items-start gap-3 text-sm">
                    <span className="text-blue-600 font-medium min-w-[60px]">{item.time}</span>
                    <span className="text-gray-600">{item.activity}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            {event.status === 'upcoming' || event.status === 'ongoing' ? (
              <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-4 rounded-lg transition-colors flex items-center justify-center gap-2">
                <Users size={18} />
                Register for Event
              </button>
            ) : (
              <button className="flex-1 bg-gray-200 text-gray-600 font-semibold py-2.5 px-4 rounded-lg cursor-not-allowed flex items-center justify-center gap-2">
                <Check size={18} />
                Event Completed
              </button>
            )}
            {event.location && event.location.includes('http') && (
              <button 
                onClick={() => window.open(event.location, '_blank')}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-2.5 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <Globe size={18} />
                Join Online
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Main Events Component ---
const Events = () => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [viewMode, setViewMode] = useState('grid');

  // Load events from localStorage
  useEffect(() => {
    const storedEvents = localStorage.getItem('events');
    if (storedEvents) {
      try {
        const parsed = JSON.parse(storedEvents);
        setEvents(parsed);
        setFilteredEvents(parsed);
      } catch (e) {
        console.warn('Invalid events data');
      }
    } else {
      // Add some default events
      const today = new Date();
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);
      const nextWeek = new Date(today);
      nextWeek.setDate(nextWeek.getDate() + 7);
      const lastWeek = new Date(today);
      lastWeek.setDate(lastWeek.getDate() - 7);

      const defaultEvents = [
        {
          id: 1,
          title: 'Annual General Meeting',
          description: 'Join us for the annual general meeting where we discuss yearly achievements and future plans.',
          fullDescription: 'The Annual General Meeting is a key event where we review the past year\'s performance, present financial reports, and outline strategic goals for the coming year. All members are encouraged to attend and participate in the discussion.',
          date: nextWeek.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
          time: '10:00 AM - 12:00 PM',
          location: 'Main Hall, Kathmandu',
          category: 'General',
          status: 'upcoming',
          attendees: 45,
          organizer: 'Admin Team',
          speaker: 'Mr. President',
          image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=800',
          agenda: [
            { time: '10:00 AM', activity: 'Welcome Address' },
            { time: '10:15 AM', activity: 'Annual Report Presentation' },
            { time: '11:00 AM', activity: 'Q&A Session' },
            { time: '11:45 AM', activity: 'Closing Remarks' },
          ],
        },
        {
          id: 2,
          title: 'Workshop: Digital Marketing',
          description: 'Learn the latest digital marketing strategies and tools to grow your business online.',
          fullDescription: 'This workshop covers SEO, social media marketing, content strategy, and analytics. Participants will gain practical skills to implement immediately.',
          date: tomorrow.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
          time: '2:00 PM - 5:00 PM',
          location: 'Online (Zoom)',
          category: 'Workshop',
          status: 'upcoming',
          attendees: 28,
          organizer: 'Training Department',
          speaker: 'Digital Marketing Expert',
          image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800',
          agenda: [
            { time: '2:00 PM', activity: 'Introduction to Digital Marketing' },
            { time: '2:30 PM', activity: 'SEO Fundamentals' },
            { time: '3:30 PM', activity: 'Social Media Strategy' },
            { time: '4:30 PM', activity: 'Q&A and Practical Exercise' },
          ],
        },
        {
          id: 3,
          title: 'Community Outreach Program',
          description: 'Join us in our community service initiative to support local schools and families.',
          fullDescription: 'We are organizing a community outreach program to provide educational materials and support to underprivileged schools. Volunteers are needed to help with distribution and activities.',
          date: today.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
          time: '9:00 AM - 1:00 PM',
          location: 'Various Locations',
          category: 'Community',
          status: 'ongoing',
          attendees: 12,
          organizer: 'Community Service Team',
          image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800',
        },
        {
          id: 4,
          title: 'Networking Night',
          description: 'Connect with industry professionals and expand your network.',
          fullDescription: 'An evening of networking with professionals from various industries. Light refreshments will be served.',
          date: lastWeek.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
          time: '6:00 PM - 9:00 PM',
          location: 'Business Center, Pokhara',
          category: 'Networking',
          status: 'completed',
          attendees: 56,
          organizer: 'Events Committee',
          image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=800',
        },
        {
          id: 5,
          title: 'Tech Conference 2026',
          description: 'Annual technology conference featuring industry leaders and innovators.',
          fullDescription: 'Join us for a day of inspiring talks, panel discussions, and networking opportunities with tech leaders.',
          date: new Date(today.getFullYear() + 1, 0, 15).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
          time: '9:00 AM - 6:00 PM',
          location: 'Convention Center, Kathmandu',
          category: 'Conference',
          status: 'upcoming',
          attendees: 0,
          organizer: 'Tech Committee',
          speaker: 'Multiple Speakers',
          image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800',
        },
      ];
      localStorage.setItem('events', JSON.stringify(defaultEvents));
      setEvents(defaultEvents);
      setFilteredEvents(defaultEvents);
    }
  }, []);

  // Get unique categories from events
  const categories = ['all', ...new Set(events.map(e => e.category).filter(Boolean))];

  // Filter events
  useEffect(() => {
    let filtered = events;
    
    if (searchTerm) {
      filtered = filtered.filter(e => 
        e.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        e.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        e.category?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (filterCategory !== 'all') {
      filtered = filtered.filter(e => e.category === filterCategory);
    }
    
    if (filterStatus !== 'all') {
      filtered = filtered.filter(e => e.status === filterStatus);
    }
    
    setFilteredEvents(filtered);
  }, [searchTerm, filterCategory, filterStatus, events]);

  // Stats
  const totalEvents = events.length;
  const upcomingEvents = events.filter(e => e.status === 'upcoming').length;
  const ongoingEvents = events.filter(e => e.status === 'ongoing').length;
  const completedEvents = events.filter(e => e.status === 'completed').length;

  const handleViewDetails = (event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Events</h1>
            <p className="text-sm text-gray-500">Discover and participate in upcoming events</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          <div className="bg-white rounded-lg shadow p-3 border border-gray-200">
            <p className="text-xs text-gray-500">Total Events</p>
            <p className="text-lg font-bold text-gray-800">{totalEvents}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-3 border border-gray-200">
            <p className="text-xs text-gray-500">Upcoming</p>
            <p className="text-lg font-bold text-blue-600">{upcomingEvents}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-3 border border-gray-200">
            <p className="text-xs text-gray-500">Ongoing</p>
            <p className="text-lg font-bold text-green-600">{ongoingEvents}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-3 border border-gray-200">
            <p className="text-xs text-gray-500">Completed</p>
            <p className="text-lg font-bold text-gray-600">{completedEvents}</p>
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
                placeholder="Search events..."
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category}
                  </option>
                ))}
              </select>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white"
              >
                <option value="all">All Status</option>
                <option value="upcoming">Upcoming</option>
                <option value="ongoing">Ongoing</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
              <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`px-3 py-2 text-sm ${viewMode === 'grid' ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
                >
                  Grid
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`px-3 py-2 text-sm ${viewMode === 'list' ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
                >
                  List
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Events List */}
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 size={32} className="text-blue-600 animate-spin" />
          </div>
        ) : filteredEvents.length === 0 ? (
          <div className="bg-white rounded-xl shadow p-12 border border-gray-200 text-center">
            <Calendar size={48} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-lg font-medium text-gray-800 mb-2">No events found</h3>
            <p className="text-sm text-gray-500">
              {searchTerm || filterCategory !== 'all' || filterStatus !== 'all'
                ? 'Try adjusting your search or filters'
                : 'Check back later for upcoming events'}
            </p>
          </div>
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredEvents.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                onViewDetails={handleViewDetails}
              />
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {filteredEvents.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                onViewDetails={handleViewDetails}
              />
            ))}
          </div>
        )}
      </div>

      {/* Event Details Modal */}
      <EventDetailsModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedEvent(null);
        }}
        event={selectedEvent}
      />
    </div>
  );
};

export default Events;