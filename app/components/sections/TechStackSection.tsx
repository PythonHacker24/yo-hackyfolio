"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionShell } from "../SectionShell";

export interface Skill {
  name: string;
  slug: string;
}

export interface SkillCategory {
  name: string;
  skills: Skill[];
}

export interface TechStackData {
  categories: SkillCategory[];
}

/** Brand-colored icon in light mode, white in dark mode (dark logos are
 *  invisible on a dark background). Both variants come from the same CDN;
 *  the hidden one stays unfetched thanks to lazy loading. */
function TechIcon({ slug, name, className }: { slug: string; name: string; className: string }) {
  return (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`https://cdn.simpleicons.org/${slug}`}
        alt={name}
        className={`${className} dark:hidden`}
        loading="lazy"
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`https://cdn.simpleicons.org/${slug}/white`}
        alt={name}
        className={`${className} hidden dark:block`}
        loading="lazy"
      />
    </>
  );
}

export function TechStackSection({ title, data }: { title: string; data: TechStackData }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const marqueeSkills = data.categories.flatMap((c) => c.skills);

  return (
    <SectionShell title={title}>
      <div className="w-full space-y-4">
        <div className="flex justify-end">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 hover:text-black dark:hover:text-white transition-all duration-300"
          >
            {isExpanded ? "Show Less" : "View Full Stack"}
            {isExpanded ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
          </button>
        </div>

        <AnimatePresence mode="wait">
          {!isExpanded ? (
            <motion.div
              key="marquee"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]"
            >
              <div className="flex w-max animate-infinite-scroll">
                {[0, 1].map((dup) => (
                  <div key={dup} className="flex gap-12 py-4 pr-12">
                    {marqueeSkills.map((tech, index) => (
                      <div key={`${dup}-${index}`} className="flex flex-col items-center justify-center gap-2">
                        <div className="h-10 w-10 transition-all duration-300">
                          <TechIcon
                            slug={tech.slug}
                            name={tech.name}
                            className="h-full w-full object-contain opacity-80 hover:opacity-100 transition-all duration-300"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="grid"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4, ease: "circOut" }}
              className="overflow-hidden"
            >
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 pt-4">
                {data.categories.map((category) => (
                  <div key={category.name} className="space-y-4">
                    <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 dark:text-gray-500 border-b border-gray-100 dark:border-zinc-800 pb-2">
                      {category.name}
                    </h3>
                    <div className="grid grid-cols-1 gap-2">
                      {category.skills.map((skill) => (
                        <div
                          key={skill.name}
                          className="group flex items-center gap-3 rounded-lg border border-transparent p-2 transition-all hover:border-gray-100 dark:hover:border-zinc-800 hover:bg-gray-50/50 dark:hover:bg-zinc-900/50"
                        >
                          <div className="h-5 w-5 shrink-0 transition-all duration-300">
                            <TechIcon
                              slug={skill.slug}
                              name={skill.name}
                              className="h-full w-full object-contain opacity-70 group-hover:opacity-100 transition-all duration-300"
                            />
                          </div>
                          <span className="text-sm font-medium text-gray-500 dark:text-gray-400 group-hover:text-black dark:group-hover:text-white transition-colors">
                            {skill.name}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </SectionShell>
  );
}
