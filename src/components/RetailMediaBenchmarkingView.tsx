
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { InfoIcon, TrendingUp, TrendingDown, Download } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { PieChart, Pie, Cell, BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Sample data for the retail media dashboard
const retailerData = [
  { name: 'Amazon', value: 38, color: '#FF9900' },
  { name: 'Walmart', value: 21, color: '#0071DC' },
  { name: 'Target', value: 14, color: '#CC0000' },
  { name: 'Kroger', value: 9, color: '#004990' },
  { name: 'Instacart', value: 7, color: '#43B02A' },
  { name: 'Others', value: 11, color: '#CCCCCC' }
];

const adSpendData = [
  { name: 'Sponsored Products', amazon: 42, walmart: 35, target: 30, kroger: 28 },
  { name: 'Display Ads', amazon: 25, walmart: 28, target: 32, kroger: 30 },
  { name: 'Search', amazon: 20, walmart: 22, target: 18, kroger: 22 },
  { name: 'Offsite Media', amazon: 13, walmart: 15, target: 20, kroger: 20 }
];

const audienceData = [
  { name: 'Males 18-34', ours: 12, competitor1: 18, competitor2: 15 },
  { name: 'Males 35-54', ours: 18, competitor1: 15, competitor2: 14 },
  { name: 'Males 55+', ours: 8, competitor1: 7, competitor2: 10 },
  { name: 'Females 18-34', ours: 22, competitor1: 25, competitor2: 18 },
  { name: 'Females 35-54', ours: 28, competitor1: 21, competitor2: 25 },
  { name: 'Females 55+', ours: 12, competitor1: 14, competitor2: 18 }
];

const campaignPerformanceData = [
  { name: 'Amazon', roas: 4.2, ctr: 0.82, convRate: 3.2, cpa: 10.5 },
  { name: 'Walmart', roas: 3.8, ctr: 0.71, convRate: 2.8, cpa: 12.3 },
  { name: 'Target', roas: 3.5, ctr: 0.68, convRate: 2.5, cpa: 14.2 },
  { name: 'Kroger', roas: 3.2, ctr: 0.62, convRate: 2.1, cpa: 15.8 },
  { name: 'Instacart', roas: 4.0, ctr: 0.75, convRate: 3.0, cpa: 11.2 }
];

const competitorShareData = [
  { name: 'Jan', amazon: 37, walmart: 20, target: 14, kroger: 8, instacart: 6, others: 15 },
  { name: 'Feb', amazon: 38, walmart: 20, target: 14, kroger: 8, instacart: 7, others: 13 },
  { name: 'Mar', amazon: 38, walmart: 21, target: 14, kroger: 8, instacart: 7, others: 12 },
  { name: 'Apr', amazon: 38, walmart: 21, target: 14, kroger: 9, instacart: 7, others: 11 },
  { name: 'May', amazon: 38, walmart: 21, target: 14, kroger: 9, instacart: 7, others: 11 },
  { name: 'Jun', amazon: 39, walmart: 21, target: 14, kroger: 9, instacart: 7, others: 10 }
];

const ROAS_COLORS = ['#4ade80', '#22c55e', '#16a34a', '#15803d', '#166534'];
const COLORS = ['#FF9900', '#0071DC', '#CC0000', '#004990', '#43B02A', '#CCCCCC'];

const RetailMediaBenchmarkingView = () => {
  const [retailer, setRetailer] = useState('all');
  const [timeframe, setTimeframe] = useState('6m');
  const [category, setCategory] = useState('all');

  return (
    <div className="animate-fade-in">
      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-medium text-dashboard-text">Retail Media Benchmarking</h2>
          <div className="flex items-center gap-3">
            <Select value={retailer} onValueChange={setRetailer}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select retailer" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Retailers</SelectItem>
                <SelectItem value="amazon">Amazon</SelectItem>
                <SelectItem value="walmart">Walmart</SelectItem>
                <SelectItem value="target">Target</SelectItem>
                <SelectItem value="kroger">Kroger</SelectItem>
                <SelectItem value="instacart">Instacart</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={timeframe} onValueChange={setTimeframe}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select time range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1m">Last 30 Days</SelectItem>
                <SelectItem value="3m">Last 3 Months</SelectItem>
                <SelectItem value="6m">Last 6 Months</SelectItem>
                <SelectItem value="12m">Last 12 Months</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="electronics">Electronics</SelectItem>
                <SelectItem value="grocery">Grocery</SelectItem>
                <SelectItem value="beauty">Beauty</SelectItem>
                <SelectItem value="home">Home & Kitchen</SelectItem>
                <SelectItem value="toys">Toys & Games</SelectItem>
              </SelectContent>
            </Select>
            
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <Download size={14} />
              <span>Export</span>
            </Button>
          </div>
        </div>
        
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid grid-cols-5 mb-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="audience">Audience Insights</TabsTrigger>
            <TabsTrigger value="campaign">Campaign Performance</TabsTrigger>
            <TabsTrigger value="competitive">Competitive Intelligence</TabsTrigger>
            <TabsTrigger value="opportunities">Growth Opportunities</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview">
            <div className="grid grid-cols-1 gap-6 mb-6">
              <Card>
                <CardHeader>
                  <CardTitle>Retail Media Market Share</CardTitle>
                  <CardDescription>Share of voice across key retailers</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="h-[300px] flex items-center justify-center">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={retailerData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                            label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          >
                            {retailerData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip />
                          <Legend />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                    
                    <div className="col-span-2 h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={competitorShareData}
                          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Bar dataKey="amazon" stackId="a" fill="#FF9900" name="Amazon" />
                          <Bar dataKey="walmart" stackId="a" fill="#0071DC" name="Walmart" />
                          <Bar dataKey="target" stackId="a" fill="#CC0000" name="Target" />
                          <Bar dataKey="kroger" stackId="a" fill="#004990" name="Kroger" />
                          <Bar dataKey="instacart" stackId="a" fill="#43B02A" name="Instacart" />
                          <Bar dataKey="others" stackId="a" fill="#CCCCCC" name="Others" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Traffic Benchmarking</CardTitle>
                    <CardDescription>Comparative site traffic</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-1 text-sm">
                          <span>Amazon</span>
                          <span className="font-medium">2.4B</span>
                        </div>
                        <Progress value={100} className="h-2 bg-gray-200" />
                      </div>
                      <div>
                        <div className="flex justify-between mb-1 text-sm">
                          <span>Walmart</span>
                          <span className="font-medium">780M</span>
                        </div>
                        <Progress value={33} className="h-2 bg-gray-200" />
                      </div>
                      <div>
                        <div className="flex justify-between mb-1 text-sm">
                          <span>Target</span>
                          <span className="font-medium">520M</span>
                        </div>
                        <Progress value={22} className="h-2 bg-gray-200" />
                      </div>
                      <div>
                        <div className="flex justify-between mb-1 text-sm">
                          <span>Kroger</span>
                          <span className="font-medium">210M</span>
                        </div>
                        <Progress value={9} className="h-2 bg-gray-200" />
                      </div>
                      <div>
                        <div className="flex justify-between mb-1 text-sm">
                          <span>Instacart</span>
                          <span className="font-medium">185M</span>
                        </div>
                        <Progress value={8} className="h-2 bg-gray-200" />
                      </div>
                    </div>
                    <div className="mt-4 text-xs text-dashboard-secondaryText">
                      <p>Monthly visits (Q1 2024)</p>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Engagement Metrics</CardTitle>
                    <CardDescription>Site performance comparison</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="border rounded-md p-3">
                        <div className="text-xs text-dashboard-secondaryText mb-1">Pages / Session</div>
                        <div className="grid grid-cols-2 gap-2 mt-2">
                          <div>
                            <div className="text-xs">Amazon</div>
                            <div className="font-medium">7.8</div>
                          </div>
                          <div>
                            <div className="text-xs">Walmart</div>
                            <div className="font-medium">5.2</div>
                          </div>
                          <div>
                            <div className="text-xs">Target</div>
                            <div className="font-medium">6.1</div>
                          </div>
                          <div>
                            <div className="text-xs">Kroger</div>
                            <div className="font-medium">4.3</div>
                          </div>
                        </div>
                      </div>
                      <div className="border rounded-md p-3">
                        <div className="text-xs text-dashboard-secondaryText mb-1">Avg. Session (min)</div>
                        <div className="grid grid-cols-2 gap-2 mt-2">
                          <div>
                            <div className="text-xs">Amazon</div>
                            <div className="font-medium">8:42</div>
                          </div>
                          <div>
                            <div className="text-xs">Walmart</div>
                            <div className="font-medium">6:15</div>
                          </div>
                          <div>
                            <div className="text-xs">Target</div>
                            <div className="font-medium">7:22</div>
                          </div>
                          <div>
                            <div className="text-xs">Kroger</div>
                            <div className="font-medium">5:38</div>
                          </div>
                        </div>
                      </div>
                      <div className="border rounded-md p-3">
                        <div className="text-xs text-dashboard-secondaryText mb-1">Bounce Rate</div>
                        <div className="grid grid-cols-2 gap-2 mt-2">
                          <div>
                            <div className="text-xs">Amazon</div>
                            <div className="font-medium">32%</div>
                          </div>
                          <div>
                            <div className="text-xs">Walmart</div>
                            <div className="font-medium">41%</div>
                          </div>
                          <div>
                            <div className="text-xs">Target</div>
                            <div className="font-medium">38%</div>
                          </div>
                          <div>
                            <div className="text-xs">Kroger</div>
                            <div className="font-medium">44%</div>
                          </div>
                        </div>
                      </div>
                      <div className="border rounded-md p-3">
                        <div className="text-xs text-dashboard-secondaryText mb-1">Conversion Rate</div>
                        <div className="grid grid-cols-2 gap-2 mt-2">
                          <div>
                            <div className="text-xs">Amazon</div>
                            <div className="font-medium">3.2%</div>
                          </div>
                          <div>
                            <div className="text-xs">Walmart</div>
                            <div className="font-medium">2.5%</div>
                          </div>
                          <div>
                            <div className="text-xs">Target</div>
                            <div className="font-medium">2.8%</div>
                          </div>
                          <div>
                            <div className="text-xs">Kroger</div>
                            <div className="font-medium">2.1%</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Channel Performance</CardTitle>
                    <CardDescription>Ad spend by format</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[220px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={adSpendData}
                          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Bar dataKey="amazon" fill="#FF9900" name="Amazon" />
                          <Bar dataKey="walmart" fill="#0071DC" name="Walmart" />
                          <Bar dataKey="target" fill="#CC0000" name="Target" />
                          <Bar dataKey="kroger" fill="#004990" name="Kroger" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="audience">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <Card>
                <CardHeader>
                  <CardTitle>Demographic Comparison</CardTitle>
                  <CardDescription>Audience demographics vs. competitors</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[350px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={audienceData}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="ours" fill="#4f46e5" name="Our Brand" />
                        <Bar dataKey="competitor1" fill="#22c55e" name="Competitor 1" />
                        <Bar dataKey="competitor2" fill="#ef4444" name="Competitor 2" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Cross-Shopping Analysis</CardTitle>
                  <CardDescription>Where else our customers shop</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[350px] flex items-center justify-center">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={[
                            { name: 'Amazon Only', value: 45, color: '#4f46e5' },
                            { name: 'Amazon + Walmart', value: 22, color: '#3730a3' },
                            { name: 'Amazon + Target', value: 15, color: '#312e81' },
                            { name: 'Amazon + Kroger', value: 9, color: '#1e1b4b' },
                            { name: 'Amazon + Others', value: 9, color: '#1e40af' },
                          ]}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={100}
                          fill="#8884d8"
                          dataKey="value"
                          label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        >
                          {retailerData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <Card>
                <CardHeader>
                  <CardTitle>Shopping Behavior Patterns</CardTitle>
                  <CardDescription>Customer purchase behavior analysis</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium mb-2">Purchase Frequency</h4>
                      <div className="grid grid-cols-4 gap-2">
                        <div className="border rounded-md p-2 text-center">
                          <div className="text-xl font-medium">28%</div>
                          <div className="text-xs text-dashboard-secondaryText">Weekly</div>
                        </div>
                        <div className="border rounded-md p-2 text-center">
                          <div className="text-xl font-medium">42%</div>
                          <div className="text-xs text-dashboard-secondaryText">Bi-Weekly</div>
                        </div>
                        <div className="border rounded-md p-2 text-center">
                          <div className="text-xl font-medium">22%</div>
                          <div className="text-xs text-dashboard-secondaryText">Monthly</div>
                        </div>
                        <div className="border rounded-md p-2 text-center">
                          <div className="text-xl font-medium">8%</div>
                          <div className="text-xs text-dashboard-secondaryText">Less Often</div>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium mb-2">Shopping Cart Size</h4>
                      <div className="grid grid-cols-3 gap-2">
                        <div className="border rounded-md p-2 text-center">
                          <div className="text-xl font-medium">$42</div>
                          <div className="text-xs text-dashboard-secondaryText">Amazon</div>
                        </div>
                        <div className="border rounded-md p-2 text-center">
                          <div className="text-xl font-medium">$58</div>
                          <div className="text-xs text-dashboard-secondaryText">Walmart</div>
                        </div>
                        <div className="border rounded-md p-2 text-center">
                          <div className="text-xl font-medium">$53</div>
                          <div className="text-xs text-dashboard-secondaryText">Target</div>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium mb-2">Prime vs. Non-Prime Behavior</h4>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <div className="flex justify-between mb-1 text-xs">
                            <span>Prime Members</span>
                            <span>68%</span>
                          </div>
                          <Progress value={68} className="h-2 bg-gray-200" />
                          <div className="flex justify-between mt-2 text-xs text-dashboard-secondaryText">
                            <span>Avg Orders: 4.2/month</span>
                            <span>AOV: $52</span>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between mb-1 text-xs">
                            <span>Non-Prime</span>
                            <span>32%</span>
                          </div>
                          <Progress value={32} className="h-2 bg-gray-200" />
                          <div className="flex justify-between mt-2 text-xs text-dashboard-secondaryText">
                            <span>Avg Orders: 1.8/month</span>
                            <span>AOV: $38</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Customer Loyalty Segments</CardTitle>
                  <CardDescription>Loyalty segment performance</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="border rounded-md p-3">
                      <div className="flex justify-between items-center">
                        <h4 className="text-sm font-medium">Loyal Customers (5+ purchases)</h4>
                        <div className="flex items-center text-green-600">
                          <TrendingUp size={16} className="mr-1" />
                          <span className="text-xs font-medium">+5.4% YoY</span>
                        </div>
                      </div>
                      <Progress value={26} className="h-2 bg-gray-200 mt-2" />
                      <div className="text-xs text-dashboard-secondaryText mt-1">26% of customer base</div>
                      <div className="mt-2 text-sm">
                        <span className="font-medium">LTV: </span>
                        <span>$842</span>
                      </div>
                    </div>
                    
                    <div className="border rounded-md p-3">
                      <div className="flex justify-between items-center">
                        <h4 className="text-sm font-medium">Repeat Customers (2-4 purchases)</h4>
                        <div className="flex items-center text-green-600">
                          <TrendingUp size={16} className="mr-1" />
                          <span className="text-xs font-medium">+3.2% YoY</span>
                        </div>
                      </div>
                      <Progress value={42} className="h-2 bg-gray-200 mt-2" />
                      <div className="text-xs text-dashboard-secondaryText mt-1">42% of customer base</div>
                      <div className="mt-2 text-sm">
                        <span className="font-medium">LTV: </span>
                        <span>$368</span>
                      </div>
                    </div>
                    
                    <div className="border rounded-md p-3">
                      <div className="flex justify-between items-center">
                        <h4 className="text-sm font-medium">One-Time Customers</h4>
                        <div className="flex items-center text-red-600">
                          <TrendingDown size={16} className="mr-1" />
                          <span className="text-xs font-medium">-2.1% YoY</span>
                        </div>
                      </div>
                      <Progress value={32} className="h-2 bg-gray-200 mt-2" />
                      <div className="text-xs text-dashboard-secondaryText mt-1">32% of customer base</div>
                      <div className="mt-2 text-sm">
                        <span className="font-medium">LTV: </span>
                        <span>$85</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="campaign">
            <div className="grid grid-cols-1 gap-6 mb-6">
              <Card>
                <CardHeader>
                  <CardTitle>Campaign Performance Metrics</CardTitle>
                  <CardDescription>ROAS and key performance indicators across retailers</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[350px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={campaignPerformanceData}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="roas" fill="#4ade80" name="ROAS" />
                        <Bar dataKey="ctr" fill="#fb923c" name="CTR (%)" />
                        <Bar dataKey="convRate" fill="#60a5fa" name="Conversion Rate (%)" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>ROAS by Retailer</CardTitle>
                    <CardDescription>Return on ad spend benchmarking</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[200px] flex items-center justify-center">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={[
                              { name: 'Amazon', value: 4.2, color: ROAS_COLORS[0] },
                              { name: 'Walmart', value: 3.8, color: ROAS_COLORS[1] },
                              { name: 'Target', value: 3.5, color: ROAS_COLORS[2] },
                              { name: 'Kroger', value: 3.2, color: ROAS_COLORS[3] },
                              { name: 'Instacart', value: 4.0, color: ROAS_COLORS[4] }
                            ]}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={70}
                            fill="#8884d8"
                            dataKey="value"
                            label={({name, value}) => `${name}: ${value}x`}
                          >
                            {campaignPerformanceData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={ROAS_COLORS[index % ROAS_COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="mt-4 text-xs text-dashboard-secondaryText text-center">
                      <p>ROAS measured as return per $1 spent</p>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>CTR by Placement</CardTitle>
                    <CardDescription>Click-through rates by ad position</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-1 text-sm">
                          <span>Product Detail Page</span>
                          <span className="font-medium">1.42%</span>
                        </div>
                        <Progress value={71} className="h-2 bg-gray-200" />
                      </div>
                      <div>
                        <div className="flex justify-between mb-1 text-sm">
                          <span>Search Results (Top)</span>
                          <span className="font-medium">0.91%</span>
                        </div>
                        <Progress value={45.5} className="h-2 bg-gray-200" />
                      </div>
                      <div>
                        <div className="flex justify-between mb-1 text-sm">
                          <span>Search Results (Side)</span>
                          <span className="font-medium">0.65%</span>
                        </div>
                        <Progress value={32.5} className="h-2 bg-gray-200" />
                      </div>
                      <div>
                        <div className="flex justify-between mb-1 text-sm">
                          <span>Category Pages</span>
                          <span className="font-medium">0.82%</span>
                        </div>
                        <Progress value={41} className="h-2 bg-gray-200" />
                      </div>
                      <div>
                        <div className="flex justify-between mb-1 text-sm">
                          <span>Homepage Featured</span>
                          <span className="font-medium">0.51%</span>
                        </div>
                        <Progress value={25.5} className="h-2 bg-gray-200" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Cost Per Acquisition</CardTitle>
                    <CardDescription>CPA trends over time</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[200px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                          data={[
                            { month: 'Jan', amazon: 11.2, walmart: 13.1, target: 14.8 },
                            { month: 'Feb', amazon: 11.0, walmart: 13.0, target: 14.5 },
                            { month: 'Mar', amazon: 10.8, walmart: 12.7, target: 14.3 },
                            { month: 'Apr', amazon: 10.7, walmart: 12.5, target: 14.2 },
                            { month: 'May', amazon: 10.5, walmart: 12.3, target: 14.2 },
                            { month: 'Jun', amazon: 10.5, walmart: 12.3, target: 14.2 }
                          ]}
                          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="month" />
                          <YAxis />
                          <Tooltip formatter={(value) => [`$${value}`, 'CPA']} />
                          <Legend />
                          <Line 
                            type="monotone" 
                            dataKey="amazon" 
                            stroke="#FF9900" 
                            activeDot={{ r: 8 }} 
                            name="Amazon"
                          />
                          <Line type="monotone" dataKey="walmart" stroke="#0071DC" name="Walmart" />
                          <Line type="monotone" dataKey="target" stroke="#CC0000" name="Target" />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="competitive">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <Card>
                <CardHeader>
                  <CardTitle>Share of Voice</CardTitle>
                  <CardDescription>Media presence by retailer</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={[
                          { category: 'Electronics', amazon: 52, walmart: 18, target: 14, kroger: 3, instacart: 4, others: 9 },
                          { category: 'Home & Kitchen', amazon: 45, walmart: 22, target: 18, kroger: 6, instacart: 3, others: 6 },
                          { category: 'Beauty', amazon: 38, walmart: 20, target: 17, kroger: 8, instacart: 8, others: 9 },
                          { category: 'Grocery', amazon: 32, walmart: 26, target: 12, kroger: 14, instacart: 12, others: 4 },
                          { category: 'Toys', amazon: 48, walmart: 21, target: 19, kroger: 2, instacart: 2, others: 8 }
                        ]}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                        layout="vertical"
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" />
                        <YAxis dataKey="category" type="category" />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="amazon" stackId="a" fill="#FF9900" name="Amazon" />
                        <Bar dataKey="walmart" stackId="a" fill="#0071DC" name="Walmart" />
                        <Bar dataKey="target" stackId="a" fill="#CC0000" name="Target" />
                        <Bar dataKey="kroger" stackId="a" fill="#004990" name="Kroger" />
                        <Bar dataKey="instacart" stackId="a" fill="#43B02A" name="Instacart" />
                        <Bar dataKey="others" stackId="a" fill="#CCCCCC" name="Others" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Media Mix Comparison</CardTitle>
                  <CardDescription>Ad spend allocation by format</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-sm font-medium mb-2 text-center">Amazon</h4>
                      <div className="h-[120px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={[
                                { name: 'Sponsored Products', value: 42 },
                                { name: 'Display Ads', value: 25 },
                                { name: 'Search', value: 20 },
                                { name: 'Offsite Media', value: 13 }
                              ]}
                              cx="50%"
                              cy="50%"
                              innerRadius={25}
                              outerRadius={50}
                              fill="#8884d8"
                              dataKey="value"
                            >
                              <Cell fill="#4f46e5" />
                              <Cell fill="#8b5cf6" />
                              <Cell fill="#a855f7" />
                              <Cell fill="#d946ef" />
                            </Pie>
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium mb-2 text-center">Walmart</h4>
                      <div className="h-[120px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={[
                                { name: 'Sponsored Products', value: 35 },
                                { name: 'Display Ads', value: 28 },
                                { name: 'Search', value: 22 },
                                { name: 'Offsite Media', value: 15 }
                              ]}
                              cx="50%"
                              cy="50%"
                              innerRadius={25}
                              outerRadius={50}
                              fill="#8884d8"
                              dataKey="value"
                            >
                              <Cell fill="#4f46e5" />
                              <Cell fill="#8b5cf6" />
                              <Cell fill="#a855f7" />
                              <Cell fill="#d946ef" />
                            </Pie>
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium mb-2 text-center">Target</h4>
                      <div className="h-[120px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={[
                                { name: 'Sponsored Products', value: 30 },
                                { name: 'Display Ads', value: 32 },
                                { name: 'Search', value: 18 },
                                { name: 'Offsite Media', value: 20 }
                              ]}
                              cx="50%"
                              cy="50%"
                              innerRadius={25}
                              outerRadius={50}
                              fill="#8884d8"
                              dataKey="value"
                            >
                              <Cell fill="#4f46e5" />
                              <Cell fill="#8b5cf6" />
                              <Cell fill="#a855f7" />
                              <Cell fill="#d946ef" />
                            </Pie>
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium mb-2 text-center">Kroger</h4>
                      <div className="h-[120px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={[
                                { name: 'Sponsored Products', value: 28 },
                                { name: 'Display Ads', value: 30 },
                                { name: 'Search', value: 22 },
                                { name: 'Offsite Media', value: 20 }
                              ]}
                              cx="50%"
                              cy="50%"
                              innerRadius={25}
                              outerRadius={50}
                              fill="#8884d8"
                              dataKey="value"
                            >
                              <Cell fill="#4f46e5" />
                              <Cell fill="#8b5cf6" />
                              <Cell fill="#a855f7" />
                              <Cell fill="#d946ef" />
                            </Pie>
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-4 gap-2 mt-4">
                    <div className="text-xs text-center">
                      <div className="w-3 h-3 bg-[#4f46e5] rounded-full mx-auto"></div>
                      <span>Sponsored</span>
                    </div>
                    <div className="text-xs text-center">
                      <div className="w-3 h-3 bg-[#8b5cf6] rounded-full mx-auto"></div>
                      <span>Display</span>
                    </div>
                    <div className="text-xs text-center">
                      <div className="w-3 h-3 bg-[#a855f7] rounded-full mx-auto"></div>
                      <span>Search</span>
                    </div>
                    <div className="text-xs text-center">
                      <div className="w-3 h-3 bg-[#d946ef] rounded-full mx-auto"></div>
                      <span>Offsite</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <Card>
                <CardHeader>
                  <CardTitle>Keyword Performance</CardTitle>
                  <CardDescription>Top performing keywords across retailers</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-3 px-4">Keyword</th>
                          <th className="text-left py-3 px-4">Search Volume</th>
                          <th className="text-left py-3 px-4">Amazon Share</th>
                          <th className="text-left py-3 px-4">Walmart Share</th>
                          <th className="text-left py-3 px-4">Target Share</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b">
                          <td className="py-3 px-4">wireless headphones</td>
                          <td className="py-3 px-4">245,000</td>
                          <td className="py-3 px-4">
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div className="bg-[#FF9900] h-2 rounded-full" style={{ width: "62%" }}></div>
                            </div>
                            <div className="text-xs mt-1">62%</div>
                          </td>
                          <td className="py-3 px-4">
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div className="bg-[#0071DC] h-2 rounded-full" style={{ width: "24%" }}></div>
                            </div>
                            <div className="text-xs mt-1">24%</div>
                          </td>
                          <td className="py-3 px-4">
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div className="bg-[#CC0000] h-2 rounded-full" style={{ width: "14%" }}></div>
                            </div>
                            <div className="text-xs mt-1">14%</div>
                          </td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-3 px-4">kitchen blender</td>
                          <td className="py-3 px-4">182,000</td>
                          <td className="py-3 px-4">
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div className="bg-[#FF9900] h-2 rounded-full" style={{ width: "52%" }}></div>
                            </div>
                            <div className="text-xs mt-1">52%</div>
                          </td>
                          <td className="py-3 px-4">
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div className="bg-[#0071DC] h-2 rounded-full" style={{ width: "32%" }}></div>
                            </div>
                            <div className="text-xs mt-1">32%</div>
                          </td>
                          <td className="py-3 px-4">
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div className="bg-[#CC0000] h-2 rounded-full" style={{ width: "16%" }}></div>
                            </div>
                            <div className="text-xs mt-1">16%</div>
                          </td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-3 px-4">air fryer</td>
                          <td className="py-3 px-4">320,000</td>
                          <td className="py-3 px-4">
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div className="bg-[#FF9900] h-2 rounded-full" style={{ width: "48%" }}></div>
                            </div>
                            <div className="text-xs mt-1">48%</div>
                          </td>
                          <td className="py-3 px-4">
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div className="bg-[#0071DC] h-2 rounded-full" style={{ width: "28%" }}></div>
                            </div>
                            <div className="text-xs mt-1">28%</div>
                          </td>
                          <td className="py-3 px-4">
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div className="bg-[#CC0000] h-2 rounded-full" style={{ width: "24%" }}></div>
                            </div>
                            <div className="text-xs mt-1">24%</div>
                          </td>
                        </tr>
                        <tr>
                          <td className="py-3 px-4">smart tv 4k</td>
                          <td className="py-3 px-4">195,000</td>
                          <td className="py-3 px-4">
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div className="bg-[#FF9900] h-2 rounded-full" style={{ width: "56%" }}></div>
                            </div>
                            <div className="text-xs mt-1">56%</div>
                          </td>
                          <td className="py-3 px-4">
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div className="bg-[#0071DC] h-2 rounded-full" style={{ width: "26%" }}></div>
                            </div>
                            <div className="text-xs mt-1">26%</div>
                          </td>
                          <td className="py-3 px-4">
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div className="bg-[#CC0000] h-2 rounded-full" style={{ width: "18%" }}></div>
                            </div>
                            <div className="text-xs mt-1">18%</div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Competitive Spend Analysis</CardTitle>
                  <CardDescription>Estimated ad spend by category</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[350px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={[
                          { category: 'Electronics', amazon: 42, walmart: 28, target: 24, kroger: 12 },
                          { category: 'Home & Kitchen', amazon: 36, walmart: 32, target: 22, kroger: 14 },
                          { category: 'Beauty', amazon: 32, walmart: 26, target: 28, kroger: 18 },
                          { category: 'Grocery', amazon: 24, walmart: 38, target: 20, kroger: 32 },
                          { category: 'Toys', amazon: 45, walmart: 28, target: 32, kroger: 8 }
                        ]}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="category" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="amazon" fill="#FF9900" name="Amazon" />
                        <Bar dataKey="walmart" fill="#0071DC" name="Walmart" />
                        <Bar dataKey="target" fill="#CC0000" name="Target" />
                        <Bar dataKey="kroger" fill="#004990" name="Kroger" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="opportunities">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <Card>
                <CardHeader>
                  <CardTitle>Untapped Audience Segments</CardTitle>
                  <CardDescription>Potential growth opportunities</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="border rounded-md p-3">
                      <div className="flex items-start">
                        <div className="mr-3 mt-1 min-w-[16px]">
                          <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium">Millennial Parents (28-38)</h4>
                          <p className="text-xs text-dashboard-secondaryText mt-1">
                            This segment shows 24% lower engagement than the category average, despite high purchase intent signals.
                          </p>
                          <div className="mt-2">
                            <span className="text-xs font-medium">Opportunity Size:</span>
                            <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                              <div className="bg-blue-500 h-2 rounded-full" style={{ width: "78%" }}></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="border rounded-md p-3">
                      <div className="flex items-start">
                        <div className="mr-3 mt-1 min-w-[16px]">
                          <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium">Health-Conscious Shoppers</h4>
                          <p className="text-xs text-dashboard-secondaryText mt-1">
                            Strong interest in organic and natural products with low retailer media exposure and high margins.
                          </p>
                          <div className="mt-2">
                            <span className="text-xs font-medium">Opportunity Size:</span>
                            <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                              <div className="bg-green-500 h-2 rounded-full" style={{ width: "65%" }}></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="border rounded-md p-3">
                      <div className="flex items-start">
                        <div className="mr-3 mt-1 min-w-[16px]">
                          <div className="w-4 h-4 bg-purple-500 rounded-full"></div>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium">Prime Seasonal Shoppers</h4>
                          <p className="text-xs text-dashboard-secondaryText mt-1">
                            Shoppers who heavily utilize Amazon during key shopping seasons but explore competitors in between.
                          </p>
                          <div className="mt-2">
                            <span className="text-xs font-medium">Opportunity Size:</span>
                            <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                              <div className="bg-purple-500 h-2 rounded-full" style={{ width: "52%" }}></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="border rounded-md p-3">
                      <div className="flex items-start">
                        <div className="mr-3 mt-1 min-w-[16px]">
                          <div className="w-4 h-4 bg-orange-500 rounded-full"></div>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium">Cross-Channel Price Comparers</h4>
                          <p className="text-xs text-dashboard-secondaryText mt-1">
                            Shoppers who research on Amazon but purchase elsewhere. High research, low conversion.
                          </p>
                          <div className="mt-2">
                            <span className="text-xs font-medium">Opportunity Size:</span>
                            <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                              <div className="bg-orange-500 h-2 rounded-full" style={{ width: "48%" }}></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Budget Allocation Modeling</CardTitle>
                  <CardDescription>Optimization scenarios for ROI</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="border rounded-md p-3">
                      <h4 className="text-sm font-medium mb-2">Current Allocation</h4>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <div className="h-[100px]">
                            <ResponsiveContainer width="100%" height="100%">
                              <PieChart>
                                <Pie
                                  data={[
                                    { name: 'Amazon', value: 65 },
                                    { name: 'Walmart', value: 15 },
                                    { name: 'Target', value: 12 },
                                    { name: 'Others', value: 8 }
                                  ]}
                                  cx="50%"
                                  cy="50%"
                                  innerRadius={25}
                                  outerRadius={40}
                                  fill="#8884d8"
                                  dataKey="value"
                                >
                                  <Cell fill="#4f46e5" />
                                  <Cell fill="#22c55e" />
                                  <Cell fill="#ef4444" />
                                  <Cell fill="#94a3b8" />
                                </Pie>
                              </PieChart>
                            </ResponsiveContainer>
                          </div>
                          <div className="text-center text-xs font-medium">Distribution</div>
                        </div>
                        <div>
                          <div className="bg-gray-100 rounded-md p-2 h-full flex flex-col justify-center items-center">
                            <div className="text-xs text-dashboard-secondaryText">Average ROAS</div>
                            <div className="text-xl font-bold mt-1">3.8x</div>
                            <div className="text-xs text-dashboard-secondaryText mt-1">Total Spend: $1.2M</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="border rounded-md p-3 border-green-100 bg-green-50">
                      <h4 className="text-sm font-medium mb-2 flex items-center text-green-800">
                        <InfoIcon size={16} className="mr-2 text-green-600" />
                        Recommended Allocation
                      </h4>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <div className="h-[100px]">
                            <ResponsiveContainer width="100%" height="100%">
                              <PieChart>
                                <Pie
                                  data={[
                                    { name: 'Amazon', value: 52 },
                                    { name: 'Walmart', value: 22 },
                                    { name: 'Target', value: 18 },
                                    { name: 'Others', value: 8 }
                                  ]}
                                  cx="50%"
                                  cy="50%"
                                  innerRadius={25}
                                  outerRadius={40}
                                  fill="#8884d8"
                                  dataKey="value"
                                >
                                  <Cell fill="#4f46e5" />
                                  <Cell fill="#22c55e" />
                                  <Cell fill="#ef4444" />
                                  <Cell fill="#94a3b8" />
                                </Pie>
                              </PieChart>
                            </ResponsiveContainer>
                          </div>
                          <div className="text-center text-xs font-medium">Distribution</div>
                        </div>
                        <div>
                          <div className="bg-green-100 rounded-md p-2 h-full flex flex-col justify-center items-center">
                            <div className="text-xs text-green-700">Projected ROAS</div>
                            <div className="text-xl font-bold mt-1 text-green-800">4.5x</div>
                            <div className="flex items-center text-xs text-green-700 mt-1">
                              <TrendingUp size={14} className="mr-1" />
                              <span>+18.4% improvement</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="mt-3 text-xs text-green-700">
                        <p>Diversifying retail media investment across channels increases overall campaign effectiveness and reduces dependency on a single platform.</p>
                      </div>
                    </div>
                    
                    <div className="border rounded-md p-3">
                      <h4 className="text-sm font-medium mb-2">Format Optimization</h4>
                      <div className="text-xs text-dashboard-secondaryText">
                        <p>Current format allocation shows an overinvestment in Sponsored Products and underinvestment in Display Ads based on performance metrics.</p>
                      </div>
                      <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2">
                        <div>
                          <div className="text-xs mb-1">Current Format Mix</div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div className="bg-blue-500 h-2 rounded-full" style={{ width: "65%" }}></div>
                          </div>
                          <div className="text-xs mt-1">65% Sponsored Products</div>
                        </div>
                        <div>
                          <div className="text-xs mb-1">Recommended Mix</div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div className="bg-green-500 h-2 rounded-full" style={{ width: "45%" }}></div>
                          </div>
                          <div className="text-xs mt-1">45% Sponsored Products</div>
                        </div>
                        <div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div className="bg-purple-500 h-2 rounded-full" style={{ width: "20%" }}></div>
                          </div>
                          <div className="text-xs mt-1">20% Display Ads</div>
                        </div>
                        <div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div className="bg-purple-500 h-2 rounded-full" style={{ width: "35%" }}></div>
                          </div>
                          <div className="text-xs mt-1">35% Display Ads</div>
                        </div>
                        <div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div className="bg-yellow-500 h-2 rounded-full" style={{ width: "15%" }}></div>
                          </div>
                          <div className="text-xs mt-1">15% Other Formats</div>
                        </div>
                        <div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div className="bg-yellow-500 h-2 rounded-full" style={{ width: "20%" }}></div>
                          </div>
                          <div className="text-xs mt-1">20% Other Formats</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <Card>
                <CardHeader>
                  <CardTitle>Trend Forecasting</CardTitle>
                  <CardDescription>Projected retail media growth</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={[
                          { month: 'Jan', actual: 100, forecast: 100 },
                          { month: 'Feb', actual: 105, forecast: 105 },
                          { month: 'Mar', actual: 110, forecast: 110 },
                          { month: 'Apr', actual: 115, forecast: 115 },
                          { month: 'May', actual: 118, forecast: 118 },
                          { month: 'Jun', actual: 122, forecast: 122 },
                          { month: 'Jul', actual: null, forecast: 128 },
                          { month: 'Aug', actual: null, forecast: 135 },
                          { month: 'Sep', actual: null, forecast: 142 },
                          { month: 'Oct', actual: null, forecast: 150 },
                          { month: 'Nov', actual: null, forecast: 165 },
                          { month: 'Dec', actual: null, forecast: 175 }
                        ]}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="actual" stroke="#4f46e5" name="Actual Growth" />
                        <Line type="monotone" dataKey="forecast" stroke="#22c55e" strokeDasharray="5 5" name="Forecast" />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="mt-4 text-xs text-dashboard-secondaryText">
                    <p>Growth indexed to January (100). Forecast shows 75% growth by year-end.</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Optimization Recommendations</CardTitle>
                  <CardDescription>Strategic actions based on data insights</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="border rounded-md p-3 border-blue-100">
                      <h4 className="text-sm font-medium text-blue-800">Retailer Strategy</h4>
                      <ul className="mt-2 text-xs space-y-2 text-blue-700">
                        <li className="flex items-start">
                          <span className="mr-2">•</span>
                          <span>Reduce Amazon concentration by 20% and redistribute to Walmart and Target for higher ROAS</span>
                        </li>
                        <li className="flex items-start">
                          <span className="mr-2">•</span>
                          <span>Test Kroger media for grocery-adjacent categories to capture cross-shopping behavior</span>
                        </li>
                        <li className="flex items-start">
                          <span className="mr-2">•</span>
                          <span>Maintain Amazon dominance in electronics category where ROAS outperforms competitors</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div className="border rounded-md p-3 border-green-100">
                      <h4 className="text-sm font-medium text-green-800">Format Strategy</h4>
                      <ul className="mt-2 text-xs space-y-2 text-green-700">
                        <li className="flex items-start">
                          <span className="mr-2">•</span>
                          <span>Shift 15-20% of budget from Sponsored Products to Display Ads for improved brand awareness</span>
                        </li>
                        <li className="flex items-start">
                          <span className="mr-2">•</span>
                          <span>Increase offsite media allocation by 5% to capture competitors' traffic</span>
                        </li>
                        <li className="flex items-start">
                          <span className="mr-2">•</span>
                          <span>Test Amazon DSP for retargeting to recover cart abandoners</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div className="border rounded-md p-3 border-purple-100">
                      <h4 className="text-sm font-medium text-purple-800">Audience Strategy</h4>
                      <ul className="mt-2 text-xs space-y-2 text-purple-700">
                        <li className="flex items-start">
                          <span className="mr-2">•</span>
                          <span>Create dedicated campaigns for millennial parents segment with 25% budget allocation</span>
                        </li>
                        <li className="flex items-start">
                          <span className="mr-2">•</span>
                          <span>Use DunnHumby audience data to target health-conscious shoppers on Kroger</span>
                        </li>
                        <li className="flex items-start">
                          <span className="mr-2">•</span>
                          <span>Implement cross-retailer audience strategy to maintain consistent messaging</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="text-xs text-center text-dashboard-secondaryText mt-6 pt-4 border-t border-dashboard-border">
          <p>Source: SimilarWeb & DunnHumby Audience Data • Metrics: Traffic Share, Engagement, ROAS, Audience Demographics</p>
        </div>
      </div>
    </div>
  );
};

export default RetailMediaBenchmarkingView;
