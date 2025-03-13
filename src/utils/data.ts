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

// Market Share Top Competitors data
export const marketShareTopCompetitors = [
  { name: 'Your Brand', share: 18.2, monthChange: 2.1, yearChange: 5.4 },
  { name: 'Competitor A', share: 24.5, monthChange: -0.8, yearChange: 3.1 },
  { name: 'Competitor B', share: 16.8, monthChange: 1.3, yearChange: 4.2 },
  { name: 'Competitor C', share: 12.3, monthChange: 0.5, yearChange: -1.2 }
];

// Category market share data
export const categoryMarketShareData = [
  {
    category: 'Women\'s Apparel',
    domains: [
      { name: 'fashionista.com', share: 22.5, monthChange: 1.8, yearChange: 6.3 },
      { name: 'stylehub.com', share: 18.7, monthChange: 0.5, yearChange: 3.1 },
      { name: 'trendyshop.com', share: 15.2, monthChange: 2.3, yearChange: 4.8 },
      { name: 'chicoutlet.com', share: 10.4, monthChange: -0.7, yearChange: 2.1 },
      { name: 'voguefever.com', share: 8.6, monthChange: 1.2, yearChange: 3.5 }
    ]
  },
  {
    category: 'Men\'s Apparel',
    domains: [
      { name: 'mensstyle.com', share: 24.1, monthChange: 2.3, yearChange: 7.2 },
      { name: 'gentsfashion.com', share: 19.5, monthChange: 1.1, yearChange: 4.5 },
      { name: 'suitandtie.com', share: 14.8, monthChange: 0.6, yearChange: 3.8 },
      { name: 'modernman.com', share: 11.2, monthChange: -0.3, yearChange: 1.9 },
      { name: 'dappergents.com', share: 9.8, monthChange: 1.5, yearChange: 4.3 }
    ]
  },
  {
    category: 'Footwear',
    domains: [
      { name: 'shoehaven.com', share: 28.6, monthChange: 3.2, yearChange: 8.5 },
      { name: 'footfashion.com', share: 21.3, monthChange: 1.8, yearChange: 5.4 },
      { name: 'kicksworld.com', share: 16.7, monthChange: 2.5, yearChange: 6.3 },
      { name: 'stepinstyle.com', share: 12.4, monthChange: 0.8, yearChange: 3.1 },
      { name: 'luxurysoles.com', share: 8.9, monthChange: 1.3, yearChange: 4.2 }
    ]
  },
  {
    category: 'Accessories',
    domains: [
      { name: 'accessorize.com', share: 26.8, monthChange: 2.1, yearChange: 7.3 },
      { name: 'bagsandjewels.com', share: 20.5, monthChange: 1.6, yearChange: 4.8 },
      { name: 'fashionextras.com', share: 15.9, monthChange: 0.9, yearChange: 3.5 },
      { name: 'trendyaccents.com', share: 13.2, monthChange: 1.7, yearChange: 5.1 },
      { name: 'stylepieces.com', share: 10.1, monthChange: 0.4, yearChange: 2.2 }
    ]
  },
  {
    category: 'Activewear',
    domains: [
      { name: 'activestyle.com', share: 29.3, monthChange: 3.5, yearChange: 9.7 },
      { name: 'fitnessfashion.com', share: 22.8, monthChange: 2.9, yearChange: 7.5 },
      { name: 'sportylook.com', share: 18.1, monthChange: 1.5, yearChange: 5.2 },
      { name: 'gymgear.com', share: 14.6, monthChange: 2.2, yearChange: 6.8 },
      { name: 'yogastyle.com', share: 10.9, monthChange: 1.1, yearChange: 4.1 }
    ]
  },
  {
    category: 'Luxury',
    domains: [
      { name: 'luxebrands.com', share: 32.4, monthChange: 1.8, yearChange: 6.3 },
      { name: 'highfashion.com', share: 25.1, monthChange: 1.3, yearChange: 4.7 },
      { name: 'designercollection.com', share: 19.5, monthChange: 0.7, yearChange: 3.2 },
      { name: 'fashionelite.com', share: 15.7, monthChange: 2.1, yearChange: 5.4 },
      { name: 'premierstyle.com', share: 11.8, monthChange: 0.9, yearChange: 2.8 }
    ]
  },
  {
    category: 'Casual Wear',
    domains: [
      { name: 'casualchic.com', share: 27.9, monthChange: 2.4, yearChange: 7.1 },
      { name: 'everydaystyle.com', share: 21.6, monthChange: 1.7, yearChange: 5.3 },
      { name: 'comfyclothes.com', share: 17.2, monthChange: 1.2, yearChange: 4.5 },
      { name: 'relaxfashion.com', share: 13.8, monthChange: 0.5, yearChange: 2.9 },
      { name: 'chilloutfit.com', share: 10.3, monthChange: 1.9, yearChange: 5.8 }
    ]
  },
  {
    category: 'Vintage & Retro',
    domains: [
      { name: 'retrochic.com', share: 25.7, monthChange: 3.1, yearChange: 8.2 },
      { name: 'vintagevogue.com', share: 20.9, monthChange: 2.3, yearChange: 6.7 },
      { name: 'oldschoolfashion.com', share: 16.5, monthChange: 1.5, yearChange: 4.9 },
      { name: 'classicstyles.com', share: 13.1, monthChange: 1.9, yearChange: 5.5 },
      { name: 'retrothreads.com', share: 9.7, monthChange: 0.8, yearChange: 3.3 }
    ]
  },
  {
    category: 'Sustainable Fashion',
    domains: [
      { name: 'ecofashion.com', share: 24.3, monthChange: 4.2, yearChange: 12.6 },
      { name: 'sustainablestyle.com', share: 20.1, monthChange: 3.5, yearChange: 9.7 },
      { name: 'greenfashion.com', share: 17.5, monthChange: 2.8, yearChange: 8.3 },
      { name: 'ethicalwear.com', share: 14.2, monthChange: 3.1, yearChange: 10.2 },
      { name: 'ecochic.com', share: 11.6, monthChange: 2.4, yearChange: 7.8 }
    ]
  },
  {
    category: 'Fast Fashion',
    domains: [
      { name: 'quicktrends.com', share: 31.8, monthChange: 2.7, yearChange: 7.5 },
      { name: 'trendexpress.com', share: 24.6, monthChange: 1.9, yearChange: 5.8 },
      { name: 'fastfashionista.com', share: 18.3, monthChange: 2.2, yearChange: 6.4 },
      { name: 'speedystyle.com', share: 14.7, monthChange: 1.5, yearChange: 4.3 },
      { name: 'trendyfast.com', share: 10.9, monthChange: 2.1, yearChange: 5.9 }
    ]
  }
];

// Market share trend data (12 months)
export const marketShareTrendData = [
  { month: 'Apr', yourShare: 13.5, competitorAShare: 25.3, competitorBShare: 15.5, competitorCShare: 11.8 },
  { month: 'May', yourShare: 14.2, competitorAShare: 25.1, competitorBShare: 15.7, competitorCShare: 11.9 },
  { month: 'Jun', yourShare: 14.8, competitorAShare: 24.9, competitorBShare: 16.1, competitorCShare: 12.0 },
  { month: 'Jul', yourShare: 15.3, competitorAShare: 24.8, competitorBShare: 16.3, competitorCShare: 12.1 },
  { month: 'Aug', yourShare: 15.9, competitorAShare: 24.7, competitorBShare: 16.5, competitorCShare: 12.1 },
  { month: 'Sep', yourShare: 16.4, competitorAShare: 24.6, competitorBShare: 16.6, competitorCShare: 12.2 },
  { month: 'Oct', yourShare: 16.8, competitorAShare: 24.5, competitorBShare: 16.7, competitorCShare: 12.2 },
  { month: 'Nov', yourShare: 17.1, competitorAShare: 24.5, competitorBShare: 16.7, competitorCShare: 12.3 },
  { month: 'Dec', yourShare: 17.5, competitorAShare: 24.5, competitorBShare: 16.8, competitorCShare: 12.3 },
  { month: 'Jan', yourShare: 17.8, competitorAShare: 24.5, competitorBShare: 16.8, competitorCShare: 12.3 },
  { month: 'Feb', yourShare: 18.0, competitorAShare: 24.5, competitorBShare: 16.8, competitorCShare: 12.3 },
  { month: 'Mar', yourShare: 18.2, competitorAShare: 24.5, competitorBShare: 16.8, competitorCShare: 12.3 }
];
