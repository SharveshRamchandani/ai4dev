import AppLayout from "@/layouts/AppLayout";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import {
  Mail, BookOpen, Calendar, MessageSquare, Upload, RefreshCw,
  CheckCircle2, XCircle, Plug, Settings2
} from "lucide-react";

const connectedPlatforms = [
  { name: "Canvas", icon: BookOpen, status: "connected", lastSync: "5 min ago", scopes: "Assignments, Announcements" },
  { name: "Gmail", icon: Mail, status: "connected", lastSync: "2 min ago", scopes: "Read-only inbox" },
  { name: "Google Calendar", icon: Calendar, status: "connected", lastSync: "10 min ago", scopes: "Events, Free/Busy" },
];

const availablePlatforms = [
  { name: "Outlook", icon: Mail },
  { name: "Moodle", icon: BookOpen },
  { name: "Blackboard", icon: BookOpen },
  { name: "MS Calendar", icon: Calendar },
  { name: "Slack", icon: MessageSquare },
  { name: "Discord", icon: MessageSquare },
];

const Integrations = () => {
  return (
    <AppLayout>
      <div className="p-4 sm:p-6 space-y-8 max-w-4xl mx-auto">
        {/* Connected */}
        <section>
          <h2 className="text-lg font-semibold mb-4">Connected Platforms</h2>
          <div className="space-y-3">
            {connectedPlatforms.map((p, i) => (
              <div key={i} className="border border-border rounded-xl p-4 flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center shrink-0">
                  <p.icon className="h-5 w-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="font-medium text-sm">{p.name}</p>
                    <CheckCircle2 className="h-3.5 w-3.5 text-load-low" />
                  </div>
                  <p className="text-xs text-muted-foreground">Last synced: {p.lastSync} · Scopes: {p.scopes}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <Button variant="outline" size="sm"><RefreshCw className="mr-1 h-3 w-3" /> Sync</Button>
                  <Button variant="ghost" size="sm" className="text-destructive">Disconnect</Button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Add new */}
        <section>
          <h2 className="text-lg font-semibold mb-4">Add Integration</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {availablePlatforms.map((p, i) => (
              <button key={i} className="border border-border rounded-xl p-4 flex flex-col items-center gap-2 hover:bg-accent/50 transition-colors">
                <p.icon className="h-6 w-6" />
                <span className="text-sm font-medium">{p.name}</span>
                <span className="text-xs text-muted-foreground">Connect</span>
              </button>
            ))}
          </div>
        </section>

        {/* Manual Import */}
        <section>
          <h2 className="text-lg font-semibold mb-4">Manual Import</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            <div className="border border-dashed border-border rounded-xl p-6 text-center">
              <Upload className="h-6 w-6 mx-auto mb-2 text-muted-foreground" />
              <p className="text-sm font-medium">CSV Task Import</p>
              <p className="text-xs text-muted-foreground mt-1">Upload a spreadsheet of tasks</p>
            </div>
            <div className="border border-dashed border-border rounded-xl p-6 text-center">
              <Upload className="h-6 w-6 mx-auto mb-2 text-muted-foreground" />
              <p className="text-sm font-medium">ICS Calendar Import</p>
              <p className="text-xs text-muted-foreground mt-1">Import calendar events</p>
            </div>
          </div>
        </section>

        {/* NLP Confidence */}
        <section>
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2"><Settings2 className="h-5 w-5" /> NLP Confidence Settings</h2>
          <div className="border border-border rounded-xl p-4 space-y-4">
            <div>
              <Label>Auto-accept threshold: 85%</Label>
              <p className="text-xs text-muted-foreground mb-2">Tasks above this confidence are auto-added. Below are flagged for review.</p>
              <Slider defaultValue={[85]} min={50} max={100} step={5} />
            </div>
          </div>
        </section>
      </div>
    </AppLayout>
  );
};

export default Integrations;
