"use client";

import { useEffect, useState } from "react";
import type { CommitData } from "@/lib/github";
import CommitChart from "./CommitChart";
import { ChartSkeleton } from "./loading/WidgetSkeleton";
import Widget from "./Widget";

export default function CommitActivityChart() {
  const [commitData, setCommitData] = useState<CommitData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCommitData() {
      try {
        const response = await fetch("/api/github/commits");
        if (response.ok) {
          const data = await response.json();
          setCommitData(data);
        }
      } catch (error) {
        console.error("Error loading commit data:", error);
      } finally {
        setLoading(false);
      }
    }

    loadCommitData();
  }, []);

  if (loading) {
    return <ChartSkeleton title="Commit Activity" />;
  }

  return (
    <Widget title="Commit Activity">
      <CommitChart commitData={commitData} />
    </Widget>
  );
}
