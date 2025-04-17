
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
  Cell
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

  return (
    <ChartContainer config={config} className="h-full w-full">
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 30,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="priceRange" />
          <YAxis label={{ value: 'Number of Products', angle: -90, position: 'insideLeft' }} />
          <Tooltip />
          <Legend />
          <Bar dataKey={activeCompetitor} name={`${activeCompetitor} Products`}>
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
