
import React from 'react';
import { Card } from '@/components/ui/card';
import { 
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from '@/components/ui/chart';
import { 
  ResponsiveContainer, 
  Tooltip, 
  XAxis, 
  YAxis, 
  ScatterChart, 
  Scatter, 
  Cell,
  ZAxis,
  Legend,
  ReferenceLine
} from 'recharts';

// Sample data for the heatmap
const categories = ['Branded', 'Non-Branded', 'Products', 'Solutions', 'Guides', 'Reviews'];
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];

// Generate sample data for the heatmap
const generateHeatmapData = (selectedGroup: string) => {
  // This would typically come from an API
  return categories.flatMap((category, i) => 
    months.map((month, j) => {
      // Generate growth between -15% and +25%
      const growth = Math.round((Math.random() * 40 - 15) * 10) / 10;
      
      return {
        x: j,
        y: i,
        z: growth,
        category,
        month,
        growth: `${growth > 0 ? '+' : ''}${growth}%`,
      };
    })
  );
};

interface TrafficHeatmapProps {
  selectedGroup: string;
}

export const TrafficHeatmap: React.FC<TrafficHeatmapProps> = ({ selectedGroup }) => {
  const data = generateHeatmapData(selectedGroup);
  
  const config = {
    default: { color: '#8B5CF6' }, // Vivid Purple
    positive: { color: '#0EA5E9' }, // Ocean Blue
    negative: { color: '#F97316' }, // Bright Orange
  };

  const getColorByValue = (value: number) => {
    if (value >= 10) return '#0EA5E9'; // Ocean Blue for high positive
    if (value > 0) return '#22c55e'; // Green for positive
    if (value > -10) return '#F97316'; // Orange for slight negative
    return '#ef4444'; // Red for very negative
  };

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="rounded-md bg-white p-3 shadow-md border border-gray-200">
          <p className="font-medium">{data.category}</p>
          <p className="text-sm text-gray-600">{data.month}</p>
          <p className={`text-sm font-semibold ${data.z >= 0 ? 'text-green-500' : 'text-red-500'}`}>
            Traffic Change: {data.growth}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <ChartContainer config={config} className="h-full w-full">
      <ScatterChart
        margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
      >
        <XAxis 
          type="number" 
          dataKey="x" 
          name="Month" 
          tick={false}
          tickLine={false}
          axisLine={false}
        />
        <YAxis 
          type="number" 
          dataKey="y" 
          name="Category" 
          tick={false}
          tickLine={false}
          axisLine={false}
        />
        <ZAxis 
          type="number" 
          dataKey="z" 
          range={[100, 500]}
        />
        <Tooltip content={<CustomTooltip />} />
        <Scatter data={data}>
          {data.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={getColorByValue(entry.z)}
              strokeWidth={1}
            />
          ))}
        </Scatter>
        
        {/* Month labels */}
        {months.map((month, index) => (
          <text 
            key={`month-${index}`} 
            x={(index * 100) + 45} 
            y={20} 
            textAnchor="middle" 
            dominantBaseline="middle"
            className="fill-slate-600 text-xs font-medium"
          >
            {month}
          </text>
        ))}
        
        {/* Category labels */}
        {categories.map((category, index) => (
          <text 
            key={`category-${index}`} 
            x={20} 
            y={(index * 70) + 50} 
            textAnchor="start" 
            dominantBaseline="middle"
            className="fill-slate-600 text-xs font-medium"
          >
            {category}
          </text>
        ))}
      </ScatterChart>
    </ChartContainer>
  );
};
