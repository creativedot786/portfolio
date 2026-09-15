// `photos`, when present, is rendered as a scattered composition in a fixed order: the first is
// the large one. Alt text describes what is actually in the frame. `photo` is the placeholder
// label for beats that have no photographs yet.
export type BeatPhoto = { src: string; alt: string };
export type Beat = { place: string; when: string; heading: string; body: string; photo: string; photos?: BeatPhoto[] };

// Same hover-preview mechanism as the hero. Keys live in previews.ts.
const ind = (key: 'fintech' | 'e-government' | 'e-commerce', href: string, text: string) =>
  `<a href="${href}" target="_blank" rel="noopener" data-preview="${key}">${text}<span class="sr-only"> (opens in a new tab)</span></a>`;

export const beats: Beat[] = [
  {
    place: 'Karachi',
    when: '2011',
    heading: 'I started out when Facebook company pages were still a design brief.',
    body: `Cubix was an agency in Karachi with clients abroad. I designed company pages and websites, and got my first exposure to mobile apps, back when that meant a 320 by 480 pixel iPhone screen.`,
    photo: 'Cubix',
    photos: [
      { src: '/journey/cubix/desk.jpg',        alt: 'At a desk in the Cubix office, a poker game on the screen' },
      { src: '/journey/cubix/rooftop.jpg',     alt: 'Two of the team on the office rooftop, Karachi behind them' },
      { src: '/journey/cubix/fan-o-matic.jpg', alt: 'Fan-O-Matic, a Facebook leaderboard app for Walmart' },
      { src: '/journey/cubix/spin-to-win.jpg', alt: 'Spin to Win, a Facebook app for Casinotop10' },
      { src: '/journey/cubix/card.jpg',        alt: 'The Cubix Labs business card' },
    ],
  },
  {
    place: 'Dar es Salaam',
    when: '2012',
    heading: 'At twenty, the only designer in the company.',
    body: `I took a job in Tanzania because working abroad felt like too good an opportunity to pass up. Branding and websites for local clients. It's where I learned to own a piece of work end to end.`,
    photo: 'Tanzania',
  },
  {
    place: 'Karachi, then Dubai',
    when: '2014 to 2019',
    heading: 'Five years at a Dubai agency, from founding designer to a team of four.',
    body: `I joined Conceptualize, a Dubai design agency, as its founding designer, working remotely from Karachi until I moved to Dubai in 2017. As the agency grew I built the design function, hired and ran a team of four, and worked with clients like RTA and Meydan.`,
    photo: 'Conceptualize',
  },
  {
    place: 'Dubai',
    when: '2019 to today',
    heading: 'One product at a time, instead of a new client every month.',
    body: `In 2019 I joined the team behind ${ind('e-government', 'https://www.tamm.abudhabi/', 'TAMM')}. Since then: a digital bank at ${ind('fintech', 'https://bsf.sa/english/home', 'Banque Saudi Fransi')}, an on-demand home services app at Rizek, and ${ind('e-commerce', 'https://tradeling.com', 'Tradeling')}, a B2B marketplace, where AI became part of the daily workflow.`,
    photo: 'TAMM whiteboard',
  },
];
