import React, { useState } from 'react';
import {
  Bell,
  Lock,
  Moon,
  Sun,
  Smartphone,
  Key,
  Palette,
  Languages,
  HelpCircle,
  CheckCircle,
  Eye,
  EyeOff,
  RefreshCw,
  Save,
  LogOut,
  Volume2,
  Globe,
  Mail
} from 'lucide-react';

const Setting = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [saving, setSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false
  });

  // Handle Save
  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      setSuccessMessage('Settings saved successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-800">Settings</h1>
          <p className="text-gray-500 text-sm mt-1">Manage your preferences</p>
        </div>

        {/* Success Message */}
        {successMessage && (
          <div className="mb-6 p-3 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2 text-green-700 text-sm">
            <CheckCircle size={18} />
            <span>{successMessage}</span>
          </div>
        )}

        <div className="space-y-4">
          {/* Appearance */}
          <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100">
            <div className="flex items-center gap-2 mb-4">
              <Palette size={20} className="text-green-600" />
              <h2 className="text-lg font-semibold text-gray-800">Appearance</h2>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div 
                className={`p-3 border-2 rounded-lg cursor-pointer transition-all ${
                  !darkMode ? 'border-green-500 bg-green-50' : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => setDarkMode(false)}
              >
                <div className="flex items-center gap-2">
                  <Sun size={18} className="text-yellow-600" />
                  <span className="text-sm font-medium">Light</span>
                  {!darkMode && <CheckCircle size={14} className="ml-auto text-green-600" />}
                </div>
              </div>
              <div 
                className={`p-3 border-2 rounded-lg cursor-pointer transition-all ${
                  darkMode ? 'border-green-500 bg-green-50' : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => setDarkMode(true)}
              >
                <div className="flex items-center gap-2">
                  <Moon size={18} className="text-indigo-600" />
                  <span className="text-sm font-medium">Dark</span>
                  {darkMode && <CheckCircle size={14} className="ml-auto text-green-600" />}
                </div>
              </div>
            </div>

            <div className="mt-3">
              <label className="block text-sm font-medium text-gray-700 mb-1">Language</label>
              <div className="relative">
                <Languages size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <select className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none text-sm bg-white">
                  <option>English</option>
                  <option>Nepali</option>
                  <option>Hindi</option>
                </select>
              </div>
            </div>
          </div>

          {/* Notifications */}
          <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100">
            <div className="flex items-center gap-2 mb-4">
              <Bell size={20} className="text-green-600" />
              <h2 className="text-lg font-semibold text-gray-800">Notifications</h2>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg transition">
                <div className="flex items-center gap-2">
                  <Volume2 size={16} className="text-blue-600" />
                  <div>
                    <p className="text-sm font-medium text-gray-800">Push</p>
                    <p className="text-xs text-gray-500">Browser notifications</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={notifications.push}
                    onChange={() => setNotifications({...notifications, push: !notifications.push})}
                    className="sr-only peer"
                  />
                  <div className="w-9 h-5 bg-gray-200 peer-focus:ring-2 peer-focus:ring-green-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-green-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg transition">
                <div className="flex items-center gap-2">
                  <Mail size={16} className="text-purple-600" />
                  <div>
                    <p className="text-sm font-medium text-gray-800">Email</p>
                    <p className="text-xs text-gray-500">Updates via email</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={notifications.email}
                    onChange={() => setNotifications({...notifications, email: !notifications.email})}
                    className="sr-only peer"
                  />
                  <div className="w-9 h-5 bg-gray-200 peer-focus:ring-2 peer-focus:ring-green-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-green-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg transition">
                <div className="flex items-center gap-2">
                  <Smartphone size={16} className="text-yellow-600" />
                  <div>
                    <p className="text-sm font-medium text-gray-800">SMS</p>
                    <p className="text-xs text-gray-500">Text message alerts</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={notifications.sms}
                    onChange={() => setNotifications({...notifications, sms: !notifications.sms})}
                    className="sr-only peer"
                  />
                  <div className="w-9 h-5 bg-gray-200 peer-focus:ring-2 peer-focus:ring-green-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-green-600"></div>
                </label>
              </div>
            </div>
          </div>

          {/* Security */}
          <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100">
            <div className="flex items-center gap-2 mb-4">
              <Lock size={20} className="text-green-600" />
              <h2 className="text-lg font-semibold text-gray-800">Security</h2>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter current password"
                    className="w-full px-3 py-2 pr-9 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none text-sm"
                  />
                  <button
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                <input
                  type="password"
                  placeholder="Enter new password"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none text-sm"
                />
              </div>
              <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition">
                <Key size={16} />
                Update Password
              </button>
            </div>
          </div>

          {/* Privacy */}
          <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100">
            <div className="flex items-center gap-2 mb-4">
              <Globe size={20} className="text-green-600" />
              <h2 className="text-lg font-semibold text-gray-800">Privacy</h2>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg transition">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-gray-800">Public Profile</span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-9 h-5 bg-gray-200 peer-focus:ring-2 peer-focus:ring-green-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-green-600"></div>
                </label>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <HelpCircle size={16} />
              <span>Need help? <a href="#" className="text-green-600 hover:text-green-700 font-medium">Contact</a></span>
            </div>
            <div className="flex gap-2">
              <button className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg text-sm font-medium transition">
                <RefreshCw size={14} className="inline mr-1" />
                Reset
              </button>
              <button 
                onClick={handleSave}
                disabled={saving}
                className="px-5 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-medium transition shadow-sm disabled:opacity-70"
              >
                {saving ? (
                  <>
                    <span className="inline-block animate-spin mr-1">⟳</span>
                    Saving...
                  </>
                ) : (
                  <>
                    <Save size={14} className="inline mr-1" />
                    Save
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Logout */}
          <div className="pt-3 border-t border-gray-200">
            <button className="flex items-center gap-2 text-red-600 hover:text-red-700 text-sm font-medium transition">
              <LogOut size={16} />
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Setting;