import React, { useState, useEffect } from 'react';
import {
  FileText,
  Video,
  Link as LinkIcon,
  Download,
  Search,
  Filter,
  Plus,
  X,
  Edit,
  Trash2,
  Eye,
  Loader2,
  Check,
  Clock,
  Calendar,
  User,
  Tag,
  Folder,
  File,
  Image,
  Music,
  Archive,
  Book,
  Globe,
  Mail,
  Phone,
  MapPin,
  Star,
  StarOff,
  Heart,
  Share,
  Bookmark,
  MoreVertical,
  AlertCircle,
  RefreshCw,
  ChevronRight,
  ExternalLink,
  Copy,
  Printer,
  MessageSquare,
  ThumbsUp,
  ThumbsDown,
  Award,
  Sparkles,
  TrendingUp,
  Zap,
  FolderOpen,
  Cloud,
  Database,
  HardDrive,
  Server,
  Code,
  Palette,
  PenTool,
  Headphones,
  Film,
  Camera,
  Mic,
  Music2,
  BookOpen,
  GraduationCap,
  Briefcase,
  Users,
  Play,
} from 'lucide-react';

// --- Resource Card Component ---
const ResourceCard = ({ resource, onViewDetails, onDownload, onBookmark, onShare }) => {
  const typeColors = {
    document: 'bg-blue-100 text-blue-700',
    video: 'bg-red-100 text-red-700',
    link: 'bg-green-100 text-green-700',
    tool: 'bg-purple-100 text-purple-700',
    image: 'bg-pink-100 text-pink-700',
    audio: 'bg-yellow-100 text-yellow-700',
    other: 'bg-gray-100 text-gray-700',
  };

  const typeIcons = {
    document: <FileText size={14} />,
    video: <Video size={14} />,
    link: <LinkIcon size={14} />,
    tool: <Briefcase size={14} />,
    image: <Image size={14} />,
    audio: <Music size={14} />,
    other: <File size={14} />,
  };

  const getTypeLabel = (type) => {
    return type.charAt(0).toUpperCase() + type.slice(1);
  };

  const formatFileSize = (bytes) => {
    if (!bytes) return 'Unknown size';
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return `${(bytes / Math.pow(1024, i)).toFixed(1)} ${sizes[i]}`;
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
      {resource.thumbnail && (
        <div className="w-full h-40 bg-gray-200 relative">
          <img 
            src={resource.thumbnail} 
            alt={resource.title}
            className="w-full h-full object-cover"
          />
          {resource.type === 'video' && (
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
              <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center">
                <Play size={24} className="text-red-600 ml-1" />
              </div>
            </div>
          )}
          <div className="absolute top-3 left-3">
            <span className={`text-xs px-2 py-0.5 rounded-full flex items-center gap-1 ${typeColors[resource.type]}`}>
              {typeIcons[resource.type]}
              {getTypeLabel(resource.type)}
            </span>
          </div>
          <div className="absolute top-3 right-3 flex gap-1">
            <button 
              onClick={() => onBookmark(resource)}
              className="p-1.5 bg-white/90 hover:bg-white rounded-full transition-colors"
            >
              {resource.bookmarked ? (
                <Star size={14} className="text-yellow-500 fill-yellow-500" />
              ) : (
                <Star size={14} className="text-gray-400" />
              )}
            </button>
          </div>
        </div>
      )}
      <div className="p-4">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <h3 className="text-base font-semibold text-gray-800 truncate">
              {resource.title}
            </h3>
            {resource.category && (
              <span className="inline-flex items-center gap-1 text-xs text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full mt-1">
                <Tag size={12} />
                {resource.category}
              </span>
            )}
          </div>
        </div>

        <p className="mt-2 text-sm text-gray-600 line-clamp-2">
          {resource.description}
        </p>

        <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-gray-500">
          {resource.fileSize && (
            <span className="flex items-center gap-1">
              <HardDrive size={12} />
              {formatFileSize(resource.fileSize)}
            </span>
          )}
          {resource.downloads !== undefined && (
            <span className="flex items-center gap-1">
              <Download size={12} />
              {resource.downloads} downloads
            </span>
          )}
          {resource.date && (
            <span className="flex items-center gap-1">
              <Calendar size={12} />
              {resource.date}
            </span>
          )}
        </div>

        <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-1">
            <button
              onClick={() => onViewDetails(resource)}
              className="text-xs text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
            >
              <Eye size={12} />
              View Details
            </button>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => onShare(resource)}
              className="p-1.5 hover:bg-gray-100 rounded-full transition-colors"
              title="Share"
            >
              <Share size={14} className="text-gray-400 hover:text-blue-600" />
            </button>
            {resource.type !== 'link' && (
              <button
                onClick={() => onDownload(resource)}
                className="p-1.5 hover:bg-gray-100 rounded-full transition-colors"
                title="Download"
              >
                <Download size={14} className="text-gray-400 hover:text-green-600" />
              </button>
            )}
            {resource.type === 'link' && (
              <button
                onClick={() => window.open(resource.url, '_blank')}
                className="p-1.5 hover:bg-gray-100 rounded-full transition-colors"
                title="Open Link"
              >
                <ExternalLink size={14} className="text-gray-400 hover:text-blue-600" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Resource Details Modal ---
const ResourceDetailsModal = ({ isOpen, onClose, resource, onDownload }) => {
  if (!isOpen || !resource) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {resource.thumbnail && (
          <div className="w-full h-56 bg-gray-200 relative rounded-t-2xl">
            <img 
              src={resource.thumbnail} 
              alt={resource.title}
              className="w-full h-full object-cover rounded-t-2xl"
            />
            {resource.type === 'video' && (
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center">
                  <Play size={28} className="text-red-600 ml-1" />
                </div>
              </div>
            )}
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
              <h2 className="text-2xl font-bold text-gray-800">{resource.title}</h2>
              {resource.category && (
                <span className="inline-flex items-center gap-1 text-xs text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full mt-1">
                  <Tag size={12} />
                  {resource.category}
                </span>
              )}
            </div>
            <span className={`text-xs px-2 py-0.5 rounded-full flex items-center gap-1 ${
              resource.type === 'document' ? 'bg-blue-100 text-blue-700' :
              resource.type === 'video' ? 'bg-red-100 text-red-700' :
              resource.type === 'link' ? 'bg-green-100 text-green-700' :
              'bg-gray-100 text-gray-700'
            }`}>
              {resource.type === 'document' && <FileText size={12} />}
              {resource.type === 'video' && <Video size={12} />}
              {resource.type === 'link' && <LinkIcon size={12} />}
              {resource.type.charAt(0).toUpperCase() + resource.type.slice(1)}
            </span>
          </div>

          <div className="mt-4 space-y-4">
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">Description</h4>
              <p className="text-sm text-gray-600 leading-relaxed">
                {resource.fullDescription || resource.description}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {resource.fileSize && (
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-xs text-gray-500">File Size</p>
                  <p className="text-sm font-semibold text-gray-800">
                    {resource.fileSize ? `${(resource.fileSize / 1024 / 1024).toFixed(1)} MB` : 'Unknown'}
                  </p>
                </div>
              )}
              {resource.downloads !== undefined && (
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-xs text-gray-500">Downloads</p>
                  <p className="text-sm font-semibold text-gray-800">{resource.downloads}</p>
                </div>
              )}
              {resource.date && (
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-xs text-gray-500">Date Added</p>
                  <p className="text-sm font-semibold text-gray-800">{resource.date}</p>
                </div>
              )}
              {resource.author && (
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-xs text-gray-500">Author</p>
                  <p className="text-sm font-semibold text-gray-800">{resource.author}</p>
                </div>
              )}
            </div>

            {resource.tags && resource.tags.length > 0 && (
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Tags</h4>
                <div className="flex flex-wrap gap-2">
                  {resource.tags.map((tag, index) => (
                    <span key={index} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200 flex flex-col sm:flex-row gap-3">
            {resource.type !== 'link' ? (
              <button 
                onClick={() => onDownload(resource)}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <Download size={18} />
                Download Resource
              </button>
            ) : (
              <button 
                onClick={() => window.open(resource.url, '_blank')}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-2.5 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <ExternalLink size={18} />
                Open Link
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

// --- Main Resources Component ---
const Resources = () => {
  const [resources, setResources] = useState([]);
  const [filteredResources, setFilteredResources] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');
  const [selectedResource, setSelectedResource] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [viewMode, setViewMode] = useState('grid');

  // Load resources from localStorage
  useEffect(() => {
    const storedResources = localStorage.getItem('resources');
    if (storedResources) {
      try {
        const parsed = JSON.parse(storedResources);
        setResources(parsed);
        setFilteredResources(parsed);
      } catch (e) {
        console.warn('Invalid resources data');
      }
    } else {
      // Add default resources
      const defaultResources = [
        {
          id: 1,
          title: 'Membership Guide 2026',
          description: 'Complete guide to membership benefits and how to make the most of your membership.',
          fullDescription: 'This comprehensive guide covers all membership benefits, how to access them, and tips for maximizing your membership value. Includes information about events, training, resources, and networking opportunities.',
          type: 'document',
          category: 'Guide',
          fileSize: 2.4 * 1024 * 1024,
          downloads: 156,
          date: 'Jan 15, 2026',
          author: 'Admin Team',
          bookmarked: false,
          thumbnail: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800',
          tags: ['membership', 'guide', 'benefits'],
        },
        {
          id: 2,
          title: 'Introduction to Business Management',
          description: 'Video tutorial on business management fundamentals.',
          fullDescription: 'Learn the core principles of business management including planning, organizing, leading, and controlling. This video is perfect for aspiring managers and entrepreneurs.',
          type: 'video',
          category: 'Training',
          fileSize: 150 * 1024 * 1024,
          downloads: 89,
          date: 'Jan 10, 2026',
          author: 'Training Department',
          bookmarked: true,
          thumbnail: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800',
          tags: ['management', 'business', 'training'],
        },
        {
          id: 3,
          title: 'Digital Marketing Tools List',
          description: 'Curated list of essential digital marketing tools and resources.',
          fullDescription: 'A comprehensive list of digital marketing tools organized by category including SEO, social media, email marketing, analytics, and content creation tools. Each tool includes a brief description and link.',
          type: 'link',
          category: 'Marketing',
          url: 'https://example.com/marketing-tools',
          downloads: 0,
          date: 'Jan 5, 2026',
          author: 'Marketing Team',
          bookmarked: false,
          thumbnail: 'https://images.unsplash.com/photo-1557838923-2985c318be48?w=800',
          tags: ['marketing', 'tools', 'digital'],
        },
        {
          id: 4,
          title: 'Financial Planning Template',
          description: 'Excel template for personal and business financial planning.',
          fullDescription: 'A comprehensive Excel template for financial planning including budget tracking, expense management, savings goals, and investment tracking. Includes formulas and example data.',
          type: 'document',
          category: 'Finance',
          fileSize: 1.8 * 1024 * 1024,
          downloads: 234,
          date: 'Dec 20, 2025',
          author: 'Finance Department',
          bookmarked: false,
          thumbnail: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800',
          tags: ['finance', 'template', 'planning'],
        },
        {
          id: 5,
          title: 'Team Building Activities',
          description: 'Collection of team building exercises and activities.',
          fullDescription: 'A curated collection of team building activities for different group sizes and settings. Includes icebreakers, problem-solving activities, and communication exercises with detailed instructions.',
          type: 'document',
          category: 'Leadership',
          fileSize: 3.2 * 1024 * 1024,
          downloads: 67,
          date: 'Dec 15, 2025',
          author: 'HR Department',
          bookmarked: false,
          thumbnail: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800',
          tags: ['team', 'leadership', 'activities'],
        },
        {
          id: 6,
          title: 'Annual Report 2025',
          description: 'Comprehensive annual report with financial data and achievements.',
          fullDescription: 'The annual report for the fiscal year 2025 includes financial statements, key achievements, member statistics, and future plans. A must-read for all members.',
          type: 'document',
          category: 'Reports',
          fileSize: 5.6 * 1024 * 1024,
          downloads: 312,
          date: 'Dec 31, 2025',
          author: 'Admin Team',
          bookmarked: false,
          thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800',
          tags: ['report', 'annual', 'financial'],
        },
      ];
      localStorage.setItem('resources', JSON.stringify(defaultResources));
      setResources(defaultResources);
      setFilteredResources(defaultResources);
    }
  }, []);

  // Get unique categories from resources
  const categories = ['all', ...new Set(resources.map(r => r.category).filter(Boolean))];
  const types = ['all', ...new Set(resources.map(r => r.type).filter(Boolean))];

  // Filter resources
  useEffect(() => {
    let filtered = resources;
    
    if (searchTerm) {
      filtered = filtered.filter(r => 
        r.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    
    if (filterType !== 'all') {
      filtered = filtered.filter(r => r.type === filterType);
    }
    
    if (filterCategory !== 'all') {
      filtered = filtered.filter(r => r.category === filterCategory);
    }
    
    setFilteredResources(filtered);
  }, [searchTerm, filterType, filterCategory, resources]);

  // Save resources to localStorage
  const saveResources = (updatedResources) => {
    localStorage.setItem('resources', JSON.stringify(updatedResources));
    setResources(updatedResources);
  };

  // Toggle bookmark
  const handleBookmark = (resource) => {
    const updatedResources = resources.map(r => {
      if (r.id === resource.id) {
        return { ...r, bookmarked: !r.bookmarked };
      }
      return r;
    });
    saveResources(updatedResources);
  };

  // Handle download
  const handleDownload = (resource) => {
    const updatedResources = resources.map(r => {
      if (r.id === resource.id) {
        return { ...r, downloads: (r.downloads || 0) + 1 };
      }
      return r;
    });
    saveResources(updatedResources);
    alert(`⬇️ Downloading: ${resource.title}`);
  };

  // Handle share
  const handleShare = (resource) => {
    if (navigator.share) {
      navigator.share({
        title: resource.title,
        text: resource.description,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(`${resource.title} - ${resource.description}`);
      alert('📋 Resource details copied to clipboard!');
    }
  };

  // Stats
  const totalResources = resources.length;
  const documentCount = resources.filter(r => r.type === 'document').length;
  const videoCount = resources.filter(r => r.type === 'video').length;
  const linkCount = resources.filter(r => r.type === 'link').length;
  const totalDownloads = resources.reduce((sum, r) => sum + (r.downloads || 0), 0);

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Resources</h1>
            <p className="text-sm text-gray-500">Access documents, videos, and tools</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                const stored = localStorage.getItem('resources');
                if (stored) {
                  const parsed = JSON.parse(stored);
                  setResources(parsed);
                  setFilteredResources(parsed);
                }
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1"
            >
              <RefreshCw size={14} />
              Refresh
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
          <div className="bg-white rounded-lg shadow p-3 border border-gray-200">
            <p className="text-xs text-gray-500">Total Resources</p>
            <p className="text-lg font-bold text-gray-800">{totalResources}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-3 border border-gray-200">
            <p className="text-xs text-gray-500">Documents</p>
            <p className="text-lg font-bold text-blue-600">{documentCount}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-3 border border-gray-200">
            <p className="text-xs text-gray-500">Videos</p>
            <p className="text-lg font-bold text-red-600">{videoCount}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-3 border border-gray-200">
            <p className="text-xs text-gray-500">Links</p>
            <p className="text-lg font-bold text-green-600">{linkCount}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-3 border border-gray-200">
            <p className="text-xs text-gray-500">Total Downloads</p>
            <p className="text-lg font-bold text-purple-600">{totalDownloads}</p>
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
                placeholder="Search resources..."
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white"
              >
                {types.map(type => (
                  <option key={type} value={type}>
                    {type === 'all' ? 'All Types' : type.charAt(0).toUpperCase() + type.slice(1)}
                  </option>
                ))}
              </select>
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

        {/* Resources List */}
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 size={32} className="text-blue-600 animate-spin" />
          </div>
        ) : filteredResources.length === 0 ? (
          <div className="bg-white rounded-xl shadow p-12 border border-gray-200 text-center">
            <FileText size={48} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-lg font-medium text-gray-800 mb-2">No resources found</h3>
            <p className="text-sm text-gray-500">
              {searchTerm || filterType !== 'all' || filterCategory !== 'all'
                ? 'Try adjusting your search or filters'
                : 'Check back later for new resources'}
            </p>
          </div>
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredResources.map((resource) => (
              <ResourceCard
                key={resource.id}
                resource={resource}
                onViewDetails={(r) => {
                  setSelectedResource(r);
                  setIsModalOpen(true);
                }}
                onDownload={handleDownload}
                onBookmark={handleBookmark}
                onShare={handleShare}
              />
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {filteredResources.map((resource) => (
              <ResourceCard
                key={resource.id}
                resource={resource}
                onViewDetails={(r) => {
                  setSelectedResource(r);
                  setIsModalOpen(true);
                }}
                onDownload={handleDownload}
                onBookmark={handleBookmark}
                onShare={handleShare}
              />
            ))}
          </div>
        )}
      </div>

      {/* Resource Details Modal */}
      <ResourceDetailsModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedResource(null);
        }}
        resource={selectedResource}
        onDownload={handleDownload}
      />
    </div>
  );
};

export default Resources;