import React, { useState, useCallback } from 'react';
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
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer, 
  LineChart,
  Line,
  AreaChart,
  Area
} from 'recharts';
import { Download, Filter, TrendingUp, Store, ChartScatter } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { PriceProductDrilldown } from './PriceProductDrilldown';
import { Input } from '@/components/ui/input';

interface PriceTier {
  id: string;
  name: string;
  min: number;
  max: number;
}

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
  const [selectedRetailer, setSelectedRetailer] = useState<string>(retailers[0]?.id || '');
  const [priceView, setPriceView] = useState<string>('actual');
  const [selectedTimeframe, setSelectedTimeframe] = useState<string>('3m');
  const [selectedTab, setSelectedTab] = useState<string>('distribution');
  const [showDrilldown, setShowDrilldown] = useState<boolean>(false);
  const [selectedTier, setSelectedTier] = useState<string | null>(null);
  const { toast } = useToast();
  
  const [customPriceTiers, setCustomPriceTiers] = useState<PriceTier[]>([
    { id: 'tier1', name: 'Tier 1', min: 0, max: 20 },
    { id: 'tier2', name: 'Tier 2', min: 20, max: 35 },
    { id: 'tier3', name: 'Tier 3', min: 35, max: 50 },
    { id: 'tier4', name: 'Tier 4', min: 50, max: 65 },
    { id: 'tier5', name: 'Tier 5', min: 65, max: 150 }
  ]);
  
  const [tiersModified, setTiersModified] = useState<boolean>(false);

  const handleTierNameChange = (index: number, newName: string) => {
    setCustomPriceTiers(prevTiers => {
      const newTiers = [...prevTiers];
      newTiers[index] = {
        ...newTiers[index],
        name: newName
      };
      return newTiers;
    });
    setTiersModified(true);
  };

  const handlePriceRangeChange = useCallback((index: number, field: 'min' | 'max', value: number) => {
    setCustomPriceTiers(prevTiers => {
      const newTiers = [...prevTiers];
      
      if (field === 'min' && value >= newTiers[index].max) {
        return prevTiers;
      }
      
      if (field === 'max' && value <= newTiers[index].min) {
        return prevTiers;
      }
      
      newTiers[index] = {
        ...newTiers[index],
        [field]: value
      };
      
      if (index > 0 && field === 'min') {
        newTiers[index - 1].max = value;
      }
      if (index < newTiers.length - 1 && field === 'max') {
        newTiers[index + 1].min = value;
      }
      
      setTiersModified(true);
      return newTiers;
    });
  }, []);

  const resetPriceTiers = () => {
    setCustomPriceTiers([
      { id: 'tier1', name: 'Tier 1', min: 0, max: 20 },
      { id: 'tier2', name: 'Tier 2', min: 20, max: 35 },
      { id: 'tier3', name: 'Tier 3', min: 35, max: 50 },
      { id: 'tier4', name: 'Tier 4', min: 50, max: 65 },
      { id: 'tier5', name: 'Tier 5', min: 65, max: 150 }
    ]);
    setTiersModified(false);
    
    toast({
      title: "Price tiers reset",
      description: "Price tiers have been reset to default values",
    });
  };

  const generatePriceData = () => {
    return retailers.map(retailer => {
      const result: any = { name: retailer.name };
      
      let remaining = 100;
      customPriceTiers.slice(0, -1).forEach(tier => {
        const max = remaining - 5 * (customPriceTiers.length - customPriceTiers.indexOf(tier) - 1);
        const min = 5;
        const value = Math.floor(Math.random() * (max - min) + min);
        result[tier.id] = value;
        remaining -= value;
      });
      
      result[customPriceTiers[customPriceTiers.length - 1].id] = remaining;
      
      result.history = {
        '1m': customPriceTiers.reduce((acc, tier) => {
          acc[tier.id] = result[tier.id] + Math.floor(Math.random() * 10 - 5);
          return acc;
        }, {}),
        '3m': customPriceTiers.reduce((acc, tier) => {
          acc[tier.id] = result[tier.id] + Math.floor(Math.random() * 15 - 7);
          return acc;
        }, {}),
        '6m': customPriceTiers.reduce((acc, tier) => {
          acc[tier.id] = result[tier.id] + Math.floor(Math.random() * 20 - 10);
          return acc;
        }, {})
      };
      
      result.pdpViews = customPriceTiers.reduce((acc, tier) => {
        acc[tier.id] = Math.floor(Math.random() * 10000) + 500;
        return acc;
      }, {});
      
      return result;
    });
  };
  
  const priceData = generatePriceData();
  
  const generateTrendData = () => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
    return months.map(month => {
      const result: any = { month };
      
      retailers.forEach(retailer => {
        customPriceTiers.forEach(tier => {
          const baseValue = Math.floor(Math.random() * 70) + 30;
          result[`${retailer.id}_${tier.id}`] = baseValue;
        });
      });
      
      return result;
    });
  };
  
  const trendData = generateTrendData();
  
  const generateMarketShareData = () => {
    return customPriceTiers.map(tier => {
      const result: any = { name: tier.name, range: `£${tier.min}-${tier.max}` };
      
      let remainingShare = 100;
      retailers.slice(0, -1).forEach(retailer => {
        const share = Math.floor(Math.random() * (remainingShare - 5)) + 5;
        result[retailer.id] = share;
        remainingShare -= share;
      });
      
      result[retailers[retailers.length - 1].id] = remainingShare;
      
      result.marketValue = (Math.random() * 5000000 + 1000000).toFixed(0);
      
      return result;
    });
  };
  
  const marketShareData = generateMarketShareData();
  
  const generatePdpCorrelationData = () => {
    return customPriceTiers.map(tier => {
      const result: any = {
        tier: tier.name,
        range: `£${tier.min}-${tier.max}`,
        avgPrice: ((tier.min + tier.max) / 2).toFixed(0),
        pdpViews: Math.floor(Math.random() * 50000) + 5000,
      };
      
      if (tier.id === 'mid' || tier.id === 'value') {
        result.pdpViews = Math.floor(Math.random() * 30000) + 70000;
      } else if (tier.id === 'luxury') {
        result.pdpViews = Math.floor(Math.random() * 20000) + 30000;
      }
      
      result.conversionRate = (Math.random() * 5 + 2).toFixed(1);
      return result;
    });
  };
  
  const pdpCorrelationData = generatePdpCorrelationData();
  
  const handleExport = () => {
    toast({
      title: "Exporting data",
      description: "The price architecture data is being exported to Excel",
    });
  };
  
  const handleProductDrilldown = (tier: string) => {
    setSelectedTier(tier);
    setShowDrilldown(true);
  };
  
  const handleCloseDrilldown = () => {
    setShowDrilldown(false);
    setSelectedTier(null);
  };

  if (showDrilldown && selectedTier) {
    const selectedTierObj = customPriceTiers.find(tier => tier.id === selectedTier);
    return (
      <PriceProductDrilldown
        retailer={retailers.find(r => r.id === selectedRetailer)?.name || ''}
        category={categories.find(c => c.id === selectedCategory)?.name || ''}
        priceTier={selectedTierObj?.name || ''}
        priceRange={`£${selectedTierObj?.min}-${selectedTierObj?.max}`}
        onBack={handleCloseDrilldown}
      />
    );
  }

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
              <SelectTrigger className="w-40">
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
            <label className="text-sm font-medium">Retailer</label>
            <Select 
              value={selectedRetailer} 
              onValueChange={setSelectedRetailer}
            >
              <SelectTrigger className="w-40">
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
          
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium">Time Frame</label>
            <Select 
              value={selectedTimeframe} 
              onValueChange={setSelectedTimeframe}
            >
              <SelectTrigger className="w-36">
                <SelectValue placeholder="3 months" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1m">1 month</SelectItem>
                <SelectItem value="3m">3 months</SelectItem>
                <SelectItem value="6m">6 months</SelectItem>
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
        {/* Price Tier Customization */}
        <Card className="mb-6">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Price Tier Customization</CardTitle>
            <CardDescription>
              Customize tier names and price ranges to match your market segments
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {customPriceTiers.map((tier, index) => (
                <div key={tier.id} className="space-y-2 p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <Input
                      className="w-[200px]"
                      value={tier.name}
                      onChange={(e) => handleTierNameChange(index, e.target.value)}
                      placeholder={`Tier ${index + 1}`}
                    />
                    <div className="flex items-center gap-2 flex-1">
                      <Input
                        type="number"
                        value={tier.min}
                        onChange={(e) => handlePriceRangeChange(index, 'min', Number(e.target.value))}
                        className="w-24"
                        min={0}
                        max={tier.max - 1}
                      />
                      <span>to</span>
                      <Input
                        type="number"
                        value={tier.max}
                        onChange={(e) => handlePriceRangeChange(index, 'max', Number(e.target.value))}
                        className="w-24"
                        min={tier.min + 1}
                        max={150}
                      />
                      <span className="text-sm text-muted-foreground ml-2">£</span>
                    </div>
                  </div>
                </div>
              ))}
              
              <div className="flex justify-end">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={resetPriceTiers}
                  disabled={!tiersModified}
                >
                  Reset to Default
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Main Content Tabs */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-4">
          <TabsList>
            <TabsTrigger value="distribution" className="flex items-center gap-2">
              <ChartScatter size={16} />
              <span>Distribution</span>
            </TabsTrigger>
            <TabsTrigger value="benchmarking" className="flex items-center gap-2">
              <TrendingUp size={16} />
              <span>Trend Analysis</span>
            </TabsTrigger>
            <TabsTrigger value="marketshare" className="flex items-center gap-2">
              <Store size={16} />
              <span>Market Share</span>
            </TabsTrigger>
            <TabsTrigger value="pdpmetrics" className="flex items-center gap-2">
              <Filter size={16} />
              <span>PDP Metrics</span>
            </TabsTrigger>
          </TabsList>
          
          {/* Price Distribution Tab */}
          <TabsContent value="distribution">
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
                      {customPriceTiers.map((tier, index) => (
                        <Bar 
                          key={tier.id}
                          dataKey={tier.id} 
                          name={`${tier.name} (£${tier.min}-${tier.max})`} 
                          stackId="a" 
                          fill={
                            index === 0 ? "#8884d8" : 
                            index === 1 ? "#82ca9d" : 
                            index === 2 ? "#ffc658" : 
                            index === 3 ? "#ff8042" : 
                            "#ff6b81"
                          }
                          onClick={() => handleProductDrilldown(tier.id)}
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
                      {customPriceTiers.map((tier, index) => (
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
                            <p className="text-sm text-gray-500">£{tier.min}-£{tier.max}</p>
                          </div>
                          <Button 
                            size="sm" 
                            variant="ghost" 
                            className="ml-auto"
                            onClick={() => handleProductDrilldown(tier.id)}
                          >
                            View Products
                          </Button>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-6 space-y-2">
                      <h4 className="font-medium">Key Insights:</h4>
                      <ul className="text-sm space-y-2">
                        <li>• H&M has the strongest value tier presence (£20-35)</li>
                        <li>• River Island dominates the premium segment</li>
                        <li>• NA-KD shows balanced distribution across price tiers</li>
                        <li>• Opportunity to expand in mid-range tier</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
          
          {/* Benchmarking and Trend Analysis Tab */}
          <TabsContent value="benchmarking">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Price Positioning Over Time</CardTitle>
                  <CardDescription>
                    How your price architecture has evolved compared to competitors
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={trendData}
                        margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        {retailers.map((retailer, i) => (
                          customPriceTiers.filter(tier => tier.id === 'mid' || tier.id === 'premium').map((tier, j) => (
                            <Line 
                              key={`${retailer.id}-${tier.id}`}
                              type="monotone" 
                              dataKey={`${retailer.id}_${tier.id}`} 
                              name={`${retailer.name} - ${tier.name}`} 
                              stroke={
                                i === 0 ? "#8884d8" : 
                                i === 1 ? "#82ca9d" : 
                                i === 2 ? "#ffc658" : 
                                i === 3 ? "#ff8042" : 
                                "#ff6b81"
                              }
                              strokeWidth={retailer.id === selectedRetailer ? 2.5 : 1}
                              strokeDasharray={tier.id !== 'mid' ? "3 3" : undefined}
                              dot={{ r: retailer.id === selectedRetailer ? 4 : 2 }}
                            />
                          ))
                        ))}
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Historical Price Mix</CardTitle>
                  <CardDescription>
                    Changes in your price tier distribution over {selectedTimeframe}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={priceData.filter(item => item.name === retailers.find(r => r.id === selectedRetailer)?.name)}
                        layout="horizontal"
                        margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        {customPriceTiers.map((tier, index) => (
                          <Bar 
                            key={`current-${tier.id}`}
                            dataKey={tier.id} 
                            name={`Current - ${tier.name}`} 
                            fill={
                              index === 0 ? "#8884d8" : 
                              index === 1 ? "#82ca9d" : 
                              index === 2 ? "#ffc658" : 
                              index === 3 ? "#ff8042" : 
                              "#ff6b81"
                            }
                          />
                        ))}
                        {customPriceTiers.map((tier, index) => (
                          <Bar 
                            key={`historical-${tier.id}`}
                            dataKey={d => d.history[selectedTimeframe][tier.id]} 
                            name={`${selectedTimeframe} ago - ${tier.name}`}
                            fillOpacity={0.5}
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
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          {/* Market Share Tab */}
          <TabsContent value="marketshare">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Market Share by Price Tier</CardTitle>
                  <CardDescription>
                    Competitor share analysis across price segments
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-96">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={marketShareData}
                        layout="horizontal"
                        margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis unit="%" />
                        <Tooltip />
                        <Legend />
                        {retailers.map((retailer, index) => (
                          <Bar 
                            key={retailer.id}
                            dataKey={retailer.id} 
                            name={retailer.name} 
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
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Price Segment Value</CardTitle>
                  <CardDescription>
                    Total market value by price segment
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-96">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart
                        data={marketShareData}
                        margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                      >
                        <defs>
                          <linearGradient id="colorMarketValue" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#8884d8" stopOpacity={0.1}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis
                          tickFormatter={(value) => `£${(value/1000000).toFixed(1)}M`}
                        />
                        <Tooltip
                          formatter={(value) => [`£${Number(value).toLocaleString()}`, 'Market Value']}
                        />
                        <Area 
                          type="monotone" 
                          dataKey="marketValue" 
                          stroke="#8884d8" 
                          fillOpacity={1}
                          fill="url(#colorMarketValue)" 
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          {/* PDP Metrics Tab */}
          <TabsContent value="pdpmetrics">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">PDP Views by Price Tier</CardTitle>
                  <CardDescription>
                    Consumer interest correlation with price points
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={pdpCorrelationData}
                        margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="tier" />
                        <YAxis yAxisId="left" />
                        <YAxis yAxisId="right" orientation="right" />
                        <Tooltip />
                        <Legend />
                        <Bar 
                          yAxisId="left"
                          dataKey="pdpViews" 
                          name="PDP Views" 
                          fill="#8884d8"
                        />
                        <Bar 
                          yAxisId="right"
                          dataKey="conversionRate" 
                          name="Conversion Rate (%)" 
                          fill="#82ca9d"
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">View-to-Purchase Analysis</CardTitle>
                  <CardDescription>
                    Conversion effectiveness by price tier
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {pdpCorrelationData.map(item => (
                      <div key={item.tier} className="border p-4 rounded-md">
                        <div className="flex justify-between mb-2">
                          <span className="font-medium">{item.tier} (£{item.avgPrice})</span>
                          <span className="text-sm text-gray-500">{item.pdpViews.toLocaleString()} views</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div 
                            className="bg-purple-600 h-2.5 rounded-full" 
                            style={{ width: `${item.conversionRate * 10}%` }}
                          ></div>
                        </div>
                        <div className="flex justify-between mt-2">
                          <span className="text-sm">{item.conversionRate}% conversion</span>
                          <span className="text-sm font-medium text-purple-600">
                            {Math.round(item.pdpViews * (parseFloat(item.conversionRate) / 100)).toLocaleString()} purchases
                          </span>
                        </div>
                      </div>
                    ))}
                    <div className="mt-4 p-4 bg-gray-50 rounded-md">
                      <h4 className="font-medium mb-2">Key Insights:</h4>
                      <ul className="text-sm space-y-1">
                        <li>• Mid-range products have highest view-to-purchase ratio</li>
                        <li>• Premium segment shows strong conversion despite fewer views</li>
                        <li>• Budget tier has high traffic but lower conversion rates</li>
                        <li>• Opportunity to optimize luxury tier for better engagement</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
