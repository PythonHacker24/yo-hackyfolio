import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { ThemeProvider } from "./providers";
import portfolio from "./data/portfolio.json";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(portfolio.meta.siteUrl),
  title: "Aditya Patil",
  description: "All about me",
  openGraph: {
    title: "Aditya Patil",
    description: "Explore Aditya's World",
    url: "/",
    siteName: "Aditya Patil",
    type: "website",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Explore Aditya's World" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Aditya Patil",
    description: "Explore Aditya's World",
    images: ["/og.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${dmSans.variable} antialiased transition-colors duration-300`}
      >
        <ThemeProvider>
          {children}
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
