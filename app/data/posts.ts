/**
 * Every blog post / essay on the site, as pure content.
 *
 * ADDING A POST = append one object to the `posts` array below. No component,
 * route, or middleware edits are needed — the dynamic `/[slug]` route, the
 * markdown endpoint, reading time, and the "Ask ChatGPT" prompt are all derived
 * from this data (see `postHelpers.ts`).
 *
 * A post's `blocks` use the same idea as the portfolio's rich text:
 *   { type: "p",    text: "A paragraph with **bold** and [links](https://...)." }
 *   { type: "h2",   text: "A section heading" }
 *   { type: "list", items: ["First bullet", "Second **bold** bullet"] }
 */

export type PostBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "list"; items: string[] };

export interface Post {
  /** URL slug — the post lives at /<slug>. Keep it lowercase-kebab-case. */
  slug: string;
  /** Small uppercase label shown above the title (e.g. "Essay", "Notes"). */
  kicker: string;
  /** The post title (also the <h1> and the <title> tag). */
  title: string;
  /** Meta description for SEO / link previews. */
  description: string;
  /** ISO date (YYYY-MM-DD) — used for ordering and display. */
  date: string;
  /** The post body. */
  blocks: PostBlock[];
}

export const posts: Post[] = [
  {
    slug: "thinking-before-building",
    kicker: "Essay",
    title: "Thinking Before Building",
    description:
      "A startup hackathon taught me that clarity beats speed — execution without direction just moves you faster in the wrong direction.",
    date: "2026-07-03",
    blocks: [
      {
        type: "p",
        text: "One of the biggest lessons I learned in college did not come from a classroom or while writing code. It came from a startup hackathon in Bengaluru.",
      },
      {
        type: "p",
        text: "During the summer after my third year, I was working as a Google Summer of Code contributor when I got invited to an in-person startup hackathon. The goal was very different from a normal hackathon. It was designed to simulate the early days of a startup. You had to find a co-founder, work together for 24 hours, and pitch a product the next day. It was less about building software and more about how you think.",
      },
      {
        type: "p",
        text: "As soon as the event started, the room became chaotic. Everyone was pitching ideas, switching teammates, talking to mentors, and trying to build something as quickly as possible. The atmosphere made it feel like every minute mattered.",
      },
      {
        type: "p",
        text: "I teamed up with someone who was surprisingly calm. While everyone else rushed to build, we spent hours just talking. We discussed the future, different markets, and possible ideas. We walked outside the venue, kept asking questions, and challenged our assumptions. We had not written a single line of code.",
      },
      {
        type: "p",
        text: "At one point, he said something that completely changed the way I think.",
      },
      {
        type: "p",
        text: "**\"We have 24 hours. We are engineers. We can build the product in the last hour if we know exactly what we want to build. We should spend most of our time thinking.\"**",
      },
      { type: "p", text: "That sentence stayed with me." },
      {
        type: "p",
        text: "Everyone else was reacting to the pressure around them. We chose to ignore the noise and focus on understanding the problem first. We talked to mentors, changed our ideas multiple times, and kept refining our thinking instead of rushing into execution.",
      },
      {
        type: "p",
        text: "That experience taught me that clarity is often more valuable than speed. Before doing anything, understand the rules of the game. Ask whether the pressure is real or whether you are simply following the crowd. Once you understand the situation, trust yourself enough to think independently.",
      },
      {
        type: "p",
        text: "As engineers, we often believe that execution is everything. But execution without direction only makes you move faster in the wrong direction. Good thinking is what gives execution its value.",
      },
      {
        type: "p",
        text: "Looking back, that hackathon was the first time I moved beyond the mindset of simply building things. It taught me to slow down, think clearly, and make decisions with intention.",
      },
      {
        type: "p",
        text: "The next day, we presented our idea, and both of us were selected. Of course, getting selected felt great, but that was not the biggest win. The real reward was learning a way of thinking that has stayed with me ever since.",
      },
    ],
  },
  {
    slug: "starter-advice",
    kicker: "Essay",
    title: "The Advice I Wish Someone Gave Me in My First Year of College",
    description:
      "A builder's path into software engineering: what I would do if I started college again today.",
    date: "2025-01-01",
    blocks: [
      {
        type: "p",
        text: "If you're starting college and want to become a software engineer, the first thing I want you to know is this:",
      },
      { type: "p", text: "**Your branch does not decide your future.**" },
      {
        type: "p",
        text: "I'm from Electrical Engineering, and today I work as a software engineer. I have seen people from Civil, Mechanical, Chemical, and many other branches become amazing developers. Being in Computer Science definitely helps because many of the concepts you study are useful in software engineering. But today, almost everything can be learned online. Your skills will matter much more than your degree.",
      },
      {
        type: "p",
        text: "I believe there are two different paths into software engineering.",
      },
      {
        type: "p",
        text: "The first path is the traditional one. You focus on Data Structures and Algorithms (DSA), maintain a good CGPA, prepare for coding interviews, and eventually learn system design. This is a great path that has helped thousands of people build successful careers in top companies. If this is your goal, there are already many excellent resources available that explain it much better than I can.",
      },
      {
        type: "p",
        text: "This article is for people who want to become builders.",
      },
      {
        type: "p",
        text: "If you enjoy creating products, experimenting with ideas, working at startups, or even building your own company someday, then this path might be a better fit for you.",
      },
      {
        type: "p",
        text: "My own journey started in my first year of college. I built projects that were honestly not very good, but every project taught me something new. Later, I joined a startup as an intern, contributed to Google Summer of Code, tried building my own startup, got my first customers, and eventually joined a YC-backed startup as a software engineer. None of these opportunities came because I solved hundreds of coding questions. They came because I kept building.",
      },
      { type: "p", text: "If I had to start again today, this is what I would do." },

      { type: "h2", text: "1. Understand what is happening in technology" },
      {
        type: "p",
        text: "Every few years, a new field creates exciting opportunities. Right now, AI and AI agents are changing the industry. A few years ago, it was Web3. A few years from now, it will probably be something else.",
      },
      {
        type: "p",
        text: "Instead of asking, \"Which programming language should I learn?\", first ask, \"What is changing in the world?\"",
      },
      {
        type: "p",
        text: "Learn about the technology at a high level before writing code. Watch product demos, read blogs, understand use cases, and see how people are using it to solve real problems.",
      },

      { type: "h2", text: "2. Choose technologies based on your interests" },
      {
        type: "p",
        text: "Once you understand an industry, choosing technologies becomes much easier.",
      },
      { type: "p", text: "For example:" },
      {
        type: "list",
        items: [
          "Interested in AI? Learn Python.",
          "Interested in web products? Learn JavaScript or TypeScript.",
          "Interested in backend systems? Learn databases, APIs, and system design concepts.",
        ],
      },
      {
        type: "p",
        text: "Do not follow random roadmaps just because someone else recommends them. Build your own roadmap based on what excites you.",
      },

      { type: "h2", text: "3. Learn full stack development" },
      {
        type: "p",
        text: "I still recommend learning full stack development because it teaches you how complete products are built.",
      },
      {
        type: "p",
        text: "Frontend has become much easier with AI tools, but understanding backend systems is still extremely valuable. Learn about databases, APIs, authentication, servers, and how different parts of an application work together. These concepts will stay useful no matter how technology changes.",
      },

      { type: "h2", text: "4. Start building as early as possible" },
      {
        type: "p",
        text: "The biggest mistake students make is waiting until they feel ready.",
      },
      { type: "p", text: "You do not need to wait." },
      {
        type: "p",
        text: "Write code in your first year. Build projects during your first semester. They will not be perfect, and that is completely fine. Every project will teach you something that no tutorial ever can.",
      },

      { type: "h2", text: "5. Use AI, but understand what it is doing" },
      { type: "p", text: "AI is an incredible learning tool." },
      {
        type: "p",
        text: "Use it to write code, explain concepts, and help you build projects faster. But do not blindly copy everything it generates. Read the code, understand it, modify it, and experiment with it. The goal is to learn, not just to finish projects quickly.",
      },

      { type: "h2", text: "6. Work with startups if you get the opportunity" },
      {
        type: "p",
        text: "Startups teach you things that are difficult to learn anywhere else.",
      },
      {
        type: "p",
        text: "You get real responsibility, work on meaningful problems, and learn much faster because every day brings a new challenge. It is not the easiest path, but it is one of the fastest ways to grow as an engineer.",
      },

      {
        type: "p",
        text: "Finally, remember that college gives you something you will never have again: time to experiment.",
      },
      {
        type: "p",
        text: "Use these four years to explore different ideas, build projects, contribute to open source, launch products, and maybe even earn your first revenue. You do not have to build something perfect. You just have to keep building.",
      },
      {
        type: "p",
        text: "Four years is enough time to completely change your life if you use it well.",
      },
      {
        type: "p",
        text: "So start today. Pick something that excites you, write your first line of code, and keep building.",
      },
    ],
  },
];

/** Look up a single post by slug. */
export function getPost(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}

/** All posts, newest first — used by listings. */
export function getSortedPosts(): Post[] {
  return [...posts].sort((a, b) => (a.date < b.date ? 1 : -1));
}
