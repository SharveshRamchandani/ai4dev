import { ReactNode } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { TopBar } from "@/components/TopBar";
import { FloatingAiAssistant } from "@/components/ui/glowing-ai-chat-assistant";
import { Dock } from "@/components/ui/dock-two";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  LayoutDashboard,
  CheckSquare,
  Calendar,
  BarChart3,
  Search,
} from "lucide-react";

const AppLayout = ({ children }: { children: ReactNode }) => {
  const isMobile = useIsMobile();
  const location = useLocation();
  const navigate = useNavigate();

  const dockItems = [
    { icon: LayoutDashboard, label: "Home", path: "/dashboard" },
    { icon: CheckSquare, label: "Tasks", path: "/tasks" },
    { icon: Calendar, label: "Schedule", path: "/schedule" },
    { icon: BarChart3, label: "Analytics", path: "/analytics" },
    { icon: Search, label: "Search", path: "/search" },
  ].map((item) => ({
    icon: item.icon,
    label: item.label,
    active: location.pathname === item.path,
    onClick: () => navigate(item.path),
  }));

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <TopBar />
          <main className={`flex-1 overflow-y-auto ${isMobile ? "pb-20" : ""}`}>
            {children}
          </main>
        </div>
      </div>
      {isMobile && <Dock items={dockItems} />}
      <FloatingAiAssistant />
    </SidebarProvider>
  );
};

export default AppLayout;
