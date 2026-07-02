import portfolioJson from "./portfolio.json";
import type { Post } from "./posts";

/**
 * Everything derived from a post's content lives here, so `posts.ts` stays pure
 * content and the page/route/markdown views can never drift from each other.
 */

const SITE = portfolioJson.meta.siteUrl.replace(/\/$/, "");

/** Canonical page URL for a post, e.g. https://site.com/starter-advice */
export function postUrl(post: Post): string {
  return `${SITE}/${post.slug}`;
}

/** Raw-markdown URL for a post (served via ?format=markdown). */
export function postMarkdownUrl(post: Post): string {
  return `${postUrl(post)}?format=markdown`;
}

/** The post rendered as plain markdown — what "copy" and the markdown route emit. */
export function postToMarkdown(post: Post): string {
  return [
    `# ${post.title}`,
    ...post.blocks.map((block) => {
      if (block.type === "h2") return `### ${block.text}`;
      if (block.type === "list") return block.items.map((i) => `* ${i}`).join("\n");
      return block.text;
    }),
  ].join("\n\n");
}

/** Estimated reading time, e.g. "4 min read". */
export function readingTime(post: Post): string {
  const words = postToMarkdown(post).split(/\s+/).length;
  return `${Math.max(1, Math.round(words / 200))} min read`;
}

/**
 * "Ask ChatGPT about this" deep-link. Points ChatGPT at the markdown version of
 * the post and asks it to summarize, then help the reader apply it.
 */
export function chatGptUrl(post: Post): string {
  const prompt = `Fetch and read this: ${postMarkdownUrl(post)} - it's "${post.title}" by Aditya Patil, served as plain markdown.

Start your first reply with a short summary in a few bullet points. Then ask me follow-up questions to help me apply it to my own situation, and answer anything else I ask about it. Keep it practical and specific.`;
  return `https://chatgpt.com/?q=${encodeURIComponent(prompt)}`;
}
