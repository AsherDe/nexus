"use client";

import Link from "next/link";
import Widget from "@/components/Widget";

interface FocusProject {
  name: string;
  description: string;
  status: string;
  techStack: string[];
  repositoryUrl?: string;
}

const currentProject: FocusProject = {
  name: "Synapse - Firefox Extension",
  description:
    "Applying robotics techniques to model and understand user interaction behaviors in browsers",
  status: "Academic research and prototype development",
  techStack: [
    "WebExtensions",
    "TypeScript",
    "Machine Learning",
    "Browser APIs",
  ],
  repositoryUrl: "#", // Replace with actual repository URL when available
};

export default function CurrentFocus() {
  return (
    <Widget title="Current Focus">
      <div className="space-y-4">
        {/* Project Name */}
        <div>
          <h4 className="text-sm font-medium text-color-text-highlight mb-1">
            {currentProject.name}
          </h4>
          <p className="text-xs text-color-text-paragraph">
            {currentProject.description}
          </p>
        </div>

        {/* Status */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-xs text-color-text-subdue">Status</span>
            <span className="text-xs text-color-text-highlight">
              {currentProject.status}
            </span>
          </div>
        </div>

        {/* Tech Stack */}
        <div className="border-t border-color-border pt-3">
          <div className="space-y-2">
            <span className="text-xs text-color-text-subdue">Tech Stack</span>
            <div className="flex flex-wrap gap-1">
              {currentProject.techStack.map((tech) => (
                <span
                  key={tech}
                  className="text-xs px-2 py-1 bg-color-text-subdue/10 text-color-text-highlight rounded border border-color-border"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Repository Link */}
        {currentProject.repositoryUrl &&
          currentProject.repositoryUrl !== "#" && (
            <div className="border-t border-color-border pt-3">
              <Link
                href={currentProject.repositoryUrl}
                className="text-xs text-color-text-subdue hover:text-color-text-highlight transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                View Repository →
              </Link>
            </div>
          )}
      </div>
    </Widget>
  );
}
