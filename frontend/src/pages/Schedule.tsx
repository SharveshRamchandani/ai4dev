import AppLayout from "@/layouts/AppLayout";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { RefreshCw, Download, Battery, ChevronLeft, ChevronRight } from "lucide-react";

const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const hours = Array.from({ length: 14 }, (_, i) => i + 7); // 7AM to 8PM

type Block = {
  day: number;
  startHour: number;
  duration: number;
  subject: string;
  type: "study" | "break";
};

const studyBlocks: Block[] = [
  { day: 0, startHour: 9, duration: 1.5, subject: "CS 301 — Project", type: "study" },
  { day: 0, startHour: 10.5, duration: 0.25, subject: "Break", type: "break" },
  { day: 0, startHour: 11, duration: 1, subject: "MATH 204", type: "study" },
  { day: 0, startHour: 14, duration: 1, subject: "ENG 102 — Essay", type: "study" },
  { day: 1, startHour: 9, duration: 1, subject: "PHYS 201 — Lab", type: "study" },
  { day: 1, startHour: 10, duration: 0.25, subject: "Break", type: "break" },
  { day: 1, startHour: 10.5, duration: 1.5, subject: "CS 301 — Project", type: "study" },
  { day: 1, startHour: 14, duration: 1, subject: "BIO 301 — Quiz Prep", type: "study" },
  { day: 2, startHour: 9, duration: 2, subject: "MATH 204 — Review", type: "study" },
  { day: 2, startHour: 11, duration: 0.25, subject: "Break", type: "break" },
  { day: 2, startHour: 13, duration: 1.5, subject: "HIST 200 — Research", type: "study" },
  { day: 3, startHour: 10, duration: 1, subject: "ENG 102 — Revision", type: "study" },
  { day: 3, startHour: 14, duration: 2, subject: "CS 301 — Coding", type: "study" },
  { day: 4, startHour: 9, duration: 1.5, subject: "PHYS 201 — Problems", type: "study" },
  { day: 4, startHour: 11, duration: 1, subject: "BIO 301 — Reading", type: "study" },
  { day: 5, startHour: 10, duration: 2, subject: "CS 301 — Final Push", type: "study" },
  { day: 6, startHour: 14, duration: 1, subject: "Light Review", type: "study" },
];

const Schedule = () => {
  const [view, setView] = useState<"day" | "week" | "month">("week");

  return (
    <AppLayout>
      <div className="p-4 sm:p-6 space-y-4">
        {/* Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon"><ChevronLeft className="h-4 w-4" /></Button>
            <h2 className="text-lg font-semibold">Feb 24 – Mar 2, 2026</h2>
            <Button variant="ghost" size="icon"><ChevronRight className="h-4 w-4" /></Button>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            {(["day", "week", "month"] as const).map((v) => (
              <Button key={v} variant={view === v ? "default" : "outline"} size="sm" onClick={() => setView(v)} className="capitalize">{v}</Button>
            ))}
            <Button variant="outline" size="sm"><RefreshCw className="mr-1 h-3 w-3" /> Regenerate</Button>
            <Button variant="outline" size="sm"><Battery className="mr-1 h-3 w-3" /> I'm Tired</Button>
            <Button variant="outline" size="sm"><Download className="mr-1 h-3 w-3" /> Export</Button>
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="border border-border rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <div className="min-w-[700px]">
              {/* Header */}
              <div className="grid grid-cols-[60px_repeat(7,1fr)] border-b border-border">
                <div className="p-2" />
                {weekDays.map((d, i) => (
                  <div key={i} className="p-2 text-center text-xs font-medium text-muted-foreground border-l border-border">
                    {d}
                  </div>
                ))}
              </div>

              {/* Time slots */}
              {hours.map((hour) => (
                <div key={hour} className="grid grid-cols-[60px_repeat(7,1fr)] border-b border-border last:border-0 min-h-[48px]">
                  <div className="p-2 text-xs text-muted-foreground font-mono text-right pr-3">
                    {hour}:00
                  </div>
                  {weekDays.map((_, dayIdx) => {
                    const block = studyBlocks.find(
                      (b) => b.day === dayIdx && b.startHour >= hour && b.startHour < hour + 1
                    );
                    return (
                      <div key={dayIdx} className="border-l border-border relative min-h-[48px]">
                        {block && (
                          <div
                            className={`absolute left-0.5 right-0.5 rounded-md px-1.5 py-1 text-[11px] leading-tight z-10 ${
                              block.type === "break"
                                ? "bg-secondary text-muted-foreground border border-border"
                                : "bg-foreground text-background font-medium"
                            }`}
                            style={{
                              top: `${((block.startHour - hour) / 1) * 100}%`,
                              height: `${block.duration * 48}px`,
                            }}
                          >
                            <span className="block truncate">{block.subject}</span>
                            {block.type === "study" && (
                              <span className="text-[9px] opacity-70">{block.duration}h</span>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Schedule;
