interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  topics: string[];
  updated_at: string;
  created_at: string;
  pushed_at: string;
}

interface GitHubEvent {
  id: string;
  type: string;
  repo: {
    name: string;
    url: string;
  };
  payload: {
    commits?: Array<{
      message: string;
      sha: string;
    }>;
    ref?: string;
    ref_type?: string;
  };
  created_at: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  stars: number;
  forks: number;
  githubUrl: string;
  liveUrl?: string;
  featured?: boolean;
  language: string | null;
  topics: string[];
  updatedAt: string;
  createdAt: string;
  coverImage?: string;
}

export interface RecentActivity {
  id: string;
  repo: string;
  message: string;
  timestamp: string;
  type: "commit" | "push" | "create" | "other";
}

export interface LanguageStats {
  [key: string]: number;
}

export interface CommitData {
  date: string;
  commits: number;
}

const GITHUB_API_BASE = "https://api.github.com";

// 从环境变量获取GitHub用户名和token
const GITHUB_USERNAME = process.env.GITHUB_USERNAME || "octocat";
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

const githubHeaders: HeadersInit = {
  Accept: "application/vnd.github.v3+json",
  "User-Agent": "Nexus-Dashboard/1.0",
};

if (GITHUB_TOKEN) {
  githubHeaders.Authorization = `Bearer ${GITHUB_TOKEN}`;
}

export async function fetchGitHubRepos(): Promise<Project[]> {
  try {
    const response = await fetch(
      `${GITHUB_API_BASE}/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=50`,
      {
        headers: githubHeaders,
        next: { revalidate: 300 }, // 缓存5分钟
      },
    );

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }

    const repos: GitHubRepo[] = await response.json();

    return repos
      .filter((repo) => !repo.name.includes(".github")) // 过滤掉.github等特殊仓库
      .map((repo) => ({
        id: repo.name,
        name: repo.name,
        description: repo.description || "No description provided",
        technologies: [repo.language, ...repo.topics].filter(
          Boolean,
        ) as string[],
        stars: repo.stargazers_count,
        forks: repo.forks_count,
        githubUrl: repo.html_url,
        liveUrl: repo.homepage || undefined,
        featured:
          repo.stargazers_count > 10 || repo.topics.includes("featured"),
        language: repo.language,
        topics: repo.topics,
        updatedAt: repo.updated_at,
        createdAt: repo.created_at,
      }))
      .sort(
        (a, b) =>
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
      );
  } catch (error) {
    console.error("Error fetching GitHub repos:", error);
    // 返回示例数据作为fallback
    return getFallbackProjects();
  }
}

export async function fetchGitHubActivity(): Promise<RecentActivity[]> {
  try {
    const response = await fetch(
      `${GITHUB_API_BASE}/users/${GITHUB_USERNAME}/events/public?per_page=10`,
      {
        headers: githubHeaders,
        next: { revalidate: 60 }, // 缓存1分钟
      },
    );

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }

    const events: GitHubEvent[] = await response.json();

    return events
      .filter((event) => ["PushEvent", "CreateEvent"].includes(event.type))
      .slice(0, 5)
      .map((event) => {
        let message = "";
        let type: "commit" | "push" | "create" | "other" = "other";

        if (event.type === "PushEvent" && event.payload.commits?.length) {
          message = event.payload.commits[0].message;
          type = "commit";
        } else if (event.type === "CreateEvent") {
          message = `Created ${event.payload.ref_type}: ${event.payload.ref}`;
          type = "create";
        } else {
          message = `${event.type.replace("Event", "")} activity`;
        }

        return {
          id: event.id,
          repo: event.repo.name.split("/")[1], // 只取仓库名
          message:
            message.length > 60 ? `${message.substring(0, 60)}...` : message,
          timestamp: event.created_at,
          type,
        };
      });
  } catch (error) {
    console.error("Error fetching GitHub activity:", error);
    return getFallbackActivity();
  }
}

function getFallbackProjects(): Project[] {
  return [
    {
      id: "nexus-dashboard",
      name: "nexus-dashboard",
      description:
        "A minimalist personal dashboard inspired by Glance, built with modern web technologies.",
      technologies: ["TypeScript", "Next.js", "Tailwind CSS"],
      stars: 0,
      forks: 0,
      githubUrl: "#",
      featured: true,
      language: "TypeScript",
      topics: ["dashboard", "nextjs"],
      updatedAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
    },
  ];
}

function getFallbackActivity(): RecentActivity[] {
  return [
    {
      id: "1",
      repo: "nexus-dashboard",
      message: "Initial commit - Set up project structure",
      timestamp: new Date().toISOString(),
      type: "commit",
    },
  ];
}

export async function fetchLanguageStats(): Promise<LanguageStats> {
  try {
    const repos = await fetchGitHubRepos();
    const languageStats: LanguageStats = {};

    // Count languages from repositories
    repos.forEach((repo) => {
      if (repo.language) {
        languageStats[repo.language] = (languageStats[repo.language] || 0) + 1;
      }
    });

    return languageStats;
  } catch (error) {
    console.error("Error fetching language stats:", error);
    // Return fallback data
    return {
      TypeScript: 5,
      JavaScript: 3,
      Python: 2,
      CSS: 1,
    };
  }
}

export async function fetchCommitActivity(): Promise<CommitData[]> {
  try {
    // Get user's repositories first
    const repos = await fetchGitHubRepos();
    const commitsByDate: { [key: string]: number } = {};
    
    // Calculate date range for last 6 months
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
    const since = sixMonthsAgo.toISOString();
    
    // Fetch commits from all repositories in parallel
    const commitPromises = repos.slice(0, 10).map(async (repo) => {
      try {
        const response = await fetch(
          `${GITHUB_API_BASE}/repos/${GITHUB_USERNAME}/${repo.name}/commits?since=${since}&per_page=100`,
          {
            headers: githubHeaders,
            next: { revalidate: 3600 }, // Cache for 1 hour
          }
        );
        
        if (response.ok) {
          const commits = await response.json();
          return commits.map((commit: { commit: { author: { date: string } } }) => ({
            date: new Date(commit.commit.author.date).toISOString().split("T")[0],
            repo: repo.name,
          }));
        }
        return [];
      } catch (error) {
        console.error(`Error fetching commits for ${repo.name}:`, error);
        return [];
      }
    });

    // Wait for all commit data and aggregate
    const allCommits = (await Promise.all(commitPromises)).flat();
    
    // Group commits by date
    allCommits.forEach((commit) => {
      commitsByDate[commit.date] = (commitsByDate[commit.date] || 0) + 1;
    });

    // Convert to array format and sort by date
    return Object.entries(commitsByDate)
      .map(([date, commits]) => ({
        date,
        commits,
      }))
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
      
  } catch (error) {
    console.error("Error fetching commit activity:", error);
    // Return fallback data with realistic pattern
    const fallbackData: CommitData[] = [];
    const now = new Date();
    for (let i = 180; i >= 0; i -= 7) { // Weekly data points over 6 months
      const date = new Date(now);
      date.setDate(now.getDate() - i);
      // Simulate realistic commit patterns (more commits on weekdays)
      const isWeekday = date.getDay() >= 1 && date.getDay() <= 5;
      const commitCount = isWeekday ? Math.floor(Math.random() * 5) + 1 : Math.floor(Math.random() * 2);
      fallbackData.push({
        date: date.toISOString().split("T")[0],
        commits: commitCount,
      });
    }
    return fallbackData;
  }
}
