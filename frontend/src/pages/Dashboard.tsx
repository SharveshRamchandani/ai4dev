import AppLayout from "@/layouts/AppLayout";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Plus, Clock, Mail, BookOpen, MessageSquare, Calendar, Gauge } from "lucide-react";

const priorityTasks = [
  { id: 1, title: "CS 301 — Final Project Proposal", source: "Canvas", sourceIcon: BookOpen, deadline: "Feb 28", priority: 95, effort: "3h", done: false },
  { id: 2, title: "MATH 204 — Problem Set 7", source: "Gmail", sourceIcon: Mail, deadline: "Mar 1", priority: 88, effort: "2h", done: false },
  { id: 3, title: "ENG 102 — Essay Draft Review", source: "Canvas", sourceIcon: BookOpen, deadline: "Mar 2", priority: 76, effort: "1.5h", done: false },
  { id: 4, title: "Group Project Meeting Notes", source: "Slack", sourceIcon: MessageSquare, deadline: "Mar 1", priority: 65, effort: "30m", done: false },
  { id: 5, title: "PHYS 201 — Lab Report", source: "Gmail", sourceIcon: Mail, deadline: "Mar 3", priority: 60, effort: "2h", done: false },
];

const scheduleBlocks = [
  { time: "09:00", duration: "90 min", subject: "CS 301 — Final Project", type: "study" },
  { time: "10:30", duration: "15 min", subject: "Break", type: "break" },
  { time: "10:45", duration: "60 min", subject: "MATH 204 — Problem Set", type: "study" },
  { time: "11:45", duration: "30 min", subject: "Lunch Break", type: "break" },
  { time: "14:00", duration: "60 min", subject: "ENG 102 — Essay Draft", type: "study" },
  { time: "15:00", duration: "15 min", subject: "Break", type: "break" },
  { time: "15:15", duration: "45 min", subject: "PHYS 201 — Lab Report", type: "study" },
];

const deadlines = [
  { day: "Today", count: 2, label: "Feb 26" },
  { day: "Thu", count: 1, label: "Feb 27" },
  { day: "Fri", count: 3, label: "Feb 28" },
  { day: "Sat", count: 0, label: "Mar 1" },
  { day: "Sun", count: 1, label: "Mar 2" },
  { day: "Mon", count: 2, label: "Mar 3" },
  { day: "Tue", count: 0, label: "Mar 4" },
];

const recentExtracted = [
  { title: "Bio 301 Quiz Reminder", source: "Gmail", confidence: 92 },
  { title: "History Paper Extension Notice", source: "Canvas", confidence: 87 },
];

const syncStatus = [
  { name: "Gmail", time: "2 min ago", ok: true },
  { name: "Canvas", time: "5 min ago", ok: true },
  { name: "Google Calendar", time: "10 min ago", ok: true },
];

const CognitiveLoadGauge = ({ value }: { value: number }) => {
  const color = value < 40 ? "text-load-low" : value < 70 ? "text-load-medium" : "text-load-high";
  const strokeColor = value < 40 ? "stroke-load-low" : value < 70 ? "stroke-load-medium" : "stroke-load-high";
  const circumference = 2 * Math.PI * 40;
  const offset = circumference - (value / 100) * circumference;

  return (
    <div className="flex flex-col items-center">
      <svg width="120" height="120" viewBox="0 0 100 100" className="-rotate-90">
        <circle cx="50" cy="50" r="40" fill="none" stroke="hsl(var(--border))" strokeWidth="8" />
        <circle cx="50" cy="50" r="40" fill="none" className={strokeColor} strokeWidth="8"
          strokeDasharray={circumference} strokeDashoffset={offset} strokeLinecap="round"
          style={{ transition: "stroke-dashoffset 1s ease-out" }} />
      </svg>
      <div className="absolute flex flex-col items-center justify-center">
        <span className={`text-2xl font-bold ${color}`}>{value}</span>
        <span className="text-[10px] text-muted-foreground uppercase tracking-wider">Load</span>
      </div>
    </div>
  );
};

const Dashboard = () => {
  const cogLoad = 62;

  return (
    <AppLayout>
      <div className="p-4 sm:p-6 space-y-6 max-w-7xl mx-auto">
        {/* Greeting */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-2xl font-bold">Good morning, Arjun</h2>
            <p className="text-sm text-muted-foreground">Wednesday, February 26, 2026</p>
          </div>
          <Button size="sm" className="w-fit"><Plus className="mr-2 h-4 w-4" /> Quick Add Task</Button>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Priority Queue */}
            <section>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3">Today's Priority Queue</h3>
              <div className="space-y-2">
                {priorityTasks.map((task) => (
                  <div key={task.id} className="border border-border rounded-xl p-4 flex items-center gap-4 hover:bg-accent/50 transition-colors">
                    <button className="shrink-0"><CheckCircle2 className="h-5 w-5 text-muted-foreground hover:text-foreground transition-colors" /></button>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">{task.title}</p>
                      <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                        <task.sourceIcon className="h-3 w-3" />
                        <span>{task.source}</span>
                        <span>·</span>
                        <Clock className="h-3 w-3" />
                        <span>{task.deadline}</span>
                        <span>·</span>
                        <span>{task.effort}</span>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="text-xs font-semibold bg-secondary px-2 py-1 rounded-full">{task.priority}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Upcoming deadlines strip */}
            <section>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3">Upcoming Deadlines</h3>
              <div className="flex gap-2 overflow-x-auto pb-2">
                {deadlines.map((d, i) => (
                  <div key={i} className={`shrink-0 border border-border rounded-xl p-3 w-20 text-center ${d.count > 0 ? "bg-background" : "bg-secondary/50"}`}>
                    <p className="text-xs text-muted-foreground">{d.day}</p>
                    <p className="text-lg font-bold">{d.count}</p>
                    <p className="text-[10px] text-muted-foreground">{d.label}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Recently extracted */}
            <section>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3">Recently Extracted</h3>
              <div className="space-y-2">
                {recentExtracted.map((item, i) => (
                  <div key={i} className="border border-border rounded-xl p-3 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">{item.title}</p>
                      <p className="text-xs text-muted-foreground">from {item.source}</p>
                    </div>
                    <span className="text-xs bg-secondary px-2 py-1 rounded-full">{item.confidence}% confidence</span>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Right column */}
          <div className="space-y-6">
            {/* Cognitive Load */}
            <section className="border border-border rounded-2xl p-6 flex flex-col items-center">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">Cognitive Load</h3>
              <div className="relative flex items-center justify-center">
                <CognitiveLoadGauge value={cogLoad} />
              </div>
              <p className="text-xs text-muted-foreground mt-3 text-center">5 pending tasks, 2 due this week</p>
            </section>

            {/* Today's Schedule */}
            <section className="border border-border rounded-2xl p-4">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3">Today's Schedule</h3>
              <div className="space-y-1">
                {scheduleBlocks.map((block, i) => (
                  <div key={i} className={`flex items-start gap-3 p-2 rounded-lg text-sm ${block.type === "break" ? "text-muted-foreground" : ""}`}>
                    <span className="text-xs font-mono text-muted-foreground w-12 shrink-0 pt-0.5">{block.time}</span>
                    <div className={`flex-1 ${block.type === "study" ? "border-l-2 border-foreground pl-3" : "border-l-2 border-border pl-3"}`}>
                      <p className="font-medium text-xs">{block.subject}</p>
                      <p className="text-[10px] text-muted-foreground">{block.duration}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Sync Status */}
            <section className="border border-border rounded-2xl p-4">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3">Sync Status</h3>
              <div className="space-y-2">
                {syncStatus.map((s, i) => (
                  <div key={i} className="flex items-center justify-between text-sm">
                    <span>{s.name}</span>
                    <span className="text-xs text-muted-foreground">✓ {s.time}</span>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Dashboard;
