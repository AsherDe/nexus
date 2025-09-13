"use client";

import { useCachedData } from "@/hooks/useCachedData";
import type { LanguageStats } from "@/lib/github";
import LanguageChart from "./LanguageChart";
import { ChartSkeleton } from "./loading/WidgetSkeleton";
import Widget from "./Widget";

export default function TechStackChart() {
  const {
    data: languageStats,
    loading,
    error,
  } = useCachedData<LanguageStats>({
    cacheKey: "tech-stack",
    url: "/api/github/languages",
    cacheDurationMinutes: 60,
  });

  if (loading) {
    return <ChartSkeleton title="Tech Stack" />;
  }

  if (error || !languageStats) {
    return (
      <Widget title="Tech Stack">
        <p className="text-sm text-color-text-subdue">
          Failed to load language stats.
        </p>
      </Widget>
    );
  }

  return (
    <Widget title="Tech Stack">
      <LanguageChart languageStats={languageStats} />
    </Widget>
  );
}
