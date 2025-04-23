
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Filter, ArrowUp, ArrowDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ConversionEfficiencyProps {
  retailers: { id: string; name: string; }[];
  categories: { id: string; name: string; }[];
}

export const ConversionEfficiency: React.FC<ConversionEfficiencyProps> = ({ retailers, categories }) => {
  const [selectedRetailer, setSelectedRetailer] = useState(retailers[0].id);
  const [timeframe, setTimeframe] = useState('monthly');

  // Mock data for efficiency metrics
  const efficiencyMetrics = {
    overall_click_to_view: { value: '64.3%', change: '+2.1%', isPositive: true },
    average_view_time: { value: '1:24', change: '-0.8%', isPositive: false },
    bounce_rate: { value: '38.2%', change: '-3.5%', isPositive: true },
    pages_per_session: { value: '2.7', change: '+0.3%', isPositive: true }
  };

  // Mock data for category efficiency
  const categoryEfficiency = categories.map(category => ({
    id: category.id,
    name: category.name,
    clickToView: (Math.random() * 40 + 50).toFixed(1) + '%',
    viewToCart: (Math.random() * 30 + 10).toFixed(1) + '%',
    cartToConversion: (Math.random() * 40 + 40).toFixed(1) + '%',
    costPerView: '$' + (Math.random() * 2 + 0.5).toFixed(2),
    changeYoY: (Math.random() * 20 - 10).toFixed(1) + '%'
  }));

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div className="flex flex-wrap gap-2">
          <Select value={selectedRetailer} onValueChange={setSelectedRetailer}>
            <SelectTrigger className="w-[180px] bg-white">
              <SelectValue placeholder="Select retailer" />
            </SelectTrigger>
            <SelectContent>
              {retailers.map((retailer) => (
                <SelectItem key={retailer.id} value={retailer.id}>
                  {retailer.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <button className="flex items-center gap-2 px-3 py-2 rounded-md border border-dashboard-border bg-white">
            <Filter size={16} />
            <span>Filters</span>
            <Badge className="ml-1 bg-dashboard-primary text-white">2</Badge>
          </button>
        </div>
        
        <div className="flex gap-2">
          <Tabs value={timeframe} onValueChange={setTimeframe}>
            <TabsList>
              <TabsTrigger value="weekly">Weekly</TabsTrigger>
              <TabsTrigger value="monthly">Monthly</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>
      
      {/* Overall Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col">
              <span className="text-muted-foreground text-sm">Click-to-View Ratio</span>
              <span className="text-3xl font-bold mt-2">{efficiencyMetrics.overall_click_to_view.value}</span>
              <div className="flex items-center mt-2">
                {parseFloat(efficiencyMetrics.overall_click_to_view.change) > 0 ? (
                  <span className="text-green-600 flex items-center text-sm">
                    <ArrowUp className="w-4 h-4 mr-1" />
                    {efficiencyMetrics.overall_click_to_view.change}
                  </span>
                ) : (
                  <span className="text-red-600 flex items-center text-sm">
                    <ArrowDown className="w-4 h-4 mr-1" />
                    {efficiencyMetrics.overall_click_to_view.change.replace('-', '')}
                  </span>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col">
              <span className="text-muted-foreground text-sm">Average View Time</span>
              <span className="text-3xl font-bold mt-2">{efficiencyMetrics.average_view_time.value}</span>
              <div className="flex items-center mt-2">
                {efficiencyMetrics.average_view_time.isPositive ? (
                  <span className="text-green-600 flex items-center text-sm">
                    <ArrowUp className="w-4 h-4 mr-1" />
                    {efficiencyMetrics.average_view_time.change.replace('-', '')}
                  </span>
                ) : (
                  <span className="text-red-600 flex items-center text-sm">
                    <ArrowDown className="w-4 h-4 mr-1" />
                    {efficiencyMetrics.average_view_time.change.replace('-', '')}
                  </span>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col">
              <span className="text-muted-foreground text-sm">Bounce Rate</span>
              <span className="text-3xl font-bold mt-2">{efficiencyMetrics.bounce_rate.value}</span>
              <div className="flex items-center mt-2">
                {efficiencyMetrics.bounce_rate.isPositive ? (
                  <span className="text-green-600 flex items-center text-sm">
                    <ArrowDown className="w-4 h-4 mr-1" />
                    {efficiencyMetrics.bounce_rate.change.replace('-', '')}
                  </span>
                ) : (
                  <span className="text-red-600 flex items-center text-sm">
                    <ArrowUp className="w-4 h-4 mr-1" />
                    {efficiencyMetrics.bounce_rate.change.replace('-', '')}
                  </span>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col">
              <span className="text-muted-foreground text-sm">Pages Per Session</span>
              <span className="text-3xl font-bold mt-2">{efficiencyMetrics.pages_per_session.value}</span>
              <div className="flex items-center mt-2">
                {efficiencyMetrics.pages_per_session.isPositive ? (
                  <span className="text-green-600 flex items-center text-sm">
                    <ArrowUp className="w-4 h-4 mr-1" />
                    {efficiencyMetrics.pages_per_session.change}
                  </span>
                ) : (
                  <span className="text-red-600 flex items-center text-sm">
                    <ArrowDown className="w-4 h-4 mr-1" />
                    {efficiencyMetrics.pages_per_session.change.replace('-', '')}
                  </span>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Conversion Efficiency Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Conversion Efficiency Trends</CardTitle>
          <CardDescription>
            Historical view of key conversion metrics over time
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80 border border-dashed border-dashboard-border rounded-md bg-gray-50 flex items-center justify-center">
            <div className="text-center text-muted-foreground">
              <p className="mb-2">Conversion Efficiency Chart</p>
              <p className="text-sm">Time series showing click-to-view and view-to-conversion rates</p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Category Efficiency Table */}
      <Card>
        <CardHeader>
          <CardTitle>Category Conversion Efficiency</CardTitle>
          <CardDescription>
            Click-to-view and view-to-conversion metrics by category
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-dashboard-border">
                  <th className="text-left py-3 px-4 font-medium">Category</th>
                  <th className="text-right py-3 px-4 font-medium">Click-to-View Rate</th>
                  <th className="text-right py-3 px-4 font-medium">View-to-Cart Rate</th>
                  <th className="text-right py-3 px-4 font-medium">Cart-to-Purchase Rate</th>
                  <th className="text-right py-3 px-4 font-medium">Cost Per View</th>
                  <th className="text-right py-3 px-4 font-medium">YoY Change</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-dashboard-border">
                {categoryEfficiency.map((item, index) => (
                  <tr key={item.id} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                    <td className="py-3 px-4">{item.name}</td>
                    <td className="text-right py-3 px-4">{item.clickToView}</td>
                    <td className="text-right py-3 px-4">{item.viewToCart}</td>
                    <td className="text-right py-3 px-4">{item.cartToConversion}</td>
                    <td className="text-right py-3 px-4">{item.costPerView}</td>
                    <td className="text-right py-3 px-4">
                      {parseFloat(item.changeYoY) > 0 ? (
                        <span className="text-green-600 flex items-center justify-end">
                          <ArrowUp className="w-4 h-4 mr-1" />
                          {item.changeYoY.replace('-', '')}
                        </span>
                      ) : (
                        <span className="text-red-600 flex items-center justify-end">
                          <ArrowDown className="w-4 h-4 mr-1" />
                          {item.changeYoY.replace('-', '')}
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
