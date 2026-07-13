"use client";

import dynamic from "next/dynamic";

// WebGL shader — client-only, no SSR. The plain <img> underneath acts as the
// fallback until the canvas mounts.
const Water = dynamic(() => import("@paper-design/shaders-react").then((m) => m.Water), {
  ssr: false,
});

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
