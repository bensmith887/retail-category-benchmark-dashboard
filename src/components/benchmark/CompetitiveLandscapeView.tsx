
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CategoryTreeView } from "./CategoryTreeView";
import { AssortmentDepthView } from "./AssortmentDepthView";
import { AssortmentBreadthView } from "./AssortmentBreadthView";
import { PriceTiersView } from "./PriceTiersView";
import { CompetitorFilters } from "./CompetitorFilters";

const CompetitiveLandscapeView = () => {
  const [selectedCompetitors, setSelectedCompetitors] = useState<string[]>(["Amazon", "Walmart", "Target"]);
  const [selectedCategory, setSelectedCategory] = useState<string>("All Categories");

  return (
    <div className="space-y-4">
      <CompetitorFilters 
        selectedCompetitors={selectedCompetitors}
        setSelectedCompetitors={setSelectedCompetitors}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      
      <Tabs defaultValue="category-tree" className="w-full">
        <TabsList className="w-full max-w-md grid grid-cols-4">
          <TabsTrigger value="category-tree">Category Tree</TabsTrigger>
          <TabsTrigger value="assortment-depth">Assortment Depth</TabsTrigger>
          <TabsTrigger value="assortment-breadth">Assortment Breadth</TabsTrigger>
          <TabsTrigger value="price-tiers">Price Tiers</TabsTrigger>
        </TabsList>
        
        <TabsContent value="category-tree" className="mt-4">
          <CategoryTreeView 
            selectedCompetitors={selectedCompetitors}
            selectedCategory={selectedCategory}
          />
        </TabsContent>
        
        <TabsContent value="assortment-depth" className="mt-4">
          <AssortmentDepthView 
            selectedCompetitors={selectedCompetitors}
            selectedCategory={selectedCategory}
          />
        </TabsContent>
        
        <TabsContent value="assortment-breadth" className="mt-4">
          <AssortmentBreadthView 
            selectedCompetitors={selectedCompetitors}
            selectedCategory={selectedCategory}
          />
        </TabsContent>
        
        <TabsContent value="price-tiers" className="mt-4">
          <PriceTiersView 
            selectedCompetitors={selectedCompetitors}
            selectedCategory={selectedCategory}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CompetitiveLandscapeView;
