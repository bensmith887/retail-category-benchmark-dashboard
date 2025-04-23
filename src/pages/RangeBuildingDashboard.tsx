
import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Tabs from '@/components/Tabs';
import DashboardSelector from '@/components/DashboardSelector';
import { TabIcon } from '@/components/TabIcon';
import { RangeBuildingTabs } from '@/components/range-building/RangeBuildingTabs';
import ApiKeyInput from '@/components/range-building/ApiKeyInput';
import { setApiKey, getApiKeyStatus } from '@/services/assortmentApi';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { InfoIcon } from 'lucide-react';

const RangeBuildingDashboard = () => {
  const [activeTab, setActiveTab] = useState('range-building');
  const [loading, setLoading] = useState(true);
  const [apiKeySet, setApiKeySet] = useState(getApiKeyStatus().isSet);

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const retailers = [
    { id: 'h&m', name: 'H&M' },
    { id: 'mango', name: 'Mango' },
    { id: 'monki', name: 'Monki' },
    { id: 'nakd', name: 'NA-KD' },
    { id: 'weekday', name: 'Weekday' }
  ];
  
  const categories = [
    { id: 'tops', name: 'Tops' },
    { id: 'bottoms', name: 'Bottoms' },
    { id: 'dresses', name: 'Dresses' },
    { id: 'outerwear', name: 'Outerwear' },
    { id: 'accessories', name: 'Accessories' }
  ];

  const handleApiKeySubmit = (apiKey: string) => {
    setApiKey(apiKey);
    setApiKeySet(true);
  };

  return (
    <div className="flex h-screen bg-dashboard-background overflow-hidden">
      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <Header />
        <div className="flex-1 overflow-auto p-6">
          <div className="flex items-center mb-4">
            <TabIcon name="Grid2X2" size={20} className="mr-2 text-dashboard-primary" />
            <h1 className="text-xl font-semibold">Range Building</h1>
            <div className="ml-auto">
              <DashboardSelector currentPath="/range-building" />
            </div>
          </div>
          
          <ApiKeyInput onApiKeySubmit={handleApiKeySubmit} />
          
          {!apiKeySet && !loading && (
            <Alert className="mb-4 bg-blue-50 border-blue-200">
              <InfoIcon className="h-4 w-4" />
              <AlertTitle>API Key Required</AlertTitle>
              <AlertDescription>
                Please enter your API key above to fetch assortment data. Without an API key, the table will display mock data.
              </AlertDescription>
            </Alert>
          )}
          
          {loading ? (
            <div className="w-full h-full flex items-center justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-dashboard-primary"></div>
            </div>
          ) : (
            <RangeBuildingTabs retailers={retailers} categories={categories} />
          )}
        </div>
      </div>
    </div>
  );
};

export default RangeBuildingDashboard;
