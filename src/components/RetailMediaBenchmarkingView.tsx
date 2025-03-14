
import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell,
  LineChart, Line, Legend, AreaChart, Area, RadarChart, PolarGrid, 
  PolarAngleAxis, PolarRadiusAxis, Radar
} from 'recharts';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { retailMediaData } from '@/utils/data';
import { 
  ShoppingCart, Users, BarChart3, TrendingUp, Zap, Target,
  PieChart, LineChart as LineChartIcon, Share2, MousePointer
} from 'lucide-react';

const RetailMediaBenchmarkingView = () => {
  const [mainTab, setMainTab] = useState('overview');

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Retail Media Benchmarking</h2>
        <p className="text-muted-foreground">
          Comprehensive analysis of retail media performance across competitors, audience insights, and growth opportunities.
        </p>
      </div>

      <Tabs defaultValue="overview" className="space-y-4" onValueChange={setMainTab}>
        <TabsList className="grid w-full grid-cols-5 h-auto">
          <TabsTrigger value="overview" className="py-2 flex items-center gap-2">
            <BarChart3 size={16} />
            <span className="hidden sm:inline">Overview</span>
          </TabsTrigger>
          <TabsTrigger value="audience" className="py-2 flex items-center gap-2">
            <Users size={16} />
            <span className="hidden sm:inline">Audience</span>
          </TabsTrigger>
          <TabsTrigger value="campaign" className="py-2 flex items-center gap-2">
            <Target size={16} />
            <span className="hidden sm:inline">Campaign</span>
          </TabsTrigger>
          <TabsTrigger value="competitive" className="py-2 flex items-center gap-2">
            <Share2 size={16} />
            <span className="hidden sm:inline">Competitive</span>
          </TabsTrigger>
          <TabsTrigger value="growth" className="py-2 flex items-center gap-2">
            <TrendingUp size={16} />
            <span className="hidden sm:inline">Growth</span>
          </TabsTrigger>
        </TabsList>

        {/* Overview Section */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {retailMediaData.metrics.map((metric, index) => (
              <div key={index} className="dashboard-card p-4">
                <div className="flex flex-col">
                  <span className="text-sm text-dashboard-secondaryText">{metric.name}</span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold">{metric.value}</span>
                    <span className={`text-sm ${metric.change > 0 ? 'text-green-500' : 'text-red-500'}`}>
                      {metric.change > 0 ? '+' : ''}{metric.change}%
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="dashboard-card">
            <h3 className="text-lg font-medium mb-4">Retail Media Market Share</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={retailMediaData.marketShare}
                  margin={{ top: 20, right: 30, left: 20, bottom: 70 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis 
                    dataKey="retailer" 
                    angle={-45} 
                    textAnchor="end" 
                    height={70}
                  />
                  <YAxis tickFormatter={(value) => `${value}%`} />
                  <Tooltip 
                    formatter={(value) => [`${value}%`, 'Market Share']}
                    contentStyle={{ 
                      borderRadius: '6px', 
                      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
                      border: '1px solid #e5e7eb'
                    }}
                  />
                  <Bar dataKey="share" fill="#5840bb">
                    {retailMediaData.marketShare.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={entry.isOurRetailer ? '#5840bb' : '#6892e6'} 
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="dashboard-card">
              <h3 className="text-lg font-medium mb-4">YoY Traffic Trends</h3>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={retailMediaData.trafficTrends}
                    margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="month" />
                    <YAxis tickFormatter={(value) => `${value}M`} />
                    <Tooltip />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="thisYear" 
                      stroke="#5840bb" 
                      name="This Year"
                      strokeWidth={2}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="lastYear" 
                      stroke="#6892e6" 
                      name="Last Year"
                      strokeWidth={2}
                      strokeDasharray="5 5"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="dashboard-card">
              <h3 className="text-lg font-medium mb-4">Channel Performance</h3>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart 
                    cx="50%" 
                    cy="50%" 
                    outerRadius="70%" 
                    data={retailMediaData.channelPerformance}
                  >
                    <PolarGrid />
                    <PolarAngleAxis dataKey="channel" />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} />
                    <Radar 
                      name="Our Brand" 
                      dataKey="ourBrand" 
                      stroke="#5840bb" 
                      fill="#5840bb" 
                      fillOpacity={0.4} 
                    />
                    <Radar 
                      name="Top Competitor" 
                      dataKey="competitor" 
                      stroke="#6892e6" 
                      fill="#6892e6" 
                      fillOpacity={0.4} 
                    />
                    <Legend />
                    <Tooltip />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          <div className="dashboard-card">
            <h3 className="text-lg font-medium mb-4">Ad Spend by Category</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={retailMediaData.adSpendByCategory}
                  margin={{ top: 20, right: 30, left: 20, bottom: 70 }}
                  layout="vertical"
                >
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                  <XAxis type="number" tickFormatter={(value) => `$${value}M`} />
                  <YAxis 
                    type="category"
                    dataKey="category" 
                    width={150}
                  />
                  <Tooltip 
                    formatter={(value) => [`$${value}M`, 'Ad Spend']}
                  />
                  <Legend />
                  <Bar dataKey="ourBrand" name="Our Brand" fill="#5840bb" />
                  <Bar dataKey="competitor" name="Top Competitor" fill="#6892e6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </TabsContent>

        {/* Audience Insights Section */}
        <TabsContent value="audience" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="dashboard-card">
              <h3 className="text-lg font-medium mb-4">Demographic Comparison</h3>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={retailMediaData.demographics}
                    margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="ageGroup" />
                    <YAxis tickFormatter={(value) => `${value}%`} />
                    <Tooltip formatter={(value) => [`${value}%`, 'Audience Share']} />
                    <Legend />
                    <Bar dataKey="ourBrand" name="Our Brand" fill="#5840bb" />
                    <Bar dataKey="competitor" name="Top Competitor" fill="#6892e6" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="dashboard-card">
              <h3 className="text-lg font-medium mb-4">Shopping Behavior</h3>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart 
                    cx="50%" 
                    cy="50%" 
                    outerRadius="70%" 
                    data={retailMediaData.shoppingBehavior}
                  >
                    <PolarGrid />
                    <PolarAngleAxis dataKey="behavior" />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} />
                    <Radar 
                      name="Our Brand" 
                      dataKey="ourBrand" 
                      stroke="#5840bb" 
                      fill="#5840bb" 
                      fillOpacity={0.4} 
                    />
                    <Radar 
                      name="Industry Avg" 
                      dataKey="industryAvg" 
                      stroke="#6892e6" 
                      fill="#6892e6" 
                      fillOpacity={0.4} 
                    />
                    <Legend />
                    <Tooltip />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          <div className="dashboard-card">
            <h3 className="text-lg font-medium mb-4">Cross-Shopping Analysis</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={retailMediaData.crossShopping}
                  margin={{ top: 20, right: 30, left: 20, bottom: 70 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis 
                    dataKey="retailer" 
                    angle={-45} 
                    textAnchor="end" 
                    height={70}
                  />
                  <YAxis tickFormatter={(value) => `${value}%`} />
                  <Tooltip formatter={(value) => [`${value}%`, 'Audience Overlap']} />
                  <Bar dataKey="overlap" fill="#6892e6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="dashboard-card">
              <h3 className="text-lg font-medium mb-4">Loyalty Segments</h3>
              <div className="h-60">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Tooltip 
                      formatter={(value) => [`${value}%`, 'Share']}
                    />
                    <Legend layout="vertical" align="right" verticalAlign="middle" />
                    <pie 
                      data={retailMediaData.loyaltySegments} 
                      dataKey="value" 
                      nameKey="name" 
                      cx="50%" 
                      cy="50%" 
                      outerRadius={80} 
                      fill="#8884d8"
                    >
                      {retailMediaData.loyaltySegments.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="dashboard-card col-span-2">
              <h3 className="text-lg font-medium mb-4">New vs. Returning Customer Acquisition</h3>
              <div className="h-60">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={retailMediaData.customerAcquisition}
                    margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Area 
                      type="monotone" 
                      dataKey="new" 
                      stackId="1"
                      stroke="#5840bb" 
                      fill="#5840bb" 
                      name="New Customers"
                    />
                    <Area 
                      type="monotone" 
                      dataKey="returning" 
                      stackId="1"
                      stroke="#6892e6" 
                      fill="#6892e6" 
                      name="Returning Customers"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Campaign Performance Section */}
        <TabsContent value="campaign" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {retailMediaData.campaignMetrics.map((metric, index) => (
              <div key={index} className="dashboard-card p-4">
                <div className="flex flex-col">
                  <span className="text-sm text-dashboard-secondaryText">{metric.name}</span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold">{metric.value}</span>
                    <span className={`text-sm ${metric.change > 0 ? 'text-green-500' : 'text-red-500'}`}>
                      {metric.change > 0 ? '+' : ''}{metric.change}%
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="dashboard-card">
              <h3 className="text-lg font-medium mb-4">ROAS by Retailer</h3>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={retailMediaData.roasByRetailer}
                    margin={{ top: 20, right: 30, left: 20, bottom: 70 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis 
                      dataKey="retailer" 
                      angle={-45} 
                      textAnchor="end" 
                      height={70}
                    />
                    <YAxis domain={[0, 10]} />
                    <Tooltip formatter={(value) => [`${value}x`, 'ROAS']} />
                    <Bar dataKey="roas" fill="#5840bb">
                      {retailMediaData.roasByRetailer.map((entry, index) => (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={entry.isOurRetailer ? '#5840bb' : '#6892e6'} 
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="dashboard-card">
              <h3 className="text-lg font-medium mb-4">CTR by Ad Format</h3>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={retailMediaData.ctrByFormat}
                    margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                    layout="vertical"
                  >
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                    <XAxis type="number" tickFormatter={(value) => `${value}%`} />
                    <YAxis type="category" dataKey="format" width={150} />
                    <Tooltip formatter={(value) => [`${value}%`, 'CTR']} />
                    <Legend />
                    <Bar dataKey="ourBrand" name="Our Brand" fill="#5840bb" />
                    <Bar dataKey="industryAvg" name="Industry Avg" fill="#6892e6" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          <div className="dashboard-card">
            <h3 className="text-lg font-medium mb-4">Conversion Rates by Placement Type</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={retailMediaData.conversionRates}
                  margin={{ top: 20, right: 30, left: 20, bottom: 70 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis 
                    dataKey="placement" 
                    angle={-45} 
                    textAnchor="end" 
                    height={70}
                  />
                  <YAxis tickFormatter={(value) => `${value}%`} />
                  <Tooltip formatter={(value) => [`${value}%`, 'Conversion Rate']} />
                  <Legend />
                  <Bar dataKey="ourBrand" name="Our Brand" fill="#5840bb" />
                  <Bar dataKey="industryAvg" name="Industry Avg" fill="#6892e6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </TabsContent>

        {/* Competitive Intelligence Section */}
        <TabsContent value="competitive" className="space-y-6">
          <div className="dashboard-card">
            <h3 className="text-lg font-medium mb-4">Share of Voice</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={retailMediaData.shareOfVoice}
                  margin={{ top: 20, right: 30, left: 20, bottom: 70 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis 
                    dataKey="competitor" 
                    angle={-45} 
                    textAnchor="end" 
                    height={70}
                  />
                  <YAxis tickFormatter={(value) => `${value}%`} />
                  <Tooltip formatter={(value) => [`${value}%`, 'Share of Voice']} />
                  <Bar dataKey="share" fill="#6892e6">
                    {retailMediaData.shareOfVoice.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={entry.isOurBrand ? '#5840bb' : '#6892e6'} 
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="dashboard-card">
              <h3 className="text-lg font-medium mb-4">Media Mix Comparison</h3>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart 
                    cx="50%" 
                    cy="50%" 
                    outerRadius="70%" 
                    data={retailMediaData.mediaMix}
                  >
                    <PolarGrid />
                    <PolarAngleAxis dataKey="channel" />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} />
                    <Radar 
                      name="Our Brand" 
                      dataKey="ourBrand" 
                      stroke="#5840bb" 
                      fill="#5840bb" 
                      fillOpacity={0.4} 
                    />
                    <Radar 
                      name="Competitor Avg" 
                      dataKey="competitorAvg" 
                      stroke="#6892e6" 
                      fill="#6892e6" 
                      fillOpacity={0.4} 
                    />
                    <Legend />
                    <Tooltip />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="dashboard-card">
              <h3 className="text-lg font-medium mb-4">Keyword Performance</h3>
              <div className="h-72">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Keyword</TableHead>
                      <TableHead>Search Volume</TableHead>
                      <TableHead>Our Rank</TableHead>
                      <TableHead>Top Competitor</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {retailMediaData.keywordPerformance.map((keyword, i) => (
                      <TableRow key={i}>
                        <TableCell>{keyword.term}</TableCell>
                        <TableCell>{keyword.volume}</TableCell>
                        <TableCell>{keyword.ourRank}</TableCell>
                        <TableCell>{keyword.topCompetitorRank}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </div>

          <div className="dashboard-card">
            <h3 className="text-lg font-medium mb-4">Competitive Spend Analysis</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={retailMediaData.competitiveSpend}
                  margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="month" />
                  <YAxis tickFormatter={(value) => `$${value}K`} />
                  <Tooltip formatter={(value) => [`$${value}K`, 'Ad Spend']} />
                  <Legend />
                  <Area 
                    type="monotone" 
                    dataKey="ourBrand" 
                    stroke="#5840bb" 
                    fill="#5840bb" 
                    fillOpacity={0.4}
                    name="Our Brand"
                  />
                  <Area 
                    type="monotone" 
                    dataKey="competitor1" 
                    stroke="#6892e6" 
                    fill="#6892e6" 
                    fillOpacity={0.4}
                    name="Competitor 1"
                  />
                  <Area 
                    type="monotone" 
                    dataKey="competitor2" 
                    stroke="#94a3b8" 
                    fill="#94a3b8" 
                    fillOpacity={0.4}
                    name="Competitor 2"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </TabsContent>

        {/* Growth Opportunities Section */}
        <TabsContent value="growth" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="dashboard-card">
              <h3 className="text-lg font-medium mb-4">Untapped Audience Segments</h3>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={retailMediaData.untappedAudiences}
                    margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                    layout="vertical"
                  >
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                    <XAxis type="number" domain={[0, 100]} tickFormatter={(value) => `${value}%`} />
                    <YAxis type="category" dataKey="segment" width={150} />
                    <Tooltip formatter={(value) => [`${value}%`, 'Opportunity Score']} />
                    <Bar dataKey="score" fill="#5840bb" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="dashboard-card">
              <h3 className="text-lg font-medium mb-4">Channel Expansion Recommendations</h3>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={retailMediaData.channelRecommendations}
                    margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                    layout="vertical"
                  >
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                    <XAxis type="number" domain={[0, 10]} />
                    <YAxis type="category" dataKey="channel" width={150} />
                    <Tooltip formatter={(value) => [`${value}`, 'ROI Potential']} />
                    <Bar dataKey="potential" fill="#5840bb" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          <div className="dashboard-card">
            <h3 className="text-lg font-medium mb-4">Optimization Suggestions</h3>
            <div className="h-80 overflow-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Area</TableHead>
                    <TableHead>Current Performance</TableHead>
                    <TableHead>Benchmark</TableHead>
                    <TableHead>Opportunity</TableHead>
                    <TableHead>Potential Impact</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {retailMediaData.optimizationSuggestions.map((item, i) => (
                    <TableRow key={i}>
                      <TableCell>{item.area}</TableCell>
                      <TableCell>{item.current}</TableCell>
                      <TableCell>{item.benchmark}</TableCell>
                      <TableCell>{item.opportunity}</TableCell>
                      <TableCell className={`font-medium ${item.impact === 'High' ? 'text-green-600' : item.impact === 'Medium' ? 'text-amber-600' : 'text-blue-600'}`}>
                        {item.impact}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="dashboard-card">
              <h3 className="text-lg font-medium mb-4">Trend Forecasting</h3>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={retailMediaData.trendForecasting}
                    margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="historical" 
                      stroke="#6892e6" 
                      name="Historical" 
                      strokeWidth={2}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="forecast" 
                      stroke="#5840bb" 
                      name="Forecast" 
                      strokeWidth={2}
                      strokeDasharray="5 5"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="dashboard-card">
              <h3 className="text-lg font-medium mb-4">Budget Allocation Modeling</h3>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={retailMediaData.budgetAllocation}
                    margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="channel" />
                    <YAxis tickFormatter={(value) => `${value}%`} />
                    <Tooltip formatter={(value) => [`${value}%`, 'Budget Share']} />
                    <Legend />
                    <Bar dataKey="current" name="Current Allocation" fill="#6892e6" />
                    <Bar dataKey="recommended" name="Recommended" fill="#5840bb" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      <div className="text-xs text-dashboard-secondaryText mt-6 text-center">
        <p>Data sources: SimilarWeb Shopper Intelligence, SimilarWeb Web Intelligence, DunnHumby Audience Data</p>
        <p className="mt-1">Last updated: September 30, 2023</p>
      </div>
    </div>
  );
};

export default RetailMediaBenchmarkingView;
