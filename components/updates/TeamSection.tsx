"use client";

import { useState } from "react";
import { teamResearch } from "@/lib/updates";
import type { TeamMember } from "@/lib/updates";
import { PaperCard } from "./PaperCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { cn } from "@/lib/utils";
import { BookOpen, ChevronDown, ChevronUp } from "lucide-react";

export function TeamSection() {
  const [openMember, setOpenMember] = useState<number | null>(null);
  const [openPaper, setOpenPaper] = useState<number | null>(null);

  function handleToggleMember(id: number) {
    setOpenMember((prev) => {
      if (prev === id) return null;
      setOpenPaper(null); // reset paper when switching member
      return id;
    });
  }

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          eyebrow="Literature Review"
          title="Team Research Papers"
          description="Click a team member to browse their assigned research topic and papers."
        />

        <div className="grid grid-cols-1 gap-4">
          {teamResearch.map((member) => {
            const isOpen = openMember === member.id;

            return (
              <div
                key={member.id}
                className={cn(
                  "rounded-3xl border shadow-sm transition-all duration-300",
                  isOpen
                    ? "border-emerald-500 bg-emerald-500/[0.08] shadow-lg"
                    : "border-border bg-card hover:border-emerald-500/30 hover:shadow-md hover:-translate-y-0.5",
                )}
              >
                {/* ── Member header: always visible ── */}
                <button
                  type="button"
                  onClick={() => handleToggleMember(member.id)}
                  aria-expanded={isOpen}
                  className="w-full flex items-start justify-between gap-4 p-5 sm:p-6 text-left"
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-3 flex-wrap">
                      <StatusBadge status={member.status} />
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <BookOpen className="w-3 h-3" />
                        {member.papers.length} papers
                      </span>
                    </div>
                    <h3 className="text-lg sm:text-2xl font-bold mt-2">
                      {member.name}
                    </h3>
                    <p className="text-sm sm:text-base font-semibold text-emerald-600 mt-1">
                      {member.role}
                    </p>
                    <p className="text-sm sm:text-base text-muted-foreground mt-3 leading-7 line-clamp-2 text-justify">
                      {member.topic}
                    </p>
                  </div>

                  <span className="shrink-0 w-9 h-9 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center transition-colors duration-200 mt-1 hover:bg-emerald-500/20">
                    {isOpen ? (
                      <ChevronUp className="w-5 h-5" />
                    ) : (
                      <ChevronDown className="w-5 h-5" />
                    )}
                  </span>
                </button>

                {/* ── Papers: hidden until clicked ── */}
                <div
                  style={{
                    height: isOpen ? "auto" : 0,
                    overflow: "hidden",
                    transition: "height 300ms ease-in-out",
                  }}
                >
                  {isOpen && (
                    <div className="p-5 sm:px-6 pb-5 sm:pb-6 border-t border-border pt-5 space-y-3">
                      {member.papers.length === 0 ? (
                        <div className="rounded-2xl bg-muted/50 border border-dashed border-border p-8 text-center">
                          <p className="text-sm font-semibold text-muted-foreground">
                            Papers will be added after collecting final
                            summaries.
                          </p>
                        </div>
                      ) : (
                        member.papers.map((paper, idx) => (
                          <PaperCard
                            key={paper.title}
                            paper={paper}
                            index={idx}
                          />
                        ))
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
