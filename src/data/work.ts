// Titles name the product. The line says what I did and what it changed, in that order.
// `image` is a path under /public. Leave it off and the frame falls back to the placeholder,
// so case studies can land one at a time without anything looking broken.
export type Work = { slug: string; industry: 'fintech' | 'gov' | 'commerce'; industryLabel: string; title: string; line: string; image?: string; alt?: string };

export const work: Work[] = [
  {
    slug: 'tradeling-b2b',
    image: '/work/tradeling-b2b.avif',
    alt: 'Three screens from the Tradeling app: a grocer’s tailored home feed, the Axiom electronics storefront with credit and brand shortcuts, and a buy-again and category view',
    industry: 'commerce',
    industryLabel: 'e-Commerce',
    title: 'Tradeling B2B Experience',
    line: 'I broke a one-size-fits-all marketplace into tailored experiences for grocers, electronics retailers and enterprise buyers, and rebuilt the category architecture underneath it. Conversion rose around 38% and sessions ran 21% longer.',
  },
  {
    slug: 'tradeling-lending',
    image: '/work/tradeling-lending.jpg',
    alt: 'The Q Funder landing page, Tradeling’s SME lending product, offering UAE working capital loans up to AED 1M in 24 hours with no collateral',
    industry: 'fintech',
    industryLabel: 'Fintech',
    title: 'Tradeling Fintech, SME Lending in UAE',
    line: 'Tradeling set out to fund SMEs in 24 hours, in a market where credit takes weeks. I worked with the PM on how to get there, from what to build versus buy to where automation could replace manual checks, then led end-to-end design for the MVP: landing page, onboarding, verification and the loan dashboard. We shipped in two months.',
  },
  {
    slug: 'tamm',
    image: '/work/tamm.webp',
    alt: 'Three screens from the TAMM app: a personalised home with quick actions for fines and bills, a documents and saved services view, and featured services with public holidays',
    industry: 'gov',
    industryLabel: 'e-Government',
    title: 'TAMM, Abu Dhabi Govt. Services',
    line: 'I rebuilt the information architecture around what residents actually need, designed the core journeys for applying for government services on mobile, and built the design system behind them.',
  },
];
