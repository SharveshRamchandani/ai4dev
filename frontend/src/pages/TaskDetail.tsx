import AppLayout from "@/layouts/AppLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { ArrowLeft, BookOpen, Mail, Clock, Brain, Link2, Paperclip, History } from "lucide-react";
import { Link, useParams } from "react-router-dom";

const taskData: Record<string, any> = {
  "1": { title: "CS 301 — Final Project Proposal", source: "Canvas", sourceDetail: "Canvas assignment notification", confidence: 96, subject: "Computer Science", deadline: "2026-02-28T23:59", effort: 3, creditWeight: 4, description: "Write a 3-page proposal outlining the scope, methodology, and timeline for the final project. Include references and a preliminary literature review.", priority: 95, notes: "Prof mentioned extra credit for early submission.", dependencies: ["CS 301 — Literature Review"], aiReasoning: [{ factor: "Deadline proximity", score: 30 }, { factor: "Credit weight (4 units)", score: 25 }, { factor: "Effort required (3h)", score: 20 }, { factor: "No dependencies blocking", score: 20 }], activity: [{ action: "Extracted from Canvas", time: "Feb 24, 9:15 AM" }, { action: "Priority updated by AI", time: "Feb 25, 7:00 AM" }, { action: "Effort adjusted manually", time: "Feb 25, 3:30 PM" }] },
  "2": { title: "MATH 204 — Problem Set 7", source: "Gmail", sourceDetail: "Email from TA — MATH 204 reminder", confidence: 91, subject: "Mathematics", deadline: "2026-03-01T23:59", effort: 2, creditWeight: 3, description: "Complete problems 1-12 from Chapter 7. Show all work.", priority: 88, notes: "", dependencies: [], aiReasoning: [{ factor: "Deadline proximity", score: 28 }, { factor: "Credit weight (3 units)", score: 22 }, { factor: "Effort required (2h)", score: 18 }, { factor: "Historical completion rate", score: 20 }], activity: [{ action: "Extracted from Gmail", time: "Feb 23, 11:00 AM" }] },
};

const TaskDetail = () => {
  const { id } = useParams();
  const task = taskData[id || "1"] || taskData["1"];

  return (
    <AppLayout>
      <div className="p-4 sm:p-6 max-w-3xl mx-auto space-y-6">
        {/* Back */}
        <Button variant="ghost" size="sm" asChild>
          <Link to="/tasks"><ArrowLeft className="mr-2 h-4 w-4" /> Back to Tasks</Link>
        </Button>

        {/* Title */}
        <div>
          <Input defaultValue={task.title} className="text-xl font-bold border-none px-0 h-auto focus-visible:ring-0 shadow-none" />
          <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
            {task.source === "Canvas" ? <BookOpen className="h-3 w-3" /> : <Mail className="h-3 w-3" />}
            <span>Extracted from {task.sourceDetail}</span>
            <span className="bg-secondary px-2 py-0.5 rounded-full">{task.confidence}% confidence</span>
          </div>
        </div>

        <Separator />

        {/* Fields grid */}
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Subject / Course</Label>
            <Input defaultValue={task.subject} />
          </div>
          <div className="space-y-2">
            <Label>Deadline</Label>
            <Input type="datetime-local" defaultValue={task.deadline} />
          </div>
          <div className="space-y-2">
            <Label>Estimated Effort (hours)</Label>
            <Input type="number" defaultValue={task.effort} min={0.5} step={0.5} />
          </div>
          <div className="space-y-2">
            <Label>Credit Weight</Label>
            <Input type="number" defaultValue={task.creditWeight} min={1} max={6} />
          </div>
        </div>

        {/* Dependencies */}
        <div className="space-y-2">
          <Label className="flex items-center gap-2"><Link2 className="h-4 w-4" /> Dependencies</Label>
          {task.dependencies.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {task.dependencies.map((dep: string, i: number) => (
                <span key={i} className="text-xs bg-secondary px-3 py-1.5 rounded-full">{dep}</span>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">No dependencies</p>
          )}
          <Button variant="outline" size="sm">Add Dependency</Button>
        </div>

        {/* Description */}
        <div className="space-y-2">
          <Label>Notes / Description</Label>
          <Textarea defaultValue={task.description} rows={4} />
        </div>

        {/* Attachments */}
        <div className="space-y-2">
          <Label className="flex items-center gap-2"><Paperclip className="h-4 w-4" /> Attachments</Label>
          <div className="border border-dashed border-border rounded-xl p-6 text-center text-sm text-muted-foreground">
            Drop files here or <button className="underline">browse</button>
          </div>
        </div>

        <Separator />

        {/* AI Reasoning */}
        <section>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-2">
            <Brain className="h-4 w-4" /> AI Priority Reasoning
          </h3>
          <div className="border border-border rounded-xl p-4 space-y-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Overall Priority Score</span>
              <span className="text-lg font-bold">{task.priority}</span>
            </div>
            {task.aiReasoning.map((r: any, i: number) => (
              <div key={i} className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">{r.factor}</span>
                <div className="flex items-center gap-2">
                  <div className="w-24 h-1.5 bg-secondary rounded-full overflow-hidden">
                    <div className="h-full bg-foreground rounded-full" style={{ width: `${(r.score / 30) * 100}%` }} />
                  </div>
                  <span className="text-xs font-mono w-6 text-right">{r.score}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-2 mt-3">
            <Switch id="override" />
            <Label htmlFor="override" className="text-sm">Manual priority override</Label>
          </div>
        </section>

        <Separator />

        {/* Activity Log */}
        <section>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-2">
            <History className="h-4 w-4" /> Activity Log
          </h3>
          <div className="space-y-2">
            {task.activity.map((a: any, i: number) => (
              <div key={i} className="flex items-center gap-3 text-sm">
                <div className="w-2 h-2 rounded-full bg-foreground shrink-0" />
                <span>{a.action}</span>
                <span className="text-xs text-muted-foreground ml-auto">{a.time}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Save */}
        <div className="flex gap-3 pt-4">
          <Button>Save Changes</Button>
          <Button variant="outline" asChild><Link to="/tasks">Cancel</Link></Button>
        </div>
      </div>
    </AppLayout>
  );
};

export default TaskDetail;
