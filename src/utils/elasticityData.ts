// Price Elasticity Data
export const elasticityData = [
  {
    id: 1,
    category: 'Baby Products',
    elasticity: -0.27,
    subcategories: [
      { name: 'Strollers', elasticity: -0.85 },
      { name: 'Furniture', elasticity: -0.65 },
      { name: 'Toys', elasticity: -0.54 },
      { name: 'Diapers', elasticity: -0.30 },
    ]
  },
  {
    id: 2,
    category: 'Books',
    elasticity: -0.24,
    subcategories: [
      { name: 'Business', elasticity: -0.31 },
      { name: 'Fiction', elasticity: -0.25 },
      { name: 'Children\'s Books', elasticity: -0.09 },
    ]
  },
  {
    id: 3,
    category: 'Tools & Home Improvement',
    elasticity: -1.06,
    subcategories: [
      { name: 'Paint & Wall Treatments', elasticity: -0.95 },
      { name: 'Power & Hand Tools', elasticity: -0.89 },
      { name: 'Hardware', elasticity: -1.16 },
    ]
  }
];

// Price Data
export const priceData = [
  {
    id: 1,
    category: 'Baby Products',
    avgPrice: 28.56,
    priceRange: { min: 3.11, max: 731.29 },
    priceByMonth: [
      { month: 'Mar 2023', price: 26.45 },
      { month: 'Apr 2023', price: 26.67 },
      { month: 'May 2023', price: 26.89 },
      { month: 'Jun 2023', price: 27.12 },
      { month: 'Jul 2023', price: 27.45 },
      { month: 'Aug 2023', price: 27.67 },
      { month: 'Sep 2023', price: 27.89 },
      { month: 'Oct 2023', price: 28.12 },
      { month: 'Nov 2023', price: 28.24 },
      { month: 'Dec 2023', price: 28.34 },
      { month: 'Jan 2024', price: 28.45 },
      { month: 'Feb 2024', price: 28.56 },
      { month: 'Mar 2024', price: 28.67 },
      { month: 'Apr 2024', price: 28.78 },
      { month: 'May 2024', price: 28.89 },
      { month: 'Jun 2024', price: 28.99 },
      { month: 'Jul 2024', price: 29.12 },
      { month: 'Aug 2024', price: 29.18 },
      { month: 'Sep 2024', price: 29.24 },
      { month: 'Oct 2024', price: 29.35 },
      { month: 'Nov 2024', price: 29.46 },
      { month: 'Dec 2024', price: 29.56 },
      { month: 'Jan 2025', price: 29.67 },
      { month: 'Feb 2025', price: 29.82 },
    ]
  },
  {
    id: 2,
    category: 'Books',
    avgPrice: 15.11,
    priceRange: { min: 0.99, max: 398.67 },
    priceByMonth: [
      { month: 'Mar 2023', price: 14.32 },
      { month: 'Apr 2023', price: 14.41 },
      { month: 'May 2023', price: 14.49 },
      { month: 'Jun 2023', price: 14.57 },
      { month: 'Jul 2023', price: 14.67 },
      { month: 'Aug 2023', price: 14.78 },
      { month: 'Sep 2023', price: 14.89 },
      { month: 'Oct 2023', price: 14.97 },
      { month: 'Nov 2023', price: 15.05 },
      { month: 'Dec 2023', price: 15.12 },
      { month: 'Jan 2024', price: 15.21 },
      { month: 'Feb 2024', price: 15.27 },
      { month: 'Mar 2024', price: 15.33 },
      { month: 'Apr 2024', price: 15.39 },
      { month: 'May 2024', price: 15.42 },
      { month: 'Jun 2024', price: 15.45 },
      { month: 'Jul 2024', price: 15.56 },
      { month: 'Aug 2024', price: 15.67 },
      { month: 'Sep 2024', price: 15.76 },
      { month: 'Oct 2024', price: 15.83 },
      { month: 'Nov 2024', price: 15.91 },
      { month: 'Dec 2024', price: 15.98 },
      { month: 'Jan 2025', price: 16.12 },
      { month: 'Feb 2025', price: 16.22 },
    ]
  },
  {
    id: 3,
    category: 'Tools & Home Improvement',
    avgPrice: 35.99,
    priceRange: { min: 5.99, max: 499.99 },
    priceByMonth: [
      { month: 'Mar 2023', price: 33.45 },
      { month: 'Apr 2023', price: 33.67 },
      { month: 'May 2023', price: 33.89 },
      { month: 'Jun 2023', price: 34.12 },
      { month: 'Jul 2023', price: 34.45 },
      { month: 'Aug 2023', price: 34.67 },
      { month: 'Sep 2023', price: 34.89 },
      { month: 'Oct 2023', price: 35.12 },
      { month: 'Nov 2023', price: 35.24 },
      { month: 'Dec 2023', price: 35.34 },
      { month: 'Jan 2024', price: 35.45 },
      { month: 'Feb 2024', price: 35.56 },
      { month: 'Mar 2024', price: 35.67 },
      { month: 'Apr 2024', price: 35.78 },
      { month: 'May 2024', price: 35.89 },
      { month: 'Jun 2024', price: 35.99 },
      { month: 'Jul 2024', price: 36.12 },
      { month: 'Aug 2024', price: 36.18 },
      { month: 'Sep 2024', price: 36.24 },
      { month: 'Oct 2024', price: 36.35 },
      { month: 'Nov 2024', price: 36.46 },
      { month: 'Dec 2024', price: 36.56 },
      { month: 'Jan 2025', price: 36.67 },
      { month: 'Feb 2025', price: 36.82 },
    ]
  }
];

// Subcategory Elasticity Data
export const subcategoryElasticityData = [
  { 
    name: 'Strollers', 
    elasticity: -0.85, 
    avgPrice: 349.99, 
    unitsSold: 452,
    category: 'Baby Products'
  },
  { 
    name: 'Baby Furniture', 
    elasticity: -0.65, 
    avgPrice: 189.99, 
    unitsSold: 723,
    category: 'Baby Products'
  },
  { 
    name: 'Baby Toys', 
    elasticity: -0.54, 
    avgPrice: 24.99, 
    unitsSold: 3211,
    category: 'Baby Products'
  },
  { 
    name: 'Diapers', 
    elasticity: -0.30, 
    avgPrice: 42.99, 
    unitsSold: 8945,
    category: 'Baby Products'
  },
  { 
    name: 'Business Books', 
    elasticity: -0.31, 
    avgPrice: 18.99, 
    unitsSold: 2345,
    category: 'Books'
  },
  { 
    name: 'Fiction Books', 
    elasticity: -0.25, 
    avgPrice: 12.99, 
    unitsSold: 12678,
    category: 'Books'
  },
  { 
    name: 'Children\'s Books', 
    elasticity: -0.09, 
    avgPrice: 8.99, 
    unitsSold: 22456,
    category: 'Books'
  },
  { 
    name: 'Paint & Wall Treatments', 
    elasticity: -0.95, 
    avgPrice: 28.99, 
    unitsSold: 3150,
    category: 'Tools & Home Improvement'
  },
  { 
    name: 'Power & Hand Tools', 
    elasticity: -0.89, 
    avgPrice: 45.99, 
    unitsSold: 2780,
    category: 'Tools & Home Improvement'
  },
  { 
    name: 'Hardware', 
    elasticity: -1.16, 
    avgPrice: 24.99, 
    unitsSold: 5450,
    category: 'Tools & Home Improvement'
  },
];

// Competitor Data
export const competitorData = [
  {
    name: 'Amazon',
    elasticityBaby: -0.27,
    elasticityBooks: -0.24,
    avgPriceBaby: 28.56,
    avgPriceBooks: 15.11,
    marketShare: 38.7
  },
  {
    name: 'Walmart',
    elasticityBaby: -1.2,
    elasticityBooks: -0.8,
    avgPriceBaby: 24.89,
    avgPriceBooks: 13.45,
    marketShare: 18.3
  },
  {
    name: 'Target',
    elasticityBaby: -0.9,
    elasticityBooks: -0.7,
    avgPriceBaby: 26.12,
    avgPriceBooks: 14.23,
    marketShare: 12.5
  },
  {
    name: 'Buy Buy Baby',
    elasticityBaby: -0.7,
    elasticityBooks: null,
    avgPriceBaby: 32.45,
    avgPriceBooks: null,
    marketShare: 5.2
  },
  {
    name: 'Barnes & Noble',
    elasticityBaby: null,
    elasticityBooks: -0.4,
    avgPriceBaby: null,
    avgPriceBooks: 16.78,
    marketShare: 4.8
  },
  {
    name: 'Home Depot',
    elasticityBaby: null,
    elasticityBooks: null,
    elasticityTools: -0.98,
    avgPriceBaby: null,
    avgPriceBooks: null,
    avgPriceTools: 37.45,
    marketShare: 12.4
  },
  {
    name: 'Lowe\'s',
    elasticityBaby: null,
    elasticityBooks: null,
    elasticityTools: -1.02,
    avgPriceBaby: null,
    avgPriceBooks: null,
    avgPriceTools: 36.89,
    marketShare: 10.8
  }
];

// Monthly elasticity data for Tools & Home Improvement
export const toolsMonthlyElasticityData = [
  { month: 'Jan', elasticity: -0.70 },
  { month: 'Feb', elasticity: -0.85 },
  { month: 'Mar', elasticity: -0.70 },
  { month: 'Apr', elasticity: -2.20 },
  { month: 'May', elasticity: -1.12 },
  { month: 'Jun', elasticity: -1.82 },
  { month: 'Jul', elasticity: -0.70 },
  { month: 'Aug', elasticity: -1.87 },
  { month: 'Sep', elasticity: -0.70 },
  { month: 'Oct', elasticity: -0.70 },
  { month: 'Nov', elasticity: -0.70 },
  { month: 'Dec', elasticity: -0.70 }
];

// Subcategory monthly elasticity data
export const subcategoryMonthlyElasticityData = {
  'Paint & Wall Treatments': [
    { month: 'Jan', elasticity: -0.88 },
    { month: 'Feb', elasticity: -0.70 },
    { month: 'Mar', elasticity: -0.70 },
    { month: 'Apr', elasticity: -0.79 },
    { month: 'May', elasticity: -1.72 },
    { month: 'Jun', elasticity: -0.70 },
    { month: 'Jul', elasticity: -0.70 },
    { month: 'Aug', elasticity: -2.00 },
    { month: 'Sep', elasticity: -0.79 },
    { month: 'Oct', elasticity: -0.70 },
    { month: 'Nov', elasticity: -0.70 },
    { month: 'Dec', elasticity: -0.70 }
  ],
  'Power & Hand Tools': [
    { month: 'Jan', elasticity: -0.70 },
    { month: 'Feb', elasticity: -0.76 },
    { month: 'Mar', elasticity: -1.18 },
    { month: 'Apr', elasticity: -0.60 },
    { month: 'May', elasticity: -0.76 },
    { month: 'Jun', elasticity: -0.89 },
    { month: 'Jul', elasticity: -1.02 },
    { month: 'Aug', elasticity: -0.60 },
    { month: 'Sep', elasticity: -0.60 },
    { month: 'Oct', elasticity: -2.00 },
    { month: 'Nov', elasticity: -0.60 },
    { month: 'Dec', elasticity: -1.01 }
  ],
  'Hardware': [
    { month: 'Jan', elasticity: -0.70 },
    { month: 'Feb', elasticity: -0.70 },
    { month: 'Mar', elasticity: -1.13 },
    { month: 'Apr', elasticity: -1.66 },
    { month: 'May', elasticity: -1.20 },
    { month: 'Jun', elasticity: -0.50 },
    { month: 'Jul', elasticity: -1.20 },
    { month: 'Aug', elasticity: -1.82 },
    { month: 'Sep', elasticity: -1.20 },
    { month: 'Oct', elasticity: -1.80 },
    { month: 'Nov', elasticity: -1.11 },
    { month: 'Dec', elasticity: -1.38 }
  ]
};
