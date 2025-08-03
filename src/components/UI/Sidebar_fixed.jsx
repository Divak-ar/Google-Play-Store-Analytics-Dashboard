import React, { useState, useMemo } from 'react';
import { 
  BarChart3, 
  PieChart, 
  TrendingUp, 
  Star, 
  MessageSquare, 
  FileText,
  Filter,
  X,
  RotateCcw,
  Search,
  Check
} from 'lucide-react';
import { DASHBOARD_SECTIONS } from '../../utils/constants';

/**
 * Enhanced Sidebar with always-visible filters
 */
const Sidebar = ({ 
  activeSection = DASHBOARD_SECTIONS.OVERVIEW,
  onSectionChange,
  filters = {},
  onFiltersChange,
  categories = [],
  isMobileOpen = false,
  onMobileClose
}) => {
  const [searchCategory, setSearchCategory] = useState('');

  const navigationItems = [
    { 
      id: DASHBOARD_SECTIONS.OVERVIEW, 
      label: 'Overview', 
      icon: BarChart3,
      description: 'Key metrics and insights',
      color: 'blue'
    },
    { 
      id: DASHBOARD_SECTIONS.CATEGORIES, 
      label: 'Categories', 
      icon: PieChart,
      description: 'Category performance analysis',
      color: 'emerald'
    },
    { 
      id: DASHBOARD_SECTIONS.RATINGS, 
      label: 'Ratings', 
      icon: Star,
      description: 'Rating distribution analysis',
      color: 'amber'
    },
    { 
      id: DASHBOARD_SECTIONS.SENTIMENT, 
      label: 'Sentiment', 
      icon: MessageSquare,
      description: 'User sentiment trends',
      color: 'purple'
    },
    { 
      id: DASHBOARD_SECTIONS.TRENDS, 
      label: 'Trends', 
      icon: TrendingUp,
      description: 'Market patterns and forecasts',
      color: 'rose'
    },
    { 
      id: DASHBOARD_SECTIONS.REPORTS, 
      label: 'Reports', 
      icon: FileText,
      description: 'Export and reporting tools',
      color: 'indigo'
    }
  ];

  // Filter categories based on search
  const filteredCategories = useMemo(() => {
    return categories.filter(category =>
      category.toLowerCase().includes(searchCategory.toLowerCase())
    );
  }, [categories, searchCategory]);

  // Get color classes for navigation items
  const getColorClasses = (color, isActive = false) => {
    const colors = {
      blue: isActive 
        ? 'bg-blue-50 text-blue-700 border-blue-200 shadow-sm' 
        : 'text-gray-600 hover:bg-blue-50 hover:text-blue-700',
      emerald: isActive 
        ? 'bg-emerald-50 text-emerald-700 border-emerald-200 shadow-sm' 
        : 'text-gray-600 hover:bg-emerald-50 hover:text-emerald-700',
      amber: isActive 
        ? 'bg-amber-50 text-amber-700 border-amber-200 shadow-sm' 
        : 'text-gray-600 hover:bg-amber-50 hover:text-amber-700',
      purple: isActive 
        ? 'bg-purple-50 text-purple-700 border-purple-200 shadow-sm' 
        : 'text-gray-600 hover:bg-purple-50 hover:text-purple-700',
      rose: isActive 
        ? 'bg-rose-50 text-rose-700 border-rose-200 shadow-sm' 
        : 'text-gray-600 hover:bg-rose-50 hover:text-rose-700',
      indigo: isActive 
        ? 'bg-indigo-50 text-indigo-700 border-indigo-200 shadow-sm' 
        : 'text-gray-600 hover:bg-indigo-50 hover:text-indigo-700'
    };
    return colors[color] || colors.blue;
  };

  // Handle filter changes
  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters };
    
    if (key === 'category' && value === 'all') {
      delete newFilters.category;
    } else if (value === null || value === '' || value === undefined) {
      delete newFilters[key];
    } else {
      // Convert minRating to number for proper filtering
      if (key === 'minRating') {
        newFilters[key] = parseFloat(value);
      } else {
        newFilters[key] = value;
      }
    }
    
    onFiltersChange(newFilters);
  };

  // Reset all filters
  const resetFilters = () => {
    onFiltersChange({});
    setSearchCategory('');
  };

  // Check if filters are active
  const hasActiveFilters = Object.keys(filters).length > 0;

  const sidebarClasses = `
    ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'}
    lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200
    transition-transform duration-300 ease-in-out flex flex-col shadow-2xl lg:shadow-none
  `;

  return (
    <>
      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-gray-900 bg-opacity-50 z-40 lg:hidden backdrop-blur-sm"
          onClick={onMobileClose}
        />
      )}

      <aside className={sidebarClasses}>
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900">Analytics</h2>
              <p className="text-xs text-gray-600">Play Store Dashboard</p>
            </div>
          </div>
          <button
            onClick={onMobileClose}
            className="lg:hidden p-2 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-white/50 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Menu */}
        <nav className="p-4 space-y-2">
          {navigationItems.map((item) => {
            const IconComponent = item.icon;
            const isActive = activeSection === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => {
                  onSectionChange(item.id);
                  onMobileClose();
                }}
                className={`
                  w-full flex items-center space-x-3 p-3 rounded-lg text-left transition-all duration-200
                  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1
                  ${isActive 
                    ? `${getColorClasses(item.color, true)} border-l-4` 
                    : `${getColorClasses(item.color)} hover:shadow-sm border-l-4 border-transparent`
                  }
                `}
              >
                <div className={`p-2 rounded-md ${isActive ? 'bg-white shadow-sm' : 'bg-gray-100'}`}>
                  <IconComponent className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-sm">{item.label}</div>
                  <div className="text-xs opacity-70 truncate">{item.description}</div>
                </div>
                {isActive && (
                  <div className="w-1.5 h-1.5 bg-current rounded-full"></div>
                )}
              </button>
            );
          })}
        </nav>

        {/* Filters Section - Always Visible */}
        <div className="border-t border-gray-200 p-4 bg-gradient-to-b from-gray-50 to-white flex-1 overflow-y-auto">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-blue-600" />
              <span className="font-semibold text-gray-900 text-sm">Filters</span>
              {hasActiveFilters && (
                <span className="px-2 py-0.5 text-xs bg-blue-100 text-blue-700 rounded-full font-medium">
                  {Object.keys(filters).length}
                </span>
              )}
            </div>
            {hasActiveFilters && (
              <button
                onClick={resetFilters}
                className="text-xs text-blue-600 hover:text-blue-700 font-medium flex items-center space-x-1"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            )}
          </div>

          {/* Filters Content */}
          <div className="space-y-4">
            {/* Category Filter */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wide">
                Category
              </label>
              
              <div className="relative mb-2">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-3 h-3 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search categories..."
                  value={searchCategory}
                  onChange={(e) => setSearchCategory(e.target.value)}
                  className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md text-xs focus:ring-1 focus:ring-blue-500 focus:border-blue-500 bg-white"
                />
              </div>

              <div className="max-h-32 overflow-y-auto space-y-1 border border-gray-200 rounded-md p-2 bg-white">
                <button
                  onClick={() => handleFilterChange('category', 'all')}
                  className={`w-full flex items-center justify-between p-2 rounded text-xs transition-colors ${
                    !filters.category
                      ? 'bg-blue-50 text-blue-700 font-medium'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <span>All Categories</span>
                  {!filters.category && <Check className="w-3 h-3" />}
                </button>
                
                {filteredCategories.slice(0, 10).map((category) => (
                  <button
                    key={category}
                    onClick={() => handleFilterChange('category', category)}
                    className={`w-full flex items-center justify-between p-2 rounded text-xs transition-colors ${
                      filters.category === category
                        ? 'bg-blue-50 text-blue-700 font-medium'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <span className="truncate text-left">{category}</span>
                    {filters.category === category && <Check className="w-3 h-3 flex-shrink-0 ml-1" />}
                  </button>
                ))}
                
                {filteredCategories.length > 10 && (
                  <div className="px-2 py-1 text-xs text-gray-500 text-center">
                    +{filteredCategories.length - 10} more...
                  </div>
                )}
              </div>
            </div>

            {/* Rating Filter */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wide">
                Min Rating
              </label>
              <select
                value={filters.minRating || ''}
                onChange={(e) => handleFilterChange('minRating', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-xs focus:ring-1 focus:ring-blue-500 focus:border-blue-500 bg-white"
              >
                <option value="">Any Rating</option>
                <option value="4.5">4.5+ Stars</option>
                <option value="4.0">4.0+ Stars</option>
                <option value="3.5">3.5+ Stars</option>
                <option value="3.0">3.0+ Stars</option>
              </select>
            </div>

            {/* App Type Filter */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wide">
                App Type
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => handleFilterChange('isPaid', false)}
                  className={`px-3 py-2 text-xs rounded border transition-colors font-medium ${
                    filters.isPaid === false 
                      ? 'bg-green-50 text-green-700 border-green-200' 
                      : 'border-gray-200 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  Free
                </button>
                <button
                  onClick={() => handleFilterChange('isPaid', true)}
                  className={`px-3 py-2 text-xs rounded border transition-colors font-medium ${
                    filters.isPaid === true 
                      ? 'bg-amber-50 text-amber-700 border-amber-200' 
                      : 'border-gray-200 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  Paid
                </button>
              </div>
            </div>

            {/* Content Rating Filter */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wide">
                Content Rating
              </label>
              <select
                value={filters.contentRating || ''}
                onChange={(e) => handleFilterChange('contentRating', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-xs focus:ring-1 focus:ring-blue-500 focus:border-blue-500 bg-white"
              >
                <option value="">Any Rating</option>
                <option value="Everyone">Everyone</option>
                <option value="Everyone 10+">Everyone 10+</option>
                <option value="Teen">Teen</option>
                <option value="Mature 17+">Mature 17+</option>
                <option value="Adults only 18+">Adults only 18+</option>
              </select>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
