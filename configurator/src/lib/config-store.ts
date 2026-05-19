import { create } from 'zustand';

interface BusinessConfig {
  type: string;
  name: string;
  tagline: string;
  description: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  logo?: string;
}

interface HeroConfig {
  style: string;
  headline: string;
  subheadline: string;
  cta?: { text: string; url: string };
}

interface SectionConfig {
  type: string;
  variant: string;
  content: Record<string, unknown>;
  page?: string;
}

interface ThemeConfig {
  designMd: string;
  mode: 'light' | 'dark';
  accentColor?: string;
}

export interface ConfigSnapshot {
  business: BusinessConfig;
  hero: HeroConfig;
  theme: ThemeConfig;
  sections: SectionConfig[];
  layout: { type: 'single-page' | 'multi-page'; pages?: string[] };
  animationTier: 'subtle' | 'standard' | 'premium';
}

interface ConfigState extends ConfigSnapshot {
  history: ConfigSnapshot[];
  historyIndex: number;
  canUndo: boolean;
  canRedo: boolean;

  setBusinessType: (type: string) => void;
  setBusiness: (business: Partial<BusinessConfig>) => void;
  setTheme: (theme: Partial<ThemeConfig>) => void;
  setHeroStyle: (style: string) => void;
  setHeroContent: (content: Partial<HeroConfig>) => void;
  setSections: (sections: SectionConfig[]) => void;
  addSection: (section: SectionConfig) => void;
  removeSection: (index: number) => void;
  updateSectionContent: (index: number, content: Record<string, unknown>) => void;
  updateSectionVariant: (index: number, variant: string) => void;
  reorderSections: (fromIndex: number, toIndex: number) => void;
  setAccentColor: (color: string | undefined) => void;
  undo: () => void;
  redo: () => void;
  loadConfig: (config: Partial<ConfigState>) => void;
  exportConfig: () => string;
}

const defaultBusiness: BusinessConfig = {
  type: 'doctor',
  name: 'My Business',
  tagline: 'Your trusted partner',
  description: 'A brief description of your business.',
  phone: '+91 98765 43210',
  email: 'hello@mybusiness.com',
  address: '123 Main Street',
  city: 'Chennai',
  state: 'Tamil Nadu',
  pincode: '600001',
};

const defaultHero: HeroConfig = {
  style: 'centered',
  headline: 'Welcome to Our Practice',
  subheadline: 'Providing quality care you can trust.',
  cta: { text: 'Book Appointment', url: '#contact' },
};

const defaultTheme: ThemeConfig = {
  designMd: 'serene-clinic',
  mode: 'light',
};

const MAX_HISTORY = 30;

function takeSnapshot(s: ConfigState): ConfigSnapshot {
  return {
    business: s.business,
    hero: s.hero,
    theme: s.theme,
    sections: s.sections,
    layout: s.layout,
    animationTier: s.animationTier,
  };
}

function pushHistory(
  s: ConfigState,
  patch: Partial<ConfigSnapshot>
): Partial<ConfigState> {
  const snapshot = takeSnapshot(s);
  // Truncate any redo branch
  const trimmed = s.history.slice(0, s.historyIndex + 1);
  const history = [...trimmed, snapshot].slice(-MAX_HISTORY);
  const historyIndex = history.length - 1;
  return {
    ...patch,
    history,
    historyIndex,
    canUndo: true,
    canRedo: false,
  };
}

export const useConfigStore = create<ConfigState>((set, get) => ({
  business: defaultBusiness,
  hero: defaultHero,
  theme: defaultTheme,
  sections: [],
  layout: { type: 'single-page' },
  animationTier: 'subtle',
  history: [],
  historyIndex: -1,
  canUndo: false,
  canRedo: false,

  setBusinessType: (type) =>
    set((s) => pushHistory(s, { business: { ...s.business, type } })),

  setBusiness: (business) =>
    set((s) => pushHistory(s, { business: { ...s.business, ...business } })),

  setTheme: (theme) =>
    set((s) => pushHistory(s, { theme: { ...s.theme, ...theme } })),

  setHeroStyle: (style) =>
    set((s) => pushHistory(s, { hero: { ...s.hero, style } })),

  setHeroContent: (content) =>
    set((s) => pushHistory(s, { hero: { ...s.hero, ...content } })),

  setSections: (sections) =>
    set((s) => pushHistory(s, { sections })),

  addSection: (section) =>
    set((s) => pushHistory(s, { sections: [...s.sections, section] })),

  removeSection: (index) =>
    set((s) =>
      pushHistory(s, { sections: s.sections.filter((_, i) => i !== index) })
    ),

  updateSectionContent: (index, content) =>
    set((s) =>
      pushHistory(s, {
        sections: s.sections.map((sec, i) =>
          i === index ? { ...sec, content: { ...sec.content, ...content } } : sec
        ),
      })
    ),

  updateSectionVariant: (index, variant) =>
    set((s) =>
      pushHistory(s, {
        sections: s.sections.map((sec, i) =>
          i === index ? { ...sec, variant } : sec
        ),
      })
    ),

  reorderSections: (fromIndex, toIndex) =>
    set((s) => {
      const sections = [...s.sections];
      const [moved] = sections.splice(fromIndex, 1);
      sections.splice(toIndex, 0, moved);
      return pushHistory(s, { sections });
    }),

  setAccentColor: (color) =>
    set((s) => pushHistory(s, { theme: { ...s.theme, accentColor: color } })),

  undo: () =>
    set((s) => {
      if (s.historyIndex < 0) return s;
      const snapshot = s.history[s.historyIndex];
      const historyIndex = s.historyIndex - 1;
      return {
        ...snapshot,
        history: s.history,
        historyIndex,
        canUndo: historyIndex >= 0,
        canRedo: true,
      };
    }),

  redo: () =>
    set((s) => {
      // redo means we push the current state back and restore the next snapshot
      // The "redo" state lives beyond historyIndex in the trimmed history.
      // Because pushHistory slices redo branches on new mutations, redo is only
      // possible when historyIndex < history.length - 1 (i.e. we have undo'd).
      if (s.historyIndex >= s.history.length - 1) return s;
      // We need to save current state into the slot we're about to vacate so
      // that another undo can return to it. Instead of storing it again, we
      // just advance the pointer and restore what was stored there.
      // history[historyIndex + 1] is the snapshot taken just before the action
      // that was undone, i.e. exactly the state we want to restore.
      const nextIndex = s.historyIndex + 1;
      const snapshot = s.history[nextIndex];
      return {
        ...snapshot,
        history: s.history,
        historyIndex: nextIndex,
        canUndo: true,
        canRedo: nextIndex < s.history.length - 1,
      };
    }),

  loadConfig: (config) => set((s) => ({ ...s, ...config })),

  exportConfig: () => {
    const { business, hero, theme, sections, layout, animationTier } = get();
    const config = {
      business,
      hero,
      theme: {
        designMd: theme.designMd,
        mode: theme.mode,
        ...(theme.accentColor ? { accentColor: theme.accentColor } : {}),
      },
      sections,
      layout,
      animationTier,
    };
    return `import type { SiteConfig } from './src/lib/types';\n\nconst config: SiteConfig = ${JSON.stringify(config, null, 2)};\n\nexport default config;\n`;
  },
}));
