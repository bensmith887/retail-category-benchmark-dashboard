import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Sliders, ArrowRightLeft, AlertTriangle, Check, Glasses, TrendingUp, FileText } from 'lucide-react';

interface GapMatrixProps {
  competitors: { id: string; name: string }[];
  categories: { id: string; name: string }[];
}

interface CellData {
  hasGap: boolean;
  gapType: 'major' | 'minor' | 'none' | 'exclusive';
  opportunityScore: number;
  marketSize: number;
  growthRate: number;
  competitorSkuCount: number;
  ourSkuCount: number;
  totalRevenuePotential: number;
  gapReason: string;
  competitor: string;
}

interface MatrixRowData {
  category: { id: string; name: string };
  data: Record<string, CellData>;
}

export const GapMatrix: React.FC<GapMatrixProps> = ({ competitors, categories }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('opportunityScore');
  const [minOpportunityScore, setMinOpportunityScore] = useState('0');
  const [gapFilter, setGapFilter] = useState('all');
  
  const generateGapData = (): MatrixRowData[] => {
    return categories.map(category => {
      const rowData = competitors.reduce((acc, competitor) => {
        const hasGap = Math.random() > 0.4;
        const opportunityScore = Math.round(Math.random() * 100);
        const marketSize = Math.floor(Math.random() * 10000000) + 100000;
        const growthRate = Math.round(Math.random() * 30) - 5;
        const competitorSkuCount = Math.floor(Math.random() * 500) + 20;
        const ourSkuCount = hasGap ? (Math.random() > 0.7 ? 0 : Math.floor(Math.random() * 10) + 1) : Math.floor(Math.random() * 100) + 20;
        const totalRevenuePotential = Math.floor(Math.random() * 1000000) + 10000;
        
        let gapType: 'major' | 'minor' | 'none' | 'exclusive';
        if (!hasGap && competitorSkuCount < ourSkuCount) {
          gapType = 'exclusive';
        } else if (hasGap && ourSkuCount === 0) {
          gapType = 'major';
        } else if (hasGap && ourSkuCount > 0) {
          gapType = 'minor';
        } else {
          gapType = 'none';
        }
        
        const reasons = [
          'High competitor presence with strong sales',
          'Growth category with limited representation',
          'Seasonal opportunity during Q4',
          'Emerging market trend in this category',
          'Competitor has exclusive variants'
        ];
        
        acc[competitor.id] = {
          hasGap,
          gapType,
          opportunityScore,
          marketSize,
          growthRate,
          competitorSkuCount,
          ourSkuCount,
          totalRevenuePotential,
          gapReason: reasons[Math.floor(Math.random() * reasons.length)],
          competitor: competitor.name
        };
        return acc;
      }, {} as Record<string, CellData>);

      return {
        category,
        data: rowData
      };
    });
  };
  
  const [matrixData, setMatrixData] = useState<MatrixRowData[]>([]);
  
  useEffect(() => {
    setMatrixData(generateGapData());
  }, []);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
      notation: 'compact'
    }).format(value);
  };
  
  const getGapIcon = (gapType: string) => {
    switch (gapType) {
      case 'major':
        return <AlertTriangle className="text-red-500" size={18} />;
      case 'minor':
        return <AlertTriangle className="text-orange-500" size={18} />;
      case 'exclusive':
        return <Check className="text-green-500" size={18} />;
      default:
        return <Check className="text-blue-500" size={18} />;
    }
  };
  
  const getGapColor = (gapType: string) => {
    switch (gapType) {
      case 'major':
        return 'bg-red-100 text-red-800';
      case 'minor':
        return 'bg-orange-100 text-orange-800';
      case 'exclusive':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-blue-100 text-blue-800';
    }
  };
  
  const getGapText = (gapType: string, skuCount: number) => {
    switch (gapType) {
      case 'major':
        return `Major Gap (${skuCount} SKUs)`;
      case 'minor':
        return `Minor Gap (${skuCount} SKUs)`;
      case 'exclusive':
        return `Exclusive (+${skuCount})`;
      default:
        return 'No Gap';
    }
  };
  
  const filteredData = matrixData
    .filter(row => {
      if (searchTerm && !row.category.name.toLowerCase().includes(searchTerm.toLowerCase())) {
        return false;
      }
      
      if (minOpportunityScore !== '0') {
        const minScore = parseInt(minOpportunityScore, 10);
        const hasHighOpportunity = Object.values(row.data).some(d => 
          d.opportunityScore >= minScore
        );
        
        if (!hasHighOpportunity) return false;
      }
      
      if (gapFilter !== 'all') {
        const matchesGapType = Object.values(row.data).some(d => 
          d.gapType === gapFilter
        );
        
        if (!matchesGapType) return false;
      }
      
      return true;
    })
    .sort((a, b) => {
      if (sortOption === 'category') {
        return a.category.name.localeCompare(b.category.name);
      }
      
      const getRowValue = (row: MatrixRowData) => {
        const values = Object.values(row.data).map(d => {
          const value = d[sortOption as keyof CellData];
          return typeof value === 'number' ? value : 0;
        });
        
        return sortOption === 'marketSize' || sortOption === 'opportunityScore' || sortOption === 'totalRevenuePotential'
          ? Math.max(...values)
          : values.reduce((sum, v) => sum + v, 0) / values.length;
      };
      
      return getRowValue(b) - getRowValue(a);
    });

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-3 p-4">
        <div className="flex items-center border rounded-md px-3 py-1 flex-1 min-w-[200px]">
          <Search className="h-4 w-4 text-muted-foreground mr-2" />
          <Input
            placeholder="Search categories..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border-0 p-0 shadow-none focus-visible:ring-0"
          />
        </div>
        
        <div className="flex items-center gap-2">
          <Sliders className="h-4 w-4 text-muted-foreground" />
          <Select value={minOpportunityScore} onValueChange={setMinOpportunityScore}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Opportunity Score" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0">All Opportunities</SelectItem>
              <SelectItem value="25">At least 25</SelectItem>
              <SelectItem value="50">At least 50</SelectItem>
              <SelectItem value="75">At least 75</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex items-center gap-2">
          <ArrowRightLeft className="h-4 w-4 text-muted-foreground" />
          <Select value={sortOption} onValueChange={setSortOption}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="opportunityScore">Opportunity Score</SelectItem>
              <SelectItem value="marketSize">Market Size</SelectItem>
              <SelectItem value="growthRate">Growth Rate</SelectItem>
              <SelectItem value="totalRevenuePotential">Revenue Potential</SelectItem>
              <SelectItem value="competitorSkuCount">Competitor SKUs</SelectItem>
              <SelectItem value="category">Category Name</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex items-center gap-2">
          <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          <Select value={gapFilter} onValueChange={setGapFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Gap Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Gap Types</SelectItem>
              <SelectItem value="major">Major Gaps</SelectItem>
              <SelectItem value="minor">Minor Gaps</SelectItem>
              <SelectItem value="exclusive">Exclusives</SelectItem>
              <SelectItem value="none">No Gaps</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="bg-white border rounded-md overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">Category</TableHead>
              {competitors.map((competitor) => (
                <TableHead key={competitor.id} className="text-center">
                  {competitor.name}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.map((row) => (
              <TableRow key={row.category.id}>
                <TableCell className="font-medium">
                  {row.category.name}
                </TableCell>
                {competitors.map((competitor) => {
                  const cellData = row.data[competitor.id];
                  return (
                    <TableCell key={competitor.id} className={`text-center ${getGapColor(cellData.gapType)}`}>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger className="w-full cursor-pointer">
                            <div className="flex justify-center items-center">
                              {getGapIcon(cellData.gapType)}
                            </div>
                            <div className="text-xs font-medium mt-1">
                              Score: {cellData.opportunityScore}
                            </div>
                          </TooltipTrigger>
                          <TooltipContent className="w-64 p-0">
                            <div className="p-3">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  {getGapIcon(cellData.gapType)}
                                  <p className="font-bold">{getGapText(cellData.gapType, cellData.competitorSkuCount)}</p>
                                </div>
                                <Badge className="bg-purple-500">
                                  Score: {cellData.opportunityScore}
                                </Badge>
                              </div>
                              
                              <div className="mt-2 text-sm space-y-2">
                                <div className="grid grid-cols-2 gap-x-2">
                                  <div>
                                    <p className="text-muted-foreground">Market Size</p>
                                    <p className="font-medium">{formatCurrency(cellData.marketSize)}</p>
                                  </div>
                                  <div>
                                    <p className="text-muted-foreground">Growth</p>
                                    <p className={`font-medium ${cellData.growthRate >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                      {cellData.growthRate}%
                                    </p>
                                  </div>
                                </div>
                                
                                <div className="grid grid-cols-2 gap-x-2">
                                  <div>
                                    <p className="text-muted-foreground">Their SKUs</p>
                                    <p className="font-medium">{cellData.competitorSkuCount}</p>
                                  </div>
                                  <div>
                                    <p className="text-muted-foreground">Your SKUs</p>
                                    <p className="font-medium">{cellData.ourSkuCount}</p>
                                  </div>
                                </div>
                                
                                <div>
                                  <p className="text-muted-foreground">Revenue Potential</p>
                                  <p className="font-medium text-green-600">{formatCurrency(cellData.totalRevenuePotential)}</p>
                                </div>
                                
                                <div className="pt-2 border-t">
                                  <p className="text-muted-foreground">Analysis</p>
                                  <p>{cellData.gapReason}</p>
                                </div>
                                
                                <div className="flex gap-2 pt-2">
                                  <Button variant="secondary" size="sm" className="flex items-center gap-1">
                                    <Glasses size={14} />
                                    <span>View SKUs</span>
                                  </Button>
                                  <Button variant="outline" size="sm" className="flex items-center gap-1">
                                    <TrendingUp size={14} />
                                    <span>Trends</span>
                                  </Button>
                                  <Button variant="outline" size="sm" className="flex items-center gap-1 ml-auto">
                                    <FileText size={14} />
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      
      <div className="flex justify-between items-center text-sm text-muted-foreground p-4">
        <div>
          Showing {filteredData.length} of {matrixData.length} categories
        </div>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <span className={`px-2 py-1 rounded bg-red-100 text-red-800 flex items-center gap-1`}>
              <AlertTriangle size={12} /> Major Gap
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className={`px-2 py-1 rounded bg-orange-100 text-orange-800 flex items-center gap-1`}>
              <AlertTriangle size={12} /> Minor Gap
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className={`px-2 py-1 rounded bg-green-100 text-green-800 flex items-center gap-1`}>
              <Check size={12} /> Exclusive
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className={`px-2 py-1 rounded bg-blue-100 text-blue-800 flex items-center gap-1`}>
              <Check size={12} /> No Gap
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GapMatrix;
