"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface ExpandableExperienceItemProps {
    title: string;
    role: string;
    children: React.ReactNode;
    link?: string;
    logo?: string;
}

export function ExpandableExperienceItem({ title, role, children, link, logo }: ExpandableExperienceItemProps) {
    const [open, setOpen] = useState(false);

    return (
        <div
            className="group cursor-pointer py-4"
            onClick={() => setOpen((v) => !v)}
        >
            <div className="flex flex-col justify-between gap-1 sm:flex-row sm:items-baseline">
                <div className="flex items-center gap-2">
                    {logo && (
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center overflow-hidden rounded-md">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src={logo}
                                alt={`${title} logo`}
                                className="h-full w-full object-cover"
                                loading="lazy"
                            />
                        </span>
                    )}
                    <span className="font-medium text-black dark:text-white">{title}</span>
                    {link && (
                        <a
                            href={link}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="text-xs text-gray-400 dark:text-gray-500 underline underline-offset-2 hover:text-black dark:hover:text-white"
                        >
                            link
                        </a>
                    )}
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-400 dark:text-gray-500">{role}</span>
                    <ChevronDown
                        className={`h-3.5 w-3.5 shrink-0 text-gray-300 dark:text-gray-600 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
                    />
                </div>
            </div>

            {/* Preview when collapsed, full content when open */}
            <div className="relative mt-2 max-w-xl">
                <div
                    className={`overflow-hidden text-sm leading-relaxed text-gray-500 dark:text-gray-400 transition-[max-height] duration-300 ease-out ${
                        open ? "max-h-[600px]" : "max-h-[2.8rem]"
                    }`}
                >
                    {children}
                </div>
                {!open && (
                    <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-white dark:from-black to-transparent" />
                )}
            </div>
        </div>
    );
}
