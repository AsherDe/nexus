"use client";

import { useState } from "react";
import { format } from "date-fns";
import Link from "next/link";
import { useScopedI18n, useCurrentLocale } from "@/locales/client";
import type { BlogPostMeta } from "@/lib/blog";

interface BlogListProps {
  posts: BlogPostMeta[];
}

export default function BlogList({ posts }: BlogListProps) {
  const t = useScopedI18n("blog");
  const locale = useCurrentLocale();
  const [showAllLanguages, setShowAllLanguages] = useState(false);

  const filteredPosts = showAllLanguages
    ? posts
    : posts.filter((post) => post.language === locale);

  return (
    <div>
      {posts.length > 0 && (
        <div className="mb-6">
          <label className="flex items-center gap-2 text-sm cursor-pointer">
            <input
              type="checkbox"
              checked={showAllLanguages}
              onChange={(e) => setShowAllLanguages(e.target.checked)}
              className="rounded"
            />
            <span className="text-body">
              {showAllLanguages
                ? t("showAllLanguages")
                : t("currentLanguageOnly")}
            </span>
          </label>
        </div>
      )}

      {filteredPosts.length === 0 ? (
        <div className="widget text-center py-12">
          <p className="text-lg mb-4">No blog posts yet</p>
          <p className="text-sm text-color-text-subdue">
            Create your first post by adding a markdown file to the{" "}
            <code>src/posts</code> directory.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {filteredPosts.map((post) => (
            <Link key={post.id} href={`/blog/${post.id}`}>
              <article className="card-color-only cursor-pointer">
                <h2 className="card-title">{post.title}</h2>

                <div className="card-meta">
                  {format(new Date(post.date), "MMMM d, yyyy")} •{" "}
                  {post.readingTime} {t("readingTime")} •{" "}
                  {post.language?.toUpperCase()}
                  {post.tags && post.tags.length > 0 && (
                    <div className="flex gap-2 mt-2">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 text-xs bg-color-separator rounded text-color-text-base"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {post.excerpt && (
                  <p className="text-sm text-color-text-paragraph leading-relaxed">
                    {post.excerpt}
                  </p>
                )}
              </article>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
