
import React, { useState, useEffect } from 'react';
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import Header from '@/components/Header';
import Tabs from '@/components/Tabs';
import { AssortmentTreeView } from '@/components/AssortmentTreeView';
import { AssortmentBarChart } from '@/components/charts/AssortmentBarChart';
import { AssortmentHeatmap } from '@/components/charts/AssortmentHeatmap';
import { PriceDistributionChart } from '@/components/charts/PriceDistributionChart';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { assortmentData } from '@/utils/assortmentData';

const AssortmentPlanningDashboard = () => {
  const [activeTab, setActiveTab] = useState('assortment-planning');
  const [selectedCompetitors, setSelectedCompetitors] = useState(['Your Brand', 'Amazon', 'Walmart']);
  const [selectedCategory, setSelectedCategory] = useState<any>(null);
  const [activePriceCompetitor, setActivePriceCompetitor] = useState('Your Brand');
  const competitors = [
    { id: 'your-brand', name: 'Your Brand' },
    { id: 'amazon', name: 'Amazon' },
    { id: 'walmart', name: 'Walmart' },
    { id: 'target', name: 'Target' },
    { id: 'ebay', name: 'eBay' },
    { id: 'best-buy', name: 'Best Buy' },
  ];

  const categories = [
    { id: 'electronics', name: 'Electronics' },
    { id: 'home-kitchen', name: 'Home & Kitchen' },
    { id: 'clothing', name: 'Clothing' },
    { id: 'beauty', name: 'Beauty' },
    { id: 'toys', name: 'Toys & Games' },
    { id: 'sports', name: 'Sports & Outdoors' }
  ];

  const competitorColors = {
    'Your Brand': '#8B5CF6', // Vivid Purple
    'Amazon': '#FF9900',     // Amazon Orange
    'Walmart': '#0071DC',    // Walmart Blue
    'Target': '#CC0000',     // Target Red
    'eBay': '#E53238',       // eBay Red
    'Best Buy': '#0046BE'    // Best Buy Blue
  };

  // Sample data for the bar chart
  const depthData = categories.map(category => {
    const result: any = { category: category.name };
    competitors.forEach(competitor => {
      result[competitor.name] = Math.floor(Math.random() * 100) + 10;
    });
    return result;
  });

  // Sample data for price distribution
  const priceRanges = [
    'Entry-level ($0-$50)',
    'Mid-range ($50-$150)',
    'Premium ($150+)'
  ];

  const priceData = priceRanges.map(range => {
    const result: any = { priceRange: range };
    competitors.forEach(competitor => {
      result[competitor.name] = Math.floor(Math.random() * 50) + 5;
    });
    return result;
  });

  // Filter data based on selected competitors
  const filteredDepthData = depthData.map(item => {
    const filtered: any = { category: item.category };
    selectedCompetitors.forEach(competitor => {
      filtered[competitor] = item[competitor];
    });
    return filtered;
  });

  const handleCompetitorToggle = (competitor: string) => {
    setSelectedCompetitors(prev => 
      prev.includes(competitor)
        ? prev.filter(c => c !== competitor)
        : [...prev, competitor]
    );
  };

  const handleCategorySelect = (category: any) => {
    setSelectedCategory(category);
  };

  useEffect(() => {
    document.title = "Assortment Planning - CategoryBench";
  }, []);

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="min-h-screen flex w-full bg-dashboard-bg">
        <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
        <SidebarInset className="flex flex-col">
          <Header />
          <div className="flex-grow p-6">
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-gray-900">Assortment Planning</h1>
              <p className="text-gray-500">Analyze your product assortment compared to competitors</p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
              {/* Filters Card */}
              <Card className="lg:col-span-4">
                <CardHeader className="pb-3">
                  <CardTitle>Filters</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-4">
                    <div className="flex flex-col gap-2">
                      <Label>Competitors</Label>
                      <div className="flex flex-wrap gap-3">
                        {competitors.map((competitor) => (
                          <div key={competitor.id} className="flex items-center gap-2">
                            <Checkbox 
                              id={competitor.id} 
                              checked={selectedCompetitors.includes(competitor.name)} 
                              onCheckedChange={() => handleCompetitorToggle(competitor.name)}
                            />
                            <Label 
                              htmlFor={competitor.id} 
                              className="cursor-pointer"
                            >
                              {competitor.name}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <Label>Price Analysis</Label>
                      <Select value={activePriceCompetitor} onValueChange={setActivePriceCompetitor}>
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Select competitor" />
                        </SelectTrigger>
                        <SelectContent>
                          {competitors.map((competitor) => (
                            <SelectItem key={competitor.id} value={competitor.name}>
                              {competitor.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* Tree View */}
              <Card className="lg:col-span-1">
                <CardHeader>
                  <CardTitle>Category Hierarchy</CardTitle>
                </CardHeader>
                <CardContent className="h-[600px] overflow-hidden">
                  <AssortmentTreeView 
                    data={assortmentData} 
                    onSelectCategory={handleCategorySelect} 
                  />
                </CardContent>
              </Card>
              
              {/* Depth Bar Chart */}
              <Card className="lg:col-span-3">
                <CardHeader>
                  <CardTitle>Assortment Depth Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <AssortmentBarChart 
                    data={filteredDepthData} 
                    competitors={selectedCompetitors}
                    colors={competitorColors}
                  />
                </CardContent>
              </Card>
              
              {/* Coverage Heatmap */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Assortment Breadth Coverage</CardTitle>
                </CardHeader>
                <CardContent className="h-[400px]">
                  <AssortmentHeatmap 
                    competitors={competitors.filter(comp => 
                      selectedCompetitors.includes(comp.name)
                    )} 
                    categories={categories} 
                  />
                </CardContent>
              </Card>
              
              {/* Price Distribution */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Price Point Distribution</CardTitle>
                </CardHeader>
                <CardContent className="h-[400px]">
                  <PriceDistributionChart 
                    data={priceData} 
                    competitors={selectedCompetitors}
                    activeCompetitor={activePriceCompetitor}
                  />
                </CardContent>
              </Card>
            </div>
            
            <div className="text-xs text-center text-dashboard-secondaryText mt-6 pt-4 border-t border-dashboard-border">
              <p>Source: Product Catalog Data • Updated: April 17, 2025</p>
            </div>
          </div>
          
          <footer className="bg-white border-t border-dashboard-border py-4 px-6">
            <div className="flex justify-between items-center text-sm text-dashboard-secondaryText">
              <span>© 2025 CategoryBench</span>
              <span>Last updated: April 17, 2025</span>
            </div>
          </footer>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default AssortmentPlanningDashboard;
