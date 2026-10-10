// Each beat's photographs. On desktop they appear one at a time, following the cursor across the beat;
// on phones and touch screens they sit under the copy as a row of prints. Every photograph in a beat is
// shown at the same 4:3 crop, so a tall one (a Facebook page) no longer towers over the rest; `focus`
// is the object-position that keeps the subject in that crop. Alt text says what is in the frame.
export type BeatPhoto = { src: string; alt: string; focus?: string };
export type Beat = { id: string; place: string; when: string; heading: string; body: string; photos: BeatPhoto[] };

// Emphasis, as in the hero: the name in ink against the muted line.
const em = (text: string) => `<em class="not-italic text-primary">${text}</em>`;

export const beats: Beat[] = [
  {
    id: 'cubix',
    place: 'Karachi',
    when: '2011',
    heading: 'I started out when Facebook company pages were still a design brief.',
    body: `Cubix was an agency in Karachi with clients abroad. I designed company pages and websites, and got my first exposure to mobile apps, back when that meant a 320 by 480 pixel iPhone screen.`,
    photos: [
      { src: '/journey/cubix/desk.jpg', alt: 'At a desk in the Cubix office, a poker game on the screen' },
      { src: '/journey/cubix/fan-o-matic.jpg', alt: 'Fan-O-Matic, a Facebook leaderboard app for Walmart', focus: 'center 6%' },
      { src: '/journey/cubix/spin-to-win.jpg', alt: 'Spin to Win, a Facebook app for Casinotop10' },
    ],
  },
  {
    id: 'tz',
    place: 'Dar es Salaam',
    when: '2012',
    heading: 'At twenty, the only designer in the company.',
    body: `I took a job in Tanzania because working abroad felt like too good an opportunity to pass up. Branding and websites for local clients. It's where I learned to own a piece of work end to end.`,
    photos: [
      { src: '/journey/tz/coast.jpg', alt: 'Standing on the rocks at the coast near Dar es Salaam' },
      { src: '/journey/tz/beach.jpg', alt: 'Palm trees along a beach in Tanzania' },
      { src: '/journey/tz/tortoise.jpg', alt: 'Holding a tortoise, with more of them on the ground behind' },
    ],
  },
  {
    id: 'conceptualize',
    place: 'Karachi, then Dubai',
    when: '2014 to 2019',
    heading: 'Founding designer at a Dubai&nbsp;agency.',
    body: `I joined Conceptualize, a Dubai design agency, as its founding designer, working remotely from Karachi until I moved to Dubai in 2017. As the agency grew I built the design function, hired and ran a team of four, and worked with clients like RTA and Meydan.`,
    photos: [
      { src: '/journey/conceptualize/team.jpg', alt: 'Three of the Conceptualize team with the Meydan Golf team', focus: 'center 35%' },
      { src: '/journey/conceptualize/stickies.jpg', alt: 'Brainstorming with the dubizzle team: a wall of sticky notes around printed screens' },
      { src: '/journey/conceptualize/monitor.jpg', alt: 'At a monitor showing the Conceptualize website' },
      { src: '/journey/conceptualize/wall.jpg', alt: 'The office, a design tool up on the video wall' },
    ],
  },
  {
    id: 'dubai',
    place: 'Dubai',
    when: '2019 to today',
    heading: 'From agency to product, one at a time.',
    body: `In 2019 I joined the team behind ${em('TAMM')}. Since then: a digital bank at ${em('Banque Saudi Fransi')}, an on-demand home services app at Rizek, and ${em('Tradeling')}, a B2B marketplace, where AI became part of the daily workflow.`,
    photos: [
      { src: '/journey/dubai/bsf.jpg', alt: 'First day at Banque Saudi Fransi, in front of the “We are BSF” wall', focus: 'center 40%' },
      { src: '/journey/dubai/desert.jpg', alt: 'A TAMM team outing in the desert' },
      { src: '/journey/dubai/workshop.jpg', alt: 'Presenting to a room from a standing desk' },
    ],
  },
];
