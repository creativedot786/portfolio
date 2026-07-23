"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const TABS = [
  { id: "anyone", label: "For Anyone" },
  { id: "recruiters", label: "Recruiters" },
  { id: "pms", label: "Product Managers" },
  { id: "designers", label: "Designers" },
  { id: "engineers", label: "Engineers" },
];

const CONTENT: Record<
  string,
  { heading: string; body: string; footer: string }
> = {
  anyone: {
    heading: "I design digital products with clarity and structure.",
    body: "I help teams turn complex problems into simple, usable experiences people can trust and enjoy.",
    footer: "Clear. Useful. Human.",
  },
  recruiters: {
    heading: "Senior product designer with 10+ years of experience.",
    body: "I've led design across Fintech, Ecommerce, and Government in both startups and large organisations. I mentor designers and use AI to improve speed, quality, and decision-making.",
    footer: "Open to senior and lead roles.",
  },
  pms: {
    heading: "A reliable design partner from day one.",
    body: "I work closely with product managers to shape the problem early, align teams, and use AI to explore options faster without losing focus on users or business goals.",
    footer: "Strong alignment. Better outcomes.",
  },
  designers: {
    heading: "Systems-minded, quality-driven, and collaborative.",
    body: "I bring a strong systems mindset, mentor designers, and use AI thoughtfully to explore ideas, share context early, and raise the overall quality of the work.",
    footer: "Structured, yet creative.",
  },
  engineers: {
    heading: "Designs made to be built.",
    body: "I collaborate closely with engineers, provide clear specs, and use AI to reduce ambiguity and support smoother, faster implementation.",
    footer: "Less friction. Better delivery.",
  },
};

export function HeroTabs() {
  const [activeTab, setActiveTab] = useState(TABS[0].id);

  return (
    <div className="flex flex-col h-full py-12 md:py-24">
      {/* Navigation Tabs */}
      <nav className="flex flex-wrap gap-4 md:gap-6 mb-16 md:mb-32">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "text-sm tracking-wide transition-colors duration-200",
              activeTab === tab.id
                ? "text-white font-medium"
                : "text-zinc-500 hover:text-zinc-300"
            )}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      {/* Dynamic Content */}
      <div className="relative flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="flex flex-col gap-8 max-w-lg"
          >
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight tracking-tight text-white">
              {CONTENT[activeTab].heading}
            </h1>
            <p className="text-lg md:text-xl leading-relaxed text-zinc-300">
              {CONTENT[activeTab].body}
            </p>
            <p className="text-lg md:text-xl text-zinc-400">
              {CONTENT[activeTab].footer}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
