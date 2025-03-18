
import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Tabs from '@/components/Tabs';
import { Tabs as UITabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Import refactored components
import TimingCalendarTab from '@/components/promotions/TimingCalendarTab';
import CategoryAnalysisTab from '@/components/promotions/CategoryAnalysisTab';
import PromotionOptimizerTab from '@/components/promotions/PromotionOptimizerTab';
import SeasonalStrategyTab from '@/components/promotions/SeasonalStrategyTab';

// Import utilities
import { calculatePromotionImpact, generateHeatmapData, generatePromotionData } from '@/utils/promotionUtils';

const PromotionsDashboard = () => {
  const [activeTab, setActiveTab] = useState('promotions');
  const [selectedCategory, setSelectedCategory] = useState('baby');
  const [selectedSubcategory, setSelectedSubcategory] = useState('all');
  const [discountPercentage, setDiscountPercentage] = useState(15);
  const [mounted, setMounted] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState('all');
  const [selectedPromotionType, setSelectedPromotionType] = useState('discount');

  const [basePrice, setBasePrice] = useState(29.99);
  const [baseSales, setBaseSales] = useState(1000);
  const [projectedSales, setProjectedSales] = useState(0);
  const [projectedRevenue, setProjectedRevenue] = useState(0);
  const [revenueImpact, setRevenueImpact] = useState(0);
  const [optimalDiscount, setOptimalDiscount] = useState(0);

  // Load promotion data
  const { monthlyElasticityData, subcategoryElasticityData, priceSensitivityData } = generatePromotionData();
  const heatmapData = generateHeatmapData(monthlyElasticityData);

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
    }
  }, [basePrice, baseSales, discountPercentage, selectedCategory, selectedSubcategory, selectedMonth]);

  return (
    <div className="flex min-h-screen bg-dashboard-bg">
      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <div className="flex-1 flex flex-col">
        <Header />
        
        <div className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
              <h1 className="text-2xl font-bold text-dashboard-text">Promotion Effectiveness Dashboard</h1>
              
              <div className="flex items-center gap-2 mt-2 md:mt-0">
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-[130px]">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="baby">Baby Products</SelectItem>
                    <SelectItem value="books">Books</SelectItem>
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
                    ) : (
                      <>
                        <SelectItem value="business">Business</SelectItem>
                        <SelectItem value="fiction">Fiction</SelectItem>
                        <SelectItem value="children">Children's</SelectItem>
                        <SelectItem value="academic">Academic</SelectItem>
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
              </div>
            </div>

            <UITabs defaultValue="timing" className="mb-6">
              <TabsList className="grid grid-cols-4 mb-4">
                <TabsTrigger value="timing">Timing & Calendar</TabsTrigger>
                <TabsTrigger value="category">Category Analysis</TabsTrigger>
                <TabsTrigger value="optimization">Promotion Optimizer</TabsTrigger>
                <TabsTrigger value="strategy">Seasonal Strategy</TabsTrigger>
              </TabsList>
              
              <TabsContent value="timing">
                <TimingCalendarTab 
                  monthlyElasticityData={monthlyElasticityData}
                  heatmapData={heatmapData}
                />
              </TabsContent>
              
              <TabsContent value="category">
                <CategoryAnalysisTab 
                  subcategoryElasticityData={subcategoryElasticityData}
                  priceSensitivityData={priceSensitivityData}
                />
              </TabsContent>
              
              <TabsContent value="optimization">
                <PromotionOptimizerTab 
                  basePrice={basePrice}
                  setBasePrice={setBasePrice}
                  baseSales={baseSales}
                  setBaseSales={setBaseSales}
                  discountPercentage={discountPercentage}
                  setDiscountPercentage={setDiscountPercentage}
                  selectedPromotionType={selectedPromotionType}
                  setSelectedPromotionType={setSelectedPromotionType}
                  projectedSales={projectedSales}
                  projectedRevenue={projectedRevenue}
                  revenueImpact={revenueImpact}
                  optimalDiscount={optimalDiscount}
                />
              </TabsContent>
              
              <TabsContent value="strategy">
                <SeasonalStrategyTab />
              </TabsContent>
            </UITabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromotionsDashboard;
