
import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface AssortmentHeatmapProps {
  competitors: { id: string; name: string }[];
  categories: { id: string; name: string }[];
}

export const AssortmentHeatmap: React.FC<AssortmentHeatmapProps> = ({ competitors, categories }) => {
  const [sortBy, setSortBy] = useState<string>('coverage');
  const [filterThreshold, setFilterThreshold] = useState<string>('0');
  
  const generateCoverageData = () => {
    return categories.map(category => {
      const rowData = competitors.reduce((acc, competitor) => {
        const coverage = Math.round(Math.random() * 100);
        const skuCount = Math.floor(Math.random() * 1000) + 50;
        const variantCount = Math.floor(Math.random() * 20) + 1;
        const marketShare = Math.round(Math.random() * 30) + 5;
        const searchShare = Math.round(Math.random() * 40) + 2;
        const growthRate = Math.round(Math.random() * 30) - 5; // -5 to 25%
        
        acc[competitor.id] = {
          coverage,
          skuCount,
          variantCount,
          marketShare,
          searchShare,
          growthRate,
          competitor: competitor.name
        };
        return acc;
      }, {});

      return {
        category,
        data: rowData
      };
    });
  };

  const coverageData = generateCoverageData();
  
  // Sort and filter data
  const processedData = [...coverageData]
    .filter(row => {
      if (filterThreshold === '0') return true;
      
      // Check if any competitor meets the threshold
      const threshold = parseInt(filterThreshold, 10);
      return Object.values(row.data).some(data => data.coverage >= threshold);
    })
    .sort((a, b) => {
      if (sortBy === 'category') {
        return a.category.name.localeCompare(b.category.name);
      }
      
      // Get average value for the sort field
      const getAvgValue = (row) => {
        const values = Object.values(row.data).map(d => d[sortBy] || 0);
        return values.reduce((sum, val) => sum + val, 0) / values.length;
      };
      
      return getAvgValue(b) - getAvgValue(a); // Descending order
    });

  const getCoverageColor = (coverage: number) => {
    if (coverage >= 80) return 'bg-green-200 text-green-800';
    if (coverage >= 50) return 'bg-blue-200 text-blue-800';
    if (coverage >= 20) return 'bg-orange-200 text-orange-800';
    return 'bg-red-200 text-red-800';
  };

  const getCoverageText = (coverage: number) => {
    if (coverage >= 80) return 'Excellent';
    if (coverage >= 50) return 'Good';
    if (coverage >= 20) return 'Fair';
    return 'Poor';
  };
  
  const handleExport = () => {
    // Convert data to CSV
    let csvContent = "data:text/csv;charset=utf-8,";
    
    // Headers
    csvContent += "Category,Competitor,Coverage (%),SKU Count,Variants,Market Share (%),Search Share (%),Growth Rate (%)\n";
    
    // Data rows
    coverageData.forEach(row => {
      const category = row.category.name;
      Object.entries(row.data).forEach(([compId, data]) => {
        const competitor = data.competitor;
        const line = [
          category,
          competitor,
          data.coverage,
          data.skuCount,
          data.variantCount,
          data.marketShare,
          data.searchShare,
          data.growthRate
        ].join(",");
        csvContent += line + "\n";
      });
    });
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "assortment_coverage_export.csv");
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
            value={sortBy} 
            onValueChange={setSortBy}
          >
            <SelectTrigger className="w-36 h-8 text-xs">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="coverage">Coverage</SelectItem>
              <SelectItem value="skuCount">SKU Count</SelectItem>
              <SelectItem value="marketShare">Market Share</SelectItem>
              <SelectItem value="searchShare">Search Share</SelectItem>
              <SelectItem value="growthRate">Growth Rate</SelectItem>
              <SelectItem value="category">Category Name</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">Min Coverage</label>
          <Select 
            value={filterThreshold} 
            onValueChange={setFilterThreshold}
          >
            <SelectTrigger className="w-36 h-8 text-xs">
              <SelectValue placeholder="No minimum" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0">No minimum</SelectItem>
              <SelectItem value="20">At least 20%</SelectItem>
              <SelectItem value="50">At least 50%</SelectItem>
              <SelectItem value="80">At least 80%</SelectItem>
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
          {processedData.map((row) => (
            <TableRow key={row.category.id}>
              <TableCell className="font-medium">{row.category.name}</TableCell>
              {competitors.map((competitor) => {
                const cellData = row.data[competitor.id];
                return (
                  <TableCell 
                    key={competitor.id} 
                    className={`text-center ${getCoverageColor(cellData.coverage)}`}
                  >
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger className="w-full">
                          <div className="font-medium">{cellData.coverage}%</div>
                          <Progress value={cellData.coverage} className="h-1 mt-1" />
                        </TooltipTrigger>
                        <TooltipContent className="w-64 p-0">
                          <div className="p-3">
                            <div className="flex justify-between items-center mb-2">
                              <p className="font-bold">{getCoverageText(cellData.coverage)} Coverage</p>
                              <Badge 
                                variant={
                                  cellData.coverage >= 80 ? "default" : 
                                  cellData.coverage >= 50 ? "secondary" : 
                                  cellData.coverage >= 20 ? "outline" : 
                                  "destructive"
                                }
                              >
                                {cellData.coverage}%
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
                                  <span className="text-muted-foreground">SKU Count:</span> {cellData.skuCount}
                                </div>
                                <div>
                                  <span className="text-muted-foreground">Variants:</span> {cellData.variantCount}
                                </div>
                              </div>
                              <div className="grid grid-cols-2 gap-x-4">
                                <div>
                                  <span className="text-muted-foreground">Market Share:</span> {cellData.marketShare}%
                                </div>
                                <div>
                                  <span className="text-muted-foreground">Search Share:</span> {cellData.searchShare}%
                                </div>
                              </div>
                              <div>
                                <span className="text-muted-foreground">Growth Rate:</span> 
                                <span className={cellData.growthRate >= 0 ? "text-green-600" : "text-red-600"}>
                                  {' '}{cellData.growthRate}%
                                </span>
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

      <div className="mt-4 flex justify-center gap-6 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-sm bg-green-200" />
          <span>Excellent (80-100%)</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-sm bg-blue-200" />
          <span>Good (50-79%)</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-sm bg-orange-200" />
          <span>Fair (20-49%)</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-sm bg-red-200" />
          <span>Poor (0-19%)</span>
        </div>
      </div>
    </div>
  );
};
