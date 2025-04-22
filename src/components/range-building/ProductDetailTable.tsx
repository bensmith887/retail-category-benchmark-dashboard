
import React, { useState } from "react";
import { Plus, X } from "lucide-react";
import { Button } from "../ui/button";

interface ProductDetail {
  id: string;
  name: string;
  image: string;
  price: number;
  pdvPercent: number;
  views: number;
  momChange: number;
  yoyChange: number;
}

interface ProductDetailTableProps {
  products: ProductDetail[];
  onClose: () => void;
  retailer: string;
  category: string;
  priceRange: string;
}

export const ProductDetailTable: React.FC<ProductDetailTableProps> = ({
  products,
  onClose,
  retailer,
  category,
  priceRange,
}) => {
  const [expanded, setExpanded] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);

  // Show top 5 by default, or top 50 when expanded
  const shownProducts = expanded
    ? products.slice(0, 50)
    : products.slice(0, 5);

  const handleRowClick = (id: string) => {
    setSelectedProductId(id);
  };

  const handleClear = () => {
    setSelectedProductId(null);
  };

  return (
    <div className="border rounded-lg bg-white mt-8 mb-4 shadow-md animate-fade-in">
      <div className="flex items-center justify-between px-4 py-2 border-b bg-muted-100 rounded-t-lg">
        <div>
          <span className="text-base font-semibold text-[#5840bb]">Product Details</span>
          <span className="ml-3 text-xs text-muted-foreground">
            ({retailer} / {category} / {priceRange})
          </span>
        </div>
        <div className="flex items-center gap-2">
          {selectedProductId && (
            <Button
              variant="outline"
              size="sm"
              className="text-xs px-3 py-1 h-8"
              onClick={handleClear}
              aria-label="Clear selection"
            >
              Clear
            </Button>
          )}
          {onClose && (
            <Button
              variant="outline"
              size="icon"
              className="ml-1 rounded-lg border h-8 w-8 p-0"
              onClick={onClose}
              aria-label="Close product detail"
            >
              <X className="w-5 h-5" />
            </Button>
          )}
        </div>
      </div>
      <div className="overflow-x-auto" style={{ maxHeight: 440 }}>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-muted">
            <tr>
              <th className="px-4 py-2 text-left text-xs font-bold text-gray-700 bg-[#f6f7fc]">Image</th>
              <th className="px-4 py-2 text-left text-xs font-bold text-gray-700 bg-[#f6f7fc]">Product</th>
              <th className="px-4 py-2 text-xs font-bold text-gray-700 bg-[#f6f7fc]">Price</th>
              <th className="px-4 py-2 text-xs font-bold text-gray-700 bg-[#f6f7fc]">PDV%</th>
              <th className="px-4 py-2 text-xs font-bold text-gray-700 bg-[#f6f7fc]">Views</th>
              <th className="px-4 py-2 text-xs font-bold text-gray-700 bg-[#f6f7fc]">MoM%</th>
              <th className="px-4 py-2 text-xs font-bold text-gray-700 bg-[#f6f7fc]">YoY%</th>
            </tr>
          </thead>
          <tbody>
            {shownProducts.map((p) => (
              <tr
                key={p.id}
                onClick={() => handleRowClick(p.id)}
                className={`
                  cursor-pointer transition 
                  ${selectedProductId === p.id
                    ? "bg-[#f1f0fb] ring-2 ring-[#9b87f5] border-l-4 border-[#9b87f5]"
                    : "hover:bg-muted/50"}
                  `}
                style={{ fontWeight: selectedProductId === p.id ? 600 : undefined }}
              >
                <td className="px-4 py-2">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-11 h-11 object-cover rounded border"
                  />
                </td>
                <td className="px-4 py-2 text-sm font-medium text-gray-900">
                  {p.name}
                </td>
                <td className="px-4 py-2 text-sm text-center font-semibold text-[#25293c]">
                  £{p.price.toFixed(2)}
                </td>
                <td className="px-4 py-2 text-sm text-center">
                  <span className="inline-block px-2 py-0.5 rounded bg-[#ede7fa] text-[#6E59A5] font-semibold">
                    {p.pdvPercent.toFixed(1)}%
                  </span>
                </td>
                <td className="px-4 py-2 text-sm text-center text-[#25293c]">{p.views.toLocaleString()}</td>
                <td className="px-4 py-2 text-sm text-center">
                  <span className={p.momChange >= 0 ? "text-green-600 font-semibold" : "text-red-500 font-semibold"}>
                    {p.momChange >= 0 ? "+" : ""}
                    {p.momChange.toFixed(1)}%
                  </span>
                </td>
                <td className="px-4 py-2 text-sm text-center">
                  <span className={p.yoyChange >= 0 ? "text-green-600 font-semibold" : "text-red-500 font-semibold"}>
                    {p.yoyChange >= 0 ? "+" : ""}
                    {p.yoyChange.toFixed(1)}%
                  </span>
                </td>
              </tr>
            ))}
            {products.length === 0 && (
              <tr>
                <td colSpan={7} className="px-4 py-6 text-center text-gray-400 text-xs">No data</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {/* Show + button if more than 5 products */}
      {products.length > 5 && !expanded && (
        <div className="flex items-center justify-center gap-2 px-4 py-2">
          <Button variant="outline" size="sm" onClick={() => setExpanded(true)}>
            <Plus className="w-4 h-4 mr-1" />
            Show top 50
          </Button>
        </div>
      )}
      {/* Show current product display count info */}
      {products.length > 5 && expanded && (
        <div className="px-4 pb-3 text-xs text-muted-foreground text-center">Showing top {Math.min(50, products.length)} of {products.length} products</div>
      )}
      {products.length > 5 && !expanded && (
        <div className="px-4 pb-3 text-xs text-muted-foreground text-center">Showing top 5 of {products.length} products</div>
      )}
    </div>
  );
};

export default ProductDetailTable;

