import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  AlertTriangle, 
  CheckCircle, 
  ArrowRight,
  Award,
  ClipboardCheck,
  User,
  Clock,
  FileCheck,
  Calendar,
  CreditCard,
  Shield,
  TrendingUp,
  Bell,
  Settings,
  HelpCircle,
  Download,
  Eye,
  FileText,
  Check,
  X
} from 'lucide-react';

const Overview = () => {
  const navigate = useNavigate();

  // --- Get user data from localStorage ---
  const getUserData = () => {
    try {
      const userData = localStorage.getItem('user');
      if (userData) {
        return JSON.parse(userData);
      }
    } catch (e) {
      console.warn('Failed to parse user data from localStorage');
    }
    return null;
  };

  // --- Get membership application data from localStorage ---
  const getMembershipApplication = () => {
    try {
      const appData = localStorage.getItem('membershipApplication');
      if (appData) {
        return JSON.parse(appData);
      }
    } catch (e) {
      console.warn('Failed to parse membership application from localStorage');
    }
    return null;
  };

  const user = getUserData();
  const membershipApp = getMembershipApplication();

  // --- Determine user status ---
  const userLevel = user?.level || 'basic';
  const isMember = userLevel === 'member';
  const hasPendingApplication = membershipApp?.status === 'pending';
  const isEligibleAndNotApplied = userLevel === 'eligible' && !membershipApp;

  // --- Mock member data for demo ---
  const memberData = {
    memberId: 'M2024-001',
    joinDate: 'January 15, 2024',
    expiryDate: 'January 15, 2025',
    daysRemaining: 183,
    totalPayments: 3,
    documentsVerified: 4,
    totalDocuments: 4,
    lastPayment: '$299.00',
    lastPaymentDate: 'January 15, 2024',
    status: 'Active'
  };

  // --- Render Non-Member Status Card ---
  const renderStatusCard = () => {
    if (isMember) return null;

    if (hasPendingApplication) {
      const submittedDate = new Date(membershipApp.submittedAt);
      const formattedDate = submittedDate.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });

      return (
        <div className="bg-white rounded-2xl shadow-lg border border-yellow-200 overflow-hidden mb-6">
          <div className="p-6 md:p-8">
            <div className="flex items-start gap-5">
              <div className="bg-yellow-100 rounded-full p-3 flex-shrink-0">
                <Clock size={32} className="text-yellow-600" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
                  ⏳ Membership Application Under Review
                </h2>
                <div className="text-gray-600 space-y-2 text-sm md:text-base">
                  <p>
                    Your membership application has been submitted and is currently being reviewed.
                  </p>
                  <p className="text-yellow-700 font-medium">
                    Status: Pending Review
                  </p>
                  <p className="text-sm text-gray-500">
                    Submitted: {formattedDate}
                  </p>
                  <p className="text-sm text-gray-500">
                    The review process may take up to 8 hours.
                  </p>
                </div>
                <button
                  onClick={() => navigate('/membership')}
                  className="mt-5 inline-flex items-center gap-2 bg-yellow-600 hover:bg-yellow-700 text-white font-semibold py-3 px-7 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg"
                >
                  <FileCheck size={20} />
                  View Application Status
                  <ArrowRight size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (userLevel === "basic") {
      return (
        <div className="bg-white rounded-2xl shadow-lg border border-amber-200 overflow-hidden mb-6">
          <div className="p-6 md:p-8">
            <div className="flex items-start gap-5">
              <div className="bg-amber-100 rounded-full p-3 flex-shrink-0">
                <AlertTriangle size={32} className="text-amber-600" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
                  You are not eligible for Membership yet.
                </h2>
                <div className="text-gray-600 space-y-1 text-sm md:text-base">
                  <p>
                    Your current assessment level is <span className="font-semibold text-amber-700">Basic</span>.
                  </p>
                  <p>
                    To become eligible for membership, you must complete the required assessment and achieve the minimum qualifying score.
                  </p>
                </div>
                <button
                  onClick={() => navigate('/eligible')}
                  className="mt-5 inline-flex items-center gap-2 bg-amber-600 hover:bg-amber-700 text-white font-semibold py-3 px-7 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg"
                >
                  <ClipboardCheck size={20} />
                  Take Assessment
                  <ArrowRight size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (userLevel === "eligible") {
      return (
        <div className="bg-white rounded-2xl shadow-lg border border-green-200 overflow-hidden mb-6">
          <div className="p-6 md:p-8">
            <div className="flex items-start gap-5">
              <div className="bg-green-100 rounded-full p-3 flex-shrink-0">
                <CheckCircle size={32} className="text-green-600" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
                  Congratulations! You are eligible to apply for Membership.
                </h2>
                <div className="text-gray-600 space-y-1 text-sm md:text-base">
                  <p>
                    Based on your assessment results, you have successfully qualified to apply for membership.
                  </p>
                  <p>
                    Please complete your membership application by uploading the required verification documents.
                  </p>
                </div>
                <button
                  onClick={() => navigate('/membership')}
                  className="mt-5 inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-7 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg"
                >
                  <Award size={20} />
                  Apply for Membership
                  <ArrowRight size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return null;
  };

  // --- Member Dashboard ---
  if (isMember) {
    return (
      <div className="max-w-6xl mx-auto">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800 flex items-center gap-3">
                <User size={32} className="text-green-600" />
                Welcome Back, {user?.fullName || 'Member'}!
              </h1>
              <p className="text-gray-500 mt-1 text-sm md:text-base">
                Member since {memberData.joinDate} • Member ID: {memberData.memberId}
              </p>
            </div>
            <div className="flex gap-2">
              <button 
                onClick={() => navigate('/settings')}
                className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition"
              >
                <Settings size={20} className="text-gray-600" />
              </button>
              <button 
                onClick={() => navigate('/help')}
                className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition"
              >
                <HelpCircle size={20} className="text-gray-600" />
              </button>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Membership Status</p>
                <p className="text-lg font-bold text-green-600 flex items-center gap-1">
                  <CheckCircle size={18} />
                  {memberData.status}
                </p>
              </div>
              <div className="bg-green-100 rounded-full p-2">
                <Shield size={20} className="text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Days Remaining</p>
                <p className="text-lg font-bold text-gray-800">{memberData.daysRemaining} days</p>
              </div>
              <div className="bg-blue-100 rounded-full p-2">
                <Calendar size={20} className="text-blue-600" />
              </div>
            </div>
            <p className="text-xs text-gray-400 mt-1">Expires: {memberData.expiryDate}</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Payments</p>
                <p className="text-lg font-bold text-gray-800">{memberData.totalPayments}</p>
              </div>
              <div className="bg-purple-100 rounded-full p-2">
                <CreditCard size={20} className="text-purple-600" />
              </div>
            </div>
            <p className="text-xs text-gray-400 mt-1">Last: {memberData.lastPaymentDate}</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Documents</p>
                <p className="text-lg font-bold text-gray-800">
                  {memberData.documentsVerified}/{memberData.totalDocuments}
                </p>
              </div>
              <div className="bg-green-100 rounded-full p-2">
                <FileText size={20} className="text-green-600" />
              </div>
            </div>
            <p className="text-xs text-gray-400 mt-1">All verified</p>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - 2/3 width */}
          <div className="lg:col-span-2 space-y-6">
            {/* Recent Activity */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800">Recent Activity</h3>
                <button className="text-sm text-green-600 hover:text-green-700 font-medium">
                  View All
                </button>
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-3 pb-4 border-b border-gray-100">
                  <div className="bg-green-100 rounded-full p-1.5 mt-0.5">
                    <CheckCircle size={16} className="text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-800">Membership Approved</p>
                    <p className="text-xs text-gray-500">Your membership application was approved on {memberData.joinDate}</p>
                    <span className="text-xs text-gray-400">2 hours ago</span>
                  </div>
                </div>
                <div className="flex items-start gap-3 pb-4 border-b border-gray-100">
                  <div className="bg-blue-100 rounded-full p-1.5 mt-0.5">
                    <CreditCard size={16} className="text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-800">Payment Confirmed</p>
                    <p className="text-xs text-gray-500">Membership fee of {memberData.lastPayment} was confirmed</p>
                    <span className="text-xs text-gray-400">1 day ago</span>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-purple-100 rounded-full p-1.5 mt-0.5">
                    <FileText size={16} className="text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-800">Documents Verified</p>
                    <p className="text-xs text-gray-500">All submitted documents have been verified</p>
                    <span className="text-xs text-gray-400">2 days ago</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  onClick={() => navigate('/membership')}
                  className="flex items-center gap-3 p-3 bg-green-50 rounded-xl border border-green-200 hover:shadow-md transition-all hover:scale-[1.02]"
                >
                  <Award className="w-5 h-5 text-green-600" />
                  <div className="text-left">
                    <p className="text-sm font-semibold text-gray-800">Renew Membership</p>
                    <p className="text-xs text-gray-500">Extend membership</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-green-600 ml-auto" />
                </button>

                <button
                  onClick={() => navigate('/profile')}
                  className="flex items-center gap-3 p-3 bg-blue-50 rounded-xl border border-blue-200 hover:shadow-md transition-all hover:scale-[1.02]"
                >
                  <User className="w-5 h-5 text-blue-600" />
                  <div className="text-left">
                    <p className="text-sm font-semibold text-gray-800">View Profile</p>
                    <p className="text-xs text-gray-500">Manage account</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-blue-600 ml-auto" />
                </button>

                <button
                  onClick={() => navigate('/documents')}
                  className="flex items-center gap-3 p-3 bg-purple-50 rounded-xl border border-purple-200 hover:shadow-md transition-all hover:scale-[1.02]"
                >
                  <FileText className="w-5 h-5 text-purple-600" />
                  <div className="text-left">
                    <p className="text-sm font-semibold text-gray-800">My Documents</p>
                    <p className="text-xs text-gray-500">View uploaded files</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-purple-600 ml-auto" />
                </button>

                <button
                  onClick={() => navigate('/notifications')}
                  className="flex items-center gap-3 p-3 bg-yellow-50 rounded-xl border border-yellow-200 hover:shadow-md transition-all hover:scale-[1.02]"
                >
                  <Bell className="w-5 h-5 text-yellow-600" />
                  <div className="text-left">
                    <p className="text-sm font-semibold text-gray-800">Notifications</p>
                    <p className="text-xs text-gray-500">View updates</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-yellow-600 ml-auto" />
                </button>
              </div>
            </div>
          </div>

          {/* Right Column - 1/3 width */}
          <div className="space-y-6">
            {/* Membership Card */}
            <div className="bg-gradient-to-br from-green-600 to-emerald-700 rounded-xl shadow-lg p-6 text-white">
              <div className="flex items-center gap-2 mb-4">
                <Shield size={24} className="text-green-200" />
                <h3 className="font-semibold">Membership Card</h3>
              </div>
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-green-200">Member ID</p>
                  <p className="font-medium">{memberData.memberId}</p>
                </div>
                <div>
                  <p className="text-xs text-green-200">Member Since</p>
                  <p className="font-medium">{memberData.joinDate}</p>
                </div>
                <div>
                  <p className="text-xs text-green-200">Valid Until</p>
                  <p className="font-medium">{memberData.expiryDate}</p>
                </div>
                <div className="pt-3 border-t border-green-500/30">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-green-200">Status</span>
                    <span className="text-sm font-semibold bg-green-500/30 px-3 py-1 rounded-full">
                      ● Active
                    </span>
                  </div>
                </div>
                <button className="w-full mt-2 bg-white/20 hover:bg-white/30 text-white font-medium py-2 rounded-lg transition text-sm">
                  View Full Card
                </button>
              </div>
            </div>

            {/* Payment Summary */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <h3 className="text-sm font-semibold text-gray-800 mb-3">Payment Summary</h3>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Total Paid</span>
                  <span className="font-medium text-gray-800">${memberData.totalPayments * 299}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Last Payment</span>
                  <span className="font-medium text-gray-800">{memberData.lastPayment}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Next Payment</span>
                  <span className="font-medium text-gray-800">${memberData.totalPayments * 299}</span>
                </div>
                <button 
                  onClick={() => navigate('/membership')}
                  className="w-full mt-2 bg-green-600 hover:bg-green-700 text-white font-medium py-2 rounded-lg transition text-sm"
                >
                  Make Payment
                </button>
              </div>
            </div>

            {/* Quick Tips */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <h3 className="text-sm font-semibold text-gray-800 mb-3">💡 Quick Tips</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <CheckCircle size={14} className="text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-600">Renew before expiry to avoid interruption</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle size={14} className="text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-600">Keep your documents up to date</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle size={14} className="text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-600">Check notifications for important updates</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // --- Non-Member View ---
  return (
    <div className="max-w-6xl mx-auto">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 flex items-center gap-3">
          <User size={32} className="text-green-600" />
          Welcome Back, {user?.fullName || 'User'}!
        </h1>
        <p className="text-gray-500 mt-1 text-sm md:text-base">
          Here's an overview of your membership status and progress.
        </p>
      </div>

      {/* Status Card */}
      {renderStatusCard()}

      {/* Dashboard Widgets */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100">
          <div className="flex items-center gap-4">
            <div className="bg-green-100 rounded-full p-3">
              <Award size={24} className="text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Membership Status</p>
              <p className="text-xl font-bold text-gray-800 capitalize">
                {isMember ? 'Member' : 
                 hasPendingApplication ? 'Pending Review' : 
                 userLevel === 'basic' ? 'Not Eligible' :
                 userLevel === 'eligible' ? 'Eligible' : 
                 userLevel}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100">
          <div className="flex items-center gap-4">
            <div className="bg-blue-100 rounded-full p-3">
              <ClipboardCheck size={24} className="text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Assessment</p>
              <p className="text-xl font-bold text-gray-800">
                {hasPendingApplication ? 'In Review' :
                 userLevel === 'basic' ? 'Pending' :
                 userLevel === 'eligible' ? 'Completed' : 'N/A'}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100">
          <div className="flex items-center gap-4">
            <div className="bg-purple-100 rounded-full p-3">
              <FileCheck size={24} className="text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Documents</p>
              <p className="text-xl font-bold text-gray-800">
                {hasPendingApplication ? 'Submitted' : 
                 userLevel === 'eligible' ? 'Ready' :
                 'Not Required'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="mt-8">
        <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {!isMember && userLevel === 'basic' && (
              <button
                onClick={() => navigate('/eligible')}
                className="flex items-center gap-3 p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl border border-amber-200 hover:shadow-md transition-all hover:scale-[1.02]"
              >
                <ClipboardCheck className="w-5 h-5 text-amber-600" />
                <div className="text-left">
                  <p className="text-sm font-semibold text-gray-800">Take Assessment</p>
                  <p className="text-xs text-gray-500">Become eligible</p>
                </div>
                <ArrowRight className="w-4 h-4 text-amber-600 ml-auto" />
              </button>
            )}
            
            {!isMember && userLevel === 'eligible' && !hasPendingApplication && (
              <button
                onClick={() => navigate('/membership')}
                className="flex items-center gap-3 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200 hover:shadow-md transition-all hover:scale-[1.02]"
              >
                <Award className="w-5 h-5 text-green-600" />
                <div className="text-left">
                  <p className="text-sm font-semibold text-gray-800">Apply for Membership</p>
                  <p className="text-xs text-gray-500">Submit documents</p>
                </div>
                <ArrowRight className="w-4 h-4 text-green-600 ml-auto" />
              </button>
            )}

            {hasPendingApplication && (
              <button
                onClick={() => navigate('/membership')}
                className="flex items-center gap-3 p-4 bg-gradient-to-r from-yellow-50 to-amber-50 rounded-xl border border-yellow-200 hover:shadow-md transition-all hover:scale-[1.02]"
              >
                <Clock className="w-5 h-5 text-yellow-600" />
                <div className="text-left">
                  <p className="text-sm font-semibold text-gray-800">Check Status</p>
                  <p className="text-xs text-gray-500">Review in progress</p>
                </div>
                <ArrowRight className="w-4 h-4 text-yellow-600 ml-auto" />
              </button>
            )}

            <button
              onClick={() => navigate('/profile')}
              className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl border border-gray-200 hover:shadow-md transition-all hover:scale-[1.02]"
            >
              <User className="w-5 h-5 text-gray-600" />
              <div className="text-left">
                <p className="text-sm font-semibold text-gray-800">View Profile</p>
                <p className="text-xs text-gray-500">Manage account</p>
              </div>
              <ArrowRight className="w-4 h-4 text-gray-600 ml-auto" />
            </button>

            <button
              onClick={() => navigate('/settings')}
              className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl border border-gray-200 hover:shadow-md transition-all hover:scale-[1.02]"
            >
              <Settings className="w-5 h-5 text-gray-600" />
              <div className="text-left">
                <p className="text-sm font-semibold text-gray-800">Settings</p>
                <p className="text-xs text-gray-500">Preferences</p>
              </div>
              <ArrowRight className="w-4 h-4 text-gray-600 ml-auto" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Overview;