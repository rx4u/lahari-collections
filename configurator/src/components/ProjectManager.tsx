'use client';

import { useState } from 'react';
import { useConfigStore, ConfigSnapshot } from '@/lib/config-store';

interface Project {
  id: string;
  name: string;
  createdAt: string;
  config: ConfigSnapshot;
}

const STORAGE_KEY = 'configurator-projects';

function loadProjects(): Project[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as Project[];
  } catch {
    return [];
  }
}

function saveProjects(projects: Project[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
  } catch {
    // localStorage unavailable — silently ignore
  }
}

export function ProjectManager() {
  const [projects, setProjects] = useState<Project[]>(() => loadProjects());

  const business = useConfigStore((s) => s.business);
  const hero = useConfigStore((s) => s.hero);
  const theme = useConfigStore((s) => s.theme);
  const sections = useConfigStore((s) => s.sections);
  const layout = useConfigStore((s) => s.layout);
  const animationTier = useConfigStore((s) => s.animationTier);
  const loadConfig = useConfigStore((s) => s.loadConfig);

  const handleSave = () => {
    const name = window.prompt('Project name:', business.name || 'My Project');
    if (!name) return;
    const project: Project = {
      id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
      name,
      createdAt: new Date().toISOString(),
      config: { business, hero, theme, sections, layout, animationTier },
    };
    const updated = [...projects, project];
    setProjects(updated);
    saveProjects(updated);
  };

  const handleLoad = (project: Project) => {
    loadConfig(project.config);
  };

  const handleDelete = (id: string) => {
    const updated = projects.filter((p) => p.id !== id);
    setProjects(updated);
    saveProjects(updated);
  };

  const formatDate = (iso: string) => {
    try {
      return new Date(iso).toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: '2-digit',
      });
    } catch {
      return iso.slice(0, 10);
    }
  };

  return (
    <div className="space-y-2">
      <button
        onClick={handleSave}
        className="w-full rounded-md border border-zinc-200 bg-zinc-50 px-3 py-1.5 text-[11px] font-medium text-zinc-700 hover:bg-zinc-100 transition-colors text-left"
      >
        + Save current project
      </button>

      {projects.length === 0 ? (
        <p className="text-[11px] text-zinc-400 py-1">No saved projects yet.</p>
      ) : (
        <ul className="space-y-1">
          {projects.map((p) => (
            <li
              key={p.id}
              className="flex items-center justify-between gap-2 rounded-md border border-zinc-100 bg-zinc-50 px-2.5 py-1.5"
            >
              <div className="min-w-0">
                <p className="truncate text-[11px] font-medium text-zinc-800">{p.name}</p>
                <p className="text-[10px] text-zinc-400">{formatDate(p.createdAt)}</p>
              </div>
              <div className="flex shrink-0 gap-1">
                <button
                  onClick={() => handleLoad(p)}
                  className="rounded px-2 py-0.5 text-[10px] font-medium text-blue-600 hover:bg-blue-50 transition-colors"
                >
                  Load
                </button>
                <button
                  onClick={() => handleDelete(p.id)}
                  className="rounded px-2 py-0.5 text-[10px] font-medium text-red-500 hover:bg-red-50 transition-colors"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
