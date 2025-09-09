"use client";

import { clsx } from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="nav animate-entrance">
      <Link href="/" className={clsx("nav-link", { active: pathname === "/" })}>
        Dashboard
      </Link>
      <Link
        href="/blog"
        className={clsx("nav-link", { active: pathname.startsWith("/blog") })}
      >
        Blog
      </Link>
      <Link
        href="/projects"
        className={clsx("nav-link", { active: pathname === "/projects" })}
      >
        Projects
      </Link>
    </nav>
  );
}
