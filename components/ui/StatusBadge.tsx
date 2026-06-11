"use client";

import { cn } from "@/lib/utils";

type BadgeVariant = "completed" | "closed" | "upcoming" | "midweek" | "available";

const variantStyles: Record<BadgeVariant, string> = {
  completed: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
  closed: "bg-red-500/10 text-red-600 border-red-500/20",
  upcoming: "bg-blue-500/10 text-blue-600 border-blue-500/20",
  midweek: "bg-amber-500/10 text-amber-700 border-amber-500/20",
  available: "bg-violet-500/10 text-violet-600 border-violet-500/20",
};

function toVariant(status: string): BadgeVariant {
  const map: Record<string, BadgeVariant> = {
    Completed: "completed",
    Closed: "closed",
    Upcoming: "upcoming",
    "Mid Week": "midweek",
    Available: "available",
  };
  return map[status] ?? "upcoming";
}

interface StatusBadgeProps {
  status: string;
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const variant = toVariant(status);
  return (
    <span
      className={cn(
        "shrink-0 px-3 py-1 rounded-full text-xs font-bold border",
        variantStyles[variant],
        className
      )}
    >
      {status}
    </span>
  );
}
