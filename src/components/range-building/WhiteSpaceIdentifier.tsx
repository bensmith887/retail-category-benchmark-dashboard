
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
        <div className="grid md:grid-cols-5 gap-6">
          <div className="md:col-span-3">
            <div className="h-[500px]">
              <ResponsiveContainer width="100%" height="100%">
                <ScatterChart
                  margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    type="number" 
                    dataKey="x" 
                    name="Market Presence" 
                    unit="%" 
                    domain={[0, 100]}
                    label={{ value: 'Market Presence (%)', position: 'bottom', offset: 0 }}
                  />
                  <YAxis 
                    type="number" 
                    dataKey="y" 
                    name="Competitors" 
                    domain={[0, 5]}
                    label={{ value: 'Number of Competitors', angle: -90, position: 'insideLeft' }}
                  />
                  <ZAxis 
                    type="number" 
                    dataKey="z" 
                    range={[50, 400]} 
                    name="Potential Size" 
                    unit="K"
                  />
                  <Tooltip 
                    cursor={{ strokeDasharray: '3 3' }}
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const data = payload[0].payload;
                        return (
                          <div className="bg-white border rounded-md p-3 shadow-md">
                            <p className="font-medium">{data.category}</p>
                            <p>Market Presence: {data.marketPresence.toFixed(1)}%</p>
                            <p>Competitors: {data.competitorCount}</p>
                            <p>Potential Size: £{(data.potentialSize/1000).toFixed(0)}K</p>
                            {data.underplayed && (
                              <p className="font-medium text-green-600 mt-1">
                                ★ Underplayed Opportunity
                              </p>
                            )}
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Scatter 
                    name="Categories" 
                    data={whiteSpaceData} 
                    fill="#8884d8"
                    fillOpacity={0.8}
                  />
                </ScatterChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-center">
                  <Search className="w-4 h-4 mr-2 text-green-600" />
                  <CardTitle className="text-lg">Top Underplayed Categories</CardTitle>
                </div>
                <CardDescription>
                  Categories with high potential and low competition
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {underplayedCategories.map((category, index) => (
                    <div key={index} className="border rounded-md p-3">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium text-base">{category.category}</h3>
                        <span className="text-green-600 font-medium">★ {index + 1}</span>
                      </div>
                      <div className="grid grid-cols-3 gap-2 mt-2 text-sm">
                        <div>
                          <p className="text-gray-500">Market Presence</p>
                          <p className="font-medium">{category.marketPresence.toFixed(1)}%</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Competitors</p>
                          <p className="font-medium">{category.competitorCount}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Potential</p>
                          <p className="font-medium">£{(category.potentialSize/1000).toFixed(0)}K</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
