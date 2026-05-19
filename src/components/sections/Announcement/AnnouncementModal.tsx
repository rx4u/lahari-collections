'use client';

import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

interface ModalContent {
  title: string;
  body: string;
  image?: string;
  cta?: { text: string; url: string };
  sessionKey?: string;
}

interface Props {
  content: ModalContent;
  eyebrow?: string;
  subtitle?: string;
}

export default function AnnouncementModal({ content, eyebrow, subtitle }: Props) {
  const [open, setOpen] = useState(false);
  const { title, body, image, cta, sessionKey = 'announcement-dismissed' } = content;

  useEffect(() => {
    if (sessionStorage.getItem(sessionKey)) return;
    const timer = setTimeout(() => setOpen(true), 1000);
    return () => clearTimeout(timer);
  }, [sessionKey]);

  function close() {
    sessionStorage.setItem(sessionKey, '1');
    setOpen(false);
  }

  function handleCta() {
    close();
  }

  if (!open) return null;

  return (
    <div
      // eslint-disable-next-line no-restricted-syntax -- modal backdrop scrim (overlay)
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      onClick={(e) => { if (e.target === e.currentTarget) close(); }}
    >
      <div className="bg-card rounded-xl max-w-md w-full shadow-2xl relative overflow-hidden">
        <button
          onClick={close}
          className="absolute top-3 right-3 z-10 p-1.5 rounded-[var(--radius-md)] bg-card hover:bg-muted transition-colors text-muted-foreground"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>
        {image && (
          <img
            src={image}
            alt=""
            className="w-full h-40 object-cover rounded-t-xl"
          onError={(e) => { (e.target as HTMLImageElement).style.visibility = "hidden"; }}
          />
        )}
        <div className="p-6">
          <h2
            className="text-xl font-bold text-foreground mb-2 font-[family-name:var(--font-display)]"
          >
            {title}
          </h2>
          <p className="text-muted-foreground text-sm leading-relaxed">{body}</p>
          {cta && (
            <a
              href={cta.url}
              onClick={handleCta}
              className="inline-block mt-4 px-5 py-2.5 rounded-[var(--radius-md)] bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
            >
              {cta.text}
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
