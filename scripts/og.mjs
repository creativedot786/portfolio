// Draws the site's sharing images and favicons with headless Chrome, from the site's own data, fonts and logo:
//
//   npm run og
//
// public/og/home.png         (2400 × 1260, as are the others) the home page: the hero's two lines, name and role
// public/og/<page>.png       each case study: its eyebrow and title beside its picture (OG_IMAGE below)
// public/favicon.svg         the logo in the site colours on a graphite tile
// public/favicon.ico         the same at 32 px (a PNG, as browsers accept)
// public/apple-touch-icon.png  180 px, full bleed: iOS rounds the corners itself
//
// Re-run it when a case study's title changes. Needs Google Chrome (set CHROME to use another path).
import { writeFile, mkdtemp, rm, rename } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { work } from '../src/data/work.ts';
import { LOGO_FACE, LOGO_GLASSES } from '../src/data/logo.ts';
import { site } from '../src/data/site.ts';
import { themes } from '../src/data/themes.ts';

const CHROME = process.env.CHROME || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const root = new URL('../', import.meta.url);
const file = (p) => pathToFileURL(fileURLToPath(new URL(p, root))).href;
const { ground: PAGE, ink: INK, accent: MINT } = themes[0];

// each case study's picture, and how it sits in the right-hand panel (536 × 630):
//  'screen'  a screen, cropped from its top left and running off the right edge (rounded on the left)
//  'fill'    a photo that fills the whole panel, cropped from the centre
//  'whole'   cut-outs on a transparent ground, like TAMM's phones: the whole picture, with room around it
//  'focus'   the left part of a wider picture at full panel height: Scout's search summary and the home it found
const OG_IMAGE = {
  scout: ['public/work/scout-still.jpg', 'focus'],
  'tradeling-b2b': ['public/work/tradeling-b2b.avif', 'whole'],
  'tradeling-lending': ['public/work/tradeling-lending.jpg', 'fill'],
  tamm: ['public/work/tamm.webp', 'whole'],
  rta: ['public/work/rta/dash.jpg', 'screen'],
};
const FRAME = {
  screen: (u) => `inset:72px 0 72px 48px;border-radius:8px 0 0 8px;background:url(${u}) left top/cover no-repeat`,
  fill: (u) => `inset:0;background:url(${u}) center/cover no-repeat`,
  whole: (u) => `inset:24px 12px;background:url(${u}) center/contain no-repeat`,
  // Scout's still is 1140 × 712; at 78% its summary and card (x 40–615, y 160–560) fill the panel and the phone is cut away
  focus: (u) => `inset:64px 18px 64px 48px;border-radius:8px;background:url(${u}) -31px -30px/889px auto no-repeat`,
};
// drawn at twice the size, so text stays sharp wherever the picture is shown large or on a dense screen
const SCALE = 2;
const OUT = process.env.OG_OUT || 'public/og';

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');
const mark = (size, face = INK, glasses = MINT) =>
  `<svg viewBox="0 0 44 44" width="${size}" height="${size}" style="display:block;flex:none"><path d="${LOGO_FACE}" fill="${face}"/><path d="${LOGO_GLASSES}" fill="${glasses}"/></svg>`;

const base = (w, h, body) => `<!doctype html><meta charset="utf-8"><style>
@font-face{font-family:Fraunces;src:url(${file('node_modules/@fontsource-variable/fraunces/files/fraunces-latin-full-normal.woff2')}) format('woff2');font-weight:100 900}
@font-face{font-family:Manrope;src:url(${file('node_modules/@fontsource-variable/manrope/files/manrope-latin-wght-normal.woff2')}) format('woff2');font-weight:200 800}
*{box-sizing:border-box}html,body{margin:0;width:${w}px;height:${h}px;overflow:hidden;background:transparent}
.og{width:1200px;height:630px;background:${PAGE};color:${INK};font-family:Manrope,system-ui,sans-serif;position:relative;overflow:hidden}
.d{font-family:Fraunces,Georgia,serif;font-weight:500;font-variation-settings:"opsz" 144,"SOFT" 40;letter-spacing:-.012em}
.ink2{color:color-mix(in srgb,${INK} 72%,transparent)}.ink3{color:color-mix(in srgb,${INK} 51%,transparent)}
.mono{font-family:ui-monospace,SFMono-Regular,"SF Mono",Menlo,monospace}
</style>${body}`;

const home = () => base(1200, 630, `<div class="og" style="padding:72px 88px;display:flex;flex-direction:column;justify-content:space-between">
  <div class="ink2" style="display:flex;align-items:center;gap:22px;font-weight:600;font-size:28px">${mark(64)}${esc(site.name)}</div>
  <div class="d" style="font-size:104px;line-height:1.02">Designing at scale.<span style="display:block;color:${MINT}">Building with AI.</span></div>
  <div class="ink3" style="display:flex;justify-content:space-between;font-weight:500;font-size:26px"><span>${esc(site.title)} · Dubai</span><span>${new URL(site.url).host.replace(/^www\./, '')}</span></div>
</div>`);

const study = (w) => {
  const [img, frame] = OG_IMAGE[w.slug];
  return base(1200, 630, `<div class="og">
  <div style="position:absolute;left:88px;top:72px;bottom:72px;width:520px;display:flex;flex-direction:column">
    <div class="ink3 mono" style="font-size:21px">${esc(w.industryLabel)} · ${esc(w.platform)}</div>
    <div class="d" style="font-size:58px;line-height:1.06;margin-top:22px;text-wrap:balance">${esc(w.title)}</div>
    <div class="ink2" style="display:flex;align-items:center;gap:16px;font-weight:600;font-size:24px;margin-top:auto">${mark(48)}${esc(site.name)} · Case study</div>
  </div>
  <div style="position:absolute;left:664px;top:0;right:0;bottom:0;background:color-mix(in srgb,${INK} 6%,${PAGE})">
    <div style="position:absolute;${FRAME[frame](file(img))}"></div>
  </div>
</div>`);
};

// favicon: the logo on a graphite tile, the same in light and dark tabs
const tileSvg = (rounded) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 44 44">
  <rect width="44" height="44"${rounded ? ' rx="9.7"' : ''} fill="${PAGE}"/>
  <g transform="translate(22 22) scale(1.16) translate(-22 -21)"><path fill="${INK}" d="${LOGO_FACE}"/><path fill="${MINT}" d="${LOGO_GLASSES}"/></g>
</svg>
`;
const icon = (size, rounded) => base(size, size, tileSvg(rounded).replace('<svg ', `<svg width="${size}" height="${size}" style="display:block" `));

const tmp = await mkdtemp(join(tmpdir(), 'og-'));
async function shot(html, w, h, out, scale = 1) {
  const src = join(tmp, 'p.html');
  await writeFile(src, html);
  execFileSync(CHROME, ['--headless=new', '--hide-scrollbars', '--default-background-color=00000000', `--window-size=${w},${h}`, `--force-device-scale-factor=${scale}`,
    '--virtual-time-budget=3000', '--allow-file-access-from-files', `--screenshot=${fileURLToPath(new URL(out, root))}`, pathToFileURL(src).href], { stdio: 'ignore' });
  console.log(out);
}

try {
  execFileSync('mkdir', ['-p', fileURLToPath(new URL(OUT, root))]);
  await shot(home(), 1200, 630, `${OUT}/home.png`, SCALE);
  for (const w of work) {
    if (!OG_IMAGE[w.slug]) throw new Error(`og.mjs: no picture for ${w.slug} in OG_IMAGE`);
    await shot(study(w), 1200, 630, `${OUT}/${w.href.split('/').filter(Boolean).pop()}.png`, SCALE);
  }
  await writeFile(new URL('public/favicon.svg', root), tileSvg(true));
  // Chrome writes only PNG, JPEG or WebP, so the 32 px icon is drawn as a PNG and copied to its .ico name
  await shot(icon(32, true), 32, 32, 'public/og/favicon-32.png');
  await rename(new URL('public/og/favicon-32.png', root), new URL('public/favicon.ico', root));
  console.log('public/favicon.ico');
  await shot(icon(180, false), 180, 180, 'public/apple-touch-icon.png');
} finally {
  await rm(tmp, { recursive: true, force: true });
}
