"use client";

import type { FilterType } from "@/lib/updates";

interface FilterBarProps {
  activeFilter: FilterType;
  setActiveFilter: (filter: FilterType) => void;
}

const filters: { label: string; value: FilterType }[] = [
  {
    label: "All Updates",
    value: "all",
  },
  {
    label: "Lecture Timeline",
    value: "lecture",
  },
  {
    label: "Team Papers",
    value: "team",
  },
  {
    label: "Research Related",
    value: "related",
  },
];

export function FilterBar({ activeFilter, setActiveFilter }: FilterBarProps) {
  return (
    <div className="w-full bg-transparent">
      <div className="mx-auto flex max-w-6xl justify-center px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-center gap-4">
          {filters.map((filter) => {
            const isActive = activeFilter === filter.value;

            return (
              <button
                key={filter.value}
                type="button"
                onClick={() => setActiveFilter(filter.value)}
                className="min-w-[230px] rounded-2xl border px-8 py-4 text-base font-bold shadow-sm transition-all duration-300"
                style={{
                  backgroundColor: isActive ? "#059669" : "#ffffff",
                  color: isActive ? "#ffffff" : "#000000",
                  borderColor: isActive ? "#059669" : "#e5e7eb",
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.backgroundColor = "#d1fae5";
                    e.currentTarget.style.color = "#047857";
                    e.currentTarget.style.borderColor = "#34d399";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.backgroundColor = "#ffffff";
                    e.currentTarget.style.color = "#000000";
                    e.currentTarget.style.borderColor = "#e5e7eb";
                  }
                }}
              >
                {filter.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}