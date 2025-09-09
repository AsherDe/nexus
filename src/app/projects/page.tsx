import { formatDistanceToNow } from "date-fns";
import { ExternalLink, Github } from "lucide-react";
import Image from "next/image";
import Navigation from "@/components/Navigation";
import Widget from "@/components/Widget";
import { fetchGitHubActivity, fetchGitHubRepos } from "@/lib/github";

export default async function ProjectsPage() {
  const [projects, activity] = await Promise.all([
    fetchGitHubRepos(),
    fetchGitHubActivity(),
  ]);

  const featuredProjects = projects.filter((p) => p.featured);
  const otherProjects = projects.filter((p) => !p.featured);

  return (
    <div className="page-container animate-entrance">
      <Navigation />
      <main className="space-y-8">
        {featuredProjects.length > 0 && (
          <section>
            <h2 className="text-lg font-semibold mb-4 text-color-text-highlight">
              Featured Projects
            </h2>
            <div className="dynamic-columns">
              {featuredProjects.map((project) => (
                <div key={project.id} className="card overflow-hidden">
                  {/* Project Cover Image */}
                  <div className="aspect-video bg-color-separator rounded mb-4 flex items-center justify-center relative">
                    {project.coverImage ? (
                      <Image
                        src={project.coverImage}
                        alt={`${project.name} preview`}
                        className="w-full h-full object-cover"
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    ) : (
                      <div className="text-center p-8">
                        <div className="w-16 h-16 bg-color-primary rounded-lg mx-auto mb-3 flex items-center justify-center">
                          <span className="text-color-background font-mono text-2xl">
                            {project.name.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <p className="text-sm text-color-text-subdue">
                          Project Preview
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="flex items-start justify-between mb-2">
                    <h3 className="card-title">{project.name}</h3>
                    {project.language && (
                      <span className="px-2 py-1 text-xs bg-color-separator rounded text-color-text-base">
                        {project.language}
                      </span>
                    )}
                  </div>

                  <div className="card-meta">
                    Updated {formatDistanceToNow(new Date(project.updatedAt))}{" "}
                    ago
                    {project.topics.length > 0 && (
                      <div className="flex gap-1 mt-2 flex-wrap">
                        {project.topics.slice(0, 3).map((topic) => (
                          <span
                            key={topic}
                            className="px-2 py-0.5 text-xs bg-color-widget-background border border-color-separator rounded text-color-text-subdue"
                          >
                            {topic}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <p className="text-sm text-color-text-paragraph mb-4 leading-relaxed">
                    {project.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex gap-4 text-xs text-color-text-subdue">
                      <span>⭐ {project.stars}</span>
                      <span>🍴 {project.forks}</span>
                    </div>

                    <div className="flex gap-2">
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn text-xs px-3 py-1.5 flex items-center gap-1"
                      >
                        <Github size={14} />
                        GitHub
                      </a>
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-primary text-xs px-3 py-1.5 flex items-center gap-1"
                        >
                          <ExternalLink size={14} />
                          Live Demo
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        <section>
          <h2 className="text-lg font-semibold mb-4 text-color-text-highlight">
            All Repositories ({projects.length})
          </h2>
          <div className="dynamic-columns">
            {otherProjects.map((project) => (
              <div key={project.id} className="card">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="card-title text-base">{project.name}</h3>
                  {project.language && (
                    <span className="px-2 py-1 text-xs bg-color-separator rounded text-color-text-base">
                      {project.language}
                    </span>
                  )}
                </div>

                <div className="card-meta">
                  Updated {formatDistanceToNow(new Date(project.updatedAt))} ago
                  {project.topics.length > 0 && (
                    <div className="flex gap-1 mt-2 flex-wrap">
                      {project.topics.slice(0, 3).map((topic) => (
                        <span
                          key={topic}
                          className="px-2 py-0.5 text-xs bg-color-widget-background border border-color-separator rounded text-color-text-subdue"
                        >
                          {topic}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <p className="text-sm text-color-text-paragraph mb-4 leading-relaxed">
                  {project.description}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex gap-4 text-xs text-color-text-subdue">
                    <span>⭐ {project.stars}</span>
                    <span>🍴 {project.forks}</span>
                  </div>

                  <div className="flex gap-2">
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn text-xs px-3 py-1.5 flex items-center gap-1"
                    >
                      <Github size={14} />
                      GitHub
                    </a>
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-primary text-xs px-3 py-1.5 flex items-center gap-1"
                      >
                        <ExternalLink size={14} />
                        Live Demo
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <Widget title="Recent GitHub Activity" className="mt-8">
          {activity.length === 0 ? (
            <p className="text-sm text-color-text-subdue">No recent activity</p>
          ) : (
            <div className="space-y-3">
              {activity.map((item) => (
                <div key={item.id} className="flex justify-between items-start">
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
      </main>
    </div>
  );
}
