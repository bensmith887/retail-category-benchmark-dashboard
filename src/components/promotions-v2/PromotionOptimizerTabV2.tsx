
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
import { BarChart3, LineChart as LineChartIcon, ArrowRight, Info, Calendar } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";

// Define months for selection
const months = [
  { value: "jan", label: "January" },
  { value: "feb", label: "February" },
  { value: "mar", label: "March" },
  { value: "apr", label: "April" },
  { value: "may", label: "May" },
  { value: "jun", label: "June" },
  { value: "jul", label: "July" },
  { value: "aug", label: "August" },
  { value: "sep", label: "September" },
  { value: "oct", label: "October" },
  { value: "nov", label: "November" },
  { value: "dec", label: "December" }
];

// Define categories and subcategories
const categories = [
  { value: "baby", label: "Baby Products" },
  { value: "books", label: "Books" },
  { value: "tools", label: "Tools & Home Improvement" }
];

const subcategories = {
  baby: [
    { value: "feeding", label: "Feeding" },
    { value: "diapers", label: "Diapers" },
    { value: "bath", label: "Bath" },
    { value: "furniture", label: "Furniture" },
    { value: "strollers", label: "Strollers" },
    { value: "toys", label: "Toys" },
    { value: "all", label: "All Baby Products" }
  ],
  books: [
    { value: "business", label: "Business" },
    { value: "fiction", label: "Fiction" },
    { value: "children", label: "Children" },
    { value: "academic", label: "Academic" },
    { value: "all", label: "All Books" }
  ],
  tools: [
    { value: "paint", label: "Paint & Wall Treatments" },
    { value: "power_tools", label: "Power & Hand Tools" },
    { value: "hardware", label: "Hardware" },
    { value: "all", label: "All Tools" }
  ]
};

// Define elasticity values by month, category, and subcategory
const getElasticityValue = (category: string, subcategory: string, month: string): number => {
  let elasticityValue = -0.89;  // Default elasticity
  
  if (category === 'baby') {
    if (subcategory === 'feeding') elasticityValue = -1.03;
    else if (subcategory === 'diapers') elasticityValue = -0.97;
    else if (subcategory === 'bath') elasticityValue = -0.34;
    else if (subcategory === 'furniture') elasticityValue = -0.62;
    else if (subcategory === 'strollers') elasticityValue = -0.58;
    else if (subcategory === 'toys') elasticityValue = -0.74;
    else if (subcategory === 'all') elasticityValue = -0.78;
  } else if (category === 'books') {
    if (subcategory === 'business') elasticityValue = -0.56;
    else if (subcategory === 'fiction') elasticityValue = -0.66;
    else if (subcategory === 'children') elasticityValue = -0.42;
    else if (subcategory === 'academic') elasticityValue = -0.52;
    else if (subcategory === 'all') elasticityValue = -0.55;
  } else if (category === 'tools') {
    if (subcategory === 'paint') elasticityValue = -0.95;
    else if (subcategory === 'power_tools') elasticityValue = -0.89;
    else if (subcategory === 'hardware') elasticityValue = -1.16;
    else if (subcategory === 'all') elasticityValue = -1.06;
    
    // Apply specific month elasticity for tools category
    if (month === 'jan') elasticityValue = -0.70;
    else if (month === 'feb') elasticityValue = -0.85;
    else if (month === 'mar') elasticityValue = -0.70;
    else if (month === 'apr') elasticityValue = -2.20;
    else if (month === 'may') elasticityValue = -1.12;
    else if (month === 'jun') elasticityValue = -1.82;
    else if (month === 'jul') elasticityValue = -0.70;
    else if (month === 'aug') elasticityValue = -1.87;
    else if (month === 'sep') elasticityValue = -0.70;
    else if (month === 'oct') elasticityValue = -0.70;
    else if (month === 'nov') elasticityValue = -0.70;
    else if (month === 'dec') elasticityValue = -0.70;
    
    // Apply subcategory-specific monthly elasticity if both subcategory and month are specified
    if (subcategory === 'paint' && month) {
      if (month === 'jan') elasticityValue = -0.88;
      else if (month === 'feb') elasticityValue = -0.70;
      else if (month === 'mar') elasticityValue = -0.70;
      else if (month === 'apr') elasticityValue = -0.79;
      else if (month === 'may') elasticityValue = -1.72;
      else if (month === 'jun') elasticityValue = -0.70;
      else if (month === 'jul') elasticityValue = -0.70;
      else if (month === 'aug') elasticityValue = -2.00;
      else if (month === 'sep') elasticityValue = -0.79;
      else if (month === 'oct') elasticityValue = -0.70;
      else if (month === 'nov') elasticityValue = -0.70;
      else if (month === 'dec') elasticityValue = -0.70;
    } else if (subcategory === 'power_tools' && month) {
      if (month === 'jan') elasticityValue = -0.70;
      else if (month === 'feb') elasticityValue = -0.76;
      else if (month === 'mar') elasticityValue = -1.18;
      else if (month === 'apr') elasticityValue = -0.60;
      else if (month === 'may') elasticityValue = -0.76;
      else if (month === 'jun') elasticityValue = -0.89;
      else if (month === 'jul') elasticityValue = -1.02;
      else if (month === 'aug') elasticityValue = -0.60;
      else if (month === 'sep') elasticityValue = -0.60;
      else if (month === 'oct') elasticityValue = -2.00;
      else if (month === 'nov') elasticityValue = -0.60;
      else if (month === 'dec') elasticityValue = -1.01;
    } else if (subcategory === 'hardware' && month) {
      if (month === 'jan') elasticityValue = -0.70;
      else if (month === 'feb') elasticityValue = -0.70;
      else if (month === 'mar') elasticityValue = -1.13;
      else if (month === 'apr') elasticityValue = -1.66;
      else if (month === 'may') elasticityValue = -1.20;
      else if (month === 'jun') elasticityValue = -0.50;
      else if (month === 'jul') elasticityValue = -1.20;
      else if (month === 'aug') elasticityValue = -1.82;
      else if (month === 'sep') elasticityValue = -1.20;
      else if (month === 'oct') elasticityValue = -1.80;
      else if (month === 'nov') elasticityValue = -1.11;
      else if (month === 'dec') elasticityValue = -1.38;
    }
  }
  
  // Apply seasonal multipliers for non-tools categories
  if (category !== 'tools') {
    if (month === 'jul') elasticityValue *= 1.7;
    else if (month === 'nov' || month === 'dec') {
      if (category === 'books') elasticityValue *= 1.5;
      else elasticityValue *= 1.2;
    } else if (month === 'jan' || month === 'feb') {
      elasticityValue *= 0.8; // Less responsive in post-holiday months
    } else if (month === 'apr' || month === 'may') {
      if (category === 'baby') elasticityValue *= 1.1; // Slightly more responsive in spring for baby products
    }
  }
  
  return elasticityValue;
};

interface PromotionOptimizerTabProps {
  initialPrice: number;
  initialSales: number;
}

const PromotionOptimizerTabV2: React.FC<PromotionOptimizerTabProps> = ({ initialPrice, initialSales }) => {
  const [elasticity, setElasticity] = useState<number | null>(null);
  const [category, setCategory] = useState('tools');
  const [subcategory, setSubcategory] = useState('hardware');
  const [month, setMonth] = useState('oct');
  const [promotionType, setPromotionType] = useState('price'); // 'price' or 'discount'
  const [promotionValue, setPromotionValue] = useState(0);
  const [optimizedSales, setOptimizedSales] = useState(initialSales);
  const [optimizedRevenue, setOptimizedRevenue] = useState(initialPrice * initialSales);
  const [isCapped, setIsCapped] = useState(false);
  const [capValue, setCapValue] = useState(1000); // Default cap value
  const [chartData, setChartData] = useState<any[]>([]);
  const [isMultiVariant, setIsMultiVariant] = useState(false);
  const [variants, setVariants] = useState([{ id: 1, value: 0 }]);
  const [selectedMetric, setSelectedMetric] = useState('sales'); // 'sales' or 'revenue'
  const [optimalDiscount, setOptimalDiscount] = useState(0);

  // Calculate elasticity when category, subcategory or month changes
  useEffect(() => {
    const calculatedElasticity = getElasticityValue(category, subcategory, month);
    setElasticity(calculatedElasticity);
    
    // Calculate optimal discount when elasticity changes
    const calculateOptimalDiscount = () => {
      if (calculatedElasticity < -1) {
        // When demand is elastic (e < -1), formula is (1 + 1/e) * 100%
        return Math.min(Math.round(100 * (1 + 1/calculatedElasticity)), 50);
      } else {
        // When demand is inelastic (e > -1), no discount is optimal for revenue
        // But we cap at minimum 5% for marketing purposes
        return 5;
      }
    };
    
    setOptimalDiscount(calculateOptimalDiscount());
  }, [category, subcategory, month]);

  useEffect(() => {
    if (elasticity !== null) {
      recalculateSales();
    }
  }, [elasticity, promotionType, promotionValue, initialPrice, initialSales, isCapped, capValue, isMultiVariant, variants, selectedMetric]);

  const recalculateSales = () => {
    if (elasticity === null) return;
    
    let newSales = initialSales;
    let newRevenue = initialPrice * initialSales;

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

    newSales = Math.max(0, newSales); // Ensure sales don't go negative
    
    // Calculate new revenue
    const newPrice = promotionType === 'price' 
      ? promotionValue 
      : initialPrice * (1 - promotionValue / 100);
    
    newRevenue = newSales * (newPrice > 0 ? newPrice : initialPrice);
    
    setOptimizedSales(newSales);
    setOptimizedRevenue(newRevenue);
    generateChartData(newSales);
  };

  const generateChartData = (sales: number) => {
    const data = [];
    const steps = 20;
    let baseValue = promotionType === 'price' ? initialPrice : 0;
    let stepSize = promotionType === 'price' ? (initialPrice / steps) : (1 / steps);

    for (let i = 0; i <= steps; i++) {
      const promotion = promotionType === 'price' ? baseValue - (i * stepSize) : i * stepSize;
      const percentageChange = promotionType === 'price' ? ((promotion - initialPrice) / initialPrice) : (promotion / 100);
      
      if (elasticity === null) continue;
      
      let projectedSales = initialSales + (initialSales * (percentageChange * elasticity));

      if (isCapped) {
        projectedSales = Math.min(projectedSales, capValue);
      }

      projectedSales = Math.max(0, projectedSales); // Ensure sales don't go negative

      const revenue = selectedMetric === 'revenue' 
        ? (promotionType === 'price' ? promotion : (initialPrice * (1 - promotion / 100))) * projectedSales 
        : projectedSales;

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

  const getElasticityLabel = (value: number) => {
    if (value === null) return "Unknown";
    if (value > -0.5) return "Low";
    if (value > -1.0) return "Medium";
    if (value > -1.5) return "High";
    return "Very High";
  };

  const getElasticityColor = (value: number) => {
    if (value === null) return "bg-gray-500";
    if (value > -0.5) return "bg-blue-500";
    if (value > -1.0) return "bg-green-500";
    if (value > -1.5) return "bg-yellow-500";
    return "bg-red-500";
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label>Category</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(cat => (
                    <SelectItem key={cat.value} value={cat.value}>{cat.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Subcategory</Label>
              <Select value={subcategory} onValueChange={setSubcategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Select subcategory" />
                </SelectTrigger>
                <SelectContent>
                  {subcategories[category as keyof typeof subcategories]?.map(subcat => (
                    <SelectItem key={subcat.value} value={subcat.value}>{subcat.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="flex items-center gap-1">
                Month
                <Calendar className="h-4 w-4 inline-block" />
              </Label>
              <Select value={month} onValueChange={setMonth}>
                <SelectTrigger>
                  <SelectValue placeholder="Select month" />
                </SelectTrigger>
                <SelectContent>
                  {months.map(m => (
                    <SelectItem key={m.value} value={m.value}>{m.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="flex flex-col space-y-2 p-3 bg-gray-50 rounded-md">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium">Current Price Elasticity</h3>
              {elasticity !== null && (
                <div className="flex items-center gap-2">
                  <Badge className={`${getElasticityColor(elasticity)} text-white`}>
                    {getElasticityLabel(elasticity)} Sensitivity
                  </Badge>
                  <span className="font-mono font-bold">{elasticity.toFixed(2)}</span>
                  <TooltipProvider delayDuration={0}>
                    <Tooltip>
                      <TooltipTrigger><Info className="h-4 w-4" /></TooltipTrigger>
                      <TooltipContent>
                        <p className="max-w-xs">
                          Price elasticity measures how sensitive demand is to price changes. Values below -1 indicate 
                          high sensitivity, where a price decrease leads to proportionally larger sales increases.
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              )}
            </div>
            <div className="text-xs text-gray-500">
              {elasticity !== null && elasticity < -1 
                ? "This product is price elastic. Price reductions will increase total revenue." 
                : "This product is price inelastic. Price reductions will decrease total revenue."}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="promotionType">Promotion Type</Label>
              <RadioGroup defaultValue={promotionType} className="flex gap-2" onValueChange={(value) => setPromotionType(value)}>
                <RadioGroupItem value="price" id="price" />
                <Label htmlFor="price">Price</Label>
                <RadioGroupItem value="discount" id="discount" />
                <Label htmlFor="discount">Discount %</Label>
              </RadioGroup>
            </div>
            <div>
              <Label htmlFor="selectedMetric">Visualization Metric</Label>
              <Select value={selectedMetric} onValueChange={setSelectedMetric}>
                <SelectTrigger>
                  <SelectValue placeholder="Select metric" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sales">Sales Volume</SelectItem>
                  <SelectItem value="revenue">Revenue</SelectItem>
                </SelectContent>
              </Select>
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
              <Label htmlFor="promotionValue">
                {promotionType === 'price' ? 'Promotion Price' : 'Discount Percentage (%)'}
              </Label>
              <div className="flex items-center gap-2">
                <Input
                  type="number"
                  id="promotionValue"
                  value={promotionValue}
                  onChange={(e) => setPromotionValue(parseFloat(e.target.value))}
                />
                {optimalDiscount > 0 && promotionType === 'discount' && (
                  <button 
                    onClick={() => setPromotionValue(optimalDiscount)}
                    className="px-3 py-2 bg-green-500 text-white rounded text-sm"
                  >
                    Use Optimal ({optimalDiscount}%)
                  </button>
                )}
              </div>
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

          <div className="border rounded-md p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <h3 className="text-lg font-semibold">Optimized Sales:</h3>
                <div className="text-2xl font-bold">{optimizedSales.toFixed(0)}</div>
                <div className="text-sm text-gray-500">
                  {initialSales !== optimizedSales ? (
                    <span className={optimizedSales > initialSales ? "text-green-500" : "text-red-500"}>
                      {((optimizedSales / initialSales - 1) * 100).toFixed(1)}% from baseline
                    </span>
                  ) : "No change"}
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold">Optimized Revenue:</h3>
                <div className="text-2xl font-bold">${optimizedRevenue.toFixed(0)}</div>
                <div className="text-sm text-gray-500">
                  {initialPrice * initialSales !== optimizedRevenue ? (
                    <span className={optimizedRevenue > initialPrice * initialSales ? "text-green-500" : "text-red-500"}>
                      {((optimizedRevenue / (initialPrice * initialSales) - 1) * 100).toFixed(1)}% from baseline
                    </span>
                  ) : "No change"}
                </div>
              </div>
            </div>
            
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
            
            {elasticity !== null && elasticity < -1 && (
              <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-md">
                <h4 className="font-semibold text-green-700 flex items-center gap-1">
                  <Info className="h-4 w-4" /> 
                  Optimization Recommendation
                </h4>
                <p className="text-sm text-green-700">
                  For maximum revenue with elasticity of {elasticity.toFixed(2)}, 
                  the optimal discount is <strong>{optimalDiscount}%</strong>.
                  This would set the price at ${(initialPrice * (1 - optimalDiscount/100)).toFixed(2)}.
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PromotionOptimizerTabV2;
