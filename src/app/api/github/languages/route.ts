import { fetchLanguageStats } from "@/lib/github";

export async function GET() {
  try {
    const languages = await fetchLanguageStats();
    return Response.json(languages);
  } catch (error) {
    console.error("API Error fetching languages:", error);
    return Response.json({}, { status: 500 });
  }
}
