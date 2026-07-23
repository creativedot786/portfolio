import { Header } from "@/features/home/components/Header";
import { HeroTabs } from "@/features/home/components/HeroTabs";
import { ProjectFeed } from "@/features/home/components/ProjectFeed";
import { Footer } from "@/features/home/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <main className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-24">
        <Header />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24 relative">
          
          {/* Left Column (Sticky on Desktop) */}
          <div className="md:sticky md:top-0 md:h-screen flex flex-col pt-12 md:pt-0">
             <HeroTabs />
          </div>

          {/* Right Column (Scrollable Projects) */}
          <div className="flex flex-col">
            <ProjectFeed />
          </div>

        </div>
      </main>
      <Footer />
    </div>
  );
}
