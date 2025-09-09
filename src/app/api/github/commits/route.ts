import { fetchCommitActivity } from "@/lib/github";

export async function GET() {
  try {
    const commits = await fetchCommitActivity();
    return Response.json(commits);
  } catch (error) {
    console.error("API Error fetching commits:", error);
    return Response.json([], { status: 500 });
  }
}
