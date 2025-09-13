"use client";

import { useEffect, useState } from "react";

interface TocItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  content: string;
}

export default function TableOfContents({ content }: TableOfContentsProps) {
  const [toc, setToc] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");

  // Extract headings from markdown content
  useEffect(() => {
    const headingRegex = /^#{2,6}\s+(.+)$/gm;
    const headings: TocItem[] = [];
    let match: RegExpExecArray | null;

    while ((match = headingRegex.exec(content)) !== null) {
      const level = match[0].indexOf(" ") - 1; // Count # characters
      const text = match[1].trim();
      const id = text
        .toLowerCase()
        .replace(/[^\w\s\u4e00-\u9fff]/g, "") // Keep Chinese characters
        .replace(/\s+/g, "-");

      headings.push({ id, text, level });
    }

    setToc(headings);
  }, [content]);

  // Track active heading based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const headingElements = toc
        .map((item) => document.getElementById(item.id))
        .filter(Boolean);

      const scrollPosition = window.scrollY + 100; // Offset for better UX

      for (let i = headingElements.length - 1; i >= 0; i--) {
        const element = headingElements[i];
        if (element && element.offsetTop <= scrollPosition) {
          setActiveId(toc[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener("scroll", handleScroll);
  }, [toc]);

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  if (toc.length === 0) return null;

  return (
    <nav className="sticky top-8 space-y-1">
      <h3 className="text-xs font-medium text-color-text-disabled uppercase tracking-wider mb-3">
        目录
      </h3>
      <ul className="space-y-1">
        {toc.map((item) => (
          <li key={item.id}>
            <button
              type="button"
              onClick={() => scrollToHeading(item.id)}
              className={`
                block w-full text-left text-xs py-1 px-2 rounded transition-colors
                ${item.level === 2 ? "pl-2" : item.level === 3 ? "pl-4" : "pl-6"}
                ${
                  activeId === item.id
                    ? "text-color-text-primary bg-color-separator"
                    : "text-color-text-meta hover:text-color-text-secondary hover:bg-color-separator/50"
                }
              `}
            >
              {item.text}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
