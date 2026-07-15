import React, { useState, useEffect } from 'react';
import {
  BookOpen,
  Video,
  FileText,
  Award,
  Clock,
  Calendar,
  Users,
  CheckCircle,
  Play,
  Download,
  Search,
  Filter,
  ChevronRight,
  Star,
  StarOff,
  Heart,
  Share,
  Bookmark,
  Eye,
  Loader2,
  Plus,
  X,
  Edit,
  Trash2,
  MoreVertical,
  BarChart,
  TrendingUp,
  Target,
  Zap,
  Sparkles,
  GraduationCap,
  Globe,
  Link,
  MessageSquare,
  User,
  Tag,
  Calendar as CalendarIcon,
  Clock as ClockIcon,
  AlertCircle,
  Check,
  PlayCircle,
  File,
  Image,
  ExternalLink,
  RefreshCw,
} from 'lucide-react';

// --- Training Card Component ---
const TrainingCard = ({ training, onViewDetails, onEnroll, onContinue, onBookmark }) => {
  const statusColors = {
    'not-started': 'bg-gray-100 text-gray-600',
    'in-progress': 'bg-blue-100 text-blue-700',
    'completed': 'bg-green-100 text-green-700',
    'locked': 'bg-red-100 text-red-700',
  };

  const difficultyColors = {
    'beginner': 'bg-green-100 text-green-700',
    'intermediate': 'bg-yellow-100 text-yellow-700',
    'advanced': 'bg-red-100 text-red-700',
  };

  const getStatusLabel = (status) => {
    const labels = {
      'not-started': 'Not Started',
      'in-progress': 'In Progress',
      'completed': 'Completed',
      'locked': 'Locked',
    };
    return labels[status] || status;
  };

  const getDifficultyLabel = (difficulty) => {
    return difficulty.charAt(0).toUpperCase() + difficulty.slice(1);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
      {training.image && (
        <div className="w-full h-48 bg-gray-200 relative">
          <img 
            src={training.image} 
            alt={training.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-3 left-3">
            <span className={`text-xs px-2 py-0.5 rounded-full ${difficultyColors[training.difficulty] || 'bg-gray-100 text-gray-700'}`}>
              {getDifficultyLabel(training.difficulty || 'beginner')}
            </span>
          </div>
          <div className="absolute top-3 right-3 flex gap-1">
            <button 
              onClick={() => onBookmark(training)}
              className="p-1.5 bg-white/90 hover:bg-white rounded-full transition-colors"
            >
              {training.bookmarked ? (
                <Star size={14} className="text-yellow-500 fill-yellow-500" />
              ) : (
                <Star size={14} className="text-gray-400" />
              )}
            </button>
          </div>
          <div className="absolute bottom-3 right-3 bg-black/70 text-white text-xs px-2 py-1 rounded flex items-center gap-1">
            <ClockIcon size={12} />
            {training.duration || '2 hours'}
          </div>
        </div>
      )}
      <div className="p-4">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <h3 className="text-base font-semibold text-gray-800 truncate">
              {training.title}
            </h3>
            {training.category && (
              <span className="inline-flex items-center gap-1 text-xs text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full mt-1">
                <Tag size={12} />
                {training.category}
              </span>
            )}
          </div>
          <span className={`text-xs px-2 py-0.5 rounded-full flex items-center gap-1 ${statusColors[training.status]}`}>
            {training.status === 'completed' && <Check size={12} />}
            {training.status === 'in-progress' && <ClockIcon size={12} />}
            {training.status === 'not-started' && <Play size={12} />}
            {getStatusLabel(training.status)}
          </span>
        </div>

        <p className="mt-2 text-sm text-gray-600 line-clamp-2">
          {training.description}
        </p>

        <div className="mt-3 flex items-center gap-4 text-xs text-gray-500">
          <span className="flex items-center gap-1">
            <Users size={12} />
            {training.enrolled || 0} enrolled
          </span>
          <span className="flex items-center gap-1">
            <FileText size={12} />
            {training.lessons || 0} lessons
          </span>
          {training.progress !== undefined && (
            <span className="flex items-center gap-1">
              <TrendingUp size={12} />
              {training.progress}%
            </span>
          )}
        </div>

        {training.progress !== undefined && training.status !== 'not-started' && (
          <div className="mt-3">
            <div className="w-full bg-gray-200 rounded-full h-1.5">
              <div 
                className="bg-blue-600 h-1.5 rounded-full transition-all"
                style={{ width: `${training.progress}%` }}
              />
            </div>
          </div>
        )}

        <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between">
          <button
            onClick={() => onViewDetails(training)}
            className="text-xs text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
          >
            <Eye size={12} />
            View Details
          </button>
          {training.status === 'completed' ? (
            <button className="text-xs bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-lg font-medium transition-colors flex items-center gap-1">
              <Award size={12} />
              Certificate
            </button>
          ) : training.status === 'in-progress' ? (
            <button 
              onClick={() => onContinue(training)}
              className="text-xs bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-lg font-medium transition-colors flex items-center gap-1"
            >
              <Play size={12} />
              Continue
            </button>
          ) : training.status === 'locked' ? (
            <button className="text-xs bg-gray-400 text-white px-3 py-1 rounded-lg font-medium cursor-not-allowed flex items-center gap-1">
              <AlertCircle size={12} />
              Locked
            </button>
          ) : (
            <button 
              onClick={() => onEnroll(training)}
              className="text-xs bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-lg font-medium transition-colors flex items-center gap-1"
            >
              <Plus size={12} />
              Enroll
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

// --- Training Details Modal ---
const TrainingDetailsModal = ({ isOpen, onClose, training, onEnroll, onContinue }) => {
  const [activeTab, setActiveTab] = useState('overview');

  if (!isOpen || !training) return null;

  const lessons = training.lessonsList || [
    { id: 1, title: 'Introduction', duration: '10 min', completed: true },
    { id: 2, title: 'Getting Started', duration: '15 min', completed: true },
    { id: 3, title: 'Core Concepts', duration: '20 min', completed: false },
    { id: 4, title: 'Advanced Topics', duration: '25 min', completed: false },
    { id: 5, title: 'Final Project', duration: '30 min', completed: false },
  ];

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        {training.image && (
          <div className="w-full h-56 bg-gray-200 relative rounded-t-2xl">
            <img 
              src={training.image} 
              alt={training.title}
              className="w-full h-full object-cover rounded-t-2xl"
            />
            <button
              onClick={onClose}
              className="absolute top-3 right-3 p-1.5 bg-white/90 hover:bg-white rounded-full transition-colors"
            >
              <X size={20} className="text-gray-700" />
            </button>
            <div className="absolute bottom-3 left-3 flex gap-2">
              <span className={`text-xs px-2 py-0.5 rounded-full ${
                training.difficulty === 'beginner' ? 'bg-green-100 text-green-700' :
                training.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-700' :
                'bg-red-100 text-red-700'
              }`}>
                {training.difficulty?.charAt(0).toUpperCase() + training.difficulty?.slice(1) || 'Beginner'}
              </span>
              <span className="text-xs bg-black/70 text-white px-2 py-0.5 rounded-full flex items-center gap-1">
                <ClockIcon size={12} />
                {training.duration || '2 hours'}
              </span>
            </div>
          </div>
        )}
        <div className="p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">{training.title}</h2>
              {training.category && (
                <span className="inline-flex items-center gap-1 text-xs text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full mt-1">
                  <Tag size={12} />
                  {training.category}
                </span>
              )}
            </div>
            <span className={`text-xs px-2 py-0.5 rounded-full flex items-center gap-1 ${
              training.status === 'completed' ? 'bg-green-100 text-green-700' :
              training.status === 'in-progress' ? 'bg-blue-100 text-blue-700' :
              'bg-gray-100 text-gray-600'
            }`}>
              {training.status === 'completed' && <Check size={12} />}
              {training.status === 'in-progress' && <ClockIcon size={12} />}
              {training.status === 'not-started' && <Play size={12} />}
              {training.status?.charAt(0).toUpperCase() + training.status?.slice(1) || 'Not Started'}
            </span>
          </div>

          {/* Tabs */}
          <div className="flex gap-4 mt-4 border-b border-gray-200">
            <button
              onClick={() => setActiveTab('overview')}
              className={`pb-2 text-sm font-medium transition-colors ${
                activeTab === 'overview' 
                  ? 'text-blue-600 border-b-2 border-blue-600' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('lessons')}
              className={`pb-2 text-sm font-medium transition-colors ${
                activeTab === 'lessons' 
                  ? 'text-blue-600 border-b-2 border-blue-600' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Lessons ({lessons.length})
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`pb-2 text-sm font-medium transition-colors ${
                activeTab === 'reviews' 
                  ? 'text-blue-600 border-b-2 border-blue-600' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Reviews
            </button>
          </div>

          {/* Tab Content */}
          <div className="mt-4">
            {activeTab === 'overview' && (
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Description</h4>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {training.fullDescription || training.description}
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-3 rounded-lg text-center">
                    <Users size={20} className="mx-auto text-gray-400 mb-1" />
                    <p className="text-sm font-semibold text-gray-800">{training.enrolled || 0}</p>
                    <p className="text-xs text-gray-500">Enrolled</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg text-center">
                    <FileText size={20} className="mx-auto text-gray-400 mb-1" />
                    <p className="text-sm font-semibold text-gray-800">{training.lessons || 0}</p>
                    <p className="text-xs text-gray-500">Lessons</p>
                  </div>
                </div>
                {training.prerequisites && (
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Prerequisites</h4>
                    <p className="text-sm text-gray-600">{training.prerequisites}</p>
                  </div>
                )}
                {training.materials && (
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Materials</h4>
                    <ul className="space-y-1">
                      {training.materials.map((material, index) => (
                        <li key={index} className="flex items-center gap-2 text-sm text-gray-600">
                          <FileText size={14} className="text-gray-400" />
                          <span>{material}</span>
                          <button className="ml-auto text-xs text-blue-600 hover:text-blue-700 font-medium">
                            Download
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'lessons' && (
              <div className="space-y-2">
                {lessons.map((lesson, index) => (
                  <div key={lesson.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                      lesson.completed ? 'bg-green-100' : 'bg-gray-200'
                    }`}>
                      {lesson.completed ? (
                        <Check size={14} className="text-green-600" />
                      ) : (
                        <span className="text-xs text-gray-500">{index + 1}</span>
                      )}
                    </div>
                    <div className="flex-1">
                      <p className={`text-sm ${lesson.completed ? 'text-gray-600' : 'text-gray-800'}`}>
                        {lesson.title}
                      </p>
                      <p className="text-xs text-gray-500">{lesson.duration}</p>
                    </div>
                    <button className="text-xs text-blue-600 hover:text-blue-700 font-medium">
                      {lesson.completed ? 'Review' : 'Start'}
                    </button>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="text-center py-8">
                <MessageSquare size={40} className="mx-auto text-gray-300 mb-3" />
                <p className="text-gray-500 text-sm">No reviews yet</p>
                <p className="text-xs text-gray-400">Be the first to review this training</p>
              </div>
            )}
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200 flex flex-col sm:flex-row gap-3">
            {training.status === 'completed' ? (
              <button className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-2.5 px-4 rounded-lg transition-colors flex items-center justify-center gap-2">
                <Award size={18} />
                Download Certificate
              </button>
            ) : training.status === 'in-progress' ? (
              <button 
                onClick={() => onContinue(training)}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <Play size={18} />
                Continue Learning
              </button>
            ) : training.status === 'locked' ? (
              <button className="flex-1 bg-gray-400 text-white font-semibold py-2.5 px-4 rounded-lg cursor-not-allowed flex items-center justify-center gap-2">
                <AlertCircle size={18} />
                Locked - Complete Prerequisites
              </button>
            ) : (
              <button 
                onClick={() => onEnroll(training)}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-2.5 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <Plus size={18} />
                Enroll Now
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

// --- Main Training Component ---
const Training = () => {
  const [trainings, setTrainings] = useState([]);
  const [filteredTrainings, setFilteredTrainings] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterDifficulty, setFilterDifficulty] = useState('all');
  const [selectedTraining, setSelectedTraining] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Load trainings from localStorage
  useEffect(() => {
    const storedTrainings = localStorage.getItem('trainings');
    if (storedTrainings) {
      try {
        const parsed = JSON.parse(storedTrainings);
        setTrainings(parsed);
        setFilteredTrainings(parsed);
      } catch (e) {
        console.warn('Invalid trainings data');
      }
    } else {
      // Add default trainings
      const defaultTrainings = [
        {
          id: 1,
          title: 'Introduction to Business Management',
          description: 'Learn the fundamentals of business management and leadership.',
          fullDescription: 'This comprehensive course covers all aspects of business management including planning, organizing, leading, and controlling. Perfect for aspiring managers and entrepreneurs.',
          category: 'Management',
          difficulty: 'beginner',
          status: 'in-progress',
          duration: '4 hours',
          enrolled: 156,
          lessons: 12,
          progress: 65,
          image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800',
          bookmarked: false,
          prerequisites: 'None',
          materials: ['Course Syllabus', 'Reading List', 'Case Studies'],
          lessonsList: [
            { id: 1, title: 'Introduction to Management', duration: '15 min', completed: true },
            { id: 2, title: 'Planning and Decision Making', duration: '20 min', completed: true },
            { id: 3, title: 'Organizing and Staffing', duration: '25 min', completed: true },
            { id: 4, title: 'Leading and Motivating', duration: '20 min', completed: false },
            { id: 5, title: 'Controlling and Evaluating', duration: '25 min', completed: false },
          ],
        },
        {
          id: 2,
          title: 'Digital Marketing Mastery',
          description: 'Master the art of digital marketing and grow your online presence.',
          fullDescription: 'Learn SEO, social media marketing, content marketing, email marketing, and analytics. This course will equip you with practical skills to market any business online.',
          category: 'Marketing',
          difficulty: 'intermediate',
          status: 'not-started',
          duration: '6 hours',
          enrolled: 89,
          lessons: 15,
          progress: 0,
          image: 'https://images.unsplash.com/photo-1557838923-2985c318be48?w=800',
          bookmarked: true,
          prerequisites: 'Basic computer knowledge',
          materials: ['SEO Guide', 'Social Media Templates', 'Analytics Tools'],
          lessonsList: [
            { id: 1, title: 'Introduction to Digital Marketing', duration: '20 min', completed: false },
            { id: 2, title: 'SEO Fundamentals', duration: '25 min', completed: false },
            { id: 3, title: 'Social Media Marketing', duration: '30 min', completed: false },
          ],
        },
        {
          id: 3,
          title: 'Financial Planning & Analysis',
          description: 'Learn financial planning, budgeting, and analysis techniques.',
          fullDescription: 'This course covers financial statements, ratio analysis, budgeting, forecasting, and investment decisions. Ideal for finance professionals and business owners.',
          category: 'Finance',
          difficulty: 'advanced',
          status: 'completed',
          duration: '5 hours',
          enrolled: 67,
          lessons: 10,
          progress: 100,
          image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800',
          bookmarked: false,
          prerequisites: 'Basic accounting knowledge',
          materials: ['Financial Statements', 'Excel Templates', 'Case Studies'],
          lessonsList: [
            { id: 1, title: 'Financial Statements', duration: '20 min', completed: true },
            { id: 2, title: 'Ratio Analysis', duration: '25 min', completed: true },
            { id: 3, title: 'Budgeting', duration: '30 min', completed: true },
          ],
        },
        {
          id: 4,
          title: 'Leadership & Team Management',
          description: 'Develop essential leadership skills and learn to manage teams effectively.',
          fullDescription: 'Learn about leadership styles, team dynamics, conflict resolution, and performance management.',
          category: 'Leadership',
          difficulty: 'intermediate',
          status: 'locked',
          duration: '3 hours',
          enrolled: 0,
          lessons: 8,
          progress: 0,
          image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800',
          bookmarked: false,
          prerequisites: 'Complete Business Management course',
          materials: ['Leadership Guide', 'Team Activities'],
          lessonsList: [
            { id: 1, title: 'Leadership Styles', duration: '15 min', completed: false },
            { id: 2, title: 'Team Dynamics', duration: '20 min', completed: false },
          ],
        },
        {
          id: 5,
          title: 'Data Science Fundamentals',
          description: 'Introduction to data science and analytics for beginners.',
          fullDescription: 'Learn data analysis, visualization, and basic machine learning concepts.',
          category: 'Technology',
          difficulty: 'beginner',
          status: 'not-started',
          duration: '8 hours',
          enrolled: 45,
          lessons: 20,
          progress: 0,
          image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800',
          bookmarked: false,
          prerequisites: 'Basic math skills',
          materials: ['Data Sets', 'Python Guide', 'Visualization Tools'],
          lessonsList: [
            { id: 1, title: 'Introduction to Data Science', duration: '15 min', completed: false },
            { id: 2, title: 'Data Analysis', duration: '25 min', completed: false },
          ],
        },
      ];
      localStorage.setItem('trainings', JSON.stringify(defaultTrainings));
      setTrainings(defaultTrainings);
      setFilteredTrainings(defaultTrainings);
    }
  }, []);

  // Get unique categories from trainings
  const categories = ['all', ...new Set(trainings.map(t => t.category).filter(Boolean))];

  // Filter trainings
  useEffect(() => {
    let filtered = trainings;
    
    if (searchTerm) {
      filtered = filtered.filter(t => 
        t.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.category?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (filterCategory !== 'all') {
      filtered = filtered.filter(t => t.category === filterCategory);
    }
    
    if (filterStatus !== 'all') {
      filtered = filtered.filter(t => t.status === filterStatus);
    }
    
    if (filterDifficulty !== 'all') {
      filtered = filtered.filter(t => t.difficulty === filterDifficulty);
    }
    
    setFilteredTrainings(filtered);
  }, [searchTerm, filterCategory, filterStatus, filterDifficulty, trainings]);

  // Save trainings to localStorage
  const saveTrainings = (updatedTrainings) => {
    localStorage.setItem('trainings', JSON.stringify(updatedTrainings));
    setTrainings(updatedTrainings);
  };

  // Enroll in training
  const handleEnroll = (training) => {
    setIsLoading(true);
    setTimeout(() => {
      const updatedTrainings = trainings.map(t => {
        if (t.id === training.id) {
          return { 
            ...t, 
            status: 'in-progress', 
            enrolled: (t.enrolled || 0) + 1,
            progress: 0,
          };
        }
        return t;
      });
      saveTrainings(updatedTrainings);
      setSelectedTraining(updatedTrainings.find(t => t.id === training.id));
      setIsLoading(false);
      alert(`✅ You have successfully enrolled in "${training.title}"!`);
    }, 500);
  };

  // Continue training
  const handleContinue = (training) => {
    // Navigate to training player or show lesson
    alert(`📚 Continuing "${training.title}"...\nNext lesson: ${training.lessonsList?.find(l => !l.completed)?.title || 'All completed!'}`);
  };

  // Toggle bookmark
  const handleBookmark = (training) => {
    const updatedTrainings = trainings.map(t => {
      if (t.id === training.id) {
        return { ...t, bookmarked: !t.bookmarked };
      }
      return t;
    });
    saveTrainings(updatedTrainings);
  };

  // Stats
  const totalTrainings = trainings.length;
  const inProgressTrainings = trainings.filter(t => t.status === 'in-progress').length;
  const completedTrainings = trainings.filter(t => t.status === 'completed').length;
  const totalEnrolled = trainings.reduce((sum, t) => sum + (t.enrolled || 0), 0);

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Training</h1>
            <p className="text-sm text-gray-500">Enhance your skills with our training programs</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                const stored = localStorage.getItem('trainings');
                if (stored) {
                  const parsed = JSON.parse(stored);
                  setTrainings(parsed);
                  setFilteredTrainings(parsed);
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
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          <div className="bg-white rounded-lg shadow p-3 border border-gray-200">
            <p className="text-xs text-gray-500">Total Programs</p>
            <p className="text-lg font-bold text-gray-800">{totalTrainings}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-3 border border-gray-200">
            <p className="text-xs text-gray-500">In Progress</p>
            <p className="text-lg font-bold text-blue-600">{inProgressTrainings}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-3 border border-gray-200">
            <p className="text-xs text-gray-500">Completed</p>
            <p className="text-lg font-bold text-green-600">{completedTrainings}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-3 border border-gray-200">
            <p className="text-xs text-gray-500">Total Enrolled</p>
            <p className="text-lg font-bold text-purple-600">{totalEnrolled}</p>
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
                placeholder="Search trainings..."
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
                <option value="not-started">Not Started</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
                <option value="locked">Locked</option>
              </select>
              <select
                value={filterDifficulty}
                onChange={(e) => setFilterDifficulty(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white"
              >
                <option value="all">All Levels</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>
          </div>
        </div>

        {/* Trainings List */}
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 size={32} className="text-blue-600 animate-spin" />
          </div>
        ) : filteredTrainings.length === 0 ? (
          <div className="bg-white rounded-xl shadow p-12 border border-gray-200 text-center">
            <BookOpen size={48} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-lg font-medium text-gray-800 mb-2">No trainings found</h3>
            <p className="text-sm text-gray-500">
              {searchTerm || filterCategory !== 'all' || filterStatus !== 'all' || filterDifficulty !== 'all'
                ? 'Try adjusting your search or filters'
                : 'Check back later for new training programs'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredTrainings.map((training) => (
              <TrainingCard
                key={training.id}
                training={training}
                onViewDetails={(t) => {
                  setSelectedTraining(t);
                  setIsModalOpen(true);
                }}
                onEnroll={handleEnroll}
                onContinue={handleContinue}
                onBookmark={handleBookmark}
              />
            ))}
          </div>
        )}
      </div>

      {/* Training Details Modal */}
      <TrainingDetailsModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedTraining(null);
        }}
        training={selectedTraining}
        onEnroll={handleEnroll}
        onContinue={handleContinue}
      />
    </div>
  );
};

export default Training;