"use client";

import { useState } from "react";

interface Member {
  name: string;
  role: string;
  image?: string;
  bio?: string;
  social?: {
    instagram?: string;
    linkedin?: string;
    twitter?: string;
  };
}

interface TeamGridProps {
  content: {
    headline: string;
    description?: string;
    eyebrow?: string;
    subtitle?: string;
    members: Member[];
  };
  eyebrow?: string;
  subtitle?: string;
}

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

function TeamMemberCard({ member }: { member: Member }) {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="group text-center rounded-xl border border-border bg-card p-5 transition-all duration-[var(--duration-normal)] hover:-translate-y-1 hover:border-primary/30 hover:shadow-md">
      {member.image && !imgError ? (
        <img
          src={member.image}
          alt={member.name}
          onError={() => setImgError(true)}
          className="w-20 h-20 rounded-full object-cover mx-auto"
        />
      ) : (
        <div className="w-20 h-20 rounded-full flex items-center justify-center text-xl font-bold mx-auto" style={{ background: "color-mix(in srgb, var(--color-primary) 12%, transparent)", color: "var(--color-primary)" }}>
          {getInitials(member.name)}
        </div>
      )}
      <p className="font-medium text-foreground mt-4">{member.name}</p>
      <p className="text-sm text-muted-foreground">{member.role}</p>
      {member.bio && (
        <p className="text-xs text-muted-foreground mt-2 line-clamp-2">{member.bio}</p>
      )}
      {member.social && (
        <div className="flex justify-center gap-3 mt-3">
          {member.social.linkedin && (
            <a href={member.social.linkedin} target="_blank" rel="noopener noreferrer" className="text-xs text-muted-foreground hover:text-primary transition-colors">
              in
            </a>
          )}
          {member.social.instagram && (
            <a href={member.social.instagram} target="_blank" rel="noopener noreferrer" className="text-xs text-muted-foreground hover:text-primary transition-colors">
              ig
            </a>
          )}
          {member.social.twitter && (
            <a href={member.social.twitter} target="_blank" rel="noopener noreferrer" className="text-xs text-muted-foreground hover:text-primary transition-colors">
              tw
            </a>
          )}
        </div>
      )}
    </div>
  );
}

export default function TeamGrid({ content, eyebrow, subtitle }: TeamGridProps) {
  const { headline, description, members } = content;
  const resolvedEyebrow = eyebrow ?? content.eyebrow;
  const resolvedSubtitle = subtitle ?? content.subtitle;

  return (
    <section id="team" className="section-y">
      <div className="page-container">
        <div className="text-center mb-12">
          {resolvedEyebrow && (
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest" style={{ color: "var(--color-primary)" }}>
              {resolvedEyebrow}
            </p>
          )}
          <h2 className="text-3xl font-bold text-foreground">{headline}</h2>
          {resolvedSubtitle && (
            <p className="text-muted-foreground/70 mt-3 max-w-2xl mx-auto">{resolvedSubtitle}</p>
          )}
          {description && !resolvedSubtitle && (
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">{description}</p>
          )}
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {members.map((member) => (
            <TeamMemberCard key={member.name} member={member} />
          ))}
        </div>
      </div>
    </section>
  );
}
