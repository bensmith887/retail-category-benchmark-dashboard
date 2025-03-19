
import * as React from "react";

export type TabName = 
  | "home" 
  | "price-elasticity" 
  | "promotions" 
  | "promotions-v2"
  | "fashion-analytics";

export interface TabType {
  id: TabName;
  name: string;
  icon: string;
}

export const tabsData: TabType[] = [
  {
    id: "home",
    name: "Overview",
    icon: "Home"
  },
  {
    id: "price-elasticity",
    name: "Price Elasticity",
    icon: "LineChart"
  },
  {
    id: "promotions",
    name: "Promotions",
    icon: "BarChart"
  },
  {
    id: "promotions-v2",
    name: "Promotions V2",
    icon: "PieChart"
  },
  {
    id: "fashion-analytics",
    name: "Fashion Analytics",
    icon: "Shirt"
  }
];

export interface StatCardType {
  title: string;
  value: string;
  trend: number;
  path: string;
}

export const statsData: StatCardType[] = [
  {
    title: "Avg. Elasticity",
    value: "-1.21",
    trend: -12,
    path: "/price-elasticity"
  },
  {
    title: "Promotion Lift",
    value: "+14.2%",
    trend: 8,
    path: "/promotions"
  },
  {
    title: "Optimal Discount",
    value: "22%",
    trend: 5,
    path: "/promotions-v2"
  },
  {
    title: "Market Share",
    value: "18.5%",
    trend: 7,
    path: "/fashion-analytics"
  }
];

export const trendingStats = [
  {
    category: "Baby Products",
    elasticity: -1.53,
    trend: -0.24,
    month: "July"
  },
  {
    category: "Books",
    elasticity: -0.96,
    trend: -0.18,
    month: "December"
  },
  {
    category: "Home Decor",
    elasticity: -0.87,
    trend: 0.05,
    month: "January"
  },
  {
    category: "Electronics",
    elasticity: -0.76,
    trend: -0.02,
    month: "November"
  },
  {
    category: "Women's Apparel",
    elasticity: -1.02,
    trend: 0.14,
    month: "April"
  }
];

// Add missing data for CompetitorTable.tsx
export const competitorData = [
  {
    name: "Your Brand",
    marketShare: 18.5,
    price: 89.99,
    traffic: 4250000,
    growth: 7.2,
    performance: 91
  },
  {
    name: "Competitor A",
    marketShare: 24.3,
    price: 95.99,
    traffic: 5650000,
    growth: 3.8,
    performance: 86
  },
  {
    name: "Competitor B",
    marketShare: 15.8,
    price: 79.99,
    traffic: 3650000,
    growth: 5.1,
    performance: 78
  },
  {
    name: "Competitor C",
    marketShare: 12.7,
    price: 85.99,
    traffic: 2950000,
    growth: -1.3,
    performance: 72
  },
  {
    name: "Competitor D",
    marketShare: 9.5,
    price: 69.99,
    traffic: 2250000,
    growth: 8.4,
    performance: 81
  },
];

// Add missing data for Header.tsx
export const filtersData = [
  { id: 'category', name: 'Categories', values: ['Electronics', 'Fashion', 'Home Decor', 'Beauty', 'Sports'] },
  { id: 'timeframe', name: 'Time Period', values: ['Last 3 Months', 'Last 6 Months', 'Last 12 Months', 'Custom'] },
  { id: 'traffic-domains', name: 'Traffic Domains', values: ['All', 'Desktop Only', 'Mobile Only'] },
  { id: 'retail-domains', name: 'Retail IQ Domains', values: ['All', 'Fashion', 'Electronics', 'Specialty'] }
];

// Add missing data for KeywordCategoryShareView.tsx
export const keywordGroups = [
  { id: 'summer-fashion', name: 'Summer Fashion' },
  { id: 'denim-wear', name: 'Denim Wear' },
  { id: 'athleisure', name: 'Athleisure' },
  { id: 'formal-wear', name: 'Formal Wear' },
  { id: 'accessories', name: 'Accessories' }
];

export const sampleKeywordShareData = [
  { domain: 'yourstore.com', share: 24.5 },
  { domain: 'competitor1.com', share: 18.2 },
  { domain: 'competitor2.com', share: 15.7 },
  { domain: 'competitor3.com', share: 12.3 },
  { domain: 'competitor4.com', share: 8.6 },
  { domain: 'competitor5.com', share: 6.9 },
  { domain: 'competitor6.com', share: 5.4 },
  { domain: 'competitor7.com', share: 3.8 },
  { domain: 'competitor8.com', share: 2.7 },
  { domain: 'competitor9.com', share: 1.9 }
];

// Add missing data for MarketShareView.tsx
export const marketShareTopCompetitors = [
  { name: 'Your Brand', share: 18.5, monthChange: 1.2, yearChange: 7.5 },
  { name: 'Competitor A', share: 24.3, monthChange: 0.5, yearChange: 2.8 },
  { name: 'Competitor B', share: 15.8, monthChange: -0.7, yearChange: -3.1 },
  { name: 'Competitor C', share: 12.7, monthChange: 1.8, yearChange: 5.2 }
];

export const categoryMarketShareData = [
  {
    category: 'Women\'s Apparel',
    domains: [
      { name: 'yourstore.com', share: 16.8, monthChange: 1.3, yearChange: 6.5 },
      { name: 'competitor1.com', share: 22.3, monthChange: 0.4, yearChange: 2.1 },
      { name: 'competitor2.com', share: 14.7, monthChange: -0.6, yearChange: -2.5 },
      { name: 'competitor3.com', share: 11.2, monthChange: 1.5, yearChange: 4.6 },
      { name: 'competitor4.com', share: 8.9, monthChange: 0.7, yearChange: 3.2 }
    ]
  },
  {
    category: 'Men\'s Apparel',
    domains: [
      { name: 'yourstore.com', share: 19.2, monthChange: 1.1, yearChange: 8.3 },
      { name: 'competitor1.com', share: 25.6, monthChange: 0.3, yearChange: 1.9 },
      { name: 'competitor2.com', share: 16.3, monthChange: -0.8, yearChange: -3.5 },
      { name: 'competitor3.com', share: 13.1, monthChange: 1.6, yearChange: 4.8 },
      { name: 'competitor4.com', share: 9.8, monthChange: 0.5, yearChange: 2.7 }
    ]
  }
];

export const marketShareTrendData = [
  { month: 'Jan', yourShare: 17.2, competitorAShare: 24.1, competitorBShare: 15.5, competitorCShare: 11.8 },
  { month: 'Feb', yourShare: 17.5, competitorAShare: 24.0, competitorBShare: 15.7, competitorCShare: 11.9 },
  { month: 'Mar', yourShare: 17.3, competitorAShare: 24.2, competitorBShare: 15.8, competitorCShare: 12.0 },
  { month: 'Apr', yourShare: 17.6, competitorAShare: 24.3, competitorBShare: 15.9, competitorCShare: 12.1 },
  { month: 'May', yourShare: 17.8, competitorAShare: 24.5, competitorBShare: 16.0, competitorCShare: 12.3 },
  { month: 'Jun', yourShare: 18.0, competitorAShare: 24.4, competitorBShare: 16.1, competitorCShare: 12.5 },
  { month: 'Jul', yourShare: 18.1, competitorAShare: 24.3, competitorBShare: 16.0, competitorCShare: 12.6 },
  { month: 'Aug', yourShare: 18.2, competitorAShare: 24.2, competitorBShare: 15.9, competitorCShare: 12.7 },
  { month: 'Sep', yourShare: 18.5, competitorAShare: 24.3, competitorBShare: 15.8, competitorCShare: 12.7 },
  { month: 'Oct', yourShare: 18.7, competitorAShare: 24.4, competitorBShare: 15.6, competitorCShare: 12.5 },
  { month: 'Nov', yourShare: 18.9, competitorAShare: 24.5, competitorBShare: 15.5, competitorCShare: 12.4 },
  { month: 'Dec', yourShare: 19.2, competitorAShare: 24.3, competitorBShare: 15.4, competitorCShare: 12.3 }
];

// Add missing data for charts/LineChart.tsx
export const marketShareData = [
  { month: 'Jan', yourShare: 17.2, competitorShare: 24.1 },
  { month: 'Feb', yourShare: 17.5, competitorShare: 24.0 },
  { month: 'Mar', yourShare: 17.3, competitorShare: 24.2 },
  { month: 'Apr', yourShare: 17.6, competitorShare: 24.3 },
  { month: 'May', yourShare: 17.8, competitorShare: 24.5 },
  { month: 'Jun', yourShare: 18.0, competitorShare: 24.4 },
  { month: 'Jul', yourShare: 18.1, competitorShare: 24.3 },
  { month: 'Aug', yourShare: 18.2, competitorShare: 24.2 },
  { month: 'Sep', yourShare: 18.5, competitorShare: 24.3 },
  { month: 'Oct', yourShare: 18.7, competitorShare: 24.4 },
  { month: 'Nov', yourShare: 18.9, competitorShare: 24.5 },
  { month: 'Dec', yourShare: 19.2, competitorShare: 24.3 }
];

// Add missing data for charts/BarChart.tsx and PricingView.tsx
export const pricingData = [
  { name: 'Your Brand', price: 89.99 },
  { name: 'Competitor A', price: 95.99 },
  { name: 'Competitor B', price: 79.99 },
  { name: 'Competitor C', price: 85.99 },
  { name: 'Competitor D', price: 69.99 },
  { name: 'Category Average', price: 84.39 }
];

// Add missing data for Index.tsx and other components
export const metricsData = [
  { id: 'revenue', label: 'Revenue', value: '$4.2M', change: '+12.3%', isPositive: true },
  { id: 'traffic', label: 'Traffic', value: '3.8M', change: '+8.5%', isPositive: true },
  { id: 'conversion', label: 'Conversion', value: '2.4%', change: '-1.3%', isPositive: false },
  { id: 'aov', label: 'Avg. Order Value', value: '$68.50', change: '+6.7%', isPositive: true }
];

export const insightData = [
  {
    title: "Pricing Opportunity",
    description: "Prices for summer dresses are 15% higher than competitors with elastic demand - consider adjusting for higher revenue.",
    type: "opportunity"
  },
  {
    title: "Traffic Threat",
    description: "Competitor A increased marketing spend 32% in the last month, affecting your category share.",
    type: "threat"
  },
  {
    title: "Conversion Improvement",
    description: "Checkout flow optimizations increased conversion rate by 8% for mobile users.",
    type: "positive"
  },
  {
    title: "Targeting Recommendation",
    description: "Increase email marketing focus on abandoned carts - 2.5x higher conversion rate than social media.",
    type: "recommendation"
  }
];

// Add missing data for ProductPerformanceView.tsx
export const productPerformanceData = [
  { id: 1, name: 'Summer Sundress', category: 'Women\'s Apparel', description: 'Lightweight summer dress with floral pattern', pageViews: 185000, monthChange: 14.5, yearChange: 28.7 },
  { id: 2, name: 'Men\'s Slim Jeans', category: 'Men\'s Apparel', description: 'Slim fit jeans in dark wash', pageViews: 162000, monthChange: 8.2, yearChange: 17.3 },
  { id: 3, name: 'Athletic Sneakers', category: 'Footwear', description: 'Running shoes with support cushioning', pageViews: 143000, monthChange: 12.7, yearChange: 23.5 },
  { id: 4, name: 'Casual T-Shirt', category: 'Men\'s Apparel', description: 'Cotton t-shirt in various colors', pageViews: 138000, monthChange: 5.8, yearChange: 13.2 },
  { id: 5, name: 'Women\'s Blazer', category: 'Women\'s Apparel', description: 'Professional women\'s blazer in navy', pageViews: 129000, monthChange: -2.1, yearChange: 8.5 },
  { id: 6, name: 'Summer Shorts', category: 'Men\'s Apparel', description: 'Casual summer shorts in khaki', pageViews: 124000, monthChange: 18.3, yearChange: 31.7 },
  { id: 7, name: 'Crossbody Bag', category: 'Accessories', description: 'Leather crossbody bag in tan', pageViews: 118000, monthChange: 9.5, yearChange: 19.8 },
  { id: 8, name: 'Yoga Pants', category: 'Activewear', description: 'High-waisted yoga pants in black', pageViews: 115000, monthChange: 13.9, yearChange: 27.4 },
  { id: 9, name: 'Dress Shirt', category: 'Men\'s Apparel', description: 'Men\'s button-up dress shirt', pageViews: 109000, monthChange: -1.2, yearChange: 7.3 },
  { id: 10, name: 'Women\'s Sandals', category: 'Footwear', description: 'Summer sandals with ankle strap', pageViews: 104000, monthChange: 17.2, yearChange: 29.6 }
];

// Add missing data for TrafficSourcesView.tsx
export const trafficSourcesData = [
  { name: 'Organic Search', value: 42.5 },
  { name: 'Direct', value: 28.2 },
  { name: 'Referral', value: 14.3 },
  { name: 'Social', value: 8.7 },
  { name: 'Email', value: 3.8 },
  { name: 'Display', value: 2.5 }
];

export const trafficSourceTrendData = [
  { month: 'Apr', organic: 41.2, direct: 27.8, referral: 13.9, social: 8.3, email: 3.5, paid: 5.3 },
  { month: 'May', organic: 41.5, direct: 27.9, referral: 14.0, social: 8.4, email: 3.6, paid: 4.6 },
  { month: 'Jun', organic: 41.8, direct: 28.0, referral: 14.1, social: 8.5, email: 3.7, paid: 3.9 },
  { month: 'Jul', organic: 42.0, direct: 28.1, referral: 14.2, social: 8.6, email: 3.7, paid: 3.4 },
  { month: 'Aug', organic: 42.3, direct: 28.2, referral: 14.3, social: 8.7, email: 3.7, paid: 2.8 },
  { month: 'Sep', organic: 42.5, direct: 28.3, referral: 14.4, social: 8.8, email: 3.8, paid: 2.2 }
];

export const categoryTrafficData = [
  {
    category: 'Women\'s Apparel',
    sources: [
      { name: 'Organic Search', value: 45.2 },
      { name: 'Direct', value: 25.8 },
      { name: 'Referral', value: 12.4 },
      { name: 'Social', value: 11.3 },
      { name: 'Email', value: 3.2 },
      { name: 'Display', value: 2.1 }
    ]
  },
  {
    category: 'Men\'s Apparel',
    sources: [
      { name: 'Organic Search', value: 43.7 },
      { name: 'Direct', value: 30.4 },
      { name: 'Referral', value: 13.8 },
      { name: 'Social', value: 6.5 },
      { name: 'Email', value: 3.6 },
      { name: 'Display', value: 2.0 }
    ]
  },
  {
    category: 'Footwear',
    sources: [
      { name: 'Organic Search', value: 47.3 },
      { name: 'Direct', value: 24.5 },
      { name: 'Referral', value: 15.2 },
      { name: 'Social', value: 7.8 },
      { name: 'Email', value: 3.1 },
      { name: 'Display', value: 2.1 }
    ]
  },
  {
    category: 'Accessories',
    sources: [
      { name: 'Organic Search', value: 38.6 },
      { name: 'Direct', value: 26.4 },
      { name: 'Referral', value: 14.7 },
      { name: 'Social', value: 14.2 },
      { name: 'Email', value: 4.1 },
      { name: 'Display', value: 2.0 }
    ]
  },
  {
    category: 'Beauty',
    sources: [
      { name: 'Organic Search', value: 39.8 },
      { name: 'Direct', value: 23.7 },
      { name: 'Referral', value: 13.5 },
      { name: 'Social', value: 16.8 },
      { name: 'Email', value: 4.3 },
      { name: 'Display', value: 1.9 }
    ]
  }
];

export const competitorSourceBenchmarks = {
  search: {
    'Your Brand': { share: 42.5, yearChange: 3.2, indexToAvg: 1.05 },
    'Competitor A': { share: 38.2, yearChange: 1.8, indexToAvg: 0.94 }
  },
  direct: {
    'Your Brand': { share: 28.2, yearChange: 1.5, indexToAvg: 0.97 },
    'Competitor A': { share: 32.5, yearChange: 2.1, indexToAvg: 1.12 }
  },
  social: {
    'Your Brand': { share: 8.3, yearChange: 2.7, indexToAvg: 0.87 },
    'Competitor A': { share: 10.5, yearChange: 3.4, indexToAvg: 1.11 }
  }
};

// Add missing data for PromotionEffectivenessView.tsx
export const dailyTrafficData = [
  { date: '2023-04-01', traffic: 152000, conversion: 2.2 },
  { date: '2023-04-02', traffic: 148000, conversion: 2.1 },
  { date: '2023-04-03', traffic: 162000, conversion: 2.3 },
  { date: '2023-04-04', traffic: 145000, conversion: 2.0 },
  { date: '2023-04-05', traffic: 167000, conversion: 2.4 },
  { date: '2023-04-06', traffic: 178000, conversion: 2.5 },
  { date: '2023-04-07', traffic: 185000, conversion: 2.6 },
  { date: '2023-04-08', traffic: 191000, conversion: 2.7 },
  { date: '2023-04-09', traffic: 197000, conversion: 2.8 },
  { date: '2023-04-10', traffic: 185000, conversion: 2.6 },
  { date: '2023-04-11', traffic: 178000, conversion: 2.5 },
  { date: '2023-04-12', traffic: 172000, conversion: 2.4 },
  { date: '2023-04-13', traffic: 168000, conversion: 2.3 },
  { date: '2023-04-14', traffic: 165000, conversion: 2.3 },
  { date: '2023-04-15', traffic: 162000, conversion: 2.2 }
];

export const conversionRateBenchmarkData = [
  { category: 'Women\'s Apparel', yourRate: 2.8, competitorAvg: 2.5, industryAvg: 2.3 },
  { category: 'Men\'s Apparel', yourRate: 2.6, competitorAvg: 2.4, industryAvg: 2.2 },
  { category: 'Footwear', yourRate: 2.4, competitorAvg: 2.2, industryAvg: 2.1 },
  { category: 'Accessories', yourRate: 3.2, competitorAvg: 2.9, industryAvg: 2.7 },
  { category: 'Beauty', yourRate: 3.5, competitorAvg: 3.1, industryAvg: 2.9 }
];

export const competitorCampaignAds = [
  { competitor: 'Competitor A', campaignType: 'Summer Sale', startDate: '2023-06-01', endDate: '2023-06-15', discount: '25% off', impact: 'High' },
  { competitor: 'Competitor B', campaignType: 'Flash Sale', startDate: '2023-06-08', endDate: '2023-06-10', discount: '30% off', impact: 'Medium' },
  { competitor: 'Competitor C', campaignType: 'Clearance', startDate: '2023-06-12', endDate: '2023-06-30', discount: '40% off', impact: 'High' },
  { competitor: 'Competitor D', campaignType: 'BOGO', startDate: '2023-06-05', endDate: '2023-06-20', discount: 'Buy One, Get One 50% off', impact: 'Medium' },
  { competitor: 'Competitor A', campaignType: 'Holiday Special', startDate: '2023-07-01', endDate: '2023-07-10', discount: '20% off', impact: 'Low' }
];
