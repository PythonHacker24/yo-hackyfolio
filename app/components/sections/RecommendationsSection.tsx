import { SectionShell } from "../SectionShell";

export interface RecommendationItem {
  name: string;
  link?: string;
  role: string;
  /** Quote paragraphs. */
  quote: string[];
}

export interface RecommendationsData {
  items: RecommendationItem[];
}

export function RecommendationsSection({ title, data }: { title: string; data: RecommendationsData }) {
  return (
    <SectionShell title={title}>
      <div className="space-y-8 rounded-xl border border-gray-200 dark:border-gray-700 p-6 sm:p-8">
        {data.items.map((rec) => (
          <div key={rec.name} className="group">
            <div className="mb-3">
              {rec.link ? (
                <a
                  href={rec.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-base font-semibold text-black dark:text-white underline underline-offset-4 decoration-gray-300 dark:decoration-gray-700 hover:decoration-black dark:hover:decoration-white transition-colors"
                >
                  {rec.name}
                </a>
              ) : (
                <span className="text-base font-semibold text-black dark:text-white">{rec.name}</span>
              )}
              <span className="ml-2 text-xs font-medium text-gray-500 dark:text-gray-500">{rec.role}</span>
            </div>
            <div className="space-y-3 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
              {rec.quote.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </SectionShell>
  );
}
