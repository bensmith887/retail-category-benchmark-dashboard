
import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { TrendingUp, TrendingDown, ArrowUpRight, Info } from 'lucide-react';

const COLORS = ['#5840bb', '#6892e6', '#fa9f42', '#00bc8c', '#f06292'];

// Marketing channel data
const channelData = [
  { name: 'Organic Search', value: 38, yoy: 5.2, roi: 3.2 },
  { name: 'Direct', value: 22, yoy: 3.8, roi: 2.8 },
  { name: 'Social Media', value: 18, yoy: 12.5, roi: 2.1 },
  { name: 'Email', value: 12, yoy: 8.7, roi: 4.5 },
  { name: 'Paid Search', value: 10, yoy: -2.1, roi: 1.8 }
];

// Monthly trend data
const monthlyTrendData = [
  { month: 'Jan', organic: 35, social: 15, email: 10, direct: 21, paid: 11 },
  { month: 'Feb', organic: 36, social: 16, email: 11, direct: 22, paid: 10 },
  { month: 'Mar', organic: 37, social: 17, email: 11, direct: 22, paid: 10 },
  { month: 'Apr', organic: 37, social: 17, email: 12, direct: 22, paid: 10 },
  { month: 'May', organic: 38, social: 18, email: 12, direct: 22, paid: 10 },
  { month: 'Jun', organic: 38, social: 18, email: 12, direct: 22, paid: 10 }
];

// Social media platform data
const socialPlatformData = [
  { name: 'Instagram', value: 42, yoy: 15.3 },
  { name: 'Facebook', value: 28, yoy: -3.2 },
  { name: 'TikTok', value: 15, yoy: 25.4 },
  { name: 'Pinterest', value: 10, yoy: 9.1 },
  { name: 'Twitter', value: 5, yoy: -1.8 }
];

// ROI by channel data
const roiData = [
  { name: 'Email', value: 4.5 },
  { name: 'Organic Search', value: 3.2 },
  { name: 'Direct', value: 2.8 },
  { name: 'Social Media', value: 2.1 },
  { name: 'Paid Search', value: 1.8 }
].sort((a, b) => b.value - a.value);

// Competitor channel comparison
const competitorComparisonData = [
  { channel: 'Organic Search', yourbrand: 38, competitor1: 35, competitor2: 42 },
  { channel: 'Direct', yourbrand: 22, competitor1: 25, competitor2: 18 },
  { channel: 'Social Media', yourbrand: 18, competitor1: 22, competitor2: 24 },
  { channel: 'Email', yourbrand: 12, competitor1: 8, competitor2: 6 },
  { channel: 'Paid Search', yourbrand: 10, competitor1: 10, competitor2: 10 }
];

// Campaign effectiveness data
const campaignData = [
  { name: 'Summer Collection', conversion: 3.2, ctr: 2.8, roas: 3.5 },
  { name: 'Flash Sale', conversion: 4.5, ctr: 3.7, roas: 4.2 },
  { name: 'New Arrivals', conversion: 2.8, ctr: 2.1, roas: 2.9 },
  { name: 'Holiday Special', conversion: 3.8, ctr: 3.2, roas: 3.6 },
  { name: 'Clearance', conversion: 3.5, ctr: 2.9, roas: 3.1 }
];

const MarketingChannelTab = () => {
  const [timeframe, setTimeframe] = useState('6m');
  const [segment, setSegment] = useState('all');

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-gray-800">Marketing Channel Analysis</h2>
        <div className="flex space-x-2">
          <Select value={timeframe} onValueChange={setTimeframe}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Timeframe" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="3m">Last 3 Months</SelectItem>
              <SelectItem value="6m">Last 6 Months</SelectItem>
              <SelectItem value="12m">Last 12 Months</SelectItem>
            </SelectContent>
          </Select>
          <Select value={segment} onValueChange={setSegment}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Segment" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Segments</SelectItem>
              <SelectItem value="womens">Women's Fashion</SelectItem>
              <SelectItem value="mens">Men's Fashion</SelectItem>
              <SelectItem value="accessories">Accessories</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {channelData.map((channel, index) => (
          <Card key={index} className="shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">{channel.name}</CardTitle>
              <CardDescription>
                Traffic Share: <span className="font-medium">{channel.value}%</span>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-1">
                  <span className={channel.yoy >= 0 ? "text-green-600" : "text-red-500"}>
                    {channel.yoy >= 0 ? (
                      <TrendingUp className="h-4 w-4" />
                    ) : (
                      <TrendingDown className="h-4 w-4" />
                    )}
                  </span>
                  <span className={`text-sm font-medium ${channel.yoy >= 0 ? "text-green-600" : "text-red-500"}`}>
                    {channel.yoy > 0 ? "+" : ""}{channel.yoy}% YoY
                  </span>
                </div>
                <div className="text-sm">
                  <span className="text-gray-500">ROI:</span> {channel.roi}x
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Channel Traffic Distribution</CardTitle>
            <CardDescription>
              Breakdown of traffic sources over time
            </CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={channelData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {channelData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Channel Trend Analysis</CardTitle>
            <CardDescription>
              6-month traffic source trend comparison
            </CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyTrendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="organic" stroke="#5840bb" name="Organic" />
                <Line type="monotone" dataKey="social" stroke="#6892e6" name="Social" />
                <Line type="monotone" dataKey="email" stroke="#fa9f42" name="Email" />
                <Line type="monotone" dataKey="direct" stroke="#00bc8c" name="Direct" />
                <Line type="monotone" dataKey="paid" stroke="#f06292" name="Paid" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Social Media Platform Breakdown</CardTitle>
            <CardDescription>
              Distribution of social traffic by platform
            </CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={socialPlatformData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#6892e6" name="Traffic Share %" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Marketing ROI by Channel</CardTitle>
            <CardDescription>
              Return on investment for each marketing channel
            </CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={roiData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" />
                <Tooltip />
                <Bar dataKey="value" fill="#5840bb" name="ROI (x)" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle>Competitive Channel Analysis</CardTitle>
          <CardDescription>
            Channel traffic distribution compared to top competitors
          </CardDescription>
        </CardHeader>
        <CardContent className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={competitorComparisonData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="channel" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="yourbrand" fill="#5840bb" name="Your Brand" />
              <Bar dataKey="competitor1" fill="#6892e6" name="Competitor 1" />
              <Bar dataKey="competitor2" fill="#fa9f42" name="Competitor 2" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div>
            <CardTitle>Campaign Performance</CardTitle>
            <CardDescription>
              Conversion rates and ROAS by campaign
            </CardDescription>
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <Info className="h-4 w-4 mr-1" />
            Last 30 days
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            {campaignData.map((campaign, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="font-medium">{campaign.name}</div>
                  <div className="flex items-center space-x-2">
                    <div className="text-sm text-muted-foreground">ROAS:</div>
                    <div className="font-medium text-green-600">{campaign.roas}x</div>
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <div>Conversion Rate: {campaign.conversion}%</div>
                  <div>CTR: {campaign.ctr}%</div>
                </div>
                <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-dashboard-primary to-dashboard-secondary"
                    style={{ width: `${campaign.conversion * 15}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Action Recommendations</CardTitle>
            <CardDescription>
              Priority actions based on channel performance
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <ArrowUpRight className="h-5 w-5 text-green-600 mt-0.5" />
                <div>
                  <h4 className="font-medium">Increase TikTok content frequency</h4>
                  <p className="text-sm text-muted-foreground">
                    25.4% YoY growth with potential for higher ROI with increased investment.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <ArrowUpRight className="h-5 w-5 text-green-600 mt-0.5" />
                <div>
                  <h4 className="font-medium">Expand email marketing campaigns</h4>
                  <p className="text-sm text-muted-foreground">
                    Highest ROI channel (4.5x) with 8.7% YoY growth. Consider increasing frequency.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <ArrowUpRight className="h-5 w-5 text-green-600 mt-0.5" />
                <div>
                  <h4 className="font-medium">Optimize paid search keywords</h4>
                  <p className="text-sm text-muted-foreground">
                    Declining YoY performance (-2.1%) with lowest ROI (1.8x). Review keyword strategy.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Channel Opportunity Metrics</CardTitle>
            <CardDescription>
              Potential growth areas based on competitive analysis
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Social Media Gap</span>
                  <span className="text-sm text-muted-foreground">-6% vs. Competitor 2</span>
                </div>
                <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-red-400" style={{ width: '75%' }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Email Advantage</span>
                  <span className="text-sm text-muted-foreground">+4% vs. Competitors</span>
                </div>
                <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-green-400" style={{ width: '62%' }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Organic Search</span>
                  <span className="text-sm text-muted-foreground">-4% vs. Competitor 2</span>
                </div>
                <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-amber-400" style={{ width: '90%' }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Direct Traffic</span>
                  <span className="text-sm text-muted-foreground">-3% vs. Competitor 1</span>
                </div>
                <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-amber-400" style={{ width: '88%' }} />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MarketingChannelTab;
