// Hover previews.
//
// To add a word: add an entry here, then wrap the word with mark() in the copy.
// To change a word's image, link or caption: edit its entry. Nothing else needs touching.
//
// `image` is a path under /public. A missing or failed image degrades gracefully:
// the word still reads as emphasis, still underlines on hover, still links — no card appears.

export type Preview = {
  image: string;
  alt: string;
  title: string;
  subtitle: string;
  href?: string;
};

export const previews: Record<string, Preview> = {
  'built-and-launched': {
    image: '/previews/tgx.jpg',
    alt: 'The international sales portal, designed, built and launched end to end',
    title: 'International sales portal',
    subtitle: 'Designed it, built it with AI, shipped it without a handoff',
  },
  fintech: {
    image: '/previews/bsf.jpg',
    alt: 'Banque Saudi Fransi',
    title: 'Banque Saudi Fransi',
    subtitle: 'Operations and customer support portal',
    href: 'https://bsf.sa/english/home',
  },
  'e-government': {
    image: '/previews/tamm.jpg',
    alt: "TAMM, the Abu Dhabi government's services app",
    title: 'TAMM',
    subtitle: "Abu Dhabi government services",
    href: 'https://www.tamm.abudhabi/',
  },
  'e-commerce': {
    image: '/previews/tradeling.jpg',
    alt: 'Tradeling, a B2B marketplace',
    title: 'Tradeling',
    subtitle: 'B2B marketplace for MENA',
    href: 'https://tradeling.com',
  },
};
