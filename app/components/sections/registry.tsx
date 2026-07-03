import type { PortfolioMeta, Social } from "../types";

import { Hero, type HeroData } from "./Hero";
import { ExperienceSection, type ExperienceData } from "./ExperienceSection";
import { TechStackSection, type TechStackData } from "./TechStackSection";
import { ExpandableCardSection, type ExpandableCardData } from "./ExpandableCardSection";
import { ProjectSection, type ProjectData } from "./ProjectSection";
import { YouTubeSection, type YouTubeData } from "./YouTubeSection";
import { EducationSection, type EducationData } from "./EducationSection";
import { GithubSection, type GithubData } from "./GithubSection";
import { PublicationsSection, type PublicationsData } from "./PublicationsSection";
import { RecommendationsSection, type RecommendationsData } from "./RecommendationsSection";
import { ContactSection, type ContactData } from "./ContactSection";
import { ThoughtsSection, type ThoughtsData } from "./ThoughtsSection";

/**
 * Discriminated union of every section. Each variant pairs a `type` tag with
 * the data shape its component declares. Adding a section = add a component
 * (with its exported `*Data` interface), a variant here, and a case in
 * `SectionRenderer`.
 */
export type Section =
  | { type: "hero"; data: HeroData }
  | { type: "experience"; title: string; data: ExperienceData }
  | { type: "techStack"; title: string; data: TechStackData }
  | { type: "expandableCard"; title: string; data: ExpandableCardData }
  | { type: "project"; title: string; data: ProjectData }
  | { type: "youtube"; title: string; data: YouTubeData }
  | { type: "education"; title: string; data: EducationData }
  | { type: "github"; title: string; data: GithubData }
  | { type: "publications"; title: string; data: PublicationsData }
  | { type: "recommendations"; title: string; data: RecommendationsData }
  | { type: "contact"; title: string; data: ContactData }
  | { type: "thoughts"; title: string; data: ThoughtsData };

/** Top-level shape of `portfolio.json`. */
export interface PortfolioData {
  meta: PortfolioMeta;
  socials: Social[];
  sections: Section[];
}

/** Context the page threads into sections that need page-level state/data. */
export interface SectionContext {
  time: string;
  socials: Social[];
}

/** Render a single section by mapping its `type` to the matching component. */
export function SectionRenderer({ section, ctx }: { section: Section; ctx: SectionContext }) {
  switch (section.type) {
    case "hero":
      return <Hero data={section.data} time={ctx.time} />;
    case "experience":
      return <ExperienceSection title={section.title} data={section.data} />;
    case "techStack":
      return <TechStackSection title={section.title} data={section.data} />;
    case "expandableCard":
      return <ExpandableCardSection title={section.title} data={section.data} />;
    case "project":
      return <ProjectSection title={section.title} data={section.data} />;
    case "youtube":
      return <YouTubeSection title={section.title} data={section.data} />;
    case "education":
      return <EducationSection title={section.title} data={section.data} />;
    case "github":
      return <GithubSection title={section.title} data={section.data} />;
    case "publications":
      return <PublicationsSection title={section.title} data={section.data} />;
    case "recommendations":
      return <RecommendationsSection title={section.title} data={section.data} />;
    case "contact":
      return <ContactSection title={section.title} data={section.data} socials={ctx.socials} />;
    case "thoughts":
      return <ThoughtsSection title={section.title} data={section.data} />;
  }
}
