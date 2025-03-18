
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Calendar, Filter, X, ChevronDown } from 'lucide-react';
import { filtersData } from '@/utils/data';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from '@/lib/utils';
import DashboardSelector from './DashboardSelector';

const Header = () => {
  const location = useLocation();
  const [filters, setFilters] = useState([
    { id: 'category', label: 'Categories: Electronics' },
    { id: 'timeframe', label: 'Last 6 Months' },
    { id: 'traffic-domains', label: 'Traffic Domains' },
    { id: 'retail-domains', label: 'Retail IQ Domains' }
  ]);

  const removeFilter = (filterId: string) => {
    setFilters(filters.filter(filter => filter.id !== filterId));
  };

  return (
    <header className="bg-white border-b border-dashboard-border py-4 px-6 animate-fade-in">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex flex-col items-start">
            <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-dashboard-primary to-dashboard-secondary bg-clip-text text-transparent">
              CategoryBench
            </h1>
            <span className="text-xs text-dashboard-secondaryText">by SimilarWeb</span>
          </div>
          
          <div className="flex flex-col md:flex-row items-start md:items-center gap-3 w-full md:w-auto">
            <DashboardSelector currentPath={location.pathname} />
            
            <Popover>
              <PopoverTrigger asChild>
                <button className="flex items-center gap-2 px-3 py-1.5 border border-dashboard-border rounded-md text-dashboard-secondaryText hover:border-dashboard-primary hover:text-dashboard-primary transition-all duration-200">
                  <Calendar size={16} />
                  <span className="text-sm font-medium">Apr 1 - Sep 30, 2023</span>
                  <ChevronDown size={14} />
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-80 p-0" align="end">
                <div className="p-4 border-b border-dashboard-border">
                  <h3 className="font-medium text-dashboard-text">Select Date Range</h3>
                  <p className="text-xs text-dashboard-secondaryText mt-1">Choose a predefined range or set custom dates</p>
                </div>
                <div className="p-2">
                  <button className="w-full text-left px-2 py-1.5 text-sm rounded hover:bg-dashboard-bg transition-colors">Last 7 days</button>
                  <button className="w-full text-left px-2 py-1.5 text-sm rounded hover:bg-dashboard-bg transition-colors">Last 30 days</button>
                  <button className="w-full text-left px-2 py-1.5 text-sm rounded hover:bg-dashboard-bg transition-colors">Last 3 months</button>
                  <button className="w-full text-left px-2 py-1.5 text-sm rounded bg-dashboard-bg font-medium text-dashboard-primary">Last 6 months</button>
                  <button className="w-full text-left px-2 py-1.5 text-sm rounded hover:bg-dashboard-bg transition-colors">Last 12 months</button>
                  <button className="w-full text-left px-2 py-1.5 text-sm rounded hover:bg-dashboard-bg transition-colors">Custom range...</button>
                </div>
              </PopoverContent>
            </Popover>
            
            <div className="flex flex-wrap gap-2 w-full md:w-auto">
              {filters.map((filter) => (
                <div key={filter.id} className="filter-pill">
                  <span>{filter.label}</span>
                  <button 
                    className="text-dashboard-primary opacity-70 hover:opacity-100"
                    onClick={() => removeFilter(filter.id)}
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
              <Popover>
                <PopoverTrigger asChild>
                  <button className="filter-pill bg-white border border-dashed border-dashboard-border text-dashboard-secondaryText hover:border-dashboard-primary hover:text-dashboard-primary">
                    <Filter size={14} />
                    <span>Add Filter</span>
                  </button>
                </PopoverTrigger>
                <PopoverContent className="w-56 p-0" align="end">
                  <div className="p-2">
                    <div className="font-medium text-sm px-2 py-1.5">Filter by:</div>
                    <button className="w-full text-left px-2 py-1.5 text-sm rounded hover:bg-dashboard-bg transition-colors">Categories</button>
                    <button className="w-full text-left px-2 py-1.5 text-sm rounded hover:bg-dashboard-bg transition-colors">Traffic Domains</button>
                    <button className="w-full text-left px-2 py-1.5 text-sm rounded hover:bg-dashboard-bg transition-colors">Retail IQ Domains</button>
                    <button className="w-full text-left px-2 py-1.5 text-sm rounded hover:bg-dashboard-bg transition-colors">Time Period</button>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
