
import React, { useState } from 'react';
import { Calendar, TrendingUp, Sun, Snowflake } from 'lucide-react';
import MetricsCard from '@/components/MetricsCard';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell, LineChart, Line } from 'recharts';

interface SeasonalStrategyTabProps {
  seasonalStrategyData: {
    peakSeasonMonths: string[];
    offPeakMonths: string[];
    peakSeasonRecommendations: any[];
    offPeakRecommendations: any[];
    monthlyRecommendations: Record<string, { focus: string; bestSubcategory: string; discount: number }>;
  };
  campaignCalendar: any[];
}

const SeasonalStrategyTab: React.FC<SeasonalStrategyTabProps> = ({ 
  seasonalStrategyData,
  campaignCalendar
}) => {
  const [seasonType, setSeasonType] = useState('peak');

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
  const monthlyElasticityData = months.map(month => {
    const record = campaignCalendar.find(item => item.month === month);
    const isPeak = seasonalStrategyData.peakSeasonMonths.includes(month);
    
    return {
      month,
      elasticity: record ? parseFloat(record.salesLift.replace('%', '')) / 100 : 0,
      isPeak
    };
  });

  return (
    <div className="animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <MetricsCard
          label="Peak Season Months"
          value="Jul, Nov, Dec"
          change="+72%"
          secondaryLabel="Promotional Responsiveness"
          isPositive={true}
          icon={<Sun className="text-dashboard-primary" />}
        />
        <MetricsCard
          label="Best Month"
          value="December"
          change="+31.7%"
          secondaryLabel="Sales Lift"
          isPositive={true}
          icon={<Calendar className="text-dashboard-primary" />}
        />
        <MetricsCard
          label="Peak vs. Off-Peak"
          value="2.4x"
          change="Higher Elasticity"
          secondaryLabel="During Peak Season"
          isPositive={true}
          icon={<TrendingUp className="text-dashboard-primary" />}
        />
      </div>
      
      <div className="dashboard-card mb-6">
        <h3 className="text-lg font-medium text-dashboard-text mb-4">Seasonal Promotional Responsiveness</h3>
        <div style={{ height: "300px" }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={monthlyElasticityData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis 
                dataKey="month" 
                axisLine={false} 
                tickLine={false}
              />
              <YAxis 
                axisLine={false} 
                tickLine={false}
                tickFormatter={(value) => `${(value * 100).toFixed(0)}%`}
              />
              <Tooltip 
                formatter={(value: any) => [`${(value * 100).toFixed(1)}%`, 'Sales Lift']}
                contentStyle={{ 
                  borderRadius: '6px', 
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
                  border: '1px solid #e5e7eb'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="elasticity"
                name="Sales Lift"
                stroke="#5840bb" 
                strokeWidth={2}
                dot={(props: any) => {
                  const { cx, cy, payload } = props;
                  if (payload.isPeak) {
                    return (
                      <svg x={cx - 6} y={cy - 6} width={12} height={12} fill="#5840bb" viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="6" />
                      </svg>
                    );
                  }
                  return (
                    <svg x={cx - 4} y={cy - 4} width={8} height={8} fill="#6892e6" viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="4" />
                    </svg>
                  );
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="flex items-center justify-center gap-6 mt-2 text-sm">
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-[#5840bb] mr-2"></div>
            <span>Peak Season</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-[#6892e6] mr-2"></div>
            <span>Off-Peak Season</span>
          </div>
        </div>
      </div>
      
      <Tabs value={seasonType} onValueChange={setSeasonType} className="mb-6">
        <TabsList className="mb-4 w-full">
          <TabsTrigger value="peak" className="flex-1">
            <Sun className="h-4 w-4 mr-2" />
            Peak Season Strategy
          </TabsTrigger>
          <TabsTrigger value="off-peak" className="flex-1">
            <Snowflake className="h-4 w-4 mr-2" />
            Off-Peak Season Strategy
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="peak" className="space-y-6">
          <div className="dashboard-card">
            <h3 className="text-lg font-medium text-dashboard-text mb-4">Peak Season Promotion Recommendations</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-medium mb-2 text-blue-800">Strategy Overview</h4>
                  <p className="text-sm text-blue-700 mb-3">
                    During peak season (Jul, Nov, Dec), consumer price sensitivity increases dramatically. 
                    Focus on higher-volume promotions with modest discounts to maximize revenue impact.
                  </p>
                  
                  <div className="bg-white bg-opacity-50 p-3 rounded-md space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="font-medium text-blue-800">Optimal Discount Range:</span>
                      <span>15-30%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium text-blue-800">Promotion Types:</span>
                      <span>% Off, BOGO</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium text-blue-800">Advertising Support:</span>
                      <span>High</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium text-blue-800">Category Focus:</span>
                      <span>Books (Nov-Dec), Baby (Jul)</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Top Peak Season Subcategories</h4>
                  <div className="space-y-2">
                    {seasonalStrategyData.peakSeasonRecommendations.map((item, index) => (
                      <div key={index} className="flex justify-between py-2 px-3 border-b border-gray-200 hover:bg-gray-50 rounded">
                        <div>
                          <span className="font-medium">{item.subcategory}</span>
                          <span className="text-xs text-dashboard-secondaryText ml-2">({item.category})</span>
                        </div>
                        <div className="flex items-center">
                          <span className="text-dashboard-primary font-medium">{item.recommendedDiscount}%</span>
                          <span className="text-xs text-dashboard-secondaryText ml-2">discount</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Monthly Campaign Calendar (Peak Season)</h4>
                  <div className="overflow-hidden rounded-md border border-gray-200">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-3 py-2 text-left text-xs font-medium text-dashboard-secondaryText uppercase tracking-wider">Month</th>
                          <th className="px-3 py-2 text-left text-xs font-medium text-dashboard-secondaryText uppercase tracking-wider">Focus</th>
                          <th className="px-3 py-2 text-left text-xs font-medium text-dashboard-secondaryText uppercase tracking-wider">Discount</th>
                          <th className="px-3 py-2 text-left text-xs font-medium text-dashboard-secondaryText uppercase tracking-wider">Revenue Impact</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {campaignCalendar
                          .filter(item => seasonalStrategyData.peakSeasonMonths.includes(item.month))
                          .map((campaign) => (
                            <tr key={campaign.id} className="hover:bg-gray-50">
                              <td className="px-3 py-2 whitespace-nowrap text-sm font-medium">{campaign.month}</td>
                              <td className="px-3 py-2 whitespace-nowrap text-sm">
                                {campaign.subcategory}
                                <span className="text-xs text-dashboard-secondaryText ml-1">({campaign.category})</span>
                              </td>
                              <td className="px-3 py-2 whitespace-nowrap text-sm">{campaign.discount}%</td>
                              <td className="px-3 py-2 whitespace-nowrap text-sm text-green-600">+{campaign.revenueImpact}</td>
                            </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                
                <div className="p-4 bg-yellow-50 rounded-lg">
                  <h4 className="font-medium mb-2 text-yellow-800">Peak Season Considerations</h4>
                  <ul className="list-disc pl-5 space-y-1 text-sm text-yellow-700">
                    <li>Expect 2.4x higher promotional responsiveness vs. off-peak</li>
                    <li>Implement tiered promotion strategies (e.g., 15% off $50, 20% off $100)</li>
                    <li>Focus on bundles for Baby products to increase average order value</li>
                    <li>Increase ad spend for Books in November-December by 30-40%</li>
                    <li>Prepare inventory levels 25-30% above baseline for promoted items</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="off-peak" className="space-y-6">
          <div className="dashboard-card">
            <h3 className="text-lg font-medium text-dashboard-text mb-4">Off-Peak Season Promotion Recommendations</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-medium mb-2 text-green-800">Strategy Overview</h4>
                  <p className="text-sm text-green-700 mb-3">
                    During off-peak months, focus on deeper discounts for less price-sensitive items to drive traffic.
                    Target core categories with strong elasticity profiles to maximize ROI.
                  </p>
                  
                  <div className="bg-white bg-opacity-50 p-3 rounded-md space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="font-medium text-green-800">Optimal Discount Range:</span>
                      <span>20-35%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium text-green-800">Promotion Types:</span>
                      <span>% Off, Bundles</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium text-green-800">Advertising Support:</span>
                      <span>Moderate</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium text-green-800">Category Focus:</span>
                      <span>Baby (Mar-Jun), Books (Aug-Sep)</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Top Off-Peak Season Subcategories</h4>
                  <div className="space-y-2">
                    {seasonalStrategyData.offPeakRecommendations.map((item, index) => (
                      <div key={index} className="flex justify-between py-2 px-3 border-b border-gray-200 hover:bg-gray-50 rounded">
                        <div>
                          <span className="font-medium">{item.subcategory}</span>
                          <span className="text-xs text-dashboard-secondaryText ml-2">({item.category})</span>
                        </div>
                        <div className="flex items-center">
                          <span className="text-dashboard-primary font-medium">{item.recommendedDiscount}%</span>
                          <span className="text-xs text-dashboard-secondaryText ml-2">discount</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Monthly Campaign Calendar (Off-Peak Season)</h4>
                  <div className="overflow-hidden rounded-md border border-gray-200">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-3 py-2 text-left text-xs font-medium text-dashboard-secondaryText uppercase tracking-wider">Month</th>
                          <th className="px-3 py-2 text-left text-xs font-medium text-dashboard-secondaryText uppercase tracking-wider">Focus</th>
                          <th className="px-3 py-2 text-left text-xs font-medium text-dashboard-secondaryText uppercase tracking-wider">Discount</th>
                          <th className="px-3 py-2 text-left text-xs font-medium text-dashboard-secondaryText uppercase tracking-wider">Revenue Impact</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {campaignCalendar
                          .filter(item => seasonalStrategyData.offPeakMonths.includes(item.month))
                          .map((campaign) => (
                            <tr key={campaign.id} className="hover:bg-gray-50">
                              <td className="px-3 py-2 whitespace-nowrap text-sm font-medium">{campaign.month}</td>
                              <td className="px-3 py-2 whitespace-nowrap text-sm">
                                {campaign.subcategory}
                                <span className="text-xs text-dashboard-secondaryText ml-1">({campaign.category})</span>
                              </td>
                              <td className="px-3 py-2 whitespace-nowrap text-sm">{campaign.discount}%</td>
                              <td className="px-3 py-2 whitespace-nowrap text-sm text-green-600">+{campaign.revenueImpact}</td>
                            </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium mb-2 text-gray-800">Off-Peak Season Considerations</h4>
                  <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
                    <li>Target highly responsive subcategories to offset lower seasonal demand</li>
                    <li>Focus on Bath products in March (after winter season)</li>
                    <li>Promote Academic books for back-to-school in August-September</li>
                    <li>Consider bundle promotions to increase average order value</li>
                    <li>Test higher discount thresholds (25-35%) during slowest months</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
      
      <div className="dashboard-card">
        <h3 className="text-lg font-medium text-dashboard-text mb-4">Monthly Recommendation Engine</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {months.map((month) => {
            const recommendation = seasonalStrategyData.monthlyRecommendations[month];
            const isPeak = seasonalStrategyData.peakSeasonMonths.includes(month);
            
            return (
              <div 
                key={month} 
                className={`p-3 rounded-lg border ${isPeak ? 'border-blue-200 bg-blue-50' : 'border-gray-200 bg-gray-50'}`}
              >
                <div className="flex justify-between items-center mb-2">
                  <h4 className={`font-medium ${isPeak ? 'text-blue-800' : 'text-gray-800'}`}>{month}</h4>
                  {isPeak ? (
                    <Sun className="h-4 w-4 text-blue-500" />
                  ) : (
                    <Snowflake className="h-4 w-4 text-gray-500" />
                  )}
                </div>
                <div className="text-sm space-y-1">
                  <div className="flex justify-between">
                    <span className="text-dashboard-secondaryText">Focus:</span>
                    <span className="font-medium">{recommendation.focus}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-dashboard-secondaryText">Subcategory:</span>
                    <span className="font-medium">{recommendation.bestSubcategory}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-dashboard-secondaryText">Discount:</span>
                    <span className={`font-medium ${isPeak ? 'text-blue-700' : 'text-gray-700'}`}>
                      {recommendation.discount}%
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="mt-4 text-xs text-dashboard-secondaryText">
          Monthly recommendations are based on historical elasticity patterns and seasonal demand fluctuations
        </div>
      </div>
    </div>
  );
};

export default SeasonalStrategyTab;
