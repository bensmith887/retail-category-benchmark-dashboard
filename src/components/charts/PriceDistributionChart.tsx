
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
  Cell,
  LabelList
} from 'recharts';
import { ChartContainer } from '@/components/ui/chart';

interface PriceDistributionChartProps {
  data: {
    priceRange: string;
    [key: string]: number | string; // Values for each competitor
  }[];
  competitors: string[];
  activeCompetitor: string;
}

export const PriceDistributionChart: React.FC<PriceDistributionChartProps> = ({ 
  data, 
  competitors, 
  activeCompetitor 
}) => {
  const colors = {
    "Your Brand": "#8B5CF6", // Vivid Purple
    "Amazon": "#FF9900",     // Amazon Orange
    "Walmart": "#0071DC",    // Walmart Blue
    "Target": "#CC0000",     // Target Red
    "eBay": "#E53238",       // eBay Red
    "Best Buy": "#0046BE",   // Best Buy Blue
    entry: "#22c55e",        // Green for entry-level
    mid: "#0EA5E9",          // Blue for mid-range
    premium: "#7E69AB"       // Purple for premium
  };

  const config = {
    entry: { color: colors.entry },
    mid: { color: colors.mid },
    premium: { color: colors.premium }
  };

  // Calculate percentages for each price range
  const calculatePercentage = (data: any) => {
    const total = data.reduce((sum: number, item: any) => sum + item[activeCompetitor], 0);
    return data.map((item: any) => ({
      ...item,
      percentage: ((item[activeCompetitor] / total) * 100).toFixed(1)
    }));
  };

  const dataWithPercentages = calculatePercentage(data);

  // Custom tooltip
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const entry = payload[0];
      let color;
      if (label.includes("Entry")) color = colors.entry;
      else if (label.includes("Mid")) color = colors.mid;
      else color = colors.premium;

      return (
        <div className="bg-white p-3 border border-gray-200 shadow-lg rounded-md">
          <p className="font-semibold mb-1">{label}</p>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: color }} />
            <span className="text-sm">{activeCompetitor}: </span>
            <span className="text-sm font-medium">{entry.value} products</span>
          </div>
          <div className="mt-1 text-sm text-gray-500">
            {dataWithPercentages.find((item: any) => item.priceRange === label)?.percentage}% of total
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
          data={dataWithPercentages}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 30,
          }}
          barSize={60}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis 
            dataKey="priceRange" 
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
          <Legend iconType="circle" />
          <Bar 
            dataKey={activeCompetitor} 
            name={`${activeCompetitor} Products`}
            radius={[4, 4, 0, 0]}
          >
            <LabelList 
              dataKey="percentage" 
              position="top" 
              formatter={(value: any) => `${value}%`}
              style={{ fontSize: 11, fill: '#6B7280' }}
            />
            {data.map((entry, index) => {
              let color;
              if (entry.priceRange.includes("Entry")) color = colors.entry;
              else if (entry.priceRange.includes("Mid")) color = colors.mid;
              else color = colors.premium;
              
              return <Cell key={`cell-${index}`} fill={color} />;
            })}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};
