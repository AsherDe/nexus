"use client";

import { formatDistanceToNow } from "date-fns";
import { useRouter } from "next/navigation";
import type { RecentActivity } from "@/lib/github";
import { useCachedData } from "../hooks/useCachedData";
import { FeedSkeleton } from "./loading/WidgetSkeleton";
import Widget from "./Widget";

export default function GitHubFeed() {
  const router = useRouter();
  const {
    data: activity,
    loading,
    error,
  } = useCachedData<RecentActivity[]>({
    cacheKey: "github-activity",
    url: "/api/github/activity",
    cacheDurationMinutes: 5,
  });

  if (loading) {
    return <FeedSkeleton />;
  }

  if (error || !activity) {
    return (
      <Widget title="Live Github Feed">
        <p className="text-sm text-color-text-subdue">
          Failed to load activity.
        </p>
      </Widget>
    );
  }

  return (
    <Widget title="Live GitHub Feed">
      {activity.length === 0 ? (
        <p className="text-sm text-color-text-subdue">No recent activity</p>
      ) : (
        <div className="space-y-3">
          {activity.slice(0, 3).map((item) => (
            <div key={item.id} className="flex justify-between items-start">
              <div className="flex-1 min-w-0">
                <button
                  type="button"
                  className="card-title text-left cursor-pointer hover:text-color-text-highlight transition-colors truncate"
                  onClick={() => router.push("/projects")}
                >
                  {item.repo}
                </button>
                <p className="text-sm text-color-text-paragraph">
                  "{item.message}"
                </p>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0 ml-4">
                <div
                  className={`w-2 h-2 rounded-full ${
                    item.type === "commit"
                      ? "bg-green-500"
                      : item.type === "create"
                        ? "bg-blue-500"
                        : "bg-gray-500"
                  }`}
                ></div>
                <span className="text-xs text-color-text-subdue">
                  {formatDistanceToNow(new Date(item.timestamp))} ago
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </Widget>
  );
}
