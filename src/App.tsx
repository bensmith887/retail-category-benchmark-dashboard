
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import PriceElasticityDashboard from "./pages/PriceElasticityDashboard";
import PromotionsDashboard from "./pages/PromotionsDashboard";
import PromotionsV2Dashboard from "./pages/PromotionsV2Dashboard";
import AssortmentPlanningDashboard from "./pages/AssortmentPlanningDashboard";
import RangeBuildingDashboard from "./pages/RangeBuildingDashboard";
import SearchToSalesFunnelDashboard from "./pages/SearchToSalesFunnelDashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/price-elasticity" element={<PriceElasticityDashboard />} />
          <Route path="/promotions" element={<PromotionsDashboard />} />
          <Route path="/promotions-v2" element={<PromotionsV2Dashboard />} />
          <Route path="/assortment-planning" element={<AssortmentPlanningDashboard />} />
          <Route path="/range-building" element={<RangeBuildingDashboard />} />
          <Route path="/search-to-sales-funnel" element={<SearchToSalesFunnelDashboard />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
