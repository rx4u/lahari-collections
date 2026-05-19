import type { Metadata } from "next";
import { getConfig } from "@/lib/config";
import { parseDesignMd } from "@/lib/design-md-parser";
import { generateCSSVariables, cssVariablesToString } from "@/lib/theme-generator";
import { getLayoutCssVars, getMotionCssVars } from "@/lib/design-brief-loader";
import { loadFonts } from "@/lib/font-loader";
import { getLocale, isRTL } from "@/lib/i18n";
import CartProvider from "@/components/ecommerce/CartProvider";
import "./globals.css";

const config = getConfig();
const tokens = parseDesignMd();
const cssVars = {
  ...generateCSSVariables(tokens, config.theme.accentColor),
  ...getLayoutCssVars(),
  ...getMotionCssVars(),
};
const fonts = loadFonts(tokens);

/**
 * Detect dark theme from --color-neutral OKLCH lightness.
 * Documented in CLAUDE.md: "auto-detected from colors.neutral lightness.
 * If neutral is dark (OKLCH lightness < 0.3), site renders dark."
 */
function isDarkTheme(neutral: string): boolean {
  const match = neutral.match(/oklch\(\s*([0-9.]+)/i);
  if (!match) return false;
  const lightness = parseFloat(match[1]);
  return Number.isFinite(lightness) && lightness < 0.3;
}
const dark = isDarkTheme(tokens.colors.neutral);

export const metadata: Metadata = {
  title: config.seo.title,
  description: config.seo.description,
  keywords: config.seo.keywords,
  robots: { index: true, follow: true },
  openGraph: {
    title: config.seo.title,
    description: config.seo.description,
    type: "website",
    locale: config.seo.locale ?? "en_US",
    ...(config.seo.ogImage && { images: [config.seo.ogImage] }),
  },
};

function buildJsonLd() {
  const b = config.business;
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: b.name,
    description: b.description,
    telephone: b.phone,
    email: b.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: b.address,
      addressLocality: b.city,
      addressRegion: b.state,
      postalCode: b.pincode,
    },
    ...(b.mapUrl && { hasMap: b.mapUrl }),
    ...(b.logo && { logo: b.logo }),
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const styleString = cssVariablesToString(cssVars);

  return (
    <html
      lang={getLocale()}
      dir={isRTL(getLocale()) ? "rtl" : "ltr"}
      className={dark ? "dark" : undefined}
      style={{ ...cssStringToObject(styleString), colorScheme: dark ? "dark" : "light" }}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link href={fonts.googleFontsUrl} rel="stylesheet" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(buildJsonLd()) }}
        />
      </head>
      <body><CartProvider>{children}</CartProvider></body>
    </html>
  );
}

function cssStringToObject(css: string): React.CSSProperties {
  const obj: Record<string, string> = {};
  for (const line of css.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed) continue;
    const colonIndex = trimmed.indexOf(":");
    if (colonIndex === -1) continue;
    const key = trimmed.slice(0, colonIndex).trim();
    const value = trimmed.slice(colonIndex + 1).trim().replace(/;$/, "");
    obj[key] = value;
  }
  return obj as unknown as React.CSSProperties;
}
