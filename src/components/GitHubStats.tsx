"use client";

import type { Project } from "@/lib/github";
import { useCachedData } from "@/hooks/useCachedData";
import { WidgetSkeleton } from "./loading/WidgetSkeleton";
import Widget from "./Widget";

export default function GitHubStats() {
  const {
    data: projects,
    loading,
    error,
  } = useCachedData<Project[]>({
    cacheKey: "github-repos",
    url: "/api/github/repos",
    cacheDurationMinutes: 5,
  });

  if (loading) {
    return <WidgetSkeleton title="GitHub Stats" rows={3} />;
  }

  if (error) {
    return (
      <Widget title="GitHub Stats">
        <div className="text-sm text-color-text-muted">
          Failed to load GitHub stats
        </div>
      </Widget>
    );
  }

  const repositories = projects || [];

  return (
    <Widget title="GitHub Stats">
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-sm">Repositories</span>
          <span className="text-xs text-color-text-highlight font-medium">
            {repositories.length}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm">Total Stars</span>
          <span className="text-xs text-color-text-highlight font-medium">
            {repositories.reduce((acc, p) => acc + p.stars, 0)}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm">Languages</span>
          <span className="text-xs text-color-text-highlight font-medium">
            {new Set(repositories.map((p) => p.language).filter(Boolean)).size}
          </span>
        </div>
      </div>
    </Widget>
  );
}
