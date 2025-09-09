import { formatDistanceToNow } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import CommitActivityChart from "@/components/CommitActivityChart";
import GitHubFeed from "@/components/GitHubFeed";
import GitHubStats from "@/components/GitHubStats";
import {
  ChartSkeleton,
  FeedSkeleton,
  ProjectsSkeleton,
  WidgetSkeleton,
} from "@/components/loading/WidgetSkeleton";
import Navigation from "@/components/Navigation";
import SpotlightProjects from "@/components/SpotlightProjects";
import TechStackChart from "@/components/TechStackChart";
import Widget from "@/components/Widget";
import { getAllPosts } from "@/lib/blog";

export default async function Home() {
  const posts = getAllPosts();
  return (
    <div className="page-container animate-entrance">
      <header>
        <div className="mb-8 flex items-start gap-6">
          <Link href="/about" className="flex-shrink-0 group">
            <div className="relative">
              <Image
                src="/digital_me.png"
                alt="Ji Yude"
                width={120}
                height={120}
                className="rounded-lg shadow-sm transition-all duration-500 group-hover:animate-pulse"
                style={{
                  animation: 'none',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.animation = 'breathing 2s ease-in-out infinite';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.animation = 'none';
                }}
              />
            </div>
          </Link>
          <div className="flex-1">
            <h1 className="text-2xl font-semibold mb-2">
              Ji Yude
            </h1>
            <p className="text-base text-color-text-paragraph mb-3">
              A technologist exploring how we learn and build.
            </p>
            <p className="text-sm text-color-text-subdue">
              Welcome to my digital garden.
            </p>
          </div>
        </div>
        <Navigation />
      </header>

      <main className="page-columns">
        {/* Narrow Column */}
        <div className="masonry-narrow">
          <Widget title="System Status">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">Build Status</span>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <span className="text-xs text-color-text-subdue">
                    Passing
                  </span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Deployment</span>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <span className="text-xs text-color-text-subdue">Live</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Last Updated</span>
                <span className="text-xs text-color-text-subdue">
                  2 min ago
                </span>
              </div>
            </div>
          </Widget>

          <Suspense fallback={<WidgetSkeleton title="GitHub Stats" rows={3} />}>
            <GitHubStats />
          </Suspense>

          <Suspense fallback={<ChartSkeleton title="Tech Stack" />}>
            <TechStackChart />
          </Suspense>
        </div>

        {/* Wide Column */}
        <div className="masonry-wide">
          <Suspense fallback={<FeedSkeleton />}>
            <GitHubFeed />
          </Suspense>

          <Suspense fallback={<ChartSkeleton title="Commit Activity" />}>
            <CommitActivityChart />
          </Suspense>

          <div className="masonry-grid">
            <Widget title="Featured Articles">
              {posts.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-sm text-color-text-subdue mb-2">
                    No blog posts yet
                  </p>
                  <p className="text-xs text-color-text-subdue">
                    Add markdown files to <code>src/posts/</code> to get started
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {posts.slice(0, 2).map((post) => (
                    <Link key={post.id} href={`/blog/${post.id}`}>
                      <div className="card cursor-pointer">
                        <h4 className="card-title">{post.title}</h4>
                        <div className="card-meta">
                          Published {formatDistanceToNow(new Date(post.date))}{" "}
                          ago •{post.readingTime} min read •
                          {post.language?.toUpperCase()}
                        </div>
                        {post.excerpt && (
                          <p className="text-sm text-color-text-paragraph">
                            {post.excerpt}
                          </p>
                        )}
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </Widget>

            <Suspense fallback={<ProjectsSkeleton />}>
              <SpotlightProjects />
            </Suspense>
          </div>
        </div>
      </main>
    </div>
  );
}
