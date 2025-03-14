
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis
} from 'recharts';
import { TrendingUp, TrendingDown, BarChart3, PieChart as PieChartIcon, LineChart as LineChartIcon, RadarIcon } from 'lucide-react';
import MetricsCard from './MetricsCard';
import { 
  trafficSourcesData, 
  trafficSourceTrendData, 
  categoryTrafficData,
  competitorSourceBenchmarks 
} from '@/utils/data';

const COLORS = ['#5840bb', '#6892e6', '#fa9f42', '#00bc8c', '#f06292', '#8884d8', '#82ca9d'];

const TrafficSourcesView: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All Categories');

  // Get your brand search data
  const yourBrandSearchData = competitorSourceBenchmarks.search['Your Brand'];
  const yourBrandDirectData = competitorSourceBenchmarks.direct['Your Brand'];
  const yourBrandSocialData = competitorSourceBenchmarks.social['Your Brand'];

  return (
    <div className="animate-fade-in">
      {/* Top Summary Widgets */}
      <div className="mb-6">
        <div className="dashboard-card">
          <h3 className="text-lg font-medium text-dashboard-text mb-4">Traffic Sources Overview</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Search Traffic */}
            <div>
              <MetricsCard
                label="Search Traffic"
                value={`${yourBrandSearchData.share}%`}
                change={`${yourBrandSearchData.yearChange > 0 ? '+' : ''}${yourBrandSearchData.yearChange}%`}
                isPositive={yourBrandSearchData.yearChange > 0}
                secondaryLabel="vs Industry Avg"
                secondaryChange={`${yourBrandSearchData.indexToAvg > 1 ? '+' : ''}${((yourBrandSearchData.indexToAvg - 1) * 100).toFixed(1)}%`}
                isSecondaryPositive={yourBrandSearchData.indexToAvg > 1}
              />
            </div>
            
            {/* Direct Traffic */}
            <div>
              <MetricsCard
                label="Direct Traffic"
                value={`${yourBrandDirectData.share}%`}
                change={`${yourBrandDirectData.yearChange > 0 ? '+' : ''}${yourBrandDirectData.yearChange}%`}
                isPositive={yourBrandDirectData.yearChange > 0}
                secondaryLabel="vs Industry Avg"
                secondaryChange={`${yourBrandDirectData.indexToAvg > 1 ? '+' : ''}${((yourBrandDirectData.indexToAvg - 1) * 100).toFixed(1)}%`}
                isSecondaryPositive={yourBrandDirectData.indexToAvg > 1}
              />
            </div>
            
            {/* Social Traffic */}
            <div>
              <MetricsCard
                label="Social Traffic"
                value={`${yourBrandSocialData.share}%`}
                change={`${yourBrandSocialData.yearChange > 0 ? '+' : ''}${yourBrandSocialData.yearChange}%`}
                isPositive={yourBrandSocialData.yearChange > 0}
                secondaryLabel="vs Industry Avg"
                secondaryChange={`${yourBrandSocialData.indexToAvg > 1 ? '+' : ''}${((yourBrandSocialData.indexToAvg - 1) * 100).toFixed(1)}%`}
                isSecondaryPositive={yourBrandSocialData.indexToAvg > 1}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main content tabs */}
      <div className="dashboard-card mb-6">
        <Tabs defaultValue="competitor" className="w-full">
          <TabsList className="grid grid-cols-4 mb-6">
            <TabsTrigger value="competitor" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              <span>Competitor Benchmark</span>
            </TabsTrigger>
            <TabsTrigger value="category" className="flex items-center gap-2">
              <PieChartIcon className="h-4 w-4" />
              <span>Category Distribution</span>
            </TabsTrigger>
            <TabsTrigger value="trends" className="flex items-center gap-2">
              <LineChartIcon className="h-4 w-4" />
              <span>Trends</span>
            </TabsTrigger>
            <TabsTrigger value="channel" className="flex items-center gap-2">
              <RadarIcon className="h-4 w-4" />
              <span>Channel Mix</span>
            </TabsTrigger>
          </TabsList>
          
          {/* Competitor Benchmark Tab */}
          <TabsContent value="competitor" className="space-y-6">
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={trafficSourcesData.data}
                  layout="vertical"
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                  <XAxis 
                    type="number" 
                    domain={[0, 60]} 
                    tickFormatter={(value) => `${value}%`}
                  />
                  <YAxis 
                    dataKey="source" 
                    type="category" 
                    tick={{ fontSize: 12 }}
                  />
                  <Tooltip 
                    formatter={(value) => [`${value}%`, undefined]}
                    labelFormatter={(value) => `Source: ${value}`}
                  />
                  <Legend />
                  {trafficSourcesData.competitors.map((competitor, index) => (
                    <Bar 
                      key={competitor} 
                      dataKey={competitor} 
                      fill={COLORS[index]} 
                      name={competitor}
                      barSize={20}
                    />
                  ))}
                </BarChart>
              </ResponsiveContainer>
            </div>
            
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="min-w-[150px]">Traffic Source</TableHead>
                    {trafficSourcesData.competitors.map(competitor => (
                      <TableHead className="text-right" key={competitor}>
                        {competitor}
                      </TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {trafficSourcesData.data.map((row) => (
                    <TableRow key={row.source}>
                      <TableCell className="font-medium">{row.source}</TableCell>
                      {trafficSourcesData.competitors.map(competitor => (
                        <TableCell className="text-right" key={`${row.source}-${competitor}`}>
                          {row[competitor as keyof typeof row]}%
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>

          {/* Category Distribution Tab */}
          <TabsContent value="category" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Category Traffic Source Distribution</CardTitle>
                  <CardDescription>Breakdown of traffic sources by product category</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={categoryTrafficData}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="category" tick={{ fontSize: 10 }} angle={-45} textAnchor="end" height={80} />
                        <YAxis 
                          domain={[0, 100]} 
                          tickFormatter={(value) => `${value}%`}
                        />
                        <Tooltip formatter={(value) => [`${value}%`, undefined]} />
                        <Legend />
                        <Bar dataKey="search" stackId="a" fill="#5840bb" name="Search" />
                        <Bar dataKey="direct" stackId="a" fill="#6892e6" name="Direct" />
                        <Bar dataKey="referral" stackId="a" fill="#fa9f42" name="Referral" />
                        <Bar dataKey="social" stackId="a" fill="#00bc8c" name="Social" />
                        <Bar dataKey="email" stackId="a" fill="#f06292" name="Email" />
                        <Bar dataKey="display" stackId="a" fill="#8884d8" name="Display" />
                        <Bar dataKey="affiliates" stackId="a" fill="#82ca9d" name="Affiliates" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Women's Apparel Traffic Sources</CardTitle>
                  <CardDescription>Distribution of traffic sources for Women's Apparel</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={[
                            { name: 'Search', value: categoryTrafficData[0].search },
                            { name: 'Direct', value: categoryTrafficData[0].direct },
                            { name: 'Referral', value: categoryTrafficData[0].referral },
                            { name: 'Social', value: categoryTrafficData[0].social },
                            { name: 'Email', value: categoryTrafficData[0].email },
                            { name: 'Display', value: categoryTrafficData[0].display },
                            { name: 'Affiliates', value: categoryTrafficData[0].affiliates }
                          ]}
                          cx="50%"
                          cy="50%"
                          labelLine={true}
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {[
                            { name: 'Search', value: categoryTrafficData[0].search },
                            { name: 'Direct', value: categoryTrafficData[0].direct },
                            { name: 'Referral', value: categoryTrafficData[0].referral },
                            { name: 'Social', value: categoryTrafficData[0].social },
                            { name: 'Email', value: categoryTrafficData[0].email },
                            { name: 'Display', value: categoryTrafficData[0].display },
                            { name: 'Affiliates', value: categoryTrafficData[0].affiliates }
                          ].map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => [`${value}%`, undefined]} />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Trends Tab */}
          <TabsContent value="trends" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Traffic Source Trends (6 Months)</CardTitle>
                <CardDescription>How traffic sources have changed over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={trafficSourceTrendData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis 
                        domain={[0, 60]} 
                        tickFormatter={(value) => `${value}%`}
                      />
                      <Tooltip formatter={(value) => [`${value}%`, undefined]} />
                      <Legend />
                      <Line type="monotone" dataKey="Search" stroke="#5840bb" activeDot={{ r: 8 }} />
                      <Line type="monotone" dataKey="Direct" stroke="#6892e6" />
                      <Line type="monotone" dataKey="Referral" stroke="#fa9f42" />
                      <Line type="monotone" dataKey="Social" stroke="#00bc8c" />
                      <Line type="monotone" dataKey="Email" stroke="#f06292" />
                      <Line type="monotone" dataKey="Display" stroke="#8884d8" />
                      <Line type="monotone" dataKey="Affiliates" stroke="#82ca9d" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Channel Mix Tab */}
          <TabsContent value="channel" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Your Brand Channel Mix</CardTitle>
                  <CardDescription>Radar view of your traffic distribution</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <RadarChart cx="50%" cy="50%" outerRadius="80%" data={trafficSourcesData.data}>
                        <PolarGrid />
                        <PolarAngleAxis dataKey="source" />
                        <PolarRadiusAxis angle={30} domain={[0, 60]} />
                        <Radar name="Your Brand" dataKey="Your Brand" stroke="#5840bb" fill="#5840bb" fillOpacity={0.6} />
                        <Radar name="Industry Average" dataKey="Competitor A" stroke="#6892e6" fill="#6892e6" fillOpacity={0.6} />
                        <Legend />
                        <Tooltip formatter={(value) => [`${value}%`, undefined]} />
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Source Performance Index</CardTitle>
                  <CardDescription>How your traffic sources compare to industry average</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Source</TableHead>
                          <TableHead className="text-right">Your Share</TableHead>
                          <TableHead className="text-right">vs. Industry Avg</TableHead>
                          <TableHead className="text-right">YoY Change</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell className="font-medium">Search</TableCell>
                          <TableCell className="text-right">{yourBrandSearchData.share}%</TableCell>
                          <TableCell className="text-right">
                            <div className={`inline-flex items-center ${yourBrandSearchData.indexToAvg > 1 ? 'text-green-600' : 'text-red-500'}`}>
                              {yourBrandSearchData.indexToAvg > 1 ? <TrendingUp size={14} className="mr-1" /> : <TrendingDown size={14} className="mr-1" />}
                              {((yourBrandSearchData.indexToAvg - 1) * 100).toFixed(1)}%
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className={`inline-flex items-center ${yourBrandSearchData.yearChange > 0 ? 'text-green-600' : 'text-red-500'}`}>
                              {yourBrandSearchData.yearChange > 0 ? <TrendingUp size={14} className="mr-1" /> : <TrendingDown size={14} className="mr-1" />}
                              {yourBrandSearchData.yearChange > 0 ? '+' : ''}{yourBrandSearchData.yearChange}%
                            </div>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Direct</TableCell>
                          <TableCell className="text-right">{yourBrandDirectData.share}%</TableCell>
                          <TableCell className="text-right">
                            <div className={`inline-flex items-center ${yourBrandDirectData.indexToAvg > 1 ? 'text-green-600' : 'text-red-500'}`}>
                              {yourBrandDirectData.indexToAvg > 1 ? <TrendingUp size={14} className="mr-1" /> : <TrendingDown size={14} className="mr-1" />}
                              {((yourBrandDirectData.indexToAvg - 1) * 100).toFixed(1)}%
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className={`inline-flex items-center ${yourBrandDirectData.yearChange > 0 ? 'text-green-600' : 'text-red-500'}`}>
                              {yourBrandDirectData.yearChange > 0 ? <TrendingUp size={14} className="mr-1" /> : <TrendingDown size={14} className="mr-1" />}
                              {yourBrandDirectData.yearChange > 0 ? '+' : ''}{yourBrandDirectData.yearChange}%
                            </div>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Social</TableCell>
                          <TableCell className="text-right">{yourBrandSocialData.share}%</TableCell>
                          <TableCell className="text-right">
                            <div className={`inline-flex items-center ${yourBrandSocialData.indexToAvg > 1 ? 'text-green-600' : 'text-red-500'}`}>
                              {yourBrandSocialData.indexToAvg > 1 ? <TrendingUp size={14} className="mr-1" /> : <TrendingDown size={14} className="mr-1" />}
                              {((yourBrandSocialData.indexToAvg - 1) * 100).toFixed(1)}%
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className={`inline-flex items-center ${yourBrandSocialData.yearChange > 0 ? 'text-green-600' : 'text-red-500'}`}>
                              {yourBrandSocialData.yearChange > 0 ? <TrendingUp size={14} className="mr-1" /> : <TrendingDown size={14} className="mr-1" />}
                              {yourBrandSocialData.yearChange > 0 ? '+' : ''}{yourBrandSocialData.yearChange}%
                            </div>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
      {/* Subfooter */}
      <div className="text-xs text-center text-dashboard-secondaryText mt-6 pt-4 border-t border-dashboard-border">
        <p>Source: SimilarWeb • Metrics: Traffic Sources, Referral Data, Channel Attribution</p>
      </div>
    </div>
  );
};

export default TrafficSourcesView;
