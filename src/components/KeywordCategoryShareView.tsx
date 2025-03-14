
import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { keywordGroups, sampleKeywordShareData } from '@/utils/data';
import { InfoIcon, AlertCircle, TrendingUp, TrendingDown } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { TrafficHeatmap } from './charts/TrafficHeatmap';
import { DomainWaterfallChart } from './charts/DomainWaterfallChart';

interface KeywordShareData {
  domain: string;
  share: number;
}

const KeywordCategoryShareView = () => {
  const [selectedGroup, setSelectedGroup] = useState<string>(keywordGroups[0].id);
  const [groupName, setGroupName] = useState<string>(keywordGroups[0].name);
  const [activeTab, setActiveTab] = useState<string>("share");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [keywordShareData, setKeywordShareData] = useState<KeywordShareData[]>(sampleKeywordShareData);
  const { toast } = useToast();

  useEffect(() => {
    const fetchKeywordShareData = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        // In a real implementation, we would make an API call to SimilarWeb here
        // For now, simulate an API call with a timeout
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Using sample data for now - in a real implementation, this would come from the API
        setKeywordShareData(sampleKeywordShareData);
        
        // Set the group name based on the selected group
        const group = keywordGroups.find(g => g.id === selectedGroup);
        if (group) {
          setGroupName(group.name);
        }
        
        toast({
          title: "Data loaded successfully",
          description: `Loaded keyword share data for ${group?.name}`,
        });
      } catch (err) {
        setError("Failed to fetch keyword share data. Please try again later.");
        toast({
          variant: "destructive",
          title: "Error loading data",
          description: "Could not load keyword share data. Please try again.",
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchKeywordShareData();
  }, [selectedGroup, toast]);

  const getProgressColor = (share: number): string => {
    if (share > 20) return 'bg-green-500';
    if (share > 10) return 'bg-blue-500';
    return 'bg-slate-500';
  };

  return (
    <div className="animate-fade-in">
      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-medium text-dashboard-text">Keyword Category Share Analysis</h2>
          <Select value={selectedGroup} onValueChange={setSelectedGroup}>
            <SelectTrigger className="w-[220px]">
              <SelectValue placeholder="Select keyword group" />
            </SelectTrigger>
            <SelectContent>
              {keywordGroups.map((group) => (
                <SelectItem key={group.id} value={group.id}>{group.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Tabs defaultValue="share" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="share">Share of Search</TabsTrigger>
            <TabsTrigger value="heatmap">Traffic Heatmap</TabsTrigger>
            <TabsTrigger value="waterfall">Domain Growth</TabsTrigger>
          </TabsList>
          
          <TabsContent value="share">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>Share of Search: {groupName}</CardTitle>
                    <CardDescription>Top 10 websites ranking for keyword group based on search visibility</CardDescription>
                  </div>
                  <div className="group relative">
                    <InfoIcon size={18} className="text-dashboard-secondaryText cursor-help" />
                    <div className="absolute right-0 w-72 p-3 bg-white border border-dashboard-border rounded-md shadow-sm text-xs text-dashboard-secondaryText invisible group-hover:visible z-10">
                      <p className="font-medium text-dashboard-text mb-1">Suggested actions:</p>
                      <ul className="list-disc pl-4 space-y-1">
                        <li>Identify top competitors in search results</li>
                        <li>Analyze content strategies of high-ranking domains</li>
                        <li>Target keywords with potential visibility growth</li>
                        <li>Monitor share changes over time to detect trends</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-dashboard-primary"></div>
                  </div>
                ) : error ? (
                  <div className="flex flex-col items-center justify-center h-64 text-red-500">
                    <AlertCircle size={32} className="mb-2" />
                    <p>{error}</p>
                  </div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[40px]">#</TableHead>
                        <TableHead>Domain</TableHead>
                        <TableHead className="w-[200px] text-right">Share of Search</TableHead>
                        <TableHead className="w-[400px]">Distribution</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {keywordShareData.map((item, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">{index + 1}</TableCell>
                          <TableCell>{item.domain}</TableCell>
                          <TableCell className="text-right">{item.share.toFixed(1)}%</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Progress 
                                value={item.share} 
                                max={30} 
                                className={`h-2 ${getProgressColor(item.share)}`} 
                              />
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="heatmap">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>Traffic Heatmap: {groupName}</CardTitle>
                    <CardDescription>Monthly traffic changes by keyword category and domain</CardDescription>
                  </div>
                  <div className="group relative">
                    <InfoIcon size={18} className="text-dashboard-secondaryText cursor-help" />
                    <div className="absolute right-0 w-72 p-3 bg-white border border-dashboard-border rounded-md shadow-sm text-xs text-dashboard-secondaryText invisible group-hover:visible z-10">
                      <p className="font-medium text-dashboard-text mb-1">Suggested actions:</p>
                      <ul className="list-disc pl-4 space-y-1">
                        <li>Identify seasonal traffic patterns</li>
                        <li>Detect emerging keyword categories</li>
                        <li>Optimize content for high-growth categories</li>
                        <li>Plan content calendar around traffic trends</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-dashboard-primary"></div>
                  </div>
                ) : error ? (
                  <div className="flex flex-col items-center justify-center h-64 text-red-500">
                    <AlertCircle size={32} className="mb-2" />
                    <p>{error}</p>
                  </div>
                ) : (
                  <div className="h-96">
                    <TrafficHeatmap selectedGroup={selectedGroup} />
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="waterfall">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>Domain Growth Analysis: {groupName}</CardTitle>
                    <CardDescription>Waterfall chart showing traffic share growth and decline by domain</CardDescription>
                  </div>
                  <div className="group relative">
                    <InfoIcon size={18} className="text-dashboard-secondaryText cursor-help" />
                    <div className="absolute right-0 w-72 p-3 bg-white border border-dashboard-border rounded-md shadow-sm text-xs text-dashboard-secondaryText invisible group-hover:visible z-10">
                      <p className="font-medium text-dashboard-text mb-1">Suggested actions:</p>
                      <ul className="list-disc pl-4 space-y-1">
                        <li>Identify fastest growing competitors</li>
                        <li>Understand traffic share redistribution</li>
                        <li>Track your domain's share trajectory</li>
                        <li>Analyze which domains are taking market share</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-dashboard-primary"></div>
                  </div>
                ) : error ? (
                  <div className="flex flex-col items-center justify-center h-64 text-red-500">
                    <AlertCircle size={32} className="mb-2" />
                    <p>{error}</p>
                  </div>
                ) : (
                  <div className="h-96">
                    <DomainWaterfallChart selectedGroup={selectedGroup} />
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>Keyword Opportunity Analysis</CardTitle>
                  <CardDescription>Keywords with high search volume and low competition</CardDescription>
                </div>
                <div className="group relative">
                  <InfoIcon size={18} className="text-dashboard-secondaryText cursor-help" />
                  <div className="absolute right-0 w-72 p-3 bg-white border border-dashboard-border rounded-md shadow-sm text-xs text-dashboard-secondaryText invisible group-hover:visible z-10">
                    <p className="font-medium text-dashboard-text mb-1">Suggested actions:</p>
                    <ul className="list-disc pl-4 space-y-1">
                      <li>Create targeted content for high-opportunity keywords</li>
                      <li>Optimize existing pages for these keywords</li>
                      <li>Track ranking improvements over time</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-dashboard-secondaryText text-sm mb-4">Coming soon - This feature will analyze the keyword group to identify untapped opportunities</p>
              <div className="h-48 flex items-center justify-center border border-dashed border-dashboard-border rounded-md">
                <p className="text-dashboard-secondaryText">Opportunity analysis will appear here</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>Historical Trend Analysis</CardTitle>
                  <CardDescription>Search visibility changes over time</CardDescription>
                </div>
                <div className="group relative">
                  <InfoIcon size={18} className="text-dashboard-secondaryText cursor-help" />
                  <div className="absolute right-0 w-72 p-3 bg-white border border-dashboard-border rounded-md shadow-sm text-xs text-dashboard-secondaryText invisible group-hover:visible z-10">
                    <p className="font-medium text-dashboard-text mb-1">Suggested actions:</p>
                    <ul className="list-disc pl-4 space-y-1">
                      <li>Identify seasonality in search patterns</li>
                      <li>Monitor competitive position over time</li>
                      <li>Plan content calendar based on search trends</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-dashboard-secondaryText text-sm mb-4">Coming soon - This feature will show visibility changes over time</p>
              <div className="h-48 flex items-center justify-center border border-dashed border-dashboard-border rounded-md">
                <p className="text-dashboard-secondaryText">Trend analysis will appear here</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="text-xs text-center text-dashboard-secondaryText mt-6 pt-4 border-t border-dashboard-border">
          <p>Source: SimilarWeb API • Metrics: Share of Search, Keyword Visibility, Domain Rankings</p>
        </div>
      </div>
    </div>
  );
};

export default KeywordCategoryShareView;
