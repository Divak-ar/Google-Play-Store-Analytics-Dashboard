import React from 'react';
import { 
  TrendingUp, 
  Users, 
  Star, 
  Download, 
  PieChart, 
  BarChart3,
  MessageSquare,
  ArrowRight,
  AlertCircle,
  CheckCircle,
  Smartphone,
  Heart,
  Shield,
  Zap
} from 'lucide-react';
import PieChartComponent from '../Charts/PieChart';
import BarChartComponent from '../Charts/BarChart';
import LineChart from '../Charts/LineChart';
import { useChartData } from '../../hooks/useChartData';
import { DASHBOARD_SECTIONS } from '../../utils/constants';

/**
 * Modern Overview Section with enhanced UI
 */
const OverviewSection = ({ 
  analytics, 
  apps, 
  reviews, 
  onSectionChange 
}) => {
  const chartData = useChartData(analytics, analytics?.chartData);

  if (!analytics) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <BarChart3 className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Analyzing Data</h3>
          <p className="text-gray-600">Processing Google Play Store insights...</p>
        </div>
      </div>
    );
  }

  const { overview, categories, ratings, sentiment, insights } = analytics;

  const metricCards = [
    {
      title: 'Total Apps',
      value: overview.totalApps?.toLocaleString() || '0',
      subtitle: `${categories?.totalCategories || 0} categories`,
      icon: Smartphone,
      color: 'blue',
      section: DASHBOARD_SECTIONS.CATEGORIES,
      trend: '+12%'
    },
    {
      title: 'Average Rating',
      value: overview.avgRating?.toFixed(1) || '0.0',
      subtitle: `${ratings?.highRatedPercentage?.toFixed(0) || 0}% highly rated`,
      icon: Star,
      color: 'amber',
      section: DASHBOARD_SECTIONS.RATINGS,
      trend: '+0.2'
    },
    {
      title: 'Total Downloads',
      value: `${((overview.totalInstalls || 0) / 1000000000).toFixed(1)}B`,
      subtitle: 'Across all apps',
      icon: Download,
      color: 'emerald',
      section: DASHBOARD_SECTIONS.TRENDS,
      trend: '+34%'
    },
    {
      title: 'User Reviews',
      value: `${((sentiment?.totalReviews || 0) / 1000).toFixed(0)}K`,
      subtitle: `${sentiment?.sentimentPercentages?.positive?.toFixed(0) || 0}% positive`,
      icon: MessageSquare,
      color: 'purple',
      section: DASHBOARD_SECTIONS.SENTIMENT,
      trend: '+8%'
    }
  ];

  const getColorClasses = (color) => {
    const colors = {
      blue: {
        bg: 'bg-blue-50',
        icon: 'bg-blue-100 text-blue-600',
        text: 'text-blue-700',
        border: 'border-blue-200',
        trend: 'text-blue-600'
      },
      amber: {
        bg: 'bg-amber-50',
        icon: 'bg-amber-100 text-amber-600',
        text: 'text-amber-700',
        border: 'border-amber-200',
        trend: 'text-amber-600'
      },
      emerald: {
        bg: 'bg-emerald-50',
        icon: 'bg-emerald-100 text-emerald-600',
        text: 'text-emerald-700',
        border: 'border-emerald-200',
        trend: 'text-emerald-600'
      },
      purple: {
        bg: 'bg-purple-50',
        icon: 'bg-purple-100 text-purple-600',
        text: 'text-purple-700',
        border: 'border-purple-200',
        trend: 'text-purple-600'
      }
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="text-center">
        <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-medium mb-4">
          <Shield className="w-4 h-4 mr-2" />
          Google Play Store Analytics
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Dashboard Overview
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Comprehensive insights and analytics from {overview.totalApps?.toLocaleString()} mobile applications
        </p>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {metricCards.map((card, index) => {
          const colors = getColorClasses(card.color);
          const IconComponent = card.icon;
          
          return (
            <div
              key={index}
              onClick={() => onSectionChange(card.section)}
              className={`
                group relative p-6 rounded-2xl border-2 transition-all duration-300 cursor-pointer
                transform hover:scale-105 hover:shadow-xl
                ${colors.bg} ${colors.border} hover:shadow-${card.color}-200/50
              `}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className={`inline-flex p-3 rounded-xl ${colors.icon} mb-4`}>
                    <IconComponent className="w-6 h-6" />
                  </div>
                  
                  <h3 className="text-sm font-medium text-gray-600 mb-1">
                    {card.title}
                  </h3>
                  
                  <p className="text-3xl font-bold text-gray-900 mb-2">
                    {card.value}
                  </p>
                  
                  <p className="text-sm text-gray-500 mb-3">
                    {card.subtitle}
                  </p>

                  <div className="flex items-center justify-between">
                    <span className={`inline-flex items-center text-sm font-medium ${colors.trend}`}>
                      <TrendingUp className="w-4 h-4 mr-1" />
                      {card.trend}
                    </span>
                    
                    <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors" />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Category Distribution */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">App Categories</h3>
              <p className="text-sm text-gray-600">Distribution across different categories</p>
            </div>
            <button
              onClick={() => onSectionChange(DASHBOARD_SECTIONS.CATEGORIES)}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
          
          <div className="h-80">
            <PieChartComponent
              data={chartData?.categoryPieData || []}
              height={320}
              showLegend={true}
            />
          </div>
        </div>

        {/* Rating Distribution */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Rating Distribution</h3>
              <p className="text-sm text-gray-600">How apps are rated by users</p>
            </div>
            <button
              onClick={() => onSectionChange(DASHBOARD_SECTIONS.RATINGS)}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
          
          <div className="h-80">
            <BarChartComponent
              data={chartData?.ratingHistogramData || []}
              dataKey="count"
              xAxisKey="range"
              color="#f59e0b"
              height={320}
            />
          </div>
        </div>
      </div>

      {/* Insights Section */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-200 p-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-medium mb-4">
            <Zap className="w-4 h-4 mr-2" />
            AI-Powered Insights
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Key Market Insights
          </h2>
          <p className="text-gray-600">
            Automatically generated insights from your data analysis
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {insights?.insights?.slice(0, 6).map((insight, index) => (
            <div key={index} className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-blue-600" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-semibold text-gray-900 mb-1">
                    {insight.title}
                  </h4>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {insight.description}
                  </p>
                  {insight.metric && (
                    <div className="mt-2 inline-flex items-center px-2.5 py-1 rounded-md bg-blue-50 text-blue-700 text-xs font-medium">
                      {typeof insight.metric === 'number' 
                        ? insight.metric.toLocaleString() 
                        : insight.metric
                      }
                    </div>
                  )}
                </div>
              </div>
            </div>
          )) || (
            <div className="col-span-full text-center py-8">
              <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No insights available yet</p>
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <button
            onClick={() => onSectionChange(DASHBOARD_SECTIONS.CATEGORIES)}
            className="inline-flex items-center px-6 py-3 bg-white text-gray-700 font-medium rounded-xl border border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-all duration-200"
          >
            <PieChart className="w-5 h-5 mr-2" />
            Explore Categories
          </button>
          
          <button
            onClick={() => onSectionChange(DASHBOARD_SECTIONS.TRENDS)}
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            <TrendingUp className="w-5 h-5 mr-2" />
            View Trends
          </button>
          
          <button
            onClick={() => onSectionChange(DASHBOARD_SECTIONS.REPORTS)}
            className="inline-flex items-center px-6 py-3 bg-white text-gray-700 font-medium rounded-xl border border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-all duration-200"
          >
            <Download className="w-5 h-5 mr-2" />
            Generate Report
          </button>
        </div>
      </div>
    </div>
  );
};

export default OverviewSection;
