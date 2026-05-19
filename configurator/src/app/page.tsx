'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { Undo2, Redo2 } from 'lucide-react';
import { useConfigStore } from '@/lib/config-store';
import { PreviewFrame } from '@/components/PreviewFrame';
import { DeployButton } from '@/components/DeployButton';
import { ProjectManager } from '@/components/ProjectManager';
import { Sidebar, TabId } from '@/components/Sidebar';
import { BusinessPanel } from '@/components/panels/BusinessPanel';
import { ThemePanel } from '@/components/panels/ThemePanel';
import { HeroPanel } from '@/components/panels/HeroPanel';
import { SectionsPanel } from '@/components/panels/SectionsPanel';

export default function ConfiguratorPage() {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [activeTab, setActiveTab] = useState<TabId | null>('theme');

  const business = useConfigStore((s) => s.business);
  const exportConfig = useConfigStore((s) => s.exportConfig);
  const undo = useConfigStore((s) => s.undo);
  const redo = useConfigStore((s) => s.redo);
  const canUndo = useConfigStore((s) => s.canUndo);
  const canRedo = useConfigStore((s) => s.canRedo);

  const postCSS = useCallback((variables: Record<string, string>) => {
    const iframe = iframeRef.current;
    if (iframe?.contentWindow) {
      iframe.contentWindow.postMessage({ type: 'CONFIGURATOR_CSS_OVERRIDE', variables }, '*');
    }
  }, []);

  const handleThemeChange = useCallback(
    (tokens: Record<string, string>) => postCSS(tokens),
    [postCSS]
  );

  const handleAccentChange = useCallback(
    (color: string | undefined) => {
      if (color) postCSS({ '--color-tertiary': color });
    },
    [postCSS]
  );

  const handleExport = () => {
    const config = exportConfig();
    const blob = new Blob([config], { type: 'text/typescript' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'site.config.ts';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleSaveProject = useCallback(() => {
    const name = window.prompt('Project name:', business.name || 'My Project');
    if (!name) return;
    const { business: b, hero, theme, sections, layout, animationTier } = useConfigStore.getState();
    const project = {
      id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
      name,
      createdAt: new Date().toISOString(),
      config: { business: b, hero, theme, sections, layout, animationTier },
    };
    try {
      const raw = localStorage.getItem('configurator-projects');
      const existing = raw ? (JSON.parse(raw) as typeof project[]) : [];
      localStorage.setItem('configurator-projects', JSON.stringify([...existing, project]));
      window.dispatchEvent(new StorageEvent('storage', { key: 'configurator-projects' }));
    } catch {
      // localStorage unavailable
    }
  }, [business.name]);

  // Hydrate store from preview's initial config on first PREVIEW_READY
  useEffect(() => {
    function handlePreviewReady(event: MessageEvent) {
      if (event.data?.type !== 'PREVIEW_READY') return;
      const config = event.data?.config;
      if (!config) return;
      // Only hydrate if store is still at default (no user changes yet)
      const current = useConfigStore.getState();
      if (current.sections.length > 0) return;
      useConfigStore.getState().loadConfig({
        business: config.business,
        hero: config.hero,
        sections: config.sections ?? [],
        layout: config.layout,
        animationTier: config.animationTier,
      });
    }
    window.addEventListener('message', handlePreviewReady);
    return () => window.removeEventListener('message', handlePreviewReady);
  }, []);

  // Subscribe to store changes → push CONFIG_UPDATE to preview
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    const unsubscribe = useConfigStore.subscribe((state) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        const iframe = iframeRef.current;
        if (!iframe?.contentWindow) return;
        const { business, hero, sections, layout, animationTier } = state;
        iframe.contentWindow.postMessage(
          {
            type: 'CONFIG_UPDATE',
            config: {
              business,
              hero,
              layout,
              animationTier,
              ...(sections.length > 0 ? { sections } : {}),
            },
          },
          '*'
        );
      }, 120);
    });

    return () => {
      unsubscribe();
      clearTimeout(timer);
    };
  }, [iframeRef]);

  // Keyboard shortcuts
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const mod = e.metaKey || e.ctrlKey;
      if (!mod) return;

      if (e.key === 'z' && !e.shiftKey) {
        e.preventDefault();
        undo();
        return;
      }
      if (e.key === 'z' && e.shiftKey) {
        e.preventDefault();
        redo();
        return;
      }
      if (e.key === 's') {
        e.preventDefault();
        handleSaveProject();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [undo, redo, handleSaveProject]);

  const topActions = (
    <>
      <button
        onClick={undo}
        disabled={!canUndo}
        title="Undo (⌘Z)"
        className="w-8 h-8 flex items-center justify-center rounded text-zinc-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
      >
        <Undo2 size={14} />
      </button>
      <button
        onClick={redo}
        disabled={!canRedo}
        title="Redo (⌘⇧Z)"
        className="w-8 h-8 flex items-center justify-center rounded text-zinc-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
      >
        <Redo2 size={14} />
      </button>
    </>
  );

  function renderPanel() {
    switch (activeTab) {
      case 'business':
        return <BusinessPanel />;
      case 'theme':
        return <ThemePanel onThemeChange={handleThemeChange} onAccentChange={handleAccentChange} />;
      case 'hero':
        return <HeroPanel />;
      case 'sections':
        return <SectionsPanel />;
      case 'export':
        return (
          <div className="p-4 space-y-3">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400">Deploy & Export</p>
            <DeployButton />
            <button
              onClick={handleExport}
              className="w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-xs font-medium text-zinc-700 hover:bg-zinc-50 transition-colors text-left"
            >
              Export site.config.ts
            </button>
            <div className="pt-2 border-t border-zinc-100">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400 mb-2">Projects</p>
              <ProjectManager />
            </div>
          </div>
        );
      default:
        return null;
    }
  }

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-zinc-100">
      <Sidebar activeTab={activeTab} onTabChange={(tab) => setActiveTab(tab as TabId | null)} topActions={topActions}>
        {renderPanel()}
      </Sidebar>

      <main className="flex-1 overflow-hidden">
        <PreviewFrame ref={iframeRef} />
      </main>
    </div>
  );
}
