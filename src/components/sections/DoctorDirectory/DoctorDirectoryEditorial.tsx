"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface Doctor {
  name: string;
  specialization: string;
  department?: string;
  qualification?: string;
  experience?: string;
  bio?: string;
  image?: string;
  cta?: { text: string; url: string };
}

interface DoctorDirectoryEditorialProps {
  content: {
    eyebrow?: string;
    headline: string;
    description?: string;
    doctors: Doctor[];
  };
}

function getInitials(name: string): string {
  return name.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2);
}

export default function DoctorDirectoryEditorial({ content }: DoctorDirectoryEditorialProps) {
  const { eyebrow, headline, description, doctors } = content;
  const departments = ["All", ...Array.from(new Set(doctors.map((d) => d.department).filter(Boolean) as string[]))];
  const [activeFilter, setActiveFilter] = useState("All");

  const filtered = activeFilter === "All" ? doctors : doctors.filter((d) => d.department === activeFilter);

  return (
    <section
      id="doctors"
      style={{
        background: "var(--color-surface)",
        padding: "clamp(80px, 10vw, 120px) clamp(1.5rem, 8vw, 8rem)",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          style={{ marginBottom: "clamp(2.5rem, 5vw, 4rem)" }}
        >
          {eyebrow && (
            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "0.7rem",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: `color-mix(in oklch, var(--color-neutral) 50%, transparent)`,
                fontWeight: 300,
                marginBottom: "0.75rem",
              }}
            >
              {eyebrow}
            </p>
          )}
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1.75rem, 3vw, 2.75rem)",
              lineHeight: "1.15",
              color: "var(--color-neutral)",
              letterSpacing: "0.01em",
              marginBottom: description ? "1rem" : 0,
            }}
          >
            {headline}
          </h2>
          {description && (
            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "0.9375rem",
                lineHeight: 1.7,
                color: `color-mix(in oklch, var(--color-neutral) 55%, transparent)`,
                fontWeight: 300,
                maxWidth: "520px",
              }}
            >
              {description}
            </p>
          )}
        </motion.div>

        {/* Department filter */}
        {departments.length > 1 && (
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "0.5rem",
              marginBottom: "clamp(2rem, 4vw, 3rem)",
            }}
          >
            {departments.map((dept) => (
              <button
                key={dept}
                onClick={() => setActiveFilter(dept)}
                style={{
                  background: activeFilter === dept ? "var(--color-primary)" : "transparent",
                  color: activeFilter === dept ? "var(--color-on-primary)" : `color-mix(in oklch, var(--color-neutral) 60%, transparent)`,
                  border: `1px solid ${activeFilter === dept ? "var(--color-primary)" : "color-mix(in oklch, var(--color-neutral) 20%, transparent)"}`,
                  padding: "0.4rem 1.1rem",
                  fontSize: "0.72rem",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  fontFamily: "var(--font-sans)",
                  cursor: "pointer",
                  transition: "all 0.2s",
                  borderRadius: "var(--radius-sm)",
                }}
              >
                {dept}
              </button>
            ))}
          </div>
        )}

        {/* Doctor cards grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "clamp(1rem, 2vw, 1.5rem)",
          }}
        >
          {filtered.map((doctor, i) => (
            <motion.div
              key={doctor.name}
              initial={{ opacity: 0, filter: "blur(12px)", y: 16 }}
              whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut", delay: i * 0.06 }}
              className="doctor-card-editorial"
              style={{
                background: "var(--color-surface)",
                border: `1px solid color-mix(in oklch, var(--color-neutral) 10%, transparent)`,
                overflow: "hidden",
                borderRadius: "var(--radius-md)",
              }}
            >
              {/* Image — aspect-[4/3], object-top */}
              <div
                style={{
                  position: "relative",
                  aspectRatio: "4/3",
                  overflow: "hidden",
                  background: `color-mix(in oklch, var(--color-primary) 12%, var(--color-surface))`,
                }}
              >
                {doctor.image ? (
                  <img
                    src={doctor.image}
                    alt={doctor.name}
                    loading="lazy"
                    className="doctor-card-image"
                    style={{
                      position: "absolute",
                      inset: 0,
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      objectPosition: "top",
                      transition: "transform 0.4s ease",
                    }}
                    onError={(e) => {
                      const img = e.target as HTMLImageElement;
                      img.style.display = "none";
                      const fallback = img.nextElementSibling as HTMLElement;
                      if (fallback) fallback.style.display = "flex";
                    }}
                  />
                ) : null}
                {/* Initials fallback */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    display: doctor.image ? "none" : "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: `color-mix(in oklch, var(--color-primary) 15%, var(--color-surface))`,
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "2.5rem",
                      color: "var(--color-primary)",
                      fontWeight: 600,
                      letterSpacing: "0.02em",
                    }}
                  >
                    {getInitials(doctor.name)}
                  </span>
                </div>
              </div>

              {/* Card body */}
              <div style={{ padding: "1.25rem 1.25rem 1.5rem" }}>
                {doctor.department && (
                  <span
                    style={{
                      display: "inline-block",
                      fontFamily: "var(--font-sans)",
                      fontSize: "0.65rem",
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      color: "var(--color-primary)",
                      marginBottom: "0.5rem",
                    }}
                  >
                    {doctor.department}
                  </span>
                )}
                <p
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "1.0625rem",
                    color: "var(--color-neutral)",
                    lineHeight: 1.3,
                    marginBottom: "0.25rem",
                  }}
                >
                  {doctor.name}
                </p>
                <p
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "0.8125rem",
                    color: "var(--color-primary)",
                    marginBottom: doctor.qualification || doctor.bio ? "0.75rem" : 0,
                  }}
                >
                  {doctor.specialization}
                </p>
                {doctor.qualification && (
                  <p
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: "0.75rem",
                      color: `color-mix(in oklch, var(--color-neutral) 50%, transparent)`,
                      marginBottom: doctor.bio ? "0.5rem" : 0,
                    }}
                  >
                    {doctor.qualification}
                  </p>
                )}
                {doctor.bio && (
                  <p
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: "0.8125rem",
                      lineHeight: 1.6,
                      color: `color-mix(in oklch, var(--color-neutral) 55%, transparent)`,
                      overflow: "hidden",
                      display: "-webkit-box",
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: "vertical",
                    }}
                  >
                    {doctor.bio}
                  </p>
                )}
                {doctor.cta && (
                  <a
                    href={doctor.cta.url}
                    style={{
                      display: "block",
                      marginTop: "1rem",
                      textAlign: "center",
                      background: "var(--color-primary)",
                      color: "var(--color-on-primary)",
                      padding: "0.6rem 1rem",
                      fontSize: "0.75rem",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      textDecoration: "none",
                      fontFamily: "var(--font-sans)",
                      borderRadius: "var(--radius-sm)",
                      transition: "opacity 0.2s",
                    }}
                    onMouseEnter={(e) => ((e.target as HTMLAnchorElement).style.opacity = "0.88")}
                    onMouseLeave={(e) => ((e.target as HTMLAnchorElement).style.opacity = "1")}
                  >
                    {doctor.cta.text}
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        .doctor-card-editorial:hover .doctor-card-image { transform: scale(1.05); }
      `}</style>
    </section>
  );
}
