import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const postsDirectory = path.join(process.cwd(), "src/posts");

export interface BlogPost {
  id: string;
  title: string;
  date: string;
  excerpt?: string;
  content: string;
  language?: string;
  tags?: string[];
  readingTime?: number;
}

export interface BlogPostMeta {
  id: string;
  title: string;
  date: string;
  excerpt?: string;
  language?: string;
  tags?: string[];
  readingTime?: number;
}

function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}

function ensurePostsDirectory() {
  if (!fs.existsSync(postsDirectory)) {
    fs.mkdirSync(postsDirectory, { recursive: true });
  }
}

export function getAllPostIds(): string[] {
  ensurePostsDirectory();

  try {
    const fileNames = fs.readdirSync(postsDirectory);
    return fileNames
      .filter((name) => name.endsWith(".md"))
      .map((fileName) => fileName.replace(/\.md$/, ""));
  } catch (_error) {
    console.warn("Posts directory not found or empty, returning empty array");
    return [];
  }
}

export async function getPostData(id: string): Promise<BlogPost> {
  const fullPath = path.join(postsDirectory, `${id}.md`);

  if (!fs.existsSync(fullPath)) {
    throw new Error(`Post with id "${id}" not found`);
  }

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const matterResult = matter(fileContents);

  const processedContent = await remark()
    .use(html, { sanitize: false })
    .process(matterResult.content);

  const contentHtml = processedContent.toString();
  const readingTime = calculateReadingTime(matterResult.content);

  return {
    id,
    content: contentHtml,
    title: matterResult.data.title || "Untitled",
    date: matterResult.data.date || new Date().toISOString(),
    excerpt: matterResult.data.excerpt,
    language: matterResult.data.language || "en",
    tags: matterResult.data.tags || [],
    readingTime,
  };
}

export function getAllPosts(): BlogPostMeta[] {
  ensurePostsDirectory();

  const allPostIds = getAllPostIds();
  const allPosts = allPostIds.map((id) => {
    const fullPath = path.join(postsDirectory, `${id}.md`);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const matterResult = matter(fileContents);

    const readingTime = calculateReadingTime(matterResult.content);

    return {
      id,
      title: matterResult.data.title || "Untitled",
      date: matterResult.data.date || new Date().toISOString(),
      excerpt: matterResult.data.excerpt,
      language: matterResult.data.language || "en",
      tags: matterResult.data.tags || [],
      readingTime,
    } as BlogPostMeta;
  });

  return allPosts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostsByLanguage(language: string): BlogPostMeta[] {
  return getAllPosts().filter((post) => post.language === language);
}

export function getPostsByTag(tag: string): BlogPostMeta[] {
  return getAllPosts().filter((post) => post.tags?.includes(tag));
}

export function getAllTags(): string[] {
  const allPosts = getAllPosts();
  const tags = new Set<string>();

  for (const post of allPosts) {
    if (post.tags) {
      for (const tag of post.tags) {
        tags.add(tag);
      }
    }
  }

  return Array.from(tags).sort();
}
