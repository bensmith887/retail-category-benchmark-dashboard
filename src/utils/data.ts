import { BarChart3, PieChart, TrendingUp, Activity, LineChart, MessageSquare, DollarSign, Percent, Tag, ShoppingCart, Users, Search, Share2, Heart, ExternalLink, Radio } from 'lucide-react';

export const tabsData = [
  {
    id: 'overview',
    name: 'Overview',
    icon: 'BarChart3'
  },
  {
    id: 'traffic-share',
    name: 'Traffic Share',
    icon: 'PieChart'
  },
  {
    id: 'pricing',
    name: 'Pricing',
    icon: 'DollarSign'
  },
  {
    id: 'price-elasticity',
    name: 'Price Elasticity',
    icon: 'Percent'
  },
  {
    id: 'promotions',
    name: 'Promotions',
    icon: 'Tag'
  },
  {
    id: 'promotions-v2',
    name: 'Promotions V2',
    icon: 'ShoppingCart'
  },
  {
    id: 'traffic-sources',
    name: 'Traffic Sources',
    icon: 'Share2'
  },
  {
    id: 'product-performance',
    name: 'Product Performance',
    icon: 'TrendingUp'
  },
  {
    id: 'customer-sentiment',
    name: 'Customer Sentiment',
    icon: 'Heart'
  },
  {
    id: 'promotion-effectiveness',
    name: 'Promotion Effectiveness',
    icon: 'Activity'
  },
  {
    id: 'keyword-category',
    name: 'Keyword Share',
    icon: 'Search'
  },
  {
    id: 'retail-media',
    name: 'Retail Media',
    icon: 'Radio'
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
