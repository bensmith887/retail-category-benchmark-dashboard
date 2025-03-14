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

import { BarChart3, LineChart, PieChart, DollarSign, Activity, TrendingUp, ShoppingBag, Search } from 'lucide-react';

// Tab data
export const tabsData = [
  { id: 'overview', name: 'Overview', icon: PieChart },
  { id: 'traffic-share', name: 'Traffic Share', icon: LineChart },
  { id: 'pricing', name: 'Pricing', icon: DollarSign },
  { id: 'product-performance', name: 'Product Performance', icon: ShoppingBag },
  { id: 'customer-sentiment', name: 'Customer Sentiment', icon: Activity },
  { id: 'promotion-effectiveness', name: 'Promotion Effectiveness', icon: BarChart3 },
  { id: 'traffic-sources', name: 'Traffic Sources', icon: TrendingUp },
  { id: 'price-elasticity', name: 'Price Elasticity', icon: TrendingUp },
  { id: 'keyword-category', name: 'Keyword Category Share', icon: Search },
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

// Product performance data
export const productPerformanceData = [
  { id: 1, name: 'Ultra Comfort Running Shoes', category: 'Footwear', pageViews: 158750, description: 'Professional running shoes with enhanced cushioning', monthChange: 12.3, yearChange: 24.8 },
  { id: 2, name: 'Premium Leather Crossbody Bag', category: 'Accessories', pageViews: 142680, description: 'Genuine leather bag with adjustable strap', monthChange: 8.7, yearChange: 18.5 },
  { id: 3, name: 'Slim Fit Cotton Dress Shirt', category: 'Men\'s Apparel', pageViews: 137520, description: 'Breathable cotton shirt for formal occasions', monthChange: 5.2, yearChange: 15.9 },
  { id: 4, name: 'High-Waisted Yoga Leggings', category: 'Activewear', pageViews: 129340, description: 'Flexible leggings with moisture-wicking fabric', monthChange: 15.8, yearChange: 32.7 },
  { id: 5, name: 'Wireless Noise-Cancelling Headphones', category: 'Electronics', pageViews: 118650, description: 'Premium headphones with 30-hour battery life', monthChange: -2.5, yearChange: 10.8 },
  { id: 6, name: 'Floral Print Maxi Dress', category: 'Women\'s Apparel', pageViews: 112480, description: 'Lightweight summer dress with floral pattern', monthChange: 7.6, yearChange: 21.3 },
  { id: 7, name: 'Designer Aviator Sunglasses', category: 'Accessories', pageViews: 105360, description: 'UV-protected polarized sunglasses', monthChange: 4.3, yearChange: 13.9 },
  { id: 8, name: 'Smart Fitness Tracker Watch', category: 'Electronics', pageViews: 98720, description: 'Waterproof fitness tracker with heart rate monitor', monthChange: 9.5, yearChange: 27.8 },
  { id: 9, name: 'Organic Cotton T-shirt', category: 'Casual Wear', pageViews: 94830, description: 'Eco-friendly basic tee in multiple colors', monthChange: 3.7, yearChange: 12.6 },
  { id: 10, name: 'Memory Foam Pillow Set', category: 'Home Goods', pageViews: 89570, description: 'Ergonomic pillows for neck support', monthChange: 1.2, yearChange: 8.5 },
  { id: 11, name: 'Vintage Inspired Denim Jacket', category: 'Vintage & Retro', pageViews: 85240, description: 'Classic denim jacket with distressed details', monthChange: 6.8, yearChange: 19.2 },
  { id: 12, name: 'Stainless Steel Water Bottle', category: 'Accessories', pageViews: 82190, description: 'Insulated bottle that keeps drinks cold for 24 hours', monthChange: 2.9, yearChange: 11.4 },
  { id: 13, name: 'Professional Makeup Brush Set', category: 'Beauty', pageViews: 79650, description: 'Complete set of 12 makeup brushes with case', monthChange: 5.6, yearChange: 16.8 },
  { id: 14, name: 'Men\'s Leather Wallet', category: 'Accessories', pageViews: 76820, description: 'Slim bifold wallet with RFID protection', monthChange: 0.8, yearChange: 7.3 },
  { id: 15, name: 'Wool Blend Oversized Sweater', category: 'Women\'s Apparel', pageViews: 74510, description: 'Cozy sweater perfect for fall and winter', monthChange: -3.5, yearChange: 5.2 },
  { id: 16, name: 'Bamboo Bed Sheet Set', category: 'Home Goods', pageViews: 71380, description: 'Eco-friendly sheets with cooling properties', monthChange: 4.8, yearChange: 14.7 },
  { id: 17, name: 'Bluetooth Portable Speaker', category: 'Electronics', pageViews: 68920, description: 'Waterproof speaker with 20-hour playback', monthChange: 7.2, yearChange: 20.5 },
  { id: 18, name: 'Children\'s Educational Tablet', category: 'Kids', pageViews: 65870, description: 'Learning tablet with parental controls', monthChange: 11.3, yearChange: 29.8 },
  { id: 19, name: 'Recycled Plastic Backpack', category: 'Sustainable Fashion', pageViews: 62940, description: 'Durable backpack made from recycled materials', monthChange: 9.8, yearChange: 28.3 },
  { id: 20, name: 'Anti-Aging Skincare Set', category: 'Beauty', pageViews: 60120, description: 'Complete skincare routine with natural ingredients', monthChange: 6.4, yearChange: 17.9 }
];

// Daily traffic data for Promotion Effectiveness tab
export const dailyTrafficData = [
  { date: '2023-09-01', yourTraffic: 8250, competitorTraffic: 9100, yourShare: 47.5, competitorShare: 52.5 },
  { date: '2023-09-02', yourTraffic: 7890, competitorTraffic: 8950, yourShare: 46.8, competitorShare: 53.2 },
  { date: '2023-09-03', yourTraffic: 6540, competitorTraffic: 7200, yourShare: 47.6, competitorShare: 52.4 },
  { date: '2023-09-04', yourTraffic: 8760, competitorTraffic: 9300, yourShare: 48.5, competitorShare: 51.5 },
  { date: '2023-09-05', yourTraffic: 9450, competitorTraffic: 9800, yourShare: 49.1, competitorShare: 50.9 },
  { date: '2023-09-06', yourTraffic: 10200, competitorTraffic: 10100, yourShare: 50.2, competitorShare: 49.8 },
  { date: '2023-09-07', yourTraffic: 11350, competitorTraffic: 10400, yourShare: 52.2, competitorShare: 47.8 },
  { date: '2023-09-08', yourTraffic: 12100, competitorTraffic: 10800, yourShare: 52.8, competitorShare: 47.2 },
  { date: '2023-09-09', yourTraffic: 11800, competitorTraffic: 10700, yourShare: 52.4, competitorShare: 47.6 },
  { date: '2023-09-10', yourTraffic: 9950, competitorTraffic: 9500, yourShare: 51.1, competitorShare: 48.9 },
  { date: '2023-09-11', yourTraffic: 10400, competitorTraffic: 9800, yourShare: 51.5, competitorShare: 48.5 },
  { date: '2023-09-12', yourTraffic: 11200, competitorTraffic: 10300, yourShare: 52.1, competitorShare: 47.9 },
  { date: '2023-09-13', yourTraffic: 12300, competitorTraffic: 10900, yourShare: 53.0, competitorShare: 47.0 },
  { date: '2023-09-14', yourTraffic: 13100, competitorTraffic: 11200, yourShare: 53.9, competitorShare: 46.1 }
];

// Conversion rate benchmark data
export const conversionRateBenchmarkData = [
  { name: 'Your Brand', rate: 3.8 },
  { name: 'Industry Average', rate: 2.9 },
  { name: 'Competitor A', rate: 4.2 },
  { name: 'Competitor B', rate: 3.1 },
  { name: 'Competitor C', rate: 2.7 }
];

// Competitor campaign display ads
export const competitorCampaignAds = [
  {
    id: 1,
    competitor: 'Competitor A',
    headline: 'Summer Sale - Up to 50% Off',
    description: 'Limited time offer on our premium collection',
    impressions: 125000,
    clicks: 7250,
    ctr: 5.8,
    startDate: '2023-08-15',
    endDate: '2023-09-15'
  },
  {
    id: 2,
    competitor: 'Competitor B',
    headline: 'Free Shipping on All Orders',
    description: 'No minimum purchase required, shop now',
    impressions: 98500,
    clicks: 5320,
    ctr: 5.4,
    startDate: '2023-08-20',
    endDate: '2023-09-20'
  },
  {
    id: 3,
    competitor: 'Competitor A',
    headline: 'New Fall Collection',
    description: 'Discover the latest trends for the season',
    impressions: 112700,
    clicks: 6840,
    ctr: 6.1,
    startDate: '2023-09-01',
    endDate: '2023-10-01'
  },
  {
    id: 4,
    competitor: 'Competitor C',
    headline: 'Buy One Get One Free',
    description: 'Special offer on selected items',
    impressions: 87600,
    clicks: 4950,
    ctr: 5.6,
    startDate: '2023-08-25',
    endDate: '2023-09-25'
  },
  {
    id: 5,
    competitor: 'Competitor B',
    headline: 'Exclusive Member Deals',
    description: 'Join now and get 15% off your first purchase',
    impressions: 76300,
    clicks: 4280,
    ctr: 5.6,
    startDate: '2023-09-05',
    endDate: '2023-10-05'
  }
];

// Keyword category groups for the Keyword Category Share tab
export const keywordGroups = [
  { id: '1de03338-1fda-4a88-a4b9-a96177e42f37', name: 'General Electronics' },
  { id: '31b96160-6342-4972-9a7a-2231c8efba8b', name: 'Smart Home Products' },
  { id: '797c6dec-5ae0-4569-8993-2debf68b167d', name: 'Audio Equipment' }
];

// Sample data for keyword share (will be replaced by API data)
export const sampleKeywordShareData = [
  { domain: 'amazon.com', share: 28.5 },
  { domain: 'bestbuy.com', share: 15.7 },
  { domain: 'walmart.com', share: 12.3 },
  { domain: 'target.com', share: 9.8 },
  { domain: 'ebay.com', share: 7.5 },
  { domain: 'newegg.com', share: 6.2 },
  { domain: 'apple.com', share: 5.4 },
  { domain: 'samsung.com', share: 4.9 },
  { domain: 'costco.com', share: 3.8 },
  { domain: 'bhphotovideo.com', share: 2.9 }
];

// Traffic Sources benchmarking data
export const trafficSourcesData = {
  categories: [
    'Search', 'Direct', 'Referral', 'Social', 'Email', 'Display', 'Affiliates'
  ],
  competitors: [
    'Your Brand', 'Competitor A', 'Competitor B', 'Competitor C', 'Competitor D'
  ],
  // Data showing percentage of traffic from each source for each competitor
  data: [
    // Search
    { source: 'Search', 'Your Brand': 42.5, 'Competitor A': 38.2, 'Competitor B': 45.7, 'Competitor C': 51.3, 'Competitor D': 36.8 },
    // Direct
    { source: 'Direct', 'Your Brand': 28.3, 'Competitor A': 32.5, 'Competitor B': 24.8, 'Competitor C': 19.7, 'Competitor D': 26.4 },
    // Referral
    { source: 'Referral', 'Your Brand': 12.6, 'Competitor A': 10.8, 'Competitor B': 13.5, 'Competitor C': 11.2, 'Competitor D': 15.3 },
    // Social
    { source: 'Social', 'Your Brand': 8.4, 'Competitor A': 10.6, 'Competitor B': 7.2, 'Competitor C': 9.8, 'Competitor D': 12.1 },
    // Email
    { source: 'Email', 'Your Brand': 5.3, 'Competitor A': 4.7, 'Competitor B': 6.1, 'Competitor C': 3.8, 'Competitor D': 4.9 },
    // Display
    { source: 'Display', 'Your Brand': 2.1, 'Competitor A': 2.6, 'Competitor B': 1.5, 'Competitor C': 3.4, 'Competitor D': 2.8 },
    // Affiliates
    { source: 'Affiliates', 'Your Brand': 0.8, 'Competitor A': 0.6, 'Competitor B': 1.2, 'Competitor C': 0.8, 'Competitor D': 1.7 }
  ]
};

// Traffic source trend data
export const trafficSourceTrendData = [
  { month: 'Oct', 'Search': 39.8, 'Direct': 26.2, 'Referral': 14.5, 'Social': 7.3, 'Email': 4.9, 'Display': 1.8, 'Affiliates': 0.9 },
  { month: 'Nov', 'Search': 40.3, 'Direct': 26.5, 'Referral': 14.2, 'Social': 7.8, 'Email': 5.0, 'Display': 1.9, 'Affiliates': 0.8 },
  { month: 'Dec', 'Search': 41.2, 'Direct': 27.4, 'Referral': 13.8, 'Social': 7.9, 'Email': 5.1, 'Display': 2.0, 'Affiliates': 0.8 },
  { month: 'Jan', 'Search': 41.8, 'Direct': 27.8, 'Referral': 13.2, 'Social': 8.0, 'Email': 5.2, 'Display': 2.0, 'Affiliates': 0.8 },
  { month: 'Feb', 'Search': 42.1, 'Direct': 28.0, 'Referral': 12.7, 'Social': 8.2, 'Email': 5.3, 'Display': 2.0, 'Affiliates': 0.8 },
  { month: 'Mar', 'Search': 42.5, 'Direct': 28.3, 'Referral': 12.6, 'Social': 8.4, 'Email': 5.3, 'Display': 2.1, 'Affiliates': 0.8 }
];

// Category traffic distribution by source
export const categoryTrafficData = [
  { 
    category: "Women's Apparel",
    search: 45.2,
    direct: 25.6,
    referral: 13.8,
    social: 10.5,
    email: 3.2,
    display: 1.2,
    affiliates: 0.5
  },
  { 
    category: "Men's Apparel",
    search: 40.8,
    direct: 30.2,
    referral: 15.3,
    social: 8.2,
    email: 3.8,
    display: 1.1,
    affiliates: 0.6
  },
  { 
    category: "Footwear",
    search: 48.5,
    direct: 22.3,
    referral: 12.4,
    social: 9.8,
    email: 4.5,
    display: 1.8,
    affiliates: 0.7
  },
  { 
    category: "Accessories",
    search: 38.6,
    direct: 24.5,
    referral: 14.7,
    social: 15.3,
    email: 4.2,
    display: 2.0,
    affiliates: 0.7
  },
  { 
    category: "Activewear",
    search: 44.3,
    direct: 26.7,
    referral: 11.5,
    social: 11.8,
    email: 3.5,
    display: 1.5,
    affiliates: 0.7
  },
  { 
    category: "Luxury",
    search: 35.8,
    direct: 32.4,
    referral: 18.5,
    social: 7.2,
    email: 3.8,
    display: 1.5,
    affiliates: 0.8
  },
  { 
    category: "Casual Wear",
    search: 42.6,
    direct: 28.9,
    referral: 12.8,
    social: 9.5,
    email: 4.0,
    display: 1.6,
    affiliates: 0.6
  }
];

// Traffic source benchmarks by competitor
export const competitorSourceBenchmarks = {
  search: {
    'Your Brand': { share: 42.5, indexToAvg: 1.05, yearChange: 2.7 },
    'Competitor A': { share: 38.2, indexToAvg: 0.94, yearChange: 1.5 },
    'Competitor B': { share: 45.7, indexToAvg: 1.13, yearChange: 3.8 },
    'Competitor C': { share: 51.3, indexToAvg: 1.27, yearChange: 5.2 },
    'Competitor D': { share: 36.8, indexToAvg: 0.91, yearChange: -0.8 }
  },
  direct: {
    'Your Brand': { share: 28.3, indexToAvg: 1.02, yearChange: 2.1 },
    'Competitor A': { share: 32.5, indexToAvg: 1.18, yearChange: 3.7 },
    'Competitor B': { share: 24.8, indexToAvg: 0.90, yearChange: 1.5 },
    'Competitor C': { share: 19.7, indexToAvg: 0.71, yearChange: -1.2 },
    'Competitor D': { share: 26.4, indexToAvg: 0.96, yearChange: 0.8 }
  },
  social: {
    'Your Brand': { share: 8.4, indexToAvg: 0.87, yearChange: 1.1 },
    'Competitor A': { share: 10.6, indexToAvg: 1.10, yearChange: 2.3 },
    'Competitor B': { share: 7.2, indexToAvg: 0.75, yearChange: 0.5 },
    'Competitor C': { share: 9.8, indexToAvg: 1.02, yearChange: 3.2 },
    'Competitor D': { share: 12.1, indexToAvg: 1.26, yearChange: 4.5 }
  }
};
