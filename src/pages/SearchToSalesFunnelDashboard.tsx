
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
          {/* Explanation Box */}
          <div className="mt-10 mb-2 max-w-3xl mx-auto">
            <div className="rounded-xl border border-dashboard-border bg-white/80 shadow-lg p-6">
              <h2 className="text-lg font-semibold mb-2 text-dashboard-primary">How to Read This Dashboard</h2>
              <p className="mb-2 text-dashboard-text">
                The Search to Sales Funnel dashboard visualizes the customer journey from search intent through to purchase. Each metric and graph helps identify where customer interest grows or drops off, where opportunities exist, and the overall efficiency of converting searchers into buyers.
              </p>
              <ul className="list-disc ml-6 mb-2 text-dashboard-text">
                <li className="mb-2">
                  <b>Search-to-View Ratio</b>: Measures how many search clicks on a category lead to category or product views.<br />
                  <span className="text-xs text-dashboard-secondaryText">
                    Formula: <code>(Category Views or PDP Views) ÷ Search Clicks</code> × 100%
                  </span>
                </li>
                <li className="mb-2">
                  <b>Category Search Efficiency</b>: Shows how efficiently each category converts search traffic into engaged views.<br />
                  <span className="text-xs text-dashboard-secondaryText">
                    Formula: <code>(Category Views ÷ Search Clicks)</code> × 100%
                  </span>
                </li>
                <li className="mb-2">
                  <b>Category View Efficiency</b>: Shows how well users move from category views to deeper engagement (e.g., PDP views or add-to-cart).<br />
                  <span className="text-xs text-dashboard-secondaryText">
                    Formula: <code>(PDP Views ÷ Category Views)</code> × 100%
                  </span>
                </li>
                <li className="mb-2">
                  <b>Opportunity Score</b>: A composite metric assessing potential for improvement in a category, based on factors such as high search but low view rates, potential revenue, and historical trends.<br />
                  <span className="text-xs text-dashboard-secondaryText">
                    Simplified Formula: higher scores indicate greater opportunity (exact weights may vary, e.g.: <code>Weighted sum of Search Volume, View Rate, Revenue Potential, and Growth Trend</code>)
                  </span>
                </li>
              </ul>
              <p className="text-dashboard-secondaryText text-sm">
                Use these metrics to understand which categories perform well in the funnel, which have drop-offs that may represent issues, and where the biggest opportunities for optimization exist.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchToSalesFunnelDashboard;
