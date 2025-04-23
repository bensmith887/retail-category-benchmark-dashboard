
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Filter, ArrowUp, ArrowDown, TrendingUp, TrendingDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CompetitivePositioningProps {
  retailers: { id: string; name: string; }[];
  categories: { id: string; name: string; }[];
}

export const CompetitivePositioning: React.FC<CompetitivePositioningProps> = ({ 
  retailers, 
  categories 
}) => {
  const [selectedCategory, setSelectedCategory] = useState(categories[0].id);
  const [timeframe, setTimeframe] = useState('monthly');

  // Generate mock data for competitive positioning
  const competitiveData = retailers.map(retailer => ({
    id: retailer.id,
    name: retailer.name,
    shareOfSearch: (Math.random() * 30 + 5).toFixed(1) + '%',
    shareOfViews: (Math.random() * 30 + 5).toFixed(1) + '%',
    shareGap: (Math.random() * 10 - 5).toFixed(1) + '%',
    searchGrowth: (Math.random() * 20 - 5).toFixed(1) + '%',
    viewGrowth: (Math.random() * 20 - 5).toFixed(1) + '%'
  }));
  
  // Sort by share of search (highest first)
  competitiveData.sort((a, b) => 
    parseFloat(b.shareOfSearch) - parseFloat(a.shareOfSearch)
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div className="flex flex-wrap gap-2">
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-[180px] bg-white">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category.id} value={category.id}>
                  {category.name}
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
      
      {/* Market Share Visualization */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Share of Search vs. Share of Views</CardTitle>
            <CardDescription>
              Comparative analysis of market position by search and view metrics
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80 border border-dashed border-dashboard-border rounded-md bg-gray-50 flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <p className="mb-2">Competitive Share Chart</p>
                <p className="text-sm">Visualization showing market share positioning</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>YoY Trend Analysis</CardTitle>
            <CardDescription>
              Year-over-year trends in search and view performance
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80 border border-dashed border-dashboard-border rounded-md bg-gray-50 flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <p className="mb-2">YoY Trend Visualization</p>
                <p className="text-sm">Time series showing performance changes over time</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Competitive Positioning Table */}
      <Card>
        <CardHeader>
          <CardTitle>Competitive Market Position</CardTitle>
          <CardDescription>
            Detailed comparison of competitive positioning metrics
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-dashboard-border">
                  <th className="text-left py-3 px-4 font-medium">Retailer</th>
                  <th className="text-right py-3 px-4 font-medium">Share of Search</th>
                  <th className="text-right py-3 px-4 font-medium">Share of Views</th>
                  <th className="text-right py-3 px-4 font-medium">Share Gap</th>
                  <th className="text-right py-3 px-4 font-medium">Search Growth YoY</th>
                  <th className="text-right py-3 px-4 font-medium">View Growth YoY</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-dashboard-border">
                {competitiveData.map((item, index) => (
                  <tr key={item.id} className={cn(
                    "hover:bg-muted/50", 
                    index === 0 ? "bg-green-50" : index % 2 === 0 ? "bg-white" : "bg-gray-50"
                  )}>
                    <td className="py-3 px-4 font-medium">{item.name}</td>
                    <td className="text-right py-3 px-4">{item.shareOfSearch}</td>
                    <td className="text-right py-3 px-4">{item.shareOfViews}</td>
                    <td className="text-right py-3 px-4">
                      {parseFloat(item.shareGap) > 0 ? (
                        <span className="text-green-600">+{item.shareGap}</span>
                      ) : (
                        <span className="text-red-600">{item.shareGap}</span>
                      )}
                    </td>
                    <td className="text-right py-3 px-4">
                      {parseFloat(item.searchGrowth) > 0 ? (
                        <span className="text-green-600 flex items-center justify-end">
                          <TrendingUp className="w-4 h-4 mr-1" />
                          {item.searchGrowth}
                        </span>
                      ) : (
                        <span className="text-red-600 flex items-center justify-end">
                          <TrendingDown className="w-4 h-4 mr-1" />
                          {item.searchGrowth.replace('-', '')}
                        </span>
                      )}
                    </td>
                    <td className="text-right py-3 px-4">
                      {parseFloat(item.viewGrowth) > 0 ? (
                        <span className="text-green-600 flex items-center justify-end">
                          <TrendingUp className="w-4 h-4 mr-1" />
                          {item.viewGrowth}
                        </span>
                      ) : (
                        <span className="text-red-600 flex items-center justify-end">
                          <TrendingDown className="w-4 h-4 mr-1" />
                          {item.viewGrowth.replace('-', '')}
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
      
      {/* Gap Analysis Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Top Opportunities</CardTitle>
            <CardDescription>
              Categories with high search but low view share
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {[1, 2, 3].map((item) => (
                <li key={item} className="flex items-center justify-between p-2 bg-green-50 rounded-md">
                  <span className="font-medium text-sm">{categories[Math.floor(Math.random() * categories.length)].name}</span>
                  <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                    +{(Math.random() * 10 + 5).toFixed(1)}% potential
                  </Badge>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Biggest Threats</CardTitle>
            <CardDescription>
              Categories losing search share to competitors
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {[1, 2, 3].map((item) => (
                <li key={item} className="flex items-center justify-between p-2 bg-red-50 rounded-md">
                  <span className="font-medium text-sm">{categories[Math.floor(Math.random() * categories.length)].name}</span>
                  <Badge variant="outline" className="bg-red-100 text-red-800 border-red-200">
                    -{(Math.random() * 8 + 2).toFixed(1)}% loss
                  </Badge>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Strongest Positions</CardTitle>
            <CardDescription>
              Categories with high search and view share
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {[1, 2, 3].map((item) => (
                <li key={item} className="flex items-center justify-between p-2 bg-blue-50 rounded-md">
                  <span className="font-medium text-sm">{categories[Math.floor(Math.random() * categories.length)].name}</span>
                  <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">
                    +{(Math.random() * 15 + 10).toFixed(1)}% vs comp
                  </Badge>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
