import { NextResponse } from "next/server";
import { getPortfolioData } from "@/lib/portfolio";

export async function GET() {
  try {
    const portfolioData = await getPortfolioData();

    return NextResponse.json(portfolioData, {
      headers: {
        "Cache-Control": "public, max-age=7200, stale-while-revalidate=14400", // 2hr cache, 4hr stale
      },
    });
  } catch (error) {
    console.error("Portfolio API error:", error);

    return NextResponse.json(
      {
        holdings: [],
        todaysChangePercent: 0,
        lastUpdated: Date.now(),
      },
      { status: 200 },
    );
  }
}
