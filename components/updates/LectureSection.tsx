"use client";

import { useState } from "react";
import { lectures } from "@/lib/updates";
import { LectureCard } from "./LectureCard";
import { SectionHeader } from "@/components/ui/SectionHeader";

export function LectureSection() {
  const [openId, setOpenId] = useState<number | null>(1);

  const completed = lectures.filter((l) => l.status === "Completed").length;
  const total = lectures.length;

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          eyebrow="20 May – 13 August"
          title="Lecture Timeline"
          description="Every Wednesday · 6:30 PM – 9:30 PM"
        />

        {/* Progress bar */}
        <div className="mb-8 max-w-full mx-auto">
          <div className="flex justify-between text-xs text-muted-foreground mb-1.5">
            <span>Progress</span>
            <span>
              {completed} / {total} lectures
            </span>
          </div>
          <div className="h-2 rounded-full bg-muted overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 transition-all duration-700"
              style={{ width: `${(completed / total) * 100}%` }}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-start">
          {lectures.map((lecture) => (
            <LectureCard
              key={lecture.id}
              lecture={lecture}
              isOpen={openId === lecture.id}
              onToggle={() =>
                setOpenId(openId === lecture.id ? null : lecture.id)
              }
            />
          ))}
        </div>
      </div>
    </section>
  );
}
