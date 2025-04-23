
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
}

const API_KEY = 'your_publishable_api_key'; // Replace with your API key
const API_BASE_URL = 'https://your-api-endpoint.com'; // Replace with your API endpoint

export const fetchAssortmentData = async (
  retailerId: string,
  categoryId: string,
  priceRange?: { min: number; max: number }
): Promise<AssortmentApiResponse> => {
  const queryParams = new URLSearchParams({
    retailerId,
    categoryId,
    ...(priceRange && {
      minPrice: priceRange.min.toString(),
      maxPrice: priceRange.max.toString(),
    }),
  });

  const response = await fetch(`${API_BASE_URL}/assortment?${queryParams}`, {
    headers: {
      'Authorization': `Bearer ${API_KEY}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch assortment data');
  }

  return response.json();
};

// React Query hook for fetching assortment data
export const useAssortmentData = (
  retailerId: string,
  categoryId: string,
  priceRange?: { min: number; max: number }
) => {
  return useQuery({
    queryKey: ['assortment', retailerId, categoryId, priceRange],
    queryFn: () => fetchAssortmentData(retailerId, categoryId, priceRange),
  });
};
