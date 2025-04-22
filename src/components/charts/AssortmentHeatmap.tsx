
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface AssortmentHeatmapProps {
  competitors: { id: string; name: string }[];
  categories: { id: string; name: string }[];
}

export const AssortmentHeatmap: React.FC<AssortmentHeatmapProps> = ({ competitors, categories }) => {
  const generateCoverageData = () => {
    return categories.map(category => {
      const rowData = competitors.reduce((acc, competitor) => {
        const coverage = Math.round(Math.random() * 100);
        acc[competitor.id] = {
          coverage,
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

  const getCoverageColor = (coverage: number) => {
    if (coverage >= 80) return 'bg-green-100 text-green-800';
    if (coverage >= 50) return 'bg-blue-100 text-blue-800';
    if (coverage >= 20) return 'bg-orange-100 text-orange-800';
    return 'bg-red-100 text-red-800';
  };

  const getCoverageText = (coverage: number) => {
    if (coverage >= 80) return 'Excellent';
    if (coverage >= 50) return 'Good';
    if (coverage >= 20) return 'Fair';
    return 'Poor';
  };

  return (
    <div className="relative overflow-x-auto">
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
          {coverageData.map((row) => (
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
                        </TooltipTrigger>
                        <TooltipContent>
                          <div className="p-2">
                            <p className="font-medium">{getCoverageText(cellData.coverage)} Coverage</p>
                            <p className="text-sm">{cellData.coverage}% of category covered</p>
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
          <span className="h-3 w-3 rounded-sm bg-green-100" />
          <span>Excellent (80-100%)</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-sm bg-blue-100" />
          <span>Good (50-79%)</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-sm bg-orange-100" />
          <span>Fair (20-49%)</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-sm bg-red-100" />
          <span>Poor (0-19%)</span>
        </div>
      </div>
    </div>
  );
};
