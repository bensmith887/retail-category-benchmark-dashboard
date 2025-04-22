import React from "react";

// Exaggerated scaling: make difference between low and high much more visible
const getBarHeightPercent = (value: number) => {
  if (value < 1) return 8 + value * 6;           // very small for <1%
  if (value < 3) return 12 + value * 7;           // 1–3%
  if (value < 6) return 24 + value * 8;           // 3–6%
  if (value < 15) return 36 + value * 10;         // 6–15%
  if (value < 30) return 50 + value * 1.6;        // 15–30%
  if (value < 50) return 70 + value * 0.8;        // 30–50%
  if (value <= 100) return 85 + value * 0.15;     // 50-100%
  return 100;
};

// FLAT color mapping: lowest % = red, mid = orange, highest = green
// - Red:    #EA384C  (234,56,76)
// - Orange: #F97316  (249,115,22)
// - Green:  #4ADE80  (74,222,128)
const getFlatColor = (percent: number) => {
  const clamp = (n: number, min: number, max: number) => Math.max(min, Math.min(max, n));
  const p = clamp(percent, 0, 100);

  if (p === 0) return "#f0f0f0"; // faded grey for empty bar

  if (p <= 33) {
    // RED to ORANGE (0-33)
    const t = p / 33;
    const r = Math.round(234 + (249 - 234) * t);
    const g = Math.round(56 + (115 - 56) * t);
    const b = Math.round(76 + (22 - 76) * t);
    return `rgb(${r},${g},${b})`;
  } else if (p < 66) {
    // ORANGE zone (33–66) = keep flat orange
    return "#F97316";
  } else {
    // ORANGE to GREEN (66-100)
    const t = (p - 66) / (100 - 66);
    const r = Math.round(249 + (74 - 249) * t);
    const g = Math.round(115 + (222 - 115) * t);
    const b = Math.round(22 + (128 - 22) * t);
    return `rgb(${r},${g},${b})`;
  }
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
  const barHeight = Math.max(
    8,
    Math.min(100, getBarHeightPercent(percent))
  );
  const fillColor = getFlatColor(percent);

  return (
    <div className={`relative flex items-end justify-center h-16 w-8 ${className}`}>
      <div className="absolute left-1/2 -translate-x-1/2 bottom-0 h-full w-4 bg-gray-100 rounded-sm" />
      <div
        className="absolute left-1/2 -translate-x-1/2 rounded-sm transition-all"
        style={{
          width: "16px",
          height: `${barHeight}%`,
          maxHeight: "100%",
          bottom: 0,
          background: fillColor,
          boxShadow: percent > 0 ? "0 3px 8px rgba(0,0,0,0.08)" : "none",
        }}
      />
      {percent > 0 && (
        <div className="absolute left-0 bottom-0 w-full flex flex-col items-center justify-end text-xs z-10">
          <span
            className="font-semibold"
            style={{
              fontSize: percent >= 10 ? 13 : percent >= 3 ? 12 : 11,
              lineHeight: 1,
              marginBottom: 2,
              background: "rgba(255,255,255,0.85)",
              borderRadius: 4,
              padding: "0.5px 3px",
              boxShadow: percent >= 10 ? "0 2px 6px rgba(59,130,246,0.10)" : "none",
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
