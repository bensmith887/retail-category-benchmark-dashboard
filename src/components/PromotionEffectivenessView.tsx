
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { dailyTrafficData, conversionRateBenchmarkData, insightData } from '@/utils/data';
import { BarChart3, TrendingUp, Calendar as CalendarIcon, Activity, Zap, TrendingDown } from 'lucide-react';
import InsightCard from './InsightCard';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

const PromotionEffectivenessView = () => {
  const [timeframeFilter, setTimeframeFilter] = useState('daily');
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [dateType, setDateType] = useState<'start' | 'end'>('start');
  
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

  // New retail and CPG insights based on traffic share data
  const retailCpgInsights = [
    {
      title: "Promotional Effectiveness",
      description: "Promotions on Tuesdays and Wednesdays yield 23% higher traffic share compared to weekends.",
      icon: <Zap className="h-5 w-5 text-amber-500" />,
    },
    {
      title: "Competitor Activity Pattern",
      description: "Main competitor consistently launches campaigns on Mondays, creating an opportunity to counter-program on Wednesdays.",
      icon: <Activity className="h-5 w-5 text-blue-500" />,
    },
    {
      title: "Traffic Surge Opportunity",
      description: "Mid-month (15th-20th) shows 31% higher responsiveness to promotions than early month periods.",
      icon: <TrendingUp className="h-5 w-5 text-green-500" />,
    },
    {
      title: "Seasonal Pattern Alert",
      description: "Traffic share volatility increases by 42% during seasonal transitions, requiring more aggressive promotional strategies.",
      icon: <TrendingDown className="h-5 w-5 text-red-500" />,
    }
  ];

  return (
    <div className="animate-fade-in">
      <h2 className="text-2xl font-semibold text-dashboard-text mb-4">Promotion Effectiveness</h2>
      
      {/* Sub-filter for time period with date picker */}
      <div className="mb-6">
        <div className="flex justify-between items-center">
          <Tabs defaultValue={timeframeFilter} onValueChange={setTimeframeFilter} className="w-auto">
            <TabsList className="mb-2 bg-white">
              <TabsTrigger value="daily">Daily</TabsTrigger>
              <TabsTrigger value="weekly">Weekly</TabsTrigger>
              <TabsTrigger value="monthly">Monthly</TabsTrigger>
            </TabsList>
          </Tabs>
          
          <div className="flex items-center space-x-2">
            <div>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-[180px] justify-start text-left text-sm font-normal",
                      !startDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {startDate ? format(startDate, "MMM dd, yyyy") : <span>Start date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={startDate}
                    onSelect={(date) => setStartDate(date || new Date())}
                    initialFocus
                    className="p-3 pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            <span className="text-sm">to</span>
            
            <div>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-[180px] justify-start text-left text-sm font-normal",
                      !endDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {endDate ? format(endDate, "MMM dd, yyyy") : <span>End date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={endDate}
                    onSelect={(date) => setEndDate(date || new Date())}
                    initialFocus
                    className="p-3 pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            <Button variant="secondary" size="sm">Apply</Button>
          </div>
        </div>
      </div>
      
      {/* Summary Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-base font-medium">Daily Traffic</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">11,350</div>
            <p className="text-xs text-muted-foreground mt-1">MoM: +18.2%</p>
            <p className="text-xs text-muted-foreground">vs Category Avg: +12.5%</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-base font-medium">Traffic Share</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">52.8%</div>
            <p className="text-xs text-muted-foreground mt-1">MoM: +4.3%</p>
            <p className="text-xs text-muted-foreground">vs Category Avg: +8.4%</p>
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
      
      {/* Retail & CPG Insights Based on Traffic Share Data */}
      <div className="mb-6">
        <h3 className="text-lg font-medium text-dashboard-text mb-4">Traffic Share Insights for Retail & CPG</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {retailCpgInsights.map((insight, index) => (
            <Card key={index} className="border-l-4 border-dashboard-primary hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center gap-2 pb-2">
                {insight.icon}
                <CardTitle className="text-base font-medium">{insight.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-dashboard-secondaryText">{insight.description}</p>
                <div className="mt-2">
                  <Button variant="ghost" size="sm" className="text-xs text-dashboard-primary p-0 h-auto">
                    View detailed analysis
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      
      {/* Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {insightData.map((insight, index) => (
          <InsightCard
            key={index}
            title={insight.title}
            description={insight.description}
            type={insight.type as "opportunity" | "threat" | "positive" | "recommendation"}
          />
        ))}
      </div>
      
      {/* Subfooter */}
      <div className="text-xs text-center text-dashboard-secondaryText mt-6 pt-4 border-t border-dashboard-border">
        <p>Source: SimilarWeb • Metrics: Traffic, Campaign Performance</p>
      </div>
    </div>
  );
};

export default PromotionEffectivenessView;
