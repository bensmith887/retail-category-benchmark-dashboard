
import React, { useState, useMemo } from 'react';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar, ScatterChart, Scatter, ZAxis, Cell } from 'recharts';
import MetricsCard from './MetricsCard';
import InsightCard from './InsightCard';
import { Target, TrendingDown, Zap, Calculator, Filter } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { elasticityData, priceData, subcategoryElasticityData, competitorData, toolsMonthlyElasticityData } from '@/utils/elasticityData';

// Price Sensitivity Analysis Section
const PriceElasticityView: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  // Get all available categories
  const categories = useMemo(() => {
    return ['all', ...elasticityData.map(item => item.category)];
  }, []);
  
  // Filter elasticity data based on selected category
  const filteredCategoryElasticityData = useMemo(() => {
    if (selectedCategory === 'all') {
      return elasticityData.map(item => ({
        category: item.category,
        elasticity: item.elasticity
      }));
    } else {
      return elasticityData
        .filter(item => item.category === selectedCategory)
        .map(item => ({
          category: item.category,
          elasticity: item.elasticity
        }));
    }
  }, [selectedCategory]);
  
  // Filter subcategory data based on selected category
  const filteredSubcategoryData = useMemo(() => {
    if (selectedCategory === 'all') {
      return subcategoryElasticityData;
    } else {
      return subcategoryElasticityData.filter(item => item.category === selectedCategory);
    }
  }, [selectedCategory]);
  
  // Create elasticity trend data with all competitors
  const elasticityTrendData = useMemo(() => {
    return toolsMonthlyElasticityData.map(monthData => {
      const competitors = competitorData.slice(1, 4).map((comp, idx) => ({
        [`competitor${idx+1}`]: -(Math.abs(monthData.elasticity) * (0.8 + (Math.random() * 0.4)))
      }));
      
      return {
        month: monthData.month,
        coefficient: monthData.elasticity,
        ...Object.assign({}, ...competitors)
      };
    });
  }, []);
  
  // Price vs. Conversion correlation data
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
  
  // Price positioning data
  const pricePositioningData = [
    { name: 'Your Brand', price: 25, marketShare: 15 },
    { name: 'Competitor A', price: 22, marketShare: 12 },
    { name: 'Competitor B', price: 30, marketShare: 18 },
    { name: 'Competitor C', price: 20, marketShare: 10 },
    { name: 'Competitor D', price: 28, marketShare: 14 },
    { name: 'Competitor E', price: 35, marketShare: 20 },
  ];
  
  // Simulation data
  const simulationData = [
    { priceChange: -15, revenueImpact: 12, marketShareImpact: 4.2, profitImpact: -2 },
    { priceChange: -10, revenueImpact: 8, marketShareImpact: 2.8, profitImpact: 0 },
    { priceChange: -5, revenueImpact: 4, marketShareImpact: 1.4, profitImpact: 2 },
    { priceChange: 0, revenueImpact: 0, marketShareImpact: 0, profitImpact: 0 },
    { priceChange: 5, revenueImpact: -3, marketShareImpact: -1.2, profitImpact: 1 },
    { priceChange: 10, revenueImpact: -6, marketShareImpact: -2.3, profitImpact: -1 },
    { priceChange: 15, revenueImpact: -10, marketShareImpact: -3.5, profitImpact: -5 },
  ];
  
  // Insights for Price Elasticity - Include Tools & Home Improvement
  const priceElasticityInsights = [
    {
      title: 'Price Opportunity',
      description: 'Baby Products category shows elasticity of -0.27, suggesting room for price increase with minimal impact.',
      type: 'opportunity' as const
    },
    {
      title: 'Competitive Threat',
      description: 'Competitor B is lowering prices in Hardware subcategory where elasticity is high (-1.16).',
      type: 'threat' as const
    },
    {
      title: 'Seasonal Pattern',
      description: 'Tools & Home Improvement shows high elasticity (-2.20) in April, indicating promotion effectiveness.',
      type: 'positive' as const
    },
    {
      title: 'Recommendation',
      description: 'Consider 5% price increases in Baby & Books categories while keeping Tools prices stable due to high elasticity.',
      type: 'recommendation' as const
    }
  ];

  return (
    <div className="animate-fade-in">
      {/* Top Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <MetricsCard
          label="Avg. Elasticity"
          value={elasticityData.reduce((sum, item) => sum + item.elasticity, 0) / elasticityData.length}
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

      {/* Category Filter */}
      <div className="flex justify-end mb-4">
        <div className="flex items-center">
          <Filter className="mr-2 h-4 w-4 text-dashboard-secondaryText" />
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category === 'all' ? 'All Categories' : category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
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
              More negative values indicate higher price sensitivity. Tools & Home Improvement peaks in April.
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
              <BarChart data={filteredCategoryElasticityData}>
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
                  {filteredCategoryElasticityData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.elasticity < -1.0 ? '#ef4444' : '#5840bb'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="text-xs text-dashboard-secondaryText mt-2">
            Categories with elasticity below -1.0 (red) are highly sensitive to price changes. Tools & Home Improvement is particularly sensitive.
          </p>
        </div>
      </div>

      {/* Subcategory Analysis Section */}
      <div className="dashboard-card mb-6">
        <h3 className="text-lg font-medium text-dashboard-text mb-4">Subcategory Analysis</h3>
        <div style={{ height: "350px" }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={filteredSubcategoryData}
              layout="vertical"
              margin={{ top: 5, right: 30, left: 120, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
              <XAxis 
                type="number"
                domain={[-1.5, 0]}
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
                formatter={(value: any) => [`${value}`, 'Elasticity']}
                contentStyle={{ 
                  borderRadius: '6px', 
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
                  border: '1px solid #e5e7eb'
                }}
              />
              <Bar dataKey="elasticity" radius={[0, 4, 4, 0]}>
                {filteredSubcategoryData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.elasticity < -1.0 ? '#ef4444' : '#5840bb'} 
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="text-xs text-dashboard-secondaryText mt-2">
          Hardware subcategory shows the highest elasticity at -1.16, whereas Children's Books show the lowest at -0.09.
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
      
      {/* Monthly Elasticity Analysis for Tools & Home Improvement */}
      <div className="dashboard-card mb-6">
        <h3 className="text-lg font-medium text-dashboard-text mb-4">Monthly Elasticity Analysis - Tools & Home Improvement</h3>
        <div style={{ height: "280px" }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={toolsMonthlyElasticityData}>
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
              <Line 
                type="monotone" 
                dataKey="elasticity" 
                name="Tools & Home Improvement" 
                stroke="#ef4444" 
                strokeWidth={2} 
                dot={{ r: 4 }} 
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <p className="text-xs text-dashboard-secondaryText mt-2">
          Tools & Home Improvement shows strong seasonal elasticity patterns with peaks in April, June, and August.
        </p>
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
