
import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Tabs from '@/components/Tabs';
import DashboardSelector from '@/components/DashboardSelector';
import { TabIcon } from '@/components/TabIcon';
import { RangeBuildingTabs } from '@/components/range-building/RangeBuildingTabs';

const RangeBuildingDashboard = () => {
  const [activeTab, setActiveTab] = useState('range-building');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex h-screen bg-dashboard-background overflow-hidden">
      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <Header />
        <div className="flex-1 overflow-auto p-6">
          <div className="flex items-center mb-4">
            <TabIcon name="Grid2X2" size={20} className="mr-2 text-dashboard-primary" />
            <h1 className="text-xl font-semibold">Range Building</h1>
            <div className="ml-auto">
              <DashboardSelector currentPath="/range-building" />
            </div>
          </div>
          {loading ? (
            <div className="w-full h-full flex items-center justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-dashboard-primary"></div>
            </div>
          ) : (
            <RangeBuildingTabs />
          )}
        </div>
      </div>
    </div>
  );
};

export default RangeBuildingDashboard;
