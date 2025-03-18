import React, { useState, useEffect } from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip as RechartsTooltip, 
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell
} from 'recharts';
import { BarChart3, LineChart as LineChartIcon, ArrowRight, Info } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// Define a default elasticity
const defaultElasticity = -1.5;

interface PromotionOptimizerTabProps {
  initialPrice: number;
  initialSales: number;
}

const PromotionOptimizerTabV2: React.FC<PromotionOptimizerTabProps> = ({ initialPrice, initialSales }) => {
  const [elasticity, setElasticity] = useState(defaultElasticity);
  const [promotionType, setPromotionType] = useState('price'); // 'price' or 'discount'
  const [promotionValue, setPromotionValue] = useState(0);
  const [optimizedSales, setOptimizedSales] = useState(initialSales);
  const [isCapped, setIsCapped] = useState(false);
  const [capValue, setCapValue] = useState(1000); // Default cap value
  const [chartData, setChartData] = useState([]);
  const [isMultiVariant, setIsMultiVariant] = useState(false);
  const [variants, setVariants] = useState([{ id: 1, value: 0 }]);
  const [selectedMetric, setSelectedMetric] = useState('sales'); // 'sales' or 'revenue'

  useEffect(() => {
    recalculateSales();
  }, [elasticity, promotionType, promotionValue, initialSales, isCapped, capValue, isMultiVariant, variants, selectedMetric]);

  const recalculateSales = () => {
    let newSales = initialSales;

    if (isMultiVariant) {
      // Apply multiple promotion variants
      newSales = variants.reduce((accSales, variant) => {
        const percentageChange = promotionType === 'price'
          ? (variant.value / initialPrice)
          : (variant.value / 100);
        const salesImpact = accSales * (percentageChange * elasticity);
        return accSales + salesImpact;
      }, initialSales);
    } else {
      // Apply single promotion value
      const percentageChange = promotionType === 'price'
        ? (promotionValue / initialPrice)
        : (promotionValue / 100);
      const salesImpact = initialSales * (percentageChange * elasticity);
      newSales = initialSales + salesImpact;
    }

    // Apply capping if enabled
    if (isCapped) {
      newSales = Math.min(newSales, capValue);
    }

    setOptimizedSales(Math.max(0, newSales)); // Ensure sales don't go negative
    generateChartData(Math.max(0, newSales));
  };

  const generateChartData = (sales: number) => {
    const data = [];
    const steps = 20;
    let baseValue = promotionType === 'price' ? initialPrice : 0;
    let stepSize = promotionType === 'price' ? (initialPrice / steps) : (1 / steps);

    for (let i = 0; i <= steps; i++) {
      const promotion = promotionType === 'price' ? baseValue - (i * stepSize) : i * stepSize;
      const percentageChange = promotionType === 'price' ? ((promotion - initialPrice) / initialPrice) : (promotion / 100);
      let projectedSales = initialSales + (initialSales * (percentageChange * elasticity));

      if (isCapped) {
        projectedSales = Math.min(projectedSales, capValue);
      }

      projectedSales = Math.max(0, projectedSales); // Ensure sales don't go negative

      const revenue = selectedMetric === 'revenue' ? (promotionType === 'price' ? promotion : (initialPrice * (1 - promotion / 100))) * projectedSales : projectedSales;

      data.push({
        promotion: promotion.toFixed(2),
        [selectedMetric]: revenue.toFixed(2),
      });
    }

    setChartData(data);
  };

  const addVariant = () => {
    setVariants([...variants, { id: variants.length + 1, value: 0 }]);
  };

  const updateVariantValue = (id: number, value: number) => {
    setVariants(variants.map(variant => variant.id === id ? { ...variant, value } : variant));
  };

  const removeVariant = (id: number) => {
    setVariants(variants.filter(variant => variant.id !== id));
  };

  const renderChart = () => {
    const yAxisLabel = selectedMetric === 'sales' ? 'Sales' : 'Revenue';

    return (
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="promotion" label={{ value: promotionType === 'price' ? 'Price' : 'Discount %', position: 'bottom' }} />
          <YAxis label={{ value: yAxisLabel, angle: -90, position: 'left' }} />
          <RechartsTooltip />
          <Legend />
          <Line type="monotone" dataKey={selectedMetric} stroke="#8884d8" activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>
    );
  };

  const renderBarChart = () => {
    const yAxisLabel = selectedMetric === 'sales' ? 'Sales' : 'Revenue';

    return (
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="promotion" label={{ value: promotionType === 'price' ? 'Price' : 'Discount %', position: 'bottom' }} />
          <YAxis label={{ value: yAxisLabel, angle: -90, position: 'left' }} />
          <RechartsTooltip />
          <Legend />
          <Bar dataKey={selectedMetric} fill="#8884d8">
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={index === chartData.length - 1 ? '#82ca9d' : '#8884d8'} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    );
  };

  return (
    <div className="w-full">
      <Card>
        <CardHeader>
          <CardTitle>Promotion Optimizer</CardTitle>
          <CardDescription>Simulate the impact of promotions on sales.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="elasticity">Price Elasticity <TooltipProvider delayDuration={0}><Tooltip><TooltipTrigger><Info className="inline-block h-3 w-3" /></TooltipTrigger><TooltipContent><span>The responsiveness of demand to a change in price.</span></TooltipContent></Tooltip></TooltipProvider></Label>
              <Input
                type="number"
                id="elasticity"
                value={elasticity}
                onChange={(e) => setElasticity(parseFloat(e.target.value))}
              />
            </div>
            <div>
              <Label>Promotion Type</Label>
              <RadioGroup defaultValue={promotionType} className="flex gap-2" onValueChange={(value) => setPromotionType(value)}>
                <RadioGroupItem value="price" id="price" />
                <Label htmlFor="price">Price</Label>
                <RadioGroupItem value="discount" id="discount" />
                <Label htmlFor="discount">Discount %</Label>
              </RadioGroup>
            </div>
          </div>

          {/* Multi-Variant Promotion Toggle */}
          <div className="flex items-center space-x-2">
            <Switch id="multi-variant" checked={isMultiVariant} onCheckedChange={setIsMultiVariant} />
            <Label htmlFor="multi-variant">Multi-Variant Promotion</Label>
          </div>

          {/* Multi-Variant Inputs */}
          {isMultiVariant && (
            <div>
              {variants.map((variant) => (
                <div key={variant.id} className="flex items-center gap-2 mb-2">
                  <Label htmlFor={`variant-${variant.id}`}>{`Variant ${variant.id}`}</Label>
                  <Input
                    type="number"
                    id={`variant-${variant.id}`}
                    value={variant.value}
                    onChange={(e) => updateVariantValue(variant.id, parseFloat(e.target.value))}
                  />
                  <button onClick={() => removeVariant(variant.id)} className="px-2 py-1 bg-red-500 text-white rounded">Remove</button>
                </div>
              ))}
              <button onClick={addVariant} className="px-3 py-2 bg-blue-500 text-white rounded">Add Variant</button>
            </div>
          )}

          {/* Single Promotion Value Input */}
          {!isMultiVariant && (
            <div>
              <Label htmlFor="promotionValue">Promotion Value</Label>
              <Input
                type="number"
                id="promotionValue"
                value={promotionValue}
                onChange={(e) => setPromotionValue(parseFloat(e.target.value))}
              />
            </div>
          )}

          <div className="flex items-center space-x-2">
            <Switch id="isCapped" checked={isCapped} onCheckedChange={setIsCapped} />
            <Label htmlFor="isCapped">Cap Sales</Label>
          </div>

          {isCapped && (
            <div>
              <Label htmlFor="capValue">Cap Value</Label>
              <Input
                type="number"
                id="capValue"
                value={capValue}
                onChange={(e) => setCapValue(parseFloat(e.target.value))}
              />
            </div>
          )}

          <div>
            <Label>Select Metric</Label>
            <Select value={selectedMetric} onValueChange={setSelectedMetric}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a metric" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sales">Sales</SelectItem>
                <SelectItem value="revenue">Revenue</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="border rounded-md p-4">
            <h3 className="text-xl font-semibold mb-2">Optimized Sales: {optimizedSales.toFixed(2)}</h3>
            <Tabs defaultValue="line" className="w-full">
              <TabsList>
                <TabsTrigger value="line"><LineChartIcon className="mr-2 h-4 w-4" /> Line Chart</TabsTrigger>
                <TabsTrigger value="bar"><BarChart3 className="mr-2 h-4 w-4" /> Bar Chart</TabsTrigger>
              </TabsList>
              <TabsContent value="line">
                {renderChart()}
              </TabsContent>
              <TabsContent value="bar">
                {renderBarChart()}
              </TabsContent>
            </Tabs>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PromotionOptimizerTabV2;
