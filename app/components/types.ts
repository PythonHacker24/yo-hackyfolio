/**
 * Shared schema primitives used across every section component.
 *
 * The portfolio is fully data-driven: `portfolio.json` is the single source of
 * truth, and each section component co-locates its own data interface (e.g.
 * `HeroData`, `ExperienceData`). Those interfaces are aggregated here into the
 * `Section` discriminated union and the top-level `PortfolioData` shape.
 */

/**
 * A unit of rich text. Either:
 *  - a markdown string supporting inline **bold** and [text](url) links, or
 *  - a bulleted list of such strings.
 * Rendered by the `RichText` component.
 */
export type Block = string | { list: string[] };

/** A social/contact link. `icon` is a key into the icon registry. */
export interface Social {
  label: string;
  href: string;
  icon: string;
}

/** A labelled external link used in section footers. */
export interface LinkRef {
  label: string;
  url: string;
}

export interface PortfolioMeta {
  siteUrl: string;
  calendarUrl: string;
  email: string;
  /** Optional pill above the hero pointing at a featured page (e.g. an essay). */
  featured?: {
    tag: string;
    title: string;
    href: string;
  };
}
