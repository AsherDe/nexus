"use client";

import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

interface LanguageStats {
  [key: string]: number;
}

interface LanguageChartProps {
  languageStats: LanguageStats;
}

export default function LanguageChart({ languageStats }: LanguageChartProps) {
  // Calculate percentages and sort by usage
  const total = Object.values(languageStats).reduce(
    (sum, count) => sum + count,
    0,
  );
  const sortedLanguages = Object.entries(languageStats)
    .map(([language, count]) => ({
      language,
      count,
      percentage: ((count / total) * 100).toFixed(1),
    }))
    .sort((a, b) => b.count - a.count);

  // Group small languages into "Other"
  const threshold = total * 0.05; // 5% threshold
  const mainLanguages = sortedLanguages.filter(
    (lang) => lang.count >= threshold,
  );
  const otherLanguages = sortedLanguages.filter(
    (lang) => lang.count < threshold,
  );

  const finalData = [...mainLanguages];
  if (otherLanguages.length > 0) {
    const otherCount = otherLanguages.reduce(
      (sum, lang) => sum + lang.count,
      0,
    );
    finalData.push({
      language: "Other",
      count: otherCount,
      percentage: ((otherCount / total) * 100).toFixed(1),
    });
  }

  // Color palette inspired by GitHub language colors
  const colors = [
    "#3178c6", // TypeScript blue
    "#3776ab", // Python blue
    "#00d4aa", // Dart green
    "#f1e05a", // JavaScript yellow
    "#e34c26", // HTML orange-red
    "#563d7c", // CSS purple
    "#89e051", // Shell green
    "#701516", // Ruby red
    "#6f42c1", // Go purple
    "#cccccc", // Other gray
  ];

  const chartData = {
    labels: finalData.map((item) => item.language),
    datasets: [
      {
        data: finalData.map((item) => item.count),
        backgroundColor: colors.slice(0, finalData.length),
        borderColor: "var(--color-widget-background)",
        borderWidth: 2,
        hoverBorderWidth: 3,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false, // We'll create a custom legend
      },
      tooltip: {
        backgroundColor: "var(--color-popover-background)",
        titleColor: "var(--color-text-highlight)",
        bodyColor: "var(--color-text-paragraph)",
        borderColor: "var(--color-separator)",
        borderWidth: 1,
        callbacks: {
          label: (context: { raw: unknown; label: string }) => {
            const percentage = (
              ((context.raw as number) / total) *
              100
            ).toFixed(1);
            return `${context.label}: ${percentage}%`;
          },
        },
      },
    },
    cutout: "60%", // Makes it a donut chart
  };

  if (Object.keys(languageStats).length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-sm text-color-text-subdue">
          No language data available
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Chart */}
      <div className="relative h-48">
        <Doughnut data={chartData} options={options} />
      </div>

      {/* Custom Legend */}
      <div className="space-y-2">
        {finalData.map((item, index) => (
          <div
            key={item.language}
            className="flex items-center justify-between"
          >
            <div className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: colors[index] }}
              ></div>
              <span className="text-sm text-color-text-paragraph">
                {item.language}
              </span>
            </div>
            <span className="text-sm text-color-text-highlight font-medium">
              {item.percentage}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
