
import React from 'react';

const MarketGauge: React.FC = () => {
  // Position value (0-100)
  const position = 78;

  return (
    <div className="dashboard-card">
      <h3 className="text-lg font-medium text-dashboard-text mb-3">Market Position</h3>
      
      <div className="w-full mb-2">
        <div className="relative h-7 w-full rounded-md overflow-hidden bg-gradient-to-r from-dashboard-danger via-dashboard-warning to-dashboard-success">
          {/* Position marker */}
          <div 
            className="absolute w-3 h-10 bg-white border-2 border-dashboard-text rounded-full shadow-md transition-all duration-500"
            style={{ 
              left: `${position}%`, 
              transform: 'translateX(-50%) translateY(-13%)'
            }}
          />
        </div>
      </div>
      
      <div className="flex justify-between text-xs text-dashboard-secondaryText mt-1">
        <span>Below Average</span>
        <span>Average</span>
        <span>Above Average</span>
        <span>Market Leader</span>
      </div>
      
      <div className="mt-4 text-center">
        <span className="text-dashboard-primary font-semibold">
          Above Average
        </span>
        <p className="text-sm text-dashboard-secondaryText mt-1">
          Your brand is performing above the category average
        </p>
      </div>
    </div>
  );
};

export default MarketGauge;
