
// SimilarWeb API utilities
const API_KEY = '3d3835890df84695be55464f7c5f42c4';
const BASE_URL = 'https://api.similarweb.com/v1';

export const fetchKeywordShareData = async (keywordGroupId: string) => {
  try {
    // In a production app, this API call should be made from a backend service
    // to protect your API key. This is for demonstration purposes only.
    const response = await fetch(
      `${BASE_URL}/keywords/group/serp/${keywordGroupId}?api_key=${API_KEY}`
    );

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    return data.serp_data.map((item: any) => ({
      domain: item.domain,
      share: item.share
    }));
  } catch (error) {
    console.error('Error fetching keyword share data:', error);
    throw error;
  }
};

// Map of keyword group IDs to readable names
export const keywordGroupMap = {
  '1de03338-1fda-4a88-a4b9-a96177e42f37': 'Product Category Terms',
  '31b96160-6342-4972-9a7a-2231c8efba8b': 'Brand Terms',
  '797c6dec-5ae0-4569-8993-2debf68b167d': 'Competitor Terms'
};

// Convert keyword group ID to readable name
export const getKeywordGroupName = (groupId: string): string => {
  return keywordGroupMap[groupId as keyof typeof keywordGroupMap] || 'Unknown Group';
};
