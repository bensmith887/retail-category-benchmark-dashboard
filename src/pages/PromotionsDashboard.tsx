import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Tabs from '@/components/Tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs as UITabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import MetricsCard from '@/components/MetricsCard';
import { 
  TrendingUp, BarChart3, Target, Calendar, Percent, Tag, 
  ArrowUpRight, ArrowDownRight, ShoppingCart, DollarSign, Clock, Check
} from 'lucide-react';
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, 
  Tooltip, Legend, ResponsiveContainer, Cell, ScatterChart, 
  Scatter, HeatmapSeries, Heatmap, HeatMapSeries, ZAxis, Rectangle
} from 'recharts';
import { cn } from '@/lib/utils';

const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const PromotionsDashboard = () => {
  const [activeTab, setActiveTab] = useState('promotions');
  const [selectedCategory, setSelectedCategory] = useState('baby');
  const [selectedSubcategory, setSelectedSubcategory] = useState('all');
  const [discountPercentage, setDiscountPercentage] = useState(15);
  const [mounted, setMounted] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState('all');
  const [selectedPromotionType, setSelectedPromotionType] = useState('discount');

  const [basePrice, setBasePrice] = useState(29.99);
  const [baseSales, setBaseSales] = useState(1000);
  const [projectedSales, setProjectedSales] = useState(0);
  const [projectedRevenue, setProjectedRevenue] = useState(0);
  const [revenueImpact, setRevenueImpact] = useState(0);
  const [optimalDiscount, setOptimalDiscount] = useState(0);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  useEffect(() => {
    if (basePrice && baseSales) {
      let elasticityValue = -0.89;
      
      if (selectedCategory === 'baby') {
        if (selectedSubcategory === 'feeding') elasticityValue = -1.03;
        else if (selectedSubcategory === 'diapers') elasticityValue = -0.97;
        else if (selectedSubcategory === 'bath') elasticityValue = -0.34;
        else if (selectedSubcategory === 'all') elasticityValue = -0.78;
      } else if (selectedCategory === 'books') {
        if (selectedSubcategory === 'business') elasticityValue = -0.56;
        else if (selectedSubcategory === 'fiction') elasticityValue = -0.66;
        else if (selectedSubcategory === 'children') elasticityValue = -0.42;
        else if (selectedSubcategory === 'all') elasticityValue = -0.55;
      }
      
      if (selectedMonth === 'jul') elasticityValue *= 1.7;
      else if (selectedMonth === 'nov' || selectedMonth === 'dec') {
        if (selectedCategory === 'books') elasticityValue *= 1.5;
        else elasticityValue *= 1.2;
      }
      
      const discountRate = discountPercentage / 100;
      const newPrice = basePrice * (1 - discountRate);
      const salesImpact = baseSales * (1 + (-elasticityValue * discountRate));
      
      const newRevenue = salesImpact * newPrice;
      const currentRevenue = baseSales * basePrice;
      const revImpact = newRevenue - currentRevenue;
      
      const optDiscount = Math.min(Math.round(100 / Math.abs(elasticityValue)), 50);
      
      setProjectedSales(Math.round(salesImpact));
      setProjectedRevenue(Math.round(newRevenue));
      setRevenueImpact(Math.round(revImpact));
      setOptimalDiscount(optDiscount);
    }
  }, [basePrice, baseSales, discountPercentage, selectedCategory, selectedSubcategory, selectedMonth]);

  const monthlyElasticityData = [
    { month: 'Jan', baby: -0.65, books: -0.45 },
    { month: 'Feb', baby: -0.71, books: -0.48 },
    { month: 'Mar', baby: -0.68, books: -0.52 },
    { month: 'Apr', baby: -0.74, books: -0.55 },
    { month: 'May', baby: -0.82, books: -0.59 },
    { month: 'Jun', baby: -0.91, books: -0.62 },
    { month: 'Jul', baby: -1.53, books: -0.84 },
    { month: 'Aug', baby: -0.93, books: -0.66 },
    { month: 'Sep', baby: -0.79, books: -0.64 },
    { month: 'Oct', baby: -0.85, books: -0.78 },
    { month: 'Nov', baby: -0.94, books: -0.93 },
    { month: 'Dec', baby: -0.98, books: -0.96 }
  ];

  const subcategoryElasticityData = [
    { name: 'Feeding', elasticity: -1.03, category: 'Baby' },
    { name: 'Diapers', elasticity: -0.97, category: 'Baby' },
    { name: 'Furniture', elasticity: -0.62, category: 'Baby' },
    { name: 'Strollers', elasticity: -0.58, category: 'Baby' },
    { name: 'Toys', elasticity: -0.74, category: 'Baby' },
    { name: 'Bath', elasticity: -0.34, category: 'Baby' },
    { name: 'Business', elasticity: -0.56, category: 'Books' },
    { name: 'Fiction', elasticity: -0.66, category: 'Books' },
    { name: 'Children', elasticity: -0.42, category: 'Books' },
    { name: 'Academic', elasticity: -0.52, category: 'Books' }
  ];

  const heatmapData = [];
  for (let i = 0; i < 12; i++) {
    for (let j = 0; j < 2; j++) {
      const category = j === 0 ? 'Baby' : 'Books';
      const elasticity = j === 0 ? monthlyElasticityData[i].baby : monthlyElasticityData[i].books;
      heatmapData.push({
        month: monthlyElasticityData[i].month,
        category: category,
        elasticity: Math.abs(elasticity),
        value: Math.abs(elasticity)
      });
    }
  }

  const priceSensitivityData = [
    { name: 'Price Increase', value: 0.89 },
    { name: 'Price Discount', value: 0.04 }
  ];

  const lineChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
      }
    }
  };

  const barChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      }
    },
    scales: {
      y: {
        beginAtZero: true,
      }
    }
  };

  const getBarColor = (elasticity) => {
    const absValue = Math.abs(elasticity);
    if (absValue > 1) return '#5840bb';
    if (absValue > 0.7) return '#6892e6';
    if (absValue > 0.5) return '#94a3b8';
    return '#cbd5e1';
  };

  return (
    <div className="flex min-h-screen bg-dashboard-bg">
      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <div className="flex-1 flex flex-col">
        <Header />
        
        <div className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
              <h1 className="text-2xl font-bold text-dashboard-text">Promotion Effectiveness Dashboard</h1>
              
              <div className="flex items-center gap-2 mt-2 md:mt-0">
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-[130px]">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="baby">Baby Products</SelectItem>
                    <SelectItem value="books">Books</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select value={selectedSubcategory} onValueChange={setSelectedSubcategory}>
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Subcategory" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Subcategories</SelectItem>
                    {selectedCategory === 'baby' ? (
                      <>
                        <SelectItem value="feeding">Feeding</SelectItem>
                        <SelectItem value="diapers">Diapers</SelectItem>
                        <SelectItem value="bath">Bath</SelectItem>
                        <SelectItem value="furniture">Furniture</SelectItem>
                        <SelectItem value="strollers">Strollers</SelectItem>
                        <SelectItem value="toys">Toys</SelectItem>
                      </>
                    ) : (
                      <>
                        <SelectItem value="business">Business</SelectItem>
                        <SelectItem value="fiction">Fiction</SelectItem>
                        <SelectItem value="children">Children's</SelectItem>
                        <SelectItem value="academic">Academic</SelectItem>
                      </>
                    )}
                  </SelectContent>
                </Select>
                
                <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                  <SelectTrigger className="w-[130px]">
                    <SelectValue placeholder="Month" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Months</SelectItem>
                    <SelectItem value="jan">January</SelectItem>
                    <SelectItem value="feb">February</SelectItem>
                    <SelectItem value="mar">March</SelectItem>
                    <SelectItem value="apr">April</SelectItem>
                    <SelectItem value="may">May</SelectItem>
                    <SelectItem value="jun">June</SelectItem>
                    <SelectItem value="jul">July</SelectItem>
                    <SelectItem value="aug">August</SelectItem>
                    <SelectItem value="sep">September</SelectItem>
                    <SelectItem value="oct">October</SelectItem>
                    <SelectItem value="nov">November</SelectItem>
                    <SelectItem value="dec">December</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <UITabs defaultValue="timing" className="mb-6">
              <TabsList className="grid grid-cols-4 mb-4">
                <TabsTrigger value="timing">Timing & Calendar</TabsTrigger>
                <TabsTrigger value="category">Category Analysis</TabsTrigger>
                <TabsTrigger value="optimization">Promotion Optimizer</TabsTrigger>
                <TabsTrigger value="strategy">Seasonal Strategy</TabsTrigger>
              </TabsList>
              
              <TabsContent value="timing" className="animate-fade-in">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <MetricsCard
                    label="Best Month for Promotions"
                    value="July"
                    change="+72%"
                    secondaryLabel="vs. Average Month"
                    isPositive={true}
                    icon={<Calendar className="text-dashboard-primary" />}
                  />
                  <MetricsCard
                    label="Peak Elasticity"
                    value="-1.53"
                    change="-0.75"
                    secondaryLabel="vs. Annual Average"
                    isPositive={true}
                    icon={<TrendingUp className="text-dashboard-primary" />}
                  />
                  <MetricsCard
                    label="Holiday Season Impact"
                    value="+50%"
                    change="+25%"
                    secondaryLabel="Books vs. Baby Products"
                    isPositive={true}
                    icon={<ShoppingCart className="text-dashboard-primary" />}
                  />
                </div>
                
                <div className="dashboard-card mb-6">
                  <h3 className="text-lg font-medium text-dashboard-text mb-4">Promotional Sensitivity Heat Map</h3>
                  <div style={{ height: "350px" }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <ScatterChart
                        margin={{ top: 20, right: 20, bottom: 70, left: 20 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis 
                          dataKey="month" 
                          name="Month" 
                          type="category"
                          axisLine={false}
                          tickLine={false}
                        />
                        <YAxis 
                          dataKey="category" 
                          name="Category" 
                          type="category" 
                          width={80}
                          axisLine={false}
                          tickLine={false}
                        />
                        <ZAxis
                          dataKey="value"
                          range={[100, 1000]}
                          name="Elasticity"
                        />
                        <Tooltip 
                          cursor={{ strokeDasharray: '3 3' }}
                          formatter={(value, name) => [`Elasticity: ${value.toFixed(2)}`, name]}
                          contentStyle={{ 
                            borderRadius: '6px', 
                            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
                            border: '1px solid #e5e7eb'
                          }}
                        />
                        <Scatter 
                          data={heatmapData} 
                          fill="#5840bb"
                          shape={(props) => {
                            const { cx, cy, width, height, value } = props;
                            const opacity = Math.min(value * 0.8, 0.9);
                            return (
                              <Rectangle
                                x={cx - width / 2}
                                y={cy - height / 2}
                                width={width}
                                height={height}
                                fill={`rgba(88, 64, 187, ${opacity})`}
                                strokeWidth={0}
                              />
                            );
                          }}
                        />
                      </ScatterChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="text-xs text-dashboard-secondaryText mt-2">
                    Darker color indicates higher promotional sensitivity (stronger elasticity)
                  </div>
                </div>
                
                <div className="dashboard-card mb-6">
                  <h3 className="text-lg font-medium text-dashboard-text mb-4">Monthly Promotional Elasticity Trends</h3>
                  <div style={{ height: "300px" }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={monthlyElasticityData}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f1f1" />
                        <XAxis 
                          dataKey="month" 
                          axisLine={false} 
                          tickLine={false}
                        />
                        <YAxis 
                          axisLine={false} 
                          tickLine={false}
                          domain={[-1.6, 0]}
                          tickFormatter={(value) => `${value}`}
                        />
                        <Tooltip 
                          formatter={(value) => [`${value}`, 'Elasticity']}
                          contentStyle={{ 
                            borderRadius: '6px', 
                            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
                            border: '1px solid #e5e7eb'
                          }}
                        />
                        <Legend />
                        <Line 
                          type="monotone" 
                          dataKey="baby" 
                          name="Baby Products"
                          stroke="#5840bb" 
                          strokeWidth={2}
                          dot={false}
                          activeDot={{ r: 6 }}
                        />
                        <Line 
                          type="monotone" 
                          dataKey="books" 
                          name="Books"
                          stroke="#6892e6" 
                          strokeWidth={2}
                          dot={false}
                          activeDot={{ r: 6 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="category" className="animate-fade-in">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <MetricsCard
                    label="Most Responsive Subcategory"
                    value="Feeding"
                    change="-1.03"
                    secondaryLabel="Elasticity"
                    isPositive={true}
                    icon={<Target className="text-dashboard-primary" />}
                  />
                  <MetricsCard
                    label="Category Elasticity Difference"
                    value="41.8%"
                    change="Baby > Books"
                    secondaryLabel="Overall Difference"
                    isPositive={true}
                    icon={<BarChart3 className="text-dashboard-primary" />}
                  />
                  <MetricsCard
                    label="Least Responsive Subcategory"
                    value="Bath"
                    change="-0.34"
                    secondaryLabel="Elasticity"
                    isPositive={false}
                    icon={<Target className="text-dashboard-primary" />}
                  />
                </div>
                
                <div className="dashboard-card mb-6">
                  <h3 className="text-lg font-medium text-dashboard-text mb-4">Subcategory Promotional Responsiveness</h3>
                  <div style={{ height: "350px" }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={subcategoryElasticityData}
                        layout="vertical"
                        margin={{ top: 5, right: 30, left: 100, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                        <XAxis 
                          type="number"
                          domain={[-1.2, 0]}
                          axisLine={false}
                          tickLine={false}
                        />
                        <YAxis 
                          dataKey="name" 
                          type="category"
                          axisLine={false}
                          tickLine={false}
                        />
                        <Tooltip
                          formatter={(value) => [`${value}`, 'Elasticity']}
                          contentStyle={{ 
                            borderRadius: '6px', 
                            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
                            border: '1px solid #e5e7eb'
                          }}
                        />
                        <Bar dataKey="elasticity" radius={[0, 4, 4, 0]}>
                          {subcategoryElasticityData.map((entry, index) => (
                            <Cell 
                              key={`cell-${index}`} 
                              fill={entry.category === 'Baby' ? '#5840bb' : '#6892e6'} 
                            />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                
                <div className="dashboard-card mb-6">
                  <h3 className="text-lg font-medium text-dashboard-text mb-4">Price Increase vs. Decrease Sensitivity</h3>
                  <div style={{ height: "300px" }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={priceSensitivityData}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis 
                          dataKey="name"
                          axisLine={false}
                          tickLine={false}
                        />
                        <YAxis
                          label={{ value: 'Elasticity (Absolute)', angle: -90, position: 'insideLeft' }}
                          axisLine={false}
                          tickLine={false}
                        />
                        <Tooltip
                          formatter={(value) => [`${value}`, 'Elasticity']}
                          contentStyle={{ 
                            borderRadius: '6px', 
                            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
                            border: '1px solid #e5e7eb'
                          }}
                        />
                        <Bar dataKey="value" fill="#5840bb" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="text-xs text-dashboard-secondaryText mt-2">
                    Consumers are more sensitive to price increases (-0.89 elasticity) than promotions (-0.04 elasticity)
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="optimization" className="animate-fade-in">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <MetricsCard
                    label="Recommended Discount"
                    value={`${optimalDiscount}%`}
                    change="For Maximum Revenue"
                    secondaryLabel="Based on Elasticity"
                    isPositive={true}
                    icon={<Percent className="text-dashboard-primary" />}
                  />
                  <MetricsCard
                    label="Projected Sales Lift"
                    value={`${((projectedSales / baseSales - 1) * 100).toFixed(1)}%`}
                    change={`+${projectedSales - baseSales} Units`}
                    secondaryLabel="With Current Discount"
                    isPositive={projectedSales > baseSales}
                    icon={<TrendingUp className="text-dashboard-primary" />}
                  />
                  <MetricsCard
                    label="Revenue Impact"
                    value={`$${revenueImpact.toLocaleString()}`}
                    change={`${((projectedRevenue / (baseSales * basePrice) - 1) * 100).toFixed(1)}%`}
                    secondaryLabel="Net Revenue Change"
                    isPositive={revenueImpact > 0}
                    icon={<DollarSign className="text-dashboard-primary" />}
                  />
                </div>
                
                <div className="dashboard-card mb-6">
                  <h3 className="text-lg font-medium text-dashboard-text mb-4">Discount Simulator</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="base-price">Base Price ($)</Label>
                        <Input
                          id="base-price"
                          type="number"
                          value={basePrice}
                          onChange={(e) => setBasePrice(Number(e.target.value))}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="base-sales">Current Monthly Sales (Units)</Label>
                        <Input
                          id="base-sales"
                          type="number"
                          value={baseSales}
                          onChange={(e) => setBaseSales(Number(e.target.value))}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="discount">Discount Percentage (%)</Label>
                        <div className="flex items-center gap-2 mt-1">
                          <Input
                            id="discount"
                            type="number"
                            value={discountPercentage}
                            onChange={(e) => setDiscountPercentage(Number(e.target.value))}
                          />
                          <Button 
                            onClick={() => setDiscountPercentage(optimalDiscount)}
                            variant="outline"
                          >
                            Use Optimal
                          </Button>
                        </div>
                      </div>
                      <div>
                        <Label>Promotion Type</Label>
                        <div className="flex gap-2 mt-1">
                          <Button 
                            variant={selectedPromotionType === 'discount' ? 'default' : 'outline'}
                            onClick={() => setSelectedPromotionType('discount')}
                            className="flex-1"
                          >
                            % Discount
                          </Button>
                          <Button 
                            variant={selectedPromotionType === 'bogo' ? 'default' : 'outline'}
                            onClick={() => setSelectedPromotionType('bogo')}
                            className="flex-1"
                          >
                            BOGO
                          </Button>
                          <Button 
                            variant={selectedPromotionType === 'bundle' ? 'default' : 'outline'}
                            onClick={() => setSelectedPromotionType('bundle')}
                            className="flex-1"
                          >
                            Bundle
                          </Button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-md">
                      <h4 className="font-medium mb-3">Simulation Results</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between py-1 border-b border-gray-200">
                          <span className="text-dashboard-secondaryText">Original Price:</span>
                          <span className="font-medium">${basePrice.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between py-1 border-b border-gray-200">
                          <span className="text-dashboard-secondaryText">Promotional Price:</span>
                          <span className="font-medium">${(basePrice * (1 - discountPercentage / 100)).toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between py-1 border-b border-gray-200">
                          <span className="text-dashboard-secondaryText">Original Sales:</span>
                          <span className="font-medium">{baseSales.toLocaleString()} units</span>
                        </div>
                        <div className="flex justify-between py-1 border-b border-gray-200">
                          <span className="text-dashboard-secondaryText">Projected Sales:</span>
                          <span className="font-medium">{projectedSales.toLocaleString()} units</span>
                        </div>
                        <div className="flex justify-between py-1 border-b border-gray-200">
                          <span className="text-dashboard-secondaryText">Original Revenue:</span>
                          <span className="font-medium">${(baseSales * basePrice).toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between py-1 border-b border-gray-200">
                          <span className="text-dashboard-secondaryText">Projected Revenue:</span>
                          <span className="font-medium">${projectedRevenue.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between py-1 border-b border-gray-200 font-medium">
                          <span>Net Revenue Impact:</span>
                          <span className={revenueImpact >= 0 ? 'text-green-600' : 'text-red-600'}>
                            {revenueImpact >= 0 ? '+' : ''} ${revenueImpact.toLocaleString()}
                          </span>
                        </div>
                        <div className="flex justify-between py-1 border-b border-gray-200">
                          <span className="text-dashboard-secondaryText">Return on Promotion:</span>
                          <span className="font-medium">
                            {(revenueImpact / (basePrice * discountPercentage / 100 * projectedSales) * 100).toFixed(1)}%
                          </span>
                        </div>
                      </div>
                      <div className="mt-3 text-sm">
                        <span className={optimalDiscount === discountPercentage ? 'text-dashboard-success font-medium' : 'text-dashboard-warning'}>
                          {optimalDiscount === discountPercentage ? 
                            '✓ You are using the optimal discount rate' : 
                            `Recommended discount: ${optimalDiscount}% for maximum revenue`}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="dashboard-card mb-6">
                  <h3 className="text-lg font-medium text-dashboard-text mb-4">Promotion ROI by Discount Level</h3>
                  <div style={{ height: "300px" }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis 
                          label={{ value: 'Discount Percentage (%)', position: 'insideBottom', offset: -5 }}
                          type="number"
                          domain={[0, 50]}
                          tickCount={6}
                          axisLine={false}
                          tickLine={false}
                        />
                        <YAxis
                          label={{ value: 'Revenue Change (%)', angle: -90, position: 'insideLeft' }}
                          axisLine={false}
                          tickLine={false}
                        />
                        <Tooltip
                          formatter={(value) => [`${value}%`, 'Revenue Change']}
                          labelFormatter={(value) => `Discount: ${value}%`}
                          contentStyle={{ 
                            borderRadius: '6px', 
                            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
                            border: '1px solid #e5e7eb'
                          }}
                        />
                        <Line 
                          type="monotone" 
                          dataKey="baby"
                          name="Baby Products"
                          stroke="#5840bb"
                          dot={false}
                          isAnimationActive={false}
                          data={Array.from({ length: 51 }, (_, i) => {
                            const discount = i / 100;
                            const elasticity = -0.78;
                            const revenueChange = (1 + (elasticity * discount)) * (1 - discount) - 1;
                            return { x: i, baby: (revenueChange * 100).toFixed(1) };
                          })}
                        />
                        <Line 
                          type="monotone" 
                          dataKey="books"
                          name="Books"
                          stroke="#6892e6"
                          dot={false}
                          isAnimationActive={false}
                          data={Array.from({ length: 51 }, (_, i) => {
                            const discount = i / 100;
                            const elasticity = -0.55;
                            const revenueChange = (1 + (elasticity * discount)) * (1 - discount) - 1;
                            return { x: i, books: (revenueChange * 100).toFixed(1) };
                          })}
                        />
                        <Line 
                          type="monotone" 
                          dataKey="optimal"
                          name="Optimal Point"
                          stroke="#22c55e"
                          strokeWidth={2}
                          strokeDasharray="5 5"
                          dot
                          isAnimationActive={false}
                          data={[
                            { x: optimalDiscount, optimal: ((1 + (-0.78 * optimalDiscount/100)) * (1 - optimalDiscount/100) - 1) * 100 }
                          ]}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="strategy" className="animate-fade-in">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <MetricsCard
                    label="Peak Shopping Season"
                    value="Nov-Dec"
                    change="+45%"
                    secondaryLabel="Books Sales Increase"
                    isPositive={true}
                    icon={<Calendar className="text-dashboard-primary" />}
                  />
                  <MetricsCard
                    label="Off-Season Opportunity"
                    value="Jul"
                    change="-1.53"
                    secondaryLabel="Baby Products Elasticity"
                    isPositive={true}
                    icon={<Tag className="text-dashboard-primary" />}
                  />
                  <MetricsCard
                    label="Optimal Campaign Length"
                    value="7-10 Days"
                    change="+12%"
                    secondaryLabel="vs. 3-5 Day Promotions"
                    isPositive={true}
                    icon={<Clock className="text-dashboard-primary" />}
                  />
                </div>
                
                <div className="dashboard-card mb-6">
                  <h3 className="text-lg font-medium text-dashboard-text mb-4">Monthly Promotion Strategy Calendar</h3>
                  <div className="overflow-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-dashboard-secondaryText uppercase tracking-wider">Month</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-dashboard-secondaryText uppercase tracking-wider">Elasticity</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-dashboard-secondaryText uppercase tracking-wider">Top Subcategory</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-dashboard-secondaryText uppercase tracking-wider">Optimal Discount</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-dashboard-secondaryText uppercase tracking-wider">Strategy</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-dashboard-text">January</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-dashboard-secondaryText">-0.65</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-dashboard-secondaryText">Strollers</td>
                          <td className="px-6
