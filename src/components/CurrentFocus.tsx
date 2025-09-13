"use client";

import Link from "next/link";
import { useI18n } from "@/locales/client";
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
  const t = useI18n();
  return (
    <Widget title={t("widgets.currentFocus.title")}>
      <div className="space-y-4">
        {/* Project Name */}
        <div>
          <h4
            className="text-sm font-medium mb-1"
            style={{ color: "var(--color-text-primary)" }}
          >
            {currentProject.name}
          </h4>
          <p className="text-xs text-color-text-paragraph">
            {currentProject.description}
          </p>
        </div>

        {/* Status */}
        <div className="space-y-2">
          {" "}
          <div className="border-t border-color-border pt-3">
            <div className="flex justify-between items-center">
              <span className="text-xs text-color-text-subdue">
                {t("widgets.currentFocus.status")}
              </span>
              <span className="text-xs text-color-text-highlight">
                {currentProject.status}
              </span>
            </div>{" "}
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
                {t("widgets.currentFocus.viewRepository")}
              </Link>
            </div>
          )}
      </div>
    </Widget>
  );
}
