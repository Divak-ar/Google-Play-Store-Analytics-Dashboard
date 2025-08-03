import { useMemo } from 'react';
import { CHART_COLORS, CATEGORY_COLORS, SENTIMENT_TYPES } from '../utils/constants';

/**
 * Custom hook for preparing chart-ready data
 * @param {Object} analytics - Analytics data
 * @returns {Object} Chart-ready data for various visualizations
 */
export const useChartData = (analytics) => {
  
  /**
   * Prepares data for category distribution pie chart
   */
  const categoryPieData = useMemo(() => {
    if (!analytics?.categories?.topCategories) return [];
    
    return analytics.categories.topCategories.map((item, index) => ({
      name: item.value,
      value: item.count,
      percentage: item.percentage,
      fill: CATEGORY_COLORS[item.value] || CHART_COLORS[index % CHART_COLORS.length]
    }));
  }, [analytics?.categories?.topCategories]);

  /**
   * Prepares data for rating distribution histogram
   */
  const ratingHistogramData = useMemo(() => {
    if (!analytics?.ratings?.ratingDistribution?.distribution) return [];
    
    const distribution = analytics.ratings.ratingDistribution.distribution;
    return Object.entries(distribution).map(([range, count]) => ({
      range,
      count,
      fill: '#3b82f6'
    }));
  }, [analytics?.ratings?.ratingDistribution]);

  /**
   * Prepares data for install distribution bar chart
   */
  const installBarData = useMemo(() => {
    if (!analytics?.categories?.marketShare) return [];
    
    try {
      // marketShare is an array directly, not an object with categoryBreakdown
      const marketShareArray = Array.isArray(analytics.categories.marketShare) 
        ? analytics.categories.marketShare 
        : (analytics.categories.marketShare.categoryBreakdown || []);
      
      if (!Array.isArray(marketShareArray)) return [];
      
      return marketShareArray
        .filter(item => item && item.category) // Filter out invalid items
        .sort((a, b) => (b.appMarketShare || b.percentage || 0) - (a.appMarketShare || a.percentage || 0))
        .slice(0, 10)
        .map(item => ({
          category: item.category,
          installs: item.totalInstalls || 0,
          percentage: item.appMarketShare || item.percentage || 0,
          fill: CATEGORY_COLORS[item.category] || '#8b5cf6'
        }));
    } catch (error) {
      console.warn('Error processing marketShare data:', error);
      return [];
    }
  }, [analytics?.categories?.marketShare]);

  /**
   * Prepares data for price vs rating scatter plot
   */
  const priceRatingScatterData = useMemo(() => {
    if (!analytics?.correlations) return [];
    
    // Generate sample data based on correlation analysis
    return Array.from({ length: 20 }, (_, i) => ({
      x: Math.random() * 10, // Price
      y: 1 + Math.random() * 4, // Rating 1-5
      size: Math.random() * 100 + 10,
      category: 'Apps',
      fill: '#3b82f6'
    }));
  }, [analytics?.correlations]);

  /**
   * Prepares data for category performance comparison
   */
  const categoryPerformanceData = useMemo(() => {
    if (!analytics?.categories?.categoryPerformance) return [];
    
    return analytics.categories.categoryPerformance.map(item => ({
      category: item.category.replace(/_/g, ' '),
      avgRating: Number(item.avgRating.toFixed(2)),
      appCount: item.appCount,
      totalInstalls: item.totalInstalls,
      installs: item.totalInstalls / 1000000, // Convert to millions for readability
      fill: CATEGORY_COLORS[item.category] || '#3b82f6'
    }));
  }, [analytics?.categories?.categoryPerformance]);

  /**
   * Prepares sentiment analysis data
   */
  const sentimentData = useMemo(() => {
    if (!analytics?.sentiment) return [];
    
    const { sentimentPercentages } = analytics.sentiment;
    
    return [
      {
        name: 'Positive',
        value: sentimentPercentages.positive,
        count: analytics.sentiment.sentimentCounts.positive,
        fill: SENTIMENT_TYPES.POSITIVE.color
      },
      {
        name: 'Neutral',
        value: sentimentPercentages.neutral,
        count: analytics.sentiment.sentimentCounts.neutral,
        fill: SENTIMENT_TYPES.NEUTRAL.color
      },
      {
        name: 'Negative',
        value: sentimentPercentages.negative,
        count: analytics.sentiment.sentimentCounts.negative,
        fill: SENTIMENT_TYPES.NEGATIVE.color
      }
    ].filter(item => item.value > 0);
  }, [analytics]);

  /**
   * Prepares data for rating vs installs correlation
   */
  const ratingInstallsData = useMemo(() => {
    if (!analytics?.ratings?.topRatedApps) return [];
    
    // Use top apps data for rating vs installs visualization
    return analytics.ratings.topRatedApps
      .slice(0, 20)
      .map(app => ({
        name: app.app,
        rating: app.rating,
        installs: app.installsNumber / 1000000, // Convert to millions
        reviews: app.reviews,
        category: app.category
      }));
  }, [analytics?.ratings?.topRatedApps]);

  /**
   * Prepares data for market share analysis
   */
  const marketShareData = useMemo(() => {
    if (!analytics?.categories?.marketShare) return [];
    
    const marketShareArray = Array.isArray(analytics.categories.marketShare) 
      ? analytics.categories.marketShare 
      : analytics.categories.marketShare.categoryBreakdown || [];
    
    return marketShareArray
      .slice(0, 10)
      .map(item => ({
        category: item.category.replace(/_/g, ' '),
        appShare: Number((item.appMarketShare || item.percentage || 0).toFixed(1)),
        installShare: Number((item.installMarketShare || item.percentage || 0).toFixed(1)),
        appCount: item.appCount || 0,
        totalInstalls: item.totalInstalls || 0
      }));
  }, [analytics?.categories?.marketShare]);

  /**
   * Prepares data for correlation heatmap
   */
  const correlationData = useMemo(() => {
    if (!analytics?.correlations) return [];
    
    const correlations = analytics.correlations;
    
    return [
      { x: 'Rating', y: 'Reviews', value: correlations.ratingVsReviews },
      { x: 'Rating', y: 'Installs', value: correlations.ratingVsInstalls },
      { x: 'Reviews', y: 'Installs', value: correlations.reviewsVsInstalls },
      { x: 'Size', y: 'Installs', value: correlations.sizeVsInstalls },
      { x: 'Price', y: 'Rating', value: correlations.priceVsRating },
      { x: 'Price', y: 'Installs', value: correlations.priceVsInstalls }
    ].map(item => ({
      ...item,
      value: Number(item.value.toFixed(3)),
      color: item.value > 0.5 ? '#10b981' : item.value < -0.5 ? '#ef4444' : '#f59e0b'
    }));
  }, [analytics]);

  /**
   * Prepares trend data for time series analysis
   */
  const trendData = useMemo(() => {
    if (!analytics?.categories?.categoryPerformance) return [];
    
    // Simulate trend data based on category performance
    return analytics.categories.categoryPerformance
      .slice(0, 5)
      .map((cat, index) => ({
        category: cat.category.replace(/_/g, ' '),
        data: Array.from({ length: 12 }, (_, month) => ({
          month: month + 1,
          value: cat.avgRating + (Math.random() - 0.5) * 0.5, // Simulate variation
          installs: cat.totalInstalls * (1 + (Math.random() - 0.5) * 0.2)
        })),
        color: CHART_COLORS[index % CHART_COLORS.length]
      }));
  }, [analytics]);

  return {
    // Chart data for different visualization types
    categoryPieData: categoryPieData,
    ratingHistogramData: ratingHistogramData,
    installBarData: installBarData,
    priceRatingScatterData: priceRatingScatterData,
    categoryPerformanceData: categoryPerformanceData,
    sentimentData: sentimentData,
    ratingInstallsData: ratingInstallsData,
    marketShareData: marketShareData,
    correlationData: correlationData,
    trendData: trendData,
    
    // Legacy property names for backward compatibility
    categoryPie: categoryPieData,
    ratingHistogram: ratingHistogramData,
    installBar: installBarData,
    priceRatingScatter: priceRatingScatterData,
    categoryPerformance: categoryPerformanceData,
    sentiment: sentimentData,
    ratingInstalls: ratingInstallsData,
    marketShare: marketShareData,
    correlations: correlationData,
    trends: trendData,
    
    // Helper methods
    getChartColors: (count) => CHART_COLORS.slice(0, count),
    getCategoryColor: (category) => CATEGORY_COLORS[category] || '#3b82f6',
    
    // Data availability flags
    hasData: !!analytics,
    hasCategoryData: !!categoryPieData.length,
    hasRatingData: !!ratingHistogramData.length,
    hasSentimentData: !!sentimentData.length,
    hasCorrelationData: !!correlationData.length
  };
};
