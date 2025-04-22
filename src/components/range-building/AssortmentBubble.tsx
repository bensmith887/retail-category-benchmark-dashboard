
import React from 'react';
import { pickSize } from './bubbleSizing';
import { pickColor, getHighValueColor } from './bubblePalette';

interface AssortmentBubbleProps {
  value: number; // 0-100, main percentage value
  secondary?: string; // count or pdvs (displayed under main)
  categoryId?: string | null;
}

/**
 * Enhanced bubble component with better visual differentiation
 * to match the desired design in the reference image.
 */
export const AssortmentBubble: React.FC<AssortmentBubbleProps> = ({ value, secondary, categoryId }) => {
  if (!value || value < 0.01) return null;
  
  const size = pickSize(value);
  let color = pickColor(value);
  
  // Check if this is a high-value bubble that needs special treatment
  const isHighValue = value > 20;
  if (isHighValue) {
    color = "bg-purple-300 text-purple-900 border-purple-400";
  }
  
  // Determine font size based on bubble size for better proportions
  const fontSize = size >= 100 ? 20 : size >= 70 ? 18 : size >= 50 ? 15 : 12;
  const secondaryFontSize = fontSize * 0.7;
  
  return (
    <div
      style={{
        width: size,
        height: size,
        fontSize: fontSize,
        minWidth: 20,
        minHeight: 20,
        boxShadow: isHighValue 
          ? '0 4px 12px rgba(124, 58, 237, 0.3)' // purple shadow for high values
          : '0 2px 8px rgba(59, 130, 246, 0.2)',  // blue shadow for normal values
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'all 0.3s ease'
      }}
      className={`flex flex-col items-center justify-center rounded-full border-2 ${color}
        font-semibold relative select-none`}
    >
      <span className="leading-none">{value.toFixed(1)}%</span>
      {secondary && (
        <span 
          className="opacity-80 font-normal mt-0.5" 
          style={{ fontSize: `${secondaryFontSize}px`, lineHeight: '1' }}
        >
          {secondary}
        </span>
      )}
      {/* Small decorative element at bottom to match example */}
      <div className="absolute -bottom-1 w-3 h-1.5 bg-blue-500 rounded-b-full" />
    </div>
  );
};

export default AssortmentBubble;
