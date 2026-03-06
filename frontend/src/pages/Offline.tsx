import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { WifiOff, CheckSquare, Calendar, BarChart3, RefreshCw } from "lucide-react";

const Offline = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <WifiOff className="h-12 w-12 mx-auto mb-6 text-muted-foreground" />
        <h1 className="text-2xl font-bold mb-2">You're Offline</h1>
        <p className="text-muted-foreground mb-8">Don't worry — AcadSynk works offline. Here's what you can still do:</p>

        <div className="text-left space-y-3 mb-8">
          {[
            { icon: CheckSquare, text: "View and complete today's tasks" },
            { icon: Calendar, text: "View today's study schedule" },
            { icon: BarChart3, text: "View last 7 days of analytics" },
            { icon: CheckSquare, text: "Add new tasks manually" },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-3 p-3 border border-border rounded-xl">
              <item.icon className="h-4 w-4 shrink-0" />
              <span className="text-sm">{item.text}</span>
            </div>
          ))}
        </div>

        <div className="border border-border rounded-xl p-4 mb-6 bg-secondary/30">
          <div className="flex items-center gap-2 justify-center text-sm">
            <RefreshCw className="h-4 w-4 text-muted-foreground" />
            <span>3 task updates pending sync</span>
          </div>
        </div>

        <Button asChild size="lg">
          <Link to="/dashboard">Go to Dashboard</Link>
        </Button>
      </div>
    </div>
  );
};

export default Offline;
