"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import type { Project } from "@/lib/github";
import { ProjectsSkeleton } from "./loading/WidgetSkeleton";
import TechIcon from "./TechIcon";
import Widget from "./Widget";

export default function SpotlightProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProjects() {
      try {
        const response = await fetch("/api/github/repos");
        if (response.ok) {
          const data = await response.json();
          setProjects(data);
        }
      } catch (error) {
        console.error("Error loading projects:", error);
      } finally {
        setLoading(false);
      }
    }

    loadProjects();
  }, []);

  if (loading) {
    return <ProjectsSkeleton />;
  }

  const featuredProjects = projects.filter((p) => p.featured);
  const displayProjects =
    featuredProjects.length > 0
      ? featuredProjects.slice(0, 2)
      : projects.slice(0, 2);

  return (
    <Widget title="Spotlight Projects">
      {projects.length === 0 ? (
        <p className="text-sm text-color-text-subdue text-center py-8">
          No GitHub repositories found
        </p>
      ) : (
        <div className="space-y-4">
          {displayProjects.map((project) => (
            <Link key={project.id} href="/projects">
              <div className="card cursor-pointer overflow-hidden">
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
                      <div key={tech} className="flex items-center gap-1">
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
  );
}
