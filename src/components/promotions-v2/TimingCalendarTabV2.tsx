
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
  // Custom tooltip for the heatmap
  const CustomHeatmapTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      const elasticityValue = Math.abs(data.value).toFixed(2);
      const sensitivityLevel = data.value <= -1.2 ? 'High' : data.value <= -0.8 ? 'Medium' : 'Low';
      const textColor = data.value <= -1.2 ? 'text-purple-700' : data.value <= -0.8 ? 'text-blue-600' : 'text-blue-400';
      
      return (
        <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-100">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-semibold">{data.category}</span>
            <span className="text-xs bg-purple-50 text-purple-700 px-2 py-0.5 rounded-full">
              {data.month}
            </span>
          </div>
          <div className="text-sm text-gray-600 mb-1">
            Elasticity: <span className={`font-medium ${textColor}`}>{data.value}</span>
          </div>
          <div className="flex items-center mt-1.5">
            <div className={`h-2 w-2 rounded-full mr-2 ${
              data.value <= -1.2 ? 'bg-purple-600' : 
              data.value <= -0.8 ? 'bg-blue-500' : 'bg-blue-300'
            }`}></div>
            <span className="text-xs text-gray-500">
              {sensitivityLevel} sensitivity to promotions
            </span>
          </div>
        </div>
      );
    }
    return null;
  };

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
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-dashboard-text">Promotional Sensitivity Heat Map</h3>
          <div className="flex gap-1.5">
            <div className="flex items-center gap-1">
              <div className="h-3 w-3 rounded-sm bg-purple-900 bg-opacity-80"></div>
              <span className="text-xs text-gray-500">High</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="h-3 w-3 rounded-sm bg-purple-700 bg-opacity-70"></div>
              <span className="text-xs text-gray-500">Medium</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="h-3 w-3 rounded-sm bg-purple-500 bg-opacity-60"></div>
              <span className="text-xs text-gray-500">Low</span>
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg p-4" style={{ height: "380px" }}>
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart
              margin={{ top: 30, right: 30, bottom: 80, left: 30 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
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
                range={[150, 1500]}
                name="Elasticity"
              />
              <Tooltip content={<CustomHeatmapTooltip />} cursor={{ strokeDasharray: '5 5', stroke: '#8884d8' }} />
              <Scatter 
                data={heatmapData} 
                shape={(props: any) => {
                  const { cx, cy, r } = props;
                  const width = 50;
                  const height = 40;
                  const value = props.payload.value;
                  
                  // More visually distinctive color mapping based on elasticity value
                  let fillColor;
                  let opacity;
                  
                  if (value <= -1.2) {
                    fillColor = 'rgba(109, 40, 217, 0.9)'; // Deep purple for high sensitivity
                    opacity = 0.9;
                  } else if (value <= -0.8) {
                    fillColor = 'rgba(124, 58, 237, 0.75)'; // Medium purple for medium sensitivity
                    opacity = 0.75;
                  } else {
                    fillColor = 'rgba(139, 92, 246, 0.6)'; // Light purple for low sensitivity
                    opacity = 0.6;
                  }
                  
                  return (
                    <Rectangle
                      x={cx - width / 2}
                      y={cy - height / 2}
                      width={width}
                      height={height}
                      fill={fillColor}
                      stroke="rgba(139, 92, 246, 0.2)"
                      strokeWidth={1}
                      rx={4}
                      ry={4}
                    />
                  );
                }}
              />
              
              {/* Month labels */}
              {monthlyElasticityData.map((entry, index) => (
                <text 
                  key={`month-${index}`} 
                  x={(index * 55) + 50}
                  y={330} 
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
              <text 
                x={20} 
                y={255} 
                textAnchor="start" 
                dominantBaseline="middle"
                className="fill-slate-600 text-xs font-medium"
              >
                Tools
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
