// The theme: one setting for the whole site, chosen from the rail (desktop) or the phone menu.
// The first theme is applied before first paint by the inline script in Base.astro; this changes it later.
import { themes, defaultTheme } from '../data/themes';

const root = document.documentElement;

export function currentTheme() {
  return root.getAttribute('data-theme') || defaultTheme;
}

// every theme control on the page shows the current choice (the rail's [data-theme-set], the menu's [data-hc-theme])
export function markTheme(id = currentTheme()) {
  document.querySelectorAll<HTMLElement>('[data-theme-set],[data-hc-theme]').forEach((b) => {
    b.setAttribute('aria-checked', String((b.dataset.themeSet || b.dataset.hcTheme) === id));
  });
}

export function setTheme(id: string) {
  const t = themes.find((x) => x.id === id);
  if (!t) return;
  if (id === defaultTheme) root.removeAttribute('data-theme');
  else root.setAttribute('data-theme', id);
  try { localStorage.setItem('hr-theme', id); } catch (e) {}
  // The glasses catch the light in the new accent — the moment the accent changes is the moment to show it.
  document.querySelectorAll<HTMLElement>('.logo').forEach((l) => {
    l.classList.remove('shine'); void l.offsetWidth; l.classList.add('shine');
  });
  const meta = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]');
  if (meta) meta.content = t.ground;
  markTheme(id);
}
