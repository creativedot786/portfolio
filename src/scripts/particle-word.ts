// A word drawn as fine particles: small round dots sampled from the word in its own font, so it still reads
// as type. Each dot drifts a little all the time, so the word is never quite still. When it appears, the
// letters sparkle in one after another, each dot swelling past its size and settling. The cursor (or a
// finger) pushes nearby dots away; pushed dots swell and take the accent, then ease back home.
// The real text stays in the page, transparent, for layout and screen readers. Reduced motion: plain text.
export function particleWord(el: HTMLElement, host: HTMLElement, isShown: () => boolean = () => true) {
  if ((el as any).__pw || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  (el as any).__pw = true;
  // sample only once the headline's own font has loaded: a fallback font is wider, and the dots overrun the word
  const cs0 = getComputedStyle(el), font = `${cs0.fontWeight} ${parseFloat(cs0.fontSize)}px ${cs0.fontFamily}`;
  const api = { replay: () => {}, resume: () => {} };
  const fonts = (document as any).fonts;
  (fonts?.load ? fonts.load(font, el.textContent || '').catch(() => {}) : Promise.resolve()).then(() => build(el, host, isShown, api));
  return { replay: () => api.replay(), resume: () => api.resume() };
}

function build(el: HTMLElement, host: HTMLElement, isShown: () => boolean, api: { replay: () => void; resume: () => void }) {
  const mobile = innerWidth < 1024;
  const cs = getComputedStyle(el), fs = parseFloat(cs.fontSize);
  const w = Math.ceil(el.offsetWidth), h = Math.ceil(el.offsetHeight), PAD = Math.round(h * 0.45);
  const W = w + PAD * 2, H = h + PAD * 2, dpr = Math.min(2, devicePixelRatio || 1);
  const cv = document.createElement('canvas');
  cv.width = W * dpr; cv.height = H * dpr; cv.setAttribute('aria-hidden', 'true');
  Object.assign(cv.style, { position: 'absolute', left: -PAD + 'px', top: -PAD + 'px', width: W + 'px', height: H + 'px', pointerEvents: 'none' });
  const ctx = cv.getContext('2d')!; ctx.scale(dpr, dpr);

  // sample the word at twice the resolution, in the same weight, size and family
  const S = 2, off = document.createElement('canvas'); off.width = W * S; off.height = H * S;
  const o = off.getContext('2d', { willReadFrequently: true })!; o.scale(S, S);
  o.font = `${cs.fontWeight} ${fs}px ${cs.fontFamily}`; o.fillStyle = '#000';
  if ('letterSpacing' in o) (o as any).letterSpacing = cs.letterSpacing;
  const text = (el.textContent || '').trim(), m = o.measureText(text);
  // a canvas can't apply the variable font's optical size, so its word comes out wider than the page's:
  // squeeze it to the measured width of the real word
  const kx = Math.min(1.3, Math.max(0.6, w / m.width));
  o.save(); o.translate(PAD, 0); o.scale(kx, 1);
  o.fillText(text, 0, PAD + (h + m.actualBoundingBoxAscent - m.actualBoundingBoxDescent) / 2);
  o.restore();
  const edges = [...text].map((_, k) => PAD + kx * o.measureText(text.slice(0, k)).width);
  const data = o.getImageData(0, 0, off.width, off.height).data;
  const step = (mobile ? 2.4 : 2.2) * S;   // dot spacing: open enough to read as dots, close enough to read as type
  type P = { hx: number; hy: number; rx: number; ry: number; vx: number; vy: number; ph: number; fx: number; fy: number; amp: number; size: number; delay: number; boost: number };
  const ps: P[] = [];
  for (let y = 0; y < off.height; y += step) for (let x = 0; x < off.width; x += step) {
    if (data[((y | 0) * off.width + (x | 0)) * 4 + 3] < 140) continue;
    const px = x / S + (Math.random() - 0.5) * 0.5, py = y / S + (Math.random() - 0.5) * 0.5;
    let li = 0; while (li < edges.length - 1 && px >= edges[li + 1]) li++;
    ps.push({ hx: px, hy: py, rx: 0, ry: 0, vx: 0, vy: 0, ph: Math.random() * 6.28, fx: 1.2 + Math.random() * 1.6, fy: 1.2 + Math.random() * 1.6,
      amp: 0.2 + Math.random() * 0.35, size: (mobile ? 0.85 : 0.9) * (0.75 + Math.random() * 0.6), delay: li * 0.06 + Math.random() * 0.08, boost: 0 });
  }
  el.appendChild(cv); el.classList.add('pw-live');

  const R = h * 0.55;
  let mx = -1e4, my = -1e4, raf = 0, t0 = performance.now(), last = t0, inView = true;
  const root = document.documentElement;
  const tone = (n: string) => getComputedStyle(root).getPropertyValue(n).trim();
  let ink = tone('--color-primary'), acc = tone('--color-accent');
  new MutationObserver(() => { ink = tone('--color-primary'); acc = tone('--color-accent'); }).observe(root, { attributes: true, attributeFilter: ['data-theme'] });

  const frame = (now: number) => {
    const dt = Math.min(0.033, (now - last) / 1000); last = now;
    const t = (now - t0) / 1000;
    ctx.clearRect(0, 0, W, H);
    const lit: number[] = [];
    ctx.fillStyle = ink;
    for (const p of ps) {
      const a = t - p.delay; if (a <= 0) continue;
      // the sparkle in: swell past full size, then settle
      const sp = a < 0.35 ? (a / 0.35) ** 2 * (3 - 2 * a / 0.35) * 2.2 : 1 + 1.2 * (1 - Math.min(1, (a - 0.35) / 0.5)) ** 2;
      // pushed by the pointer, pulled home by a damped spring
      const dx = p.hx + p.rx - mx, dy = p.hy + p.ry - my, d = Math.hypot(dx, dy);
      if (d < R && d > 0.01) { const k = 1 - d / R, f = k * k * 2600 * dt; p.vx += (dx / d) * f; p.vy += (dy / d) * f; p.boost = Math.max(p.boost, k); }
      p.vx += -p.rx * 22 * dt; p.vy += -p.ry * 22 * dt; p.vx *= Math.exp(-5 * dt); p.vy *= Math.exp(-5 * dt);
      p.rx += p.vx * dt; p.ry += p.vy * dt; p.boost *= Math.exp(-3 * dt);
      const x = p.hx + p.rx + p.amp * Math.sin(t * p.fx + p.ph), y = p.hy + p.ry + p.amp * Math.cos(t * p.fy + p.ph);
      const r = p.size * sp * (1 + p.boost * 1.4);
      if (p.boost > 0.15) { lit.push(x, y, r); continue; }
      ctx.beginPath(); ctx.arc(x, y, r, 0, 6.2832); ctx.fill();
    }
    ctx.fillStyle = acc;
    for (let k = 0; k < lit.length; k += 3) { ctx.beginPath(); ctx.arc(lit[k], lit[k + 1], lit[k + 2], 0, 6.2832); ctx.fill(); }
    raf = inView && isShown() && !document.hidden ? requestAnimationFrame(frame) : 0;
  };
  const go = (replay = false) => { if (replay) t0 = performance.now(); if (!raf && inView && isShown()) { last = performance.now(); raf = requestAnimationFrame(frame); } };
  const at = (cx: number, cy: number) => { const r = cv.getBoundingClientRect(); mx = cx - r.left; my = cy - r.top; };
  const away = () => { mx = my = -1e4; };
  host.addEventListener('mousemove', (e) => at(e.clientX, e.clientY));
  host.addEventListener('mouseleave', away);
  host.addEventListener('touchstart', (e) => at(e.touches[0].clientX, e.touches[0].clientY), { passive: true });
  host.addEventListener('touchmove', (e) => at(e.touches[0].clientX, e.touches[0].clientY), { passive: true });
  host.addEventListener('touchend', away);
  new IntersectionObserver(([e]) => { inView = e.isIntersecting; go(); }).observe(el);
  document.addEventListener('visibilitychange', () => go());
  go();
  api.replay = () => go(true); api.resume = () => go();
}
