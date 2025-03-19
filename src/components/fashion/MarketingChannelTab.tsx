
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TrafficSource, KeywordPerformance } from '@/utils/fashionAnalyticsData';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, Legend
} from 'recharts';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Download, TrendingUp, DollarSign, ZoomIn } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MarketingChannelTabProps {
  trafficSources: TrafficSource[];
  keywordPerformance: KeywordPerformance[];
}

const MarketingChannelTab: React.FC<MarketingChannelTabProps> = ({ 
  trafficSources,
  keywordPerformance
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  
  // Format channel data for charts
  const channelShareData = trafficSources.map(source => ({
    name: source.channel,
    value: source.visits,
    percentage: (source.visits / trafficSources.reduce((acc, curr) => acc + curr.visits, 0) * 100).toFixed(1)
  }));
  
  // Calculate YoY change
  const channelGrowthData = trafficSources.map(source => ({
    name: source.channel,
    growth: ((source.visits - source.previousVisits) / source.previousVisits * 100).toFixed(1),
    conversion: source.conversionRate.toFixed(1),
    visits: source.visits
  }));
  
  // Calculate efficiency metrics
  const paidChannels = trafficSources.filter(source => source.costPerVisit > 0);
  const channelEfficiencyData = paidChannels.map(source => ({
    name: source.channel,
    cpa: (source.costPerVisit / (source.conversionRate / 100)).toFixed(2),
    roi: source.roi.toFixed(1),
    costPerVisit: source.costPerVisit.toFixed(2)
  }));
  
  // Colors for pie chart
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D', '#FFC658'];
  
  // Calculate channel distribution
  const totalVisits = trafficSources.reduce((acc, curr) => acc + curr.visits, 0);
  
  const channelDistribution = trafficSources.map(source => ({
    name: source.channel,
    value: source.visits,
    percentage: ((source.visits / totalVisits) * 100).toFixed(1)
  }));

  const onPieEnter = (_: any, index: number) => {
    setActiveIndex(index);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Marketing Channel Effectiveness</h2>
        <Button variant="outline" size="sm">
          <Download className="mr-2 h-4 w-4" />
          Export Data
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Traffic Distribution by Channel</CardTitle>
            <CardDescription>
              Share of total site visits by marketing channel
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    activeIndex={activeIndex}
                    activeShape={renderActiveShape}
                    data={channelDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={90}
                    fill="#8884d8"
                    dataKey="value"
                    onMouseEnter={onPieEnter}
                  >
                    {channelDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Legend />
                  <Tooltip 
                    formatter={(value: number) => [
                      `${(value / 1000).toFixed(0)}K visits (${(value / totalVisits * 100).toFixed(1)}%)`,
                      "Traffic"
                    ]}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Channel Growth Year-over-Year</CardTitle>
            <CardDescription>
              YoY change in traffic volume by marketing channel
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={channelGrowthData.sort((a, b) => parseFloat(b.growth) - parseFloat(a.growth))}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis 
                    domain={[
                      Math.floor(Math.min(...channelGrowthData.map(d => parseFloat(d.growth)))),
                      Math.ceil(Math.max(...channelGrowthData.map(d => parseFloat(d.growth))))
                    ]} 
                    unit="%" 
                  />
                  <Tooltip 
                    formatter={(value: string) => [`${value}%`, "YoY Growth"]}
                  />
                  <Bar dataKey="growth" fill="#8884d8">
                    {channelGrowthData.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={parseFloat(entry.growth) >= 0 ? '#82ca9d' : '#ff8042'} 
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Paid Channel Performance</CardTitle>
          <CardDescription>
            Cost efficiency and ROI analysis for paid marketing channels
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Channel</TableHead>
                      <TableHead className="text-right">Cost per Visit</TableHead>
                      <TableHead className="text-right">Conv. Rate</TableHead>
                      <TableHead className="text-right">CPA</TableHead>
                      <TableHead className="text-right">ROI</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paidChannels.map((channel, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{channel.channel}</TableCell>
                        <TableCell className="text-right">${channel.costPerVisit.toFixed(2)}</TableCell>
                        <TableCell className="text-right">{channel.conversionRate.toFixed(1)}%</TableCell>
                        <TableCell className="text-right">
                          ${(channel.costPerVisit / (channel.conversionRate / 100)).toFixed(2)}
                        </TableCell>
                        <TableCell className="text-right">
                          <span className={cn(
                            channel.roi >= 3 ? "text-green-500" : 
                            channel.roi >= 1 ? "text-blue-500" : "text-red-500"
                          )}>
                            {channel.roi.toFixed(1)}x
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-base font-medium">Top Performing Keywords</h3>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Keyword</TableHead>
                      <TableHead className="text-right">Visits</TableHead>
                      <TableHead className="text-right">Conv. %</TableHead>
                      <TableHead className="text-right">CPC</TableHead>
                      <TableHead>Type</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {keywordPerformance
                      .sort((a, b) => b.visits - a.visits)
                      .slice(0, 5)
                      .map((keyword, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">{keyword.keyword}</TableCell>
                          <TableCell className="text-right">
                            {keyword.visits >= 10000 
                              ? `${(keyword.visits / 1000).toFixed(0)}K` 
                              : keyword.visits.toLocaleString()
                            }
                          </TableCell>
                          <TableCell className="text-right">{keyword.conversion.toFixed(1)}%</TableCell>
                          <TableCell className="text-right">${keyword.cpc.toFixed(2)}</TableCell>
                          <TableCell>
                            <span className={cn(
                              "px-2 py-1 rounded text-xs font-medium",
                              keyword.isOwned 
                                ? "bg-green-100 text-green-700" 
                                : "bg-blue-100 text-blue-700"
                            )}>
                              {keyword.isOwned ? 'Branded' : 'Generic'}
                            </span>
                          </TableCell>
                        </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-blue-50">
          <CardContent className="pt-6">
            <div className="flex items-start">
              <div className="p-2 rounded-full bg-blue-100 mr-4">
                <TrendingUp className="h-5 w-5 text-blue-700" />
              </div>
              <div>
                <h3 className="font-medium text-blue-900 mb-1">Channel Opportunity</h3>
                <p className="text-sm text-blue-800">
                  Social Media traffic is growing +{parseFloat(channelGrowthData.find(c => c.name === 'Social Media')?.growth || '0').toFixed(1)}% YoY
                  but conversion rate is {parseFloat(channelGrowthData.find(c => c.name === 'Social Media')?.conversion || '0').toFixed(1)}%,
                  below site average.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-green-50">
          <CardContent className="pt-6">
            <div className="flex items-start">
              <div className="p-2 rounded-full bg-green-100 mr-4">
                <DollarSign className="h-5 w-5 text-green-700" />
              </div>
              <div>
                <h3 className="font-medium text-green-900 mb-1">ROI Leader</h3>
                <p className="text-sm text-green-800">
                  Email marketing has the highest ROI at {paidChannels.sort((a,b) => b.roi - a.roi)[0].roi.toFixed(1)}x.
                  Consider increasing investment in this high-efficiency channel.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-yellow-50">
          <CardContent className="pt-6">
            <div className="flex items-start">
              <div className="p-2 rounded-full bg-yellow-100 mr-4">
                <ZoomIn className="h-5 w-5 text-yellow-700" />
              </div>
              <div>
                <h3 className="font-medium text-yellow-900 mb-1">Keyword Insight</h3>
                <p className="text-sm text-yellow-800">
                  Branded keywords have a {
                    (keywordPerformance.filter(k => k.isOwned).reduce((acc, k) => acc + k.conversion, 0) / 
                    keywordPerformance.filter(k => k.isOwned).length).toFixed(1)
                  }% avg conversion, 
                  {
                    (
                      (keywordPerformance.filter(k => k.isOwned).reduce((acc, k) => acc + k.conversion, 0) / 
                      keywordPerformance.filter(k => k.isOwned).length) / 
                      (keywordPerformance.filter(k => !k.isOwned).reduce((acc, k) => acc + k.conversion, 0) / 
                      keywordPerformance.filter(k => !k.isOwned).length) * 100 - 100
                    ).toFixed(0)
                  }% higher than non-branded.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

// Component for active pie chart segment
const renderActiveShape = (props: any) => {
  const RADIAN = Math.PI / 180;
  const {
    cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle,
    fill, payload, percent, value
  } = props;
  
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? 'start' : 'end';

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill} className="text-sm font-medium">
        {payload.name}
      </text>
      <sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill="none"
      />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        fill="#333"
        className="text-xs"
      >
        {`${(percent * 100).toFixed(1)}%`}
      </text>
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        dy={18}
        textAnchor={textAnchor}
        fill="#999"
        className="text-xs"
      >
        {`(${(value / 1000).toFixed(0)}K visits)`}
      </text>
    </g>
  );
};

export default MarketingChannelTab;
