
import React from 'react';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar, ScatterChart, Scatter, ZAxis, Cell } from 'recharts';

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

const PriceElasticityView: React.FC = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-dashboard-text mb-4">Price Elasticity Analysis</h1>
        <p className="text-dashboard-secondaryText mb-6">
          Understand how price changes impact demand, revenue, and market share.
        </p>
      </div>

      {/* Price Sensitivity Analysis Section */}
      <div className="bg-white rounded-lg shadow-sm border border-dashboard-border p-6">
        <h2 className="text-xl font-semibold text-dashboard-text mb-4">Price Sensitivity Analysis</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Elasticity Trend Chart */}
          <div className="bg-white rounded-lg p-4 border border-dashboard-border">
            <h3 className="text-sm font-medium text-dashboard-secondaryText mb-2">Elasticity Coefficients Over Time</h3>
            <div className="h-64">
              <ChartContainer
                config={{
                  yourBrand: { label: "Your Brand", color: "#8B5CF6" },
                  competitor1: { label: "Competitor A", color: "#3B82F6" },
                  competitor2: { label: "Competitor B", color: "#10B981" },
                  competitor3: { label: "Competitor C", color: "#F59E0B" },
                }}
              >
                <LineChart data={elasticityTrendData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis domain={[-2, 0]} tickFormatter={(value) => value.toFixed(1)} />
                  <Tooltip content={<ChartTooltipContent />} />
                  <Legend />
                  <Line type="monotone" dataKey="coefficient" stroke="var(--color-yourBrand)" name="Your Brand" strokeWidth={2} />
                  <Line type="monotone" dataKey="competitor1" stroke="var(--color-competitor1)" name="Competitor A" />
                  <Line type="monotone" dataKey="competitor2" stroke="var(--color-competitor2)" name="Competitor B" />
                  <Line type="monotone" dataKey="competitor3" stroke="var(--color-competitor3)" name="Competitor C" />
                </LineChart>
              </ChartContainer>
            </div>
            <p className="text-xs text-dashboard-secondaryText mt-2">
              Note: More negative values indicate higher price sensitivity.
            </p>
          </div>

          {/* Correlation Chart */}
          <div className="bg-white rounded-lg p-4 border border-dashboard-border">
            <h3 className="text-sm font-medium text-dashboard-secondaryText mb-2">Price vs. Conversion Rate</h3>
            <div className="h-64">
              <ChartContainer
                config={{
                  correlation: { label: "Products", color: "#8B5CF6" },
                }}
              >
                <ScatterChart>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="price" 
                    name="Price" 
                    label={{ value: 'Price ($)', position: 'insideBottom', offset: -5 }}
                  />
                  <YAxis 
                    dataKey="conversionRate" 
                    name="Conversion Rate" 
                    label={{ value: 'Conversion Rate (%)', angle: -90, position: 'insideLeft' }}
                  />
                  <ZAxis dataKey="sales" range={[60, 400]} />
                  <Tooltip cursor={{ strokeDasharray: '3 3' }} content={<ChartTooltipContent />} />
                  <Scatter name="Products" data={correlationData} fill="var(--color-correlation)" />
                </ScatterChart>
              </ChartContainer>
            </div>
            <p className="text-xs text-dashboard-secondaryText mt-2">
              Bubble size indicates sales volume. A steeper slope indicates higher elasticity.
            </p>
          </div>
        </div>

        {/* Category Elasticity Chart */}
        <div className="bg-white rounded-lg p-4 border border-dashboard-border">
          <h3 className="text-sm font-medium text-dashboard-secondaryText mb-2">Elasticity by Category</h3>
          <div className="h-64">
            <ChartContainer
              config={{
                elasticity: { label: "Elasticity", color: "#8B5CF6" },
              }}
            >
              <BarChart data={categoryElasticityData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="category" />
                <YAxis domain={[-2.5, 0]} tickFormatter={(value) => value.toFixed(1)} />
                <Tooltip content={<ChartTooltipContent />} />
                <Bar dataKey="elasticity" fill="var(--color-elasticity)" name="Elasticity Coefficient">
                  {categoryElasticityData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.elasticity < -1.5 ? '#EF4444' : '#8B5CF6'} />
                  ))}
                </Bar>
              </BarChart>
            </ChartContainer>
          </div>
          <p className="text-xs text-dashboard-secondaryText mt-2">
            Categories with elasticity below -1.5 (red) are highly sensitive to price changes.
          </p>
        </div>
      </div>

      {/* Optimal Price Points Section */}
      <div className="bg-white rounded-lg shadow-sm border border-dashboard-border p-6">
        <h2 className="text-xl font-semibold text-dashboard-text mb-4">Optimal Price Points</h2>
        
        {/* Price Positioning Chart */}
        <div className="bg-white rounded-lg p-4 border border-dashboard-border mb-6">
          <h3 className="text-sm font-medium text-dashboard-secondaryText mb-2">Price Positioning Map</h3>
          <div className="h-64">
            <ChartContainer
              config={{
                positioning: { label: "Companies", color: "#8B5CF6" },
              }}
            >
              <ScatterChart>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="price" 
                  name="Price" 
                  label={{ value: 'Price ($)', position: 'insideBottom', offset: -5 }}
                />
                <YAxis 
                  dataKey="marketShare" 
                  name="Market Share" 
                  label={{ value: 'Market Share (%)', angle: -90, position: 'insideLeft' }}
                />
                <Tooltip cursor={{ strokeDasharray: '3 3' }} content={<ChartTooltipContent />} />
                <Scatter name="Companies" data={pricePositioningData} fill="var(--color-positioning)">
                  {pricePositioningData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.name === 'Your Brand' ? '#8B5CF6' : '#94A3B8'} />
                  ))}
                </Scatter>
              </ScatterChart>
            </ChartContainer>
          </div>
          <p className="text-xs text-dashboard-secondaryText mt-2">
            Shows your price positioning relative to competitors. Your brand is highlighted in purple.
          </p>
        </div>

        {/* Revenue Optimization Curve */}
        <div className="bg-white rounded-lg p-4 border border-dashboard-border">
          <h3 className="text-sm font-medium text-dashboard-secondaryText mb-2">Price Change Impact Simulation</h3>
          <div className="h-64">
            <ChartContainer
              config={{
                revenue: { label: "Revenue Impact", color: "#3B82F6" },
                marketShare: { label: "Market Share Impact", color: "#10B981" },
                profit: { label: "Profit Impact", color: "#F59E0B" },
              }}
            >
              <LineChart data={simulationData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="priceChange" label={{ value: 'Price Change (%)', position: 'insideBottom', offset: -5 }} />
                <YAxis domain={[-15, 15]} label={{ value: 'Impact (%)', angle: -90, position: 'insideLeft' }} />
                <Tooltip content={<ChartTooltipContent />} />
                <Legend />
                <Line type="monotone" dataKey="revenueImpact" stroke="var(--color-revenue)" name="Revenue Impact" strokeWidth={2} />
                <Line type="monotone" dataKey="marketShareImpact" stroke="var(--color-marketShare)" name="Market Share Impact" />
                <Line type="monotone" dataKey="profitImpact" stroke="var(--color-profit)" name="Profit Impact" />
              </LineChart>
            </ChartContainer>
          </div>
          <p className="text-xs text-dashboard-secondaryText mt-2">
            Simulates the impact of price changes on key metrics. Optimal price point maximizes profit.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PriceElasticityView;
