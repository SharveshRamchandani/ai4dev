import AppLayout from "@/layouts/AppLayout";
import { Button } from "@/components/ui/button";
import { Bell, Calendar, Brain, RefreshCw, AlertTriangle, CheckSquare, Settings } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

type NotifType = "deadline" | "ai" | "sync" | "system";

const notifications = [
  { id: 1, type: "deadline" as NotifType, message: "CS 301 — Final Project Proposal due in 2 days", time: "10 min ago", read: false, action: "/tasks/1" },
  { id: 2, type: "ai" as NotifType, message: "New task extracted: 'BIO 301 Quiz Reminder' from Gmail (92% confidence)", time: "25 min ago", read: false, action: "/tasks" },
  { id: 3, type: "ai" as NotifType, message: "Schedule regenerated — 2 study blocks shifted to accommodate new task", time: "1h ago", read: false, action: "/schedule" },
  { id: 4, type: "system" as NotifType, message: "Cognitive load reached 71 — consider lightening today's schedule", time: "2h ago", read: true, action: "/dashboard" },
  { id: 5, type: "sync" as NotifType, message: "Canvas sync completed — 3 new assignments detected", time: "3h ago", read: true, action: "/integrations" },
  { id: 6, type: "deadline" as NotifType, message: "MATH 204 — Problem Set 7 due tomorrow", time: "5h ago", read: true, action: "/tasks/2" },
  { id: 7, type: "sync" as NotifType, message: "Gmail sync completed — 1 deadline extracted", time: "6h ago", read: true, action: "/integrations" },
  { id: 8, type: "system" as NotifType, message: "Weekly analytics report ready", time: "1 day ago", read: true, action: "/analytics" },
];

const typeIcons: Record<NotifType, any> = {
  deadline: Calendar,
  ai: Brain,
  sync: RefreshCw,
  system: AlertTriangle,
};

const Notifications = () => {
  const [filter, setFilter] = useState<"all" | NotifType>("all");

  const filtered = filter === "all" ? notifications : notifications.filter((n) => n.type === filter);

  return (
    <AppLayout>
      <div className="p-4 sm:p-6 max-w-3xl mx-auto space-y-4">
        {/* Filters */}
        <div className="flex items-center gap-2 flex-wrap">
          {(["all", "deadline", "ai", "sync", "system"] as const).map((f) => (
            <Button key={f} variant={filter === f ? "default" : "outline"} size="sm" onClick={() => setFilter(f)} className="capitalize">
              {f === "ai" ? "AI Update" : f}
            </Button>
          ))}
          <Button variant="ghost" size="sm" asChild className="ml-auto">
            <Link to="/settings"><Settings className="mr-1 h-3 w-3" /> Preferences</Link>
          </Button>
        </div>

        {/* Feed */}
        <div className="space-y-1">
          {filtered.map((n) => {
            const Icon = typeIcons[n.type];
            return (
              <Link key={n.id} to={n.action}
                className={`flex items-start gap-3 p-4 rounded-xl transition-colors hover:bg-accent/50 ${!n.read ? "bg-secondary/50" : ""}`}>
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${!n.read ? "bg-foreground text-background" : "bg-secondary"}`}>
                  <Icon className="h-4 w-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-sm ${!n.read ? "font-medium" : ""}`}>{n.message}</p>
                  <p className="text-xs text-muted-foreground mt-1">{n.time}</p>
                </div>
                {!n.read && <div className="w-2 h-2 rounded-full bg-foreground shrink-0 mt-2" />}
              </Link>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20 text-muted-foreground">
            <Bell className="h-8 w-8 mx-auto mb-3" />
            <p>No notifications in this category</p>
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default Notifications;
