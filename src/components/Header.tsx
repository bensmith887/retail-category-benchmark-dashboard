
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Calendar, Filter, X, ChevronDown, Badge } from 'lucide-react';
import DashboardSelector from './DashboardSelector';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

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

  // Date picker mock state
  const [dateOpen, setDateOpen] = useState(false);

  return (
    <header className="bg-white border-b border-dashboard-border py-5 px-8 animate-fade-in">
      <div className="container mx-auto max-w-full">
        <div className="flex flex-row justify-between items-center gap-3 relative">
          {/* Logo and label */}
          <div className="flex flex-col items-start">
            <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-[#a18aff] to-dashboard-primary bg-clip-text text-transparent drop-shadow-sm">
              CategoryBench
            </h1>
            <span className="text-xs text-dashboard-secondaryText">by SimilarWeb</span>
          </div>

          {/* Controls row */}
          <div className="flex flex-col md:flex-row items-center gap-2 w-full md:w-auto justify-center">
            {/* Beta badge */}
            <div className="absolute top-2 right-8 z-20 flex items-center">
              <div className="bg-[#7E69AB] text-white text-xs px-3 py-1 rounded-lg font-semibold shadow-md flex items-center gap-1">
                <Badge size={14} className="mr-1" />
                BETA
              </div>
            </div>

            {/* Dashboard selector */}
            <DashboardSelector currentPath={location.pathname} />

            {/* Date Picker */}
            <Popover open={dateOpen} onOpenChange={setDateOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "h-12 w-[215px] px-5 border border-dashboard-border rounded-xl shadow-sm font-medium mr-2 flex items-center gap-2 bg-white/55 backdrop-blur-[3px] text-dashboard-text hover:border-dashboard-primary active:scale-95 transition-all",
                    "hover:bg-white/80",
                  )}
                >
                  <Calendar size={20} className="text-dashboard-secondaryText" />
                  <span className="flex-1 text-base font-semibold text-dashboard-text">Apr 1 - Sep 30, 2023</span>
                  <ChevronDown size={18} className="text-dashboard-neutral" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 z-[99] pointer-events-auto bg-white rounded-xl shadow-2xl border-dashboard-border" align="start">
                <div className="p-4">
                  <div className="font-semibold text-dashboard-text mb-2">Select Date Range</div>
                  <div className="flex flex-col gap-1">
                    <button className="w-full text-left px-2 py-1.5 text-sm rounded-lg hover:bg-dashboard-bg font-medium transition">Last 7 days</button>
                    <button className="w-full text-left px-2 py-1.5 text-sm rounded-lg hover:bg-dashboard-bg font-medium transition">Last 30 days</button>
                    <button className="w-full text-left px-2 py-1.5 text-sm rounded-lg hover:bg-dashboard-bg font-medium transition">Last 3 months</button>
                    <button className="w-full text-left px-2 py-1.5 text-sm rounded-lg bg-dashboard-bg font-medium text-dashboard-primary">Last 6 months</button>
                    <button className="w-full text-left px-2 py-1.5 text-sm rounded-lg hover:bg-dashboard-bg font-medium transition">Last 12 months</button>
                    <button className="w-full text-left px-2 py-1.5 text-sm rounded-lg hover:bg-dashboard-bg font-semibold text-dashboard-primary transition">Custom range...</button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>

            {/* Filters & Add Filter */}
            <div className="flex flex-wrap flex-row gap-2 items-center ml-0 md:ml-4 w-full md:w-auto">
              {filters.map((filter) => (
                <span
                  key={filter.id}
                  className={cn(
                    // Neutral monochrome glassy style:
                    "px-4 py-2 rounded-full font-medium text-base shadow-sm flex items-center gap-2 cursor-pointer border border-dashboard-border bg-white/60 backdrop-blur-[2px] text-dashboard-text transition-all",
                    "hover:shadow-md hover:bg-white/80 hover:border-dashboard-primary active:scale-95"
                  )}
                  tabIndex={0}
                >
                  <span>{filter.label}</span>
                  <button
                    className="ml-1 text-dashboard-neutral hover:bg-white/70 rounded-full p-1 transition-all"
                    onClick={() => removeFilter(filter.id)}
                    aria-label="Remove filter"
                  >
                    <X size={15} />
                  </button>
                </span>
              ))}
              {/* Add Filter Button */}
              <Popover>
                <PopoverTrigger asChild>
                  <button
                    className="flex items-center gap-2 px-4 py-2 rounded-full border border-dashed border-dashboard-border text-dashboard-neutral font-semibold bg-white/60 backdrop-blur-[2px] hover:border-dashboard-primary hover:text-dashboard-text shadow-sm active:scale-95 transition-all"
                  >
                    <Filter size={15} />
                    <span>Add Filter</span>
                  </button>
                </PopoverTrigger>
                <PopoverContent className="w-56 p-0 z-[80] bg-white rounded-xl shadow-2xl border-dashboard-border" align="end">
                  <div className="p-3">
                    <div className="font-bold text-dashboard-text mb-1">Filter by:</div>
                    <button className="block w-full text-left px-2 py-1.5 text-base rounded hover:bg-dashboard-bg transition-colors">Categories</button>
                    <button className="block w-full text-left px-2 py-1.5 text-base rounded hover:bg-dashboard-bg transition-colors">Traffic Domains</button>
                    <button className="block w-full text-left px-2 py-1.5 text-base rounded hover:bg-dashboard-bg transition-colors">Retail IQ Domains</button>
                    <button className="block w-full text-left px-2 py-1.5 text-base rounded hover:bg-dashboard-bg transition-colors">Time Period</button>
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
