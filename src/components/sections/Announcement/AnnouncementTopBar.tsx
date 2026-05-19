"use client";

import { useState } from "react";
import { X } from "lucide-react";

interface AnnouncementTopBarProps {
  content: {
    text: string;
    link?: { text: string; url: string };
    dismissible?: boolean;
  };
  eyebrow?: string;
  subtitle?: string;
}

export default function AnnouncementTopBar({ content, eyebrow, subtitle }: AnnouncementTopBarProps) {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <section
      id="announcement"
      style={{ background: "var(--color-primary)" }}
      className="text-[var(--color-on-primary)] text-sm py-2"
    >
      <div className="page-container flex items-center justify-center gap-2">
        <p className="text-center">
          {content.text}
          {content.link && (
            <>
              {" "}
              <a
                href={content.link.url}
                className="underline hover:no-underline font-medium"
              >
                {content.link.text}
              </a>
            </>
          )}
        </p>
        {content.dismissible && (
          <button
            onClick={() => setVisible(false)}
            className="ml-auto shrink-0 opacity-80 hover:opacity-100 transition-opacity"
            aria-label="Dismiss announcement"
          >
            <X size={16} />
          </button>
        )}
      </div>
    </section>
  );
}
