
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

interface DashboardSelectorProps {
  currentPath: string;
}

const DashboardSelector: React.FC<DashboardSelectorProps> = ({ currentPath }) => {
  const navigate = useNavigate();

  const handleDashboardChange = (value: string) => {
    navigate(value);
  };

  const getDashboardName = (path: string) => {
    switch (path) {
      case '/':
        return 'Overview';
      case '/price-elasticity':
        return 'Price Elasticity';
      case '/promotions':
        return 'Promotions';
      case '/promotions-v2':
        return 'Promotions V2';
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
          <SelectItem value="/price-elasticity">Price Elasticity</SelectItem>
          <SelectItem value="/promotions">Promotions</SelectItem>
          <SelectItem value="/promotions-v2">Promotions V2</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default DashboardSelector;
