
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
import { Badge } from '@/components/ui/badge';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';
import { Download, TrendingUp, TrendingDown, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface TrendDemandSignalsProps {
  retailers: { id: string; name: string }[];
  categories: { id: string; name: string }[];
}

export const TrendDemandSignals: React.FC<TrendDemandSignalsProps> = ({ 
  retailers, 
  categories 
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>(categories[0]?.id || '');
  const [timeRange, setTimeRange] = useState<string>('6');
  const { toast } = useToast();
  
  // Generate mock trend data over time
  const generateTrendData = () => {
    // Create dates for last 12 months
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const currentMonth = new Date().getMonth();
    
    return Array.from({ length: 12 }, (_, i) => {
      // Circular index to get months in order starting from current month - 11
      const monthIndex = (currentMonth - 11 + i) % 12;
      const monthName = months[monthIndex >= 0 ? monthIndex : monthIndex + 12];
      
      const result: any = { month: monthName };
      
      // Add retailers with some slight trends
      retailers.forEach(retailer => {
        // Base value with some randomness
        let base = Math.floor(Math.random() * 50) + 50;
        
        // Add trend based on retailer
        if (retailer.id === 'h&m') {
          // Slight upward trend
          base += i * 2;
        } else if (retailer.id === 'mango') {
          // Significant upward trend
          base += i * 4;
        } else if (retailer.id === 'monki') {
          // Stable with slight dip in middle
          base += (i < 6) ? -i : (i - 6);
        } else if (retailer.id === 'nakd') {
          // Downward trend
          base -= i * 3;
        } else {
          // Seasonal with peak in middle
          base += Math.sin((i / 11) * Math.PI) * 30;
        }
        
        // Add some randomness
        result[retailer.id] = Math.max(0, Math.floor(base + (Math.random() * 10 - 5)));
      });
      
      return result;
    });
  };
  
  const trendData = generateTrendData();
  
  // Generate alerts based on trend analysis
  const generateAlerts = () => {
    return [
      { 
        id: 1, 
        type: 'trending_up', 
        title: 'Jeans > Baggy', 
        change: '+34%', 
        detail: 'Significant SKU growth across competitors in last 3 months' 
      },
      { 
        id: 2, 
        type: 'trending_up', 
        title: 'Tops > Crop', 
        change: '+27%', 
        detail: 'Increasing at River Island and H&M with high search volume' 
      },
      { 
        id: 3, 
        type: 'opportunity', 
        title: 'Jeans > Carpenter', 
        change: '', 
        detail: 'New style trending on social media with low competitor coverage' 
      },
      { 
        id: 4, 
        type: 'trending_down', 
        title: 'Jeans > Skinny', 
        change: '-18%', 
        detail: 'Decreasing SKU count and search volume across market' 
      },
      { 
        id: 5, 
        type: 'trending_down', 
        title: 'Dresses > Bodycon', 
        change: '-12%', 
        detail: 'Declining at all major competitors' 
      }
    ];
  };
  
  const alerts = generateAlerts();
  
  const handleExport = () => {
    toast({
      title: "Exporting data",
      description: "The trend analysis data is being exported to Excel",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Trend & Demand Signals</CardTitle>
        <CardDescription>
          Track emerging or declining trends across categories and competitors
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
            <label className="text-sm font-medium">Time Range</label>
            <Select 
              value={timeRange} 
              onValueChange={setTimeRange}
            >
              <SelectTrigger className="w-40">
                <SelectValue placeholder="6 months" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="3">3 months</SelectItem>
                <SelectItem value="6">6 months</SelectItem>
                <SelectItem value="12">12 months</SelectItem>
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
                <LineChart
                  data={trendData.slice(-parseInt(timeRange))}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis label={{ value: 'SKU Count', angle: -90, position: 'insideLeft' }} />
                  <Tooltip />
                  <Legend />
                  {retailers.map((retailer, index) => (
                    <Line 
                      key={retailer.id}
                      type="monotone" 
                      dataKey={retailer.id} 
                      name={retailer.name}
                      stroke={
                        index === 0 ? "#8884d8" : 
                        index === 1 ? "#82ca9d" : 
                        index === 2 ? "#ffc658" : 
                        index === 3 ? "#ff8042" : 
                        "#ff6b81"
                      }
                      activeDot={{ r: 8 }}
                    />
                  ))}
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Trend Alerts</CardTitle>
                <CardDescription>
                  Notable category trends identified in the market
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {alerts.map(alert => (
                    <div key={alert.id} className="border rounded-md p-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          {alert.type === 'trending_up' ? (
                            <TrendingUp className="w-4 h-4 mr-2 text-green-600" />
                          ) : alert.type === 'trending_down' ? (
                            <TrendingDown className="w-4 h-4 mr-2 text-red-600" />
                          ) : (
                            <AlertCircle className="w-4 h-4 mr-2 text-blue-600" />
                          )}
                          <h3 className="font-medium">{alert.title}</h3>
                        </div>
                        
                        {alert.change && (
                          <Badge 
                            variant={alert.type === 'trending_up' ? 'default' : 'destructive'}
                          >
                            {alert.change}
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-500 mt-1">{alert.detail}</p>
                    </div>
                  ))}
                </div>
                
                <Button className="w-full mt-4" variant="outline">
                  View All Trends
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
