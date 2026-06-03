import type { Update } from '@/lib/data';

interface UpdateCardProps {
  update: Update;
}

export function UpdateCard({ update }: UpdateCardProps) {
  const formattedDate = new Date(update.date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <div className="bg-card border border-border rounded-lg p-6 hover:shadow-lg hover:border-emerald-500/50 transition-all duration-300">
      <div className="flex items-start justify-between gap-4 mb-3">
        <div>
          <h3 className="text-lg font-semibold text-foreground">{update.title}</h3>
        </div>
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ${
            update.category === 'lecture'
              ? 'bg-blue-500/10 text-blue-700 dark:text-blue-400'
              : 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400'
          }`}
        >
          {update.category === 'lecture' ? 'Lecture' : 'Research'}
        </span>
      </div>

      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
        <span>{formattedDate}</span>
        <span className="text-xs bg-muted px-2 py-1 rounded">Week {update.week}</span>
      </div>

      <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{update.description}</p>

      <p className="text-sm text-foreground leading-relaxed">{update.content}</p>
    </div>
  );
}
