
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
  LineChart as ReLineChart, 
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
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const currentMonth = new Date().getMonth();
    return Array.from({ length: 12 }, (_, i) => {
      const monthIndex = (currentMonth - 11 + i) % 12;
      const monthName = months[monthIndex >= 0 ? monthIndex : monthIndex + 12];
      const result: any = { month: monthName };
      retailers.forEach(retailer => {
        let base = Math.floor(Math.random() * 50) + 50;
        if (retailer.id === 'h&m') {
          base += i * 2;
        } else if (retailer.id === 'mango') {
          base += i * 4;
        } else if (retailer.id === 'monki') {
          base += (i < 6) ? -i : (i - 6);
        } else if (retailer.id === 'nakd') {
          base -= i * 3;
        } else {
          base += Math.sin((i / 11) * Math.PI) * 30;
        }
        result[retailer.id] = Math.max(0, Math.floor(base + (Math.random() * 10 - 5)));
      });
      return result;
    });
  };

  const trendData = generateTrendData();

  const generatePriceBandHeatmapData = () => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
    const priceBands = ['£5-15', '£15-25', '£25-35', '£35-45', '£45-55', '£55-65', '£65-75', '£75-85'];
    return months.map((month, monthIndex) => {
      const result: any = { name: month };
      priceBands.forEach((band, bandIndex) => {
        let value;
        if (bandIndex === 2 || bandIndex === 3) {
          value = 20 + (monthIndex * 12) + Math.floor(Math.random() * 10);
        } else if (bandIndex === 5 || bandIndex === 6) {
          value = 15 + (monthIndex > 2 ? (monthIndex - 2) * 25 : 0) + Math.floor(Math.random() * 10);
        } else if (bandIndex === 0) {
          value = 80 - (monthIndex * 10) + Math.floor(Math.random() * 10);
        } else {
          value = 30 + Math.floor(Math.random() * 20);
        }
        const skuPresent = [0, 1, 2, 4].includes(bandIndex);
        result[band] = value;
        result[`${band}_present`] = skuPresent;
      });
      return result;
    });
  };

  const generatePDPShareData = () => {
    const priceBands = ['£5-15', '£15-25', '£25-35', '£35-45', '£45-55', '£55-65', '£65-75', '£75-85'];
    return priceBands.map(band => {
      let yourShare, competitorShare;
      if (band === '£25-35' || band === '£35-45') {
        yourShare = 55 + Math.floor(Math.random() * 15);
      } else if (band === '£55-65' || band === '£65-75') {
        yourShare = 15 + Math.floor(Math.random() * 10);
      } else if (band === '£5-15') {
        yourShare = 40 + Math.floor(Math.random() * 10);
      } else {
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

  const heatmapTooltipFormatter = (value: number, name: string, props: any) => {
    const displayName = name.endsWith('_present') ? null : name;
    if (displayName) {
      return [`${value} PDP views`, displayName];
    }
    return null;
  };

  const getHeatmapColor = (value: number) => {
    if (value < 20) return '#e3f2fd';
    if (value < 40) return '#bbdefb';
    if (value < 60) return '#90caf9';
    if (value < 80) return '#64b5f6';
    if (value < 100) return '#42a5f5';
    if (value < 120) return '#2196f3';
    return '#1976d2';
  };

  // --- BENTO GRID UI ---
  return (
    <div>
      <div className="flex flex-wrap gap-4 mb-6">
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium">Category</label>
          <Select 
            value={selectedCategory} 
            onValueChange={setSelectedCategory}
          >
            <SelectTrigger className="w-40 shadow-sm bg-white z-10">
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
            <SelectTrigger className="w-32 shadow-sm bg-white z-10">
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
          className="mt-6 flex items-center"
          onClick={handleExport}
        >
          <Download size={16} />
        </Button>
      </div>

      {/* BENTO - Responsive 2x2 grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* TREND LINE CHART */}
        <Card className="relative group hover:shadow-lg focus-within:ring-2 focus-within:ring-dashboard-primary transition-shadow duration-200">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-dashboard-primary" /> Overall Trends
            </CardTitle>
            <CardDescription>
              Track demand signal changes over time against key retailers
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-56 md:h-64">
              <ResponsiveContainer width="100%" height="100%">
                <ReLineChart
                  data={trendData.slice(-parseInt(timeRange))}
                  margin={{ top: 15, right: 10, left: 0, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
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
                      dot={{ r: 2 }}
                    />
                  ))}
                </ReLineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        {/* KEY ALERTS */}
        <Card className="relative group hover:shadow-lg focus-within:ring-2 focus-within:ring-dashboard-primary transition-shadow duration-200">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-amber-600" /> Trend Alerts
            </CardTitle>
            <CardDescription>
              Opportunities and risks highlighted by the data
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {alerts.slice(0, 4).map(alert => (
                <div 
                  key={alert.id} 
                  className="flex items-start gap-3 bg-amber-50/60 border-l-4 rounded-md p-2.5
                             border-amber-400 group-hover:border-dashboard-primary"
                >
                  <span>
                    {alert.type === 'trending_up' ? (
                      <TrendingUp className="w-4 h-4 text-green-600 mt-0.5" />
                    ) : alert.type === 'trending_down' ? (
                      <TrendingDown className="w-4 h-4 text-red-600 mt-0.5" />
                    ) : (
                      <AlertCircle className="w-4 h-4 text-amber-500 mt-0.5" />
                    )}
                  </span>
                  <div>
                    <span className="font-medium">{alert.title}</span>
                    {alert.change && (
                      <Badge 
                        className="ml-1"
                        variant={alert.type === 'trending_up' ? 'default' : 'destructive'}
                      >
                        {alert.change}
                      </Badge>
                    )}
                    <div className="text-xs text-muted-foreground mt-0.5">
                      {alert.detail}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <Button className="w-full mt-4" variant="secondary" size="sm">
              View All Trends
            </Button>
          </CardContent>
        </Card>

        {/* PRICE BAND HEATMAP */}
        <Card className="relative group hover:shadow-lg focus-within:ring-2 focus-within:ring-dashboard-primary transition-shadow duration-200">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-dashboard-primary" /> Price Band Heatmap
            </CardTitle>
            <CardDescription>
              PDP interest changes across price tiers, with your presence
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-52 md:h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={priceHeatmapData}
                  layout="vertical"
                  margin={{ top: 15, right: 10, left: 40, bottom: 5 }}
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
                    labelFormatter={label => `Month: ${label}`}
                  />
                  <Legend />
                  {['£5-15', '£15-25', '£25-35', '£35-45', '£45-55', '£55-65', '£65-75', '£75-85'].map((band) => (
                    <Bar 
                      key={band} 
                      dataKey={band} 
                      name={band} 
                      fill={getHeatmapColor(50)}
                    >
                      {priceHeatmapData.map((entry, index) => {
                        const value = entry[band];
                        return (
                          <Cell 
                            key={`cell-${index}`} 
                            fill={getHeatmapColor(value as number)} 
                          />
                        );
                      })}
                    </Bar>
                  ))}
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 bg-gray-50 p-3 rounded">
              <ul className="space-y-1 text-xs">
                <li className="flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-amber-500" />
                  You're missing out on surging demand in the £55-65 and £65-75 price bands.
                </li>
                <li className="flex items-center gap-2">
                  <TrendingDown className="w-4 h-4 text-red-500" />
                  Your presence in the declining £5-15 band may need reevaluation.
                </li>
                <li className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-green-600" />
                  Strong alignment with growing interest in the £25-35 price band.
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* PDP SHARE BY PRICE TIER */}
        <Card className="relative group hover:shadow-lg focus-within:ring-2 focus-within:ring-dashboard-primary transition-shadow duration-200">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-dashboard-primary" /> PDP Share by Price
            </CardTitle>
            <CardDescription>
              Your brand vs competitors by price tier
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-52 md:h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={pdpShareData}
                  layout="vertical"
                  margin={{ top: 10, right: 10, left: 40, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" domain={[0, 100]} tickFormatter={value => `${value}%`} />
                  <YAxis 
                    dataKey="name" 
                    type="category" 
                    scale="band" 
                    width={50}
                  />
                  <Tooltip 
                    formatter={value => [`${value}%`, undefined]}
                    labelFormatter={label => `Price Band: ${label}`}
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
            <div className="space-y-2 mt-2">
              {pdpShareData.slice(0, 3).map((item) => (
                <div key={item.name} className="flex items-center justify-between text-xs">
                  <span className="font-medium">{item.name}</span>
                  <span>{item['Your Brand']}% your share</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
