
import React, { useState } from 'react';
import { 
  marketShareTopCompetitors, 
  categoryMarketShareData,
  marketShareTrendData
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
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from './ui/table';
import { TrendingUp, TrendingDown, ChevronRight, ChevronDown } from 'lucide-react';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

// Define subcategories for the table
const subcategories = {
  'Fashion': [
    { category: 'Women\'s Apparel', domains: [
      { name: 'fashion-store.com', share: 18.5, monthChange: 1.2, yearChange: 2.8 },
      { name: 'style-hub.com', share: 12.4, monthChange: 0.9, yearChange: 1.7 },
      { name: 'trendy-clothes.com', share: 9.1, monthChange: -0.3, yearChange: 0.5 }
    ]},
    { category: 'Men\'s Apparel', domains: [
      { name: 'mensfashion.com', share: 15.2, monthChange: 0.5, yearChange: 1.4 },
      { name: 'dapper-men.com', share: 10.8, monthChange: -0.2, yearChange: 0.8 },
      { name: 'mens-styles.com', share: 8.3, monthChange: 0.3, yearChange: 1.1 }
    ]},
    { category: 'Accessories', domains: [
      { name: 'accessory-world.com', share: 12.7, monthChange: 1.5, yearChange: 2.3 },
      { name: 'fashion-extras.com', share: 9.5, monthChange: 0.7, yearChange: 1.9 },
      { name: 'trendy-accessories.com', share: 7.2, monthChange: 0.3, yearChange: 1.2 }
    ]}
  ],
  'Home Goods': [
    { category: 'Furniture', domains: [
      { name: 'modern-furniture.com', share: 16.8, monthChange: 1.4, yearChange: 2.2 },
      { name: 'home-decor-plus.com', share: 13.2, monthChange: 0.8, yearChange: 1.9 },
      { name: 'furniture-deals.com', share: 10.5, monthChange: 0.5, yearChange: 1.3 }
    ]},
    { category: 'Kitchen & Dining', domains: [
      { name: 'kitchen-essentials.com', share: 14.2, monthChange: 1.1, yearChange: 2.0 },
      { name: 'cooking-supplies.com', share: 11.3, monthChange: 0.6, yearChange: 1.6 },
      { name: 'dining-solutions.com', share: 8.7, monthChange: 0.2, yearChange: 1.0 }
    ]},
    { category: 'Home Décor', domains: [
      { name: 'decor-paradise.com', share: 13.5, monthChange: 1.3, yearChange: 2.5 },
      { name: 'home-accents.com', share: 10.9, monthChange: 0.9, yearChange: 1.8 },
      { name: 'interior-touches.com', share: 8.4, monthChange: 0.4, yearChange: 1.2 }
    ]}
  ],
  'Electronics': [
    { category: 'TVs', domains: [
      { name: 'tv-deals.com', share: 17.3, monthChange: 1.6, yearChange: 2.4 },
      { name: 'screen-shop.com', share: 14.1, monthChange: 1.0, yearChange: 2.1 },
      { name: 'tv-warehouse.com', share: 11.2, monthChange: 0.7, yearChange: 1.5 }
    ]},
    { category: 'Laptops', domains: [
      { name: 'laptop-world.com', share: 16.5, monthChange: 1.3, yearChange: 2.2 },
      { name: 'computer-hub.com', share: 13.8, monthChange: 0.8, yearChange: 1.7 },
      { name: 'tech-laptops.com', share: 10.4, monthChange: 0.5, yearChange: 1.3 }
    ]},
    { category: 'TV Accessories', domains: [
      { name: 'tv-gadgets.com', share: 12.9, monthChange: 0.9, yearChange: 1.8 },
      { name: 'screen-accessories.com', share: 10.6, monthChange: 0.6, yearChange: 1.4 },
      { name: 'home-theater-extras.com', share: 8.1, monthChange: 0.3, yearChange: 1.0 }
    ]}
  ]
};

const MarketShareView: React.FC = () => {
  // Get your brand data
  const yourBrand = marketShareTopCompetitors[0];
  // State to track which categories are expanded
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);
  
  // Toggle category expansion
  const toggleCategory = (category: string) => {
    setExpandedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category) 
        : [...prev, category]
    );
  };
  
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
                value="+4.3%"
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

      {/* Category Traffic Share Table with Dropdowns */}
      <div className="dashboard-card mb-6 overflow-hidden">
        <h3 className="text-lg font-medium text-dashboard-text mb-4">Top Domains by Category Traffic Share</h3>
        
        <div className="overflow-auto">
          <Table className="w-full text-sm border-collapse">
            <TableHeader className="bg-gray-50">
              <TableRow className="border-b">
                <TableHead className="py-2 px-3 font-medium text-left w-16 border-r">Rank</TableHead>
                <TableHead className="py-2 px-3 font-medium text-left w-[180px] border-r">Category</TableHead>
                <TableHead className="py-2 px-3 font-medium text-center border-r" colSpan={3}>Rank 1</TableHead>
                <TableHead className="py-2 px-3 font-medium text-center border-r" colSpan={3}>Rank 2</TableHead>
                <TableHead className="py-2 px-3 font-medium text-center" colSpan={3}>Rank 3</TableHead>
              </TableRow>
              <TableRow className="border-b text-xs">
                <TableHead className="py-1 px-3 font-normal text-left border-r"></TableHead>
                <TableHead className="py-1 px-3 font-normal text-left border-r"></TableHead>
                {/* Rank 1 Headers */}
                <TableHead className="py-1 px-3 font-medium text-left w-[170px]">Domain</TableHead>
                <TableHead className="py-1 px-3 font-medium text-right w-[80px]">Share</TableHead>
                <TableHead className="py-1 px-3 font-medium text-center w-[120px] border-r">
                  <div className="flex items-center justify-center space-x-4">
                    <span>MoM</span>
                    <span>YoY</span>
                  </div>
                </TableHead>
                {/* Rank 2 Headers */}
                <TableHead className="py-1 px-3 font-medium text-left w-[170px]">Domain</TableHead>
                <TableHead className="py-1 px-3 font-medium text-right w-[80px]">Share</TableHead>
                <TableHead className="py-1 px-3 font-medium text-center w-[120px] border-r">
                  <div className="flex items-center justify-center space-x-4">
                    <span>MoM</span>
                    <span>YoY</span>
                  </div>
                </TableHead>
                {/* Rank 3 Headers */}
                <TableHead className="py-1 px-3 font-medium text-left w-[170px]">Domain</TableHead>
                <TableHead className="py-1 px-3 font-medium text-right w-[80px]">Share</TableHead>
                <TableHead className="py-1 px-3 font-medium text-center w-[120px]">
                  <div className="flex items-center justify-center space-x-4">
                    <span>MoM</span>
                    <span>YoY</span>
                  </div>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categoryMarketShareData.map((category, index) => (
                <React.Fragment key={category.category}>
                  <TableRow className={`border-b ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}>
                    <TableCell className="py-2 px-3 text-left align-middle border-r">{index + 1}</TableCell>
                    <TableCell className="py-2 px-3 text-left align-middle border-r">
                      <Collapsible>
                        <CollapsibleTrigger asChild onClick={() => toggleCategory(category.category)}>
                          <div className="flex items-center cursor-pointer">
                            {expandedCategories.includes(category.category) 
                              ? <ChevronDown size={16} className="mr-1 text-gray-400" /> 
                              : <ChevronRight size={16} className="mr-1 text-gray-400" />}
                            <span className="font-medium">{category.category}</span>
                          </div>
                        </CollapsibleTrigger>
                        
                        {/* Subcategories (collapsible content) */}
                        <CollapsibleContent>
                          {subcategories[category.category as keyof typeof subcategories]?.map((subcat, subIndex) => (
                            <TableRow key={`${category.category}-${subcat.category}`} className="border-b bg-gray-100">
                              <TableCell className="py-1 px-3 text-left align-middle border-r"></TableCell>
                              <TableCell className="py-1 px-3 text-left align-middle border-r pl-8">
                                <span className="text-sm text-gray-600">{subcat.category}</span>
                              </TableCell>
                              
                              {/* Subcategory domains with complete format for all three ranks */}
                              {subcat.domains.map((domain, domainIndex) => (
                                <React.Fragment key={`${subcat.category}-${domain.name}`}>
                                  <TableCell className="py-1 px-3 text-left align-middle">
                                    <span className="text-sm text-dashboard-text">{domain.name}</span>
                                  </TableCell>
                                  <TableCell className="py-1 px-3 text-right align-middle text-sm">{domain.share}%</TableCell>
                                  <TableCell className={`py-1 px-3 text-center align-middle ${domainIndex < 2 ? 'border-r' : ''}`}>
                                    <div className="flex items-center justify-center space-x-4 text-xs">
                                      <span className={domain.monthChange > 0 ? 'text-green-600' : 'text-red-500'}>
                                        {domain.monthChange > 0 ? '+' : ''}{domain.monthChange}
                                      </span>
                                      <span className={domain.yearChange > 0 ? 'text-green-600' : 'text-red-500'}>
                                        {domain.yearChange > 0 ? '+' : ''}{domain.yearChange}
                                      </span>
                                    </div>
                                  </TableCell>
                                </React.Fragment>
                              ))}
                            </TableRow>
                          ))}
                        </CollapsibleContent>
                      </Collapsible>
                    </TableCell>
                    
                    {/* Rank 1 Domain */}
                    {category.domains[0] && (
                      <>
                        <TableCell className="py-2 px-3 text-left align-middle">
                          <span className="font-medium text-dashboard-text">{category.domains[0].name}</span>
                        </TableCell>
                        <TableCell className="py-2 px-3 text-right align-middle">{category.domains[0].share}%</TableCell>
                        <TableCell className="py-2 px-3 text-center align-middle border-r">
                          <div className="flex items-center justify-center space-x-4">
                            <span className={category.domains[0].monthChange > 0 ? 'text-green-600' : 'text-red-500'}>
                              {category.domains[0].monthChange > 0 ? '+' : ''}{category.domains[0].monthChange}
                            </span>
                            <span className={category.domains[0].yearChange > 0 ? 'text-green-600' : 'text-red-500'}>
                              {category.domains[0].yearChange > 0 ? '+' : ''}{category.domains[0].yearChange}
                            </span>
                          </div>
                        </TableCell>
                      </>
                    )}
                    
                    {/* Rank 2 Domain */}
                    {category.domains[1] && (
                      <>
                        <TableCell className="py-2 px-3 text-left align-middle">
                          <span className="font-medium text-dashboard-text">{category.domains[1].name}</span>
                        </TableCell>
                        <TableCell className="py-2 px-3 text-right align-middle">{category.domains[1].share}%</TableCell>
                        <TableCell className="py-2 px-3 text-center align-middle border-r">
                          <div className="flex items-center justify-center space-x-4">
                            <span className={category.domains[1].monthChange > 0 ? 'text-green-600' : 'text-red-500'}>
                              {category.domains[1].monthChange > 0 ? '+' : ''}{category.domains[1].monthChange}
                            </span>
                            <span className={category.domains[1].yearChange > 0 ? 'text-green-600' : 'text-red-500'}>
                              {category.domains[1].yearChange > 0 ? '+' : ''}{category.domains[1].yearChange}
                            </span>
                          </div>
                        </TableCell>
                      </>
                    )}
                    
                    {/* Rank 3 Domain */}
                    {category.domains[2] && (
                      <>
                        <TableCell className="py-2 px-3 text-left align-middle">
                          <span className="font-medium text-dashboard-text">{category.domains[2].name}</span>
                        </TableCell>
                        <TableCell className="py-2 px-3 text-right align-middle">{category.domains[2].share}%</TableCell>
                        <TableCell className="py-2 px-3 text-center align-middle">
                          <div className="flex items-center justify-center space-x-4">
                            <span className={category.domains[2].monthChange > 0 ? 'text-green-600' : 'text-red-500'}>
                              {category.domains[2].monthChange > 0 ? '+' : ''}{category.domains[2].monthChange}
                            </span>
                            <span className={category.domains[2].yearChange > 0 ? 'text-green-600' : 'text-red-500'}>
                              {category.domains[2].yearChange > 0 ? '+' : ''}{category.domains[2].yearChange}
                            </span>
                          </div>
                        </TableCell>
                      </>
                    )}
                  </TableRow>
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
      
      {/* Subfooter */}
      <div className="text-xs text-center text-dashboard-secondaryText mt-6 pt-4 border-t border-dashboard-border">
        <p>Source: SimilarWeb • Metrics: Traffic Share, Page Views, User Engagement</p>
      </div>
    </div>
  );
};

export default MarketShareView;
