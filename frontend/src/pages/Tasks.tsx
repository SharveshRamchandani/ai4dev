import AppLayout from "@/layouts/AppLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Search, Filter, SortAsc, Mail, BookOpen, MessageSquare, Clock, MoreHorizontal, Trash2, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const allTasks = [
  { id: "1", title: "CS 301 — Final Project Proposal", subject: "Computer Science", source: "Canvas", sourceIcon: BookOpen, deadline: "Feb 28, 2026", priority: 95, effort: "3h", status: "pending" as const },
  { id: "2", title: "MATH 204 — Problem Set 7", subject: "Mathematics", source: "Gmail", sourceIcon: Mail, deadline: "Mar 1, 2026", priority: 88, effort: "2h", status: "pending" as const },
  { id: "3", title: "ENG 102 — Essay Draft Review", subject: "English", source: "Canvas", sourceIcon: BookOpen, deadline: "Mar 2, 2026", priority: 76, effort: "1.5h", status: "pending" as const },
  { id: "4", title: "Group Project Meeting Notes", subject: "Computer Science", source: "Slack", sourceIcon: MessageSquare, deadline: "Mar 1, 2026", priority: 65, effort: "30m", status: "pending" as const },
  { id: "5", title: "PHYS 201 — Lab Report", subject: "Physics", source: "Gmail", sourceIcon: Mail, deadline: "Mar 3, 2026", priority: 60, effort: "2h", status: "pending" as const },
  { id: "6", title: "BIO 301 — Weekly Quiz", subject: "Biology", source: "Canvas", sourceIcon: BookOpen, deadline: "Mar 4, 2026", priority: 55, effort: "45m", status: "pending" as const },
  { id: "7", title: "HIST 200 — Research Paper Outline", subject: "History", source: "Gmail", sourceIcon: Mail, deadline: "Mar 5, 2026", priority: 50, effort: "1h", status: "completed" as const },
  { id: "8", title: "CS 301 — Midterm Study Guide", subject: "Computer Science", source: "Canvas", sourceIcon: BookOpen, deadline: "Feb 25, 2026", priority: 45, effort: "4h", status: "completed" as const },
];

const Tasks = () => {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [filter, setFilter] = useState<"all" | "pending" | "completed">("all");

  const filtered = allTasks.filter((t) => {
    if (filter !== "all" && t.status !== filter) return false;
    if (search && !t.title.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const toggleSelect = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  return (
    <AppLayout>
      <div className="p-4 sm:p-6 max-w-5xl mx-auto space-y-4">
        {/* Search & Filters */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search tasks..." className="pl-9" value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
          <div className="flex gap-2">
            {(["all", "pending", "completed"] as const).map((f) => (
              <Button key={f} variant={filter === f ? "default" : "outline"} size="sm" onClick={() => setFilter(f)} className="capitalize">
                {f}
              </Button>
            ))}
          </div>
        </div>

        {/* Bulk actions */}
        {selected.size > 0 && (
          <div className="flex items-center gap-3 border border-border rounded-xl p-3 bg-secondary/50">
            <span className="text-sm">{selected.size} selected</span>
            <Button variant="outline" size="sm"><CheckCircle2 className="mr-1 h-3 w-3" /> Complete</Button>
            <Button variant="outline" size="sm"><Trash2 className="mr-1 h-3 w-3" /> Delete</Button>
          </div>
        )}

        {/* Task List */}
        <div className="space-y-2">
          {filtered.map((task) => (
            <Link to={`/tasks/${task.id}`} key={task.id}
              className={`border border-border rounded-xl p-4 flex items-center gap-4 hover:bg-accent/50 transition-colors block ${task.status === "completed" ? "opacity-60" : ""}`}>
              <div onClick={(e) => { e.preventDefault(); toggleSelect(task.id); }}>
                <Checkbox checked={selected.has(task.id)} />
              </div>
              <div className="flex-1 min-w-0">
                <p className={`font-medium text-sm truncate ${task.status === "completed" ? "line-through" : ""}`}>{task.title}</p>
                <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground flex-wrap">
                  <span className="bg-secondary px-2 py-0.5 rounded-full">{task.subject}</span>
                  <span className="flex items-center gap-1"><task.sourceIcon className="h-3 w-3" /> {task.source}</span>
                  <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {task.deadline}</span>
                  <span>{task.effort}</span>
                </div>
              </div>
              <div className="text-right shrink-0 flex items-center gap-2">
                <span className="text-xs font-semibold bg-secondary px-2 py-1 rounded-full">{task.priority}</span>
                <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
              </div>
            </Link>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20 text-muted-foreground">
            <p className="text-lg font-medium mb-2">No tasks found</p>
            <p className="text-sm">Try adjusting your filters or connect a platform to get started.</p>
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default Tasks;
