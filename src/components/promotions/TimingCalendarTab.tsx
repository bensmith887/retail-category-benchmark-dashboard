
import React from 'react';
import { Calendar, TrendingUp, ShoppingCart } from 'lucide-react';
import MetricsCard from '@/components/MetricsCard';
import { ScatterChart, LineChart, CartesianGrid, XAxis, YAxis, ZAxis, Tooltip, Scatter, Line, Legend, Rectangle, ResponsiveContainer } from 'recharts';

interface TimingCalendarTabProps {
  monthlyElasticityData: any[];
  heatmapData: any[];
}

const TimingCalendarTab: React.FC<TimingCalendarTabProps> = ({ 
  monthlyElasticityData,
  heatmapData 
}) => {
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
          label="Peak Elasticity"
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
        <div style={{ height: "350px" }}>
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart
              margin={{ top: 20, right: 20, bottom: 70, left: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis 
                dataKey="month" 
                name="Month" 
                type="category"
                axisLine={false}
                tickLine={false}
              />
              <YAxis 
                dataKey="category" 
                name="Category" 
                type="category" 
                width={80}
                axisLine={false}
                tickLine={false}
              />
              <ZAxis
                dataKey="value"
                range={[100, 1000]}
                name="Elasticity"
              />
              <Tooltip 
                cursor={{ strokeDasharray: '3 3' }}
                formatter={(value, name) => [`Elasticity: ${value.toFixed(2)}`, name]}
                contentStyle={{ 
                  borderRadius: '6px', 
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
                  border: '1px solid #e5e7eb'
                }}
              />
              <Scatter 
                data={heatmapData} 
                fill="#5840bb"
                shape={(props) => {
                  const { cx, cy, width, height, value } = props;
                  const opacity = Math.min(value * 0.8, 0.9);
                  return (
                    <Rectangle
                      x={cx - width / 2}
                      y={cy - height / 2}
                      width={width}
                      height={height}
                      fill={`rgba(88, 64, 187, ${opacity})`}
                      strokeWidth={0}
                    />
                  );
                }}
              />
            </ScatterChart>
          </ResponsiveContainer>
        </div>
        <div className="text-xs text-dashboard-secondaryText mt-2">
          Darker color indicates higher promotional sensitivity (stronger elasticity)
        </div>
      </div>
      
      <div className="dashboard-card mb-6">
        <h3 className="text-lg font-medium text-dashboard-text mb-4">Monthly Promotional Elasticity Trends</h3>
        <div style={{ height: "300px" }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={monthlyElasticityData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
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
              <Tooltip 
                formatter={(value) => [`${value}`, 'Elasticity']}
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
                dot={false}
                activeDot={{ r: 6 }}
              />
              <Line 
                type="monotone" 
                dataKey="books" 
                name="Books"
                stroke="#6892e6" 
                strokeWidth={2}
                dot={false}
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
