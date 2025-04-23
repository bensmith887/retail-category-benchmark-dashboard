
import React, { useEffect, useRef, useState } from "react";
import AssortmentBarIndicator from "./AssortmentBarIndicator";

/**
 * This cell provides a dynamically sized bar chart indicator for percentage/cell value.
 */
interface SizingCellProps {
  percent: number;
  secondary: string;
  categoryId?: string;
  isTotal?: boolean;
}

const SizingCell: React.FC<SizingCellProps> = ({
  percent,
  secondary,
  categoryId,
  isTotal = false
}) => {
  const cellRef = useRef<HTMLDivElement>(null);
  const [cellSize, setCellSize] = useState<{ width: number; height: number }>({ width: 0, height: 0 });

  useEffect(() => {
    if (!cellRef.current) return;
    const handleResize = () => {
      if (!cellRef.current) return;
      const rect = cellRef.current.getBoundingClientRect();
      setCellSize({ width: rect.width, height: rect.height });
    };

    handleResize();

    const resizeObserver = new window.ResizeObserver(() => {
      handleResize();
    });
    resizeObserver.observe(cellRef.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  if (!percent || percent < 0.01) {
    return <div ref={cellRef} className="w-full h-full" />;
  }

  return (
    <div ref={cellRef} className="flex items-center justify-center w-full h-full relative min-h-[50px] min-w-[40px]">
      <AssortmentBarIndicator 
        percent={percent} 
        secondary={secondary} 
        className={isTotal ? "total-indicator" : ""} 
      />
    </div>
  );
};

export default SizingCell;
