
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
  ZAxis
} from 'recharts';

// Sample data for the heatmap
const generateHeatmapData = (competitors, categories) => {
  return categories.flatMap((category, i) => 
    competitors.map((competitor, j) => {
      // Generate coverage between 0 and 100%
      const coverage = Math.round(Math.random() * 100);
      
      return {
        x: j,
        y: i,
        z: coverage,
        category: category.name,
        competitor: competitor.name,
        coverage: `${coverage}%`,
      };
    })
  );
};

interface AssortmentHeatmapProps {
  competitors: { id: string; name: string }[];
  categories: { id: string; name: string }[];
}

export const AssortmentHeatmap: React.FC<AssortmentHeatmapProps> = ({ competitors, categories }) => {
  const data = generateHeatmapData(competitors, categories);
  
  const config = {
    default: { color: '#8B5CF6' }, // Vivid Purple
    high: { color: '#22c55e' },    // Green for high coverage
    medium: { color: '#0EA5E9' },  // Blue for medium coverage
    low: { color: '#F97316' },     // Orange for low coverage
    none: { color: '#ef4444' }     // Red for no coverage
  };

  const getColorByValue = (value: number) => {
    if (value >= 80) return '#22c55e'; // Green for high coverage
    if (value >= 50) return '#0EA5E9'; // Blue for medium coverage
    if (value >= 20) return '#F97316'; // Orange for low coverage
    return '#ef4444';                  // Red for very low/no coverage
  };

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="rounded-md bg-white p-3 shadow-md border border-gray-200">
          <p className="font-medium">{data.category}</p>
          <p className="text-sm text-gray-600">{data.competitor}</p>
          <p className={`text-sm font-semibold ${data.z >= 50 ? 'text-green-500' : data.z >= 20 ? 'text-blue-500' : 'text-orange-500'}`}>
            Coverage: {data.coverage}
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
          name="Competitor" 
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
        
        {/* Competitor labels */}
        {competitors.map((competitor, index) => (
          <text 
            key={`competitor-${index}`} 
            x={(index * 100) + 45} 
            y={20} 
            textAnchor="middle" 
            dominantBaseline="middle"
            className="fill-slate-600 text-xs font-medium"
          >
            {competitor.name}
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
            {category.name}
          </text>
        ))}
      </ScatterChart>
    </ChartContainer>
  );
};
