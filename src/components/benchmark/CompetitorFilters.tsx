
import React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { benchmarkData } from "@/utils/benchmarkData";

interface CompetitorFiltersProps {
  selectedCompetitors: string[];
  setSelectedCompetitors: (competitors: string[]) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
}

export const CompetitorFilters: React.FC<CompetitorFiltersProps> = ({
  selectedCompetitors,
  setSelectedCompetitors,
  selectedCategory,
  setSelectedCategory,
}) => {
  const [open, setOpen] = React.useState(false);
  
  const competitors = benchmarkData.competitors.map(comp => comp.name);
  const categories = ["All Categories", ...benchmarkData.categories.map(cat => cat.name)];

  const toggleCompetitor = (competitor: string) => {
    if (selectedCompetitors.includes(competitor)) {
      setSelectedCompetitors(selectedCompetitors.filter(c => c !== competitor));
    } else {
      setSelectedCompetitors([...selectedCompetitors, competitor]);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between p-4 bg-muted/50 rounded-lg">
      <div className="space-y-1 w-full sm:w-auto">
        <h4 className="text-sm font-medium">Competitors</h4>
        <div className="flex flex-wrap gap-2">
          {competitors.map(competitor => (
            <div key={competitor} className="flex items-center space-x-2">
              <Checkbox 
                id={`competitor-${competitor}`}
                checked={selectedCompetitors.includes(competitor)}
                onCheckedChange={() => toggleCompetitor(competitor)}
              />
              <label
                htmlFor={`competitor-${competitor}`}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {competitor}
              </label>
            </div>
          ))}
        </div>
      </div>
      
      <div className="space-y-1 w-full sm:w-auto">
        <h4 className="text-sm font-medium">Category</h4>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-full sm:w-[200px] justify-between"
            >
              {selectedCategory}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-full sm:w-[200px] p-0">
            <Command>
              <CommandInput placeholder="Search category..." />
              <CommandEmpty>No category found.</CommandEmpty>
              <CommandGroup>
                {categories.map((category) => (
                  <CommandItem
                    key={category}
                    value={category}
                    onSelect={(currentValue) => {
                      setSelectedCategory(currentValue);
                      setOpen(false);
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        selectedCategory === category ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {category}
                  </CommandItem>
                ))}
              </CommandGroup>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};
