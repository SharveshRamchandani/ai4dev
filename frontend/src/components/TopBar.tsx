import { useState, useEffect } from "react";
import { Bell, Wifi, WifiOff, User, Moon, Sun } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";

const pageTitles: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/tasks": "Tasks",
  "/schedule": "Schedule",
  "/analytics": "Analytics",
  "/integrations": "Integrations",
  "/notifications": "Notifications",
  "/settings": "Settings",
  "/search": "Search",
};

export function TopBar() {
  const location = useLocation();
  const title = pageTitles[location.pathname] || "AcadSynk";
  const isOnline = true;

  const [isDark, setIsDark] = useState(() => document.documentElement.classList.contains("dark"));

  const toggleTheme = () => {
    const next = !isDark;
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
    setIsDark(next);
  };

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "dark") {
      document.documentElement.classList.add("dark");
      setIsDark(true);
    }
  }, []);

  return (
    <header className="h-14  flex items-center justify-between px-4 shrink-0 sticky top-0 z-30 bg-background">
      <div className="flex items-center gap-3">
        <SidebarTrigger />
        <h1 className="text-lg font-semibold">{title}</h1>
      </div>
      <div className="flex items-center gap-2">
        {/* <div className="flex items-center gap-1 text-xs text-muted-foreground mr-2">
          {isOnline ? <Wifi className="h-3.5 w-3.5" /> : <WifiOff className="h-3.5 w-3.5" />}
          <span className="hidden sm:inline">{isOnline ? "Online" : "Offline"}</span>
        </div> */}
        <Button variant="ghost" size="icon" onClick={toggleTheme}>
          {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </Button>
        <Button variant="ghost" size="icon" asChild className="relative">
          <Link to="/notifications">
            <Bell className="h-4 w-4" />
            <span className="absolute top-1.5 right-1.5 h-2 w-2 bg-foreground rounded-full" />
          </Link>
        </Button>
        <Button variant="ghost" size="icon" asChild>
          <Link to="/settings">
            <User className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    </header>
  );
}
