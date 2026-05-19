"use client";

import { useState } from "react";
import { Search, icons } from "lucide-react";
import type { LucideProps } from "lucide-react";

type ConditionItem = {
  name: string;
  icon: string;
  description?: string;
  eyebrow?: string;
  subtitle?: string;
  category?: string;
};

type ConditionsTreatedSearchableListContent = {
  headline: string;
  description?: string;
  eyebrow?: string;
  subtitle?: string;
  items: ConditionItem[];
};

function DynamicIcon({ name, ...props }: { name: string } & LucideProps) {
  const Icon = (icons as Record<string, React.FC<LucideProps>>)[name];
  return Icon ? <Icon {...props} /> : null;
}

export default function ConditionsTreatedSearchableList({
  content,
  eyebrow,
  subtitle,
}: {
  content: ConditionsTreatedSearchableListContent;
  eyebrow?: string;
  subtitle?: string;
}) {
  const { headline, description, items } = content;
  const [searchTerm, setSearchTerm] = useState("");

  const filtered = searchTerm.trim()
    ? items.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : items;

  return (
    <section className="section-y">
      <div className="page-container">
        <div className="mb-6">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2 font-[family-name:var(--font-display)]">
            {headline}
          </h2>
          {description && (
            <p className="text-muted-foreground font-[family-name:var(--font-body)]">{description}</p>
          )}
        </div>

        {/* Search input */}
        <div className="relative max-w-sm mb-6">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
          <input
            type="text"
            placeholder="Search conditions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full border border-border rounded-[var(--radius-sm)] pl-9 pr-3 py-2 text-sm bg-transparent outline-none focus:ring-1 ring-primary text-foreground font-[family-name:var(--font-body)]"
          />
        </div>

        {/* Results */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {filtered.map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-2 border border-border rounded-[var(--radius-sm)] px-3 py-2.5 bg-card"
              >
                <DynamicIcon name={item.icon} size={16} className="text-primary shrink-0" />
                <span className="text-sm font-medium text-foreground font-[family-name:var(--font-body)]">
                  {item.name}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-sm font-[family-name:var(--font-body)]">
              No conditions found for &ldquo;{searchTerm}&rdquo;
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
