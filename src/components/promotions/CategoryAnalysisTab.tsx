
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';

interface CategoryAnalysisTabProps {
  subcategoryElasticityData: any[];
  priceSensitivityData: any[];
}

const CategoryAnalysisTab: React.FC<CategoryAnalysisTabProps> = ({
  subcategoryElasticityData,
  priceSensitivityData
}) => {
  return (
    <div className="animate-fade-in">
      <div className="dashboard-card mb-6">
        <h3 className="text-lg font-medium text-dashboard-text mb-2">Subcategory Promotional Responsiveness</h3>
        <p className="text-sm text-dashboard-secondaryText mb-4">
          Higher negative values indicate stronger response to promotions (higher elasticity).
        </p>
        <div style={{ height: "300px" }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={subcategoryElasticityData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              layout="vertical"
            >
              <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
              <XAxis 
                type="number"
                domain={[-1.8, 0]}
                tickCount={7}
                axisLine={false}
                tickLine={false}
              />
              <YAxis 
                dataKey="name" 
                type="category"
                axisLine={false}
                tickLine={false}
                width={150}
              />
              <Tooltip 
                formatter={(value: number) => [`${value.toFixed(2)}`, 'Elasticity']}
                contentStyle={{ 
                  borderRadius: '6px', 
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
                  border: '1px solid #e5e7eb'
                }}
              />
              <Bar 
                dataKey="elasticity" 
                fill="#6892e6"
                radius={[0, 4, 4, 0]}
              >
                {
                  subcategoryElasticityData.map((entry, index) => (
                    <Bar 
                      key={`bar-${index}`} 
                      dataKey="elasticity" 
                      fill={entry.elasticity <= -1.0 ? '#ef4444' : entry.elasticity <= -0.7 ? '#f97316' : '#6892e6'} 
                    />
                  ))
                }
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      <div className="dashboard-card mb-6">
        <h3 className="text-lg font-medium text-dashboard-text mb-2">Price Sensitivity Analysis</h3>
        <p className="text-sm text-dashboard-secondaryText mb-4">
          Shows how sales volume changes with different price levels. Steeper slopes indicate higher price sensitivity.
        </p>
        <div style={{ height: "300px" }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={priceSensitivityData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis 
                dataKey="price" 
                label={{ value: 'Price ($)', position: 'insideBottom', offset: -5 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis 
                label={{ value: 'Sales Volume', angle: -90, position: 'insideLeft' }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip 
                formatter={(value: number) => [`${value.toLocaleString()}`, 'Sales Volume']}
                labelFormatter={(label) => `Price: $${label}`}
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
              <Line 
                type="monotone" 
                dataKey="tools" 
                name="Tools & Home" 
                stroke="#22c55e" 
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

export default CategoryAnalysisTab;
