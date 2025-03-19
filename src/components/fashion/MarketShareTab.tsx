
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RetailerData, CompetitorPosition } from '@/utils/fashionAnalyticsData';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  ScatterChart, Scatter, ZAxis, Cell, LabelList
} from 'recharts';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { cn } from '@/lib/utils';
import { ArrowUp, ArrowDown } from 'lucide-react';

interface MarketShareTabProps {
  retailers: RetailerData[];
  competitorPositioning: CompetitorPosition[];
  crossVisitation: any[];
}

const MarketShareTab: React.FC<MarketShareTabProps> = ({ 
  retailers,
  competitorPositioning,
  crossVisitation
}) => {
  const [timeFrame, setTimeFrame] = useState('12');

  // Sort retailers by market share descending
  const sortedRetailers = [...retailers].sort((a, b) => b.marketShare - a.marketShare);
  
  // Format for bar chart
  const marketShareData = sortedRetailers.map(retailer => ({
    name: retailer.name,
    current: retailer.marketShare,
    previous: retailer.previousMarketShare,
    change: retailer.marketShare - retailer.previousMarketShare
  }));
  
  // Color array for scatter plot
  const colors = [
    '#8884d8', '#83a6ed', '#8dd1e1', '#82ca9d', 
    '#a4de6c', '#d0ed57', '#ffc658', '#ff8042',
    '#ff6b6b', '#f9a03f'
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Market Share Analysis</h2>
        <Select value={timeFrame} onValueChange={setTimeFrame}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select time period" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="3">Last 3 months</SelectItem>
            <SelectItem value="6">Last 6 months</SelectItem>
            <SelectItem value="12">Last 12 months</SelectItem>
            <SelectItem value="24">Last 24 months</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Market Share Comparison</CardTitle>
            <CardDescription>
              Top {sortedRetailers.length} retailers by market share ({timeFrame} month view)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={marketShareData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  layout="vertical"
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" domain={[0, 25]} />
                  <YAxis dataKey="name" type="category" width={100} />
                  <Tooltip 
                    formatter={(value: number) => [`${value.toFixed(1)}%`, "Market Share"]}
                  />
                  <Bar dataKey="current" fill="#8884d8" name="Current Share %" barSize={20}>
                    <LabelList dataKey="change" position="right" formatter={(value: number) => (
                      value > 0 ? `+${value.toFixed(1)}` : value.toFixed(1)
                    )} />
                  </Bar>
                  <Bar dataKey="previous" fill="#82ca9d" name="Previous Share %" barSize={20} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Competitive Positioning Map</CardTitle>
            <CardDescription>
              Market share vs growth rate (bubble size = traffic volume)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <ScatterChart
                  margin={{ top: 20, right: 20, bottom: 10, left: 10 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" dataKey="xValue" name="Market Share" unit="%" 
                    domain={[0, Math.ceil(Math.max(...competitorPositioning.map(d => d.xValue)) * 1.1)]} />
                  <YAxis type="number" dataKey="yValue" name="Growth Rate" unit="%" 
                    domain={[0, Math.ceil(Math.max(...competitorPositioning.map(d => d.yValue)) * 1.1)]} />
                  <ZAxis type="number" dataKey="size" range={[100, 1000]} />
                  <Tooltip 
                    cursor={{ strokeDasharray: '3 3' }}
                    formatter={(value: any, name: string) => {
                      if (name === 'Market Share') return [`${value.toFixed(1)}%`, name];
                      if (name === 'Growth Rate') return [`${value.toFixed(1)}%`, name];
                      return [value, name];
                    }}
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const data = payload[0].payload;
                        return (
                          <div className="bg-white p-2 border rounded shadow-sm">
                            <p className="font-medium">{data.name}</p>
                            <p className="text-sm">Market Share: {data.xValue.toFixed(1)}%</p>
                            <p className="text-sm">Growth Rate: {data.yValue.toFixed(1)}%</p>
                            <p className="text-sm">Traffic: {(data.size / 1000000).toFixed(1)}M visits</p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Scatter name="Retailers" data={competitorPositioning}>
                    {competitorPositioning.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                    ))}
                  </Scatter>
                </ScatterChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Cross-Visitation Analysis</CardTitle>
          <CardDescription>
            Percentage of YourFashion visitors who also visit competitor sites
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Competitor</TableHead>
                  <TableHead className="text-right">Cross-Visitation %</TableHead>
                  <TableHead className="text-right">Their Market Share</TableHead>
                  <TableHead>Potential Impact</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {crossVisitation
                  .sort((a, b) => b.percentage - a.percentage)
                  .map((item, index) => {
                    // Find the competitor's market share
                    const competitor = retailers.find(r => r.name === item.competitor);
                    const competitorShare = competitor?.marketShare || 0;
                    
                    // Calculate an impact score based on cross-visitation % and competitor market share
                    const impactScore = (item.percentage / 100) * competitorShare;
                    let impactLevel: 'high' | 'medium' | 'low' = 'low';
                    
                    if (impactScore > 8) impactLevel = 'high';
                    else if (impactScore > 4) impactLevel = 'medium';
                    
                    return (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{item.competitor}</TableCell>
                        <TableCell className="text-right">{item.percentage.toFixed(1)}%</TableCell>
                        <TableCell className="text-right">{competitorShare.toFixed(1)}%</TableCell>
                        <TableCell>
                          <span className={cn(
                            "px-2 py-1 rounded text-xs font-medium",
                            impactLevel === 'high' ? "bg-red-100 text-red-700" : 
                            impactLevel === 'medium' ? "bg-yellow-100 text-yellow-700" : 
                            "bg-green-100 text-green-700"
                          )}>
                            {impactLevel.charAt(0).toUpperCase() + impactLevel.slice(1)}
                          </span>
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MarketShareTab;
