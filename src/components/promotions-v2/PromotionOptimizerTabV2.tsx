
import React, { useState } from 'react';
import { Calculator, DollarSign, ShoppingCart, Percent, BarChart4 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { calculatePromotionImpact, calculateWhatIfScenario } from '@/utils/promotionUtils';

interface PromotionOptimizerTabV2Props {
  basePrice: number;
  setBasePrice: (price: number) => void;
  baseSales: number;
  setBaseSales: (sales: number) => void;
  discountPercentage: number;
  setDiscountPercentage: (discount: number) => void;
  selectedPromotionType: string;
  setSelectedPromotionType: (type: string) => void;
  projectedSales: number;
  projectedRevenue: number;
  revenueImpact: number;
  optimalDiscount: number;
  category: string;
  subcategory: string;
}

const PromotionOptimizerTabV2: React.FC<PromotionOptimizerTabV2Props> = ({
  basePrice,
  setBasePrice,
  baseSales,
  setBaseSales,
  discountPercentage,
  setDiscountPercentage,
  selectedPromotionType,
  setSelectedPromotionType,
  projectedSales,
  projectedRevenue,
  revenueImpact,
  optimalDiscount,
  category,
  subcategory
}) => {
  const [competitorActivity, setCompetitorActivity] = useState(0);
  const [seasonality, setSeasonality] = useState(0);
  const [adSupport, setAdSupport] = useState(0);
  const [productLifecycle, setProductLifecycle] = useState('growth');
  
  // Create comparison data for different discount levels
  const generateComparisonData = () => {
    const data = [];
    
    for (let discount = 0; discount <= 40; discount += 5) {
      const result = calculatePromotionImpact(
        basePrice,
        baseSales,
        discount,
        category,
        subcategory,
        'all'
      );
      
      data.push({
        discount: `${discount}%`,
        sales: result.projectedSales,
        revenue: result.projectedRevenue,
        revenueImpact: result.revenueImpact
      });
    }
    
    return data;
  };
  
  // Generate what-if scenario data
  const generateScenarioData = () => {
    const baseElasticity = -0.89;
    
    // Calculate adjusted elasticity
    const adjustedElasticity = calculateWhatIfScenario(
      baseElasticity,
      {
        competitorActivity,
        seasonality,
        advertisingSupport: adSupport,
        productLifecycle
      }
    );
    
    // Calculate results with adjusted elasticity
    const baseResult = {
      sales: baseSales,
      revenue: baseSales * basePrice,
      profit: baseSales * basePrice * 0.25 // Assume 25% profit margin
    };
    
    const discountRate = discountPercentage / 100;
    const newPrice = basePrice * (1 - discountRate);
    
    // Use adjusted elasticity to calculate new sales
    const salesImpact = baseSales * (1 + (Math.abs(adjustedElasticity) * discountRate));
    
    // Assume promotional costs are 2% of revenue plus fixed costs
    const promotionalCosts = (salesImpact * newPrice) * 0.02 + 1000;
    
    // Calculate new profit (assume 25% margin before discount)
    const newProfit = (salesImpact * newPrice) * 0.25 - promotionalCosts;
    const profitImpact = newProfit - baseResult.profit;
    
    return {
      salesLift: Math.round((salesImpact - baseSales) / baseSales * 100),
      revenueLift: Math.round((salesImpact * newPrice - baseResult.revenue) / baseResult.revenue * 100),
      roi: Math.round(profitImpact / promotionalCosts * 100),
      adjustedElasticity: adjustedElasticity.toFixed(2),
      promotionalCosts: Math.round(promotionalCosts),
      profitImpact: Math.round(profitImpact)
    };
  };
  
  const comparisonData = generateComparisonData();
  const scenarioResults = generateScenarioData();
  
  // Format currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };
  
  return (
    <div className="animate-fade-in">
      <Tabs defaultValue="simulator">
        <TabsList className="mb-4 w-full justify-start">
          <TabsTrigger value="simulator">Discount Simulator</TabsTrigger>
          <TabsTrigger value="comparison">Discount Comparison</TabsTrigger>
          <TabsTrigger value="scenarios">What-If Analysis</TabsTrigger>
          <TabsTrigger value="roi">ROI Calculator</TabsTrigger>
        </TabsList>
      
        <TabsContent value="simulator">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
              <div className="dashboard-card h-full">
                <h3 className="text-lg font-medium text-dashboard-text mb-4">Discount Settings</h3>
                
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="basePrice">Base Price ($)</Label>
                    <Input
                      id="basePrice"
                      type="number"
                      value={basePrice}
                      onChange={(e) => setBasePrice(Number(e.target.value))}
                      min={1}
                      step={0.01}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="baseSales">Monthly Sales Volume</Label>
                    <Input
                      id="baseSales"
                      type="number"
                      value={baseSales}
                      onChange={(e) => setBaseSales(Number(e.target.value))}
                      min={1}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label htmlFor="discountPercentage">Discount Percentage</Label>
                      <span>{discountPercentage}%</span>
                    </div>
                    <Slider
                      id="discountPercentage"
                      value={[discountPercentage]}
                      onValueChange={(values) => setDiscountPercentage(values[0])}
                      max={50}
                      step={1}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Promotion Type</Label>
                    <RadioGroup 
                      defaultValue={selectedPromotionType} 
                      onValueChange={setSelectedPromotionType}
                      className="flex flex-col space-y-1"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="discount" id="discount" />
                        <Label htmlFor="discount">Price Discount</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="bundle" id="bundle" />
                        <Label htmlFor="bundle">Product Bundle</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="coupon" id="coupon" />
                        <Label htmlFor="coupon">Coupon Code</Label>
                      </div>
                    </RadioGroup>
                  </div>
                  
                  <div className="pt-2">
                    <Button className="w-full">
                      Calculate Impact
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-2">
              <div className="dashboard-card">
                <h3 className="text-lg font-medium text-dashboard-text mb-4">Promotion Impact</h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div className="bg-white rounded-lg p-4 border border-dashboard-border">
                    <div className="flex items-center mb-2">
                      <ShoppingCart className="text-dashboard-primary mr-2" size={18} />
                      <h4 className="text-sm font-medium">Projected Sales</h4>
                    </div>
                    <p className="text-2xl font-semibold">{projectedSales.toLocaleString()}</p>
                    <p className="text-sm text-dashboard-secondaryText mt-1">
                      <span className="text-green-600">+{Math.round((projectedSales / baseSales - 1) * 100)}%</span> vs. Base Sales
                    </p>
                  </div>
                  
                  <div className="bg-white rounded-lg p-4 border border-dashboard-border">
                    <div className="flex items-center mb-2">
                      <DollarSign className="text-dashboard-secondary mr-2" size={18} />
                      <h4 className="text-sm font-medium">Projected Revenue</h4>
                    </div>
                    <p className="text-2xl font-semibold">{formatCurrency(projectedRevenue)}</p>
                    <p className="text-sm text-dashboard-secondaryText mt-1">
                      <span className={revenueImpact >= 0 ? "text-green-600" : "text-red-600"}>
                        {revenueImpact >= 0 ? "+" : ""}{formatCurrency(revenueImpact)}
                      </span> Impact
                    </p>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg p-4 border border-dashboard-border mb-4">
                  <div className="flex items-center mb-2">
                    <Percent className="text-dashboard-primary mr-2" size={18} />
                    <h4 className="text-sm font-medium">Optimal Discount</h4>
                  </div>
                  <p className="text-2xl font-semibold">{optimalDiscount}%</p>
                  <p className="text-sm text-dashboard-secondaryText mt-1">
                    Based on elasticity of {elasticity.toFixed(2)}
                  </p>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-4 border border-dashboard-border">
                  <h4 className="text-sm font-medium mb-3">Projection Summary</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex justify-between">
                      <span>Base Revenue:</span>
                      <span className="font-medium">{formatCurrency(basePrice * baseSales)}</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Promotional Price:</span>
                      <span className="font-medium">${(basePrice * (1 - discountPercentage / 100)).toFixed(2)}</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Sales Lift:</span>
                      <span className="font-medium text-green-600">+{Math.round((projectedSales / baseSales - 1) * 100)}%</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Revenue Impact:</span>
                      <span className={`font-medium ${revenueImpact >= 0 ? "text-green-600" : "text-red-600"}`}>
                        {revenueImpact >= 0 ? "+" : ""}{Math.round((revenueImpact / (basePrice * baseSales)) * 100)}%
                      </span>
                    </li>
                    <li className="flex justify-between border-t border-gray-200 pt-2 mt-2">
                      <span>Recommendation:</span>
                      <span className="font-medium">
                        {discountPercentage < optimalDiscount 
                          ? "Increase discount" 
                          : discountPercentage > optimalDiscount
                            ? "Decrease discount"
                            : "Optimal discount"
                        }
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="comparison">
          <div className="dashboard-card">
            <h3 className="text-lg font-medium text-dashboard-text mb-4">Discount Level Comparison</h3>
            
            <div style={{ height: "350px" }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={comparisonData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f1f1" />
                  <XAxis dataKey="discount" axisLine={false} tickLine={false} />
                  <YAxis yAxisId="left" axisLine={false} tickLine={false} />
                  <YAxis yAxisId="right" orientation="right" axisLine={false} tickLine={false} />
                  <Tooltip
                    formatter={(value: number) => [formatCurrency(value), undefined]}
                    contentStyle={{ 
                      borderRadius: '6px', 
                      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
                      border: '1px solid #e5e7eb'
                    }}
                  />
                  <Legend />
                  <Bar yAxisId="left" dataKey="revenue" name="Total Revenue" fill="#5840bb" radius={[4, 4, 0, 0]} />
                  <Bar yAxisId="right" dataKey="revenueImpact" name="Revenue Impact" fill="#6892e6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div className="bg-white rounded-lg p-4 border border-dashboard-border">
                <h4 className="text-sm font-medium mb-3">Revenue Optimization</h4>
                <div className="space-y-4">
                  <p className="text-sm text-dashboard-secondaryText">
                    Based on the elasticity value of {elasticity.toFixed(2)} for {subcategory === 'all' ? 'this category' : subcategory}, 
                    the optimal discount to maximize revenue is <strong>{optimalDiscount}%</strong>.
                  </p>
                  <div className="flex items-center justify-between bg-gray-50 p-3 rounded-md">
                    <span className="text-sm font-medium">Recommended Discount Range:</span>
                    <span className="font-medium text-dashboard-primary">{Math.max(optimalDiscount - 5, 0)}% - {optimalDiscount + 5}%</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg p-4 border border-dashboard-border">
                <h4 className="text-sm font-medium mb-3">Discount Impact Comparison</h4>
                <div className="space-y-2 text-sm">
                  {comparisonData.filter((_, index) => index % 2 === 0).map((item, index) => (
                    <div key={index} className="flex justify-between py-1 border-b border-gray-100">
                      <span>{item.discount} Discount:</span>
                      <span className={`font-medium ${item.revenueImpact >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {item.revenueImpact >= 0 ? '+' : ''}{formatCurrency(item.revenueImpact)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="scenarios">
          <div className="dashboard-card">
            <h3 className="text-lg font-medium text-dashboard-text mb-4">What-If Analysis</h3>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label>Competitor Activity</Label>
                    <span className="text-sm text-dashboard-secondaryText">
                      {competitorActivity === 0 ? 'Neutral' : competitorActivity > 0 ? 'Higher' : 'Lower'}
                    </span>
                  </div>
                  <Slider
                    value={[competitorActivity]}
                    onValueChange={(values) => setCompetitorActivity(values[0])}
                    min={-1}
                    max={1}
                    step={0.1}
                  />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label>Seasonality Impact</Label>
                    <span className="text-sm text-dashboard-secondaryText">
                      {seasonality === 0 ? 'Average' : seasonality > 0 ? 'Peak Season' : 'Off Season'}
                    </span>
                  </div>
                  <Slider
                    value={[seasonality]}
                    onValueChange={(values) => setSeasonality(values[0])}
                    min={-1}
                    max={1}
                    step={0.1}
                  />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label>Advertising Support</Label>
                    <span className="text-sm text-dashboard-secondaryText">
                      {adSupport === 0 ? 'None' : adSupport > 0.5 ? 'Strong' : 'Moderate'}
                    </span>
                  </div>
                  <Slider
                    value={[adSupport]}
                    onValueChange={(values) => setAdSupport(values[0])}
                    min={0}
                    max={1}
                    step={0.1}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Product Lifecycle</Label>
                  <Select value={productLifecycle} onValueChange={setProductLifecycle}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select lifecycle stage" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="new">New Product</SelectItem>
                      <SelectItem value="growth">Growth Phase</SelectItem>
                      <SelectItem value="mature">Mature Product</SelectItem>
                      <SelectItem value="decline">Declining Product</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div>
                <div className="bg-white rounded-lg p-4 border border-dashboard-border mb-4">
                  <h4 className="text-sm font-medium mb-3">Scenario Impact</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-dashboard-secondaryText">Adjusted Elasticity</p>
                      <p className="text-xl font-semibold">{scenarioResults.adjustedElasticity}</p>
                    </div>
                    <div>
                      <p className="text-xs text-dashboard-secondaryText">Sales Lift</p>
                      <p className="text-xl font-semibold text-green-600">+{scenarioResults.salesLift}%</p>
                    </div>
                    <div>
                      <p className="text-xs text-dashboard-secondaryText">Revenue Impact</p>
                      <p className={`text-xl font-semibold ${scenarioResults.revenueLift >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {scenarioResults.revenueLift >= 0 ? '+' : ''}{scenarioResults.revenueLift}%
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-dashboard-secondaryText">ROI</p>
                      <p className={`text-xl font-semibold ${scenarioResults.roi >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {scenarioResults.roi}%
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-4 border border-dashboard-border">
                  <h4 className="text-sm font-medium mb-3">Scenario Analysis</h4>
                  <div className="space-y-4 text-sm">
                    <p>
                      Under this scenario, a <strong>{discountPercentage}% discount</strong> would result in 
                      <strong className="text-green-600"> {scenarioResults.salesLift}% higher sales</strong> and
                      <strong className={scenarioResults.revenueLift >= 0 ? 'text-green-600' : 'text-red-600'}>
                        {' '}{scenarioResults.revenueLift >= 0 ? '+' : ''}{scenarioResults.revenueLift}% revenue
                      </strong>.
                    </p>
                    
                    <p>
                      Promotional costs are estimated at <strong>{formatCurrency(scenarioResults.promotionalCosts)}</strong>,
                      with a profit impact of 
                      <strong className={scenarioResults.profitImpact >= 0 ? 'text-green-600' : 'text-red-600'}>
                        {' '}{scenarioResults.profitImpact >= 0 ? '+' : ''}{formatCurrency(scenarioResults.profitImpact)}
                      </strong>.
                    </p>
                    
                    <div className="bg-white p-3 rounded-md border border-dashboard-border">
                      <p className="font-medium">Recommendation:</p>
                      <p className="mt-1">
                        {scenarioResults.roi >= 15 
                          ? "Proceed with promotion - strong ROI expected." 
                          : scenarioResults.roi >= 0 
                            ? "Carefully proceed - modest returns expected." 
                            : "Reconsider promotion - negative ROI expected."}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="roi">
          <div className="dashboard-card">
            <h3 className="text-lg font-medium text-dashboard-text mb-4">ROI Calculator</h3>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-1 space-y-4">
                <div className="bg-white rounded-lg p-4 border border-dashboard-border">
                  <h4 className="text-sm font-medium mb-3">Cost Inputs</h4>
                  
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="promoDiscount">Discount Cost</Label>
                      <div className="flex items-center">
                        <DollarSign className="h-4 w-4 text-dashboard-secondaryText mr-1" />
                        <Input
                          id="promoDiscount"
                          value={(basePrice * (discountPercentage / 100) * projectedSales).toFixed(0)}
                          disabled
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="adSpend">Advertising Spend</Label>
                      <div className="flex items-center">
                        <DollarSign className="h-4 w-4 text-dashboard-secondaryText mr-1" />
                        <Input
                          id="adSpend"
                          defaultValue="2000"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="operationalCosts">Operational Costs</Label>
                      <div className="flex items-center">
                        <DollarSign className="h-4 w-4 text-dashboard-secondaryText mr-1" />
                        <Input
                          id="operationalCosts"
                          defaultValue="1000"
                        />
                      </div>
                    </div>
                    
                    <div className="pt-2">
                      <Button className="w-full">
                        Calculate ROI
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg p-4 border border-dashboard-border">
                  <h4 className="text-sm font-medium mb-3">Profit Margin</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label>Margin Percentage</Label>
                      <span>25%</span>
                    </div>
                    <Slider
                      defaultValue={[25]}
                      max={50}
                      step={1}
                    />
                  </div>
                </div>
              </div>
              
              <div className="lg:col-span-2">
                <div className="bg-white rounded-lg p-4 border border-dashboard-border mb-4">
                  <h4 className="text-sm font-medium mb-4">ROI Analysis</h4>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                    <div className="bg-gray-50 p-3 rounded-md">
                      <p className="text-xs text-dashboard-secondaryText">Total Revenue</p>
                      <p className="text-xl font-semibold">{formatCurrency(projectedRevenue)}</p>
                    </div>
                    
                    <div className="bg-gray-50 p-3 rounded-md">
                      <p className="text-xs text-dashboard-secondaryText">Total Costs</p>
                      <p className="text-xl font-semibold">{formatCurrency((basePrice * (discountPercentage / 100) * projectedSales) + 3000)}</p>
                    </div>
                    
                    <div className="bg-gray-50 p-3 rounded-md">
                      <p className="text-xs text-dashboard-secondaryText">Promotion ROI</p>
                      <p className="text-xl font-semibold text-green-600">142%</p>
                    </div>
                  </div>
                  
                  <div style={{ height: "250px" }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={[
                          { name: 'Before Promotion', revenue: basePrice * baseSales, profit: basePrice * baseSales * 0.25 },
                          { name: 'After Promotion', revenue: projectedRevenue, profit: projectedRevenue * 0.25 - ((basePrice * (discountPercentage / 100) * projectedSales) + 3000) }
                        ]}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f1f1" />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} />
                        <YAxis axisLine={false} tickLine={false} />
                        <Tooltip
                          formatter={(value: number) => [formatCurrency(value), undefined]}
                          contentStyle={{ 
                            borderRadius: '6px', 
                            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
                            border: '1px solid #e5e7eb'
                          }}
                        />
                        <Legend />
                        <Bar dataKey="revenue" name="Revenue" fill="#5840bb" radius={[4, 4, 0, 0]} />
                        <Bar dataKey="profit" name="Profit" fill="#00bc8c" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-4 border border-dashboard-border">
                  <h4 className="text-sm font-medium mb-3">ROI Breakdown</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between py-1 border-b border-gray-200">
                      <span>Base Revenue:</span>
                      <span className="font-medium">{formatCurrency(basePrice * baseSales)}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-gray-200">
                      <span>Promotional Revenue:</span>
                      <span className="font-medium">{formatCurrency(projectedRevenue)}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-gray-200">
                      <span>Revenue Lift:</span>
                      <span className="font-medium text-green-600">
                        +{formatCurrency(projectedRevenue - (basePrice * baseSales))}
                      </span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-gray-200">
                      <span>Discount Cost:</span>
                      <span className="font-medium">{formatCurrency(basePrice * (discountPercentage / 100) * projectedSales)}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-gray-200">
                      <span>Additional Promo Costs:</span>
                      <span className="font-medium">{formatCurrency(3000)}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-gray-200">
                      <span>Net Profit Impact:</span>
                      <span className="font-medium text-green-600">
                        +{formatCurrency((projectedRevenue * 0.25 - ((basePrice * (discountPercentage / 100) * projectedSales) + 3000)) - (basePrice * baseSales * 0.25))}
                      </span>
                    </div>
                    <div className="flex justify-between pt-2 font-medium">
                      <span>Return on Investment:</span>
                      <span className="text-green-600">142%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PromotionOptimizerTabV2;
