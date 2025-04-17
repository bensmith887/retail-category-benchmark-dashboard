
export const tabsData = [
  {
    id: 'overview',
    name: 'Overview',
    icon: 'BarChart3',
    items: [],
  },
  {
    id: 'price-elasticity',
    name: 'Price Sensitivity',
    icon: 'Percent',
    items: [],
  },
  {
    id: 'promotions-v2',
    name: 'Promotion Planning',
    icon: 'Tag',
    items: [],
  },
  {
    id: 'product-benchmark-v2',
    name: 'Product & Price Benchmark',
    icon: 'LineChart',
    items: [],
  },
  {
    id: 'promotions',
    name: 'Promotions',
    icon: 'Tag',
    hidden: true,
    items: [],
  }
];

// Add market share data used by LineChart
export const marketShareData = [
  { month: 'Jan', yourShare: 18.2, competitorShare: 21.5 },
  { month: 'Feb', yourShare: 18.5, competitorShare: 21.3 },
  { month: 'Mar', yourShare: 18.9, competitorShare: 21.1 },
  { month: 'Apr', yourShare: 19.2, competitorShare: 20.9 },
  { month: 'May', yourShare: 19.7, competitorShare: 20.5 },
  { month: 'Jun', yourShare: 20.1, competitorShare: 20.2 },
  { month: 'Jul', yourShare: 20.5, competitorShare: 20.0 },
  { month: 'Aug', yourShare: 20.9, competitorShare: 19.8 },
  { month: 'Sep', yourShare: 21.2, competitorShare: 19.5 }
];

// Add pricing data used by BarChart
export const pricingData = [
  { name: 'Your Brand', price: 45.99, isYourBrand: true },
  { name: 'Competitor A', price: 49.99, isYourBrand: false },
  { name: 'Competitor B', price: 42.99, isYourBrand: false },
  { name: 'Competitor C', price: 54.99, isYourBrand: false },
  { name: 'Competitor D', price: 39.99, isYourBrand: false }
];

// Add competitor data for CompetitorTable
export const competitorData = [
  { name: 'Your Retail Brand', marketShare: 21.2, price: 45.99, traffic: 123450, growth: 13.2 },
  { name: 'Competitor A', marketShare: 19.5, price: 49.99, traffic: 115780, growth: 7.5 },
  { name: 'Competitor B', marketShare: 15.3, price: 42.99, traffic: 93240, growth: 5.2 },
  { name: 'Competitor C', marketShare: 12.8, price: 54.99, traffic: 78120, growth: -2.1 },
  { name: 'Competitor D', marketShare: 10.5, price: 39.99, traffic: 64380, growth: 3.8 }
];

// Add metrics data for Index page
export const metricsData = [
  { id: 'revenue', label: 'Revenue', value: '$1,284,500', change: '+15.3%', isPositive: true },
  { id: 'traffic', label: 'Traffic', value: '1,245,890', change: '+8.7%', isPositive: true },
  { id: 'conversion', label: 'Conversion Rate', value: '4.2%', change: '-0.5%', isPositive: false }
];

// Add data for MarketShareView
export const marketShareTopCompetitors = [
  { name: 'Your Retail Brand', share: 21.2, monthChange: 1.8, yearChange: 3.5 },
  { name: 'Competitor A', share: 19.5, monthChange: -0.7, yearChange: -1.2 },
  { name: 'Competitor B', share: 15.3, monthChange: 0.5, yearChange: 1.8 },
  { name: 'Competitor C', share: 12.8, monthChange: -0.3, yearChange: -0.5 }
];

export const categoryMarketShareData = [
  {
    category: 'Fashion',
    domains: [
      { name: 'fashion-store.com', share: 18.5, monthChange: 1.2, yearChange: 2.8 },
      { name: 'style-hub.com', share: 12.4, monthChange: 0.9, yearChange: 1.7 },
      { name: 'trendy-clothes.com', share: 9.1, monthChange: -0.3, yearChange: 0.5 }
    ]
  },
  {
    category: 'Home Goods',
    domains: [
      { name: 'home-decor-plus.com', share: 16.8, monthChange: 1.4, yearChange: 2.2 },
      { name: 'furniture-deals.com', share: 13.2, monthChange: 0.8, yearChange: 1.9 },
      { name: 'modern-furniture.com', share: 10.5, monthChange: 0.5, yearChange: 1.3 }
    ]
  },
  {
    category: 'Electronics',
    domains: [
      { name: 'tech-gadgets.com', share: 17.3, monthChange: 1.6, yearChange: 2.4 },
      { name: 'electronics-hub.com', share: 14.1, monthChange: 1.0, yearChange: 2.1 },
      { name: 'digital-deals.com', share: 11.2, monthChange: 0.7, yearChange: 1.5 }
    ]
  }
];

export const marketShareTrendData = [
  { month: 'Jan', yourShare: 17.7, competitorAShare: 20.3, competitorBShare: 15.1, competitorCShare: 13.1 },
  { month: 'Feb', yourShare: 18.0, competitorAShare: 20.1, competitorBShare: 15.0, competitorCShare: 13.0 },
  { month: 'Mar', yourShare: 18.5, competitorAShare: 20.0, competitorBShare: 15.0, competitorCShare: 12.9 },
  { month: 'Apr', yourShare: 19.0, competitorAShare: 19.8, competitorBShare: 15.0, competitorCShare: 12.9 },
  { month: 'May', yourShare: 19.3, competitorAShare: 19.6, competitorBShare: 15.1, competitorCShare: 12.8 },
  { month: 'Jun', yourShare: 19.7, competitorAShare: 19.5, competitorBShare: 15.1, competitorCShare: 12.8 },
  { month: 'Jul', yourShare: 20.1, competitorAShare: 19.7, competitorBShare: 15.2, competitorCShare: 12.8 },
  { month: 'Aug', yourShare: 20.5, competitorAShare: 19.8, competitorBShare: 15.2, competitorCShare: 12.8 },
  { month: 'Sep', yourShare: 21.2, competitorAShare: 19.5, competitorBShare: 15.3, competitorCShare: 12.8 }
];

// Add data for KeywordCategoryShareView
export const keywordGroups = [
  { id: 'electronics', name: 'Electronics' },
  { id: 'fashion', name: 'Fashion & Apparel' },
  { id: 'home', name: 'Home & Kitchen' },
  { id: 'beauty', name: 'Beauty & Personal Care' },
  { id: 'sports', name: 'Sports & Outdoors' }
];

export const sampleKeywordShareData = [
  { domain: 'amazon.com', share: 24.8 },
  { domain: 'walmart.com', share: 18.3 },
  { domain: 'yourretailbrand.com', share: 15.7 },
  { domain: 'bestbuy.com', share: 12.5 },
  { domain: 'target.com', share: 10.2 },
  { domain: 'ebay.com', share: 7.8 },
  { domain: 'newegg.com', share: 5.9 },
  { domain: 'homedepot.com', share: 3.5 },
  { domain: 'lowes.com', share: 2.9 },
  { domain: 'wayfair.com', share: 2.1 }
];

// Add data for ProductPerformanceView
export const productPerformanceData = [
  { id: 1, name: 'Wireless Headphones', category: 'Electronics', sales: 1245, views: 15600, conversion: 8.2, change: 12.5 },
  { id: 2, name: 'Smart Watch', category: 'Electronics', sales: 980, views: 12400, conversion: 7.9, change: 8.7 },
  { id: 3, name: 'Bluetooth Speaker', category: 'Electronics', sales: 850, views: 9200, conversion: 9.2, change: 5.3 },
  { id: 4, name: 'Fitness Tracker', category: 'Wearables', sales: 720, views: 8900, conversion: 8.1, change: 3.2 },
  { id: 5, name: 'Laptop Backpack', category: 'Accessories', sales: 680, views: 7500, conversion: 9.1, change: 6.9 }
];

// Add data for PromotionEffectivenessView
export const dailyTrafficData = [
  { date: '2023-09-01', traffic: 4200, promotion: false },
  { date: '2023-09-02', traffic: 4350, promotion: false },
  { date: '2023-09-03', traffic: 3800, promotion: false },
  { date: '2023-09-04', traffic: 4100, promotion: false },
  { date: '2023-09-05', traffic: 4250, promotion: false },
  { date: '2023-09-06', traffic: 4500, promotion: false },
  { date: '2023-09-07', traffic: 4650, promotion: false },
  { date: '2023-09-08', traffic: 5200, promotion: true },
  { date: '2023-09-09', traffic: 6800, promotion: true },
  { date: '2023-09-10', traffic: 7500, promotion: true },
  { date: '2023-09-11', traffic: 7200, promotion: true },
  { date: '2023-09-12', traffic: 6900, promotion: true },
  { date: '2023-09-13', traffic: 6500, promotion: true },
  { date: '2023-09-14', traffic: 6200, promotion: true },
  { date: '2023-09-15', traffic: 4800, promotion: false }
];

export const conversionRateBenchmarkData = [
  { date: 'Week 1', yourRate: 3.8, competitorAvg: 3.2, industryAvg: 3.0 },
  { date: 'Week 2', yourRate: 4.2, competitorAvg: 3.3, industryAvg: 3.1 },
  { date: 'Week 3', yourRate: 5.8, competitorAvg: 3.5, industryAvg: 3.2 },
  { date: 'Week 4', yourRate: 6.2, competitorAvg: 3.6, industryAvg: 3.3 },
  { date: 'Week 5', yourRate: 4.5, competitorAvg: 3.4, industryAvg: 3.2 }
];

// Add data for TrafficSourcesView
export const trafficSourcesData = [
  { source: 'Organic Search', share: 32, change: 2.5 },
  { source: 'Direct', share: 22, change: -1.2 },
  { source: 'Referral', share: 18, change: 0.8 },
  { source: 'Social', share: 15, change: 3.2 },
  { source: 'Email', share: 8, change: 1.4 },
  { source: 'Paid Search', share: 5, change: 0.5 }
];

export const trafficSourceTrendData = [
  { month: 'Apr', Organic: 30, Direct: 22, Referral: 17, Social: 12, Email: 7, Paid: 5 },
  { month: 'May', Organic: 31, Direct: 22, Referral: 17, Social: 13, Email: 7, Paid: 5 },
  { month: 'Jun', Organic: 31, Direct: 21, Referral: 18, Social: 14, Email: 8, Paid: 5 },
  { month: 'Jul', Organic: 32, Direct: 21, Referral: 18, Social: 14, Email: 8, Paid: 5 },
  { month: 'Aug', Organic: 32, Direct: 21, Referral: 18, Social: 15, Email: 8, Paid: 5 },
  { month: 'Sep', Organic: 32, Direct: 22, Referral: 18, Social: 15, Email: 8, Paid: 5 }
];

export const categoryTrafficData = [
  { category: 'Electronics', share: 28, change: 1.5 },
  { category: 'Fashion', share: 22, change: 2.3 },
  { category: 'Home & Garden', share: 18, change: 0.5 },
  { category: 'Health & Beauty', share: 12, change: 1.2 },
  { category: 'Sports & Outdoors', share: 8, change: -0.3 },
  { category: 'Toys & Games', share: 7, change: 0.8 },
  { category: 'Books & Media', share: 5, change: -0.5 }
];

export const competitorSourceBenchmarks = [
  { source: 'Organic Search', yourShare: 32, competitorAvg: 28, industryAvg: 25 },
  { source: 'Direct', yourShare: 22, competitorAvg: 20, industryAvg: 18 },
  { source: 'Referral', yourShare: 18, competitorAvg: 15, industryAvg: 12 },
  { source: 'Social', yourShare: 15, competitorAvg: 18, industryAvg: 20 },
  { source: 'Email', yourShare: 8, competitorAvg: 10, industryAvg: 12 },
  { source: 'Paid Search', yourShare: 5, competitorAvg: 9, industryAvg: 13 }
];

// Add general insight data
export const insightData = [
  {
    title: 'Category Growth',
    description: 'Electronics showing 15% YoY growth, highest among all categories',
    recommendations: [
      'Increase inventory of top-performing electronics',
      'Expand premium electronics selection',
      'Create bundle deals with accessories'
    ]
  },
  {
    title: 'Pricing Opportunity',
    description: 'Your prices are 5-8% lower than competitors in Home & Garden',
    recommendations: [
      'Evaluate price elasticity for margin improvement',
      'Test selective price increases',
      'Bundle complementary products'
    ]
  },
  {
    title: 'Traffic Insights',
    description: 'Social media traffic conversion rate is 35% higher than average',
    recommendations: [
      'Increase social media marketing budget',
      'Expand social shopping integration',
      'Create social-exclusive promotions'
    ]
  },
  {
    title: 'Competitive Edge',
    description: 'Your site has 15% faster load times than top competitors',
    recommendations: [
      'Highlight speed advantage in marketing',
      'Continue optimizing site performance',
      'Add site speed messaging to homepage'
    ]
  }
];

// Add filters data
export const filtersData = [
  {
    id: 'timeframe',
    name: 'Time Frame',
    options: [
      { id: '7d', name: 'Last 7 days' },
      { id: '30d', name: 'Last 30 days' },
      { id: '90d', name: 'Last 90 days' },
      { id: '6m', name: 'Last 6 months', selected: true },
      { id: '12m', name: 'Last 12 months' }
    ]
  },
  {
    id: 'categories',
    name: 'Categories',
    options: [
      { id: 'electronics', name: 'Electronics', selected: true },
      { id: 'fashion', name: 'Fashion' },
      { id: 'home', name: 'Home & Garden' },
      { id: 'beauty', name: 'Health & Beauty' },
      { id: 'sports', name: 'Sports & Outdoors' }
    ]
  },
  {
    id: 'competitors',
    name: 'Competitors',
    options: [
      { id: 'all', name: 'All Competitors', selected: true },
      { id: 'amazon', name: 'Amazon' },
      { id: 'walmart', name: 'Walmart' },
      { id: 'target', name: 'Target' },
      { id: 'bestbuy', name: 'Best Buy' }
    ]
  }
];
