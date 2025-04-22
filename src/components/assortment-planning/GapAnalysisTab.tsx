
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
import { Info, Filter, ArrowUpDown, Search, Bell, Download } from 'lucide-react';
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

// Import recommendation component
import { GapRecommendations, Recommendation } from './GapRecommendations';

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

  // Generate mock recommendations
  const recommendations: Recommendation[] = [
    {
      id: 1,
      category: 'Beauty',
      subCategory: 'Haircare',
      competitor: 'Amazon',
      skuCount: 1200,
      growthRate: 18,
      opportunityScore: 92,
      priority: 'high',
      reasoning: 'High search volume and competitor success'
    },
    {
      id: 2,
      category: 'Electronics',
      subCategory: 'Smart Home',
      competitor: 'Best Buy',
      skuCount: 850,
      growthRate: 23,
      opportunityScore: 87,
      priority: 'high',
      reasoning: 'Trending category with high margins'
    },
    {
      id: 3,
      category: 'Clothing',
      subCategory: 'Activewear',
      competitor: 'Target',
      skuCount: 620,
      growthRate: 15,
      opportunityScore: 75,
      priority: 'medium',
      reasoning: 'Growing market segment'
    },
    {
      id: 4,
      category: 'Home & Kitchen',
      subCategory: 'Coffee Makers',
      competitor: 'Walmart',
      skuCount: 320,
      growthRate: 8,
      opportunityScore: 65,
      priority: 'medium',
      reasoning: 'Stable market with repeat purchases'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Gap Analysis Toolkit</h2>
          <p className="text-muted-foreground">
            Identify product gaps and opportunities across categories and competitors
          </p>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex items-center gap-2"
            onClick={() => {
              // Mock export functionality
              toast({
                title: "Dashboard exported",
                description: "The Gap Analysis data has been exported to Excel",
              });
            }}
          >
            <Download size={16} />
            <span>Export</span>
          </Button>
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
      </div>

      {showAlerts && (
        <Card className="border-l-4 border-l-orange-500 mb-6">
          <CardContent className="pt-6">
            <AlertsPanel alerts={alerts} onClose={() => setShowAlerts(false)} />
          </CardContent>
        </Card>
      )}

      <Tabs value={gapAnalysisView} onValueChange={setGapAnalysisView}>
        <TabsList className="grid grid-cols-5 w-full">
          <TabsTrigger value="matrix" className="flex items-center gap-2">
            <Info size={16} />
            <span>Gap Matrix</span>
          </TabsTrigger>
          <TabsTrigger value="opportunities" className="flex items-center gap-2">
            <ArrowUpDown size={16} />
            <span>Opportunities</span>
          </TabsTrigger>
          <TabsTrigger value="recommendations" className="flex items-center gap-2">
            <Filter size={16} />
            <span>Recommendations</span>
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
              <CardTitle>Enhanced Product Gap Matrix</CardTitle>
              <CardDescription>
                Interactive matrix showing categories where competitors have products but you don't,
                with detailed metrics and actionable insights
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
        
        <TabsContent value="recommendations">
          <Card>
            <CardHeader>
              <CardTitle>Strategic Recommendations</CardTitle>
              <CardDescription>
                Data-driven suggestions to address gaps and optimize your product portfolio
              </CardDescription>
            </CardHeader>
            <CardContent>
              <GapRecommendations recommendations={recommendations} />
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
