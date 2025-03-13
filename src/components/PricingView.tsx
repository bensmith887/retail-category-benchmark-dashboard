
import React from 'react';
import MetricsCard from '@/components/MetricsCard';
import { pricingData, competitorData } from '@/utils/data';
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from '@/components/ui/table';
import { DollarSign, TrendingUp, BarChart3, LineChart } from 'lucide-react';
import { cn } from '@/lib/utils';
import BarChart from './charts/BarChart';
import InsightCard from './InsightCard';

// Calculate average price for all competitors
const avgPrice = pricingData.reduce((sum, item) => sum + item.price, 0) / pricingData.length;
const yourPrice = pricingData.find(item => item.name === 'Your Brand')?.price || 0;
const priceDiff = ((yourPrice - avgPrice) / avgPrice * 100).toFixed(1);

// Generate price range analysis data
const priceRangeData = competitorData.map(competitor => {
  const totalPageViews = competitor.traffic;
  
  // Define price ranges and calculate the percentage of products in each range
  return {
    name: competitor.name,
    totalViews: totalPageViews,
    ranges: [
      {
        range: '0-50',
        percentage: competitor.name === 'Your Brand' || competitor.name === 'Competitor C' || competitor.name === 'Competitor D' ? 75 : 25,
        views: competitor.name === 'Your Brand' || competitor.name === 'Competitor C' || competitor.name === 'Competitor D' 
          ? Math.round(totalPageViews * 0.75) 
          : Math.round(totalPageViews * 0.25)
      },
      {
        range: '50-100',
        percentage: competitor.name === 'Competitor B' ? 70 : 20,
        views: competitor.name === 'Competitor B' 
          ? Math.round(totalPageViews * 0.7) 
          : Math.round(totalPageViews * 0.2)
      },
      {
        range: '100+',
        percentage: competitor.name === 'Competitor B' ? 5 : competitor.name === 'Competitor A' ? 55 : 5,
        views: competitor.name === 'Competitor B' 
          ? Math.round(totalPageViews * 0.05) 
          : competitor.name === 'Competitor A' 
            ? Math.round(totalPageViews * 0.55) 
            : Math.round(totalPageViews * 0.05)
      }
    ]
  };
});

const pricingInsights = [
  {
    title: 'Price Opportunity',
    description: 'Products in the $50-100 range have 23% higher margins than lower-priced items. Consider expanding this segment.',
    type: 'opportunity' as const
  },
  {
    title: 'Competitive Alert',
    description: 'Competitor B has increased prices by 8% in the premium segment without losing market share.',
    type: 'threat' as const
  },
  {
    title: 'Value Positioning',
    description: 'Your mid-range products are perceived as higher quality than competitors at the same price point.',
    type: 'positive' as const
  },
  {
    title: 'Pricing Strategy',
    description: 'Consider a 5-7% price increase for premium products based on brand loyalty and quality perception.',
    type: 'recommendation' as const
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
          className="flex-1"
          icon={<DollarSign className="text-dashboard-primary" />}
        />
        <MetricsCard
          label="Category Avg. Price"
          value={`$${avgPrice.toFixed(2)}`}
          change="+2.3%"
          isPositive={true}
          className="flex-1"
          icon={<BarChart3 className="text-dashboard-secondary" />}
        />
        <MetricsCard
          label="Price Elasticity"
          value="0.83"
          change="-0.05"
          isPositive={false}
          className="flex-1"
          icon={<LineChart className="text-dashboard-secondary" />}
        />
        <MetricsCard
          label="Price Competitiveness"
          value="Medium"
          secondaryLabel="Trend"
          secondaryChange="+5%"
          isSecondaryPositive={true}
          className="flex-1"
          icon={<TrendingUp className="text-dashboard-primary" />}
        />
      </div>

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

      <div className="mb-6">
        <BarChart title="Pricing Benchmark" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {pricingInsights.map((insight, index) => (
          <InsightCard
            key={index}
            title={insight.title}
            description={insight.description}
            type={insight.type}
          />
        ))}
      </div>
    </div>
  );
};

export default PricingView;
