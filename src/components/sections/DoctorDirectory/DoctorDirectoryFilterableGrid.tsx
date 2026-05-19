"use client";

import { useState } from "react";

interface Doctor {
  name: string;
  specialization: string;
  department?: string;
  qualification?: string;
  experience?: string;
  image?: string;
  availability?: string;
  cta?: { text: string; url: string };
}

interface DoctorDirectoryFilterableGridProps {
  content: {
    headline: string;
    description?: string;
    eyebrow?: string;
    subtitle?: string;
    doctors: Doctor[];
  };
  eyebrow?: string;
  subtitle?: string;
}

function getInitials(name: string): string {
  return name.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2);
}

export default function DoctorDirectoryFilterableGrid({ content, eyebrow, subtitle }: DoctorDirectoryFilterableGridProps) {
  const { headline, description, doctors } = content;
  const departments = ["All", ...Array.from(new Set(doctors.map((d) => d.department).filter(Boolean) as string[]))];
  const [activeFilter, setActiveFilter] = useState("All");

  const filtered = activeFilter === "All" ? doctors : doctors.filter((d) => d.department === activeFilter);

  return (
    <section className="section-y">
      <div className="page-container">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-semibold text-foreground font-[family-name:var(--font-display)]">
            {headline}
          </h2>
          {description && (
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto font-[family-name:var(--font-body)]">
              {description}
            </p>
          )}
        </div>

        <div className="flex flex-wrap gap-2 justify-center mb-8">
          {departments.map((dept) => (
            <button
              key={dept}
              onClick={() => setActiveFilter(dept)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                activeFilter === dept
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:text-foreground"
              }`}
            >
              {dept}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filtered.map((doctor) => (
            <div
              key={doctor.name}
              className="bg-card border border-border rounded-[var(--radius-md)] p-5"
            >
              <div className="flex items-center gap-4 mb-4">
                {doctor.image ? (
                  <img
                    src={doctor.image}
                    alt={doctor.name}
                    className="w-14 h-14 rounded-full object-cover shrink-0"
                  onError={(e) => { (e.target as HTMLImageElement).style.visibility = "hidden"; }}
                  />
                ) : (
                  <div className="w-14 h-14 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-lg shrink-0">
                    {getInitials(doctor.name)}
                  </div>
                )}
                <div className="min-w-0">
                  <p className="font-semibold text-foreground leading-tight font-[family-name:var(--font-display)]">
                    {doctor.name}
                  </p>
                  <p className="text-primary text-sm mt-0.5">{doctor.specialization}</p>
                </div>
              </div>
              {doctor.department && (
                <span className="inline-block bg-muted text-xs text-muted-foreground px-2 py-0.5 rounded-full mb-2">
                  {doctor.department}
                </span>
              )}
              {doctor.qualification && (
                <p className="text-xs text-muted-foreground">{doctor.qualification}</p>
              )}
              {doctor.cta && (
                <a
                  href={doctor.cta.url}
                  className="mt-4 block w-full text-center text-sm font-medium py-2 rounded-[var(--radius-sm)] bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
                >
                  {doctor.cta.text}
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
