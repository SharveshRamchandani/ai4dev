import AppLayout from "@/layouts/AppLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search as SearchIcon, CheckSquare, Calendar, FileText, Mail } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

type ResultType = "task" | "schedule" | "note" | "message";

const mockResults: { type: ResultType; title: string; source: string; date: string; snippet: string; url: string }[] = [
  { type: "task", title: "CS 301 — Final Project Proposal", source: "Canvas", date: "Feb 28", snippet: "Write a 3-page proposal outlining scope, methodology...", url: "/tasks/1" },
  { type: "task", title: "MATH 204 — Problem Set 7", source: "Gmail", date: "Mar 1", snippet: "Complete problems 1-12 from Chapter 7...", url: "/tasks/2" },
  { type: "schedule", title: "CS 301 — Project Block", source: "Schedule", date: "Feb 26, 9 AM", snippet: "90 min study session for final project work", url: "/schedule" },
  { type: "message", title: "TA Reminder: MATH 204 due date", source: "Gmail", date: "Feb 23", snippet: "Hi everyone, just a reminder that Problem Set 7 is due...", url: "/tasks/2" },
  { type: "note", title: "ENG 102 Essay Outline", source: "Manual", date: "Feb 25", snippet: "Thesis: The impact of AI on academic integrity...", url: "/tasks/3" },
];

const typeIcons: Record<ResultType, any> = {
  task: CheckSquare,
  schedule: Calendar,
  note: FileText,
  message: Mail,
};

const SearchPage = () => {
  const [query, setQuery] = useState("");
  const results = query.length > 0 ? mockResults.filter((r) => r.title.toLowerCase().includes(query.toLowerCase()) || r.snippet.toLowerCase().includes(query.toLowerCase())) : [];

  return (
    <AppLayout>
      <div className="p-4 sm:p-6 max-w-3xl mx-auto space-y-6">
        {/* Search input */}
        <div className="relative">
          <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="Search tasks, notes, emails, schedules..."
            className="pl-12 h-12 text-base"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
          />
        </div>

        {/* Results */}
        {query.length > 0 && (
          <div className="space-y-1">
            {results.length > 0 ? (
              results.map((r, i) => {
                const Icon = typeIcons[r.type];
                return (
                  <Link key={i} to={r.url} className="flex items-start gap-3 p-4 rounded-xl hover:bg-accent/50 transition-colors">
                    <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center shrink-0">
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium">{r.title}</p>
                      <p className="text-xs text-muted-foreground truncate">{r.snippet}</p>
                      <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                        <span className="capitalize">{r.type}</span>
                        <span>·</span>
                        <span>{r.source}</span>
                        <span>·</span>
                        <span>{r.date}</span>
                      </div>
                    </div>
                  </Link>
                );
              })
            ) : (
              <div className="text-center py-16 text-muted-foreground">
                <SearchIcon className="h-8 w-8 mx-auto mb-3" />
                <p>No results for "{query}"</p>
                <p className="text-xs mt-1">Try different keywords or check your filters</p>
              </div>
            )}
          </div>
        )}

        {/* Empty state */}
        {query.length === 0 && (
          <div className="text-center py-16 text-muted-foreground">
            <SearchIcon className="h-8 w-8 mx-auto mb-3" />
            <p className="font-medium">Search across everything</p>
            <p className="text-sm mt-1">Tasks, schedule blocks, notes, and source messages</p>
            <div className="flex flex-wrap justify-center gap-2 mt-4">
              {["CS 301", "due this week", "from Gmail", "lab report"].map((tip) => (
                <button key={tip} onClick={() => setQuery(tip)} className="text-xs bg-secondary px-3 py-1.5 rounded-full hover:bg-accent transition-colors">{tip}</button>
              ))}
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default SearchPage;
