
import React from 'react';
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { pricingData } from '@/utils/data';

interface BarChartProps {
  title: string;
}

const BarChart: React.FC<BarChartProps> = ({ title }) => {
  const formattedData = pricingData.map(item => ({
    ...item,
    isYourBrand: item.name === 'Your Brand'
  }));

  return (
    <div className="dashboard-card h-full flex flex-col">
      <h3 className="text-lg font-medium text-dashboard-text mb-4">{title}</h3>
      
      <div className="flex-grow" style={{ minHeight: '240px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <RechartsBarChart
            data={formattedData}
            margin={{ top: 10, right: 30, left: 0, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f1f1" />
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false}
              tick={{ fontSize: 12 }}
              angle={-45}
              textAnchor="end"
              height={60}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false}
              tickFormatter={(value) => `$${value}`}
            />
            <Tooltip 
              formatter={(value) => [`$${value}`, 'Price']}
              contentStyle={{ 
                borderRadius: '6px', 
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
                border: '1px solid #e5e7eb'
              }}
            />
            <Bar 
              dataKey="price" 
              radius={[4, 4, 0, 0]}
              fill={(data) => data.isYourBrand ? '#5840bb' : '#6892e6'} 
            />
          </RechartsBarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default BarChart;
