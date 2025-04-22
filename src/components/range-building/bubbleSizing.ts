
/**
 * Bubble sizing logic extracted for reusability and clarity.
 * The difference between sizes is exaggerated for clear visual scaling.
 */

export interface SizeStep {
  limit: number;
  size: number;
}

export const sizeSteps: SizeStep[] = [
  { limit: 0.2, size: 20 },
  { limit: 0.5, size: 24 },
  { limit: 1, size: 30 },
  { limit: 2, size: 40 },
  { limit: 3, size: 48 },
  { limit: 4, size: 56 },
  { limit: 5, size: 64 },
  { limit: 6, size: 70 },
  { limit: 7, size: 75 },
  { limit: 8, size: 80 },
  { limit: 10, size: 85 },
  { limit: 15, size: 90 },
  { limit: 20, size: 95 },
  { limit: 101, size: 100 }
];

export const pickSize = (value: number): number => {
  // Safe guard against negative values
  const absValue = Math.abs(value);
  
  for (const s of sizeSteps) {
    if (absValue < s.limit) return s.size;
  }
  return sizeSteps[sizeSteps.length - 1].size;
};

// Scale bubble size to fit within a container
export const scaleBubbleSize = (baseSize: number, containerWidth: number, containerHeight: number): number => {
  // This is a safety measure to ensure bubbles don't overflow their container
  const maxAllowedSize = Math.min(containerWidth, containerHeight) * 0.85;
  return Math.min(baseSize, maxAllowedSize);
};
