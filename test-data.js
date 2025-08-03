// Quick test script to verify data processing
import { processAppsData, processReviewsData } from './src/utils/dataProcessor.js';

// Sample test data to verify our fixes
const testAppData = [
  {
    App: 'Test App',
    Category: 'GAMES',
    Rating: 4.5,
    Reviews: '1000',
    Installs: '10,000+',
    Size: '25M',
    Type: 'Free',
    Price: 0,
    'Content Rating': 'Everyone',
    Genres: 'Action',
    'Last Updated': '2023-01-01',
    'Current Ver': '1.0.0',
    'Android Ver': '4.1 and up'
  },
  {
    App: 'Another App',
    Category: 'TOOLS',
    Rating: null,
    Reviews: 500,
    Installs: 1000,
    Size: 'Varies with device',
    Type: 'Paid',
    Price: '$2.99',
    'Content Rating': 'Teen',
    Genres: 'Productivity',
    'Last Updated': null,
    'Current Ver': 'NaN',
    'Android Ver': null
  }
];

const testReviewData = [
  {
    App: 'Test App',
    Translated_Review: 'Great app!',
    Sentiment: 'Positive',
    Sentiment_Polarity: 0.8,
    Sentiment_Subjectivity: 0.6
  },
  {
    App: 'Another App',
    Translated_Review: null,
    Sentiment: 'Negative',
    Sentiment_Polarity: -0.5,
    Sentiment_Subjectivity: 0.7
  }
];

console.log('Testing data processing...');
console.log('Original app data:', testAppData);

try {
  const processedApps = processAppsData(testAppData);
  console.log('Processed apps data:', processedApps);
  console.log('✅ App data processing successful!');
} catch (error) {
  console.error('❌ App data processing failed:', error);
}

try {
  const processedReviews = processReviewsData(testReviewData);
  console.log('Processed reviews data:', processedReviews);
  console.log('✅ Review data processing successful!');
} catch (error) {
  console.error('❌ Review data processing failed:', error);
}
