
import React, { useState } from 'react';
import { Percent, TrendingUp, DollarSign, Copy, Calculator } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import MetricsCard from '@/components/MetricsCard';
import { LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Line, Legend, ResponsiveContainer } from 'recharts';

interface PromotionOptimizerTabProps {
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
}

const PromotionOptimizerTab: React.FC<PromotionOptimizerTabProps> = ({
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
  optimalDiscount
}) => {
  const [scenarios, setScenarios] = useState<Array<{name: string, discount: number, sales: number, revenue: number}>>([]);
  const [scenarioName, setScenarioName] = useState("Scenario 1");
  
  const saveScenario = () => {
    const newScenario = {
      name: scenarioName,
      discount: discountPercentage,
      sales: projectedSales,
      revenue: projectedRevenue
    };
    
    setScenarios([...scenarios, newScenario]);
    setScenarioName(`Scenario ${scenarios.length + 2}`);
  };

  return (
    <div className="animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <MetricsCard
          label="Recommended Discount"
          value={`${optimalDiscount}%`}
          change="For Maximum Revenue"
          secondaryLabel="Based on Elasticity"
          isPositive={true}
          icon={<Percent className="text-dashboard-primary" />}
        />
        <MetricsCard
          label="Projected Sales Lift"
          value={`${((projectedSales / baseSales - 1) * 100).toFixed(1)}%`}
          change={`+${projectedSales - baseSales} Units`}
          secondaryLabel="With Current Discount"
          isPositive={projectedSales > baseSales}
          icon={<TrendingUp className="text-dashboard-primary" />}
        />
        <MetricsCard
          label="Revenue Impact"
          value={`$${revenueImpact.toLocaleString()}`}
          change={`${((projectedRevenue / (baseSales * basePrice) - 1) * 100).toFixed(1)}%`}
          secondaryLabel="Net Revenue Change"
          isPositive={revenueImpact > 0}
          icon={<DollarSign className="text-dashboard-primary" />}
        />
      </div>
      
      <Tabs defaultValue="simulator" className="mb-6">
        <TabsList className="mb-4">
          <TabsTrigger value="simulator">Discount Simulator</TabsTrigger>
          <TabsTrigger value="scenarios">Scenario Modeling</TabsTrigger>
          <TabsTrigger value="roi">ROI Calculator</TabsTrigger>
        </TabsList>
        
        <TabsContent value="simulator" className="space-y-6">
          <div className="dashboard-card">
            <h3 className="text-lg font-medium text-dashboard-text mb-4">Discount Simulator</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="base-price">Base Price ($)</Label>
                  <Input
                    id="base-price"
                    type="number"
                    value={basePrice}
                    onChange={(e) => setBasePrice(Number(e.target.value))}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="base-sales">Current Monthly Sales (Units)</Label>
                  <Input
                    id="base-sales"
                    type="number"
                    value={baseSales}
                    onChange={(e) => setBaseSales(Number(e.target.value))}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="discount">Discount Percentage (%)</Label>
                  <div className="flex items-center gap-2 mt-1">
                    <Input
                      id="discount"
                      type="number"
                      value={discountPercentage}
                      onChange={(e) => setDiscountPercentage(Number(e.target.value))}
                    />
                    <Button 
                      onClick={() => setDiscountPercentage(optimalDiscount)}
                      variant="outline"
                    >
                      Use Optimal
                    </Button>
                  </div>
                </div>
                <div>
                  <Label>Promotion Type</Label>
                  <div className="flex gap-2 mt-1">
                    <Button 
                      variant={selectedPromotionType === 'discount' ? 'default' : 'outline'}
                      onClick={() => setSelectedPromotionType('discount')}
                      className="flex-1"
                    >
                      % Discount
                    </Button>
                    <Button 
                      variant={selectedPromotionType === 'bogo' ? 'default' : 'outline'}
                      onClick={() => setSelectedPromotionType('bogo')}
                      className="flex-1"
                    >
                      BOGO
                    </Button>
                    <Button 
                      variant={selectedPromotionType === 'bundle' ? 'default' : 'outline'}
                      onClick={() => setSelectedPromotionType('bundle')}
                      className="flex-1"
                    >
                      Bundle
                    </Button>
                  </div>
                </div>
                <div className="pt-4">
                  <Button onClick={saveScenario} className="w-full">
                    <Copy className="mr-2 h-4 w-4" />
                    Save This Scenario
                  </Button>
                </div>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-md">
                <h4 className="font-medium mb-3">Simulation Results</h4>
                <div className="space-y-2">
                  <div className="flex justify-between py-1 border-b border-gray-200">
                    <span className="text-dashboard-secondaryText">Original Price:</span>
                    <span className="font-medium">${basePrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-gray-200">
                    <span className="text-dashboard-secondaryText">Promotional Price:</span>
                    <span className="font-medium">${(basePrice * (1 - discountPercentage / 100)).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-gray-200">
                    <span className="text-dashboard-secondaryText">Original Sales:</span>
                    <span className="font-medium">{baseSales.toLocaleString()} units</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-gray-200">
                    <span className="text-dashboard-secondaryText">Projected Sales:</span>
                    <span className="font-medium">{projectedSales.toLocaleString()} units</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-gray-200">
                    <span className="text-dashboard-secondaryText">Original Revenue:</span>
                    <span className="font-medium">${(baseSales * basePrice).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-gray-200">
                    <span className="text-dashboard-secondaryText">Projected Revenue:</span>
                    <span className="font-medium">${projectedRevenue.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-gray-200 font-medium">
                    <span>Net Revenue Impact:</span>
                    <span className={revenueImpact >= 0 ? 'text-green-600' : 'text-red-600'}>
                      {revenueImpact >= 0 ? '+' : ''} ${revenueImpact.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-gray-200">
                    <span className="text-dashboard-secondaryText">Return on Promotion:</span>
                    <span className="font-medium">
                      {(revenueImpact / (basePrice * discountPercentage / 100 * projectedSales) * 100).toFixed(1)}%
                    </span>
                  </div>
                </div>
                <div className="mt-3 text-sm">
                  <span className={optimalDiscount === discountPercentage ? 'text-dashboard-success font-medium' : 'text-dashboard-warning'}>
                    {optimalDiscount === discountPercentage ? 
                      '✓ You are using the optimal discount rate' : 
                      `Recommended discount: ${optimalDiscount}% for maximum revenue`}
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="dashboard-card">
            <h3 className="text-lg font-medium text-dashboard-text mb-4">Promotion ROI by Discount Level</h3>
            <div style={{ height: "300px" }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis 
                    label={{ value: 'Discount Percentage (%)', position: 'insideBottom', offset: -5 }}
                    type="number"
                    domain={[0, 50]}
                    tickCount={6}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    label={{ value: 'Revenue Change (%)', angle: -90, position: 'insideLeft' }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip
                    formatter={(value: any) => [`${value}%`, 'Revenue Change']}
                    labelFormatter={(value) => `Discount: ${value}%`}
                    contentStyle={{ 
                      borderRadius: '6px', 
                      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
                      border: '1px solid #e5e7eb'
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="baby"
                    name="Baby Products"
                    stroke="#5840bb"
                    dot={false}
                    isAnimationActive={false}
                    data={Array.from({ length: 51 }, (_, i) => {
                      const discount = i / 100;
                      const elasticity = -0.78;
                      const revenueChange = (1 + (elasticity * discount)) * (1 - discount) - 1;
                      return { x: i, baby: (revenueChange * 100).toFixed(1) };
                    })}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="books"
                    name="Books"
                    stroke="#6892e6"
                    dot={false}
                    isAnimationActive={false}
                    data={Array.from({ length: 51 }, (_, i) => {
                      const discount = i / 100;
                      const elasticity = -0.55;
                      const revenueChange = (1 + (elasticity * discount)) * (1 - discount) - 1;
                      return { x: i, books: (revenueChange * 100).toFixed(1) };
                    })}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="optimal"
                    name="Optimal Point"
                    stroke="#22c55e"
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    dot
                    isAnimationActive={false}
                    data={[
                      { x: optimalDiscount, optimal: ((1 + (-0.78 * optimalDiscount/100)) * (1 - optimalDiscount/100) - 1) * 100 }
                    ]}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="scenarios" className="space-y-6">
          <div className="dashboard-card">
            <h3 className="text-lg font-medium text-dashboard-text mb-4">Scenario Comparison</h3>
            
            {scenarios.length === 0 ? (
              <div className="text-center py-8 text-dashboard-secondaryText">
                <p className="mb-4">No scenarios saved yet</p>
                <p className="text-sm">Use the Discount Simulator to create scenarios and save them for comparison</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-dashboard-border bg-gray-50">
                      <th className="px-4 py-3 text-left font-medium text-dashboard-secondaryText">Scenario Name</th>
                      <th className="px-4 py-3 text-right font-medium text-dashboard-secondaryText">Discount %</th>
                      <th className="px-4 py-3 text-right font-medium text-dashboard-secondaryText">Sales (units)</th>
                      <th className="px-4 py-3 text-right font-medium text-dashboard-secondaryText">Revenue</th>
                      <th className="px-4 py-3 text-right font-medium text-dashboard-secondaryText">vs. Baseline</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-dashboard-border">
                      <td className="px-4 py-3 font-medium">Baseline (No Promotion)</td>
                      <td className="px-4 py-3 text-right">0%</td>
                      <td className="px-4 py-3 text-right">{baseSales.toLocaleString()}</td>
                      <td className="px-4 py-3 text-right">${(baseSales * basePrice).toLocaleString()}</td>
                      <td className="px-4 py-3 text-right">-</td>
                    </tr>
                    {scenarios.map((scenario, index) => {
                      const baselineRevenue = baseSales * basePrice;
                      const revenueDiff = scenario.revenue - baselineRevenue;
                      const percentDiff = (revenueDiff / baselineRevenue) * 100;
                      
                      return (
                        <tr key={index} className="border-b border-dashboard-border hover:bg-gray-50">
                          <td className="px-4 py-3 font-medium">{scenario.name}</td>
                          <td className="px-4 py-3 text-right">{scenario.discount}%</td>
                          <td className="px-4 py-3 text-right">{scenario.sales.toLocaleString()}</td>
                          <td className="px-4 py-3 text-right">${scenario.revenue.toLocaleString()}</td>
                          <td className={`px-4 py-3 text-right ${revenueDiff >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {revenueDiff >= 0 ? '+' : ''}{percentDiff.toFixed(1)}%
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
            
            <div className="mt-6 flex justify-end">
              <Button variant="outline" disabled={scenarios.length === 0}>
                Export Comparison
              </Button>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="roi" className="space-y-6">
          <div className="dashboard-card">
            <h3 className="text-lg font-medium text-dashboard-text mb-4">
              <Calculator className="h-5 w-5 inline-block mr-2" />
              Promotion ROI Calculator
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-md">
                  <h4 className="font-medium mb-3">Promotion Costs</h4>
                  <div className="space-y-3">
                    <div>
                      <Label htmlFor="discount-cost">Discount Cost</Label>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-dashboard-secondaryText">$</span>
                        <Input
                          id="discount-cost"
                          type="text"
                          value={(basePrice * (discountPercentage / 100) * projectedSales).toLocaleString()}
                          readOnly
                          className="bg-gray-100"
                        />
                      </div>
                      <p className="text-xs text-dashboard-secondaryText mt-1">
                        Based on {discountPercentage}% discount on {projectedSales.toLocaleString()} units
                      </p>
                    </div>
                    <div>
                      <Label htmlFor="ad-cost">Advertising Cost</Label>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-dashboard-secondaryText">$</span>
                        <Input
                          id="ad-cost"
                          type="number"
                          defaultValue="5000"
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="other-cost">Other Costs</Label>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-dashboard-secondaryText">$</span>
                        <Input
                          id="other-cost"
                          type="number"
                          defaultValue="1000"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-md">
                  <h4 className="font-medium mb-3">Revenue Impact</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between py-1 border-b border-gray-200">
                      <span className="text-dashboard-secondaryText">Baseline Revenue:</span>
                      <span className="font-medium">${(baseSales * basePrice).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-gray-200">
                      <span className="text-dashboard-secondaryText">Projected Revenue:</span>
                      <span className="font-medium">${projectedRevenue.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-gray-200">
                      <span className="font-medium">Revenue Lift:</span>
                      <span className={revenueImpact >= 0 ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}>
                        {revenueImpact >= 0 ? '+' : ''} ${revenueImpact.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-md">
                <h4 className="font-medium mb-3">ROI Analysis</h4>
                <div className="space-y-3">
                  <div className="flex justify-between py-1 border-b border-gray-200">
                    <span className="text-dashboard-secondaryText">Total Promotion Cost:</span>
                    <span className="font-medium">$11,245</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-gray-200">
                    <span className="text-dashboard-secondaryText">Revenue Gain:</span>
                    <span className="font-medium">${revenueImpact.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-gray-200">
                    <span className="text-dashboard-secondaryText">Net Profit Impact:</span>
                    <span className="font-medium">$3,755</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-gray-200">
                    <span className="text-dashboard-secondaryText">ROI:</span>
                    <span className="font-medium text-green-600">33.4%</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-gray-200">
                    <span className="text-dashboard-secondaryText">Breakeven Discount:</span>
                    <span className="font-medium">18.5%</span>
                  </div>
                </div>
                
                <div className="mt-6 pt-4 border-t border-gray-200">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">ROI Status:</span>
                    <span className="bg-green-100 text-green-800 font-medium px-3 py-1 rounded-full text-sm">
                      Profitable
                    </span>
                  </div>
                  <p className="text-sm text-dashboard-secondaryText mt-3">
                    This promotion is projected to generate a positive return on investment. 
                    Consider increasing advertising to maximize the impact.
                  </p>
                </div>
                
                <div className="mt-6 flex justify-end">
                  <Button variant="outline">
                    Export ROI Analysis
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PromotionOptimizerTab;
