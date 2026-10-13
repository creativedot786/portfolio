// The sitemap for search engines: the home page and every case study, from src/data/work.ts, so a new case
// study is listed as soon as it is in the data. /about is left out: it only redirects to the home page.
import type { APIRoute } from 'astro';
import { site } from '../data/site';
import { work } from '../data/work';

export const GET: APIRoute = () => {
  const pages = ['/', ...work.map((w) => w.href)];
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map((p) => `  <url><loc>${new URL(p, site.url).href}</loc></url>`).join('\n')}
</urlset>
`;
  return new Response(body, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
