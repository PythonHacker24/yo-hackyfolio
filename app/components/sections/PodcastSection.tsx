import Image from "next/image";
import { Youtube, ArrowUpRight } from "lucide-react";
import { SectionShell } from "../SectionShell";

export interface PodcastEpisode {
  title: string;
  url: string;
  description?: string;
}

export interface PodcastData {
  episodes: PodcastEpisode[];
}

function getYouTubeId(url: string): string | null {
  const match = url.match(/(?:[?&]v=|youtu\.be\/)([^?&/]+)/);
  return match ? match[1] : null;
}

export function PodcastSection({ title, data }: { title: string; data: PodcastData }) {
  return (
    <SectionShell title={title}>
      <div className="space-y-4">
        {data.episodes.map((episode) => {
          const videoId = getYouTubeId(episode.url);
          const thumbnail = videoId
            ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
            : null;

          return (
            <a
              key={episode.url}
              href={episode.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col sm:flex-row overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-gray-700 dark:bg-zinc-900"
            >
              {/* Thumbnail — natural 16:9, no cropping */}
              <div className="relative aspect-video w-full sm:w-64 shrink-0 overflow-hidden">
                {thumbnail && (
                  <Image
                    src={thumbnail}
                    alt={episode.title}
                    fill
                    sizes="(max-width: 640px) 100vw, 256px"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                )}
                <Youtube className="absolute left-2.5 top-2.5 h-4 w-4 text-white drop-shadow" />
              </div>

              {/* Episode details */}
              <div className="flex flex-col justify-center gap-1.5 p-4 sm:p-5 min-w-0">
                <span className="text-sm font-semibold leading-snug text-black dark:text-white">
                  {episode.title}
                </span>
                {episode.description && (
                  <span className="text-xs leading-relaxed text-gray-500 dark:text-gray-500">
                    {episode.description}
                  </span>
                )}
                <span className="mt-1 inline-flex items-center gap-1 text-xs font-medium text-gray-500 group-hover:text-black dark:text-gray-500 dark:group-hover:text-white transition-colors">
                  Watch on YouTube
                  <ArrowUpRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </div>
            </a>
          );
        })}
      </div>
    </SectionShell>
  );
}
