import React from "react";
import { 
  Sidebar, 
  SidebarContent, 
  SidebarHeader,
  SidebarProvider,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton 
} from "@/components/ui/sidebar";
import { 
  LayoutDashboard, 
  Users,
  Settings,
  FileText,
  Calendar,
  BookOpen,
  HelpCircle,
  Syringe,
  User
} from "lucide-react";
import { useLocation } from "react-router-dom";

export const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  
  const menuItems = [
    { 
      icon: LayoutDashboard, 
      label: "대시보드", 
      href: "/",
      isActive: location.pathname === "/"
    },
    { 
      icon: Users, 
      label: "직원 관리", 
      href: "/employees" 
    },
    { 
      icon: Calendar, 
      label: "일정 관리", 
      href: "/schedule" 
    },
    { 
      icon: FileText, 
      label: "문서 관리", 
      href: "/documents" 
    },
    { 
      icon: BookOpen, 
      label: "매뉴얼", 
      href: "/manual" 
    },
    { 
      icon: Settings, 
      label: "설정", 
      href: "/settings" 
    },
    { 
      icon: HelpCircle, 
      label: "고객 지원", 
      href: "/support" 
    }
  ];

  return (
    <SidebarProvider>
      <div className="min-h-screen bg-secondary-light flex w-full">
        <Sidebar className="border-r border-gray-200 flex flex-col">
          <SidebarHeader className="p-4 flex items-center gap-2">
            <Syringe className="w-6 h-6 text-primary" />
            <span className="font-semibold text-primary">링거v.0</span>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.label}>
                  <SidebarMenuButton
                    asChild
                    tooltip={item.label}
                    isActive={item.isActive}
                  >
                    <a href={item.href} className="flex items-center gap-2">
                      <item.icon className="w-4 h-4" />
                      <span>{item.label}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
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