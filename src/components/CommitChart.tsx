"use client";

import {
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
);

interface CommitData {
  date: string;
  commits: number;
}

interface CommitChartProps {
  commitData: CommitData[];
}

export default function CommitChart({ commitData }: CommitChartProps) {
  // Process data for the last 6 months
  const now = new Date();
  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(now.getMonth() - 6);

  // Create monthly data points
  const monthlyData: { [key: string]: number } = {};
  const months = [];

  for (let i = 0; i < 6; i++) {
    const date = new Date(sixMonthsAgo);
    date.setMonth(sixMonthsAgo.getMonth() + i);
    const monthKey = date.toLocaleDateString("en-US", {
      month: "short",
      year: "2-digit",
    });
    months.push(monthKey);
    monthlyData[monthKey] = 0;
  }

  // Aggregate commit data by month
  commitData.forEach((item) => {
    const date = new Date(item.date);
    if (date >= sixMonthsAgo) {
      const monthKey = date.toLocaleDateString("en-US", {
        month: "short",
        year: "2-digit",
      });
      if (Object.hasOwn(monthlyData, monthKey)) {
        monthlyData[monthKey] += item.commits;
      }
    }
  });

  const chartData = {
    labels: months,
    datasets: [
      {
        label: "Commits",
        data: months.map((month) => monthlyData[month]),
        borderColor: "var(--color-primary)",
        backgroundColor: "var(--color-primary)",
        pointBackgroundColor: "var(--color-primary)",
        pointBorderColor: "var(--color-widget-background)",
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
        fill: false,
        tension: 0.3,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: "var(--color-popover-background)",
        titleColor: "var(--color-text-highlight)",
        bodyColor: "var(--color-text-paragraph)",
        borderColor: "var(--color-separator)",
        borderWidth: 1,
      },
    },
    scales: {
      x: {
        display: true,
        grid: {
          display: false,
        },
        ticks: {
          color: "var(--color-text-subdue)",
          font: {
            family: "JetBrains Mono",
            size: 9,
          },
        },
      },
      y: {
        display: true,
        beginAtZero: true,
        grid: {
          color: "var(--color-separator)",
        },
        ticks: {
          color: "var(--color-text-subdue)",
          font: {
            family: "JetBrains Mono",
            size: 9,
          },
          stepSize: 1,
        },
      },
    },
  };

  const totalCommits = Object.values(monthlyData).reduce(
    (sum, count) => sum + count,
    0,
  );
  const avgCommitsPerMonth =
    totalCommits > 0 ? (totalCommits / 6).toFixed(1) : "0";

  return (
    <div className="space-y-3">
      {/* Stats */}
      <div className="flex justify-between items-center text-center">
        <div>
          <div className="text-base font-semibold text-color-text-highlight">
            {totalCommits}
          </div>
          <div className="text-xs text-color-text-subdue">Total</div>
        </div>
        <div>
          <div className="text-base font-semibold text-color-text-highlight">
            {avgCommitsPerMonth}
          </div>
          <div className="text-xs text-color-text-subdue">Avg/mo</div>
        </div>
      </div>

      {/* Chart */}
      <div className="relative h-24">
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
}
