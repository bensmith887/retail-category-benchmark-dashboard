
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Calendar, Filter, X, ChevronDown, Badge } from 'lucide-react';
import DashboardSelector from './DashboardSelector';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

// Utility for new filter colors (soft purple/blue glassy look)
const filterColors = [
  "bg-[#ede7ff] text-[#5840bb]",    // Primary purple
  "bg-[#d7f2ff] text-[#2f80ed]",    // Soft blue
  "bg-[#f9e8ef] text-[#ec4899]",    // Pink
  "bg-[#f1f7ee] text-[#509d49]",    // Green
  "bg-[#fff5e6] text-[#fa9f42]",    // Orange
];

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
                    "h-12 w-[215px] px-5 text-[#5840bb] border-[#dfd7f6] rounded-xl shadow-sm font-semibold mr-2 flex items-center gap-2 hover:border-[#a18aff] active:scale-95 transition-all"
                  )}
                >
                  <Calendar size={20} className="text-[#9b87f5]" />
                  <span className="flex-1 text-lg text-[#5840bb] font-semibold">Apr 1 - Sep 30, 2023</span>
                  <ChevronDown size={18} className="text-[#a69fd6]" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 z-[99] pointer-events-auto bg-white rounded-xl shadow-2xl border-[#e5e4fa]" align="start">
                <div className="p-4">
                  <div className="font-semibold text-dashboard-text mb-2">Select Date Range</div>
                  <div className="flex flex-col gap-1">
                    <button className="w-full text-left px-2 py-1.5 text-sm rounded-lg hover:bg-dashboard-bg font-medium transition">Last 7 days</button>
                    <button className="w-full text-left px-2 py-1.5 text-sm rounded-lg hover:bg-dashboard-bg font-medium transition">Last 30 days</button>
                    <button className="w-full text-left px-2 py-1.5 text-sm rounded-lg hover:bg-dashboard-bg font-medium transition">Last 3 months</button>
                    <button className="w-full text-left px-2 py-1.5 text-sm rounded-lg bg-dashboard-bg font-medium text-dashboard-primary">Last 6 months</button>
                    <button className="w-full text-left px-2 py-1.5 text-sm rounded-lg hover:bg-dashboard-bg font-medium transition">Last 12 months</button>
                    <button className="w-full text-left px-2 py-1.5 text-sm rounded-lg hover:bg-dashboard-bg font-semibold text-[#5840bb] transition">Custom range...</button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>

            {/* Filters & Add Filter */}
            <div className="flex flex-wrap flex-row gap-2 items-center ml-0 md:ml-4 w-full md:w-auto">
              {filters.map((filter, idx) => (
                <span
                  key={filter.id}
                  className={cn(
                    "px-4 py-2 rounded-full font-semibold text-base shadow-sm flex items-center gap-2 cursor-pointer border border-transparent transition-all",
                    filterColors[idx % filterColors.length], // rotate colors for fun!
                    "hover:shadow-md hover:scale-105 active:scale-95"
                  )}
                  tabIndex={0}
                >
                  <span>{filter.label}</span>
                  <button
                    className="ml-1 text-[#5840bb] hover:bg-white/50 rounded-full p-1 transition-all"
                    onClick={() => removeFilter(filter.id)}
                  >
                    <X size={15} />
                  </button>
                </span>
              ))}
              {/* Add Filter Button */}
              <Popover>
                <PopoverTrigger asChild>
                  <button
                    className="flex items-center gap-2 px-4 py-2 rounded-full border-2 border-dashed border-[#dfd7f6] text-[#b4a3e9] font-semibold bg-white hover:border-[#a18aff] hover:text-[#5840bb] shadow-sm active:scale-95 transition-all"
                  >
                    <Filter size={15} />
                    <span>Add Filter</span>
                  </button>
                </PopoverTrigger>
                <PopoverContent className="w-56 p-0 z-[80] bg-white rounded-xl shadow-2xl border-[#e5e4fa]" align="end">
                  <div className="p-3">
                    <div className="font-bold text-[#5840bb] mb-1">Filter by:</div>
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

