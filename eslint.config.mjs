import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    files: ["src/components/sections/**/*.tsx", "src/components/layout/**/*.tsx"],
    rules: {
      "no-restricted-syntax": [
        "error",
        {
          selector: "JSXAttribute[name.name='style'] ObjectExpression > Property[key.name=/^(maxWidth|max-width)$/] > Literal[value=/^[0-9]+(\\.[0-9]+)?(px|rem|em|vw|vh)$/]",
          message: "Hardcoded maxWidth in a section/layout component ignores --container-max-w. Use page-container, or 'var(--container-max-w)', or 'min(<cap>, var(--container-max-w))'.",
        },
        {
          selector: "JSXAttribute[name.name='style'] ObjectExpression > Property[key.name='color'] > Literal[value=/var\\(--color-(neutral|surface)\\)/]",
          message: "--color-neutral and --color-surface are BACKGROUND tokens. Used as text color they paint invisible text. Use --color-primary, --color-secondary, or --color-on-primary for text.",
        },
        {
          selector: "JSXAttribute[name.name='style'] ObjectExpression > Property[key.name='color'] > TemplateLiteral[quasis.0.value.raw=/var\\(--color-(neutral|surface)\\)|color-mix\\([^)]*--color-(neutral|surface)/]",
          message: "--color-neutral / --color-surface are background tokens — even via color-mix(), do not use them as text color. Use --color-primary or --color-secondary.",
        },
        {
          selector: "JSXAttribute[name.name='className'] > Literal[value=/(^|[\\s:])(bg|text)-(white|black)(\\/\\d+)?(\\s|$)/]",
          message: "Hardcoded bg-white/black or text-white/black breaks the shadcn ↔ design.md bridge — these lightnesses don't invert under themes. Use bridge tokens instead: bg-card / bg-background / bg-muted for surfaces; text-foreground / text-muted-foreground / text-primary-foreground / text-card-foreground for text. See CLAUDE.md → Shadcn ↔ design.md bridge. Legit photo-overlay uses: add // eslint-disable-next-line with reason.",
        },
        {
          selector: "JSXAttribute[name.name='className'] > JSXExpressionContainer > Literal[value=/(^|[\\s:])(bg|text)-(white|black)(\\/\\d+)?(\\s|$)/]",
          message: "Hardcoded bg-white/black or text-white/black breaks the shadcn ↔ design.md bridge — these lightnesses don't invert under themes. Use bridge tokens instead: bg-card / bg-background / bg-muted for surfaces; text-foreground / text-muted-foreground / text-primary-foreground / text-card-foreground for text. See CLAUDE.md → Shadcn ↔ design.md bridge. Legit photo-overlay uses: add // eslint-disable-next-line with reason.",
        },
        {
          selector: "JSXAttribute[name.name='className'] TemplateElement[value.cooked=/(^|[\\s:])(bg|text)-(white|black)(\\/\\d+)?(\\s|$)/]",
          message: "Hardcoded bg-white/black or text-white/black breaks the shadcn ↔ design.md bridge — these lightnesses don't invert under themes. Use bridge tokens instead: bg-card / bg-background / bg-muted for surfaces; text-foreground / text-muted-foreground / text-primary-foreground / text-card-foreground for text. See CLAUDE.md → Shadcn ↔ design.md bridge. Legit photo-overlay uses: add // eslint-disable-next-line with reason.",
        },
      ],
    },
  },
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
