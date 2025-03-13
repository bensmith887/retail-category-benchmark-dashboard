
import React from 'react';
import MetricsCard from '@/components/MetricsCard';
import { pricingData, competitorData, insightData } from '@/utils/data';
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from '@/components/ui/table';
import { DollarSign, TrendingUp, TrendingDown, BarChart3, LineChart } from 'lucide-react';
import { cn } from '@/lib/utils';
import BarChart from './charts/BarChart';
import InsightCard from './InsightCard';

// Calculate average price for all competitors
const avgPrice = pricingData.reduce((sum, item) => sum + item.price, 0) / pricingData.length;
const yourPrice = pricingData.find(item => item.name === 'Your Brand')?.price || 0;
const priceDiff = ((yourPrice - avgPrice) / avgPrice * 100).toFixed(1);

// Sample product benchmark data
const productBenchmarkData = [
  {
    product: "Ultra Comfort Running Shoes",
    yourPrice: 129.99,
    yourViews: 32500,
    yourMonthChange: 5.8,
    yourYearChange: 15.2,
    competitors: [
      { name: "Competitor A", price: 139.99, views: 28300, monthChange: 3.2, yearChange: 12.1 },
      { name: "Competitor B", price: 119.99, views: 22100, monthChange: -1.5, yearChange: 8.4 },
      { name: "Competitor C", price: 124.99, views: 18500, monthChange: 2.8, yearChange: 10.9 }
    ]
  },
  {
    product: "Premium Wireless Headphones",
    yourPrice: 199.99,
    yourViews: 28700,
    yourMonthChange: 7.2,
    yourYearChange: 22.4,
    competitors: [
      { name: "Competitor A", price: 219.99, views: 25400, monthChange: 4.8, yearChange: 18.5 },
      { name: "Competitor B", price: 189.99, views: 19800, monthChange: 3.1, yearChange: 16.2 },
      { name: "Competitor C", price: 209.99, views: 16900, monthChange: 1.5, yearChange: 12.8 }
    ]
  },
  {
    product: "Smart Fitness Tracker",
    yourPrice: 89.99,
    yourViews: 41200,
    yourMonthChange: 12.5,
    yourYearChange: 31.8,
    competitors: [
      { name: "Competitor A", price: 99.99, views: 35600, monthChange: 8.9, yearChange: 25.3 },
      { name: "Competitor B", price: 79.99, views: 29700, monthChange: 6.5, yearChange: 22.1 },
      { name: "Competitor C", price: 94.99, views: 24300, monthChange: 5.2, yearChange: 19.8 }
    ]
  }
];

// Define price range data that was missing
const priceRangeData = [
  {
    name: 'Your Brand',
    ranges: [
      { views: 24500, percentage: 28 },
      { views: 42300, percentage: 48 },
      { views: 21200, percentage: 24 }
    ],
    totalViews: 88000
  },
  {
    name: 'Competitor A',
    ranges: [
      { views: 32100, percentage: 42 },
      { views: 28400, percentage: 37 },
      { views: 16000, percentage: 21 }
    ],
    totalViews: 76500
  },
  {
    name: 'Competitor B',
    ranges: [
      { views: 18300, percentage: 31 },
      { views: 29500, percentage: 50 },
      { views: 11200, percentage: 19 }
    ],
    totalViews: 59000
  },
  {
    name: 'Competitor C',
    ranges: [
      { views: 21700, percentage: 35 },
      { views: 26800, percentage: 43 },
      { views: 13500, percentage: 22 }
    ],
    totalViews: 62000
  }
];

const PricingView: React.FC = () => {
  return (
    <div className="animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6 stagger-animate">
        <MetricsCard
          label="Your Avg. Price"
          value={`$${yourPrice}`}
          change={`${priceDiff}%`}
          isPositive={Number(priceDiff) >= 0}
          secondaryLabel="YoY"
          secondaryChange="+3.5%"
          isSecondaryPositive={true}
          className="flex-1"
          icon={<DollarSign className="text-dashboard-primary" />}
        />
        <MetricsCard
          label="Category Avg. Price"
          value={`$${avgPrice.toFixed(2)}`}
          change="+2.3%"
          isPositive={true}
          secondaryLabel="YoY"
          secondaryChange="+4.8%"
          isSecondaryPositive={true}
          className="flex-1"
          icon={<BarChart3 className="text-dashboard-secondary" />}
        />
        <MetricsCard
          label="Price Elasticity"
          value="0.83"
          change="-0.05"
          isPositive={false}
          secondaryLabel="YoY"
          secondaryChange="-0.12"
          isSecondaryPositive={false}
          className="flex-1"
          icon={<LineChart className="text-dashboard-secondary" />}
        />
        <MetricsCard
          label="Price Competitiveness"
          value="Medium"
          secondaryLabel="MoM"
          secondaryChange="+5%"
          isSecondaryPositive={true}
          className="flex-1"
          icon={<TrendingUp className="text-dashboard-primary" />}
        />
      </div>

      {/* Product Pricing Benchmark */}
      <div className="dashboard-card mb-6">
        <h3 className="text-lg font-medium text-dashboard-text mb-4">Product Pricing Benchmark</h3>
        
        {productBenchmarkData.map((benchmark, index) => (
          <div key={benchmark.product} className={cn("p-4 rounded-lg", index !== productBenchmarkData.length - 1 ? "mb-4 border-b border-dashboard-border" : "")}>
            <h4 className="font-medium text-dashboard-text mb-3">{benchmark.product}</h4>
            
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-dashboard-border">
                    <th className="text-left py-2 font-medium text-dashboard-secondaryText">Company</th>
                    <th className="text-right py-2 font-medium text-dashboard-secondaryText">Price</th>
                    <th className="text-right py-2 font-medium text-dashboard-secondaryText">Page Views</th>
                    <th className="text-right py-2 font-medium text-dashboard-secondaryText">MoM Change</th>
                    <th className="text-right py-2 font-medium text-dashboard-secondaryText">YoY Change</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-dashboard-border bg-dashboard-highlight">
                    <td className="py-2 font-medium text-dashboard-primary">Your Brand</td>
                    <td className="py-2 text-right font-medium">${benchmark.yourPrice}</td>
                    <td className="py-2 text-right">{benchmark.yourViews.toLocaleString()}</td>
                    <td className="py-2 text-right">
                      <div className={`inline-flex items-center ${benchmark.yourMonthChange > 0 ? 'text-green-600' : 'text-red-500'}`}>
                        {benchmark.yourMonthChange > 0 ? <TrendingUp size={14} className="mr-1" /> : <TrendingDown size={14} className="mr-1" />}
                        {benchmark.yourMonthChange > 0 ? '+' : ''}{benchmark.yourMonthChange}%
                      </div>
                    </td>
                    <td className="py-2 text-right">
                      <div className={`inline-flex items-center ${benchmark.yourYearChange > 0 ? 'text-green-600' : 'text-red-500'}`}>
                        {benchmark.yourYearChange > 0 ? <TrendingUp size={14} className="mr-1" /> : <TrendingDown size={14} className="mr-1" />}
                        {benchmark.yourYearChange > 0 ? '+' : ''}{benchmark.yourYearChange}%
                      </div>
                    </td>
                  </tr>
                  
                  {benchmark.competitors.map((competitor) => (
                    <tr key={competitor.name} className="border-b border-dashboard-border">
                      <td className="py-2">{competitor.name}</td>
                      <td className="py-2 text-right">${competitor.price}</td>
                      <td className="py-2 text-right">{competitor.views.toLocaleString()}</td>
                      <td className="py-2 text-right">
                        <div className={`inline-flex items-center ${competitor.monthChange > 0 ? 'text-green-600' : 'text-red-500'}`}>
                          {competitor.monthChange > 0 ? <TrendingUp size={14} className="mr-1" /> : <TrendingDown size={14} className="mr-1" />}
                          {competitor.monthChange > 0 ? '+' : ''}{competitor.monthChange}%
                        </div>
                      </td>
                      <td className="py-2 text-right">
                        <div className={`inline-flex items-center ${competitor.yearChange > 0 ? 'text-green-600' : 'text-red-500'}`}>
                          {competitor.yearChange > 0 ? <TrendingUp size={14} className="mr-1" /> : <TrendingDown size={14} className="mr-1" />}
                          {competitor.yearChange > 0 ? '+' : ''}{competitor.yearChange}%
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>

      {/* Price Range Distribution */}
      <div className="dashboard-card mb-6">
        <h3 className="text-lg font-medium text-dashboard-text mb-4">Price Range Distribution</h3>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[180px]">Competitor</TableHead>
                <TableHead>
                  <div className="flex flex-col">
                    <span>$0-50</span>
                    <span className="text-xs font-normal text-dashboard-secondaryText">Page Views / %</span>
                  </div>
                </TableHead>
                <TableHead>
                  <div className="flex flex-col">
                    <span>$50-100</span>
                    <span className="text-xs font-normal text-dashboard-secondaryText">Page Views / %</span>
                  </div>
                </TableHead>
                <TableHead>
                  <div className="flex flex-col">
                    <span>$100+</span>
                    <span className="text-xs font-normal text-dashboard-secondaryText">Page Views / %</span>
                  </div>
                </TableHead>
                <TableHead>Total Page Views</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {priceRangeData.map((competitor) => (
                <TableRow 
                  key={competitor.name}
                  className={competitor.name === 'Your Brand' ? 'bg-dashboard-highlight' : ''}
                >
                  <TableCell className="font-medium">
                    {competitor.name === 'Your Brand' ? (
                      <span className="text-dashboard-primary">{competitor.name}</span>
                    ) : (
                      competitor.name
                    )}
                  </TableCell>
                  {competitor.ranges.map((range, index) => (
                    <TableCell key={index}>
                      <div className="flex flex-col">
                        <span>{(range.views / 1000).toFixed(0)}k</span>
                        <div className="flex items-center mt-1">
                          <div 
                            className={cn(
                              "h-2 rounded-full", 
                              competitor.name === 'Your Brand'
                                ? "bg-dashboard-primary"
                                : "bg-dashboard-secondary"
                            )}
                            style={{ width: `${range.percentage}%` }}
                          />
                          <span className="text-xs ml-2">{range.percentage}%</span>
                        </div>
                      </div>
                    </TableCell>
                  ))}
                  <TableCell>{(competitor.totalViews / 1000).toFixed(0)}k</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Pricing Benchmark Chart */}
      <div className="mb-6">
        <BarChart title="Pricing Benchmark" />
      </div>

      {/* Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {insightData.map((insight, index) => (
          <InsightCard
            key={index}
            title={insight.title}
            description={insight.description}
            type={insight.type as "opportunity" | "threat" | "positive" | "recommendation"}
          />
        ))}
      </div>
      
      {/* Subfooter */}
      <div className="text-xs text-center text-dashboard-secondaryText mt-6 pt-4 border-t border-dashboard-border">
        <p>Source: SimilarWeb • Metrics: Pricing, Page Views, User Engagement</p>
      </div>
    </div>
  );
};

export default PricingView;
