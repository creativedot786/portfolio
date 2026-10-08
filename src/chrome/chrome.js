// Site chrome shared by the home page and the case studies: the top bar on phones and tablets, its menu,
// the theme picker (both the menu's and the case-study rail's), the case-study scroll spy and loader.
// Safe to run more than once (Astro's router fires astro:page-load on every page change).
(() => {
  const THEME_COLORS = { brass: '#0A0B0D', slate: '#27333A', moss: '#12241C', cream: '#F3EDDF' };
  const RM = () => matchMedia('(prefers-reduced-motion: reduce)').matches;

  // One theme setting for the whole site. The home page styles read data-theme, the case studies data-t.
  function setTheme(id) {
    const root = document.documentElement;
    if (id === 'brass') { root.removeAttribute('data-theme'); root.removeAttribute('data-t'); }
    else { root.setAttribute('data-theme', id); root.setAttribute('data-t', id); }
    try { localStorage.setItem('hr-theme', id); } catch (e) {}
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta && THEME_COLORS[id]) meta.content = THEME_COLORS[id];
    markTheme(id);
  }
  function current() { return document.documentElement.getAttribute('data-theme') || document.documentElement.getAttribute('data-t') || 'brass'; }
  function markTheme(id) {
    document.querySelectorAll('[data-hc-theme],[data-theme-set]').forEach((b) =>
      b.setAttribute('aria-checked', String((b.dataset.hcTheme || b.dataset.themeSet) === id)));
  }

  function init() {
    markTheme(current());
    const top = document.querySelector('[data-hc-top]');
    const sheet = document.querySelector('[data-hc-sheet]');
    const open = document.querySelector('[data-hc-open]');
    if (top && !top.__hc) {
      top.__hc = true;
      // the bar leaves as you read down and returns as soon as you scroll up
      let last = scrollY, ticking = false;
      const onScroll = () => {
        ticking = false;
        const y = Math.max(0, scrollY);
        top.classList.toggle('scrolled', y > 8);
        if (!document.documentElement.classList.contains('hc-locked')) {
          if (y > last + 4 && y > 120) top.classList.add('away');
          else if (y < last - 4 || y < 120) top.classList.remove('away');
        }
        last = y;
      };
      addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
      onScroll();
    }
    if (sheet && open && !sheet.__hc) {
      sheet.__hc = true;
      const links = [...sheet.querySelectorAll('.hc-sheet-nav a')];
      const show = () => {
        // mark the section you are in
        let cur = '';
        links.forEach((a) => { const id = a.dataset.hcSec; const t = id && document.getElementById(id); if (t && t.getBoundingClientRect().top < innerHeight * 0.45) cur = id; });
        links.forEach((a) => a.classList.toggle('on', !!cur && a.dataset.hcSec === cur));
        markTheme(current());
        sheet.hidden = false; document.documentElement.classList.add('hc-locked'); open.setAttribute('aria-expanded', 'true');
        requestAnimationFrame(() => requestAnimationFrame(() => sheet.classList.add('open')));
        sheet.querySelector('.hc-close').focus();
      };
      const hide = (then) => {
        sheet.classList.remove('open'); open.setAttribute('aria-expanded', 'false');
        document.documentElement.classList.remove('hc-locked');
        setTimeout(() => { sheet.hidden = true; then && then(); }, RM() ? 0 : 260);
      };
      open.addEventListener('click', show);
      sheet.querySelector('.hc-close').addEventListener('click', () => { hide(); open.focus(); });
      addEventListener('keydown', (e) => { if (e.key === 'Escape' && !sheet.hidden) { hide(); open.focus(); } });
      // in-page links: close first, then go, so the page is unlocked when it scrolls
      links.forEach((a) => a.addEventListener('click', (e) => {
        const h = a.getAttribute('href') || '';
        if (h.startsWith('#')) { e.preventDefault(); hide(() => { const t = document.querySelector(h); if (t) t.scrollIntoView({ behavior: RM() ? 'auto' : 'smooth' }); }); }
        else hide();
      }));
    }
    document.querySelectorAll('[data-hc-theme]').forEach((b) => {
      if (b.__hc) return; b.__hc = true;
      b.addEventListener('click', () => { if (b.getAttribute('aria-checked') !== 'true') setTheme(b.dataset.hcTheme); b.blur(); });
    });

    // case studies: the rail marks the section in view
    const spy = [...document.querySelectorAll('[data-hc-spy]')];
    if (spy.length && !window.__hcSpy) {
      window.__hcSpy = true;
      const targets = spy.map((a) => document.getElementById(a.dataset.hcSpy));
      let t = false;
      const pick = () => {
        t = false; let on = null;
        targets.forEach((el, i) => { if (el && el.getBoundingClientRect().top < innerHeight * 0.4) on = i; });
        spy.forEach((a, i) => a.classList.toggle('on', i === on));
      };
      addEventListener('scroll', () => { if (!t) { t = true; requestAnimationFrame(pick); } }, { passive: true });
      pick();
    }

    // case studies: the logo draws itself on the first visit in a session; after that it only fades out
    const ld = document.querySelector('[data-hc-loader]');
    if (ld && !ld.__hc) {
      ld.__hc = true;
      let seen = false; try { seen = !!sessionStorage.getItem('hr-cs-loader'); sessionStorage.setItem('hr-cs-loader', '1'); } catch (e) {}
      if (RM()) { ld.remove(); return; }
      const p = ld.querySelector('.s');
      if (seen) ld.classList.add('quick');
      else { try { const n = p.getTotalLength(); p.style.strokeDasharray = n; p.style.strokeDashoffset = n; } catch (e) {} ld.classList.add('go'); }
      const min = seen ? 250 : 1100, t0 = performance.now();
      const done = () => setTimeout(() => { ld.classList.add('out'); setTimeout(() => ld.remove(), 500); }, Math.max(0, min - (performance.now() - t0)));
      if (document.readyState === 'complete') done(); else addEventListener('load', done, { once: true });
      setTimeout(() => ld.isConnected && ld.classList.add('out'), 3500); // never hold the page longer than this
    }
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
  document.addEventListener('astro:page-load', init);
})();
