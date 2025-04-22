
import React from "react";
import ProductDetailTable from "./ProductDetailTable";

// Fashion-related demo product images (H&M style clothing and shoes)
const demoImages = [
  // Clothing images
  "https://images.unsplash.com/photo-1525850652251-22f861a5a34b?auto=format&fit=facearea&w=64&h=64&q=80", // white t-shirt
  "https://images.unsplash.com/photo-1618932260643-f7051950ae26?auto=format&fit=facearea&w=64&h=64&q=80", // casual denim jacket
  "https://images.unsplash.com/photo-1576566588001-990e4f085e1d?auto=format&fit=facearea&w=64&h=64&q=80", // stylish sweater
  "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=facearea&w=64&h=64&q=80", // blue jeans
  "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=facearea&w=64&h=64&q=80", // casual outfit
  
  // Shoe images
  "https://images.unsplash.com/photo-1556048219-bb3dd1ae9c5a?auto=format&fit=facearea&w=64&h=64&q=80", // white sneakers
  "https://images.unsplash.com/photo-1519415943487-7f1033a0e4f7?auto=format&fit=facearea&w=64&h=64&q=80", // running shoes
  "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?auto=format&fit=facearea&w=64&h=64&q=80", // casual leather shoes
  "https://images.unsplash.com/photo-1542291026-7eec264c27c4?auto=format&fit=facearea&w=64&h=64&q=80", // colorful athletic shoes
  "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=facearea&w=64&h=64&q=80", // trendy sneakers
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
