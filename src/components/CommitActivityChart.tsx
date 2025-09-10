"use client";

import type { CommitData } from "@/lib/github";
import { useCachedData } from "@/hooks/useCachedData";
import CommitChart from "./CommitChart";
import { ChartSkeleton } from "./loading/WidgetSkeleton";
import Widget from "./Widget";

export default function CommitActivityChart() {
  const {
    data: commitData,
    loading,
    error,
  } = useCachedData<CommitData[]>({
    cacheKey: "commit-activity",
    url: "/api/github/commits",
    cacheDurationMinutes: 30,
  });

  if (loading) {
    return <ChartSkeleton title="Commit Activity" />;
  }

  if (error || !commitData) {
    return (
      <Widget title="Commit Activity">
        <p className="text-sm text-color-text-subdue">
          Failed to load commit data.
        </p>
      </Widget>
    );
  }

  return (
    <Widget title="Commit Activity">
      <CommitChart commitData={commitData} />
    </Widget>
  );
}
