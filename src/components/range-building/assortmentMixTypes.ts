
import type { SkuData } from "./AssortmentMixExplorer";

export interface PriceRange {
  id: string;
  name: string;
  min: number;
  max: number;
}

export interface CategoryType {
  id: string;
  name: string;
}

export interface RetailerType {
  id: string;
  name: string;
}

export interface AssortmentMixTableProps {
  filteredRetailers: RetailerType[];
  categories: CategoryType[];
  generatedPriceRanges: PriceRange[];
  selectedCategories: string[];
  showTotalRange: boolean;
  displayMetric: 'range-percentage' | 'pdv-percentage';
  assortmentData: Record<string, Record<string, Record<string, SkuData>>>;
  calculateRetailerTotals: (retailerId: string) => Record<string, SkuData>;
  getDisplayValue: (data: SkuData | undefined) => { primary: string; secondary: string };
}
