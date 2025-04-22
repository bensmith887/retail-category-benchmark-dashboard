
import React from "react";

// Applies a highly non-linear size curve for the bar to exaggerate differences for low values.
const getBarHeightPercent = (value: number) => {
  if (value < 0.2) return 4;           // visually low
  if (value < 0.8) return 8 + value * 5;
  if (value < 2) return 15 + value * 10;
  if (value < 4) return 30 + value * 14;
  if (value < 10) return 65 + value * 2.2;
  if (value < 15) return 80 + value * 1.2;
  if (value < 100) return 90 + value * 0.5;
  return 100;
};

interface AssortmentBarIndicatorProps {
  percent: number;
  secondary: string;
  className?: string;
}

const AssortmentBarIndicator: React.FC<AssortmentBarIndicatorProps> = ({
  percent,
  secondary,
  className = "",
}) => {
  // Convert percent to a barHeight (based on exaggerated scaling)
  const barHeight = Math.max(
    5,
    Math.min(100, getBarHeightPercent(percent))
  );

  // Use color palette based on percent for more clarity
  let fillColor = "bg-blue-300";
  if (percent >= 15) fillColor = "bg-blue-600";
  else if (percent >= 10) fillColor = "bg-blue-500";
  else if (percent >= 6) fillColor = "bg-blue-400";
  else if (percent >= 3) fillColor = "bg-blue-300";
  else if (percent > 0) fillColor = "bg-blue-200";
  else fillColor = "bg-gray-100";

  return (
    <div className={`relative flex items-end justify-center h-16 ${className}`}>
      <div className="absolute left-1/2 -translate-x-1/2 bottom-0 h-full w-4 bg-gray-100 rounded-sm" />
      <div
        className={`absolute left-1/2 -translate-x-1/2 rounded-sm transition-all ${fillColor}`}
        style={{
          width: "16px",
          height: `${barHeight}%`,
          maxHeight: "100%",
          bottom: 0,
        }}
      />
      {percent > 0 && (
        <div className="absolute left-0 bottom-0 w-full flex flex-col items-center justify-end text-xs z-10">
          <span
            className="font-semibold text-blue-900"
            style={{
              fontSize: percent >= 10 ? 13 : percent >= 3 ? 12 : 11,
              lineHeight: 1,
              marginBottom: 2,
              background: "rgba(255,255,255,0.85)",
              borderRadius: 4,
              padding: "0.5px 3px",
              boxShadow: percent >= 10 ? "0 2px 6px rgba(59,130,246,0.12)" : "none",
            }}
          >
            {percent.toFixed(1)}%
          </span>
          <span
            className="text-neutral-500 mt-0.5"
            style={{
              fontSize: percent >= 10 ? 11 : 10,
              background: "rgba(255,255,255,0.75)",
              borderRadius: 3,
              padding: "0px 2px",
            }}
          >
            {secondary}
          </span>
        </div>
      )}
    </div>
  );
};

export default AssortmentBarIndicator;
