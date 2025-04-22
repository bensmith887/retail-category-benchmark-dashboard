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
import { FileText, Filter, Download } from 'lucide-react';
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useToast } from '@/hooks/use-toast';

interface AssortmentMixExplorerProps {
  retailers: { id: string; name: string }[];
  categories: { id: string; name: string }[];
  priceRanges: { id: string; name: string; min: number; max: number }[];
}

interface SkuData {
  count: number;
  percentage: number;
}

type AssortmentData = Record<string, Record<string, Record<string, SkuData>>>;

export const AssortmentMixExplorer: React.FC<AssortmentMixExplorerProps> = ({ 
  retailers, 
  categories, 
  priceRanges 
}) => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>(['jeans_skinny', 'jeans_slim', 'jeans_straight']);
  const [displayType, setDisplayType] = useState<'percentage' | 'count'>('percentage');
  const [priceInterval, setPriceInterval] = useState<string>('5');
  const [dateRange, setDateRange] = useState<string>('3');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [assortmentData, setAssortmentData] = useState<AssortmentData>({});
  const { toast } = useToast();

  // Generate mock data
  useEffect(() => {
    const data: AssortmentData = {};
    
    retailers.forEach(retailer => {
      data[retailer.id] = {};
      
      selectedCategories.forEach(catId => {
        data[retailer.id][catId] = {};
        
        priceRanges.forEach(priceRange => {
          // Generate random data - higher chance of data in middle price ranges
          const isPricePointActive = Math.random() > 0.4 || 
            (priceRange.min >= 15 && priceRange.max <= 50); // More likely to have products in mid-range
          
          if (isPricePointActive) {
            const skuCount = Math.floor(Math.random() * 300) + 10;
            const percentage = parseFloat((Math.random() * 25).toFixed(1));
            
            data[retailer.id][catId][priceRange.id] = {
              count: skuCount,
              percentage
            };
          } else {
            data[retailer.id][catId][priceRange.id] = {
              count: 0,
              percentage: 0
            };
          }
        });
      });
    });
    
    setAssortmentData(data);
  }, [retailers, selectedCategories, priceRanges]);

  // Filter categories based on search term
  const filteredCategories = categories.filter(cat => 
    cat.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCategoryChange = (categoryIds: string[]) => {
    setSelectedCategories(categoryIds);
  };

  const toggleCategorySelection = (categoryId: string) => {
    if (selectedCategories.includes(categoryId)) {
      setSelectedCategories(selectedCategories.filter(id => id !== categoryId));
    } else {
      setSelectedCategories([...selectedCategories, categoryId]);
    }
  };

  const handleExport = () => {
    toast({
      title: "Exporting data",
      description: "The assortment mix data is being exported to Excel",
    });
  };

  // Function to determine bubble size class based on percentage value
  const getBubbleSize = (value: number): string => {
    if (value === 0) return 'hidden';
    if (value < 5) return 'w-6 h-6';
    if (value < 10) return 'w-8 h-8';
    return 'w-10 h-10';
  };

  // Function to determine color class based on percentage value
  const getBubbleColor = (value: number): string => {
    if (value === 0) return 'bg-gray-50 text-gray-400';
    if (value < 25) return 'bg-red-50 text-red-600';
    if (value < 50) return 'bg-orange-50 text-orange-600';
    if (value < 75) return 'bg-blue-50 text-blue-600';
    return 'bg-green-50 text-green-600';
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-gray-900">Assortment Mix Explorer</CardTitle>
        <CardDescription className="text-sm text-gray-500">
          Compare SKU distribution across retailers, categories, and price points
        </CardDescription>
        
        <div className="flex flex-wrap items-end gap-4 mt-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium">Display</label>
            <Select 
              value={displayType} 
              onValueChange={(val) => setDisplayType(val as 'percentage' | 'count')}
            >
              <SelectTrigger className="w-36">
                <SelectValue placeholder="Percentage" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="percentage">Percentage</SelectItem>
                <SelectItem value="count">SKU Count</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium">Price Interval</label>
            <Select 
              value={priceInterval} 
              onValueChange={setPriceInterval}
            >
              <SelectTrigger className="w-36">
                <SelectValue placeholder="£5" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="5">£5</SelectItem>
                <SelectItem value="10">£10</SelectItem>
                <SelectItem value="15">£15</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium">Date Range</label>
            <Select 
              value={dateRange} 
              onValueChange={setDateRange}
            >
              <SelectTrigger className="w-36">
                <SelectValue placeholder="Last 3 months" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="3">Last 3 months</SelectItem>
                <SelectItem value="6">Last 6 months</SelectItem>
                <SelectItem value="12">Last 12 months</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex flex-col gap-1.5 grow">
            <label className="text-sm font-medium">Search Categories</label>
            <Input 
              placeholder="Search categories..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
            />
          </div>
          
          <Button 
            variant="outline" 
            size="icon" 
            className="flex items-center" 
            onClick={handleExport}
          >
            <Download size={16} />
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="px-0">
        <div className="overflow-x-auto border-t">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead className="font-medium w-[200px]">Category / Retailer</TableHead>
                {priceRanges.map((range) => (
                  <TableHead key={range.id} className="text-center font-medium">
                    {range.name}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {categories.map((category, categoryIndex) => (
                <React.Fragment key={category.id}>
                  {retailers.map((retailer, retailerIndex) => (
                    <TableRow 
                      key={`${category.id}-${retailer.id}`}
                      className={retailerIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                    >
                      <TableCell className="font-medium border-r">
                        {retailerIndex === 0 && (
                          <div className="font-semibold text-gray-900 mb-2">{category.name}</div>
                        )}
                        <span className="text-gray-600">{retailer.name}</span>
                      </TableCell>
                      {priceRanges.map((priceRange) => {
                        const data = assortmentData?.[retailer.id]?.[category.id]?.[priceRange.id];
                        const value = displayType === 'percentage' ? data?.percentage || 0 : data?.count || 0;
                        const displayValue = displayType === 'percentage' ? `${value}%` : value;
                        
                        return (
                          <TableCell 
                            key={`${retailer.id}-${category.id}-${priceRange.id}`} 
                            className="text-center p-4"
                          >
                            {value > 0 && (
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <div className="flex justify-center items-center">
                                      <div className={`
                                        ${getBubbleSize(value)} 
                                        ${getBubbleColor(value)}
                                        rounded-full flex items-center justify-center 
                                        text-xs font-medium
                                      `}>
                                        {displayValue}
                                      </div>
                                    </div>
                                  </TooltipTrigger>
                                  <TooltipContent className="bg-white p-3 shadow-lg border">
                                    <div className="space-y-2">
                                      <div className="font-semibold">{category.name}</div>
                                      <div className="text-sm text-gray-600">{retailer.name}</div>
                                      <div className="text-sm">Price Range: {priceRange.name}</div>
                                      <div className="font-medium">
                                        {displayType === 'percentage' ? `${value}% Coverage` : `${value} SKUs`}
                                      </div>
                                    </div>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            )}
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
