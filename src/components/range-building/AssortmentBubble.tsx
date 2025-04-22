
import React, { useEffect, useRef, useState } from 'react';
import { pickSize, scaleBubbleSize } from './bubbleSizing';
import { pickColor, getHighValueColor } from './bubblePalette';

interface AssortmentBubbleProps {
  value: number; // 0-100, main percentage value
  secondary?: string; // count or pdvs (displayed under main)
  categoryId?: string | null;
  containerClassName?: string; // Optional class for the container
}

/**
 * Enhanced bubble component with better visual differentiation
 * that automatically adjusts to the container size.
 */
export const AssortmentBubble: React.FC<AssortmentBubbleProps> = ({ 
  value, 
  secondary, 
  categoryId,
  containerClassName = ""
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [bubbleSize, setBubbleSize] = useState<number>(0);
  const [containerDimensions, setContainerDimensions] = useState({ width: 0, height: 0 });
  
  // Initialize ResizeObserver to monitor container size changes
  useEffect(() => {
    if (!containerRef.current) return;
    
    const resizeObserver = new ResizeObserver(entries => {
      if (!entries[0]) return;
      
      const { width, height } = entries[0].contentRect;
      setContainerDimensions({ width, height });
    });
    
    resizeObserver.observe(containerRef.current);
    return () => resizeObserver.disconnect();
  }, []);
  
  // Calculate bubble size based on value and container dimensions
  useEffect(() => {
    if (value <= 0.01 || containerDimensions.width === 0) return;
    
    const baseSize = pickSize(value);
    const scaledSize = scaleBubbleSize(
      baseSize,
      containerDimensions.width,
      containerDimensions.height
    );
    
    setBubbleSize(scaledSize);
  }, [value, containerDimensions]);
  
  if (!value || value < 0.01) return null;
  
  // Base style calculations
  let color = pickColor(value);
  
  // Check if this is a high-value bubble that needs special treatment
  const isHighValue = value > 6;
  if (isHighValue) {
    color = "bg-blue-400 text-blue-900 border-blue-500";
  }
  
  // Determine font size based on bubble size for better proportions
  const fontSize = bubbleSize >= 80 ? 16 : bubbleSize >= 60 ? 14 : bubbleSize >= 40 ? 12 : 10;
  const secondaryFontSize = fontSize * 0.7;
  
  return (
    <div 
      ref={containerRef}
      className={`flex items-center justify-center h-full w-full ${containerClassName}`}
      style={{ minHeight: '70px' }}
    >
      {bubbleSize > 0 && (
        <div
          style={{
            width: bubbleSize,
            height: bubbleSize,
            fontSize: fontSize,
            minWidth: Math.min(20, bubbleSize),
            minHeight: Math.min(20, bubbleSize),
            boxShadow: isHighValue 
              ? '0 2px 6px rgba(59, 130, 246, 0.3)' 
              : '0 1px 4px rgba(59, 130, 246, 0.2)',
            transition: 'all 0.3s ease'
          }}
          className={`flex flex-col items-center justify-center rounded-full border ${color}
            font-semibold relative select-none`}
        >
          <span className="leading-none">{value.toFixed(1)}%</span>
          {secondary && (
            <span 
              className="opacity-80 font-normal" 
              style={{ fontSize: `${secondaryFontSize}px`, lineHeight: '1' }}
            >
              {secondary}
            </span>
          )}
          {/* Small decorative element at bottom of bubble */}
          <div 
            className="absolute -bottom-0.5 w-2 h-1 bg-blue-500 rounded-b-full opacity-70" 
            style={{ width: `${bubbleSize * 0.15}px`, height: `${bubbleSize * 0.05}px` }}
          />
        </div>
      )}
    </div>
  );
};

export default AssortmentBubble;
