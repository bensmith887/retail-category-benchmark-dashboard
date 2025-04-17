
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { benchmarkData } from "@/utils/benchmarkData";
import { cn } from "@/lib/utils";

interface AssortmentBreadthViewProps {
  selectedCompetitors: string[];
  selectedCategory: string;
}

export const AssortmentBreadthView: React.FC<AssortmentBreadthViewProps> = ({
  selectedCompetitors,
  selectedCategory
}) => {
  // Filter categories based on selected category
  const categories = selectedCategory === "All Categories"
    ? benchmarkData.categories
    : benchmarkData.categories.filter(cat => cat.name === selectedCategory);

  // Prepare data for the heat map
  const allSubcategories = categories.flatMap(category => category.subcategories);
  
  return (
    <Card className="border shadow-sm">
      <CardContent className="p-6">
        <h3 className="font-medium mb-4">Assortment Breadth Coverage</h3>
        
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px] border-collapse">
            <thead>
              <tr className="bg-muted/50">
                <th className="text-left p-2 border font-medium">Subcategory</th>
                <th className="p-2 border font-medium text-center">You</th>
                {selectedCompetitors.map(competitor => (
                  <th key={competitor} className="p-2 border font-medium text-center">{competitor}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {allSubcategories.map(subcategory => (
                <tr key={subcategory.id} className="hover:bg-muted/30">
                  <td className="p-2 border">{subcategory.name}</td>
                  <td className="p-2 border text-center">
                    <div className="h-8 w-8 rounded-full bg-primary mx-auto" title={`${subcategory.productCount} products`}>
                      <span className="text-xs text-white flex items-center justify-center h-full font-medium">Yes</span>
                    </div>
                  </td>
                  {selectedCompetitors.map(competitor => {
                    const compData = subcategory.competitors.find(c => c.name === competitor);
                    
                    const coverage = compData 
                      ? (compData.productCount / subcategory.productCount) 
                      : 0;
                    
                    return (
                      <td key={competitor} className="p-2 border text-center">
                        {compData && compData.productCount > 0 ? (
                          <div 
                            className={cn(
                              "h-8 w-8 rounded-full mx-auto flex items-center justify-center",
                              coverage >= 1.5 ? "bg-red-500" : 
                              coverage >= 1.0 ? "bg-amber-500" : 
                              coverage >= 0.5 ? "bg-green-500" : 
                              "bg-blue-300"
                            )}
                            title={`${compData.productCount} products (${Math.round(coverage * 100)}% of your assortment)`}
                          >
                            <span className="text-xs text-white font-medium">Yes</span>
                          </div>
                        ) : (
                          <div className="h-8 w-8 rounded-full bg-gray-200 mx-auto" title="No products">
                            <span className="text-xs text-gray-500 flex items-center justify-center h-full font-medium">No</span>
                          </div>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="flex gap-4 mt-4 flex-wrap">
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 rounded-full bg-blue-300"></div>
            <span className="text-xs">Low Coverage (&lt;50%)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 rounded-full bg-green-500"></div>
            <span className="text-xs">Medium Coverage (50-99%)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 rounded-full bg-amber-500"></div>
            <span className="text-xs">Full Coverage (100-149%)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 rounded-full bg-red-500"></div>
            <span className="text-xs">High Coverage (150%+)</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
