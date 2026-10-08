// Site chrome shared by the home page and the case studies: the navigation pill on phones and tablets,
// the theme picker (the pill's and the case-study rail's), the footer strip, the grid on G, and on case
// studies the rail alignment, the scroll spy, the intro (the same one as the home page) and the reveals.
// Safe to run more than once (Astro's router fires astro:page-load on every page change).
(() => {
  const THEME_COLORS = { brass: '#0A0B0D', slate: '#27333A', moss: '#12241C', cream: '#F3EDDF' };
  const RM = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
  const root = document.documentElement;

  // ── theme: one setting for the whole site. The home page styles read data-theme, the case studies data-t ──
  function setTheme(id) {
    if (id === 'brass') { root.removeAttribute('data-theme'); root.removeAttribute('data-t'); }
    else { root.setAttribute('data-theme', id); root.setAttribute('data-t', id); }
    try { localStorage.setItem('hr-theme', id); } catch (e) {}
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta && THEME_COLORS[id]) meta.content = THEME_COLORS[id];
    markTheme(id);
  }
  function current() { return root.getAttribute('data-theme') || root.getAttribute('data-t') || 'brass'; }
  function markTheme(id) {
    document.querySelectorAll('[data-hc-theme],[data-theme-set]').forEach((b) =>
      b.setAttribute('aria-checked', String((b.dataset.hcTheme || b.dataset.themeSet) === id)));
  }

  // a word that rolls out while the next rolls in, the way the scroll went
  function rollTo(box, text, dir) {
    const old = box.lastElementChild; if (old && old.textContent === text) return;
    [...box.children].slice(0, -1).forEach((s) => s.remove());
    const nu = document.createElement('span'); nu.textContent = text; box.appendChild(nu);
    if (RM() || !old || !nu.animate) { old && old.remove(); return; }
    const d = dir < 0 ? -1 : 1, o = { duration: 420, easing: 'cubic-bezier(.65,0,.35,1)' };
    old.animate([{ transform: 'translateY(0)' }, { transform: `translateY(${-d * 100}%)` }], o).onfinish = () => old.remove();
    nu.animate([{ transform: `translateY(${d * 100}%)` }, { transform: 'translateY(0)' }], o);
  }

  // ── phones and tablets: the pill at the top. It shows the section you're in; tap it to open the menu ──
  function mnav() {
    const nav = document.querySelector('[data-hc-mnav]');
    if (!nav || nav.__hc) return;
    nav.__hc = true;
    const tog = nav.querySelector('.hc-mtoggle'), panel = nav.querySelector('.hc-mpanel'), label = nav.querySelector('.hc-mlabel');
    const links = [...nav.querySelectorAll('[data-hc-sec]')];
    const targets = links.map((a) => document.getElementById(a.dataset.hcSec));
    const isOpen = () => nav.classList.contains('open');
    const open = () => { markTheme(current()); nav.classList.add('open'); tog.setAttribute('aria-expanded', 'true'); panel.inert = false; };
    const close = () => { nav.classList.remove('open'); tog.setAttribute('aria-expanded', 'false'); panel.inert = true; };
    tog.addEventListener('click', () => (isOpen() ? close() : open()));
    addEventListener('keydown', (e) => { if (e.key === 'Escape' && isOpen()) { close(); tog.focus(); } });
    document.addEventListener('click', (e) => { if (isOpen() && !nav.contains(e.target)) close(); });
    nav.querySelectorAll('a').forEach((a) => a.addEventListener('click', close));

    // the section in view: the one whose top has passed 40% of the screen
    let cur = -1, last = scrollY, t = false;
    const pick = () => {
      t = false;
      let on = 0;
      targets.forEach((el, i) => { if (el && el.getBoundingClientRect().top < innerHeight * 0.4) on = i; });
      if (innerHeight + Math.ceil(scrollY) >= document.documentElement.scrollHeight - 2) on = targets.length - 1;
      if (on !== cur) { if (links[on]) rollTo(label, links[on].textContent, cur < 0 ? 0 : on - cur); cur = on; links.forEach((a, i) => a.classList.toggle('on', i === on)); }
      if (Math.abs(scrollY - last) > 40 && isOpen()) close();
      if (!isOpen()) last = scrollY;
    };
    tog.addEventListener('click', () => { last = scrollY; });
    addEventListener('scroll', () => { if (!t) { t = true; requestAnimationFrame(pick); } }, { passive: true });
    pick();
  }

  function themes() {
    document.querySelectorAll('[data-hc-theme]').forEach((b) => {
      if (b.__hc) return; b.__hc = true;
      b.addEventListener('click', () => { if (b.getAttribute('aria-checked') !== 'true') setTheme(b.dataset.hcTheme); b.blur(); });
    });
  }

  // ── G shows the grid the page is built on (not while typing). One overlay, made here, for both pages ──
  function grid() {
    if (!document.querySelector('.hc-grid')) {
      const g = document.createElement('div'); g.className = 'hc-grid'; g.setAttribute('aria-hidden', 'true');
      g.innerHTML = '<div>' + '<i></i>'.repeat(12) + '</div>';
      document.body.appendChild(g);
    }
    if (window.__hcGridKey) return;
    window.__hcGridKey = true;
    addEventListener('keydown', (e) => {
      if ((e.key === 'g' || e.key === 'G') && !e.metaKey && !e.ctrlKey && !e.altKey && !e.target.closest?.('input,textarea,select,[contenteditable]'))
        root.classList.toggle('hc-show-grid');
    });
  }

  // ── the footer strip, on both pages: tied to the scroll. The bands grow as the footer comes up the
  // screen and are complete when it reaches the middle; scroll back up and they shrink. However long
  // you paused above it, you see it fill in. ──
  function footer() {
    const wraps = [...document.querySelectorAll('[data-strip],[data-hc-strip]')].filter((w) => !w.__hc);
    if (!wraps.length) return;
    wraps.forEach((w) => { w.__hc = true; });
    const set = () => wraps.forEach((w) => {
      const host = w.parentElement;
      if (RM()) { host.style.setProperty('--fp', '1'); return; }
      // from the moment the strip enters at the bottom of the screen to the moment its top reaches the
      // middle, or the end of the page if that comes first, so it always completes smoothly
      const vh = innerHeight, y = scrollY, top = w.getBoundingClientRect().top + y;
      const max = document.documentElement.scrollHeight - vh;
      const start = top - vh, end = Math.max(start + 1, Math.min(top - vh * 0.5, max));
      const p = Math.min(1, Math.max(0, (y - start) / (end - start)));
      host.style.setProperty('--fp', p.toFixed(3));
    });
    let t = false;
    addEventListener('scroll', () => { if (!t) { t = true; requestAnimationFrame(() => { t = false; set(); }); } }, { passive: true });
    addEventListener('resize', set, { passive: true });
    set();
    // case studies: the clock, as on the home page
    const clocks = document.querySelectorAll('[data-hc-clock]');
    if (clocks.length) {
      const fmt = new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: '2-digit', second: '2-digit', hour12: true, timeZone: 'Asia/Dubai' });
      const tick = () => clocks.forEach((c) => { c.textContent = fmt.format(new Date()) + ' (Local Time)'; });
      tick(); setInterval(tick, 1000);
    }
  }

  // ── case studies ─────────────────────────────────────────────
  function caseStudy() {
    if (!document.querySelector('.hc-rail') || window.__hcCase) return;
    window.__hcCase = true;

    // The rail: "All work" stays at the top under the logo; the section links line up with the first
    // line of the header's summary, the way the home page's links line up with the tabs. Text to text,
    // not box to box. Measured in page coordinates, so a page that opens scrolled lines up the same.
    const nav = document.querySelector('.hc-nav');
    const eyebrow = document.querySelector('.cs-head .sum') || document.querySelector('.cs-head .eyebrow');
    const align = () => {
      if (!nav || !eyebrow) return;
      nav.style.removeProperty('--nav-offset');
      if (!matchMedia('(min-width: 1024px)').matches) return;
      const link = nav.querySelector('a'); if (!link) return;
      const lead = (el) => { const cs = getComputedStyle(el); return (parseFloat(cs.lineHeight) - parseFloat(cs.fontSize)) / 2 || 0; };
      const want = eyebrow.getBoundingClientRect().top + scrollY + lead(eyebrow);   // page position of the summary's first line
      const have = link.getBoundingClientRect().top + parseFloat(getComputedStyle(link).paddingTop) + lead(link);   // fixed rail
      const d = Math.round(want - have);
      if (d > 0) nav.style.setProperty('--nav-offset', d + 'px');
      // converge: the first pass measures the link at its default 8px margin
      requestAnimationFrame(() => {
        const h2 = link.getBoundingClientRect().top + parseFloat(getComputedStyle(link).paddingTop) + lead(link);
        const w2 = eyebrow.getBoundingClientRect().top + scrollY + lead(eyebrow);
        const cur = parseFloat(nav.style.getPropertyValue('--nav-offset')) || 8;
        if (Math.abs(w2 - h2) > 1) nav.style.setProperty('--nav-offset', Math.max(0, Math.round(cur + w2 - h2)) + 'px');
      });
    };
    addEventListener('resize', align, { passive: true });
    if (document.fonts?.ready) document.fonts.ready.then(align);
    align();

    // the section in view
    const spy = [...document.querySelectorAll('[data-hc-spy]')];
    const targets = spy.map((a) => document.getElementById(a.dataset.hcSpy));
    const pick = () => {
      let on = null;
      targets.forEach((el, i) => { if (el && el.getBoundingClientRect().top < innerHeight * 0.4) on = i; });
      spy.forEach((a, i) => a.classList.toggle('on', i === on));
    };

    // Section reveals, as on the home page: blocks fade up 12px as they come into view, once each.
    // Units are the direct children of each section's grid; a child taller than the screen is split
    // into its own children, so long sections reveal row by row instead of all at once.
    const units = [];
    const collect = (el, depth) => {
      if (depth < 3 && el.children.length && el.getBoundingClientRect().height > innerHeight * 1.1) {
        [...el.children].forEach((c) => collect(c, depth + 1));
      } else units.push(el);
    };
    document.querySelectorAll('header.cs-head > .shell > *, section > .shell > *').forEach((el) => collect(el, 0));
    const reveal = () => {
      if (root.classList.contains('hc-intro')) return;   // not until the intro is done
      let n = 0;
      units.forEach((el) => {
        if (el.classList.contains('in')) return;
        const r = el.getBoundingClientRect();
        if (r.top < innerHeight * 0.92 && r.bottom > 0) { el.style.transitionDelay = Math.min(n++, 4) * 60 + 'ms'; el.classList.add('in'); }
      });
    };
    if (!RM()) units.forEach((el) => el.classList.add('hc-rv'));

    let t = false;
    addEventListener('scroll', () => { if (!t) { t = true; requestAnimationFrame(() => { t = false; pick(); reveal(); }); } }, { passive: true });
    pick();

    // The intro, the same one as the home page and on the same terms: it plays once, on the first page
    // of a visit, whichever page that is. 0 the logo draws; 1100ms the loader dissolves; 2000ms the page
    // fades in. After that, pages only cross-fade.
    const ld = document.querySelector('[data-hc-loader]');
    if (!root.classList.contains('hc-intro') || !ld) { ld?.remove(); reveal(); return; }
    const p = ld.querySelector('.s');
    try { const len = p.getTotalLength(); p.style.strokeDasharray = len; p.style.strokeDashoffset = len; } catch (e) {}
    ld.classList.add('go');
    setTimeout(() => { ld.classList.add('out'); try { sessionStorage.setItem('hr-loader', '1'); } catch (e) {} setTimeout(() => ld.remove(), 500); }, 1100);
    setTimeout(() => { root.classList.remove('hc-intro'); align(); reveal(); }, 2000);
  }

  function init() { markTheme(current()); mnav(); themes(); grid(); footer(); caseStudy(); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
  document.addEventListener('astro:page-load', init);
})();
