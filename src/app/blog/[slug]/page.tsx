import Link from 'next/link';
import { notFound } from 'next/navigation';
import Navigation from '@/components/Navigation';
import { getAllPostIds, getPostData } from '@/lib/blog';
import { format } from 'date-fns';

interface Params {
  slug: string;
}

export async function generateStaticParams() {
  const postIds = getAllPostIds();
  return postIds.map((id) => ({
    slug: id,
  }));
}

export default async function BlogPost({ params }: { params: Params }) {
  try {
    const post = await getPostData(params.slug);

    return (
      <div className="page-container animate-entrance">
        <header>
          <Navigation />
        </header>

        <main className="max-w-4xl">
          <Link 
            href="/blog" 
            className="inline-flex items-center gap-2 mb-8 text-sm text-color-text-subdue hover:text-color-primary transition-colors"
          >
            ← Back to Blog
          </Link>

          <article className="space-y-6">
            <header className="space-y-4">
              <h1 className="text-3xl font-bold leading-tight">{post.title}</h1>
              
              <div className="flex items-center gap-4 text-sm text-color-text-subdue">
                <time dateTime={post.date}>
                  {format(new Date(post.date), 'MMMM d, yyyy')}
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

            <div 
              className="prose prose-invert max-w-none"
              dangerouslySetInnerHTML={{ __html: post.content }}
              style={{
                '--tw-prose-body': 'var(--color-text-paragraph)',
                '--tw-prose-headings': 'var(--color-text-highlight)',
                '--tw-prose-lead': 'var(--color-text-paragraph)',
                '--tw-prose-links': 'var(--color-primary)',
                '--tw-prose-bold': 'var(--color-text-highlight)',
                '--tw-prose-counters': 'var(--color-text-subdue)',
                '--tw-prose-bullets': 'var(--color-text-subdue)',
                '--tw-prose-hr': 'var(--color-separator)',
                '--tw-prose-quotes': 'var(--color-text-paragraph)',
                '--tw-prose-quote-borders': 'var(--color-separator)',
                '--tw-prose-captions': 'var(--color-text-subdue)',
                '--tw-prose-code': 'var(--color-text-highlight)',
                '--tw-prose-pre-code': 'var(--color-text-paragraph)',
                '--tw-prose-pre-bg': 'var(--color-widget-background)',
                '--tw-prose-th-borders': 'var(--color-separator)',
                '--tw-prose-td-borders': 'var(--color-separator)',
              } as React.CSSProperties}
            />
          </article>

          <footer className="mt-12 pt-8 border-t border-color-separator">
            <Link 
              href="/blog" 
              className="inline-flex items-center gap-2 text-sm text-color-text-subdue hover:text-color-primary transition-colors"
            >
              ← Back to all posts
            </Link>
          </footer>
        </main>
      </div>
    );
  } catch (error) {
    console.error('Error loading blog post:', error);
    notFound();
  }
}