
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Filter, ArrowUp, ArrowDown } from 'lucide-react';

interface OpportunityMatrixProps {
  retailers: { id: string; name: string; }[];
  categories: { id: string; name: string; }[];
}

export const OpportunityMatrix: React.FC<OpportunityMatrixProps> = ({ retailers, categories }) => {
  const [selectedRetailer, setSelectedRetailer] = useState(retailers[0].id);
  const [timeframe, setTimeframe] = useState('monthly');

  // Mock quadrant data for categories
  const quadrantData = [
    { name: "High Search, High View", categories: ["Dresses", "Tops"] },
    { name: "High Search, Low View", categories: ["Outerwear"] },
    { name: "Low Search, High View", categories: ["Accessories"] },
    { name: "Low Search, Low View", categories: ["Bottoms"] }
  ];

  // Mock opportunity scores for categories
  const opportunityScores = categories.map(category => ({
    id: category.id,
    name: category.name,
    searchVolume: Math.floor(Math.random() * 50000) + 10000,
    pdpViewRate: (Math.random() * 70 + 30).toFixed(1),
    revenue: Math.floor(Math.random() * 500000) + 100000,
    growthTrend: Math.random() > 0.5 ? (Math.random() * 15).toFixed(1) : (-Math.random() * 15).toFixed(1),
    opportunityScore: Math.floor(Math.random() * 100)
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
      
      {/* Opportunity Matrix Visualization */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Category Opportunity Matrix</CardTitle>
            <CardDescription>
              Quadrant analysis showing search volume vs. PDP view rate
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* Placeholder for the matrix visualization */}
            <div className="h-96 border border-dashed border-dashboard-border rounded-md bg-gray-50 flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <p className="mb-2">Opportunity Matrix Visualization</p>
                <p className="text-sm">Quadrant view showing category positioning</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Quadrant Analysis</CardTitle>
            <CardDescription>
              Categories grouped by search volume and view rate performance
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {quadrantData.map((quadrant, index) => (
                <div key={index} className="p-4 border border-dashboard-border rounded-md">
                  <h3 className="font-medium text-sm mb-2">{quadrant.name}</h3>
                  <div className="space-y-2">
                    {quadrant.categories.map((cat, idx) => (
                      <div key={idx} className="flex items-center justify-between">
                        <span>{cat}</span>
                        <Badge variant="outline" className="ml-2">
                          {Math.random() > 0.5 ? (
                            <ArrowUp className="w-3 h-3 mr-1 text-green-600" />
                          ) : (
                            <ArrowDown className="w-3 h-3 mr-1 text-red-600" />
                          )}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Opportunity Scores Table */}
      <Card>
        <CardHeader>
          <CardTitle>Category Opportunity Scores</CardTitle>
          <CardDescription>
            Calculated metrics showing potential for improvement
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-dashboard-border">
                  <th className="text-left py-3 px-4 font-medium">Category</th>
                  <th className="text-right py-3 px-4 font-medium">Search Volume</th>
                  <th className="text-right py-3 px-4 font-medium">PDP View Rate</th>
                  <th className="text-right py-3 px-4 font-medium">Revenue Potential</th>
                  <th className="text-right py-3 px-4 font-medium">YoY Trend</th>
                  <th className="text-right py-3 px-4 font-medium">Opportunity Score</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-dashboard-border">
                {opportunityScores.sort((a, b) => b.opportunityScore - a.opportunityScore).map((item, index) => (
                  <tr key={item.id} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                    <td className="py-3 px-4">{item.name}</td>
                    <td className="text-right py-3 px-4">{item.searchVolume.toLocaleString()}</td>
                    <td className="text-right py-3 px-4">{item.pdpViewRate}%</td>
                    <td className="text-right py-3 px-4">${item.revenue.toLocaleString()}</td>
                    <td className="text-right py-3 px-4">
                      {parseFloat(item.growthTrend) > 0 ? (
                        <span className="text-green-600 flex items-center justify-end">
                          <ArrowUp className="w-4 h-4 mr-1" />
                          {item.growthTrend}%
                        </span>
                      ) : (
                        <span className="text-red-600 flex items-center justify-end">
                          <ArrowDown className="w-4 h-4 mr-1" />
                          {Math.abs(parseFloat(item.growthTrend))}%
                        </span>
                      )}
                    </td>
                    <td className="text-right py-3 px-4">
                      <Badge className={`${item.opportunityScore > 70 ? "bg-green-600" : item.opportunityScore > 40 ? "bg-orange-500" : "bg-red-500"}`}>
                        {item.opportunityScore}
                      </Badge>
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
