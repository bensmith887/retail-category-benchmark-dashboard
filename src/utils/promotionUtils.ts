
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
    else if (subcategory === 'all') elasticityValue = -0.78;
  } else if (category === 'books') {
    if (subcategory === 'business') elasticityValue = -0.56;
    else if (subcategory === 'fiction') elasticityValue = -0.66;
    else if (subcategory === 'children') elasticityValue = -0.42;
    else if (subcategory === 'all') elasticityValue = -0.55;
  }
  
  if (month === 'jul') elasticityValue *= 1.7;
  else if (month === 'nov' || month === 'dec') {
    if (category === 'books') elasticityValue *= 1.5;
    else elasticityValue *= 1.2;
  }
  
  const discountRate = discountPercentage / 100;
  const newPrice = basePrice * (1 - discountRate);
  const salesImpact = baseSales * (1 + (-elasticityValue * discountRate));
  
  const newRevenue = salesImpact * newPrice;
  const currentRevenue = baseSales * basePrice;
  const revImpact = newRevenue - currentRevenue;
  
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
    { month: 'Jan', baby: -0.65, books: -0.45 },
    { month: 'Feb', baby: -0.71, books: -0.48 },
    { month: 'Mar', baby: -0.68, books: -0.52 },
    { month: 'Apr', baby: -0.74, books: -0.55 },
    { month: 'May', baby: -0.82, books: -0.59 },
    { month: 'Jun', baby: -0.91, books: -0.62 },
    { month: 'Jul', baby: -1.53, books: -0.84 },
    { month: 'Aug', baby: -0.93, books: -0.66 },
    { month: 'Sep', baby: -0.79, books: -0.64 },
    { month: 'Oct', baby: -0.85, books: -0.78 },
    { month: 'Nov', baby: -0.94, books: -0.93 },
    { month: 'Dec', baby: -0.98, books: -0.96 }
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
    { name: 'Academic', elasticity: -0.52, category: 'Books' }
  ];

  const priceSensitivityData = [
    { name: 'Price Increase', value: 0.89 },
    { name: 'Price Discount', value: 0.04 }
  ];

  return {
    monthlyElasticityData,
    subcategoryElasticityData,
    priceSensitivityData
  };
};
