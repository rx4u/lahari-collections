import { parseDesignMd } from "@/lib/design-md-parser";
import { generateCSSVariables, cssVariablesToString } from "@/lib/theme-generator";
import { loadFonts } from "@/lib/font-loader";
import "../globals.css";

const tokens = parseDesignMd();
const cssVars = generateCSSVariables(tokens);
const fonts = loadFonts(tokens);

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

export default function PreviewLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const styleString = cssVariablesToString(cssVars);

  return (
    <html lang="en" style={cssStringToObject(styleString)}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link href={fonts.googleFontsUrl} rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  );
}
