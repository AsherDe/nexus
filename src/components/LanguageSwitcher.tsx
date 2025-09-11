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
              ? "bg-gray-700 text-white"
              : "text-gray-500 hover:text-gray-300"
          }`}
        >
          {loc.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
