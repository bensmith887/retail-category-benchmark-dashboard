
/**
 * Bubble sizing logic extracted for reusability and clarity.
 * The difference between sizes is exaggerated for clear visual scaling.
 */

export interface SizeStep {
  limit: number;
  size: number;
}

export const sizeSteps: SizeStep[] = [
  { limit: 1, size: 16 },
  { limit: 2, size: 26 },
  { limit: 5, size: 40 },
  { limit: 10, size: 58 },
  { limit: 15, size: 75 },
  { limit: 30, size: 105 },
  { limit: 50, size: 140 },
  { limit: 75, size: 185 },
  { limit: 101, size: 240 }
];

export const pickSize = (value: number): number => {
  for (const s of sizeSteps) {
    if (value < s.limit) return s.size;
  }
  return sizeSteps[sizeSteps.length - 1].size;
};
