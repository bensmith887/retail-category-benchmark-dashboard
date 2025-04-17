
import React from 'react';
import { 
  ResponsiveContainer, 
  Tooltip, 
  XAxis, 
  YAxis, 
  ScatterChart, 
  Scatter, 
  Cell,
  ZAxis,
  Legend
} from 'recharts';
import { ChartContainer } from '@/components/ui/chart';

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
      
      const getColorClass = (value: number) => {
        if (value >= 80) return 'text-green-500';
        if (value >= 50) return 'text-blue-500';
        if (value >= 20) return 'text-orange-500';
        return 'text-red-500';
      };
      
      return (
        <div className="bg-white p-3 shadow-lg border border-gray-200 rounded-md">
          <p className="font-medium text-sm">{data.category}</p>
          <p className="text-sm text-gray-600">{data.competitor}</p>
          <p className={`text-sm font-semibold ${getColorClass(data.z)}`}>
            Coverage: {data.coverage}
          </p>
          <div className="mt-1 text-xs text-gray-500">
            {data.z >= 80 ? 'Excellent coverage' : 
              data.z >= 50 ? 'Good coverage' : 
              data.z >= 20 ? 'Fair coverage' : 
              'Poor coverage'}
          </div>
        </div>
      );
    }
    return null;
  };

  const legendItems = [
    { value: 'Excellent (80-100%)', color: '#22c55e' },
    { value: 'Good (50-79%)', color: '#0EA5E9' },
    { value: 'Fair (20-49%)', color: '#F97316' },
    { value: 'Poor (0-19%)', color: '#ef4444' }
  ];

  const CustomizedLegend = () => (
    <div className="flex flex-wrap justify-center gap-4 mt-4">
      {legendItems.map((item, index) => (
        <div key={index} className="flex items-center gap-2">
          <div 
            className="w-3 h-3 rounded-sm" 
            style={{ backgroundColor: item.color }}
          />
          <span className="text-xs">{item.value}</span>
        </div>
      ))}
    </div>
  );

  return (
    <div className="h-full w-full">
      <ChartContainer config={config} className="h-full w-full">
        <div className="h-[450px]">
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart
              margin={{ top: 50, right: 30, bottom: 30, left: 20 }}
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
          </ResponsiveContainer>
        </div>
        <CustomizedLegend />
      </ChartContainer>
    </div>
  );
};
