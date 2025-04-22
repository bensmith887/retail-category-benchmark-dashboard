
import React, { useEffect, useRef, useState } from "react";
import AssortmentBubble from "./AssortmentBubble";

/**
 * Dynamically sizes the container and bubble, so it always fits.
 */
interface SizingCellProps {
  percent: number;
  secondary: string;
  categoryId?: string;
}

const SizingCell: React.FC<SizingCellProps> = ({
  percent,
  secondary,
  categoryId
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

  // Make the bubble never exceed 90% of size, but not smaller than 28px
  const bubbleContainerSize = Math.max(Math.min(cellSize.width, cellSize.height) * 0.95, 28);

  return (
    <div ref={cellRef} className="flex items-center justify-center w-full h-full relative min-h-[50px] min-w-[40px]">
      {bubbleContainerSize > 0 && (
        <div style={{ width: bubbleContainerSize, height: bubbleContainerSize, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <AssortmentBubble
            value={percent}
            secondary={secondary}
            categoryId={categoryId}
            containerClassName=""
          />
        </div>
      )}
    </div>
  );
};

export default SizingCell;
