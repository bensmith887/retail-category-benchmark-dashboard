
import React, { useState } from "react";
import { 
  ChevronDown, 
  ChevronRight,
  FolderTree
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { benchmarkData } from "@/utils/benchmarkData";
import { cn } from "@/lib/utils";

interface CategoryTreeViewProps {
  selectedCompetitors: string[];
  selectedCategory: string;
}

export const CategoryTreeView: React.FC<CategoryTreeViewProps> = ({
  selectedCompetitors,
  selectedCategory
}) => {
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);

  const toggleCategory = (categoryId: string) => {
    if (expandedCategories.includes(categoryId)) {
      setExpandedCategories(expandedCategories.filter(id => id !== categoryId));
    } else {
      setExpandedCategories([...expandedCategories, categoryId]);
    }
  };

  // Filter categories based on selected category
  const filteredCategories = selectedCategory === "All Categories"
    ? benchmarkData.categories
    : benchmarkData.categories.filter(cat => cat.name === selectedCategory);

  return (
    <Card className="border shadow-sm">
      <CardContent className="p-6">
        <div className="flex items-center mb-4 text-muted-foreground">
          <FolderTree className="mr-2 h-5 w-5" />
          <h3 className="font-medium">Product Category Hierarchy</h3>
        </div>
        
        <div className="space-y-2">
          {filteredCategories.map((category) => (
            <div key={category.id} className="space-y-2">
              <div 
                className="flex items-center cursor-pointer hover:bg-muted p-2 rounded-md"
                onClick={() => toggleCategory(category.id)}
              >
                {expandedCategories.includes(category.id) ? (
                  <ChevronDown className="h-4 w-4 shrink-0 mr-2" />
                ) : (
                  <ChevronRight className="h-4 w-4 shrink-0 mr-2" />
                )}
                <span className="font-medium">{category.name}</span>
                <span className="ml-auto text-xs text-muted-foreground">{category.productCount} products</span>
              </div>
              
              {expandedCategories.includes(category.id) && (
                <div className="ml-8 space-y-2 border-l-2 pl-2 border-muted">
                  {category.subcategories.map((subcategory) => (
                    <div key={subcategory.id} className="space-y-2">
                      <div 
                        className="flex items-center cursor-pointer hover:bg-muted p-2 rounded-md"
                        onClick={() => toggleCategory(subcategory.id)}
                      >
                        {expandedCategories.includes(subcategory.id) ? (
                          <ChevronDown className="h-4 w-4 shrink-0 mr-2" />
                        ) : (
                          <ChevronRight className="h-4 w-4 shrink-0 mr-2" />
                        )}
                        <span>{subcategory.name}</span>
                        <span className="ml-auto text-xs text-muted-foreground">{subcategory.productCount} products</span>
                      </div>
                      
                      {expandedCategories.includes(subcategory.id) && (
                        <div className="ml-8 space-y-1 border-l-2 pl-2 border-muted">
                          <table className="w-full text-sm">
                            <thead>
                              <tr className="border-b">
                                <th className="text-left font-medium p-2">Competitor</th>
                                <th className="text-right font-medium p-2">Products</th>
                                <th className="text-right font-medium p-2">Coverage</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr className="font-medium">
                                <td className="p-2">You</td>
                                <td className="text-right p-2">{subcategory.productCount}</td>
                                <td className="text-right p-2">100%</td>
                              </tr>
                              {selectedCompetitors.map(competitor => {
                                const compData = subcategory.competitors.find(c => c.name === competitor);
                                if (!compData) return null;
                                
                                const coverage = Math.round((compData.productCount / subcategory.productCount) * 100);
                                
                                return (
                                  <tr key={competitor} className={cn(
                                    coverage > 100 ? "text-red-600" : "",
                                    coverage < 50 ? "text-amber-600" : ""
                                  )}>
                                    <td className="p-2">{competitor}</td>
                                    <td className="text-right p-2">{compData.productCount}</td>
                                    <td className="text-right p-2">{coverage}%</td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
