
import React from 'react';
import { tabsData } from '@/utils/data';
import { cn } from '@/lib/utils';

interface TabsProps {
  activeTab: string;
  setActiveTab: (tabId: string) => void;
}

const Tabs: React.FC<TabsProps> = ({ activeTab, setActiveTab }) => {
  return (
    <div className="bg-white border-b border-dashboard-border">
      <div className="container mx-auto px-6">
        <div className="flex overflow-x-auto hide-scrollbar">
          <div className="flex space-x-1 py-4">
            {tabsData.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "tab-button",
                  activeTab === tab.id ? "active" : ""
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
