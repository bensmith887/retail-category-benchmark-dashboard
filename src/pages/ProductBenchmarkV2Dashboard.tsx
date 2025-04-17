
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Tabs from "@/components/Tabs";
import Header from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CompetitiveLandscapeView from "@/components/benchmark/CompetitiveLandscapeView";

const ProductBenchmarkV2Dashboard = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(
    location.pathname === "/product-benchmark-v2" ? "product-benchmark-v2" : ""
  );

  return (
    <div className="flex h-screen bg-dashboard-bg overflow-hidden">
      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <div className="flex-1 overflow-y-auto p-6">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold">Product & Price Benchmark</h1>
            </div>
            <div className="grid grid-cols-1 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Competitive Landscape Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <CompetitiveLandscapeView />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductBenchmarkV2Dashboard;
