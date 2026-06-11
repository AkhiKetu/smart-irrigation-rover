"use client";

import { useState } from "react";
import type { FilterType } from "@/lib/updates";

import { UpdatesHero } from "@/components/updates/UpdatesHero";
import { FilterBar } from "@/components/updates/FilterBar";
import { LectureSection } from "@/components/updates/LectureSection";
import { TeamSection } from "@/components/updates/TeamSection";
import { ResearchSection } from "@/components/updates/ResearchSection";

export default function UpdatesPage() {
  const [filter, setFilter] = useState<FilterType>("all");

  const show = (key: FilterType) => filter === "all" || filter === key;

  return (
    <main className="bg-background text-foreground">
      <UpdatesHero>
        <FilterBar activeFilter={filter} setActiveFilter={setFilter} />
      </UpdatesHero>

      {show("lecture") && <LectureSection />}
      {show("team") && <TeamSection />}
      {show("related") && <ResearchSection />}
    </main>
  );
}