
import React from 'react';
import { Target, BarChart3 } from 'lucide-react';
import MetricsCard from '@/components/MetricsCard';
import { BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Bar, Cell, LineChart, Line, Legend, ResponsiveContainer } from 'recharts';

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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <MetricsCard
          label="Most Responsive Subcategory"
          value="Feeding"
          change="-1.03"
          secondaryLabel="Elasticity"
          isPositive={true}
          icon={<Target className="text-dashboard-primary" />}
        />
        <MetricsCard
          label="Category Elasticity Difference"
          value="41.8%"
          change="Baby > Books"
          secondaryLabel="Overall Difference"
          isPositive={true}
          icon={<BarChart3 className="text-dashboard-primary" />}
        />
        <MetricsCard
          label="Least Responsive Subcategory"
          value="Bath"
          change="-0.34"
          secondaryLabel="Elasticity"
          isPositive={false}
          icon={<Target className="text-dashboard-primary" />}
        />
      </div>
      
      <div className="dashboard-card mb-6">
        <h3 className="text-lg font-medium text-dashboard-text mb-4">Subcategory Promotional Responsiveness</h3>
        <div style={{ height: "350px" }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={subcategoryElasticityData}
              layout="vertical"
              margin={{ top: 5, right: 30, left: 100, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
              <XAxis 
                type="number"
                domain={[-1.2, 0]}
                axisLine={false}
                tickLine={false}
              />
              <YAxis 
                dataKey="name" 
                type="category"
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                formatter={(value) => [`${value}`, 'Elasticity']}
                contentStyle={{ 
                  borderRadius: '6px', 
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
                  border: '1px solid #e5e7eb'
                }}
              />
              <Bar dataKey="elasticity" radius={[0, 4, 4, 0]}>
                {subcategoryElasticityData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.category === 'Baby' ? '#5840bb' : '#6892e6'} 
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      <div className="dashboard-card mb-6">
        <h3 className="text-lg font-medium text-dashboard-text mb-4">Price Increase vs. Decrease Sensitivity</h3>
        <div style={{ height: "300px" }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={priceSensitivityData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis 
                dataKey="name"
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                label={{ value: 'Elasticity (Absolute)', angle: -90, position: 'insideLeft' }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                formatter={(value) => [`${value}`, 'Elasticity']}
                contentStyle={{ 
                  borderRadius: '6px', 
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
                  border: '1px solid #e5e7eb'
                }}
              />
              <Bar dataKey="value" fill="#5840bb" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="text-xs text-dashboard-secondaryText mt-2">
          Consumers are more sensitive to price increases (-0.89 elasticity) than promotions (-0.04 elasticity)
        </div>
      </div>
    </div>
  );
};

export default CategoryAnalysisTab;
