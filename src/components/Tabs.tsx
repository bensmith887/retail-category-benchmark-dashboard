
import React from "react";
import { TabIcon } from "./TabIcon";
import { tabsData } from "@/utils/data";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

interface TabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Tabs: React.FC<TabsProps> = ({ activeTab, setActiveTab }) => {
  // Filter out hidden tabs
  const visibleTabs = tabsData.filter(tab => !tab.hidden);
  
  return (
    <div className="w-16 md:w-64 h-screen bg-white border-r border-dashboard-border flex-shrink-0">
      <div className="h-16 flex items-center justify-center md:justify-start px-4 border-b border-dashboard-border">
        <span className="hidden md:block text-lg font-medium">CategoryBench</span>
        <span className="block md:hidden text-lg font-medium">CB</span>
      </div>
      <div className="py-4">
        <div className="space-y-1">
          {visibleTabs.map((tab) => (
            <Link
              key={tab.id}
              to={
                tab.id === 'price-elasticity' 
                  ? '/price-elasticity' 
                  : tab.id === 'promotions'
                    ? '/promotions'
                    : tab.id === 'promotions-v2'
                      ? '/promotions-v2'
                      : tab.id === 'assortment-planning'
                        ? '/assortment-planning'
                        : '/'
              }
              className={cn(
                "flex items-center py-2 px-4 text-dashboard-secondaryText hover:bg-dashboard-hover rounded-md transition-colors",
                activeTab === tab.id && "bg-dashboard-active text-dashboard-text"
              )}
              onClick={() => setActiveTab(tab.id)}
            >
              <TabIcon name={tab.icon} size={16} className="mr-3" />
              <span className="hidden md:block">{tab.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Tabs;
