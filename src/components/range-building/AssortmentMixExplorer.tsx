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
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Switch } from "@/components/ui/switch";
import AssortmentBubble from "./AssortmentBubble";
import SizingCell from "./SizingCell";
import AssortmentMixTable from "./AssortmentMixTable";

interface AssortmentMixExplorerProps {
  retailers: { id: string; name: string }[];
  categories: { id: string; name: string }[];
  priceRanges: { id: string; name: string; min: number; max: number }[];
}

interface SkuData {
  count: number;
  percentage: number;
  pdvs: number;
  pdvPercentage?: number;
}

type AssortmentData = Record<string, Record<string, Record<string, SkuData>>>;

type DisplayMetric = 'range-percentage' | 'pdv-percentage';

interface PriceRange {
  id: string;
  name: string;
  min: number;
  max: number;
}

export const AssortmentMixExplorer: React.FC<AssortmentMixExplorerProps> = ({
  retailers,
  categories,
  priceRanges: defaultPriceRanges
}) => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    categories.slice(0, 3).map(cat => cat.id)
  );
  const [displayMetric, setDisplayMetric] = useState<DisplayMetric>('range-percentage');
  const [minPrice, setMinPrice] = useState<string>("10");
  const [maxPrice, setMaxPrice] = useState<string>("100");
  const [priceInterval, setPriceInterval] = useState<string>("10");
  const [generatedPriceRanges, setGeneratedPriceRanges] = useState<PriceRange[]>([]);
  const [dateRange, setDateRange] = useState<string>('3');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [assortmentData, setAssortmentData] = useState<AssortmentData>({});
  const [showTotalRange, setShowTotalRange] = useState(false);
  const [selectedRetailers, setSelectedRetailers] = useState<string[]>(
    retailers.map(r => r.id)
  );
  const { toast } = useToast();

  const generatePriceRanges = () => {
    const min = parseInt(minPrice);
    const max = parseInt(maxPrice);
    const interval = parseInt(priceInterval);
    const ranges: PriceRange[] = [];
    
    for (let i = min; i < max; i += interval) {
      ranges.push({
        id: `${i}-${i + interval}`,
        name: `£${i}-${i + interval}`,
        min: i,
        max: i + interval
      });
    }
    
    ranges.push({
      id: `${max}+`,
      name: `£${max}+`,
      min: max,
      max: Infinity
    });
    
    setGeneratedPriceRanges(ranges);
  };

  useEffect(() => {
    generatePriceRanges();
  }, [minPrice, maxPrice, priceInterval]);

  useEffect(() => {
    const data: AssortmentData = {};
    
    retailers.forEach(retailer => {
      data[retailer.id] = {};
      
      selectedCategories.forEach(catId => {
        data[retailer.id][catId] = {};
        let totalPercentage = 0;
        let totalPDVs = 0;
        const tempRangeData: Record<string, SkuData> = {};
        
        generatedPriceRanges.forEach(priceRange => {
          const isPricePointActive = Math.random() > 0.4 || 
            (priceRange.min >= 15 && priceRange.max <= 50);
          
          if (isPricePointActive) {
            const skuCount = Math.floor(Math.random() * 300) + 10;
            const percentage = parseFloat((Math.random() * 25).toFixed(1));
            const pdvs = Math.floor(Math.random() * 10000) + 100;
            
            tempRangeData[priceRange.id] = {
              count: skuCount,
              percentage,
              pdvs
            };
            totalPercentage += percentage;
            totalPDVs += pdvs;
          } else {
            tempRangeData[priceRange.id] = {
              count: 0,
              percentage: 0,
              pdvs: 0
            };
          }
        });

        const rangeNormalizationFactor = totalPercentage > 0 ? 100 / totalPercentage : 1;
        const pdvNormalizationFactor = totalPDVs > 0 ? 100 / totalPDVs : 1;

        generatedPriceRanges.forEach(priceRange => {
          if (tempRangeData[priceRange.id]) {
            const normalizedRangePercentage = parseFloat((tempRangeData[priceRange.id].percentage * rangeNormalizationFactor).toFixed(1));
            const normalizedPDVPercentage = parseFloat(((tempRangeData[priceRange.id].pdvs * pdvNormalizationFactor)).toFixed(1));
            
            data[retailer.id][catId][priceRange.id] = {
              ...tempRangeData[priceRange.id],
              percentage: normalizedRangePercentage,
              pdvs: tempRangeData[priceRange.id].pdvs,
              pdvPercentage: normalizedPDVPercentage
            };
          }
        });
      });
    });
    
    setAssortmentData(data);
  }, [retailers, selectedCategories, generatedPriceRanges]);

  const filteredCategories = categories.filter(cat => 
    cat.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getBarColor = (value: number) => {
    if (value >= 15) return 'bg-blue-600';
    if (value >= 10) return 'bg-blue-500';
    if (value >= 6) return 'bg-blue-400';
    if (value >= 3) return 'bg-blue-300';
    if (value > 0) return 'bg-blue-200';
    return 'bg-gray-100';
  };

  const getBubbleColor = (value: number, catId: string | null): string => {
    if (!catId) return 'bg-gray-100 text-gray-800';
    
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

  const getDisplayValue = (data: SkuData | undefined): { primary: string; secondary: string } => {
    if (!data) return { primary: '', secondary: '' };
    
    switch (displayMetric) {
      case 'pdv-percentage':
        return {
          primary: `${data.pdvPercentage?.toFixed(1)}%`,
          secondary: data.pdvs.toLocaleString()
        };
      default:
        return {
          primary: `${data.percentage.toFixed(1)}%`,
          secondary: data.count.toString()
        };
    }
  };

  const getTotalPDVs = () => {
    let total = 0;
    Object.values(assortmentData).forEach(retailerData => {
      Object.values(retailerData).forEach(categoryData => {
        Object.values(categoryData).forEach(data => {
          total += data.pdvs;
        });
      });
    });
    return total;
  };

  const calculateRetailerTotals = (retailerId: string) => {
    const totals: Record<string, number> = {
      count: 0,
      pdvs: 0
    };
    
    const priceRangeTotals: Record<string, { count: number; pdvs: number }> = {};
    
    generatedPriceRanges.forEach(range => {
      priceRangeTotals[range.id] = { count: 0, pdvs: 0 };
    });

    if (assortmentData[retailerId]) {
      selectedCategories.forEach(catId => {
        if (assortmentData[retailerId][catId]) {
          Object.entries(assortmentData[retailerId][catId]).forEach(([priceRangeId, data]) => {
            totals.count += data.count;
            totals.pdvs += data.pdvs;
            priceRangeTotals[priceRangeId].count += data.count;
            priceRangeTotals[priceRangeId].pdvs += data.pdvs;
          });
        }
      });
    }

    const normalizedTotals: Record<string, SkuData> = {};
    Object.entries(priceRangeTotals).forEach(([priceRangeId, data]) => {
      normalizedTotals[priceRangeId] = {
        count: data.count,
        pdvs: data.pdvs,
        percentage: totals.count > 0 ? (data.count / totals.count) * 100 : 0,
        pdvPercentage: totals.pdvs > 0 ? (data.pdvs / totals.pdvs) * 100 : 0
      };
    });

    return normalizedTotals;
  };

  const toggleRetailerSelection = (retailerId: string) => {
    setSelectedRetailers(prev =>
      prev.includes(retailerId)
        ? prev.filter(id => id !== retailerId)
        : [...prev, retailerId]
    );
  };

  const toggleAllRetailers = () => {
    if (selectedRetailers.length === retailers.length) {
      setSelectedRetailers([]);
    } else {
      setSelectedRetailers(retailers.map(r => r.id));
    }
  };

  const filteredRetailers = retailers.filter(r => selectedRetailers.includes(r.id));

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Assortment Mix Explorer</CardTitle>
        <CardDescription className="text-xs">
          Compare SKU distribution across retailers, categories, and price points
        </CardDescription>
        
        <div className="flex flex-wrap gap-2 mb-2">
          <label className="text-xs font-medium mr-2">Retailers:</label>
          <Button
            size="sm"
            variant={selectedRetailers.length === retailers.length ? "default" : "outline"}
            className="text-xs px-2 h-6"
            onClick={toggleAllRetailers}
            type="button"
          >
            {selectedRetailers.length === retailers.length ? "Unselect All" : "Select All"}
          </Button>
          {retailers.map(retailer => (
            <Button
              key={retailer.id}
              size="sm"
              variant={selectedRetailers.includes(retailer.id) ? "default" : "outline"}
              className="text-xs px-2 h-6"
              onClick={() => toggleRetailerSelection(retailer.id)}
              type="button"
            >
              {retailer.name}
            </Button>
          ))}
        </div>
        
        <div className="flex flex-wrap items-end gap-2 mt-2">
          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium">Display Metric</label>
            <ToggleGroup
              type="single"
              value={displayMetric}
              onValueChange={(value) => {
                if (value) setDisplayMetric(value as DisplayMetric);
              }}
              className="text-xs"
            >
              <ToggleGroupItem value="range-percentage" aria-label="Show range percentages" className="text-xs px-2 py-1">
                % of Range
              </ToggleGroupItem>
              <ToggleGroupItem value="pdv-percentage" aria-label="Show PDV percentages" className="text-xs px-2 py-1">
                PDV %
              </ToggleGroupItem>
            </ToggleGroup>
          </div>
          
          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium">Price Range (£)</label>
            <div className="flex gap-1 items-center">
              <Input
                type="number"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                className="w-16 h-8 text-xs px-2"
                min="0"
              />
              <span className="text-xs">to</span>
              <Input
                type="number"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="w-16 h-8 text-xs px-2"
                min="0"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium">Price Interval (£)</label>
            <Select value={priceInterval} onValueChange={setPriceInterval}>
              <SelectTrigger className="w-20 h-8 text-xs">
                <SelectValue placeholder="£5" className="text-xs" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="5" className="text-xs">£5</SelectItem>
                <SelectItem value="10" className="text-xs">£10</SelectItem>
                <SelectItem value="15" className="text-xs">£15</SelectItem>
                <SelectItem value="20" className="text-xs">£20</SelectItem>
                <SelectItem value="25" className="text-xs">£25</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium">Date Range</label>
            <Select 
              value={dateRange} 
              onValueChange={setDateRange}
            >
              <SelectTrigger className="w-28 h-8 text-xs">
                <SelectValue placeholder="Last 3 months" className="text-xs" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="3" className="text-xs">Last 3 months</SelectItem>
                <SelectItem value="6" className="text-xs">Last 6 months</SelectItem>
                <SelectItem value="12" className="text-xs">Last 12 months</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex flex-col gap-1 grow">
            <label className="text-xs font-medium">Search Categories</label>
            <Input 
              placeholder="Search categories..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full h-8 text-xs px-2"
            />
          </div>
          
          <Button 
            variant="outline" 
            size="icon" 
            className="flex items-center h-8 w-8" 
            onClick={handleExport}
          >
            <Download size={14} />
          </Button>
        </div>
        
        <div className="flex flex-wrap gap-1 mt-2">
          {filteredCategories.map(category => (
            <Button
              key={category.id}
              variant={selectedCategories.includes(category.id) ? "default" : "outline"}
              size="sm"
              onClick={() => toggleCategorySelection(category.id)}
              className="text-xs h-6 px-2"
              type="button"
            >
              {category.name}
            </Button>
          ))}
        </div>
        
        <div className="flex items-center gap-1 mt-1">
          <label className="text-xs font-medium mr-1">Show Totals</label>
          <Switch
            checked={showTotalRange}
            onCheckedChange={setShowTotalRange}
          />
        </div>
      </CardHeader>
      
      <CardContent className="px-0 pb-0">
        <AssortmentMixTable
          filteredRetailers={filteredRetailers}
          categories={categories}
          generatedPriceRanges={generatedPriceRanges}
          selectedCategories={selectedCategories}
          showTotalRange={showTotalRange}
          displayMetric={displayMetric}
          assortmentData={assortmentData}
          calculateRetailerTotals={calculateRetailerTotals}
          getDisplayValue={getDisplayValue}
        />
      </CardContent>
    </Card>
  );
};
