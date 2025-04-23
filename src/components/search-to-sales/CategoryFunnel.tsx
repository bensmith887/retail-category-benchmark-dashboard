
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { ChevronDown, ArrowUp, ArrowDown, Filter } from 'lucide-react';
import { cn } from '@/lib/utils';
import MetricsCard from '@/components/MetricsCard';
import { FunnelChart, Funnel, LabelList, Tooltip, ResponsiveContainer } from 'recharts';

interface CategoryFunnelProps {
  retailers: { id: string; name: string; }[];
  categories: { id: string; name: string; }[];
}

export const CategoryFunnel: React.FC<CategoryFunnelProps> = ({ retailers, categories }) => {
  const [selectedRetailer, setSelectedRetailer] = useState(retailers[0].id);
  const [timeframe, setTimeframe] = useState('monthly');
  const [trafficSource, setTrafficSource] = useState('all');

  // Mock data for funnel stages
  const funnelData = {
    search_clicks: { value: 47800, label: 'Search Clicks', change: '+12.5%', isPositive: true },
    category_views: { value: 31200, label: 'Category Views', change: '+8.3%', isPositive: true },
    pdp_views: { value: 18500, label: 'PDP Views', change: '-3.2%', isPositive: false },
    add_to_cart: { value: 4200, label: 'Add to Cart', change: '+5.1%', isPositive: true },
    purchases: { value: 2100, label: 'Purchases', change: '+2.7%', isPositive: true },
  };

  // Create dynamic funnel data for chart
  const funnelChartData = [
    {
      stage: 'Search Clicks',
      value: funnelData.search_clicks.value,
      color: '#8B5CF6',
    },
    {
      stage: 'Category Views',
      value: funnelData.category_views.value,
      color: '#33C3F0',
    },
    {
      stage: 'PDP Views',
      value: funnelData.pdp_views.value,
      color: '#F97316',
    },
    {
      stage: 'Add to Cart',
      value: funnelData.add_to_cart.value,
      color: '#22C55E',
    },
    {
      stage: 'Purchases',
      value: funnelData.purchases.value,
      color: '#1E293B',
    },
  ];

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
          <Select>
            <SelectTrigger className="w-[180px] bg-white">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
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
            <Badge className="ml-1 bg-dashboard-primary text-white">3</Badge>
          </button>
        </div>

        <div className="flex gap-2">
          <Tabs value={timeframe} onValueChange={setTimeframe}>
            <TabsList>
              <TabsTrigger value="weekly">Weekly</TabsTrigger>
              <TabsTrigger value="monthly">Monthly</TabsTrigger>
            </TabsList>
          </Tabs>
          <Tabs value={trafficSource} onValueChange={setTrafficSource}>
            <TabsList>
              <TabsTrigger value="all">All Traffic</TabsTrigger>
              <TabsTrigger value="organic">Organic</TabsTrigger>
              <TabsTrigger value="paid">Paid</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      {/* Funnel Visualization */}
      <Card>
        <CardHeader className="pb-0">
          <CardTitle>Category Search-to-Sale Funnel</CardTitle>
          <CardDescription>
            Visualization of customer journey from initial search to final purchase
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
            <MetricsCard
              label="Search Clicks"
              value={funnelData.search_clicks.value.toLocaleString()}
              change={funnelData.search_clicks.change}
              isPositive={funnelData.search_clicks.isPositive}
            />
            <MetricsCard
              label="Category Views"
              value={funnelData.category_views.value.toLocaleString()}
              change={funnelData.category_views.change}
              isPositive={funnelData.category_views.isPositive}
            />
            <MetricsCard
              label="PDP Views"
              value={funnelData.pdp_views.value.toLocaleString()}
              change={funnelData.pdp_views.change}
              isPositive={funnelData.pdp_views.isPositive}
            />
            <MetricsCard
              label="Add to Cart"
              value={funnelData.add_to_cart.value.toLocaleString()}
              change={funnelData.add_to_cart.change}
              isPositive={funnelData.add_to_cart.isPositive}
            />
            <MetricsCard
              label="Purchases"
              value={funnelData.purchases.value.toLocaleString()}
              change={funnelData.purchases.change}
              isPositive={funnelData.purchases.isPositive}
            />
          </div>

          {/* Dynamic Funnel Chart */}
          <div className="h-80 w-full border border-dashed border-dashboard-border rounded-md bg-gray-50 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <FunnelChart
                margin={{ top: 30, right: 40, left: 40, bottom: 30 }}
              >
                <Tooltip
                  formatter={(value: number, name, props) => [
                    value.toLocaleString(),
                    props && props.payload && props.payload.stage,
                  ]}
                  contentStyle={{
                    borderRadius: 10,
                    background: "#fff",
                    border: "1px solid #ececec",
                    fontSize: 14,
                  }}
                />
                <Funnel
                  dataKey="value"
                  data={funnelChartData}
                  isAnimationActive
                  stroke="#ccc"
                >
                  <LabelList
                    dataKey="stage"
                    position="left"
                    fill="#333"
                    style={{
                      fontWeight: "bold",
                      fontSize: 15,
                    }}
                  />
                </Funnel>
              </FunnelChart>
            </ResponsiveContainer>
          </div>

          {/* Conversion Rates Below Chart */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-8">
            <div className="p-4 border border-dashboard-border rounded-md bg-white">
              <div className="text-sm text-muted-foreground mb-1">Search to Category View Rate</div>
              <div className="text-2xl font-bold">
                {((funnelData.category_views.value / funnelData.search_clicks.value) * 100).toFixed(1)}%
              </div>
              <div className="flex items-center text-sm mt-1">
                <ArrowUp className="text-green-500 w-4 h-4 mr-1" />
                <span className="text-green-600">+2.1% vs. last period</span>
              </div>
            </div>

            <div className="p-4 border border-dashboard-border rounded-md bg-white">
              <div className="text-sm text-muted-foreground mb-1">Category to PDP View Rate</div>
              <div className="text-2xl font-bold">
                {((funnelData.pdp_views.value / funnelData.category_views.value) * 100).toFixed(1)}%
              </div>
              <div className="flex items-center text-sm mt-1">
                <ArrowDown className="text-red-500 w-4 h-4 mr-1" />
                <span className="text-red-600">-3.5% vs. last period</span>
              </div>
            </div>

            <div className="p-4 border border-dashboard-border rounded-md bg-white">
              <div className="text-sm text-muted-foreground mb-1">PDP to Add-to-Cart Rate</div>
              <div className="text-2xl font-bold">
                {((funnelData.add_to_cart.value / funnelData.pdp_views.value) * 100).toFixed(1)}%
              </div>
              <div className="flex items-center text-sm mt-1">
                <ArrowUp className="text-green-500 w-4 h-4 mr-1" />
                <span className="text-green-600">+1.5% vs. last period</span>
              </div>
            </div>

            <div className="p-4 border border-dashboard-border rounded-md bg-white">
              <div className="text-sm text-muted-foreground mb-1">Add-to-Cart to Purchase Rate</div>
              <div className="text-2xl font-bold">
                {((funnelData.purchases.value / funnelData.add_to_cart.value) * 100).toFixed(1)}%
              </div>
              <div className="flex items-center text-sm mt-1">
                <ArrowDown className="text-red-500 w-4 h-4 mr-1" />
                <span className="text-red-600">-0.8% vs. last period</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Category Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>Category Performance Breakdown</CardTitle>
          <CardDescription>
            Detailed analysis by category showing search to view conversion rates
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-dashboard-border">
                  <th className="text-left py-3 px-4 font-medium">Category</th>
                  <th className="text-right py-3 px-4 font-medium">Search Clicks</th>
                  <th className="text-right py-3 px-4 font-medium">PDP Views</th>
                  <th className="text-right py-3 px-4 font-medium">Search-to-View Ratio</th>
                  <th className="text-right py-3 px-4 font-medium">YoY Change</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-dashboard-border">
                {categories.map((category, index) => (
                  <tr key={category.id} className={cn("hover:bg-muted/50 transition-colors", index % 2 === 0 ? "bg-white" : "bg-gray-50")}>
                    <td className="py-3 px-4">{category.name}</td>
                    <td className="text-right py-3 px-4">{Math.floor(Math.random() * 10000) + 1000}</td>
                    <td className="text-right py-3 px-4">{Math.floor(Math.random() * 5000) + 500}</td>
                    <td className="text-right py-3 px-4">{(Math.random() * 70 + 30).toFixed(1)}%</td>
                    <td className="text-right py-3 px-4">
                      {Math.random() > 0.5 ? (
                        <span className="text-green-600 flex items-center justify-end">
                          <ArrowUp className="w-4 h-4 mr-1" />
                          {(Math.random() * 15).toFixed(1)}%
                        </span>
                      ) : (
                        <span className="text-red-600 flex items-center justify-end">
                          <ArrowDown className="w-4 h-4 mr-1" />
                          {(Math.random() * 15).toFixed(1)}%
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
