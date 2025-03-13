
import React from 'react';
import { tabsData } from '@/utils/data';
import { cn } from '@/lib/utils';
import { Tabs as UITabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface TabsProps {
  activeTab: string;
  setActiveTab: (tabId: string) => void;
}

const Tabs: React.FC<TabsProps> = ({ activeTab, setActiveTab }) => {
  return (
    <div className="bg-white border-b border-dashboard-border">
      <div className="container mx-auto px-6">
        <div className="flex overflow-x-auto hide-scrollbar">
          <div className="flex space-x-2 py-4">
            {tabsData.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "tab-button px-4 py-2 rounded-md font-medium text-sm whitespace-nowrap transition-colors",
                  activeTab === tab.id 
                    ? "bg-dashboard-highlight text-dashboard-primary border border-dashboard-primary/20" 
                    : "text-dashboard-secondaryText hover:bg-gray-50"
                )}
              >
                {tab.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tabs;
