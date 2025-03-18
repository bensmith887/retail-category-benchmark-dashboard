
import React from 'react';
import { Calendar, TrendingUp, ShoppingCart } from 'lucide-react';
import MetricsCard from '@/components/MetricsCard';
import { ScatterChart, LineChart, CartesianGrid, XAxis, YAxis, ZAxis, Tooltip, Scatter, Line, Legend, Rectangle, ResponsiveContainer } from 'recharts';

interface TimingCalendarTabV2Props {
  monthlyElasticityData: any[];
  heatmapData: any[];
}

const TimingCalendarTabV2: React.FC<TimingCalendarTabV2Props> = ({ 
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
                formatter={(value: any) => [`Elasticity: ${typeof value === 'number' ? value.toFixed(2) : value}`, 'Elasticity']}
                contentStyle={{ 
                  borderRadius: '6px', 
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
                  border: '1px solid #e5e7eb'
                }}
              />
              <Scatter 
                data={heatmapData} 
                fill="#5840bb"
                shape={(props: any) => {
                  const { cx, cy, r } = props;
                  const width = 45;  // Adjusted width
                  const height = 35; // Adjusted height
                  const value = props.payload.value;
                  const opacity = Math.min(Math.max(0.2, value * 0.8), 0.9);
                  
                  return (
                    <Rectangle
                      x={cx - width / 2}
                      y={cy - height / 2}
                      width={width}
                      height={height}
                      fill={`rgba(88, 64, 187, ${opacity})`}
                      stroke="rgba(88, 64, 187, 0.1)"
                      strokeWidth={1}
                    />
                  );
                }}
              />
              
              {/* Month labels */}
              {monthlyElasticityData.map((entry, index) => (
                <text 
                  key={`month-${index}`} 
                  x={(index * 50) + 40} // Adjusted positioning
                  y={320} 
                  textAnchor="middle" 
                  dominantBaseline="middle"
                  className="fill-slate-600 text-xs font-medium"
                >
                  {entry.month}
                </text>
              ))}
              
              {/* Category labels */}
              <text 
                x={20} 
                y={115} 
                textAnchor="start" 
                dominantBaseline="middle"
                className="fill-slate-600 text-xs font-medium"
              >
                Baby
              </text>
              <text 
                x={20} 
                y={185} 
                textAnchor="start" 
                dominantBaseline="middle"
                className="fill-slate-600 text-xs font-medium"
              >
                Books
              </text>
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
                formatter={(value: any) => [`${value}`, 'Elasticity']}
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
