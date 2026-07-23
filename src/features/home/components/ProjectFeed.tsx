import { ArrowRight } from "lucide-react";
import Link from "next/link";

const PROJECTS = [
  {
    id: "project-1",
    title: "Driving Self-Serve Adoption by Personalizing the B2B Experience",
    href: "/work/tradeling",
  },
  {
    id: "project-2",
    title: "Reimaging SME Lending in MENA",
    href: "#",
  },
  {
    id: "project-3",
    title: "Revolutionizing Government Services for Abu Dhabi",
    href: "#",
  },
];

function PlaceholderImage() {
  return (
    <div className="w-full aspect-[4/3] md:aspect-[16/11] bg-zinc-100 rounded-lg flex items-center justify-center">
      {/* Simple SVG matching the screenshot placeholder */}
      <svg
        className="w-32 h-32 text-zinc-300"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
        ></path>
      </svg>
    </div>
  );
}

export function ProjectFeed() {
  return (
    <div className="flex flex-col gap-24 md:py-24">
      {PROJECTS.map((project) => (
        <article key={project.id} className="group cursor-pointer">
          <Link href={project.href} className="block space-y-6">
            <div className="flex items-center justify-between text-blue-500 font-medium">
              <h2 className="text-lg md:text-xl tracking-tight">
                {project.title}
              </h2>
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </div>
            
            <div className="overflow-hidden rounded-lg bg-zinc-900 border border-zinc-800 transition-transform duration-300 group-hover:scale-[1.02]">
               <PlaceholderImage />
            </div>
          </Link>
        </article>
      ))}
    </div>
  );
}
