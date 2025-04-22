
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell
} from 'recharts';
import { Download, TrendingUp, TrendingDown, AlertCircle } from 'lucide-react';
import { ChartContainer, ChartTooltipContent, ChartTooltip } from '@/components/ui/chart';
import { useToast } from '@/hooks/use-toast';
import AssortmentBarIndicator from './AssortmentBarIndicator';

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
  const [trendView, setTrendView] = useState<string>('line-chart');
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

  // Generate mock price band heatmap data
  const generatePriceBandHeatmapData = () => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
    const priceBands = ['£5-15', '£15-25', '£25-35', '£35-45', '£45-55', '£55-65', '£65-75', '£75-85'];
    
    // Create data with a pattern - some price bands getting hotter over time
    return months.map((month, monthIndex) => {
      const result: any = { name: month };
      
      priceBands.forEach((band, bandIndex) => {
        // Create different patterns for different price bands
        let value;
        
        if (bandIndex === 2 || bandIndex === 3) {
          // Bands that are growing in popularity (£25-35, £35-45)
          value = 20 + (monthIndex * 12) + Math.floor(Math.random() * 10);
        } else if (bandIndex === 5 || bandIndex === 6) {
          // Bands showing sudden growth in the last 3 months (£55-65, £65-75)
          value = 15 + (monthIndex > 2 ? (monthIndex - 2) * 25 : 0) + Math.floor(Math.random() * 10);
        } else if (bandIndex === 0) {
          // Declining band (£5-15)
          value = 80 - (monthIndex * 10) + Math.floor(Math.random() * 10);
        } else {
          // Stable bands
          value = 30 + Math.floor(Math.random() * 20);
        }
        
        // Add skuPresent flag - your brand has products in some price bands
        const skuPresent = [0, 1, 2, 4].includes(bandIndex);
        
        result[band] = value;
        result[`${band}_present`] = skuPresent;
      });
      
      return result;
    });
  };
  
  // Generate mock data for PDP share by price tier
  const generatePDPShareData = () => {
    const priceBands = ['£5-15', '£15-25', '£25-35', '£35-45', '£45-55', '£55-65', '£65-75', '£75-85'];
    
    return priceBands.map(band => {
      // Create a distribution that shows different patterns at different price points
      let yourShare, competitorShare;
      
      if (band === '£25-35' || band === '£35-45') {
        // Strong in mid-price
        yourShare = 55 + Math.floor(Math.random() * 15);
      } else if (band === '£55-65' || band === '£65-75') {
        // Weak in premium
        yourShare = 15 + Math.floor(Math.random() * 10);
      } else if (band === '£5-15') {
        // Moderate in budget
        yourShare = 40 + Math.floor(Math.random() * 10);
      } else {
        // Average elsewhere
        yourShare = 30 + Math.floor(Math.random() * 20);
      }
      
      competitorShare = 100 - yourShare;
      
      return {
        name: band,
        'Your Brand': yourShare,
        'Competitors': competitorShare,
        totalViews: Math.floor(Math.random() * 5000) + 1000
      };
    });
  };
  
  const priceHeatmapData = generatePriceBandHeatmapData();
  const pdpShareData = generatePDPShareData();
  
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

  // Custom formatter for heatmap tooltip
  const heatmapTooltipFormatter = (value: number, name: string, props: any) => {
    // Remove the _present suffix for display
    const displayName = name.endsWith('_present') ? null : name;
    if (displayName) {
      return [`${value} PDP views`, displayName];
    }
    return null;
  };

  // Custom color scale for heatmap - from light to dark blue
  const getHeatmapColor = (value: number) => {
    // Scale from light blue to dark blue based on value
    if (value < 20) return '#e3f2fd';
    if (value < 40) return '#bbdefb';
    if (value < 60) return '#90caf9';
    if (value < 80) return '#64b5f6';
    if (value < 100) return '#42a5f5';
    if (value < 120) return '#2196f3';
    return '#1976d2';
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
        <Tabs value={trendView} onValueChange={setTrendView} className="mb-6">
          <TabsList className="grid grid-cols-3 w-full max-w-md">
            <TabsTrigger value="line-chart">Overall Trends</TabsTrigger>
            <TabsTrigger value="price-heatmap">Price Band Heatmap</TabsTrigger>
            <TabsTrigger value="pdp-share">PDP Share by Price</TabsTrigger>
          </TabsList>
        </Tabs>

        <TabsContent value="line-chart" className="mt-0">
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
        </TabsContent>

        <TabsContent value="price-heatmap" className="mt-0">
          <div className="grid grid-cols-1 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Price Band Heatmap Over Time</CardTitle>
                <CardDescription>
                  Visualize growing and declining PDP interest across price tiers, with markers showing your presence
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[500px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={priceHeatmapData}
                      layout="vertical"
                      margin={{ top: 20, right: 30, left: 50, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" domain={[0, 'dataMax']} />
                      <YAxis 
                        dataKey="name" 
                        type="category" 
                        scale="band" 
                        width={40}
                      />
                      <Tooltip 
                        formatter={heatmapTooltipFormatter}
                        labelFormatter={(label) => `Month: ${label}`}
                      />
                      <Legend />
                      
                      {/* Render bars for each price band */}
                      {['£5-15', '£15-25', '£25-35', '£35-45', '£45-55', '£55-65', '£65-75', '£75-85'].map((band) => (
                        <Bar 
                          key={band} 
                          dataKey={band} 
                          name={band} 
                          stackId="a"
                          shape={(props) => {
                            const { x, y, width, height, value } = props;
                            
                            // Check if there's a skuPresent flag for this price band
                            const dataPoint = props.payload;
                            const presentKey = `${band}_present`;
                            const isPresent = dataPoint[presentKey];
                            
                            return (
                              <g>
                                <rect 
                                  x={x} 
                                  y={y} 
                                  width={width} 
                                  height={height} 
                                  fill={getHeatmapColor(value as number)}
                                  rx={4}
                                />
                                {isPresent && (
                                  <circle 
                                    cx={x + (width / 2)} 
                                    cy={y + (height / 2)} 
                                    r={5} 
                                    fill="rgba(0,0,0,0.7)" 
                                    stroke="white"
                                    strokeWidth={1.5}
                                  />
                                )}
                              </g>
                            );
                          }}
                        />
                      ))}
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                <div className="mt-6 bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium mb-2">Key Insights:</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 mt-0.5 text-amber-500" />
                      <span>You're missing out on surging demand in the £55-65 and £65-75 price bands</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <TrendingDown className="w-4 h-4 mt-0.5 text-red-500" />
                      <span>Your presence in the declining £5-15 band may need reevaluation</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <TrendingUp className="w-4 h-4 mt-0.5 text-green-500" />
                      <span>Strong alignment with growing interest in the £25-35 price band</span>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="pdp-share" className="mt-0">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>PDP Share by Price Tier</CardTitle>
                <CardDescription>
                  Compare your brand's share of product page views against competitors by price tier
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[500px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={pdpShareData}
                      layout="vertical"
                      margin={{ top: 20, right: 30, left: 50, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" domain={[0, 100]} tickFormatter={(value) => `${value}%`} />
                      <YAxis 
                        dataKey="name" 
                        type="category" 
                        scale="band" 
                        width={50}
                      />
                      <Tooltip 
                        formatter={(value) => [`${value}%`, undefined]}
                        labelFormatter={(label) => `Price Band: ${label}`}
                      />
                      <Legend />
                      <Bar 
                        dataKey="Your Brand" 
                        stackId="a" 
                        fill="#8884d8" 
                        name="Your Brand"
                      />
                      <Bar 
                        dataKey="Competitors" 
                        stackId="a" 
                        fill="#82ca9d" 
                        name="Competitors"
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Price Tier Performance</CardTitle>
                <CardDescription>
                  Detailed breakdown of your performance in each price band
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6 mt-2">
                  {pdpShareData.map((item) => (
                    <div key={item.name} className="border rounded-lg p-4">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="font-medium">{item.name}</h3>
                        <Badge variant={item['Your Brand'] > 50 ? 'default' : item['Your Brand'] < 20 ? 'destructive' : 'outline'}>
                          {item['Your Brand']}% share
                        </Badge>
                      </div>
                      
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div 
                          className="bg-primary h-2.5 rounded-full" 
                          style={{ width: `${item['Your Brand']}%` }}
                        ></div>
                      </div>
                      
                      <div className="flex justify-between text-xs mt-1">
                        <span>Your Brand</span>
                        <span>Competitors</span>
                      </div>
                      
                      <div className="mt-2 text-sm text-muted-foreground flex justify-between">
                        <span>{item.totalViews.toLocaleString()} total views</span>
                        {item['Your Brand'] < 30 ? (
                          <span className="text-red-500 flex items-center">
                            <TrendingDown className="w-3 h-3 mr-1" />
                            Under-indexed
                          </span>
                        ) : item['Your Brand'] > 50 ? (
                          <span className="text-green-500 flex items-center">
                            <TrendingUp className="w-3 h-3 mr-1" />
                            Strong performance
                          </span>
                        ) : (
                          <span>Average performance</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </CardContent>
    </Card>
  );
};
