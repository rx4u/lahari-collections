import { getConfig } from "./config";

const LOCALE_LABELS: Record<string, string> = {
  en: "English",
  hi: "Hindi",
  ta: "Tamil",
  te: "Telugu",
  kn: "Kannada",
  ml: "Malayalam",
  mr: "Marathi",
  bn: "Bengali",
  gu: "Gujarati",
  pa: "Punjabi",
  ar: "Arabic",
  he: "Hebrew",
  fa: "Persian",
  ur: "Urdu",
  fr: "French",
  de: "German",
  es: "Spanish",
  pt: "Portuguese",
  ja: "Japanese",
  zh: "Chinese",
  ko: "Korean",
};

const RTL_LOCALES = new Set(["ar", "he", "fa", "ur"]);

export function getLocale(): string {
  const config = getConfig();
  if (config.locale) return config.locale;
  const seoLocale = config.seo.locale;
  if (seoLocale) return seoLocale.split("_")[0];
  return "en";
}

export function getAvailableLocales(): string[] {
  const config = getConfig();
  if (config.locales && config.locales.length > 0) return config.locales;
  return [getLocale()];
}

export function resolveContent(
  content: string | Record<string, string>,
  locale: string
): string {
  if (typeof content === "string") return content;
  return content[locale] ?? content["en"] ?? Object.values(content)[0] ?? "";
}

export function isRTL(locale: string): boolean {
  return RTL_LOCALES.has(locale);
}

export function getLocaleLabel(locale: string): string {
  return LOCALE_LABELS[locale] ?? locale;
}
