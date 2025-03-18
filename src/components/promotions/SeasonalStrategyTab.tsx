
import React from 'react';
import { Calendar, Tag, Clock } from 'lucide-react';
import MetricsCard from '@/components/MetricsCard';

const SeasonalStrategyTab: React.FC = () => {
  return (
    <div className="animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <MetricsCard
          label="Peak Shopping Season"
          value="Nov-Dec"
          change="+45%"
          secondaryLabel="Books Sales Increase"
          isPositive={true}
          icon={<Calendar className="text-dashboard-primary" />}
        />
        <MetricsCard
          label="Off-Season Opportunity"
          value="Jul"
          change="-1.53"
          secondaryLabel="Baby Products Elasticity"
          isPositive={true}
          icon={<Tag className="text-dashboard-primary" />}
        />
        <MetricsCard
          label="Optimal Campaign Length"
          value="7-10 Days"
          change="+12%"
          secondaryLabel="vs. 3-5 Day Promotions"
          isPositive={true}
          icon={<Clock className="text-dashboard-primary" />}
        />
      </div>
      
      <div className="dashboard-card mb-6">
        <h3 className="text-lg font-medium text-dashboard-text mb-4">Monthly Promotion Strategy Calendar</h3>
        <div className="overflow-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-dashboard-secondaryText uppercase tracking-wider">Month</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-dashboard-secondaryText uppercase tracking-wider">Elasticity</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-dashboard-secondaryText uppercase tracking-wider">Top Subcategory</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-dashboard-secondaryText uppercase tracking-wider">Optimal Discount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-dashboard-secondaryText uppercase tracking-wider">Strategy</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-dashboard-text">January</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-dashboard-secondaryText">-0.65</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-dashboard-secondaryText">Strollers</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-dashboard-secondaryText">15%</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-dashboard-secondaryText">Post-holiday clearance</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-dashboard-text">February</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-dashboard-secondaryText">-0.71</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-dashboard-secondaryText">Feeding</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-dashboard-secondaryText">14%</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-dashboard-secondaryText">Bundle deals</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-dashboard-text">July</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-dashboard-secondaryText">-1.53</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-dashboard-secondaryText">Diapers</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-dashboard-secondaryText">32%</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-dashboard-secondaryText">Summer flash sales</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-dashboard-text">November</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-dashboard-secondaryText">-0.94</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-dashboard-secondaryText">Fiction Books</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-dashboard-secondaryText">25%</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-dashboard-secondaryText">Holiday shopping events</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-dashboard-text">December</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-dashboard-secondaryText">-0.98</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-dashboard-secondaryText">Fiction Books</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-dashboard-secondaryText">24%</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-dashboard-secondaryText">Last-minute gift promotions</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SeasonalStrategyTab;
