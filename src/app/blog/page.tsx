import { format } from "date-fns";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import { getAllPosts } from "@/lib/blog";

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="page-container animate-entrance">
      <header>
        <div className="mb-8">
          <h1 className="text-2xl font-semibold mb-2">Blog - The Library</h1>
          <p className="text-base text-color-text-subdue">
            Knowledge sharing and thoughts on development, design, and
            technology
          </p>
        </div>
        <Navigation />
      </header>

      <main className="max-w-4xl">
        {posts.length === 0 ? (
          <div className="widget text-center py-12">
            <p className="text-lg mb-4">No blog posts yet</p>
            <p className="text-sm text-color-text-subdue">
              Create your first post by adding a markdown file to the{" "}
              <code>src/posts</code> directory.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {posts.map((post) => (
              <Link key={post.id} href={`/blog/${post.id}`}>
                <article className="card cursor-pointer">
                  <h2 className="card-title">{post.title}</h2>

                  <div className="card-meta">
                    {format(new Date(post.date), "MMMM d, yyyy")} •
                    {post.readingTime} min read •{post.language?.toUpperCase()}
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
      </main>
    </div>
  );
}
