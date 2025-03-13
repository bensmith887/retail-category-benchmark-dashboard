
import React from 'react';
import { Smile, MessageCircle, TrendingUp, BarChart2, Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import MetricsCard from './MetricsCard';
import { cn } from '@/lib/utils';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from './ui/chart';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Cell, Legend, LineChart, Line, Tooltip } from 'recharts';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import InsightCard from './InsightCard';

// Sample sentiment data
const sentimentData = {
  score: 7.8,
  categoryAverage: 6.9,
  positivePercentage: 68,
  neutralPercentage: 21,
  negativePercentage: 11,
  totalReviews: 2842,
  avgRating: 4.2
};

// Sample rating distribution data
const ratingDistribution = [
  { rating: '5 Stars', count: 1450, percentage: 51 },
  { rating: '4 Stars', count: 782, percentage: 28 },
  { rating: '3 Stars', count: 320, percentage: 11 },
  { rating: '2 Stars', count: 190, percentage: 7 },
  { rating: '1 Star', count: 100, percentage: 3 }
];

// Sample sentiment trend data
const sentimentTrendData = [
  { month: 'Jan', sentiment: 6.8, categoryAvg: 6.5 },
  { month: 'Feb', sentiment: 7.0, categoryAvg: 6.6 },
  { month: 'Mar', sentiment: 7.1, categoryAvg: 6.7 },
  { month: 'Apr', sentiment: 7.3, categoryAvg: 6.7 },
  { month: 'May', sentiment: 7.2, categoryAvg: 6.8 },
  { month: 'Jun', sentiment: 7.5, categoryAvg: 6.8 },
  { month: 'Jul', sentiment: 7.4, categoryAvg: 6.9 },
  { month: 'Aug', sentiment: 7.6, categoryAvg: 6.9 },
  { month: 'Sep', sentiment: 7.8, categoryAvg: 6.9 }
];

// Sample competitor sentiment comparison
const competitorSentiment = [
  { name: 'Your Brand', score: 7.8 },
  { name: 'Competitor A', score: 6.9 },
  { name: 'Competitor B', score: 7.2 },
  { name: 'Competitor C', score: 6.5 },
  { name: 'Competitor D', score: 7.1 }
];

// Sample keyword data
const keywordData = [
  { word: 'Quality', size: 100, sentiment: 'positive' },
  { word: 'Value', size: 85, sentiment: 'positive' },
  { word: 'Design', size: 75, sentiment: 'positive' },
  { word: 'Service', size: 70, sentiment: 'positive' },
  { word: 'Shipping', size: 65, sentiment: 'negative' },
  { word: 'Price', size: 60, sentiment: 'neutral' },
  { word: 'Support', size: 58, sentiment: 'positive' },
  { word: 'Packaging', size: 53, sentiment: 'positive' },
  { word: 'Delivery', size: 52, sentiment: 'negative' },
  { word: 'Material', size: 48, sentiment: 'positive' },
  { word: 'Features', size: 46, sentiment: 'positive' },
  { word: 'Durability', size: 45, sentiment: 'positive' },
  { word: 'Warranty', size: 42, sentiment: 'neutral' },
  { word: 'Returns', size: 38, sentiment: 'negative' },
  { word: 'Comfort', size: 36, sentiment: 'positive' }
];

const getBarColor = (rating: string) => {
  switch (rating) {
    case '5 Stars':
      return '#22c55e';
    case '4 Stars':
      return '#84cc16';
    case '3 Stars':
      return '#facc15';
    case '2 Stars':
      return '#f97316';
    case '1 Star':
      return '#ef4444';
    default:
      return '#6892e6';
  }
};

const CustomerSentimentView = () => {
  return (
    <div className="animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6 stagger-animate">
        <MetricsCard
          label="Overall Sentiment Score"
          value={sentimentData.score.toFixed(1)}
          change={`+${(sentimentData.score - sentimentData.categoryAverage).toFixed(1)}`}
          isPositive={sentimentData.score > sentimentData.categoryAverage}
          icon={<Smile className="text-dashboard-primary" size={20} />}
          secondaryLabel="vs Category Average"
          secondaryChange={sentimentData.categoryAverage.toFixed(1)}
          isSecondaryPositive={true}
        />
        <MetricsCard
          label="Average Rating"
          value={sentimentData.avgRating.toFixed(1)}
          change={`${sentimentData.positivePercentage}% Positive`}
          isPositive={true}
          icon={<BarChart2 className="text-dashboard-primary" size={20} />}
        />
        <MetricsCard
          label="Total Reviews"
          value={sentimentData.totalReviews.toLocaleString()}
          change="+18% YoY"
          isPositive={true}
          icon={<MessageCircle className="text-dashboard-primary" size={20} />}
        />
        <MetricsCard
          label="Sentiment Trend"
          value="Improving"
          change="+0.3 Last Quarter"
          isPositive={true}
          icon={<TrendingUp className="text-dashboard-primary" size={20} />}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Rating Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-medium text-dashboard-text">
              Rating Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={ratingDistribution} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                  <XAxis type="number" domain={[0, 100]} tickFormatter={(value) => `${value}%`} />
                  <YAxis type="category" dataKey="rating" width={80} />
                  <Tooltip content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-white p-2 border rounded shadow-md">
                          <p className="font-medium">{payload[0].payload.rating}</p>
                          <p>Count: {payload[0].payload.count.toLocaleString()}</p>
                          <p>Percentage: {payload[0].payload.percentage}%</p>
                        </div>
                      );
                    }
                    return null;
                  }} />
                  <Bar dataKey="percentage" radius={[0, 4, 4, 0]}>
                    {ratingDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={getBarColor(entry.rating)} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Keyword Cloud */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-medium text-dashboard-text">
              Review Keyword Cloud
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80 flex items-center justify-center p-4">
              <div className="w-full h-full flex flex-wrap items-center justify-center">
                {keywordData.map((word, index) => {
                  // Calculate font size based on the word's size property
                  const fontSize = 12 + (word.size / 20);
                  
                  // Determine color based on sentiment
                  let color = '#6892e6'; // neutral
                  if (word.sentiment === 'positive') color = '#22c55e';
                  if (word.sentiment === 'negative') color = '#ef4444';
                  
                  return (
                    <div 
                      key={index}
                      className="m-2 inline-block transform transition-transform hover:scale-110"
                      style={{
                        fontSize: `${fontSize}px`,
                        color: color,
                        fontWeight: word.size > 70 ? 'bold' : 'normal',
                      }}
                    >
                      {word.word}
                    </div>
                  );
                })}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Sentiment Trends */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-medium text-dashboard-text">
              Sentiment Trends Over Time
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={sentimentTrendData} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="month" />
                  <YAxis domain={[6, 8]} ticks={[6, 6.5, 7, 7.5, 8]} />
                  <Tooltip
                    content={({ active, payload, label }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="bg-white p-2 border rounded shadow-md">
                            <p className="font-medium">{label}</p>
                            <p className="text-dashboard-primary">Your Score: {payload[0].value}</p>
                            <p className="text-dashboard-secondaryText">Category Avg: {payload[1].value}</p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="sentiment" 
                    name="Your Sentiment" 
                    stroke="#6892e6" 
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="categoryAvg" 
                    name="Category Average"
                    stroke="#94a3b8" 
                    strokeWidth={2} 
                    strokeDasharray="5 5"
                    dot={{ r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Competitor Sentiment Comparison */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-medium text-dashboard-text">
              Competitor Sentiment Comparison
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={competitorSentiment} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" />
                  <YAxis domain={[6, 8]} ticks={[6, 6.5, 7, 7.5, 8]} />
                  <Tooltip
                    content={({ active, payload, label }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="bg-white p-2 border rounded shadow-md">
                            <p className="font-medium">{label}</p>
                            <p>Score: {payload[0].value}</p>
                            <p>{label === 'Your Brand' ? 'Your brand leads by ' + 
                              (payload[0].value - 6.9).toFixed(1) + ' points' : ''}</p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Bar dataKey="score" radius={[4, 4, 0, 0]}>
                    {competitorSentiment.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={entry.name === 'Your Brand' ? '#6892e6' : '#94a3b8'} 
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="dashboard-card mb-6">
        <h3 className="text-lg font-medium text-dashboard-text mb-4">Reviews by Sentiment</h3>
        <div className="overflow-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[180px]">Customer</TableHead>
                <TableHead>Review Content</TableHead>
                <TableHead className="w-[120px]">Rating</TableHead>
                <TableHead className="w-[120px]">Sentiment</TableHead>
                <TableHead className="w-[120px]">Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[
                { customer: 'Sarah J.', content: 'Excellent quality and fast shipping. The product exceeded my expectations in every way.', rating: 5, sentiment: 'Positive', date: '2023-09-12' },
                { customer: 'Michael T.', content: 'Good product but shipping took longer than expected. Otherwise satisfied with my purchase.', rating: 4, sentiment: 'Neutral', date: '2023-09-10' },
                { customer: 'Jennifer L.', content: 'The design is beautiful and exactly as pictured. Very happy with this purchase!', rating: 5, sentiment: 'Positive', date: '2023-09-08' },
                { customer: 'Robert K.', content: 'Product arrived damaged. Customer service was helpful but it was a hassle to return.', rating: 2, sentiment: 'Negative', date: '2023-09-05' },
                { customer: 'Lisa M.', content: 'Average quality for the price. Not bad but not great either.', rating: 3, sentiment: 'Neutral', date: '2023-09-03' },
              ].map((review, idx) => (
                <TableRow key={idx}>
                  <TableCell className="font-medium">{review.customer}</TableCell>
                  <TableCell className="max-w-[400px]">{review.content}</TableCell>
                  <TableCell>
                    <div className="flex">
                      {Array(5).fill(0).map((_, i) => (
                        <svg 
                          key={i} 
                          className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`} 
                          fill="currentColor" 
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <span 
                      className={cn(
                        "px-2 py-1 rounded-full text-xs font-medium",
                        review.sentiment === 'Positive' ? 'bg-green-100 text-green-800' :
                        review.sentiment === 'Negative' ? 'bg-red-100 text-red-800' :
                        'bg-blue-100 text-blue-800'
                      )}
                    >
                      {review.sentiment}
                    </span>
                  </TableCell>
                  <TableCell>{review.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 stagger-animate">
        <InsightCard
          title="Positive Trend"
          description="Sentiment score has improved by 0.7 points over the past 6 months, outpacing category growth."
          type="positive"
        />
        <InsightCard
          title="Key Improvement Area"
          description="'Shipping' and 'Delivery' are the most common negative keywords. Addressing these could improve overall sentiment."
          type="opportunity"
        />
        <InsightCard
          title="Competitive Advantage"
          description="Your brand leads competitors in positive sentiment related to 'Quality' and 'Design' by a significant margin."
          type="positive"
        />
        <InsightCard
          title="Recommendation"
          description="Focus on improving the shipping experience to address the most common negative sentiment drivers."
          type="recommendation"
        />
      </div>
    </div>
  );
};

export default CustomerSentimentView;
