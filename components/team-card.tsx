'use client';

import { useState } from 'react';

type TeamMember = {
  id: number;
  name: string;
  role: string;
  bio: string;
  image: string;
  email?: string;
  github?: string;
};

export function TeamCard({ member }: { member: TeamMember }) {
  const [showBio, setShowBio] = useState(false);

  return (
    <div className="group bg-card border border-border rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      <div className="h-100 bg-muted overflow-hidden">
        <img
          src={member.image}
          alt={member.name}
          className="h-full w-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      <div className="p-5">
        <h3 className="text-lg font-bold text-foreground mb-1">{member.name}</h3>
        <p className="text-sm font-semibold text-emerald-600 mb-4">{member.role}</p>

        <div className="grid grid-cols-2 gap-2 mb-3">
          {member.email && (
            <a
              href={`mailto:${member.email}`}
              className="px-3 py-2 rounded-xl bg-muted text-xs font-semibold text-center hover:bg-emerald-500/10 hover:text-emerald-600 border border-border transition-all"
            >
              Email
            </a>
          )}

          {member.github && (
            <a
              href={member.github}
              target="_blank"
              rel="noreferrer"
              className="px-3 py-2 rounded-xl bg-foreground text-background text-xs font-semibold text-center hover:bg-emerald-600 hover:text-white transition-all"
            >
              GitHub
            </a>
          )}
        </div>

        <button
          onClick={() => setShowBio(!showBio)}
          className="w-full px-3 py-2 rounded-xl bg-emerald-500/10 text-emerald-700 text-xs font-bold hover:bg-emerald-500 hover:text-white transition-all"
        >
          {showBio ? 'Hide Details' : 'View Details'}
        </button>

        {showBio && (
          <div className="mt-4 rounded-2xl bg-muted/50 border border-border p-4">
            <p className="text-sm text-muted-foreground leading-7 text-justify">
              {member.bio}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}