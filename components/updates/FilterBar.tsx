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
  {
    label: "Assignments",
    value: "assignments",
  },
  {
    label: "Project Update",
    value: "Project",
  },
];

export function FilterBar({
  activeFilter,
  setActiveFilter,
}: FilterBarProps) {
  return (
    <div className="w-full bg-transparent">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {filters.map((filter) => {
            const isActive = activeFilter === filter.value;

            return (
              <button
                key={filter.value}
                type="button"
                onClick={() => setActiveFilter(filter.value)}
                className="w-full rounded-2xl border px-5 py-4 text-base font-bold shadow-sm transition-all duration-300"
                style={{
                  backgroundColor: isActive ? "#059669" : "#ffffff",
                  color: isActive ? "#ffffff" : "#000000",
                  borderColor: isActive ? "#059669" : "#e5e7eb",
                }}
                onMouseEnter={(event) => {
                  if (!isActive) {
                    event.currentTarget.style.backgroundColor = "#d1fae5";
                    event.currentTarget.style.color = "#047857";
                    event.currentTarget.style.borderColor = "#34d399";
                  }
                }}
                onMouseLeave={(event) => {
                  if (!isActive) {
                    event.currentTarget.style.backgroundColor = "#ffffff";
                    event.currentTarget.style.color = "#000000";
                    event.currentTarget.style.borderColor = "#e5e7eb";
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