interface AlphaVantageQuote {
  "01. symbol": string;
  "02. open": string;
  "03. high": string;
  "04. low": string;
  "05. price": string;
  "06. volume": string;
  "07. latest trading day": string;
  "08. previous close": string;
  "09. change": string;
  "10. change percent": string;
}

interface StockQuote {
  symbol: string;
  price: number;
  changesPercentage: number;
  change: number;
  dayLow: number;
  dayHigh: number;
  open: number;
  previousClose: number;
  volume: number;
  timestamp: number;
}

interface PortfolioHolding {
  symbol: string;
  name: string;
  buyPrice: number;
  allocation: number;
  currentPrice?: number;
  change?: number;
  changePercent?: number;
}

interface PortfolioData {
  holdings: PortfolioHolding[];
  totalValue: number;
  totalReturn: number;
  totalReturnPercent: number;
  lastUpdated: number;
}

async function fetchStockQuotes(symbols: string[]): Promise<StockQuote[]> {
  const quotes: StockQuote[] = [];
  
  // Alpha Vantage free tier allows 5 requests per minute, so we need to be careful
  // We'll fetch them sequentially with a small delay
  for (const symbol of symbols) {
    try {
      const response = await fetch(
        `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${process.env.ALPHA_VANTAGE_API_KEY}`,
        { next: { revalidate: 7200 } } // Cache for 2 hours
      );
      
      if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data["Global Quote"]) {
        const quote = data["Global Quote"] as AlphaVantageQuote;
        quotes.push({
          symbol: quote["01. symbol"],
          price: parseFloat(quote["05. price"]),
          changesPercentage: parseFloat(quote["10. change percent"].replace('%', '')),
          change: parseFloat(quote["09. change"]),
          dayLow: parseFloat(quote["04. low"]),
          dayHigh: parseFloat(quote["03. high"]),
          open: parseFloat(quote["02. open"]),
          previousClose: parseFloat(quote["08. previous close"]),
          volume: parseInt(quote["06. volume"]),
          timestamp: Date.now()
        });
      }
      
      // Small delay to respect rate limits
      if (symbols.indexOf(symbol) < symbols.length - 1) {
        await new Promise(resolve => setTimeout(resolve, 200));
      }
    } catch (error) {
      console.error(`Failed to fetch quote for ${symbol}:`, error);
    }
  }
  
  return quotes;
}

export async function getPortfolioData(): Promise<PortfolioData> {
  const baseHoldings: Omit<PortfolioHolding, 'currentPrice' | 'change' | 'changePercent'>[] = [
    {
      symbol: 'VXUS',
      name: 'Vanguard Total International Stock',
      buyPrice: 71.26,
      allocation: 36,
    },
    {
      symbol: 'VTI',
      name: 'Vanguard Total Stock Market',
      buyPrice: 312.00,
      allocation: 40,
    },
    {
      symbol: 'BND',
      name: 'Vanguard Total Bond Market',
      buyPrice: 73.67,
      allocation: 24,
    }
  ];

  const symbols = baseHoldings.map(h => h.symbol);
  const quotes = await fetchStockQuotes(symbols);
  
  // Map quotes to holdings
  const holdings: PortfolioHolding[] = baseHoldings.map(holding => {
    const quote = quotes.find(q => q.symbol === holding.symbol);
    
    if (quote) {
      // Calculate individual holding return percentage based on buy price
      const individualReturnPercent = ((quote.price - holding.buyPrice) / holding.buyPrice) * 100;
      
      return {
        ...holding,
        currentPrice: quote.price,
        change: quote.change,
        changePercent: individualReturnPercent
      };
    }
    
    // Fallback to buy price if API fails
    return {
      ...holding,
      currentPrice: holding.buyPrice,
      change: 0,
      changePercent: 0
    };
  });

  // Calculate weighted average return percentage
  const totalReturnPercent = holdings.reduce((sum, holding) => {
    const holdingReturnPercent = holding.changePercent || 0;
    const weight = holding.allocation / 100; // Convert percentage to decimal
    return sum + (holdingReturnPercent * weight);
  }, 0);

  // For display purposes, calculate total values (assuming $10k initial investment)
  const totalCost = 10000;
  const totalValue = totalCost * (1 + totalReturnPercent / 100);
  const totalReturn = totalValue - totalCost;

  return {
    holdings,
    totalValue,
    totalReturn,
    totalReturnPercent,
    lastUpdated: Date.now()
  };
}

// Client-side API for real-time updates
export async function fetchPortfolioDataClient(): Promise<PortfolioData> {
  try {
    const response = await fetch('/api/portfolio');
    if (!response.ok) {
      throw new Error('Failed to fetch portfolio data');
    }
    return await response.json();
  } catch (error) {
    console.error('Client-side portfolio fetch failed:', error);
    
    // Return fallback data
    return {
      holdings: [
        {
          symbol: 'VXUS',
          name: 'Vanguard Total International Stock',
          buyPrice: 71.26,
          allocation: 31.14,
          currentPrice: 71.26,
          change: 0,
          changePercent: 0
        },
        {
          symbol: 'VTI',
          name: 'Vanguard Total Stock Market',
          buyPrice: 312.00,
          allocation: 39.56,
          currentPrice: 312.00,
          change: 0,
          changePercent: 0
        },
        {
          symbol: 'BND',
          name: 'Vanguard Total Bond Market',
          buyPrice: 73.67,
          allocation: 24.28,
          currentPrice: 73.67,
          change: 0,
          changePercent: 0
        }
      ],
      totalValue: 10000,
      totalReturn: 0,
      totalReturnPercent: 0,
      lastUpdated: Date.now()
    };
  }
}