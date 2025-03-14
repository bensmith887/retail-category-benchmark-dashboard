
import React from 'react';
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { pricingData } from '@/utils/data';
import { InfoIcon } from 'lucide-react';

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
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-medium text-dashboard-text">{title}</h3>
        <div className="group relative">
          <InfoIcon size={16} className="text-dashboard-secondaryText cursor-help" />
          <div className="absolute right-0 w-64 p-2 bg-white border border-dashboard-border rounded-md shadow-sm text-xs text-dashboard-secondaryText invisible group-hover:visible z-10">
            <p className="font-medium text-dashboard-text mb-1">Suggested actions:</p>
            <ul className="list-disc pl-4 space-y-1">
              <li>Identify price gaps compared to competitors</li>
              <li>Optimize pricing strategy based on benchmarks</li>
              <li>Evaluate potential for price adjustments in key segments</li>
              <li>Analyze price positioning relative to category average</li>
            </ul>
          </div>
        </div>
      </div>
      
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
              fill="#6892e6"
            >
              {formattedData.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={entry.isYourBrand ? '#5840bb' : '#6892e6'} 
                />
              ))}
            </Bar>
          </RechartsBarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default BarChart;
