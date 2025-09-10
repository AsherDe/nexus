"use client";

import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/lib/github";
import { useCachedData } from "@/hooks/useCachedData";
import { ProjectsSkeleton } from "./loading/WidgetSkeleton";
import TechIcon from "./TechIcon";
import Widget from "./Widget";

export default function SpotlightProjects() {
  const {
    data: projects,
    loading,
    error,
  } = useCachedData<Project[]>({
    cacheKey: "spotlight-projects",
    url: "/api/github/repos",
    cacheDurationMinutes: 10,
  });

  const featuredProjects = projects?.filter((p) => p.featured) || [];
  const displayProjects =
    featuredProjects.length > 0 ? featuredProjects : projects || [];

  // Calculate animation duration based on number of projects (slower for more projects)
  const animationDuration = Math.max(20, displayProjects.length * 4);

  // Render a single project card
  const renderProjectCard = (project: Project, keyPrefix = "") => (
    <Link key={`${keyPrefix}${project.id}`} href="/projects">
      <div className="card-lift-only cursor-pointer overflow-hidden min-w-[280px] max-w-[280px] flex-shrink-0">
        <div className="aspect-video bg-color-separator rounded mb-2 flex items-center justify-center relative">
          {project.coverImage ? (
            <Image
              src={project.coverImage}
              alt={`${project.name} preview`}
              className="w-full h-full object-cover"
              fill
              sizes="280px"
            />
          ) : (
            <div className="text-center p-4">
              <div className="w-10 h-10 bg-color-primary rounded-lg mx-auto mb-1 flex items-center justify-center">
                <span className="text-color-background font-mono text-sm">
                  {project.name.charAt(0).toUpperCase()}
                </span>
              </div>
              <p className="text-xs text-color-text-subdue">Preview</p>
            </div>
          )}
        </div>

        <h4 className="card-title text-sm truncate">{project.name}</h4>
        <div className="card-meta mb-2">
          <div className="flex items-center gap-1 flex-wrap">
            {project.technologies.slice(0, 2).map((tech) => (
              <div key={tech} className="flex items-center gap-1">
                <TechIcon technology={tech} size="sm" />
                <span className="text-xs">{tech}</span>
              </div>
            ))}
            {project.technologies.length > 2 && (
              <span className="text-xs text-color-text-subdue">
                +{project.technologies.length - 2}
              </span>
            )}
          </div>
        </div>
        <p className="text-xs text-color-text-paragraph line-clamp-2 leading-tight mb-2">
          {project.description}
        </p>
        <div className="flex gap-3 text-xs text-color-text-subdue">
          <span>⭐ {project.stars}</span>
          <span>🍴 {project.forks}</span>
        </div>
      </div>
    </Link>
  );

  if (loading) {
    return <ProjectsSkeleton />;
  }

  if (error || !projects) {
    return (
      <Widget title="Spotlight Projects">
        <p className="text-sm text-color-text-subdue text-center py-8">
          Failed to load projects.
        </p>
      </Widget>
    );
  }

  return (
    <Widget title="Spotlight Projects">
      {projects.length === 0 ? (
        <p className="text-sm text-color-text-subdue text-center py-8">
          No GitHub repositories found
        </p>
      ) : (
        // For few projects, use simple static display
        <div className="flex gap-4 pb-2 overflow-x-auto scrollbar-hide">
          {displayProjects.map((project) => renderProjectCard(project))}
        </div>
      )}
    </Widget>
  );
}
