
import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Tabs from '@/components/Tabs';
import { Tabs as UITabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Info, Download, FileText, TrendingDown, Calculator, Target, Zap } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import MetricsCard from '@/components/MetricsCard';
import InsightCard from '@/components/InsightCard';

// Import utilities
import { calculatePromotionImpact, generateHeatmapData, generatePromotionData, generateCampaignCalendar } from '@/utils/promotionUtils';
import TimingCalendarTabV2 from '@/components/promotions-v2/TimingCalendarTabV2';
import CategoryAnalysisTabV2 from '@/components/promotions-v2/CategoryAnalysisTabV2';
import PromotionOptimizerTabV2 from '@/components/promotions-v2/PromotionOptimizerTabV2';
import SeasonalStrategyTabV2 from '@/components/promotions-v2/SeasonalStrategyTabV2';

const PromotionsV2Dashboard = () => {
  const [activeTab, setActiveTab] = useState('promotions');
  const [selectedCategory, setSelectedCategory] = useState('baby');
  const [selectedSubcategory, setSelectedSubcategory] = useState('all');
  const [discountPercentage, setDiscountPercentage] = useState(15);
  const [mounted, setMounted] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState('all');
  const [selectedPromotionType, setSelectedPromotionType] = useState('discount');
  const [selectedPriceRange, setSelectedPriceRange] = useState('all');
  const [selectedTimeframe, setSelectedTimeframe] = useState('all');

  const [basePrice, setBasePrice] = useState(29.99);
  const [baseSales, setBaseSales] = useState(1000);
  const [projectedSales, setProjectedSales] = useState(0);
  const [projectedRevenue, setProjectedRevenue] = useState(0);
  const [revenueImpact, setRevenueImpact] = useState(0);
  const [optimalDiscount, setOptimalDiscount] = useState(0);
  const [elasticity, setElasticity] = useState(0);

  // Load promotion data
  const { monthlyElasticityData, subcategoryElasticityData, priceSensitivityData, seasonalStrategyData } = generatePromotionData();
  const heatmapData = generateHeatmapData(monthlyElasticityData);
  const campaignCalendar = generateCampaignCalendar();

  // Insights data
  const promotionalInsights = [
    {
      title: 'Timing Opportunity',
      description: 'April shows highest sensitivity (-2.20) for Tools category. Prioritize promotions during this month.',
      type: 'opportunity' as const
    },
    {
      title: 'Category Insight',
      description: 'Tools & Home products are 82.7% more responsive to promotions than Books across all time periods.',
      type: 'positive' as const
    },
    {
      title: 'Pricing Alert',
      description: 'Customers are 22.3x more sensitive to price increases than price decreases.',
      type: 'threat' as const
    },
    {
      title: 'Subcategory Focus',
      description: 'Hardware products in the Tools category show high sensitivity (-1.16). Prioritize for promotions.',
      type: 'recommendation' as const
    }
  ];

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  useEffect(() => {
    if (basePrice && baseSales) {
      const results = calculatePromotionImpact(
        basePrice,
        baseSales,
        discountPercentage,
        selectedCategory,
        selectedSubcategory,
        selectedMonth
      );
      
      setProjectedSales(results.projectedSales);
      setProjectedRevenue(results.projectedRevenue);
      setRevenueImpact(results.revenueImpact);
      setOptimalDiscount(results.optimalDiscount);
      setElasticity(results.elasticity);
    }
  }, [basePrice, baseSales, discountPercentage, selectedCategory, selectedSubcategory, selectedMonth]);

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
              <h1 className="text-2xl font-bold text-dashboard-text">Promotion Effectiveness Dashboard</h1>
              
              <div className="flex flex-wrap items-center gap-2 mt-2 md:mt-0">
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-[130px]">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="baby">Baby Products</SelectItem>
                    <SelectItem value="books">Books</SelectItem>
                    <SelectItem value="tools">Tools & Home</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select value={selectedSubcategory} onValueChange={setSelectedSubcategory}>
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Subcategory" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Subcategories</SelectItem>
                    {selectedCategory === 'baby' ? (
                      <>
                        <SelectItem value="feeding">Feeding</SelectItem>
                        <SelectItem value="diapers">Diapers</SelectItem>
                        <SelectItem value="bath">Bath</SelectItem>
                        <SelectItem value="furniture">Furniture</SelectItem>
                        <SelectItem value="strollers">Strollers</SelectItem>
                        <SelectItem value="toys">Toys</SelectItem>
                      </>
                    ) : selectedCategory === 'books' ? (
                      <>
                        <SelectItem value="business">Business</SelectItem>
                        <SelectItem value="fiction">Fiction</SelectItem>
                        <SelectItem value="children">Children's</SelectItem>
                        <SelectItem value="academic">Academic</SelectItem>
                      </>
                    ) : (
                      <>
                        <SelectItem value="paint">Paint & Wall Treatments</SelectItem>
                        <SelectItem value="power_tools">Power & Hand Tools</SelectItem>
                        <SelectItem value="hardware">Hardware</SelectItem>
                      </>
                    )}
                  </SelectContent>
                </Select>
                
                <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                  <SelectTrigger className="w-[130px]">
                    <SelectValue placeholder="Month" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Months</SelectItem>
                    <SelectItem value="jan">January</SelectItem>
                    <SelectItem value="feb">February</SelectItem>
                    <SelectItem value="mar">March</SelectItem>
                    <SelectItem value="apr">April</SelectItem>
                    <SelectItem value="may">May</SelectItem>
                    <SelectItem value="jun">June</SelectItem>
                    <SelectItem value="jul">July</SelectItem>
                    <SelectItem value="aug">August</SelectItem>
                    <SelectItem value="sep">September</SelectItem>
                    <SelectItem value="oct">October</SelectItem>
                    <SelectItem value="nov">November</SelectItem>
                    <SelectItem value="dec">December</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={selectedPriceRange} onValueChange={setSelectedPriceRange}>
                  <SelectTrigger className="w-[130px]">
                    <SelectValue placeholder="Price Range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Prices</SelectItem>
                    <SelectItem value="low">Under $20</SelectItem>
                    <SelectItem value="medium">$20-$50</SelectItem>
                    <SelectItem value="high">Over $50</SelectItem>
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
                        <strong>Price Sensitivity(PSI) </strong> measures how sensitive demand is to price changes. 
                        A value of -1.0 means a 10% price reduction increases sales by 10%.
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

            {/* Understanding Price Sensitivity Index (PSI) Section */}
            <div className="dashboard-card mb-6 bg-blue-50 border-l-4 border-dashboard-primary">
              <div className="flex items-start gap-3">
                <Info className="h-5 w-5 text-dashboard-primary mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-medium text-dashboard-text mb-1">Understanding Price sensitivity index (PSI) </h3>
                  <p className="text-sm text-dashboard-secondaryText">
                    Price sensitivity index measures how demand responds to price changes. A value of <strong>-1.0</strong> means a 10% price 
                    reduction leads to 10% more sales (ie unit is sensitive to price). Values between <strong>0 and -1</strong> indicate 
                    less responsive to price change, while values <strong>below -1</strong> are very responsive to price changes. For example, an PSI of <strong>-2.0</strong> means a 10% price reduction 
                    increases sales by 20%. Negative values are normal and indicate the inverse relationship 
                    between price and demand.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Top Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
              <MetricsCard
                label="Avg. sensitivity"
                value={elasticity.toFixed(2)}
                change="-0.2"
                isPositive={false}
                secondaryLabel="YoY"
                secondaryChange="-0.3"
                isSecondaryPositive={false}
                icon={<TrendingDown className="text-dashboard-primary" size={20} />}
              />
              <MetricsCard
                label="Revenue Impact"
                value={`+$${(revenueImpact / 1000).toFixed(1)}K`}
                change="+2.8%"
                isPositive={true}
                secondaryLabel="YoY"
                secondaryChange="+5.4%"
                isSecondaryPositive={true}
                icon={<Calculator className="text-dashboard-secondary" size={20} />}
              />
              <MetricsCard
                label="Optimal Discount"
                value={`${optimalDiscount}%`}
                change="Based on sensitivity"
                isPositive={true}
                secondaryLabel="vs. Industry"
                secondaryChange="Better"
                isSecondaryPositive={true}
                icon={<Target className="text-dashboard-primary" size={20} />}
              />
              <MetricsCard
                label="Optimization Score"
                value="81"
                change="+9"
                isPositive={true}
                secondaryLabel="vs Previous"
                secondaryChange="+5"
                isSecondaryPositive={true}
                icon={<Zap className="text-dashboard-secondary" size={20} />}
              />
            </div>

            <UITabs defaultValue="timing" className="mb-6">
              <TabsList className="grid grid-cols-4 mb-4 bg-gray-100 p-1.5 rounded-lg shadow-sm border border-gray-200">
                <TabsTrigger value="timing" className="font-semibold">Timing & Calendar</TabsTrigger>
                <TabsTrigger value="category" className="font-semibold">Category Analysis</TabsTrigger>
                <TabsTrigger value="optimization" className="font-semibold">Promotion Optimizer</TabsTrigger>
                <TabsTrigger value="strategy" className="font-semibold">Seasonal Strategy</TabsTrigger>
              </TabsList>
              
              <TabsContent value="timing">
                <TimingCalendarTabV2 
                  monthlyElasticityData={monthlyElasticityData}
                  heatmapData={heatmapData}
                />
              </TabsContent>
              
              <TabsContent value="category">
                <CategoryAnalysisTabV2 
                  subcategoryElasticityData={subcategoryElasticityData}
                  priceSensitivityData={priceSensitivityData}
                />
              </TabsContent>
              
              <TabsContent value="optimization">
                <PromotionOptimizerTabV2 
                  initialPrice={basePrice}
                  initialSales={baseSales}
                />
              </TabsContent>
              
              <TabsContent value="strategy">
                <SeasonalStrategyTabV2 
                  seasonalStrategyData={seasonalStrategyData}
                  campaignCalendar={campaignCalendar}
                />
              </TabsContent>
            </UITabs>
            
            {/* Insights */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
              {promotionalInsights.map((insight, index) => (
                <InsightCard
                  key={index}
                  title={insight.title}
                  description={insight.description}
                  type={insight.type}
                />
              ))}
            </div>
            
            <div className="text-xs text-center text-dashboard-secondaryText mt-6 pt-6 border-t border-dashboard-border">
              <p>
                Source: SimilarWeb • Data Period: Mar 2023 - Feb 2025 • Analysis based on 47,901 data points and 1,256 sensitivity(psi) measurements
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

export default PromotionsV2Dashboard;
