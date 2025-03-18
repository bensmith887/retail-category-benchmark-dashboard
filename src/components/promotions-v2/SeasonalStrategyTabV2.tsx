
import React, { useState } from 'react';
import { Calendar } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';

interface SeasonalStrategyTabV2Props {
  seasonalStrategyData: {
    peakSeasonMonths: string[];
    offPeakMonths: string[];
    peakSeasonRecommendations: any[];
    offPeakRecommendations: any[];
    monthlyRecommendations: {
      [key: string]: {
        focus: string;
        bestSubcategory: string;
        discount: number;
      };
    };
  };
  campaignCalendar: any[];
}

const SeasonalStrategyTabV2: React.FC<SeasonalStrategyTabV2Props> = ({
  seasonalStrategyData,
  campaignCalendar
}) => {
  const [selectedQuarter, setSelectedQuarter] = useState('all');
  
  // Filter campaign calendar based on selected quarter
  const filteredCampaigns = selectedQuarter === 'all' 
    ? campaignCalendar 
    : campaignCalendar.filter(campaign => {
        const monthIndex = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].indexOf(campaign.month);
        const quarter = Math.floor(monthIndex / 3) + 1;
        return `q${quarter}` === selectedQuarter;
      });
      
  // Create calendar view data
  const calendarMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
  return (
    <div className="animate-fade-in">
      <Tabs defaultValue="calendar">
        <TabsList className="mb-4">
          <TabsTrigger value="calendar">Campaign Calendar</TabsTrigger>
          <TabsTrigger value="peak">Peak Season Strategy</TabsTrigger>
          <TabsTrigger value="offpeak">Off-Peak Strategy</TabsTrigger>
          <TabsTrigger value="monthly">Monthly Recommendations</TabsTrigger>
        </TabsList>
        
        <TabsContent value="calendar">
          <div className="dashboard-card">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-dashboard-text">Promotional Campaign Calendar</h3>
              <div className="flex items-center">
                <Calendar className="mr-2 h-4 w-4 text-dashboard-secondaryText" />
                <Select value={selectedQuarter} onValueChange={setSelectedQuarter}>
                  <SelectTrigger className="w-[130px]">
                    <SelectValue placeholder="Quarter" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Quarters</SelectItem>
                    <SelectItem value="q1">Q1 (Jan-Mar)</SelectItem>
                    <SelectItem value="q2">Q2 (Apr-Jun)</SelectItem>
                    <SelectItem value="q3">Q3 (Jul-Sep)</SelectItem>
                    <SelectItem value="q4">Q4 (Oct-Dec)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Month</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Subcategory</TableHead>
                  <TableHead className="text-right">Discount</TableHead>
                  <TableHead className="text-right">Revenue Impact</TableHead>
                  <TableHead className="text-right">Sales Lift</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCampaigns.map((campaign) => (
                  <TableRow key={campaign.id}>
                    <TableCell>
                      <div className="font-medium">{campaign.month}</div>
                    </TableCell>
                    <TableCell>{campaign.category}</TableCell>
                    <TableCell>{campaign.subcategory}</TableCell>
                    <TableCell className="text-right">{campaign.discount}%</TableCell>
                    <TableCell className="text-right text-green-600">{campaign.revenueImpact}</TableCell>
                    <TableCell className="text-right text-green-600">{campaign.salesLift}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
        
        <TabsContent value="peak">
          <div className="dashboard-card">
            <h3 className="text-lg font-medium text-dashboard-text mb-4">Peak Season Promotional Strategy</h3>
            
            <div className="bg-white rounded-lg p-4 border border-dashboard-border mb-6">
              <h4 className="text-sm font-medium mb-3">Peak Season Overview</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-dashboard-secondaryText mb-3">
                    Peak seasons show significantly higher promotional elasticity, with customers much more responsive to discounts.
                    Focus on these months for major promotional campaigns:
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {seasonalStrategyData.peakSeasonMonths.map((month, index) => (
                      <Badge key={index} variant="outline" className="bg-dashboard-primary/10 text-dashboard-primary">
                        {month}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="bg-gray-50 p-4 rounded-md">
                  <h5 className="text-sm font-medium mb-2">Key Peak Season Insights</h5>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start">
                      <span className="bg-dashboard-primary text-white rounded-full h-5 w-5 flex items-center justify-center text-xs mr-2 mt-0.5">1</span>
                      <span>November-December drives 25% of annual sales volume</span>
                    </li>
                    <li className="flex items-start">
                      <span className="bg-dashboard-primary text-white rounded-full h-5 w-5 flex items-center justify-center text-xs mr-2 mt-0.5">2</span>
                      <span>July shows highest promotional elasticity all year</span>
                    </li>
                    <li className="flex items-start">
                      <span className="bg-dashboard-primary text-white rounded-full h-5 w-5 flex items-center justify-center text-xs mr-2 mt-0.5">3</span>
                      <span>Books have 50% higher peak season elasticity than Baby</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg p-4 border border-dashboard-border mb-6">
              <h4 className="text-sm font-medium mb-3">Peak Season Recommendations</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {seasonalStrategyData.peakSeasonRecommendations.map((rec, index) => (
                  <div key={index} className="bg-gray-50 p-3 rounded-md">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">{rec.category}: {rec.subcategory}</span>
                      <Badge variant="outline" className="bg-dashboard-primary/10 text-dashboard-primary">
                        {rec.recommendedDiscount}%
                      </Badge>
                    </div>
                    <div className="text-xs text-dashboard-secondaryText mb-1">
                      Elasticity: {rec.elasticity.toFixed(2)}
                    </div>
                    <div className="text-xs">
                      <span className="text-green-600">
                        +{Math.round(rec.recommendedDiscount * Math.abs(rec.elasticity))}% sales lift expected
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-white rounded-lg p-4 border border-dashboard-border">
              <h4 className="text-sm font-medium mb-3">Peak Season Best Practices</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <h5 className="text-sm font-semibold">Timing</h5>
                  <ul className="space-y-1 text-sm text-dashboard-secondaryText">
                    <li>• Start promotions 1-2 weeks before peak</li>
                    <li>• Extend top performers throughout season</li>
                    <li>• Use flash sales during highest traffic days</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h5 className="text-sm font-semibold">Discount Structure</h5>
                  <ul className="space-y-1 text-sm text-dashboard-secondaryText">
                    <li>• Books: 25-30% discount range optimal</li>
                    <li>• Baby: 15-20% discount range optimal</li>
                    <li>• Bundle complementary products</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h5 className="text-sm font-semibold">Marketing Support</h5>
                  <ul className="space-y-1 text-sm text-dashboard-secondaryText">
                    <li>• Increase ad spend by 30-50%</li>
                    <li>• Focus on top converting channels</li>
                    <li>• Highlight limited-time availability</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="offpeak">
          <div className="dashboard-card">
            <h3 className="text-lg font-medium text-dashboard-text mb-4">Off-Peak Promotional Strategy</h3>
            
            <div className="bg-white rounded-lg p-4 border border-dashboard-border mb-6">
              <h4 className="text-sm font-medium mb-3">Off-Peak Season Overview</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-dashboard-secondaryText mb-3">
                    Off-peak seasons require more strategic promotional approaches, with more targeted discounts.
                    These months show moderate promotional elasticity:
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {seasonalStrategyData.offPeakMonths.map((month, index) => (
                      <Badge key={index} variant="outline" className="bg-dashboard-secondary/10 text-dashboard-secondary">
                        {month}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="bg-gray-50 p-4 rounded-md">
                  <h5 className="text-sm font-medium mb-2">Key Off-Peak Season Insights</h5>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start">
                      <span className="bg-dashboard-secondary text-white rounded-full h-5 w-5 flex items-center justify-center text-xs mr-2 mt-0.5">1</span>
                      <span>January-February show lowest promotional elasticity</span>
                    </li>
                    <li className="flex items-start">
                      <span className="bg-dashboard-secondary text-white rounded-full h-5 w-5 flex items-center justify-center text-xs mr-2 mt-0.5">2</span>
                      <span>Targeted category promotions outperform broad discounts</span>
                    </li>
                    <li className="flex items-start">
                      <span className="bg-dashboard-secondary text-white rounded-full h-5 w-5 flex items-center justify-center text-xs mr-2 mt-0.5">3</span>
                      <span>Special events (e.g., back to school) create mini-peaks</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg p-4 border border-dashboard-border mb-6">
              <h4 className="text-sm font-medium mb-3">Off-Peak Recommendations</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {seasonalStrategyData.offPeakRecommendations.map((rec, index) => (
                  <div key={index} className="bg-gray-50 p-3 rounded-md">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">{rec.category}: {rec.subcategory}</span>
                      <Badge variant="outline" className="bg-dashboard-secondary/10 text-dashboard-secondary">
                        {rec.recommendedDiscount}%
                      </Badge>
                    </div>
                    <div className="text-xs text-dashboard-secondaryText mb-1">
                      Elasticity: {rec.elasticity.toFixed(2)}
                    </div>
                    <div className="text-xs">
                      <span className="text-green-600">
                        +{Math.round(rec.recommendedDiscount * Math.abs(rec.elasticity))}% sales lift expected
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-white rounded-lg p-4 border border-dashboard-border">
              <h4 className="text-sm font-medium mb-3">Off-Peak Best Practices</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <h5 className="text-sm font-semibold">Targeting</h5>
                  <ul className="space-y-1 text-sm text-dashboard-secondaryText">
                    <li>• Focus on specific subcategories</li>
                    <li>• Target repeat customers</li>
                    <li>• Leverage seasonal events (Back to School)</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h5 className="text-sm font-semibold">Discount Structure</h5>
                  <ul className="space-y-1 text-sm text-dashboard-secondaryText">
                    <li>• Lower discounts (10-15%)</li>
                    <li>• Bundle with complementary products</li>
                    <li>• Focus on higher margin items</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h5 className="text-sm font-semibold">Efficiency</h5>
                  <ul className="space-y-1 text-sm text-dashboard-secondaryText">
                    <li>• Shorter promotion durations (5-7 days)</li>
                    <li>• Optimize ad spend efficiency</li>
                    <li>• Test new promotional formats</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="monthly">
          <div className="dashboard-card">
            <h3 className="text-lg font-medium text-dashboard-text mb-4">Monthly Recommendation Engine</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
              {calendarMonths.map((month) => {
                const rec = seasonalStrategyData.monthlyRecommendations[month];
                const isPeak = seasonalStrategyData.peakSeasonMonths.includes(month);
                
                return (
                  <div 
                    key={month} 
                    className={`bg-white p-4 rounded-lg border ${isPeak ? 'border-dashboard-primary/30' : 'border-dashboard-border'}`}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <h4 className="font-medium">{month}</h4>
                      {isPeak && (
                        <Badge className="bg-dashboard-primary text-white">
                          Peak
                        </Badge>
                      )}
                    </div>
                    
                    <div className="space-y-3">
                      <div>
                        <p className="text-xs text-dashboard-secondaryText">Focus</p>
                        <p className="font-medium">{rec.focus}</p>
                      </div>
                      
                      <div>
                        <p className="text-xs text-dashboard-secondaryText">Best Subcategory</p>
                        <p className="font-medium">{rec.bestSubcategory}</p>
                      </div>
                      
                      <div>
                        <p className="text-xs text-dashboard-secondaryText">Recommended Discount</p>
                        <p className="font-medium">{rec.discount}%</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            
            <div className="bg-white rounded-lg p-4 border border-dashboard-border">
              <h4 className="text-sm font-medium mb-3">Seasonal Strategy Framework</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h5 className="text-sm font-semibold">Quarterly Promotional Cadence</h5>
                  <div className="space-y-2 text-sm text-dashboard-secondaryText">
                    <div className="flex justify-between items-center py-1 border-b border-gray-100">
                      <span>Q1 (Jan-Mar):</span>
                      <span className="font-medium text-dashboard-text">Recovery & Reset</span>
                    </div>
                    <div className="flex justify-between items-center py-1 border-b border-gray-100">
                      <span>Q2 (Apr-Jun):</span>
                      <span className="font-medium text-dashboard-text">Spring Refresh</span>
                    </div>
                    <div className="flex justify-between items-center py-1 border-b border-gray-100">
                      <span>Q3 (Jul-Sep):</span>
                      <span className="font-medium text-dashboard-text">Summer Peak & Back to School</span>
                    </div>
                    <div className="flex justify-between items-center py-1 border-b border-gray-100">
                      <span>Q4 (Oct-Dec):</span>
                      <span className="font-medium text-dashboard-text">Holiday Season</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <h5 className="text-sm font-semibold">Annual Category Focus</h5>
                  <div className="space-y-2 text-sm text-dashboard-secondaryText">
                    <div className="flex justify-between items-center py-1 border-b border-gray-100">
                      <span>Baby Products Primary:</span>
                      <span className="font-medium text-dashboard-text">Apr, May, Jul, Oct</span>
                    </div>
                    <div className="flex justify-between items-center py-1 border-b border-gray-100">
                      <span>Books Primary:</span>
                      <span className="font-medium text-dashboard-text">Jan, Feb, Sep, Nov, Dec</span>
                    </div>
                    <div className="flex justify-between items-center py-1 border-b border-gray-100">
                      <span>Balanced Approach:</span>
                      <span className="font-medium text-dashboard-text">Mar, Jun, Aug</span>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 p-3 rounded-md mt-4">
                    <p className="text-xs">
                      Plan 1-2 major promotions per category per quarter, with mini-promotions in between to maintain momentum.
                    </p>
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

export default SeasonalStrategyTabV2;
