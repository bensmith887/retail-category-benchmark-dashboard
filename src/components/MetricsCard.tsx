
import React from 'react';
import { ArrowDown, ArrowUp } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MetricsCardProps {
  label: string;
  value: string;
  change?: string;
  secondaryChange?: string;
  secondaryLabel?: string;
  isPositive?: boolean;
  isSecondaryPositive?: boolean;
  className?: string;
}

const MetricsCard: React.FC<MetricsCardProps> = ({
  label,
  value,
  change,
  secondaryChange,
  secondaryLabel,
  isPositive = true,
  isSecondaryPositive = true,
  className
}) => {
  return (
    <div className={cn("dashboard-card", className)}>
      <div className="flex flex-col gap-1">
        <span className="metrics-label">{label}</span>
        <span className="metrics-value">{value}</span>
        
        {change && (
          <div className={`metrics-change ${isPositive ? 'positive' : 'negative'}`}>
            {isPositive ? (
              <ArrowUp size={14} />
            ) : (
              <ArrowDown size={14} />
            )}
            <span>{change}</span>
          </div>
        )}
        
        {secondaryChange && secondaryLabel && (
          <div className={`metrics-secondary ${isSecondaryPositive ? 'positive' : 'negative'} mt-1`}>
            <span className="text-xs font-medium text-dashboard-secondaryText">{secondaryLabel}:</span>
            <div className="flex items-center ml-1">
              {isSecondaryPositive ? (
                <ArrowUp size={12} />
              ) : (
                <ArrowDown size={12} />
              )}
              <span className="text-xs">{secondaryChange}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MetricsCard;
