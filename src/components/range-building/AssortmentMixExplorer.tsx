
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
  // Use the first 3 categories from the passed categories prop instead of hardcoded values
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    categories.slice(0, 3).map(cat => cat.id)
  );
  const [displayType, setDisplayType] = useState<'percentage' | 'count'>('percentage');
  const [priceInterval, setPriceInterval] = useState<string>('5');
  const [dateRange, setDateRange] = useState<string>('3');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [assortmentData, setAssortmentData] = useState<AssortmentData>({});
  const { toast } = useToast();

  useEffect(() => {
    const data: AssortmentData = {};
    
    retailers.forEach(retailer => {
      data[retailer.id] = {};
      
      selectedCategories.forEach(catId => {
        data[retailer.id][catId] = {};
        
        priceRanges.forEach(priceRange => {
          const isPricePointActive = Math.random() > 0.4 || 
            (priceRange.min >= 15 && priceRange.max <= 50);
          
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

  const filteredCategories = categories.filter(cat => 
    cat.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getBubbleSize = (value: number): string => {
    if (value === 0) return 'hidden';
    if (value < 1) return 'w-6 h-6';
    if (value < 5) return 'w-8 h-8';
    if (value < 10) return 'w-10 h-10';
    if (value < 15) return 'w-12 h-12';
    if (value < 20) return 'w-14 h-14';
    return 'w-16 h-16';
  };

  const getBubbleColor = (value: number, catId: string): string => {
    // Update color logic to work with the new category IDs
    if (catId.includes('mens_')) {
      return 'bg-blue-100 text-blue-800';
    } else if (catId.includes('womens_')) {
      return 'bg-green-100 text-green-800';
    } else if (catId.includes('junior_')) {
      return 'bg-pink-100 text-pink-800';
    } else if (catId.includes('replica_')) {
      return 'bg-purple-100 text-purple-800';
    } else if (catId.includes('accessories')) {
      return 'bg-orange-100 text-orange-800';
    } else if (catId.includes('infant_')) {
      return 'bg-yellow-100 text-yellow-800';
    } else if (catId.includes('childrens_')) {
      return 'bg-indigo-100 text-indigo-800';
    } else {
      return 'bg-gray-100 text-gray-800';
    }
  };

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

  return (
    <Card>
      <CardHeader>
        <CardTitle>Assortment Mix Explorer</CardTitle>
        <CardDescription>
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
        
        <div className="flex flex-wrap gap-2 mt-4">
          {filteredCategories.map(category => (
            <Button
              key={category.id}
              variant={selectedCategories.includes(category.id) ? "default" : "outline"}
              size="sm"
              onClick={() => toggleCategorySelection(category.id)}
              className="text-xs"
            >
              {category.name}
            </Button>
          ))}
        </div>
      </CardHeader>
      
      <CardContent className="px-0 pb-0">
        <div className="overflow-x-auto border-t">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="sticky left-0 bg-white font-medium w-[250px] border-r">
                  Retailer / Category
                </TableHead>
                {priceRanges.map(priceRange => (
                  <TableHead 
                    key={priceRange.id} 
                    className="text-center font-medium px-6"
                  >
                    {priceRange.name}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {retailers.map(retailer => (
                <React.Fragment key={retailer.id}>
                  {selectedCategories.map((catId, index) => {
                    const category = categories.find(c => c.id === catId);
                    return (
                      <TableRow key={`${retailer.id}-${catId}`} className={index === 0 ? 'border-t-2' : ''}>
                        <TableCell className="sticky left-0 bg-white font-medium border-r">
                          {index === 0 && (
                            <div className="font-bold mb-2">{retailer.name}</div>
                          )}
                          <div className="pl-4">{category?.name || catId}</div>
                        </TableCell>
                        {priceRanges.map(priceRange => {
                          const data = assortmentData?.[retailer.id]?.[catId]?.[priceRange.id];
                          const value = displayType === 'percentage' ? data?.percentage || 0 : data?.count || 0;
                          const displayValue = displayType === 'percentage' ? `${value}%` : value;
                          
                          return (
                            <TableCell 
                              key={`${retailer.id}-${catId}-${priceRange.id}`} 
                              className="text-center p-4"
                            >
                              {value > 0 && (
                                <div className="flex justify-center items-center">
                                  <div 
                                    className={`${getBubbleSize(value)} ${getBubbleColor(value, catId)} rounded-full flex items-center justify-center text-xs font-medium`}
                                  >
                                    {displayValue}
                                  </div>
                                </div>
                              )}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    );
                  })}
                </React.Fragment>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};
