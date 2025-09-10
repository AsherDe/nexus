"use client";

import { useEffect, useState } from "react";

type ThemeMode = "auto" | "light" | "dark";
type ResolvedTheme = "light" | "dark";

export default function ThemeToggle() {
  const [themeMode, setThemeMode] = useState<ThemeMode>("auto");
  const [resolvedTheme, setResolvedTheme] = useState<ResolvedTheme>("dark");

  const applyTheme = (mode: ThemeMode) => {
    let actualTheme: ResolvedTheme;

    if (mode === "auto") {
      actualTheme = window.matchMedia("(prefers-color-scheme: light)").matches
        ? "light"
        : "dark";
    } else {
      actualTheme = mode;
    }

    setResolvedTheme(actualTheme);
    document.documentElement.setAttribute("data-theme", actualTheme);
  };

  useEffect(() => {
    const savedMode = localStorage.getItem("theme-mode") as ThemeMode;
    const initialMode = savedMode || "auto";

    setThemeMode(initialMode);
    applyTheme(initialMode);

    // 监听系统主题变化
    const mediaQuery = window.matchMedia("(prefers-color-scheme: light)");
    const handleSystemThemeChange = () => {
      if (initialMode === "auto") {
        applyTheme("auto");
      }
    };

    mediaQuery.addEventListener("change", handleSystemThemeChange);
    return () =>
      mediaQuery.removeEventListener("change", handleSystemThemeChange);
  }, []);

  // 单独的effect监听themeMode变化
  useEffect(() => {
    if (themeMode === "auto") {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: light)");
      const handleSystemThemeChange = () => {
        applyTheme("auto");
      };

      mediaQuery.addEventListener("change", handleSystemThemeChange);
      return () =>
        mediaQuery.removeEventListener("change", handleSystemThemeChange);
    }
  }, [themeMode]);

  const cycleTheme = () => {
    const modes: ThemeMode[] = ["auto", "light", "dark"];
    const currentIndex = modes.indexOf(themeMode);
    const nextIndex = (currentIndex + 1) % modes.length;
    const newMode = modes[nextIndex];

    setThemeMode(newMode);
    localStorage.setItem("theme-mode", newMode);
    applyTheme(newMode);
  };

  const getIcon = () => {
    switch (themeMode) {
      case "auto":
        return "🌗"; // 自动模式图标
      case "light":
        return "☀️"; // 浅色模式图标
      case "dark":
        return "🌙"; // 深色模式图标
    }
  };

  const getLabel = () => {
    switch (themeMode) {
      case "auto":
        return `Auto (${resolvedTheme === "light" ? "Light" : "Dark"})`;
      case "light":
        return "Light";
      case "dark":
        return "Dark";
    }
  };

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={cycleTheme}
      aria-label={`Toggle theme: ${getLabel()}`}
      title={`Current: ${getLabel()}`}
    >
      {getIcon()}
    </button>
  );
}
