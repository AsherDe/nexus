import { formatDistanceToNow } from "date-fns";
import Link from "next/link";
import { Suspense } from "react";
import CommitActivityChart from "@/components/CommitActivityChart";
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
      {/* Navigation at top */}
      <header className="mb-10">
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
        </div>

        {/* Main Column - Core Feed & Output */}
        <div className="dashboard-main">

                    <Suspense fallback={<ProjectsSkeleton />}>
            <SpotlightProjects />
          </Suspense>
          
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
                {posts.slice(0, 3).map((post) => (
                  <Link key={post.id} href={`/blog/${post.id}`}>
                    <div className="card cursor-pointer">
                      <h4 className="card-title">{post.title}</h4>
                      <div className="card-meta">
                        Published {formatDistanceToNow(new Date(post.date))} ago
                        •{post.readingTime} min read •
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


        </div>

        {/* Right Column - Insights & Philosophy */}
        <div className="dashboard-right">
          <InvestmentPortfolio />
        </div>
      </main>
    </div>
  );
}
