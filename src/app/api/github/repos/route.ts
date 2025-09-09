import { fetchGitHubRepos } from "@/lib/github";

export async function GET() {
  try {
    const repos = await fetchGitHubRepos();
    return Response.json(repos);
  } catch (error) {
    console.error("API Error fetching repos:", error);
    return Response.json([], { status: 500 });
  }
}
