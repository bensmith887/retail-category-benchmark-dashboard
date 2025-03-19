
import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Tabs from '@/components/Tabs';
import { Tabs as UITabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Info, Download, FileText, Settings, Calendar, Filter } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

import ExecutiveSummaryTab from '@/components/fashion/ExecutiveSummaryTab';
import PerformanceMetricsTab from '@/components/fashion/PerformanceMetricsTab';
import MarketShareTab from '@/components/fashion/MarketShareTab';
import MarketingChannelTab from '@/components/fashion/MarketingChannelTab';

import { generateFashionAnalyticsData } from '@/utils/fashionAnalyticsData';

const FashionAnalyticsDashboard = () => {
  const [activeTab, setActiveTab] = useState('fashion-analytics');
  const [selectedSegment, setSelectedSegment] = useState('all');
  const [selectedTimePeriod, setSelectedTimePeriod] = useState('12');
  const [selectedCompetitor, setSelectedCompetitor] = useState('all');
  const [selectedChannel, setSelectedChannel] = useState('all');
  
  // Load fashion analytics data
  const fashionData = generateFashionAnalyticsData();

  const handleExportData = () => {
    console.log('Exporting data...');
    // In a real implementation, this would generate a CSV or PDF
  };

  return (
    <div className="flex min-h-screen bg-dashboard-bg">
      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <div className="flex-1 flex flex-col">
        <Header />
        
        <div className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
              <h1 className="text-2xl font-bold text-dashboard-text">Fashion Retail Analytics</h1>
              
              <div className="flex flex-wrap items-center gap-2 mt-2 md:mt-0">
                <Select value={selectedSegment} onValueChange={setSelectedSegment}>
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Segment" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Segments</SelectItem>
                    <SelectItem value="womens">Women's Apparel</SelectItem>
                    <SelectItem value="mens">Men's Apparel</SelectItem>
                    <SelectItem value="kids">Children's Apparel</SelectItem>
                    <SelectItem value="accessories">Accessories</SelectItem>
                    <SelectItem value="footwear">Footwear</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select value={selectedTimePeriod} onValueChange={setSelectedTimePeriod}>
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Time Period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="3">Last 3 Months</SelectItem>
                    <SelectItem value="6">Last 6 Months</SelectItem>
                    <SelectItem value="12">Last 12 Months</SelectItem>
                    <SelectItem value="24">Last 24 Months</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select value={selectedCompetitor} onValueChange={setSelectedCompetitor}>
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Competitors" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Competitors</SelectItem>
                    {fashionData.retailers
                      .filter(retailer => retailer.name !== "YourFashion")
                      .map((retailer, index) => (
                        <SelectItem key={index} value={retailer.name.toLowerCase().replace(/\s/g, '')}>
                          {retailer.name}
                        </SelectItem>
                      ))
                    }
                  </SelectContent>
                </Select>
                
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline" size="icon">
                        <Info className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent className="max-w-sm">
                      <p className="text-sm">
                        <strong>Data Source:</strong> SimilarWeb competitive intelligence 
                        data for the fashion retail vertical. Last updated: {new Date().toLocaleDateString()}.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                
                <Button variant="outline" onClick={handleExportData}>
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
                
                <Button variant="outline">
                  <FileText className="h-4 w-4 mr-2" />
                  PDF Report
                </Button>
              </div>
            </div>

            {/* Overview Banner */}
            <div className="dashboard-card mb-6 bg-blue-50 border-l-4 border-dashboard-primary">
              <div className="flex items-start gap-3">
                <Info className="h-5 w-5 text-dashboard-primary mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-medium text-dashboard-text mb-1">Fashion Retail Market Overview</h3>
                  <p className="text-sm text-dashboard-secondaryText">
                    This dashboard provides comprehensive SimilarWeb data analysis for YourFashion.com and the competitive landscape. 
                    Total visits have increased by 11.3% YoY, with the Women's Apparel segment showing the strongest growth at 2.7%. 
                    The dashboard highlights key opportunities to improve performance across traffic channels, conversion rates, 
                    and competitive positioning.
                  </p>
                </div>
              </div>
            </div>

            <UITabs defaultValue="executive" className="mb-6">
              <TabsList className="grid grid-cols-4 mb-4 bg-gray-100 p-1.5 rounded-lg shadow-sm border border-gray-200">
                <TabsTrigger value="executive" className="font-semibold">Executive Summary</TabsTrigger>
                <TabsTrigger value="performance" className="font-semibold">Performance Metrics</TabsTrigger>
                <TabsTrigger value="market" className="font-semibold">Market Share</TabsTrigger>
                <TabsTrigger value="marketing" className="font-semibold">Marketing Channels</TabsTrigger>
              </TabsList>
              
              <div className="flex items-center justify-end mb-4 gap-2">
                <Button variant="outline" size="sm" className="h-8">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span className="text-xs">Compare Periods</span>
                </Button>
                <Button variant="outline" size="sm" className="h-8">
                  <Filter className="h-4 w-4 mr-2" />
                  <span className="text-xs">Advanced Filters</span>
                </Button>
                <Button variant="outline" size="sm" className="h-8">
                  <Settings className="h-4 w-4 mr-2" />
                  <span className="text-xs">Customize View</span>
                </Button>
              </div>
              
              <TabsContent value="executive">
                <ExecutiveSummaryTab 
                  kpis={fashionData.kpis}
                  opportunities={fashionData.opportunities}
                  monthlyVisitData={fashionData.monthlyVisitData}
                  segmentShare={fashionData.segmentShare}
                />
              </TabsContent>
              
              <TabsContent value="performance">
                <PerformanceMetricsTab 
                  retailer={fashionData.retailers.find(r => r.name === "YourFashion")!}
                  trafficSources={fashionData.trafficSources}
                  monthlyVisitData={fashionData.monthlyVisitData}
                />
              </TabsContent>
              
              <TabsContent value="market">
                <MarketShareTab 
                  retailers={fashionData.retailers}
                  competitorPositioning={fashionData.competitorPositioning}
                  crossVisitation={fashionData.crossVisitation}
                />
              </TabsContent>
              
              <TabsContent value="marketing">
                <MarketingChannelTab 
                  trafficSources={fashionData.trafficSources}
                  keywordPerformance={fashionData.keywordPerformance}
                />
              </TabsContent>
            </UITabs>
            
            <div className="text-xs text-center text-dashboard-secondaryText mt-6 pt-6 border-t border-dashboard-border">
              <p>
                Source: SimilarWeb • Data Period: {new Date(new Date().setMonth(new Date().getMonth() - 12)).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })} - {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })} • Analysis based on data from 9 competitive fashion retail websites
              </p>
              <p className="mt-1">
                Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FashionAnalyticsDashboard;
