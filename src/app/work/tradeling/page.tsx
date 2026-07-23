import { Header } from "@/features/home/components/Header";
import { Footer } from "@/features/home/components/Footer";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function TradelingCaseStudy() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-zinc-300 selection:bg-blue-500/30 font-sans">
      <main className="max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-12 pt-8 md:pt-12 pb-24 md:pb-32">
        <nav className="mb-12">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-zinc-500 hover:text-white transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            Back to Home
          </Link>
        </nav>

        <article className="space-y-24">

          {/* HEADER SECTION */}
          <header className="space-y-12">
            <div className="space-y-6">
              <p className="text-blue-500 font-medium tracking-wide text-sm uppercase">Ecommerce, B2B</p>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-medium text-white tracking-tight leading-[1.1]">
                Driving Self-Serve Adoption by Personalizing the B2B Experience
              </h1>
              <p className="text-xl md:text-2xl text-zinc-400 leading-relaxed max-w-3xl">
                How I transformed a generic &quot;one-size-fits-all&quot; app into a hyper-personalized ecosystem, reducing sales agent dependency and unlocking digital growth.
              </p>
            </div>

            {/* METADATA GRID */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-8 border-y border-zinc-800">
              <div>
                <h3 className="text-sm font-medium text-white mb-2">Team</h3>
                <p className="text-sm text-zinc-400 leading-relaxed">1 PM, 3 Eng,<br />1 Data Analyst</p>
              </div>
              <div className="col-span-2">
                <h3 className="text-sm font-medium text-white mb-2">Focus</h3>
                <p className="text-sm text-zinc-400 leading-relaxed">
                  User Research, Information Architecture, UX Design, Stakeholder Alignment, Data-informed Design
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-white mb-2">Timeline</h3>
                <p className="text-sm text-zinc-400 leading-relaxed">3 Months<br />(Strategy to Launch)</p>
              </div>
            </div>
          </header>

          {/* OVERVIEW SECTION */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
            <div>
              <h3 className="text-lg font-medium text-white mb-4">Background</h3>
              <p className="text-zinc-400 leading-relaxed">
                Tradeling is MENA's leading B2B marketplace serving diverse sectors (e.g., Grocery, HoReCa, Electronics). Historically, a generic "one-size-fits-all" approach caused friction for these specialized users.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-medium text-white mb-4">Challenge</h3>
              <p className="text-zinc-400 leading-relaxed">
                Users were overwhelmed by irrelevant content, causing high bounce rates and a 78% reliance on offline sales agents. Additionally, we needed to migrate thousands of Axiom (electronics) users without losing their exclusive, tailored experience.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-medium text-white mb-4">Impact</h3>
              <p className="text-zinc-400 leading-relaxed">
                +21% session duration, 15% CTR on new engagement features, and the retention of ~2,000 active users from the Axiom acquisition.
              </p>
            </div>
          </section>

          {/* FULL STORY */}
          <section className="space-y-16">
            <div className="space-y-8 max-w-3xl">
              <div className="space-y-4">
                <h2 className="text-3xl md:text-4xl font-medium text-white tracking-tight">Full Story</h2>
                <h3 className="text-2xl font-medium text-white">A "Generalist" App in a Specialist Market</h3>
              </div>
              <p className="text-lg text-zinc-400 leading-relaxed">
                Tradeling is the dominant B2B marketplace in the MENA region, but our digital adoption was lagging. While we had a functional app, 78% of our GMV was still driven by sales agents manually placing orders for customers.
              </p>
              <p className="text-lg text-zinc-400 leading-relaxed">
                The core problem? We were forcing diverse business types—from corner grocery stores (Baqalas) to high-tech electronics retailers—into a single, generic "one-size-fits-all" experience.
              </p>

              <ul className="space-y-6 list-none pl-0">
                <li className="relative pl-6">
                  <span className="absolute left-0 top-2.5 w-2 h-2 rounded-full bg-blue-500"></span>
                  <strong className="text-white">High Friction:</strong> ~20% of sessions bounced in under 10 seconds due to irrelevant content.
                </li>
                <li className="relative pl-6">
                  <span className="absolute left-0 top-2.5 w-2 h-2 rounded-full bg-blue-500"></span>
                  <strong className="text-white">The Migration Crisis:</strong> We acquired Axiom (a major electronics distributor) and needed to migrate their users to our platform. These users were accustomed to an exclusive, closed-loop app and were at high risk of churning if thrown into a generic open marketplace.
                </li>
              </ul>

              <p className="text-lg text-zinc-400 leading-relaxed italic border-l-4 border-zinc-800 pl-6 py-2">
                As the Lead Product Designer, I moved beyond execution to Product Strategy. I defined the "Verticals" architecture, pitched the solution to the C-Suite, and secured executive buy-in. I worked in lock-step with Product Managers and Data Analysts to validate the segmentation and manually defined the complex logic required to map our backend inventory to user-facing categories.
              </p>
            </div>
          </section>

          {/* RESEARCH & INSIGHTS */}
          <section className="space-y-16">
            <div className="space-y-8 max-w-3xl">
              <h2 className="text-3xl md:text-4xl font-medium text-white tracking-tight">Research & Insights</h2>
              <p className="text-lg text-zinc-400 leading-relaxed">
                We initially assumed low adoption was a training issue. Research proved it was an architecture issue. I led a comprehensive discovery phase to map the real-world behaviors of our customers.
              </p>

              <div className="space-y-12 pt-8">
                <div className="space-y-4">
                  <h3 className="text-2xl font-medium text-white">Field Observation: Decoding Operational Realities</h3>
                  <p className="text-lg text-zinc-400 leading-relaxed">
                    I shadowed sales agents and visited diverse business types to understand their daily operations. I observed that "Business Size" and "Sector" dictate behavior more than just category.
                  </p>
                </div>

                <div className="space-y-8">
                  <div className="bg-zinc-900/50 border border-zinc-800 p-8 rounded-2xl">
                    <h4 className="text-xl font-medium text-white mb-4">The Universal Pain Point: "Cognitive Overload"</h4>
                    <p className="text-zinc-400 leading-relaxed">
                      Regardless of size or sector, every business owner I spoke to shared the same frustration: The app was overwhelming. A consistent piece of feedback was the desire to "only see what I sell." A grocer didn't want to scroll past construction tools; a salon owner didn't want to see electronics. This universal insight validated the need for a strict "Vertical" approach rather than just better filters.
                    </p>
                  </div>

                  <div className="bg-zinc-900/50 border border-zinc-800 p-8 rounded-2xl">
                    <h4 className="text-xl font-medium text-white mb-4">Strategic Segmentation: The Matrix</h4>
                    <p className="text-zinc-400 leading-relaxed mb-4">
                      <strong>Micro Businesses</strong> (e.g., Corner Shops) lack storage space and order strictly on an "as-needed" basis. This insight led us to categorize their inventory accordingly.
                    </p>
                    <p className="text-zinc-400 leading-relaxed">
                      <strong>Medium Businesses</strong> order in bulk to secure margins and prioritize negotiation. They are comfortable with 1-2 day delivery windows. This validated pushing our "Dropship" catalogue (wider range, slower delivery) specifically to this segment.
                    </p>
                  </div>

                  <div className="bg-zinc-900/50 border border-zinc-800 p-8 rounded-2xl">
                    <h4 className="text-xl font-medium text-white mb-4">The Inventory Opportunity (HoReCa & Salons)</h4>
                    <p className="text-zinc-400 leading-relaxed">
                      I observed that Restaurants and Salons, doing self-procurement, were highly price-sensitive. They expressed willingness to accept Close-to-Expiry products or Damaged Boxes for a discount. I shared this insight with the Logistics and Warehousing teams, enabling them to push specific inventory tiers to these users that would otherwise go to waste.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* THE SOLUTION */}
          <section className="space-y-16">
            <div className="space-y-8 max-w-3xl">
              <h2 className="text-3xl md:text-4xl font-medium text-white tracking-tight">The Solution: "Verticals" on a Unified Core</h2>
              <p className="text-lg text-zinc-400 leading-relaxed">
                We moved from a monolithic app to a "Multi-Vertical" Framework. Depending on the user's login credentials (defined by their Trade License and Business Type), the app dynamically reconfigures itself.
              </p>

              <div className="space-y-6 pt-8">
                <h3 className="text-2xl font-medium text-white">Strategic Prioritization: The Phased Rollout</h3>
                <p className="text-lg text-zinc-400 leading-relaxed">
                  To manage risk, I advocated for a solution that wasn't a hard launch for everyone. We built the "Verticals" framework to be modular, allowing us to enable the new personalized experience segment by segment. This granular control allowed the Data and Product teams to monitor the impact on GMV and bounce rates for specific cohorts before rolling it out widely.
                </p>
                <ul className="space-y-6 list-none pl-0 pt-4">
                  <li className="relative pl-6">
                    <span className="absolute left-0 top-2.5 w-2 h-2 rounded-full bg-blue-500"></span>
                    <strong className="text-white">"Hyper" Personalization:</strong> We activated the curated experience for Electronics (critical for the Axiom migration) and Grocery (highest volume). This targeted approach let us closely monitor performance data for our most critical users first.
                  </li>
                  <li className="relative pl-6">
                    <span className="absolute left-0 top-2.5 w-2 h-2 rounded-full bg-blue-500"></span>
                    <strong className="text-white">The "Default" Safety Net:</strong> For the remaining segments (Beauty, Office, General), we maintained the "Default Vertical". This view exposed all catalogues, ensuring we didn't disrupt revenue for smaller segments while we validated the new model with our core users.
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* FEATURE SPOTLIGHT */}
          <section className="space-y-16 bg-zinc-900/30 -mx-4 sm:-mx-6 lg:-mx-12 px-4 sm:px-6 lg:px-12 py-16 md:py-24 border-y border-zinc-800">
            <div className="max-w-3xl mx-auto space-y-8">
              <div className="inline-block px-3 py-1 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-sm font-medium mb-4">
                Feature Spotlight
              </div>
              <h2 className="text-3xl md:text-4xl font-medium text-white tracking-tight">The Automated Negotiation Bot</h2>

              <div className="space-y-6">
                <p className="text-lg text-zinc-400 leading-relaxed">
                  <strong className="text-white">The Insight:</strong> 60% of our B2B orders are negotiated. Users weren't rejecting the app; they were rejecting "Fixed Pricing." To drive adoption, we had to digitize the "haggling" experience without destroying our margins.
                </p>
                <p className="text-lg text-zinc-400 leading-relaxed">
                  <strong className="text-white">The Interaction Script (UX):</strong> Instead of a cold "Make Offer" form, I designed a conversational modal that mimics a sales agent.
                </p>
              </div>

              <div className="bg-[#0a0a0a] p-8 rounded-2xl border border-zinc-800 mt-8">
                <h4 className="text-xl font-medium text-white mb-6">The Result</h4>
                <ul className="space-y-4">
                  <li className="flex gap-4">
                    <span className="text-blue-500 font-bold">•</span>
                    <p className="text-zinc-400"><strong className="text-white">Instant Gratification:</strong> Users get the "win" of a discount instantly.</p>
                  </li>
                  <li className="flex gap-4">
                    <span className="text-blue-500 font-bold">•</span>
                    <p className="text-zinc-400"><strong className="text-white">Margin Protection:</strong> The system never goes below the pre-set SP without manual BackOffice approval.</p>
                  </li>
                  <li className="flex gap-4">
                    <span className="text-blue-500 font-bold">•</span>
                    <p className="text-zinc-400"><strong className="text-white">Fear of Missing Out (FOMO):</strong> The "24-hour lock" drove immediate checkout conversion.</p>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* STRATEGIC UX WINS */}
          <section className="space-y-16">
            <div className="space-y-12 max-w-3xl">
              <h2 className="text-3xl md:text-4xl font-medium text-white tracking-tight">The Strategic UX Wins</h2>

              <div className="space-y-6">
                <h3 className="text-2xl font-medium text-white">Unified Cart, Split Logic</h3>
                <p className="text-lg text-zinc-400 leading-relaxed">
                  The biggest design challenge was the cart. A user might buy apples (Grocery) and a phone (Electronics) in one session.
                </p>
                <ul className="space-y-8 list-none pl-0 pt-4">
                  <li className="space-y-2">
                    <strong className="text-white text-lg block">Collaboration</strong>
                    <p className="text-zinc-400 leading-relaxed">I brainstormed extensively with Developers and Product Managers to map out the complex logic for handling mixed baskets.</p>
                  </li>
                  <li className="space-y-2">
                    <strong className="text-white text-lg block">Logic</strong>
                    <p className="text-zinc-400 leading-relaxed">We designed a Unified Cart where products from different verticals are clubbed together. For most users, this means a single checkout button, with the backend splitting orders "behind the doors."</p>
                  </li>
                  <li className="space-y-2">
                    <strong className="text-white text-lg block">Exception</strong>
                    <p className="text-zinc-400 leading-relaxed">For users holding credit lines with both Axiom and Tradeling, the cart remains unified visually, but displays two separate checkout CTAs. This ensures clear separation of financial liability while maintaining a cohesive shopping experience.</p>
                  </li>
                </ul>
              </div>

              <div className="space-y-6 pt-12">
                <h3 className="text-2xl font-medium text-white">Scalable CMS (Strapi)</h3>
                <p className="text-lg text-zinc-400 leading-relaxed">
                  To prevent operational burnout, I strategized a component-based layout system with developers. The Content Team manages one master page in Strapi, simply tagging sections as "Visible to Grocery" or "Visible to Electronics."
                </p>
              </div>

              <div className="space-y-6 pt-12">
                <h3 className="text-2xl font-medium text-white">Data-Driven Category Architecture (IA)</h3>
                <ul className="space-y-4">
                  <li className="flex gap-4">
                    <span className="text-blue-500 font-bold">•</span>
                    <p className="text-zinc-400"><strong className="text-white">Challenge:</strong> Our generalized backend category tree created noise.</p>
                  </li>
                  <li className="flex gap-4">
                    <span className="text-blue-500 font-bold">•</span>
                    <p className="text-zinc-400"><strong className="text-white">Strategy:</strong> Partnering with Data Analysts, I mapped transaction data to identify the specific L1/L2 categories each segment actually buys.</p>
                  </li>
                  <li className="flex gap-4">
                    <span className="text-blue-500 font-bold">•</span>
                    <p className="text-zinc-400"><strong className="text-white">Solution:</strong> We build "Virtual Categories" to act as smart filters. Example: For Grocers, we created a "Virtual Electronics" shelf that excludes Large Appliances (Washing Machines) but includes high-margin cross-sells like Chargers & Batteries.</p>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* THE IMPACT */}
          <section className="space-y-16">
            <div className="space-y-8 max-w-3xl">
              <h2 className="text-3xl md:text-4xl font-medium text-white tracking-tight">The Impact</h2>

              <div className="space-y-12">
                <div className="space-y-6">
                  <h3 className="text-2xl font-medium text-white">Early Launch Results</h3>
                  <p className="text-lg text-zinc-400 leading-relaxed">
                    The initial rollout confirmed that "noise reduction" directly correlates with higher engagement.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                    <div className="bg-zinc-900/50 border border-zinc-800 p-6 rounded-2xl">
                      <h4 className="text-white font-medium mb-2">Engagement Surge</h4>
                      <p className="text-zinc-400 text-sm leading-relaxed">Average session duration on the App Homepage increased by ~21% (11.6s → 14s). By hiding irrelevant content, we stopped users from bouncing and encouraged browsing.</p>
                    </div>
                    <div className="bg-zinc-900/50 border border-zinc-800 p-6 rounded-2xl">
                      <h4 className="text-white font-medium mb-2">Validated Relevance</h4>
                      <p className="text-zinc-400 text-sm leading-relaxed">The new "Activity Panel," designed to surface recent orders and negotiation status, achieved a 15% CTR.</p>
                    </div>
                    <div className="bg-zinc-900/50 border border-zinc-800 p-6 rounded-2xl md:col-span-2">
                      <h4 className="text-white font-medium mb-2">Successful Migration</h4>
                      <p className="text-zinc-400 text-sm leading-relaxed">Retained ~2k active Axiom users post-migration by providing a bespoke "Electronics Store" that felt familiar yet expanded.</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-6 pt-8">
                  <h3 className="text-2xl font-medium text-white">Long-Term Strategic Wins</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                    <div className="bg-blue-500/10 border border-blue-500/20 p-6 rounded-2xl">
                      <h4 className="text-blue-400 font-medium mb-2">Business Growth</h4>
                      <p className="text-zinc-300 text-sm leading-relaxed">On track to increase digital GMV share from 33% to 43% by reducing agent dependency.</p>
                    </div>
                    <div className="bg-blue-500/10 border border-blue-500/20 p-6 rounded-2xl">
                      <h4 className="text-blue-400 font-medium mb-2">Unlocked Monetization</h4>
                      <p className="text-zinc-300 text-sm leading-relaxed">The modular design of the new homepage (specifically the "Configurable Pills") has opened a new revenue stream.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

        </article>
      </main>
      <Footer />
    </div>
  );
}
