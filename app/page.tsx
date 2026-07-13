"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import { QRCodeSVG } from "qrcode.react";
import { QrCode, X, User, Bot, Code2, ArrowUpRight, Copy, Check } from "lucide-react";

import { ThemeToggle } from "./components/ThemeToggle";
import { Reveal } from "./components/Reveal";
import { Icon } from "./components/icons";
import { SectionRenderer, type PortfolioData } from "./components/sections/registry";
import { WaterOverlay } from "./components/WaterImage";
import { generateMarkdown } from "./data/generateMarkdown";
import portfolioJson from "./data/portfolio.json";

const portfolio = portfolioJson as unknown as PortfolioData;

export default function Home() {
  const [time, setTime] = useState<string>("");
  const [showQR, setShowQR] = useState(false);
  const [mode, setMode] = useState<"human" | "agent">("human");
  const [copied, setCopied] = useState(false);
  const { resolvedTheme } = useTheme();

  // Hold the navbar entrance until its water shader is rendering, so it never
  // pops in half-drawn. The timeout is a fallback for browsers without WebGL.
  const [navReady, setNavReady] = useState(false);
  useEffect(() => {
    const fallback = setTimeout(() => setNavReady(true), 1600);
    return () => clearTimeout(fallback);
  }, []);

  const copyMarkdown = async () => {
    await navigator.clipboard.writeText(markdownContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Single clock, shared by the hero display and the agent-mode markdown.
  const tz = portfolio.sections.find((s) => s.type === "hero")?.data.timezone.tz ?? "Asia/Kolkata";
  useEffect(() => {
    const updateTime = () => {
      setTime(
        new Date().toLocaleTimeString("en-IN", {
          timeZone: tz,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        })
      );
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, [tz]);

  const markdownContent = useMemo(() => generateMarkdown(portfolio, time), [time]);

  return (
    <div className="relative flex min-h-screen flex-col items-center bg-white dark:bg-black px-3 pt-16 text-black dark:text-white selection:bg-black dark:selection:bg-white selection:text-white dark:selection:text-black pb-32 sm:px-4 sm:pt-24 sm:pb-40 overflow-x-hidden transition-colors duration-300">
      {/* Theme Toggle in Top Right */}
      <div className="fixed top-6 right-6 z-50">
        <ThemeToggle />
      </div>

      {/* Open-source badge, tucked in the lower-right corner */}
      <Link
        href="/docs"
        title="This portfolio is open source. Build your own with JSON using your AI editor. Read the docs."
        className="group fixed bottom-24 right-4 z-40 inline-flex items-center gap-1.5 rounded-full border border-gray-200 dark:border-zinc-700 bg-white/70 dark:bg-zinc-900/80 px-2.5 py-2 text-xs font-medium text-gray-500 shadow-sm backdrop-blur-md transition-colors hover:text-black dark:text-gray-400 dark:hover:text-white sm:bottom-6 sm:right-6 sm:px-3"
      >
        <Code2 className="h-4 w-4" />
        <span className="hidden sm:inline">Open source</span>
        <ArrowUpRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </Link>

      <AnimatePresence mode="wait">
        {mode === "agent" ? (
          /* Agent Mode - Markdown View */
          <motion.main
            key="agent"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="flex w-full max-w-2xl flex-col items-start text-left px-4 sm:px-0"
          >
            <button
              onClick={copyMarkdown}
              className="mb-6 inline-flex items-center gap-2 rounded-lg bg-black px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:opacity-80 active:scale-95 dark:bg-white dark:text-black"
            >
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              {copied ? "Copied!" : "Copy Markdown"}
            </button>
            <pre className="w-full whitespace-pre-wrap font-sans text-sm leading-relaxed text-black dark:text-gray-300 selection:bg-black dark:selection:bg-white selection:text-white dark:selection:text-black antialiased">
              {markdownContent}
            </pre>
          </motion.main>
        ) : (
          /* Human Mode - Data-driven sections */
          <motion.main
            key="human"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="flex w-full max-w-2xl flex-col items-center text-center"
          >
            {/* Featured pill: small, first thing seen, links to the featured page */}
            {portfolio.meta.featured && (
              <Reveal delay={0} className="mb-10">
                <Link
                  href={portfolio.meta.featured.href}
                  className="group inline-flex max-w-full items-center gap-2 rounded-full border border-gray-200 dark:border-zinc-700 bg-white/70 dark:bg-zinc-900/80 py-1.5 pl-1.5 pr-3 shadow-sm backdrop-blur-md transition-all hover:-translate-y-0.5 hover:bg-white/90 dark:hover:bg-zinc-900"
                >
                  <span className="rounded-full bg-black dark:bg-white px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-white dark:text-black">
                    {portfolio.meta.featured.tag}
                  </span>
                  <span className="truncate text-sm font-medium text-gray-600 dark:text-gray-300 transition-colors group-hover:text-black dark:group-hover:text-white">
                    {portfolio.meta.featured.title}
                  </span>
                  <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-gray-400 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-black dark:group-hover:text-white" />
                </Link>
              </Reveal>
            )}

            {portfolio.sections.map((section, i) => (
              <Reveal
                key={i}
                delay={section.type === "hero" ? 0 : 0.05}
                className={section.type === "hero" ? "flex flex-col items-center" : ""}
              >
                <SectionRenderer section={section} ctx={{ time, socials: portfolio.socials }} />
              </Reveal>
            ))}
          </motion.main>
        )}
      </AnimatePresence>

      {/* Glass Island Navbar */}
      <motion.nav
        initial={{ opacity: 0, y: 60, scale: 0.8, x: "-50%" }}
        animate={navReady ? { opacity: 1, y: 0, scale: 1, x: "-50%" } : { opacity: 0, y: 60, scale: 0.8, x: "-50%" }}
        transition={{ type: "spring", stiffness: 260, damping: 15 }}
        className="fixed bottom-6 left-1/2 flex items-center gap-3 overflow-hidden rounded-full border border-gray-200 dark:border-zinc-700 bg-white/70 dark:bg-zinc-900/80 px-4 py-3 shadow-sm backdrop-blur-md transition-colors hover:bg-white/90 dark:hover:bg-zinc-900 sm:gap-6 sm:px-6"
      >
        {/* Glass shine — edge highlight replays on load and on theme toggle
            (the key change remounts the span, restarting the CSS animation) */}
        <span
          key={resolvedTheme}
          aria-hidden
          className="nav-edge-shine pointer-events-none absolute inset-0 -z-10 rounded-full"
        />
        {/* Water surface behind the icons — bluish on white, slate on dark */}
        <WaterOverlay
          colorHighlight={resolvedTheme === "dark" ? "#475569" : "#2563eb"}
          highlights={resolvedTheme === "dark" ? 0.22 : 0.45}
          onReady={() => setNavReady(true)}
        />
        {/* Mode Toggle Switch */}
        <div className="flex items-center">
          <button
            onClick={() => setMode(mode === "human" ? "agent" : "human")}
            className="group relative flex h-7 w-12 cursor-pointer rounded-full bg-gray-200 dark:bg-zinc-700 p-1 transition-colors duration-200 ease-in-out hover:bg-gray-300 dark:hover:bg-zinc-600 focus:outline-none"
            role="switch"
            aria-checked={mode === "agent"}
            title={`Switch to ${mode === "human" ? "agent" : "human"} mode`}
          >
            <div
              className={`flex h-5 w-5 transform items-center justify-center rounded-full bg-white dark:bg-white shadow-sm transition duration-200 ease-in-out ${
                mode === "agent" ? "translate-x-5" : "translate-x-0"
              }`}
            >
              {mode === "human" ? (
                <User className="h-3 w-3 text-black" />
              ) : (
                <Bot className="h-3 w-3 text-black" />
              )}
            </div>
          </button>
        </div>
        <button
          onClick={() => setShowQR(true)}
          className="text-gray-500 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors hover:scale-110"
          aria-label="Show QR Code"
        >
          <QrCode className="h-5 w-5" />
        </button>
        <div className="h-6 w-px bg-gray-200 dark:bg-zinc-700" />
        {portfolio.socials.map((social) => (
          <a
            key={social.label}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={social.label}
            className="text-gray-500 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors hover:scale-110"
          >
            <Icon name={social.icon} className="h-5 w-5" />
          </a>
        ))}
        <a
          href={portfolio.meta.calendarUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Calendar"
          className="text-gray-500 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors hover:scale-110"
        >
          <Icon name="calendar" className="h-5 w-5" />
        </a>
      </motion.nav>

      {/* QR Code Modal */}
      {showQR && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/20 dark:bg-white/5 backdrop-blur-sm"
          onClick={() => setShowQR(false)}
        >
          <div
            className="relative rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-black p-8 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowQR(false)}
              className="absolute -right-3 -top-3 rounded-full bg-black dark:bg-white p-2 text-white dark:text-black transition-transform hover:scale-110"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>
            <div className="rounded-lg bg-white p-2">
              {/* The QR link carries the current theme, so scans open in the same look */}
              <QRCodeSVG
                value={`${portfolio.meta.siteUrl}?theme=${resolvedTheme === "dark" ? "dark" : "light"}`}
                size={200}
                level="H"
                includeMargin={false}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
