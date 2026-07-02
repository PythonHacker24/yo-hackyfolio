"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { AnimatedThemeToggler } from "./ui/animated-theme-toggler";

export function ThemeToggle() {
    const { resolvedTheme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return <div className="h-9 w-9 rounded-full animate-pulse bg-gray-100 dark:bg-gray-800" />;
    }

    return (
        <AnimatedThemeToggler
            theme={resolvedTheme === "dark" ? "dark" : "light"}
            onThemeChange={(t) => {
                setTheme(t);
                // Keep a shared ?theme= link honest: toggling updates the param
                const url = new URL(window.location.href);
                if (url.searchParams.has("theme")) {
                    url.searchParams.set("theme", t);
                    window.history.replaceState(null, "", url);
                }
            }}
            className="rounded-full p-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors [&_svg]:h-5 [&_svg]:w-5"
            variant="circle"
        />
    );
}
