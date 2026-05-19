'use client';

import { forwardRef, useCallback, useEffect, useRef, useState } from 'react';
import { useConfigStore } from '@/lib/config-store';
import { getThemeById } from '@/lib/theme-catalog';

type Viewport = 'desktop' | 'tablet' | 'mobile';

const VIEWPORT_WIDTHS: Record<Viewport, number> = {
  desktop: 1280,
  tablet: 768,
  mobile: 375,
};

export const PreviewFrame = forwardRef<HTMLIFrameElement>((_, ref) => {
  const [viewport, setViewport] = useState<Viewport>('desktop');
  const internalRef = useRef<HTMLIFrameElement>(null);
  const iframeRef = (ref as React.RefObject<HTMLIFrameElement>) ?? internalRef;

  const designMdId = useConfigStore((s) => s.theme.designMd);
  const accentColor = useConfigStore((s) => s.theme.accentColor);

  const postCSSOverrides = useCallback(() => {
    const theme = getThemeById(designMdId);
    if (!theme) return;
    const variables: Record<string, string> = { ...theme.tokens };
    if (accentColor) variables['--color-tertiary'] = accentColor;

    if (iframeRef.current?.contentWindow && Object.keys(variables).length > 0) {
      iframeRef.current.contentWindow.postMessage(
        { type: 'CONFIGURATOR_CSS_OVERRIDE', variables },
        '*'
      );
    }
  }, [designMdId, accentColor, iframeRef]);

  useEffect(() => {
    postCSSOverrides();
  }, [postCSSOverrides]);

  // Listen for PREVIEW_READY handshake from the iframe
  useEffect(() => {
    const handler = (event: MessageEvent) => {
      if (event.data?.type === 'PREVIEW_READY') {
        postCSSOverrides();
      }
    };
    window.addEventListener('message', handler);
    return () => window.removeEventListener('message', handler);
  }, [postCSSOverrides]);

  const width = VIEWPORT_WIDTHS[viewport];

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center gap-2 border-b border-zinc-200 bg-white px-4 py-2">
        {(['desktop', 'tablet', 'mobile'] as Viewport[]).map((vp) => (
          <button
            key={vp}
            onClick={() => setViewport(vp)}
            className={`rounded px-3 py-1.5 text-xs font-medium capitalize transition-colors ${
              viewport === vp
                ? 'bg-zinc-900 text-white'
                : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
            }`}
          >
            {vp} ({VIEWPORT_WIDTHS[vp]}px)
          </button>
        ))}
        <div className="ml-auto flex items-center gap-2">
          <span className="text-[10px] text-zinc-400">Preview: localhost:3748/preview</span>
          <button
            onClick={() => {
              if (iframeRef.current) iframeRef.current.src = 'http://localhost:3748/preview';
            }}
            className="rounded px-2 py-1 text-[10px] text-zinc-500 hover:bg-zinc-100 transition-colors"
          >
            Reload
          </button>
        </div>
      </div>
      <div className="flex flex-1 items-start justify-center overflow-auto bg-zinc-100 p-6">
        <iframe
          ref={iframeRef}
          src="http://localhost:3748/preview"
          className="h-[calc(100vh-120px)] border border-zinc-200 bg-white shadow-lg transition-[width] duration-300 ease-in-out rounded-lg overflow-hidden"
          style={{ width: `${width}px` }}
          title="Site Preview"
        />
      </div>
    </div>
  );
});

PreviewFrame.displayName = 'PreviewFrame';
