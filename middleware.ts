import { NextResponse, type NextRequest } from "next/server";
import { posts } from "./app/data/posts";

const POST_SLUGS = new Set(posts.map((p) => p.slug));

/**
 * /<slug>?format=markdown serves a post as a raw markdown file (for AI agents
 * and sharing) by rewriting to the post's markdown route handler. Only applies
 * to real post slugs; every other request passes through untouched.
 */
export function middleware(request: NextRequest) {
  if (request.nextUrl.searchParams.get("format") === "markdown") {
    const slug = request.nextUrl.pathname.replace(/^\/+|\/+$/g, "");
    if (POST_SLUGS.has(slug)) {
      return NextResponse.rewrite(new URL(`/${slug}/markdown`, request.url));
    }
  }
  return NextResponse.next();
}

export const config = {
  /** Skip Next internals and static assets; run on everything else. */
  matcher: "/((?!_next/|api/|.*\\..*).*)",
};
