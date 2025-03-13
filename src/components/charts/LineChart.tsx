
import React, { useEffect, useRef } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { marketShareData } from '@/utils/data';

interface LineChartProps {
  title: string;
}

const LineChart: React.FC<LineChartProps> = ({ title }) => {
  return (
    <div className="dashboard-card h-full flex flex-col">
      <h3 className="text-lg font-medium text-dashboard-text mb-4">{title}</h3>
      
      <div className="flex-grow" style={{ minHeight: '240px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={marketShareData}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorYourShare" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#5840bb" stopOpacity={0.2}/>
                <stop offset="95%" stopColor="#5840bb" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorCompetitorShare" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6892e6" stopOpacity={0.2}/>
                <stop offset="95%" stopColor="#6892e6" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f1f1" />
            <XAxis dataKey="month" axisLine={false} tickLine={false} />
            <YAxis 
              domain={[10, 25]} 
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
            <Area 
              type="monotone" 
              dataKey="yourShare" 
              stroke="#5840bb" 
              fillOpacity={1}
              fill="url(#colorYourShare)" 
              strokeWidth={2}
              name="Your Brand"
            />
            <Area 
              type="monotone" 
              dataKey="competitorShare" 
              stroke="#6892e6" 
              fillOpacity={1}
              fill="url(#colorCompetitorShare)" 
              strokeWidth={2}
              name="Top Competitor"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default LineChart;
