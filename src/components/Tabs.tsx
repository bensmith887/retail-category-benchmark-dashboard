
import React, { useState, useEffect } from "react";
import { TabIcon } from "./TabIcon";
import { tabsData } from "@/utils/data";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { Minimize, Maximize } from "lucide-react";

interface TabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const LOCAL_STORAGE_KEY = "sidebar:minimized";

const Tabs: React.FC<TabsProps> = ({ activeTab, setActiveTab }) => {
  // Filter out hidden tabs
  const visibleTabs = tabsData.filter(tab => !tab.hidden);

  // Load minimize state from localStorage
  const [minimized, setMinimized] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    setMinimized(stored === "true");
  }, []);

  const handleMinimizeToggle = () => {
    localStorage.setItem(LOCAL_STORAGE_KEY, (!minimized).toString());
    setMinimized(val => !val);
  };

  return (
    <div
      className={cn(
        "h-screen bg-white border-r border-dashboard-border flex-shrink-0 transition-all duration-200",
        minimized ? "w-16" : "w-64",
      )}
      style={{
        width: minimized ? "4rem" : "16rem",
        minWidth: minimized ? "4rem" : "16rem",
        maxWidth: minimized ? "4rem" : "16rem"
      }}
    >
      <div className="relative h-16 flex items-center justify-center md:justify-start px-4 border-b border-dashboard-border">
        <span className={cn(
          "text-lg font-medium transition-all",
          minimized && "opacity-0 pointer-events-none"
        )}>
          CategoryBench
        </span>
        <span className={cn(
          "md:hidden text-lg font-medium",
          minimized ? "opacity-100" : "hidden"
        )}>CB</span>
        {/* Min/Max button (desktop only) */}
        <button
          onClick={handleMinimizeToggle}
          className={cn(
            "absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded hover:bg-dashboard-hover transition-colors md:block hidden",
            minimized && "bg-dashboard-hover"
          )}
          aria-label={minimized ? "Maximize sidebar" : "Minimize sidebar"}
        >
          {minimized ? <Maximize size={18} /> : <Minimize size={18} />}
        </button>
      </div>
      <div className="py-4 flex flex-col items-center">
        <div className="space-y-1 w-full">
          {visibleTabs.map((tab) => (
            <Link
              key={tab.id}
              to={
                tab.id === 'overview'
                  ? '/'
                  : tab.id === 'price-elasticity'
                    ? '/price-elasticity'
                    : tab.id === 'promotions'
                      ? '/promotions'
                      : tab.id === 'promotions-v2'
                        ? '/promotions-v2'
                        : tab.id === 'assortment-planning'
                          ? '/assortment-planning'
                          : tab.id === 'range-building'
                            ? '/range-building'
                            : tab.id === 'search-to-sales-funnel'
                              ? '/search-to-sales-funnel'
                              : '/'
              }
              className={cn(
                "flex items-center py-2 px-4 text-dashboard-secondaryText hover:bg-dashboard-hover rounded-md transition-colors group",
                activeTab === tab.id && "bg-dashboard-active text-dashboard-text",
                minimized && "justify-center px-2"
              )}
              onClick={() => setActiveTab(tab.id)}
            >
              <TabIcon name={tab.icon} size={16} className={minimized ? "" : "mr-3"} />
              <span
                className={cn(
                  "ml-2 transition-all",
                  minimized && "hidden"
                )}
              >
                {tab.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Tabs;
