
import React, { useState, useEffect } from 'react';
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import Header from '@/components/Header';
import Tabs from '@/components/Tabs';
import { AssortmentTreeView } from '@/components/AssortmentTreeView';
import { AssortmentBarChart } from '@/components/charts/AssortmentBarChart';
import { AssortmentHeatmap } from '@/components/charts/AssortmentHeatmap';
import { PriceDistributionChart } from '@/components/charts/PriceDistributionChart';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Tabs as UITabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { GanttChart, PieChart, BarChart3, LineChart, Filter, Calendar, BarChart } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { assortmentData } from '@/utils/assortmentData';
import GapAnalysisTab from '@/components/assortment-planning/GapAnalysisTab';

const AssortmentPlanningDashboard = () => {
  const [activeTab, setActiveTab] = useState('assortment-planning');
  const [selectedCompetitors, setSelectedCompetitors] = useState(['Your Brand', 'Amazon', 'Walmart']);
  const [selectedCategory, setSelectedCategory] = useState<any>(null);
  const [activePriceCompetitor, setActivePriceCompetitor] = useState('Your Brand');
  const [analysisView, setAnalysisView] = useState('depth');
  const [timeframe, setTimeframe] = useState('30d');

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

  // Calculate summary metrics
  const getTotalProducts = (competitor: string) => {
    return depthData.reduce((total, item) => total + (item[competitor] || 0), 0);
  };

  const getCompetitorCoverage = (competitor: string) => {
    const covered = categories.filter((_, index) => depthData[index][competitor] > 0).length;
    return Math.round((covered / categories.length) * 100);
  };

  const getPriceTierDistribution = (competitor: string) => {
    const total = priceData.reduce((sum, item) => sum + item[competitor], 0);
    return priceData.map(item => ({
      tier: item.priceRange.split(' ')[0],
      percentage: Math.round((item[competitor] / total) * 100)
    }));
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
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-3">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Assortment Planning</h1>
                  <p className="text-gray-500">Compare your product portfolio against competitors</p>
                </div>
                <div className="flex items-center gap-2">
                  <Select value={timeframe} onValueChange={setTimeframe}>
                    <SelectTrigger className="w-[120px]">
                      <SelectValue placeholder="Timeframe" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="7d">Last 7 days</SelectItem>
                      <SelectItem value="30d">Last 30 days</SelectItem>
                      <SelectItem value="90d">Last quarter</SelectItem>
                      <SelectItem value="1y">Last year</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" size="sm" className="flex items-center gap-1">
                    <Calendar size={16} />
                    <span className="hidden md:inline">Export</span>
                  </Button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {selectedCompetitors.slice(0, 4).map(competitor => (
                  <Card key={competitor} className="bg-white border-l-4" style={{ borderLeftColor: competitorColors[competitor] }}>
                    <CardContent className="pt-6">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-sm font-medium text-gray-500">{competitor}</p>
                          <h3 className="text-2xl font-bold">{getTotalProducts(competitor)}</h3>
                          <p className="text-xs text-gray-500">Total Products</p>
                        </div>
                        <div>
                          <Badge className="bg-gray-100 text-gray-700 hover:bg-gray-200">
                            {getCompetitorCoverage(competitor)}% Coverage
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
            
            {/* Tabs for different analysis views */}
            <UITabs value={analysisView} onValueChange={setAnalysisView} className="mb-6">
              <TabsList className="grid grid-cols-4 w-full md:w-auto">
                <TabsTrigger value="depth" className="flex items-center gap-2">
                  <BarChart3 size={16} />
                  <span>Depth Analysis</span>
                </TabsTrigger>
                <TabsTrigger value="breadth" className="flex items-center gap-2">
                  <GanttChart size={16} />
                  <span>Breadth Coverage</span>
                </TabsTrigger>
                <TabsTrigger value="price" className="flex items-center gap-2">
                  <LineChart size={16} />
                  <span>Price Distribution</span>
                </TabsTrigger>
                <TabsTrigger value="gaps" className="flex items-center gap-2">
                  <BarChart size={16} />
                  <span>Gap Analysis</span>
                </TabsTrigger>
              </TabsList>
              
              {/* Filters Card - Common across all tabs except Gap Analysis */}
              {analysisView !== 'gaps' && (
                <Card className="mb-6 mt-4">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center gap-2">
                        <Filter size={18} />
                        <span>Filters</span>
                      </CardTitle>
                      <Button variant="outline" size="sm" onClick={() => setSelectedCompetitors(['Your Brand', 'Amazon', 'Walmart'])}>
                        Reset
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-4">
                      <div className="flex flex-col gap-2">
                        <Label className="font-medium">Competitors</Label>
                        <div className="flex flex-wrap gap-3">
                          {competitors.map((competitor) => (
                            <div key={competitor.id} className="flex items-center gap-2">
                              <Checkbox 
                                id={competitor.id} 
                                checked={selectedCompetitors.includes(competitor.name)} 
                                onCheckedChange={() => handleCompetitorToggle(competitor.name)}
                                className="border-2"
                                style={{ 
                                  borderColor: competitorColors[competitor.name],
                                  backgroundColor: selectedCompetitors.includes(competitor.name) 
                                    ? competitorColors[competitor.name] 
                                    : 'transparent' 
                                }}
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
                      
                      <Separator orientation="vertical" className="h-auto hidden md:block" />
                      
                      <div>
                        <Label className="font-medium">Price Analysis</Label>
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
              )}
              
              <TabsContent value="depth" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                  {/* Tree View */}
                  <Card className="lg:col-span-1">
                    <CardHeader>
                      <CardTitle>Category Hierarchy</CardTitle>
                      <CardDescription>Select a category to view details</CardDescription>
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
                      <CardDescription>
                        Number of products per category across competitors
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <AssortmentBarChart 
                        data={filteredDepthData} 
                        competitors={selectedCompetitors}
                        colors={competitorColors}
                      />
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              
              <TabsContent value="breadth" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Assortment Breadth Coverage</CardTitle>
                    <CardDescription>
                      Category presence across competitors (darker colors indicate higher coverage)
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="h-[500px]">
                    <AssortmentHeatmap 
                      competitors={competitors.filter(comp => 
                        selectedCompetitors.includes(comp.name)
                      )} 
                      categories={categories} 
                    />
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="price" className="space-y-6">
                <Card>
                  <CardHeader>
                    <div className="flex flex-col md:flex-row justify-between md:items-center gap-2">
                      <div>
                        <CardTitle>Price Point Distribution</CardTitle>
                        <CardDescription>
                          Products by price tier for {activePriceCompetitor}
                        </CardDescription>
                      </div>
                      <div className="flex gap-4">
                        {getPriceTierDistribution(activePriceCompetitor).map(item => (
                          <div key={item.tier} className="text-center">
                            <p className="text-sm font-medium">{item.tier}</p>
                            <p className="text-xl font-bold">{item.percentage}%</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="h-[500px]">
                    <PriceDistributionChart 
                      data={priceData} 
                      competitors={selectedCompetitors}
                      activeCompetitor={activePriceCompetitor}
                    />
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="gaps" className="space-y-6">
                <GapAnalysisTab 
                  competitors={competitors} 
                  categories={categories}
                  selectedCompetitors={selectedCompetitors}
                />
              </TabsContent>
            </UITabs>
            
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
