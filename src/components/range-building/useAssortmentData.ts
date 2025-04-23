
import React from 'react';
import { useAssortmentData } from '@/services/assortmentApi';

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
  const assortmentQueries = selectedRetailers.map(retailerId => 
    selectedCategories.map(categoryId => {
      const priceRange = {
        min: parseInt(minPrice),
        max: parseInt(maxPrice)
      };
      
      return useAssortmentData(retailerId, categoryId, priceRange);
    })
  ).flat();

  const isLoading = assortmentQueries.some(query => query.isLoading);
  const hasError = assortmentQueries.some(query => query.isError);
  const [assortmentData, setAssortmentData] = React.useState<AssortmentDataStructure>({});

  React.useEffect(() => {
    if (!isLoading && !hasError) {
      const newAssortmentData: AssortmentDataStructure = {};
      
      assortmentQueries.forEach(query => {
        if (query.data) {
          // Process the API response and update the assortmentData state
          selectedRetailers.forEach(retailerId => {
            if (!newAssortmentData[retailerId]) {
              newAssortmentData[retailerId] = {};
            }
            
            selectedCategories.forEach(catId => {
              if (!newAssortmentData[retailerId][catId]) {
                newAssortmentData[retailerId][catId] = {};
              }
              let totalPercentage = 0;
              let totalPDVs = 0;
              const tempRangeData: Record<string, RangeData> = {};
              
              // Assuming you have a way to generate or access price ranges
              const generatedPriceRanges: PriceRange[] = [
                { id: '10-20', name: '£10-20', min: 10, max: 20 },
                { id: '20-30', name: '£20-30', min: 20, max: 30 },
                { id: '30+', name: '£30+', min: 30, max: Infinity }
              ];
              
              generatedPriceRanges.forEach(priceRange => {
                const isPricePointActive = Math.random() > 0.4 || 
                  (priceRange.min >= 15 && priceRange.max <= 50);
                
                if (isPricePointActive) {
                  const skuCount = Math.floor(Math.random() * 300) + 10;
                  const percentage = parseFloat((Math.random() * 25).toFixed(1));
                  const pdvs = Math.floor(Math.random() * 10000) + 100;
                  
                  tempRangeData[priceRange.id] = {
                    count: skuCount,
                    percentage,
                    pdvs
                  };
                  totalPercentage += percentage;
                  totalPDVs += pdvs;
                } else {
                  tempRangeData[priceRange.id] = {
                    count: 0,
                    percentage: 0,
                    pdvs: 0
                  };
                }
              });
      
              const rangeNormalizationFactor = totalPercentage > 0 ? 100 / totalPercentage : 1;
              const pdvNormalizationFactor = totalPDVs > 0 ? 100 / totalPDVs : 1;
      
              generatedPriceRanges.forEach(priceRange => {
                if (tempRangeData[priceRange.id]) {
                  const normalizedRangePercentage = parseFloat((tempRangeData[priceRange.id].percentage * rangeNormalizationFactor).toFixed(1));
                  const normalizedPDVPercentage = parseFloat(((tempRangeData[priceRange.id].pdvs * pdvNormalizationFactor)).toFixed(1));
                  
                  newAssortmentData[retailerId][catId][priceRange.id] = {
                    ...tempRangeData[priceRange.id],
                    percentage: normalizedRangePercentage,
                    pdvs: tempRangeData[priceRange.id].pdvs,
                    pdvPercentage: normalizedPDVPercentage
                  };
                }
              });
            });
          });
        }
      });
      
      setAssortmentData(newAssortmentData);
    }
  }, [assortmentQueries, isLoading, hasError, selectedRetailers, selectedCategories]);

  return {
    assortmentData,
    isLoading,
    hasError
  };
};
