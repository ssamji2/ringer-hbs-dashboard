import React from "react";
import { 
  Sidebar, 
  SidebarContent, 
  SidebarHeader,
  SidebarProvider 
} from "@/components/ui/sidebar";
import { Syringe, User } from "lucide-react";

export const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <div className="min-h-screen bg-secondary-light flex w-full">
        <Sidebar className="border-r border-gray-200 flex flex-col">
          <SidebarHeader className="p-4 flex items-center gap-2">
            <Syringe className="w-6 h-6 text-primary" />
            <span className="font-semibold text-primary">링거v.0</span>
          </SidebarHeader>
          <SidebarContent>
            {/* Navigation items will be added here */}
          </SidebarContent>
          <div className="mt-auto p-4 border-t border-gray-200">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <User className="w-4 h-4" />
              <div>
                <p className="font-medium">국수나무 본사</p>
                <p className="text-xs text-gray-500">관리자</p>
              </div>
            </div>
          </div>
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