"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef } from "react";

// WebGL shader — client-only, no SSR. The plain <img> underneath acts as the
// fallback until the canvas mounts.
const Water = dynamic(() => import("@paper-design/shaders-react").then((m) => m.Water), {
  ssr: false,
});

/** Standalone animated water surface (no image) for layering behind content,
 *  e.g. the navbar icons floating on water. Fills its positioned parent. */
export function WaterOverlay({
  colorHighlight = "#94a3b8",
  highlights = 0.3,
  onReady,
}: {
  colorHighlight?: string;
  highlights?: number;
  /** Fires once the shader is initialized and its render loop is running. */
  onReady?: () => void;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);

  // The library stamps `data-paper-shader` on its mount element at the exact
  // moment WebGL init completes and frames start rendering — watch for it.
  useEffect(() => {
    if (!onReady) return;
    const el = wrapRef.current;
    if (!el) return;
    if (el.querySelector("[data-paper-shader]")) {
      onReady();
      return;
    }
    const observer = new MutationObserver(() => {
      if (el.querySelector("[data-paper-shader]")) {
        observer.disconnect();
        onReady();
      }
    });
    observer.observe(el, { subtree: true, attributes: true, childList: true });
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div ref={wrapRef} aria-hidden className="pointer-events-none absolute inset-0 -z-10">
      <Water
        className="absolute inset-0 [&_canvas]:absolute [&_canvas]:inset-0 [&_canvas]:block [&_canvas]:h-full [&_canvas]:w-full"
        colorBack="#00000000"
        colorHighlight={colorHighlight}
        highlights={highlights}
        layering={0.4}
        edges={0}
        waves={0.15}
        caustic={0.15}
        size={0.4}
        speed={0.35}
        fit="cover"
      />
    </div>
  );
}

/** Image with an animated water effect over it. Must be placed inside a
 *  `relative` container that defines the size. */
export function WaterImage({ src, alt }: { src: string; alt: string }) {
  return (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} className="h-full w-full object-cover" loading="lazy" />
      <Water
        className="absolute inset-0 h-full w-full [&_canvas]:absolute [&_canvas]:inset-0 [&_canvas]:block [&_canvas]:h-full [&_canvas]:w-full"
        image={src}
        scale={1}
        colorBack="#00000000"
        colorHighlight="#ffffff"
        highlights={0.12}
        layering={0}
        edges={0}
        waves={0}
        caustic={0.07}
        size={0.7}
        speed={0.35}
        fit="cover"
      />
    </>
  );
}
