import Image from "next/image";
import { Youtube, ArrowUpRight } from "lucide-react";
import { SectionShell } from "../SectionShell";
import { DiscordIcon } from "../icons";
import type { LinkRef } from "../types";

export interface VideoRef {
  title: string;
  url: string;
}

export interface YouTubeData {
  image: string;
  logo?: string;
  name: string;
  url: string;
  tagline: string;
  community: { url: string; count: string; text: string };
  videos: VideoRef[];
  footerLink?: LinkRef;
}

function getYouTubeId(url: string): string | null {
  const match = url.match(/[?&]v=([^&]+)/);
  return match ? match[1] : null;
}

export function YouTubeSection({ title, data }: { title: string; data: YouTubeData }) {
  return (
    <SectionShell title={title}>
      <div className="rounded-xl border border-gray-200 dark:border-gray-700 p-6 sm:p-8">

        {/* Channel header */}
        <div className="flex items-start gap-4">
          {data.logo && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={data.logo} alt="YouTube" className="h-8 w-auto shrink-0 object-contain" loading="lazy" />
          )}
          <div className="flex flex-col gap-1.5 min-w-0">
            <a
              href={data.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-base font-semibold text-black dark:text-white hover:underline underline-offset-4 transition-colors"
            >
              {data.name}
              <ArrowUpRight className="h-3.5 w-3.5 text-gray-400" />
            </a>
            <span className="text-xs text-gray-500 dark:text-gray-500">{data.tagline}</span>
            <a
              href={data.community.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-500 hover:text-black dark:hover:text-white transition-colors"
            >
              <DiscordIcon className="h-3.5 w-3.5 text-[#5865F2]" />
              <span>
                <span className="font-semibold text-black dark:text-white">{data.community.count}</span>{" "}
                {data.community.text}
              </span>
            </a>
          </div>
        </div>

        {/* Video grid — 5 videos + Visit Channel tile */}
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-2">
          {data.videos.map((video) => {
            const videoId = getYouTubeId(video.url);
            const thumbnail = videoId
              ? `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`
              : null;

            return (
              <a
                key={video.url}
                href={video.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-gray-700 dark:bg-zinc-900"
              >
                {/* Thumbnail — natural 16:9, no cropping */}
                <div className="relative aspect-video overflow-hidden">
                  {thumbnail && (
                    <Image
                      src={thumbnail}
                      alt={video.title}
                      fill
                      sizes="(max-width: 640px) 50vw, 33vw"
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  )}

                  {/* YouTube icon — top left */}
                  <Youtube className="absolute left-2.5 top-2.5 h-4 w-4 text-white drop-shadow" />
                </div>

                {/* Title — card body */}
                <span className="flex-1 px-2.5 pb-2.5 pt-1 text-xs font-medium leading-snug text-gray-700 line-clamp-2 group-hover:text-black dark:text-gray-300 dark:group-hover:text-white">
                  {video.title}
                </span>
              </a>
            );
          })}

          {/* Visit Channel tile */}
          {data.footerLink && (
            <a
              href={data.footerLink.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center justify-center gap-2 rounded-xl border border-gray-200 bg-gray-50 p-3 text-center transition-colors hover:border-gray-300 hover:bg-white dark:border-gray-700 dark:bg-zinc-900 dark:hover:border-gray-600 dark:hover:bg-zinc-800"
            >
              <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full ring-1 ring-gray-200 transition-transform group-hover:scale-105 dark:ring-gray-700">
                <Image src={data.image} alt={data.name} fill sizes="48px" className="object-cover" />
              </div>
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-gray-700 group-hover:text-black dark:text-gray-300 dark:group-hover:text-white">
                Visit Channel
                <ArrowUpRight className="h-3.5 w-3.5 text-gray-400 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 dark:text-gray-500" />
              </span>
            </a>
          )}
        </div>

      </div>
    </SectionShell>
  );
}
