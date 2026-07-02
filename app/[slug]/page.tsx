import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Sparkles } from "lucide-react";

import { ThemeToggle } from "../components/ThemeToggle";
import { Inline } from "../components/RichText";
import { CopyEssayButton } from "../components/essay/CopyEssayButton";
import { getPost, posts } from "../data/posts";
import { chatGptUrl, postToMarkdown, readingTime } from "../data/postHelpers";

/** Pre-render every post at build time. */
export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return { title: post.title, description: post.description };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  return (
    <div className="relative flex min-h-screen flex-col items-center bg-white dark:bg-black px-3 pt-16 text-black dark:text-white selection:bg-black dark:selection:bg-white selection:text-white dark:selection:text-black pb-32 sm:px-4 sm:pt-24 sm:pb-40 overflow-x-hidden transition-colors duration-300">
      {/* Theme Toggle in Top Right */}
      <div className="fixed top-6 right-6 z-50">
        <ThemeToggle />
      </div>

      <main className="flex w-full max-w-2xl flex-col text-left">
        {/* Header */}
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400 transition-colors hover:text-black dark:hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" /> Back to portfolio
        </Link>

        <span className="mb-3 text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500">
          {post.kicker}
        </span>
        <h1 className="mb-6 text-3xl font-bold tracking-tight sm:text-4xl">
          {post.title}
        </h1>
        <div className="mb-12 flex flex-wrap items-center gap-x-4 gap-y-3">
          <span className="text-sm text-gray-500 dark:text-gray-400">{readingTime(post)}</span>
          <div className="h-4 w-px bg-gray-200 dark:bg-zinc-700" />
          <CopyEssayButton text={postToMarkdown(post)} />
          <a
            href={chatGptUrl(post)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 dark:border-zinc-700 px-3 py-1.5 text-xs font-semibold text-gray-700 dark:text-gray-300 transition-colors hover:border-black hover:text-black dark:hover:border-white dark:hover:text-white"
          >
            <Sparkles className="h-3.5 w-3.5" /> Ask ChatGPT about this
            <ArrowUpRight className="h-3 w-3" />
          </a>
        </div>

        {/* Body */}
        <article className="space-y-5 text-base leading-relaxed text-gray-600 dark:text-gray-400">
          {post.blocks.map((block, i) => {
            if (block.type === "h2") {
              return (
                <h2
                  key={i}
                  className="pt-6 text-sm font-bold uppercase tracking-widest text-gray-700 dark:text-gray-300"
                >
                  {block.text}
                </h2>
              );
            }
            if (block.type === "list") {
              return (
                <ul key={i} className="list-disc list-inside space-y-1 pl-2">
                  {block.items.map((item, j) => (
                    <li key={j}>
                      <Inline text={item} />
                    </li>
                  ))}
                </ul>
              );
            }
            return (
              <p key={i}>
                <Inline text={block.text} />
              </p>
            );
          })}
        </article>
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
