"use client";

import { useI18n } from "@/locales/client";
import Widget from "./Widget";

interface GermanLevel {
  level: string;
  name: string;
  minVocab: number;
  description: string;
  color: string;
}

const germanLevels: GermanLevel[] = [
  {
    level: "A1",
    name: "breakthrough",
    minVocab: 500,
    description: "Basic vocabulary",
    color: "text-blue-400",
  },
  {
    level: "A2",
    name: "waystage",
    minVocab: 1000,
    description: "Daily communication",
    color: "text-green-400",
  },
  {
    level: "B1",
    name: "threshold",
    minVocab: 2000,
    description: "Intermediate understanding",
    color: "text-yellow-400",
  },
  {
    level: "B2",
    name: "vantage",
    minVocab: 3500,
    description: "Fluent expression",
    color: "text-orange-400",
  },
  {
    level: "C1",
    name: "proficiency",
    minVocab: 5000,
    description: "Advanced usage",
    color: "text-purple-400",
  },
  {
    level: "C2",
    name: "mastery",
    minVocab: 8000,
    description: "Near native",
    color: "text-red-400",
  },
];

export default function GermanChallenge() {
  const t = useI18n();
  const currentVocab = 138;
  const currentLevel = "A1";
  const targetLevel = "C1";
  const targetVocab = 5000;

  // Calculate overall progress to C1
  const progressToC1 = Math.min(100, (currentVocab / targetVocab) * 100);

  // Days in year and estimated days left
  const startOfYear = new Date(new Date().getFullYear(), 0, 1);
  const now = new Date();
  const daysInYear = 365;
  const daysPassed = Math.floor(
    (now.getTime() - startOfYear.getTime()) / (1000 * 60 * 60 * 24),
  );
  const daysLeft = daysInYear - daysPassed;

  // Calculate required daily vocab to reach goal
  const vocabNeeded = targetVocab - currentVocab;
  const dailyTarget = Math.ceil(vocabNeeded / daysLeft);

  return (
    <Widget title={t("widgets.challenges.title")}>
      <div className="space-y-3">
        {/* Current Status */}
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span
                className="text-base font-semibold"
                style={{ color: "var(--color-text-primary)" }}
              >
                {currentLevel}
              </span>
              <span className="text-xs text-meta">
                {(() => {
                  const currentLevelData = germanLevels.find((l) => l.level === currentLevel);
                  if (currentLevelData?.name) {
                    switch (currentLevelData.name) {
                      case 'breakthrough':
                        return t('widgets.challenges.levels.breakthrough.name');
                      case 'waystage':
                        return t('widgets.challenges.levels.waystage.name');
                      case 'threshold':
                        return t('widgets.challenges.levels.threshold.name');
                      case 'vantage':
                        return t('widgets.challenges.levels.vantage.name');
                      case 'proficiency':
                        return t('widgets.challenges.levels.proficiency.name');
                      case 'mastery':
                        return t('widgets.challenges.levels.mastery.name');
                      default:
                        return currentLevelData.name;
                    }
                  }
                  return '';
                })()}
              </span>
            </div>
            <div className="text-xs text-muted">
              Vocabulary: {currentVocab.toLocaleString()}
            </div>
          </div>
          <div className="text-right">
            <div
              className="text-lg font-bold"
              style={{ color: "var(--color-text-primary)" }}
            >
              {progressToC1.toFixed(1)}%
            </div>
            <div className="text-xs text-muted">to C1</div>
          </div>
        </div>

        {/* Progress Bar by Levels A1-C1 */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs">
            <span className="text-muted">Level Progress</span>
            <span className="text-meta">
              {currentVocab} / {targetVocab}
            </span>
          </div>
          <div className="flex gap-1.5 h-3">
            {germanLevels.slice(0, 5).map((level, levelIndex) => {
              const levelMin =
                levelIndex === 0 ? 0 : germanLevels[levelIndex - 1].minVocab;
              const levelMax = level.minVocab;
              const levelRange = levelMax - levelMin;
              const blocksPerLevel =
                levelIndex === 0 ? 2 : levelIndex === 4 ? 6 : 4; // A1: 2, A2-B2: 4, C1: 6 blocks

              return (
                <div
                  key={level.level}
                  className="flex gap-1"
                  style={{ flex: blocksPerLevel }}
                >
                  {Array.from({ length: blocksPerLevel }).map(
                    (_, blockIndex) => {
                      const blockMin =
                        levelMin + (blockIndex / blocksPerLevel) * levelRange;
                      const blockMax =
                        levelMin +
                        ((blockIndex + 1) / blocksPerLevel) * levelRange;
                      const isActive = currentVocab >= blockMin;

                      // Level-specific colors using CSS variables
                      const getBlockColor = () => {
                        switch (level.level) {
                          case "A1":
                            return "var(--color-level-a1)";
                          case "A2":
                            return "var(--color-level-a2)";
                          case "B1":
                            return "var(--color-level-b1)";
                          case "B2":
                            return "var(--color-level-b2)";
                          case "C1":
                            return "var(--color-level-c1)";
                          default:
                            return "var(--color-separator)";
                        }
                      };

                      return (
                        <div
                          key={`${level.level}-${blockIndex}`}
                          className="flex-1 h-full rounded-sm transition-all duration-300"
                          style={{
                            backgroundColor: isActive
                              ? getBlockColor()
                              : "var(--color-separator)",
                          }}
                          title={`${level.level}: ${Math.round(blockMin)}-${Math.round(blockMax)} words`}
                        />
                      );
                    },
                  )}
                </div>
              );
            })}
          </div>
          {/* Level Labels */}
          <div className="flex justify-between text-xxs text-muted">
            {germanLevels.slice(0, 5).map((level) => (
              <span
                key={level.level}
                className={
                  currentVocab >= level.minVocab ? "text-color-link" : ""
                }
              >
                {level.level}
              </span>
            ))}
          </div>
        </div>

        {/* Daily Target - Background depth instead of border */}
        <div
          className="flex justify-between items-center rounded p-2"
          style={{
            backgroundColor: "var(--color-separator)",
            filter: "brightness(1.1)",
          }}
        >
          <div>
            <div
              className="text-xs font-medium"
              style={{ color: "var(--color-text-primary)" }}
            >
              Daily Target: {dailyTarget} words
            </div>
            <div className="text-xxs text-muted">{daysLeft} days left</div>
          </div>
          <div className="flex gap-1">
            {germanLevels.slice(0, 5).map((level) => {
              const isCompleted = currentVocab >= level.minVocab;
              const isCurrent = level.level === currentLevel;
              const isTarget = level.level === targetLevel;

              return (
                <div
                  key={level.level}
                  className="w-4 h-4 rounded-sm text-xxs flex items-center justify-center transition-all"
                  style={{
                    backgroundColor: isCompleted
                      ? "color-mix(in srgb, var(--color-positive) 30%, transparent)"
                      : isCurrent
                        ? "color-mix(in srgb, var(--color-link) 30%, transparent)"
                        : isTarget
                          ? "color-mix(in srgb, var(--color-level-c1) 30%, transparent)"
                          : "var(--color-separator)",
                    color: isCompleted
                      ? "var(--color-positive)"
                      : isCurrent
                        ? "var(--color-link)"
                        : isTarget
                          ? "var(--color-level-c1)"
                          : "var(--color-text-muted)",
                  }}
                  title={(() => {
                    switch (level.name) {
                      case 'breakthrough':
                        return t('widgets.challenges.levels.breakthrough.name');
                      case 'waystage':
                        return t('widgets.challenges.levels.waystage.name');
                      case 'threshold':
                        return t('widgets.challenges.levels.threshold.name');
                      case 'vantage':
                        return t('widgets.challenges.levels.vantage.name');
                      case 'proficiency':
                        return t('widgets.challenges.levels.proficiency.name');
                      case 'mastery':
                        return t('widgets.challenges.levels.mastery.name');
                      default:
                        return level.name;
                    }
                  })()}
                >
                  {level.level.slice(0, 1)}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Widget>
  );
}
