
import React from "react";

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
  return (
    <div className="border rounded-lg bg-white mt-8 mb-4 shadow-md animate-fade-in">
      <div className="flex items-center justify-between px-4 py-2 border-b bg-muted-100 rounded-t-lg">
        <div>
          <span className="text-base font-semibold text-dashboard-primary">Product Details</span>
          <span className="ml-3 text-xs text-muted-foreground">
            ({retailer} / {category} / {priceRange})
          </span>
        </div>
        {onClose && (
          <button
            className="text-xs px-3 py-1 rounded bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium ml-2"
            onClick={onClose}
            aria-label="Close product detail"
          >
            Close
          </button>
        )}
      </div>
      <div className="overflow-x-auto" style={{ maxHeight: 440 }}>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-muted">
            <tr>
              <th className="px-4 py-2 text-left text-xs font-bold text-gray-700">Image</th>
              <th className="px-4 py-2 text-left text-xs font-bold text-gray-700">Product</th>
              <th className="px-4 py-2 text-xs font-bold text-gray-700">Price</th>
              <th className="px-4 py-2 text-xs font-bold text-gray-700">PDV%</th>
              <th className="px-4 py-2 text-xs font-bold text-gray-700">Views</th>
              <th className="px-4 py-2 text-xs font-bold text-gray-700">MoM%</th>
              <th className="px-4 py-2 text-xs font-bold text-gray-700">YoY%</th>
            </tr>
          </thead>
          <tbody>
            {products.slice(0, 20).map((p) => (
              <tr key={p.id} className="hover:bg-muted/50 transition">
                <td className="px-4 py-1">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-10 h-10 object-cover rounded border"
                  />
                </td>
                <td className="px-4 py-1 text-xs font-medium text-gray-900">{p.name}</td>
                <td className="px-4 py-1 text-xs text-center">£{p.price.toFixed(2)}</td>
                <td className="px-4 py-1 text-xs text-center">
                  <span className="inline-block px-2 rounded bg-purple-100 text-purple-700">
                    {p.pdvPercent.toFixed(1)}%
                  </span>
                </td>
                <td className="px-4 py-1 text-xs text-center">{p.views.toLocaleString()}</td>
                <td className="px-4 py-1 text-xs text-center">
                  <span className={p.momChange >= 0 ? "text-green-600" : "text-red-500"}>
                    {p.momChange >= 0 ? "+" : ""}
                    {p.momChange.toFixed(1)}%
                  </span>
                </td>
                <td className="px-4 py-1 text-xs text-center">
                  <span className={p.yoyChange >= 0 ? "text-green-600" : "text-red-500"}>
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
      {products.length > 20 && (
        <div className="px-4 pb-3 text-xs text-muted-foreground">Showing top 20 of {products.length} products</div>
      )}
    </div>
  );
};

export default ProductDetailTable;
