
import React from "react";
import SizingCell from "./SizingCell";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { AssortmentMixTableProps } from "./assortmentMixTypes";

// Extracted visual-only table for explorer – no business logic.
const AssortmentMixTable: React.FC<AssortmentMixTableProps> = ({
  filteredRetailers,
  categories,
  generatedPriceRanges,
  selectedCategories,
  showTotalRange,
  displayMetric,
  assortmentData,
  calculateRetailerTotals,
  getDisplayValue
}) => {
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
            {generatedPriceRanges.map(priceRange => (
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
          {filteredRetailers.map(retailer => (
            <React.Fragment key={retailer.id}>
              {showTotalRange && (
                <TableRow className="bg-muted/20 font-medium border-t-2">
                  <TableCell className="sticky left-0 bg-muted/20 font-medium border-r py-1 text-xs">
                    {retailer.name}
                  </TableCell>
                  <TableCell className="sticky left-[120px] bg-muted/20 border-r py-1 text-xs">
                    Total Range
                  </TableCell>
                  {generatedPriceRanges.map(priceRange => {
                    const totals = calculateRetailerTotals(retailer.id);
                    const data = totals[priceRange.id];
                    const value = {
                      primary: displayMetric === 'pdv-percentage'
                        ? Number(data?.pdvPercentage ?? 0)
                        : Number(data?.percentage ?? 0),
                      secondary: displayMetric === 'pdv-percentage'
                        ? data?.pdvs?.toLocaleString()
                        : data?.count?.toString()
                    };
                    const percent = value.primary;

                    return (
                      <TableCell
                        key={`${retailer.id}-total-${priceRange.id}`}
                        className="text-center p-1 align-bottom"
                      >
                        <div className="flex flex-col justify-end items-center h-16 relative">
                          <SizingCell percent={percent} secondary={value.secondary} />
                        </div>
                      </TableCell>
                    );
                  })}
                </TableRow>
              )}
              {selectedCategories.map((catId, index) => {
                const category = categories.find(c => c.id === catId);

                return (
                  <TableRow
                    key={`${retailer.id}-${catId}`}
                    className={index === 0 ? 'border-t-2' : ''}
                  >
                    {index === 0 && (
                      <TableCell
                        rowSpan={selectedCategories.length + (showTotalRange ? 1 : 0)}
                        className="sticky left-0 bg-white font-medium border-r py-1 align-top text-xs"
                      >
                        {retailer.name}
                      </TableCell>
                    )}
                    <TableCell className="sticky left-[120px] bg-white border-r py-1 text-xs">
                      {category?.name}
                    </TableCell>
                    {generatedPriceRanges.map(priceRange => {
                      const data = assortmentData?.[retailer.id]?.[catId]?.[priceRange.id];
                      const display = getDisplayValue(data);
                      const percent = parseFloat(display.primary);

                      return (
                        <TableCell
                          key={`${retailer.id}-${catId}-${priceRange.id}`}
                          className="text-center p-1 align-bottom"
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
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AssortmentMixTable;
