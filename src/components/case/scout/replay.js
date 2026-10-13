// @ts-nocheck
// The replay: a real Scout session, recorded from the live prototype, played back turn by turn at the pace
// of a real chat. It opens on Scout's first screen (the orb, the question). Each turn the message is typed
// and sent; the agent's three steps light up quickly, while Scout thinks (understand, match, reply); the memory bar
// updates when the understanding arrives, before Scout says a word, as in the product; the reply streams
// in; the homes follow. After the last turn it fades back to the first screen, with nothing else showing.
// It plays once most of the stage is in view and resets when the stage leaves.
// Reduced motion: the finished conversation, still.
export function replay(C) {
  const st = document.querySelector('[data-replay]');
  if (!st || st.__on) return;
  st.__on = true;
  const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const PF = '<svg class="sc-pf" viewBox="0 0 100 150" aria-hidden="true"><use href="#sc-pf"/></svg>';
  const T = [
    { u: '2-bed near my office in DIFC, around 130k a year. I have a dog',
      und: [['+', '2-bed'], ['+', 'near DIFC?'], ['+', '~130k/year'], ['+', 'pet-friendly']],
      brief: [['2-bed'], ['near DIFC', 'as'], ['~130k/year'], ['pet-friendly']], fresh: ['2-bed', 'near DIFC', '~130k/year', 'pet-friendly'],
      match: 'Nothing in DIFC itself. One home nearby, in Business Bay.',
      say: 'Names the nearby area, then asks one question.',
      reply: "DIFC itself has nothing at 2-bed near 130k. Closest is Business Bay, one minute's drive away: a pet-friendly 2-bed at Executive Towers, 138k, 640m from the metro.",
      note: 'Nothing in DIFC itself. Showing nearby areas.', cards: [['L09', ['Over budget', 'over'], ['Pets allowed', '', 'paw']]],
      follow: 'Does 138k work, or should I keep the budget closer to 130k?' },
    { u: "Actually I can go to 150k if there's a pool",
      und: [['→', 'up to 150k, was ~130k/year'], ['+', 'pool']],
      brief: [['2-bed'], ['near DIFC', 'as'], ['up to 150k'], ['pet-friendly'], ['pool']], fresh: ['up to 150k', 'pool'],
      match: 'The same home still fits. Not shown again.',
      say: 'Confirms the change in one line.',
      reply: 'With 150k as the ceiling and a pool required, that Executive Towers 2-bed at 138k still fits, pool included.' },
    { u: 'Just for now, show me anything under 110k',
      und: [['+', 'for now: under 110k']],
      brief: [['2-bed'], ['near DIFC', 'as'], ['up to 150k'], ['pet-friendly'], ['pool'], ['under 110k', 'now']], fresh: ['under 110k'],
      match: 'No homes. Without “near DIFC” there would be 5.',
      say: 'Names the one requirement in the way.',
      reply: 'Under 110k, nothing near DIFC has a pet-friendly 2-bed with a pool. Drop the area and there are 5 options elsewhere, starting at 72k in Town Square.',
      follow: "Want me to widen the search beyond DIFC's area?" },
    { u: "Being near DIFC isn't important, drop it",
      und: [['−', 'near DIFC']],
      brief: [['2-bed'], ['near DIFC', 'as gone'], ['up to 150k'], ['pet-friendly'], ['pool'], ['under 110k', 'now']], drop: 'near DIFC', fresh: [],
      match: '5 homes, all pet-friendly with a pool.',
      say: 'Says what opened up, cheapest first.',
      reply: 'Dropping the DIFC pin opens up five pet-friendly 2-beds under 110k, all with pools. Town Square starts lowest at **72k**, then JVC at 88k, Mirdif at 92k, Al Barsha at 95k, and Motor City at 105k.',
      cards: ['L41', 'L22', 'L31', 'L19', 'L44'].map((id) => [id, ['Pets allowed', '', 'paw'], ['Pool']]) },
  ];

  const $ = (s) => st.querySelector(s);
  const th = $('.sc-thread'), empty = $('.sc-empty'), inp = $('.sc-in'), send = $('.sc-send'), brief = $('.sc-brief'), bt = $('.sc-bt'), more = $('.sc-more');
  const steps = [...st.querySelectorAll('.sc-steps li')], outs = steps.map((s) => s.querySelector('.sc-out'));
  const turnEl = $('.sc-turn');
  const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;');
  const md = (s) => esc(s).replace(/\*\*(.+?)\*\*/g, '<b>$1</b>');
  const orb = (fn) => { try { window.__scoutOrb && window.__scoutOrb[fn](); } catch (e) {} };

  let gen = 0, fast = false;
  const wait = (ms, g) => new Promise((ok, no) => setTimeout(() => (g === gen ? ok() : no('stop')), fast ? 0 : ms));
  // a beat to take in what Scout said before the next message: short, the way a real chat moves
  const read = (text) => Math.max(1100, text.split(' ').length * 75);
  const down = () => th.scrollTo({ top: th.scrollHeight, behavior: fast ? 'auto' : 'smooth' });

  function msg(who, html) {
    const m = document.createElement('div');
    m.className = `sc-msg ${who}`;
    m.innerHTML = (who === 's' ? `<span class="sc-av" aria-hidden="true">${PF}</span>` : '') + `<div class="sc-b">${html}</div>`;
    const prev = th.lastElementChild;
    if (prev && prev.classList.contains('sc-msg') && prev.classList.contains(who)) { prev.classList.add('grouped'); m.classList.add('cont'); }
    th.appendChild(m); down(); return m;
  }
  function card([id, ...tags]) {
    const c = C[id];
    return `<article class="sc-card"><div class="sc-ph"><img src="${c.img}" alt=""><span>${c.type}</span></div><div class="sc-bd">
      <div class="sc-pr">AED ${c.price}<small>/ year</small></div><div class="sc-me">${c.meta}</div><div class="sc-wh">${c.where}</div>
      <div class="sc-tg">${tags.map(([t, k, i]) => `<span class="${k || ''}">${i ? `<svg aria-hidden="true"><use href="#sc-i-${i}"/></svg>` : ''}${t}</span>`).join('')}</div></div></article>`;
  }
  // the memory bar: everything Scout understood, one line; what doesn't fit becomes +N
  function renderBrief(items, fresh) {
    brief.classList.add('on');
    let n = items.length;
    const paint = () => {
      bt.innerHTML = items.slice(0, n).map(([l, k]) => `<span class="sc-p ${k || ''}${fresh.includes(l) ? ' new' : ''}">${esc(l)}</span>`).join('<span class="sc-sep">·</span>');
      more.hidden = n === items.length; more.textContent = '+' + (items.length - n);
    };
    paint();
    while (n > 1 && bt.scrollWidth > bt.clientWidth + 1) { n--; paint(); }
  }
  const light = (i) => steps.forEach((s, j) => { s.classList.toggle('on', j <= i); s.classList.toggle('now', j === i); });
  const clearTrace = () => { steps.forEach((s) => s.classList.remove('on', 'now')); outs.forEach((o) => (o.innerHTML = '')); turnEl.innerHTML = ''; };

  // the first screen: the orb, the question, two ways to start; nothing else
  function firstScreen() {
    th.querySelectorAll('.sc-msg,.sc-note,.sc-cards').forEach((n) => n.remove());
    th.classList.remove('fade'); th.scrollTop = 0;
    empty.hidden = false; empty.classList.remove('out');
    brief.classList.remove('on'); bt.innerHTML = ''; more.hidden = true;
    inp.innerHTML = 'Ask Scout…'; inp.classList.remove('typed'); send.classList.remove('on');
    clearTrace(); orb('resume');
  }

  async function turn(t, i, g) {
    clearTrace();
    turnEl.innerHTML = `<small>Turn ${i + 1} of ${T.length}</small>“${esc(t.u)}”`;
    await wait(500, g);
    // typed into the composer, at typing speed, then sent
    inp.classList.add('typed');
    if (!fast) for (let k = 1; k <= t.u.length; k++) { inp.innerHTML = esc(t.u.slice(0, k)) + '<i class="caret"></i>'; inp.scrollLeft = inp.scrollWidth; await wait(22, g); }
    inp.innerHTML = esc(t.u); send.classList.add('on');
    await wait(350, g);
    inp.innerHTML = 'Ask Scout…'; inp.classList.remove('typed'); send.classList.remove('on');
    if (!empty.hidden) { empty.classList.add('out'); await wait(350, g); empty.hidden = true; orb('pause'); }
    msg('u', esc(t.u));
    await wait(450, g);
    const think = msg('s', '<span class="sc-dots"><i></i><i></i><i></i></span>');
    think.querySelector('.sc-av').classList.add('thinking');
    // the agent's steps keep up with the chat: quick, while Scout is thinking
    // 1. understand (model)
    light(0);
    await wait(250, g);
    for (const [s, l] of t.und) { outs[0].insertAdjacentHTML('beforeend', `<span class="sc-chip${s === '−' ? ' rem' : ''}"><i>${s}</i>${esc(l)}</span>`); await wait(160, g); }
    // the understanding reaches the screen first: the memory bar updates before Scout talks
    renderBrief(t.brief, t.fresh);
    await wait(t.drop ? 900 : 500, g);
    if (t.drop) { renderBrief(t.brief.filter(([l]) => l !== t.drop), []); await wait(300, g); }
    // 2. match (code)
    light(1); outs[1].textContent = t.match;
    await wait(650, g);
    // 3. reply (model, streamed)
    light(2); outs[2].textContent = t.say;
    await wait(250, g);
    think.querySelector('.sc-av').classList.remove('thinking');
    const words = t.reply.split(' '), b = think.querySelector('.sc-b');
    for (let k = 1; k <= words.length; k++) { b.innerHTML = md(words.slice(0, k).join(' ')); if (k % 3 === 0 || k === words.length) down(); await wait(42, g); }
    await wait(450, g);
    if (t.note) { const n = document.createElement('div'); n.className = 'sc-note'; n.textContent = t.note; th.appendChild(n); down(); await wait(300, g); }
    if (t.cards) {
      const row = document.createElement('div'); row.className = 'sc-cards'; row.innerHTML = t.cards.map(card).join('');
      th.appendChild(row); down();
      await wait(1000, g);
      if (t.cards.length > 1 && !fast) { for (let k = 1; k < 3; k++) { row.scrollTo({ left: k * 216, behavior: 'smooth' }); await wait(750, g); } }
    }
    if (t.follow) { await wait(600, g); msg('s', esc(t.follow)); }
    await wait(read(t.reply + ' ' + (t.follow || '')), g);
  }

  let state = 'idle';
  async function play() {
    const g = ++gen; state = 'playing'; fast = RM; firstScreen();
    try {
      await wait(900, g);
      for (let i = 0; i < T.length; i++) await turn(T[i], i, g);
      if (RM) { state = 'done'; return; }
      // back to the first screen, with nothing else showing
      await wait(1200, g);
      th.classList.add('fade'); brief.classList.remove('on'); turnEl.style.opacity = 0; steps.forEach((s) => s.classList.remove('on', 'now'));
      await wait(700, g);
      firstScreen(); turnEl.style.opacity = '';
      state = 'done';
    } catch (e) { /* stopped */ }
  }
  function stop() { gen++; state = 'idle'; firstScreen(); }

  st.parentElement.querySelector('.sc-replay').addEventListener('click', () => play());
  if (RM) { play(); return; }

  // play when at least 80% of the stage is in view; reset once less than 30% is
  const seen = () => { const r = st.getBoundingClientRect(); const h = Math.min(r.height, innerHeight); return h ? Math.max(0, Math.min(r.bottom, innerHeight) - Math.max(r.top, 0)) / h : 0; };
  const check = () => {
    const v = seen();
    if (state === 'idle' && v >= 0.8) play();
    else if (state !== 'idle' && v < 0.3) stop();
    if (v === 0) orb('pause'); else if (!empty.hidden) orb('resume');
  };
  let tk = false;
  addEventListener('scroll', () => { if (!tk) { tk = true; requestAnimationFrame(() => { tk = false; check(); }); } }, { passive: true });
  addEventListener('resize', check, { passive: true });
  firstScreen(); check();
}


// 02: the three examples arrive one at a time, each home's tag a beat after it. Plays when most of it is
// in view; resets when it leaves. Reduced motion: all three, still.
export function infer() {
  const box = document.querySelector('[data-infer]');
  if (!box || box.__on || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  box.__on = true;
  const items = [...box.querySelectorAll('li')];
  let timers = [], state = 'idle';
  const reset = () => { timers.forEach(clearTimeout); timers = []; items.forEach((li) => li.classList.remove('in')); state = 'idle'; };
  const play = () => { state = 'playing'; items.forEach((li, i) => timers.push(setTimeout(() => li.classList.add('in'), 300 + i * 1100))); };
  const seen = () => { const r = box.getBoundingClientRect(); const h = Math.min(r.height, innerHeight); return h ? Math.max(0, Math.min(r.bottom, innerHeight) - Math.max(r.top, 0)) / h : 0; };
  const check = () => { const v = seen(); if (state === 'idle' && v >= 0.8) play(); else if (state !== 'idle' && v < 0.3) reset(); };
  box.classList.add('play');
  let tk = false;
  addEventListener('scroll', () => { if (!tk) { tk = true; requestAnimationFrame(() => { tk = false; check(); }); } }, { passive: true });
  check();
}
