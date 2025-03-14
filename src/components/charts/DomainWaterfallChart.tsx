
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
  BarChart, 
  Bar, 
  Legend,
  ReferenceLine,
  LabelList
} from 'recharts';
import { TrendingUp, TrendingDown } from 'lucide-react';

// Generate sample domain growth data
const generateDomainGrowthData = (selectedGroup: string) => {
  const domains = [
    'yourdomain.com', 
    'competitor1.com', 
    'competitor2.com', 
    'competitor3.com', 
    'competitor4.com',
    'competitor5.com',
    'competitor6.com',
    'competitor7.com'
  ];

  // This would typically come from an API
  return domains.map(domain => {
    // Generate growth between -8% and +12%
    const change = Math.round((Math.random() * 20 - 8) * 10) / 10;
    
    return {
      domain: domain,
      change: change,
      isPositive: change >= 0,
      label: `${change > 0 ? '+' : ''}${change}%`
    };
  }).sort((a, b) => a.change - b.change); // Sort by change value
};

interface DomainWaterfallChartProps {
  selectedGroup: string;
}

export const DomainWaterfallChart: React.FC<DomainWaterfallChartProps> = ({ selectedGroup }) => {
  const data = generateDomainGrowthData(selectedGroup);
  
  const config = {
    increase: { color: '#22c55e' }, // Green
    decrease: { color: '#ef4444' }, // Red
  };

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="rounded-md bg-white p-3 shadow-md border border-gray-200">
          <p className="font-medium">{data.domain}</p>
          <div className="flex items-center gap-1 mt-1">
            {data.isPositive ? 
              <TrendingUp className="h-4 w-4 text-green-500" /> : 
              <TrendingDown className="h-4 w-4 text-red-500" />
            }
            <p className={`text-sm font-semibold ${data.isPositive ? 'text-green-500' : 'text-red-500'}`}>
              Market Share Change: {data.label}
            </p>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <ChartContainer config={config} className="h-full w-full">
      <BarChart
        data={data}
        layout="vertical"
        margin={{ top: 20, right: 30, left: 100, bottom: 20 }}
      >
        <XAxis 
          type="number" 
          domain={['dataMin', 'dataMax']}
          tickFormatter={(value) => `${value > 0 ? '+' : ''}${value}%`}
        />
        <YAxis 
          type="category" 
          dataKey="domain"
          width={90}
          tick={{ fontSize: 12 }}
        />
        <Tooltip content={<CustomTooltip />} />
        <ReferenceLine x={0} stroke="#888" />
        <Bar 
          dataKey="change" 
          fill={(entry) => entry.isPositive ? '#22c55e' : '#ef4444'}
          minPointSize={2}
          barSize={30}
        >
          <LabelList 
            dataKey="label" 
            position="right" 
            style={{ 
              fontSize: '12px', 
              fill: '#666',
              fontWeight: 500 
            }} 
          />
        </Bar>
      </BarChart>
    </ChartContainer>
  );
};
