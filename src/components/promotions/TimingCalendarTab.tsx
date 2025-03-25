
import React from 'react';
import { Calendar, TrendingUp, ShoppingCart } from 'lucide-react';
import MetricsCard from '@/components/MetricsCard';
import { ScatterChart, LineChart, CartesianGrid, XAxis, YAxis, ZAxis, Tooltip, Scatter, Line, Legend, Rectangle, ResponsiveContainer } from 'recharts';

interface TimingCalendarTabProps {
  monthlySensitivityData: any[];
  heatmapData: any[];
}

const TimingCalendarTab: React.FC<TimingCalendarTabProps> = ({ 
  monthlySensitivityData,
  heatmapData 
}) => {
  // Custom tooltip for the heatmap
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-md shadow-md">
          <p className="font-medium">{data.category}</p>
          <p className="text-sm text-gray-600">{data.month}</p>
          <p className="text-sm font-semibold mt-1">
            Sensitivity: <span className={data.value <= -1.0 ? 'text-red-500' : 'text-amber-500'}>{data.value.toFixed(2)}</span>
          </p>
          <p className="text-xs text-gray-500 mt-1">
            {data.value <= -1.0 
              ? 'Highly responsive to promotions' 
              : 'Moderately responsive to promotions'}
          </p>
        </div>
      );
    }
    return null;
  };

  // Custom dot for the scatter plot
  const renderCustomizedPoint = (props: any) => {
    const { cx, cy, value } = props;
    
    // Determine color based on value
    let fillColor = '#22c55e'; // Green for low sensitivity
    if (value <= -1.5) fillColor = '#ef4444'; // Red for very high sensitivity
    else if (value <= -1.0) fillColor = '#f97316'; // Orange for high sensitivity
    else if (value <= -0.5) fillColor = '#facc15'; // Yellow for medium sensitivity
    
    // Size also based on value - bigger for higher sensitivity
    const size = Math.min(Math.abs(value) * 5, 12);
    
    return (
      <circle 
        cx={cx} 
        cy={cy} 
        r={size} 
        fill={fillColor} 
        stroke="#fff"
        strokeWidth={1}
        opacity={0.8}
      />
    );
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
        <h3 className="text-lg font-medium text-dashboard-text mb-4">Promotional Sensitivity Heat Map</h3>
        <p className="text-sm text-dashboard-secondaryText mb-4">
          Shows how different product categories respond to promotions across months. Darker colors indicate higher price sensitivity, meaning stronger sales response to discounts.
        </p>
        <div style={{ height: "350px" }}>
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart
              margin={{ top: 20, right: 40, bottom: 20, left: 40 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis 
                type="category" 
                dataKey="month" 
                name="Month" 
                allowDuplicatedCategory={false} 
                padding={{ left: 20, right: 20 }}
              />
              <YAxis 
                type="category" 
                dataKey="category" 
                name="Category" 
                allowDuplicatedCategory={false}
                reversed={true}
              />
              <ZAxis 
                type="number" 
                dataKey="value" 
                range={[50, 400]} 
                name="Sensitivity" 
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Scatter 
                name="Price Sensitivity" 
                data={heatmapData} 
                fill="#8884d8"
                shape={renderCustomizedPoint}
              />
            </ScatterChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-3 flex justify-center">
          <div className="flex items-center text-xs space-x-6">
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-ef4444 mr-1"></div>
              <span>Very High Sensitivity (&lt;= -1.5)</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-f97316 mr-1"></div>
              <span>High Sensitivity (&lt;= -1.0)</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-facc15 mr-1"></div>
              <span>Medium Sensitivity (&lt;= -0.5)</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-22c55e mr-1"></div>
              <span>Low Sensitivity (&gt; -0.5)</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="dashboard-card mb-6">
        <h3 className="text-lg font-medium text-dashboard-text mb-4">Monthly Sensitivity Trends</h3>
        <p className="text-sm text-dashboard-secondaryText mb-4">
          Shows how price sensitivity changes throughout the year. More negative values indicate higher responsiveness to promotions.
        </p>
        <div style={{ height: "300px" }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={monthlySensitivityData}
              margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis 
                dataKey="month" 
                axisLine={false} 
                tickLine={false}
              />
              <YAxis 
                axisLine={false} 
                tickLine={false}
                domain={[-2, 0]}
                allowDataOverflow={true}
              />
              <Tooltip 
                formatter={(value: number) => [`${value.toFixed(2)}`, 'Sensitivity']}
                contentStyle={{ 
                  borderRadius: '6px', 
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
                  border: '1px solid #e5e7eb'
                }}
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="baby" 
                name="Baby Products" 
                stroke="#5840bb" 
                strokeWidth={2}
                activeDot={{ r: 6 }}
              />
              <Line 
                type="monotone" 
                dataKey="books" 
                name="Books" 
                stroke="#6892e6" 
                strokeWidth={2}
                activeDot={{ r: 6 }}
              />
              <Line 
                type="monotone" 
                dataKey="tools" 
                name="Tools & Home" 
                stroke="#22c55e" 
                strokeWidth={2}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default TimingCalendarTab;
