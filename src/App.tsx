import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Lazy load pages
const Index = lazy(() => import("./pages/Index"));
const StoreSolution = lazy(() => import("./pages/StoreSolution"));
const StoreList = lazy(() => import("./pages/StoreList"));
const SalesStatus = lazy(() => import("./pages/SalesStatus"));
const Manual = lazy(() => import("./pages/Manual"));
const Settings = lazy(() => import("./pages/Settings"));
const Support = lazy(() => import("./pages/Support"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Suspense fallback={
          <div className="flex items-center justify-center min-h-screen">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
          </div>
        }>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/store-solution" element={<StoreSolution />} />
            <Route path="/store-list" element={<StoreList />} />
            <Route path="/sales-status" element={<SalesStatus />} />
            <Route path="/manual" element={<Manual />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/support" element={<Support />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;