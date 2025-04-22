
import React, { useState, useEffect } from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from '@/components/ui/card';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Download } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface AssortmentMixExplorerProps {
  retailers: { id: string; name: string }[];
  categories: { id: string; name: string }[];
  priceRanges: { id: string; name: string; min: number; max: number }[];
}

interface SkuData {
  count: number;
  percentage: number;
  trend?: {
    mom: number;  // Month over Month
    yoy: number;  // Year over Year
  };
}

type AssortmentData = Record<string, Record<string, Record<string, SkuData>>>;

const predefinedCategories = [
  "Mens Textiles",
  "Mens Footwear",
  "Womens Footwear",
  "Junior Footwear",
  "Womens Textiles",
  "Junior Textiles",
  "Replica Textiles",
  "Accessories",
  "Infant Textiles",
  "Childrens Footwear"
];

export const AssortmentMixExplorer: React.FC<AssortmentMixExplorerProps> = ({ 
  retailers, 
  categories, 
  priceRanges 
}) => {
  const [displayType, setDisplayType] = useState<'percentage' | 'count'>('percentage');
  const [assortmentData, setAssortmentData] = useState<AssortmentData>({});
  const { toast } = useToast();

  // Generate mock data
  useEffect(() => {
    const data: AssortmentData = {};
    
    retailers.forEach(retailer => {
      data[retailer.id] = {};
      
      predefinedCategories.forEach(catName => {
        data[retailer.id][catName] = {};
        
        priceRanges.forEach(priceRange => {
          const skuCount = Math.floor(Math.random() * 300) + 10;
          const percentage = parseFloat((Math.random() * 35).toFixed(1));
          
          data[retailer.id][catName][priceRange.id] = {
            count: skuCount,
            percentage,
            trend: {
              mom: parseFloat((Math.random() * 4 - 2).toFixed(1)), // -2 to +2
              yoy: parseFloat((Math.random() * 6 - 3).toFixed(1))  // -3 to +3
            }
          };
        });
      });
    });
    
    setAssortmentData(data);
  }, [retailers, priceRanges]);

  const handleExport = () => {
    toast({
      title: "Exporting data",
      description: "The assortment mix data is being exported to Excel",
    });
  };

  const getTrendColor = (value: number): string => {
    if (value > 0) return 'text-green-600';
    if (value < 0) return 'text-red-600';
    return 'text-gray-600';
  };

  return (
    <Card className="shadow-sm">
      <CardHeader className="border-b pb-4">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-xl font-semibold text-gray-900">Assortment Mix Explorer</CardTitle>
            <CardDescription className="text-sm text-gray-500">
              Compare SKU distribution across retailers and categories
            </CardDescription>
          </div>
          <Button 
            variant="outline" 
            size="icon"
            onClick={handleExport}
          >
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-gray-50">
              <TableRow>
                <TableHead className="font-medium text-gray-700 w-[260px]">Retailer / Category</TableHead>
                {priceRanges.map((range) => (
                  <TableHead 
                    key={range.id} 
                    className="text-center font-medium text-gray-700 min-w-[200px]"
                  >
                    {range.name}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {retailers.map((retailer) => (
                <React.Fragment key={retailer.id}>
                  {predefinedCategories.map((category, categoryIndex) => (
                    <TableRow 
                      key={`${retailer.id}-${category}`}
                      className={categoryIndex % 2 === 0 ? 'bg-white hover:bg-gray-50' : 'bg-gray-50 hover:bg-gray-100'}
                    >
                      <TableCell className="font-medium border-r bg-white">
                        <div className="flex items-center gap-1">
                          {categoryIndex === 0 && (
                            <div className="font-semibold text-gray-900 mb-2">{retailer.name}</div>
                          )}
                          <span className="text-gray-600 text-sm pl-4">{category}</span>
                        </div>
                      </TableCell>
                      {priceRanges.map((priceRange) => {
                        const data = assortmentData?.[retailer.id]?.[category]?.[priceRange.id];
                        const value = displayType === 'percentage' ? data?.percentage || 0 : data?.count || 0;
                        const mom = data?.trend?.mom || 0;
                        const yoy = data?.trend?.yoy || 0;
                        
                        return (
                          <TableCell 
                            key={`${retailer.id}-${category}-${priceRange.id}`} 
                            className="text-center p-3"
                          >
                            <div className="flex flex-col items-center gap-1">
                              <span className="font-medium text-gray-900">
                                {displayType === 'percentage' ? `${value}%` : value}
                              </span>
                              <div className="flex gap-2 text-xs">
                                <span className={getTrendColor(mom)}>
                                  {mom > 0 ? '+' : ''}{mom}
                                </span>
                                <span className={getTrendColor(yoy)}>
                                  {yoy > 0 ? '+' : ''}{yoy}
                                </span>
                              </div>
                            </div>
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  ))}
                </React.Fragment>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};
