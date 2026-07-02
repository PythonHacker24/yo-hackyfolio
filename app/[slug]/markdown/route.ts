import { getPost, posts } from "../../data/posts";
import { postToMarkdown } from "../../data/postHelpers";

/** Pre-render the markdown endpoint for every post at build time. */
export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

/**
 * Serves a post as raw markdown. Reached at /<slug>/markdown, or via
 * /<slug>?format=markdown (rewritten by middleware.ts) — the agent-friendly
 * version of the post.
 */
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) {
    return new Response("Not found", { status: 404 });
  }
  return new Response(postToMarkdown(post), {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
    },
  });
}
