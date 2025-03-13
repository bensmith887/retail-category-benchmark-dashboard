
import React from 'react';
import { competitorData } from '@/utils/data';

const CompetitorTable: React.FC = () => {
  return (
    <div className="dashboard-card overflow-hidden">
      <h3 className="text-lg font-medium text-dashboard-text mb-4">Competitor Comparison</h3>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-dashboard-border">
              <th className="px-4 py-3 text-sm font-medium text-dashboard-secondaryText">Competitor</th>
              <th className="px-4 py-3 text-sm font-medium text-dashboard-secondaryText">Market Share</th>
              <th className="px-4 py-3 text-sm font-medium text-dashboard-secondaryText">Avg. Price</th>
              <th className="px-4 py-3 text-sm font-medium text-dashboard-secondaryText">Traffic</th>
              <th className="px-4 py-3 text-sm font-medium text-dashboard-secondaryText">YoY Growth</th>
              <th className="px-4 py-3 text-sm font-medium text-dashboard-secondaryText">Performance</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-dashboard-border">
            {competitorData.map((competitor, index) => (
              <tr 
                key={competitor.name} 
                className={competitor.name === 'Your Brand' 
                  ? 'bg-dashboard-highlight' 
                  : index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                }
              >
                <td className="px-4 py-3 font-medium">
                  {competitor.name === 'Your Brand' ? (
                    <span className="text-dashboard-primary">{competitor.name}</span>
                  ) : (
                    competitor.name
                  )}
                </td>
                <td className="px-4 py-3">{competitor.marketShare}%</td>
                <td className="px-4 py-3">${competitor.price}</td>
                <td className="px-4 py-3">{(competitor.traffic / 1000).toFixed(0)}k</td>
                <td className="px-4 py-3">{competitor.growth}%</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="h-2 rounded-full bg-gradient-to-r from-dashboard-primary to-dashboard-secondary"
                        style={{ width: `${competitor.performance}%` }}
                      />
                    </div>
                    <span className="text-sm min-w-[32px]">{competitor.performance}%</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CompetitorTable;
