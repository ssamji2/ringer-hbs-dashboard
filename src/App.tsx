import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import StoreSolution from "./pages/StoreSolution";
import StoreList from "./pages/StoreList";
import SalesStatus from "./pages/SalesStatus";
import Manual from "./pages/Manual";
import Settings from "./pages/Settings";
import Support from "./pages/Support";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/store-solution" element={<StoreSolution />} />
          <Route path="/store-list" element={<StoreList />} />
          <Route path="/sales-status" element={<SalesStatus />} />
          <Route path="/manual" element={<Manual />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/support" element={<Support />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;