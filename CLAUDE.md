# Hackyfolio — Agent Guide

This is a data-driven Next.js portfolio. All content lives in one file. Components are fixed; data is not.

## The one rule

**Edit content in `app/data/portfolio.json`. Do not hardcode content inside components.**

## How the system works

```
app/data/portfolio.json
  -> SectionRenderer (app/components/sections/registry.tsx)
    -> one component per section type
      -> rendered on the page
```

The page (`app/page.tsx`) loops over the `sections` array and renders each one. The agent-mode Markdown view is generated from the same JSON by `app/data/generateMarkdown.ts`.

## The JSON structure

```
portfolio.json
  meta        -> siteUrl, calendarUrl, email
  socials[]   -> label, href, icon (used in navbar + contact section)
  posts[]     -> blog posts / essays (see "Blog posts / essays" below)
  sections[]  -> ordered list of sections (order = render order on page)
```

Each section:
```json
{
  "type": "sectionType",
  "title": "Section Heading",
  "data": { ... }
}
```

The `hero` section has no `title` field. Everything else does.

## Section types and their data shapes

Read the exported `*Data` type at the top of each component file for the exact schema. Here is a quick reference:

### `hero`
File: `app/components/sections/Hero.tsx`
```json
{
  "type": "hero",
  "data": {
    "image": "/me.png",
    "name": "Your Name",
    "phonetic": "/fəˈnetɪk/",
    "noun": "noun",
    "timezone": { "label": "IST", "tz": "Asia/Kolkata" },
    "intro": ["paragraph one", "paragraph two"]
  }
}
```

### `experience`
File: `app/components/sections/ExperienceSection.tsx`
```json
{
  "type": "experience",
  "title": "Experience",
  "data": {
    "featured": {
      "name": "Company Name",
      "link": "https://...",
      "role": "Role, Location",
      "dateRange": "Month Year - Present",
      "collapsedHeight": "max-h-48",
      "body": [ ...blocks ]
    },
    "previousLabel": "Previously",
    "previous": [
      {
        "name": "Company Name",
        "role": "Role, Location",
        "link": "https://...",
        "body": [ ...blocks ]
      }
    ]
  }
}
```

### `techStack`
File: `app/components/sections/TechStackSection.tsx`
```json
{
  "type": "techStack",
  "title": "Section title",
  "data": {
    "categories": [
      {
        "name": "Languages",
        "skills": [
          { "name": "Go", "slug": "go" }
        ]
      }
    ]
  }
}
```
The `slug` must match a valid icon on [simpleicons.org](https://simpleicons.org). Check the site if unsure.

### `expandableCard`
File: `app/components/sections/ExpandableCardSection.tsx`
```json
{
  "type": "expandableCard",
  "title": "Section title",
  "data": {
    "heading": "Card heading",
    "collapsedHeight": "max-h-48",
    "body": [ ...blocks ]
  }
}
```

### `project`
File: `app/components/sections/ProjectSection.tsx`
```json
{
  "type": "project",
  "title": "Section title",
  "data": {
    "name": "Project Name",
    "link": "https://...",
    "subtitle": "short tagline",
    "body": [ ...blocks ],
    "stats": [
      { "value": "201", "label": "sign-ups in 3 days" }
    ],
    "footerLink": { "label": "Read more", "url": "https://..." }
  }
}
```
`stats`, `link`, `subtitle`, and `footerLink` are all optional.

### `youtube`
File: `app/components/sections/YouTubeSection.tsx`
```json
{
  "type": "youtube",
  "title": "My YouTube Channel",
  "data": {
    "image": "/youtube-profile.png",
    "name": "Channel Name",
    "url": "https://youtube.com/@handle",
    "tagline": "short description",
    "community": {
      "url": "https://discord.gg/...",
      "count": "300+ members",
      "text": "in the Discord"
    },
    "videos": [
      { "title": "Video title", "url": "https://youtube.com/watch?v=..." }
    ],
    "footerLink": { "label": "See all videos", "url": "https://..." }
  }
}
```

### `education`
File: `app/components/sections/EducationSection.tsx`
```json
{
  "type": "education",
  "title": "Education",
  "data": {
    "items": [
      {
        "title": "Institution Name",
        "role": "Degree / Field",
        "link": "https://...",
        "body": [ ...blocks ]
      }
    ]
  }
}
```

### `github`
File: `app/components/sections/GithubSection.tsx`
```json
{
  "type": "github",
  "title": "GitHub Contributions",
  "data": { "username": "YourGitHubUsername" }
}
```

### `publications`
File: `app/components/sections/PublicationsSection.tsx`
```json
{
  "type": "publications",
  "title": "Research Publications",
  "data": {
    "items": [
      {
        "title": "Paper title",
        "link": "https://doi.org/...",
        "venue": "Conference or journal name",
        "authors": "Name A; Name B",
        "abstract": "Full abstract text here.",
        "collapsedHeight": "max-h-32",
        "linkLabel": "View Publication"
      }
    ]
  }
}
```

### `recommendations`
File: `app/components/sections/RecommendationsSection.tsx`
```json
{
  "type": "recommendations",
  "title": "Recommendations",
  "data": {
    "items": [
      {
        "name": "Person Name",
        "link": "https://linkedin.com/in/...",
        "role": "Their title / context",
        "quote": ["paragraph one", "paragraph two"]
      }
    ]
  }
}
```

### `contact`
File: `app/components/sections/ContactSection.tsx`
```json
{
  "type": "contact",
  "title": "Get in Touch",
  "data": {
    "heading": "Let's build something together",
    "subheading": "short line under the heading",
    "ctas": [
      { "label": "Schedule a meeting", "href": "https://cal.com/...", "icon": "calendar", "primary": true },
      { "label": "Email me", "href": "mailto:you@example.com", "icon": "mail", "primary": false }
    ],
    "socialsLabel": "Find me on"
  }
}
```

## The `Block` type (rich text)

Anywhere you see `body` or `intro`, the value is an array of blocks. A block is either:

**A paragraph (string):**
```json
"This sentence has **bold** and a [link](https://example.com)."
```

**A bullet list:**
```json
{ "list": ["First item", "Second item with **bold**"] }
```

Inline formatting supported inside any string: `**bold**` and `[text](url)`.

## The `socials` array

Used in two places: the bottom navbar and the contact section. Update it once and both update.

Valid icon names (the `icon` field): `github`, `linkedin`, `x`, `youtube`, `discord`, `medium`, `calendar`, `mail`.

These map to real icon components in `app/components/icons.tsx`. Add new icons there if needed.

## Rearranging sections

Move blocks up or down inside the `sections` array. The page renders them in the same order.

## Removing a section

Delete its block from the `sections` array.

## Adding a new section type

Only needed if none of the existing types fit:

1. Create `app/components/sections/YourSection.tsx`. Export the component and its `YourData` interface.
2. Add the variant to the `Section` union in `app/components/sections/registry.tsx`.
3. Add a `case` for it in `SectionRenderer` in the same file.
4. Add the block (with your new `type`) to `portfolio.json`.

TypeScript will error at the `SectionRenderer` switch if you forget step 3.

## Blog posts / essays

Posts are fully templated. **To add a post, append one object to the `posts` array in `app/data/portfolio.json` — nothing else.** No new route, component, middleware, or sitemap edits are needed. (`app/data/posts.ts` only holds the `Post` types and lookup helpers — it reads its data from the JSON.)

Each post:
```json
{
  "slug": "my-post",
  "kicker": "Essay",
  "title": "My Post Title",
  "description": "One-line meta description for SEO / previews.",
  "date": "2026-07-03",
  "blocks": [ ...post blocks ]
}
```
`slug` becomes the URL (`/my-post`, lowercase-kebab-case); `kicker` is the small uppercase label above the title; `date` is YYYY-MM-DD, used for ordering and the sitemap.

A post block is one of:
```json
{ "type": "p",    "text": "A paragraph with **bold** and [links](https://...)." }
{ "type": "h2",   "text": "A section heading" }
{ "type": "list", "items": ["First bullet", "Second **bold** bullet"] }
```

Everything else is derived automatically from that data:
- the rendered page at `/<slug>` (`app/[slug]/page.tsx`)
- the raw-markdown version at `/<slug>?format=markdown` (for AI agents / sharing)
- reading time and the "Ask ChatGPT about this" deep-link (`app/data/postHelpers.ts`)
- the sitemap entry

To feature a post with the pill above the hero, point `meta.featured.href` in `portfolio.json` at `/<slug>`.

Do not hardcode post content in `app/[slug]/page.tsx` — that file is the fixed template; the `posts` array in `portfolio.json` is the content.

## Images

Put image files in `public/`. Reference them in the JSON as `/filename.png` (root-relative path).

## Verifying changes

Always run after editing:
```bash
npm run build
```

A type mismatch or missing required field will fail here. Fix it before assuming the change worked.

## What NOT to do

- Do not hardcode user content inside component files.
- Do not add a second data file. `portfolio.json` is the only source of truth.
- Do not edit `app/data/generateMarkdown.ts` to patch content. Fix the JSON instead.
- Do not add a `title` field to the `hero` section (it does not use one).
