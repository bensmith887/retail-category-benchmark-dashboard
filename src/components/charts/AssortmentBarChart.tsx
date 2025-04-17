
import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend,
  ResponsiveContainer,
  LabelList
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
  
  // Custom tooltip component
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 shadow-lg rounded-md">
          <p className="font-semibold mb-2">{label}</p>
          <div className="space-y-1">
            {payload.map((entry: any, index: number) => (
              <div key={`item-${index}`} className="flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded-sm" 
                  style={{ backgroundColor: entry.color }}
                />
                <span className="text-sm">{entry.name}: </span>
                <span className="text-sm font-medium">{entry.value} products</span>
              </div>
            ))}
          </div>
        </div>
      );
    }
    return null;
  };
  
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
          barGap={2}
          barSize={18}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis 
            dataKey="category" 
            angle={-45} 
            textAnchor="end"
            height={70}
            interval={0}
            tick={{ fontSize: 12 }}
          />
          <YAxis 
            label={{ 
              value: 'Number of Products', 
              angle: -90, 
              position: 'insideLeft',
              style: { textAnchor: 'middle' }
            }} 
            tick={{ fontSize: 12 }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend 
            wrapperStyle={{ paddingTop: 10 }}
            iconType="circle"
          />
          {competitors.map((competitor) => (
            <Bar 
              key={competitor} 
              dataKey={competitor} 
              fill={colors[competitor] || `#${Math.floor(Math.random()*16777215).toString(16)}`} 
              radius={[4, 4, 0, 0]}
            >
              {data.length < 5 && (
                <LabelList dataKey={competitor} position="top" style={{ fontSize: 11 }} />
              )}
            </Bar>
          ))}
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};
