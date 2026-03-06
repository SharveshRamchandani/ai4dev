import AppLayout from "@/layouts/AppLayout";
import { Button } from "@/components/ui/button";
import { TrendingUp, Clock, Target, Brain, Download } from "lucide-react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, PieChart, Pie, Cell
} from "recharts";

const completionData = [
  { week: "W1", rate: 72 }, { week: "W2", rate: 78 }, { week: "W3", rate: 85 },
  { week: "W4", rate: 80 }, { week: "W5", rate: 91 }, { week: "W6", rate: 88 },
  { week: "W7", rate: 93 }, { week: "W8", rate: 90 },
];

const cognitiveLoadHistory = [
  { day: "Mon", load: 45 }, { day: "Tue", load: 62 }, { day: "Wed", load: 58 },
  { day: "Thu", load: 71 }, { day: "Fri", load: 55 }, { day: "Sat", load: 38 },
  { day: "Sun", load: 30 },
];

const platformBreakdown = [
  { name: "Canvas", value: 42 }, { name: "Gmail", value: 28 },
  { name: "Slack", value: 15 }, { name: "Manual", value: 15 },
];

const subjectLoad = [
  { subject: "CS 301", hours: 12 }, { subject: "MATH 204", hours: 8 },
  { subject: "ENG 102", hours: 5 }, { subject: "PHYS 201", hours: 7 },
  { subject: "BIO 301", hours: 4 }, { subject: "HIST 200", hours: 3 },
];

const peakHours = [
  [0, 0, 0, 1, 2, 3, 2],
  [0, 0, 1, 3, 4, 4, 2],
  [0, 0, 2, 4, 5, 3, 1],
  [0, 1, 2, 3, 3, 2, 1],
  [0, 0, 1, 2, 2, 1, 0],
  [0, 0, 0, 1, 1, 0, 0],
];
const peakLabels = ["8–10", "10–12", "12–2", "2–4", "4–6", "6–8"];

const COLORS = [
  "hsl(var(--foreground))", "hsl(var(--muted-foreground))",
  "hsl(var(--border))", "hsl(var(--ring))"
];

const atRiskTasks = [
  { title: "CS 301 — Final Project Proposal", risk: "High", reason: "Only 1 day remaining, 3h effort" },
  { title: "PHYS 201 — Lab Report", risk: "Medium", reason: "Similar tasks historically late" },
];

const Analytics = () => {
  return (
    <AppLayout>
      <div className="p-4 sm:p-6 space-y-6 max-w-6xl mx-auto">
        {/* Overview Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Tasks Completed", value: "23", sub: "this week", icon: Target },
            { label: "On-Time Rate", value: "91%", sub: "+5% vs last week", icon: TrendingUp },
            { label: "Avg Daily Study", value: "4.2h", sub: "across 5 days", icon: Clock },
            { label: "Cognitive Load", value: "62", sub: "moderate", icon: Brain },
          ].map((card, i) => (
            <div key={i} className="border border-border rounded-2xl p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-muted-foreground uppercase tracking-wider">{card.label}</span>
                <card.icon className="h-4 w-4 text-muted-foreground" />
              </div>
              <p className="text-2xl font-bold">{card.value}</p>
              <p className="text-xs text-muted-foreground">{card.sub}</p>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Completion Rate */}
          <div className="border border-border rounded-2xl p-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">Completion Rate</h3>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={completionData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="week" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                <YAxis tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 12 }} />
                <Line type="monotone" dataKey="rate" stroke="hsl(var(--foreground))" strokeWidth={2} dot={{ r: 3, fill: "hsl(var(--foreground))" }} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Cognitive Load History */}
          <div className="border border-border rounded-2xl p-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">Cognitive Load (This Week)</h3>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={cognitiveLoadHistory}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="day" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                <YAxis tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 12 }} />
                <Bar dataKey="load" fill="hsl(var(--foreground))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Platform Breakdown */}
          <div className="border border-border rounded-2xl p-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">Tasks by Platform</h3>
            <div className="flex items-center justify-center gap-8">
              <ResponsiveContainer width={160} height={160}>
                <PieChart>
                  <Pie data={platformBreakdown} dataKey="value" cx="50%" cy="50%" innerRadius={40} outerRadius={70} strokeWidth={0}>
                    {platformBreakdown.map((_, i) => (
                      <Cell key={i} fill={COLORS[i % COLORS.length]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="space-y-2">
                {platformBreakdown.map((p, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm">
                    <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: COLORS[i] }} />
                    <span>{p.name}</span>
                    <span className="text-muted-foreground ml-auto">{p.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Subject Load */}
          <div className="border border-border rounded-2xl p-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">Subject Effort (hours/week)</h3>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={subjectLoad} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis type="number" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                <YAxis type="category" dataKey="subject" tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" width={70} />
                <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 12 }} />
                <Bar dataKey="hours" fill="hsl(var(--foreground))" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Peak Productivity Heatmap */}
        <div className="border border-border rounded-2xl p-4">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">Peak Productivity Hours</h3>
          <div className="overflow-x-auto">
            <div className="min-w-[400px]">
              <div className="grid grid-cols-[80px_repeat(7,1fr)] gap-1">
                <div />
                {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
                  <div key={d} className="text-center text-xs text-muted-foreground py-1">{d}</div>
                ))}
                {peakHours.map((row, ri) => (
                  <>
                    <div key={`l-${ri}`} className="text-xs text-muted-foreground flex items-center">{peakLabels[ri]}</div>
                    {row.map((val, ci) => (
                      <div key={`${ri}-${ci}`}
                        className="aspect-square rounded-md flex items-center justify-center text-xs"
                        style={{ backgroundColor: `hsl(var(--foreground) / ${val * 0.2})` }}>
                        {val > 0 && <span className={val >= 3 ? "text-background font-medium" : "text-muted-foreground"}>{val}</span>}
                      </div>
                    ))}
                  </>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* At-Risk Deadlines */}
        <div className="border border-border rounded-2xl p-4">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3">Deadline Miss Risk</h3>
          <div className="space-y-2">
            {atRiskTasks.map((t, i) => (
              <div key={i} className="flex items-center justify-between border border-border rounded-xl p-3">
                <div>
                  <p className="text-sm font-medium">{t.title}</p>
                  <p className="text-xs text-muted-foreground">{t.reason}</p>
                </div>
                <span className={`text-xs font-semibold px-2 py-1 rounded-full ${t.risk === "High" ? "bg-destructive/10 text-destructive" : "bg-secondary"}`}>{t.risk}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end">
          <Button variant="outline" size="sm"><Download className="mr-2 h-3 w-3" /> Export CSV</Button>
        </div>
      </div>
    </AppLayout>
  );
};

export default Analytics;
