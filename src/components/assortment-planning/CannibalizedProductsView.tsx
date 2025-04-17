
import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Search, ArrowUpDown, Info, ExternalLink } from 'lucide-react';

interface CannibalizedProductsViewProps {
  categories: { id: string; name: string }[];
}

export const CannibalizedProductsView: React.FC<CannibalizedProductsViewProps> = ({ categories }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showDetails, setShowDetails] = useState<string | null>(null);
  
  // Generate mock cannibalized products data
  const generateCannibalizedProducts = (categories) => {
    const products = [];
    
    for (let i = 0; i < categories.length; i++) {
      // Create 1-3 cannibalization groups per category
      const numGroups = Math.floor(Math.random() * 3) + 1;
      
      for (let j = 0; j < numGroups; j++) {
        const cannibalIndex = products.length;
        const baseProduct = {
          id: `prod-${cannibalIndex}`,
          name: `${categories[i].name} Product ${j+1}`,
          category: categories[i].name,
          price: Math.round(Math.random() * 200) + 20,
          sales: Math.round(Math.random() * 500) + 100,
          margin: Math.round(Math.random() * 20) + 10,
          cannibalScore: Math.round(Math.random() * 100),
          similarProducts: []
        };
        
        // Add 1-3 similar products that are being cannibalized
        const numSimilar = Math.floor(Math.random() * 3) + 1;
        
        for (let k = 0; k < numSimilar; k++) {
          baseProduct.similarProducts.push({
            id: `prod-${cannibalIndex}-sim-${k}`,
            name: `${categories[i].name} Product ${j+1} ${['Plus', 'Pro', 'Max', 'Lite'][k % 4]}`,
            category: categories[i].name,
            price: baseProduct.price + (Math.random() > 0.5 ? 1 : -1) * (Math.round(Math.random() * 50)),
            sales: baseProduct.sales * (Math.random() * 0.8 + 0.2),
            margin: baseProduct.margin + (Math.random() > 0.5 ? 1 : -1) * (Math.round(Math.random() * 5)),
            overlapPercentage: Math.round(Math.random() * 50) + 50,
          });
        }
        
        products.push(baseProduct);
      }
    }
    
    return products;
  };

  const cannibalizedProducts = generateCannibalizedProducts(categories);
  
  // Filter products based on search term
  const filteredProducts = cannibalizedProducts.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Sort products by cannibalization score (highest first)
  const sortedProducts = [...filteredProducts].sort((a, b) => b.cannibalScore - a.cannibalScore);
  
  const getCannibalScoreClass = (score) => {
    if (score >= 80) return "bg-red-500";
    if (score >= 50) return "bg-orange-500";
    if (score >= 30) return "bg-yellow-500";
    return "bg-green-500";
  };
  
  const toggleDetails = (id: string) => {
    if (showDetails === id) {
      setShowDetails(null);
    } else {
      setShowDetails(id);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex space-x-2">
        <div className="flex-1">
          <Label htmlFor="search-cannibalized">Search Products</Label>
          <div className="relative mt-1">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              id="search-cannibalized"
              placeholder="Search by product or category..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>
      
      <div className="bg-muted/30 rounded-md p-4 flex items-start gap-2">
        <Info size={16} className="text-blue-500 mt-0.5" />
        <div className="text-sm">
          <p className="font-medium">About Cannibalization Analysis</p>
          <p className="text-muted-foreground">
            This analysis identifies products with similar features, price points, or target audiences that may be 
            competing with each other, potentially diluting your overall sales and margins.
          </p>
        </div>
      </div>
      
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[300px]">Product</TableHead>
            <TableHead>Category</TableHead>
            <TableHead className="text-right">Price</TableHead>
            <TableHead className="text-right">Sales Units</TableHead>
            <TableHead className="text-right">Margin</TableHead>
            <TableHead>
              <div className="flex items-center">
                <span>Cannibalization</span>
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </div>
            </TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedProducts.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-4 text-muted-foreground">
                No cannibalization detected based on your criteria
              </TableCell>
            </TableRow>
          ) : (
            sortedProducts.map((product) => (
              <React.Fragment key={product.id}>
                <TableRow className="hover:bg-muted/50">
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell className="text-right">${product.price}</TableCell>
                  <TableCell className="text-right">{product.sales}</TableCell>
                  <TableCell className="text-right">{product.margin}%</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Progress 
                        value={product.cannibalScore} 
                        className="w-[60px] h-2" 
                        indicatorClassName={getCannibalScoreClass(product.cannibalScore)} 
                      />
                      <span className="text-sm">{product.cannibalScore}%</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => toggleDetails(product.id)}
                    >
                      {showDetails === product.id ? "Hide" : "Details"}
                    </Button>
                  </TableCell>
                </TableRow>
                
                {showDetails === product.id && (
                  <TableRow>
                    <TableCell colSpan={7} className="bg-muted/30 p-0">
                      <Card className="m-2 border-l-4" style={{ borderLeftColor: 
                        getCannibalScoreClass(product.cannibalScore) }}>
                        <CardContent className="p-4">
                          <h4 className="font-medium mb-2">Similar Products ({product.similarProducts.length})</h4>
                          
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>Similar Product</TableHead>
                                <TableHead className="text-right">Price</TableHead>
                                <TableHead className="text-right">Sales Units</TableHead>
                                <TableHead className="text-right">Margin</TableHead>
                                <TableHead className="text-right">Feature Overlap</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {product.similarProducts.map((similar) => (
                                <TableRow key={similar.id}>
                                  <TableCell>{similar.name}</TableCell>
                                  <TableCell className="text-right">${similar.price}</TableCell>
                                  <TableCell className="text-right">{Math.round(similar.sales)}</TableCell>
                                  <TableCell className="text-right">{similar.margin}%</TableCell>
                                  <TableCell className="text-right">
                                    <div className="flex items-center justify-end gap-2">
                                      <Progress 
                                        value={similar.overlapPercentage} 
                                        className="w-[60px] h-2" 
                                        indicatorClassName={similar.overlapPercentage > 75 ? "bg-red-500" : "bg-orange-500"} 
                                      />
                                      <span className="text-sm">{similar.overlapPercentage}%</span>
                                    </div>
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                          
                          <div className="mt-4 flex justify-between items-center">
                            <div>
                              <Badge variant="outline" className="mr-2">
                                {product.similarProducts.length} Similar Products
                              </Badge>
                              <Badge variant="outline" className={
                                product.cannibalScore > 70 ? "text-red-500 border-red-200" : 
                                product.cannibalScore > 40 ? "text-orange-500 border-orange-200" : 
                                "text-green-500 border-green-200"
                              }>
                                {product.cannibalScore > 70 ? "High Cannibalization" : 
                                 product.cannibalScore > 40 ? "Medium Cannibalization" : 
                                 "Low Cannibalization"}
                              </Badge>
                            </div>
                            <Button size="sm" variant="outline" className="flex items-center gap-1">
                              <ExternalLink size={14} />
                              <span>View Recommendations</span>
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </TableCell>
                  </TableRow>
                )}
              </React.Fragment>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};
