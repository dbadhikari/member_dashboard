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
  FileCheck
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
  // Check level (not role) to determine membership status
  const userLevel = user?.level || 'basic';
  const isMember = userLevel === 'member';
  
  // Check if membership application exists and is pending
  const hasPendingApplication = membershipApp?.status === 'pending';
  
  // Check if user is eligible and hasn't applied yet
  const isEligibleAndNotApplied = userLevel === 'eligible' && !membershipApp;

  // --- Helper function to render the appropriate status card ---
  const renderStatusCard = () => {
    // 1. If user level is 'member', render nothing
    if (isMember) {
      return null;
    }

    // 2. If user has a pending application, show pending review card
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
        <div className="bg-white rounded-2xl shadow-lg border border-yellow-200 overflow-hidden">
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

    // 3. If user level is 'basic' → show "not eligible" card
    if (userLevel === "basic") {
      return (
        <div className="bg-white rounded-2xl shadow-lg border border-amber-200 overflow-hidden">
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

    // 4. If user level is 'eligible' → show "eligible" card
    if (userLevel === "eligible") {
      return (
        <div className="bg-white rounded-2xl shadow-lg border border-green-200 overflow-hidden">
          <div className="p-6 md:p-8">
            <div className="flex items-start gap-5">
              <div className="bg-green-100 rounded-full p-3 flex-shrink-0">
                <CheckCircle size={32} className="text-green-600" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
                  🎉 Congratulations! You are eligible to apply for Membership.
                </h2>
                <div className="text-gray-600 space-y-1 text-sm md:text-base">
                  <p>
                    Based on your assessment results, you have successfully qualified to apply for membership in NC Digital School.
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

  return (
    <div className="max-w-6xl mx-auto">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 flex items-center gap-3">
          <User size={32} className="text-green-600" />
          Welcome Back, {user?.fullName || 'User'}! 👋
        </h1>
        <p className="text-gray-500 mt-1 text-sm md:text-base">
          Here's an overview of your membership status and progress.
        </p>
      </div>

      {/* Conditional Status Card */}
      <section className="mb-8">
        {renderStatusCard()}
      </section>

      {/* Dashboard Widgets - Always Visible */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Widget 1: Membership Status */}
        <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100 transition-all duration-200 hover:shadow-lg">
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
                 userLevel === 'eligible' ? 'Eligible (Not Applied)' : 
                 userLevel}
              </p>
            </div>
          </div>
        </div>

        {/* Widget 2: Assessment Progress */}
        <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100 transition-all duration-200 hover:shadow-lg">
          <div className="flex items-center gap-4">
            <div className="bg-blue-100 rounded-full p-3">
              <ClipboardCheck size={24} className="text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Assessment Progress</p>
              <p className="text-xl font-bold text-gray-800">
                {isMember ? 'Completed' :
                 hasPendingApplication ? 'In Review' :
                 userLevel === 'basic' ? '0%' :
                 userLevel === 'eligible' ? '100%' : 'N/A'}
              </p>
            </div>
          </div>
        </div>

        {/* Widget 3: Documents Status */}
        <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100 transition-all duration-200 hover:shadow-lg">
          <div className="flex items-center gap-4">
            <div className="bg-purple-100 rounded-full p-3">
              <FileCheck size={24} className="text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Documents</p>
              <p className="text-xl font-bold text-gray-800">
                {hasPendingApplication ? 'Submitted' : 
                 isMember ? 'Verified' : 
                 userLevel === 'eligible' ? 'Ready to Submit' :
                 'Not Required'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Actions Section */}
      <section className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-md p-6 border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Show only if not member and level is basic */}
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
            
            {/* Show only if eligible and no pending application */}
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

            {/* Show if application is pending */}
            {hasPendingApplication && (
              <button
                onClick={() => navigate('/membership')}
                className="flex items-center gap-3 p-4 bg-gradient-to-r from-yellow-50 to-amber-50 rounded-xl border border-yellow-200 hover:shadow-md transition-all hover:scale-[1.02]"
              >
                <Clock className="w-5 h-5 text-yellow-600" />
                <div className="text-left">
                  <p className="text-sm font-semibold text-gray-800">Check Application Status</p>
                  <p className="text-xs text-gray-500">Review in progress</p>
                </div>
                <ArrowRight className="w-4 h-4 text-yellow-600 ml-auto" />
              </button>
            )}

            {/* Always show profile button */}
            <button
              onClick={() => navigate('/profile')}
              className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl border border-gray-200 hover:shadow-md transition-all hover:scale-[1.02]"
            >
              <User className="w-5 h-5 text-gray-600" />
              <div className="text-left">
                <p className="text-sm font-semibold text-gray-800">View Profile</p>
                <p className="text-xs text-gray-500">Manage your account</p>
              </div>
              <ArrowRight className="w-4 h-4 text-gray-600 ml-auto" />
            </button>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Account Info</h3>
          <div className="space-y-3">
            <div>
              <p className="text-xs text-gray-500">Full Name</p>
              <p className="text-sm font-medium text-gray-800">{user?.fullName || 'N/A'}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Email</p>
              <p className="text-sm font-medium text-gray-800">{user?.email || 'N/A'}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Role</p>
              <p className="text-sm font-medium text-gray-800 capitalize">{user?.role || 'N/A'}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Level</p>
              <p className="text-sm font-medium text-gray-800 capitalize">
                {isMember ? 'Member' : 
                 hasPendingApplication ? 'Pending Review' : 
                 userLevel}
              </p>
            </div>
            {hasPendingApplication && (
              <div className="pt-2 border-t border-gray-100">
                <p className="text-xs text-gray-500">Application Status</p>
                <p className="text-sm font-medium text-yellow-600 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-yellow-500 inline-block"></span>
                  Pending Review
                </p>
              </div>
            )}
            {isEligibleAndNotApplied && (
              <div className="pt-2 border-t border-gray-100">
                <p className="text-xs text-green-600 font-medium">✅ Ready to Apply</p>
                <p className="text-xs text-gray-500">You can submit your membership application</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Overview;