import { formatDistanceToNow } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import CommitChart from "@/components/CommitChart";
import LanguageChart from "@/components/LanguageChart";
import Navigation from "@/components/Navigation";
import TechIcon from "@/components/TechIcon";
import Widget from "@/components/Widget";
import { getAllPosts } from "@/lib/blog";
import {
  fetchCommitActivity,
  fetchGitHubActivity,
  fetchGitHubRepos,
  fetchLanguageStats,
} from "@/lib/github";

export default async function Home() {
  const [activity, projects, posts, languageStats, commitData] =
    await Promise.all([
      fetchGitHubActivity(),
      fetchGitHubRepos(),
      Promise.resolve(getAllPosts()),
      fetchLanguageStats(),
      fetchCommitActivity(),
    ]);
  return (
    <div className="page-container animate-entrance">
      <header>
        <div className="mb-8">
          <h1 className="text-2xl font-semibold mb-2">
            Nexus - A developer crafting tools and thoughts.
          </h1>
          <p className="text-base text-color-text-subdue">
            Welcome to my digital dashboard
          </p>
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
                  {
                    new Set(projects.map((p) => p.language).filter(Boolean))
                      .size
                  }
                </span>
              </div>
            </div>
          </Widget>

          <Widget title="Tech Stack">
            <LanguageChart languageStats={languageStats} />
          </Widget>
        </div>

        {/* Wide Column */}
        <div className="masonry-wide">
          <Widget title="Live GitHub Feed">
            {activity.length === 0 ? (
              <p className="text-sm text-color-text-subdue">
                No recent activity
              </p>
            ) : (
              <div className="space-y-3">
                {activity.slice(0, 3).map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between items-start"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-color-text-highlight truncate">
                        {item.repo}
                      </p>
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

          <Widget title="Commit Activity">
            <CommitChart commitData={commitData} />
          </Widget>

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

            <Widget title="Spotlight Projects">
              {projects.length === 0 ? (
                <p className="text-sm text-color-text-subdue text-center py-8">
                  No GitHub repositories found
                </p>
              ) : (
                <div className="space-y-4">
                  {projects
                    .filter((p) => p.featured)
                    .slice(0, 2)
                    .map((project) => (
                      <Link key={project.id} href="/projects">
                        <div className="card cursor-pointer overflow-hidden">
                          {/* Project Cover Image */}
                          <div className="aspect-video bg-color-separator rounded mb-3 flex items-center justify-center relative">
                            {project.coverImage ? (
                              <Image
                                src={project.coverImage}
                                alt={`${project.name} preview`}
                                className="w-full h-full object-cover"
                                fill
                                sizes="(max-width: 768px) 100vw, 33vw"
                              />
                            ) : (
                              <div className="text-center p-6">
                                <div className="w-12 h-12 bg-color-primary rounded-lg mx-auto mb-2 flex items-center justify-center">
                                  <span className="text-color-background font-mono text-lg">
                                    {project.name.charAt(0).toUpperCase()}
                                  </span>
                                </div>
                                <p className="text-xs text-color-text-subdue">
                                  Project Preview
                                </p>
                              </div>
                            )}
                          </div>

                          <h4 className="card-title">{project.name}</h4>
                          <div className="card-meta">
                            <div className="flex items-center gap-2 flex-wrap">
                              {project.technologies.slice(0, 3).map((tech) => (
                                <div
                                  key={tech}
                                  className="flex items-center gap-1"
                                >
                                  <TechIcon technology={tech} size="sm" />
                                  <span className="text-xs">{tech}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                          <p className="text-sm text-color-text-paragraph">
                            {project.description}
                          </p>
                          <div className="flex gap-4 mt-3 text-xs text-color-text-subdue">
                            <span>⭐ {project.stars}</span>
                            <span>🍴 {project.forks}</span>
                          </div>
                        </div>
                      </Link>
                    ))}
                  {projects.filter((p) => p.featured).length === 0 &&
                    projects.slice(0, 2).map((project) => (
                      <Link key={project.id} href="/projects">
                        <div className="card cursor-pointer overflow-hidden">
                          {/* Project Cover Image */}
                          <div className="aspect-video bg-color-separator rounded mb-3 flex items-center justify-center relative">
                            {project.coverImage ? (
                              <Image
                                src={project.coverImage}
                                alt={`${project.name} preview`}
                                className="w-full h-full object-cover"
                                fill
                                sizes="(max-width: 768px) 100vw, 50vw"
                              />
                            ) : (
                              <div className="text-center p-6">
                                <div className="w-12 h-12 bg-color-primary rounded-lg mx-auto mb-2 flex items-center justify-center">
                                  <span className="text-color-background font-mono text-lg">
                                    {project.name.charAt(0).toUpperCase()}
                                  </span>
                                </div>
                                <p className="text-xs text-color-text-subdue">
                                  Project Preview
                                </p>
                              </div>
                            )}
                          </div>

                          <h4 className="card-title">{project.name}</h4>
                          <div className="card-meta">
                            <div className="flex items-center gap-2 flex-wrap">
                              {project.technologies.slice(0, 3).map((tech) => (
                                <div
                                  key={tech}
                                  className="flex items-center gap-1"
                                >
                                  <TechIcon technology={tech} size="sm" />
                                  <span className="text-xs">{tech}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                          <p className="text-sm text-color-text-paragraph">
                            {project.description}
                          </p>
                          <div className="flex gap-4 mt-3 text-xs text-color-text-subdue">
                            <span>⭐ {project.stars}</span>
                            <span>🍴 {project.forks}</span>
                          </div>
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
