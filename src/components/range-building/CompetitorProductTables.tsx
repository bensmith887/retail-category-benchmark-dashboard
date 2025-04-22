
import React from "react";
import ProductDetailTable from "./ProductDetailTable";

// Fashion-related demo product images (think H&M style)
const demoImages = [
  // Unsplash sample people/fashion photos, square crop, high contrast
  "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=facearea&w=64&h=64&q=80", // woman with white shirt
  "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=facearea&w=64&h=64&q=80", // man with jacket
  "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=facearea&w=64&h=64&q=80", // young woman in turtleneck
  "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=facearea&w=64&h=64&q=80", // woman in black
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=facearea&w=64&h=64&q=80", // woman with curly hair
  "https://images.unsplash.com/photo-1524253482453-3fed8d2fe12b?auto=format&fit=facearea&w=64&h=64&q=80", // man with blue shirt
  "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=facearea&w=64&h=64&q=80", // man with patterned shirt
  "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=facearea&w=64&h=64&q=80", // woman fashion, white background
  "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=facearea&w=64&h=64&q=80", // man portrait
];

const getDemoProducts = (retailer: string, category: string, priceRange: string) => {
  return Array.from({ length: 50 }).map((_, ix) => ({
    id: `p_${retailer}_${category}_${priceRange}_${ix}`,
    name: "Demo Product " + (ix + 1),
    image: demoImages[(ix + retailer.length + category.length + priceRange.length) % demoImages.length],
    price: 12.99 + (ix * 2) % 40 + ((ix * 3) % 5),
    pdvPercent: 5 + ((ix * 7) % 25),
    views: 100 + ((ix + 1) ** 2) % 3500,
    momChange: (ix % 2 === 0 ? 1 : -1) * ((ix * 4) % 20),
    yoyChange: ((ix * 2) % 3 === 0 ? 1 : -1) * ((ix * 3) % 18),
  }));
};

interface CompetitorProductTablesProps {
  allRetailers: { id: string; name: string }[];
  selectedRetailerId: string;
  selectedCategory: string;
  selectedCategoryName: string;
  selectedPriceRange: string;
  selectedPriceRangeName: string;
  onClose: () => void;
}

const CompetitorProductTables: React.FC<CompetitorProductTablesProps> = ({
  allRetailers,
  selectedRetailerId,
  selectedCategory,
  selectedCategoryName,
  selectedPriceRange,
  selectedPriceRangeName,
  onClose,
}) => {
  // Show a table for each retailer except the chosen one
  return (
    <div className="mt-8 space-y-8">
      {allRetailers
        .filter((r) => r.id !== selectedRetailerId)
        .map((retailer) => (
          <div
            key={retailer.id}
            className="border rounded-lg bg-white shadow-md animate-fade-in"
          >
            <div className="flex items-center justify-between px-4 py-2 border-b bg-muted-100 rounded-t-lg">
              <div>
                <span className="text-base font-semibold text-dashboard-primary">
                  Competitor: {retailer.name}
                </span>
                <span className="ml-3 text-xs text-muted-foreground">
                  ({selectedCategoryName} / {selectedPriceRangeName})
                </span>
              </div>
            </div>
            <div className="overflow-auto" style={{ maxHeight: "480px" }}>
              <ProductDetailTable
                products={getDemoProducts(retailer.id, selectedCategory, selectedPriceRange).slice(0, 20)}
                retailer={retailer.name}
                category={selectedCategoryName}
                priceRange={selectedPriceRangeName}
                // Hide close button for competitor tables
                onClose={() => {}}
              />
            </div>
            <div className="px-4 pb-3 text-xs text-muted-foreground">Showing top 20 of 50 products</div>
          </div>
        ))}
    </div>
  );
};

export default CompetitorProductTables;
