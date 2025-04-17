
import React from "react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from "recharts";
import { Card, CardContent } from "@/components/ui/card";
import { ChartTooltipContent } from "@/components/ui/chart";
import { benchmarkData } from "@/utils/benchmarkData";

interface AssortmentDepthViewProps {
  selectedCompetitors: string[];
  selectedCategory: string;
}

export const AssortmentDepthView: React.FC<AssortmentDepthViewProps> = ({
  selectedCompetitors,
  selectedCategory
}) => {
  // Filter categories based on selected category
  const categories = selectedCategory === "All Categories"
    ? benchmarkData.categories
    : benchmarkData.categories.filter(cat => cat.name === selectedCategory);

  // Prepare data for chart
  const chartData = categories.flatMap(category => {
    return category.subcategories.map(subcategory => {
      const data: any = {
        name: subcategory.name,
        You: subcategory.productCount,
      };
      
      // Add competitor data
      selectedCompetitors.forEach(competitor => {
        const compData = subcategory.competitors.find(c => c.name === competitor);
        if (compData) {
          data[competitor] = compData.productCount;
        }
      });
      
      return data;
    });
  });

  // Generate colors for the chart bars
  const colors = [
    "#4f46e5", // You (primary)
    "#f97316", // Competitor 1
    "#10b981", // Competitor 2
    "#f43f5e", // Competitor 3
    "#a855f7", // Competitor 4
    "#06b6d4", // Competitor 5
  ];

  return (
    <Card className="border shadow-sm">
      <CardContent className="p-6">
        <h3 className="font-medium mb-4">Assortment Depth Comparison</h3>
        
        <div className="h-[500px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 100,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="name" 
                angle={-45} 
                textAnchor="end" 
                height={80} 
                tick={{ fontSize: 12 }}
              />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip content={<ChartTooltipContent />} />
              <Legend />
              <Bar dataKey="You" fill={colors[0]} name="You" />
              {selectedCompetitors.map((competitor, index) => (
                <Bar 
                  key={competitor} 
                  dataKey={competitor} 
                  fill={colors[index + 1]} 
                  name={competitor} 
                />
              ))}
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};
