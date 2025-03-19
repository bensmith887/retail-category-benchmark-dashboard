
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, ArrowUp, ArrowDown, Info } from 'lucide-react';
import { RetailerData, TrafficSource } from '@/utils/fashionAnalyticsData';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from '@/lib/utils';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface PerformanceMetricsTabProps {
  retailer: RetailerData;
  trafficSources: TrafficSource[];
  monthlyVisitData: any[];
}

const PerformanceMetricsTab: React.FC<PerformanceMetricsTabProps> = ({ 
  retailer, 
  trafficSources,
  monthlyVisitData
}) => {
  const getPercentChange = (current: number, previous: number) => {
    const change = ((current - previous) / previous) * 100;
    return change.toFixed(1);
  };

  const topFunnelMetrics = [
    {
      name: "Visits",
      value: retailer.visits,
      previousValue: retailer.previousVisits,
      format: (value: number) => value >= 1000000 ? `${(value / 1000000).toFixed(1)}M` : `${(value / 1000).toFixed(0)}K`
    },
    {
      name: "Unique Visitors",
      value: retailer.uniqueVisitors,
      previousValue: retailer.previousVisits * 0.77, // Estimate
      format: (value: number) => value >= 1000000 ? `${(value / 1000000).toFixed(1)}M` : `${(value / 1000).toFixed(0)}K`
    },
    {
      name: "Bounce Rate",
      value: retailer.bounceRate,
      previousValue: retailer.previousBounceRate,
      format: (value: number) => `${value.toFixed(1)}%`,
      inverted: true // Lower is better
    },
    {
      name: "Avg. Session Duration",
      value: retailer.timeOnSite,
      previousValue: retailer.previousTimeOnSite,
      format: (value: number) => `${value.toFixed(1)} min`
    }
  ];

  const bottomFunnelMetrics = [
    {
      name: "Conversion Rate",
      value: retailer.conversionRate,
      previousValue: retailer.previousConversionRate,
      format: (value: number) => `${value.toFixed(1)}%`
    },
    {
      name: "Average Order Value",
      value: retailer.averageOrderValue,
      previousValue: retailer.previousAverageOrderValue,
      format: (value: number) => `$${value.toFixed(2)}`
    },
    {
      name: "Revenue per Visitor",
      value: retailer.averageOrderValue * (retailer.conversionRate / 100),
      previousValue: retailer.previousAverageOrderValue * (retailer.previousConversionRate / 100),
      format: (value: number) => `$${value.toFixed(2)}`
    },
    {
      name: "Est. Monthly Revenue",
      value: retailer.visits * (retailer.conversionRate / 100) * retailer.averageOrderValue,
      previousValue: retailer.previousVisits * (retailer.previousConversionRate / 100) * retailer.previousAverageOrderValue,
      format: (value: number) => value >= 1000000 ? `$${(value / 1000000).toFixed(1)}M` : `$${(value / 1000).toFixed(0)}K`
    }
  ];

  // Create derived data for traffic source performance
  const trafficSourcePerformance = trafficSources.map(source => {
    const change = ((source.visits - source.previousVisits) / source.previousVisits) * 100;
    return {
      name: source.channel,
      visits: source.visits,
      share: (source.visits / retailer.visits) * 100,
      change: change,
      conversion: source.conversionRate,
      costPerVisit: source.costPerVisit,
      roi: source.roi
    };
  });

  return (
    <div className="space-y-6">
      <Tabs defaultValue="topFunnel" className="w-full">
        <TabsList className="grid grid-cols-2 mb-4 bg-gray-100 p-1.5 rounded-lg shadow-sm border border-gray-200">
          <TabsTrigger value="topFunnel" className="font-semibold">Top Funnel Metrics</TabsTrigger>
          <TabsTrigger value="bottomFunnel" className="font-semibold">Bottom Funnel Metrics</TabsTrigger>
        </TabsList>
        
        <TabsContent value="topFunnel">
          <Card>
            <CardHeader>
              <CardTitle>Traffic & Engagement Metrics</CardTitle>
              <CardDescription>
                Key indicators of site traffic and user engagement
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {topFunnelMetrics.map((metric, index) => {
                      const percentChange = getPercentChange(metric.value, metric.previousValue);
                      const isPositive = metric.inverted 
                        ? parseFloat(percentChange) < 0 
                        : parseFloat(percentChange) > 0;
                        
                      return (
                        <div key={index} className="bg-gray-50 p-4 rounded-lg">
                          <div className="text-sm text-gray-500 mb-1">{metric.name}</div>
                          <div className="text-xl font-bold">{metric.format(metric.value)}</div>
                          <div className="flex items-center mt-1 text-xs">
                            {isPositive ? (
                              <ArrowUp className="w-3 h-3 text-green-500" />
                            ) : (
                              <ArrowDown className="w-3 h-3 text-red-500" />
                            )}
                            <span 
                              className={cn(
                                isPositive ? "text-green-500" : "text-red-500",
                                "ml-1"
                              )}
                            >
                              {isPositive ? "+" : ""}{percentChange}%
                            </span>
                            <span className="text-gray-500 ml-1">vs last period</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
                
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={monthlyVisitData.slice(-6)}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis 
                        tickFormatter={(value) => value >= 1000000 ? `${(value / 1000000).toFixed(1)}M` : `${(value / 1000).toFixed(0)}K`} 
                      />
                      <Tooltip 
                        formatter={(value: number) => [
                          value >= 1000000 ? `${(value / 1000000).toFixed(2)}M` : `${(value / 1000).toFixed(0)}K`,
                          "Visits"
                        ]}
                      />
                      <Line type="monotone" dataKey="visits" stroke="#8884d8" name="Total Visits" />
                      <Line type="monotone" dataKey="uniqueVisitors" stroke="#82ca9d" name="Unique Visitors" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
              
              <Collapsible className="mt-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium">Traffic Source Breakdown</h3>
                  <CollapsibleTrigger className="p-1 rounded-md hover:bg-gray-100">
                    <ChevronDown className="h-4 w-4" />
                  </CollapsibleTrigger>
                </div>
                
                <CollapsibleContent className="mt-4">
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Source</TableHead>
                          <TableHead className="text-right">Visits</TableHead>
                          <TableHead className="text-right">Share</TableHead>
                          <TableHead className="text-right">YoY Change</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {trafficSourcePerformance.map((source, index) => (
                          <TableRow key={index}>
                            <TableCell className="font-medium">{source.name}</TableCell>
                            <TableCell className="text-right">{source.visits >= 1000000 ? `${(source.visits / 1000000).toFixed(1)}M` : `${(source.visits / 1000).toFixed(0)}K`}</TableCell>
                            <TableCell className="text-right">{source.share.toFixed(1)}%</TableCell>
                            <TableCell className="text-right">
                              <span className={source.change > 0 ? "text-green-500" : "text-red-500"}>
                                {source.change > 0 ? "+" : ""}{source.change.toFixed(1)}%
                              </span>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="bottomFunnel">
          <Card>
            <CardHeader>
              <CardTitle>Conversion & Revenue Metrics</CardTitle>
              <CardDescription>
                Key indicators of site performance and revenue generation
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {bottomFunnelMetrics.map((metric, index) => {
                      const percentChange = getPercentChange(metric.value, metric.previousValue);
                      const isPositive = parseFloat(percentChange) > 0;
                        
                      return (
                        <div key={index} className="bg-gray-50 p-4 rounded-lg">
                          <div className="text-sm text-gray-500 mb-1">{metric.name}</div>
                          <div className="text-xl font-bold">{metric.format(metric.value)}</div>
                          <div className="flex items-center mt-1 text-xs">
                            {isPositive ? (
                              <ArrowUp className="w-3 h-3 text-green-500" />
                            ) : (
                              <ArrowDown className="w-3 h-3 text-red-500" />
                            )}
                            <span 
                              className={cn(
                                isPositive ? "text-green-500" : "text-red-500",
                                "ml-1"
                              )}
                            >
                              {isPositive ? "+" : ""}{percentChange}%
                            </span>
                            <span className="text-gray-500 ml-1">vs last period</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
                
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={trafficSourcePerformance}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                      <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                      <Tooltip />
                      <Bar yAxisId="left" dataKey="share" fill="#8884d8" name="Traffic Share %" />
                      <Bar yAxisId="right" dataKey="conversion" fill="#82ca9d" name="Conversion Rate %" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-blue-50 border-l-4 border-blue-500 rounded">
                <div className="flex">
                  <Info className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0" />
                  <div>
                    <h3 className="text-sm font-medium text-blue-800">Performance Insight</h3>
                    <p className="mt-1 text-sm text-blue-700">
                      Email has the highest conversion rate at {trafficSources.find(s => s.channel === 'Email')?.conversionRate}% 
                      but only drives {((trafficSources.find(s => s.channel === 'Email')?.visits || 0) / retailer.visits * 100).toFixed(1)}% of traffic. 
                      Consider expanding your email marketing program to capitalize on this high-converting channel.
                    </p>
                  </div>
                </div>
              </div>
              
              <Collapsible className="mt-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium">Channel Performance Details</h3>
                  <CollapsibleTrigger className="p-1 rounded-md hover:bg-gray-100">
                    <ChevronDown className="h-4 w-4" />
                  </CollapsibleTrigger>
                </div>
                
                <CollapsibleContent className="mt-4">
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Channel</TableHead>
                          <TableHead className="text-right">Conversion</TableHead>
                          <TableHead className="text-right">Cost/Visit</TableHead>
                          <TableHead className="text-right">ROI</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {trafficSources.map((source, index) => (
                          <TableRow key={index}>
                            <TableCell className="font-medium">{source.channel}</TableCell>
                            <TableCell className="text-right">{source.conversionRate.toFixed(1)}%</TableCell>
                            <TableCell className="text-right">{source.costPerVisit ? `$${source.costPerVisit.toFixed(2)}` : 'N/A'}</TableCell>
                            <TableCell className="text-right">
                              {source.roi ? (
                                <span className={source.roi > 1 ? "text-green-500" : "text-red-500"}>
                                  {source.roi.toFixed(1)}x
                                </span>
                              ) : 'N/A'}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PerformanceMetricsTab;
