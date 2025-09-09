import { fetchGitHubActivity } from "@/lib/github";

export async function GET() {
  try {
    const activity = await fetchGitHubActivity();
    return Response.json(activity);
  } catch (error) {
    console.error("API Error fetching activity:", error);
    return Response.json([], { status: 500 });
  }
}
