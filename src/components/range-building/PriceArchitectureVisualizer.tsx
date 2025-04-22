
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
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';
import { Download, Filter } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface PriceArchitectureVisualizerProps {
  retailers: { id: string; name: string }[];
  categories: { id: string; name: string }[];
  priceRanges: { id: string; name: string; min: number; max: number }[];
}

export const PriceArchitectureVisualizer: React.FC<PriceArchitectureVisualizerProps> = ({ 
  retailers, 
  categories, 
  priceRanges 
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>(categories[0]?.id || '');
  const [priceView, setPriceView] = useState<string>('actual');
  const { toast } = useToast();
  
  // Define price tiers
  const priceTiers = [
    { id: 'budget', name: 'Budget', range: '£0-20' },
    { id: 'value', name: 'Value', range: '£20-35' },
    { id: 'mid', name: 'Mid-Range', range: '£35-50' },
    { id: 'premium', name: 'Premium', range: '£50-65' },
    { id: 'luxury', name: 'Luxury', range: '£65+' }
  ];
  
  // Generate mock price architecture data
  const generatePriceData = () => {
    return retailers.map(retailer => {
      const result: any = { name: retailer.name };
      
      // Generate random distribution ensuring sum = 100%
      let remaining = 100;
      priceTiers.slice(0, -1).forEach(tier => {
        // Random value between 5 and remaining
        const max = remaining - 5 * (priceTiers.length - priceTiers.indexOf(tier) - 1);
        const min = 5;
        const value = Math.floor(Math.random() * (max - min) + min);
        result[tier.id] = value;
        remaining -= value;
      });
      
      // Assign remaining to last tier
      result[priceTiers[priceTiers.length - 1].id] = remaining;
      
      return result;
    });
  };
  
  const priceData = generatePriceData();
  
  const handleExport = () => {
    toast({
      title: "Exporting data",
      description: "The price architecture data is being exported to Excel",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Price Architecture Visualizer</CardTitle>
        <CardDescription>
          Analyze your price ladder compared to competitors across good-better-best tiers
        </CardDescription>
        
        <div className="flex flex-wrap items-end gap-4 mt-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium">Category</label>
            <Select 
              value={selectedCategory} 
              onValueChange={setSelectedCategory}
            >
              <SelectTrigger className="w-52">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(category => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium">Price View</label>
            <Select 
              value={priceView} 
              onValueChange={setPriceView}
            >
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Actual price" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="actual">Actual price</SelectItem>
                <SelectItem value="advertised">Advertised price</SelectItem>
                <SelectItem value="discount">Discount depth</SelectItem>
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
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <div className="h-[500px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={priceData}
                  layout="vertical"
                  margin={{ top: 20, right: 30, left: 150, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" unit="%" />
                  <YAxis 
                    dataKey="name" 
                    type="category" 
                    tick={{ fontSize: 12 }} 
                  />
                  <Tooltip 
                    formatter={(value: number) => [`${value}%`, '']}
                    cursor={{ fill: 'rgba(200, 200, 200, 0.2)' }}
                  />
                  <Legend />
                  {priceTiers.map((tier, index) => (
                    <Bar 
                      key={tier.id}
                      dataKey={tier.id} 
                      name={`${tier.name} (${tier.range})`} 
                      stackId="a" 
                      fill={
                        index === 0 ? "#8884d8" : 
                        index === 1 ? "#82ca9d" : 
                        index === 2 ? "#ffc658" : 
                        index === 3 ? "#ff8042" : 
                        "#ff6b81"
                      }
                    />
                  ))}
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Price Tier Definitions</CardTitle>
                <CardDescription>
                  How products are classified into pricing tiers
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {priceTiers.map((tier, index) => (
                    <div key={tier.id} className="flex items-center space-x-3">
                      <div 
                        className="w-4 h-4 rounded-sm" 
                        style={{ 
                          backgroundColor: 
                            index === 0 ? "#8884d8" : 
                            index === 1 ? "#82ca9d" : 
                            index === 2 ? "#ffc658" : 
                            index === 3 ? "#ff8042" : 
                            "#ff6b81"
                        }}
                      />
                      <div>
                        <p className="font-medium">{tier.name}</p>
                        <p className="text-sm text-gray-500">{tier.range}</p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 space-y-2">
                  <h4 className="font-medium">Key Insights:</h4>
                  <ul className="text-sm space-y-2">
                    <li>• H&M has the strongest value tier presence (20-35 GBP)</li>
                    <li>• River Island dominates the premium segment</li>
                    <li>• NA-KD shows balanced distribution across price tiers</li>
                    <li>• Opportunity to expand in mid-range tier</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
