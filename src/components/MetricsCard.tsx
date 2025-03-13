
import React from 'react';
import { ArrowDown, ArrowUp } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MetricsCardProps {
  label: string;
  value: string;
  change: string;
  isPositive: boolean;
  className?: string;
}

const MetricsCard: React.FC<MetricsCardProps> = ({
  label,
  value,
  change,
  isPositive,
  className
}) => {
  return (
    <div className={cn("dashboard-card", className)}>
      <div className="flex flex-col gap-1">
        <span className="metrics-label">{label}</span>
        <span className="metrics-value">{value}</span>
        <div className={`metrics-change ${isPositive ? 'positive' : 'negative'}`}>
          {isPositive ? (
            <ArrowUp size={14} />
          ) : (
            <ArrowDown size={14} />
          )}
          <span>{change}</span>
        </div>
      </div>
    </div>
  );
};

export default MetricsCard;
