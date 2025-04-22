
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Grid2X2,
  BarChart3, 
  TrendingUp, 
  Search, 
  LineChart,
  Filter,
  Share2  
} from 'lucide-react';
import { AssortmentMixExplorer } from './AssortmentMixExplorer';
import { WhiteSpaceIdentifier } from './WhiteSpaceIdentifier';
import { PriceArchitectureVisualizer } from './PriceArchitectureVisualizer';
import { DiscountingAnalysis } from './DiscountingAnalysis';
import { TrendDemandSignals } from './TrendDemandSignals';

export const RangeBuildingTabs = () => {
  const [activeTab, setActiveTab] = useState('assortment-mix');

  // Mock data for retailers and categories
  const retailers = [
    { id: 'h&m', name: 'H&M (UK)' },
    { id: 'mango', name: 'Mango (UK)' },
    { id: 'monki', name: 'Monki (UK)' },
    { id: 'nakd', name: 'NA-KD (UK)' },
    { id: 'river_island', name: 'River Island (UK)' }
  ];

  const categories = [
    { id: 'jeans_skinny', name: 'Jeans > Skinny' },
    { id: 'jeans_slim', name: 'Jeans > Slim' },
    { id: 'jeans_straight', name: 'Jeans > Straight' },
    { id: 'tops_tshirts', name: 'Tops > T-Shirts' },
    { id: 'tops_blouses', name: 'Tops > Blouses' },
    { id: 'dresses_mini', name: 'Dresses > Mini' },
    { id: 'dresses_midi', name: 'Dresses > Midi' },
    { id: 'dresses_maxi', name: 'Dresses > Maxi' }
  ];

  const priceRanges = [
    { id: '5-10', name: '£5-10', min: 5, max: 10 },
    { id: '10-15', name: '£10-15', min: 10, max: 15 },
    { id: '15-20', name: '£15-20', min: 15, max: 20 },
    { id: '20-25', name: '£20-25', min: 20, max: 25 },
    { id: '25-30', name: '£25-30', min: 25, max: 30 },
    { id: '30-35', name: '£30-35', min: 30, max: 35 },
    { id: '35-40', name: '£35-40', min: 35, max: 40 },
    { id: '40-45', name: '£40-45', min: 40, max: 45 },
    { id: '45-50', name: '£45-50', min: 45, max: 50 },
    { id: '50-55', name: '£50-55', min: 50, max: 55 },
    { id: '55-60', name: '£55-60', min: 55, max: 60 },
    { id: '60-65', name: '£60-65', min: 60, max: 65 },
    { id: '65-70', name: '£65-70', min: 65, max: 70 }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-1">Range & Assortment Intelligence</h2>
        <p className="text-muted-foreground">
          Analyze your product range across competitors, categories, and price points
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid grid-cols-5 w-full">
          <TabsTrigger value="assortment-mix" className="flex items-center gap-2">
            <Grid2X2 size={16} />
            <span>Assortment Mix</span>
          </TabsTrigger>
          <TabsTrigger value="white-space" className="flex items-center gap-2">
            <Search size={16} />
            <span>White Space</span>
          </TabsTrigger>
          <TabsTrigger value="price-architecture" className="flex items-center gap-2">
            <BarChart3 size={16} />
            <span>Price Architecture</span>
          </TabsTrigger>
          <TabsTrigger value="discounting" className="flex items-center gap-2">
            <Share2 size={16} />
            <span>Discounting</span>
          </TabsTrigger>
          <TabsTrigger value="trends" className="flex items-center gap-2">
            <TrendingUp size={16} />
            <span>Trends</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="assortment-mix">
          <AssortmentMixExplorer 
            retailers={retailers} 
            categories={categories} 
            priceRanges={priceRanges} 
          />
        </TabsContent>

        <TabsContent value="white-space">
          <WhiteSpaceIdentifier 
            retailers={retailers} 
            categories={categories} 
            priceRanges={priceRanges} 
          />
        </TabsContent>

        <TabsContent value="price-architecture">
          <PriceArchitectureVisualizer 
            retailers={retailers} 
            categories={categories} 
            priceRanges={priceRanges} 
          />
        </TabsContent>

        <TabsContent value="discounting">
          <DiscountingAnalysis 
            retailers={retailers} 
            categories={categories} 
          />
        </TabsContent>

        <TabsContent value="trends">
          <TrendDemandSignals 
            retailers={retailers} 
            categories={categories} 
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};
