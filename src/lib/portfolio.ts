// src/lib/portfolio.ts

interface AlphaVantageGlobalQuote {
  "01. symbol": string;
  "05. price": string;
  "09. change": string;
  "10. change percent": string;
}

interface StockQuote {
  symbol: string;
  price: number;
  changesPercentage: number;
}

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

async function fetchStockQuotes(symbols: string[]): Promise<StockQuote[]> {
  const quotes: StockQuote[] = [];
  const apiKey = process.env.ALPHA_VANTAGE_API_KEY;

  for (const symbol of symbols) {
    try {
      // Use GLOBAL_QUOTE endpoint for each symbol
      const response = await fetch(
        `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${apiKey}`,
        { next: { revalidate: 3600 } } // Cache for 1 hour
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
          changesPercentage: parseFloat(globalQuote["10. change percent"].replace("%", "")),
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
  const baseHoldings: Omit<PortfolioHolding, "currentPrice" | "changePercent">[] = [
    {
      symbol: "VTI",
      name: "Vanguard Total Stock Market",
      allocation: 40,
    },
    {
      symbol: "VXUS",
      name: "Vanguard Total International Stock",
      allocation: 36,
    },
    {
      symbol: "BND",
      name: "Vanguard Total Bond Market",
      allocation: 24,
    },
  ];

  const symbols = baseHoldings.map((h) => h.symbol);
  const quotes = await fetchStockQuotes(symbols);

  const holdings: PortfolioHolding[] = baseHoldings.map((holding) => {
    const quote = quotes.find((q) => q.symbol === holding.symbol);

    return {
      ...holding,
      currentPrice: quote?.price,
      changePercent: quote?.changesPercentage,
    };
  });

  // 服务器端计算加权平均涨跌幅
  const todaysChangePercent = holdings.reduce((sum, holding) => {
    const holdingChangePercent = holding.changePercent || 0;
    const weight = holding.allocation / 100;
    const contribution = holdingChangePercent * weight;
    
    console.log(`${holding.symbol}: ${holdingChangePercent}% × ${holding.allocation}% = ${contribution.toFixed(4)}%`);
    
    return sum + contribution;
  }, 0);
  
  console.log(`Total calculated change: ${todaysChangePercent.toFixed(4)}%`);

  return {
    holdings,
    todaysChangePercent,
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
      todaysChangePercent: 0,
      lastUpdated: Date.now(),
    };
  }
}