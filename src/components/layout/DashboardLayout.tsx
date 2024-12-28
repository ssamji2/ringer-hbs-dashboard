import React from "react";
import { 
  Sidebar, 
  SidebarContent, 
  SidebarHeader,
  SidebarProvider 
} from "@/components/ui/sidebar";
import { Syringe } from "lucide-react";

export const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <div className="min-h-screen bg-secondary-light flex w-full">
        <Sidebar className="border-r border-gray-200">
          <SidebarHeader className="p-4 flex items-center gap-2">
            <Syringe className="w-6 h-6 text-primary" />
            <span className="font-semibold text-primary">링거v.0</span>
          </SidebarHeader>
          <SidebarContent>
            {/* Navigation items will be added here */}
          </SidebarContent>
        </Sidebar>
        <main className="flex-1 overflow-auto">
          <div className="container mx-auto py-6">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};