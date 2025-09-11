import { formatDistanceToNow } from "date-fns";
import Link from "next/link";
import { Suspense } from "react";
import CommitActivityChart from "@/components/CommitActivityChart";
import CurrentFocus from "@/components/CurrentFocus";
import GermanChallenge from "@/components/GermanChallenge";
import GitHubFeed from "@/components/GitHubFeed";
import InvestmentPortfolio from "@/components/InvestmentPortfolio";
import {
  ChartSkeleton,
  FeedSkeleton,
  ProjectsSkeleton,
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
      {/* Navigation at top - tighter spacing */}
      <header className="mb-6">
        <Navigation />
      </header>

      {/* 3-Column Dashboard Layout */}
      <main className="dashboard-grid">
        {/* Left Column - Status Overview */}
        <div className="dashboard-left">
          <Suspense fallback={<FeedSkeleton />}>
            <GitHubFeed />
          </Suspense>

          <Suspense fallback={<ChartSkeleton title="Commit Activity" />}>
            <CommitActivityChart />
          </Suspense>

          <Suspense fallback={<ChartSkeleton title="Tech Stack" />}>
            <TechStackChart />
          </Suspense>

          {/* Investment Portfolio moves here on narrow screens */}
          <div className="widget-narrow-reflow investment-widget">
            <InvestmentPortfolio />
          </div>
        </div>

        {/* Main Column - Core Feed & Output */}
        <div className="dashboard-main">
          <CurrentFocus />
          <GermanChallenge />
          <Suspense fallback={<ProjectsSkeleton />}>
            <SpotlightProjects />
          </Suspense>

          {/* Featured Articles moves here on narrow screens */}
          <div className="widget-narrow-reflow articles-widget">
            <Widget title="Featured Articles">
              {posts.length === 0 ? (
                <div className="text-center py-4">
                  <p className="text-meta text-muted mb-1">No blog posts yet</p>
                  <p className="text-xxs text-disabled">
                    Add markdown files to <code>src/posts/</code> to get started
                  </p>
                </div>
              ) : (
                <div className="space-y-content">
                  {posts.slice(0, 2).map((post) => (
                    <Link key={post.id} href={`/blog/${post.id}`}>
                      <div className="card-color-only cursor-pointer">
                        <h4 className="card-title text-secondary font-medium leading-tight">
                          {post.title}
                        </h4>
                        <div className="card-meta text-xxs text-meta">
                          {formatDistanceToNow(new Date(post.date))} ago •{" "}
                          {post.readingTime}m
                        </div>
                        {post.excerpt && (
                          <p className="text-xs text-body leading-normal line-clamp-2">
                            {post.excerpt}
                          </p>
                        )}
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </Widget>
          </div>
        </div>

        {/* Right Column - Insights & Philosophy */}
        <div className="dashboard-right">
          <div className="widget-wide-only investment-widget">
            <InvestmentPortfolio />
          </div>
          <div className="widget-wide-only articles-widget">
            <Widget title="Featured Articles">
              {posts.length === 0 ? (
                <div className="text-center py-4">
                  <p className="text-meta text-muted mb-1">No blog posts yet</p>
                  <p className="text-xxs text-disabled">
                    Add markdown files to <code>src/posts/</code> to get started
                  </p>
                </div>
              ) : (
                <div className="space-y-content">
                  {posts.slice(0, 2).map((post) => (
                    <Link key={post.id} href={`/blog/${post.id}`}>
                      <div className="card-color-only cursor-pointer">
                        <h4 className="card-title text-secondary font-medium leading-tight">
                          {post.title}
                        </h4>
                        <div className="card-meta text-xxs text-meta">
                          {formatDistanceToNow(new Date(post.date))} ago •{" "}
                          {post.readingTime}m
                        </div>
                        {post.excerpt && (
                          <p className="text-xs text-body leading-normal line-clamp-2">
                            {post.excerpt}
                          </p>
                        )}
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </Widget>
          </div>
        </div>
      </main>
    </div>
  );
}
