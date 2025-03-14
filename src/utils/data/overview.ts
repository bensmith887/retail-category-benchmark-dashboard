
// Overview page data (metrics, filters, insights)

// Metrics data for overview page
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

// Market Share data for the line chart
export const marketShareData = [
  { month: 'Oct', yourShare: 14.8, competitorShare: 17.2 },
  { month: 'Nov', yourShare: 15.2, competitorShare: 17.0 },
  { month: 'Dec', yourShare: 16.5, competitorShare: 16.5 },
  { month: 'Jan', yourShare: 17.2, competitorShare: 16.0 },
  { month: 'Feb', yourShare: 18.0, competitorShare: 15.7 },
  { month: 'Mar', yourShare: 18.2, competitorShare: 15.3 }
];
