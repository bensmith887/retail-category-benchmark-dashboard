
/**
 * Enhanced palette logic for better visual differentiation.
 */

export interface ColorStep {
  limit: number;
  className: string;
}

export const colorPalette: ColorStep[] = [
  { limit: 0.5, className: "bg-blue-100 text-blue-800 border-blue-200" },
  { limit: 1, className: "bg-blue-100 text-blue-800 border-blue-200" },
  { limit: 2, className: "bg-blue-200 text-blue-800 border-blue-300" },
  { limit: 3, className: "bg-blue-200 text-blue-800 border-blue-300" },
  { limit: 4, className: "bg-blue-200 text-blue-800 border-blue-300" },
  { limit: 5, className: "bg-blue-300 text-blue-900 border-blue-400" },
  { limit: 6, className: "bg-blue-300 text-blue-900 border-blue-400" },
  { limit: 7, className: "bg-blue-300 text-blue-900 border-blue-400" },
  { limit: 8, className: "bg-blue-300 text-blue-900 border-blue-400" },
  { limit: 10, className: "bg-blue-300 text-blue-900 border-blue-400" },
  { limit: 15, className: "bg-blue-300 text-blue-900 border-blue-400" },
  { limit: 100, className: "bg-blue-400 text-blue-900 border-blue-500" }
];

// Special high-value color for values over 20%
export const getHighValueColor = (value: number): string => {
  if (value > 6) {
    return "bg-blue-400 text-blue-900 border-blue-500";
  }
  return "";
};

export const pickColor = (value: number): string => {
  // Check if it's a high value first
  const highValueColor = getHighValueColor(value);
  if (highValueColor) return highValueColor;
  
  // Otherwise use the regular palette
  for (const c of colorPalette) {
    if (value < c.limit) return c.className;
  }
  return "bg-blue-400 text-blue-900 border-blue-500";
};
