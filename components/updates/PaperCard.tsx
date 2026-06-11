"use client";

import type { Paper } from "@/lib/updates";
import { cn } from "@/lib/utils";
import { ExternalLink, FileText } from "lucide-react";

interface PaperCardProps {
  paper: Paper;
  index: number;
}

export function PaperCard({ paper, index }: PaperCardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border shadow-sm transition-all duration-300",
        "border-border bg-card hover:border-emerald-500/30 hover:shadow-md hover:-translate-y-0.5"
      )}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3 p-4">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold text-emerald-600 bg-emerald-500/10 px-2 py-0.5 rounded-full shrink-0">
              #{index + 1}
            </span>

            <span className="text-xs text-muted-foreground">
              {paper.year}
            </span>

            <span className="text-xs text-muted-foreground">•</span>

            <span className="text-xs font-medium text-muted-foreground truncate">
              {paper.source}
            </span>
          </div>

          <h4 className="text-sm font-bold leading-snug line-clamp-2">
            {paper.title}
          </h4>
        </div>
      </div>

      {/* Body always visible */}
      <div className="px-4 pb-4 border-t border-border space-y-3">
        <p className="text-sm text-muted-foreground leading-6 text-justify pt-3">
          {paper.summary}
        </p>

        <div className="flex flex-wrap items-center gap-3">
          <a
            href={paper.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600 hover:text-emerald-700 transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            View Paper
          </a>

          {paper.pdf && (
            <a
              href={paper.pdf}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors"
            >
              <FileText className="w-3.5 h-3.5" />
              View Summary
            </a>
          )}
        </div>
      </div>
    </div>
  );
}