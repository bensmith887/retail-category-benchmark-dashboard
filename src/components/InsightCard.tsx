
import React from 'react';
import { ChevronRight, TrendingUp, TrendingDown, Lightbulb, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface InsightCardProps {
  title: string;
  description: string;
  type: 'opportunity' | 'threat' | 'positive' | 'recommendation';
}

const InsightCard: React.FC<InsightCardProps> = ({ title, description, type }) => {
  const getTypeProps = () => {
    switch (type) {
      case 'opportunity':
        return {
          icon: <Lightbulb size={18} />,
          bgColor: 'bg-blue-50',
          textColor: 'text-blue-700',
          iconColor: 'text-blue-500'
        };
      case 'threat':
        return {
          icon: <AlertTriangle size={18} />,
          bgColor: 'bg-red-50',
          textColor: 'text-red-700',
          iconColor: 'text-red-500'
        };
      case 'positive':
        return {
          icon: <TrendingUp size={18} />,
          bgColor: 'bg-green-50',
          textColor: 'text-green-700',
          iconColor: 'text-green-500'
        };
      case 'recommendation':
        return {
          icon: <Lightbulb size={18} />,
          bgColor: 'bg-purple-50',
          textColor: 'text-purple-700',
          iconColor: 'text-purple-500'
        };
      default:
        return {
          icon: <Lightbulb size={18} />,
          bgColor: 'bg-gray-50',
          textColor: 'text-gray-700',
          iconColor: 'text-gray-500'
        };
    }
  };

  const { icon, bgColor, textColor, iconColor } = getTypeProps();

  return (
    <div className="dashboard-card flex flex-col h-full group hover:translate-y-[-2px] transition-all duration-300">
      <div className="flex items-start mb-3">
        <div className={cn("p-2 rounded-full mr-3", bgColor, iconColor)}>
          {icon}
        </div>
        <h4 className="text-dashboard-text font-medium">{title}</h4>
      </div>
      
      <p className="text-dashboard-secondaryText text-sm flex-grow">{description}</p>
      
      <div className="mt-4 pt-4 border-t border-dashboard-border">
        <button className="flex items-center text-sm font-medium text-dashboard-primary group-hover:underline">
          <span>View Details</span>
          <ChevronRight size={16} className="ml-1 transition-transform group-hover:translate-x-1" />
        </button>
      </div>
    </div>
  );
};

export default InsightCard;
