import React, { useState } from 'react';
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
 * Modern Sidebar navigation component with enhanced filters
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
      description: 'Category performance',
      color: 'emerald'
    },
    { 
      id: DASHBOARD_SECTIONS.RATINGS, 
      label: 'Ratings', 
      icon: Star,
      description: 'Rating analysis',
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
      description: 'Market patterns',
      color: 'rose'
    },
    { 
      id: DASHBOARD_SECTIONS.REPORTS, 
      label: 'Reports', 
      icon: FileText,
      description: 'Detailed reports',
      color: 'slate'
    }
  ];

  const handleFilterChange = (filterKey, value) => {
    const newFilters = { ...filters };
    
    if (value === '' || value === null || value === 'all') {
      delete newFilters[filterKey];
    } else {
      newFilters[filterKey] = value;
    }
    
    onFiltersChange(newFilters);
  };

  const clearAllFilters = () => {
    onFiltersChange({});
    setSearchCategory('');
  };

  const hasActiveFilters = Object.keys(filters).length > 0;

  // Filter categories based on search
  const filteredCategories = categories.filter(category => 
    category.toLowerCase().includes(searchCategory.toLowerCase())
  );

  const getColorClasses = (color, isActive = false) => {
    const colors = {
      blue: isActive 
        ? 'bg-blue-100 text-blue-700 border-blue-200' 
        : 'text-gray-600 hover:bg-blue-50 hover:text-blue-700',
      emerald: isActive 
        ? 'bg-emerald-100 text-emerald-700 border-emerald-200' 
        : 'text-gray-600 hover:bg-emerald-50 hover:text-emerald-700',
      amber: isActive 
        ? 'bg-amber-100 text-amber-700 border-amber-200' 
        : 'text-gray-600 hover:bg-amber-50 hover:text-amber-700',
      purple: isActive 
        ? 'bg-purple-100 text-purple-700 border-purple-200' 
        : 'text-gray-600 hover:bg-purple-50 hover:text-purple-700',
      rose: isActive 
        ? 'bg-rose-100 text-rose-700 border-rose-200' 
        : 'text-gray-600 hover:bg-rose-50 hover:text-rose-700',
      slate: isActive 
        ? 'bg-slate-100 text-slate-700 border-slate-200' 
        : 'text-gray-600 hover:bg-slate-50 hover:text-slate-700'
    };
    return colors[color] || colors.blue;
  };

  const sidebarClasses = `
    ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'}
    lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-40 w-80 bg-white border-r border-gray-200
    transition-transform duration-300 ease-in-out flex flex-col shadow-xl lg:shadow-none
  `;

  return (
    <>
      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-gray-600 bg-opacity-50 z-30 lg:hidden"
          onClick={onMobileClose}
        />
      )}

      <aside className={sidebarClasses}>
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <Filter className="w-5 h-5 text-gray-600" />
            <h2 className="text-lg font-semibold text-gray-900">Navigation</h2>
          </div>
          <button
            onClick={onMobileClose}
            className="lg:hidden p-2 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 p-6 space-y-2 overflow-y-auto">
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
                  w-full flex items-center space-x-3 p-4 rounded-xl text-left transition-all duration-200
                  transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1
                  ${isActive 
                    ? `${getColorClasses(item.color, true)} shadow-sm border` 
                    : `${getColorClasses(item.color)} hover:shadow-sm`
                  }
                `}
              >
                <div className={`p-2 rounded-lg ${isActive ? 'bg-white shadow-sm' : 'bg-gray-100'}`}>
                  <IconComponent className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-sm">{item.label}</div>
                  <div className="text-xs opacity-75 truncate">{item.description}</div>
                </div>
                {isActive && (
                  <div className="w-2 h-2 bg-current rounded-full"></div>
                )}
              </button>
            );
          })}
        </nav>

        {/* Filters Section */}
        <div className="border-t border-gray-200 p-6">
          <button
            onClick={() => setIsFiltersExpanded(!isFiltersExpanded)}
            className="w-full flex items-center justify-between text-left mb-4 p-2 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-gray-600" />
              <span className="font-medium text-gray-900">Filters</span>
              {hasActiveFilters && (
                <span className="ml-2 px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded-full font-medium">
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
              {/* Category Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                
                {/* Category Search */}
                <div className="relative mb-3">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search categories..."
                    value={searchCategory}
                    onChange={(e) => setSearchCategory(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div className="max-h-48 overflow-y-auto space-y-1 border border-gray-200 rounded-lg p-2">
                  <button
                    onClick={() => handleFilterChange('category', 'all')}
                    className={`w-full flex items-center space-x-2 p-2 rounded-md text-sm transition-colors ${
                      !filters.category 
                        ? 'bg-blue-100 text-blue-700' 
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {!filters.category && <Check className="w-4 h-4" />}
                    <span className="ml-6">All Categories</span>
                  </button>
                  
                  {filteredCategories.map((category) => (
                    <button
                      key={category}
                      onClick={() => handleFilterChange('category', category)}
                      className={`w-full flex items-center space-x-2 p-2 rounded-md text-sm transition-colors ${
                        filters.category === category 
                          ? 'bg-blue-100 text-blue-700' 
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      {filters.category === category && <Check className="w-4 h-4" />}
                      <span className={`truncate ${filters.category === category ? '' : 'ml-6'}`}>
                        {category}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Rating Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Minimum Rating
                </label>
                <select
                  value={filters.minRating || ''}
                  onChange={(e) => handleFilterChange('minRating', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">All Ratings</option>
                  <option value="4.5">4.5+ Stars</option>
                  <option value="4.0">4.0+ Stars</option>
                  <option value="3.5">3.5+ Stars</option>
                  <option value="3.0">3.0+ Stars</option>
                </select>
              </div>

              {/* App Type Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  App Type
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => handleFilterChange('isPaid', false)}
                    className={`p-2 text-sm rounded-lg border transition-colors ${
                      filters.isPaid === false 
                        ? 'bg-emerald-100 text-emerald-700 border-emerald-200' 
                        : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    Free Apps
                  </button>
                  <button
                    onClick={() => handleFilterChange('isPaid', true)}
                    className={`p-2 text-sm rounded-lg border transition-colors ${
                      filters.isPaid === true 
                        ? 'bg-amber-100 text-amber-700 border-amber-200' 
                        : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    Paid Apps
                  </button>
                </div>
              </div>

              {/* Content Rating Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Content Rating
                </label>
                <select
                  value={filters.contentRating || ''}
                  onChange={(e) => handleFilterChange('contentRating', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">All Ages</option>
                  <option value="Everyone">Everyone</option>
                  <option value="Teen">Teen</option>
                  <option value="Mature 17+">Mature 17+</option>
                  <option value="Adults only 18+">Adults 18+</option>
                </select>
              </div>

              {/* Clear Filters */}
              {hasActiveFilters && (
                <button
                  onClick={clearAllFilters}
                  className="w-full flex items-center justify-center space-x-2 p-3 mt-4 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span className="text-sm font-medium">Clear All Filters</span>
                </button>
              )}
            </div>
          )}
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
