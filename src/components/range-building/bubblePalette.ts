/**
 * Enhanced palette logic for better visual differentiation.
 */

export interface ColorStep {
  limit: number;
  className: string;
}

export const colorPalette: ColorStep[] = [
  { limit: 2, className: "bg-gray-200 text-gray-700 border-gray-300" },
  { limit: 5, className: "bg-sky-200 text-sky-800 border-sky-300" },
  { limit: 10, className: "bg-blue-200 text-blue-800 border-blue-300" },
  { limit: 15, className: "bg-blue-300 text-blue-900 border-blue-400" },
  { limit: 20, className: "bg-purple-200 text-purple-900 border-purple-300" },
  { limit: 25, className: "bg-violet-300 text-violet-900 border-violet-400" },
  { limit: 30, className: "bg-fuchsia-300 text-fuchsia-900 border-fuchsia-400" },
  { limit: 80, className: "bg-pink-300 text-pink-900 border-pink-400" },
  { limit: 100, className: "bg-orange-300 text-orange-900 border-orange-400" }
];

// Special high-value color for values over 20%
export const getHighValueColor = (value: number): string => {
  if (value > 20) {
    return "bg-purple-300 text-purple-900 border-purple-400";
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
  return "bg-orange-400 text-white border-orange-500";
};
