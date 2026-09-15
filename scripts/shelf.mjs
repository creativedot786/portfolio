// Fetches the "listening to" record from the link in src/data/shelf.json and writes
// src/data/listening.generated.json plus public/shelf/listening.jpg.
//
//   npm run shelf
//
// Spotify and YouTube (incl. YouTube Music) both publish an oEmbed endpoint that needs no
// key: it gives the title and a cover image. The artist and year come from the page's Open
// Graph tags where available (Spotify), or the channel name (YouTube, minus " - Topic").
// Anything in shelf.json's `listening` block other than `url` is an override and wins.
import { readFile, writeFile } from 'node:fs/promises';

const cfgPath = new URL('../src/data/shelf.json', import.meta.url);
const outPath = new URL('../src/data/listening.generated.json', import.meta.url);
const imgPath = new URL('../public/shelf/listening.jpg', import.meta.url);

const cfg = JSON.parse(await readFile(cfgPath, 'utf8'));
const { url, ...overrides } = cfg.listening;
if (!url) throw new Error('shelf.json: listening.url is empty');

const ua = { headers: { 'user-agent': 'Mozilla/5.0 (portfolio shelf fetch)' } };
const meta = (html, prop) => html.match(new RegExp(`<meta[^>]+(?:property|name)="${prop}"[^>]+content="([^"]*)"`))?.[1]
  ?? html.match(new RegExp(`<meta[^>]+content="([^"]*)"[^>]+(?:property|name)="${prop}"`))?.[1];
const decode = (s = '') => s.replace(/&amp;/g, '&').replace(/&#39;/g, "'").replace(/&quot;/g, '"');

let out = { url, title: '', artist: '', year: '', source: '' };

if (/spotify\.com/.test(url)) {
  out.source = 'Spotify';
  const oe = await (await fetch(`https://open.spotify.com/oembed?url=${encodeURIComponent(url)}`, ua)).json();
  out.title = oe.title; out.cover = oe.thumbnail_url;
  // "PeelingFlesh · Album · 2024 · 10 songs." — artist and year live in og:description
  const html = await (await fetch(url, ua)).text();
  const desc = decode(meta(html, 'og:description') ?? '');
  const parts = desc.split('·').map((s) => s.trim());
  if (parts.length >= 2) out.artist = parts[0];
  out.year = (desc.match(/\b(19|20)\d{2}\b/) ?? [''])[0];
} else if (/youtu\.?be/.test(url)) {
  out.source = 'YouTube Music';
  const oe = await (await fetch(`https://www.youtube.com/oembed?url=${encodeURIComponent(url)}&format=json`, ua)).json();
  out.title = oe.title; out.artist = (oe.author_name ?? '').replace(/\s*-\s*Topic$/, '');
  // maxres is not always published; hq always is
  const id = url.match(/(?:v=|youtu\.be\/|\/watch\/)([\w-]{11})/)?.[1];
  out.cover = id ? `https://i.ytimg.com/vi/${id}/hqdefault.jpg` : oe.thumbnail_url;
} else {
  throw new Error('shelf.json: listening.url must be a Spotify or YouTube link');
}

Object.assign(out, overrides);
// a local cover ("/shelf/x.jpg") in the overrides is used as-is; otherwise the fetched one is saved
if (!out.cover.startsWith('/')) {
  const img = await fetch(out.cover, ua);
  if (!img.ok) throw new Error(`cover fetch failed: ${img.status}`);
  await writeFile(imgPath, Buffer.from(await img.arrayBuffer()));
  out.cover = '/shelf/listening.jpg';
}
await writeFile(outPath, JSON.stringify(out, null, 2) + '\n');
console.log(`shelf: ${out.title} — ${out.artist}${out.year ? ' · ' + out.year : ''} (${out.source})`);
