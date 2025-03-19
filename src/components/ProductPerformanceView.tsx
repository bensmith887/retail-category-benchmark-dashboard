
import React from 'react';
import { ArrowDown, ArrowUp, Package } from 'lucide-react';
import { productPerformanceData, insightData } from '@/utils/data';
import { cn } from '@/lib/utils';
import MetricsCard from './MetricsCard';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import InsightCard from './InsightCard';

const ProductPerformanceView = () => {
  // Calculate total page views
  const totalPageViews = productPerformanceData.reduce((sum, product) => sum + product.pageViews, 0);
  
  // Calculate average month and year changes
  const avgMonthChange = productPerformanceData.reduce((sum, product) => sum + product.monthChange, 0) / productPerformanceData.length;
  const avgYearChange = productPerformanceData.reduce((sum, product) => sum + product.yearChange, 0) / productPerformanceData.length;
  
  // Get top categories
  const categoryCounts = productPerformanceData.reduce((acc, product) => {
    acc[product.category] = (acc[product.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  const topCategories = Object.entries(categoryCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([category]) => category)
    .join(', ');
  
  // Fix the arithmetic operations by ensuring they're done with numbers
  const monthChangeComparison = avgMonthChange - 2.5;
  const yearChangeComparison = avgYearChange - 15;
  
  return (
    <div className="animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6 stagger-animate">
        <MetricsCard
          label="Total Product Page Views"
          value={`${(totalPageViews / 1000).toFixed(1)}K`}
          change={`${avgMonthChange.toFixed(1)}%`}
          isPositive={avgMonthChange > 0}
          secondaryLabel="YoY"
          secondaryChange={`${avgYearChange.toFixed(1)}%`}
          isSecondaryPositive={avgYearChange > 0}
          icon={<Package className="text-dashboard-primary" size={20} />}
        />
        <MetricsCard
          label="Avg Monthly Growth"
          value={`${avgMonthChange.toFixed(1)}%`}
          change={`${monthChangeComparison.toFixed(1)}%`}
          isPositive={avgMonthChange > 2.5}
          secondaryLabel="YoY"
          secondaryChange="+8.5%"
          isSecondaryPositive={true}
        />
        <MetricsCard
          label="Avg Yearly Growth"
          value={`${avgYearChange.toFixed(1)}%`}
          change={`${yearChangeComparison.toFixed(1)}%`}
          isPositive={avgYearChange > 15}
          secondaryLabel="vs Target"
          secondaryChange="+3.5%"
          isSecondaryPositive={true}
        />
        <MetricsCard
          label="Top Categories"
          value={topCategories}
          change="MoM: +4.8%"
          isPositive={true}
          secondaryLabel="YoY"
          secondaryChange="+12.3%"
          isSecondaryPositive={true}
        />
      </div>
      
      <div className="mb-6">
        <div className="dashboard-card">
          <h3 className="text-lg font-medium text-dashboard-text mb-4">Top 20 Products by Page Views</h3>
          <div className="overflow-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]">#</TableHead>
                  <TableHead>Product Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead className="text-right">Page Views</TableHead>
                  <TableHead className="text-right">MoM Change</TableHead>
                  <TableHead className="text-right">YoY Change</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {productPerformanceData.map((product, index) => (
                  <TableRow key={product.id}>
                    <TableCell className="font-medium">{index + 1}</TableCell>
                    <TableCell className="font-medium">{product.name}</TableCell>
                    <TableCell>{product.category}</TableCell>
                    <TableCell className="max-w-[300px] truncate" title={product.description}>
                      {product.description}
                    </TableCell>
                    <TableCell className="text-right">{product.pageViews.toLocaleString()}</TableCell>
                    <TableCell className="text-right">
                      <div className={cn("flex items-center justify-end", 
                        product.monthChange > 0 ? "text-green-600" : "text-red-600")}>
                        {product.monthChange > 0 ? (
                          <ArrowUp size={14} className="mr-1" />
                        ) : (
                          <ArrowDown size={14} className="mr-1" />
                        )}
                        {Math.abs(product.monthChange).toFixed(1)}%
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className={cn("flex items-center justify-end", 
                        product.yearChange > 0 ? "text-green-600" : "text-red-600")}>
                        {product.yearChange > 0 ? (
                          <ArrowUp size={14} className="mr-1" />
                        ) : (
                          <ArrowDown size={14} className="mr-1" />
                        )}
                        {Math.abs(product.yearChange).toFixed(1)}%
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
      
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
        <p>Source: SimilarWeb • Metrics: Product Page Views, User Engagement, Category Performance</p>
      </div>
    </div>
  );
};

export default ProductPerformanceView;
