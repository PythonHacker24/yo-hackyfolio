import type { Block } from "../components/types";
import type { PortfolioData, Section } from "../components/sections/registry";
import { getSortedPosts } from "./posts";
import { postUrl } from "./postHelpers";

/** Find the first section of a given type, narrowed to its variant. */
function find<T extends Section["type"]>(
  sections: Section[],
  type: T
): Extract<Section, { type: T }> | undefined {
  return sections.find((s) => s.type === type) as Extract<Section, { type: T }> | undefined;
}

/** Render Block[] to markdown: strings as paragraphs, `{list}` as bullet lists. */
function blocks(content: Block[]): string {
  return content
    .map((b) => (typeof b === "string" ? b : b.list.map((li) => `- ${li}`).join("\n")))
    .join("\n\n");
}

/**
 * Derive the agent-mode markdown view from the same `portfolio.json` that
 * drives the visual components, so both stay in sync from one source.
 */
export function generateMarkdown(data: PortfolioData, time: string): string {
  const { sections, socials, meta } = data;
  const parts: string[] = [];

  // Title + About
  const hero = find(sections, "hero");
  if (hero) {
    const { name, phonetic, noun, timezone, intro } = hero.data;
    parts.push(`# ${name}\n${phonetic} • ${noun} • ${time || "00:00:00"} ${timezone.label}`);
    parts.push(`## About\n\n${intro.join("\n\n")}`);
  }

  // Featured page (small pill on the visual site)
  if (meta.featured) {
    const url = new URL(meta.featured.href, meta.siteUrl).toString();
    parts.push(`**${meta.featured.tag}:** [${meta.featured.title}](${url})`);
  }

  // Experience
  const experience = find(sections, "experience");
  if (experience) {
    const { featured, previous } = experience.data;
    const entry = (e: typeof featured) => {
      const meta = e.dateRange ? `*${e.dateRange}*` : e.link ? `[${e.link}](${e.link})` : "";
      return `### ${e.name}\n**${e.role}**${meta ? `\n${meta}` : ""}\n\n${blocks(e.body)}`;
    };
    parts.push(`## ${experience.title}\n\n${[featured, ...previous].map(entry).join("\n\n")}`);
  }

  // In Between These Experiences (and any other narrative card)
  const card = find(sections, "expandableCard");
  if (card) {
    parts.push(`## ${card.title}\n\n### ${card.data.heading}\n\n${blocks(card.data.body)}`);
  }

  // Coolest Experiment (project)
  const project = find(sections, "project");
  if (project) {
    const p = project.data;
    const lines = [`## ${project.title}`, "", `### ${p.name}`];
    if (p.subtitle) lines.push(`**${p.subtitle}**`);
    if (p.link) lines.push(`[${p.link}](${p.link})`);
    lines.push("", blocks(p.body));
    if (p.stats?.length) lines.push("", p.stats.map((s) => `- ${s.value} ${s.label}`).join("\n"));
    if (p.footerLink) lines.push("", `${p.footerLink.label}: [${p.footerLink.url}](${p.footerLink.url})`);
    parts.push(lines.join("\n"));
  }

  // Education
  const education = find(sections, "education");
  if (education) {
    const items = education.data.items
      .map((e) => `### ${e.title}\n**${e.role}**\n${blocks(e.body)}`)
      .join("\n\n");
    parts.push(`## ${education.title}\n\n${items}`);
  }

  // Research Publications
  const publications = find(sections, "publications");
  if (publications) {
    const items = publications.data.items
      .map(
        (p) =>
          `### ${p.title}\n**${p.venue}**\nAuthors: ${p.authors}\n[${p.link}](${p.link})\n\n**Abstract:**\n${p.abstract}`
      )
      .join("\n\n");
    parts.push(`## ${publications.title}\n\n${items}`);
  }

  // Tech stack
  const tech = find(sections, "techStack");
  if (tech) {
    const skills = tech.data.categories.flatMap((c) => c.skills.map((s) => s.name)).join(", ");
    parts.push(`## ${tech.title}\n\n${skills}`);
  }

  // Recommendations
  const recommendations = find(sections, "recommendations");
  if (recommendations) {
    const items = recommendations.data.items
      .map((r) => `### ${r.link ? `[${r.name}](${r.link})` : r.name}\n${r.quote.join("\n\n")}`)
      .join("\n\n");
    parts.push(`## ${recommendations.title}\n\n${items}`);
  }

  // YouTube
  const youtube = find(sections, "youtube");
  if (youtube) {
    const y = youtube.data;
    const handle = y.url.split("/@")[1] ?? "";
    const videos = y.videos.map((v) => `- [${v.title}](${v.url})`).join("\n");
    const lines = [
      `## YouTuber @${handle}`,
      "",
      `I run [${y.name}](${y.url}) — ${y.tagline}. ${y.community.count} ${y.community.text}: ${y.community.url}`,
      "",
      "Selected videos:",
      videos,
    ];
    if (y.footerLink) lines.push("", `${y.footerLink.label}: ${y.footerLink.url}`);
    parts.push(lines.join("\n"));
  }

  // Thoughts (essays / notes, pulled from posts.ts)
  const thoughts = find(sections, "thoughts");
  if (thoughts) {
    const items = getSortedPosts()
      .map((p) => `- [${p.title}](${postUrl(p)}) — ${p.description}`)
      .join("\n");
    parts.push(`## ${thoughts.title}\n\n${items}`);
  }

  // Get in Touch
  const contact = find(sections, "contact");
  if (contact) {
    const linkedin = socials.find((s) => s.icon === "linkedin");
    const linkedinMd = linkedin ? `[LinkedIn](${linkedin.href})` : "LinkedIn";
    parts.push(`## ${contact.title}\n\nConnect with me on ${linkedinMd} or shoot an [email](mailto:${meta.email})`);
  }

  // Links footer
  const links = [
    ...socials.map((s) => `- ${s.label}: [${s.href}](${s.href})`),
    `- Calendar: [${meta.calendarUrl}](${meta.calendarUrl})`,
  ].join("\n");
  parts.push(`---\n\n**Links:**\n${links}`);

  return parts.join("\n\n") + "\n";
}
