import { ESSAY_MARKDOWN } from "../content";

/**
 * Serves the essay as raw markdown. Reached directly at
 * /starter-advice/markdown, or via /starter-advice?format=markdown
 * (rewritten here by middleware.ts) — the agent-friendly version of the essay.
 */
export function GET() {
  return new Response(ESSAY_MARKDOWN, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
    },
  });
}
