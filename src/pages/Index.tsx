import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SalesOverview } from "@/components/dashboard/SalesOverview";
import { ReviewOverview } from "@/components/dashboard/ReviewOverview";
import { InventoryOverview } from "@/components/dashboard/InventoryOverview";

const Index = () => {
  const [activeTab, setActiveTab] = useState("sales");

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-primary">HBS 통합 관리 솔루션</h1>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full justify-start bg-gradient-to-r from-purple-50 to-blue-50 border border-gray-100 rounded-xl p-1 shadow-sm">
            <TabsTrigger
              value="sales"
              className="px-8 py-3 rounded-lg text-sm font-medium transition-all duration-200
                data-[state=active]:bg-white data-[state=active]:text-primary 
                data-[state=active]:shadow-sm data-[state=active]:border-b-2 
                data-[state=active]:border-primary hover:bg-white/50"
            >
              통합 매출 조회
            </TabsTrigger>
            <TabsTrigger
              value="reviews"
              className="px-8 py-3 rounded-lg text-sm font-medium transition-all duration-200
                data-[state=active]:bg-white data-[state=active]:text-primary 
                data-[state=active]:shadow-sm data-[state=active]:border-b-2 
                data-[state=active]:border-primary hover:bg-white/50"
            >
              리뷰 통합 조회
            </TabsTrigger>
            <TabsTrigger
              value="inventory"
              className="px-8 py-3 rounded-lg text-sm font-medium transition-all duration-200
                data-[state=active]:bg-white data-[state=active]:text-primary 
                data-[state=active]:shadow-sm data-[state=active]:border-b-2 
                data-[state=active]:border-primary hover:bg-white/50"
            >
              식자재 현황
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="sales" className="mt-6">
            <SalesOverview />
          </TabsContent>
          
          <TabsContent value="reviews" className="mt-6">
            <ReviewOverview />
          </TabsContent>
          
          <TabsContent value="inventory" className="mt-6">
            <InventoryOverview />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Index;