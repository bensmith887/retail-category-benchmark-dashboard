
import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Tabs from '@/components/Tabs';
import MetricsCard from '@/components/MetricsCard';
import MarketGauge from '@/components/MarketGauge';
import LineChart from '@/components/charts/LineChart';
import BarChart from '@/components/charts/BarChart';
import CompetitorTable from '@/components/CompetitorTable';
import InsightCard from '@/components/InsightCard';
import { metricsData, insightData } from '@/utils/data';

const Index = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6 stagger-animate">
              {metricsData.map((metric) => (
                <MetricsCard
                  key={metric.id}
                  label={metric.label}
                  value={metric.value}
                  change={metric.change}
                  isPositive={metric.isPositive}
                />
              ))}
            </div>

            <div className="mb-6 animate-fade-in" style={{ animationDelay: "0.3s" }}>
              <MarketGauge />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6 animate-fade-in" style={{ animationDelay: "0.4s" }}>
              <LineChart title="Market Share Trend" />
              <BarChart title="Pricing Benchmark" />
            </div>

            <div className="mb-6 animate-fade-in" style={{ animationDelay: "0.5s" }}>
              <CompetitorTable />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 stagger-animate" style={{ animationDelay: "0.6s" }}>
              {insightData.map((insight, index) => (
                <InsightCard
                  key={index}
                  title={insight.title}
                  description={insight.description}
                  type={insight.type}
                />
              ))}
            </div>
          </div>
        );
      case 'market-share':
        return (
          <div className="py-12 text-center animate-fade-in">
            <h2 className="text-2xl font-medium text-dashboard-text mb-4">Market Share Analysis</h2>
            <p className="text-dashboard-secondaryText">This section is coming soon</p>
          </div>
        );
      case 'pricing':
        return (
          <div className="py-12 text-center animate-fade-in">
            <h2 className="text-2xl font-medium text-dashboard-text mb-4">Pricing Analysis</h2>
            <p className="text-dashboard-secondaryText">This section is coming soon</p>
          </div>
        );
      case 'traffic-sources':
        return (
          <div className="py-12 text-center animate-fade-in">
            <h2 className="text-2xl font-medium text-dashboard-text mb-4">Traffic Sources Analysis</h2>
            <p className="text-dashboard-secondaryText">This section is coming soon</p>
          </div>
        );
      case 'product-performance':
        return (
          <div className="py-12 text-center animate-fade-in">
            <h2 className="text-2xl font-medium text-dashboard-text mb-4">Product Performance Analysis</h2>
            <p className="text-dashboard-secondaryText">This section is coming soon</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-dashboard-bg">
      <Header />
      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="flex-grow py-6">
        <div className="container mx-auto px-6">
          {mounted && renderTabContent()}
        </div>
      </main>
      
      <footer className="bg-white border-t border-dashboard-border py-4">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-center text-sm text-dashboard-secondaryText">
            <span>© 2023 CategoryBench</span>
            <span>Last updated: September 30, 2023</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
