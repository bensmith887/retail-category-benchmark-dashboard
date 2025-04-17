import React, { useState, useEffect } from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from '@/components/ui/card';
import { GapMatrix } from './GapMatrix';
import { OpportunityScoreTable } from './OpportunityScoreTable';
import { CannibalizedProductsView } from './CannibalizedProductsView';
import { ExclusivityTracker } from './ExclusivityTracker';
import { AlertsPanel } from './AlertsPanel';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Info, Filter, ArrowUpDown, Search, Bell } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

const GapAnalysisTab = ({ 
  competitors, 
  categories, 
  selectedCompetitors 
}: {
  competitors: { id: string; name: string }[];
  categories: { id: string; name: string }[];
  selectedCompetitors: string[];
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('score');
  const [minScore, setMinScore] = useState(50);
  const [filteredCategories, setFilteredCategories] = useState(categories);
  const [gapAnalysisView, setGapAnalysisView] = useState('matrix');
  const [showAlerts, setShowAlerts] = useState(false);
  const [alerts, setAlerts] = useState<any[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    if (searchTerm) {
      setFilteredCategories(
        categories.filter(category => 
          category.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    } else {
      setFilteredCategories(categories);
    }
  }, [searchTerm, categories]);

  useEffect(() => {
    const mockAlerts = [
      { 
        id: 1, 
        title: 'New gap detected', 
        category: 'Home & Kitchen', 
        competitor: 'Amazon', 
        date: '2025-04-16', 
        score: 85,
        type: 'gap'
      },
      { 
        id: 2, 
        title: 'Opportunity score increase', 
        category: 'Electronics', 
        competitor: 'Best Buy', 
        date: '2025-04-15', 
        score: 72,
        type: 'opportunity'
      },
      { 
        id: 3, 
        title: 'New exclusivity', 
        category: 'Clothing', 
        competitor: 'Target', 
        date: '2025-04-14', 
        score: 68,
        type: 'exclusivity'
      }
    ];
    
    setAlerts(mockAlerts);
    
    if (mockAlerts.length > 0 && !showAlerts) {
      toast({
        title: `${mockAlerts.length} new gap analysis alerts`,
        description: "Check the alerts panel for details",
        variant: "default",
      });
    }
  }, [toast]);

  const handleToggleAlerts = () => {
    setShowAlerts(!showAlerts);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Gap Analysis Toolkit</h2>
          <p className="text-muted-foreground">
            Identify product gaps and opportunities across categories and competitors
          </p>
        </div>
        <Button 
          variant="outline" 
          size="sm" 
          className="flex items-center gap-2"
          onClick={handleToggleAlerts}
        >
          <Bell size={16} />
          <span>Alerts</span>
          <Badge className="ml-1 bg-red-500">{alerts.length}</Badge>
        </Button>
      </div>

      {showAlerts && (
        <Card className="border-l-4 border-l-orange-500 mb-6">
          <CardContent className="pt-6">
            <AlertsPanel alerts={alerts} onClose={() => setShowAlerts(false)} />
          </CardContent>
        </Card>
      )}

      <Card className="mb-6">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Filter size={18} />
              <span>Filters</span>
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label>Search Categories</Label>
              <div className="flex w-full items-center space-x-2 mt-1.5">
                <div className="relative flex-1">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="Search..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-8 w-full"
                  />
                </div>
              </div>
            </div>
            <div>
              <Label>Sort By</Label>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="mt-1.5">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="score">Opportunity Score</SelectItem>
                  <SelectItem value="market">Market Size</SelectItem>
                  <SelectItem value="growth">Growth Potential</SelectItem>
                  <SelectItem value="gaps">Number of Gaps</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Minimum Score</Label>
              <div className="flex items-center space-x-2 mt-1.5">
                <Input 
                  type="number" 
                  value={minScore.toString()} 
                  onChange={(e) => setMinScore(parseInt(e.target.value) || 0)}
                  className="w-full"
                  min="0"
                  max="100"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs value={gapAnalysisView} onValueChange={setGapAnalysisView}>
        <TabsList className="grid grid-cols-4 w-full">
          <TabsTrigger value="matrix" className="flex items-center gap-2">
            <Info size={16} />
            <span>Gap Matrix</span>
          </TabsTrigger>
          <TabsTrigger value="opportunities" className="flex items-center gap-2">
            <ArrowUpDown size={16} />
            <span>Opportunities</span>
          </TabsTrigger>
          <TabsTrigger value="cannibalization" className="flex items-center gap-2">
            <Filter size={16} />
            <span>Cannibalization</span>
          </TabsTrigger>
          <TabsTrigger value="exclusivity" className="flex items-center gap-2">
            <Bell size={16} />
            <span>Exclusivity</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="matrix">
          <Card>
            <CardHeader>
              <CardTitle>Product Gap Matrix</CardTitle>
              <CardDescription>
                Visual matrix showing categories where competitors have products but you don't
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <GapMatrix 
                competitors={competitors.filter(comp => selectedCompetitors.includes(comp.name))} 
                categories={filteredCategories} 
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="opportunities">
          <Card>
            <CardHeader>
              <CardTitle>Opportunity Scoring</CardTitle>
              <CardDescription>
                Ranked list of product gaps based on market size and growth potential
              </CardDescription>
            </CardHeader>
            <CardContent>
              <OpportunityScoreTable 
                competitors={competitors.filter(comp => selectedCompetitors.includes(comp.name))} 
                categories={filteredCategories}
                sortBy={sortBy}
                minScore={minScore}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="cannibalization">
          <Card>
            <CardHeader>
              <CardTitle>Cannibalization Analysis</CardTitle>
              <CardDescription>
                Identify products that may be cannibalizing each other's sales
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CannibalizedProductsView categories={filteredCategories} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="exclusivity">
          <Card>
            <CardHeader>
              <CardTitle>Exclusivity Tracker</CardTitle>
              <CardDescription>
                Track products that are exclusive to you or your competitors
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ExclusivityTracker 
                competitors={competitors.filter(comp => selectedCompetitors.includes(comp.name))} 
                categories={filteredCategories} 
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default GapAnalysisTab;
