
import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CheckCircle2, Search, Star, TrendingUp, TrendingDown, ExternalLink } from 'lucide-react';

interface ExclusivityTrackerProps {
  competitors: { id: string; name: string }[];
  categories: { id: string; name: string }[];
}

export const ExclusivityTracker: React.FC<ExclusivityTrackerProps> = ({ competitors, categories }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [exclusivityType, setExclusivityType] = useState('all');
  const [expandedProduct, setExpandedProduct] = useState<string | null>(null);
  
  // Generate mock exclusivity data
  const generateExclusivityData = (competitors, categories) => {
    const exclusiveProducts = [];
    
    // Generate "Your" exclusive products
    categories.forEach(category => {
      const numProducts = Math.floor(Math.random() * 5) + 1;
      
      for (let i = 0; i < numProducts; i++) {
        const marketShare = Math.round(Math.random() * 30) + 5;
        const growthRate = Math.round(Math.random() * 40) - 10;
        
        exclusiveProducts.push({
          id: `your-${category.id}-${i}`,
          name: `${category.name} Exclusive ${i+1}`,
          category: category.name,
          owner: 'Your Brand',
          type: 'yours',
          marketShare: marketShare,
          growthRate: growthRate,
          exclusivityScore: Math.round(Math.random() * 100),
          launchDate: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000),
          competitiveAdvantage: ['Price Point', 'Feature Set', 'Quality', 'Brand Value'][Math.floor(Math.random() * 4)],
          potentialThreat: Math.random() > 0.7
        });
      }
    });
    
    // Generate competitor exclusive products
    competitors.filter(comp => comp.name !== 'Your Brand').forEach(competitor => {
      categories.forEach(category => {
        if (Math.random() > 0.5) { // Only some categories have competitor exclusives
          const numProducts = Math.floor(Math.random() * 3) + 1;
          
          for (let i = 0; i < numProducts; i++) {
            const marketShare = Math.round(Math.random() * 20) + 2;
            const growthRate = Math.round(Math.random() * 40) - 5;
            
            exclusiveProducts.push({
              id: `${competitor.id}-${category.id}-${i}`,
              name: `${competitor.name} ${category.name} Exclusive ${i+1}`,
              category: category.name,
              owner: competitor.name,
              type: 'competitor',
              marketShare: marketShare,
              growthRate: growthRate,
              exclusivityScore: Math.round(Math.random() * 100),
              launchDate: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000),
              opportunityScore: Math.round(Math.random() * 100),
              entryBarrier: Math.round(Math.random() * 100)
            });
          }
        }
      });
    });
    
    return exclusiveProducts;
  };
  
  const exclusiveProducts = generateExclusivityData(competitors, categories);
  
  // Filter products based on search and exclusivity type
  const filteredProducts = exclusiveProducts.filter(product => {
    const matchesSearch = 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.owner.toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesType = 
      exclusivityType === 'all' || 
      (exclusivityType === 'yours' && product.type === 'yours') ||
      (exclusivityType === 'competitor' && product.type === 'competitor');
      
    return matchesSearch && matchesType;
  });
  
  // Sort products - yours first, then by exclusivity score
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (a.type !== b.type) {
      return a.type === 'yours' ? -1 : 1;
    }
    return b.exclusivityScore - a.exclusivityScore;
  });
  
  const toggleExpand = (id: string) => {
    if (expandedProduct === id) {
      setExpandedProduct(null);
    } else {
      setExpandedProduct(id);
    }
  };
  
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };
  
  const getGrowthIcon = (growth: number) => {
    if (growth > 5) return <TrendingUp className="h-4 w-4 text-green-500" />;
    if (growth < -5) return <TrendingDown className="h-4 w-4 text-red-500" />;
    return null;
  };
  
  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
        <div className="flex-1">
          <Label htmlFor="search-exclusive">Search Products</Label>
          <div className="relative mt-1">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              id="search-exclusive"
              placeholder="Search by product, category, or competitor..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div>
          <Label htmlFor="exclusivity-type">Exclusivity Type</Label>
          <Select
            value={exclusivityType}
            onValueChange={setExclusivityType}
          >
            <SelectTrigger id="exclusivity-type" className="mt-1 w-[180px]">
              <SelectValue placeholder="All Types" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="yours">Your Exclusives</SelectItem>
              <SelectItem value="competitor">Competitor Exclusives</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[300px]">Product</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Owner</TableHead>
            <TableHead>
              <div className="flex items-center gap-1">
                <span>Market</span>
                <span className="text-xs text-muted-foreground">(%)</span>
              </div>
            </TableHead>
            <TableHead>Growth</TableHead>
            <TableHead>
              <div className="flex items-center gap-1">
                <span>Exclusivity</span>
              </div>
            </TableHead>
            <TableHead className="text-right">Launch Date</TableHead>
            <TableHead className="text-right">Details</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedProducts.length === 0 ? (
            <TableRow>
              <TableCell colSpan={8} className="text-center py-4 text-muted-foreground">
                No exclusive products match your criteria
              </TableCell>
            </TableRow>
          ) : (
            sortedProducts.map((product) => (
              <React.Fragment key={product.id}>
                <TableRow className={`hover:bg-muted/50 ${product.type === 'yours' ? 'bg-purple-50' : ''}`}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-1">
                      {product.type === 'yours' && (
                        <Star className="h-3.5 w-3.5 text-purple-500" />
                      )}
                      {product.name}
                    </div>
                  </TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell>
                    <Badge variant={product.owner === 'Your Brand' ? 'default' : 'outline'}>
                      {product.owner}
                    </Badge>
                  </TableCell>
                  <TableCell>{product.marketShare}%</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      {getGrowthIcon(product.growthRate)}
                      <span className={product.growthRate > 0 ? 'text-green-600' : product.growthRate < 0 ? 'text-red-600' : ''}>
                        {product.growthRate > 0 ? '+' : ''}{product.growthRate}%
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Progress 
                        value={product.exclusivityScore} 
                        className="w-[60px] h-2" 
                        indicatorClassName={product.type === 'yours' ? 'bg-purple-500' : 'bg-blue-500'} 
                      />
                      <span className="text-sm">{product.exclusivityScore}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right text-sm">
                    {formatDate(product.launchDate)}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => toggleExpand(product.id)}
                    >
                      View
                    </Button>
                  </TableCell>
                </TableRow>
                
                {expandedProduct === product.id && (
                  <TableRow>
                    <TableCell colSpan={8} className="bg-muted/30 p-0">
                      <div className="m-2 p-4 border rounded-md border-l-4" style={{ 
                        borderLeftColor: product.type === 'yours' ? '#8B5CF6' : '#0EA5E9' 
                      }}>
                        {product.type === 'yours' ? (
                          <div className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              <div>
                                <p className="text-sm text-muted-foreground">Competitive Advantage</p>
                                <p className="font-medium">{product.competitiveAdvantage}</p>
                              </div>
                              <div>
                                <p className="text-sm text-muted-foreground">Market Share</p>
                                <p className="font-medium">{product.marketShare}%</p>
                              </div>
                              <div>
                                <p className="text-sm text-muted-foreground">Growth Rate</p>
                                <p className="font-medium flex items-center gap-1">
                                  {getGrowthIcon(product.growthRate)}
                                  {product.growthRate}%
                                </p>
                              </div>
                            </div>
                            
                            <div className="flex justify-between items-center">
                              {product.potentialThreat ? (
                                <Badge variant="outline" className="text-red-500 border-red-200">
                                  Potential Competitor Threat
                                </Badge>
                              ) : (
                                <Badge variant="outline" className="text-green-500 border-green-200">
                                  Strong Exclusive Position
                                </Badge>
                              )}
                              <Button size="sm" variant="outline" className="flex items-center gap-1">
                                <ExternalLink size={14} />
                                <span>View Product Details</span>
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <div className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              <div>
                                <p className="text-sm text-muted-foreground">Opportunity Score</p>
                                <div className="flex items-center gap-2 mt-1">
                                  <Progress 
                                    value={product.opportunityScore} 
                                    className="w-[60px] h-2" 
                                    indicatorClassName={product.opportunityScore > 70 ? "bg-green-500" : "bg-blue-500"}
                                  />
                                  <span>{product.opportunityScore}</span>
                                </div>
                              </div>
                              <div>
                                <p className="text-sm text-muted-foreground">Entry Barrier</p>
                                <div className="flex items-center gap-2 mt-1">
                                  <Progress 
                                    value={product.entryBarrier} 
                                    className="w-[60px] h-2" 
                                    indicatorClassName={product.entryBarrier > 70 ? "bg-red-500" : "bg-green-500"}
                                  />
                                  <span>{product.entryBarrier}%</span>
                                </div>
                              </div>
                              <div>
                                <p className="text-sm text-muted-foreground">Competitor Market Share</p>
                                <p className="font-medium">{product.marketShare}%</p>
                              </div>
                            </div>
                            
                            <div className="flex justify-between items-center">
                              <Badge variant="outline" className={
                                product.opportunityScore > 70 && product.entryBarrier < 50 
                                  ? "text-green-500 border-green-200" 
                                  : "text-blue-500 border-blue-200"
                              }>
                                {product.opportunityScore > 70 && product.entryBarrier < 50 
                                  ? "High Opportunity" 
                                  : "Monitor"}
                              </Badge>
                              <Button size="sm" variant="outline" className="flex items-center gap-1">
                                <ExternalLink size={14} />
                                <span>Opportunity Analysis</span>
                              </Button>
                            </div>
                          </div>
                        )}
                      </div>
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
