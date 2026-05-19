"use client";

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

interface DoctorDirectoryListProps {
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

export default function DoctorDirectoryList({ content, eyebrow, subtitle }: DoctorDirectoryListProps) {
  const { headline, description, doctors } = content;

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

        <div className="max-w-4xl mx-auto divide-y divide-border">
          {doctors.map((doctor) => (
            <div key={doctor.name} className="flex items-center gap-4 py-4">
              {doctor.image ? (
                <img
                  src={doctor.image}
                  alt={doctor.name}
                  className="w-12 h-12 rounded-full object-cover shrink-0"
                onError={(e) => { (e.target as HTMLImageElement).style.visibility = "hidden"; }}
                />
              ) : (
                <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold shrink-0">
                  {getInitials(doctor.name)}
                </div>
              )}

              <div className="flex-1 min-w-0">
                <p className="font-semibold text-foreground font-[family-name:var(--font-display)]">
                  {doctor.name}
                </p>
                <p className="text-primary text-sm">{doctor.specialization}</p>
                <div className="flex flex-wrap gap-x-3 gap-y-0.5 mt-1">
                  {doctor.department && (
                    <span className="text-xs text-muted-foreground">{doctor.department}</span>
                  )}
                  {doctor.qualification && (
                    <span className="text-xs text-muted-foreground">{doctor.qualification}</span>
                  )}
                  {doctor.experience && (
                    <span className="text-xs text-muted-foreground">{doctor.experience}</span>
                  )}
                </div>
              </div>

              <div className="flex flex-col items-end gap-2 shrink-0">
                {doctor.availability && (
                  <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                    {doctor.availability}
                  </span>
                )}
                {doctor.cta && (
                  <a
                    href={doctor.cta.url}
                    className="text-xs font-medium text-primary hover:underline"
                  >
                    {doctor.cta.text}
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
