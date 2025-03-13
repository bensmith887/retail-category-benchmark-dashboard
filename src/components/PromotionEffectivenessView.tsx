
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { dailyTrafficData, conversionRateBenchmarkData, competitorCampaignAds } from '@/utils/data';
import { BarChart3, TrendingUp, Target } from 'lucide-react';

const PromotionEffectivenessView = () => {
  // Format date to display only day and month
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return `${date.getMonth() + 1}/${date.getDate()}`;
  };

  // Add formatted date to traffic data
  const formattedTrafficData = dailyTrafficData.map(item => ({
    ...item,
    formattedDate: formatDate(item.date)
  }));

  return (
    <div className="animate-fade-in">
      <h2 className="text-2xl font-semibold text-dashboard-text mb-6">Promotion Effectiveness</h2>
      
      {/* Summary Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-base font-medium">Daily Traffic</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">11,350</div>
            <p className="text-xs text-muted-foreground">+18.2% from last week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-base font-medium">Traffic Share</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">52.8%</div>
            <p className="text-xs text-muted-foreground">+4.3% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-base font-medium">Conversion Rate</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3.8%</div>
            <p className="text-xs text-muted-foreground">+0.6% above industry average</p>
          </CardContent>
        </Card>
      </div>
      
      {/* Daily Traffic Chart */}
      <div className="dashboard-card mb-6">
        <h3 className="text-lg font-medium text-dashboard-text mb-4">Daily Traffic Trend</h3>
        <div style={{ height: "300px" }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={formattedTrafficData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f1f1" />
              <XAxis 
                dataKey="formattedDate" 
                axisLine={false} 
                tickLine={false}
              />
              <YAxis 
                axisLine={false} 
                tickLine={false}
                domain={['auto', 'auto']}
              />
              <Tooltip 
                formatter={(value: number) => [`${value.toLocaleString()}`, undefined]}
                labelFormatter={(label) => `Date: ${label}`}
                contentStyle={{ 
                  borderRadius: '6px', 
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
                  border: '1px solid #e5e7eb'
                }}
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="yourTraffic" 
                name="Your Brand"
                stroke="#5840bb" 
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 6 }}
              />
              <Line 
                type="monotone" 
                dataKey="competitorTraffic" 
                name="Main Competitor"
                stroke="#6892e6" 
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      {/* Traffic Share Chart */}
      <div className="dashboard-card mb-6">
        <h3 className="text-lg font-medium text-dashboard-text mb-4">Traffic Share</h3>
        <div style={{ height: "300px" }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={formattedTrafficData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f1f1" />
              <XAxis 
                dataKey="formattedDate" 
                axisLine={false} 
                tickLine={false}
              />
              <YAxis 
                axisLine={false} 
                tickLine={false}
                domain={[40, 60]}
                tickFormatter={(value) => `${value}%`} 
              />
              <Tooltip 
                formatter={(value: number) => [`${value.toFixed(1)}%`, undefined]}
                labelFormatter={(label) => `Date: ${label}`}
                contentStyle={{ 
                  borderRadius: '6px', 
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
                  border: '1px solid #e5e7eb'
                }}
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="yourShare" 
                name="Your Brand"
                stroke="#5840bb" 
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 6 }}
              />
              <Line 
                type="monotone" 
                dataKey="competitorShare" 
                name="Main Competitor"
                stroke="#6892e6" 
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      {/* Conversion Rate Benchmarks */}
      <div className="dashboard-card mb-6">
        <h3 className="text-lg font-medium text-dashboard-text mb-4">Conversion Rate Benchmarks</h3>
        <div style={{ height: "300px" }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={conversionRateBenchmarkData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f1f1" />
              <XAxis 
                dataKey="name" 
                axisLine={false} 
                tickLine={false}
              />
              <YAxis 
                axisLine={false} 
                tickLine={false}
                tickFormatter={(value) => `${value}%`}
              />
              <Tooltip 
                formatter={(value: number) => [`${value}%`, 'Conversion Rate']}
                contentStyle={{ 
                  borderRadius: '6px', 
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
                  border: '1px solid #e5e7eb'
                }}
              />
              <Bar 
                dataKey="rate" 
                fill="#6892e6" 
                radius={[4, 4, 0, 0]}
                className="cursor-pointer"
              >
                {
                  conversionRateBenchmarkData.map((entry, index) => (
                    <Bar 
                      key={`cell-${index}`} 
                      dataKey="rate" 
                      fill={entry.name === 'Your Brand' ? '#5840bb' : '#6892e6'} 
                    />
                  ))
                }
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      {/* Competitor Campaign Display Ads */}
      <div className="dashboard-card mb-6">
        <h3 className="text-lg font-medium text-dashboard-text mb-4">Competitor Campaign Display Ads</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-dashboard-border bg-gray-50">
                <th className="px-4 py-3 text-left font-medium text-dashboard-secondaryText">Competitor</th>
                <th className="px-4 py-3 text-left font-medium text-dashboard-secondaryText">Headline</th>
                <th className="px-4 py-3 text-left font-medium text-dashboard-secondaryText">Description</th>
                <th className="px-4 py-3 text-right font-medium text-dashboard-secondaryText">Impressions</th>
                <th className="px-4 py-3 text-right font-medium text-dashboard-secondaryText">Clicks</th>
                <th className="px-4 py-3 text-right font-medium text-dashboard-secondaryText">CTR</th>
                <th className="px-4 py-3 text-left font-medium text-dashboard-secondaryText">Date Range</th>
              </tr>
            </thead>
            <tbody>
              {competitorCampaignAds.map((ad) => (
                <tr key={ad.id} className="border-b border-dashboard-border hover:bg-gray-50">
                  <td className="px-4 py-3 text-dashboard-text">{ad.competitor}</td>
                  <td className="px-4 py-3 text-dashboard-text font-medium">{ad.headline}</td>
                  <td className="px-4 py-3 text-dashboard-secondaryText">{ad.description}</td>
                  <td className="px-4 py-3 text-right text-dashboard-text">{ad.impressions.toLocaleString()}</td>
                  <td className="px-4 py-3 text-right text-dashboard-text">{ad.clicks.toLocaleString()}</td>
                  <td className="px-4 py-3 text-right text-dashboard-text">{ad.ctr}%</td>
                  <td className="px-4 py-3 text-dashboard-secondaryText">
                    {formatDate(ad.startDate)} - {formatDate(ad.endDate)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PromotionEffectivenessView;
