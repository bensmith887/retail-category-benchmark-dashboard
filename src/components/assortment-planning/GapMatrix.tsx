
import React, { useState, useMemo } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, XCircle, AlertCircle, ArrowRight, FileText, BarChart, ListTodo, LineChart } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface GapMatrixProps {
  competitors: { id: string; name: string }[];
  categories: { id: string; name: string }[];
  sortBy?: string;
  filterBy?: {
    category?: string;
    competitor?: string;
    gapType?: number;
    minOpportunity?: number;
  };
}

interface CellData {
  gapType: number;
  score: number;
  marketSize: number;
  growthRate: number;
  competitor: string;
  competitorSkuCount: number;
  ourSkuCount: number;
  competitorSales: number;
  pdpViews: number;
  searchDemand: number;
  gapReason: string;
  implementationTime: number;
  resourceCost: number;
  totalRevenuePotential: number;
}

interface MatrixRowData {
  category: { id: string; name: string };
  data: Record<string, CellData>;
}

export const GapMatrix: React.FC<GapMatrixProps> = ({ 
  competitors, 
  categories,
  sortBy = 'opportunityScore',
  filterBy = {}
}) => {
  const [selectedCell, setSelectedCell] = useState<{
    category: string;
    competitor: string;
    data: CellData;
  } | null>(null);
  
  const [sortOption, setSortOption] = useState<string>(sortBy);
  const [filterCategory, setFilterCategory] = useState<string>(filterBy.category || '');
  const [filterCompetitor, setFilterCompetitor] = useState<string>(filterBy.competitor || '');
  const [filterGapType, setFilterGapType] = useState<string>(filterBy.gapType?.toString() || '');
  
  // Generate more detailed matrix data
  const generateMatrixData = (): MatrixRowData[] => {
    return categories.map(category => {
      const rowData = competitors.reduce((acc, competitor) => {
        // Generate random data about product presence
        // 0 = No gap (both have products)
        // 1 = Gap (competitor has products, we don't)
        // 2 = We have exclusivity (we have products, competitor doesn't)
        const gapType = Math.floor(Math.random() * 3);
        
        // Generate more detailed metrics
        const opportunityScore = Math.round(Math.random() * 100);
        const marketSize = Math.round(Math.random() * 1000) + 100;
        const growthRate = Math.round(Math.random() * 30) - 5; // -5 to 25%
        const competitorSkuCount = gapType === 1 ? Math.floor(Math.random() * 800) + 200 : 0;
        const ourSkuCount = gapType !== 1 ? Math.floor(Math.random() * 400) + 50 : 0;
        const competitorSales = Math.round(Math.random() * 5000) + 1000;
        const pdpViews = Math.round(Math.random() * 10000) + 1000;
        const searchDemand = Math.round(Math.random() * 500) + 100;
        
        // Generate contextual reason for gap
        const gapReasons = [
          "New emerging trend",
          "Seasonal demand spike",
          "Supply chain constraints",
          "Strategic market entry",
          "Customer demand shift"
        ];
        const gapReason = gapReasons[Math.floor(Math.random() * gapReasons.length)];
        
        // Generate implementation difficulty
        const implementationTime = Math.floor(Math.random() * 12) + 1; // 1-12 months
        const resourceCost = Math.floor(Math.random() * 4) + 1; // 1-5 (low to high)
        
        acc[competitor.id] = {
          gapType,
          score: opportunityScore,
          marketSize,
          growthRate,
          competitor: competitor.name,
          competitorSkuCount,
          ourSkuCount,
          competitorSales,
          pdpViews,
          searchDemand,
          gapReason,
          implementationTime,
          resourceCost,
          totalRevenuePotential: marketSize * (growthRate > 0 ? 1 + (growthRate/100) : 1)
        };
        return acc;
      }, {} as Record<string, CellData>);

      return {
        category,
        data: rowData
      };
    });
  };

  const rawMatrixData = useMemo<MatrixRowData[]>(() => generateMatrixData(), [categories, competitors]);
  
  // Apply filters and sorting
  const matrixData = useMemo(() => {
    let filteredData = [...rawMatrixData];
    
    // Apply category filter
    if (filterCategory) {
      filteredData = filteredData.filter(row => 
        row.category.name.toLowerCase().includes(filterCategory.toLowerCase())
      );
    }
    
    // Apply gap type filter
    if (filterGapType !== '') {
      filteredData = filteredData.map(row => {
        const filteredRowData = { ...row };
        
        if (filterCompetitor) {
          // Filter by specific competitor
          const compId = competitors.find(c => c.name.toLowerCase().includes(filterCompetitor.toLowerCase()))?.id;
          if (compId && filteredRowData.data[compId]?.gapType.toString() !== filterGapType) {
            delete filteredRowData.data[compId];
          }
        } else {
          // Filter across all competitors
          for (const compId in filteredRowData.data) {
            if (filteredRowData.data[compId].gapType.toString() !== filterGapType) {
              delete filteredRowData.data[compId];
            }
          }
        }
        
        return filteredRowData;
      });
    }
    
    // Sort data
    if (sortOption) {
      filteredData.sort((a, b) => {
        // Get average or max value for the sort option across all competitors
        const getRowValue = (row: MatrixRowData) => {
          const values = Object.values(row.data).map(d => d[sortOption as keyof CellData] || 0);
          return sortOption === 'marketSize' || sortOption === 'opportunityScore' || sortOption === 'totalRevenuePotential'
            ? Math.max(...values)
            : values.reduce((sum, v) => sum + (typeof v === 'number' ? v : 0), 0) / values.length;
        };
        
        return getRowValue(b) - getRowValue(a); // Descending order
      });
    }
    
    return filteredData;
  }, [rawMatrixData, sortOption, filterCategory, filterCompetitor, filterGapType, competitors]);

  const getStatusIcon = (gapType: number) => {
    switch(gapType) {
      case 0:
        return <CheckCircle2 className="h-4 w-4 text-green-500" />;
      case 1:
        return <XCircle className="h-4 w-4 text-red-500" />;
      case 2:
        return <AlertCircle className="h-4 w-4 text-blue-500" />;
    }
  };

  const getStatusText = (gapType: number) => {
    switch(gapType) {
      case 0:
        return 'Both have products';
      case 1:
        return 'Gap! Competitor has products';
      case 2:
        return 'Exclusive! Only we have products';
    }
  };

  const getStatusBg = (gapType: number, score: number) => {
    switch(gapType) {
      case 0:
        return 'bg-green-50';
      case 1:
        // Gradient for gaps based on opportunity score
        if (score >= 80) return 'bg-red-200 text-red-800';
        if (score >= 50) return 'bg-red-100 text-red-800';
        return 'bg-red-50 text-red-800';
      case 2:
        return 'bg-blue-50';
    }
  };

  const handleCellClick = (category, competitor, cellData) => {
    setSelectedCell({
      category,
      competitor,
      data: cellData
    });
  };

  const handleExport = () => {
    // Convert matrix data to CSV
    let csvContent = "data:text/csv;charset=utf-8,";
    
    // Headers
    csvContent += "Category,Competitor,Status,Opportunity Score,Market Size ($K),Growth Rate (%),SKU Count,Revenue Potential,Gap Reason\n";
    
    // Data rows
    matrixData.forEach(row => {
      const category = row.category.name;
      Object.entries(row.data).forEach(([compId, data]) => {
        const competitor = data.competitor;
        const status = getStatusText(data.gapType);
        const line = [
          category,
          competitor,
          status,
          data.score,
          data.marketSize,
          data.growthRate,
          data.gapType === 1 ? data.competitorSkuCount : data.ourSkuCount,
          Math.round(data.totalRevenuePotential),
          data.gapType === 1 ? data.gapReason : "N/A"
        ].join(",");
        csvContent += line + "\n";
      });
    });
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "gap_analysis_export.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="relative overflow-x-auto">
      <div className="flex flex-wrap gap-3 mb-4 p-4">
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">Sort By</label>
          <Select 
            value={sortOption} 
            onValueChange={setSortOption}
          >
            <SelectTrigger className="w-36 h-8 text-xs">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="opportunityScore">Opportunity Score</SelectItem>
              <SelectItem value="marketSize">Market Size</SelectItem>
              <SelectItem value="growthRate">Growth Rate</SelectItem>
              <SelectItem value="competitorSkuCount">SKU Count</SelectItem>
              <SelectItem value="totalRevenuePotential">Revenue Potential</SelectItem>
              <SelectItem value="pdpViews">PDP Views</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">Filter Category</label>
          <Select 
            value={filterCategory} 
            onValueChange={setFilterCategory}
          >
            <SelectTrigger className="w-36 h-8 text-xs">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Categories</SelectItem>
              {categories.map(cat => (
                <SelectItem key={cat.id} value={cat.name}>
                  {cat.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">Filter Competitor</label>
          <Select 
            value={filterCompetitor} 
            onValueChange={setFilterCompetitor}
          >
            <SelectTrigger className="w-36 h-8 text-xs">
              <SelectValue placeholder="All Competitors" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Competitors</SelectItem>
              {competitors.map(comp => (
                <SelectItem key={comp.id} value={comp.name}>
                  {comp.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">Gap Type</label>
          <Select 
            value={filterGapType} 
            onValueChange={setFilterGapType}
          >
            <SelectTrigger className="w-36 h-8 text-xs">
              <SelectValue placeholder="All Types" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Types</SelectItem>
              <SelectItem value="0">No Gap</SelectItem>
              <SelectItem value="1">Has Gap</SelectItem>
              <SelectItem value="2">Exclusive</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="ml-auto flex items-end">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex items-center gap-1" 
            onClick={handleExport}
          >
            <FileText size={14} />
            <span>Export</span>
          </Button>
        </div>
      </div>
      
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="bg-muted/50 font-medium w-[200px]">Category</TableHead>
            {competitors.map((competitor) => (
              <TableHead 
                key={competitor.id}
                className="bg-muted/50 font-medium text-center"
              >
                {competitor.name}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {matrixData.map((row) => (
            <TableRow key={row.category.id}>
              <TableCell className="font-medium">{row.category.name}</TableCell>
              {competitors.map((competitor) => {
                const cellData = row.data[competitor.id];
                // Skip if this competitor was filtered out
                if (!cellData) return <TableCell key={competitor.id} />;
                
                return (
                  <TableCell 
                    key={competitor.id}
                    className={`text-center relative ${getStatusBg(cellData.gapType, cellData.score)}`}
                  >
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div 
                            onClick={() => handleCellClick(row.category.name, competitor.name, cellData)}
                            className="flex items-center justify-center cursor-pointer p-1 hover:bg-opacity-80 transition-colors rounded"
                          >
                            {getStatusIcon(cellData.gapType)}
                            <div className="ml-1 font-medium">{cellData.score}</div>
                          </div>
                        </TooltipTrigger>
                        <TooltipContent className="w-64 p-0">
                          <div className="p-3">
                            <div className="flex justify-between items-center mb-2">
                              <p className="font-bold">{getStatusText(cellData.gapType)}</p>
                              <Badge 
                                variant={cellData.gapType === 1 ? "destructive" : "secondary"}
                              >
                                {cellData.score}/100
                              </Badge>
                            </div>
                            
                            <div className="space-y-2 text-sm border-t pt-2">
                              <div>
                                <span className="text-muted-foreground">Category:</span> {row.category.name}
                              </div>
                              <div>
                                <span className="text-muted-foreground">Competitor:</span> {cellData.competitor}
                              </div>
                              <div className="grid grid-cols-2 gap-x-4">
                                <div>
                                  <span className="text-muted-foreground">Market Size:</span> ${cellData.marketSize}K
                                </div>
                                <div>
                                  <span className="text-muted-foreground">Growth:</span> {cellData.growthRate}%
                                </div>
                              </div>
                              <div className="grid grid-cols-2 gap-x-4">
                                <div>
                                  <span className="text-muted-foreground">{cellData.competitor} SKUs:</span> {cellData.competitorSkuCount}
                                </div>
                                <div>
                                  <span className="text-muted-foreground">Your SKUs:</span> {cellData.ourSkuCount}
                                </div>
                              </div>
                              {cellData.gapType === 1 && (
                                <div>
                                  <span className="text-muted-foreground">Context:</span> {cellData.gapReason}
                                </div>
                              )}
                            </div>
                            
                            <Button
                              size="sm" 
                              variant="secondary"
                              className="mt-2 w-full text-xs"
                              onClick={() => handleCellClick(row.category.name, competitor.name, cellData)}
                            >
                              View Details <ArrowRight size={12} className="ml-1" />
                            </Button>
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

      <div className="mt-4 flex justify-center gap-6 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4 text-green-500" />
          <span>Both have products</span>
        </div>
        <div className="flex items-center gap-2">
          <XCircle className="h-4 w-4 text-red-500" />
          <span>Product gap</span>
        </div>
        <div className="flex items-center gap-2">
          <AlertCircle className="h-4 w-4 text-blue-500" />
          <span>Exclusive product</span>
        </div>
      </div>
      
      {selectedCell && (
        <Popover open={!!selectedCell} onOpenChange={(open) => !open && setSelectedCell(null)}>
          <PopoverContent side="right" className="w-[450px] p-0" sideOffset={40}>
            <div className="p-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold">
                  {selectedCell.category} - {selectedCell.competitor}
                </h3>
                <Badge className={selectedCell.data.gapType === 1 ? "bg-red-500" : "bg-green-500"}>
                  {getStatusText(selectedCell.data.gapType)}
                </Badge>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Opportunity Score</p>
                  <div className="flex items-center">
                    <span className="text-2xl font-bold mr-2">{selectedCell.data.score}</span>
                    <Progress 
                      value={selectedCell.data.score} 
                      className="h-2" 
                      indicatorClassName={
                        selectedCell.data.score >= 80 ? "bg-red-500" : 
                        selectedCell.data.score >= 50 ? "bg-orange-500" : 
                        "bg-blue-500"
                      }
                    />
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Revenue Potential</p>
                  <p className="text-2xl font-bold">${Math.round(selectedCell.data.totalRevenuePotential)}K</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <h4 className="font-medium mb-2">Market Data</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Market Size:</span>
                      <span className="font-medium">${selectedCell.data.marketSize}K</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Growth Rate:</span>
                      <span className={`font-medium ${selectedCell.data.growthRate > 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {selectedCell.data.growthRate}%
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">PDP Views:</span>
                      <span className="font-medium">{selectedCell.data.pdpViews.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Search Demand:</span>
                      <span className="font-medium">{selectedCell.data.searchDemand} queries/day</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">SKU Data</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">{selectedCell.competitor} SKUs:</span>
                      <span className="font-medium">{selectedCell.data.competitorSkuCount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Your SKUs:</span>
                      <span className="font-medium">{selectedCell.data.ourSkuCount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">SKU Gap:</span>
                      <span className="font-medium">
                        {Math.max(0, selectedCell.data.competitorSkuCount - selectedCell.data.ourSkuCount)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Sales Volume:</span>
                      <span className="font-medium">${selectedCell.data.competitorSales}K</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {selectedCell.data.gapType === 1 && (
                <div className="mb-6">
                  <h4 className="font-medium mb-2">Gap Context</h4>
                  <div className="bg-amber-50 border border-amber-200 rounded p-3 text-sm">
                    <p><span className="font-medium">Reason:</span> {selectedCell.data.gapReason}</p>
                    <p className="mt-1">
                      <span className="font-medium">Implementation Time:</span> {selectedCell.data.implementationTime} months
                    </p>
                    <p className="mt-1">
                      <span className="font-medium">Resource Cost:</span> {Array(selectedCell.data.resourceCost).fill('$').join('')}
                    </p>
                  </div>
                </div>
              )}
              
              {selectedCell.data.gapType === 1 && (
                <div className="bg-green-50 border border-green-200 rounded p-3 text-sm mb-6">
                  <h4 className="font-medium mb-1">Recommendation</h4>
                  <p>
                    {selectedCell.data.score >= 70 ? (
                      `High priority opportunity. Add ${selectedCell.category} to your line — ${selectedCell.competitor} has ${selectedCell.data.competitorSkuCount} SKUs, category is growing ${selectedCell.data.growthRate}% YoY.`
                    ) : selectedCell.data.score >= 40 ? (
                      `Consider exploring ${selectedCell.category} segment. Market size of $${selectedCell.data.marketSize}K with ${selectedCell.data.growthRate}% growth presents moderate opportunity.`
                    ) : (
                      `Low priority. This category has limited current opportunity with lower growth potential.`
                    )}
                  </p>
                </div>
              )}
              
              <div className="grid grid-cols-2 gap-3">
                <Button 
                  variant="outline" 
                  className="flex items-center gap-1" 
                  size="sm"
                  onClick={() => window.alert('View Competitor SKUs functionality would be implemented here')}
                >
                  <FileText size={14} />
                  <span>View Competitor SKUs</span>
                </Button>
                <Button 
                  variant="outline" 
                  className="flex items-center gap-1" 
                  size="sm"
                  onClick={() => window.alert('Market Trend Analysis functionality would be implemented here')}
                >
                  <LineChart size={14} />
                  <span>Market Trend Analysis</span>
                </Button>
                <Button 
                  variant="outline" 
                  className="flex items-center gap-1" 
                  size="sm"
                  onClick={() => window.alert('Product Roadmap functionality would be implemented here')}
                >
                  <ListTodo size={14} />
                  <span>Add to Roadmap</span>
                </Button>
                <Button 
                  variant="outline" 
                  className="flex items-center gap-1" 
                  size="sm"
                  onClick={() => window.alert('Price Comparison functionality would be implemented here')}
                >
                  <BarChart size={14} />
                  <span>Compare Pricing</span>
                </Button>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      )}
    </div>
  );
};
