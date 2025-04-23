
import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Download } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface AssortmentControlsProps {
  retailers: { id: string; name: string }[];
  categories: { id: string; name: string }[];
  selectedRetailers: string[];
  selectedCategories: string[];
  displayMetric: 'range-percentage' | 'pdv-percentage';
  minPrice: string;
  maxPrice: string;
  priceInterval: string;
  dateRange: string;
  searchTerm: string;
  showTotalRange: boolean;
  onRetailerToggle: (retailerId: string) => void;
  onAllRetailersToggle: () => void;
  onCategoryToggle: (categoryId: string) => void;
  onDisplayMetricChange: (value: 'range-percentage' | 'pdv-percentage') => void;
  onMinPriceChange: (value: string) => void;
  onMaxPriceChange: (value: string) => void;
  onPriceIntervalChange: (value: string) => void;
  onDateRangeChange: (value: string) => void;
  onSearchTermChange: (value: string) => void;
  onShowTotalRangeChange: (value: boolean) => void;
}

export const AssortmentControls: React.FC<AssortmentControlsProps> = ({
  retailers,
  categories,
  selectedRetailers,
  selectedCategories,
  displayMetric,
  minPrice,
  maxPrice,
  priceInterval,
  dateRange,
  searchTerm,
  showTotalRange,
  onRetailerToggle,
  onAllRetailersToggle,
  onCategoryToggle,
  onDisplayMetricChange,
  onMinPriceChange,
  onMaxPriceChange,
  onPriceIntervalChange,
  onDateRangeChange,
  onSearchTermChange,
  onShowTotalRangeChange,
}) => {
  const { toast } = useToast();

  const handleExport = () => {
    toast({
      title: "Exporting data",
      description: "The assortment mix data is being exported to Excel",
    });
  };

  const filteredCategories = categories.filter(cat => 
    cat.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2 mb-2">
        <label className="text-xs font-medium mr-2">Retailers:</label>
        <Button
          size="sm"
          variant={selectedRetailers.length === retailers.length ? "default" : "outline"}
          className="text-xs px-2 h-6"
          onClick={onAllRetailersToggle}
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
            onClick={() => onRetailerToggle(retailer.id)}
            type="button"
          >
            {retailer.name}
          </Button>
        ))}
      </div>
      
      <div className="flex flex-wrap items-end gap-2">
        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium">Display Metric</label>
          <ToggleGroup
            type="single"
            value={displayMetric}
            onValueChange={(value) => {
              if (value) onDisplayMetricChange(value as 'range-percentage' | 'pdv-percentage');
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
              onChange={(e) => onMinPriceChange(e.target.value)}
              className="w-16 h-8 text-xs px-2"
              min="0"
            />
            <span className="text-xs">to</span>
            <Input
              type="number"
              value={maxPrice}
              onChange={(e) => onMaxPriceChange(e.target.value)}
              className="w-16 h-8 text-xs px-2"
              min="0"
            />
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium">Price Interval (£)</label>
          <Select value={priceInterval} onValueChange={onPriceIntervalChange}>
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
          <Select value={dateRange} onValueChange={onDateRangeChange}>
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
            onChange={(e) => onSearchTermChange(e.target.value)}
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
      
      <div className="flex flex-wrap gap-1">
        {filteredCategories.map(category => (
          <Button
            key={category.id}
            variant={selectedCategories.includes(category.id) ? "default" : "outline"}
            size="sm"
            onClick={() => onCategoryToggle(category.id)}
            className="text-xs h-6 px-2"
            type="button"
          >
            {category.name}
          </Button>
        ))}
      </div>
      
      <div className="flex items-center gap-1">
        <label className="text-xs font-medium mr-1">Show Totals</label>
        <Switch
          checked={showTotalRange}
          onCheckedChange={onShowTotalRangeChange}
        />
      </div>
    </div>
  );
};
