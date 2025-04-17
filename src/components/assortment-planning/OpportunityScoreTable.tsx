
import React, { useState, useMemo } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { TrendingUp, TrendingDown, Minus, ExternalLink, ArrowUpDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface OpportunityScoreTableProps {
  competitors: { id: string; name: string }[];
  categories: { id: string; name: string }[];
  sortBy: string;
  minScore: number;
}

export const OpportunityScoreTable: React.FC<OpportunityScoreTableProps> = ({ 
  competitors, 
  categories,
  sortBy,
  minScore
}) => {
  const [expandedOpportunity, setExpandedOpportunity] = useState<string | null>(null);

  // Generate opportunity data
  const opportunityData = useMemo(() => {
    const generateOpportunityData = () => {
      const result = [];
      
      for (let i = 0; i < categories.length; i++) {
        for (let j = 0; j < competitors.length; j++) {
          // Only create opportunities for some combinations
          if (Math.random() > 0.6) {
            const score = Math.round(Math.random() * 100);
            const marketSize = Math.round(Math.random() * 1000) + 100;
            const growthRate = Math.round(Math.random() * 30) - 5;
            const competitiveIntensity = Math.round(Math.random() * 100);
            const entryBarrier = Math.round(Math.random() * 100);
            const profitMargin = Math.round(Math.random() * 30) + 5;
            
            result.push({
              id: `${categories[i].id}-${competitors[j].id}`,
              category: categories[i].name,
              competitor: competitors[j].name,
              opportunityScore: score,
              marketSize: marketSize,
              growthRate: growthRate,
              competitiveIntensity: competitiveIntensity,
              entryBarrier: entryBarrier,
              profitMargin: profitMargin,
              description: `Potential opportunity in ${categories[i].name} category where ${competitors[j].name} currently has product offerings but your brand doesn't.`,
              recommendedAction: growthRate > 10 ? 'High Priority' : growthRate > 0 ? 'Medium Priority' : 'Monitor'
            });
          }
        }
      }
      
      return result;
    };
    
    return generateOpportunityData();
  }, [categories, competitors]);

  // Filter and sort opportunities
  const filteredAndSortedOpportunities = useMemo(() => {
    // Filter by minimum score
    const filtered = opportunityData.filter(opp => opp.opportunityScore >= minScore);
    
    // Sort based on selected sort criteria
    return filtered.sort((a, b) => {
      switch(sortBy) {
        case 'score':
          return b.opportunityScore - a.opportunityScore;
        case 'market':
          return b.marketSize - a.marketSize;
        case 'growth':
          return b.growthRate - a.growthRate;
        case 'gaps':
          return a.category.localeCompare(b.category);
        default:
          return b.opportunityScore - a.opportunityScore;
      }
    });
  }, [opportunityData, sortBy, minScore]);

  const getScoreColor = (score: number) => {
    if (score >= 80) return "bg-green-500";
    if (score >= 60) return "bg-blue-500";
    if (score >= 40) return "bg-yellow-500";
    return "bg-red-500";
  };

  const getGrowthIcon = (growth: number) => {
    if (growth > 5) return <TrendingUp className="h-4 w-4 text-green-500" />;
    if (growth < -5) return <TrendingDown className="h-4 w-4 text-red-500" />;
    return <Minus className="h-4 w-4 text-gray-500" />;
  };

  const getPriorityBadge = (priority: string) => {
    switch(priority) {
      case 'High Priority':
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-200">High Priority</Badge>;
      case 'Medium Priority':
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">Medium Priority</Badge>;
      default:
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">Monitor</Badge>;
    }
  };

  const toggleExpand = (id: string) => {
    if (expandedOpportunity === id) {
      setExpandedOpportunity(null);
    } else {
      setExpandedOpportunity(id);
    }
  };

  return (
    <div className="space-y-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[250px]">Category</TableHead>
            <TableHead>Competitor</TableHead>
            <TableHead>
              <div className="flex items-center">
                <span>Score</span>
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </div>
            </TableHead>
            <TableHead>Market Size</TableHead>
            <TableHead>
              <div className="flex items-center">
                <span>Growth</span>
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </div>
            </TableHead>
            <TableHead>Priority</TableHead>
            <TableHead className="text-right">Details</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredAndSortedOpportunities.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-4 text-muted-foreground">
                No opportunities match your criteria
              </TableCell>
            </TableRow>
          ) : (
            filteredAndSortedOpportunities.map((opportunity) => (
              <React.Fragment key={opportunity.id}>
                <TableRow className="hover:bg-muted/50">
                  <TableCell className="font-medium">{opportunity.category}</TableCell>
                  <TableCell>{opportunity.competitor}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Progress 
                        value={opportunity.opportunityScore} 
                        className="w-[60px] h-2" 
                        indicatorClassName={getScoreColor(opportunity.opportunityScore)}
                      />
                      <span className="text-sm">{opportunity.opportunityScore}</span>
                    </div>
                  </TableCell>
                  <TableCell>${opportunity.marketSize}K</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      {getGrowthIcon(opportunity.growthRate)}
                      <span>{opportunity.growthRate}%</span>
                    </div>
                  </TableCell>
                  <TableCell>{getPriorityBadge(opportunity.recommendedAction)}</TableCell>
                  <TableCell className="text-right">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => toggleExpand(opportunity.id)}
                    >
                      View
                    </Button>
                  </TableCell>
                </TableRow>
                {expandedOpportunity === opportunity.id && (
                  <TableRow>
                    <TableCell colSpan={7} className="bg-muted/30 p-0">
                      <Card className="m-2 border-l-4" style={{ borderLeftColor: getScoreColor(opportunity.opportunityScore) }}>
                        <div className="p-4">
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                            <div>
                              <p className="text-sm text-muted-foreground">Competitive Intensity</p>
                              <div className="flex items-center gap-2 mt-1">
                                <Progress 
                                  value={opportunity.competitiveIntensity} 
                                  className="flex-1 h-2" 
                                  indicatorClassName={opportunity.competitiveIntensity > 70 ? "bg-red-500" : "bg-green-500"}
                                />
                                <span className="text-sm">{opportunity.competitiveIntensity}%</span>
                              </div>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">Entry Barrier</p>
                              <div className="flex items-center gap-2 mt-1">
                                <Progress 
                                  value={opportunity.entryBarrier} 
                                  className="flex-1 h-2" 
                                  indicatorClassName={opportunity.entryBarrier > 70 ? "bg-red-500" : "bg-green-500"}
                                />
                                <span className="text-sm">{opportunity.entryBarrier}%</span>
                              </div>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">Profit Margin</p>
                              <div className="flex items-center gap-2 mt-1">
                                <Progress 
                                  value={opportunity.profitMargin} 
                                  className="flex-1 h-2" 
                                  indicatorClassName="bg-green-500"
                                />
                                <span className="text-sm">{opportunity.profitMargin}%</span>
                              </div>
                            </div>
                          </div>
                          
                          <p className="text-sm mb-3">{opportunity.description}</p>
                          
                          <div className="flex justify-between items-center">
                            <Badge variant="outline" className="text-xs">
                              Gap Score: {opportunity.opportunityScore}
                            </Badge>
                            <Button size="sm" variant="outline" className="flex items-center gap-1">
                              <ExternalLink size={14} />
                              <span>Detailed Analysis</span>
                            </Button>
                          </div>
                        </div>
                      </Card>
                    </TableCell>
                  </TableRow>
                )}
              </React.Fragment>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};
