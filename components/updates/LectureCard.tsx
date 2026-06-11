"use client";

import { cn } from "@/lib/utils";
import { StatusBadge } from "@/components/ui/StatusBadge";
import type { Lecture } from "@/lib/updates";
import { ChevronDown, ExternalLink, FileText } from "lucide-react";

interface LectureCardProps {
  lecture: Lecture;
  isOpen: boolean;
  onToggle: () => void;
}

const cardBg: Record<string, string> = {
  Closed: "bg-red-500/5 border-red-500/30 hover:border-red-500/50",
  "Mid Week": "bg-amber-500/8 border-amber-500/50 shadow-md",
  Upcoming: "bg-blue-500/5 border-blue-500/20 hover:border-blue-500/40",
  Completed: "bg-card border-border hover:border-emerald-500/50",
};

export function LectureCard({ lecture, isOpen, onToggle }: LectureCardProps) {
  const bg = cardBg[lecture.status] ?? "bg-card border-border";

  return (
    <div
      className={cn(
        "group w-full self-start rounded-2xl border p-5 sm:p-6 shadow-sm transition-all duration-300",
        "hover:shadow-lg hover:-translate-y-0.5",
        bg,
        isOpen &&
          lecture.status === "Completed" &&
          "border-emerald-500 bg-emerald-500/8"
      )}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="w-full text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 rounded-xl"
      >
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <p className="text-xs font-bold text-emerald-600 tracking-wide uppercase mb-1">
              {lecture.displayDate}
            </p>

            <h3 className="text-base sm:text-lg font-bold leading-snug truncate pr-2">
              {lecture.title}
            </h3>

            <p className="text-xs text-muted-foreground mt-1">
              {lecture.time}
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <StatusBadge status={lecture.status} />

            <span
              className={cn(
                "w-7 h-7 rounded-full bg-muted flex items-center justify-center text-muted-foreground transition-transform duration-300",
                isOpen && "rotate-180"
              )}
            >
              <ChevronDown className="w-4 h-4" />
            </span>
          </div>
        </div>
      </button>

      {/* Expandable description and materials */}
      <div
        className={cn(
          "overflow-hidden transition-all duration-300 ease-in-out",
          isOpen ? "max-h-96 mt-4 opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="border-t border-border pt-4">
          <p className="text-sm text-muted-foreground leading-7 text-justify">
            {lecture.description}
          </p>

          {lecture.materials && lecture.materials.length > 0 && (
            <div className="mt-4 flex flex-col gap-3">
              {lecture.materials.map((material) => (
                <a
                  key={material.href}
                  href={material.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-between gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-100"
                >
                  <span className="flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    {material.title}
                  </span>

                  <ExternalLink className="h-4 w-4" />
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}