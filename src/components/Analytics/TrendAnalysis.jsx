import React, { useState, useMemo } from 'react';
import { TrendingUp, TrendingDown, BarChart3, Calendar, Target, AlertCircle } from 'lucide-react';
import LineChart from '../Charts/LineChart';
import BarChartComponent from '../Charts/BarChart';
import { useChartData } from '../../hooks/useChartData';
import LoadingSpinner, { LoadingOverlay } from '../UI/LoadingSpinner';
import { ErrorDisplay } from '../UI/ErrorBoundary';

/**
 * Trend Analysis Dashboard Component
 * @param {Object} props - Component props
 * @param {Object} props.analytics - Analytics data
 * @param {Array} props.apps - Apps data
 * @param {Function} props.onCategorySelect - Category selection callback
 * @param {boolean} props.isLoading - Loading state
 * @param {string} props.error - Error message
 */
const TrendAnalysis = ({ 
  analytics, 
  apps = [], 
  onCategorySelect,
  isLoading = false,
  error = null 
}) => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('all');
  const [selectedMetric, setSelectedMetric] = useState('installs');

  // Prepare chart data
  const { trendChartData, categoryTrendData, performanceMetrics } = useChartData(analytics, null);

  // Calculate trend metrics
  const trendMetrics = useMemo(() => {
    if (!analytics?.categories?.categoryPerformance) return {};

    const categories = analytics.categories.categoryPerformance;
    const totalApps = categories.reduce((sum, cat) => sum + cat.appCount, 0);
    const totalInstalls = categories.reduce((sum, cat) => sum + cat.totalInstalls, 0);
    const avgRating = categories.reduce((sum, cat) => sum + cat.avgRating, 0) / categories.length;

    return {
      totalApps,
      totalInstalls,
      avgRating: avgRating || 0,
      topCategory: categories[0]?.category || 'Unknown',
      growth: {
        apps: '+12.5%',
        installs: '+34.2%',
        rating: '+0.15'
      }
    };
  }, [analytics]);

  // Mock trend data for demonstration (in a real app this would come from time-series data)
  const trendData = useMemo(() => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
    return months.map((month, index) => ({
      month,
      apps: 1000 + (index * 150) + Math.random() * 100,
      installs: 50000 + (index * 8000) + Math.random() * 5000,
      rating: 4.0 + (index * 0.05) + Math.random() * 0.2
    }));
  }, []);

  // Category growth data
  const categoryGrowthData = useMemo(() => {
    if (!analytics?.categories?.categoryPerformance) return [];
    
    return analytics.categories.categoryPerformance.slice(0, 8).map(cat => ({
      category: cat.category,
      currentApps: cat.appCount,
      growth: Math.random() * 30 - 10, // Mock growth percentage
      trend: Math.random() > 0.5 ? 'up' : 'down'
    }));
  }, [analytics]);

  if (isLoading) {
    return <LoadingOverlay message="Analyzing trends..." />;
  }

  if (error) {
    return <ErrorDisplay error={error} title="Trend Analysis Error" />;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Trend Analysis</h1>
          <p className="text-gray-600">Market trends and performance patterns</p>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <select
            value={selectedTimeframe}
            onChange={(e) => setSelectedTimeframe(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">All Time</option>
            <option value="6m">Last 6 Months</option>
            <option value="1y">Last Year</option>
          </select>
          
          <select
            value={selectedMetric}
            onChange={(e) => setSelectedMetric(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="installs">Installs</option>
            <option value="apps">App Count</option>
            <option value="rating">Rating</option>
          </select>
        </div>
      </div>

      {/* Key Trend Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Apps</p>
              <p className="text-2xl font-bold text-gray-900">
                {trendMetrics.totalApps?.toLocaleString() || 0}
              </p>
              <p className="text-sm text-green-600 flex items-center">
                <TrendingUp className="w-4 h-4 mr-1" />
                {trendMetrics.growth?.apps || '+0%'}
              </p>
            </div>
            <div className="p-2 bg-blue-100 rounded-lg">
              <BarChart3 className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Installs</p>
              <p className="text-2xl font-bold text-gray-900">
                {(trendMetrics.totalInstalls / 1000000).toFixed(1)}M
              </p>
              <p className="text-sm text-green-600 flex items-center">
                <TrendingUp className="w-4 h-4 mr-1" />
                {trendMetrics.growth?.installs || '+0%'}
              </p>
            </div>
            <div className="p-2 bg-green-100 rounded-lg">
              <Target className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg Rating</p>
              <p className="text-2xl font-bold text-gray-900">
                {trendMetrics.avgRating?.toFixed(2) || '0.00'}
              </p>
              <p className="text-sm text-green-600 flex items-center">
                <TrendingUp className="w-4 h-4 mr-1" />
                {trendMetrics.growth?.rating || '+0.00'}
              </p>
            </div>
            <div className="p-2 bg-yellow-100 rounded-lg">
              <Calendar className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Top Category</p>
              <p className="text-lg font-bold text-gray-900 truncate">
                {trendMetrics.topCategory}
              </p>
              <p className="text-sm text-blue-600">
                Leading category
              </p>
            </div>
            <div className="p-2 bg-purple-100 rounded-lg">
              <TrendingUp className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Trend Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Overall Trends */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Market Trends</h3>
          <LineChart
            data={trendData}
            xAxisKey="month"
            lines={[
              { dataKey: selectedMetric, color: '#3b82f6', name: selectedMetric.charAt(0).toUpperCase() + selectedMetric.slice(1) }
            ]}
            height={300}
            showGrid={true}
          />
        </div>

        {/* Category Growth */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Category Growth</h3>
          <BarChartComponent
            data={categoryGrowthData}
            dataKey="currentApps"
            xAxisKey="category"
            color="#10b981"
            height={300}
          />
        </div>
      </div>

      {/* Category Performance Trends */}
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Category Performance Trends</h3>
        <div className="space-y-3">
          {categoryGrowthData.slice(0, 6).map((category, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-lg ${
                  category.trend === 'up' ? 'bg-green-100' : 'bg-red-100'
                }`}>
                  {category.trend === 'up' ? (
                    <TrendingUp className="w-4 h-4 text-green-600" />
                  ) : (
                    <TrendingDown className="w-4 h-4 text-red-600" />
                  )}
                </div>
                <div>
                  <p className="font-medium text-gray-900">{category.category}</p>
                  <p className="text-sm text-gray-600">{category.currentApps} apps</p>
                </div>
              </div>
              <div className="text-right">
                <p className={`font-medium ${
                  category.growth >= 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  {category.growth >= 0 ? '+' : ''}{category.growth.toFixed(1)}%
                </p>
                <p className="text-sm text-gray-500">vs last period</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Insights and Recommendations */}
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Trend Insights</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-blue-50 rounded-lg">
            <div className="flex items-start space-x-3">
              <TrendingUp className="w-5 h-5 text-blue-600 mt-0.5" />
              <div>
                <h4 className="font-medium text-blue-900">Growing Markets</h4>
                <p className="text-sm text-blue-700 mt-1">
                  Games and Productivity categories show strongest growth patterns
                </p>
              </div>
            </div>
          </div>

          <div className="p-4 bg-yellow-50 rounded-lg">
            <div className="flex items-start space-x-3">
              <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
              <div>
                <h4 className="font-medium text-yellow-900">Market Opportunities</h4>
                <p className="text-sm text-yellow-700 mt-1">
                  Education and Health categories have potential for expansion
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrendAnalysis;
