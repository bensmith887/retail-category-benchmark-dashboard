
import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription,
  CardFooter
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ChevronLeft, Download, Filter, RefreshCw, Search, SlidersHorizontal } from 'lucide-react';

interface PriceProductDrilldownProps {
  retailer: string;
  category: string;
  priceTier: string;
  priceRange: string;
  onBack: () => void;
}

export const PriceProductDrilldown: React.FC<PriceProductDrilldownProps> = ({
  retailer,
  category,
  priceTier,
  priceRange,
  onBack
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('pdpViews');
  
  // Generate mock product data
  const generateProductData = () => {
    const products = [];
    const productNames = [
      'Classic Cotton T-Shirt', 'Stretch Skinny Jeans', 'Oversized Hoodie',
      'Relaxed Fit Chinos', 'Slim Fit Oxford Shirt', 'Cropped Cardigan',
      'Linen Blend Shirt', 'Organic Cotton Blazer', 'Regular Fit Trousers',
      'Knitted Sweater Vest', 'Collared Shirt Dress', 'Pleated Mini Skirt',
      'Relaxed Joggers', 'Utility Cargo Pants', 'Puffer Jacket'
    ];
    
    const colors = ['Black', 'White', 'Navy', 'Grey', 'Beige', 'Blue', 'Green'];
    
    for (let i = 0; i < 20; i++) {
      const productName = productNames[Math.floor(Math.random() * productNames.length)];
      const color = colors[Math.floor(Math.random() * colors.length)];
      
      // Calculate price based on price tier
      let minPrice = 0, maxPrice = 0;
      if (priceTier === 'Budget') {
        minPrice = 5;
        maxPrice = 20;
      } else if (priceTier === 'Value') {
        minPrice = 20;
        maxPrice = 35;
      } else if (priceTier === 'Mid-Range') {
        minPrice = 35;
        maxPrice = 50;
      } else if (priceTier === 'Premium') {
        minPrice = 50;
        maxPrice = 65;
      } else {
        minPrice = 65;
        maxPrice = 150;
      }
      
      const price = Math.floor(Math.random() * (maxPrice - minPrice)) + minPrice;
      const pdpViews = Math.floor(Math.random() * 10000) + 500;
      const conversionRate = ((Math.random() * 4) + 1).toFixed(1);
      const inStock = Math.random() > 0.2;
      const discount = Math.random() > 0.7 ? Math.floor(Math.random() * 30) + 10 : 0;
      const trending = Math.random() > 0.8;
      
      products.push({
        id: `p${i + 1}`,
        name: `${color} ${productName}`,
        sku: `SKU-${Math.floor(Math.random() * 10000)}`,
        price,
        originalPrice: discount > 0 ? price + (price * discount / 100) : price,
        discount,
        pdpViews,
        conversionRate,
        inStock,
        trending
      });
    }
    
    return products;
  };
  
  const productData = generateProductData();
  
  // Filter products based on search query
  const filteredProducts = productData.filter(product => 
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.sku.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Sort products based on selected sort option
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price') {
      return a.price - b.price;
    } else if (sortBy === 'pdpViews') {
      return b.pdpViews - a.pdpViews;
    } else if (sortBy === 'conversionRate') {
      return parseFloat(b.conversionRate) - parseFloat(a.conversionRate);
    } else if (sortBy === 'discount') {
      return b.discount - a.discount;
    }
    return 0;
  });
  
  // Calculate metrics
  const totalProducts = productData.length;
  const avgPrice = Math.round(productData.reduce((sum, product) => sum + product.price, 0) / totalProducts);
  const avgDiscount = Math.round(productData.reduce((sum, product) => sum + product.discount, 0) / totalProducts);
  const totalViews = productData.reduce((sum, product) => sum + product.pdpViews, 0);
  
  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={onBack}
              className="mb-2 -ml-2 text-gray-500 hover:text-gray-900"
            >
              <ChevronLeft size={16} className="mr-1" /> Back to Price Architecture
            </Button>
            <CardTitle>Product Drill-Down: {priceTier} Tier</CardTitle>
            <CardDescription>
              {category} products from {retailer} in price range {priceRange}
            </CardDescription>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Download size={16} className="mr-1" /> Export
            </Button>
            <Button variant="outline" size="sm">
              <RefreshCw size={16} className="mr-1" /> Refresh
            </Button>
          </div>
        </div>
        
        {/* Summary metrics */}
        <div className="grid grid-cols-4 gap-4 mt-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="text-sm text-gray-500">Total Products</div>
            <div className="text-2xl font-semibold">{totalProducts}</div>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="text-sm text-gray-500">Average Price</div>
            <div className="text-2xl font-semibold">£{avgPrice}</div>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="text-sm text-gray-500">Average Discount</div>
            <div className="text-2xl font-semibold">{avgDiscount}%</div>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="text-sm text-gray-500">Total PDP Views</div>
            <div className="text-2xl font-semibold">{totalViews.toLocaleString()}</div>
          </div>
        </div>
        
        {/* Search and filters */}
        <div className="flex flex-wrap items-center gap-4 mt-4">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Search products or SKUs..." 
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
            <SlidersHorizontal size={16} className="text-gray-500" />
            <span className="text-sm">Sort by:</span>
            <Select 
              value={sortBy} 
              onValueChange={setSortBy}
            >
              <SelectTrigger className="w-40">
                <SelectValue placeholder="PDP Views" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pdpViews">PDP Views</SelectItem>
                <SelectItem value="price">Price</SelectItem>
                <SelectItem value="conversionRate">Conversion</SelectItem>
                <SelectItem value="discount">Discount</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>SKU</TableHead>
                <TableHead className="text-right">Price</TableHead>
                <TableHead className="text-right">Discount</TableHead>
                <TableHead className="text-right">PDP Views</TableHead>
                <TableHead className="text-right">Conv. Rate</TableHead>
                <TableHead className="text-center">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedProducts.map(product => (
                <TableRow key={product.id}>
                  <TableCell className="font-medium">
                    {product.name}
                    {product.trending && (
                      <Badge className="ml-2 bg-blue-500">Trending</Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-gray-500">
                    {product.sku}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex flex-col items-end">
                      <span>£{product.price.toFixed(2)}</span>
                      {product.discount > 0 && (
                        <span className="text-sm text-gray-500 line-through">
                          £{product.originalPrice.toFixed(2)}
                        </span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    {product.discount > 0 ? (
                      <Badge variant="outline" className="text-red-600 border-red-200 bg-red-50">
                        {product.discount}% off
                      </Badge>
                    ) : (
                      <span className="text-gray-500">-</span>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    {product.pdpViews.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-right">
                    {product.conversionRate}%
                  </TableCell>
                  <TableCell className="text-center">
                    {product.inStock ? (
                      <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50">
                        In Stock
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="text-amber-600 border-amber-200 bg-amber-50">
                        Low Stock
                      </Badge>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
      
      <CardFooter className="flex justify-between">
        <div className="text-sm text-gray-500">
          Showing {sortedProducts.length} of {productData.length} products
        </div>
        {searchQuery && (
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => setSearchQuery('')}
          >
            Clear filters
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};
