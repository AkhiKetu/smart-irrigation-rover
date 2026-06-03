import Image from 'next/image';
import type { TeamMember } from '@/lib/data';

interface TeamCardProps {
  member: TeamMember;
}

export function TeamCard({ member }: TeamCardProps) {
  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg hover:border-emerald-500/50 transition-all duration-300">
      <div className="aspect-square relative bg-muted overflow-hidden">
        <Image
          src={member.image}
          alt={member.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className="p-6">
        <h3 className="text-lg font-semibold text-foreground mb-1">{member.name}</h3>
        <p className="text-sm font-medium text-emerald-600 mb-3">{member.role}</p>
        <p className="text-sm text-muted-foreground leading-relaxed">{member.bio}</p>
      </div>
    </div>
  );
}
