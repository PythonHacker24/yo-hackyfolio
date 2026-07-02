import { NextResponse, type NextRequest } from "next/server";

/**
 * /starter-advice?format=markdown serves the essay as a raw markdown file
 * (for AI agents and sharing) by rewriting to the markdown route handler.
 * Every other request passes through untouched.
 */
export function middleware(request: NextRequest) {
  if (request.nextUrl.searchParams.get("format") === "markdown") {
    return NextResponse.rewrite(new URL("/starter-advice/markdown", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: "/starter-advice",
};
