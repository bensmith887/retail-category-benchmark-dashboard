
import * as React from "react";

export type TabName = 
  | "home" 
  | "price-elasticity" 
  | "promotions" 
  | "promotions-v2"
  | "fashion-analytics";

export interface TabType {
  id: TabName;
  name: string;
  icon: string;
}

export const tabsData: TabType[] = [
  {
    id: "home",
    name: "Overview",
    icon: "Home"
  },
  {
    id: "price-elasticity",
    name: "Price Elasticity",
    icon: "LineChart"
  },
  {
    id: "promotions",
    name: "Promotions",
    icon: "BarChart"
  },
  {
    id: "promotions-v2",
    name: "Promotions V2",
    icon: "PieChart"
  },
  {
    id: "fashion-analytics",
    name: "Fashion Analytics",
    icon: "Shirt"
  }
];

export interface StatCardType {
  title: string;
  value: string;
  trend: number;
  path: string;
}

export const statsData: StatCardType[] = [
  {
    title: "Avg. Elasticity",
    value: "-1.21",
    trend: -12,
    path: "/price-elasticity"
  },
  {
    title: "Promotion Lift",
    value: "+14.2%",
    trend: 8,
    path: "/promotions"
  },
  {
    title: "Optimal Discount",
    value: "22%",
    trend: 5,
    path: "/promotions-v2"
  },
  {
    title: "Market Share",
    value: "18.5%",
    trend: 7,
    path: "/fashion-analytics"
  }
];

export const trendingStats = [
  {
    category: "Baby Products",
    elasticity: -1.53,
    trend: -0.24,
    month: "July"
  },
  {
    category: "Books",
    elasticity: -0.96,
    trend: -0.18,
    month: "December"
  },
  {
    category: "Home Decor",
    elasticity: -0.87,
    trend: 0.05,
    month: "January"
  },
  {
    category: "Electronics",
    elasticity: -0.76,
    trend: -0.02,
    month: "November"
  },
  {
    category: "Women's Apparel",
    elasticity: -1.02,
    trend: 0.14,
    month: "April"
  }
];
