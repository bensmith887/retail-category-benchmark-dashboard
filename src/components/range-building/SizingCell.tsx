import React from 'react';

interface SizingCellProps {
  percent: number;
  secondary?: string | number;
  categoryId?: string;
  totalRangeMode?: boolean;
}

const SizingCell: React.FC<SizingCellProps> = ({ 
  percent, 
  secondary, 
  categoryId,
  totalRangeMode = false 
}) => {
  // Determine the background color based on the total range mode
  const determineBarColor = () => {
    if (totalRangeMode) {
      return 'bg-purple-500/70 hover:bg-purple-600/80';
    }
    
    // Keep existing color logic for non-total range cells
    if (!categoryId) return 'bg-gray-300';
    
    if (categoryId.includes('mens_')) {
      return 'bg-blue-500/70 hover:bg-blue-600/80';
    } else if (categoryId.includes('womens_')) {
      return 'bg-green-500/70 hover:bg-green-600/80';
    } else if (categoryId.includes('junior_')) {
      return 'bg-pink-500/70 hover:bg-pink-600/80';
    } else if (categoryId.includes('replica_')) {
      return 'bg-purple-400/70 hover:bg-purple-500/80';
    } else if (categoryId.includes('accessories')) {
      return 'bg-orange-400/70 hover:bg-orange-500/80';
    } else if (categoryId.includes('infant_')) {
      return 'bg-yellow-400/70 hover:bg-yellow-500/80';
    } else if (categoryId.includes('childrens_')) {
      return 'bg-indigo-400/70 hover:bg-indigo-500/80';
    } else {
      return 'bg-gray-400/70 hover:bg-gray-500/80';
    }
  };

  return (
    <div className="w-full h-full flex flex-col justify-end items-center">
      {percent > 0 && (
        <div 
          className={`w-full transition-all duration-300 ease-in-out ${determineBarColor()}`}
          style={{ 
            height: `${Math.max(percent, 5)}%`, 
            minHeight: '5px',
            maxHeight: '100%'
          }}
        />
      )}
      <div className={`text-xs mt-1 ${totalRangeMode ? 'text-dashboard-primary font-semibold' : 'text-muted-foreground'}`}>
        {secondary}
      </div>
    </div>
  );
};

export default SizingCell;
