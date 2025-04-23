
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  LineChart, 
  BarChart3, 
  TrendingUp, 
  Share2
} from 'lucide-react';
import { CategoryFunnel } from './CategoryFunnel';
import { OpportunityMatrix } from './OpportunityMatrix';
import { ConversionEfficiency } from './ConversionEfficiency';
import { CompetitivePositioning } from './CompetitivePositioning';

interface SearchToSalesFunnelTabsProps {
  retailers: { id: string; name: string; }[];
  categories: { id: string; name: string; }[];
}

export const SearchToSalesFunnelTabs: React.FC<SearchToSalesFunnelTabsProps> = ({ 
  retailers, 
  categories 
}) => {
  const [activeTab, setActiveTab] = useState('funnel');

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-1">Search-to-Sale Category Funnel Analysis</h2>
        <p className="text-muted-foreground">
          Analyze the customer journey from search intent to purchase through category engagement
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid grid-cols-4 w-full">
          <TabsTrigger value="funnel" className="flex items-center gap-2">
            <LineChart size={16} />
            <span>Category Funnel</span>
          </TabsTrigger>
          <TabsTrigger value="opportunity-matrix" className="flex items-center gap-2">
            <BarChart3 size={16} />
            <span>Opportunity Matrix</span>
          </TabsTrigger>
          <TabsTrigger value="conversion-efficiency" className="flex items-center gap-2">
            <TrendingUp size={16} />
            <span>Conversion Efficiency</span>
          </TabsTrigger>
          <TabsTrigger value="competitive-positioning" className="flex items-center gap-2">
            <Share2 size={16} />
            <span>Competitive Positioning</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="funnel">
          <CategoryFunnel 
            retailers={retailers} 
            categories={categories} 
          />
        </TabsContent>

        <TabsContent value="opportunity-matrix">
          <OpportunityMatrix 
            retailers={retailers} 
            categories={categories} 
          />
        </TabsContent>

        <TabsContent value="conversion-efficiency">
          <ConversionEfficiency 
            retailers={retailers} 
            categories={categories} 
          />
        </TabsContent>

        <TabsContent value="competitive-positioning">
          <CompetitivePositioning 
            retailers={retailers} 
            categories={categories} 
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};
