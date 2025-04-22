
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
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell  
} from 'recharts';
import { Download, Share2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface DiscountingAnalysisProps {
  retailers: { id: string; name: string }[];
  categories: { id: string; name: string }[];
}

export const DiscountingAnalysis: React.FC<DiscountingAnalysisProps> = ({ 
  retailers, 
  categories 
}) => {
  const [selectedRetailer, setSelectedRetailer] = useState<string>(retailers[0]?.id || '');
  const [selectedCategory, setSelectedCategory] = useState<string>(categories[0]?.id || '');
  const [discountView, setDiscountView] = useState<string>('actual');
  const { toast } = useToast();
  
  // Define discount bands
  const discountBands = [
    { name: '0-10%', range: [0, 10] },
    { name: '11-20%', range: [11, 20] },
    { name: '21-30%', range: [21, 30] },
    { name: '31-40%', range: [31, 40] },
    { name: '41-50%', range: [41, 50] },
    { name: '51%+', range: [51, 100] }
  ];
  
  // Generate mock discount distribution data
  const generateDiscountData = () => {
    return retailers.map(retailer => {
      const result: any = { name: retailer.name };
      
      // Generate random distribution ensuring sum = 100%
      let remaining = 100;
      discountBands.slice(0, -1).forEach(band => {
        // Random value
        const value = Math.floor(Math.random() * 25) + 1;
        result[band.name] = Math.min(value, remaining);
        remaining -= result[band.name];
      });
      
      // Assign remaining to last band
      result[discountBands[discountBands.length - 1].name] = remaining;
      
      return result;
    });
  };
  
  // Generate pie chart data for percent of assortment on discount
  const generateDiscountPercentData = () => {
    return retailers.map(retailer => {
      // Random percentage between 15-50%
      const onDiscount = Math.floor(Math.random() * 35) + 15;
      
      return [
        { name: 'On Discount', value: onDiscount },
        { name: 'Regular Price', value: 100 - onDiscount }
      ];
    });
  };
  
  const discountData = generateDiscountData();
  const discountPercentData = generateDiscountPercentData();
  const selectedRetailerIndex = retailers.findIndex(r => r.id === selectedRetailer);
  const currentRetailerDiscountData = discountPercentData[selectedRetailerIndex >= 0 ? selectedRetailerIndex : 0];
  
  const COLORS = ['#0088FE', '#EFEFEF'];
  
  const handleExport = () => {
    toast({
      title: "Exporting data",
      description: "The discounting analysis data is being exported to Excel",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Discounting & Promotions Analysis</CardTitle>
        <CardDescription>
          Monitor discounting strategies and depth across competitors
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
            <label className="text-sm font-medium">Discount View</label>
            <Select 
              value={discountView} 
              onValueChange={setDiscountView}
            >
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Actual" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="actual">Actual</SelectItem>
                <SelectItem value="advertised">Advertised</SelectItem>
                <SelectItem value="deepest">Deepest</SelectItem>
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
                  data={discountData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis unit="%" />
                  <Tooltip 
                    formatter={(value: number) => [`${value}%`, 'Percentage of SKUs']}
                    cursor={{ fill: 'rgba(200, 200, 200, 0.2)' }}
                  />
                  <Legend />
                  {discountBands.map((band, index) => (
                    <Bar 
                      key={band.name}
                      dataKey={band.name} 
                      fill={
                        index === 0 ? "#8884d8" : 
                        index === 1 ? "#82ca9d" : 
                        index === 2 ? "#ffc658" : 
                        index === 3 ? "#ff8042" : 
                        index === 4 ? "#ff6b81" :
                        "#b967ff"
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
                <CardTitle className="text-lg">Assortment on Discount</CardTitle>
                <CardDescription>
                  Percentage of products currently discounted
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[250px] flex justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={currentRetailerDiscountData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        fill="#8884d8"
                        paddingAngle={5}
                        dataKey="value"
                        label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {currentRetailerDiscountData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value: number) => [`${value}%`, '']} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="mt-6 space-y-2">
                  <h4 className="font-medium">Key Insights:</h4>
                  <ul className="text-sm space-y-2">
                    <li>• H&M offers moderate discounts (10-30%) on a large portion of assortment</li>
                    <li>• Mango has the deepest discounts in premium categories</li>
                    <li>• River Island maintains higher prices with fewer promotions</li>
                    <li>• NA-KD frequently discounts but at lower percentages</li>
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
