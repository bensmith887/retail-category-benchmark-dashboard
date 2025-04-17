
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { tabsData } from "@/utils/data";

interface DashboardSelectorProps {
  currentPath: string;
}

const DashboardSelector: React.FC<DashboardSelectorProps> = ({ currentPath }) => {
  const navigate = useNavigate();
  
  // Filter out hidden tabs
  const visibleTabs = tabsData.filter(tab => !tab.hidden);

  const handleDashboardChange = (value: string) => {
    navigate(value);
  };

  const getDashboardName = (path: string) => {
    switch (path) {
      case '/':
        return 'Overview';
      case '/price-elasticity':
        return 'Price Sensitivity';
      case '/promotions':
        return 'Promotions';
      case '/promotions-v2':
        return 'Promotion Planning';
      case '/assortment-planning':
        return 'Assortment Planning';
      default:
        return 'Overview';
    }
  };

  return (
    <div className="w-full md:w-56">
      <Select
        value={currentPath}
        onValueChange={handleDashboardChange}
      >
        <SelectTrigger className="bg-white border border-dashboard-border text-dashboard-text">
          <SelectValue placeholder={getDashboardName(currentPath)} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="/">Overview</SelectItem>
          <SelectItem value="/price-elasticity">Price Sensitivity</SelectItem>
          {/* Keep promotions route but hidden in sidebar */}
          {visibleTabs.some(tab => tab.id === 'promotions-v2') && (
            <SelectItem value="/promotions-v2">Promotion Planning</SelectItem>
          )}
          <SelectItem value="/assortment-planning">Assortment Planning</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default DashboardSelector;
