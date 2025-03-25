
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
  icon?: React.ReactNode;
}

const MetricsCard: React.FC<MetricsCardProps> = ({
  label,
  value,
  change,
  secondaryChange,
  secondaryLabel,
  isPositive = true,
  isSecondaryPositive = true,
  className,
  icon
}) => {
  return (
    <div className={cn("dashboard-card", className)}>
      <div className="flex items-start">
        {icon && <div className="mr-3 pt-1">{icon}</div>}
        <div className="flex flex-col gap-1">
          <span className="metrics-label">{label}</span>
          <span className="metrics-value">{value}</span>
          
          {change && (
            <div className={`metrics-change ${isPositive ? 'positive' : 'negative'}`}>
              <span className="text-xs font-medium mr-1">MoM:</span>
              <div className="flex items-center">
                {isPositive ? (
                  <ArrowUp size={12} className="mr-1" />
                ) : (
                  <ArrowDown size={12} className="mr-1" />
                )}
                <span>{change}</span>
              </div>
            </div>
          )}
          
          {secondaryChange && (
            <div className={`metrics-secondary ${isSecondaryPositive ? 'positive' : 'negative'} mt-1`}>
              <span className="text-xs font-medium mr-1">YoY:</span>
              <div className="flex items-center">
                {isSecondaryPositive ? (
                  <ArrowUp size={12} className="mr-1" />
                ) : (
                  <ArrowDown size={12} className="mr-1" />
                )}
                <span className="text-xs">{secondaryChange}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MetricsCard;
