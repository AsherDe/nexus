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
        <div className="space-y-2">
          {activity.slice(0, 2).map((item) => (
            <div key={item.id} className="space-y-1">
              <div className="flex items-center justify-between">
                <button
                  type="button"
                  className="text-sm font-medium text-left cursor-pointer hover:text-color-text-highlight transition-colors truncate flex-1 min-w-0"
                  onClick={() => router.push("/projects")}
                >
                  {item.repo}
                </button>
                <div className="flex items-center gap-1 flex-shrink-0 ml-2">
                  <div
                    className={`w-1.5 h-1.5 rounded-full ${
                      item.type === "commit"
                        ? "bg-green-500"
                        : item.type === "create"
                          ? "bg-blue-500"
                          : "bg-gray-500"
                    }`}
                  ></div>
                  <span className="text-xs text-color-text-subdue">
                    {formatDistanceToNow(new Date(item.timestamp), { addSuffix: false })}
                  </span>
                </div>
              </div>
              <p className="text-xs text-color-text-paragraph line-clamp-2 leading-tight">
                {item.message}
              </p>
            </div>
          ))}
        </div>
      )}
    </Widget>
  );
}
