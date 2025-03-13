
import React from 'react';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar, ScatterChart, Scatter, ZAxis, Cell } from 'recharts';
import MetricsCard from './MetricsCard';
import InsightCard from './InsightCard';
import { Target, TrendingDown, Zap, Calculator } from 'lucide-react';

// Sample data for elasticity charts
const elasticityTrendData = [
  { month: 'Jan', coefficient: -1.2, competitor1: -0.8, competitor2: -1.4, competitor3: -1.1 },
  { month: 'Feb', coefficient: -1.3, competitor1: -0.9, competitor2: -1.3, competitor3: -1.2 },
  { month: 'Mar', coefficient: -1.5, competitor1: -1.0, competitor2: -1.2, competitor3: -1.3 },
  { month: 'Apr', coefficient: -1.4, competitor1: -1.1, competitor2: -1.1, competitor3: -1.4 },
  { month: 'May', coefficient: -1.2, competitor1: -1.2, competitor2: -1.0, competitor3: -1.5 },
  { month: 'Jun', coefficient: -1.0, competitor1: -1.3, competitor2: -0.9, competitor3: -1.4 },
];

const correlationData = [
  { price: 10, conversionRate: 12, name: 'Product A', sales: 120 },
  { price: 15, conversionRate: 10, name: 'Product B', sales: 150 },
  { price: 20, conversionRate: 8, name: 'Product C', sales: 160 },
  { price: 25, conversionRate: 6, name: 'Product D', sales: 150 },
  { price: 30, conversionRate: 5, name: 'Product E', sales: 150 },
  { price: 35, conversionRate: 4, name: 'Product F', sales: 140 },
  { price: 40, conversionRate: 3, name: 'Product G', sales: 120 },
  { price: 45, conversionRate: 2, name: 'Product H', sales: 90 },
];

const categoryElasticityData = [
  { category: 'Electronics', elasticity: -1.5 },
  { category: 'Apparel', elasticity: -2.1 },
  { category: 'Home Goods', elasticity: -1.2 },
  { category: 'Beauty', elasticity: -0.8 },
  { category: 'Toys', elasticity: -1.7 },
];

const pricePositioningData = [
  { name: 'Your Brand', price: 25, marketShare: 15 },
  { name: 'Competitor A', price: 22, marketShare: 12 },
  { name: 'Competitor B', price: 30, marketShare: 18 },
  { name: 'Competitor C', price: 20, marketShare: 10 },
  { name: 'Competitor D', price: 28, marketShare: 14 },
  { name: 'Competitor E', price: 35, marketShare: 20 },
];

const simulationData = [
  { priceChange: -15, revenueImpact: 12, marketShareImpact: 4.2, profitImpact: -2 },
  { priceChange: -10, revenueImpact: 8, marketShareImpact: 2.8, profitImpact: 0 },
  { priceChange: -5, revenueImpact: 4, marketShareImpact: 1.4, profitImpact: 2 },
  { priceChange: 0, revenueImpact: 0, marketShareImpact: 0, profitImpact: 0 },
  { priceChange: 5, revenueImpact: -3, marketShareImpact: -1.2, profitImpact: 1 },
  { priceChange: 10, revenueImpact: -6, marketShareImpact: -2.3, profitImpact: -1 },
  { priceChange: 15, revenueImpact: -10, marketShareImpact: -3.5, profitImpact: -5 },
];

// Insights for Price Elasticity
const priceElasticityInsights = [
  {
    title: 'Price Opportunity',
    description: 'Electronics category shows elasticity of -1.5, suggesting room for 3-5% price increase with minimal impact.',
    type: 'opportunity' as const
  },
  {
    title: 'Competitive Threat',
    description: 'Competitor B is lowering prices in key product categories where elasticity is high (-2.1).',
    type: 'threat' as const
  },
  {
    title: 'Positive Indicator',
    description: 'Beauty products show low elasticity (-0.8), indicating strong brand loyalty and price insensitivity.',
    type: 'positive' as const
  },
  {
    title: 'Recommendation',
    description: 'Consider 5% price increases in Beauty category while keeping Apparel prices stable due to high elasticity.',
    type: 'recommendation' as const
  }
];

const PriceElasticityView: React.FC = () => {
  return (
    <div className="animate-fade-in">
      {/* Top Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <MetricsCard
          label="Avg. Elasticity"
          value="-1.2"
          change="-0.2"
          isPositive={false}
          secondaryLabel="YoY"
          secondaryChange="-0.3"
          isSecondaryPositive={false}
          icon={<TrendingDown className="text-dashboard-primary" size={20} />}
        />
        <MetricsCard
          label="Revenue Impact"
          value="+$15.2K"
          change="+2.8%"
          isPositive={true}
          secondaryLabel="YoY"
          secondaryChange="+5.4%"
          isSecondaryPositive={true}
          icon={<Calculator className="text-dashboard-secondary" size={20} />}
        />
        <MetricsCard
          label="Price Sensitivity"
          value="Medium"
          change="Decreasing"
          isPositive={true}
          secondaryLabel="vs. Industry"
          secondaryChange="Better"
          isSecondaryPositive={true}
          icon={<Target className="text-dashboard-primary" size={20} />}
        />
        <MetricsCard
          label="Optimization Score"
          value="72"
          change="+5"
          isPositive={true}
          secondaryLabel="YoY"
          secondaryChange="+12"
          isSecondaryPositive={true}
          icon={<Zap className="text-dashboard-secondary" size={20} />}
        />
      </div>

      {/* Price Sensitivity Analysis Section */}
      <div className="dashboard-card mb-6">
        <h3 className="text-lg font-medium text-dashboard-text mb-4">Price Sensitivity Analysis</h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Elasticity Trend Chart */}
          <div className="bg-white rounded-lg p-4 border border-dashboard-border">
            <h3 className="text-sm font-medium text-dashboard-secondaryText mb-2">Elasticity Coefficients Over Time</h3>
            <div style={{ height: "280px" }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={elasticityTrendData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f1f1" />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} />
                  <YAxis 
                    domain={[-2.5, 0]} 
                    tickFormatter={(value) => value.toFixed(1)} 
                    axisLine={false} 
                    tickLine={false} 
                  />
                  <Tooltip 
                    formatter={(value: number) => [`${value.toFixed(2)}`, 'Elasticity Coefficient']}
                    contentStyle={{ 
                      borderRadius: '6px', 
                      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
                      border: '1px solid #e5e7eb'
                    }}
                  />
                  <Legend />
                  <Line type="monotone" dataKey="coefficient" name="Your Brand" stroke="#5840bb" strokeWidth={2} dot={{ r: 4 }} />
                  <Line type="monotone" dataKey="competitor1" name="Competitor A" stroke="#6892e6" strokeWidth={1} dot={{ r: 3 }} />
                  <Line type="monotone" dataKey="competitor2" name="Competitor B" stroke="#fa9f42" strokeWidth={1} dot={{ r: 3 }} />
                  <Line type="monotone" dataKey="competitor3" name="Competitor C" stroke="#00bc8c" strokeWidth={1} dot={{ r: 3 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <p className="text-xs text-dashboard-secondaryText mt-2">
              More negative values indicate higher price sensitivity.
            </p>
          </div>

          {/* Correlation Chart */}
          <div className="bg-white rounded-lg p-4 border border-dashboard-border">
            <h3 className="text-sm font-medium text-dashboard-secondaryText mb-2">Price vs. Conversion Rate</h3>
            <div style={{ height: "280px" }}>
              <ResponsiveContainer width="100%" height="100%">
                <ScatterChart>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f1f1" />
                  <XAxis 
                    dataKey="price" 
                    name="Price" 
                    axisLine={false} 
                    tickLine={false}
                    label={{ value: 'Price ($)', position: 'insideBottom', offset: -5 }}
                  />
                  <YAxis 
                    dataKey="conversionRate" 
                    name="Conversion Rate" 
                    axisLine={false} 
                    tickLine={false}
                    label={{ value: 'Conversion Rate (%)', angle: -90, position: 'insideLeft' }}
                  />
                  <ZAxis dataKey="sales" range={[60, 400]} />
                  <Tooltip 
                    cursor={{ strokeDasharray: '3 3' }} 
                    formatter={(value: number, name: string) => [
                      `${name === 'Price' ? '$' + value : value + '%'}`, 
                      name
                    ]}
                    contentStyle={{ 
                      borderRadius: '6px', 
                      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
                      border: '1px solid #e5e7eb'
                    }}
                  />
                  <Scatter name="Products" data={correlationData} fill="#5840bb" />
                </ScatterChart>
              </ResponsiveContainer>
            </div>
            <p className="text-xs text-dashboard-secondaryText mt-2">
              Bubble size indicates sales volume. A steeper slope indicates higher elasticity.
            </p>
          </div>
        </div>

        {/* Category Elasticity Chart */}
        <div className="bg-white rounded-lg p-4 border border-dashboard-border">
          <h3 className="text-sm font-medium text-dashboard-secondaryText mb-2">Elasticity by Category</h3>
          <div style={{ height: "280px" }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryElasticityData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f1f1" />
                <XAxis dataKey="category" axisLine={false} tickLine={false} />
                <YAxis 
                  domain={[-2.5, 0]} 
                  tickFormatter={(value) => value.toFixed(1)} 
                  axisLine={false} 
                  tickLine={false}
                />
                <Tooltip 
                  formatter={(value: number) => [`${value.toFixed(2)}`, 'Elasticity Coefficient']}
                  contentStyle={{ 
                    borderRadius: '6px', 
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
                    border: '1px solid #e5e7eb'
                  }}
                />
                <Bar dataKey="elasticity" name="Elasticity Coefficient" radius={[4, 4, 0, 0]}>
                  {categoryElasticityData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.elasticity < -1.5 ? '#ef4444' : '#5840bb'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="text-xs text-dashboard-secondaryText mt-2">
            Categories with elasticity below -1.5 (red) are highly sensitive to price changes.
          </p>
        </div>
      </div>

      {/* Optimal Price Points Section */}
      <div className="dashboard-card mb-6">
        <h3 className="text-lg font-medium text-dashboard-text mb-4">Optimal Price Points</h3>
        
        {/* Price Positioning Chart */}
        <div className="bg-white rounded-lg p-4 border border-dashboard-border mb-6">
          <h3 className="text-sm font-medium text-dashboard-secondaryText mb-2">Price Positioning Map</h3>
          <div style={{ height: "280px" }}>
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f1f1" />
                <XAxis 
                  dataKey="price" 
                  name="Price" 
                  axisLine={false} 
                  tickLine={false}
                  label={{ value: 'Price ($)', position: 'insideBottom', offset: -5 }}
                />
                <YAxis 
                  dataKey="marketShare" 
                  name="Market Share" 
                  axisLine={false} 
                  tickLine={false}
                  label={{ value: 'Market Share (%)', angle: -90, position: 'insideLeft' }}
                />
                <Tooltip 
                  cursor={{ strokeDasharray: '3 3' }} 
                  formatter={(value: number, name: string) => [
                    `${name === 'Price' ? '$' + value : value + '%'}`, 
                    name
                  ]}
                  contentStyle={{ 
                    borderRadius: '6px', 
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
                    border: '1px solid #e5e7eb'
                  }}
                />
                <Scatter name="Companies" data={pricePositioningData}>
                  {pricePositioningData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.name === 'Your Brand' ? '#5840bb' : '#94a3b8'} />
                  ))}
                </Scatter>
              </ScatterChart>
            </ResponsiveContainer>
          </div>
          <p className="text-xs text-dashboard-secondaryText mt-2">
            Shows your price positioning relative to competitors. Your brand is highlighted in purple.
          </p>
        </div>

        {/* Revenue Optimization Curve */}
        <div className="bg-white rounded-lg p-4 border border-dashboard-border">
          <h3 className="text-sm font-medium text-dashboard-secondaryText mb-2">Price Change Impact Simulation</h3>
          <div style={{ height: "280px" }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={simulationData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f1f1" />
                <XAxis 
                  dataKey="priceChange" 
                  label={{ value: 'Price Change (%)', position: 'insideBottom', offset: -5 }} 
                  axisLine={false} 
                  tickLine={false}
                />
                <YAxis 
                  domain={[-15, 15]} 
                  label={{ value: 'Impact (%)', angle: -90, position: 'insideLeft' }} 
                  axisLine={false} 
                  tickLine={false}
                />
                <Tooltip 
                  formatter={(value: number) => [`${value}%`, undefined]}
                  contentStyle={{ 
                    borderRadius: '6px', 
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
                    border: '1px solid #e5e7eb'
                  }}
                />
                <Legend />
                <Line type="monotone" dataKey="revenueImpact" name="Revenue Impact" stroke="#3b82f6" strokeWidth={2} dot={{ r: 4 }} />
                <Line type="monotone" dataKey="marketShareImpact" name="Market Share Impact" stroke="#10b981" strokeWidth={1} dot={{ r: 3 }} />
                <Line type="monotone" dataKey="profitImpact" name="Profit Impact" stroke="#f59e0b" strokeWidth={1} dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <p className="text-xs text-dashboard-secondaryText mt-2">
            Simulates the impact of price changes on key metrics. Optimal price point maximizes profit.
          </p>
        </div>
      </div>
      
      {/* Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {priceElasticityInsights.map((insight, index) => (
          <InsightCard
            key={index}
            title={insight.title}
            description={insight.description}
            type={insight.type}
          />
        ))}
      </div>
      
      {/* Subfooter */}
      <div className="text-xs text-center text-dashboard-secondaryText mt-6 pt-4 border-t border-dashboard-border">
        <p>Source: SimilarWeb • Metrics: Price Elasticity, Conversion Rate, Revenue Impact</p>
      </div>
    </div>
  );
};

export default PriceElasticityView;
