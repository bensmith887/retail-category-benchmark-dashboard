
/**
 * Bubble sizing logic extracted for reusability and clarity.
 * The difference between sizes is exaggerated for clear visual scaling.
 */

export interface SizeStep {
  limit: number;
  size: number;
}

export const sizeSteps: SizeStep[] = [
  { limit: 1, size: 20 },
  { limit: 2, size: 35 },
  { limit: 5, size: 50 },
  { limit: 10, size: 65 },
  { limit: 15, size: 85 },
  { limit: 20, size: 105 },
  { limit: 25, size: 120 },
  { limit: 50, size: 140 },
  { limit: 75, size: 160 },
  { limit: 101, size: 180 }
];

export const pickSize = (value: number): number => {
  for (const s of sizeSteps) {
    if (value < s.limit) return s.size;
  }
  return sizeSteps[sizeSteps.length - 1].size;
};
