"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useI18n } from "@/locales/client";
import Widget from "@/components/Widget";
import { fetchPortfolioDataClient } from "@/lib/portfolio";

interface PortfolioHolding {
  symbol: string;
  name: string;
  allocation: number;
  purchasePrice: number;
  currentPrice?: number;
  totalReturnPercent?: number;
}

interface PortfolioData {
  holdings: PortfolioHolding[];
  totalReturnPercent: number;
  lastUpdated: number;
}

const CACHE_DURATION = 2 * 60 * 60 * 1000; // 2 hours
const REFRESH_INTERVAL = 2 * 60 * 60 * 1000; // 2 hours

function getPortfolioFromCache(): PortfolioData | null {
  if (typeof window === "undefined") return null;

  const cached = localStorage.getItem("portfolio-data");
  if (!cached) return null;

  const data = JSON.parse(cached);
  const isExpired = Date.now() - data.lastUpdated > CACHE_DURATION;

  return isExpired ? null : data;
}

function savePortfolioToCache(data: PortfolioData): void {
  if (typeof window === "undefined") return;
  localStorage.setItem("portfolio-data", JSON.stringify(data));
}

export default function InvestmentPortfolio() {
  const t = useI18n();
  const [portfolioData, setPortfolioData] = useState<PortfolioData | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Try to load from cache first
    const cached = getPortfolioFromCache();
    if (cached) {
      setPortfolioData(cached);
      setIsLoading(false);
    }

    // Fetch fresh data
    const fetchData = async () => {
      try {
        const data = await fetchPortfolioDataClient();
        setPortfolioData(data);
        savePortfolioToCache(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to fetch portfolio data:", error);
        setIsLoading(false);
      }
    };

    fetchData();

    // Set up refresh interval
    const interval = setInterval(fetchData, REFRESH_INTERVAL);
    return () => clearInterval(interval);
  }, []);

  if (isLoading && !portfolioData) {
    return (
      <Widget title={t("widgets.investment.title")}>
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-color-text-subdue/20 rounded w-3/4"></div>
          <div className="space-y-2">
            <div className="h-3 bg-color-text-subdue/20 rounded"></div>
            <div className="h-3 bg-color-text-subdue/20 rounded w-5/6"></div>
          </div>
        </div>
      </Widget>
    );
  }

  if (!portfolioData) {
    return (
      <Widget title={t("widgets.investment.title")}>
        <div className="text-xs text-color-text-subdue">
          {t("widgets.investment.failedToLoad")}
        </div>
      </Widget>
    );
  }

  const totalReturnPercent = portfolioData.totalReturnPercent ?? 0;

  // Calculate holding period from start date
  const startDate = new Date("2025-08-21");
  const today = new Date();
  const holdingDays = Math.floor(
    (today.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24),
  );

  return (
    <Widget title={t("widgets.investment.title")}>
      <div className="space-y-4">
        {/* Portfolio Summary */}
        <div className="flex justify-between items-center">
          <div>
            <div className="text-xs text-color-text-subdue">
              {t("widgets.investment.totalReturn")}
            </div>
            <div className="text-xs text-color-text-muted">
              {holdingDays} {t("widgets.investment.days")} (since Aug 21)
            </div>
          </div>
          <span
            className="text-lg font-medium"
            style={{
              color:
                totalReturnPercent >= 0
                  ? "var(--color-positive)"
                  : "var(--color-negative)",
            }}
          >
            {totalReturnPercent >= 0 ? "+" : ""}
            {totalReturnPercent.toFixed(2)}%
          </span>
        </div>

        <div className="border-t border-color-border pt-3">
          <div className="space-y-3">
            {portfolioData.holdings.map((holding) => (
              <div key={holding.symbol} className="space-y-1">
                <div className="flex justify-between items-start">
                  <div>
                    <div
                      className="text-sm font-medium"
                      style={{ color: "var(--color-text-primary)" }}
                    >
                      {holding.symbol}
                    </div>
                    <div className="text-xs text-color-text-subdue">
                      {holding.name}
                    </div>
                  </div>
                  <div className="text-right">
                    <div
                      className="text-sm font-medium"
                      style={{
                        color:
                          holding.totalReturnPercent &&
                          holding.totalReturnPercent >= 0
                            ? "var(--color-positive)"
                            : "var(--color-negative)",
                      }}
                    >
                      {holding.totalReturnPercent
                        ? `${holding.totalReturnPercent >= 0 ? "+" : ""}${holding.totalReturnPercent.toFixed(2)}%`
                        : "0.00%"}
                    </div>
                  </div>
                </div>

                {/* Allocation Bar */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs text-color-text-subdue">
                    <span>
                      {t("widgets.investment.allocation")}:{" "}
                      {holding.allocation.toFixed(2)}%
                    </span>
                  </div>
                  <div className="w-full bg-color-border rounded-full h-1">
                    <div
                      className="bg-color-text-highlight rounded-full h-1"
                      style={{ width: `${Math.min(holding.allocation, 100)}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Last Updated */}
        <div className="text-xs text-color-text-subdue">
          {t("widgets.investment.lastUpdated")}:{" "}
          {new Date(portfolioData.lastUpdated).toLocaleTimeString()}
        </div>

        {/* Norwegian Model Link */}
        <div className="border-t border-color-border pt-3">
          <Link
            href="/blog/my-investment-strategy"
            className="text-xs text-color-text-subdue hover:text-color-text-highlight transition-colors italic"
          >
            {t("widgets.investment.inspiredBy")}
          </Link>
        </div>
      </div>
    </Widget>
  );
}
