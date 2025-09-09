"use client";

import { useEffect, useState } from "react";
import type { LanguageStats } from "@/lib/github";
import LanguageChart from "./LanguageChart";
import { ChartSkeleton } from "./loading/WidgetSkeleton";
import Widget from "./Widget";

export default function TechStackChart() {
  const [languageStats, setLanguageStats] = useState<LanguageStats>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadLanguageStats() {
      try {
        const response = await fetch("/api/github/languages");
        if (response.ok) {
          const data = await response.json();
          setLanguageStats(data);
        }
      } catch (error) {
        console.error("Error loading language stats:", error);
      } finally {
        setLoading(false);
      }
    }

    loadLanguageStats();
  }, []);

  if (loading) {
    return <ChartSkeleton title="Tech Stack" />;
  }

  return (
    <Widget title="Tech Stack">
      <LanguageChart languageStats={languageStats} />
    </Widget>
  );
}
