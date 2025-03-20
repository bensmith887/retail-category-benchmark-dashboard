
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';

interface SeasonalStrategyTabProps {
  seasonalStrategyData: any[];
  campaignCalendar: any[];
}

const SeasonalStrategyTab: React.FC<SeasonalStrategyTabProps> = ({
  seasonalStrategyData,
  campaignCalendar
}) => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
  return (
    <div className="animate-fade-in">
      <div className="dashboard-card mb-6">
        <h3 className="text-lg font-medium text-dashboard-text mb-2">Seasonal Promotion Strategy</h3>
        <p className="text-sm text-dashboard-secondaryText mb-4">
          Shows optimal promotion timing by quarter. Taller bars represent more favorable promotion periods based on elasticity and seasonal factors.
        </p>
        <div style={{ height: "300px" }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={seasonalStrategyData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="season" />
              <YAxis 
                axisLine={false}
                tickLine={false}
              />
              <Tooltip 
                formatter={(value: number) => [`${value}`, 'Promotion Effectiveness Score']}
                contentStyle={{ 
                  borderRadius: '6px', 
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
                  border: '1px solid #e5e7eb'
                }}
              />
              <Legend />
              <Bar dataKey="baby" name="Baby Products" fill="#5840bb">
                {seasonalStrategyData.map((entry, index) => (
                  <Cell key={`cell-baby-${index}`} fill={entry.baby > 75 ? '#5840bb' : '#a78bfa'} />
                ))}
              </Bar>
              <Bar dataKey="books" name="Books" fill="#6892e6">
                {seasonalStrategyData.map((entry, index) => (
                  <Cell key={`cell-books-${index}`} fill={entry.books > 75 ? '#6892e6' : '#93c5fd'} />
                ))}
              </Bar>
              <Bar dataKey="tools" name="Tools & Home" fill="#22c55e">
                {seasonalStrategyData.map((entry, index) => (
                  <Cell key={`cell-tools-${index}`} fill={entry.tools > 75 ? '#22c55e' : '#86efac'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      <div className="dashboard-card">
        <h3 className="text-lg font-medium text-dashboard-text mb-2">Campaign Calendar</h3>
        <p className="text-sm text-dashboard-secondaryText mb-4">
          Visualizes ideal promotion periods by month for each product category. Darker cells indicate higher recommended promotion intensity.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-dashboard-border bg-gray-50">
                <th className="px-4 py-3 text-left font-medium text-dashboard-secondaryText">Category</th>
                {months.map((month) => (
                  <th key={month} className="px-2 py-3 text-center font-medium text-dashboard-secondaryText">{month}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {campaignCalendar.map((row) => (
                <tr key={row.category} className="border-b border-dashboard-border">
                  <td className="px-4 py-3 font-medium">{row.category}</td>
                  {months.map((month, i) => {
                    const intensity = row[month.toLowerCase()];
                    let bgColor = 'bg-white';
                    if (intensity === 'high') bgColor = 'bg-green-100';
                    else if (intensity === 'medium') bgColor = 'bg-blue-50';
                    else if (intensity === 'low') bgColor = 'bg-gray-50';
                    
                    return (
                      <td key={`${row.category}-${month}`} className={`px-2 py-3 text-center ${bgColor}`}>
                        {intensity === 'high' && '●●●'}
                        {intensity === 'medium' && '●●'}
                        {intensity === 'low' && '●'}
                        {intensity === 'none' && '–'}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-3 flex justify-end">
          <div className="flex items-center text-xs space-x-4">
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-green-100 mr-1"></div>
              <span>High Priority</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-blue-50 mr-1"></div>
              <span>Medium Priority</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-gray-50 mr-1"></div>
              <span>Low Priority</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeasonalStrategyTab;
