
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
              <th className="px-4 py-3 text-sm font-medium text-dashboard-secondaryText">Traffic Share</th>
              <th className="px-4 py-3 text-sm font-medium text-dashboard-secondaryText">Avg. Price</th>
              <th className="px-4 py-3 text-sm font-medium text-dashboard-secondaryText">Traffic</th>
              <th className="px-4 py-3 text-sm font-medium text-dashboard-secondaryText">YoY Growth</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-dashboard-border">
            {competitorData.map((competitor, index) => (
              <tr 
                key={competitor.name} 
                className={competitor.name === 'Your Retail Brand' 
                  ? 'bg-dashboard-highlight' 
                  : index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                }
              >
                <td className="px-4 py-3 font-medium">
                  {competitor.name === 'Your Retail Brand' ? (
                    <span className="text-dashboard-primary">{competitor.name}</span>
                  ) : (
                    competitor.name
                  )}
                </td>
                <td className="px-4 py-3">{competitor.marketShare}%</td>
                <td className="px-4 py-3">${competitor.price}</td>
                <td className="px-4 py-3">{(competitor.traffic / 1000).toFixed(0)}k</td>
                <td className="px-4 py-3">{competitor.growth}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CompetitorTable;
