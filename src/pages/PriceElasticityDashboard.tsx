import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Tabs from '@/components/Tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs as UITabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { InfoIcon, HelpCircle, Download, RefreshCw } from 'lucide-react';
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement, 
  BarElement,
  Title, 
  Tooltip, 
  Legend,
  Filler
} from 'chart.js';
import { Line, Bar, Scatter } from 'react-chartjs-2';
import { 
  elasticityData, 
  priceData, 
  subcategoryElasticityData, 
  competitorData 
} from '@/utils/elasticityData';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const PriceElasticityDashboard = () => {
  const [activeTab, setActiveTab] = useState('price-elasticity');
  const [category, setCategory] = useState('all');
  const [timeRange, setTimeRange] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [currentPrice, setCurrentPrice] = useState(25);
  const [currentSales, setCurrentSales] = useState(1000);
  const [selectedProduct, setSelectedProduct] = useState('baby');
  const [selectedSubcategory, setSelectedSubcategory] = useState('all');
  const [priceChange, setPriceChange] = useState(0);
  const [recommendedPrice, setRecommendedPrice] = useState(null);
  const [projectedSales, setProjectedSales] = useState(null);
  const [projectedRevenue, setProjectedRevenue] = useState(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  useEffect(() => {
    if (currentPrice && currentSales) {
      let elasticityValue = -0.27; // Default for baby products
      
      if (selectedProduct === 'baby') {
        elasticityValue = -0.27;
        if (selectedSubcategory === 'strollers') elasticityValue = -0.85;
        else if (selectedSubcategory === 'furniture') elasticityValue = -0.65;
        else if (selectedSubcategory === 'toys') elasticityValue = -0.54;
        else if (selectedSubcategory === 'diapers') elasticityValue = -0.30;
      } else if (selectedProduct === 'books') {
        elasticityValue = -0.24;
        if (selectedSubcategory === 'business') elasticityValue = -0.31;
        else if (selectedSubcategory === 'fiction') elasticityValue = -0.25;
        else if (selectedSubcategory === 'children') elasticityValue = -0.09;
      }
      
      const percentageChange = priceChange / 100;
      
      const salesImpact = currentSales * (1 + (elasticityValue * percentageChange));
      
      const newPrice = currentPrice * (1 + percentageChange);
      
      const newRevenue = salesImpact * newPrice;
      const currentRevenue = currentSales * currentPrice;
      
      const optimalPriceChange = (-1 / elasticityValue) - 1;
      const optimalPrice = currentPrice * (1 + optimalPriceChange);
      
      setProjectedSales(salesImpact);
      setProjectedRevenue(newRevenue);
      setRecommendedPrice(optimalPrice > 0 ? optimalPrice : currentPrice);
    }
  }, [currentPrice, currentSales, priceChange, selectedProduct, selectedSubcategory]);

  const priceTrendData = {
    labels: ['Mar 2023', 'Jun 2023', 'Sep 2023', 'Dec 2023', 'Mar 2024', 'Jun 2024', 'Sep 2024', 'Dec 2024', 'Feb 2025'],
    datasets: [
      {
        label: 'Baby Products',
        data: [26.45, 27.12, 27.89, 28.34, 28.67, 28.99, 29.24, 29.56, 29.82],
        borderColor: 'rgb(79, 70, 229)',
        backgroundColor: 'rgba(79, 70, 229, 0.1)',
        tension: 0.4,
        fill: true
      },
      {
        label: 'Books',
        data: [14.32, 14.57, 14.89, 15.12, 15.33, 15.45, 15.76, 15.98, 16.22],
        borderColor: 'rgb(16, 185, 129)',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        tension: 0.4,
        fill: true
      }
    ]
  };

  const elasticityTrendData = {
    labels: ['Mar 2023', 'Jun 2023', 'Sep 2023', 'Dec 2023', 'Mar 2024', 'Jun 2024', 'Sep 2024', 'Dec 2024', 'Feb 2025'],
    datasets: [
      {
        label: 'Baby Products',
        data: [-0.29, -0.28, -0.27, -0.27, -0.26, -0.27, -0.28, -0.27, -0.27],
        borderColor: 'rgb(79, 70, 229)',
        backgroundColor: 'rgb(79, 70, 229)',
        tension: 0.4
      },
      {
        label: 'Books',
        data: [-0.25, -0.24, -0.24, -0.24, -0.23, -0.24, -0.25, -0.24, -0.24],
        borderColor: 'rgb(16, 185, 129)',
        backgroundColor: 'rgb(16, 185, 129)',
        tension: 0.4
      }
    ]
  };

  const categoryComparisonData = {
    labels: ['Baby Products', 'Books'],
    datasets: [
      {
        label: 'Price Elasticity',
        data: [-0.27, -0.24],
        backgroundColor: [
          'rgba(79, 70, 229, 0.7)',
          'rgba(16, 185, 129, 0.7)'
        ],
        borderColor: [
          'rgb(79, 70, 229)',
          'rgb(16, 185, 129)'
        ],
        borderWidth: 1
      }
    ]
  };

  const subcategoryComparisonData = {
    labels: ['Strollers', 'Furniture', 'Toys', 'Diapers', 'Business Books', 'Fiction Books', 'Children\'s Books'],
    datasets: [
      {
        label: 'Price Elasticity',
        data: [-0.85, -0.65, -0.54, -0.30, -0.31, -0.25, -0.09],
        backgroundColor: [
          'rgba(79, 70, 229, 0.7)',
          'rgba(79, 70, 229, 0.6)',
          'rgba(79, 70, 229, 0.5)',
          'rgba(79, 70, 229, 0.4)',
          'rgba(16, 185, 129, 0.7)',
          'rgba(16, 185, 129, 0.5)',
          'rgba(16, 185, 129, 0.3)'
        ],
        borderColor: [
          'rgb(79, 70, 229)',
          'rgb(79, 70, 229)',
          'rgb(79, 70, 229)',
          'rgb(79, 70, 229)',
          'rgb(16, 185, 129)',
          'rgb(16, 185, 129)',
          'rgb(16, 185, 129)'
        ],
        borderWidth: 1
      }
    ]
  };

  const priceVsElasticityData = {
    datasets: [
      {
        label: 'Baby Products',
        data: [
          { x: 15, y: -0.22 },
          { x: 25, y: -0.27 },
          { x: 35, y: -0.32 },
          { x: 45, y: -0.35 },
          { x: 55, y: -0.38 },
          { x: 95, y: -0.45 },
          { x: 155, y: -0.52 },
          { x: 215, y: -0.58 },
          { x: 345, y: -0.75 },
          { x: 495, y: -0.85 }
        ],
        backgroundColor: 'rgba(79, 70, 229, 0.7)',
        radius: 5
      },
      {
        label: 'Books',
        data: [
          { x: 5, y: -0.05 },
          { x: 10, y: -0.15 },
          { x: 15, y: -0.24 },
          { x: 20, y: -0.28 },
          { x: 25, y: -0.30 },
          { x: 35, y: -0.32 },
          { x: 45, y: -0.35 },
          { x: 75, y: -0.38 },
          { x: 145, y: -0.42 },
          { x: 215, y: -0.48 }
        ],
        backgroundColor: 'rgba(16, 185, 129, 0.7)',
        radius: 5
      }
    ]
  };

  const competitorBenchmarkData = {
    labels: ['Amazon', 'Walmart', 'Target', 'Buy Buy Baby', 'Barnes & Noble'],
    datasets: [
      {
        label: 'Price Elasticity (Baby Products)',
        data: [-0.27, -1.2, -0.9, -0.7, null],
        backgroundColor: 'rgba(79, 70, 229, 0.7)',
        borderColor: 'rgb(79, 70, 229)',
        borderWidth: 1
      },
      {
        label: 'Price Elasticity (Books)',
        data: [-0.24, -0.8, -0.7, null, -0.4],
        backgroundColor: 'rgba(16, 185, 129, 0.7)',
        borderColor: 'rgb(16, 185, 129)',
        borderWidth: 1
      }
    ]
  };

  const lineChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      tooltip: {
        mode: 'index' as const,
        intersect: false,
      },
    },
    scales: {
      y: {
        beginAtZero: false,
      }
    }
  };

  const elasticityChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      tooltip: {
        mode: 'index' as const,
        intersect: false,
      },
    },
    scales: {
      y: {
        reverse: true,
        beginAtZero: true,
      }
    }
  };

  const horizontalBarOptions = {
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: 'y' as const,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
    scales: {
      x: {
        reverse: true,
        beginAtZero: true,
      }
    }
  };

  const scatterOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            return `${context.dataset.label}: Price $${context.parsed.x}, Elasticity ${context.parsed.y}`;
          }
        }
      }
    },
    scales: {
      y: {
        reverse: true,
        title: {
          display: true,
          text: 'Price Elasticity'
        }
      },
      x: {
        title: {
          display: true,
          text: 'Price ($)'
        }
      }
    }
  };

  return (
    <div className="min-h-screen flex w-full bg-dashboard-bg">
      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="flex flex-col flex-1">
        <Header />
        <div className="flex-grow py-6 px-6">
          {mounted && (
            <div className="animate-fade-in">
              <div className="flex flex-col gap-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-2xl font-medium text-dashboard-text">Price Elasticity Dashboard</h2>
                    <p className="text-dashboard-secondaryText">Analysis of price sensitivity for Amazon products</p>
                  </div>

                  <div className="flex items-center gap-3">
                    <Select value={category} onValueChange={setCategory}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Categories</SelectItem>
                        <SelectItem value="baby">Baby Products</SelectItem>
                        <SelectItem value="books">Books</SelectItem>
                      </SelectContent>
                    </Select>

                    <Select value={timeRange} onValueChange={setTimeRange}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select time range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Time</SelectItem>
                        <SelectItem value="1y">Last 12 Months</SelectItem>
                        <SelectItem value="6m">Last 6 Months</SelectItem>
                        <SelectItem value="3m">Last 3 Months</SelectItem>
                      </SelectContent>
                    </Select>

                    <Button variant="outline" size="sm" className="flex items-center gap-2">
                      <Download size={14} />
                      <span>Export</span>
                    </Button>
                  </div>
                </div>

                <UITabs defaultValue="overview" className="w-full">
                  <TabsList className="grid grid-cols-4 mb-4">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="products">Product Analysis</TabsTrigger>
                    <TabsTrigger value="calculator">Price Calculator</TabsTrigger>
                    <TabsTrigger value="competitors">Competitor Benchmarking</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="overview">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                      <Card>
                        <CardHeader>
                          <CardTitle>Price Trends</CardTitle>
                          <CardDescription>Average price trends by category over time</CardDescription>
                        </CardHeader>
                        <CardContent className="h-[300px]">
                          <Line data={priceTrendData} options={lineChartOptions} />
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle>Elasticity Trends</CardTitle>
                          <CardDescription>Price elasticity changes over time</CardDescription>
                        </CardHeader>
                        <CardContent className="h-[300px]">
                          <Line data={elasticityTrendData} options={lineChartOptions} />
                        </CardContent>
                      </Card>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                      <Card>
                        <CardHeader>
                          <CardTitle>Category Comparison</CardTitle>
                          <CardDescription>Price elasticity comparison between categories</CardDescription>
                          <div className="absolute top-4 right-4 group">
                            <HelpCircle size={16} className="text-dashboard-secondaryText" />
                            <div className="absolute right-0 w-72 p-3 bg-white border border-dashboard-border rounded-md shadow-sm text-xs text-dashboard-secondaryText invisible group-hover:visible z-10">
                              <p>Price elasticity measures how sensitive demand is to price changes.</p>
                              <p className="mt-1">Values closer to 0 indicate less price sensitivity (inelastic).</p>
                              <p className="mt-1">Values below -1 indicate more price sensitivity (elastic).</p>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className="h-[300px]">
                          <Bar data={categoryComparisonData} options={elasticityChartOptions} />
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle>Subcategory Comparison</CardTitle>
                          <CardDescription>Price elasticity by subcategory</CardDescription>
                        </CardHeader>
                        <CardContent className="h-[300px]">
                          <Bar data={subcategoryComparisonData} options={horizontalBarOptions} />
                        </CardContent>
                      </Card>
                    </div>

                    <Card className="mb-6">
                      <CardHeader>
                        <CardTitle>Understanding Price Elasticity</CardTitle>
                        <CardDescription>How to interpret and use elasticity values</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          <div className="p-4 border border-dashboard-border rounded-lg">
                            <h4 className="font-medium mb-2">What is Price Elasticity?</h4>
                            <p className="text-sm text-dashboard-secondaryText">
                              Price elasticity measures how sensitive demand is to price changes. It's calculated as the percentage change in quantity demanded divided by the percentage change in price.
                            </p>
                          </div>
                          <div className="p-4 border border-dashboard-border rounded-lg">
                            <h4 className="font-medium mb-2">Interpreting Values</h4>
                            <p className="text-sm text-dashboard-secondaryText">
                              <strong>Elastic (&lt; -1):</strong> Demand changes proportionally more than price<br />
                              <strong>Inelastic (&gt; -1):</strong> Demand changes proportionally less than price<br />
                              <strong>Perfect inelasticity (0):</strong> Demand doesn't change with price
                            </p>
                          </div>
                          <div className="p-4 border border-dashboard-border rounded-lg">
                            <h4 className="font-medium mb-2">Example</h4>
                            <p className="text-sm text-dashboard-secondaryText">
                              For a 10% price increase:<br />
                              <strong>Elasticity of -0.5:</strong> 5% sales decrease<br />
                              <strong>Elasticity of -1.5:</strong> 15% sales decrease
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                  
                  <TabsContent value="products">
                    <div className="grid grid-cols-1 gap-6 mb-6">
                      <Card>
                        <CardHeader>
                          <CardTitle>Price vs. Elasticity Relationship</CardTitle>
                          <CardDescription>How elasticity varies by price point across categories</CardDescription>
                        </CardHeader>
                        <CardContent className="h-[400px]">
                          <Scatter data={priceVsElasticityData} options={scatterOptions} />
                        </CardContent>
                      </Card>
                    </div>

                    <div className="grid grid-cols-1 gap-6 mb-6">
                      <Card>
                        <CardHeader>
                          <CardTitle>Subcategory Detail</CardTitle>
                          <CardDescription>Price elasticity metrics by subcategory</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                              <thead>
                                <tr className="border-b">
                                  <th className="text-left py-3 px-4">Subcategory</th>
                                  <th className="text-left py-3 px-4">Elasticity</th>
                                  <th className="text-left py-3 px-4">Avg. Price</th>
                                  <th className="text-left py-3 px-4">Avg. Units Sold</th>
                                  <th className="text-left py-3 px-4">Price-Sensitivity</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr className="border-b">
                                  <td className="py-3 px-4">Strollers</td>
                                  <td className="py-3 px-4">-0.85</td>
                                  <td className="py-3 px-4">$349.99</td>
                                  <td className="py-3 px-4">452</td>
                                  <td className="py-3 px-4">
                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                      <div className="bg-indigo-600 h-2 rounded-full" style={{ width: "85%" }}></div>
                                    </div>
                                  </td>
                                </tr>
                                <tr className="border-b">
                                  <td className="py-3 px-4">Baby Furniture</td>
                                  <td className="py-3 px-4">-0.65</td>
                                  <td className="py-3 px-4">$189.99</td>
                                  <td className="py-3 px-4">723</td>
                                  <td className="py-3 px-4">
                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                      <div className="bg-indigo-600 h-2 rounded-full" style={{ width: "65%" }}></div>
                                    </div>
                                  </td>
                                </tr>
                                <tr className="border-b">
                                  <td className="py-3 px-4">Baby Toys</td>
                                  <td className="py-3 px-4">-0.54</td>
                                  <td className="py-3 px-4">$24.99</td>
                                  <td className="py-3 px-4">3,211</td>
                                  <td className="py-3 px-4">
                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                      <div className="bg-indigo-600 h-2 rounded-full" style={{ width: "54%" }}></div>
                                    </div>
                                  </td>
                                </tr>
                                <tr className="border-b">
                                  <td className="py-3 px-4">Diapers</td>
                                  <td className="py-3 px-4">-0.30</td>
                                  <td className="py-3 px-4">$42.99</td>
                                  <td className="py-3 px-4">8,945</td>
                                  <td className="py-3 px-4">
                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                      <div className="bg-indigo-600 h-2 rounded-full" style={{ width: "30%" }}></div>
                                    </div>
                                  </td>
                                </tr>
                                <tr className="border-b">
                                  <td className="py-3 px-4">Business Books</td>
                                  <td className="py-3 px-4">-0.31</td>
                                  <td className="py-3 px-4">$18.99</td>
                                  <td className="py-3 px-4">2,345</td>
                                  <td className="py-3 px-4">
                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                      <div className="bg-green-600 h-2 rounded-full" style={{ width: "31%" }}></div>
                                    </div>
                                  </td>
                                </tr>
                                <tr className="border-b">
                                  <td className="py-3 px-4">Fiction Books</td>
                                  <td className="py-3 px-4">-0.25</td>
                                  <td className="py-3 px-4">$12.99</td>
                                  <td className="py-3 px-4">12,678</td>
                                  <td className="py-3 px-4">
                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                      <div className="bg-green-600 h-2 rounded-full" style={{ width: "25%" }}></div>
                                    </div>
                                  </td>
                                </tr>
                                <tr>
                                  <td className="py-3 px-4">Children's Books</td>
                                  <td className="py-3 px-4">-0.09</td>
                                  <td className="py-3 px-4">$8.99</td>
                                  <td className="py-3 px-4">22,456</td>
                                  <td className="py-3 px-4">
                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                      <div className="bg-green-600 h-2 rounded-full" style={{ width: "9%" }}></div>
                                    </div>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="calculator">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                      <Card>
                        <CardHeader>
                          <CardTitle>Price Calculator</CardTitle>
                          <CardDescription>Simulate price changes and impacts</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <div>
                              <label className="text-sm font-medium mb-1 block">Product Category</label>
                              <Select value={selectedProduct} onValueChange={setSelectedProduct}>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select product category" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="baby">Baby Products</SelectItem>
                                  <SelectItem value="books">Books</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            
                            <div>
                              <label className="text-sm font-medium mb-1 block">Product Subcategory</label>
                              <Select value={selectedSubcategory} onValueChange={setSelectedSubcategory}>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select subcategory" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="all">All Subcategories</SelectItem>
                                  {selectedProduct === 'baby' ? (
                                    <>
                                      <SelectItem value="strollers">Strollers</SelectItem>
                                      <SelectItem value="furniture">Furniture</SelectItem>
                                      <SelectItem value="toys">Toys</SelectItem>
                                      <SelectItem value="diapers">Diapers</SelectItem>
                                    </>
                                  ) : (
                                    <>
                                      <SelectItem value="business">Business</SelectItem>
                                      <SelectItem value="fiction">Fiction</SelectItem>
                                      <SelectItem value="children">Children's Books</SelectItem>
                                    </>
                                  )}
                                </SelectContent>
                              </Select>
                            </div>
                            
                            <div>
                              <label className="text-sm font-medium mb-1 block">Current Price ($)</label>
                              <Input 
                                type="number" 
                                value={currentPrice} 
                                onChange={(e) => setCurrentPrice(parseFloat(e.target.value))}
                                min="0.01"
                                step="0.01"
                                placeholder="Enter current price" 
                              />
                            </div>
                            
                            <div>
                              <label className="text-sm font-medium mb-1 block">Current Units Sold (monthly)</label>
                              <Input 
                                type="number" 
                                value={currentSales} 
                                onChange={(e) => setCurrentSales(parseInt(e.target.value))}
                                min="1"
                                step="1"
                                placeholder="Enter current units sold" 
                              />
                            </div>
                            
                            <div>
                              <label className="text-sm font-medium mb-1 flex justify-between">
                                <span>Price Change (%): <span className="font-bold">{priceChange > 0 ? '+' : ''}{priceChange}%</span></span>
                              </label>
                              <Slider
                                value={[priceChange]}
                                onValueChange={(value) => setPriceChange(value[0])}
                                min={-50}
                                max={50}
                                step={1}
                                className="my-4"
                              />
                            </div>
                            
                            <Button className="w-full" onClick={() => {}}>
                              Calculate Impact
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardHeader>
                          <CardTitle>Projected Impact</CardTitle>
                          <CardDescription>Expected changes in sales and revenue</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <div className="p-4 border border-dashboard-border rounded-lg">
                              <div className="flex justify-between items-center mb-2">
                                <span className="text-sm font-medium">New Price:</span>
                                <span className="text-sm font-bold">${(currentPrice * (1 + priceChange / 100)).toFixed(2)}</span>
                              </div>
                              <div className="flex justify-between items-center mb-2">
                                <span className="text-sm font-medium">Current Monthly Revenue:</span>
                                <span className="text-sm font-bold">${(currentPrice * currentSales).toLocaleString()}</span>
                              </div>
                              
                              {projectedSales && (
                                <>
                                  <div className="flex justify-between items-center mb-2">
                                    <span className="text-sm font-medium">Projected Units:</span>
                                    <span className="text-sm font-bold">{Math.round(projectedSales).toLocaleString()}</span>
                                  </div>
                                  <div className="flex justify-between items-center mb-2">
                                    <span className="text-sm font-medium">Projected Monthly Revenue:</span>
                                    <span className="text-sm font-bold">${Math.round(projectedRevenue).toLocaleString()}</span>
                                  </div>
                                  <div className="flex justify-between items-center">
                                    <span className="text-sm font-medium">Revenue Impact:</span>
                                    <span className={`text-sm font-bold ${projectedRevenue > currentPrice * currentSales ? 'text-green-600' : 'text-red-600'}`}>
                                      {(((projectedRevenue / (currentPrice * currentSales)) - 1) * 100).toFixed(1)}%
                                    </span>
                                  </div>
                                </>
                              )}
                            </div>
                            
                            <div className="h-[180px]">
                              <Bar 
                                data={{
                                  labels: ['Current', 'Projected'],
                                  datasets: [
                                    {
                                      label: 'Revenue',
                                      data: [
                                        currentPrice * currentSales,
                                        projectedRevenue || 0
                                      ],
                                      backgroundColor: [
                                        'rgba(79, 70, 229, 0.7)',
                                        projectedRevenue > currentPrice * currentSales ? 'rgba(16, 185, 129, 0.7)' : 'rgba(239, 68, 68, 0.7)'
                                      ]
                                    }
                                  ]
                                }}
                                options={{
                                  responsive: true,
                                  maintainAspectRatio: false,
                                  scales: {
                                    y: {
                                      beginAtZero: true,
                                      ticks: {
                                        callback: function(value) {
                                          return '$' + value.toLocaleString();
                                        }
                                      }
                                    }
                                  }
                                }}
                              />
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardHeader>
                          <CardTitle>Optimization Recommendation</CardTitle>
                          <CardDescription>Revenue-maximizing price point</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <div className="p-4 border border-dashboard-border rounded-lg bg-blue-50">
                              <h4 className="font-medium mb-2 flex items-center text-blue-800">
                                <InfoIcon size={16} className="mr-2" />
                                Recommended Price
                              </h4>
                              {recommendedPrice && (
                                <div className="text-center my-4">
                                  <span className="text-3xl font-bold text-blue-800">${recommendedPrice.toFixed(2)}</span>
                                  <p className="text-sm text-blue-700 mt-1">
                                    {recommendedPrice > currentPrice ? 'Increase' : 'Decrease'} from ${currentPrice.toFixed(2)}
                                    ({(((recommendedPrice / currentPrice) - 1) * 100).toFixed(1)}%)
                                  </p>
                                </div>
                              )}
                              <p className="text-sm text-blue-700">
                                This is the estimated optimal price point to maximize revenue based on elasticity calculations.
                              </p>
                            </div>
                            
                            <div className="p-4 border border-dashboard-border rounded-lg">
                              <h4 className="font-medium mb-2">Insights</h4>
                              <ul className="text-sm space-y-2 text-dashboard-secondaryText">
                                <li className="flex items-start">
                                  <span className="mr-2">•</span>
                                  {selectedProduct === 'baby' ? 'Baby products' : 'Books'} show relatively inelastic demand (elasticity {'\u003E'} -1).
                                </li>
                                <li className="flex items-start">
                                  <span className="mr-2">•</span>
                                  {selectedSubcategory !== 'all' ? (
                                    <>
                                      {selectedSubcategory.charAt(0).toUpperCase() + selectedSubcategory.slice(1)} have 
                                      {selectedSubcategory === 'strollers' ? ' higher' : ' lower'} price sensitivity than other subcategories.
                                    </>
                                  ) : (
                                    <>
                                      Consider subcategory differences when setting prices.
                                    </>
                                  )}
                                </li>
                                <li className="flex items-start">
                                  <span className="mr-2">•</span>
                                  Small price adjustments can significantly impact overall revenue.
                                </li>
                              </ul>
                            </div>
                            
                            <Button variant="outline" className="w-full flex items-center justify-center gap-2">
                              <RefreshCw size={14} />
                              Recalculate
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="competitors">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                      <Card>
                        <CardHeader>
                          <CardTitle>Competitor Elasticity Comparison</CardTitle>
                          <CardDescription>Price sensitivity across retailers</CardDescription>
                        </CardHeader>
                        <CardContent className="h-[350px]">
                          <Bar data={competitorBenchmarkData} options={elasticityChartOptions} />
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle>Market Positioning</CardTitle>
                          <CardDescription>Competitive landscape analysis</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="h-[350px] relative">
                            <div className="absolute inset-0 flex items-center justify-center text-dashboard-secondaryText text-sm">
                              Market positioning chart coming soon
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                    
                    <Card>
                      <CardHeader>
                        <CardTitle>Competitive Analysis Summary</CardTitle>
                        <CardDescription>Key insights and competitive advantage</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-4">
                            <h4 className="font-medium">Price Sensitivity Analysis</h4>
                            <ul className="text-sm space-y-2 text-dashboard-secondaryText">
                              <li className="flex items-start">
                                <span className="mr-2">•</span>
                                Amazon shows significantly lower price sensitivity (more inelastic) than other mass retailers like Walmart and Target.
                              </li>
                              <li className="flex items-start">
                                <span className="mr-2">•</span>
                                For baby products, Amazon's elasticity (-0.27) is much lower than Walmart (-1.2), indicating Amazon customers are less price-sensitive.
                              </li>
                              <li className="flex items-start">
                                <span className="mr-2">•</span>
                                In books, Amazon (-0.24) has the lowest elasticity compared to competitors, allowing for potential price optimization.
                              </li>
                              <li className="flex items-start">
                                <span className="mr-2">•</span>
                                Specialty retailers (Buy Buy Baby, Barnes & Noble) show moderate elasticity, positioned between mass merchants and Amazon.
                              </li>
                            </ul>
                          </div>
                          
                          <div className="space-y-4">
                            <h4 className="font-medium">Strategic Recommendations</h4>
                            <ul className="text-sm space-y-2 text-dashboard-secondaryText">
                              <li className="flex items-start">
                                <span className="mr-2">•</span>
                                <strong>Baby Products:</strong> Consider selective price increases in subcategories with lower elasticity (diapers, toys).
                              </li>
                              <li className="flex items-start">
                                <span className="mr-2">•</span>
                                <strong>Books:</strong> Children's books (-0.09) have extremely low elasticity, suggesting opportunity for price optimization.
                              </li>
                              <li className="flex items-start">
                                <span className="mr-2">•</span>
                                <strong>Competitive Edge:</strong> Focus on non-price differentiation against more elastic competitors like Walmart.
                              </li>
                              <li className="flex items-start">
                                <span className="mr-2">•</span>
                                <strong>Pricing Strategy:</strong> Maintain competitive pricing on highly elastic items (strollers, furniture) while optimizing less elastic categories.
                              </li>
                            </ul>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </UITabs>
                
                <div className="text-xs text-center text-dashboard-secondaryText mt-6 pt-4 border-t border-dashboard-border">
                  <p>Source: SimilarWeb Data • March 2023 - February 2025 • 47,901 products analyzed</p>
                </div>
              </div>
            </div>
          )}
        </div>
        <footer className="bg-white border-t border-dashboard-border py-4 px-6">
          <div className="flex justify-between items-center text-sm text-dashboard-secondaryText">
            <span>© 2023 CategoryBench</span>
            <span>Last updated: March 15, 2024</span>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default PriceElasticityDashboard;

