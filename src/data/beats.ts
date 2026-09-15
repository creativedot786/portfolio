// Each beat's photographs sit on a five-column grid inside the photo slot (page columns 7-11,
// plus the trailing gutter so a photograph can end on the column-12 line). The grid's tracks
// alternate column / gutter, so page column n of the slot is track 2n-1, and a span that ends
// on a line ends on an even track + 1: `5 / 11` is columns 3-5 to the line, `3 / 6` is columns
// 2-3, `7 / 11` is columns 4-5 to the line. The slot's left two columns fade under the copy,
// so what sits in tracks 1-4 is the photograph the beat can afford to lose.
// `ar` is the crop, `tape` where the strip goes (t: top centre, tl / tr: the corner), `align`
// pins a photograph to the bottom of its row. Alt text describes what is actually in the frame.
export type BeatPhoto = {
  src: string; alt: string;
  col: string; row: number; ar: string; tape: 't' | 'tl' | 'tr'; align?: 'end';
};
export type Beat = { id: string; place: string; when: string; heading: string; body: string; photos: BeatPhoto[] };

// Same hover-preview mechanism as the hero. Keys live in previews.ts.
const ind = (key: 'fintech' | 'e-government' | 'e-commerce', href: string, text: string) =>
  `<a href="${href}" target="_blank" rel="noopener" data-preview="${key}">${text}<span class="sr-only"> (opens in a new tab)</span></a>`;

export const beats: Beat[] = [
  {
    id: 'cubix',
    place: 'Karachi',
    when: '2011',
    heading: 'I started out when Facebook company pages were still a design brief.',
    body: `Cubix was an agency in Karachi with clients abroad. I designed company pages and websites, and got my first exposure to mobile apps, back when that meant a 320 by 480 pixel iPhone screen.`,
    photos: [
      { src: '/journey/cubix/desk.jpg',        alt: 'At a desk in the Cubix office, a poker game on the screen',      col: '5 / 11', row: 1, ar: '3 / 2', tape: 't' },
      { src: '/journey/cubix/fan-o-matic.jpg', alt: 'Fan-O-Matic, a Facebook leaderboard app for Walmart',            col: '3 / 4',  row: 1, ar: '3 / 4', tape: 'tl', align: 'end' },
      { src: '/journey/cubix/spin-to-win.jpg', alt: 'Spin to Win, a Facebook app for Casinotop10',                   col: '7 / 11', row: 2, ar: '4 / 3', tape: 'tr' },
    ],
  },
  {
    id: 'tz',
    place: 'Dar es Salaam',
    when: '2012',
    heading: 'At twenty, the only designer in the company.',
    body: `I took a job in Tanzania because working abroad felt like too good an opportunity to pass up. Branding and websites for local clients. It's where I learned to own a piece of work end to end.`,
    photos: [
      { src: '/journey/tz/coast.jpg',    alt: 'Standing on the rocks at the coast near Dar es Salaam',         col: '5 / 11', row: 1, ar: '4 / 3', tape: 't' },
      { src: '/journey/tz/beach.jpg',    alt: 'Palm trees along a beach in Tanzania',                          col: '3 / 6',  row: 2, ar: '4 / 3', tape: 'tl' },
      { src: '/journey/tz/tortoise.jpg', alt: 'Holding a tortoise, with more of them on the ground behind',    col: '7 / 11', row: 2, ar: '4 / 3', tape: 'tr' },
    ],
  },
  {
    id: 'conceptualize',
    place: 'Karachi, then Dubai',
    when: '2014 to 2019',
    heading: 'Founding designer at a Dubai agency. Then a team to build.',
    body: `I joined Conceptualize, a Dubai design agency, as its founding designer, working remotely from Karachi until I moved to Dubai in 2017. As the agency grew I built the design function, hired and ran a team of four, and worked with clients like RTA and Meydan.`,
    photos: [
      { src: '/journey/conceptualize/team.jpg',     alt: 'Five of the Conceptualize team',                              col: '5 / 11', row: 1, ar: '1.02', tape: 't' },
      { src: '/journey/conceptualize/stickies.jpg', alt: 'A wall of sticky notes around printed dashboard screens',     col: '1 / 4',  row: 1, ar: '1.03', tape: 'tl', align: 'end' },
      { src: '/journey/conceptualize/monitor.jpg',  alt: 'At a monitor showing the Conceptualize website',              col: '3 / 6',  row: 2, ar: '1',    tape: 'tl' },
      { src: '/journey/conceptualize/wall.jpg',     alt: 'The office, a design tool up on the video wall',              col: '7 / 11', row: 2, ar: '1.08', tape: 'tr' },
    ],
  },
  {
    id: 'dubai',
    place: 'Dubai',
    when: '2019 to today',
    heading: 'From agency to product, one at a time.',
    body: `In 2019 I joined the team behind ${ind('e-government', 'https://www.tamm.abudhabi/', 'TAMM')}. Since then: a digital bank at ${ind('fintech', 'https://bsf.sa/english/home', 'Banque Saudi Fransi')}, an on-demand home services app at Rizek, and ${ind('e-commerce', 'https://tradeling.com', 'Tradeling')}, a B2B marketplace, where AI became part of the daily workflow.`,
    photos: [
      { src: '/journey/dubai/bsf.jpg',      alt: 'In front of the “We are BSF” wall at Banque Saudi Fransi',     col: '5 / 11', row: 1, ar: '1.14', tape: 't' },
      { src: '/journey/dubai/desert.jpg',   alt: 'A large group photo in the desert',                             col: '3 / 6',  row: 2, ar: '1.53', tape: 'tl' },
      { src: '/journey/dubai/workshop.jpg', alt: 'Presenting to a room from a standing desk',                     col: '7 / 11', row: 2, ar: '3 / 2', tape: 'tr' },
    ],
  },
];
