
import { BarChart3, PieChart, TrendingUp, Activity, LineChart, MessageSquare, DollarSign, Percent, Tag, ShoppingCart, Users, Search, Share2, Heart, ExternalLink, Radio } from 'lucide-react';

export const tabsData = [
  {
    id: 'overview',
    name: 'Overview',
    icon: 'BarChart3',
    hidden: false
  },
  {
    id: 'traffic-share',
    name: 'Category Share of Search',
    icon: 'PieChart',
    hidden: false
  },
  {
    id: 'pricing',
    name: 'Pricing',
    icon: 'DollarSign',
    hidden: false
  },
  {
    id: 'price-elasticity',
    name: 'Price Elasticity',
    icon: 'Percent',
    hidden: false
  },
  {
    id: 'promotions',
    name: 'Promotions',
    icon: 'Tag',
    hidden: true
  },
  {
    id: 'promotions-v2',
    name: 'Promotions V2',
    icon: 'ShoppingCart',
    hidden: false
  },
  {
    id: 'traffic-sources',
    name: 'Traffic Sources',
    icon: 'Share2',
    hidden: true
  },
  {
    id: 'product-performance',
    name: 'Product Performance',
    icon: 'TrendingUp',
    hidden: true
  },
  {
    id: 'customer-sentiment',
    name: 'Customer Sentiment',
    icon: 'Heart',
    hidden: true
  },
  {
    id: 'promotion-effectiveness',
    name: 'Promotion Effectiveness',
    icon: 'Activity',
    hidden: true
  },
  {
    id: 'keyword-category',
    name: 'Keyword Share',
    icon: 'Search',
    hidden: true
  },
  {
    id: 'retail-media',
    name: 'Retail Media',
    icon: 'Radio',
    hidden: true
  }
];

export const filtersData = [
  {
    id: 'category',
    label: 'Categories',
    options: ['Electronics', 'Clothing', 'Home Goods']
  },
  {
    id: 'timeframe',
    label: 'Timeframe',
    options: ['Last 6 Months', 'Last 12 Months', 'YTD']
  },
  {
    id: 'traffic-domains',
    label: 'Traffic Domains',
    options: ['example.com', 'another-example.com']
  },
  {
    id: 'retail-domains',
    label: 'Retail IQ Domains',
    options: ['retailer1.com', 'retailer2.com']
  }
];

export const metricsData = [
  {
    id: 'market-share',
    label: 'Traffic Share',
    value: '32.7%',
    change: '+1.5%',
    isPositive: true
  },
  {
    id: 'avg-product-price',
    label: 'Avg. Product Price',
    value: '$75.43',
    change: '-$2.18',
    isPositive: false
  },
  {
    id: 'total-traffic',
    label: 'Total Traffic',
    value: '1.24M',
    change: '+12.3%',
    isPositive: true
  }
];

export const insightData = [
  {
    title: 'Competitor Price Drop',
    description: 'Main competitor reduced prices by 8% on key products.',
    type: 'threat'
  },
  {
    title: 'Traffic Opportunity',
    description: 'Search visibility increasing for "premium wireless" category.',
    type: 'opportunity'
  },
  {
    title: 'Positive Trend',
    description: 'Conversation rate for mobile users up 12% this month.',
    type: 'positive'
  },
  {
    title: 'Promotion Success',
    description: 'Last campaign increased traffic by 23%. Consider replicating.',
    type: 'recommendation'
  }
];

export const competitorData = [
  {
    name: 'Your Retail Brand',
    marketShare: 32.7,
    price: 75.43,
    traffic: 1240000,
    growth: 12.3,
    performance: 84
  },
  {
    name: 'Competitor A',
    marketShare: 24.1,
    price: 82.19,
    traffic: 920000,
    growth: 8.5,
    performance: 76
  },
  {
    name: 'Competitor B',
    marketShare: 18.5,
    price: 69.99,
    traffic: 710000,
    growth: -2.1,
    performance: 68
  },
  {
    name: 'Competitor C',
    marketShare: 14.2,
    price: 58.32,
    traffic: 550000,
    growth: 4.8,
    performance: 71
  },
  {
    name: 'Others',
    marketShare: 10.5,
    price: 63.45,
    traffic: 400000,
    growth: 1.2,
    performance: 58
  }
];

export const marketShareData = [
  { month: 'Jan', yourShare: 28.4, competitorAShare: 24.1, competitorBShare: 18.9, competitorCShare: 14.5 },
  { month: 'Feb', yourShare: 29.1, competitorAShare: 23.9, competitorBShare: 18.6, competitorCShare: 14.8 },
  { month: 'Mar', yourShare: 30.2, competitorAShare: 23.5, competitorBShare: 18.2, competitorCShare: 14.6 },
  { month: 'Apr', yourShare: 31.0, competitorAShare: 23.8, competitorBShare: 17.9, competitorCShare: 14.2 },
  { month: 'May', yourShare: 32.3, competitorAShare: 24.0, competitorBShare: 17.5, competitorCShare: 14.0 },
  { month: 'Jun', yourShare: 32.7, competitorAShare: 24.1, competitorBShare: 18.5, competitorCShare: 14.2 }
];

export const marketShareTopCompetitors = [
  { name: 'Your Retail Brand', share: 32.7, monthChange: 1.5, yearChange: 4.2 },
  { name: 'Competitor A', share: 24.1, monthChange: -0.8, yearChange: 1.3 },
  { name: 'Competitor B', share: 18.5, monthChange: 0.3, yearChange: -1.7 },
  { name: 'Competitor C', share: 14.2, monthChange: -0.5, yearChange: -2.1 }
];

export const categoryMarketShareData = [
  {
    category: 'Electronics',
    domains: [
      { name: 'Your Retail Brand', share: 32.7, monthChange: 1.5, yearChange: 4.2 },
      { name: 'Competitor A', share: 24.1, monthChange: -0.8, yearChange: 1.3 },
      { name: 'Competitor B', share: 18.5, monthChange: 0.3, yearChange: -1.7 },
      { name: 'Competitor C', share: 14.2, monthChange: -0.5, yearChange: -2.1 },
      { name: 'Others', share: 10.5, monthChange: -0.5, yearChange: -1.7 }
    ]
  },
  {
    category: 'Fashion',
    domains: [
      { name: 'Your Retail Brand', share: 28.4, monthChange: 2.1, yearChange: 5.3 },
      { name: 'Competitor A', share: 26.7, monthChange: 1.2, yearChange: 2.8 },
      { name: 'Competitor B', share: 20.3, monthChange: -1.5, yearChange: -0.8 },
      { name: 'Competitor C', share: 15.1, monthChange: -0.3, yearChange: -2.5 },
      { name: 'Others', share: 9.5, monthChange: -1.5, yearChange: -4.8 }
    ]
  },
  {
    category: 'Home Goods',
    domains: [
      { name: 'Your Retail Brand', share: 35.2, monthChange: 0.8, yearChange: 3.7 },
      { name: 'Competitor A', share: 22.8, monthChange: -1.2, yearChange: 0.5 },
      { name: 'Competitor B', share: 17.9, monthChange: 0.5, yearChange: -0.9 },
      { name: 'Competitor C', share: 13.6, monthChange: -0.7, yearChange: -1.8 },
      { name: 'Others', share: 10.5, monthChange: 0.6, yearChange: -0.5 }
    ]
  }
];

export const marketShareTrendData = [
  { month: 'Jan', yourShare: 28.4, competitorAShare: 24.1, competitorBShare: 18.9, competitorCShare: 14.5 },
  { month: 'Feb', yourShare: 29.1, competitorAShare: 23.9, competitorBShare: 18.6, competitorCShare: 14.8 },
  { month: 'Mar', yourShare: 30.2, competitorAShare: 23.5, competitorBShare: 18.2, competitorCShare: 14.6 },
  { month: 'Apr', yourShare: 31.0, competitorAShare: 23.8, competitorBShare: 17.9, competitorCShare: 14.2 },
  { month: 'May', yourShare: 31.5, competitorAShare: 24.0, competitorBShare: 18.0, competitorCShare: 14.1 },
  { month: 'Jun', yourShare: 31.8, competitorAShare: 24.3, competitorBShare: 18.2, competitorCShare: 14.0 },
  { month: 'Jul', yourShare: 32.0, competitorAShare: 24.5, competitorBShare: 18.3, competitorCShare: 13.9 },
  { month: 'Aug', yourShare: 32.3, competitorAShare: 24.4, competitorBShare: 18.4, competitorCShare: 13.8 },
  { month: 'Sep', yourShare: 32.5, competitorAShare: 24.3, competitorBShare: 18.5, competitorCShare: 13.9 },
  { month: 'Oct', yourShare: 32.7, competitorAShare: 24.2, competitorBShare: 18.6, competitorCShare: 14.0 },
  { month: 'Nov', yourShare: 33.0, competitorAShare: 24.1, competitorBShare: 18.5, competitorCShare: 14.1 },
  { month: 'Dec', yourShare: 33.5, competitorAShare: 24.0, competitorBShare: 18.3, competitorCShare: 14.2 }
];

export const pricingData = [
  { name: 'Your Brand', price: 75.43, change: -2.18, changePercent: -2.8 },
  { name: 'Competitor A', price: 82.19, change: 1.32, changePercent: 1.6 },
  { name: 'Competitor B', price: 69.99, change: -3.49, changePercent: -4.8 },
  { name: 'Competitor C', price: 58.32, change: -1.28, changePercent: -2.2 },
  { name: 'Industry Average', price: 72.25, change: -1.45, changePercent: -2.0 }
];

export const productPerformanceData = [
  {
    id: 1,
    name: 'Wireless Headphones X1',
    category: 'Electronics',
    description: 'Premium noise-canceling wireless headphones with 40h battery life',
    pageViews: 24500,
    monthChange: 8.3,
    yearChange: 22.7
  },
  {
    id: 2,
    name: 'SmartHome Hub Pro',
    category: 'Smart Home',
    description: 'Central hub for smart home devices with voice control',
    pageViews: 18700,
    monthChange: 5.2,
    yearChange: 15.8
  },
  {
    id: 3,
    name: 'Ultra HD Smart TV 55"',
    category: 'Electronics',
    description: '55-inch 4K Ultra HD Smart TV with HDR',
    pageViews: 15200,
    monthChange: 3.1,
    yearChange: 10.5
  },
  {
    id: 4,
    name: 'Gaming Laptop X7',
    category: 'Computers',
    description: 'High-performance gaming laptop with RTX 3080',
    pageViews: 12800,
    monthChange: 7.8,
    yearChange: 18.3
  },
  {
    id: 5,
    name: 'Fitness Tracker Pro',
    category: 'Wearables',
    description: 'Advanced fitness tracker with heart rate monitor',
    pageViews: 11500,
    monthChange: 4.5,
    yearChange: 12.7
  },
  {
    id: 6,
    name: 'Digital Camera EOS R',
    category: 'Photography',
    description: 'Professional mirrorless camera with 45MP sensor',
    pageViews: 9800,
    monthChange: -1.2,
    yearChange: 5.3
  },
  {
    id: 7,
    name: 'Wireless Earbuds Pro',
    category: 'Audio',
    description: 'True wireless earbuds with active noise cancellation',
    pageViews: 8600,
    monthChange: 6.7,
    yearChange: 25.4
  },
  {
    id: 8,
    name: 'Ultra-thin Laptop Air',
    category: 'Computers',
    description: 'Lightweight laptop with all-day battery life',
    pageViews: 7900,
    monthChange: 2.3,
    yearChange: 8.9
  },
  {
    id: 9,
    name: 'Smart Watch Series 5',
    category: 'Wearables',
    description: 'Advanced smartwatch with health monitoring',
    pageViews: 7500,
    monthChange: 5.9,
    yearChange: 15.1
  },
  {
    id: 10,
    name: 'Professional Blender',
    category: 'Kitchen',
    description: 'High-power blender for professional cooking',
    pageViews: 6800,
    monthChange: -2.5,
    yearChange: 3.2
  }
];

export const dailyTrafficData = [
  { date: '2023-09-01', yourTraffic: 10200, competitorTraffic: 8400, yourShare: 52.8, competitorShare: 47.2 },
  { date: '2023-09-02', yourTraffic: 9800, competitorTraffic: 8200, yourShare: 51.9, competitorShare: 48.1 },
  { date: '2023-09-03', yourTraffic: 9500, competitorTraffic: 8000, yourShare: 51.5, competitorShare: 48.5 },
  { date: '2023-09-04', yourTraffic: 10100, competitorTraffic: 8300, yourShare: 52.5, competitorShare: 47.5 },
  { date: '2023-09-05', yourTraffic: 10800, competitorTraffic: 8900, yourShare: 53.2, competitorShare: 46.8 },
  { date: '2023-09-06', yourTraffic: 11200, competitorTraffic: 9100, yourShare: 53.9, competitorShare: 46.1 },
  { date: '2023-09-07', yourTraffic: 11500, competitorTraffic: 9300, yourShare: 54.3, competitorShare: 45.7 },
  { date: '2023-09-08', yourTraffic: 11800, competitorTraffic: 9500, yourShare: 54.7, competitorShare: 45.3 },
  { date: '2023-09-09', yourTraffic: 11600, competitorTraffic: 9400, yourShare: 54.5, competitorShare: 45.5 },
  { date: '2023-09-10', yourTraffic: 11200, competitorTraffic: 9200, yourShare: 53.9, competitorShare: 46.1 },
  { date: '2023-09-11', yourTraffic: 11350, competitorTraffic: 9250, yourShare: 54.2, competitorShare: 45.8 },
  { date: '2023-09-12', yourTraffic: 11500, competitorTraffic: 9300, yourShare: 54.3, competitorShare: 45.7 },
  { date: '2023-09-13', yourTraffic: 11700, competitorTraffic: 9400, yourShare: 54.6, competitorShare: 45.4 },
  { date: '2023-09-14', yourTraffic: 11900, competitorTraffic: 9600, yourShare: 54.9, competitorShare: 45.1 }
];

export const conversionRateBenchmarkData = [
  { name: 'Your Brand', rate: 3.8 },
  { name: 'Competitor A', rate: 3.1 },
  { name: 'Competitor B', rate: 2.9 },
  { name: 'Competitor C', rate: 2.7 },
  { name: 'Industry Average', rate: 3.2 }
];

export const competitorCampaignAds = [
  {
    id: 1,
    competitor: 'Competitor A',
    headline: 'Summer Sale: 30% Off All Products',
    description: 'Limited time offer on our most popular items.',
    impressions: 156000,
    clicks: 7800,
    ctr: 5.0,
    startDate: '2023-06-01',
    endDate: '2023-06-15'
  },
  {
    id: 2,
    competitor: 'Competitor B',
    headline: 'Free Shipping on Orders $50+',
    description: 'No minimum purchase required, offer valid until end of month.',
    impressions: 128000,
    clicks: 5760,
    ctr: 4.5,
    startDate: '2023-06-01',
    endDate: '2023-06-30'
  },
  {
    id: 3,
    competitor: 'Competitor A',
    headline: 'New Product Launch: Super Gadget X',
    description: 'Be the first to experience our most advanced product ever.',
    impressions: 215000,
    clicks: 12900,
    ctr: 6.0,
    startDate: '2023-07-15',
    endDate: '2023-07-31'
  },
  {
    id: 4,
    competitor: 'Competitor C',
    headline: 'Buy One Get One Free',
    description: 'Limited quantities available, shop now.',
    impressions: 95000,
    clicks: 5700,
    ctr: 6.0,
    startDate: '2023-08-01',
    endDate: '2023-08-15'
  },
  {
    id: 5,
    competitor: 'Competitor B',
    headline: 'Back to School Special: 25% Off',
    description: 'Get ready for school with our special discounts.',
    impressions: 185000,
    clicks: 10175,
    ctr: 5.5,
    startDate: '2023-08-15',
    endDate: '2023-09-05'
  }
];

export const trafficSourcesData = [
  { name: 'Organic Search', value: 42.5, change: 3.2 },
  { name: 'Direct', value: 28.2, change: 1.5 },
  { name: 'Referral', value: 15.8, change: -1.2 },
  { name: 'Social', value: 8.3, change: 2.7 },
  { name: 'Email', value: 3.6, change: 0.8 },
  { name: 'Paid Search', value: 1.6, change: -0.5 }
];

export const trafficSourceTrendData = [
  { month: 'Jan', organic: 38.2, direct: 26.5, referral: 17.1, social: 5.5, email: 2.8, paid: 2.1 },
  { month: 'Feb', organic: 38.5, direct: 26.8, referral: 16.9, social: 5.8, email: 2.9, paid: 2.0 },
  { month: 'Mar', organic: 39.1, direct: 27.0, referral: 16.7, social: 6.2, email: 3.0, paid: 1.9 },
  { month: 'Apr', organic: 39.8, direct: 27.2, referral: 16.4, social: 6.5, email: 3.1, paid: 1.8 },
  { month: 'May', organic: 40.5, direct: 27.5, referral: 16.2, social: 6.9, email: 3.3, paid: 1.7 },
  { month: 'Jun', organic: 41.2, direct: 27.8, referral: 16.0, social: 7.3, email: 3.4, paid: 1.7 },
  { month: 'Jul', organic: 41.8, direct: 28.0, referral: 15.9, social: 7.8, email: 3.5, paid: 1.7 },
  { month: 'Aug', organic: 42.5, direct: 28.2, referral: 15.8, social: 8.3, email: 3.6, paid: 1.6 }
];

export const categoryTrafficData = [
  {
    category: 'Electronics',
    sources: [
      { name: 'Organic Search', value: 48.5 },
      { name: 'Direct', value: 25.2 },
      { name: 'Referral', value: 12.8 },
      { name: 'Social', value: 7.3 },
      { name: 'Email', value: 4.6 },
      { name: 'Paid Search', value: 1.6 }
    ]
  },
  {
    category: 'Fashion',
    sources: [
      { name: 'Organic Search', value: 35.5 },
      { name: 'Direct', value: 30.2 },
      { name: 'Referral', value: 12.8 },
      { name: 'Social', value: 15.3 },
      { name: 'Email', value: 4.6 },
      { name: 'Paid Search', value: 1.6 }
    ]
  },
  {
    category: 'Home Goods',
    sources: [
      { name: 'Organic Search', value: 42.5 },
      { name: 'Direct', value: 28.2 },
      { name: 'Referral', value: 15.8 },
      { name: 'Social', value: 4.3 },
      { name: 'Email', value: 7.6 },
      { name: 'Paid Search', value: 1.6 }
    ]
  }
];

export const competitorSourceBenchmarks = [
  {
    source: 'Organic Search',
    competitors: [
      { name: 'Your Retail Brand', value: 42.5 },
      { name: 'Competitor A', value: 38.2 },
      { name: 'Competitor B', value: 45.8 },
      { name: 'Competitor C', value: 35.4 },
      { name: 'Industry Average', value: 40.5 }
    ]
  },
  {
    source: 'Direct',
    competitors: [
      { name: 'Your Retail Brand', value: 28.2 },
      { name: 'Competitor A', value: 32.5 },
      { name: 'Competitor B', value: 25.3 },
      { name: 'Competitor C', value: 30.1 },
      { name: 'Industry Average', value: 29.0 }
    ]
  },
  {
    source: 'Social',
    competitors: [
      { name: 'Your Retail Brand', value: 8.3 },
      { name: 'Competitor A', value: 10.5 },
      { name: 'Competitor B', value: 6.8 },
      { name: 'Competitor C', value: 12.4 },
      { name: 'Industry Average', value: 9.5 }
    ]
  }
];

export const keywordGroups = [
  { id: 'electronics', name: 'Electronics' },
  { id: 'fashion', name: 'Fashion & Apparel' },
  { id: 'home', name: 'Home & Garden' },
  { id: 'beauty', name: 'Beauty & Personal Care' },
  { id: 'sports', name: 'Sports & Fitness' }
];

export const sampleKeywordShareData = [
  { domain: 'yourbrand.com', share: 24.5 },
  { domain: 'competitora.com', share: 19.8 },
  { domain: 'competitorb.com', share: 15.3 },
  { domain: 'competitorc.com', share: 12.7 },
  { domain: 'competitord.com', share: 8.2 },
  { domain: 'competitore.com', share: 5.7 },
  { domain: 'competitorf.com', share: 4.9 },
  { domain: 'competitorg.com', share: 3.5 },
  { domain: 'competitorh.com', share: 3.2 },
  { domain: 'competitori.com', share: 2.2 }
];

