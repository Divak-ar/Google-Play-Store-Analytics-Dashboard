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
  ChevronDown,
  ChevronRight,
  RotateCcw,
  Search,
  Check
} from 'lucide-react';
import { DASHBOARD_SECTIONS } from '../../utils/constants';

/**
 * Enhanced Sidebar navigation component with modern design and improved filters
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
  const [isFiltersExpanded, setIsFiltersExpanded] = useState(true);
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
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
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

        {/* Filters Section */}
        <div className="border-t border-gray-200 p-4 bg-gray-50">
          <button
            onClick={() => setIsFiltersExpanded(!isFiltersExpanded)}
            className="w-full flex items-center justify-between text-left mb-3 p-2 rounded-lg hover:bg-white transition-colors group"
          >
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-gray-600 group-hover:text-blue-600 transition-colors" />
              <span className="font-medium text-gray-900 text-sm">Filters</span>
              {hasActiveFilters && (
                <span className="px-2 py-0.5 text-xs bg-blue-100 text-blue-700 rounded-full font-medium">
                  {Object.keys(filters).length}
                </span>
              )}
            </div>
            {isFiltersExpanded ? (
              <ChevronDown className="w-4 h-4 text-gray-400" />
            ) : (
              <ChevronRight className="w-4 h-4 text-gray-400" />
            )}
          </button>

          {isFiltersExpanded && (
            <div className="space-y-4">
              {/* Reset Filters Button */}
              {hasActiveFilters && (
                <button
                  onClick={resetFilters}
                  className="w-full flex items-center justify-center space-x-2 p-2 text-sm font-medium text-gray-600 hover:text-gray-900 bg-white hover:bg-gray-50 border border-gray-200 rounded-lg transition-colors"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset Filters</span>
                </button>
              )}

              {/* Category Filter */}
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-2">
                  Category
                </label>
                
                {/* Category Search */}
                <div className="relative mb-2">
                  <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 w-3 h-3 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchCategory}
                    onChange={(e) => setSearchCategory(e.target.value)}
                    className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md text-xs focus:ring-1 focus:ring-blue-500 focus:border-transparent bg-white"
                  />
                </div>

                <div className="max-h-32 overflow-y-auto space-y-1 border border-gray-200 rounded-md p-1 bg-white">
                  <button
                    onClick={() => handleFilterChange('category', 'all')}
                    className={`w-full flex items-center space-x-2 p-2 rounded text-xs transition-colors ${
                      !filters.category 
                        ? 'bg-blue-50 text-blue-700 shadow-sm' 
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {!filters.category && <Check className="w-3 h-3" />}
                    <span className={`font-medium ${!filters.category ? '' : 'ml-5'}`}>All Categories</span>
                  </button>
                  
                  {filteredCategories.map((category) => (
                    <button
                      key={category}
                      onClick={() => handleFilterChange('category', category)}
                      className={`w-full flex items-center space-x-2 p-2 rounded text-xs transition-colors ${
                        filters.category === category 
                          ? 'bg-blue-50 text-blue-700 shadow-sm' 
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      {filters.category === category && <Check className="w-3 h-3" />}
                      <span className={`truncate ${filters.category === category ? '' : 'ml-5'}`}>
                        {category}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Rating Filter */}
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-2">
                  Minimum Rating
                </label>
                <select
                  value={filters.minRating || ''}
                  onChange={(e) => handleFilterChange('minRating', e.target.value)}
                  className="w-full px-2 py-2 border border-gray-300 rounded-md text-xs focus:ring-1 focus:ring-blue-500 focus:border-transparent bg-white"
                >
                  <option value="">Any Rating</option>
                  <option value="4.5">4.5+ Stars</option>
                  <option value="4.0">4.0+ Stars</option>
                  <option value="3.5">3.5+ Stars</option>
                  <option value="3.0">3.0+ Stars</option>
                  <option value="2.5">2.5+ Stars</option>
                </select>
              </div>

              {/* App Type Filter */}
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-2">
                  App Type
                </label>
                <div className="grid grid-cols-2 gap-1">
                  <button
                    onClick={() => handleFilterChange('isPaid', false)}
                    className={`p-2 text-xs rounded-md border transition-colors font-medium ${
                      filters.isPaid === false
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200 shadow-sm' 
                        : 'border-gray-200 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    Free
                  </button>
                  <button
                    onClick={() => handleFilterChange('isPaid', true)}
                    className={`p-2 text-xs rounded-md border transition-colors font-medium ${
                      filters.isPaid === true
                        ? 'bg-amber-50 text-amber-700 border-amber-200 shadow-sm' 
                        : 'border-gray-200 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    Paid
                  </button>
                </div>
              </div>

              {/* Content Rating Filter */}
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-2">
                  Content Rating
                </label>
                <select
                  value={filters.contentRating || ''}
                  onChange={(e) => handleFilterChange('contentRating', e.target.value)}
                  className="w-full px-2 py-2 border border-gray-300 rounded-md text-xs focus:ring-1 focus:ring-blue-500 focus:border-transparent bg-white"
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
          )}
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
