"use client";

import { useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { useTheme } from "next-themes";

/**
 * Applies ?theme=dark or ?theme=light from the URL, so links can be shared
 * pinned to a specific theme. Any other value is ignored. Must be rendered
 * inside the NextThemesProvider and a Suspense boundary (useSearchParams).
 *
 * The lastApplied guard makes this apply only when the param VALUE changes —
 * never on unrelated re-renders — so the user's theme toggle isn't overridden
 * while the old param is still in the URL (ThemeToggle updates the param).
 */
export function ThemeFromQuery() {
  const searchParams = useSearchParams();
  const { setTheme } = useTheme();
  const theme = searchParams.get("theme");
  const lastApplied = useRef<string | null>(null);

  useEffect(() => {
    if ((theme === "dark" || theme === "light") && lastApplied.current !== theme) {
      lastApplied.current = theme;
      setTheme(theme);
    }
  }, [theme, setTheme]);

  return null;
}
