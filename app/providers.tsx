"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { Suspense, useEffect, useState } from "react";

import { ThemeFromQuery } from "./components/ThemeFromQuery";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return <>{children}</>;
    }

    return (
        <NextThemesProvider attribute="class" defaultTheme="system" enableSystem={true}>
            <Suspense fallback={null}>
                <ThemeFromQuery />
            </Suspense>
            {children}
        </NextThemesProvider>
    );
}
