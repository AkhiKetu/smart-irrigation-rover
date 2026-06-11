"use client";

import { useState } from "react";
import { researchItems } from "@/lib/updates";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { cn } from "@/lib/utils";
import { ChevronDown, ChevronUp, ExternalLink, FileText } from "lucide-react";

export function ResearchSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          eyebrow="Research Planning"
          title="Research Related"
          description="Methodology, research questions, survey data, and official project documents."
        />

        <div className="grid grid-cols-1 lg:grid-cols-1 md:grid-cols-1 gap-5">
          {researchItems.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={item.title}
                className={cn(
                  "rounded-3xl border shadow-sm transition-all duration-300",
                  isOpen
                    ? "border-emerald-500 bg-emerald-500/[0.08] shadow-lg"
                    : "border-border bg-card hover:border-emerald-500/30 hover:shadow-md hover:-translate-y-0.5"
                )}
              >
                {/* ── Header: always visible ── */}
                <button
                  type="button"
                  onClick={() => toggleItem(index)}
                  aria-expanded={isOpen}
                  className="w-full flex items-start justify-between gap-4 p-5 sm:p-6 text-left"
                >
                  <div>
                    <StatusBadge status={item.status} />
                    <h3 className="text-lg sm:text-xl font-bold mt-2">
                      {item.title}
                    </h3>
                  </div>

                  <span className="shrink-0 w-9 h-9 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center transition-colors duration-200 mt-1 hover:bg-emerald-500/20">
                    {isOpen ? (
                      <ChevronUp className="w-5 h-5" />
                    ) : (
                      <ChevronDown className="w-5 h-5" />
                    )}
                  </span>
                </button>

                {/* ── Body: toggled via inline style height ── */}
                <div
                  style={{
                    height: isOpen ? "auto" : 0,
                    overflow: "hidden",
                    transition: "height 300ms ease-in-out",
                  }}
                >
                  {isOpen && (
                    <div className="p-5 sm:px-6 pb-5 sm:pb-6 border-t border-border space-y-4">
                      <p className="text-sm text-muted-foreground leading-7 text-justify pt-4">
                        {item.summary}
                      </p>

                      {/* Documents */}
                      {item.hasDocuments ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {[
                            {
                              href: "/Documents/IUB_CSE 426_Project Proposal Form.pdf",
                              label: "Project Proposal Form",
                              sub: "Survey, goals, block diagram, timeline, references, and team details.",
                            },
                            {
                              href: "/Documents/Team-02-Project Overview.pdf",
                              label: "Project Overview",
                              sub: "Methodology, research questions, cost estimation, classification, and data analysis.",
                            },
                          ].map(({ href, label, sub }) => (
                            <a
                              key={label}
                              href={href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex flex-col gap-1.5 rounded-2xl border border-border bg-background p-4 hover:border-emerald-500/50 hover:shadow-md transition-all"
                            >
                              <span className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600">
                                <FileText className="w-3.5 h-3.5" />
                                PDF Document
                              </span>
                              <span className="font-bold text-sm">{label}</span>
                              <span className="text-xs text-muted-foreground leading-4">
                                {sub}
                              </span>
                              <span className="mt-1 inline-flex items-center gap-1 text-xs font-semibold text-emerald-600">
                                Open PDF
                                <ExternalLink className="w-3 h-3" />
                              </span>
                            </a>
                          ))}
                        </div>
                      ) : (
                        <ul className="space-y-2.5">
                          {item.details.map((detail, i) => (
                            <li
                              key={i}
                              className="flex gap-3 text-sm text-muted-foreground leading-relaxed"
                            >
                              <span className="mt-2 h-1.5 w-1.5 rounded-full bg-emerald-500 shrink-0" />
                              <span>{detail}</span>
                            </li>
                          ))}
                        </ul>
                      )}

                      {/* Survey link */}
                      {item.hasSurveyLink && (
                        <a
                          href="https://docs.google.com/forms/d/e/1FAIpQLSctAt3ngjfl3uGf-DIGq8hnoRspJsDFtkcciusU30_ddB2sug/viewform?usp=header"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white text-sm font-semibold hover:from-emerald-600 hover:to-teal-700 transition-all shadow-md"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          Open Survey Form
                        </a>
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
