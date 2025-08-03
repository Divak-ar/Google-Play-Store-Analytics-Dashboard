import React, { createContext, useContext, useReducer, useCallback } from 'react';

// Action types
const ACTION_TYPES = {
  SET_LOADING: 'SET_LOADING',
  SET_DATA: 'SET_DATA',
  SET_ERROR: 'SET_ERROR',
  SET_SELECTED_APP: 'SET_SELECTED_APP',
  SET_SELECTED_CATEGORY: 'SET_SELECTED_CATEGORY',
  SET_FILTERS: 'SET_FILTERS',
  SET_ACTIVE_SECTION: 'SET_ACTIVE_SECTION',
  RESET_STATE: 'RESET_STATE'
};

// Initial state
const initialState = {
  // Loading states
  isDataLoading: false,
  isAnalyticsLoading: false,
  loadingMessage: '',
  
  // Data
  apps: [],
  reviews: [],
  analytics: null,
  
  // UI state
  selectedApp: null,
  selectedCategory: null,
  activeSection: 'overview',
  filters: {},
  
  // Error handling
  error: null,
  
  // Chart data
  chartData: null
};

// Reducer function
const appReducer = (state, action) => {
  switch (action.type) {
    case ACTION_TYPES.SET_LOADING:
      return {
        ...state,
        [action.payload.type]: action.payload.isLoading,
        loadingMessage: action.payload.message || '',
        error: action.payload.isLoading ? null : state.error
      };

    case ACTION_TYPES.SET_DATA:
      return {
        ...state,
        [action.payload.dataType]: action.payload.data,
        error: null
      };

    case ACTION_TYPES.SET_ERROR:
      return {
        ...state,
        error: action.payload,
        isDataLoading: false,
        isAnalyticsLoading: false,
        loadingMessage: ''
      };

    case ACTION_TYPES.SET_SELECTED_APP:
      return {
        ...state,
        selectedApp: action.payload
      };

    case ACTION_TYPES.SET_SELECTED_CATEGORY:
      return {
        ...state,
        selectedCategory: action.payload
      };

    case ACTION_TYPES.SET_FILTERS:
      return {
        ...state,
        filters: { ...state.filters, ...action.payload }
      };

    case ACTION_TYPES.SET_ACTIVE_SECTION:
      return {
        ...state,
        activeSection: action.payload
      };

    case ACTION_TYPES.RESET_STATE:
      return {
        ...initialState,
        apps: state.apps,
        reviews: state.reviews,
        analytics: state.analytics
      };

    default:
      return state;
  }
};

// Create context
const AppContext = createContext();

// Provider component
export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Action creators
  const setDataLoading = useCallback((isLoading, message = '') => {
    dispatch({
      type: ACTION_TYPES.SET_LOADING,
      payload: { type: 'isDataLoading', isLoading, message }
    });
  }, []);

  const setAnalyticsLoading = useCallback((isLoading, message = '') => {
    dispatch({
      type: ACTION_TYPES.SET_LOADING,
      payload: { type: 'isAnalyticsLoading', isLoading, message }
    });
  }, []);

  const setData = useCallback((dataType, data) => {
    dispatch({
      type: ACTION_TYPES.SET_DATA,
      payload: { dataType, data }
    });
  }, []);

  const setError = useCallback((error) => {
    dispatch({
      type: ACTION_TYPES.SET_ERROR,
      payload: error
    });
  }, []);

  const setSelectedApp = useCallback((app) => {
    dispatch({
      type: ACTION_TYPES.SET_SELECTED_APP,
      payload: app
    });
  }, []);

  const setSelectedCategory = useCallback((category) => {
    dispatch({
      type: ACTION_TYPES.SET_SELECTED_CATEGORY,
      payload: category
    });
  }, []);

  const setFilters = useCallback((filters) => {
    dispatch({
      type: ACTION_TYPES.SET_FILTERS,
      payload: filters
    });
  }, []);

  const setActiveSection = useCallback((section) => {
    dispatch({
      type: ACTION_TYPES.SET_ACTIVE_SECTION,
      payload: section
    });
  }, []);

  const resetState = useCallback(() => {
    dispatch({
      type: ACTION_TYPES.RESET_STATE
    });
  }, []);

  const contextValue = {
    // State
    ...state,
    
    // Actions
    setDataLoading,
    setAnalyticsLoading,
    setData,
    setError,
    setSelectedApp,
    setSelectedCategory,
    setFilters,
    setActiveSection,
    resetState,
    
    // Computed values
    isLoading: state.isDataLoading || state.isAnalyticsLoading,
    hasData: state.apps.length > 0,
    hasAnalytics: !!state.analytics,
    
    // Helper functions
    getSelectedCategoryData: () => {
      if (!state.selectedCategory || !state.analytics) return null;
      return state.analytics.categories?.categoryPerformance?.find(
        cat => cat.category === state.selectedCategory
      ) || null;
    },
    
    getFilteredApps: () => {
      if (!state.apps.length) return [];
      
      let filtered = [...state.apps];
      
      if (state.selectedCategory) {
        filtered = filtered.filter(app => app.category === state.selectedCategory);
      }
      
      if (state.filters.rating) {
        filtered = filtered.filter(app => app.rating >= state.filters.rating);
      }
      
      if (state.filters.category && state.filters.category !== 'all') {
        filtered = filtered.filter(app => app.category === state.filters.category);
      }
      
      return filtered;
    }
  };

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to use the context
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within AppProvider');
  }
  return context;
};

// Export action types for external use
export { ACTION_TYPES };
