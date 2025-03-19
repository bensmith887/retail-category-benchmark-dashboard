
import { format, subMonths } from 'date-fns';

export interface RetailerData {
  name: string;
  visits: number;
  uniqueVisitors: number;
  previousVisits: number;
  marketShare: number;
  previousMarketShare: number;
  conversionRate: number;
  previousConversionRate: number;
  averageOrderValue: number;
  previousAverageOrderValue: number;
  bounceRate: number;
  previousBounceRate: number;
  timeOnSite: number;
  previousTimeOnSite: number;
  segments: string[];
}

export interface TrafficSource {
  channel: string;
  visits: number;
  previousVisits: number;
  conversionRate: number;
  costPerVisit: number;
  roi: number;
}

export interface CompetitorPosition {
  name: string;
  xValue: number; // Market Share
  yValue: number; // Growth Rate
  size: number;   // Total Traffic (bubble size)
}

export interface CrossVisitationData {
  retailer: string;
  competitor: string;
  percentage: number;
}

export interface Opportunity {
  id: string;
  title: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
  category: 'traffic' | 'conversion' | 'market' | 'engagement';
  recommendation: string;
  metric: string;
  change: number;
}

export interface KPIData {
  metric: string;
  value: number;
  previousValue: number;
  unit: string;
  target?: number;
}

export interface SimilarWebFashionData {
  retailers: RetailerData[];
  trafficSources: TrafficSource[];
  competitorPositioning: CompetitorPosition[];
  crossVisitation: CrossVisitationData[];
  opportunities: Opportunity[];
  kpis: KPIData[];
  monthlyVisitData: MonthlyVisitData[];
  segmentShare: SegmentShare[];
  keywordPerformance: KeywordPerformance[];
}

export interface MonthlyVisitData {
  month: string;
  visits: number;
  uniqueVisitors: number;
}

export interface SegmentShare {
  segment: string;
  share: number;
  previousShare: number;
}

export interface KeywordPerformance {
  keyword: string;
  visits: number;
  conversion: number;
  cpc: number;
  isOwned: boolean;
}

// Generate realistic dates for the last 12 months
const generateMonthlyDates = (count: number = 12): string[] => {
  return Array.from({ length: count }).map((_, i) => {
    return format(subMonths(new Date(), i), 'MMM yyyy');
  }).reverse();
};

// Generate fashion analytics data
export const generateFashionAnalyticsData = (): SimilarWebFashionData => {
  const months = generateMonthlyDates();
  
  const retailers: RetailerData[] = [
    {
      name: "YourFashion",
      visits: 3450000,
      uniqueVisitors: 2670000,
      previousVisits: 3100000,
      marketShare: 18.5,
      previousMarketShare: 17.2,
      conversionRate: 3.2,
      previousConversionRate: 2.9,
      averageOrderValue: 78.5,
      previousAverageOrderValue: 74.2,
      bounceRate: 42.1,
      previousBounceRate: 45.3,
      timeOnSite: 4.2,
      previousTimeOnSite: 3.9,
      segments: ["Women's Apparel", "Men's Apparel", "Accessories"]
    },
    {
      name: "StyleMart",
      visits: 4200000,
      uniqueVisitors: 3100000,
      previousVisits: 3900000,
      marketShare: 22.6,
      previousMarketShare: 21.8,
      conversionRate: 3.7,
      previousConversionRate: 3.6,
      averageOrderValue: 82.1,
      previousAverageOrderValue: 81.3,
      bounceRate: 39.8,
      previousBounceRate: 40.2,
      timeOnSite: 4.5,
      previousTimeOnSite: 4.4,
      segments: ["Women's Apparel", "Men's Apparel", "Children's Apparel", "Accessories"]
    },
    {
      name: "FashionNova",
      visits: 2800000,
      uniqueVisitors: 2100000,
      previousVisits: 2400000,
      marketShare: 15.1,
      previousMarketShare: 13.4,
      conversionRate: 4.1,
      previousConversionRate: 3.8,
      averageOrderValue: 68.5,
      previousAverageOrderValue: 65.9,
      bounceRate: 43.5,
      previousBounceRate: 44.2,
      timeOnSite: 3.8,
      previousTimeOnSite: 3.6,
      segments: ["Women's Apparel", "Accessories"]
    },
    {
      name: "LuxeThreads",
      visits: 1950000,
      uniqueVisitors: 1500000,
      previousVisits: 1800000,
      marketShare: 10.5,
      previousMarketShare: 10.1,
      conversionRate: 2.8,
      previousConversionRate: 2.7,
      averageOrderValue: 112.4,
      previousAverageOrderValue: 110.1,
      bounceRate: 38.7,
      previousBounceRate: 39.1,
      timeOnSite: 5.2,
      previousTimeOnSite: 5.0,
      segments: ["Luxury Apparel", "Accessories", "Footwear"]
    },
    {
      name: "UrbanStyles",
      visits: 2100000,
      uniqueVisitors: 1680000,
      previousVisits: 1950000,
      marketShare: 11.3,
      previousMarketShare: 10.9,
      conversionRate: 3.5,
      previousConversionRate: 3.3,
      averageOrderValue: 72.3,
      previousAverageOrderValue: 70.8,
      bounceRate: 41.2,
      previousBounceRate: 42.0,
      timeOnSite: 3.9,
      previousTimeOnSite: 3.7,
      segments: ["Urban Wear", "Streetwear", "Accessories"]
    },
    {
      name: "TrendSetters",
      visits: 1680000,
      uniqueVisitors: 1350000,
      previousVisits: 1620000,
      marketShare: 9.0,
      previousMarketShare: 9.0,
      conversionRate: 3.0,
      previousConversionRate: 3.1,
      averageOrderValue: 65.8,
      previousAverageOrderValue: 66.4,
      bounceRate: 44.3,
      previousBounceRate: 43.8,
      timeOnSite: 3.5,
      previousTimeOnSite: 3.6,
      segments: ["Women's Apparel", "Men's Apparel"]
    },
    {
      name: "OutdoorGear",
      visits: 1250000,
      uniqueVisitors: 980000,
      previousVisits: 1100000,
      marketShare: 6.7,
      previousMarketShare: 6.1,
      conversionRate: 3.3,
      previousConversionRate: 3.0,
      averageOrderValue: 95.2,
      previousAverageOrderValue: 92.7,
      bounceRate: 40.8,
      previousBounceRate: 41.5,
      timeOnSite: 4.1,
      previousTimeOnSite: 3.9,
      segments: ["Outdoor Apparel", "Sports Gear"]
    },
    {
      name: "VintageFashion",
      visits: 980000,
      uniqueVisitors: 750000,
      previousVisits: 920000,
      marketShare: 5.3,
      previousMarketShare: 5.1,
      conversionRate: 2.9,
      previousConversionRate: 2.8,
      averageOrderValue: 59.7,
      previousAverageOrderValue: 58.9,
      bounceRate: 45.1,
      previousBounceRate: 45.3,
      timeOnSite: 3.6,
      previousTimeOnSite: 3.5,
      segments: ["Vintage", "Accessories"]
    },
    {
      name: "BudgetStyles",
      visits: 720000,
      uniqueVisitors: 560000,
      previousVisits: 700000,
      marketShare: 3.9,
      previousMarketShare: 3.9,
      conversionRate: 3.4,
      previousConversionRate: 3.2,
      averageOrderValue: 45.8,
      previousAverageOrderValue: 44.3,
      bounceRate: 46.2,
      previousBounceRate: 46.5,
      timeOnSite: 3.2,
      previousTimeOnSite: 3.1,
      segments: ["Affordable Fashion"]
    }
  ];

  const trafficSources: TrafficSource[] = [
    {
      channel: "Organic Search",
      visits: 1480000,
      previousVisits: 1250000,
      conversionRate: 2.8,
      costPerVisit: 0,
      roi: 0
    },
    {
      channel: "Direct",
      visits: 870000,
      previousVisits: 820000,
      conversionRate: 3.9,
      costPerVisit: 0,
      roi: 0
    },
    {
      channel: "Paid Search",
      visits: 560000,
      previousVisits: 490000,
      conversionRate: 3.5,
      costPerVisit: 0.42,
      roi: 4.2
    },
    {
      channel: "Social Media",
      visits: 410000,
      previousVisits: 340000,
      conversionRate: 2.7,
      costPerVisit: 0.35,
      roi: 3.8
    },
    {
      channel: "Email",
      visits: 210000,
      previousVisits: 190000,
      conversionRate: 4.6,
      costPerVisit: 0.12,
      roi: 8.2
    },
    {
      channel: "Referral",
      visits: 180000,
      previousVisits: 165000,
      conversionRate: 3.2,
      costPerVisit: 0.18,
      roi: 5.4
    },
    {
      channel: "Display",
      visits: 150000,
      previousVisits: 135000,
      conversionRate: 1.9,
      costPerVisit: 0.38,
      roi: 2.6
    }
  ];

  const competitorPositioning: CompetitorPosition[] = [
    { name: "YourFashion", xValue: 18.5, yValue: 11.3, size: 3450000 },
    { name: "StyleMart", xValue: 22.6, yValue: 7.7, size: 4200000 },
    { name: "FashionNova", xValue: 15.1, yValue: 16.7, size: 2800000 },
    { name: "LuxeThreads", xValue: 10.5, yValue: 8.3, size: 1950000 },
    { name: "UrbanStyles", xValue: 11.3, yValue: 7.7, size: 2100000 },
    { name: "TrendSetters", xValue: 9.0, yValue: 3.7, size: 1680000 },
    { name: "OutdoorGear", xValue: 6.7, yValue: 13.6, size: 1250000 },
    { name: "VintageFashion", xValue: 5.3, yValue: 6.5, size: 980000 },
    { name: "BudgetStyles", xValue: 3.9, yValue: 2.9, size: 720000 }
  ];

  const crossVisitation: CrossVisitationData[] = [
    { retailer: "YourFashion", competitor: "StyleMart", percentage: 42.5 },
    { retailer: "YourFashion", competitor: "FashionNova", percentage: 38.2 },
    { retailer: "YourFashion", competitor: "LuxeThreads", percentage: 22.7 },
    { retailer: "YourFashion", competitor: "UrbanStyles", percentage: 31.5 },
    { retailer: "YourFashion", competitor: "TrendSetters", percentage: 29.3 },
    { retailer: "YourFashion", competitor: "OutdoorGear", percentage: 18.9 },
    { retailer: "YourFashion", competitor: "VintageFashion", percentage: 14.5 },
    { retailer: "YourFashion", competitor: "BudgetStyles", percentage: 12.8 }
  ];

  const opportunities: Opportunity[] = [
    {
      id: "opp1",
      title: "Social Media Traffic Opportunity",
      description: "Social media traffic is growing at 20.6%, outpacing overall traffic growth of 11.3%",
      impact: "high",
      category: "traffic",
      recommendation: "Increase social media ad spend by 15% and focus on Instagram and TikTok",
      metric: "Social Media Visits",
      change: 20.6
    },
    {
      id: "opp2",
      title: "Mobile Conversion Rate Gap",
      description: "Mobile conversion rate (2.4%) lags behind desktop (3.8%) by 36.8%",
      impact: "high",
      category: "conversion",
      recommendation: "Optimize mobile checkout flow and test simplified payment options",
      metric: "Mobile Conversion Rate",
      change: -36.8
    },
    {
      id: "opp3",
      title: "Market Share Growth in Women's Accessories",
      description: "Your market share in women's accessories segment has increased 2.1 percentage points",
      impact: "medium",
      category: "market",
      recommendation: "Capitalize on momentum by expanding accessories selection and increasing visibility",
      metric: "Accessories Market Share",
      change: 13.7
    },
    {
      id: "opp4",
      title: "High Bounce Rate on Landing Pages",
      description: "PPC landing pages have a 52.3% bounce rate, 10.2 percentage points higher than the site average",
      impact: "medium",
      category: "engagement",
      recommendation: "Redesign landing pages for paid search campaigns with clearer CTAs and faster loading",
      metric: "PPC Landing Page Bounce Rate",
      change: 24.2
    },
    {
      id: "opp5",
      title: "Email Marketing Efficiency",
      description: "Email channel has the highest ROI at 8.2 but receives only 6.1% of traffic",
      impact: "high",
      category: "traffic",
      recommendation: "Expand email list through site pop-ups and increase email frequency",
      metric: "Email ROI",
      change: 8.2
    },
    {
      id: "opp6",
      title: "Cross-Visitation with StyleMart",
      description: "42.5% of YourFashion visitors also visit StyleMart, indicating category overlap",
      impact: "medium",
      category: "market",
      recommendation: "Analyze StyleMart's best-selling categories and pricing strategy",
      metric: "StyleMart Cross-Visitation",
      change: 42.5
    }
  ];

  const kpis: KPIData[] = [
    {
      metric: "Total Visits",
      value: 3450000,
      previousValue: 3100000,
      unit: "",
      target: 3500000
    },
    {
      metric: "Conversion Rate",
      value: 3.2,
      previousValue: 2.9,
      unit: "%",
      target: 3.5
    },
    {
      metric: "Average Order Value",
      value: 78.5,
      previousValue: 74.2,
      unit: "$",
      target: 85
    },
    {
      metric: "Market Share",
      value: 18.5,
      previousValue: 17.2,
      unit: "%",
      target: 20
    }
  ];

  // Generate monthly visit data with a seasonal pattern
  const monthlyVisitData: MonthlyVisitData[] = months.map((month, index) => {
    // Create a seasonal pattern with Q4 peaks for fashion retail
    let seasonalFactor = 1.0;
    
    // Determine the month number (0-11)
    const monthNum = new Date(month).getMonth();
    
    // Apply seasonal factors
    if (monthNum >= 9 && monthNum <= 11) { // Oct-Dec (Q4 holiday season)
      seasonalFactor = 1.3 + (monthNum - 9) * 0.15; // Increasing through Q4
    } else if (monthNum >= 6 && monthNum <= 8) { // Jul-Sep (Back to school)
      seasonalFactor = 1.1;
    } else if (monthNum >= 3 && monthNum <= 5) { // Apr-Jun (Spring/Summer)
      seasonalFactor = 1.05;
    } else { // Jan-Mar (Post-holiday slump)
      seasonalFactor = 0.85 + (monthNum * 0.05); // Gradually recovering
    }
    
    // Base traffic with 5% YoY growth + seasonality
    const baseVisits = 2800000 * (1 + (index * 0.004)) * seasonalFactor;
    
    return {
      month,
      visits: Math.round(baseVisits),
      uniqueVisitors: Math.round(baseVisits * 0.78) // Unique visitors are ~78% of total visits
    };
  });

  const segmentShare: SegmentShare[] = [
    {
      segment: "Women's Apparel",
      share: 45.3,
      previousShare: 44.1
    },
    {
      segment: "Men's Apparel",
      share: 28.7,
      previousShare: 28.2
    },
    {
      segment: "Accessories",
      share: 14.8,
      previousShare: 13.0
    },
    {
      segment: "Footwear",
      share: 8.5,
      previousShare: 9.7
    },
    {
      segment: "Children's Apparel",
      share: 2.7,
      previousShare: 5.0
    }
  ];

  const keywordPerformance: KeywordPerformance[] = [
    {
      keyword: "summer dresses",
      visits: 98500,
      conversion: 3.8,
      cpc: 0.65,
      isOwned: false
    },
    {
      keyword: "yourfashion",
      visits: 85700,
      conversion: 6.2,
      cpc: 0.25,
      isOwned: true
    },
    {
      keyword: "yourfashion coupon",
      visits: 62300,
      conversion: 5.1,
      cpc: 0.48,
      isOwned: true
    },
    {
      keyword: "women's jeans",
      visits: 45800,
      conversion: 3.2,
      cpc: 0.85,
      isOwned: false
    },
    {
      keyword: "casual shoes",
      visits: 38600,
      conversion: 2.9,
      cpc: 0.92,
      isOwned: false
    },
    {
      keyword: "fashion trends 2023",
      visits: 32400,
      conversion: 2.1,
      cpc: 0.58,
      isOwned: false
    },
    {
      keyword: "men's t-shirts",
      visits: 29700,
      conversion: 3.5,
      cpc: 0.72,
      isOwned: false
    }
  ];

  return {
    retailers,
    trafficSources,
    competitorPositioning,
    crossVisitation,
    opportunities,
    kpis,
    monthlyVisitData,
    segmentShare,
    keywordPerformance
  };
};
