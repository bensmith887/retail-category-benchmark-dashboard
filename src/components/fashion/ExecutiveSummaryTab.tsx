
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowUp, ArrowDown, Zap, Target, TrendingUp, Award, AlertTriangle } from 'lucide-react';
import { KPIData, Opportunity } from '@/utils/fashionAnalyticsData';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { cn } from '@/lib/utils';

interface ExecutiveSummaryTabProps {
  kpis: KPIData[];
  opportunities: Opportunity[];
  monthlyVisitData: any[];
  segmentShare: any[];
}

const ExecutiveSummaryTab: React.FC<ExecutiveSummaryTabProps> = ({ 
  kpis, 
  opportunities,
  monthlyVisitData,
  segmentShare
}) => {
  const getArrow = (current: number, previous: number) => {
    return current > previous ? (
      <ArrowUp className="w-4 h-4 text-green-500" />
    ) : (
      <ArrowDown className="w-4 h-4 text-red-500" />
    );
  };

  const getPercentChange = (current: number, previous: number) => {
    const change = ((current - previous) / previous) * 100;
    return change.toFixed(1) + '%';
  };
  
  const getImpactIcon = (impact: 'high' | 'medium' | 'low') => {
    if (impact === 'high') {
      return <Zap className="w-5 h-5 text-yellow-500" />;
    } else if (impact === 'medium') {
      return <Target className="w-5 h-5 text-blue-500" />;
    } else {
      return <TrendingUp className="w-5 h-5 text-purple-500" />;
    }
  };
  
  const getCategoryIcon = (category: 'traffic' | 'conversion' | 'market' | 'engagement') => {
    switch (category) {
      case 'traffic':
        return <TrendingUp className="w-4 h-4 text-blue-500" />;
      case 'conversion':
        return <Zap className="w-4 h-4 text-purple-500" />;
      case 'market':
        return <Award className="w-4 h-4 text-green-500" />;
      case 'engagement':
        return <AlertTriangle className="w-4 h-4 text-orange-500" />;
      default:
        return <TrendingUp className="w-4 h-4 text-blue-500" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpis.map((kpi, index) => {
          const isPositive = kpi.value > kpi.previousValue;
          const percentChange = getPercentChange(kpi.value, kpi.previousValue);
          const progress = (kpi.target ? (kpi.value / kpi.target) * 100 : 0).toFixed(0);
          
          return (
            <Card key={index} className="overflow-hidden">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-semibold">{kpi.metric}</CardTitle>
                <CardDescription className="flex items-center text-xs space-x-1">
                  {getArrow(kpi.value, kpi.previousValue)}
                  <span className={isPositive ? "text-green-500" : "text-red-500"}>
                    {isPositive ? "+" : ""}{percentChange}
                  </span>
                  <span className="text-gray-500">vs previous period</span>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {kpi.unit === '$' ? `${kpi.unit}${kpi.value.toLocaleString()}` : 
                   kpi.unit === '%' ? `${kpi.value}${kpi.unit}` :
                   kpi.value.toLocaleString()}
                </div>
                {kpi.target && (
                  <div className="mt-2">
                    <div className="flex justify-between text-xs text-gray-500 mb-1">
                      <span>Progress to target</span>
                      <span>{progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={cn(
                          "h-2 rounded-full", 
                          Number(progress) >= 100 ? "bg-green-500" : 
                          Number(progress) >= 75 ? "bg-blue-500" : 
                          Number(progress) >= 50 ? "bg-yellow-500" : "bg-red-500"
                        )}
                        style={{ width: `${Math.min(Number(progress), 100)}%` }}
                      ></div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Traffic Trends</CardTitle>
            <CardDescription>Monthly visits over the last 12 months</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyVisitData}>
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
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Segment Share</CardTitle>
            <CardDescription>Distribution by product segment</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  layout="vertical"
                  data={segmentShare}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="segment" type="category" width={100} />
                  <Tooltip formatter={(value: number) => [`${value.toFixed(1)}%`, "Share"]} />
                  <Bar dataKey="share" fill="#8884d8" name="Current Share %" />
                  <Bar dataKey="previousShare" fill="#82ca9d" name="Previous Share %" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <h3 className="text-xl font-semibold mt-8 mb-4">Priority Opportunities</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {opportunities
          .filter(opp => opp.impact === 'high')
          .map((opportunity, index) => {
            const isPositive = opportunity.change > 0;
            const isPositiveMetric = 
              opportunity.category === 'market' || 
              (opportunity.category === 'traffic' && opportunity.title.toLowerCase().includes('opportunity'));
            
            return (
              <Card key={index} className="relative overflow-hidden">
                <div className="absolute top-0 right-0 p-2">
                  {getImpactIcon(opportunity.impact)}
                </div>
                <CardHeader className="pb-2">
                  <div className="flex items-center space-x-2">
                    {getCategoryIcon(opportunity.category)}
                    <CardTitle className="text-base font-medium">{opportunity.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-gray-600">{opportunity.description}</p>
                  <div className="flex items-center space-x-2 text-sm font-medium">
                    <span>Change:</span>
                    <span className={cn(
                      (isPositive === isPositiveMetric) ? "text-green-500" : "text-red-500"
                    )}>
                      {isPositive ? "+" : ""}{opportunity.change}%
                    </span>
                  </div>
                  <div className="pt-2 border-t border-gray-100">
                    <h4 className="text-sm font-semibold mb-1">Recommendation:</h4>
                    <p className="text-sm text-gray-600">{opportunity.recommendation}</p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
      </div>
    </div>
  );
};

export default ExecutiveSummaryTab;
