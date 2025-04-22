
/**
 * Extracted palette logic for easier theming.
 */

export interface ColorStep {
  limit: number;
  className: string;
}

export const colorPalette: ColorStep[] = [
  { limit: 2, className: "bg-gray-200 text-gray-600 border-gray-300" },
  { limit: 5, className: "bg-sky-100 text-sky-700 border-sky-300" },
  { limit: 10, className: "bg-blue-200 text-blue-800 border-blue-300" },
  { limit: 20, className: "bg-blue-300 text-blue-900 border-blue-400" },
  { limit: 40, className: "bg-purple-200 text-purple-800 border-purple-300" },
  { limit: 60, className: "bg-violet-300 text-violet-900 border-violet-400" },
  { limit: 80, className: "bg-pink-300 text-pink-900 border-pink-400" },
  { limit: 100, className: "bg-orange-400 text-white border-orange-500" }
];

export const pickColor = (value: number): string => {
  for (const c of colorPalette) {
    if (value < c.limit) return c.className;
  }
  return "bg-orange-500 text-white border-orange-600";
};
