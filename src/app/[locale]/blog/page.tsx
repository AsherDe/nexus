import Navigation from "@/components/Navigation";
import BlogList from "@/components/BlogList";
import { getAllPosts } from "@/lib/blog";

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="page-container animate-entrance">
      <Navigation />
      <main>
        <BlogList posts={posts} />
      </main>
    </div>
  );
}
