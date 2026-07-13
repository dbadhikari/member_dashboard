import React, { useEffect, useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import {
  LayoutDashboard,
  ShieldCheck,
  BadgeCheck,
  CalendarDays,
  Calendar,
  GraduationCap,
  FolderOpen,
  Settings,
  HelpCircle,
  LogOut,
  Lock,
} from "lucide-react";

const DashboardLayout = () => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  useEffect(() => {
    if (!user) {
      const dummyUser = {
        _id: "689a12...",
        fullName: "Dipu Adhikari",
        email: "dipu@gmail.com",
        role: "member",
        level: "basic",
      };

      localStorage.setItem("user", JSON.stringify(dummyUser));
      setUser(dummyUser);
    }
  }, [user]);

  console.log(user);

  const mainMenus = [
    { name: "Overview", icon: LayoutDashboard, path: "", requiredLevel: "basic" },
    { name: "Eligible", icon: ShieldCheck, path: "eligible", requiredLevel: "basic" },
    { name: "Membership", icon: BadgeCheck, path: "membership", requiredLevel: "eligible" },
    { name: "Meetings", icon: CalendarDays, path: "meetings", requiredLevel: "member" },
    { name: "Events", icon: Calendar, path: "events", requiredLevel: "member" },
    { name: "Training", icon: GraduationCap, path: "training", requiredLevel: "member" },
    { name: "Resources", icon: FolderOpen, path: "resources", requiredLevel: "member" },
  ];

  const levelOrder = {
    basic: 1,
    eligible: 2,
    member: 3,
  };

  const hasAccess = (requiredLevel) => {
    return levelOrder[user?.level] >= levelOrder[requiredLevel];
  };

  const bottomMenus = [
    { name: "Settings", icon: Settings, path: "settings" },
    { name: "Help & Support", icon: HelpCircle, path: "help" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200">
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar - No scrolling, fits content properly */}
        <aside className="w-72 bg-white/80 backdrop-blur-xl border-r border-gray-200/80 flex flex-col shadow-xl flex-shrink-0 h-full">
          {/* Main Navigation - Flex column to distribute space evenly */}
          <nav className="flex-1 px-3 py-4 flex flex-col">
            {/* Main Menu Section */}
            <div>
              <p className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                Main Menu
              </p>
              <ul className="space-y-1.5">
                {mainMenus.map((item) => {
                  const Icon = item.icon;
                  const isLocked = !hasAccess(item.requiredLevel);
                  return (
                    <li key={item.name}>
                      {isLocked ? (
                        <div className="group relative flex items-center gap-3 px-4 py-3 rounded-xl bg-gray-100 text-gray-400 opacity-60 cursor-not-allowed">
                          <div className="p-1.5 rounded-lg bg-gray-200">
                            <Icon size={18} />
                          </div>
                          <span className="font-medium text-sm">{item.name}</span>
                          <Lock size={16} className="ml-auto" />
                        </div>
                      ) : (
                        <NavLink
                          to={item.path}
                          end={item.path === ""}
                          className={({ isActive }) =>
                            `group relative flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                              isActive
                                ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-200/50"
                                : "text-gray-600 hover:bg-gray-100/80 hover:text-indigo-600"
                            }`
                          }
                        >
                          {({ isActive }) => (
                            <>
                              <div
                                className={`absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 rounded-r-full transition-all duration-300 ${
                                  isActive ? "bg-white" : "bg-transparent"
                                }`}
                              />
                              <div
                                className={`p-1.5 rounded-lg transition-all duration-300 ${
                                  isActive
                                    ? "bg-white/20"
                                    : "bg-gray-100/80 group-hover:bg-indigo-50"
                                }`}
                              >
                                <Icon
                                  size={18}
                                  className={`transition-all duration-300 ${
                                    isActive
                                      ? "text-white"
                                      : "text-gray-500 group-hover:text-indigo-600"
                                  }`}
                                />
                              </div>
                              <span className="font-medium text-sm">{item.name}</span>
                              {isActive && (
                                <span className="ml-auto text-[10px] bg-white/20 px-2 py-0.5 rounded-full">
                                  Active
                                </span>
                              )}
                            </>
                          )}
                        </NavLink>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Spacer to push support to bottom */}
            {/* <div className="flex-1"></div> */}

            {/* Support Section - At bottom of nav */}
            <div className="pt-6 border-t border-gray-200/80">
              <p className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                Support
              </p>
              <ul className="space-y-1.5">
                {bottomMenus.map((item) => {
                  const Icon = item.icon;
                  return (
                    <li key={item.name}>
                      <NavLink
                        to={item.path}
                        className={({ isActive }) =>
                          `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                            isActive
                              ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-200/50"
                              : "text-gray-600 hover:bg-gray-100/80 hover:text-indigo-600"
                          }`
                        }
                      >
                        <Icon size={18} className="text-gray-400" />
                        <span className="font-medium text-sm">{item.name}</span>
                      </NavLink>
                    </li>
                  );
                })}
              </ul>
            </div>
          </nav>

          {/* Logout Button - At very bottom */}
          <div className="px-3 pb-6 pt-4 border-t border-gray-200/80 flex-shrink-0">
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 transition-all duration-300 group">
              <div className="p-1.5 rounded-lg bg-red-100 group-hover:bg-red-200 transition-colors">
                <LogOut size={18} className="text-red-600" />
              </div>
              <span className="font-medium text-sm">Logout</span>
            </button>
          </div>
        </aside>

        {/* Main Content - Scrollable */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8">
          {/* Content Container */}
          <div className="max-w-7xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl shadow-gray-200/50 p-6 md:p-8 min-h-[75vh] border border-gray-100/80">
              <Outlet />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;