import React, { useState } from 'react';
import {
  HelpCircle,
  Search,
  MessageCircle,
  Mail,
  Phone,
  Clock,
  ChevronRight,
  FileText,
  Video,
  BookOpen,
  Award,
  Users,
  Shield,
  CreditCard,
  User,
  Lock,
  Bell,
  Settings,
  Download,
  Globe,
  Smartphone,
  Laptop,
  CheckCircle,
  AlertCircle,
  ArrowRight,
  Send,
  ExternalLink,
  ThumbsUp,
  ThumbsDown,
  MessageSquare,
  Headphones,
  LifeBuoy,
  Lightbulb,
  TrendingUp,
  Calendar,
  Check,
  X
} from 'lucide-react';

const Help = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackType, setFeedbackType] = useState('');

  // FAQ Data
  const faqs = {
    all: [
      {
        id: 1,
        question: 'How do I apply for membership?',
        answer: 'To apply for membership, navigate to the Membership page and fill out the application form. You\'ll need to upload required documents including PAN card, Tax Clearance Certificate, and Citizenship Certificate. Once submitted, our team will review your application within 8 hours.',
        category: 'membership'
      },
      {
        id: 2,
        question: 'What documents are required for membership?',
        answer: 'You need to submit the following documents: PAN Card, Tax Clearance Certificate, Citizenship Certificate, and a passport-size photo (optional). All documents should be in PDF, JPG, JPEG, or PNG format.',
        category: 'documents'
      },
      {
        id: 3,
        question: 'How long does the approval process take?',
        answer: 'The membership approval process typically takes up to 8 hours. Our verification team reviews all submitted documents thoroughly. You\'ll receive a notification once your application is approved or rejected.',
        category: 'membership'
      },
      {
        id: 4,
        question: 'How do I make a payment?',
        answer: 'Payments can be made through our secure payment gateway. You can pay using credit/debit cards, bank transfer, or mobile payment options. All payments are processed securely.',
        category: 'payment'
      },
      {
        id: 5,
        question: 'Can I download my uploaded documents?',
        answer: 'Yes, you can access and download all your uploaded documents from your Membership Dashboard. Simply go to the "Your Documents" section and click the download button next to any document.',
        category: 'documents'
      },
      {
        id: 6,
        question: 'How do I renew my membership?',
        answer: 'You can renew your membership by going to your Membership Dashboard and clicking the "Pre-pay for Next Year" button. Your membership will be extended by 12 months automatically.',
        category: 'payment'
      },
      {
        id: 7,
        question: 'What should I do if my application is rejected?',
        answer: 'If your application is rejected, you\'ll receive a notification with the reason. You can reapply with corrected documents. Contact our support team for assistance with your application.',
        category: 'membership'
      },
      {
        id: 8,
        question: 'Is my personal information secure?',
        answer: 'Yes, we take data security seriously. All your personal information and documents are encrypted and stored securely. We never share your information with third parties.',
        category: 'security'
      }
    ],
    membership: [],
    documents: [],
    payment: [],
    security: []
  };

  // Filter FAQs by category
  const getFilteredFAQs = () => {
    if (activeCategory === 'all') {
      return faqs.all;
    }
    return faqs.all.filter(faq => faq.category === activeCategory);
  };

  // Search FAQs
  const searchedFAQs = getFilteredFAQs().filter(faq =>
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Help Categories
  const categories = [
    { id: 'all', label: 'All Topics', icon: HelpCircle },
    { id: 'membership', label: 'Membership', icon: Award },
    { id: 'documents', label: 'Documents', icon: FileText },
    { id: 'payment', label: 'Payments', icon: CreditCard },
    { id: 'security', label: 'Security', icon: Shield }
  ];

  // Quick Links
  const quickLinks = [
    { icon: FileText, label: 'Documentation', description: 'Read our detailed guides' },
    { icon: Video, label: 'Video Tutorials', description: 'Watch step-by-step videos' },
    { icon: BookOpen, label: 'User Guide', description: 'Complete user manual' },
    { icon: Users, label: 'Community', description: 'Join our community forum' }
  ];

  // Support Options
  const supportOptions = [
    { 
      icon: MessageCircle, 
      label: 'Live Chat', 
      description: 'Chat with our support team',
      availability: 'Available 24/7',
      action: 'Start Chat'
    },
    { 
      icon: Mail, 
      label: 'Email Support', 
      description: 'Send us an email',
      availability: 'Response within 24 hours',
      action: 'Send Email'
    },
    { 
      icon: Phone, 
      label: 'Phone Support', 
      description: 'Call our support line',
      availability: 'Available 9AM - 6PM',
      action: 'Call Now'
    }
  ];

  // Accordion for FAQs
  const FAQItem = ({ faq }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div className="border-b border-gray-100 last:border-0">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between py-4 px-2 hover:bg-gray-50 rounded-lg transition-colors"
        >
          <span className="text-left font-medium text-gray-800 text-sm md:text-base">
            {faq.question}
          </span>
          <ChevronRight 
            size={18} 
            className={`text-gray-400 transition-transform duration-200 flex-shrink-0 ml-4 ${isOpen ? 'rotate-90' : ''}`}
          />
        </button>
        {isOpen && (
          <div className="pb-4 px-2 text-gray-600 text-sm leading-relaxed">
            {faq.answer}
          </div>
        )}
      </div>
    );
  };

  // Feedback Component
  const FeedbackBar = () => (
    <div className="flex items-center gap-4 mt-6 pt-4 border-t border-gray-200">
      <span className="text-sm text-gray-500">Was this helpful?</span>
      <button 
        onClick={() => { setShowFeedback(true); setFeedbackType('yes'); }}
        className="flex items-center gap-1 px-3 py-1.5 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition"
      >
        <ThumbsUp size={16} />
        Yes
      </button>
      <button 
        onClick={() => { setShowFeedback(true); setFeedbackType('no'); }}
        className="flex items-center gap-1 px-3 py-1.5 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition"
      >
        <ThumbsDown size={16} />
        No
      </button>
      {showFeedback && (
        <span className="text-sm text-green-600 flex items-center gap-1">
          <Check size={16} />
          Thank you for your feedback!
        </span>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
            <LifeBuoy size={28} className="text-green-600" />
            Help & Support
          </h1>
          <p className="text-gray-500 mt-1">Find answers to your questions or get in touch with our support team</p>
        </div>

        {/* Search Bar */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-8">
          <div className="relative max-w-2xl">
            <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search for help articles, topics, or questions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition"
            />
          </div>
          <div className="flex flex-wrap gap-2 mt-4">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                  activeCategory === cat.id
                    ? 'bg-green-600 text-white shadow-sm'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <cat.icon size={14} />
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {quickLinks.map((link, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm p-4 border border-gray-100 hover:shadow-md transition cursor-pointer group">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-green-50 rounded-lg group-hover:bg-green-100 transition">
                  <link.icon size={18} className="text-green-600" />
                </div>
                <span className="font-medium text-gray-800">{link.label}</span>
              </div>
              <p className="text-sm text-gray-500">{link.description}</p>
              <div className="mt-3 flex items-center gap-1 text-sm text-green-600 font-medium">
                Learn More <ArrowRight size={14} />
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content - FAQs */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <Lightbulb size={22} className="text-yellow-500" />
                <h2 className="text-xl font-semibold text-gray-800">
                  {searchTerm ? 'Search Results' : 'Frequently Asked Questions'}
                </h2>
                <span className="text-sm bg-gray-100 px-2.5 py-0.5 rounded-full text-gray-600 ml-auto">
                  {searchedFAQs.length} articles
                </span>
              </div>

              {searchedFAQs.length > 0 ? (
                <div className="divide-y divide-gray-100">
                  {searchedFAQs.map(faq => (
                    <FAQItem key={faq.id} faq={faq} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Search size={48} className="mx-auto text-gray-300 mb-4" />
                  <p className="text-gray-500">No results found for "{searchTerm}"</p>
                  <p className="text-sm text-gray-400 mt-1">Try adjusting your search terms</p>
                </div>
              )}

              <FeedbackBar />
            </div>
          </div>

          {/* Sidebar - Support Options */}
          <div className="space-y-6">
            {/* Contact Support */}
            <div className="bg-gradient-to-br from-green-600 to-emerald-600 rounded-2xl shadow-lg p-6 text-white">
              <div className="flex items-center gap-3 mb-4">
                <Headphones size={24} />
                <h3 className="text-lg font-semibold">Contact Support</h3>
              </div>
              <p className="text-green-50 text-sm mb-4 opacity-90">
                Our support team is here to help you with any questions or issues.
              </p>
              
              <div className="space-y-3">
                {supportOptions.map((option, index) => (
                  <div key={index} className="bg-white/10 backdrop-blur-sm rounded-lg p-3 hover:bg-white/20 transition">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        <option.icon size={18} className="mt-0.5 text-green-200" />
                        <div>
                          <p className="font-medium text-sm">{option.label}</p>
                          <p className="text-xs text-green-100 opacity-75">{option.description}</p>
                          <p className="text-xs text-green-200 mt-1 flex items-center gap-1">
                            <Clock size={12} />
                            {option.availability}
                          </p>
                        </div>
                      </div>
                      <button className="text-xs bg-white/20 hover:bg-white/30 px-3 py-1 rounded-full font-medium transition">
                        {option.action}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>


            {/* Quick Tips */}
            <div className="bg-white rounded-2xl shadow-sm p-5 border border-gray-100">
              <div className="flex items-center gap-3 mb-4">
                <TrendingUp size={18} className="text-green-600" />
                <h3 className="font-semibold text-gray-800">Quick Tips</h3>
              </div>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <CheckCircle size={14} className="text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-600">Ensure all documents are clear and readable</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle size={14} className="text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-600">Check your email for application updates</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle size={14} className="text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-600">Keep your documents ready before applying</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Still Need Help Banner */}
        <div className="mt-8 bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-50 rounded-full">
                <MessageSquare size={24} className="text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Still need help?</h3>
                <p className="text-sm text-gray-500">Our support team is ready to assist you</p>
              </div>
            </div>
            <div className="flex gap-3">
              <button className="flex items-center gap-2 px-5 py-2.5 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition shadow-sm hover:shadow-md">
                <MessageCircle size={18} />
                Start Live Chat
              </button>
              <button className="flex items-center gap-2 px-5 py-2.5 border border-gray-200 hover:bg-gray-50 text-gray-700 rounded-lg font-medium transition">
                <Mail size={18} />
                Email Us
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Help;