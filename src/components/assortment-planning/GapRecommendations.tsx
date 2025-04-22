
import React, { useState } from 'react';
import { 
  Card, 
  CardContent
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { ArrowRight, ChevronUp, ChevronDown, TrendingUp, ListTodo, FileText } from 'lucide-react';

export interface Recommendation {
  id: number;
  category: string;
  subCategory: string;
  competitor: string;
  skuCount: number;
  growthRate: number;
  opportunityScore: number;
  priority: 'high' | 'medium' | 'low';
  reasoning: string;
}

interface GapRecommendationsProps {
  recommendations: Recommendation[];
}

export const GapRecommendations: React.FC<GapRecommendationsProps> = ({ 
  recommendations 
}) => {
  const [filter, setFilter] = useState<string>('all');
  const [expandedId, setExpandedId] = useState<number | null>(null);
  
  const filteredRecommendations = recommendations.filter(rec => {
    if (filter === 'all') return true;
    return rec.priority === filter;
  });
  
  const toggleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };
  
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800 border-red-300';
      case 'medium':
        return 'bg-orange-100 text-orange-800 border-orange-300';
      case 'low':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };
  
  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high':
        return <Badge className="bg-red-500">High Priority</Badge>;
      case 'medium':
        return <Badge className="bg-orange-500">Medium Priority</Badge>;
      case 'low':
        return <Badge className="bg-blue-500">Low Priority</Badge>;
      default:
        return <Badge>Unknown</Badge>;
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="text-sm text-muted-foreground">
          Showing {filteredRecommendations.length} of {recommendations.length} recommendations
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm">Filter:</span>
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="All Priorities" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Priorities</SelectItem>
              <SelectItem value="high">High Priority</SelectItem>
              <SelectItem value="medium">Medium Priority</SelectItem>
              <SelectItem value="low">Low Priority</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="space-y-4">
        {filteredRecommendations.map((rec) => (
          <Card 
            key={rec.id} 
            className={`border-l-4 ${
              rec.priority === 'high' 
                ? 'border-l-red-500' 
                : rec.priority === 'medium' 
                  ? 'border-l-orange-500' 
                  : 'border-l-blue-500'
            }`}
          >
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-lg font-bold">
                      Add {rec.subCategory} to {rec.category}
                    </h3>
                    {getPriorityBadge(rec.priority)}
                  </div>
                  <p className="text-muted-foreground text-sm mb-4">
                    {rec.competitor} has {rec.skuCount.toLocaleString()} SKUs in this category, growing at {rec.growthRate}% YoY
                  </p>
                  
                  <div className="flex items-center gap-6 mb-4">
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Opportunity Score</p>
                      <div className="flex items-center">
                        <span className="font-bold mr-2">{rec.opportunityScore}</span>
                        <Progress 
                          value={rec.opportunityScore} 
                          className="w-24 h-2" 
                          indicatorClassName={
                            rec.opportunityScore >= 80 ? "bg-red-500" : 
                            rec.opportunityScore >= 60 ? "bg-orange-500" : 
                            "bg-blue-500"
                          }
                        />
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Growth Rate</p>
                      <span className="font-bold text-green-600">+{rec.growthRate}%</span>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Competitor SKUs</p>
                      <span className="font-bold">{rec.skuCount.toLocaleString()}</span>
                    </div>
                  </div>
                  
                  <div 
                    className={`overflow-hidden transition-all duration-300 ${
                      expandedId === rec.id ? 'max-h-96' : 'max-h-0'
                    }`}
                  >
                    <div className={`p-4 rounded-md ${getPriorityColor(rec.priority)}`}>
                      <h4 className="font-medium mb-2">Reasoning</h4>
                      <p className="text-sm">{rec.reasoning}</p>
                      
                      <h4 className="font-medium mt-4 mb-2">Implementation Strategy</h4>
                      <ul className="text-sm list-disc pl-5 space-y-1">
                        <li>Start with a focused selection of top-selling SKUs</li>
                        <li>Target competitive price points based on market analysis</li>
                        <li>Leverage existing supply chain relationships</li>
                        <li>Emphasize unique differentiators in marketing</li>
                      </ul>
                      
                      <div className="mt-4 flex gap-3">
                        <Button size="sm" variant="secondary" className="flex items-center gap-1">
                          <TrendingUp size={14} />
                          <span>View Market Analysis</span>
                        </Button>
                        <Button size="sm" variant="outline" className="flex items-center gap-1">
                          <ListTodo size={14} />
                          <span>Add to Roadmap</span>
                        </Button>
                        <Button size="sm" variant="outline" className="flex items-center gap-1">
                          <FileText size={14} />
                          <span>Competitor SKUs</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
                
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => toggleExpand(rec.id)}
                  aria-label={expandedId === rec.id ? "Collapse" : "Expand"}
                >
                  {expandedId === rec.id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="mt-8 bg-muted/30 border rounded-lg p-6">
        <h3 className="text-lg font-bold mb-2">Optimization Recommendations</h3>
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <div className="bg-amber-100 text-amber-800 p-2 rounded">
              <TrendingUp size={18} />
            </div>
            <div>
              <p className="font-medium">Clothing is overrepresented in your catalog</p>
              <p className="text-sm text-muted-foreground">Consider optimizing SKU range or bundling similar products to reduce cannibalization and improve inventory efficiency.</p>
              <Button variant="link" size="sm" className="p-0 h-auto mt-1 flex items-center gap-1">
                View Analysis <ArrowRight size={12} />
              </Button>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <div className="bg-blue-100 text-blue-800 p-2 rounded">
              <TrendingUp size={18} />
            </div>
            <div>
              <p className="font-medium">Sports & Outdoors category has excess SKU overlaps</p>
              <p className="text-sm text-muted-foreground">31% of SKUs have high similarity scores. Consider consolidation to improve search clarity and conversion rates.</p>
              <Button variant="link" size="sm" className="p-0 h-auto mt-1 flex items-center gap-1">
                View Analysis <ArrowRight size={12} />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
