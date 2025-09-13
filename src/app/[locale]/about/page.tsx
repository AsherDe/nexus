"use client";

import { useState } from "react";
import {
  BarChart3,
  Brain,
  Code,
  ExternalLink,
  Github,
  Layers,
  Mail,
  Palette,
  Rss,
  Search,
  Settings,
  Sparkles,
  Target,
  User,
} from "lucide-react";
import { useI18n } from "@/locales/client";
import Navigation from "@/components/Navigation";
import ProfileImage from "@/components/ProfileImage";
import Widget from "@/components/Widget";

export default function About() {
  const t = useI18n();
  const [emailCopied, setEmailCopied] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText("di6f5dhgp@mozmail.com");
      setEmailCopied(true);
      setTimeout(() => setEmailCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy email:", err);
    }
  };

  return (
    <div className="page-container animate-entrance">
      <Navigation />

      {/* Header Section */}
      <div className="w-full max-w-6xl mx-auto mb-8 px-4">
        <div className="flex items-start gap-6">
          <ProfileImage showLink={false} />
          <div className="flex-1">
            <h1 className="text-3xl font-semibold mb-2">{t("about.title")}</h1>
            <p className="text-base text-color-text-paragraph">
              {t("about.subtitle")}
            </p>
          </div>
        </div>
      </div>

      {/* Two Column Layout */}
      <main className="w-full max-w-6xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <Widget
            title={
              <div className="flex items-center gap-2">
                <Palette className="w-5 h-5" />
                <span>{t("about.portrait.title")}</span>
              </div>
            }
          >
            <div className="prose">
              <p dangerouslySetInnerHTML={{ __html: t("about.portrait.content") }} />
              <blockquote>
                {t("about.portrait.quote")}
              </blockquote>
            </div>
          </Widget>

          <hr />

          <Widget
            title={
              <div className="flex items-center gap-2">
                <User className="w-5 h-5" />
                <span>{t("about.whoIAm.title")}</span>
              </div>
            }
          >
            <div className="prose">
              <p dangerouslySetInnerHTML={{ __html: t("about.whoIAm.content") }} />
            </div>
          </Widget>

          <hr />

          <Widget
            title={
              <div className="flex items-center gap-2">
                <Settings className="w-5 h-5" />
                <span>{t("about.myWork.title")}</span>
              </div>
            }
          >
            <div className="prose">
              <p>
                {t("about.myWork.intro")}
              </p>
              <ul className="space-y-2 mt-4">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-color-primary flex-shrink-0 mt-2"></div>
                  <span dangerouslySetInnerHTML={{ __html: t("about.myWork.achievements.vit") }} />
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-color-primary flex-shrink-0 mt-2"></div>
                  <span dangerouslySetInnerHTML={{ __html: t("about.myWork.achievements.cnn") }} />
                </li>
              </ul>
              <p className="mt-4" dangerouslySetInnerHTML={{ __html: t("about.myWork.current") }} />
            </div>
          </Widget>

          <hr />

          <Widget
            title={
              <div className="flex items-center gap-2">
                <Brain className="w-5 h-5" />
                <span>{t("about.philosophy.title")}</span>
              </div>
            }
          >
            <div className="prose">
              <p>
                {t("about.philosophy.intro")}
              </p>
              <blockquote dangerouslySetInnerHTML={{ __html: t("about.philosophy.echoChambersQuote") }} />
              <p>{t("about.philosophy.mission")}</p>
              <blockquote dangerouslySetInnerHTML={{ __html: t("about.philosophy.knowledgeArchitectQuote") }} />
              <p>
                {t("about.philosophy.education")}
              </p>
            </div>
          </Widget>

          <hr />

          <Widget
            title={
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5" />
                <span>{t("about.beyondCode.title")}</span>
              </div>
            }
          >
            <div className="prose">
              <p>
                {t("about.beyondCode.content")}
              </p>
              <p className="mt-6 p-4 bg-color-widget-background border border-color-separator rounded-lg">
                {t("about.beyondCode.callToAction")}
              </p>
            </div>
          </Widget>
        </div>

        {/* Right Column - Sidebar */}
        <div className="space-y-6">
          {/* Contact Widget */}
          <Widget
            title={
              <div className="flex items-center gap-2">
                <Mail className="w-5 h-5" />
                <span>{t("about.connect.title")}</span>
              </div>
            }
          >
            <div className="space-y-3">
              <a
                href="https://github.com/asherde"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-sm hover:text-color-primary transition-colors"
              >
                <Github className="w-4 h-4" />
                <span>{t("about.connect.github")}</span>
                <ExternalLink className="w-3 h-3 ml-auto opacity-60" />
              </a>
              <button
                type="button"
                onClick={handleCopyEmail}
                className="flex items-center gap-3 text-sm hover:text-color-primary transition-colors w-full text-left cursor-pointer relative"
                style={{ color: "var(--color-link)" }}
                title={t("about.connect.copyEmailTitle")}
              >
                <Mail className="w-4 h-4" />
                <span>di6f5dhgp@mozmail.com</span>
                {emailCopied && (
                  <span className="text-xs text-color-positive ml-auto animate-pulse">
                    {t("about.connect.copied")}
                  </span>
                )}
              </button>
              <a
                href="/blog/feed.xml"
                className="flex items-center gap-3 text-sm hover:text-color-primary transition-colors"
              >
                <Rss className="w-4 h-4" />
                <span>{t("about.connect.rss")}</span>
              </a>
            </div>
          </Widget>

          {/* Core Capabilities Widget */}
          <Widget
            title={
              <div className="flex items-center gap-2">
                <Layers className="w-5 h-5" />
                <span>{t("about.capabilities.title")}</span>
              </div>
            }
          >
            <div className="grid grid-cols-2 gap-3">
              <div className="group space-y-2 p-2.5 bg-color-widget-background border border-color-separator rounded-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-blue-500/10 hover:border-blue-400/30 cursor-pointer relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="flex items-center gap-2 relative z-10">
                  <Brain className="w-4 h-4 text-color-primary flex-shrink-0 group-hover:scale-110 transition-transform duration-300" />
                  <h4
                    className="text-xs font-bold leading-tight"
                    style={{ color: "var(--color-text-primary)" }}
                  >
                    {t("about.capabilities.ml.title")}
                  </h4>
                </div>
                <p className="text-xs text-color-text-paragraph leading-tight relative z-10">
                  {t("about.capabilities.ml.description")}
                </p>
              </div>

              <div className="group space-y-2 p-2.5 bg-color-widget-background border border-color-separator rounded-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-green-500/10 hover:border-green-400/30 cursor-pointer relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 to-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="flex items-center gap-2 relative z-10">
                  <Code className="w-4 h-4 text-color-primary flex-shrink-0 group-hover:scale-110 transition-transform duration-300" />
                  <h4
                    className="text-xs font-bold leading-tight"
                    style={{ color: "var(--color-text-primary)" }}
                  >
                    {t("about.capabilities.fullstack.title")}
                  </h4>
                </div>
                <p className="text-xs text-color-text-paragraph leading-tight relative z-10">
                  {t("about.capabilities.fullstack.description")}
                </p>
              </div>

              <div className="group space-y-2 p-2.5 bg-color-widget-background border border-color-separator rounded-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-orange-500/10 hover:border-orange-400/30 cursor-pointer relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 to-yellow-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="flex items-center gap-2 relative z-10">
                  <BarChart3 className="w-4 h-4 text-color-primary flex-shrink-0 group-hover:scale-110 transition-transform duration-300" />
                  <h4
                    className="text-xs font-bold leading-tight"
                    style={{ color: "var(--color-text-primary)" }}
                  >
                    {t("about.capabilities.design.title")}
                  </h4>
                </div>
                <p className="text-xs text-color-text-paragraph leading-tight relative z-10">
                  {t("about.capabilities.design.description")}
                </p>
              </div>

              <div className="group space-y-2 p-2.5 bg-color-widget-background border border-color-separator rounded-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-purple-500/10 hover:border-purple-400/30 cursor-pointer relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="flex items-center gap-2 relative z-10">
                  <Search className="w-4 h-4 text-color-primary flex-shrink-0 group-hover:scale-110 transition-transform duration-300" />
                  <h4
                    className="text-xs font-bold leading-tight"
                    style={{ color: "var(--color-text-primary)" }}
                  >
                    {t("about.capabilities.research.title")}
                  </h4>
                </div>
                <p className="text-xs text-color-text-paragraph leading-tight relative z-10">
                  {t("about.capabilities.research.description")}
                </p>
              </div>
            </div>
          </Widget>

          {/* Core Values Widget */}
          <Widget
            title={
              <div className="flex items-center gap-2">
                <Target className="w-5 h-5" />
                <span>{t("about.values.title")}</span>
              </div>
            }
          >
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-baseline gap-2">
                  <span className="text-lg">🏗️</span>
                  <h4 className="text-sm font-medium text-color-text-highlight">
                    {t("about.values.knowledgeArchitect.title")}
                  </h4>
                </div>
                <p className="text-xs text-color-text-paragraph ml-7">
                  {t("about.values.knowledgeArchitect.description")}
                </p>
              </div>
              <div className="space-y-2">
                <div className="flex items-baseline gap-2">
                  <span className="text-lg">🌉</span>
                  <h4 className="text-sm font-medium text-color-text-highlight">
                    {t("about.values.crossDomain.title")}
                  </h4>
                </div>
                <p className="text-xs text-color-text-paragraph ml-7">
                  {t("about.values.crossDomain.description")}
                </p>
              </div>
              <div className="space-y-2">
                <div className="flex items-baseline gap-2">
                  <span className="text-lg">❤️</span>
                  <h4 className="text-sm font-medium text-color-text-highlight">
                    {t("about.values.humanCentric.title")}
                  </h4>
                </div>
                <p className="text-xs text-color-text-paragraph ml-7">
                  {t("about.values.humanCentric.description")}
                </p>
              </div>
              <div className="space-y-2">
                <div className="flex items-baseline gap-2">
                  <span className="text-lg">🎯</span>
                  <h4 className="text-sm font-medium text-color-text-highlight">
                    {t("about.values.independentThinking.title")}
                  </h4>
                </div>
                <p className="text-xs text-color-text-paragraph ml-7">
                  {t("about.values.independentThinking.description")}
                </p>
              </div>
            </div>
          </Widget>
        </div>
      </main>
    </div>
  );
}
