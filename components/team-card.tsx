"use client";

import { useState } from "react";
import { FaGithub, FaLinkedin, FaEnvelope,FaResearchgate  } from "react-icons/fa";

type TeamMember = {
  id: number;
  name: string;
  role: string;
  bio: string;
  image: string;
  email?: string;
  github?: string;
  linkedin?: string;
  researchgate?: string;
};

export function TeamCard({ member }: { member: TeamMember }) {
  const [showBio, setShowBio] = useState(false);

  return (
    <div className="group bg-card border border-border rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      <div className="h-100 bg-muted overflow-hidden">
        <img
          src={member.image}
          alt={member.name}
          className="h-full w-full object-cover"
        />
      </div>

      <div className="p-5">
        <h3 className="text-lg font-bold text-foreground mb-1">
          {member.name}
        </h3>

        <p className="text-sm font-semibold text-emerald-600 mb-4">
          {member.role}
        </p>

        <div className="flex items-center gap-2 mb-4">
          {member.email && (
            <a
              href={`mailto:${member.email}`}
              className="h-6 w-6"
              aria-label={`${member.name} Email`}
            >
              <FaEnvelope className="h-5 w-5" />
            </a>
          )}

          {member.github && (
            <a
              href={member.github}
              target="_blank"
              rel="noopener noreferrer"
              className="h-6 w-6"
              aria-label={`${member.name} GitHub`}
            >
              <FaGithub className="h-5 w-5" />
            </a>
          )}

          {member.linkedin && (
            <a
              href={member.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="h-6 w-6"
              aria-label={`${member.name} LinkedIn`}
            >
              <FaLinkedin className="h-5 w-5" />
            </a>
          )}

          {member.researchgate && (
            <a
              href={member.researchgate}
              target="_blank"
              rel="noopener noreferrer"
              className="h-6 w-6"
              aria-label={`${member.name} ResearchGate`}
            >
              <FaResearchgate  className="h-5 w-5" />
            </a>
          )}
        </div>

        <button
          onClick={() => setShowBio(!showBio)}
          className="w-full px-3 py-2 rounded-xl bg-emerald-500/10 text-emerald-700 text-xs font-bold hover:bg-emerald-500 hover:text-white transition-all"
        >
          {showBio ? "Hide Details" : "View Details"}
        </button>

        {showBio && (
          <div className="mt-4 p-2">
            <p className="text-sm text-muted-foreground leading-7 text-justify">
              {member.bio}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}