import React from 'react';
import { BarChart3, RefreshCw, Download, Menu } from 'lucide-react';
import { APP_CONFIG } from '../../utils/constants';

/**
 * Header component with core functionality
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
              className="lg:hidden p-2.5 rounded-xl text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-all duration-200"
              aria-label="Open sidebar"
            >
              <Menu className="w-5 h-5" />
            </button>
            
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg">
                <BarChart3 className="w-5 h-5 text-white" />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-lg font-bold text-gray-900">
                  Google Play Analytics
                </h1>
                <p className="text-xs text-gray-500">
                  Interactive Dashboard
                </p>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="hidden md:flex items-center space-x-6">
            {stats.totalApps && (
              <div className="text-center">
                <div className="text-lg font-bold text-gray-900">
                  {stats.totalApps.toLocaleString()}
                </div>
                <div className="text-xs text-gray-500">Total Apps</div>
              </div>
            )}
            {stats.avgRating && (
              <div className="text-center">
                <div className="text-lg font-bold text-amber-600">
                  {stats.avgRating.toFixed(1)}★
                </div>
                <div className="text-xs text-gray-500">Avg Rating</div>
              </div>
            )}
            {stats.totalCategories && (
              <div className="text-center">
                <div className="text-lg font-bold text-emerald-600">
                  {stats.totalCategories}
                </div>
                <div className="text-xs text-gray-500">Categories</div>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-2">
            <button
              onClick={onRefresh}
              disabled={isLoading}
              className="p-2.5 rounded-xl text-gray-500 hover:bg-gray-100 hover:text-gray-700 disabled:opacity-50 transition-all duration-200"
              title="Refresh Data"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            </button>

            <button
              onClick={onExport}
              className="p-2.5 rounded-xl text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-all duration-200"
              title="Export Data"
            >
              <Download className="w-4 h-4" />
            </button>
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
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
