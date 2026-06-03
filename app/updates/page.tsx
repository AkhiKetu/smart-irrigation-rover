'use client';

import { useState, useMemo } from 'react';
import { UpdateCard } from '@/components/update-card';
import { updates } from '@/lib/data';

export default function UpdatesPage() {
  const [filter, setFilter] = useState<'all' | 'lecture' | 'research'>('all');

  const filteredUpdates = useMemo(() => {
    const sorted = [...updates].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    if (filter === 'all') return sorted;
    return sorted.filter((update) => update.category === filter);
  }, [filter]);

  return (
    <div className="bg-background text-foreground">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/50">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-foreground">Project Updates</h1>
          <div className="w-16 h-1 bg-gradient-to-r from-emerald-500 to-teal-600 mx-auto mb-6" />
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Daily updates on our research progress and lecture learnings throughout the semester
          </p>
        </div>
      </section>

      {/* Filter Buttons */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-background border-b border-border sticky top-16 z-40">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap gap-3 justify-center">
            <button
              onClick={() => setFilter('all')}
              className={`px-6 py-2 rounded-lg font-medium transition-all ${
                filter === 'all'
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg'
                  : 'bg-muted text-foreground hover:bg-muted/80 border border-border'
              }`}
            >
              All Updates ({updates.length})
            </button>
            <button
              onClick={() => setFilter('lecture')}
              className={`px-6 py-2 rounded-lg font-medium transition-all ${
                filter === 'lecture'
                  ? 'bg-blue-500/80 text-white shadow-lg'
                  : 'bg-muted text-foreground hover:bg-muted/80 border border-border'
              }`}
            >
              Lectures ({updates.filter((u) => u.category === 'lecture').length})
            </button>
            <button
              onClick={() => setFilter('research')}
              className={`px-6 py-2 rounded-lg font-medium transition-all ${
                filter === 'research'
                  ? 'bg-emerald-500/80 text-white shadow-lg'
                  : 'bg-muted text-foreground hover:bg-muted/80 border border-border'
              }`}
            >
              Research ({updates.filter((u) => u.category === 'research').length})
            </button>
          </div>
        </div>
      </section>

      {/* Updates Timeline */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {filteredUpdates.length > 0 ? (
            <div className="space-y-6">
              {filteredUpdates.map((update) => (
                <UpdateCard key={update.id} update={update} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-lg text-muted-foreground">No updates found for this category.</p>
            </div>
          )}
        </div>
      </section>

      {/* Stats Overview */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-8 text-center text-foreground">Semester Progress</h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-card border border-border rounded-lg p-6 text-center">
              <div className="text-3xl font-bold text-emerald-600 mb-2">{updates.length}</div>
              <p className="text-sm text-muted-foreground">Total Updates</p>
            </div>
            <div className="bg-card border border-border rounded-lg p-6 text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">
                {updates.filter((u) => u.category === 'lecture').length}
              </div>
              <p className="text-sm text-muted-foreground">Lectures Completed</p>
            </div>
            <div className="bg-card border border-border rounded-lg p-6 text-center">
              <div className="text-3xl font-bold text-emerald-600 mb-2">
                {updates.filter((u) => u.category === 'research').length}
              </div>
              <p className="text-sm text-muted-foreground">Research Sessions</p>
            </div>
            <div className="bg-card border border-border rounded-lg p-6 text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">
                {Math.max(...updates.map((u) => u.week))}
              </div>
              <p className="text-sm text-muted-foreground">Current Week</p>
            </div>
          </div>
        </div>
      </section>

      {/* Weekly Breakdown */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-8 text-center text-foreground">Updates by Week</h2>

          <div className="space-y-4">
            {Array.from({ length: Math.max(...updates.map((u) => u.week)) }).map((_, week) => {
              const weekNum = week + 1;
              const weekUpdates = updates.filter((u) => u.week === weekNum);
              return (
                <div
                  key={weekNum}
                  className="bg-card border border-border rounded-lg p-6 hover:shadow-lg hover:border-emerald-500/50 transition-all"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-foreground">Week {weekNum}</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        {weekUpdates.length} update{weekUpdates.length !== 1 ? 's' : ''} this week
                      </p>
                    </div>
                    <div className="flex gap-2">
                      {weekUpdates.map((u) => (
                        <span
                          key={u.id}
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            u.category === 'lecture'
                              ? 'bg-blue-500/10 text-blue-700 dark:text-blue-400'
                              : 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400'
                          }`}
                        >
                          {u.category === 'lecture' ? 'L' : 'R'}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
