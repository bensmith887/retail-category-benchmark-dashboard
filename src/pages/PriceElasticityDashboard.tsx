
import React from 'react';
import Header from '@/components/Header';
import PriceElasticityView from '@/components/PriceElasticityView';
import { useLocation } from 'react-router-dom';

const PriceElasticityDashboard: React.FC = () => {
  const location = useLocation();
  
  return (
    <div className="flex flex-col min-h-screen bg-dashboard-background text-dashboard-text">
      <Header />
      <div className="container mx-auto px-4 py-6">
        <PriceElasticityView />
      </div>
    </div>
  );
};

export default PriceElasticityDashboard;
