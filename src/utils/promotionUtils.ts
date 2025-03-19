/**
 * Calculate projected sales and revenue based on elasticity values
 */
export const calculatePromotionImpact = (
  basePrice: number,
  baseSales: number,
  discountPercentage: number,
  category: string,
  subcategory: string,
  month: string
) => {
  let elasticityValue = -0.89;
  
  if (category === 'baby') {
    if (subcategory === 'feeding') elasticityValue = -1.03;
    else if (subcategory === 'diapers') elasticityValue = -0.97;
    else if (subcategory === 'bath') elasticityValue = -0.34;
    else if (subcategory === 'furniture') elasticityValue = -0.62;
    else if (subcategory === 'strollers') elasticityValue = -0.58;
    else if (subcategory === 'toys') elasticityValue = -0.74;
    else if (subcategory === 'all') elasticityValue = -0.78;
  } else if (category === 'books') {
    if (subcategory === 'business') elasticityValue = -0.56;
    else if (subcategory === 'fiction') elasticityValue = -0.66;
    else if (subcategory === 'children') elasticityValue = -0.42;
    else if (subcategory === 'academic') elasticityValue = -0.52;
    else if (subcategory === 'all') elasticityValue = -0.55;
  } else if (category === 'tools') {
    if (subcategory === 'paint') elasticityValue = -0.95;
    else if (subcategory === 'power_tools') elasticityValue = -0.89;
    else if (subcategory === 'hardware') elasticityValue = -1.16;
    else if (subcategory === 'all') elasticityValue = -1.06;
    
    // Apply specific month elasticity for tools category
    if (month === 'jan') elasticityValue = -0.70;
    else if (month === 'feb') elasticityValue = -0.85;
    else if (month === 'mar') elasticityValue = -0.70;
    else if (month === 'apr') elasticityValue = -2.20;
    else if (month === 'may') elasticityValue = -1.12;
    else if (month === 'jun') elasticityValue = -1.82;
    else if (month === 'jul') elasticityValue = -0.70;
    else if (month === 'aug') elasticityValue = -1.87;
    else if (month === 'sep') elasticityValue = -0.70;
    else if (month === 'oct') elasticityValue = -0.70;
    else if (month === 'nov') elasticityValue = -0.70;
    else if (month === 'dec') elasticityValue = -0.70;
    
    // Apply subcategory-specific monthly elasticity if both subcategory and month are specified
    if (subcategory === 'paint' && month) {
      if (month === 'jan') elasticityValue = -0.88;
      else if (month === 'feb') elasticityValue = -0.70;
      else if (month === 'mar') elasticityValue = -0.70;
      else if (month === 'apr') elasticityValue = -0.79;
      else if (month === 'may') elasticityValue = -1.72;
      else if (month === 'jun') elasticityValue = -0.70;
      else if (month === 'jul') elasticityValue = -0.70;
      else if (month === 'aug') elasticityValue = -2.00;
      else if (month === 'sep') elasticityValue = -0.79;
      else if (month === 'oct') elasticityValue = -0.70;
      else if (month === 'nov') elasticityValue = -0.70;
      else if (month === 'dec') elasticityValue = -0.70;
    } else if (subcategory === 'power_tools' && month) {
      if (month === 'jan') elasticityValue = -0.70;
      else if (month === 'feb') elasticityValue = -0.76;
      else if (month === 'mar') elasticityValue = -1.18;
      else if (month === 'apr') elasticityValue = -0.60;
      else if (month === 'may') elasticityValue = -0.76;
      else if (month === 'jun') elasticityValue = -0.89;
      else if (month === 'jul') elasticityValue = -1.02;
      else if (month === 'aug') elasticityValue = -0.60;
      else if (month === 'sep') elasticityValue = -0.60;
      else if (month === 'oct') elasticityValue = -2.00;
      else if (month === 'nov') elasticityValue = -0.60;
      else if (month === 'dec') elasticityValue = -1.01;
    } else if (subcategory === 'hardware' && month) {
      if (month === 'jan') elasticityValue = -0.70;
      else if (month === 'feb') elasticityValue = -0.70;
      else if (month === 'mar') elasticityValue = -1.13;
      else if (month === 'apr') elasticityValue = -1.66;
      else if (month === 'may') elasticityValue = -1.20;
      else if (month === 'jun') elasticityValue = -0.50;
      else if (month === 'jul') elasticityValue = -1.20;
      else if (month === 'aug') elasticityValue = -1.82;
      else if (month === 'sep') elasticityValue = -1.20;
      else if (month === 'oct') elasticityValue = -1.80;
      else if (month === 'nov') elasticityValue = -1.11;
      else if (month === 'dec') elasticityValue = -1.38;
    }
  }
  
  // Apply seasonal multipliers for non-tools categories
  if (category !== 'tools') {
    if (month === 'jul') elasticityValue *= 1.7;
    else if (month === 'nov' || month === 'dec') {
      if (category === 'books') elasticityValue *= 1.5;
      else elasticityValue *= 1.2;
    } else if (month === 'jan' || month === 'feb') {
      elasticityValue *= 0.8; // Less responsive in post-holiday months
    } else if (month === 'apr' || month === 'may') {
      if (category === 'baby') elasticityValue *= 1.1; // Slightly more responsive in spring for baby products
    }
  }
  
  const discountRate = discountPercentage / 100;
  const newPrice = basePrice * (1 - discountRate);
  const salesImpact = baseSales * (1 + (-elasticityValue * discountRate));
  
  const newRevenue = salesImpact * newPrice;
  const currentRevenue = baseSales * basePrice;
  const revImpact = newRevenue - currentRevenue;
  
  // Calculate optimal discount based on elasticity
  // Optimal discount percentage = 100 / abs(elasticity)
  // But cap at 50% to prevent unrealistic discounts
  const optDiscount = Math.min(Math.round(100 / Math.abs(elasticityValue)), 50);
  
  return {
    projectedSales: Math.round(salesImpact),
    projectedRevenue: Math.round(newRevenue),
    revenueImpact: Math.round(revImpact),
    optimalDiscount: optDiscount,
    elasticity: elasticityValue
  };
};

/**
 * Generate heatmap data for elasticity visualization
 */
export const generateHeatmapData = (monthlyElasticityData: any[]) => {
  const heatmapData: any[] = [];
  for (let i = 0; i < 12; i++) {
    for (let j = 0; j < 2; j++) {
      const category = j === 0 ? 'Baby' : 'Books';
      const elasticity = j === 0 ? monthlyElasticityData[i].baby : monthlyElasticityData[i].books;
      heatmapData.push({
        month: monthlyElasticityData[i].month,
        category: category,
        elasticity: Math.abs(elasticity),
        value: Math.abs(elasticity)
      });
    }
  }
  return heatmapData;
};

/**
 * Generate promotion test data
 */
export const generatePromotionData = () => {
  const monthlyElasticityData = [
    { month: 'Jan', baby: -0.65, books: -0.45, tools: -0.70 },
    { month: 'Feb', baby: -0.71, books: -0.48, tools: -0.85 },
    { month: 'Mar', baby: -0.68, books: -0.52, tools: -0.70 },
    { month: 'Apr', baby: -0.74, books: -0.55, tools: -2.20 },
    { month: 'May', baby: -0.82, books: -0.59, tools: -1.12 },
    { month: 'Jun', baby: -0.91, books: -0.62, tools: -1.82 },
    { month: 'Jul', baby: -1.53, books: -0.84, tools: -0.70 },
    { month: 'Aug', baby: -0.93, books: -0.66, tools: -1.87 },
    { month: 'Sep', baby: -0.79, books: -0.64, tools: -0.70 },
    { month: 'Oct', baby: -0.85, books: -0.78, tools: -0.70 },
    { month: 'Nov', baby: -0.94, books: -0.93, tools: -0.70 },
    { month: 'Dec', baby: -0.98, books: -0.96, tools: -0.70 }
  ];

  const subcategoryElasticityData = [
    { name: 'Feeding', elasticity: -1.03, category: 'Baby' },
    { name: 'Diapers', elasticity: -0.97, category: 'Baby' },
    { name: 'Furniture', elasticity: -0.62, category: 'Baby' },
    { name: 'Strollers', elasticity: -0.58, category: 'Baby' },
    { name: 'Toys', elasticity: -0.74, category: 'Baby' },
    { name: 'Bath', elasticity: -0.34, category: 'Baby' },
    { name: 'Business', elasticity: -0.56, category: 'Books' },
    { name: 'Fiction', elasticity: -0.66, category: 'Books' },
    { name: 'Children', elasticity: -0.42, category: 'Books' },
    { name: 'Academic', elasticity: -0.52, category: 'Books' },
    { name: 'Paint & Wall Treatments', elasticity: -0.95, category: 'Tools' },
    { name: 'Power & Hand Tools', elasticity: -0.89, category: 'Tools' },
    { name: 'Hardware', elasticity: -1.16, category: 'Tools' }
  ];

  const priceSensitivityData = [
    { name: 'Price Increase', value: 0.89 },
    { name: 'Price Discount', value: 0.04 }
  ];
  
  // Generate seasonal strategy data
  const seasonalStrategyData = {
    peakSeasonMonths: ['Apr', 'May', 'Jun', 'Aug', 'Jul', 'Nov', 'Dec'],
    offPeakMonths: ['Jan', 'Feb', 'Mar', 'Sep', 'Oct'],
    
    peakSeasonRecommendations: [
      { category: 'Baby', subcategory: 'Feeding', recommendedDiscount: 15, elasticity: -1.03 * 1.2 },
      { category: 'Baby', subcategory: 'Diapers', recommendedDiscount: 20, elasticity: -0.97 * 1.2 },
      { category: 'Books', subcategory: 'Fiction', recommendedDiscount: 25, elasticity: -0.66 * 1.5 },
      { category: 'Books', subcategory: 'Children', recommendedDiscount: 30, elasticity: -0.42 * 1.5 },
      { category: 'Tools', subcategory: 'Paint & Wall Treatments', recommendedDiscount: 20, elasticity: -2.00 },
      { category: 'Tools', subcategory: 'Hardware', recommendedDiscount: 25, elasticity: -1.80 }
    ],
    
    offPeakRecommendations: [
      { category: 'Baby', subcategory: 'Bath', recommendedDiscount: 25, elasticity: -0.34 * 0.9 },
      { category: 'Baby', subcategory: 'Strollers', recommendedDiscount: 10, elasticity: -0.58 * 0.9 },
      { category: 'Books', subcategory: 'Business', recommendedDiscount: 15, elasticity: -0.56 * 0.9 },
      { category: 'Books', subcategory: 'Academic', recommendedDiscount: 20, elasticity: -0.52 * 0.9 },
      { category: 'Tools', subcategory: 'Power & Hand Tools', recommendedDiscount: 15, elasticity: -0.60 },
      { category: 'Tools', subcategory: 'Hardware', recommendedDiscount: 10, elasticity: -0.50 }
    ],
    
    monthlyRecommendations: {
      'Jan': { focus: 'Books', bestSubcategory: 'Business', discount: 15 },
      'Feb': { focus: 'Books', bestSubcategory: 'Academic', discount: 20 },
      'Mar': { focus: 'Tools', bestSubcategory: 'Power & Hand Tools', discount: 15 },
      'Apr': { focus: 'Tools', bestSubcategory: 'Hardware', discount: 25 },
      'May': { focus: 'Tools', bestSubcategory: 'Paint & Wall Treatments', discount: 20 },
      'Jun': { focus: 'Tools', bestSubcategory: 'Hardware', discount: 10 },
      'Jul': { focus: 'Baby', bestSubcategory: 'Feeding', discount: 15 },
      'Aug': { focus: 'Tools', bestSubcategory: 'Paint & Wall Treatments', discount: 30 },
      'Sep': { focus: 'Books', bestSubcategory: 'Academic', discount: 20 },
      'Oct': { focus: 'Tools', bestSubcategory: 'Power & Hand Tools', discount: 25 },
      'Nov': { focus: 'Books', bestSubcategory: 'Fiction', discount: 25 },
      'Dec': { focus: 'Books', bestSubcategory: 'Children', discount: 30 }
    }
  };

  return {
    monthlyElasticityData,
    subcategoryElasticityData,
    priceSensitivityData,
    seasonalStrategyData
  };
};

/**
 * Generate campaign calendar data
 */
export const generateCampaignCalendar = () => {
  return [
    { id: 1, month: 'Jan', category: 'Books', subcategory: 'Business', discount: 15, revenueImpact: '+5.2%', salesLift: '+8.3%' },
    { id: 2, month: 'Feb', category: 'Books', subcategory: 'Academic', discount: 20, revenueImpact: '+3.7%', salesLift: '+11.2%' },
    { id: 3, month: 'Mar', category: 'Baby', subcategory: 'Bath', discount: 25, revenueImpact: '+2.1%', salesLift: '+9.0%' },
    { id: 4, month: 'Apr', category: 'Baby', subcategory: 'Furniture', discount: 15, revenueImpact: '+4.3%', salesLift: '+9.9%' },
    { id: 5, month: 'May', category: 'Baby', subcategory: 'Strollers', discount: 10, revenueImpact: '+4.8%', salesLift: '+6.2%' },
    { id: 6, month: 'Jun', category: 'Baby', subcategory: 'Toys', discount: 20, revenueImpact: '+5.1%', salesLift: '+14.8%' },
    { id: 7, month: 'Jul', category: 'Baby', subcategory: 'Feeding', discount: 15, revenueImpact: '+12.8%', salesLift: '+25.5%' },
    { id: 8, month: 'Aug', category: 'Books', subcategory: 'Children', discount: 30, revenueImpact: '+2.6%', salesLift: '+12.6%' },
    { id: 9, month: 'Sep', category: 'Books', subcategory: 'Academic', discount: 20, revenueImpact: '+3.9%', salesLift: '+11.7%' },
    { id: 10, month: 'Oct', category: 'Baby', subcategory: 'Diapers', discount: 20, revenueImpact: '+6.7%', salesLift: '+19.4%' },
    { id: 11, month: 'Nov', category: 'Books', subcategory: 'Fiction', discount: 25, revenueImpact: '+9.8%', salesLift: '+25.1%' },
    { id: 12, month: 'Dec', category: 'Books', subcategory: 'Children', discount: 30, revenueImpact: '+10.5%', salesLift: '+31.7%' }
  ];
};

/**
 * Calculate elasticity for what-if scenarios
 */
export const calculateWhatIfScenario = (
  baseElasticity: number,
  factorAdjustments: {
    competitorActivity?: number;  // -1 to 1 scale
    seasonality?: number;         // -1 to 1 scale
    advertisingSupport?: number;  // 0 to 1 scale
    productLifecycle?: string;    // 'new', 'growth', 'mature', 'decline'
  }
) => {
  let adjustedElasticity = baseElasticity;
  
  // Apply competitor activity adjustment
  if (factorAdjustments.competitorActivity !== undefined) {
    // More competitor activity = higher elasticity (more responsive)
    adjustedElasticity *= (1 + factorAdjustments.competitorActivity * 0.3);
  }
  
  // Apply seasonality adjustment
  if (factorAdjustments.seasonality !== undefined) {
    // Peak season = higher elasticity
    adjustedElasticity *= (1 + factorAdjustments.seasonality * 0.5);
  }
  
  // Apply advertising support adjustment
  if (factorAdjustments.advertisingSupport !== undefined) {
    // More ad support = higher elasticity
    adjustedElasticity *= (1 + factorAdjustments.advertisingSupport * 0.4);
  }
  
  // Apply product lifecycle adjustment
  if (factorAdjustments.productLifecycle) {
    switch (factorAdjustments.productLifecycle) {
      case 'new':
        adjustedElasticity *= 0.8; // Less elastic (less price sensitive)
        break;
      case 'growth':
        adjustedElasticity *= 1.0; // Normal elasticity
        break;
      case 'mature':
        adjustedElasticity *= 1.2; // More elastic
        break;
      case 'decline':
        adjustedElasticity *= 1.5; // Much more elastic
        break;
    }
  }
  
  return adjustedElasticity;
};
