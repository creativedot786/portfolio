// TAMM's case study scripts: the heuristic evaluation deck, the hero (the phone and its widgets), the scrolling
// phone rows and the impact numbers. Called on every page load, so it works after a client-side navigation too.
export function tamm() {
if (!document.querySelector('.cs-tamm')) return;
window.HE_IMG=["/work/tamm/i/01cbfdaa1e76.webp", "/work/tamm/i/4f88a9ecc25b.webp", "/work/tamm/i/aaea2a2c347f.webp", "/work/tamm/i/6b718bc868d0.webp", "/work/tamm/i/c07b3ab36ead.webp", "/work/tamm/i/9e29b6b2a73a.webp"];
// TAMM heuristic evaluation: the team's six slides, four ways to show them. All classes prefixed he-
(()=>{
const box=document.querySelector('.he');if(!box)return;
const IMG=window.HE_IMG||[],RM=matchMedia('(prefers-reduced-motion: reduce)').matches;
// slide 1 is the method, slide 2 the results, 3–6 are findings
const S=[{t:'How each issue was rated',k:'Method'},{t:'What we found overall',k:'Results'},
 {t:'Onboarding text is hard to follow',sev:'Low',h:'H2 · Match between system and the real world',a:'Walkthrough'},
 {t:'Two menus confuse people',sev:'High',h:'H4 · Consistency and standards',a:'Navigation'},
 {t:'No sign that you are logged in',sev:'High',h:'H1 · Visibility of system status',a:'Sign in'},
 {t:'Third-party screens leave people lost',sev:'Critical',h:'H1 · Visibility of system status',a:'Navigation'}];
const chip=s=>s.sev?`<span class="he-sev ${s.sev.toLowerCase()}"><i></i>${s.sev}</span>`:`<span class="he-sev none">${s.k}</span>`;
const img=(i,cls='')=>`<img class="${cls}" src="${IMG[i]}" alt="Evaluation slide ${i+1}: ${S[i].t}" decoding="async">`;
const ARR=d=>`<svg viewBox="0 0 24 24" aria-hidden="true"><path d="${d<0?'M15 5l-7 7 7 7':'M9 5l7 7-7 7'}" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
// in view = 80% visible; out = under 30%
function watch(el,play,reset){let st='idle';new IntersectionObserver(es=>{for(const e of es){if(e.intersectionRatio>=.8&&st==='idle'){st='on';play();}else if(e.intersectionRatio<.3&&st==='on'){st='idle';reset();}}},{threshold:[0,.3,.8]}).observe(el);}

// ── lightbox, shared ──
const lb=document.createElement('div');lb.className='he-lb';lb.setAttribute('role','dialog');lb.setAttribute('aria-modal','true');lb.setAttribute('aria-label','Evaluation slide');
lb.innerHTML=`<button type="button" class="he-x" aria-label="Close">×</button><button type="button" class="he-lp" aria-label="Previous slide">${ARR(-1)}</button><figure><img alt=""><figcaption></figcaption></figure><button type="button" class="he-ln" aria-label="Next slide">${ARR(1)}</button>`;
document.body.appendChild(lb);let li=0;
const lshow=i=>{li=(i+S.length)%S.length;const im=lb.querySelector('img');im.src=IMG[li];im.alt=`Evaluation slide ${li+1}: ${S[li].t}`;lb.querySelector('figcaption').innerHTML=`<b>${li+1} / ${S.length}</b>${S[li].t}`;};
const open=i=>{lshow(i);lb.classList.add('on');document.documentElement.style.overflow='hidden';lb.querySelector('.he-x').focus();};
const close=()=>{lb.classList.remove('on');document.documentElement.style.overflow='';};
lb.querySelector('.he-x').onclick=close;lb.querySelector('.he-lp').onclick=()=>lshow(li-1);lb.querySelector('.he-ln').onclick=()=>lshow(li+1);
lb.onclick=e=>{if(e.target===lb)close();};
addEventListener('keydown',e=>{if(!lb.classList.contains('on'))return;if(e.key==='Escape')close();if(e.key==='ArrowLeft')lshow(li-1);if(e.key==='ArrowRight')lshow(li+1);});

// ── tabs ──
const opts=[...box.querySelectorAll('.he-opt')];
box.querySelectorAll('.he-tabs button').forEach(b=>b.onclick=()=>{box.querySelectorAll('.he-tabs button').forEach(x=>x.classList.toggle('on',x===b));opts.forEach(o=>o.hidden=o.dataset.he!==b.dataset.he);});

// ── A: stacked deck ──
(()=>{const w=box.querySelector('.he-a');const st=w.querySelector('.he-stack'),lab=w.querySelector('.he-lab');
 st.innerHTML=S.map((s,i)=>`<button type="button" class="he-card" data-i="${i}" aria-label="Open slide ${i+1}">${img(i)}</button>`).join('');
 const cards=[...st.children];let cur=0,timer=0,touched=false;
 const paint=()=>{cards.forEach((c,i)=>{const p=i-cur;c.dataset.p=p<0?'gone':p>2?'back':p;c.tabIndex=p===0?0:-1;});lab.innerHTML=`<b>${cur+1} / ${S.length}</b>${chip(S[cur])}<span>${S[cur].t}</span>`;};
 const go=d=>{cur=Math.max(0,Math.min(S.length-1,cur+d));paint();};
 cards.forEach(c=>c.onclick=()=>open(+c.dataset.i));
 w.querySelectorAll('.he-nav button').forEach(b=>b.onclick=()=>{touched=true;clearInterval(timer);go(+b.dataset.d);});
 paint();if(RM)return;
 watch(st,()=>{if(touched)return;timer=setInterval(()=>{if(cur>=S.length-1)return clearInterval(timer);go(1);},3200);},()=>{clearInterval(timer);if(touched)return;st.classList.add('he-instant');cur=0;paint();setTimeout(()=>st.classList.remove('he-instant'),60);});
})();

// ── B: scroll-through; the steps stay in view and the slide follows the page scroll ──
(()=>{const w=box.querySelector('.he-b');if(!w)return;const steps=w.querySelector('.he-steps'),fr=w.querySelector('.he-frame'),run=w.querySelector('.he-run');
 steps.innerHTML=S.map((s,i)=>`<button type="button" data-i="${i}"><b>${i+1}</b><span>${s.sev?s.sev:s.k}</span></button>`).join('');
 fr.innerHTML=S.map((s,i)=>img(i,'he-f')).join('');
 const bs=[...steps.children],fs=[...fr.children];let cur=-1;
 const set=i=>{if(i===cur)return;cur=i;bs.forEach((b,j)=>b.classList.toggle('on',j===i));fs.forEach((f,j)=>f.classList.toggle('on',j===i));};
 const at=()=>{if(w.hidden)return;const r=run.getBoundingClientRect(),span=r.height-innerHeight*.5;const p=Math.min(.999,Math.max(0,(-r.top+innerHeight*.15)/span));set(Math.floor(p*S.length));};
 addEventListener('scroll',()=>requestAnimationFrame(at),{passive:true});addEventListener('resize',at);set(0);
 fs.forEach((f,i)=>f.onclick=()=>open(i));
 bs.forEach(b=>b.onclick=()=>{const r=run.getBoundingClientRect(),span=r.height-innerHeight*.5,i=+b.dataset.i;scrollTo({top:scrollY+r.top-innerHeight*.15+span*(i+.5)/S.length,behavior:RM?'auto':'smooth'});});
 new MutationObserver(at).observe(w,{attributes:true,attributeFilter:['hidden']});
})();

// ── C: carousel ──
(()=>{const w=box.querySelector('.he-c');if(!w)return;const tr=w.querySelector('.he-track'),dots=w.querySelector('.he-dots');
 tr.innerHTML=S.map((s,i)=>`<figure class="he-slide"><button type="button" aria-label="Open slide ${i+1}">${img(i)}</button><figcaption>${chip(s)}<span>${s.t}</span></figcaption></figure>`).join('');
 dots.innerHTML=S.map((s,i)=>`<button type="button" aria-label="Slide ${i+1}"></button>`).join('');
 const sl=[...tr.children],ds=[...dots.children];
 const x=s=>s.getBoundingClientRect().left-tr.getBoundingClientRect().left+tr.scrollLeft;
 const idx=()=>{let b=0,bd=1e9;sl.forEach((s,i)=>{const d=Math.abs(x(s)-tr.scrollLeft);if(d<bd){bd=d;b=i;}});return b;};
 const mark=()=>{const i=idx();ds.forEach((d,j)=>d.classList.toggle('on',j===i));};
 const to=i=>tr.scrollTo({left:x(sl[Math.max(0,Math.min(S.length-1,i))]),behavior:RM?'auto':'smooth'});
 tr.addEventListener('scroll',()=>requestAnimationFrame(mark),{passive:true});mark();
 ds.forEach((d,i)=>d.onclick=()=>to(i));w.querySelectorAll('.he-nav button').forEach(b=>b.onclick=()=>to(idx()+(+b.dataset.d)));
 sl.forEach((s,i)=>s.querySelector('button').onclick=()=>open(i));
})();

// ── D: summary first, the slides on demand ──
(()=>{const w=box.querySelector('.he-d');if(!w)return;
 w.querySelector('.he-find').innerHTML=S.slice(2).map((s,k)=>`<button type="button" class="he-row" data-i="${k+2}"><span class="n">0${k+1}</span>${chip(s)}<span class="t">${s.t}</span><span class="h">${s.h}</span><span class="v">View slide${ARR(1)}</span></button>`).join('');
 w.querySelectorAll('[data-i]').forEach(b=>b.onclick=()=>open(+b.dataset.i));
})();
})();
window.TV_IMG={"l_top": "/work/tamm/i/a79ea1f3c913.webp", "l_bot": "/work/tamm/i/af0f344f7249.webp", "l_banner": "/work/tamm/i/8110cd7c3a9c.webp", "l_support": "/work/tamm/i/af255947af58.webp", "l_quick": "/work/tamm/i/73f4e57e1425.webp", "c_fav": "/work/tamm/i/d2d62f38eb0a.webp", "c_feat": "/work/tamm/i/c80bc3f38f46.webp", "c_hol": "/work/tamm/i/431a206a248d.webp", "c_evt": "/work/tamm/i/77a87059f9d7.webp"};
// TAMM hero: a short promo. The phone lands in 3D, the home builds itself section by section,
// then cards from further down the home come out of it and settle over its edges. Plays once, on page load. All classes prefixed tv-
(()=>{
const box=document.querySelector('.tv');if(!box)return;
const IMG=window.TV_IMG||{},RM=matchMedia('(prefers-reduced-motion: reduce)').matches;
const BZ=12,SW=375,SH=812;
// screen layers, in Figma px (render bounds): the bars stay put, the sections arrive one after another
const LY=[{k:'l_banner',x:12,y:117,w:351},{k:'l_support',x:16,y:296,w:343},{k:'l_quick',x:16,y:620,w:343}];
// cards from lower down the home: size in Figma px, side, and how far down the phone they settle
const CD=[{k:'c_fav',w:343,side:-1,at:.17},{k:'c_feat',w:280,side:1,at:.07},{k:'c_hol',w:343,side:-1,at:.63},{k:'c_evt',w:284,side:1,at:.55}];
const SIG='<svg viewBox="0 0 18 12"><rect x="0" y="8" width="3" height="4" rx="1"/><rect x="5" y="5.5" width="3" height="6.5" rx="1"/><rect x="10" y="3" width="3" height="9" rx="1"/><rect x="15" y="0" width="3" height="12" rx="1"/></svg>';
const WIFI='<svg viewBox="0 0 16 12"><path d="M8 11.5 5.6 9a3.4 3.4 0 0 1 4.8 0zM3.5 6.9a6.4 6.4 0 0 1 9 0l-1.4 1.4a4.4 4.4 0 0 0-6.2 0zM1.2 4.6a9.6 9.6 0 0 1 13.6 0l-1.4 1.4a7.6 7.6 0 0 0-10.8 0z"/></svg>';
const BAT='<svg viewBox="0 0 27 13"><rect x=".5" y=".5" width="23" height="12" rx="3.5" fill="none" stroke="currentColor" opacity=".4"/><rect x="2.5" y="2.5" width="19" height="8" rx="2"/><path d="M25 4.5v4c.8-.3 1.4-1.1 1.4-2s-.6-1.7-1.4-2z" opacity=".45"/></svg>';
box.innerHTML=CD.map(c=>`<img class="tv-c" src="${IMG[c.k]}" alt="">`).join('')+
 `<div class="tv-stage"><div class="tv-phone"><div class="tv-scr">${LY.map(l=>`<img class="tv-l" src="${IMG[l.k]}" alt="">`).join('')}
 <img class="tv-bar t" src="${IMG.l_top}" alt=""><img class="tv-bar b" src="${IMG.l_bot}" alt="">
 <div class="tv-sb"><span>9:41</span><i>${SIG}${WIFI}${BAT}</i></div><b class="tv-island"></b></div></div></div>`;
const phone=box.querySelector('.tv-phone'),scr=box.querySelector('.tv-scr'),ls=[...box.querySelectorAll('.tv-l')],cs=[...box.querySelectorAll('.tv-c')];
let G=null;
function layout(){const W=box.clientWidth,H=box.clientHeight;if(!W||!H)return;const narrow=W<700;
 const ph=H*(narrow?.84:.92),k=ph/(SH+2*BZ),pw=(SW+2*BZ)*k,pl=(W-pw)/2,pt=(H-ph)/2;
 Object.assign(phone.style,{width:pw+'px',height:ph+'px',left:pl+'px',top:pt+'px',padding:BZ*k+'px',borderRadius:58*k+'px'});
 scr.style.borderRadius=47*k+'px';box.style.setProperty('--k',k);
 ls.forEach((el,i)=>Object.assign(el.style,{left:LY[i].x*k+'px',top:LY[i].y*k+'px',width:LY[i].w*k+'px'}));
 const s=k*(W<600?.95:1.22),gap=-pw*(W<600?.1:.14); // smaller cards on phones, so they don't cover the screen // the cards overlap the phone's edge and sit on top of it
 G=CD.map((c,i)=>{const fw=c.w*s;const x=c.side<0?Math.max(14,pl-gap-fw):Math.min(W-14-fw,pl+pw+gap);const y=pt+ph*c.at;
  Object.assign(cs[i].style,{left:x+'px',top:y+'px',width:fw+'px'});return {el:cs[i],x,fw,side:c.side,home:pl+pw/2-(x+fw/2)};});}
const ease='cubic-bezier(.16,1,.3,1)';
const anim=(el,kf,o)=>el.animate(kf,{fill:'both',easing:ease,...o});
function play(){layout();box.classList.add('tv-on');
 // the phone lands: it comes up from below, turned and tilted, and settles flat
 anim(phone,[{transform:'translate3d(0,110px,-120px) rotateX(32deg) rotateY(-24deg) rotateZ(9deg) scale(.86)',opacity:0},{opacity:1,offset:.25},{transform:'none',opacity:1}],{duration:1700});
 // the home builds itself
 ls.forEach((el,i)=>anim(el,[{transform:'translateY(28px)',opacity:0},{transform:'none',opacity:1}],{duration:800,delay:650+i*160}));
 // cards come out of the phone and settle over its edges
 G.forEach((g,i)=>anim(g.el,[{transform:`translateX(${g.home}px) scale(.6) rotate(${g.side*-3}deg)`,opacity:0},{opacity:1,offset:.25},{transform:'none',opacity:1}],{duration:1100,delay:1500+i*170}));}
function still(){layout();box.classList.add('tv-on','tv-done');}
const imgs=[...box.querySelectorAll('img')];
Promise.all(imgs.map(im=>new Promise(r=>{if(im.complete&&im.naturalWidth)return r();im.onload=im.onerror=r;setTimeout(r,2500);}))).then(()=>RM?still():play());
new ResizeObserver(()=>{if(box.classList.contains('tv-on'))layout();}).observe(box);
})();

// TAMM rows with three phones (Home, Locker): the centre phone's screen scrolls through its whole page, section by section,
// while in view. The top bar and tab bar stay put. The phones themselves never move.
// data-len: scrollable content height in Figma px (from the top bar to the bottom bar); data-stops: section tops in Figma px;
// data-bot: height of the fixed bottom bar (tab bar, or a sticky action bar).
document.querySelectorAll('.hm').forEach(box=>{
const sc=box.parentElement; // on phones the row scrolls sideways inside it: start on the centre phone
if(box.querySelector('.hm-ph.c')){const mid=()=>{if(sc.scrollWidth>sc.clientWidth)sc.scrollLeft=(sc.scrollWidth-sc.clientWidth)/2;};mid();addEventListener('load',mid);}
const strip=box.querySelector('.hm-strip'),scr=box.querySelector('.hm-ph.c .hm-scr');
if(!strip)return; // rows with only still screens
const RM=matchMedia('(prefers-reduced-motion: reduce)').matches;
const Y0=88,BOT=+box.dataset.bot||95,LEN=+box.dataset.len,STOPS=box.dataset.stops.split(',').map(Number).concat(9999);
let token=0,state='idle';
const wait=ms=>{const t=token;return new Promise((res,rej)=>setTimeout(()=>t===token?res():rej('stop'),ms));};
const k=()=>scr.clientWidth/375;
const maxY=()=>LEN-(812-Y0-BOT); // the end of the page sits just above the bottom bar
const go=y=>{strip.style.transform=`translateY(${-Math.max(0,Math.min(y,maxY()))*k()}px)`;};
async function loop(){await wait(900);
 for(;;){for(const s of STOPS){go(s-Y0-16);await wait(2400);}await wait(800);go(0);await wait(2600);}}
function start(){if(state!=='idle'||RM)return;state='on';loop().catch(()=>{});}
function reset(){token++;state='idle';box.classList.add('hm-instant');go(0);setTimeout(()=>box.classList.remove('hm-instant'),60);}
new IntersectionObserver(es=>{for(const e of es){if(e.intersectionRatio>=.8)start();else if(e.intersectionRatio<.3&&state!=='idle')reset();}},{threshold:[0,.3,.8]}).observe(sc); // the visible column, so a sideways-clipped row still counts as in view
});

// TAMM impact: each block plays when 80% of it is in view and resets under 30%. Bars grow, numbers count, ranking lines draw. All classes prefixed ip-
(()=>{
const box=document.querySelector('.ip');if(!box)return;
if(matchMedia('(prefers-reduced-motion: reduce)').matches)return; // reduced motion: the final state, as written in the markup
const ease='cubic-bezier(.2,.7,.2,1)';
const fmt=(v,el)=>(el.dataset.pre||'')+Math.round(v).toLocaleString('en-US')+(el.dataset.suf||'');
function count(el,dur,delay){const a=+el.dataset.from||0,b=+el.dataset.to,t0=performance.now()+delay;el.textContent=fmt(a,el);
 const tick=now=>{if(!el._run)return;const p=Math.min(1,Math.max(0,(now-t0)/dur)),e=1-Math.pow(1-p,3);el.textContent=fmt(a+(b-a)*e,el);if(p<1)requestAnimationFrame(tick);};
 el._run=1;requestAnimationFrame(tick);}
function stop(part){part.getAnimations({subtree:true}).forEach(a=>a.cancel());part.querySelectorAll('[data-to]').forEach(el=>{el._run=0;el.textContent=fmt(+el.dataset.from||0,el);});part.classList.add('off');}
const PLAY={
 bars(part){part.classList.remove('off');
  part.querySelectorAll('.ip-bar').forEach((b,i)=>{const d=150+i*260;
   b.querySelector('i').animate([{transform:'scaleY(0)'},{transform:'none'}],{duration:1100,delay:d,easing:ease,fill:'backwards'});
   b.querySelector('b').animate([{opacity:0,transform:'translateY(6px)'},{opacity:1,transform:'none'}],{duration:500,delay:d+700,easing:ease,fill:'backwards'});});
  part.querySelectorAll('[data-to]').forEach(el=>count(el,1500,150));},
 rank(part){part.classList.remove('off');
  part.querySelectorAll('.ln').forEach((l,i)=>l.animate([{strokeDashoffset:1},{strokeDashoffset:0}],{duration:1700,delay:150+i*200,easing:'cubic-bezier(.45,0,.2,1)',fill:'backwards'}));
  part.querySelectorAll('.dot').forEach((d,i)=>d.animate([{opacity:0},{opacity:1}],{duration:350,delay:1700+(i>>1)*200,fill:'backwards'}));
  part.querySelectorAll('[data-to]').forEach((el,i)=>count(el,1700,150+i*200));}};
// visible share of the block, or of the screen when the block is taller than the screen
const seen=e=>e.intersectionRect.height/Math.min(e.boundingClientRect.height,e.rootBounds?e.rootBounds.height:innerHeight);
const TH=Array.from({length:21},(_,i)=>i/20);
window.__ip={play:p=>PLAY[p.dataset.ip](p),stop}; // test hook
box.querySelectorAll('[data-ip]').forEach(part=>{let on=false;stop(part);
 new IntersectionObserver(es=>{for(const e of es){const r=seen(e);if(r>=.8&&!on){on=true;PLAY[part.dataset.ip](part);}else if(r<.3&&on){on=false;stop(part);}}},{threshold:TH}).observe(part);});
})();
}
