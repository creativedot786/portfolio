# plan.md: Portfolio rebuild

Source of truth for the project. Companion files: `voice.md` (how it sounds), `design.md` (how it looks).
Career facts live in `~/.claude/skills/pitchme/brand.md`. Never restate them from memory; read that file.

**Last updated:** 2026-09-06

---

## 1. Goal

A personal portfolio for job hunting. Audience: hiring managers, design leaders, recruiters.
Target roles: Senior or Staff IC product designer, product-leaning. Not management.

Within minutes a reader should know: who Huzaifa is, the level he operates at, the products and
problems he has worked on, how he thinks, the impact, why the years matter, why the story is
interesting, and why to open a case study.

Not: an agency, studio, freelance or client-acquisition site. No "let's work together".

---

## 2. Audit of huzaifaratlam.com (2026-09-06)

Built on Figma Sites. Single dark home page, three case studies opening as light full-screen pages.

**Keep**
- Audience tabs in the hero (Anyone / Recruiters / PMs / Designers / Engineers). Huzaifa's own
  idea, confirmed keep as the hero device.
- Footer: Dubai, live local time, email, LinkedIn, resume. Confirmed keep with all links.
- Case study substance: role, team, timeline, decisions, real numbers.
- Dark, restrained, undecorated.
- Illustrated avatar.

**Improve**
- Hero copy is generic ("Clear. Useful. Human.", "turn complex problems into simple, usable
  experiences"). Four of five tabs lead with AI.
- Case study titles over-claim ("Revolutionizing") and one has a typo ("Reimaging").
- Case study pages: no header, no next/previous, only an X. Browser title never changes.
- Mobile: hero fades in ~3s late, audience tabs overflow and clip mid-word with no scroll cue.
- Motion is slow fade-ins only. No reduced-motion handling.

**Remove**
- `robots: noindex`. The site is currently invisible to search.
- "Test Söhne" trial font. No licence held. Must be replaced.
- Alt text "Protected content thumbnail" on case study images.

**Missing**
- Name, photo, about, career story, companies, cities. Nothing tells a reader who this is.
- Semantic headings. Case study pages are styled divs only.
- Level signal beyond one line under one tab.
- Context on case study cards (no outcome, no "why this matters").

---

## 3. Decisions

| Date | Decision | Why |
|---|---|---|
| 2026-09-06 | New project in `~/Desktop/portfolio`, replacing the Figma Sites build | Need SEO, motion control, semantic HTML, image optimisation |
| 2026-09-06 | Audience tabs stay as the hero device | Unique, signals product thinking |
| 2026-09-06 | About is a separate page and the career journey lives there | Home stays short; journey gets room to be scroll-driven |
| 2026-09-06 | Home gets a compact journey teaser that links to About | Reader sees the four-city arc without leaving the work |
| 2026-09-06 | Footer from the current site is kept: location, local time, email, LinkedIn, resume | Confirmed by Huzaifa |
| 2026-09-06 | Hero tone direction A: factual, terse, list-like | Confirmed by Huzaifa |
| 2026-09-06 | Page loader on first visit, in the spirit of dinidumissaka.com | Huzaifa likes it. Must be short, once per session, skipped for reduced motion |
| 2026-09-06 | Replace trial Söhne with an open-licence pair | No licence. See design.md |
| 2026-09-06 | TAMM is the turning point of the journey: agency years before, product years after | Huzaifa's own framing |
| 2026-09-06 | "10+ years" everywhere on the site, matching the CV | Whole number, consistent with applications |
| 2026-09-06 | Fraunces (display) + Manrope (body) | Confirmed. Must be used differently from dinidumissaka.com so it does not read as a copy |
| 2026-09-06 | Dubai is one chapter, not two, with a visible transition from UX/UI designer to Product designer at TAMM | Huzaifa's call |
| 2026-09-06 | RTA, Dubizzle, Meydan, Refinitiv appear only as Conceptualize client work | Accuracy |
| 2026-09-06 | No live demo links on the site. The International Sales portal (tgx) becomes a fourth case study, written later | Huzaifa's call |
| 2026-09-06 | Journey direction: A (chapters by city) with a plain role list from B at the top of About | Huzaifa's choice |
| 2026-09-06 | No accent-coloured highlight boxes or lit-up labels. The turn into product is told in words and structure, not colour | Huzaifa's feedback |
| 2026-09-06 | Fraunces regular only, no italics | Huzaifa's feedback |
| 2026-09-06 | About page pivots from long chapters to a short beat-based story: 5 beats, one or two sentences each, a photo per beat, ~250 to 300 words total. The sticky-rail chapter prototype is dropped. Reference for structure only: henandesigns.com/aboutme | Huzaifa: "too much content, no one reads this much". Agreed on length, not on copying the reference's substance |
| 2026-09-07 | About page has no "How I work" and no "Outside work" sections | Huzaifa's call |
| 2026-09-07 | Role list on About has no sector column: years, company, title only | Huzaifa's call |
| 2026-09-07 | "Along the way" photo strip stays for now, pending photos | Huzaifa's call |
| 2026-09-07 | Copy signed off: all five home tabs, all four About beats, the stance lines owned. Axact stays out of the story deliberately | Huzaifa, 2026-09-07 |
| 2026-09-07 | Nav confirmed: Work, About, Resume in the header, Contact in the footer | Huzaifa |
| 2026-09-07 | Build proceeds with mock case study data and placeholder photos. Real photos and LinkedIn recommendations land later | Huzaifa |
| 2026-09-07 | Colour direction C chosen: near-black with four industry colours (fintech #5B8DEF, e-government #4FA98A, e-commerce #E0913A, B2B #C2618B) | Huzaifa |
| 2026-09-07 | Colour treatment follows Chaachie's principle, not its values: colour sits on large display words, bare, no underline. Saturation stays muted, because candy colours read as a graphic designer's playground, not a senior product designer | Measured on chaachiedesigns |
| 2026-09-07 | Case studies go dark, matching home and About. Verified: Chaachie (#09090B, content on #161619), Dinidu (#101010), Henan (#141414) all dark | Huzaifa's call, checked |
| 2026-09-07 | Dark case studies with both conditions: lifted reading surface, consistent mat behind every UI screenshot. Case study content will be rewritten into short, digestible sections, one study at a time. No case study detail pages are built until then | Huzaifa |
| 2026-09-07 | One gradient on the site: the four industry colours on "products" in the About headline | Huzaifa |
| 2026-09-07 | Home work cards are mock, non-linking placeholders until each case study is rewritten | Huzaifa: "do not create case study details page as yet" |
| 2026-09-07 | Home page redesigned against four references, measured, not eyeballed. Hero: one statement at up to 104px spanning the full width under the tabs, hero fills the viewport (Chaachie). Work: each study is a full-height scroll-snap section with the image bleeding off the right edge, 100vh on desktop, natural height on mobile (Garri). References: a continuous marquee of LinkedIn recommendation cards on Home and About, pauses on hover (Fiordaliso). Footer: same two-column structure and content as the live site, location and clock left, email, LinkedIn and Resume right (huzaifaratlam.com) | Huzaifa's brief, 2026-09-07 |
| 2026-09-07 | Logo replaces the name in the header: Huzaifa's glyph on a circle with an animated cyan-to-purple-to-magenta gradient at 0.72 opacity over the brand blue, drifting and hue-cycling like the live site's | Huzaifa supplied logo.svg |
| 2026-09-07 | Loader now draws the logo glyph as a stroke, then fills it, then exits. About 1.4s, once per session, skipped for reduced motion | In the spirit of Dinidu's hand-drawn loader |
| 2026-09-07 | Hero tab switch is a masked word transition: outgoing words rise out, incoming words rise in, 26ms stagger, the lead crossfades, a single underline slides between tabs | Motion design pass |
| 2026-09-07 | Header: logo 56px top-left, Work and About spread across the middle, Resume top-right, 17px links (Henan's layout). Header height 88px on desktop | Huzaifa, from Henan screenshot |
| 2026-09-07 | Tabs: underline replaced by one pill that slides between tabs. Tabs auto-advance every 7s with a faint fill growing across the pill as the timer runs. Pauses on hover and focus, off screen and in hidden tabs. Stops for good once the reader picks a tab. Off for reduced motion | Huzaifa: "make it transitional... after some delay" |
| 2026-09-07 | Logo gradient softened: three blurred colour pools drifting over 18s, 0.6 opacity, no hue cycling | Huzaifa: "too sharp" |
| 2026-09-07 | Promos: content left (5 cols), image right (7 cols, contained, not bleeding), industry only, no company name, no counter, "B2B Marketplace". Scroll animation is stacking cards: each promo pins under the header and the next slides over it while the one beneath scales to 94% and dims. Scroll snap removed | Huzaifa's list |
| 2026-09-07 | Footer rebuilt to match the live site exactly: nine 56px neutral bands (#171717 to #F5F5F5) on white, each with a white cover that scales away to the left as it enters view, then black text, bold links with the stroked arrow, on white | Huzaifa: "keep exactly same and have white bg" |
| 2026-09-07 | Third home pass. Nav: Work and About grouped in the centre, Resume far right. "How I got here" removed from Home. Promos rebuilt on Garri's model: one viewport each, proximity snap, 16-column grid with 27px gutters, text in 5 columns, image across 11, larger type, plus a fixed dot navigation on the right that appears while the work block is on screen. Stacking cards dropped. Recommendation cards copied from the attached design: 460px dark rounded panels, 72px avatar, 26px name with the LinkedIn mark, role, rule, 20px quote, heights follow content, no "View on LinkedIn" line. Tab timer restarts after a click instead of stopping. One emphasised phrase per hero statement in brass #D9A441 | Huzaifa's list, 2026-09-07 |
| 2026-09-07 | Fourth home pass, fixes: tab timer stops for good after a click and pauses over the tab row (decided twice, closed); recommendation cards dissolve into the page at the bottom with reference sizes, text does not fade; footer right block hugs the right gutter; "Case study coming"; cursor inverts over light surfaces via blend mode; header has no line on scroll | Huzaifa's list, 2026-09-07 |
| 2026-09-10 | Case studies dropped `min-h-screen` for content height plus symmetric padding. Gap is now ~285px on every viewport instead of 275-341 with up to 178px of dead space. Note: of the four references only Garri uses full-height case sections; Chaachie, Henan and Dinidu all use content-sized lists or card grids | Huzaifa: "gap between case studies are too much" |
| 2026-09-10 | Sections pad top only, never bottom, at Garri's 120px rhythm. Home page 200px shorter; gaps now 320-363 against his 312 | Huzaifa: "spacing between section is too much" |
| 2026-09-09 | Every section moved onto one shared 16-column grid. Text always columns 1–5, case study image columns 6–15 at a fixed 16:10, column 16 reserved for the dot rail. Hero lead moved from the right column to sit under the heading at the same left edge | Huzaifa: sections "look like everything is just placed without any logic" |
| 2026-09-09 | Palette rebuilt to three colours plus opacity: page `#0A0B0D`, primary `#EDEBE4`, accent `#D9A441`. Industry hues dropped. Opacity-derivation method borrowed from sherizan.com; his cream and rose deliberately not | Huzaifa chose "Brass" from the palette study |
| 2026-09-09 | Preview words: dotted underline at rest close to the baseline, accent on hover. The wipe-in gradient is gone | Huzaifa |
| 2026-09-09 | 21st `motion-cursor-multifollow` installed site-wide as a React island (`client:idle`). Source is verbatim from 21st except one removed import: upstream imports `./motion-cursor-multifollow-utils/index.css`, which 21st does not ship (registryDependencies empty), so `.cursor-stage` is defined in our global.css instead | Necessary; the build fails otherwise |
| 2026-09-09 | Registry install route (`shadcn add`) requires paid marketplace membership. The MCP `get_component` free tier (2/day) returned the exact source, which was written to disk manually | 21st paywall |
| 2026-09-09 | Tailwind's default palette CAN be safely wiped: the cursor uses inline hex, not Tailwind classes or shadcn tokens | Resolved by reading the source |
| 2026-09-08 | Stack: Tailwind v4 + React wired into Astro, shadcn scaffolding (components.json, `@/` alias, `cn()`), so 21st components install verbatim. Design system moved into the Tailwind theme | Huzaifa: "I'd rather have everything build on tailwind css" |
| 2026-09-08 | Five type steps (display, h2, h3, body, meta). `lead` merged into `h3` because at mobile the two clamps differed by 1px | Huzaifa spotted it |
| 2026-09-08 | Colour naming is role-based with no property repetition. 14 tokens plus a shadcn alias block | Agreed 2026-09-08 |
| 2026-09-08 | Four industries became three: B2B folded into e-commerce. Industry words are links opening the company site in a new tab (BSF, TAMM, Tradeling); the hover preview panel arrives with the 21st component | Huzaifa |
| 2026-09-08 | Hero emphasis is white on a muted statement, not a hue. About's "products" uses the e-commerce accent, replacing the cut gradient | Colour discipline; flag for Huzaifa's review |
| 2026-09-08 | Dubai appears only in the footer | Huzaifa |
| 2026-09-08 | No scroll snapping. Case study images fill the section height instead, which was the actual cause of the dead space | Claude's argument, accepted |
| 2026-09-07 | Grid broken deliberately in three places: hero statement uses a 1720px wide container, promo images bleed to the viewport edge on the right, the marquee runs edge to edge under a soft mask | Huzaifa: "break the traditional grid if needed" |
| 2026-09-07 | Gradient policy: never more than one, never on a CTA. Chaachie's is a six-stop rainbow under an agency line Huzaifa has banned, so the mechanic is borrowed, not the placement | Claude |
| 2026-09-07 | Home audience tabs: keep the statement-paragraph-close format, drop the slogan closes, AI once per tab, one specific per tab, headings are claims or stances | Review 06, from Huzaifa's brief: very senior or lead level, AI-integrated workflow |
| 2026-09-07 | AI positioning: integrated into the daily design workflow, with shipped products as proof. Never "ships through AI" or vibe-coder framing. Domains named as startups, e-government, e-commerce, fintech | Huzaifa's direction |
| 2026-09-07 | About through-line: a builder's habit from the eighth-grade wifi network to AI in the workflow now. Five beats: wifi, design and code, Tanzania, agency then TAMM, now. Then recommendations (real, from LinkedIn), role list, photo strip | Review 03 |
| 2026-09-06 | Copy is agreed in text before anything is rendered again | Two visual rounds rejected on copy. Words first |
| 2026-09-06 | All site copy must be self-explanatory to a stranger: every company gets a few words of context on first mention, every method term gets plain words. Never lift lines from pitchme as they are | Huzaifa's feedback |

---

## 4. Open questions

1. **Company descriptors.** The About copy describes RTA, Dubizzle, Refinitiv, Meydan, Rizek, Sell Any
   Car, Xische and Tradeling in a few words each. These are Claude's plain-language descriptions of
   public companies, not facts from Huzaifa. Huzaifa to confirm or correct each.
2. **The TAMM ending.** Copy currently says the job ended in 2021 in Covid cost cuts. Keep or drop?
3. **Photos.** Huzaifa has photos from Tanzania, Cubix, TAMM, Tradeling and BSF (work, outings,
   team) plus two TAMM whiteboards. Still need: clearance to publish people and whiteboard content,
   and the actual files.
4. **Current status.** Huzaifa leaves Tradeling end of September 2026. Site stays silent on
   availability unless Huzaifa decides otherwise.
5. **Karachi and Dar es Salaam memories.** One real moment per city would strengthen those chapters.

---

## 5. Information architecture

```
/                Home
/about           About + career journey
/work/<slug>     Case studies (3 now, rewrite later)
```

Global: header (name, Work, About, Resume), footer (kept from current site).

### Home
1. Hero: name, one-line position, audience tabs swapping a short statement.
2. Selected work: three case studies with company, one-line context, one outcome each.
3. Journey teaser: four cities, years, one line, link to About.
4. Footer.

### About (revised 2026-09-07, review 03)
1. Intro: "Hi, I'm Huzaifa", headline claim, one paragraph with level, the four domains, three
   settings with stakes, one line on AI in the workflow.
2. How I got here, four beats (statement, support line, photo): Cubix (Facebook pages, websites,
   first mobile app); Tanzania at twenty; Conceptualize, founding designer to a team of four;
   product from TAMM to today. To be designed as an animated, scroll-driven section.
3. In their words: real LinkedIn recommendations, two or three. Huzaifa to supply.
4. Where I've worked: nine-row list with sector and city.
5. Along the way: photo strip, no captions. Huzaifa adds the photos.
6. Footer.
No "How I work", no "Outside work", no numbers.

Previous chapter plan, superseded:
2. Career journey, scroll-driven chapters by city:
   - Karachi, 2011 to 2012 (Cubix; the diploma, the CS degree, iPhone 3GS at 320x480)
   - Dar es Salaam, 2012 to 2013 (Global Land Solutions, sole designer at ~20)
   - Karachi again, 2013 to early 2017 (Axact, then Conceptualize as a remote employee from Aug 2014)
   - Dubai, early 2017 to today (moved with Conceptualize; RTA / Dubizzle / Refinitiv / Meydan as
     client work; the transition at TAMM from UX/UI designer to Product designer; then Sell Any
     Car, Rizek, BSF, Tradeling). "Nine years in Dubai" counts from 2017.
   Each chapter: place, years, roles, what changed. Photos only where they exist.
3. How I work (from `brand.md` section 5, in Huzaifa's words).
4. Outside work, short.
5. Footer.

### Case study
Persistent header, sticky metadata (role, team, timeline, outcome), real headings, next/previous.

---

## 6. Features

- Audience tab hero with keyboard support and no layout shift.
- Page loader, first visit per session only, under ~1.2s, skipped on reduced motion.
- Scroll-driven journey on About; on mobile a simpler stacked version with the same content.
- Page transitions between home, about and case studies.
- Live local time in footer.
- Per-page titles, descriptions and Open Graph images. Indexable.
- Self-hosted resume PDF.

---

## 7. Technical decisions

- **Astro**, static output. Near-zero JS by default, built-in image optimisation, clean SEO,
  content collections for case studies in MDX later.
- **No React in use yet.** Tabs, journey, loader, cursor and reveals are small vanilla scripts
  inside Astro components, each re-initialised on `astro:page-load`. React and Motion are
  installed for when an interaction genuinely needs them. Do not add them for their own sake.
- **View Transitions** via Astro's ClientRouter for page changes. Scripts must guard against
  double-initialisation because the page body is swapped, not reloaded.
- **Dev server**: `.claude/launch.json` entry "portfolio" (port 4321). From the Deriv Task
  session the same name runs `npm --prefix ~/Desktop/portfolio run dev`.
- **Fonts** self-hosted via Fontsource.
- **Hosting** Vercel. Domain stays huzaifaratlam.com.
- No CMS. Case studies are MDX files.
- Accessibility: semantic headings, focus states, `prefers-reduced-motion` respected everywhere.

---

## 8. Design decisions

See `design.md`. Summary: dark home and about, light case studies (as today), one serif display
face plus one sans body face, one accent colour, no gradients, no decorative shapes.

---

## 9a. Reference palettes, measured 2026-09-07

| Site | Ground | Accent |
|---|---|---|
| dinidumissaka.com | #101010 | #0055FF |
| chaachiedesigns | #09090B | #FF60D4, #5FA7FF, #00CA61, #FF8A1E on title words |
| garri.design | #F8F8F8 | none |
| huzaifaratlam.com (live) | #0A0A0A | #6AB0FF |

Blue on near-black is taken twice over, including by Dinidu, who uses the same two typefaces and
works in Dubai. The new site must not repeat it.

## 9. References (what Huzaifa liked, one thing per site, 2026-09-07)

- dinidumissaka.com: the hand loading animation. Also the Fraunces + Manrope pair (adopted).
- henandesigns.com: big type, clear spacing. Experience section belongs on About (adopted as
  the role list). Not the hobby grid or the freelance line.
- chaachiedesigns.framer.website: big type, an accent colour on words inside the title, hover on
  those words reveals a subtext. Dark ground, Inter Display + Libre Caslon Condensed.
- garri.design: big type, clear spacing, custom cursor. PP Neue Montreal, light ground.
Common thread: large display type with room around it, one accent used sparingly on words, one
signature interaction. Combine and adapt; never copy a site a Dubai hiring manager may have seen.

---

## 10. Completed work

- 2026-09-06: Audit of live site. Project folder and memory files created.
- 2026-09-06: Review 01, three journey directions as scrollable prototypes, published as an artifact.
- 2026-09-06: Review 02, the chosen direction with rewritten copy, republished to the same link. Rejected: too long, headline was a fact not a claim.
- 2026-09-07: Review 03, About as a five-beat story with a through-line, critique column, placeholders for photos and recommendations.
- 2026-09-08: Full Tailwind pass. Theme written, all ten components ported, content changes applied, audited. Zero off-scale type values remain; four a11y defects found and fixed (tab touch target 42px to 44px, dead group-hover utility, 8px dot targets, unannounced new-tab links).
- 2026-09-07: Third home pass: nav grouping, teaser removed, Garri-model promos with dots, attached recommendation card design, timer restarts on click, emphasis phrases.
- 2026-09-07: Second home pass: header layout, pill tabs with auto-advance, soft logo, stacking promos, exact footer.
- 2026-09-07: Home page redesign built and verified by script on desktop and mobile. Hero statement 92px at 1440, 12 masked words, tab transitions cycle correctly, logo gradient animating, promos 100vh with snap and right bleed, marquee 8 cards on a 56s loop, footer two columns. Build clean. Visual sign-off on a visible screen still needed.
- 2026-09-07: First build. Astro site with home (audience tabs, three mock work cards, journey teaser) and About (intro with the gradient word, scroll-driven "How I got here" with a sticky photo stage, recommendation placeholders, role list, photo strip), shared header, footer with Dubai clock, page loader once per session, custom cursor on fine pointers, view transitions, industry-colour words with hover subtext and inline fallback on touch. Production build passes. Verified by script in the browser: fonts, tabs, colours, gradient, sticky stage, no overflow, no console or server errors. Visual check on a visible screen still needed.
- 2026-09-07: Direction C chosen. Reference treatments measured. Astro project scaffolded in ~/Desktop/portfolio.
- 2026-09-07: Copy signed off. Review 13, three colour directions with measured reference palettes.
- 2026-09-07: Reviews 07 to 12, home tabs rewritten four times and About edits applied.
- 2026-09-07: Review 06, About edits applied, home audience tabs rewritten with critique of the live copy.
- 2026-09-07: Review 05, beats restructured to four chapters of work.
- 2026-09-07: Review 04, content only: headline fixed, application jargon removed, AI paragraph cut to two lines, wifi beat removed, hairline section headings removed.

## 11. Next steps

1. Home page copy audit delivered 2026-09-09, awaiting Huzaifa's decisions on the three case
   study lines and the PM / Designers / Engineers tabs.
2. Hover preview installed 2026-09-09 from the prompt Huzaifa supplied. Blocked only on images:
   four files needed in `public/previews/` at ~600px wide — tgx.jpg, bsf.jpg, tamm.jpg,
   tradeling.jpg. Until they exist the word still emphasises, underlines and links; no card shows.
3. Old note, cursor installed 2026-09-09. Four open questions with Huzaifa: its pink/magenta/purple palette
   vs our three colours; the white inner dot vanishing on the white footer; press variants that
   cannot fire while the stage is pointer-events:none; whether to enable its built-in `magnetic`
   mode on links.
4. Decide whether the About page's TAMM / BSF / Tradeling links should go white too, matching
   the recruiter tab.
3. Preview images for the three industry links. Only Tradeling exposes a usable og:image;
   BSF's is broken and TAMM has none, so these need capturing or supplying.
4. Photos and LinkedIn recommendations from Huzaifa.
5. Case studies, one at a time: rewrite into short sections, then build the detail page.
2. Photos and LinkedIn recommendations drop in (marquee cards are placeholders).
3. Case studies, one at a time: rewrite into short sections, then build the detail page template.
4. Resume PDF self-hosted, Open Graph image, deploy to Vercel on huzaifaratlam.com.
3. Home page copy: hero, five audience statements, three case study cards, journey teaser.
4. Design directions, then the build.

## 11a. Known gaps in the first build

- Work cards do not link anywhere. They wait for the rewritten case studies.
- Photos, recommendations and the Along-the-way strip are placeholders.
- Resume links to the existing Google Drive file. Self-host a PDF before launch.
- No Open Graph image yet.
- The Recruiters and About intro industry lists share the same four tooltips. Fine for now.

## 12. Future ideas

- Fourth case study: the International Sales portal (S1). Huzaifa writes it later.
- Short "how I work" notes page if the About page gets long.


## 13. Spacing and rhythm pass — 10 Sep 2026

Twelve competing vertical padding rules collapsed into one token and one class.

- `--section-space` (56 mobile / 96 desktop) and `.section { padding-block: var(--section-space) }`
  are now the only vertical rhythm rule. Every section uses it, the hero included. No exceptions,
  so the gap between any two sections is always predictable without reading the markup.
- Deleted: the top-padding-only convention, both of its documented exceptions,
  `lg:pt-[calc(var(--hdr)+64px)]`, the `lg:py-0` that fought it, and seven one-off values.
  `scroll-padding-top` on `html` already handles anchor jumps.
- Case study columns now match Garri's measured split: text 1–4, image 5–15. The image goes from
  860px to 917px at 1440. Content-to-content gap 286px → 192px.
- The case study line drops from 20px to 17px to suit the 318px column. Agreed with Huzaifa in
  advance as the price of the wider image.
- Dot rail: 8px dots at a 40px pitch → 5px at 29px, active dot in accent rather than white. Hit
  target held at 29 x 29 through padding.

**Bug found while measuring.** The dot rail's `pl-2` had never worked — glued to a template
interpolation (`pl-2${i === 0 ...}`), so Tailwind's scanner never emitted the class and the hit
target was 5px wide. Fixed here and in `AudienceTabs`, and written up in design.md.

**Not verified visually.** The browser pane was hidden for this pass, which pauses rendering and
IntersectionObserver, so screenshots came back black and the image reveals never fired. Every
number above is a real layout measurement, which is computed regardless. The reveal animations and
the look of the new dot rail still want a human eye.


## 14. Single-page rebuild — planned 10 Sep 2026

Reference: billysweeney.com for the grid, overlay and left rail (measured, not copied);
southleft.com for token architecture (two-tier, `data-theme` on the root, and the lesson that a
theme can carry non-colour knobs).

**Decided**

- 12 columns, margin 48, gutter 24, container still capped at 1720.
- Nav rail on the **left**, in column 1: sections at the top, theme and grid toggles at the bottom.
  Content in columns 2–12.
- Two pages become one. Seven sections: Intro, Work, About, Journey, Background, References,
  Contact. Real ids, real anchors, smooth scroll on click, scroll-spy driving both the active
  state and the URL hash. Free scrolling — no snap.
- About splits three ways: **About**, then **Journey**, then **Background** (work experience).
- "Along the way" photos stay in About, restacked vertically at varying column spans.
- References loses the horizontal marquee. Cards go vertical at different depths.
- Four themes: Brass (default), Slate, Moss, Cream. Slate takes coral.
- Grid overlay hidden below `md`; the toggle hides with it.
- Case study dot rail stays on the right — no longer collides now the nav is left.

**Resolved**

- Horizontal header removed entirely. Logo moves to the top of the rail; **Resume is the eighth
  rail link**, carrying the footer's ↗ glyph sized at `1em` so it tracks the label.
- Tabs stay, and are the Intro section. Tabs and headline share column 2; the lead steps forward
  to column 5 so the hero is not one flush left stack.
- Toggles are round like the logo, never boxed, with a tinted-glass backdrop mixed from the
  theme's own ink so they belong to whichever theme is live.

**Sequence**

1. Grid tokens in `global.css`; container and overlay read the same variables.
2. Theme layer: seeds, `data-theme` on the root, `localStorage`, picker in the rail.
3. Rail: nav, scroll-spy, hash sync, toggles.
4. Merge `about.astro` into `index.astro` as sections; `/about` redirects to `/#about`.
5. Re-align every section to 12 columns.
6. Rebuild References as depth-scrolled cards.
7. Restack "along the way" vertically.
8. Audit: contrast across all four themes, grid alignment with the overlay on, reduced motion,
   keyboard nav.

**Known risk.** Verification has been running blind for several passes — the preview pane is
collapsed, which pauses rendering and IntersectionObserver, so layout measurements are reliable but
scroll-spy, the overlay draw and the theme transition cannot be checked without a human eye.


## 15. Single-page rebuild — built 10 Sep 2026

Shipped in one pass and verified in-browser at 1440 and 390.

**Measured, not assumed** (1440, 12 cols, margin 48, gutter 24):
rail x=48 w=90 (column 1) · hero headline x=162 (col 2) · tab row x=162, first pill box x=162,
indicator x=162 · lead x=504 (col 5) w=432 · case text x=162 w=318 · case image x=504 w=888 ·
reference cards 546/546/546/432 at columns 2, 8, 3, 8 · photos 432/432/318/546/546 · no
horizontal overflow at 390.

**Bugs found and fixed while building**

- Reference cards and About photos auto-placed into a *single grid column* below `lg` — 48px and
  34px wide. They needed an explicit `grid-column: 1 / -1` default before the `lg` spans.
- The 21st cursor hardcodes its dot to `white`, which vanishes on Cream. Overridden in CSS to
  `--color-primary` so the vendored source stays untouched; the existing inverted rule still wins
  over the footer.
- Three more hardcoded colours that could not follow a theme: the placeholder hatch, the tab
  indicator sheen, and the hover-preview card shadow. All now mixed from `--color-primary`.
- `meta[name=theme-color]` was static, so a Cream visitor got a near-black status bar on mobile.
  It now follows the theme, set before first paint alongside the theme itself.
- `Cursor.astro` was dead — imported nowhere since the 21st cursor landed. Deleted.

**Scroll-spy is driven by scroll, not IntersectionObserver.** IO only reports while the document
is being rendered, so it goes silent in background tabs and in previews — the observer here never
fired even once. A navigation whose active state silently stops updating is worse than one costing
a rAF per scroll, and the work is a handful of coalesced `getBoundingClientRect` reads.

**Astro's dev server served a stale module graph again** — Words.astro's markup updated while its
scoped `<style>` never reached the page, so the grid rules appeared to be broken when they were
simply absent. Restarting the dev server and clearing `node_modules/.vite` fixed it. This is the
third time this session; check the built CSS before believing a styling bug.

**Still open**

- Four hover-preview images still 404 (`/previews/*.jpg`). The card hides itself, so nothing looks
  broken, but no preview appears either.
- Cream needs transparent PNGs for the case studies; two of three are on dark grounds.
- `words.ts` is still four placeholders marked never-publish.

## 15 Sep 2026 — About after Background; books and a record

Section order is now Intro, Work, Journey, Background, About, References, Contact. About's
photographs are replaced by two books (3D from the flat cover) and a record (drawn disc,
sleeve, turning). Placeholders: Creative Selection, Inspired, The G Code — Huzaifa to send
his own covers, Amazon links and a Spotify / YouTube Music link. `npm run shelf` refreshes
the record from the link. Still open: About photo captions are gone with the photos; the
hover-preview images under /previews are still missing.
