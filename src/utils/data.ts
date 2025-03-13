
// Sample data for the dashboard

// Market Share data for the line chart
export const marketShareData = [
  { month: 'Oct', yourShare: 14.8, competitorShare: 17.2 },
  { month: 'Nov', yourShare: 15.2, competitorShare: 17.0 },
  { month: 'Dec', yourShare: 16.5, competitorShare: 16.5 },
  { month: 'Jan', yourShare: 17.2, competitorShare: 16.0 },
  { month: 'Feb', yourShare: 18.0, competitorShare: 15.7 },
  { month: 'Mar', yourShare: 18.2, competitorShare: 15.3 }
];

// Competitor comparison data
export const competitorData = [
  { name: 'Your Brand', marketShare: 18.2, price: 42.99, traffic: 243000, growth: 14.5, performance: 78 },
  { name: 'Competitor A', marketShare: 24.5, price: 45.50, traffic: 356000, growth: 8.2, performance: 92 },
  { name: 'Competitor B', marketShare: 16.8, price: 59.99, traffic: 198000, growth: 11.7, performance: 65 },
  { name: 'Competitor C', marketShare: 12.3, price: 29.99, traffic: 176000, growth: 21.4, performance: 58 },
  { name: 'Competitor D', marketShare: 14.7, price: 39.99, traffic: 205000, growth: 6.8, performance: 70 }
];

// Pricing benchmark data for the bar chart
export const pricingData = [
  { name: 'Your Brand', price: 42.99 },
  { name: 'Competitor A', price: 45.50 },
  { name: 'Competitor B', price: 59.99 },
  { name: 'Competitor C', price: 29.99 },
  { name: 'Competitor D', price: 39.99 }
];

// Insight cards data
export const insightData = [
  {
    title: 'Growth Opportunity',
    description: 'Premium segment growing 24% faster than overall market. Consider expanding premium product line.',
    type: 'opportunity'
  },
  {
    title: 'Competitive Threat',
    description: 'Competitor C has reduced prices by 15% in the last month, gaining 2.4% market share.',
    type: 'threat'
  },
  {
    title: 'Positive Trend',
    description: 'Your brand has shown consistent growth in market share for 6 consecutive months.',
    type: 'positive'
  },
  {
    title: 'Recommendation',
    description: 'Increase marketing spend in high-growth regions to capitalize on positive momentum.',
    type: 'recommendation'
  }
];

// Tab data
export const tabsData = [
  { id: 'overview', name: 'Overview' },
  { id: 'market-share', name: 'Market Share' },
  { id: 'pricing', name: 'Pricing' },
  { id: 'traffic-sources', name: 'Traffic Sources' },
  { id: 'product-performance', name: 'Product Performance' }
];

// Metrics data
export const metricsData = [
  { 
    id: 'market-share', 
    label: 'Market Share', 
    value: '18.2%', 
    change: '+2.1%', 
    isPositive: true 
  },
  { 
    id: 'category-growth', 
    label: 'Category Growth', 
    value: '14.5%', 
    change: '+3.8%', 
    isPositive: true 
  },
  { 
    id: 'avg-price', 
    label: 'Avg. Price Point', 
    value: '$42.99', 
    change: '-1.5%', 
    isPositive: false 
  },
  { 
    id: 'conversion-rate', 
    label: 'Conversion Rate', 
    value: '3.8%', 
    change: '+0.4%', 
    isPositive: true 
  }
];

// Filter pills data
export const filtersData = [
  { id: 'category', label: 'Category: Electronics' },
  { id: 'timeframe', label: 'Last 6 Months' },
  { id: 'competitors', label: 'Top 5 Competitors' }
];
