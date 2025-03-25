
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
      <Tabs defaultValue="monthly">
        <TabsList className="mb-4">
          <TabsTrigger value="monthly">Monthly Recommendations</TabsTrigger>
          <TabsTrigger value="calendar">Campaign Calendar</TabsTrigger>
        </TabsList>
        
        <TabsContent value="monthly">
          <div className="dashboard-card">
            <h3 className="text-lg font-medium text-dashboard-text mb-4">Monthly Recommendation Engine</h3>
            
            <div className="bg-blue-50 p-4 border-l-4 border-dashboard-primary rounded-md mb-6">
              <h4 className="text-md font-medium mb-2">Understanding the Monthly Recommendations</h4>
              <p className="text-sm text-dashboard-secondaryText mb-3">
                This monthly view provides strategic promotional guidance for each month of the year. The recommendations are based on historical elasticity data and seasonal trends.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h5 className="text-sm font-medium mb-1">What This Tells You:</h5>
                  <ul className="text-sm text-dashboard-secondaryText list-disc pl-5 space-y-1">
                    <li>Which products and categories to focus on each month</li>
                    <li>Optimal discount levels based on price elasticity</li>
                    <li>Strategic focus areas that align with seasonal buying patterns</li>
                    <li>Peak vs. off-peak promotional opportunities</li>
                  </ul>
                </div>
                <div>
                  <h5 className="text-sm font-medium mb-1">Actions You Can Take:</h5>
                  <ul className="text-sm text-dashboard-secondaryText list-disc pl-5 space-y-1">
                    <li>Align your promotional calendar with recommended focus areas</li>
                    <li>Adjust discount levels by category based on monthly elasticity</li>
                    <li>Concentrate marketing efforts on high-opportunity subcategories</li>
                    <li>Plan inventory and staffing around peak promotional periods</li>
                    <li>Set budget allocations based on monthly revenue potential</li>
                  </ul>
                </div>
              </div>
            </div>
            
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
      </Tabs>
    </div>
  );
};

export default SeasonalStrategyTabV2;
