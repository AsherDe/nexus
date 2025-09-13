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
        <p className="text-meta text-muted">Failed to load activity.</p>
      </Widget>
    );
  }

  return (
    <Widget title="Live GitHub Feed">
      {activity.length === 0 ? (
        <p className="text-meta text-muted">No recent activity</p>
      ) : (
        <div className="space-y-micro">
          {activity.slice(0, 2).map((item) => (
            <div key={item.id} className="space-y-micro">
              <div className="flex items-center justify-between">
                <button
                  type="button"
                  className="card-title font-medium text-secondary text-left cursor-pointer hover:text-primary transition-colors truncate flex-1 min-w-0 leading-tight"
                  onClick={() => router.push("/projects")}
                >
                  {item.repo}
                </button>
                <div className="flex items-center gap-micro flex-shrink-0 ml-1">
                  <div
                    className="w-1 h-1 rounded-full"
                    style={{
                      backgroundColor: item.type === "commit"
                        ? "var(--color-positive)"
                        : item.type === "create"
                          ? "var(--color-primary)"
                          : "var(--color-text-muted)"
                    }}
                  ></div>
                  <span className="text-xxs text-muted">
                    {formatDistanceToNow(new Date(item.timestamp), {
                      addSuffix: false,
                    })}
                  </span>
                </div>
              </div>
              <p className="text-xxs text-body line-clamp-2 leading-tight">
                {item.message}
              </p>
            </div>
          ))}
        </div>
      )}
    </Widget>
  );
}
