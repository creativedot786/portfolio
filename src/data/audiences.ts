import { previews } from './previews';

export type Audience = { id: string; label: string; heading: string; body: string; close?: string };

// Emphasis. White against a muted statement, never a hue.
const em = (text: string) => `<em class="not-italic text-primary">${text}</em>`;

// Emphasis that also carries a hover preview. `key` must exist in previews.ts.
// Renders as a link when that entry has an href, otherwise as a span.
const mark = (key: keyof typeof previews, text: string) => {
  const p = previews[key];
  const attrs = `class="not-italic" data-preview="${key}"`;
  return p.href
    ? `<a ${attrs} href="${p.href}" target="_blank" rel="noopener">${text}<span class="sr-only"> (opens in a new tab)</span></a>`
    : `<em ${attrs}>${text}</em>`;
};

export const audiences: Audience[] = [
  {
    id: 'anyone',
    label: 'For anyone',
    heading: `I design products used by millions. I also ${mark('built-and-launched', 'build with AI')}.`,
    body: `10+ years, most of it designing for other people to build. AI changed that. What hasn't changed is deciding what's worth building in the first place.`,
  },
  {
    id: 'recruiters',
    label: 'Recruiters',
    heading: `Senior product designer, ${em('10+ years')}.`,
    body: `${mark('fintech', 'Fintech')}, ${mark('e-government', 'e&#8209;government')} and ${mark('e-commerce', 'e&#8209;commerce')}, across startups and large organisations. I've led design end to end on products used by hundreds of thousands of people, with AI built into how I work.`,
    close: 'Open to senior and lead roles. Remote or onsite. Open to relocation.',
  },
  {
    id: 'pms',
    label: 'Product managers',
    heading: `A design partner in the problem space, ${em('not after the brief')}.`,
    body: `I help shape what we're building and why, keep design and engineering pointed at the same thing, and use AI to put a working version in front of you early, while changing our minds is still cheap.`,
  },
  {
    id: 'designers',
    label: 'Designers',
    heading: `I'd rather ${em('raise the team')} than out-design it.`,
    body: `I mentor, I review, and I share context before anyone has to ask for it. AI is how the team explores wider and gets to something testable sooner, without the quality dropping to pay for it.`,
  },
  {
    id: 'engineers',
    label: 'Engineers',
    heading: `Designs ${em('made to be built')}.`,
    body: `You get states and edge cases decided before they reach you, and a designer who stays close through the build rather than disappearing at handoff. I use AI to settle the ambiguity early, so fewer questions land mid-sprint.`,
  },
];
