
import React from 'react';
import { useAssortmentData, getApiKeyStatus, AssortmentProduct } from '@/services/assortmentApi';

interface PriceRange {
  id: string;
  name: string;
  min: number;
  max: number;
}

interface RangeData {
  count: number;
  percentage: number;
  pdvs: number;
  pdvPercentage?: number;
}

interface AssortmentDataStructure {
  [retailerId: string]: {
    [categoryId: string]: {
      [priceRangeId: string]: RangeData;
    };
  };
}

export const useAssortmentAnalysis = (
  selectedRetailers: string[],
  selectedCategories: string[],
  minPrice: string,
  maxPrice: string,
) => {
  const [assortmentData, setAssortmentData] = React.useState<AssortmentDataStructure>({});
  const apiKeyStatus = getApiKeyStatus();

  // Create a price range object based on inputs
  const priceRange = React.useMemo(() => ({
    min: parseInt(minPrice) || 0,
    max: parseInt(maxPrice) || 100
  }), [minPrice, maxPrice]);

  // Generate price ranges based on intervals
  const generatePriceRanges = (min: number, max: number, interval: number): PriceRange[] => {
    const ranges: PriceRange[] = [];
    let currentMin = min;
    
    while (currentMin < max) {
      const currentMax = currentMin + interval - 1;
      ranges.push({
        id: `${currentMin}-${currentMax}`,
        name: `£${currentMin}-${currentMax}`,
        min: currentMin,
        max: currentMax
      });
      currentMin = currentMax + 1;
    }
    
    ranges.push({
      id: `${currentMin}+`,
      name: `£${currentMin}+`,
      min: currentMin,
      max: Infinity
    });
    
    return ranges;
  };

  // Create individual queries for each retailer/category combination
  const assortmentQueries = selectedRetailers.map(retailerId => 
    selectedCategories.map(categoryId => {
      return useAssortmentData(retailerId, categoryId, priceRange);
    })
  ).flat();

  const isLoading = assortmentQueries.some(query => query.isLoading);
  const hasError = assortmentQueries.some(query => query.isError);
  const apiNotSet = !apiKeyStatus.isSet;

  // Process API responses into the format expected by the table
  React.useEffect(() => {
    if (!isLoading && !hasError && !apiNotSet) {
      const newAssortmentData: AssortmentDataStructure = {};
      
      // Process each query result
      assortmentQueries.forEach((query, index) => {
        if (query.data) {
          const retailerIndex = Math.floor(index / selectedCategories.length);
          const categoryIndex = index % selectedCategories.length;
          const retailerId = selectedRetailers[retailerIndex];
          const categoryId = selectedCategories[categoryIndex];
          
          if (!newAssortmentData[retailerId]) {
            newAssortmentData[retailerId] = {};
          }
          
          if (!newAssortmentData[retailerId][categoryId]) {
            newAssortmentData[retailerId][categoryId] = {};
          }
          
          // Map API price ranges to our data structure
          if (query.data.priceRanges) {
            Object.entries(query.data.priceRanges).forEach(([priceRangeId, data]) => {
              newAssortmentData[retailerId][categoryId][priceRangeId] = {
                count: data.count,
                percentage: data.percentage,
                pdvs: data.pdvs,
                pdvPercentage: data.pdvPercentage
              };
            });
          } else {
            // Fallback if API doesn't provide structured price ranges
            // This code path handles mock/development data
            const generatedPriceRanges = generatePriceRanges(
              parseInt(minPrice) || 0,
              parseInt(maxPrice) || 100,
              10 // Default interval
            );
            
            // Group products by price range
            const productsByPriceRange: Record<string, AssortmentProduct[]> = {};
            const products = query.data.products || [];
            
            generatedPriceRanges.forEach(range => {
              productsByPriceRange[range.id] = products.filter(
                p => p.price >= range.min && p.price <= range.max
              );
            });
            
            const totalCount = products.length;
            const totalPdvs = products.reduce((sum, p) => sum + p.pdpViews, 0);
            
            // Calculate metrics for each price range
            generatedPriceRanges.forEach(range => {
              const rangeProducts = productsByPriceRange[range.id] || [];
              const count = rangeProducts.length;
              const pdvs = rangeProducts.reduce((sum, p) => sum + p.pdpViews, 0);
              
              newAssortmentData[retailerId][categoryId][range.id] = {
                count,
                percentage: totalCount > 0 ? (count / totalCount) * 100 : 0,
                pdvs,
                pdvPercentage: totalPdvs > 0 ? (pdvs / totalPdvs) * 100 : 0
              };
            });
          }
        }
      });
      
      setAssortmentData(newAssortmentData);
    } else if (apiNotSet) {
      // Clear data if API key is not set
      setAssortmentData({});
    }
  }, [assortmentQueries, isLoading, hasError, apiNotSet, selectedRetailers, selectedCategories, minPrice, maxPrice]);

  return {
    assortmentData,
    isLoading,
    hasError,
    apiNotSet
  };
};
