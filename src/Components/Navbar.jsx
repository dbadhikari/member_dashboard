import React, { useState } from "react";
import {
  Bell,
  ChevronDown,
  User,
  Settings,
  LogOut,
} from "lucide-react";

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const [user] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });


  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  return (
    <header className="bg-white/80 backdrop-blur-xl border-b border-gray-200/80 h-20 px-6 md:px-8 flex items-center justify-between shadow-md sticky top-0 z-50">
      
      {/* Left Section - Brand */}
      <section className="flex items-center gap-4">
        {/* Logo/Icon */}
        <div className="hidden sm:flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white font-bold text-lg shadow-lg shadow-indigo-200">
          D
        </div>

        <div>
          <h1 className="text-xl md:text-2xl font-extrabold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Member Dashboard
          </h1>
          <p className="text-xs md:text-sm text-gray-500 flex items-center gap-1">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-400 mr-1 animate-pulse"></span>
            Welcome back, {user?.fullName ? user.fullName.split(' ')[0] : "Member"}
          </p>
        </div>
      </section>

      {/* Right Section - Actions */}
      <nav className="flex items-center gap-2 md:gap-4" aria-label="User navigation">
        
        {/* Notification Bell with Badge */}
        <button 
          className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors group"
          aria-label="Notifications"
        >
          <Bell className="w-5 h-5 text-gray-600 group-hover:text-indigo-600 transition-colors" />
          <span className="absolute top-1.5 right-1.5 h-2.5 w-2.5 rounded-full bg-gradient-to-br from-red-400 to-red-500 ring-2 ring-white animate-pulse" />
          <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center ring-2 ring-white">
            3
          </span>
        </button>

        {/* Profile Dropdown */}
        <div className="relative ml-2">
          <button
            onClick={toggleDropdown}
            className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-white/60 transition-all duration-300 group border border-transparent hover:border-indigo-200"
            aria-expanded={isDropdownOpen}
            aria-haspopup="true"
          >
            {/* Profile Image with Status */}
            <figure className="relative">
            <img
                src={user?.profileImage || "https://i.pravatar.cc/150?img=11"}
                alt={user?.fullName}
                className="w-10 h-10 rounded-full object-cover ring-2 ring-indigo-200"
                />
              <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-400 ring-2 ring-white" />
            </figure>

            {/* User Info */}
            <div className="text-left hidden sm:block">
              <h4 className="font-semibold text-gray-800 text-sm leading-tight">
                {user?.fullName}
              </h4>
              <p className="text-xs text-gray-500 flex items-center gap-1">
                <span className="inline-block w-1 h-1 rounded-full bg-indigo-400 mr-0.5" />
                {user?.role}
              </p>
            </div>

            <ChevronDown
              size={18}
              className={`text-gray-400 transition-all duration-300 ${
                isDropdownOpen ? "rotate-180 text-indigo-600" : "group-hover:text-indigo-600"
              }`}
              aria-hidden="true"
            />
          </button>

          {/* Dropdown Menu with Animation */}
          {isDropdownOpen && (
            <>
              {/* Backdrop */}
              <div 
                className="fixed inset-0 z-40"
                onClick={() => setIsDropdownOpen(false)}
              />
              
              {/* Menu */}
              <div 
                className="absolute right-0 mt-3 w-64 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-50 animate-slideDown origin-top-right"
                role="menu"
                aria-label="User menu"
              >
                {/* User Info Header */}
                <div className="px-4 py-4 bg-gradient-to-r from-indigo-50 to-purple-50 border-b border-gray-100">
                  <div className="flex items-center gap-3">
                    <img
                      src="https://i.pravatar.cc/150?img=11"
                      alt="Dipu Adhikari"
                      className="w-12 h-12 rounded-full object-cover ring-2 ring-indigo-300"
                    />
                    <div>
                      <h4 className="font-bold text-gray-800 text-sm">{user?.fullName}</h4>
                      <p className="text-xs text-gray-500">{user?.email}</p>
                      <span className="inline-block mt-1 text-[10px] font-medium px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-700">
                        {user?.level}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Menu Items */}
                <div className="py-2">
                  <button
                    className="w-full px-4 py-2.5 flex items-center gap-3 hover:bg-indigo-50 transition-colors group"
                    role="menuitem"
                  >
                    <div className="w-8 h-8 rounded-lg bg-indigo-100 group-hover:bg-indigo-200 flex items-center justify-center transition-colors">
                      <User size={16} className="text-indigo-600" />
                    </div>
                    <span className="text-sm font-medium text-gray-700 group-hover:text-indigo-700 transition-colors">
                      My Profile
                    </span>
                  </button>

                  <button
                    className="w-full px-4 py-2.5 flex items-center gap-3 hover:bg-indigo-50 transition-colors group"
                    role="menuitem"
                  >
                    <div className="w-8 h-8 rounded-lg bg-indigo-100 group-hover:bg-indigo-200 flex items-center justify-center transition-colors">
                      <Settings size={16} className="text-indigo-600" />
                    </div>
                    <span className="text-sm font-medium text-gray-700 group-hover:text-indigo-700 transition-colors">
                      Settings
                    </span>
                  </button>
                </div>

                <hr className="border-gray-100" />

                <div className="py-2">
                  <button
                    className="w-full px-4 py-2.5 flex items-center gap-3 hover:bg-red-50 transition-colors group"
                    role="menuitem"
                  >
                    <div className="w-8 h-8 rounded-lg bg-red-100 group-hover:bg-red-200 flex items-center justify-center transition-colors">
                      <LogOut size={16} className="text-red-600" />
                    </div>
                    <span className="text-sm font-medium text-red-600 group-hover:text-red-700 transition-colors">
                      Logout
                    </span>
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;