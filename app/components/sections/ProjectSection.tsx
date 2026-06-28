import { ArrowRight } from "lucide-react";
import { SectionShell } from "../SectionShell";
import { RichText } from "../RichText";
import type { Block, LinkRef } from "../types";

export interface ProjectStat {
  value: string;
  label: string;
}

export interface ProjectData {
  name: string;
  link?: string;
  subtitle?: string;
  image?: string;
  body: Block[];
  stats?: ProjectStat[];
  footerLink?: LinkRef;
}

export function ProjectSection({ title, data }: { title: string; data: ProjectData }) {
  return (
    <SectionShell title={title}>
      <div className="rounded-xl border border-gray-200 dark:border-gray-800 p-6 sm:p-8">
        <div className="mb-6 flex items-start justify-between gap-4">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            {data.link ? (
              <a
                href={data.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-lg font-semibold text-black dark:text-white underline underline-offset-4 decoration-gray-300 dark:decoration-gray-700 hover:decoration-black dark:hover:decoration-white transition-colors"
              >
                {data.name}
              </a>
            ) : (
              <span className="text-lg font-semibold text-black dark:text-white">{data.name}</span>
            )}
            {data.subtitle && (
              <span className="text-xs font-medium text-gray-500 dark:text-gray-500">{data.subtitle}</span>
            )}
          </div>
          {data.image && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={data.image}
              alt={data.name}
              className="h-12 w-auto shrink-0 rounded-lg object-contain"
              loading="lazy"
            />
          )}
        </div>

        <div className="space-y-3 text-base leading-relaxed text-gray-600 dark:text-gray-400">
          <RichText blocks={data.body} />
        </div>

        {data.stats && data.stats.length > 0 && (
          <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-6 sm:grid-cols-4">
            {data.stats.map((stat) => (
              <div key={stat.label} className="flex flex-col gap-1">
                <span className="text-2xl font-bold tabular-nums text-black dark:text-white sm:text-3xl">
                  {stat.value}
                </span>
                <span className="text-xs text-gray-400 dark:text-gray-500">{stat.label}</span>
              </div>
            ))}
          </div>
        )}

        {data.footerLink && (
          <a
            href={data.footerLink.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-1 text-xs font-medium text-black dark:text-white underline underline-offset-4 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
          >
            {data.footerLink.label} <ArrowRight className="h-3 w-3" />
          </a>
        )}
      </div>
    </SectionShell>
  );
}
