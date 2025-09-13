import { format } from "date-fns";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import Navigation from "@/components/Navigation";
import TerminalDownloader from "@/components/TerminalDownloader";
import TableOfContents from "@/components/TableOfContents";
import { H1, H2, H3, H4, H5, H6 } from "@/components/BlogHeadings";
import { getAllPostIds, getPostData } from "@/lib/blog";

interface Params {
  slug: string;
}

export async function generateStaticParams() {
  const postIds = getAllPostIds();
  return postIds.map((id) => ({
    slug: id,
  }));
}

export default async function BlogPost({
  params,
}: {
  params: Promise<Params>;
}) {
  try {
    const { slug } = await params;
    const post = getPostData(slug);

    return (
      <div className="page-container animate-entrance">
        <header>
          <Navigation />
        </header>

        <main className="max-w-7xl mx-auto px-4">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 mb-8 text-sm text-color-text-subdue hover:text-color-primary transition-colors"
          >
            ← Back to Blog
          </Link>

          <div className="flex gap-8">
            {/* Table of Contents Sidebar */}
            <aside className="hidden lg:block w-64 flex-shrink-0">
              <TableOfContents content={post.content} />
            </aside>

            {/* Main Content */}
            <div className="flex-1 min-w-0">
              <article className="space-y-6 max-w-4xl">
                <header className="space-y-4">
                  <h1 className="text-3xl font-bold leading-tight">
                    {post.title}
                  </h1>

                  <div className="flex items-center gap-4 text-sm text-color-text-subdue">
                    <time dateTime={post.date}>
                      {format(new Date(post.date), "MMMM d, yyyy")}
                    </time>
                    <span>•</span>
                    <span>{post.readingTime} min read</span>
                    {post.language && (
                      <>
                        <span>•</span>
                        <span>{post.language.toUpperCase()}</span>
                      </>
                    )}
                  </div>

                  {post.tags && post.tags.length > 0 && (
                    <div className="flex gap-2">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 text-xs bg-color-separator rounded text-color-text-base"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </header>

                <div className="h-px bg-color-separator"></div>

                <div className="prose prose-invert max-w-none">
                  <MDXRemote
                    source={post.content}
                    components={{
                      TerminalDownloader,
                      h1: H1,
                      h2: H2,
                      h3: H3,
                      h4: H4,
                      h5: H5,
                      h6: H6,
                    }}
                  />
                </div>
              </article>

              <footer className="mt-12 pt-8 border-t border-color-separator max-w-4xl">
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-2 text-sm text-color-text-subdue hover:text-color-primary transition-colors"
                >
                  ← Back to all posts
                </Link>
              </footer>
            </div>
          </div>
        </main>
      </div>
    );
  } catch (error) {
    console.error("Error loading blog post:", error);
    notFound();
  }
}
