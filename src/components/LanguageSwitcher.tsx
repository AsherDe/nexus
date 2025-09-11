"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import { locales } from "@/i18n/request";

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const switchLocale = (newLocale: string) => {
    const currentPathWithoutLocale = pathname.replace(`/${locale}`, "");
    const newPath = `/${newLocale}${currentPathWithoutLocale}`;
    router.push(newPath);
  };

  return (
    <div className="language-switcher">
      {locales.map((loc) => (
        <button
          key={loc}
          type="button"
          onClick={() => switchLocale(loc)}
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
