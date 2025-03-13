
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6 stagger-animate">
        {marketShareTopCompetitors.map((competitor, index) => (
          <MetricsCard
            key={competitor.name}
            label={index === 0 ? "My Share" : competitor.name}
            value={`${competitor.share}%`}
            change={`${competitor.monthChange > 0 ? '+' : ''}${competitor.monthChange}%`}
            isPositive={competitor.monthChange > 0}
            secondaryLabel="YoY"
            secondaryChange={`${competitor.yearChange > 0 ? '+' : ''}${competitor.yearChange}%`}
            isSecondaryPositive={competitor.yearChange > 0}
          />
        ))}
      </div>

      {/* Category Market Share Table */}
      <div className="dashboard-card mb-6 overflow-hidden">
        <h3 className="text-lg font-medium text-dashboard-text mb-4">Top Domains by Category Market Share</h3>
        
        <div className="overflow-auto max-h-[600px]">
          <Table>
            <TableHeader className="bg-gray-50 sticky top-0">
              <TableRow>
                <TableHead className="w-[200px]">Category</TableHead>
                <TableHead>Domain</TableHead>
                <TableHead className="text-right">Market Share</TableHead>
                <TableHead className="text-right">MoM Change</TableHead>
                <TableHead className="text-right">YoY Change</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categoryMarketShareData.map((category) => (
                <React.Fragment key={category.category}>
                  {category.domains.map((domain, index) => (
                    <TableRow key={`${category.category}-${domain.name}`} className={index === 0 ? "bg-dashboard-highlight" : ""}>
                      {index === 0 ? (
                        <TableCell className="font-medium border-r border-dashboard-border" rowSpan={5}>
                          {category.category}
                        </TableCell>
                      ) : null}
                      <TableCell className="font-medium">{domain.name}</TableCell>
                      <TableCell className="text-right">{domain.share}%</TableCell>
                      <TableCell className="text-right">
                        <div className={`inline-flex items-center ${domain.monthChange > 0 ? 'text-green-600' : 'text-red-500'}`}>
                          {domain.monthChange > 0 ? <TrendingUp size={14} className="mr-1" /> : <TrendingDown size={14} className="mr-1" />}
                          {domain.monthChange > 0 ? '+' : ''}{domain.monthChange}%
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className={`inline-flex items-center ${domain.yearChange > 0 ? 'text-green-600' : 'text-red-500'}`}>
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

      {/* Market Share Trend Chart */}
      <div className="dashboard-card mb-6">
        <h3 className="text-lg font-medium text-dashboard-text mb-4">Market Share Trend (12 Months)</h3>
        
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
                name="Your Brand"
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 stagger-animate" style={{ animationDelay: "0.6s" }}>
        {insightData.map((insight, index) => (
          <InsightCard
            key={index}
            title={insight.title}
            description={insight.description}
            type={insight.type as "opportunity" | "threat" | "positive" | "recommendation"}
          />
        ))}
      </div>
    </div>
  );
};

export default MarketShareView;
