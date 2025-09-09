import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";

const postsDirectory = path.join(process.cwd(), "src/posts");

export interface BlogPost {
  id: string;
  title: string;
  date: string;
  excerpt?: string;
  content: MDXRemoteSerializeResult;
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

// MDX serialization options
const mdxOptions = {
  mdxOptions: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
  scope: {},
  parseFrontmatter: false, // We handle frontmatter separately with gray-matter
};

export function getAllPostIds(): string[] {
  ensurePostsDirectory();

  try {
    const fileNames = fs.readdirSync(postsDirectory);
    return fileNames
      .filter((name) => name.endsWith(".md") || name.endsWith(".mdx"))
      .map((fileName) => fileName.replace(/\.(md|mdx)$/, ""));
  } catch (_error) {
    console.warn("Posts directory not found or empty, returning empty array");
    return [];
  }
}

export async function getPostData(id: string): Promise<BlogPost> {
  // Try both .md and .mdx extensions
  let fullPath = path.join(postsDirectory, `${id}.mdx`);
  if (!fs.existsSync(fullPath)) {
    fullPath = path.join(postsDirectory, `${id}.md`);
  }

  if (!fs.existsSync(fullPath)) {
    throw new Error(`Post with id "${id}" not found`);
  }

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const matterResult = matter(fileContents);

  // Serialize the markdown/MDX content for rendering
  const mdxSource = await serialize(matterResult.content, mdxOptions);
  const readingTime = calculateReadingTime(matterResult.content);

  return {
    id,
    content: mdxSource,
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
    // Try both .mdx and .md extensions
    let fullPath = path.join(postsDirectory, `${id}.mdx`);
    if (!fs.existsSync(fullPath)) {
      fullPath = path.join(postsDirectory, `${id}.md`);
    }
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
