"use client";

import { useCurrentLocale, useChangeLocale } from "@/locales/client";

const locales = ["en", "de"] as const;

export default function LanguageSwitcher() {
  const locale = useCurrentLocale();
  const changeLocale = useChangeLocale();

  return (
    <div className="language-switcher">
      {locales.map((loc) => (
        <button
          key={loc}
          type="button"
          onClick={() => changeLocale(loc)}
          className={`text-xs px-2 py-1 rounded transition-colors ${
            locale === loc
              ? "text-primary"
              : "text-meta hover:text-primary"
          }`}
          style={{
            backgroundColor: locale === loc ? "var(--color-separator)" : "transparent"
          }}
        >
          {loc.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
