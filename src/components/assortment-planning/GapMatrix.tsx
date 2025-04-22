
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, XCircle, AlertCircle } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Card } from '@/components/ui/card';

interface GapMatrixProps {
  competitors: { id: string; name: string }[];
  categories: { id: string; name: string }[];
}

export const GapMatrix: React.FC<GapMatrixProps> = ({ competitors, categories }) => {
  // Generate matrix data
  const generateMatrixData = () => {
    return categories.map(category => {
      const rowData = competitors.reduce((acc, competitor) => {
        // Generate random data about product presence
        // 0 = No gap (both have products)
        // 1 = Gap (competitor has products, we don't)
        // 2 = We have exclusivity (we have products, competitor doesn't)
        const gapType = Math.floor(Math.random() * 3);
        const opportunityScore = Math.round(Math.random() * 100);
        const marketSize = Math.round(Math.random() * 1000) + 100;
        const growthRate = Math.round(Math.random() * 20);

        acc[competitor.id] = {
          gapType,
          score: opportunityScore,
          marketSize,
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

  const matrixData = generateMatrixData();

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

  const getStatusBg = (gapType: number) => {
    switch(gapType) {
      case 0:
        return 'bg-green-50';
      case 1:
        return 'bg-red-50';
      case 2:
        return 'bg-blue-50';
    }
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
          {matrixData.map((row) => (
            <TableRow key={row.category.id}>
              <TableCell className="font-medium">{row.category.name}</TableCell>
              {competitors.map((competitor) => {
                const cellData = row.data[competitor.id];
                return (
                  <TableCell 
                    key={competitor.id}
                    className={`text-center ${getStatusBg(cellData.gapType)}`}
                  >
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <div className="flex items-center justify-center">
                            {getStatusIcon(cellData.gapType)}
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>
                          <div className="p-2">
                            <p className="font-medium mb-1">{getStatusText(cellData.gapType)}</p>
                            <div className="space-y-1 text-sm">
                              <p>Opportunity Score: {cellData.score}</p>
                              <p>Market Size: ${cellData.marketSize}K</p>
                              <p>Growth Rate: {cellData.growthRate}%</p>
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
    </div>
  );
};
