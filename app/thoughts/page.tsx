import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";

import { ThemeToggle } from "../components/ThemeToggle";
import { getSortedPosts } from "../data/posts";
import { readingTime } from "../data/postHelpers";

export const metadata: Metadata = {
  title: "Thoughts",
  description: "Essays and notes by Aditya Patil.",
};

export default function ThoughtsPage() {
  const posts = getSortedPosts();

  return (
    <div className="relative flex min-h-screen flex-col items-center bg-white dark:bg-black px-3 pt-16 text-black dark:text-white selection:bg-black dark:selection:bg-white selection:text-white dark:selection:text-black pb-32 sm:px-4 sm:pt-24 sm:pb-40 overflow-x-hidden transition-colors duration-300">
      {/* Theme Toggle in Top Right */}
      <div className="fixed top-6 right-6 z-50">
        <ThemeToggle />
      </div>

      <main className="flex w-full max-w-2xl flex-col text-left">
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400 transition-colors hover:text-black dark:hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" /> Back to portfolio
        </Link>

        <span className="mb-3 text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500">
          Thoughts
        </span>
        <h1 className="mb-12 text-3xl font-bold tracking-tight sm:text-4xl">
          Essays &amp; notes
        </h1>

        <div className="grid gap-4">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/${post.slug}`}
              className="group block rounded-xl border border-gray-200 dark:border-gray-800 p-6 transition-all hover:-translate-y-0.5 hover:border-gray-300 dark:hover:border-gray-700 hover:shadow-sm"
            >
              <div className="mb-2 flex items-center gap-3 text-xs font-medium text-gray-400 dark:text-gray-500">
                <span className="uppercase tracking-widest">{post.kicker}</span>
                <span className="h-1 w-1 rounded-full bg-gray-300 dark:bg-gray-700" />
                <span>{readingTime(post)}</span>
              </div>
              <div className="mb-2 flex items-start justify-between gap-3">
                <span className="text-lg font-semibold text-black dark:text-white">{post.title}</span>
                <ArrowUpRight className="mt-1 h-4 w-4 shrink-0 text-gray-400 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-black dark:group-hover:text-white" />
              </div>
              <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                {post.description}
              </p>
            </Link>
          ))}
        </div>
      </main>

      {/* Bottom island nav, matching the portfolio */}
      <nav className="fixed bottom-6 left-1/2 flex -translate-x-1/2 items-center gap-4 rounded-full border border-gray-200 dark:border-zinc-700 bg-white/70 dark:bg-zinc-900/80 px-5 py-3 shadow-sm backdrop-blur-md transition-all hover:bg-white/90 dark:hover:bg-zinc-900">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-500 dark:text-gray-300 transition-colors hover:text-black dark:hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" /> Portfolio
        </Link>
      </nav>
    </div>
  );
}
