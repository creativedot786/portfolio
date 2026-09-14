# huzaifaratlam.com

Portfolio of Huzaifa Ratlam, senior product designer. One page, built to be read by hiring
managers and design leads.

## Stack

- **Astro 7** — static output, React islands only where interaction needs them
- **Tailwind v4** — the default palette, type scale and font stacks are wiped in `@theme`; only
  the site's own tokens exist, so an off-system value cannot be typed by accident
- **Motion** — for the cursor
- Fraunces (display) and Manrope (body), self-hosted via Fontsource

## How the design system works

Three seed colours make a theme:

```
--color-page   --color-primary   --color-accent
```

Every other colour is `color-mix(ink into ground)`, so a theme is three hex values and one
solved number — `--mix-tertiary`, the percentage the muted text needs to reach 4.5:1 on that
theme's particular ground. Four themes ship; each is declared in `src/data/themes.ts` and a
`:root[data-theme]` block in `src/styles/global.css`.

Layout is a single twelve-column grid. The content, the fixed left rail and the visible grid
lines all read the same template, so nothing can drift out of alignment.

## Working on it

```sh
npm install
npm run dev      # http://localhost:4321
npm run build    # static site in dist/
```

## The reasoning

Three files at the root record every decision and why it was made:

- `plan.md` — what is being built, in what order, and what is still open
- `voice.md` — how the copy is written, and what it never does
- `design.md` — the design system, the grid, the motion, and each revision
