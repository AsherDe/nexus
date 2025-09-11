"use client";

import { clsx } from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useScopedI18n } from "@/locales/client";

export default function Navigation() {
  const pathname = usePathname();
  const t = useScopedI18n("navigation");

  return (
    <nav className="nav animate-entrance">
      <Link href="/" className={clsx("nav-link", { active: pathname === "/" })}>
        {t("home")}
      </Link>
      <Link
        href="/blog"
        className={clsx("nav-link", { active: pathname.startsWith("/blog") })}
      >
        {t("blog")}
      </Link>
      <Link
        href="/projects"
        className={clsx("nav-link", { active: pathname === "/projects" })}
      >
        {t("projects")}
      </Link>
      <Link
        href="/about"
        className={clsx("nav-link", { active: pathname === "/about" })}
      >
        {t("about")}
      </Link>
    </nav>
  );
}
