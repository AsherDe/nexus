import Widget from "../Widget";

export function WidgetSkeleton({
  title,
  rows = 3,
}: {
  title: string;
  rows?: number;
}) {
  return (
    <Widget title={title}>
      <div className="space-y-3">
        {Array.from({ length: rows }, (_, index) => (
          <div
            key={`skeleton-${title.replace(/\s+/g, "-").toLowerCase()}-${index}`}
            className="flex justify-between items-center"
          >
            <div className="h-4 bg-color-separator rounded animate-pulse w-2/3"></div>
            <div className="h-3 bg-color-separator rounded animate-pulse w-1/4"></div>
          </div>
        ))}
      </div>
    </Widget>
  );
}

export function FeedSkeleton() {
  return (
    <Widget title="Live GitHub Feed">
      <div className="space-y-3">
        {Array.from({ length: 3 }, (_, index) => (
          <div
            key={`feed-skeleton-${index}`}
            className="flex justify-between items-start"
          >
            <div className="flex-1 min-w-0 space-y-2">
              <div className="h-4 bg-color-separator rounded animate-pulse w-1/2"></div>
              <div className="h-3 bg-color-separator rounded animate-pulse w-3/4"></div>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0 ml-4">
              <div className="w-2 h-2 bg-color-separator rounded-full animate-pulse"></div>
              <div className="h-3 bg-color-separator rounded animate-pulse w-16"></div>
            </div>
          </div>
        ))}
      </div>
    </Widget>
  );
}

export function ChartSkeleton({ title }: { title: string }) {
  return (
    <Widget title={title}>
      <div className="h-32 bg-color-separator rounded animate-pulse"></div>
    </Widget>
  );
}

export function ProjectCardSkeleton() {
  return (
    <div className="card">
      <div className="aspect-video bg-color-separator rounded mb-3 animate-pulse"></div>
      <div className="space-y-2">
        <div className="h-4 bg-color-separator rounded animate-pulse w-3/4"></div>
        <div className="h-3 bg-color-separator rounded animate-pulse w-1/2"></div>
        <div className="h-3 bg-color-separator rounded animate-pulse w-full"></div>
        <div className="h-3 bg-color-separator rounded animate-pulse w-2/3"></div>
        <div className="flex gap-4 mt-3">
          <div className="h-3 bg-color-separator rounded animate-pulse w-12"></div>
          <div className="h-3 bg-color-separator rounded animate-pulse w-12"></div>
        </div>
      </div>
    </div>
  );
}

export function ProjectsSkeleton() {
  return (
    <Widget title="Spotlight Projects">
      <div className="space-y-4">
        <ProjectCardSkeleton />
        <ProjectCardSkeleton />
      </div>
    </Widget>
  );
}
