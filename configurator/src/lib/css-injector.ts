interface ThemeTokens {
  colors: {
    primary: string;
    secondary: string;
    tertiary: string;
    neutral: string;
    surface: string;
    onPrimary: string;
  };
  typography: {
    fontDisplay: string;
    fontBody: string;
  };
  radius: {
    sm: string;
    md: string;
    lg: string;
  };
}

const THEME_MAP: Record<string, ThemeTokens> = {
  'serene-clinic': {
    colors: {
      primary: 'oklch(0.45 0.1 170)',
      secondary: 'oklch(0.55 0.08 200)',
      tertiary: 'oklch(0.6 0.12 152)',
      neutral: 'oklch(0.98 0.005 240)',
      surface: 'oklch(1 0 0)',
      onPrimary: 'oklch(1 0 0)',
    },
    typography: { fontDisplay: 'DM Serif Display', fontBody: 'DM Sans' },
    radius: { sm: '4px', md: '8px', lg: '16px' },
  },
  'bold-restaurant': {
    colors: {
      primary: 'oklch(0.5 0.18 25)',
      secondary: 'oklch(0.4 0.05 60)',
      tertiary: 'oklch(0.65 0.15 55)',
      neutral: 'oklch(0.15 0.01 30)',
      surface: 'oklch(0.12 0.01 30)',
      onPrimary: 'oklch(1 0 0)',
    },
    typography: { fontDisplay: 'Playfair Display', fontBody: 'Inter' },
    radius: { sm: '2px', md: '4px', lg: '8px' },
  },
  'fresh-salon': {
    colors: {
      primary: 'oklch(0.65 0.2 330)',
      secondary: 'oklch(0.7 0.1 350)',
      tertiary: 'oklch(0.75 0.12 300)',
      neutral: 'oklch(0.97 0.005 330)',
      surface: 'oklch(1 0 0)',
      onPrimary: 'oklch(1 0 0)',
    },
    typography: { fontDisplay: 'Cormorant Garamond', fontBody: 'Nunito Sans' },
    radius: { sm: '6px', md: '12px', lg: '24px' },
  },
  'minimal-local': {
    colors: {
      primary: 'oklch(0.52 0.12 152)',
      secondary: 'oklch(0.45 0.08 152)',
      tertiary: 'oklch(0.6 0.1 200)',
      neutral: 'oklch(0.96 0.003 240)',
      surface: 'oklch(1 0 0)',
      onPrimary: 'oklch(1 0 0)',
    },
    typography: { fontDisplay: 'DM Serif Display', fontBody: 'DM Sans' },
    radius: { sm: '4px', md: '8px', lg: '12px' },
  },
};

export function generateCSSFromTheme(designMdId: string): Record<string, string> {
  const tokens = THEME_MAP[designMdId];
  if (!tokens) return {};

  return {
    '--color-primary': tokens.colors.primary,
    '--color-secondary': tokens.colors.secondary,
    '--color-tertiary': tokens.colors.tertiary,
    '--color-neutral': tokens.colors.neutral,
    '--color-surface': tokens.colors.surface,
    '--color-on-primary': tokens.colors.onPrimary,
    '--font-display': tokens.typography.fontDisplay,
    '--font-body': tokens.typography.fontBody,
    '--radius-sm': tokens.radius.sm,
    '--radius-md': tokens.radius.md,
    '--radius-lg': tokens.radius.lg,
  };
}

export function getAvailableThemes(): string[] {
  return Object.keys(THEME_MAP);
}
