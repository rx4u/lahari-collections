'use client';

import { useState } from 'react';
import { useConfigStore } from '@/lib/config-store';

export function DeployButton() {
  const exportConfig = useConfigStore((s) => s.exportConfig);
  const [open, setOpen] = useState(false);
  const [configText, setConfigText] = useState('');
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    setLoading(true);
    // Small tick so the spinner is visible
    setTimeout(() => {
      const text = exportConfig();
      setConfigText(text);
      setCopied(false);
      setOpen(true);
      setLoading(false);
    }, 80);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(configText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
      const el = document.createElement('textarea');
      el.value = configText;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownload = () => {
    const blob = new Blob([configText], { type: 'text/typescript' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'site.config.ts';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <button
        onClick={handleClick}
        disabled={loading}
        className="flex items-center gap-1.5 rounded-md bg-emerald-600 px-3 py-1.5 text-[11px] font-medium text-white hover:bg-emerald-700 transition-colors disabled:opacity-60"
      >
        {loading && (
          <span
            className="inline-block h-3 w-3 rounded-full border-2 border-white border-t-transparent"
            style={{ animation: 'spin 0.7s linear infinite' }}
          />
        )}
        Deploy to Vercel
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          onClick={(e) => { if (e.target === e.currentTarget) setOpen(false); }}
        >
          <div className="flex w-[560px] max-w-[95vw] flex-col gap-4 rounded-xl bg-white p-6 shadow-2xl">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold text-zinc-800">Deploy to Vercel</h2>
              <button
                onClick={() => setOpen(false)}
                className="text-zinc-400 hover:text-zinc-700 transition-colors text-lg leading-none"
              >
                ×
              </button>
            </div>

            <div className="rounded-lg bg-zinc-50 border border-zinc-200 overflow-auto" style={{ maxHeight: 300 }}>
              <pre className="p-4 text-[11px] leading-relaxed text-zinc-700 whitespace-pre font-mono">
                {configText}
              </pre>
            </div>

            <div className="flex gap-2">
              <button
                onClick={handleCopy}
                className="flex-1 rounded-md border border-zinc-200 bg-white px-3 py-2 text-xs font-medium text-zinc-700 hover:bg-zinc-50 transition-colors"
              >
                {copied ? 'Copied!' : 'Copy to clipboard'}
              </button>
              <button
                onClick={handleDownload}
                className="flex-1 rounded-md border border-zinc-200 bg-white px-3 py-2 text-xs font-medium text-zinc-700 hover:bg-zinc-50 transition-colors"
              >
                Download site.config.ts
              </button>
            </div>

            <div className="rounded-lg bg-zinc-900 px-4 py-3 text-[11px] text-zinc-300 leading-relaxed">
              <p className="font-semibold text-white mb-1">Next steps</p>
              <p>Copy this config to your template-hub&apos;s <code className="text-emerald-400">site.config.ts</code>, then run:</p>
              <code className="mt-1 block text-emerald-400 font-mono">vercel --prod</code>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </>
  );
}
