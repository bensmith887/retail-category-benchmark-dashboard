
import React from 'react';
import { Calendar, TrendingUp, ShoppingCart } from 'lucide-react';
import MetricsCard from '@/components/MetricsCard';
import { LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Line, Legend, ResponsiveContainer } from 'recharts';

interface TimingCalendarTabV2Props {
  monthlyElasticityData: any[];
  heatmapData: any[];
}

const TimingCalendarTabV2: React.FC<TimingCalendarTabV2Props> = ({ 
  monthlyElasticityData,
  heatmapData 
}) => {
  // Custom tooltip for the line chart
  const CustomLineChartTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-100">
          <p className="font-medium text-sm mb-1">{label}</p>
          {payload.map((entry: any, index: number) => (
            <div key={`tooltip-${index}`} className="flex items-center gap-2 text-sm">
              <div className="h-2 w-2 rounded-full" style={{ backgroundColor: entry.color }}></div>
              <span>{entry.name}: </span>
              <span className="font-medium">{entry.value}</span>
            </div>
          ))}
          <p className="text-xs text-gray-500 mt-1.5">
            Lower values indicate higher sensitivity
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <MetricsCard
          label="Best Month for Promotions"
          value="July"
          change="+72%"
          secondaryLabel="vs. Average Month"
          isPositive={true}
          icon={<Calendar className="text-dashboard-primary" />}
        />
        <MetricsCard
          label="Peak Sensitivity"
          value="-1.53"
          change="-0.75"
          secondaryLabel="vs. Annual Average"
          isPositive={true}
          icon={<TrendingUp className="text-dashboard-primary" />}
        />
        <MetricsCard
          label="Holiday Season Impact"
          value="+50%"
          change="+25%"
          secondaryLabel="Books vs. Baby Products"
          isPositive={true}
          icon={<ShoppingCart className="text-dashboard-primary" />}
        />
      </div>
      
      <div className="dashboard-card mb-6">
        <h3 className="text-lg font-medium text-dashboard-text mb-4">Monthly Promotional Sensitivity Trends</h3>
        <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg p-4" style={{ height: "300px" }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={monthlyElasticityData}
              margin={{ top: 10, right: 30, left: 20, bottom: 10 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f1f1" />
              <XAxis 
                dataKey="month" 
                axisLine={false} 
                tickLine={false}
              />
              <YAxis 
                axisLine={false} 
                tickLine={false}
                domain={[-1.6, 0]}
                tickFormatter={(value) => `${value}`}
              />
              <Tooltip content={<CustomLineChartTooltip />} />
              <Legend verticalAlign="top" height={36} />
              <Line 
                type="monotone" 
                dataKey="baby" 
                name="Baby Products"
                stroke="#5840bb" 
                strokeWidth={2.5}
                dot={{ stroke: '#5840bb', strokeWidth: 2, r: 4, fill: 'white' }}
                activeDot={{ r: 6, stroke: '#5840bb', strokeWidth: 1, fill: '#5840bb' }}
              />
              <Line 
                type="monotone" 
                dataKey="books" 
                name="Books"
                stroke="#6892e6" 
                strokeWidth={2.5}
                dot={{ stroke: '#6892e6', strokeWidth: 2, r: 4, fill: 'white' }}
                activeDot={{ r: 6, stroke: '#6892e6', strokeWidth: 1, fill: '#6892e6' }}
              />
              <Line 
                type="monotone" 
                dataKey="tools" 
                name="Tools"
                stroke="#22c55e" 
                strokeWidth={2.5}
                dot={{ stroke: '#22c55e', strokeWidth: 2, r: 4, fill: 'white' }}
                activeDot={{ r: 6, stroke: '#22c55e', strokeWidth: 1, fill: '#22c55e' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      <div className="dashboard-card">
        <h3 className="text-lg font-medium text-dashboard-text mb-4">Holiday Season Planning Tool</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg p-4 border border-dashboard-border">
            <h4 className="text-sm font-medium mb-2">Q4 Holiday Season</h4>
            <div className="space-y-2">
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-dashboard-text">Books Fiction</span>
                <span className="font-medium text-dashboard-primary">-0.93</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-dashboard-text">Books Children</span>
                <span className="font-medium text-dashboard-primary">-0.96</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-dashboard-text">Baby Diapers</span>
                <span className="font-medium text-dashboard-primary">-0.97</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-dashboard-text">Baby Toys</span>
                <span className="font-medium text-dashboard-primary">-0.74</span>
              </div>
            </div>
            <div className="mt-4 text-xs text-dashboard-secondaryText">
              <p>Recommended discount: 25-30%</p>
              <p>Start promotions early November</p>
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-4 border border-dashboard-border">
            <h4 className="text-sm font-medium mb-2">Summer Peak (July)</h4>
            <div className="space-y-2">
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-dashboard-text">Baby Feeding</span>
                <span className="font-medium text-dashboard-primary">-1.53</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-dashboard-text">Baby Strollers</span>
                <span className="font-medium text-dashboard-primary">-1.12</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-dashboard-text">Books Academic</span>
                <span className="font-medium text-dashboard-primary">-0.84</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-dashboard-text">Books Children</span>
                <span className="font-medium text-dashboard-primary">-0.92</span>
              </div>
            </div>
            <div className="mt-4 text-xs text-dashboard-secondaryText">
              <p>Recommended discount: 15-20%</p>
              <p>Focus on baby products especially</p>
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-4 border border-dashboard-border">
            <h4 className="text-sm font-medium mb-2">Off-Peak Strategy</h4>
            <div className="space-y-2">
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-dashboard-text">January</span>
                <span className="font-medium text-dashboard-text text-sm">Business Books</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-dashboard-text">February</span>
                <span className="font-medium text-dashboard-text text-sm">Baby Bath</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-dashboard-text">March</span>
                <span className="font-medium text-dashboard-text text-sm">Baby Furniture</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-dashboard-text">September</span>
                <span className="font-medium text-dashboard-text text-sm">Academic Books</span>
              </div>
            </div>
            <div className="mt-4 text-xs text-dashboard-secondaryText">
              <p>Use lower discounts (10-15%)</p>
              <p>Focus on targeted subcategories</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimingCalendarTabV2;
