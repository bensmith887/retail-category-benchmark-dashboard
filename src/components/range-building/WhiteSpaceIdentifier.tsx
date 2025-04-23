
import React, { useState } from 'react';
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
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ZAxis } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Download, Search } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface WhiteSpaceIdentifierProps {
  retailers: { id: string; name: string }[];
  categories: { id: string; name: string }[];
  priceRanges: { id: string; name: string; min: number; max: number }[];
}

// Dynamic Percentage Bar Component
const PercentageBar = ({ 
  percentage, 
  backgroundColor = '#F1F1F1', 
  fillColor = '#9b87f5' 
}: { 
  percentage: number; 
  backgroundColor?: string; 
  fillColor?: string; 
}) => (
  <div 
    className="w-full h-4 rounded-full overflow-hidden relative" 
    style={{ backgroundColor }}
  >
    <div 
      className="absolute top-0 left-0 h-full rounded-full" 
      style={{ 
        width: `${percentage}%`, // This ensures the width is exactly the percentage value
        backgroundColor: fillColor,
        transition: 'width 0.3s ease-in-out'
      }}
    />
    <span 
      className="absolute right-1 top-1/2 transform -translate-y-1/2 text-xs font-medium z-10"
      style={{ color: percentage > 70 ? 'white' : 'black' }}
    >
      {percentage.toFixed(1)}%
    </span>
  </div>
);

export const WhiteSpaceIdentifier: React.FC<WhiteSpaceIdentifierProps> = ({ 
  retailers, 
  categories, 
  priceRanges 
}) => {
  const [selectedRetailer, setSelectedRetailer] = useState<string>(retailers[0]?.id || '');
  const { toast } = useToast();
  
  // Generate mock white space data
  const generateWhiteSpaceData = () => {
    const data = categories.map(category => {
      const marketPresence = Math.random() * 100;
      const competitorCount = Math.floor(Math.random() * 5);
      const potentialSize = Math.random() * 1000000 + 100000;
      
      return {
        category: category.name,
        marketPresence,
        competitorCount,
        potentialSize,
        x: marketPresence, // X-axis: Market presence
        y: competitorCount, // Y-axis: Number of competitors
        z: potentialSize / 100000, // Z-axis (bubble size): Potential market size
        underplayed: marketPresence < 30 && competitorCount < 2
      };
    });
    
    return data;
  };
  
  const whiteSpaceData = generateWhiteSpaceData();
  const underplayedCategories = whiteSpaceData
    .filter(item => item.underplayed)
    .sort((a, b) => b.potentialSize - a.potentialSize)
    .slice(0, 5);
  
  const handleExport = () => {
    toast({
      title: "Exporting data",
      description: "The white space analysis data is being exported to Excel",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>White Space Identifier</CardTitle>
        <CardDescription>
          Discover underrepresented categories and price points with high potential
        </CardDescription>
        
        <div className="flex flex-wrap items-end gap-4 mt-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium">Retailer</label>
            <Select 
              value={selectedRetailer} 
              onValueChange={setSelectedRetailer}
            >
              <SelectTrigger className="w-52">
                <SelectValue placeholder="Select retailer" />
              </SelectTrigger>
              <SelectContent>
                {retailers.map(retailer => (
                  <SelectItem key={retailer.id} value={retailer.id}>
                    {retailer.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
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
      
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {categories.map((category, index) => (
            <div key={index} className="border p-4 rounded-md">
              <div className="flex justify-between mb-2">
                <span className="font-medium">{category.name}</span>
                <span className="text-sm text-gray-500">Market Presence</span>
              </div>
              <PercentageBar 
                percentage={Math.random() * 100} 
                backgroundColor="#F1F1F1" 
                fillColor="#9b87f5" 
              />
              <div className="flex justify-between mt-2">
                <span className="text-sm text-gray-500">PDP View Rate</span>
              </div>
              <PercentageBar 
                percentage={Math.random() * 100} 
                backgroundColor="#F1F1F1" 
                fillColor="#7E69AB" 
              />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
