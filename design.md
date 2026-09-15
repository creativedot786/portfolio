# design.md: Visual system

Intentionally small. Add a token only when a second component needs it.

**Last updated:** 2026-09-06. Items marked *proposed* await Huzaifa's confirmation.

---

## Implementation

The design system is the Tailwind theme in `src/styles/global.css`. There is no second source.
Five type steps, fourteen colour tokens, one 8px spacing base. Anything not in the theme does
not exist, so it cannot be used by accident.

**Naming.** Tokens are named for what a colour does, never what it looks like. Tailwind supplies
the property prefix, so the property is never repeated in the token name: surfaces are `page`,
`surface`, `surface-raised`; text is `primary`, `secondary`, `tertiary`; lines are `line` and
`line-strong`; accents are `fintech`, `gov`, `commerce`; plus `brand`, `inverse`, `on-inverse`.
A short alias block maps shadcn's expected names (`background`, `foreground`, `muted-foreground`,
`card`, `border`) onto ours so installed 21st components inherit the palette untouched.

**Spacing.** `--spacing: 8px`, so `p-1 p-2 p-3 p-5 p-8 p-12 p-20` are 8, 16, 24, 40, 64, 96, 160.

**The boundary.** Layout, type, colour and spacing are Tailwind classes. Animation stays in
component-scoped CSS: the spring cursor, the footer band stagger, the masked word transitions,
the loader draw, the marquee. Those reference the same theme variables, so it is still one system.
Tailwind's own default palette is deliberately NOT wiped yet, pending what the installed 21st
cursor references.

## Typography

Confirmed 2026-09-06. Both open licence (SIL OFL), self-hosted.

| Role | Face | Notes |
|---|---|---|
| Display | **Fraunces**, regular only, no italics | Same pair as dinidumissaka.com, so usage must differ: weights 500 to 600 with the "soft" axis on, never the light 300 look of the reference. Huzaifa: no italics |
| Body and UI | **Manrope** | 400 body, 500 labels, 600 for the audience tabs |
| Mono (small) | system monospace | Metadata labels, local time, timeline years |

Scale (desktop / mobile):
- Display: 56 / 36
- H2: 32 / 26
- H3: 22 / 20
- Body: 18 / 17, line-height 1.55
- Small: 14, line-height 1.4

Max measure for body text: 64ch.

## Colours

**Three real colours. Everything else is mixed from them**, so no value can drift out of system.

| Token | Value | Role |
|---|---|---|
| `page` | `#0A0B0D` | Cool near-black. Chosen so product screenshots sit on it without a colour cast |
| `primary` | `#EDEBE4` | Warm bone |
| `accent` | `#D9A441` | Brass |

Derived, never declared by hand:

| Token | Derivation |
|---|---|
| `secondary` | primary at 72% |
| `tertiary` | primary at 50% |
| `line` / `line-strong` | primary at 14% / 24% |
| `surface` / `surface-raised` | primary mixed 6% / 11% into page |
| `inverse` / `on-inverse` | primary / page, for the footer |

`brand` `#3D68B1` is the logo's own blue and is not a UI colour.

**Why brass, not green or rose.** An accent here does categorical work — case study labels, stats,
step numbers in a case study. Green carries state meaning (valid, active, passed), so a small green
label reads as a status rather than a category. Brass carries none. Warm accent on a cool ground is
also the oldest contrast in editorial design. Rose was rejected as too close to sherizan.com, whose
opacity method this palette does borrow.

**One accent, used everywhere colour is needed.** The three industry hues are gone.

## Accent rules

1. The accent marks interaction and category, nothing else. Links on hover, case study labels,
   stats, the emphasised word on About.
2. Never on a button fill, a whole heading, a border, or a background.
3. Hero emphasis stays `primary` (white against a muted statement), so the accent is not diluted.
4. The cursor keeps its own pink and purple. A deliberate, acknowledged exception.


## Gradient

At most one on the whole site, built from the four industry colours in order (fintech, e-government, e-commerce, B2B), clipped to one display word that means all of Huzaifa's work at once. Proposed: "products" in the About headline. Pending Huzaifa. If it looks muddy when real, it is removed, not fixed.

No other gradients. No shadows except on the loader, if any.

## Spacing

`--spacing: 8px`, so `p-1 p-2 p-3 p-5 p-8 p-12 p-15 p-20` are 8, 16, 24, 40, 64, 96, 120, 160.

**One rule, every section, no exceptions.** `--section-space` is 56px on mobile and 96px on
desktop, and `.section { padding-block: var(--section-space) }` is the only vertical rhythm rule
on the site. Every section carries that class and nothing else — the hero included. The gap
between any two sections is therefore always 2 x --section-space, and there is exactly one number
to tune.

This replaced twelve competing rules: a top-only convention with two documented exceptions, a
`calc(var(--hdr) + 64px)` on case studies, a `lg:py-0` fighting it, and seven one-off values. Each
was defensible on its own; together they meant no one could predict the gap between any two
sections without reading all twelve. The header calc went too — `scroll-padding-top` on `html`
already handles anchor jumps, and a sticky header overlaying content on scroll is normal.

The previous 286px gap was not wrong in the abstract: against a 538px image it is proportionally
identical to Garri's 312px against 588px. The problem was density. Enlarging the image and
halving the gap fixes both ends at once.

| Viewport | Section height | % of viewport | Content-to-content gap |
|---|---|---|---|
| 1440 × 900 | 765 | 85% | 192 |
| 1920 × 1080 | 885 | 82% | 192 |

A section landing at 82-85% of the viewport is deliberate: the next one always peeks, which reads
as continuation rather than as a slide that has snapped into place.

## Radius

0 for layout, 4 for small controls, 12 for image frames. Nothing pill-shaped except the audience tabs.

## Layout and grid

**One 16-column grid across every section**, so the left edge and the text measure never move as
you scroll. Modelled on garri.design, measured rather than eyeballed: he runs 16 columns with a
27px gap and every section places text at the same x and its image at the same x.

| | |
|---|---|
| Grid | 16 columns, 24px gap, container max 1720 |
| Text | columns 1–4, everywhere: hero statement, hero lead, case study text |
| Case study image | columns 5–15, fixed **16:10** |
| Column 16 | left free for the case study dot rail, so it never sits on an image |

Text columns 1–4 and image 5–15 is Garri's exact split, adopted after measuring his page. At 1440
that puts text at x=48 in a 318px column and the image at x=390 at 917x573, with a 32px visual
gutter between them.

**The consequence, accepted deliberately.** A 318px text column is too narrow for the case study
line at 20px, so it drops to 17px (`--text-body`). The image is what sells a case study; the line
is a caption for it, and a caption that competes with the image for attention is doing the wrong
job.

The image ratio is fixed rather than pinned to viewport height. Height follows width, so the frame
is the same shape on every screen and real screenshots are never cropped differently per visitor.

- Container max 1720 throughout. Gutters 24 (mobile) and 48 (desktop).
- Header: name left, Work / About / Resume right. Sticky, thin, no background blur.

## Section headings

No small uppercase mono labels, no hairline rules between sections. Huzaifa: "typical hairline
headings for each section throws away that this has been designed with AI." Section headings are
Fraunces, sentence case, 26 to 32px. Space separates sections. Hairlines are allowed inside a
component (a table row, a card edge) but not as section dividers.

## Header and logo

Logo, 56px circle, replaces the name. Base #3D68B1. On top, three blurred radial pools (cyan,
magenta, purple) at 0.6 opacity, drifting and rotating slowly over 18s, alternate. No hue
cycling. Hover shortens the drift to 7s. Header 88px on desktop, 72px on mobile, sticky,
no line or shadow at any scroll position. Layout: logo left, Work and About spread across the
middle, Resume right (space-between). Links 17px, weight 500.

## Hero

One statement per audience at clamp(42px, 6.4vw, 104px), line-height .98, letter-spacing
-.022em, in a 1720px container so it spans the screen. Hero min-height is the viewport minus the
header, content bottom-aligned. Lead paragraph sits in the right half on desktop. Tabs above as
text in a row with one pill (raised-2, full radius) that slides between them. The pill carries a
faint fill that grows left to right over 7s while the auto-advance timer runs. Auto-advance
pauses while the pointer is over the tab row, off screen, or when the browser tab is hidden, and
stops permanently after the reader clicks a tab. Decided twice; do not reopen. Switching a tab: outgoing words rise out through a mask, incoming
words rise in, 26ms stagger, lead crossfades. Nothing shifts layout.

## Work promos

One study per viewport on desktop, scroll-snap-align start with proximity snapping on the
document. 16-column grid, 27px gutters: text in columns 1 to 5 (industry label in its colour at
15px, title clamp(30px, 3.1vw, 46px), one line at up to 20px), image across columns 6 to 16 at
16:10 with a 14px radius and a 7% wash of the industry colour. Text lines stagger in and the image
settles from a 3.5% scale when the promo is 40% visible. A fixed column of dots on the right
appears while the work block is on screen; the active dot grows and shows its industry label;
clicking scrolls to that study. No counter, no company name. Mobile: normal flow, no dots.

## Recommendations marquee

Heading "Recommendations" with a provenance line. Edge-to-edge track under a soft mask, two
copies for a seamless loop, 64s per loop on desktop, 44s on mobile, pauses on hover and focus.
Cards are top-aligned and take the height of their text. Card: 440px (320px mobile), 26px
radius on the top corners only, panel fades from #171717 at the top into the page ink at the
bottom so it has no bottom edge, 1px inner highlight on top, 32px padding. Header row links to
the recommendation: 64px avatar, name at 20px weight 500 with the LinkedIn mark, role at 16px
muted. A 1px rule. Quote at 18.5px, line height 1.5, paragraphs kept, text does not fade.

## Footer

Right block hugs the right gutter, text inside it left-aligned. Exactly the live site. Nine bands of 56px (40px mobile) in Tailwind neutrals #171717, #262626,
#404040, #525252, #737373, #A3A3A3, #D4D4D4, #E5E5E5, #F5F5F5, each with a white cover that
scales to zero towards the left over .7s, staggered 70ms, as the band enters view. Then a white
body with black 22px text: left, location and Dubai clock; right, bold email, LinkedIn and
Resume, each with the 14px stroked arrow that nudges up-right on hover. Copyright below.

## Loader

The logo glyph draws itself as a 0.5 stroke over .85s, fills at .68s, the overlay fades at 1.1s.
Once per session. Skipped for reduced motion.

## Cursor

`motion-cursor-multifollow` from 21st (Motion's official example), installed verbatim.
Four followers, each on its own spring, sizes and colours exactly as shipped:

| | Size | Colour | Spring |
|---|---|---|---|
| dot | 5px | white fill | stiffness 900, damping 55 |
| ring 1 | 13px | #ff0088 | stiffness 1000, damping 50 |
| ring 2 | 21px | #dd00ee | stiffness 800, damping 70 |
| ring 3 | 29px | #9911ff | stiffness 700, damping 90 |

The Stage div is a fixed full-viewport layer with `pointer-events: none`, which is what makes it
site-wide. Hidden on coarse pointers and under reduced motion; the system cursor is only hidden
where the custom one actually renders.

Its four hues are kept as shipped, a deliberate exception to the three-colour system.

Over the white footer only the inner dot flips to near-black; the coloured rings read fine on
white and are left alone. Driven by `data-cursor-invert` on the footer.

On hover the rings open to 2.4 / 2.2 / 2.0. Scaling a ring scales its border with it, so the
stroke is thinned to 0.7px as it opens, holding the visible line near 1.2px instead of 4.8px.
That rule sits **outside** `@layer`, because a layered `!important` loses to Motion's inline style.

**Three local changes**, each marked `LOCAL` in the file:
1. Press feedback listens on the window. Upstream listens on the Stage element, which must be
   click-through site-wide or it would swallow every click, so it never heard a press.
2. A `hover` variant: dot to 0.7, rings to 2.4 / 2.2 / 2.0, on their own springs. Targets are
   links, buttons, tabs, form controls and anything marked `data-cursor-expand`
   (currently the three case study images).
3. The CSS import upstream expects was never shipped by 21st, so it is removed.

The old hand-built cursor is still at `src/components/Cursor.astro`, unused.

## Hover previews

Component: 21st `@minhxthanh/hover-preview`, adapted twice. Upstream wraps each word in a React
`<HoverLink>`; our copy is server-rendered Astro, so the component attaches delegated listeners to
any `[data-preview]` element instead and the trigger markup stays in the content layer. Upstream
also preloads every image on mount; here they warm on `requestIdleCallback` so they never compete
with the page's own load. Card geometry, easing and positioning maths are upstream's: 280px image,
16px radius, card centred above the word, flipping below it near the top of the screen.

The trigger word carries a dotted underline at rest, 2px thick and 3px off the baseline so it never
collides with the line below. On hover the word and its dots both take the accent. Images are 600px
wide, since the card renders them at 280.

Data lives in `src/data/previews.ts`, keyed by word. To add a hoverable word, add an entry and
wrap the word with `mark()` in the copy; to change an image or link, edit the entry. Nothing
else is touched. Preview words render as white emphasis with a faint underline, so they read as
emphasis whether or not a preview panel is attached, and a missing image degrades to a plain
emphasised link. Words currently marked: "built and launched", "Fintech", "e-government",
"e-commerce".

## Core components

1. Audience tabs (hero), see above
2. Work promo, see above
3. Journey chapter: place, years, roles, one paragraph, optional image. The turn into product is a plain subsection with a small label, no box, no colour
3b. Role list (About, top): nine rows, most recent first, plain text, not sticky
4. Metadata block (case study): role, team, timeline, outcome, sticky on desktop
5. Footer: location, local time, email, LinkedIn, resume, year
6. Page loader

## Motion principles

1. Every motion has a job: reveal hierarchy, show progress, or bridge two pages. Otherwise cut it.
2. Content must be readable within 300ms of paint. No hero that fades in late.
3. Reveals: opacity + 12px translate, 400ms, ease-out, staggered 60ms. Never more than 5 items in a stagger.
4. Journey: scroll drives chapter progress on desktop. Mobile stacks with simple reveals.
5. Page transitions: shared element on the case study image where possible, otherwise a 250ms crossfade.
6. Loader: once per session, under 1.2s, name or mark only.
7. `prefers-reduced-motion`: reveals become instant, loader skipped, scroll-driven journey becomes static.
8. Hover: colour and underline only. No scale on text. Images may shift 1 to 2%.

## Responsive behaviour

- Mobile first. Breakpoints 640, 1024.
- Audience tabs: horizontally scrollable with a visible fade cue, active tab scrolled into view.
- Journey: no pinning on mobile.
- Metadata block: inline above content on mobile, sticky sidebar on desktop.
- Case studies are dark. Long text sits on the raised surface at 60ch max with 1.6 line height. Every UI screenshot sits on a raised mat with 24px padding, so light-mode product UIs never float on pure black.
- No horizontal page scroll, ever.


## Case study dot rail

Three dots on the right edge, one per case study, appearing only while the work sections are in
view.

| | |
|---|---|
| Dot | 5px, `--color-tertiary` |
| Active | scale 1.3 (6.5px) in `--color-accent` |
| Pitch | 29px |
| Hit target | 29 x 29, from padding, not from dot size |
| Distance from right edge | 24px |

Down from 8px dots at a 40px pitch, which read as UI chrome next to Fraunces at 104px. At 5px the
rail is a mark on the page rather than a control panel. The active dot takes the accent rather
than going white, which ties it to the industry label at the top of the section it marks — the
same categorical job the accent already does everywhere else.

The 29px target comes entirely from padding, so density and reach are independent: the dot can
shrink further without the target following it. 29 x 29 clears WCAG 2.5.8's 24 x 24 minimum.

## A Tailwind trap worth remembering

Tailwind v4 scans source files for class-shaped strings. A utility glued to a template
interpolation is invisible to it:

```
class={`... pl-3${i === 0 ? ' on' : ''}`}   // .pl-3 is never generated
class={`... pl-3 ${i === 0 ? 'on' : ''}`}   // fine
```

The dot rail's `pl-2` had been silently dead this whole time — the hit target was 5px wide, not
21px. Nothing errors; the class simply never reaches the stylesheet. Always leave a space before
`${`.


## Footer band strip

The strip **scales up out of the footer as one object**, replaying whenever it re-enters view.

The ramp is **mixed from the two grounds, not from neutral grey**. It was `#171717 → #F5F5F5`,
which matched neither end: our page is cool near-black `#0A0B0D` and the footer ground is warm
bone `#EDEBE4`, so a cold white last band met a warm footer and showed a seam. Now each band is
`color-mix(in srgb, var(--color-primary) N%, var(--color-page))` with N stepping
0, 7, 18, 27, 41, 63, 85, 93, 100 — percentages chosen to preserve the original ramp's rhythm
(slow at the ends, quicker through the middle). Band 1 resolves to exactly the page colour and
band 9 to exactly the footer's background, so the strip reads as the transition between the site's
two grounds rather than as decoration laid over them.

**Why the wipe went.** It was nine covers retracting left to right, borrowed from a reference
whose cover was *light*. Dark bars painting onto white reads as bars sliding in; light bars
painting onto black reads as construction — pixels being drawn. Turning the cover dark to kill a
white flash removed the flash and broke the mechanic. There are no covers now.

It also fired **per band at `threshold: 0.5`**, so each band waited until half of itself was on
screen before starting. That structurally guarantees you watch every bar draw. One observer on the
wrapper with `rootMargin: '0px 0px 220px 0px'` now starts the motion 220px before the strip is
visible.

**`.strip-wrap` carries no transform, and that is load-bearing.** It is the observer's target
because the strip itself sits at `scaleY(0)` until revealed, and a collapsed element has a
zero-height box that never intersects reliably. Observing the strip directly means the animation
simply never fires.

One motion instead of nine also matters editorially: a nine-step stagger was the most animated
moment on a site that is otherwise very still, and it competed with the case studies above it.


## Theme system

A theme is **three seed colours and one solved number**. Nothing else is authored per theme.

```
--seed-ground   --seed-ink   --seed-accent   --mix-tertiary
```

Every other colour is `color-mix(in srgb, var(--seed-ink) N%, var(--seed-ground))` — ink into
ground. That maths is direction-agnostic, which is why a light theme costs two hex values rather
than a second stylesheet. The footer had been running the inverted palette in production all along,
so the inversion was already proven before any of this was built.

| Theme | Ground | Ink | Accent | mix | Mode |
|---|---|---|---|---|---|
| **Brass** (default) | `#0A0B0D` | `#EDEBE4` | `#D9A441` | 49% | dark |
| **Slate** | `#27333A` | `#E6ECEF` | `#FF8A6B` | 56% | dark |
| **Moss** | `#12241C` | `#E7EDE4` | `#E88BB0` | 51% | dark |
| **Cream** | `#F3EDDF` | `#191611` | `#5C3F86` | 61% | light |

Four grounds, four positions: cool near-black, blue-grey, deep green, warm cream. Ground lightness
runs 0.003 / 0.031 / 0.015 / 0.849, so Slate is ten times lighter than Brass — the first version of
Slate was a warm near-black and read as Brass with a different accent, which is a lightness problem
masquerading as a hue problem.

**Why `--mix-tertiary` is per theme and not a constant.** The tertiary token is the 14px muted line
("Case study coming"), which needs 4.5:1 as normal-size text. At a flat 50% it lands at 4.65:1 on
near-black — fine — but **3.3:1 on cream** and **4.24:1 on mid-tone blue-grey**. Both fail. The mix
a theme needs depends on how light its *ground* is, not on whether it is nominally dark or light,
so each theme solves its own. Every light theme we might have shipped would have failed AA on that
line.

Verified: all four pass AA on body, secondary, tertiary, accent-on-ground and text-on-accent.

**Slate's accent was a real fork.** Coral `#FF8A6B` sits 26° from Brass's amber, so as swatches the
two look related; cyan `#46D5E8` sits 78° from its nearest neighbour and has more contrast (7.37
vs 5.61). Coral was chosen: warm on cool is the liveliest pairing in the set, and since Brass is
the default most visitors judge Slate on its own rather than as part of a row.

**`--seed-mode`** exists only for the handful of things colour-mix cannot infer: shadow opacity,
the cursor's dot (invisible on a light ground), and the logo's brand blue.

**Cream is blocked on images.** Two of the three case study exports are on dark grounds and become
dark blocks on paper. Cream ships when those are transparent PNGs.

## Grid

Twelve columns, replacing the previous sixteen. Margin 48, gutter 24, container capped at 1720.
At 1440 that is a 90px column.

| | |
|---|---|
| Left rail | column 1 — nav at top, theme and grid toggles at the bottom |
| Content | columns 2–12 |
| Case study text | columns 2–4 — **318px, identical to the 16-column layout** |
| Case study image | columns 5–12 — 888px, down from 917px |

The switch from 16 to 12 cost nothing on the text measure, which is the number the last alignment
pass was built around. Modelled on billysweeney.com, measured rather than copied: he runs 12
columns at 40px margin / 20px gutter, full-bleed with no cap. We keep our 1720 cap, so above that
width the grid lines stop at the container edge rather than running to the viewport.

His ladder collapses 12 → 6 → 2 columns. Ours keeps 12 on desktop and hides the overlay entirely
below `md` — a two-column grid is a margin marker, not a grid, and a toggle that reveals two lines
is worse than no toggle.

## Grid overlay

`position: fixed; inset: 0` using the **identical grid template as the content**. That is the
whole mechanism: the overlay is not aligned to the content, they are the same grid, so nothing can
collide with a line. Each column holds two 1px lines pushed apart with `justify-content:
space-between`; they animate `height: 0 → 100%` with `transition-delay` stepping per line, so the
grid draws downward and left to right.

State persists to `localStorage`. Billy's does not — his resets on reload.

**The overlay is a promise, not a feature.** Turning it on invites someone to check the work, and
it permanently raises the standard for every future case study and About block. Our main flow
already passes; the marquee never could, which is part of why References is being rebuilt.


## The gap, and the rule that governs it

Nav in column 1, **content from column 4**. Columns 2 and 3 are deliberately empty — 228px of air
between the rail and the content, measured off billysweeney.com, who runs nav in column 1 and
content from column 5 in every section but `work`.

Column 4 rather than his 5 because a 4–12 band is **1002px, exactly the width the headline already
occupied** at columns 2–10. The whole block shifts right by 228px with no reflow and no lost line.

**The rule: the gap protects prose, not pictures.** Prose always starts at column 4 and always
ends at column 12, so every reading measure on the site shares one right edge. Media may start at
column 3, because an image has no measure to protect. That single sentence removes what would
otherwise have been a special case for the work section.

| Token | Columns | Width at 1440 |
|---|---|---|
| `.col-title` / `.col-full` | 4–12 | 1002 |
| `.col-lead` | 6–11 | 660 |
| `.col-prose` | 4–8 | 546 |
| `.col-text` (case copy) | 9–12 | 432 |
| `.col-media` (case image) | 3–8 | 660 |

## Measures, and why the type was never the problem

Characters per line, measured on the live page before and after:

| | Before | After |
|---|---|---|
| Hero lead | 432px @ 20px — **41 chars** | 660px @ 22px — **58** |
| Case study line | 318px @ 17px — **36 chars** | 432px @ 17px — **49** |
| About paragraph | 432px @ 20px — **41 chars** | 660px @ 22px — **58** |

Comfortable is 45–75. Three of our main measures sat below it. The case line was the worst, and it
was self-inflicted: it had been dropped from 20px to 17px to fit a 318px column, when the column
was the thing that was wrong. Shrinking type to fit a bad measure treats the symptom.

`--text-h3` 20 → 22px. The 17/20 step was 1.18x and read as an accident wherever the two met —
most visibly on a reference card, where the name sits directly above the body.

`--section-space` 96 → 112px (224px between sections), so the vertical air matches the 366px now
sitting to the left of the content.

## Case study: image left, copy right

Flipped, and the argument is the right edge rather than balance. With copy on the left it ended at
column 6 or 7 — the only prose on the site that stopped early. On the right it ends at column 12
like everything else.

Image columns 3–8 (660 x 413), copy columns 9–12 (432), copy vertically centred against the image.
Section height 637px, **71% of a 900px viewport**, identical across all three.

**Both are pinned to `grid-row: 1`, and that is load-bearing.** The copy comes first in the DOM so
the heading is read before the image, but it sits at columns 9–12 while the image sits at 3–8.
Grid's default sparse packing will not place an item behind a cursor that has already passed, so
without an explicit row the image drops to row 2 and the two stack — which took the section from
637px to 1017px, 113% of the viewport, before it was caught.

## Grid overlay: lines and flare

Lines were on `--color-line-strong` — 24% ink, the strongest line value in the system, used as a
background. Now **10%**.

Each line carries a flare: a 180px gradient segment at 26% ink travelling upward, living inside
the line's own `::after` so it inherits the line's position and can never drift out of alignment.

**Six of the twenty-four**, re-picked at random every time the grid is switched on, at durations
of 4–9s and delays of 0–8s. All twenty-four moving together reads as a screensaver; a handful
reads as alive.

**Why not 21st's Grid Beam.** It does exactly this — soft beams along grid dividers — but it draws
its own grid onto a canvas. Our overlay's whole value is that it *is* the content's grid, from the
same variables. A canvas layer would be a second source of truth for column positions, needing
manual sync on every resize and token change. That is the bug class this build spent its time
removing. The idea was worth taking; the code was not.

The grid toggle is the thing on this site that says *I care about structure*. A glowing animated
grid says something else, and it is the visual language of every AI-SaaS hero background. Built
deliberately underdone.


## Revision pass — 13 Sep 2026

**The logo is brand, not interface.** Its ground was `bg-brand`, its glyph `var(--color-inverse)`
and its gradient pools were mixed from `--color-accent` / `--color-page` — so the mark restyled
itself in every theme and the glyph flipped from white to near-black on Cream. Every value in the
logo is now a literal: `#3D68B1` ground, `#FFFFFF` glyph, fixed pools. Verified identical across
all four themes. A logo that changes with the page is not a logo.

**The headline carries emphasis on weight, not colour.** It was secondary ink with white `em`s;
now the headline is the full ink colour, which leaves nothing for brightness to say. Fraunces is
variable, so emphasis moved to 400 → 600 for free. It inverts with the theme on its own.

**An empty column between the case study image and its copy.** Image columns 3–7 (546), column 8
empty, copy 9–12 (432) — 138px between them instead of a 24px gutter. The image pays for it,
dropping 660 → 546.

**Captions are a system mono stack**, not a third webfont: `ui-monospace, SFMono-Regular, Menlo`.
The monospace voice for metadata costs nothing to download. `--text-caption: 13px`, set to the
right edge of the image it belongs to.

**Recommendations are quotes, not cards.** A bordered panel with an avatar read as a testimonial
widget. Set as a quote with an outlined 132px glyph and a mono attribution, it reads as somebody
speaking. The quote text is **Manrope, not Fraunces** — the display face is the site's own voice,
and borrowing it for someone else's words blurs who is talking. Only the first paragraph is
quoted; the attribution links to the full text on LinkedIn.

**The footer strip grows downward.** `transform-origin` was `bottom`, so the reveal travelled
upward while the reader travelled down — it read as fighting the gesture. From the top it reads as
the page filling in ahead of you. The footer content now fades in on the same trigger, so the
footer arrives as one object rather than as a strip plus a block that was always there. Padding
trimmed from 64/48 to 40/40 with the copyright line at 48.

**The rail inverts over the footer, part by part.** It is fixed above the footer's inverse ground,
so the nav and toggles vanished as the footer scrolled under them. Each part is tested against
where the band strip has actually turned light — `stripTop + height * 0.55` — not against the
footer's top edge, because the strip's first band is the page colour and the footer's box starts
long before its ground does. At the page bottom this correctly leaves the nav light (it sits over
the strip's dark half) while inverting the toggles.

**The rail nav meets the tab row.** Measured, not hardcoded: the hero is bottom-anchored so the
tab row moves with the viewport. It aligns the **text**, not the boxes — both are 14px but the tab
is a pill with 12px of padding against the nav link's 5px, so matching box edges left the words
7px apart. Converges over two frames; one pass landed 8px short while the hero was still settling.

**Personal photographs are capped at three columns** (204–318, was 318–546) with mono captions,
and their drift roughly halved. They are texture, not evidence, and at the old sizes and rates
they competed with the case study images and read as things sliding about.

**The journey frame is 4:5 in four columns — 432 x 540.** It was `76vh`, which is 684px on a
laptop and made a personal snapshot the tallest object on the page.

**Journey's sticky image is scroll-driven**, for the same reason as the rail's spy:
IntersectionObserver only reports while the document renders, so in a background tab the image
silently stopped following the copy.

**Grid flare: three lines, 11–19s, delays up to 22s** (was six at 4–9s). Six lines at that speed
read as traffic. The arrow beside Resume dropped to `.78em` with a 2 stroke — at `1em` with the
footer's 2.4 stroke it was heavier than the word it followed.


## Second revision — 13 Sep 2026

**The journey headings were my error.** I dropped them from `text-h2` to `text-h3` when I moved
the section onto the grid, because the beat headings run 11-13 words and 46px in a 432px column
is 19 characters a line. That was a real constraint, but I changed an approved decision without
saying so. Restored to `text-h2`, and the column widened to five (546) to carry it at 22
characters a line. Column 9 stays empty; the frame moved to 10-12.

**A sixth type step, `--text-quote: clamp(24px, 2.4vw, 32px)`.** The quote block sits at a fixed
five columns, so its type cannot ride `--text-h2`'s viewport clamp without the line length
drifting. At 46px in 774 the quotes ran 31 characters and read as paragraphs. At 32px in 546 they
run 32 characters, which is where the reference sits. It also fills the scale's one real gap:
22 → 46 was a 2.1x jump, and the progression is now 13/14/17/22/32/46/92.

**Quote marks hang.** The opening mark is absolutely positioned at `right: 100%` so it sits
outside the measure and the first line still starts exactly on the column; the closing mark runs
inline after the last word. Both are Fraunces outlined at 2.6em — the serif quote is a better
shape than Manrope's.

**Theme control opens on hover, and the swatches are split, not filled.** Filling each circle with
its theme's ground made three of four near-black on a near-black capsule — only the accent dot was
visible. A 135° split shows the two seeds that actually distinguish a theme and keeps every swatch
legible. The capsule ground lifted from 7% to 12% ink for the same reason. Names dropped; the
selected theme carries a double ring (page, then ink) so it reads on any swatch colour. Reveal
rides `translate` while hover rides `transform`, so they never fight.

**The About photographs are a paced sequence, not parallax.** Five images drifting at their own
rates converged as you scrolled — the offsets were large enough to crowd rather than read as
depth, and the negative margins left no vertical air. Parallax is the wrong tool for many small
elements: it produces jitter. Each photograph now holds its own row, alternates side at a constant
318, and arrives once on a fade and a 28px rise, caption 220ms behind. Nothing moves after it
lands, so nothing can collide. 120px between rows.

**"Where I've worked" is rows, not a table.** Role title at 22px, employer beneath in tertiary,
dates right-aligned and tabular, hairline between each. A "Full resume" link closes the section
with the same arrow as the rail and footer.

**Hero re-balanced.** `justify-end` became `justify-center`, and the internal gaps dropped from
96px to 48px. Measured: 192px of air above the content and 192px below, 48px from tabs to
headline and 48px from headline to lead. The lead tightened from six columns to five (546, 48
characters).

**Recommendations heading** is now "What it's like to work with me", to sit with "How I got here"
and "Where I've worked". The subtext is gone — the heading says it.


## Third revision — 13 Sep 2026

**Parallax is back, on two planes.** The first version failed because every photograph had its own
rate, so they converged; the second removed motion entirely, which overcorrected. Depth needs
elements at the same distance to move together: left-column photographs ride one plane
(`+0.035`), right-column the other (`-0.035`), and the quote marks float on a third (`-0.05`)
while the quote text itself stays put. One shared loop in `Base.astro` drives drift, the reveal
check and the scrolling flag — `[data-drift]` elements ride `translate`, reveals ride `transform`,
so the two never fight.

**The grid sits behind the content.** At z-index 55 the lines drew across type and images. At 0,
under `main` at 1, they show only where the page is bare. **The flare pauses while scrolling** —
a flare travelling up a fixed layer while the page travels up beneath it reads as two things
racing; it now waits until the page has been still for 180ms.

**No borders, no radius on frames.** A 1px line around an image reads as a UI control. The glass
buttons lost their border and their pressed state — the grid being on is visible on the page,
the theme being open is visible in the capsule, and a second indicator on the button made the
two icons look like they had different outlines.

**Theme capsule.** Both buttons now sit on the rail's left edge (the theme control was centring
in a stretched flex item). An invisible 18px bridge under the capsule covers the gap that was
closing it before the cursor could reach a swatch.

**Quote marks to the reference.** Manrope, not Fraunces — the reference's marks are the rounded
sans shape. 3.4em, the opening one at the top-left with the first letter overlapping its
lower-right, the closing one tucked after the last word, both behind the text through an isolated
stacking context and a negative z-index.

**"Where I've worked" leaves the last two columns empty** (4–10). The About heading is gone;
the lead now opens the section.


## Fourth revision — 13 Sep 2026

**The theme control is one pill.** The selected theme's swatch *is* the button — no contrast
icon, no click on it. Hovering grows the same pill upward from 44px to 152px to reveal the other
three; the only click is the one that picks a theme. Anchored at the bottom with
`column-reverse` and `order: -1` on the selected swatch, so the swatch under the cursor never
moves and the others arrive above it. Modelled on Billy's expanding slider, without the slider.

**Dotted grid.** A 1px column of round dots every 6px (`radial-gradient` at `1px 6px`), at 14%
ink rather than the solid line's 10% because a dot carries less than a stroke. Same template as
the content, so the alignment promise holds — but it reads as a measuring instrument rather than a
drawn line, and it is not Billy's.

**The flare is a chase, not a streak.** It is the same dot pattern at 46% ink seen through a soft
260px window travelling up the line, so the dots themselves light as it passes — like a chase
along an LED strip. A solid gradient laid over dots read as a bar. It runs continuously; the
pause-on-scroll rule is gone.

**Parallax, third attempt.** The rates I chose last time (±0.035) were below perception. Now
photographs ride ±0.08 and quote blocks ±0.06, alternating by side. The marks were briefly given
their own rate and measured 141px away from their text at the section edge — marks belong to
their quote and do not move independently. Drift lives on the whole block.

**The closing quote mark** is `line-height: 0` (so it cannot stretch the last line) anchored with
`vertical-align: top` and pushed down `.46em`, which puts its ink at the cap height of the last
line hanging just below the baseline. With `line-height: 0` alone it centred on its collapsed box
and floated a full line high.


## Fifth revision — 14 Sep 2026

**Grid: gutters, not edges; reaction, not decoration.** Eleven 3.5% bands in the gaps between
columns replace twenty-four lines on their edges — column edges are still exactly the bands'
edges, so the alignment promise holds, but it reads as a layout grid rather than a ruled page.
The flare is gone. A light wandering a fixed layer is decoration on an instrument and will always
appear to slide against the page. Instead the column under the pointer lifts by 4.5% (including
its gutter, so the hit area is continuous). It is alive, it is useful — hover a case study and you
see which columns it occupies — and it cannot fight the scroll because it never moves on its own.
Draw-on when toggled stays, staggered 50ms per column.
*To revert:* 1px dotted lines (`radial-gradient` at `1px 6px`, 14% ink) on both edges of every
column, three carrying a 260px chase at 46% ink, continuous.

**The accent marks the keyword; it does not fill it.** The preview words' dotted underline is the
accent at 60% at rest, full accent on hover. The word stays ink so the sentence reads as one
thought. Accent fill on headline words was rejected earlier as "highlights", and at 92px Fraunces
it would dominate the line. Hover-dim was considered and dropped: the preview card already does
the focusing, and three things on one hover is overdoing it.

**The accent is now present at first glance in three places** without touching prose: the logo
ring, the keyword underlines, and a 12% tint on the active tab pill.

**Logo: outline, glyph in ink.** The shape is the constant and the colour is contextual — the
glyph is always the theme's ink, the ring always its accent, so the mark reads on every ground and
the accent sits top-left on every screen. The brand blue `#3D68B1` and the blurred pools are gone
with the fill; `--color-brand` is removed from the token set, which is back to three real colours.
Motion only where it means something: the ring draws on load, redraws on theme change (the moment
the accent changes) and on hover. A perpetual orbiting arc was argued against — a permanent mover
in peripheral vision on a page meant to be read. At rest it is still.


## Sixth revision — 14 Sep 2026

**Gutter bands rejected on sight; grid reverted** to the dotted lines and the chase flare
(three lines, 11–19s, continuous). The cursor-column lift went with the bands — it was the same
visual language, a fill on a column.

**The logo's "square box" was a class name.** The ring SVG was `class="ring"`, and `ring` is a
Tailwind utility that draws a 1px `box-shadow` — so the mark shipped with a bone square around it
that no border, outline or pseudo-element check could find, because it was a shadow. Renamed to
`.logo-ring`. Never give an element a bare class that Tailwind also owns.

**The keyword underline is the full accent at rest**, not 60%. Dimming it was hedging.


## Seventh revision — 14 Sep 2026

**The grid is anchored to the document, not the viewport.** A fixed layer made any moving
flare appear to slide against the page; attached to the page (`position: absolute; inset: 0` on
a `position: relative` body), the flare moves with the content and the illusion cannot occur.
Toggle is now a staggered fade rather than a draw-on — a line the height of the document cannot
draw in 0.9s and look like anything.

**Flares are dealt, not assigned.** The old seeding chose three lines forever and gave them
`animation-delay`s of up to 22s with no fill mode — so on first load three flares sat visible at
the top of their lines, waiting, and the right-hand lines were simply never picked. Now every
2–5s a random idle line gets one pass, spawned 300px below the viewport and ending 400px above
it, so it always crosses what is on screen, on any line; at most three in flight; each pass ends
and the line returns to the pool. `animation-fill-mode: both` holds a flare at its start until it
begins. A background tab stops the dealing but never cancels a pass in flight.

**Logo: glasses in the accent, no ring.** In the source path the two lenses and the bridge are
holes punched out of the face by winding. They are lifted out of the face path (which closes over
them) and drawn again on top as filled shapes in `--color-accent`. Verified side by side: this is
the only way to colour the glasses without redrawing the mark, and it reads as tinted glasses.
The loader keeps the compound path.

**The active nav item is the accent.** Over the footer it still falls back to `--color-on-inverse`
— brass on bone is under 2:1.


## Eighth revision — 14 Sep 2026

**Flares slowed** to 7–11s per pass (~150–230px/s), from 3.6–6.2s.

**The glasses catch the light.** A soft band of ink, skewed, clipped to the lens shapes, sweeping
left to right in 0.95s. Runs once on load (0.7s in), again on hover, again on theme change —
never on a loop. It is the one flourish in the mark, and it means something each time it runs.

**Hovering the mark reveals the name** beside it, in Fraunces at 20px — a wordmark moment rather
than a tooltip. The empty columns beside the rail give it room.

**Active tab tint 12% → 8%.** With the accent now in the nav, the glasses and the underlines, the
tab could recede without losing its state.

**"Where I've worked" loses its rules.** A solid horizontal line across a dotted vertical grid is
two systems arguing; nine rows with dates on the right edge scan on rhythm alone. Country added
after the company as ISO-3 (UAE / PAK / TZA), from brand.md, never guessed.


## Journey photographs — 14 Sep 2026

The sticky frame is gone. Each beat is its own `.shell`, so its copy (columns 4–8) and its
photograph are placed by column, not arithmetic. The photograph starts two columns before the
copy's right edge — **column 7** — and runs five columns to 11, sitting **behind** the copy on the
same row, revealed only while the pointer is over the copy.

**The envelope**: the full width of its columns, no taller than 60vh, at the image's own ratio.
A landscape fills the width, a portrait fills the height; real ratios are unknown until the
photographs land.

**Legibility by dissolve, not dimming.** The photograph's left 45% fades to nothing — exactly the
two columns the words sit on — so the words always read and the image stays full on the side
they never touch.

**Motion**: arrives, not appears. In over 500ms while settling from 1.05 → 1 and drifting 16px
left to rest; out in 280ms with no scale, so moving between beats reads as a crossfade rather
than two things animating. No drift on desktop — the reveal is the motion.

**Mobile**: always visible, in its own row above the copy at 55% width, right-aligned, on a
gentle drift (−0.03) with its lower edge dissolving so any overlap with the heading reads as
depth rather than collision. Behind-the-text was rejected here: on a 390px screen the words
would cover the photograph's full width with nothing to dissolve into.


## Grid, simplified — 14 Sep 2026

Modelled on conceptualize.ae's ruled page after Huzaifa raised it; the mechanism is ours.

**Twelve solid lines, one at the start of every column, always on.** Every piece of content has its
left edge exactly on a line — verified at 1440 across the rail, tabs, headline, lead, case copy
and image, About lead and photographs, journey copy and photograph, roles, quotes and footer.
Lines are 1px at 7% ink, anchored to the document, behind the content. Furniture, not a feature.

**Gone:** the toggle and its button, the dotted pattern, the draw-on, `hr-grid` storage, the
`grid-on` selectors and the `.glass` class. The rail's tools are the theme pill alone.

**Kept:** the flare, now a solid soft segment rather than lit dots — dealt to a random line every
6–12s, one pass each, spawned below the viewport and ending above it, travelling in page space.
At most two in flight. It starts on its own 1.2s after load; nothing is dealt in a background tab,
on touch layouts, or under reduced motion.

**Density:** 12 lines every 114px, from 24 every ~57px. Half the marks, and solid reads as
structure where dots read as texture.

**Revert:** `git checkout 64452a7 -- src/` restores the dotted, toggled version exactly.


**Thirteen lines, and boxes that end on one — 14 Sep.** Lines at column starts left a whole
column plus the margin after the twelfth (138px against 48 before the first); a thirteenth line at
the container's right edge makes the margins 48 / 48. And because a column's *end* is never a
line, any box that needs a hard right edge — case study image, journey photograph, About
photographs, the roles list with its right-aligned dates — extends across its trailing gutter to
the next column's start: `margin-right: calc(-1 * var(--grid-gutter))`. Left edge on a line,
right edge on a line, the gutter absorbed as air inside the box. Verified: every such edge lands
exactly; the dates end on the column-11 line at 1188.

**The journey hover target is the whole row**, full shell width, not the copy — so the photograph
reveals with the pointer anywhere across the beat, including the empty right side.


## The intro — 14 Sep 2026

First visit only (session storage), never under reduced motion:

| | |
|---|---|
| 0 | the logo draws and fills, alone on the ground |
| 900ms | the twelve grid lines draw down the first screen, staggered 35ms left to right |
| 1100ms | the loader dissolves under them |
| 2000ms | the lines run the full document; the page and the rail fade in; the hero words rise |

Held during the intro: `main` and the rail at opacity 0, the lines at `max-height: 0`, the hero's
first panel down at its pre-reveal position, and the reveal check suspended — so nothing arrives
before its cue. All gated on `html.js`; a page without script is simply there.

Lines draw by `max-height` to `100vh` rather than to their full document height, because a line
11,000px tall drawing in 700ms would cross the first screen in a frame. What you see draw is the
screen you are looking at; the rest is already there below the fold.

Logo 56 → 64px.

## Cubix photographs — 15 Sep 2026

The first real photographs in the journey. Four things Huzaifa kept from 2011: four of the
team in the office, the Cubix Labs business card, and two Facebook app screens (Fan-O-Matic
for Walmart, Spin to Win for Casinotop10). A fifth — a colleague's drawing of the team as
cats — was in the first pass and Huzaifa took it out.

**What the section is for.** Journey is the story; the photographs are evidence of having
been there. They are a glimpse of a past life, not work samples — so they are small, freely
cropped, and sized by what each thing *is* rather than by what would show it best. The Walmart
leaderboard is a very tall screen; it is cropped to a short frame from the top and that is fine.

**Direction D, the pinboard.** Of the four directions shown (a single hero photo, a strip, a
stacked pile, a scattered board), the board was chosen: modern, and it rhymes with the grid.
Hand-placed absolute positions inside a `.pin` slot at 1.3:1, all as percentages, so the
composition holds at any width. No overlap, no motion of their own — the reveal is the motion.

**Placement follows the dissolve.** The photo slot starts at column 7 and its left 45% fades
under the words, so nothing that matters sits hard against the left edge: the people start
at 4%, the casino screen at 26% and takes the clear bottom-centre, the Walmart screen and the
card hold the right side.

**Sizes.** People largest (58% of the slot, 3:2), the casino screen next (38%), the Walmart
screen tall and narrow (26%, 3:4, cropped from the top), the card smallest (24%) — a card is
card-sized. Rotations of 1–5°, alternating
sign, so it reads as pinned rather than laid out. A soft drop shadow lifts them off the ground
without a border or radius, in line with the no-border rule.

**Mobile.** The board takes the full content width above the copy (five images at 55% width
would be stamps), and keeps the bottom dissolve so the drift can carry it into the heading.

**Files.** `public/journey/cubix/{team,card,fan-o-matic,spin-to-win}.jpg`, downsized
to display size ×2 (largest 101 KB). Data in `beats.ts` as `photos[]` with real alt text;
beats without `photos` keep the placeholder.
