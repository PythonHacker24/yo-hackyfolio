import { SectionShell } from "../SectionShell";
import { Collapsible } from "../Collapsible";
import { RichText } from "../RichText";
import type { Block } from "../types";

/**
 * A single bordered card with a heading and a collapsible rich-text body.
 * Used for narrative sections like "In Between These Experiences".
 */
export interface ExpandableCardData {
  heading: string;
  collapsedHeight?: string;
  body: Block[];
}

export function ExpandableCardSection({ title, data }: { title: string; data: ExpandableCardData }) {
  return (
    <SectionShell title={title}>
      <div className="rounded-xl border border-gray-200 dark:border-gray-700 p-6 sm:p-8">
        <div className="mb-6">
          <span className="text-lg font-semibold text-black dark:text-white">{data.heading}</span>
        </div>

        <Collapsible
          collapsedHeight={data.collapsedHeight ?? "max-h-48"}
          className="space-y-3 text-base leading-relaxed text-gray-600 dark:text-gray-400"
        >
          <RichText blocks={data.body} />
        </Collapsible>
      </div>
    </SectionShell>
  );
}
