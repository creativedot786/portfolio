// Titles match each case study's own title; the eyebrow is industry · platform, as on the case study.
// The line is the case study's summary, shortened, with one number from it.
// `image` is a path under /public. Leave it off and the frame falls back to the placeholder,
// so case studies can land one at a time without anything looking broken. Scout has no still:
// its card plays a short loop instead (ScoutPromo.astro).
export type Work = { slug: string; industry: 'fintech' | 'gov' | 'commerce' | 'proptech'; industryLabel: string; platform: string; href: string; title: string; line: string; image?: string; alt?: string };

export const work: Work[] = [
  {
    slug: 'scout',
    href: '/work/scout/',
    industry: 'proptech',
    industryLabel: 'PropTech · Agentic AI',
    platform: 'Mobile web',
    title: 'An agentic AI property search that shows what it understood',
    line: 'Scout is a conversational way to find a home to rent in Dubai, explored for Property Finder. It keeps a short memory of what it understood, marks what it guessed, and shows only the homes that match. A real model, built with Claude Code in a few hours.',
  },
  {
    slug: 'tradeling-b2b',
    href: '/work/tradeling/',
    image: '/work/tradeling-b2b.avif',
    alt: 'Three screens from the Tradeling app: a grocer’s tailored home feed, the Axiom electronics storefront with credit and brand shortcuts, and a buy-again and category view',
    industry: 'commerce',
    industryLabel: 'B2B Marketplace',
    platform: 'Mobile App',
    title: 'Increasing conversion rate and digital adoption by personalising the app experience',
    line: 'Most business customers on Tradeling ordered through sales agents, not the app. I redesigned it so each type of business gets its own home page. Conversion rose around 38%, and GMV from the app around 30%.',
  },
  {
    slug: 'tradeling-lending',
    href: '/work/qfunder/',
    image: '/work/tradeling-lending.jpg',
    alt: 'The Q Funder landing page, Tradeling’s SME lending product, offering UAE working capital loans up to AED 1M in 24 hours with no collateral',
    industry: 'fintech',
    industryLabel: 'Fintech',
    platform: 'Web Portal',
    title: 'Reimagining quick loans for small businesses in the UAE',
    line: 'QFunder is Tradeling’s new fintech vertical. Banks rarely lend to small businesses, and when they do, it takes weeks. We built an MVP to test a faster way: apply online in minutes, get funded in 24 hours. We built and tested it in two months.',
  },
  {
    slug: 'tamm',
    href: '/work/tamm/',
    image: '/work/tamm.webp',
    alt: 'Three screens from the TAMM app: a personalised home with quick actions for fines and bills, a documents and saved services view, and featured services with public holidays',
    industry: 'gov',
    industryLabel: 'e-Government',
    platform: 'Mobile App',
    title: 'Building one home for Abu Dhabi’s government services',
    line: 'TAMM is Abu Dhabi’s initiative to bring government services into one ecosystem. The services were fragmented, so we built one unified digital system where citizens, residents, businesses and visitors complete them in one place. Downloads went from 1K to 19K between January and June.',
  },
];
