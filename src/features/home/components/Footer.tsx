"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

const bars = [
  { initialWidth: "98%", color: "#111111" },
  { initialWidth: "96%", color: "#222222" },
  { initialWidth: "92%", color: "#333333" },
  { initialWidth: "88%", color: "#444444" },
  { initialWidth: "84%", color: "#555555" },
  { initialWidth: "80%", color: "#666666" },
  { initialWidth: "76%", color: "#777777" },
  { initialWidth: "72%", color: "#888888" },
  { initialWidth: "68%", color: "#999999" },
  { initialWidth: "64%", color: "#aaaaaa" },
  { initialWidth: "60%", color: "#cccccc" },
  { initialWidth: "56%", color: "#e6e6e6" },
  { initialWidth: "52%", color: "#f5f5f5" },
];

export function Footer() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      setTime(
        new Intl.DateTimeFormat("en-US", {
          timeZone: "Asia/Dubai",
          hour: "numeric",
          minute: "numeric",
          second: "numeric",
          hour12: true,
        }).format(new Date()) + " (Local Time)"
      );
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <footer className="w-full bg-white text-black overflow-hidden relative z-10">
      {/* Cascading visual effect */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, margin: "-10% 0px" }}
        className="flex flex-col items-end mb-16 w-full"
      >
        {bars.map((bar, index) => (
          <motion.div
            key={index}
            variants={{
              hidden: { width: bar.initialWidth },
              visible: { width: "100%" }
            }}
            transition={{
              duration: 0.8,
              delay: index * 0.04,
              ease: [0.16, 1, 0.3, 1], // easeOut
            }}
            className="h-8 md:h-12"
            style={{ backgroundColor: bar.color }}
          />
        ))}
      </motion.div>

      {/* Contact & Info Grid */}
      <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row justify-between items-start md:items-end gap-12 px-4 sm:px-6 lg:px-12 xl:px-24 pb-12 md:pb-24">

        {/* Left Side */}
        <div className="flex flex-col gap-2">
          <p className="font-medium text-base">Dubai, United Arab Emirates</p>
          <p className="text-sm text-zinc-600" suppressHydrationWarning>
            {time || "Loading time..."}
          </p>
          <p className="mt-8 md:mt-16 text-sm text-zinc-600">©2026</p>
        </div>

        {/* Right Side */}
        <div className="flex flex-col gap-4 w-full md:w-auto text-sm font-medium">
          <a
            href="mailto:huzaifa.creativedot@gmail.com"
            className="group flex items-center justify-between gap-4 hover:text-zinc-600 transition-colors"
          >
            <span>huzaifa.creativedot[at]gmail.com</span>
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </a>

          <a
            href="#"
            className="group flex items-center justify-between gap-4 hover:text-zinc-600 transition-colors"
          >
            <span>LinkedIn</span>
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </a>

          <a
            href="#"
            className="group flex items-center justify-between gap-4 hover:text-zinc-600 transition-colors"
          >
            <span>Resume</span>
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </a>
        </div>

      </div>
    </footer>
  );
}
