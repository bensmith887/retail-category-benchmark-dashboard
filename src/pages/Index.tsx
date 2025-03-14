import React, { useState, useEffect } from 'react';
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import Header from '@/components/Header';
import Tabs from '@/components/Tabs';
import MetricsCard from '@/components/MetricsCard';
import MarketGauge from '@/components/MarketGauge';
import LineChart from '@/components/charts/LineChart';
import BarChart from '@/components/charts/BarChart';
import CompetitorTable from '@/components/CompetitorTable';
import InsightCard from '@/components/InsightCard';
import MarketShareView from '@/components/MarketShareView';
import PricingView from '@/components/PricingView';
import ProductPerformanceView from '@/components/ProductPerformanceView';
import CustomerSentimentView from '@/components/CustomerSentimentView';
import PromotionEffectivenessView from '@/components/PromotionEffectivenessView';
import PriceElasticityView from '@/components/PriceElasticityView';
import KeywordCategoryShareView from '@/components/KeywordCategoryShareView';
import TrafficSourcesView from '@/components/TrafficSourcesView';
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
                  secondaryLabel="YoY"
                  secondaryChange={`${metric.isPositive ? '+5.2' : '-3.1'}%`}
                  isSecondaryPositive={metric.isPositive}
                />
              ))}
            </div>

            <div className="mb-6 animate-fade-in" style={{ animationDelay: "0.3s" }}>
              <MarketGauge />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6 animate-fade-in" style={{ animationDelay: "0.4s" }}>
              <LineChart title="Traffic Share Trend" />
              <BarChart title="Pricing Benchmark" />
            </div>

            <div className="mb-6 animate-fade-in" style={{ animationDelay: "0.5s" }}>
              <CompetitorTable />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6 stagger-animate" style={{ animationDelay: "0.6s" }}>
              {insightData.map((insight, index) => (
                <InsightCard
                  key={index}
                  title={insight.title}
                  description={insight.description}
                  type={insight.type as "opportunity" | "threat" | "positive" | "recommendation"}
                />
              ))}
            </div>
            
            <div className="text-xs text-center text-dashboard-secondaryText mt-6 pt-4 border-t border-dashboard-border">
              <p>Source: SimilarWeb • Metrics: Traffic Share, Pricing, User Engagement</p>
            </div>
          </div>
        );
      case 'traffic-share':
        return <MarketShareView />;
      case 'pricing':
        return <PricingView />;
      case 'traffic-sources':
        return <TrafficSourcesView />;
      case 'product-performance':
        return <ProductPerformanceView />;
      case 'customer-sentiment':
        return <CustomerSentimentView />;
      case 'promotion-effectiveness':
        return <PromotionEffectivenessView />;
      case 'price-elasticity':
        return <PriceElasticityView />;
      case 'keyword-category':
        return <KeywordCategoryShareView />;
      default:
        return null;
    }
  };

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="min-h-screen flex w-full bg-dashboard-bg">
        <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
        <SidebarInset className="flex flex-col">
          <Header />
          <div className="flex-grow py-6 px-6">
            {mounted && renderTabContent()}
          </div>
          <footer className="bg-white border-t border-dashboard-border py-4 px-6">
            <div className="flex justify-between items-center text-sm text-dashboard-secondaryText">
              <span>© 2023 CategoryBench</span>
              <span>Last updated: September 30, 2023</span>
            </div>
          </footer>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default Index;
