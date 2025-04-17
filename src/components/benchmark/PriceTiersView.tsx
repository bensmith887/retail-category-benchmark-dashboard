
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { benchmarkData } from "@/utils/benchmarkData";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { ChartTooltipContent } from "@/components/ui/chart";

interface PriceTiersViewProps {
  selectedCompetitors: string[];
  selectedCategory: string;
}

export const PriceTiersView: React.FC<PriceTiersViewProps> = ({
  selectedCompetitors,
  selectedCategory,
}) => {
  // Filter categories based on selected category
  const categories = selectedCategory === "All Categories"
    ? benchmarkData.categories
    : benchmarkData.categories.filter(cat => cat.name === selectedCategory);

  // Prepare data for the price tier distribution chart
  const priceTierData = categories.flatMap(category => 
    category.subcategories.map(subcategory => {
      const data: any = {
        name: subcategory.name,
        "You (Entry)": subcategory.priceTiers.entry,
        "You (Mid)": subcategory.priceTiers.mid,
        "You (Premium)": subcategory.priceTiers.premium,
      };

      // Add competitor data
      selectedCompetitors.forEach(competitor => {
        const compData = subcategory.competitors.find(c => c.name === competitor);
        if (compData && compData.priceTiers) {
          data[`${competitor} (Entry)`] = compData.priceTiers.entry;
          data[`${competitor} (Mid)`] = compData.priceTiers.mid;
          data[`${competitor} (Premium)`] = compData.priceTiers.premium;
        }
      });

      return data;
    })
  );

  // Generate colors for the chart
  const colors = {
    entry: ["#4f46e5", "#f97316", "#10b981", "#f43f5e", "#a855f7", "#06b6d4"],
    mid: ["#818cf8", "#fb923c", "#34d399", "#fb7185", "#c084fc", "#22d3ee"],
    premium: ["#c7d2fe", "#fdba74", "#a7f3d0", "#fda4af", "#e9d5ff", "#a5f3fc"],
  };

  return (
    <Card className="border shadow-sm">
      <CardContent className="p-6">
        <h3 className="font-medium mb-4">Price Tier Distribution</h3>

        <div className="space-y-8">
          <div>
            <h4 className="text-sm font-medium mb-2">Price Point Coverage by Tier</h4>
            <div className="h-[500px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={priceTierData}
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
                  <Legend wrapperStyle={{ paddingTop: 20 }} />

                  <Bar dataKey="You (Entry)" stackId="you" fill={colors.entry[0]} />
                  <Bar dataKey="You (Mid)" stackId="you" fill={colors.mid[0]} />
                  <Bar dataKey="You (Premium)" stackId="you" fill={colors.premium[0]} />

                  {selectedCompetitors.map((competitor, index) => (
                    <React.Fragment key={competitor}>
                      <Bar
                        dataKey={`${competitor} (Entry)`}
                        stackId={competitor}
                        fill={colors.entry[index + 1]}
                      />
                      <Bar
                        dataKey={`${competitor} (Mid)`}
                        stackId={competitor}
                        fill={colors.mid[index + 1]}
                      />
                      <Bar
                        dataKey={`${competitor} (Premium)`}
                        stackId={competitor}
                        fill={colors.premium[index + 1]}
                      />
                    </React.Fragment>
                  ))}
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium mb-2">Price Tier Legend</h4>
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-muted/30 p-3 rounded-md">
                <div className="flex items-center gap-2 mb-1">
                  <div className="h-3 w-3 rounded-sm bg-blue-500"></div>
                  <span className="text-sm font-medium">Entry Level</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Budget-friendly products with essential features
                </p>
              </div>
              <div className="bg-muted/30 p-3 rounded-md">
                <div className="flex items-center gap-2 mb-1">
                  <div className="h-3 w-3 rounded-sm bg-indigo-500"></div>
                  <span className="text-sm font-medium">Mid Range</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Balance of quality and affordability
                </p>
              </div>
              <div className="bg-muted/30 p-3 rounded-md">
                <div className="flex items-center gap-2 mb-1">
                  <div className="h-3 w-3 rounded-sm bg-purple-500"></div>
                  <span className="text-sm font-medium">Premium</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  High-end products with advanced features
                </p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
