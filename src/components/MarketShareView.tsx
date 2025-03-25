
import React from 'react';
import { 
  marketShareTopCompetitors, 
  categoryMarketShareData, 
  marketShareTrendData,
  insightData
} from '@/utils/data';
import MetricsCard from './MetricsCard';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';
import InsightCard from './InsightCard';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from './ui/table';
import { TrendingUp, TrendingDown } from 'lucide-react';

const MarketShareView: React.FC = () => {
  // Get your brand data
  const yourBrand = marketShareTopCompetitors[0];
  
  return (
    <div className="animate-fade-in">
      {/* Top Summary Widgets */}
      <div className="mb-6">
        <div className="dashboard-card">
          <h3 className="text-lg font-medium text-dashboard-text mb-4">Traffic Overview</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Your Share */}
            <div className="col-span-1 md:col-span-2">
              <MetricsCard
                label="My Traffic Share"
                value={`${yourBrand.share}%`}
                change={`${yourBrand.monthChange > 0 ? '+' : ''}${yourBrand.monthChange}%`}
                isPositive={yourBrand.monthChange > 0}
                secondaryChange={`${yourBrand.yearChange > 0 ? '+' : ''}${yourBrand.yearChange}%`}
                isSecondaryPositive={yourBrand.yearChange > 0}
              />
            </div>
            
            {/* Industry Change */}
            <div className="col-span-1 md:col-span-2">
              <MetricsCard
                label="Industry Traffic Change"
                value="Monthly"
                change="+1.8%"
                isPositive={true}
                secondaryChange="+5.2%"
                isSecondaryPositive={true}
              />
            </div>
          </div>
          
          {/* Competitor Comparison - Small Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            {marketShareTopCompetitors.slice(1).map((competitor) => (
              <div key={competitor.name} className="bg-white p-3 rounded-lg border border-dashboard-border shadow-sm">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-sm font-medium text-dashboard-text">{competitor.name}</h4>
                    <p className="text-lg font-bold">{competitor.share}%</p>
                  </div>
                  <div className="flex flex-col items-end">
                    <div className={`text-xs flex items-center ${competitor.monthChange > 0 ? 'text-green-600' : 'text-red-500'}`}>
                      <span className="text-xs font-medium mr-1">MoM:</span>
                      {competitor.monthChange > 0 ? <TrendingUp size={12} className="mr-1" /> : <TrendingDown size={12} className="mr-1" />}
                      <span>{competitor.monthChange > 0 ? '+' : ''}{competitor.monthChange}%</span>
                    </div>
                    <div className={`text-xs flex items-center mt-1 ${competitor.yearChange > 0 ? 'text-green-600' : 'text-red-500'}`}>
                      <span className="text-xs font-medium mr-1">YoY:</span>
                      {competitor.yearChange > 0 ? <TrendingUp size={12} className="mr-1" /> : <TrendingDown size={12} className="mr-1" />}
                      <span>{competitor.yearChange > 0 ? '+' : ''}{competitor.yearChange}%</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Category Traffic Share Table - IMPROVED FORMATTING */}
      <div className="dashboard-card mb-6 overflow-hidden">
        <h3 className="text-lg font-medium text-dashboard-text mb-4">Top Domains by Category Traffic Share</h3>
        
        <div className="overflow-auto max-h-[600px]">
          <Table>
            <TableHeader className="bg-gray-50 sticky top-0">
              <TableRow>
                <TableHead className="w-[180px] bg-dashboard-primary text-white font-semibold">Category</TableHead>
                <TableHead className="bg-dashboard-primary text-white font-semibold">Domain</TableHead>
                <TableHead className="text-right bg-dashboard-primary text-white font-semibold">Traffic Share</TableHead>
                <TableHead className="text-right bg-dashboard-primary text-white font-semibold">MoM Change</TableHead>
                <TableHead className="text-right bg-dashboard-primary text-white font-semibold">YoY Change</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categoryMarketShareData.map((category, categoryIndex) => (
                <React.Fragment key={category.category}>
                  {category.domains.map((domain, index) => (
                    <TableRow 
                      key={`${category.category}-${domain.name}`} 
                      className={`
                        ${index === 0 ? "bg-soft-purple bg-opacity-20" : categoryIndex % 2 === 0 ? "bg-gray-50" : ""}
                        hover:bg-dashboard-highlight hover:bg-opacity-10 transition-colors
                      `}
                    >
                      {index === 0 ? (
                        <TableCell 
                          className="font-medium border-r border-dashboard-border bg-gray-100 text-dashboard-primary" 
                          rowSpan={category.domains.length}
                          style={{ position: 'relative' }}
                        >
                          <div className="py-2 font-semibold">{category.category}</div>
                        </TableCell>
                      ) : null}
                      <TableCell className={`font-medium ${index === 0 ? "text-dashboard-primary" : ""}`}>
                        <div className="flex items-center">
                          {domain.name}
                          {index === 0 && (
                            <span className="ml-2 inline-block px-2 py-0.5 bg-dashboard-primary text-white text-xs rounded-full">
                              Leader
                            </span>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className={`text-right ${index === 0 ? "font-bold text-dashboard-primary" : "font-semibold"}`}>
                        <div className="px-3 py-1 rounded inline-block min-w-[70px]">
                          {domain.share}%
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className={`inline-flex items-center justify-center px-3 py-1 rounded 
                          ${domain.monthChange > 0 ? 'text-green-700 bg-green-50' : 'text-red-700 bg-red-50'} 
                          min-w-[90px] font-medium`
                        }>
                          {domain.monthChange > 0 ? <TrendingUp size={14} className="mr-1" /> : <TrendingDown size={14} className="mr-1" />}
                          {domain.monthChange > 0 ? '+' : ''}{domain.monthChange}%
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className={`inline-flex items-center justify-center px-3 py-1 rounded 
                          ${domain.yearChange > 0 ? 'text-green-700 bg-green-50' : 'text-red-700 bg-red-50'} 
                          min-w-[90px] font-medium`
                        }>
                          {domain.yearChange > 0 ? <TrendingUp size={14} className="mr-1" /> : <TrendingDown size={14} className="mr-1" />}
                          {domain.yearChange > 0 ? '+' : ''}{domain.yearChange}%
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </React.Fragment>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Traffic Share Trend Chart */}
      <div className="dashboard-card mb-6">
        <h3 className="text-lg font-medium text-dashboard-text mb-4">Traffic Share Trend (12 Months)</h3>
        
        <div style={{ height: "400px" }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={marketShareTrendData}
              margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f1f1" />
              <XAxis dataKey="month" axisLine={false} tickLine={false} />
              <YAxis
                domain={[0, 30]}
                tickFormatter={(value) => `${value}%`}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                formatter={(value) => [`${value}%`, undefined]}
                contentStyle={{
                  borderRadius: '6px',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
                  border: '1px solid #e5e7eb'
                }}
              />
              <Legend verticalAlign="top" height={36} />
              <Line
                type="monotone"
                dataKey="yourShare"
                stroke="#5840bb"
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
                name="Your Retail Brand"
              />
              <Line
                type="monotone"
                dataKey="competitorAShare"
                stroke="#6892e6"
                strokeWidth={2}
                dot={{ r: 4 }}
                name="Competitor A"
              />
              <Line
                type="monotone"
                dataKey="competitorBShare"
                stroke="#fa9f42"
                strokeWidth={2}
                dot={{ r: 4 }}
                name="Competitor B"
              />
              <Line
                type="monotone"
                dataKey="competitorCShare"
                stroke="#00bc8c"
                strokeWidth={2}
                dot={{ r: 4 }}
                name="Competitor C"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6" style={{ animationDelay: "0.6s" }}>
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
        <p>Source: SimilarWeb • Metrics: Traffic Share, Page Views, User Engagement</p>
      </div>
    </div>
  );
};

export default MarketShareView;
