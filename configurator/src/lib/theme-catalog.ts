export interface ThemeMeta {
  id: string;
  name: string;
  category: string;
  tags: string[];
  colors: {
    primary: string;
    secondary: string;
    tertiary: string;
    neutral: string;
  };
  fonts: {
    display: string;
    body: string;
  };
  tokens: Record<string, string>;
}

export const THEME_CATALOG: ThemeMeta[] = [
  {
    id: 'serene-clinic',
    name: 'Serene Clinic',
    category: 'Healthcare',
    tags: ['Minimal', 'Clean', 'Professional', 'Light'],
    colors: {
      primary: 'oklch(0.45 0.1 170)',
      secondary: 'oklch(0.55 0.08 200)',
      tertiary: 'oklch(0.6 0.12 152)',
      neutral: 'oklch(0.98 0.005 240)',
    },
    fonts: { display: 'DM Serif Display', body: 'DM Sans' },
    tokens: {
      '--color-primary': 'oklch(0.45 0.1 170)',
      '--color-secondary': 'oklch(0.55 0.08 200)',
      '--color-tertiary': 'oklch(0.6 0.12 152)',
      '--color-neutral': 'oklch(0.98 0.005 240)',
      '--color-surface': 'oklch(1 0 0)',
      '--color-on-primary': 'oklch(1 0 0)',
      '--font-display': 'DM Serif Display',
      '--font-body': 'DM Sans',
      '--radius-sm': '4px',
      '--radius-md': '8px',
      '--radius-lg': '16px',
    },
  },
  {
    id: 'bold-restaurant',
    name: 'Bold Restaurant',
    category: 'Food',
    tags: ['Bold', 'Dark', 'Warm', 'Dramatic'],
    colors: {
      primary: 'oklch(0.5 0.18 25)',
      secondary: 'oklch(0.4 0.05 60)',
      tertiary: 'oklch(0.65 0.15 55)',
      neutral: 'oklch(0.15 0.01 30)',
    },
    fonts: { display: 'Playfair Display', body: 'Inter' },
    tokens: {
      '--color-primary': 'oklch(0.5 0.18 25)',
      '--color-secondary': 'oklch(0.4 0.05 60)',
      '--color-tertiary': 'oklch(0.65 0.15 55)',
      '--color-neutral': 'oklch(0.15 0.01 30)',
      '--color-surface': 'oklch(0.12 0.01 30)',
      '--color-on-primary': 'oklch(1 0 0)',
      '--font-display': 'Playfair Display',
      '--font-body': 'Inter',
      '--radius-sm': '2px',
      '--radius-md': '4px',
      '--radius-lg': '8px',
    },
  },
  {
    id: 'fresh-salon',
    name: 'Fresh Salon',
    category: 'Beauty',
    tags: ['Feminine', 'Soft', 'Modern', 'Light'],
    colors: {
      primary: 'oklch(0.65 0.2 330)',
      secondary: 'oklch(0.7 0.1 350)',
      tertiary: 'oklch(0.75 0.12 300)',
      neutral: 'oklch(0.97 0.005 330)',
    },
    fonts: { display: 'Cormorant Garamond', body: 'Nunito Sans' },
    tokens: {
      '--color-primary': 'oklch(0.65 0.2 330)',
      '--color-secondary': 'oklch(0.7 0.1 350)',
      '--color-tertiary': 'oklch(0.75 0.12 300)',
      '--color-neutral': 'oklch(0.97 0.005 330)',
      '--color-surface': 'oklch(1 0 0)',
      '--color-on-primary': 'oklch(1 0 0)',
      '--font-display': 'Cormorant Garamond',
      '--font-body': 'Nunito Sans',
      '--radius-sm': '6px',
      '--radius-md': '12px',
      '--radius-lg': '24px',
    },
  },
  {
    id: 'minimal-local',
    name: 'Minimal Local',
    category: 'Local',
    tags: ['Minimal', 'Clean', 'Green', 'Light'],
    colors: {
      primary: 'oklch(0.52 0.12 152)',
      secondary: 'oklch(0.45 0.08 152)',
      tertiary: 'oklch(0.6 0.1 200)',
      neutral: 'oklch(0.96 0.003 240)',
    },
    fonts: { display: 'DM Serif Display', body: 'DM Sans' },
    tokens: {
      '--color-primary': 'oklch(0.52 0.12 152)',
      '--color-secondary': 'oklch(0.45 0.08 152)',
      '--color-tertiary': 'oklch(0.6 0.1 200)',
      '--color-neutral': 'oklch(0.96 0.003 240)',
      '--color-surface': 'oklch(1 0 0)',
      '--color-on-primary': 'oklch(1 0 0)',
      '--font-display': 'DM Serif Display',
      '--font-body': 'DM Sans',
      '--radius-sm': '4px',
      '--radius-md': '8px',
      '--radius-lg': '12px',
    },
  },
  {
    id: 'luxury-hotel',
    name: 'Luxury Hotel',
    category: 'Hospitality',
    tags: ['Luxury', 'Gold', 'Dark', 'Elegant'],
    colors: {
      primary: 'oklch(0.75 0.1 80)',
      secondary: 'oklch(0.65 0.08 70)',
      tertiary: 'oklch(0.8 0.12 85)',
      neutral: 'oklch(0.12 0.01 50)',
    },
    fonts: { display: 'Cormorant Garamond', body: 'Jost' },
    tokens: {
      '--color-primary': 'oklch(0.75 0.1 80)',
      '--color-secondary': 'oklch(0.65 0.08 70)',
      '--color-tertiary': 'oklch(0.8 0.12 85)',
      '--color-neutral': 'oklch(0.12 0.01 50)',
      '--color-surface': 'oklch(0.1 0.01 50)',
      '--color-on-primary': 'oklch(0.1 0.01 50)',
      '--font-display': 'Cormorant Garamond',
      '--font-body': 'Jost',
      '--radius-sm': '2px',
      '--radius-md': '4px',
      '--radius-lg': '6px',
    },
  },
  {
    id: 'active-gym',
    name: 'Active Gym',
    category: 'Fitness',
    tags: ['Bold', 'Dark', 'Energy', 'Modern'],
    colors: {
      primary: 'oklch(0.6 0.25 145)',
      secondary: 'oklch(0.5 0.2 145)',
      tertiary: 'oklch(0.7 0.22 170)',
      neutral: 'oklch(0.1 0.005 240)',
    },
    fonts: { display: 'Oswald', body: 'Inter' },
    tokens: {
      '--color-primary': 'oklch(0.6 0.25 145)',
      '--color-secondary': 'oklch(0.5 0.2 145)',
      '--color-tertiary': 'oklch(0.7 0.22 170)',
      '--color-neutral': 'oklch(0.1 0.005 240)',
      '--color-surface': 'oklch(0.08 0.005 240)',
      '--color-on-primary': 'oklch(0.05 0 0)',
      '--font-display': 'Oswald',
      '--font-body': 'Inter',
      '--radius-sm': '2px',
      '--radius-md': '6px',
      '--radius-lg': '10px',
    },
  },
  {
    id: 'warm-bakery',
    name: 'Warm Bakery',
    category: 'Food',
    tags: ['Warm', 'Cozy', 'Light', 'Friendly'],
    colors: {
      primary: 'oklch(0.55 0.14 55)',
      secondary: 'oklch(0.65 0.1 65)',
      tertiary: 'oklch(0.7 0.12 70)',
      neutral: 'oklch(0.97 0.01 80)',
    },
    fonts: { display: 'Lora', body: 'Source Sans 3' },
    tokens: {
      '--color-primary': 'oklch(0.55 0.14 55)',
      '--color-secondary': 'oklch(0.65 0.1 65)',
      '--color-tertiary': 'oklch(0.7 0.12 70)',
      '--color-neutral': 'oklch(0.97 0.01 80)',
      '--color-surface': 'oklch(1 0 0)',
      '--color-on-primary': 'oklch(1 0 0)',
      '--font-display': 'Lora',
      '--font-body': 'Source Sans 3',
      '--radius-sm': '6px',
      '--radius-md': '12px',
      '--radius-lg': '20px',
    },
  },
  {
    id: 'modern-law',
    name: 'Modern Law',
    category: 'Legal',
    tags: ['Professional', 'Dark', 'Serious', 'Trust'],
    colors: {
      primary: 'oklch(0.35 0.05 260)',
      secondary: 'oklch(0.45 0.04 250)',
      tertiary: 'oklch(0.6 0.08 45)',
      neutral: 'oklch(0.14 0.01 260)',
    },
    fonts: { display: 'Libre Baskerville', body: 'Lato' },
    tokens: {
      '--color-primary': 'oklch(0.35 0.05 260)',
      '--color-secondary': 'oklch(0.45 0.04 250)',
      '--color-tertiary': 'oklch(0.6 0.08 45)',
      '--color-neutral': 'oklch(0.14 0.01 260)',
      '--color-surface': 'oklch(0.12 0.01 260)',
      '--color-on-primary': 'oklch(1 0 0)',
      '--font-display': 'Libre Baskerville',
      '--font-body': 'Lato',
      '--radius-sm': '2px',
      '--radius-md': '4px',
      '--radius-lg': '6px',
    },
  },
];

export const THEME_CATEGORIES = ['All', ...Array.from(new Set(THEME_CATALOG.map((t) => t.category)))];

export const ALL_TAGS = Array.from(new Set(THEME_CATALOG.flatMap((t) => t.tags)));

export function getThemeById(id: string): ThemeMeta | undefined {
  return THEME_CATALOG.find((t) => t.id === id);
}
