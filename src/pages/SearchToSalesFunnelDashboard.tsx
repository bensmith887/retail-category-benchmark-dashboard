
import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Tabs from '@/components/Tabs';
import DashboardSelector from '@/components/DashboardSelector';
import { TabIcon } from '@/components/TabIcon';
import { SearchToSalesFunnelTabs } from '@/components/search-to-sales/SearchToSalesFunnelTabs';

const SearchToSalesFunnelDashboard = () => {
  const [activeTab, setActiveTab] = useState('search-to-sales-funnel');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  // Using the same retailers and categories as in RangeBuildingDashboard
  const retailers = [
    { id: 'h&m', name: 'H&M' },
    { id: 'mango', name: 'Mango' },
    { id: 'monki', name: 'Monki' },
    { id: 'nakd', name: 'NA-KD' },
    { id: 'weekday', name: 'Weekday' }
  ];
  
  const categories = [
    { id: 'tops', name: 'Tops' },
    { id: 'bottoms', name: 'Bottoms' },
    { id: 'dresses', name: 'Dresses' },
    { id: 'outerwear', name: 'Outerwear' },
    { id: 'accessories', name: 'Accessories' }
  ];

  return (
    <div className="flex h-screen bg-dashboard-background overflow-hidden">
      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <Header />
        <div className="flex-1 overflow-auto p-6">
          <div className="flex items-center mb-4">
            <TabIcon name="LineChart" size={20} className="mr-2 text-dashboard-primary" />
            <h1 className="text-xl font-semibold">Search to Sales Funnel</h1>
            <div className="ml-auto">
              <DashboardSelector currentPath="/search-to-sales-funnel" />
            </div>
          </div>
          {loading ? (
            <div className="w-full h-full flex items-center justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-dashboard-primary"></div>
            </div>
          ) : (
            <SearchToSalesFunnelTabs retailers={retailers} categories={categories} />
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchToSalesFunnelDashboard;
