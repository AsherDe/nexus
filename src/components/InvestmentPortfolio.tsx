"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Widget from "@/components/Widget";
import { fetchPortfolioDataClient } from "@/lib/portfolio";

interface PortfolioHolding {
  symbol: string;
  name: string;
  allocation: number;
  currentPrice?: number;
  changePercent?: number;
}

interface PortfolioData {
  holdings: PortfolioHolding[];
  todaysChangePercent: number;
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
      <Widget title="Investment Portfolio">
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
      <Widget title="Investment Portfolio">
        <div className="text-xs text-color-text-subdue">
          Failed to load portfolio data
        </div>
      </Widget>
    );
  }

  const todaysChangePercent = portfolioData.todaysChangePercent ?? 0;

  return (
    <Widget title="Investment Portfolio">
      <div className="space-y-4">
        {/* Portfolio Summary */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-xs text-color-text-subdue">Total Return</span>
            <span
              className={`text-lg font-medium ${todaysChangePercent >= 0 ? "text-green-500" : "text-red-500"}`}
            >
              {todaysChangePercent >= 0 ? "+" : ""}
              {todaysChangePercent.toFixed(2)}%
            </span>
          </div>
        </div>

        <div className="border-t border-color-border pt-3">
          <div className="space-y-3">
            {portfolioData.holdings.map((holding) => (
              <div key={holding.symbol} className="space-y-1">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="text-sm font-medium text-color-text-highlight">
                      {holding.symbol}
                    </div>
                    <div className="text-xs text-color-text-subdue">
                      {holding.name}
                    </div>
                  </div>
                  <div className="text-right">
                    <div
                      className={`text-sm font-medium ${holding.changePercent && holding.changePercent >= 0 ? "text-green-500" : "text-red-500"}`}
                    >
                      {holding.changePercent
                        ? `${holding.changePercent >= 0 ? "+" : ""}${holding.changePercent.toFixed(2)}%`
                        : "0.00%"}
                    </div>
                  </div>
                </div>

                {/* Allocation Bar */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs text-color-text-subdue">
                    <span>Allocation: {holding.allocation.toFixed(2)}%</span>
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
          Last updated:{" "}
          {new Date(portfolioData.lastUpdated).toLocaleTimeString()}
        </div>

        {/* Norwegian Model Link */}
        <div className="border-t border-color-border pt-3">
          <Link
            href="/blog/my-investment-strategy"
            className="text-xs text-color-text-subdue hover:text-color-text-highlight transition-colors italic"
          >
            Inspired by the Norwegian model →
          </Link>
        </div>
      </div>
    </Widget>
  );
}
