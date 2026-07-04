/**
 * Every blog post / essay on the site, as pure content.
 *
 * ADDING A POST = append one object to the `posts` array in `portfolio.json`.
 * No component, route, or middleware edits are needed — the dynamic `/[slug]`
 * route, the markdown endpoint, reading time, and the "Ask ChatGPT" prompt are
 * all derived from this data (see `postHelpers.ts`). This file only provides
 * the types and lookup helpers.
 *
 * A post's `blocks` use the same idea as the portfolio's rich text:
 *   { type: "p",    text: "A paragraph with **bold** and [links](https://...)." }
 *   { type: "h2",   text: "A section heading" }
 *   { type: "list", items: ["First bullet", "Second **bold** bullet"] }
 */

import portfolio from "./portfolio.json";

export type PostBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "list"; items: string[] };

export interface Post {
  /** URL slug — the post lives at /<slug>. Keep it lowercase-kebab-case. */
  slug: string;
  /** Small uppercase label shown above the title (e.g. "Essay", "Notes"). */
  kicker: string;
  /** The post title (also the <h1> and the <title> tag). */
  title: string;
  /** Meta description for SEO / link previews. */
  description: string;
  /** ISO date (YYYY-MM-DD) — used for ordering and display. */
  date: string;
  /** The post body. */
  blocks: PostBlock[];
}

export const posts: Post[] = portfolio.posts as Post[];

/** Look up a single post by slug. */
export function getPost(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}

/** All posts, newest first — used by listings. */
export function getSortedPosts(): Post[] {
  return [...posts].sort((a, b) => (a.date < b.date ? 1 : -1));
}
