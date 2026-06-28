"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface ExperienceItemProps {
    title: string;
    role: string;
    children: React.ReactNode;
    collapsible?: boolean;
    link?: string;
    collapsedHeight?: string;
    logo?: string;
}

export function ExperienceItem({ title, role, children, collapsible = false, link, collapsedHeight = "max-h-20", logo }: ExperienceItemProps) {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div className="group">
            <div className="mb-2 flex flex-col justify-between sm:flex-row sm:items-baseline">
                <div className="flex items-center gap-2">
                    {logo && (
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center overflow-hidden rounded-md">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={logo} alt={`${title} logo`} className="h-full w-full object-cover" loading="lazy" />
                        </span>
                    )}
                    <span className="font-medium text-black dark:text-white">{title}</span>
                    {link && (
                        <a
                            href={link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-gray-400 dark:text-gray-500 underline underline-offset-2 hover:text-black dark:hover:text-white"
                        >
                            link
                        </a>
                    )}
                </div>
                <span className="text-sm text-gray-400 dark:text-gray-500">{role}</span>
            </div>

            <div className={`relative max-w-xl text-sm leading-relaxed text-gray-500 dark:text-gray-400 transition-all duration-300 ${!isExpanded && collapsible ? `${collapsedHeight} overflow-hidden` : ""}`}>
                {children}
                {collapsible && !isExpanded && (
                    <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-white dark:from-black to-transparent" />
                )}
            </div>

            {collapsible && (
                <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="mt-2 flex items-center gap-1 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white"
                >
                    {isExpanded ? (
                        <>
                            View Less <ChevronUp className="h-4 w-4" />
                        </>
                    ) : (
                        <>
                            View More <ChevronDown className="h-4 w-4" />
                        </>
                    )}
                </button>
            )}
        </div>
    );
}
