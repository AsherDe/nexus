// src/lib/portfolio.ts

interface StockQuote {
  symbol: string;
  price: number;
}

interface PortfolioHolding {
  symbol: string;
  name: string;
  allocation: number;
  purchasePrice: number; // Your original purchase price
  currentPrice?: number;
  totalReturnPercent?: number; // Total return since purchase
}

interface PortfolioData {
  holdings: PortfolioHolding[];
  totalReturnPercent: number; // Changed from todaysChangePercent
  lastUpdated: number;
}

async function fetchStockQuotes(symbols: string[]): Promise<StockQuote[]> {
  const quotes: StockQuote[] = [];
  const apiKey = process.env.ALPHA_VANTAGE_API_KEY;

  for (const symbol of symbols) {
    try {
      // Use GLOBAL_QUOTE endpoint for each symbol
      const response = await fetch(
        `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${apiKey}`,
        { next: { revalidate: 3600 } }, // Cache for 1 hour
      );

      if (!response.ok) {
        throw new Error(`API request for ${symbol} failed: ${response.status}`);
      }

      const data = await response.json();
      const globalQuote = data["Global Quote"];

      if (globalQuote && globalQuote["01. symbol"]) {
        quotes.push({
          symbol: globalQuote["01. symbol"],
          price: parseFloat(globalQuote["05. price"]),
        });
      } else if (data["Note"]) {
        console.warn(`API rate limit likely exceeded for ${symbol}.`);
      } else {
        console.warn(`No quote found for symbol: ${symbol}`);
      }
    } catch (error) {
      console.error(`Failed to fetch quote for ${symbol}:`, error);
    }
  }

  return quotes;
}

export async function getPortfolioData(): Promise<PortfolioData> {
  const baseHoldings: Omit<
    PortfolioHolding,
    "currentPrice" | "totalReturnPercent"
  >[] = [
    {
      symbol: "VTI",
      name: "Vanguard Total Stock Market",
      allocation: 40,
      purchasePrice: 312, // Add your actual purchase price here
    },
    {
      symbol: "VXUS",
      name: "Vanguard Total International Stock",
      allocation: 36,
      purchasePrice: 71.26, // Add your actual purchase price here
    },
    {
      symbol: "BND",
      name: "Vanguard Total Bond Market",
      allocation: 24,
      purchasePrice: 73.67, // Add your actual purchase price here
    },
  ];

  const symbols = baseHoldings.map((h) => h.symbol);
  const quotes = await fetchStockQuotes(symbols);

  const holdings: PortfolioHolding[] = baseHoldings.map((holding) => {
    const quote = quotes.find((q) => q.symbol === holding.symbol);

    // Calculate total return since purchase
    const totalReturnPercent = quote?.price
      ? ((quote.price - holding.purchasePrice) / holding.purchasePrice) * 100
      : 0;

    return {
      ...holding,
      currentPrice: quote?.price,
      totalReturnPercent, // Total return since purchase
    };
  });

  // Calculate weighted average total return
  const totalReturnPercent = holdings.reduce((sum, holding) => {
    const holdingTotalReturn = holding.totalReturnPercent || 0;
    const weight = holding.allocation / 100;
    const contribution = holdingTotalReturn * weight;

    console.log(
      `${holding.symbol}: ${holdingTotalReturn.toFixed(4)}% × ${holding.allocation}% = ${contribution.toFixed(4)}%`,
    );

    return sum + contribution;
  }, 0);

  console.log(`Total portfolio return: ${totalReturnPercent.toFixed(4)}%`);

  return {
    holdings,
    totalReturnPercent,
    lastUpdated: Date.now(),
  };
}

export async function fetchPortfolioDataClient(): Promise<PortfolioData> {
  try {
    const response = await fetch("/api/portfolio");
    if (!response.ok) {
      throw new Error("Failed to fetch portfolio data from API route");
    }
    return await response.json();
  } catch (error) {
    console.error("Client-side portfolio fetch failed:", error);
    return {
      holdings: [],
      totalReturnPercent: 0,
      lastUpdated: Date.now(),
    };
  }
}
