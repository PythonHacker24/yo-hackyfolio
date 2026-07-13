import { SectionShell } from "../SectionShell";
import { Icon } from "../icons";
import { WaterImage } from "../WaterImage";
import type { Social } from "../types";

export interface Cta {
  label: string;
  href: string;
  icon: string;
  primary?: boolean;
}

export interface ContactData {
  heading: string;
  subheading: string;
  ctas: Cta[];
  socialsLabel: string;
  image?: string;
}

export function ContactSection({
  title,
  data,
  socials,
}: {
  title: string;
  data: ContactData;
  socials: Social[];
}) {
  return (
    <SectionShell title={title}>
      <div className="rounded-xl border border-gray-200 dark:border-gray-700 p-6 sm:p-8 overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-start gap-6 sm:gap-8">

          {/* Left: text content */}
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-black dark:text-white">{data.heading}</h3>
            <p className="mt-2 text-base leading-relaxed text-gray-600 dark:text-gray-400">{data.subheading}</p>

            {/* Primary CTAs */}
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              {data.ctas.map((cta) => (
                <a
                  key={cta.label}
                  href={cta.href}
                  {...(cta.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className={
                    cta.primary
                      ? "inline-flex items-center justify-center gap-2 rounded-lg bg-black dark:bg-white px-5 py-3 text-sm font-semibold text-white dark:text-black transition-opacity hover:opacity-90"
                      : "inline-flex items-center justify-center gap-2 rounded-lg border border-gray-200 dark:border-gray-700 px-5 py-3 text-sm font-semibold text-black dark:text-white transition-colors hover:bg-gray-50 dark:hover:bg-zinc-900"
                  }
                >
                  <Icon name={cta.icon} className="h-4 w-4" />
                  {cta.label}
                </a>
              ))}
            </div>

            {/* Socials */}
            <div className="mt-8">
              <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-600">
                {data.socialsLabel}
              </p>
              <div className="flex flex-wrap items-center gap-2">
                {socials.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 transition-colors hover:border-black dark:hover:border-white hover:text-black dark:hover:text-white"
                  >
                    <Icon name={social.icon} className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right: illustration card */}
          {data.image && (
            <div className="shrink-0 self-start sm:self-center">
              <div className="relative rotate-2 hover:rotate-0 transition-transform duration-300 ease-out">
                {/* Card shadow layers for depth */}
                <div className="absolute inset-0 rounded-2xl bg-gray-200 dark:bg-gray-700 translate-x-1.5 translate-y-1.5" />
                <div className="relative rounded-2xl overflow-hidden w-40 sm:w-44 aspect-square border border-gray-200 dark:border-gray-700 shadow-md">
                  <WaterImage src={data.image} alt="Illustration" />
                  {/* Subtle overlay for dark mode blend */}
                  <div className="absolute inset-0 bg-black/0 dark:bg-black/10 pointer-events-none" />
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </SectionShell>
  );
}
