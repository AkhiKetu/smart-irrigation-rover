import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  eyebrow: string;
  title: string;
  description?: string;
  className?: string;
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  className,
}: SectionHeaderProps) {
  return (
    <div className={cn("text-center mb-5 sm:mb-6", className)}>
      <span className="inline-block text-xs font-bold text-emerald-600 uppercase tracking-[0.18em] mb-2">
        {eyebrow}
      </span>

      <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
        {title}
      </h2>

      {description && (
        <p className="mt-2 text-sm text-muted-foreground max-w-xl mx-auto leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}