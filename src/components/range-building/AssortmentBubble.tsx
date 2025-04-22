
import React from 'react';
import { pickSize } from './bubbleSizing';
import { pickColor } from './bubblePalette';

interface AssortmentBubbleProps {
  value: number; // 0-100, main percentage value
  secondary?: string; // count or pdvs (displayed under main)
  categoryId?: string | null;
}

/**
 * Visually enhanced bubble to maximize perceived differences.
 */
export const AssortmentBubble: React.FC<AssortmentBubbleProps> = ({ value, secondary }) => {
  if (!value || value < 0.01) return null;
  const size = pickSize(value);
  const color = pickColor(value);

  return (
    <div
      style={{
        width: size,
        height: size,
        fontSize: size >= 70 ? 20 : size > 40 ? 15 : 12,
        minWidth: 16,
        minHeight: 16,
        boxShadow: '0 2px 16px 4px rgba(120, 48, 210, 0.13)' // more "pop"
      }}
      className={`flex flex-col items-center justify-center rounded-full border-2 transition-all duration-200 ${color}
        font-semibold relative z-10 select-none ring-2 ring-purple-200 ring-opacity-80`}
    >
      <span className="leading-none" style={{ letterSpacing: 0.5 }}>{value.toFixed(1)}%</span>
      {secondary && (
        <span className="text-[10px] leading-none opacity-90 font-normal mt-0.5">{secondary}</span>
      )}
    </div>
  );
};

export default AssortmentBubble;
