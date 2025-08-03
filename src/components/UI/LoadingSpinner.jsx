import React from 'react';
import { Loader2, BarChart3, Activity } from 'lucide-react';

/**
 * Enhanced loading spinner component with multiple styles and animations
 * @param {Object} props - Component props
 * @param {string} props.message - Loading message
 * @param {string} props.size - Size variant ('sm', 'md', 'lg', 'xl')
 * @param {boolean} props.fullScreen - Whether to show as full screen overlay
 * @param {string} props.type - Spinner type ('default', 'pulse', 'chart', 'dots', 'bars')
 * @param {string} props.color - Color theme ('blue', 'green', 'purple', 'gray')
 */
const LoadingSpinner = ({ 
  message = 'Loading analytics...', 
  size = 'md', 
  fullScreen = false,
  type = 'default',
  color = 'blue'
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  };

  const colorClasses = {
    blue: 'text-blue-600',
    green: 'text-emerald-600',
    purple: 'text-purple-600',
    gray: 'text-gray-600'
  };

  const containerClasses = fullScreen
    ? 'fixed inset-0 bg-white/90 backdrop-blur-sm flex items-center justify-center z-50'
    : 'flex items-center justify-center p-8';

  const SpinnerIcon = () => {
    const baseClasses = `${sizeClasses[size]} ${colorClasses[color]}`;
    
    switch (type) {
      case 'pulse':
        return (
          <div className="relative">
            <div className={`${baseClasses} animate-pulse`}>
              <BarChart3 />
            </div>
            <div className="absolute inset-0 rounded-full border-2 border-current opacity-25 animate-ping"></div>
          </div>
        );
      
      case 'chart':
        return (
          <div className="relative">
            <BarChart3 className={`${baseClasses} animate-bounce`} />
            <div className="absolute -inset-2 rounded-full border-2 border-current opacity-20 animate-spin"></div>
          </div>
        );
      
      case 'dots':
        return (
          <div className="flex space-x-1">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className={`w-2 h-2 ${colorClasses[color]} bg-current rounded-full animate-bounce`}
                style={{ animationDelay: `${i * 0.1}s` }}
              />
            ))}
          </div>
        );
      
      case 'bars':
        return (
          <div className="flex items-end space-x-1">
            {[0, 1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className={`w-1 bg-current ${colorClasses[color]} animate-pulse`}
                style={{ 
                  height: `${8 + (i % 3) * 4}px`,
                  animationDelay: `${i * 0.15}s`,
                  animationDuration: '1s'
                }}
              />
            ))}
          </div>
        );
      
      case 'activity':
        return <Activity className={`${baseClasses} animate-pulse`} />;
      
      default:
        return <Loader2 className={`${baseClasses} animate-spin`} />;
    }
  };

  const LoadingContent = () => (
    <div className="flex flex-col items-center space-y-4">
      <SpinnerIcon />
      {message && (
        <div className="text-center">
          <p className={`font-medium ${colorClasses[color]} ${
            size === 'sm' ? 'text-sm' : 
            size === 'lg' || size === 'xl' ? 'text-lg' : 'text-base'
          }`}>
            {message}
          </p>
          {fullScreen && (
            <p className="text-sm text-gray-500 mt-1">
              Please wait while we process your data
            </p>
          )}
        </div>
      )}
      
      {/* Animated progress indicator for full screen */}
      {fullScreen && (
        <div className="w-48 h-1 bg-gray-200 rounded-full overflow-hidden">
          <div className={`h-full bg-current ${colorClasses[color]} animate-pulse`} 
               style={{ width: '60%', transition: 'width 0.3s ease' }} />
        </div>
      )}
    </div>
  );

  return (
    <div className={containerClasses}>
      {fullScreen ? (
        <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
          <LoadingContent />
        </div>
      ) : (
        <LoadingContent />
      )}
    </div>
  );
};

/**
 * Chart skeleton loader component
 */
export const ChartSkeleton = ({ height = 'h-64', className = '' }) => (
  <div className={`${height} ${className} bg-gray-100 rounded-lg animate-pulse flex items-center justify-center`}>
    <div className="flex space-x-2">
      {[1, 2, 3, 4, 5].map((i) => (
        <div
          key={i}
          className="bg-gray-300 rounded animate-pulse"
          style={{
            width: '12px',
            height: `${20 + (i % 3) * 15}px`,
            animationDelay: `${i * 0.1}s`
          }}
        />
      ))}
    </div>
  </div>
);

/**
 * Loading overlay component
 */
export const LoadingOverlay = ({ message = 'Loading...', size = 'md' }) => (
  <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-10">
    <LoadingSpinner message={message} size={size} type="chart" />
  </div>
);

export default LoadingSpinner;
