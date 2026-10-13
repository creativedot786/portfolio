// Small things every page has: the letter roll on text links, and the grid that G shows.
// Run on every page load; each part leaves alone what it has already done.

// ── text links opt in to the rail's letter roll with data-roll: each word becomes letters (hidden from
// screen readers, which read the original text instead). Words stay apart, so long links still wrap ──
export function rolls() {
  const esc = (t: string) => t.replace(/&/g, '&amp;').replace(/</g, '&lt;');
  document.querySelectorAll<HTMLElement>('[data-roll]').forEach((el) => {
    if ((el as any).__roll) return; (el as any).__roll = true;
    let i = 0;
    const walk = (node: Node) => [...node.childNodes].forEach((n) => {
      if (n.nodeType === 3) {
        const t = n.textContent || ''; if (!t.trim()) return;
        const wrap = document.createElement('span'), vis = document.createElement('span'), sr = document.createElement('span');
        vis.setAttribute('aria-hidden', 'true');
        // keep a space at either edge: a link's text can be split around other elements ("Creative <span>Confidence")
        vis.innerHTML = (/^\s/.test(t) ? ' ' : '') + t.trim().split(/(\s+)/).map((w) => /^\s+$/.test(w) ? ' ' : `<span class="hc-roll">${[...w].map((ch) => `<span class="hc-c" style="--i:${i++}"><span>${esc(ch)}</span></span>`).join('')}</span>`).join('') + (/\s$/.test(t) ? ' ' : '');
        sr.className = 'hc-sr'; sr.textContent = t.trim();
        wrap.append(vis, sr); (n as ChildNode).replaceWith(wrap);
      } else if (n.nodeType === 1 && !(n as Element).matches('svg,.sr-only,.hc-sr')) walk(n);
    });
    walk(el);
  });
}

// ── G shows the grid the page is built on (not while typing); the G key at the foot of the rail does the same ──
export function grid() {
  const root = document.documentElement;
  if (!document.querySelector('.hc-grid')) {
    const g = document.createElement('div'); g.className = 'hc-grid'; g.setAttribute('aria-hidden', 'true');
    g.innerHTML = '<div>' + '<i></i>'.repeat(12) + '</div>';
    document.body.appendChild(g);
  }
  const keys = () => document.querySelectorAll<HTMLElement>('[data-hc-gkey]');
  const toggle = () => { const on = root.classList.toggle('hc-show-grid'); keys().forEach((k) => k.setAttribute('aria-pressed', String(on))); };
  keys().forEach((k) => {
    if ((k as any).__hc) return; (k as any).__hc = true;
    k.setAttribute('aria-pressed', String(root.classList.contains('hc-show-grid')));
    k.addEventListener('click', () => { toggle(); k.blur(); });
  });
  if ((window as any).__hcGridKey) return;
  (window as any).__hcGridKey = true;
  addEventListener('keydown', (e) => {
    if ((e.key === 'g' || e.key === 'G') && !e.metaKey && !e.ctrlKey && !e.altKey && !(e.target as Element).closest?.('input,textarea,select,[contenteditable]')) toggle();
  });
}
