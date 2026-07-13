import { SectionShell } from "../SectionShell";
import { Collapsible } from "../Collapsible";
import { RichText } from "../RichText";
import { ExpandableExperienceItem } from "../ExpandableExperienceItem";
import type { Block } from "../types";

export interface ExperienceEntry {
  name: string;
  role: string;
  location?: string;
  link?: string;
  /** Optional logo image URL — rendered as a circular icon before the name. */
  logo?: string;
  /** Optional date range — surfaced in the generated agent-mode markdown. */
  dateRange?: string;
  collapsedHeight?: string;
  body: Block[];
}

export interface ExperienceData {
  featured: ExperienceEntry;
  previousLabel: string;
  previous: ExperienceEntry[];
}

export function ExperienceSection({ title, data }: { title: string; data: ExperienceData }) {
  const { featured, previousLabel, previous } = data;

  return (
    <SectionShell title={title} className="mt-6">
      {/* Featured / Current role */}
      <div className="rounded-xl border border-gray-200 dark:border-gray-700 p-6 sm:p-8">
        <div className="mb-6 flex flex-wrap items-center gap-x-3 gap-y-1">
          {featured.logo && (
            <span className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-lg">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={featured.logo}
                alt={`${featured.name} logo`}
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </span>
          )}
          {featured.link ? (
            <a
              href={featured.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-lg font-semibold text-black dark:text-white no-underline hover:underline hover:underline-offset-4 hover:decoration-black dark:hover:decoration-white transition-colors"
            >
              {featured.name}
            </a>
          ) : (
            <span className="text-lg font-semibold text-black dark:text-white">{featured.name}</span>
          )}
          <span className="text-xs font-medium text-gray-500 dark:text-gray-500">{featured.role}</span>
        </div>

        <Collapsible
          collapsedHeight={featured.collapsedHeight ?? "max-h-48"}
          className="space-y-3 text-base leading-relaxed text-gray-600 dark:text-gray-400"
        >
          <RichText blocks={featured.body} />
        </Collapsible>
      </div>

      {/* Previously — compact titles, expand on click */}
      <div className="mt-10">
        <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-600">
          {previousLabel}
        </h3>
        <div className="flex flex-col rounded-xl border border-gray-200 dark:border-gray-700 px-6 sm:px-8">
          {previous.map((item) => (
            <ExpandableExperienceItem key={item.name} title={item.name} role={item.role} location={item.location} link={item.link} logo={item.logo}>
              <div className="space-y-2">
                <RichText blocks={item.body} />
              </div>
            </ExpandableExperienceItem>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}
