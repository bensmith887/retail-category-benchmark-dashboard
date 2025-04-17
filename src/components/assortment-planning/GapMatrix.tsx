
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
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, XCircle, AlertCircle } from 'lucide-react';

// Generate gap data
const generateGapData = (competitors, categories) => {
  return categories.flatMap((category, i) => 
    competitors.map((competitor, j) => {
      // Generate random data about product presence
      // 0 = No gap (both have products)
      // 1 = Gap (competitor has products, we don't)
      // 2 = We have exclusivity (we have products, competitor doesn't)
      const gapType = Math.floor(Math.random() * 3);
      // Generate score between 0 and 100
      const opportunityScore = Math.round(Math.random() * 100);
      const marketSize = Math.round(Math.random() * 1000) + 100;
      const growthRate = Math.round(Math.random() * 20);
      
      return {
        x: j,
        y: i,
        z: gapType,
        score: opportunityScore,
        category: category.name,
        competitor: competitor.name,
        gapType: gapType,
        marketSize: marketSize,
        growthRate: growthRate
      };
    })
  );
};

interface GapMatrixProps {
  competitors: { id: string; name: string }[];
  categories: { id: string; name: string }[];
}

export const GapMatrix: React.FC<GapMatrixProps> = ({ competitors, categories }) => {
  const data = generateGapData(competitors, categories);
  
  const config = {
    default: { color: '#8B5CF6' }, // Vivid Purple
    gap: { color: '#ef4444' },     // Red for gaps
    okay: { color: '#22c55e' },    // Green for no gaps
    exclusive: { color: '#0EA5E9' } // Blue for exclusivity
  };

  const getColorByGapType = (gapType: number) => {
    if (gapType === 0) return '#22c55e'; // Green for no gaps (both have products)
    if (gapType === 1) return '#ef4444'; // Red for gaps (competitor has, we don't)
    return '#0EA5E9';                    // Blue for our exclusivity (we have, competitor doesn't)
  };

  const getGapStatusText = (gapType: number) => {
    if (gapType === 0) return 'Both have products';
    if (gapType === 1) return 'Gap! Competitor has products, you don\'t';
    return 'Exclusive! You have products, competitor doesn\'t';
  };

  const getGapStatusBadge = (gapType: number) => {
    if (gapType === 0) return (
      <Badge className="bg-green-100 text-green-800 hover:bg-green-200 flex items-center gap-1">
        <CheckCircle2 size={12} />
        <span>No Gap</span>
      </Badge>
    );
    if (gapType === 1) return (
      <Badge className="bg-red-100 text-red-800 hover:bg-red-200 flex items-center gap-1">
        <XCircle size={12} />
        <span>Gap</span>
      </Badge>
    );
    return (
      <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200 flex items-center gap-1">
        <AlertCircle size={12} />
        <span>Exclusive</span>
      </Badge>
    );
  };

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      
      return (
        <Card className="shadow-lg border border-gray-200">
          <CardContent className="p-3">
            <div className="mb-2">
              <p className="font-medium text-sm">{data.category}</p>
              <p className="text-sm text-gray-600">{data.competitor}</p>
            </div>
            <div className="mb-2">
              {getGapStatusBadge(data.gapType)}
            </div>
            <div className="grid grid-cols-2 gap-2 mt-2 text-xs">
              <div>
                <p className="text-gray-500">Opportunity Score</p>
                <p className="font-semibold">{data.score}</p>
              </div>
              <div>
                <p className="text-gray-500">Market Size</p>
                <p className="font-semibold">${data.marketSize}K</p>
              </div>
              <div>
                <p className="text-gray-500">Growth Rate</p>
                <p className="font-semibold">{data.growthRate}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      );
    }
    return null;
  };

  const legendItems = [
    { value: 'No Gap (Both have products)', color: '#22c55e' },
    { value: 'Gap (Competitor has products)', color: '#ef4444' },
    { value: 'Exclusive (Only you have products)', color: '#0EA5E9' }
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
      <div className="h-[500px]">
        <ChartContainer config={config} className="h-full w-full">
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
                    fill={getColorByGapType(entry.gapType)}
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
        </ChartContainer>
      </div>
      <CustomizedLegend />
    </div>
  );
};
