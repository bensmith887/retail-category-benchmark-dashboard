
import { useQuery } from '@tanstack/react-query';

// Types for the API response
export interface AssortmentProduct {
  id: string;
  name: string;
  sku: string;
  price: number;
  originalPrice?: number;
  discount: number;
  pdpViews: number;
  conversionRate: number;
  inStock: boolean;
  trending: boolean;
}

export interface AssortmentApiResponse {
  products: AssortmentProduct[];
  metrics: {
    totalProducts: number;
    avgPrice: number;
    avgDiscount: number;
    totalViews: number;
  };
  priceRanges: {
    [priceRangeId: string]: {
      count: number;
      percentage: number;
      pdvs: number;
      pdvPercentage: number;
    };
  };
}

// API configuration
let currentApiKey = '';
const API_BASE_URL = 'https://your-api-endpoint.com'; // Replace with your actual API endpoint

// Set the API key
export const setApiKey = (apiKey: string) => {
  currentApiKey = apiKey;
};

// Get the current API key status
export const getApiKeyStatus = (): { isSet: boolean } => {
  return { isSet: !!currentApiKey };
};

// Fetch assortment data from the API
export const fetchAssortmentData = async (
  retailerId: string,
  categoryId: string,
  priceRange?: { min: number; max: number }
): Promise<AssortmentApiResponse> => {
  if (!currentApiKey) {
    throw new Error('API key not set');
  }

  const queryParams = new URLSearchParams({
    retailerId,
    categoryId,
    ...(priceRange && {
      minPrice: priceRange.min.toString(),
      maxPrice: priceRange.max.toString(),
    }),
  });

  try {
    const response = await fetch(`${API_BASE_URL}/assortment?${queryParams}`, {
      headers: {
        'Authorization': `Bearer ${currentApiKey}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to fetch assortment data: ${response.status} ${errorText}`);
    }

    // If API call succeeds but we're in development/testing mode without a real API,
    // return mock data that matches our expected structure
    if (process.env.NODE_ENV === 'development') {
      return generateMockAssortmentData(retailerId, categoryId, priceRange);
    }

    return response.json();
  } catch (error) {
    console.error("Error fetching assortment data:", error);
    
    // For development/demo purposes, return mock data that matches our expected structure
    if (process.env.NODE_ENV === 'development') {
      return generateMockAssortmentData(retailerId, categoryId, priceRange);
    }
    
    throw error;
  }
};

// Generate mock data for development/testing
const generateMockAssortmentData = (
  retailerId: string,
  categoryId: string,
  priceRange?: { min: number; max: number }
): AssortmentApiResponse => {
  const min = priceRange?.min || 0;
  const max = priceRange?.max || 100;
  
  // Create price range buckets based on the min/max
  const priceRanges: { [id: string]: { count: number; percentage: number; pdvs: number; pdvPercentage: number } } = {};
  
  // Generate 3 price ranges
  const range1 = { id: `${min}-${min+30}`, name: `£${min}-${min+30}` };
  const range2 = { id: `${min+31}-${min+60}`, name: `£${min+31}-${min+60}` };
  const range3 = { id: `${min+61}-${max}`, name: `£${min+61}+` };
  
  const totalCount = Math.floor(Math.random() * 1000) + 100;
  const totalPdvs = Math.floor(Math.random() * 50000) + 5000;
  
  const range1Count = Math.floor(totalCount * (0.3 + Math.random() * 0.2));
  const range2Count = Math.floor(totalCount * (0.2 + Math.random() * 0.2));
  const range3Count = totalCount - range1Count - range2Count;
  
  const range1Pdvs = Math.floor(totalPdvs * (0.3 + Math.random() * 0.2));
  const range2Pdvs = Math.floor(totalPdvs * (0.2 + Math.random() * 0.2));
  const range3Pdvs = totalPdvs - range1Pdvs - range2Pdvs;
  
  priceRanges[range1.id] = {
    count: range1Count,
    percentage: (range1Count / totalCount) * 100,
    pdvs: range1Pdvs,
    pdvPercentage: (range1Pdvs / totalPdvs) * 100
  };
  
  priceRanges[range2.id] = {
    count: range2Count,
    percentage: (range2Count / totalCount) * 100,
    pdvs: range2Pdvs,
    pdvPercentage: (range2Pdvs / totalPdvs) * 100
  };
  
  priceRanges[range3.id] = {
    count: range3Count,
    percentage: (range3Count / totalCount) * 100,
    pdvs: range3Pdvs,
    pdvPercentage: (range3Pdvs / totalPdvs) * 100
  };
  
  // Generate mock products
  const products: AssortmentProduct[] = Array.from({ length: 20 }).map((_, index) => {
    const price = min + Math.floor(Math.random() * (max - min));
    const discount = Math.floor(Math.random() * 30);
    
    return {
      id: `prod_${retailerId}_${categoryId}_${index}`,
      name: `${retailerId.toUpperCase()} ${categoryId} Product ${index + 1}`,
      sku: `SKU-${retailerId.substring(0, 2).toUpperCase()}-${index + 1000}`,
      price,
      originalPrice: price * (1 + discount / 100),
      discount,
      pdpViews: Math.floor(Math.random() * 10000) + 100,
      conversionRate: (Math.random() * 10) + 1,
      inStock: Math.random() > 0.2,
      trending: Math.random() > 0.7,
    };
  });
  
  return {
    products,
    metrics: {
      totalProducts: totalCount,
      avgPrice: products.reduce((sum, p) => sum + p.price, 0) / products.length,
      avgDiscount: products.reduce((sum, p) => sum + p.discount, 0) / products.length,
      totalViews: products.reduce((sum, p) => sum + p.pdpViews, 0),
    },
    priceRanges
  };
};

// React Query hook for fetching assortment data
export const useAssortmentData = (
  retailerId: string,
  categoryId: string,
  priceRange?: { min: number; max: number }
) => {
  return useQuery({
    queryKey: ['assortment', retailerId, categoryId, priceRange?.min, priceRange?.max],
    queryFn: () => fetchAssortmentData(retailerId, categoryId, priceRange),
    enabled: !!currentApiKey && !!retailerId && !!categoryId,
    retry: 1,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};
