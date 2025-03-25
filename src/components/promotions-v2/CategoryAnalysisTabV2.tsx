
import React from 'react';
import { Target, BarChart3, ArrowUpDown, Filter } from 'lucide-react';
import MetricsCard from '@/components/MetricsCard';
import { BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Bar, Cell, LineChart, Line, Legend, ResponsiveContainer } from 'recharts';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface CategoryAnalysisTabV2Props {
  subcategorySensitivityData: any[];
  priceSensitivityData: any[];
}

const CategoryAnalysisTabV2: React.FC<CategoryAnalysisTabV2Props> = ({ 
  subcategorySensitivityData,
  priceSensitivityData
}) => {
  const [selectedFilter, setSelectedFilter] = React.useState('all');
  
  // Filter data based on selection
  const filteredData = selectedFilter === 'all' 
    ? subcategorySensitivityData 
    : subcategorySensitivityData.filter(item => item.category === selectedFilter);

  return (
    <div className="animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <MetricsCard
          label="Most Responsive Subcategory"
          value="Feeding"
          change="-1.03"
          secondaryLabel="Sensitivity"
          isPositive={true}
          icon={<Target className="text-dashboard-primary" />}
        />
        <MetricsCard
          label="Category Sensitivity Difference"
          value="41.8%"
          change="Baby > Books"
          secondaryLabel="Overall Difference"
          isPositive={true}
          icon={<BarChart3 className="text-dashboard-primary" />}
        />
        <MetricsCard
          label="Price Movement Sensitivity"
          value="22.3x"
          change="Increases vs. Decreases"
          secondaryLabel="Sensitivity Ratio"
          isPositive={false}
          icon={<ArrowUpDown className="text-dashboard-primary" />}
        />
      </div>
      
      <div className="dashboard-card mb-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-dashboard-text">Subcategory Promotional Responsiveness</h3>
          <div className="flex items-center">
            <Filter className="mr-2 h-4 w-4 text-dashboard-secondaryText" />
            <Select value={selectedFilter} onValueChange={setSelectedFilter}>
              <SelectTrigger className="w-[130px]">
                <SelectValue placeholder="Filter" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="Baby">Baby Products</SelectItem>
                <SelectItem value="Books">Books</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div style={{ height: "350px" }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={filteredData}
              layout="vertical"
              margin={{ top: 5, right: 30, left: 100, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
              <XAxis 
                type="number"
                domain={[-1.2, 0]}
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
                formatter={(value: any) => [`${value}`, 'Sensitivity']}
                contentStyle={{ 
                  borderRadius: '6px', 
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
                  border: '1px solid #e5e7eb'
                }}
              />
              <Bar dataKey="elasticity" radius={[0, 4, 4, 0]}>
                {filteredData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.category === 'Baby' ? '#5840bb' : '#6892e6'} 
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="text-xs text-dashboard-secondaryText mt-2">
          Higher negative values indicate stronger response to promotions (higher sensitivity)
        </div>
      </div>
      
      <div className="dashboard-card mb-6">
        <h3 className="text-lg font-medium text-dashboard-text mb-4">Price Increase vs. Decrease Sensitivity</h3>
        <div style={{ height: "300px" }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={priceSensitivityData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis 
                dataKey="name"
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                label={{ value: 'Sensitivity (Absolute)', angle: -90, position: 'insideLeft' }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                formatter={(value: any) => [`${value}`, 'Sensitivity']}
                contentStyle={{ 
                  borderRadius: '6px', 
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
                  border: '1px solid #e5e7eb'
                }}
              />
              <Bar dataKey="value" fill="#5840bb" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="text-xs text-dashboard-secondaryText mt-2">
          Consumers are more sensitive to price increases (-0.89 sensitivity) than promotions (-0.04 sensitivity)
        </div>
      </div>
      
      <div className="dashboard-card mb-6">
        <h3 className="text-lg font-medium text-dashboard-text mb-4">Subcategory Drill-Down Analysis</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-4 rounded-md space-y-3 border border-dashboard-border">
            <h4 className="font-medium mb-2">Baby Products Subcategories</h4>
            <div className="space-y-2">
              {subcategorySensitivityData
                .filter(item => item.category === 'Baby')
                .map((item, index) => (
                  <div key={index} className="flex justify-between items-center py-1 border-b border-gray-200">
                    <span className="text-dashboard-text">{item.name}</span>
                    <span className="font-medium text-dashboard-primary">{item.elasticity}</span>
                  </div>
                ))}
            </div>
            <div className="text-xs text-dashboard-secondaryText mt-2">
              <p>Feeding subcategory has the highest promotional sensitivity at -1.03</p>
              <p>Bath products have the lowest responsiveness at -0.34</p>
            </div>
          </div>
          <div className="bg-white p-4 rounded-md space-y-3 border border-dashboard-border">
            <h4 className="font-medium mb-2">Books Subcategories</h4>
            <div className="space-y-2">
              {subcategorySensitivityData
                .filter(item => item.category === 'Books')
                .map((item, index) => (
                  <div key={index} className="flex justify-between items-center py-1 border-b border-gray-200">
                    <span className="text-dashboard-text">{item.name}</span>
                    <span className="font-medium text-dashboard-primary">{item.elasticity}</span>
                  </div>
                ))}
            </div>
            <div className="text-xs text-dashboard-secondaryText mt-2">
              <p>Fiction books show the highest promotional sensitivity at -0.66</p>
              <p>Children's books have the lowest responsiveness at -0.42</p>
            </div>
          </div>
        </div>
      </div>

      <div className="dashboard-card">
        <h3 className="text-lg font-medium text-dashboard-text mb-4">Sensitivity Explanation Widget</h3>
        <div className="bg-gray-50 p-6 rounded-lg border border-dashboard-border">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-dashboard-primary rounded-full flex items-center justify-center text-white mb-4">
                <span className="text-xl font-semibold">-0.5</span>
              </div>
              <h4 className="font-medium mb-2">Low Sensitivity</h4>
              <p className="text-sm text-dashboard-secondaryText">
                A 10% discount results in 5% more units sold. Less responsive to promotions.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-dashboard-secondary rounded-full flex items-center justify-center text-white mb-4">
                <span className="text-xl font-semibold">-1.0</span>
              </div>
              <h4 className="font-medium mb-2">Unit Sensitivity</h4>
              <p className="text-sm text-dashboard-secondaryText">
                A 10% discount results in 10% more units sold. Revenue remains stable.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-dashboard-danger rounded-full flex items-center justify-center text-white mb-4">
                <span className="text-xl font-semibold">-1.5</span>
              </div>
              <h4 className="font-medium mb-2">High Sensitivity</h4>
              <p className="text-sm text-dashboard-secondaryText">
                A 10% discount results in 15% more units sold. Highly responsive to promotions.
              </p>
            </div>
          </div>
          
          <div className="text-xs text-dashboard-secondaryText mt-6 border-t border-dashboard-border pt-4">
            <p><strong>Formula:</strong> Price Sensitivity = % Change in Quantity Demanded / % Change in Price</p>
            <p><strong>Interpretation:</strong> Negative values indicate inverse relationship between price and demand.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryAnalysisTabV2;
