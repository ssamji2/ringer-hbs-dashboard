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
  Store,
  FileText,
  BookOpen,
  Settings,
  HelpCircle,
  Syringe,
  User,
  Building2
} from "lucide-react";
import { useLocation, Link } from "react-router-dom";
import { toast } from "sonner";

export const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  
  const handleDisabledClick = () => {
    toast.info("현재 이용할 수 없는 메뉴입니다.");
  };

  const menuItems = [
    { 
      icon: LayoutDashboard, 
      label: "대시보드", 
      href: "/",
      isActive: location.pathname === "/",
      isEnabled: true
    },
    { 
      icon: Building2, 
      label: "매장 링거 솔루션", 
      href: "/store-solution",
      isActive: location.pathname === "/store-solution",
      isEnabled: false
    },
    { 
      icon: Store, 
      label: "매장 리스트", 
      href: "/store-list",
      isActive: location.pathname === "/store-list",
      isEnabled: false
    },
    { 
      icon: FileText, 
      label: "실시간 영업현황", 
      href: "/sales-status",
      isActive: location.pathname === "/sales-status",
      isEnabled: false
    },
    { 
      icon: BookOpen, 
      label: "매뉴얼", 
      href: "/manual",
      isActive: location.pathname === "/manual",
      isEnabled: false
    },
    { 
      icon: Settings, 
      label: "설정", 
      href: "/settings",
      isActive: location.pathname === "/settings",
      isEnabled: false
    },
    { 
      icon: HelpCircle, 
      label: "고객 지원", 
      href: "/support",
      isActive: location.pathname === "/support",
      isEnabled: false
    }
  ];

  return (
    <SidebarProvider>
      <div className="min-h-screen bg-secondary-light flex w-full">
        <Sidebar className="border-r border-gray-200 flex flex-col">
          <SidebarHeader className="p-4 flex items-center gap-2">
            <Syringe className="w-6 h-6 text-primary animate-pulse" />
            <span className="font-semibold text-primary">링거v.0</span>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.label}>
                  <SidebarMenuButton
                    asChild={item.isEnabled}
                    tooltip={item.label}
                    isActive={item.isActive}
                    className={`group transition-all duration-300 hover:bg-primary/10 ${!item.isEnabled && 'cursor-not-allowed opacity-50'}`}
                    onClick={!item.isEnabled ? handleDisabledClick : undefined}
                  >
                    {item.isEnabled ? (
                      <Link 
                        to={item.href} 
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300
                          ${item.isActive ? 
                            'bg-primary text-white shadow-lg scale-[0.98] font-medium' : 
                            'text-gray-600 hover:text-primary'
                          }`}
                      >
                        <item.icon className={`w-5 h-5 transition-transform duration-300 group-hover:scale-110
                          ${item.isActive ? 'text-white' : 'text-gray-500 group-hover:text-primary'}`} 
                        />
                        <span className="text-sm">{item.label}</span>
                      </Link>
                    ) : (
                      <div 
                        className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-600"
                      >
                        <item.icon className="w-5 h-5 text-gray-500" />
                        <span className="text-sm">{item.label}</span>
                      </div>
                    )}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
          <div className="mt-auto p-4 border-t border-gray-200">
            <div className="flex items-center gap-3 text-sm text-gray-600 hover:bg-gray-50 p-2 rounded-lg transition-all duration-300">
              <User className="w-8 h-8 text-primary p-1.5 bg-primary/10 rounded-lg" />
              <div>
                <p className="font-medium text-primary">국수나무 본사</p>
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