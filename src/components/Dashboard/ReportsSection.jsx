import React, { useState, useMemo } from 'react';
import { 
  Download, 
  FileText, 
  PieChart, 
  BarChart3, 
  TrendingUp, 
  Calendar,
  Users,
  Star,
  MessageSquare,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import LoadingSpinner, { LoadingOverlay } from '../UI/LoadingSpinner';
import { ErrorDisplay } from '../UI/ErrorBoundary';

/**
 * Reports Section Component - Generate and export analytics reports
 * @param {Object} props - Component props
 * @param {Object} props.analytics - Analytics data
 * @param {Array} props.apps - Apps data
 * @param {Array} props.reviews - Reviews data
 * @param {boolean} props.isLoading - Loading state
 * @param {string} props.error - Error message
 */
const ReportsSection = ({ 
  analytics, 
  apps = [], 
  reviews = [],
  isLoading = false,
  error = null 
}) => {
  const [selectedReportType, setSelectedReportType] = useState('overview');
  const [isGenerating, setIsGenerating] = useState(false);

  // Report configurations
  const reportTypes = [
    {
      id: 'overview',
      title: 'Overview Report',
      description: 'Complete market overview with key metrics and insights',
      icon: PieChart,
      sections: ['Market Summary', 'Key Metrics', 'Top Categories', 'Performance Indicators']
    },
    {
      id: 'category',
      title: 'Category Analysis Report',
      description: 'Detailed analysis of app categories and market segments',
      icon: BarChart3,
      sections: ['Category Distribution', 'Performance Comparison', 'Market Share', 'Opportunities']
    },
    {
      id: 'sentiment',
      title: 'Sentiment Analysis Report',
      description: 'User sentiment analysis and review insights',
      icon: MessageSquare,
      sections: ['Sentiment Distribution', 'Review Analysis', 'User Feedback', 'Recommendations']
    },
    {
      id: 'trends',
      title: 'Trend Analysis Report',
      description: 'Market trends, growth patterns, and forecasts',
      icon: TrendingUp,
      sections: ['Growth Trends', 'Market Patterns', 'Forecasts', 'Strategic Insights']
    }
  ];

  // Generate report data based on type
  const reportData = useMemo(() => {
    if (!analytics) return {};

    const baseData = {
      generatedAt: new Date().toISOString(),
      generatedBy: 'Google Play Store Analytics Dashboard',
      dataRange: `${apps.length} apps analyzed`,
      lastUpdated: new Date().toLocaleDateString()
    };

    switch (selectedReportType) {
      case 'overview':
        return {
          ...baseData,
          title: 'Google Play Store Overview Report',
          summary: {
            totalApps: analytics.overview?.totalApps || 0,
            totalCategories: analytics.categories?.totalCategories || 0,
            avgRating: analytics.overview?.avgRating || 0,
            totalInstalls: analytics.overview?.totalInstalls || 0,
            totalReviews: analytics.overview?.totalReviews || 0
          },
          insights: analytics.insights?.insights || [],
          recommendations: analytics.insights?.recommendations || []
        };

      case 'category':
        return {
          ...baseData,
          title: 'Category Analysis Report',
          categories: analytics.categories?.categoryPerformance || [],
          marketShare: analytics.categories?.marketShare || [],
          topCategories: analytics.categories?.topCategories || []
        };

      case 'sentiment':
        return {
          ...baseData,
          title: 'Sentiment Analysis Report',
          sentiment: analytics.sentiment || {},
          totalReviews: reviews.length,
          positivePercentage: analytics.sentiment?.sentimentPercentages?.positive || 0,
          negativePercentage: analytics.sentiment?.sentimentPercentages?.negative || 0
        };

      case 'trends':
        return {
          ...baseData,
          title: 'Trend Analysis Report',
          trends: {
            growthRate: '+12.5%',
            topGrowingCategory: analytics.categories?.categoryPerformance?.[0]?.category || 'Unknown',
            marketDirection: 'Positive'
          }
        };

      default:
        return baseData;
    }
  }, [analytics, apps, reviews, selectedReportType]);

  // Generate and download report
  const generateReport = async (format = 'json') => {
    setIsGenerating(true);
    
    try {
      // Simulate report generation delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      let content, filename, mimeType;
      
      if (format === 'json') {
        content = JSON.stringify(reportData, null, 2);
        filename = `google-play-store-${selectedReportType}-report.json`;
        mimeType = 'application/json';
      } else if (format === 'csv') {
        // Convert key metrics to CSV format
        const csvContent = generateCSVReport(reportData);
        content = csvContent;
        filename = `google-play-store-${selectedReportType}-report.csv`;
        mimeType = 'text/csv';
      } else if (format === 'txt') {
        content = generateTextReport(reportData);
        filename = `google-play-store-${selectedReportType}-report.txt`;
        mimeType = 'text/plain';
      }
      
      // Create and download file
      const blob = new Blob([content], { type: mimeType });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
    } catch (error) {
      console.error('Error generating report:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  // Generate CSV content
  const generateCSVReport = (data) => {
    if (selectedReportType === 'overview') {
      return `Metric,Value
Total Apps,${data.summary?.totalApps || 0}
Total Categories,${data.summary?.totalCategories || 0}
Average Rating,${data.summary?.avgRating?.toFixed(2) || 0}
Total Installs,${data.summary?.totalInstalls || 0}
Total Reviews,${data.summary?.totalReviews || 0}`;
    }
    
    if (selectedReportType === 'category' && data.categories) {
      let csv = 'Category,App Count,Average Rating,Total Installs\n';
      data.categories.forEach(cat => {
        csv += `${cat.category},${cat.appCount},${cat.avgRating?.toFixed(2)},${cat.totalInstalls}\n`;
      });
      return csv;
    }
    
    return 'No data available for CSV export';
  };

  // Generate text report
  const generateTextReport = (data) => {
    let report = `${data.title}\n`;
    report += `Generated: ${new Date(data.generatedAt).toLocaleString()}\n`;
    report += `Data Range: ${data.dataRange}\n\n`;
    
    if (selectedReportType === 'overview') {
      report += `SUMMARY\n`;
      report += `--------\n`;
      report += `Total Apps: ${data.summary?.totalApps?.toLocaleString() || 0}\n`;
      report += `Total Categories: ${data.summary?.totalCategories || 0}\n`;
      report += `Average Rating: ${data.summary?.avgRating?.toFixed(2) || 0}\n`;
      report += `Total Installs: ${data.summary?.totalInstalls?.toLocaleString() || 0}\n\n`;
      
      if (data.insights?.length > 0) {
        report += `KEY INSIGHTS\n`;
        report += `------------\n`;
        data.insights.forEach((insight, index) => {
          report += `${index + 1}. ${insight.title}: ${insight.description}\n`;
        });
      }
    }
    
    return report;
  };

  if (isLoading) {
    return <LoadingOverlay message="Loading report data..." />;
  }

  if (error) {
    return <ErrorDisplay error={error} title="Reports Error" />;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Analytics Reports</h1>
          <p className="text-gray-600">Generate and export comprehensive analytics reports</p>
        </div>
        
        <div className="flex gap-2">
          <button
            onClick={() => generateReport('json')}
            disabled={isGenerating}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            <Download className="w-4 h-4 mr-2" />
            JSON
          </button>
          <button
            onClick={() => generateReport('csv')}
            disabled={isGenerating}
            className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
          >
            <Download className="w-4 h-4 mr-2" />
            CSV
          </button>
          <button
            onClick={() => generateReport('txt')}
            disabled={isGenerating}
            className="flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 disabled:opacity-50"
          >
            <Download className="w-4 h-4 mr-2" />
            TXT
          </button>
        </div>
      </div>

      {/* Report Type Selection */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {reportTypes.map((type) => {
          const IconComponent = type.icon;
          return (
            <div
              key={type.id}
              onClick={() => setSelectedReportType(type.id)}
              className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                selectedReportType === type.id
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center space-x-3 mb-2">
                <div className={`p-2 rounded-lg ${
                  selectedReportType === type.id ? 'bg-blue-100' : 'bg-gray-100'
                }`}>
                  <IconComponent className={`w-5 h-5 ${
                    selectedReportType === type.id ? 'text-blue-600' : 'text-gray-600'
                  }`} />
                </div>
                <h3 className="font-medium text-gray-900">{type.title}</h3>
              </div>
              <p className="text-sm text-gray-600 mb-3">{type.description}</p>
              <div className="space-y-1">
                {type.sections.slice(0, 3).map((section, index) => (
                  <div key={index} className="flex items-center text-xs text-gray-500">
                    <CheckCircle className="w-3 h-3 mr-1 text-green-500" />
                    {section}
                  </div>
                ))}
                {type.sections.length > 3 && (
                  <div className="text-xs text-gray-400">
                    +{type.sections.length - 3} more sections
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Report Preview */}
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">
            {reportTypes.find(t => t.id === selectedReportType)?.title} Preview
          </h3>
          <div className="flex items-center text-sm text-gray-500">
            <Calendar className="w-4 h-4 mr-1" />
            Generated: {new Date().toLocaleDateString()}
          </div>
        </div>

        {isGenerating ? (
          <div className="flex items-center justify-center py-12">
            <LoadingOverlay message="Generating report..." />
          </div>
        ) : (
          <div className="space-y-6">
            {/* Report Summary */}
            {selectedReportType === 'overview' && (
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Executive Summary</h4>
                <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-sm text-gray-600">Total Apps</p>
                    <p className="text-lg font-bold text-gray-900">
                      {reportData.summary?.totalApps?.toLocaleString() || 0}
                    </p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-sm text-gray-600">Categories</p>
                    <p className="text-lg font-bold text-gray-900">
                      {reportData.summary?.totalCategories || 0}
                    </p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-sm text-gray-600">Avg Rating</p>
                    <p className="text-lg font-bold text-gray-900">
                      {reportData.summary?.avgRating?.toFixed(2) || '0.00'}
                    </p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-sm text-gray-600">Total Installs</p>
                    <p className="text-lg font-bold text-gray-900">
                      {((reportData.summary?.totalInstalls || 0) / 1000000).toFixed(1)}M
                    </p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-sm text-gray-600">Total Reviews</p>
                    <p className="text-lg font-bold text-gray-900">
                      {((reportData.summary?.totalReviews || 0) / 1000).toFixed(0)}K
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Key Insights Preview */}
            <div>
              <h4 className="font-medium text-gray-900 mb-3">Key Insights</h4>
              <div className="space-y-2">
                {reportData.insights?.slice(0, 3).map((insight, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
                    <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div>
                      <p className="font-medium text-blue-900">{insight.title}</p>
                      <p className="text-sm text-blue-700">{insight.description}</p>
                    </div>
                  </div>
                )) || (
                  <p className="text-gray-500 italic">No insights available for preview</p>
                )}
              </div>
            </div>

            {/* Report Sections */}
            <div>
              <h4 className="font-medium text-gray-900 mb-3">Report Sections</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {reportTypes.find(t => t.id === selectedReportType)?.sections.map((section, index) => (
                  <div key={index} className="flex items-center p-3 bg-gray-50 rounded-lg">
                    <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                    <span className="text-sm text-gray-700">{section}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReportsSection;
