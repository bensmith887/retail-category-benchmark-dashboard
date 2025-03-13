
import React from 'react';
import { Calendar, Filter, X } from 'lucide-react';
import { filtersData } from '@/utils/data';

const Header = () => {
  return (
    <header className="bg-white border-b border-dashboard-border py-4 px-6 animate-fade-in">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex items-center">
            <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-dashboard-primary to-dashboard-secondary bg-clip-text text-transparent">
              CategoryBench
            </h1>
          </div>
          
          <div className="flex flex-col md:flex-row items-start md:items-center gap-3 w-full md:w-auto">
            <button className="flex items-center gap-2 px-3 py-1.5 border border-dashboard-border rounded-md text-dashboard-secondaryText hover:border-dashboard-primary hover:text-dashboard-primary transition-all duration-200">
              <Calendar size={16} />
              <span className="text-sm font-medium">Apr 1 - Sep 30, 2023</span>
            </button>
            
            <div className="flex flex-wrap gap-2 w-full md:w-auto">
              {filtersData.map((filter) => (
                <div key={filter.id} className="filter-pill">
                  <span>{filter.label}</span>
                  <button className="text-dashboard-primary opacity-70 hover:opacity-100">
                    <X size={14} />
                  </button>
                </div>
              ))}
              <button className="filter-pill bg-white border border-dashed border-dashboard-border text-dashboard-secondaryText hover:border-dashboard-primary hover:text-dashboard-primary">
                <Filter size={14} />
                <span>Add Filter</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
