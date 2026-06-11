"use client";

import type { ReactNode } from "react";

interface UpdatesHeroProps {
  children?: ReactNode;
}

export function UpdatesHero({ children }: UpdatesHeroProps) {
  return (
    <section className="relative overflow-hidden border-b border-border bg-gradient-to-br from-emerald-100/70 via-background to-teal-100/70">
      {/* Ambient blobs */}
      <div className="pointer-events-none absolute -top-32 -left-32 h-96 w-96 rounded-full bg-emerald-400/25 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-teal-400/25 blur-3xl" />

      <div className="relative mx-auto flex min-h-[470px] max-w-6xl flex-col items-center justify-center px-4 text-center sm:px-6 lg:px-8">
        <span className="mb-8 mt-5 inline-flex items-center gap-3 rounded-full border border-emerald-500 bg-emerald-100/70 px-5 py-2 text-sm font-bold text-emerald-700">
          <span className="h-2 w-2 rounded-full bg-emerald-500" />
          Course & Research Updates
        </span>

        <h1 className="text-5xl font-extrabold tracking-tight text-foreground sm:text-6xl lg:text-7xl">
          Project Updates
        </h1>

        <p className="mt-6 max-w-2xl text-center text-base leading-8 text-muted-foreground sm:text-lg">
          Lecture timeline, team research papers, and research-related project
          planning for the Smart Irrigation Rover.
        </p>

        {children && <div className="mt-10 w-full">{children}</div>}
      </div>
    </section>
  );
}