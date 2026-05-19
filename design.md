---
version: alpha
name: Desert Rose
description: Cinematic luxury meets artisan heritage. Burgundy on warm stone.
colors:
  primary: 'oklch(0.35 0.12 360)'
  secondary: '#8B7355'
  tertiary: '#6B1D3A'
  neutral: '#FAF7F5'
  surface: '#FFFFFF'
  on-primary: '#FAF7F5'
typography:
  display:
    fontFamily: Playfair Display
    fontSize: 4rem
    fontWeight: 500
    letterSpacing: '-0.02em'
  h1:
    fontFamily: Playfair Display
    fontSize: 2.5rem
    fontWeight: 500
  body:
    fontFamily: DM Sans
    fontSize: 1rem
    lineHeight: 1.6
  label:
    fontFamily: DM Sans
    fontSize: 0.75rem
    letterSpacing: 0.08em
rounded:
  sm: 2px
  md: 4px
  lg: 8px
spacing:
  sm: 8px
  md: 16px
  lg: 32px
components:
  button-primary:
    backgroundColor: '{colors.tertiary}'
    textColor: '{colors.on-primary}'
    rounded: '{rounded.md}'
    padding: 12px 24px
  card:
    backgroundColor: '{colors.surface}'
    textColor: '{colors.primary}'
    rounded: '{rounded.lg}'
    padding: 24px
---
## Overview

A cinematic editorial palette for luxury ethnic wear. Deep burgundy drives action against warm stone neutrals. Typography pairs a classic serif display with clean sans-serif body.

## Colors

- **Primary (`oklch(0.35 0.12 360)`):** Deep wine. Headlines and core text.
- **Secondary (`#8B7355`):** Warm bronze. Captions, borders, metadata.
- **Tertiary (`#6B1D3A`):** Burgundy accent. CTAs and interactive elements.
- **Neutral (`#FAF7F5`):** Warm stone. Page foundation.

## Typography

- **display:** Playfair Display 4rem
- **h1:** Playfair Display 2.5rem
- **body:** DM Sans 1rem
- **label:** DM Sans 0.75rem

## Do's and Don'ts

- **Do** use Tertiary (burgundy) for exactly one action per screen.
- **Do** let warm stone and generous whitespace carry the composition.
- **Don't** introduce cool tones. The palette is warm throughout.
- **Don't** use bold/heavy weights on display text. Playfair Display at medium weight is the look.
