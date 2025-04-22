
import React from 'react';

interface AssortmentBubbleProps {
  value: number; // 0-100, main percentage value
  secondary?: string; // count or pdvs (displayed under main)
  categoryId?: string | null;
}

const sizeSteps = [
  { limit: 2, size: 14 },
  { limit: 5, size: 18 },
  { limit: 10, size: 24 },
  { limit: 15, size: 30 },
  { limit: 25, size: 36 },
  { limit: 40, size: 42 },
  { limit: 60, size: 52 },
  { limit: 80, size: 60 },
  { limit: 100, size: 72 }
];

const pickSize = (value: number): number => {
  for (const s of sizeSteps) {
    if (value < s.limit) return s.size;
  }
  return 72;
};

const colorPalette = [
  { limit: 2, className: "bg-gray-200 text-gray-600 border-gray-300" },
  { limit: 5, className: "bg-sky-100 text-sky-700 border-sky-300" },
  { limit: 10, className: "bg-blue-200 text-blue-800 border-blue-300" },
  { limit: 20, className: "bg-blue-300 text-blue-900 border-blue-400" },
  { limit: 40, className: "bg-purple-200 text-purple-800 border-purple-300" },
  { limit: 60, className: "bg-violet-300 text-violet-900 border-violet-400" },
  { limit: 80, className: "bg-pink-300 text-pink-900 border-pink-400" },
  { limit: 100, className: "bg-orange-400 text-white border-orange-500" }
];

const pickColor = (value: number): string => {
  for (const c of colorPalette) {
    if (value < c.limit) return c.className;
  }
  return "bg-orange-500 text-white border-orange-600";
};

export const AssortmentBubble: React.FC<AssortmentBubbleProps> = ({ value, secondary, categoryId }) => {
  if (!value || value < 0.01) return null;
  const size = pickSize(value);
  const color = pickColor(value);

  return (
    <div
      style={{ width: size, height: size, fontSize: size >= 42 ? 13 : 11, minWidth: 14, minHeight: 14 }}
      className={`flex flex-col items-center justify-center rounded-full border-2 shadow-lg transition-all duration-200 ${color}
        font-semibold relative z-10 select-none`}
    >
      <span className="leading-none">{value.toFixed(1)}%</span>
      {secondary && (
        <span className="text-[9px] leading-none opacity-90 font-normal">{secondary}</span>
      )}
    </div>
  );
};

export default AssortmentBubble;
