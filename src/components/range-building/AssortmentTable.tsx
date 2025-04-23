
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { SizingCell } from './SizingCell';

interface PriceRange {
  id: string;
  name: string;
  min: number;
  max: number;
}

interface AssortmentData {
  [retailerId: string]: {
    [categoryId: string]: {
      [priceRangeId: string]: {
        count: number;
        percentage: number;
        pdvs: number;
        pdvPercentage?: number;
      };
    };
  };
}

interface AssortmentTableProps {
  retailers: { id: string; name: string }[];
  categories: { id: string; name: string }[];
  selectedRetailers: string[];
  selectedCategories: string[];
  priceRanges: PriceRange[];
  assortmentData: AssortmentData;
  displayMetric: 'range-percentage' | 'pdv-percentage';
  showTotalRange: boolean;
  onCellClick: (retailerId: string, categoryId: string, priceRangeId: string) => void;
  selectedCell: { retailerId: string; categoryId: string; priceRangeId: string } | null;
  calculateRetailerTotals: (retailerId: string) => Record<string, { count: number; pdvs: number; percentage: number; pdvPercentage?: number; }>;
}

export const AssortmentTable: React.FC<AssortmentTableProps> = ({
  retailers,
  categories,
  selectedRetailers,
  selectedCategories,
  priceRanges,
  assortmentData,
  displayMetric,
  showTotalRange,
  onCellClick,
  selectedCell,
  calculateRetailerTotals,
}) => {
  const getDisplayValue = (data: { percentage: number; pdvPercentage?: number; count: number; pdvs: number } | undefined) => {
    if (!data) return { primary: '', secondary: '' };
    
    switch (displayMetric) {
      case 'pdv-percentage':
        return {
          primary: `${data.pdvPercentage?.toFixed(1)}%`,
          secondary: data.pdvs.toLocaleString()
        };
      default:
        return {
          primary: `${data.percentage.toFixed(1)}%`,
          secondary: data.count.toString()
        };
    }
  };

  const isCellSelected = (retailerId: string, categoryId: string, priceRangeId: string) =>
    selectedCell &&
    selectedCell.retailerId === retailerId &&
    selectedCell.categoryId === categoryId &&
    selectedCell.priceRangeId === priceRangeId;

  const filteredRetailers = retailers.filter(r => selectedRetailers.includes(r.id));

  return (
    <div className="overflow-x-auto border-t">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="sticky left-0 bg-white font-medium w-[120px] border-r text-xs py-1 px-2">
              Retailer
            </TableHead>
            <TableHead className="sticky left-[120px] bg-white font-medium w-[140px] border-r text-xs py-1 px-2">
              Category
            </TableHead>
            {priceRanges.map(priceRange => (
              <TableHead 
                key={priceRange.id} 
                className="text-center font-medium px-1 text-xs py-1"
              >
                {priceRange.name}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredRetailers.map((retailer) => {
            const hasMultipleCategories = selectedCategories.length > 0;
            const showRetailerRow = showTotalRange && hasMultipleCategories;

            return (
              <React.Fragment key={retailer.id}>
                {showRetailerRow ? (
                  <TableRow className="border-t-2">
                    <TableCell
                      rowSpan={selectedCategories.length + 1}
                      className="sticky left-0 bg-white font-medium border-r py-1 text-xs"
                    >
                      {retailer.name}
                    </TableCell>

                    <TableCell className="sticky left-[120px] bg-purple-50 border-r py-1 text-xs font-bold text-purple-900">
                      Total Range
                    </TableCell>
                    {priceRanges.map(priceRange => {
                      const totals = calculateRetailerTotals(retailer.id);
                      const data = totals[priceRange.id];
                      const display = getDisplayValue(data);
                      const percent = parseFloat(display.primary);
                      const selected = isCellSelected(retailer.id, "TOTAL", priceRange.id);

                      return (
                        <TableCell
                          key={`${retailer.id}-total-${priceRange.id}`}
                          className={`text-center p-1 align-bottom bg-purple-50 cursor-pointer hover:ring-2 ring-purple-300
                            ${selected ? "ring-2 ring-blue-600 bg-blue-50" : ""}
                          `}
                          onClick={() => onCellClick(retailer.id, "TOTAL", priceRange.id)}
                          tabIndex={0}
                          aria-label={`Show details for ${retailer.name}, Total Range, Price ${priceRange.name}${selected ? " (selected)" : ""}`}
                        >
                          <div className="flex flex-col justify-end items-center h-16 relative">
                            <SizingCell
                              percent={percent}
                              secondary={display.secondary}
                              isTotal={true}
                            />
                          </div>
                        </TableCell>
                      );
                    })}
                  </TableRow>
                ) : null}

                {selectedCategories.map((catId, index) => {
                  const category = categories.find(c => c.id === catId);

                  return (
                    <TableRow
                      key={`${retailer.id}-${catId}`}
                      className={
                        (showTotalRange && index === 0) ? "" :
                        index === 0 ? "border-t-2" : ""
                      }
                    >
                      {(!showTotalRange || !showRetailerRow) && index === 0 && (
                        <TableCell
                          rowSpan={selectedCategories.length}
                          className="sticky left-0 bg-white font-medium border-r py-1 text-xs"
                        >
                          {retailer.name}
                        </TableCell>
                      )}

                      <TableCell className="sticky left-[120px] bg-white border-r py-1 text-xs">
                        {category?.name}
                      </TableCell>

                      {priceRanges.map(priceRange => {
                        const data = assortmentData?.[retailer.id]?.[catId]?.[priceRange.id];
                        const display = getDisplayValue(data);
                        const percent = parseFloat(display.primary);
                        const selected = isCellSelected(retailer.id, catId, priceRange.id);

                        return (
                          <TableCell
                            key={`${retailer.id}-${catId}-${priceRange.id}`}
                            className={`
                              text-center p-1 align-bottom cursor-pointer hover:ring-2 ring-blue-300
                              ${selected ? "ring-2 ring-blue-600 bg-blue-50" : ""}
                            `}
                            onClick={() => onCellClick(retailer.id, catId, priceRange.id)}
                            tabIndex={0}
                            aria-label={`Show details for ${retailer.name}, ${category?.name}, Price ${priceRange.name}${selected ? " (selected)" : ""}`}
                          >
                            <div className="flex flex-col justify-end items-center h-16 relative">
                              <SizingCell percent={percent} secondary={display.secondary} categoryId={catId} />
                            </div>
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
              </React.Fragment>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};
