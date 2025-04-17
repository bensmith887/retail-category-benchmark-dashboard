
import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend,
  ResponsiveContainer
} from 'recharts';
import { ChartContainer } from '@/components/ui/chart';

interface AssortmentBarChartProps {
  data: {
    category: string;
    [key: string]: number | string; // Competitor values
  }[];
  competitors: string[];
  colors: { [key: string]: string };
}

export const AssortmentBarChart: React.FC<AssortmentBarChartProps> = ({ data, competitors, colors }) => {
  const config = competitors.reduce((acc, competitor) => {
    acc[competitor] = { color: colors[competitor] || '#8B5CF6' };
    return acc;
  }, {} as Record<string, { color: string }>);
  
  return (
    <ChartContainer config={config} className="h-full w-full">
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 40,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="category" 
            angle={-45} 
            textAnchor="end"
            height={70}
            interval={0}
          />
          <YAxis label={{ value: 'Number of Products', angle: -90, position: 'insideLeft' }} />
          <Tooltip />
          <Legend />
          {competitors.map((competitor, index) => (
            <Bar 
              key={competitor} 
              dataKey={competitor} 
              stackId={`stack-${index}`} 
              fill={colors[competitor] || `#${Math.floor(Math.random()*16777215).toString(16)}`} 
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};
