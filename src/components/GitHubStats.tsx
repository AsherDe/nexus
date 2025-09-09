"use client";

import { useEffect, useState } from "react";
import type { Project } from "@/lib/github";
import { WidgetSkeleton } from "./loading/WidgetSkeleton";
import Widget from "./Widget";

export default function GitHubStats() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadGitHubStats() {
      try {
        const response = await fetch("/api/github/repos");
        if (response.ok) {
          const data = await response.json();
          setProjects(data);
        }
      } catch (error) {
        console.error("Error loading GitHub stats:", error);
      } finally {
        setLoading(false);
      }
    }

    loadGitHubStats();
  }, []);

  if (loading) {
    return <WidgetSkeleton title="GitHub Stats" rows={3} />;
  }

  return (
    <Widget title="GitHub Stats">
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-sm">Repositories</span>
          <span className="text-xs text-color-text-highlight font-medium">
            {projects.length}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm">Total Stars</span>
          <span className="text-xs text-color-text-highlight font-medium">
            {projects.reduce((acc, p) => acc + p.stars, 0)}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm">Languages</span>
          <span className="text-xs text-color-text-highlight font-medium">
            {new Set(projects.map((p) => p.language).filter(Boolean)).size}
          </span>
        </div>
      </div>
    </Widget>
  );
}
