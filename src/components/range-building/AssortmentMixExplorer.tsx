import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { AssortmentControls } from './AssortmentControls';
import { AssortmentTable } from './AssortmentTable';
import { useAssortmentAnalysis } from './useAssortmentData';
import ProductDetailTable from './ProductDetailTable';
import CompetitorProductTables from './CompetitorProductTables';

interface AssortmentMixExplorerProps {
  retailers: { id: string; name: string }[];
  categories: { id: string; name: string }[];
  priceRanges: { id: string; name: string; min: number; max: number }[];
}

export const AssortmentMixExplorer: React.FC<AssortmentMixExplorerProps> = ({ 
  retailers, 
  categories,
  priceRanges: defaultPriceRanges 
}) => {
  // State management
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    categories.slice(0, 3).map(cat => cat.id)
  );
  const [displayMetric, setDisplayMetric] = useState<'range-percentage' | 'pdv-percentage'>('range-percentage');
  const [minPrice, setMinPrice] = useState<string>("10");
  const [maxPrice, setMaxPrice] = useState<string>("100");
  const [priceInterval, setPriceInterval] = useState<string>("10");
  const [generatedPriceRanges, setGeneratedPriceRanges] = useState<typeof defaultPriceRanges>([]);
  const [dateRange, setDateRange] = useState<string>('3');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [showTotalRange, setShowTotalRange] = useState(false);
  const [selectedRetailers, setSelectedRetailers] = useState<string[]>(retailers.map(r => r.id));
  const [selectedCell, setSelectedCell] = useState<{
    retailerId: string;
    categoryId: string;
    priceRangeId: string;
  } | null>(null);

  // Custom hooks
  const { assortmentData, isLoading, hasError } = useAssortmentAnalysis(
    selectedRetailers,
    selectedCategories,
    minPrice,
    maxPrice
  );

  // Helper functions
  const calculateRetailerTotals = (retailerId: string) => {
    const totals: Record<string, number> = {
      count: 0,
      pdvs: 0
    };
    
    const priceRangeTotals: Record<string, { count: number; pdvs: number }> = {};
    
    defaultPriceRanges.forEach(range => {
      priceRangeTotals[range.id] = { count: 0, pdvs: 0 };
    });

    if (assortmentData[retailerId]) {
      selectedCategories.forEach(catId => {
        if (assortmentData[retailerId][catId]) {
          Object.entries(assortmentData[retailerId][catId]).forEach(([priceRangeId, data]) => {
            totals.count += data.count;
            totals.pdvs += data.pdvs;
            priceRangeTotals[priceRangeId].count += data.count;
            priceRangeTotals[priceRangeId].pdvs += data.pdvs;
          });
        }
      });
    }

    const normalizedTotals: Record<string, { count: number; pdvs: number; percentage: number; pdvPercentage?: number; }> = {};
    Object.entries(priceRangeTotals).forEach(([priceRangeId, data]) => {
      normalizedTotals[priceRangeId] = {
        count: data.count,
        pdvs: data.pdvs,
        percentage: totals.count > 0 ? (data.count / totals.count) * 100 : 0,
        pdvPercentage: totals.pdvs > 0 ? (data.pdvs / totals.pdvs) * 100 : 0
      };
    });

    return normalizedTotals;
  };

  const getDemoProducts = (retailerId: string, categoryId: string, priceRangeId: string) => {
    const demoImages = [
      "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?auto=format&fit=facearea&w=64&h=64&q=80",
      "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?auto=format&fit=facearea&w=64&h=64&q=80",
      "https://images.unsplash.com/photo-1501286353178-1ec881214838?auto=format&fit=facearea&w=64&h=64&q=80",
    ];
    const base = retailerId.length + categoryId.length + priceRangeId.length;
    return Array.from({ length: 4 + (base % 3) }).map((_, ix) => ({
      id: `p_${retailerId}_${categoryId}_${priceRangeId}_${ix}`,
      name: "Demo Product " + (ix + 1),
      image: demoImages[(ix + base) % demoImages.length],
      price: 14.99 + (ix * 3) + ((base * 7 + ix * 4) % 5),
      pdvPercent: 5 + ((base + ix * 3) % 25),
      views: 100 + ((base * (ix + 1)) % 3200),
      momChange: (ix % 2 === 0 ? 1 : -1) * ((base * ix) % 20),
      yoyChange: ((base + ix * 2) % 2 === 0 ? 1 : -1) * ((base * ix * 2) % 14),
    }));
  };

  // Event handlers
  const handleCellClick = (retailerId: string, categoryId: string, priceRangeId: string) => {
    setSelectedCell({ retailerId, categoryId, priceRangeId });
    setTimeout(() => {
      const el = document.getElementById("product-detail-table-anchor");
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 175);
  };

  const handleCloseProductTable = () => setSelectedCell(null);

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Assortment Mix Explorer</CardTitle>
        <CardDescription className="text-xs">
          Compare SKU distribution across retailers, categories, and price points
        </CardDescription>
        
        <AssortmentControls
          retailers={retailers}
          categories={categories}
          selectedRetailers={selectedRetailers}
          selectedCategories={selectedCategories}
          displayMetric={displayMetric}
          minPrice={minPrice}
          maxPrice={maxPrice}
          priceInterval={priceInterval}
          dateRange={dateRange}
          searchTerm={searchTerm}
          showTotalRange={showTotalRange}
          onRetailerToggle={(id) => setSelectedRetailers(prev =>
            prev.includes(id) ? prev.filter(r => r !== id) : [...prev, id]
          )}
          onAllRetailersToggle={() => setSelectedRetailers(
            selectedRetailers.length === retailers.length ? [] : retailers.map(r => r.id)
          )}
          onCategoryToggle={(id) => setSelectedCategories(prev =>
            prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
          )}
          onDisplayMetricChange={setDisplayMetric}
          onMinPriceChange={setMinPrice}
          onMaxPriceChange={setMaxPrice}
          onPriceIntervalChange={setPriceInterval}
          onDateRangeChange={setDateRange}
          onSearchTermChange={setSearchTerm}
          onShowTotalRangeChange={setShowTotalRange}
        />
      </CardHeader>
      
      <CardContent className="px-0 pb-0">
        <AssortmentTable
          retailers={retailers}
          categories={categories}
          selectedRetailers={selectedRetailers}
          selectedCategories={selectedCategories}
          priceRanges={defaultPriceRanges}
          assortmentData={assortmentData}
          displayMetric={displayMetric}
          showTotalRange={showTotalRange}
          onCellClick={handleCellClick}
          selectedCell={selectedCell}
          calculateRetailerTotals={calculateRetailerTotals}
        />
        
        <div id="product-detail-table-anchor" />
        {selectedCell && (
          <div className="relative">
            <Button
              variant="outline"
              size="icon"
              className="absolute right-2 top-2 z-10"
              onClick={handleCloseProductTable}
              aria-label="Clear selection"
            >
              <X className="w-4 h-4" />
            </Button>
            <ProductDetailTable
              retailer={retailers.find(r => r.id === selectedCell.retailerId)?.name || selectedCell.retailerId}
              category={selectedCell.categoryId === "TOTAL"
                ? "Total Range"
                : categories.find(c => c.id === selectedCell.categoryId)?.name || selectedCell.categoryId
              }
              priceRange={defaultPriceRanges.find(p => p.id === selectedCell.priceRangeId)?.name || selectedCell.priceRangeId}
              products={getDemoProducts(selectedCell.retailerId, selectedCell.categoryId, selectedCell.priceRangeId)}
              onClose={handleCloseProductTable}
            />
            <CompetitorProductTables
              allRetailers={retailers}
              selectedRetailerId={selectedCell.retailerId}
              selectedCategory={selectedCell.categoryId}
              selectedCategoryName={
                selectedCell.categoryId === "TOTAL"
                  ? "Total Range"
                  : categories.find(c => c.id === selectedCell.categoryId)?.name || selectedCell.categoryId
              }
              selectedPriceRange={selectedCell.priceRangeId}
              selectedPriceRangeName={defaultPriceRanges.find(p => p.id === selectedCell.priceRangeId)?.name || selectedCell.priceRangeId}
              onClose={() => {}}
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
};
