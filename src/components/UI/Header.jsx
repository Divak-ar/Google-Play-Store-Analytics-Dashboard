import React from 'react';
import { BarChart3, RefreshCw, Download, Settings, Menu, Bell, User } from 'lucide-react';
import { APP_CONFIG } from '../../utils/constants';

/**
 * Enhanced Header component with modern design and mobile responsiveness
 * @param {Object} props - Component props
 * @param {Function} props.onRefresh - Refresh data callback
 * @param {Function} props.onExport - Export data callback
 * @param {Function} props.onMobileMenuToggle - Mobile menu toggle callback
 * @param {boolean} props.isLoading - Loading state
 * @param {Object} props.stats - Basic statistics
 */
const Header = ({ 
  onRefresh, 
  onExport, 
  onMobileMenuToggle,
  isLoading = false, 
  stats = {} 
}) => {
  return (
    <header className="bg-white/95 backdrop-blur-sm border-b border-gray-200/80 sticky top-0 z-30 shadow-sm">
      <div className="px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-between">
          {/* Mobile Menu Button & Logo */}
          <div className="flex items-center space-x-4">
            <button
              onClick={onMobileMenuToggle}
              className="lg:hidden p-2.5 rounded-xl text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-all duration-200 active:scale-95"
              aria-label="Open sidebar"
            >
              <Menu className="w-5 h-5" />
            </button>
            
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg ring-2 ring-blue-100">
                <BarChart3 className="w-5 h-5 text-white" />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-lg font-bold text-gray-900 tracking-tight">
                  {APP_CONFIG?.name || 'Analytics Dashboard'}
                </h1>
                <p className="text-xs text-gray-500 font-medium">
                  Google Play Store Analytics
                </p>
              </div>
            </div>
          </div>

          {/* Quick Stats - Hidden on mobile */}
          <div className="hidden md:flex items-center space-x-6">
            {stats.totalApps && (
              <div className="text-center">
                <div className="text-lg font-bold text-gray-900">
                  {stats.totalApps.toLocaleString()}
                </div>
                <div className="text-xs text-gray-500 font-medium">Total Apps</div>
              </div>
            )}
            {stats.avgRating && (
              <div className="text-center">
                <div className="text-lg font-bold text-amber-600">
                  {stats.avgRating.toFixed(1)}★
                </div>
                <div className="text-xs text-gray-500 font-medium">Avg Rating</div>
              </div>
            )}
            {stats.totalCategories && (
              <div className="text-center">
                <div className="text-lg font-bold text-emerald-600">
                  {stats.totalCategories}
                </div>
                <div className="text-xs text-gray-500 font-medium">Categories</div>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-2">
            {/* Refresh Button */}
            <button
              onClick={onRefresh}
              disabled={isLoading}
              className="p-2.5 rounded-xl text-gray-500 hover:bg-gray-100 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 group"
              title="Refresh Data"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : 'group-hover:rotate-180 transition-transform duration-300'}`} />
            </button>

            {/* Export Button */}
            <button
              onClick={onExport}
              className="p-2.5 rounded-xl text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-all duration-200 group"
              title="Export Data"
            >
              <Download className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
            </button>

            {/* Settings Button - Hidden on small screens */}
            <button
              className="hidden sm:block p-2.5 rounded-xl text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-all duration-200 group"
              title="Settings"
            >
              <Settings className="w-4 h-4 group-hover:rotate-90 transition-transform duration-300" />
            </button>

            {/* Notifications - Hidden on small screens */}
            <button
              className="hidden sm:block relative p-2.5 rounded-xl text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-all duration-200"
              title="Notifications"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
            </button>

            {/* User Profile */}
            <div className="hidden sm:flex items-center space-x-3 ml-3 pl-3 border-l border-gray-200">
              <div className="w-8 h-8 bg-gradient-to-br from-gray-400 to-gray-500 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
              <div className="hidden lg:block">
                <div className="text-sm font-medium text-gray-900">Admin</div>
                <div className="text-xs text-gray-500">Analyst</div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Quick Stats */}
        <div className="md:hidden mt-3 pt-3 border-t border-gray-100">
          <div className="flex justify-between text-center">
            {stats.totalApps && (
              <div>
                <div className="text-base font-bold text-gray-900">
                  {stats.totalApps.toLocaleString()}
                </div>
                <div className="text-xs text-gray-500">Apps</div>
              </div>
            )}
            {stats.avgRating && (
              <div>
                <div className="text-base font-bold text-amber-600">
                  {stats.avgRating.toFixed(1)}★
                </div>
                <div className="text-xs text-gray-500">Rating</div>
              </div>
            )}
            {stats.totalCategories && (
              <div>
                <div className="text-base font-bold text-emerald-600">
                  {stats.totalCategories}
                </div>
                <div className="text-xs text-gray-500">Categories</div>
              </div>
            )}
            {stats.freeApps && stats.totalApps && (
              <div>
                <div className="text-base font-bold text-blue-600">
                  {Math.round((stats.freeApps / stats.totalApps) * 100)}%
                </div>
                <div className="text-xs text-gray-500">Free</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
