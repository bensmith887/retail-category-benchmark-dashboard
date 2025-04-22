
import React from "react";
import ProductDetailTable from "./ProductDetailTable";

// Simulate 50 demo products for a retailer/category/price
const getDemoProducts = (retailer: string, category: string, priceRange: string) => {
  const demoImages = [
    "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?auto=format&fit=facearea&w=64&h=64&q=80",
    "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?auto=format&fit=facearea&w=64&h=64&q=80",
    "https://images.unsplash.com/photo-1501286353178-1ec881214838?auto=format&fit=facearea&w=64&h=64&q=80",
    "/public/lovable-uploads/5acb37f7-ec65-44ef-bc8a-fe9ced0ae03a.png",
  ];
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
