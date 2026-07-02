import portfolioJson from "../data/portfolio.json";

/**
 * The full text of the /starter-advice essay. One structure drives both the
 * rendered page and the "copy essay" markdown, so the two can never drift.
 */

export const ESSAY_URL = `${portfolioJson.meta.siteUrl.replace(/\/$/, "")}/starter-advice`;
export const ESSAY_MARKDOWN_URL = `${ESSAY_URL}?format=markdown`;

export type EssayBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "list"; items: string[] };

export const ESSAY_TITLE =
  "The Advice I Wish Someone Gave Me in My First Year of College";

export const ESSAY_BLOCKS: EssayBlock[] = [
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
];

/** The essay as plain markdown — what the "copy essay" button puts on the clipboard. */
export const ESSAY_MARKDOWN = [
  `# ${ESSAY_TITLE}`,
  ...ESSAY_BLOCKS.map((block) => {
    if (block.type === "h2") return `### ${block.text}`;
    if (block.type === "list") return block.items.map((item) => `* ${item}`).join("\n");
    return block.text;
  }),
].join("\n\n");

const WORD_COUNT = ESSAY_MARKDOWN.split(/\s+/).length;
export const READING_TIME = `${Math.max(1, Math.round(WORD_COUNT / 200))} min read`;

/**
 * Prompt for the "Ask ChatGPT" button. Points ChatGPT at the markdown version
 * of the essay (served via ?format=markdown) and forces the reply to open with
 * a summary before turning the advice into a personalized plan.
 */
export const CHATGPT_PROMPT = `Fetch and read this essay: ${ESSAY_MARKDOWN_URL} - it's "${ESSAY_TITLE}" by Aditya Patil, served as plain markdown.

Start your first reply with a short summary of the essay in a few bullet points. Then ask me where I currently am (year of study, what excites me in tech) and help me turn the essay's advice into a concrete, personalized action plan. Keep it practical and specific. After that, I'll ask follow-up questions about the essay.`;

export const CHATGPT_URL = `https://chatgpt.com/?q=${encodeURIComponent(CHATGPT_PROMPT)}`;
