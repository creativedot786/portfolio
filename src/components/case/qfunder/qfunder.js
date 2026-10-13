// QFunder's case study scripts: the strategy scenes, and the browser windows that play the onboarding, the landing
// page, the application and the dashboard. Called on every page load, so it works after a client-side navigation too.
export function qfunder() {
if (!document.querySelector('.cs-qfunder')) return;
window.QF_IMG={"hero_screen": "/work/qfunder/i/ac70a01361d7.jpg", "hero_base": "/work/qfunder/i/feb0d8cb97f2.jpg", "ph40": "/work/qfunder/i/31b928ea1d59.jpg", "ph41": "/work/qfunder/i/bd3b95318063.jpg", "ph42": "/work/qfunder/i/9947f071609f.jpg", "get_started": "/work/qfunder/i/e9f6b6edc3bd.jpg", "verify_email": "/work/qfunder/i/f4e438404a39.jpg", "create_password": "/work/qfunder/i/7d76b46d1cb9.jpg", "verify_mobile": "/work/qfunder/i/f56d618949f1.jpg", "information": "/work/qfunder/i/27a61aea20ab.jpg", "business_docs": "/work/qfunder/i/ae698180a77b.jpg", "verification": "/work/qfunder/i/fe921e421538.jpg", "verified": "/work/qfunder/i/3a52ccb89441.jpg", "rejected": "/work/qfunder/i/7d95a01f12b7.jpg", "documents": "/work/qfunder/i/321e1454a6b3.jpg", "bank": "/work/qfunder/i/ef50c52c160f.jpg", "submitted": "/work/qfunder/i/04cc5430893a.jpg", "ack": "/work/qfunder/i/ecc76919c4bd.webp", "otp": "/work/qfunder/i/12d6c859ef01.webp"};window.QF_LOCK="<svg viewBox=\"0 0 10 12\" aria-hidden=\"true\"><rect x=\"1\" y=\"5\" width=\"8\" height=\"6.5\" rx=\"1.4\" fill=\"#3c3c43\"/><path d=\"M3 5V3.6a2 2 0 0 1 4 0V5\" fill=\"none\" stroke=\"#3c3c43\" stroke-width=\"1.3\"/></svg>";
// strategy scenes: start only once most of the frame is in view; reset when it leaves
const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
const scenes=[...document.querySelectorAll('[data-scene]')].map(sc=>{
 const max=+sc.dataset.max,parts=[...sc.querySelectorAll('[data-at]')];const st={sc,step:0,timer:0,running:false};
 st.paint=()=>parts.forEach(p=>p.classList.toggle('on',+p.dataset.at<=st.step));
 st.vis=()=>{const r=sc.getBoundingClientRect();if(!r.height)return 0;return Math.max(0,Math.min(r.bottom,innerHeight)-Math.max(r.top,0))/r.height;};
 st.stop=()=>{clearTimeout(st.timer);st.timer=0;st.running=false;st.step=0;st.paint();};
 st.tick=()=>{if(st.step<max){st.step++;st.paint();st.timer=setTimeout(st.tick,st.step===max?2600:1000);}else{st.step=0;st.paint();st.timer=setTimeout(st.tick,800);}};
 st.check=()=>{if(reduce){st.step=max;st.paint();return;}const v=st.vis();
  if(!st.running&&v>=.8){st.running=true;st.timer=setTimeout(st.tick,350);}
  else if(st.running&&v<.3){st.stop();}};
 return st;});
const checkAll=()=>scenes.forEach(s=>s.check());
addEventListener('scroll',()=>requestAnimationFrame(checkAll),{passive:true});addEventListener('resize',checkAll);checkAll();
// QFunder browser windows. Each window shows full-size desktop screens scaled to fit,
// with a camera (zoom and scroll), a cursor, typing, modals and a spotlight for the last frame.
window.QFW=(()=>{
const RM=matchMedia('(prefers-reduced-motion: reduce)').matches;
const ARROW='<svg width="18" height="22" viewBox="0 0 18 22"><path d="M1 1v17l4.6-4.3 3 7 3-1.3-3-6.8H15z" fill="#fff" stroke="#000" stroke-width="1.2" stroke-linejoin="round"/></svg>';
const tick=f=>requestAnimationFrame(f);
const el=(t,c)=>{const e=document.createElement(t);if(c)e.className=c;return e;};
const ease=p=>p<.5?2*p*p:1-Math.pow(-2*p+2,2)/2;
class Win{
 constructor(root){
  this.root=root;this.vp=root.querySelector('.qf-vp');this.pg=root.querySelector('.qf-pg');
  this.VW=+root.dataset.vw;this.VH=+root.dataset.vh;
  this.vp.style.setProperty('--vw',this.VW);this.vp.style.setProperty('--vh',this.VH);
  this.pg.style.width=this.VW+'px';
  this.H=this.VH;this.view={z:1,fx:this.VW/2,fy:this.VH/2};this.token=0;
  // phones: the window is taller and the camera zooms in, following the cursor, so the screens stay readable
  this.mq=matchMedia('not all');this.ZP=2.4; // the phone camera is off: phones see the whole screen, as on desktop
  this.poi=null;this.pz=null;this.eff=null;
  this.ml=el('div','qf-ml');this.ml.style.cssText=`width:${this.VW}px;height:${this.VH}px;z-index:10`;this.pg.appendChild(this.ml);
  this.dim=el('div','qf-dim');this.pg.appendChild(this.dim);
  this.cur=el('div','qf-cur');this.cur.innerHTML='<span>'+ARROW+'<i class="qf-ring"></i></span>';this.pg.appendChild(this.cur);
  new ResizeObserver(()=>this.apply(0)).observe(this.vp);this.apply(0);
 }
 get s(){return this.vp.clientWidth/this.VW}
 get top(){return this.view.fy-this.VH/(2*this.view.z)}
 clamp(v){const hw=this.VW/(2*v.z),hh=this.VH/(2*v.z);v.fx=Math.min(Math.max(v.fx,hw),this.VW-hw);v.fy=Math.min(Math.max(v.fy,hh),Math.max(hh,this.H-hh));return v;}
 get P(){return this.mq.matches}
 // phone camera: zoom pz (a modal, a drag, the spotlight) or ZP × the designed zoom; focus on the point of interest,
 // else on the designed view (a designed scroll keeps its top edge, a designed zoom keeps its centre)
 phoneView(){const s=this.s,W=this.vp.clientWidth,Hv=this.vp.clientHeight,v=this.view;
  const z=this.pz||Math.min(this.ZP*v.z,3.2),hw=W/(2*s*z),hh=Hv/(2*s*z);
  let fx=v.fx,fy=v.z===1?v.fy-this.VH/2+hh:v.fy;if(this.poi){fx=this.poi.x;fy=this.poi.y;}
  fx=Math.min(Math.max(fx,hw),Math.max(hw,this.VW-hw));fy=Math.min(Math.max(fy,hh),Math.max(hh,this.H-hh));return {z,fx,fy,hw,hh};}
 // keep a point in view: move the camera only when the point leaves the middle of the frame
 follow(x,y,ms=650,force){if(!this.P)return;const e=this.eff||this.phoneView();
  if(!force&&Math.abs(x-e.fx)<e.hw*.62&&Math.abs(y-e.fy)<e.hh*.62)return;this.poi={x,y};this.apply(ms);}
 apply(ms){if(this.P)return this.applyP(ms);this.eff=null;const s=this.s,{z,fx,fy}=this.view,W=this.vp.clientWidth,Hv=this.vp.clientHeight;
  const tr=ms?`transform ${ms}ms cubic-bezier(.45,0,.2,1)`:'none';
  this.pg.style.transition=tr;this.pg.style.transform=`translate(${W/2-fx*s*z}px,${Hv/2-fy*s*z}px) scale(${s*z})`;
  const c=this.cur.firstChild;c.style.transition=tr;c.style.transform=`scale(${1/(s*z)})`;
  this.dim.style.height=this.H+'px';}
 applyP(ms){const s=this.s,W=this.vp.clientWidth,Hv=this.vp.clientHeight,e=this.phoneView();this.eff=e;
  const tr=ms?`transform ${ms}ms cubic-bezier(.45,0,.2,1)`:'none';
  this.pg.style.transition=tr;this.pg.style.transform=`translate(${W/2-e.fx*s*e.z}px,${Hv/2-e.fy*s*e.z}px) scale(${s*e.z})`;
  const c=this.cur.firstChild;c.style.transition=tr;c.style.transform=`scale(${1/(s*e.z)})`;
  this.dim.style.height=this.H+'px';}
 wait(ms){const t=this.token;return new Promise((res,rej)=>setTimeout(()=>t===this.token?res():rej('stop'),ms));}
 stop(){this.token++;}
 // camera: zoom z, centred on page point (fx,fy); scroll(y) puts y at the top of the view
 cam(z,fx,fy,ms=900){this.poi=null;this.pz=null;this.view=this.clamp({z,fx,fy});this.apply(ms);return ms?this.wait(ms):Promise.resolve();}
 scroll(y,ms=900){return this.cam(1,this.VW/2,y+this.VH/2,ms);}
 // screens
 show(scr){this.pg.querySelectorAll('.qf-scr.on').forEach(x=>x!==scr&&x.classList.remove('on'));scr.classList.add('on');
  this.H=+scr.dataset.h||this.VH;this.vp.style.setProperty('--pbg',scr.dataset.bg||'#f6f9fc');this.dim.style.height=this.H+'px';}
 // position of an element inside its screen, in page px
 rect(node){const sc=node.closest('.qf-scr'),r=node.getBoundingClientRect(),p=sc.getBoundingClientRect(),k=p.width/sc.offsetWidth;
  return {x:(r.left-p.left)/k,y:(r.top-p.top)/k,w:r.width/k,h:r.height/k,cx:(r.left-p.left+r.width/2)/k,cy:(r.top-p.top+r.height/2)/k};}
 // cursor, in page px
 async move(x,y,ms=650){const c=this.cur;
  if(!c.classList.contains('on')){c.style.transition='none';c.style.left=x+'px';c.style.top=y+'px';c.offsetWidth;c.style.transition='';c.classList.add('on');this.follow(x,y,500);await this.wait(this.P?520:260);return;}
  c.style.transition=`left ${ms}ms cubic-bezier(.45,0,.2,1),top ${ms}ms cubic-bezier(.45,0,.2,1),opacity .2s`;c.style.left=x+'px';c.style.top=y+'px';this.follow(x,y,ms);await this.wait(ms+40);}
 async click(x,y,ms){if(x!=null)await this.move(x,y,ms);this.cur.classList.add('press');const r=this.cur.querySelector('.qf-ring');r.classList.remove('go');r.offsetWidth;r.classList.add('go');
  await this.wait(150);this.cur.classList.remove('press');await this.wait(130);}
 hide(){this.cur.classList.remove('on');}
 async drag(x0,y0,x1,y1,ms,onMove){if(this.P){this.pz=Math.min(this.ZP*this.view.z,this.VW/(Math.abs(x1-x0)+260));this.follow((x0+x1)/2,(y0+y1)/2,600,1);await this.wait(620);}await this.move(x0,y0);this.cur.classList.add('press');await this.wait(140);
  const t=this.token,t0=performance.now(),c=this.cur;c.style.transition='opacity .2s';
  await new Promise((res,rej)=>{const step=()=>{if(t!==this.token)return rej('stop');const p=Math.min(1,(performance.now()-t0)/ms),e=ease(p);
   c.style.left=(x0+(x1-x0)*e)+'px';c.style.top=(y0+(y1-y0)*e)+'px';onMove&&onMove(e);p<1?tick(step):res();};tick(step);});
  this.cur.classList.remove('press');await this.wait(160);if(this.P)this.pz=null;}
 // typing: a box drawn over the empty field, text appears letter by letter
 async type(scr,[x,y,w,h],text,o={}){const d=el('div','qf-type'+(o.center?' c':''));
  Object.assign(d.style,{left:x+'px',top:y+'px',width:w+'px',height:h+'px',fontSize:(o.size||16)+'px',paddingLeft:o.center?'0':(o.pad??16)+'px',borderRadius:(o.r??8)+'px',background:o.bg||'#fff'});
  d.innerHTML='<span></span><i></i>';scr.appendChild(d);if(this.P&&scr!==this.ml){this.follow(x+w/2,y+h/2,500);}d.offsetWidth;d.classList.add('on');
  for(let i=1;i<=text.length;i++){d.firstChild.textContent=o.mask?'•'.repeat(i):text.slice(0,i);await this.wait(o.per||55);}
  d.classList.add('done');return d;}
 // a modal over the current view (the image includes its own shadow)
 modal(src,x,y,w){this.ml.style.top=this.top+'px';this.ml.innerHTML='<div class="qf-scrim"></div>';const im=new Image();im.src=src;im.alt='';
  Object.assign(im.style,{left:x+'px',top:y+'px',width:w+'px'});this.ml.appendChild(im);this.ml.offsetWidth;this.ml.classList.add('on');this.fitModal(x,w);return this.wait(380);}
 // a coded modal (no Figma frame for it)
 modalHTML(html,x,y,w){this.ml.style.top=this.top+'px';this.ml.innerHTML='<div class="qf-scrim"></div>';const d=el('div','qf-mh');d.innerHTML=html;
  Object.assign(d.style,{left:x+'px',top:y+'px',width:w+'px'});this.ml.appendChild(d);this.ml.offsetWidth;this.ml.classList.add('on');this.fitModal(x,w);return this.wait(380);}
 fitModal(x,w){if(!this.P)return;this.pz=Math.min(this.ZP,this.VW/(w+60));this.poi={x:x+w/2,y:this.top+this.VH/2};this.apply(500);}
 unmodal(){this.ml.classList.remove('on');if(this.P){this.pz=null;}return this.wait(300);}
 // spotlight: dim the page, lift the key area a little towards the viewer
 spot(scr,{x,y,w,h},{r=14,k=1.045,pad=8}={}){x-=pad;y-=pad;w+=2*pad;h+=2*pad;this.dim.classList.add('on');
  const L=el('div','qf-lift'),c=scr.cloneNode(true);c.classList.add('on');c.querySelectorAll('.qf-type').forEach(t=>t.classList.add('on'));
  c.style.clipPath=`inset(${y}px ${this.VW-x-w}px ${(+scr.dataset.h||this.VH)-y-h}px ${x}px round ${r}px)`;c.style.background=scr.dataset.bg||'#f6f9fc';
  if(this.P){this.pz=Math.min(this.ZP,.9*this.VW/w);this.poi={x:x+w/2,y:y+h/2};this.apply(600);}
  L.style.transformOrigin=`${x+w/2}px ${y+h/2}px`;L.appendChild(c);this.pg.insertBefore(L,this.cur);L.offsetWidth;L.classList.add('on');L.style.transform=`scale(${k})`;this.lift=L;
  return this.wait(600);}
 unspot(){this.dim.classList.remove('on');if(this.lift){this.lift.remove();this.lift=null;}}
 // back to the first frame, no animation
 reset(first){this.stop();this.root.classList.add('qf-instant');this.hide();this.unspot();this.ml.classList.remove('on');
  this.pg.querySelectorAll('.qf-type').forEach(t=>t.remove());if(first)this.show(first);this.poi=null;this.pz=null;this.view=this.clamp({z:1,fx:this.VW/2,fy:this.VH/2});this.apply(0);
  setTimeout(()=>this.root.classList.remove('qf-instant'),60);}
 // same rule as every animation on the page: play when 80% is in view, start over when mostly out of view
 watch(play,reset){let state='idle';const go=()=>{if(state!=='idle')return;state='play';const t=this.token;play().then(()=>{if(t===this.token)state='done';}).catch(()=>{});};
  new IntersectionObserver(es=>{for(const e of es){if(e.intersectionRatio>=.8)go();else if(e.intersectionRatio<.3&&state!=='idle'&&!this.touched){this.stop();reset();state='idle';}}},{threshold:[0,.3,.8]}).observe(this.root);
  return {go,idle:()=>{state='idle';}};}
}
return {Win,RM,el,tick,ease};
})();

// QFunder portal pages, rebuilt from Figma so the numbers can be set to add up.
// Money is shown with "AED" in place of the dirham sign.
window.QFP=(()=>{
const IMG=window.QF_IMG||{};
// icons: the first eight are the Figma vectors, the rest are drawn to match
const P={
 globe:'<path fill-rule="evenodd" d="M2.226 7.167h2.321A10.9 10.9 0 0 1 6.102 2.482a5.84 5.84 0 0 0-3.876 4.685ZM8 2.643a9.2 9.2 0 0 0-1.777 4.524h3.554A9.2 9.2 0 0 0 8 2.643Zm1.777 6.19A9.2 9.2 0 0 1 8 13.357a9.2 9.2 0 0 1-1.777-4.524h3.554Zm-5.23 0H2.226a5.84 5.84 0 0 0 3.876 4.685 10.9 10.9 0 0 1-1.555-4.685Zm5.351 4.685a10.9 10.9 0 0 0 1.555-4.685h2.321a5.84 5.84 0 0 1-3.876 4.685Zm3.876-6.351h-2.321a10.9 10.9 0 0 0-1.555-4.685 5.84 5.84 0 0 1 3.876 4.685ZM.5 8a7.5 7.5 0 1 1 15 0 7.5 7.5 0 0 1-15 0Z"/>',
 chev:'<path fill-rule="evenodd" d="M2.985 4.734a.73.73 0 0 1 1.031 0L7 7.719l2.985-2.985a.73.73 0 1 1 1.031 1.031l-3.5 3.5a.73.73 0 0 1-1.031 0l-3.5-3.5a.73.73 0 0 1 0-1.031Z"/>',
 user:'<path fill-rule="evenodd" d="M8 2.833a2.167 2.167 0 1 0 0 4.334 2.167 2.167 0 0 0 0-4.334ZM4.166 5a3.833 3.833 0 1 1 7.667 0 3.833 3.833 0 0 1-7.667 0Zm2.034 4.5h3.6c.8 0 1.383 0 1.882.151a3.5 3.5 0 0 1 2.334 2.333c.151.5.151 1.083.15 1.883V14a.833.833 0 1 1-1.666 0c0-.991-.009-1.302-.079-1.532a1.83 1.83 0 0 0-1.222-1.222c-.23-.07-.541-.08-1.532-.08H6.333c-.991 0-1.302.01-1.532.08a1.83 1.83 0 0 0-1.222 1.222c-.07.23-.08.541-.08 1.532a.833.833 0 1 1-1.666 0v-.133c0-.8 0-1.383.15-1.883a3.5 3.5 0 0 1 2.334-2.333C4.817 9.5 5.4 9.5 6.2 9.5Z"/>',
 help:'<path fill-rule="evenodd" d="M8 2.167a5.833 5.833 0 1 0 0 11.666A5.833 5.833 0 0 0 8 2.167ZM.5 8a7.5 7.5 0 1 1 15 0 7.5 7.5 0 0 1-15 0Zm7.644-2.486a1.17 1.17 0 0 0-1.298.763.833.833 0 1 1-1.572-.554 2.83 2.83 0 0 1 5.506.945c0 1.108-.821 1.825-1.371 2.192a5.8 5.8 0 0 1-1.255.632l-.008.003-.003.001h-.001l-.264-.79.264.79a.833.833 0 0 1-.528-1.58l.008-.003.046-.017c.042-.016.106-.042.185-.077.159-.07.364-.173.564-.306.45-.3.629-.582.629-.807v-.001a1.17 1.17 0 0 0-.97-1.152ZM7.167 11.333c0-.46.373-.833.833-.833h.007a.833.833 0 1 1 0 1.667H8a.833.833 0 0 1-.833-.834Z"/>',
 info:'<path fill-rule="evenodd" d="M10 2.708a7.292 7.292 0 1 0 0 14.584 7.292 7.292 0 0 0 0-14.584ZM.625 10a9.375 9.375 0 1 1 18.75 0 9.375 9.375 0 0 1-18.75 0Zm8.333-3.333c0-.576.467-1.042 1.042-1.042h.008a1.042 1.042 0 0 1 0 2.083H10a1.042 1.042 0 0 1-1.042-1.041ZM10 8.958c.575 0 1.042.467 1.042 1.042v3.333a1.042 1.042 0 0 1-2.084 0V10c0-.575.467-1.042 1.042-1.042Z"/>',
 upload:'<path fill-rule="evenodd" d="M9.264 1.764a1.04 1.04 0 0 1 1.473 0l4.166 4.166a1.04 1.04 0 1 1-1.473 1.473l-2.388-2.388V12.5a1.042 1.042 0 0 1-2.084 0V5.015L6.57 7.403A1.04 1.04 0 1 1 5.097 5.93l4.167-4.166ZM2.5 11.458c.575 0 1.042.467 1.042 1.042v1c0 .717 0 1.193.03 1.557.029.353.08.509.129.605.14.274.362.497.637.637.096.05.252.1.605.129.364.03.84.03 1.557.03h7c.717 0 1.193 0 1.557-.03.353-.029.509-.08.605-.129.274-.14.497-.363.637-.637.05-.096.1-.252.129-.605.03-.364.03-.84.03-1.557v-1a1.042 1.042 0 0 1 2.084 0v1.042c0 .664 0 1.225-.038 1.685-.04.481-.125.942-.349 1.381a3.54 3.54 0 0 1-1.548 1.548c-.439.224-.9.31-1.381.349-.46.037-1.02.037-1.685.037H6.459c-.665 0-1.226 0-1.686-.037-.481-.04-.942-.125-1.381-.349a3.54 3.54 0 0 1-1.548-1.548c-.223-.439-.309-.9-.348-1.381-.038-.46-.038-1.02-.038-1.685V12.5c0-.575.467-1.042 1.042-1.042Z"/>',
 bank:'<path fill-rule="evenodd" d="M9.677.736a1.04 1.04 0 0 1 .646 0c.256.058.475.199.56.254l6.336 3.96a1.04 1.04 0 0 1-.552 1.925H3.333a1.04 1.04 0 0 1-.552-1.925L9.117.99c.085-.055.304-.196.56-.254ZM10 2.895 6.966 4.792h6.069L10 2.895ZM5 7.292c.575 0 1.042.466 1.042 1.041V15a1.042 1.042 0 0 1-2.084 0V8.333c0-.575.467-1.041 1.042-1.041Zm3.333 0c.576 0 1.042.466 1.042 1.041V15a1.042 1.042 0 0 1-2.083 0V8.333c0-.575.466-1.041 1.041-1.041Zm3.334 0c.575 0 1.041.466 1.041 1.041V15a1.042 1.042 0 0 1-2.083 0V8.333c0-.575.466-1.041 1.042-1.041Zm3.333 0c.575 0 1.042.466 1.042 1.041V15a1.042 1.042 0 0 1-2.084 0V8.333c0-.575.467-1.041 1.042-1.041ZM1.458 17.5c0-.575.467-1.042 1.042-1.042h15a1.042 1.042 0 0 1 0 2.084h-15A1.042 1.042 0 0 1 1.458 17.5Z"/>',
 filecheck:'<path fill-rule="evenodd" d="M7.292.625h4.375c.276 0 .54.11.736.305l5 5c.195.195.305.46.305.737v7.708c0 .665 0 1.226-.038 1.685-.039.482-.125.943-.348 1.382a3.54 3.54 0 0 1-1.548 1.548c-.439.223-.9.309-1.381.348-.46.037-1.02.037-1.685.037H7.292c-.665 0-1.226 0-1.686-.037-.481-.04-.942-.125-1.381-.348a3.54 3.54 0 0 1-1.548-1.548c-.223-.439-.309-.9-.348-1.382-.038-.46-.038-1.02-.038-1.685v-8.75c0-.665 0-1.226.038-1.685.04-.482.125-.943.348-1.382A3.54 3.54 0 0 1 4.225 1.01c.439-.223.9-.309 1.381-.348.46-.038 1.021-.038 1.686-.038ZM5.776 2.739c-.352.029-.509.08-.605.128-.274.14-.497.363-.637.638-.05.096-.1.252-.129.605-.03.364-.03.84-.03 1.557v8.666c0 .718 0 1.193.03 1.558.029.352.08.509.129.605.14.274.363.497.637.637.096.049.253.1.605.128.365.03.84.03 1.557.03h5.334c.717 0 1.192 0 1.557-.03.352-.028.509-.079.605-.128.274-.14.497-.363.637-.637.049-.096.1-.253.128-.605.03-.365.03-.84.03-1.558V7.708H13c-.207 0-.45 0-.632-.014a1.6 1.6 0 0 1-.72-.19 1.56 1.56 0 0 1-.82-.82 1.6 1.6 0 0 1-.189-.719c-.015-.182-.015-.425-.015-.632V2.708H7.333c-.717 0-1.192 0-1.557.03Zm6.932 1.442 1.444 1.444H13c-.118 0-.21 0-.29-.001v-1.443Zm.945 6.332c.407.407.407 1.067 0 1.474l-3.75 3.75a1.04 1.04 0 0 1-1.473 0l-1.667-1.667a1.04 1.04 0 1 1 1.473-1.473l.93.93 3.014-3.014a1.04 1.04 0 0 1 1.473 0Z"/>'
};
const S={ // drawn, 24 px grid, stroked
 left:'<path d="M19 12H5m0 0 6 6m-6-6 6-6"/>',right:'<path d="M5 12h14m0 0-6-6m6 6-6 6"/>',plus:'<path d="M12 5v14M5 12h14"/>',
 file:'<path d="M14 2.5H8.2c-1.7 0-2.5 0-3.2.3a3 3 0 0 0-1.3 1.3c-.3.6-.3 1.5-.3 3.2v9.4c0 1.7 0 2.5.3 3.2a3 3 0 0 0 1.3 1.3c.6.3 1.5.3 3.2.3h7.6c1.7 0 2.5 0 3.2-.3a3 3 0 0 0 1.3-1.3c.3-.6.3-1.5.3-3.2V8.5L14 2.5Z"/><path d="M14 2.5V7a1.5 1.5 0 0 0 1.5 1.5h4.5M8 13h8M8 17h5"/>',
 filechk:'<path d="M14 2.5H8.2c-1.7 0-2.5 0-3.2.3a3 3 0 0 0-1.3 1.3c-.3.6-.3 1.5-.3 3.2v9.4c0 1.7 0 2.5.3 3.2a3 3 0 0 0 1.3 1.3c.6.3 1.5.3 3.2.3h7.6c1.7 0 2.5 0 3.2-.3a3 3 0 0 0 1.3-1.3c.3-.6.3-1.5.3-3.2V8.5L14 2.5Z"/><path d="M14 2.5V7a1.5 1.5 0 0 0 1.5 1.5h4.5M9 15l2 2 4.5-4.5"/>',
 note:'<rect x="2" y="5.5" width="20" height="13" rx="2.5"/><circle cx="12" cy="12" r="2.6"/><path d="M6 9.5v5M18 9.5v5"/>',
 coins:'<ellipse cx="9" cy="5.5" rx="6" ry="2.5"/><path d="M3 5.5v4c0 1.4 2.7 2.5 6 2.5M3 9.5v4c0 1.4 2.7 2.5 6 2.5M3 13.5v4c0 1.4 2.7 2.5 6 2.5M15 5.5v3"/><circle cx="16.5" cy="16" r="4.5"/>',
 card:'<rect x="2" y="5" width="20" height="14" rx="2.5"/><path d="M2 10h20"/>',
 truck:'<path d="M14 7h3.5l3.5 4v5h-7V7Z"/><path d="M3 5h11v11H3z"/><circle cx="7" cy="17.5" r="2"/><circle cx="17" cy="17.5" r="2"/>',
 mail:'<rect x="2.5" y="4.5" width="19" height="15" rx="2.5"/><path d="m3 6.5 9 6.5 9-6.5"/>',
 phone:'<rect x="6" y="2" width="12" height="20" rx="2.5"/><path d="M11 18h2"/>',
 check:'<path d="m5 12.5 4.5 4.5L19 7.5"/>'};
const VB={globe:16,user:16,help:16,chev:14};
const ic=(k,sz)=>{const v=VB[k]||20;return `<svg width="${sz}" height="${sz}" viewBox="0 0 ${v} ${v}" fill="currentColor">${P[k]}</svg>`;};
const st=(k,sz,w=2)=>`<svg width="${sz}" height="${sz}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round">${S[k]}</svg>`;
const LOGO=`<svg class="lg" viewBox="0 0 122 44" fill="none"><path d="M24.42 26.59c1.2-1.29 2.12-2.4 3.25-3.9l-2.55-2.9c-.53-.61-1.04-.95-1.97-.95l-5.66.05 6.93 7.7Z" fill="#1B25E3"/><path d="M31.09 26.59a15.6 15.6 0 0 1-3.42 3.73l2.55 2.9c.53.6 1.03.95 1.96.95l5.66-.06-6.75-7.52Z" fill="#1B25E3"/><path d="M21.44 27.54a11.3 11.3 0 0 1-4.37.87c-6.26 0-11.35-5.09-11.35-11.34S10.81 5.72 17.07 5.72s11.34 5.09 11.34 11.35c0 3.66-1.74 6.92-4.44 9l3.76 4.32a17.04 17.04 0 0 0 6.41-13.32C34.14 7.66 26.48 0 17.07 0S0 7.66 0 17.07s7.66 17.07 17.07 17.07c2.99 0 5.81-.78 8.26-2.14l-3.89-4.46Z" fill="url(#qpg)"/><path d="M54.24 13.27h-7.4v4.38h7.19v3.49h-7.19v7.14h-3.65v-18.5h11.05v3.49ZM64.41 15.06h3.41v13.22h-3.41V26.8c-.83 1.23-2.14 1.85-3.94 1.85-1.44 0-2.64-.48-3.58-1.45-.94-.97-1.41-2.31-1.41-4.02v-8.11h3.41v7.69c0 .88.24 1.56.71 2.02.48.47 1.11.7 1.9.7.88 0 1.59-.27 2.12-.82.53-.55.79-1.36.79-2.46v-7.14ZM77.23 14.69c1.44 0 2.64.49 3.58 1.46.94.97 1.41 2.31 1.41 4.02v8.11h-3.41v-7.69c0-.88-.24-1.55-.71-2.02-.48-.47-1.11-.7-1.9-.7-.88 0-1.59.27-2.12.82-.53.55-.79 1.37-.79 2.46v7.14h-3.41V15.06h3.41v1.48c.83-1.23 2.14-1.85 3.94-1.85ZM94.09 9.78h3.41v18.5h-3.41v-1.56c-1 1.29-2.43 1.93-4.28 1.93s-3.3-.67-4.56-2.02c-1.26-1.35-1.89-3-1.89-4.96s.63-3.61 1.89-4.96c1.26-1.35 2.78-2.02 4.56-2.02s3.28.64 4.28 1.93V9.78Zm-6.28 14.57c.7.7 1.57 1.04 2.63 1.04s1.93-.35 2.62-1.04c.69-.7 1.03-1.59 1.03-2.68s-.34-1.99-1.03-2.68c-.69-.7-1.56-1.04-2.62-1.04s-1.93.35-2.63 1.04c-.7.7-1.04 1.59-1.04 2.68s.35 1.99 1.04 2.68ZM102.44 23.07c.46 1.66 1.7 2.48 3.73 2.48 1.3 0 2.38-.53 3.05-1.41l3.32-.01c-.66 2.41-3.41 4.51-6.42 4.51-2.19 0-3.94-.66-5.26-1.98-1.32-1.32-1.98-2.99-1.98-5s.65-3.65 1.95-4.98c1.3-1.33 2.98-2 5.02-2 1.94 0 3.54.67 4.8 2.01 1.26 1.34 1.89 3 1.89 4.97 0 .44-.04.91-.13 1.4h-9.97Zm-.05-2.64h6.74c-.19-.9-.59-1.57-1.2-2.01-.61-.44-1.3-.66-2.08-.66-.92 0-1.67.23-2.27.7-.6.47-1 1.12-1.19 1.97ZM117.26 17.34c.32-.85.84-1.48 1.57-1.9.73-.42 1.55-.63 2.45-.63v3.81c-1.04-.12-1.97.09-2.79.63-.82.55-1.23 1.45-1.23 2.72v6.32h-3.41V15.06h3.41v2.27Z" fill="#1B25E3"/><path d="M79.41 33.75h-1.48v1.45h1.48v-1.45ZM79.4 37.38v2.33c0 .61.44.62 1.29.57v1.32c-2.07.22-2.76-.37-2.76-1.89v-2.33h-1v-1.39h3.76v1.39H79.4ZM84.75 35.88v1.61c-.76-.09-1.73.25-1.73 1.43v2.68h-1.47v-5.61h1.47v.97c.3-.77 1.02-1.08 1.73-1.08ZM89.69 38.8c0-.94-.67-1.58-1.59-1.58-.91 0-1.57.64-1.57 1.58s.67 1.58 1.57 1.58c.9 0 1.59-.64 1.59-1.58Zm1.47-2.81v5.61h-1.47v-.66c-.41.51-1.03.82-1.86.82-1.52 0-2.78-1.29-2.78-2.96 0-1.67 1.25-2.96 2.78-2.96.83 0 1.45.31 1.86.82v-.66h1.47ZM96.36 38.8c0-.94-.67-1.58-1.57-1.58-.9 0-1.59.64-1.59 1.58s.67 1.58 1.59 1.58c.91 0 1.57-.64 1.57-1.58Zm1.47-5.05v7.85h-1.47v-.66c-.41.52-1.02.82-1.85.82-1.53 0-2.79-1.29-2.79-2.96 0-1.67 1.26-2.96 2.79-2.96.83 0 1.44.3 1.85.82v-2.91h1.47ZM102.78 38.27c-.18-.81-.8-1.13-1.42-1.13-.79 0-1.32.41-1.5 1.13h2.92Zm-1.29 2.17c.57 0 1.03-.24 1.28-.56l1.19.67c-.54.76-1.39 1.2-2.49 1.2-1.92 0-3.13-1.29-3.13-2.96 0-1.67 1.22-2.96 3.01-2.96 1.69 0 2.89 1.31 2.89 2.96 0 .21-.02.4-.06.59h-4.31c.21.74.83 1.05 1.61 1.05ZM106.24 33.75h-1.47v7.85h1.47v-7.85ZM114.64 38.16v3.44h-1.47v-3.27c0-.76-.47-1.16-1.13-1.16-.72 0-1.26.41-1.26 1.39v3.03h-1.47v-5.61h1.47v.63c.34-.51.94-.79 1.7-.79 1.21 0 2.16.83 2.16 2.32ZM119.87 38.71c0-.88-.67-1.52-1.6-1.52-.92 0-1.6.64-1.6 1.52 0 .88.67 1.54 1.6 1.54.92 0 1.6-.64 1.6-1.54Zm1.44-2.72v5.34c0 1.84-1.47 2.67-2.98 2.67-1.22 0-2.2-.46-2.71-1.37l1.26-.71c.24.44.62.79 1.5.79.92 0 1.5-.49 1.5-1.38v-.6c-.4.53-1.02.85-1.83.85-1.62 0-2.85-1.29-2.85-2.87 0-1.58 1.22-2.87 2.85-2.87.81 0 1.43.33 1.83.85v-.7h1.44ZM107.03 34.54c0-.43.37-.79.8-.79.44 0 .81.37.81.8 0 .43-.37.78-.81.78-.43 0-.8-.36-.8-.79ZM107.1 35.99l-.02 5.61 1.47.01.02-5.61h-1.47ZM67.58 38.82c0 1.62-1.26 2.87-2.77 2.87-.87 0-1.52-.35-1.94-.93v.79h-1.2v-7.64h1.2v2.96c.42-.57 1.08-.92 1.94-.92 1.51 0 2.77 1.24 2.77 2.87Zm-1.2 0c0-1.01-.76-1.75-1.75-1.75-1 0-1.75.73-1.75 1.75s.76 1.75 1.75 1.75c1 0 1.75-.73 1.75-1.75ZM73.8 36.09l-2.13 5.63c-.52 1.39-1.43 2.08-2.71 2.01v-1.1c.78.04 1.2-.35 1.48-1.07l.05-.11-2.35-5.36h1.31l1.66 3.96 1.42-3.96h1.28Z" fill="#00394D"/><defs><linearGradient id="qpg" x1="4.49" y1="5.72" x2="24.68" y2="26.48" gradientUnits="userSpaceOnUse"><stop stop-color="#9333EA"/><stop offset="1" stop-color="#1B25E3"/></linearGradient></defs></svg>`;
// header: on onboarding the user is not signed in yet, so there is no name
const header=signed=>`<div class="qp-hd">${LOGO}<div class="qp-hr"><span class="ln">${ic('globe',16)}EN${ic('chev',14)}</span>${signed?`<span class="us">${ic('user',16)}Hala! Ahmed${ic('chev',16)}</span>`:''}<span class="hp">${ic('help',16)}</span></div></div>`;
const footer=`<div class="qp-ft"><h4>Need Additional Support?</h4><p>Get in touch with our support team for assistance with your loans or account.</p>
 <div class="qp-fc"><div><i>${st('mail',20,1.7)}</i><span>Email<b>Support@qfunder.com</b></span></div><hr><div><i>${st('phone',20,1.7)}</i><span>Phone<b>+971 4 123 4567</b></span></div></div></div>`;

// ── the numbers ──
// Illustrative rate, taken from the landing calculator: AED 250,000 over 12 months = AED 23,188 a month.
const pmtK=(r,n)=>r/(1-Math.pow(1+r,-n));
const R=(()=>{let lo=0,hi=.1;for(let i=0;i<80;i++){const m=(lo+hi)/2;pmtK(m,12)*250000<23188?lo=m:hi=m;}return (lo+hi)/2;})();
const monthly=(amt,n)=>Math.round(amt*pmtK(R,n));
const fmt=v=>v.toLocaleString('en-US');
const LOAN={amount:500000,months:12,pay:monthly(500000,12),paid:3,start:new Date(2025,4,20)};
LOAN.total=LOAN.pay*LOAN.months;LOAN.paidAmt=LOAN.pay*LOAN.paid;LOAN.out=LOAN.total-LOAN.paidAmt;
const dd=d=>String(d.getDate()).padStart(2,'0')+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+d.getFullYear();
const due=i=>new Date(2025,4+i,20);

const scr=(cls,w,h,bg,inner)=>{const d=document.createElement('div');d.className='qf-scr qp '+cls;d.style.width=w+'px';d.style.height=h+'px';d.dataset.h=h;d.dataset.bg=bg||'#f6f9fc';d.innerHTML=inner;return d;};

function dash(){
 const solc=(on,icon,t,p)=>`<div class="qp-solc${on?' on':''}">${st(icon,28,1.8)}<h3>${t}</h3><p>${p}</p><span class="b">${on?st('plus',20)+'Apply Now':'Coming Soon'}</span></div>`;
 return scr('qp-dash',1280,1412,'#f6f9fc',`${header(1)}
 <div class="qp-s1"><h2 class="qp-h2"><span class="qp-gt">Overview</span></h2>
  <div class="qp-ov"><div class="qp-ovc"><div class="t">Total Applications${st('file',20,1.8)}</div><div class="v">2</div></div>
   <div class="qp-ovc"><div class="t">Active Loans${st('filechk',20,1.8)}</div><div class="v">1</div></div>
   <div class="qp-ovc"><div class="t">Outstanding balance${st('note',20,1.8)}</div><div class="v">AED ${fmt(LOAN.out)}</div></div></div>
  <div class="qp-la"><h2 class="qp-h2"><span class="qp-gt">Loans &amp; Applications</span></h2><p class="qp-sub">Track active loans and monitor application status</p>
   <div class="qp-tabs"><span class="on">Loans (1)</span><span>Applications (2)</span></div>
   <div class="qp-list"><div class="qp-lt">Working Capital<span class="qp-badge">Active</span></div>
    <div class="qp-lr"><div class="qp-stats"><div>Disbursed amount<b>AED ${fmt(LOAN.amount)}</b></div><div>Outstanding balance<b>AED ${fmt(LOAN.out)}</b></div><div>Total paid<b>AED ${fmt(LOAN.paidAmt)}</b></div></div>
    <span class="qp-btn o qp-view">View Details</span></div></div></div></div>
 <div class="qp-s2"><div class="hd"><h2 class="qp-h2"><span class="qp-gt">Explore Our Financial Solutions</span></h2><p>Expand your business capabilities with additional financing products tailored to your growth needs</p></div>
  <div class="qp-sol">${solc(1,'coins','Working Capital','Get instant access to working capital to grow your business')}${solc(0,'card','Credit Line','Buy now on Tradeling.com, pay later with flexible credit terms')}${solc(0,'truck','Supply Chain Financing','Optimize your supply chain with our financing solutions')}${solc(0,'file','Invoice Financing','Get paid immediately for your outstanding invoices')}</div></div>
 ${footer}`);
}

function detail(){
 const pct=Math.round(LOAN.paidAmt/LOAN.total*100),C=2*Math.PI*63;
 const rows=Array.from({length:LOAN.months},(_,i)=>`<div class="qp-tr"><span>${i+1}</span><span>${dd(due(i))}</span><span><b>AED ${fmt(LOAN.pay)}</b>${i<LOAN.paid?'<span class="qp-badge s">Paid</span>':''}</span></div>`).join('');
 const nd=due(LOAN.paid);
 return scr('qp-det',1280,1296,'#f6f9fc',`${header(1)}
 <div class="qp-body"><span class="qp-back">${st('left',20)}Back to Dashboard</span><h1 class="qp-h1"><span class="qp-gt">WC-2025-001</span></h1>
  <div class="qp-cols"><div>
   <div class="qp-card qp-due"><h4>Due amount</h4><div class="a">AED ${fmt(LOAN.pay)}</div><div class="d">Due on ${nd.getDate()} ${nd.toLocaleString('en-US',{month:'short'})}, ${nd.getFullYear()}</div><span class="qp-btn">Make Payment</span></div>
   <div class="qp-card qp-bal"><h4>Loan details</h4>
    <div class="qp-donut"><div class="qp-dn"><svg viewBox="0 0 140 140"><defs><linearGradient id="qpd" x1="0" y1="0" x2="0" y2="1"><stop stop-color="#9333ea"/><stop offset="1" stop-color="#2563eb"/></linearGradient></defs><circle cx="70" cy="70" r="63" fill="none" stroke="#ebebeb" stroke-width="14"/><circle cx="70" cy="70" r="63" fill="none" stroke="url(#qpd)" stroke-width="14" stroke-dasharray="${C*pct/100} ${C}" transform="rotate(-90 70 70)"/></svg><div><b>${pct}%</b><span>Paid</span></div></div>
     <div class="qp-leg"><div>Total Paid<b class="g">AED ${fmt(LOAN.paidAmt)}</b></div><div>Outstanding balance<b class="r">AED ${fmt(LOAN.out)}</b></div></div></div>
    <div class="qp-kv"><div>Disbursed amount:<b>AED ${fmt(LOAN.amount)}</b></div><div>Disbursal date:<b>15-04-2025</b></div><div>Maturity date:<b>${dd(due(LOAN.months-1))}</b></div><div>Tenure<b>${LOAN.months} months</b></div></div></div>
  </div>
  <div class="qp-card qp-rep"><h4>Repayment management</h4><div class="qp-rt"><span>Payment History</span><span class="on">Payment Schedule</span></div>
   <div class="qp-tbl"><div class="qp-tr"><span>#</span><span>Payment Date</span><span>Amount</span></div>${rows}</div></div></div></div>
 ${footer}`);
}

// application step 1; the sliders are live
const AMIN=25000,AMAX=1000000,PMIN=6,PMAX=12;
function loan(){
 const d=scr('qp-app',1280,1024,'#f6f9fc',`${header(1)}
 <div class="qp-body"><span class="qp-back">${st('left',20)}Back to Dashboard</span><h1>Working Capital Application</h1><p class="sub2">Complete the following steps to apply for working capital</p>
  <div class="qp-steps"><span class="qp-step on"><i>${ic('info',20)}</i>Loan Details</span><span class="qp-sl"></span><span class="qp-step"><i>${ic('upload',20)}</i>Documents</span><span class="qp-sl"></span><span class="qp-step"><i>${ic('bank',20)}</i>Bank Details</span><span class="qp-sl"></span><span class="qp-step"><i>${ic('filecheck',20)}</i>Review</span></div>
  <div class="qp-lc"><h4>Loan details</h4><div class="qp-lg"><div>
    <div class="qp-pn"><label>How much does your business need?</label><div class="qp-amt"><span>AED</span><b class="qp-av"></b></div><div class="qp-rng qp-ra"><i class="f"></i><i class="k"></i></div><div class="qp-rl"><span>AED 25K</span><span>AED 1M</span></div></div>
    <div class="qp-pn"><label>Repayment period</label><div class="qp-mo"><b class="qp-pv"></b><span>Months</span></div><div class="qp-rng qp-rp"><i class="f"></i><i class="k"></i></div><div class="qp-rl t">${[6,7,8,9,10,11,12].map(n=>`<span>${n}</span>`).join('')}</div></div>
   </div><div class="qp-est"><span class="m">Estimated Monthly Payment</span><span class="v qp-ev"></span><span class="n">Included fees. Final rate may vary based on your company profile</span></div></div>
   <div class="qp-pur"><label>Purpose of working capital</label><div class="qp-sel">Select the primary purpose for your working capital${ic('chev',16)}</div><small>Select the option that best describes how you plan to use this working capital</small></div></div>
  <div class="qp-cta"><span class="qp-btn qp-cont">Continue${st('right',20)}</span></div></div>`);
 const st8={amt:250000,mo:9};
 d.set=(amt,mo)=>{st8.amt=amt;st8.mo=mo;
  d.querySelector('.qp-av').textContent=fmt(amt);d.querySelector('.qp-pv').textContent=mo;
  d.querySelector('.qp-ra').style.setProperty('--p',(amt-AMIN)/(AMAX-AMIN));d.querySelector('.qp-rp').style.setProperty('--p',(mo-PMIN)/(PMAX-PMIN));
  d.querySelector('.qp-ev').textContent='AED '+fmt(monthly(amt,mo));};
 d.st=st8;d.set(250000,9);return d;
}
// a page whose body is the Figma image, under the coded header
function imgPage(key,{w,h,signed,bx,by,bw,bg}){
 return scr('qp-ip',w,h,bg,`${header(signed)}<img class="qp-img" src="${IMG[key]}" alt="" style="left:${bx}px;top:${by}px;width:${bw}px">`);
}
return {dash,detail,loan,imgPage,header,LOAN,monthly,fmt,AMIN,AMAX,PMIN,PMAX};
})();

// QFunder design steps: the landing page scrolls itself, the application and the dashboard play as click-throughs.
(()=>{
const {Win,RM}=QFW,IMG=window.QF_IMG||{};

// ── 1. landing page: scrolls itself through the whole page, pausing at each section (no manual scroll, so it never fights the page) ──
(()=>{const root=document.querySelector('.qf-land');if(!root)return;
 const vp=root.querySelector('.qf-vp');vp.style.setProperty('--vw',1520);vp.style.setProperty('--vh',950);
 const STOPS=[1028,1804,2504,3117,3751]; // calculator, products, steps, FAQ, footer (page px at a 1520 viewport)
 let token=0,state='idle';
 const im=vp.querySelector('img'),k=()=>im.clientWidth/1520,wait=ms=>{const t=token;return new Promise((res,rej)=>setTimeout(()=>t===token?res():rej('stop'),ms));};
 const glide=(to,ms)=>{const t=token,from=vp.scrollTop,t0=performance.now();return new Promise((res,rej)=>{const f=()=>{if(t!==token)return rej('stop');const p=Math.min(1,(performance.now()-t0)/ms);vp.scrollTop=from+(to-from)*QFW.ease(p);p<1?requestAnimationFrame(f):res();};requestAnimationFrame(f);});};
 const mid=()=>{vp.scrollLeft=(vp.scrollWidth-vp.clientWidth)/2;};mid();new ResizeObserver(mid).observe(vp); // phones: keep the middle of the page in view
 async function play(){await wait(600);for(const y of STOPS){await glide(Math.min(y*k(),vp.scrollHeight-vp.clientHeight),1400);await wait(1200);}}
 const go=()=>{if(state!=='idle'||RM)return;state='play';const t=token;play().then(()=>{if(t===token)state='done';}).catch(()=>{});};
 new IntersectionObserver(es=>{for(const e of es){if(e.intersectionRatio>=.8)go();else if(e.intersectionRatio<.3&&state!=='idle'){token++;state='idle';vp.scrollTop=0;}}},{threshold:[0,.3,.8]}).observe(root);
})();

// ── 3. the application: apply from the dashboard, set the loan, send it ──
(()=>{const root=document.querySelector('.qf-app');if(!root)return;const w=new Win(root);
 const dash=QFP.dash(),loan=QFP.loan();
 const ip={w:1280,h:1024,signed:1,bx:108,by:68,bw:1064,bg:'#f6f9fc'};
 const docs=QFP.imgPage('documents',ip),bank=QFP.imgPage('bank',ip),sent=QFP.imgPage('submitted',ip);
 [dash,loan,docs,bank,sent].forEach(s=>w.pg.insertBefore(s,w.ml));w.show(dash);
 // dialogs, placed in the 1280 × 800 view (sizes from Figma)
 const ACK={x:296.5,y:23,w:687,box:[48,573],go:[565,692]},OTP={x:350,y:197,w:580,box:[136,150],go:[290,302]};
 const at=(n,a,b)=>[n.x+a,w.top+n.y+b];
 async function play(){
  await w.wait(500);const ap=w.rect(dash.querySelector('.qp-solc.on .b'));await w.scroll(ap.y-560,1100);
  await w.click(ap.cx,ap.cy);
  await w.modal(IMG.ack,ACK.x,ACK.y,ACK.w);await w.wait(500);
  let [x,y]=at(ACK,ACK.box[0]+8,ACK.box[1]+8);await w.click(x,y);
  const ck=document.createElement('div');ck.className='qp-ck';ck.style.cssText=`left:${ACK.x+ACK.box[0]}px;top:${ACK.y+ACK.box[1]}px`;w.ml.appendChild(ck);await w.wait(450);
  [x,y]=at(ACK,...ACK.go);await w.click(x,y);
  await w.unmodal();w.show(loan);await w.scroll(0,0);await w.wait(600);
  // the amount and the period; the monthly payment follows
  const A=w.rect(loan.querySelector('.qp-ra')),K=w.rect(loan.querySelector('.qp-ra .k'));
  const ax=v=>A.x+A.w*(v-QFP.AMIN)/(QFP.AMAX-QFP.AMIN);
  await w.drag(K.cx,K.cy,ax(500000),K.cy,1500,e=>loan.set(Math.round((250000+250000*e)/5000)*5000,loan.st.mo));
  const P=w.rect(loan.querySelector('.qp-rp')),PK=w.rect(loan.querySelector('.qp-rp .k'));
  await w.drag(PK.cx,PK.cy,P.x+P.w,PK.cy,1000,e=>loan.set(loan.st.amt,Math.round(9+3*e)));
  if(w.P){const e=w.rect(loan.querySelector('.qp-est'));w.follow(e.cx,e.cy,800,1);await w.wait(1500);} // phones: show the monthly payment it worked out
  await w.wait(900);await w.scroll(224,700);
  const c=w.rect(loan.querySelector('.qp-cont'));await w.click(c.cx,c.cy);
  w.show(docs);await w.scroll(0,0);await w.wait(800);await w.click(1090,620);
  w.show(bank);await w.wait(800);await w.click(1090,644);
  await w.modal(IMG.otp,OTP.x,OTP.y,OTP.w);await w.wait(300);
  for(const [i,d] of [...'492715'].entries())await w.type(w.ml,[OTP.x+OTP.box[0]+52*i+1,OTP.y+OTP.box[1]+1,46,46],d,{center:1,size:20,r:8,per:150});
  [x,y]=at(OTP,...OTP.go);await w.click(x,y);
  await w.unmodal();w.show(sent);w.hide();await w.wait(900);
  await w.spot(sent,{x:303,y:466,w:674,h:231});
 }
 function reset(){w.reset(dash);w.ml.innerHTML='';loan.set(250000,9);}
 if(RM){w.show(sent);w.spot(sent,{x:303,y:466,w:674,h:231});return;}
 w.watch(play,reset);
})();

// ── 4. the dashboard: open the loan, see the schedule, then what is due ──
(()=>{const root=document.querySelector('.qf-dash');if(!root)return;const w=new Win(root);
 const dash=QFP.dash(),det=QFP.detail();[dash,det].forEach(s=>w.pg.insertBefore(s,w.ml));w.show(dash);
 async function play(){
  await w.wait(700);const v=w.rect(dash.querySelector('.qp-view'));await w.click(v.cx,v.cy);
  w.show(det);await w.scroll(0,0);await w.wait(900);
  await w.scroll(det.dataset.h-800,1800);await w.wait(1100);await w.scroll(0,1200);
  w.hide();await w.wait(300);await w.spot(det,w.rect(det.querySelector('.qp-due')));
 }
 if(RM){w.show(det);w.spot(det,w.rect(det.querySelector('.qp-due')));return;}
 w.watch(play,()=>w.reset(dash));
})();
})();

// QFunder onboarding: one window, the cursor goes through every step on its own.
// Screens are the Figma frames at a 1520 px viewport; the identity check popup is built in code.
(()=>{
const {Win,RM,el}=QFW,IMG=window.QF_IMG||{};
const root=document.querySelector('.qo .qf-win');if(!root)return;
// f: camera [zoom, x, y]; the sign-up screens are shown whole, the rest zoom in on the form
const ONB=[
 {k:'get_started',full:1,f:[1,760,475]},
 {k:'verify_email',full:1,f:[1,760,475]},
 {k:'create_password',full:1,f:[1,760,475]},
 {k:'verify_mobile',img:[360,800],h:1024,bg:'#f8fafc',f:[1.45,760,540]},
 {k:'information',img:[376,920],h:1024,f:[1.3,760,600]},
 {k:'business_docs',img:[376,768],h:1024,f:[1.3,760,480]},
 {k:'verification',img:[376,768],h:1035,f:[1.3,760,470]},
 {k:'verified',img:[376,768],h:806,f:[1.3,760,420]}];
function screen(d){
 if(d.full){const s=el('div','qf-scr qp');s.style.cssText='width:1520px;height:1024px';s.dataset.h=1024;s.dataset.bg='#f8fafc';
  s.innerHTML=`<img class="qp-img" src="${IMG[d.k]}" alt="" style="left:0;top:0;width:1520px">`;return s;}
 return QFP.imgPage(d.k,{w:1520,h:d.h,signed:0,bx:d.img[0],by:68,bw:d.img[1],bg:d.bg||'#f6f9fc'});}
const CODE=[...'482916'];
// what happens on each screen, in page px at 1520
const ACT={
 get_started:async(w,s)=>{await w.click(300,565);await w.type(s,[193.5,542.5,413,44],'ahmed@tradeling.com',{pad:14.5,r:7,per:45});await w.wait(250);await w.click(400,636);},
 verify_email:async(w,s)=>{await w.move(270,461);for(const [i,c] of CODE.entries())await w.type(s,[247.5+52*i,438.5,44,44],c,{center:1,size:20,r:7,per:140});await w.wait(200);await w.click(400,538);},
 create_password:async(w,s)=>{await w.click(300,430);await w.type(s,[193.5,407.5,360,44],'Qfunder2025',{mask:1,pad:14.5,r:7,per:55});
  await w.click(300,603);await w.type(s,[193.5,581.5,360,44],'Qfunder2025',{mask:1,pad:14.5,r:7,per:55});await w.wait(200);await w.click(400,676);},
 verify_mobile:async(w,s)=>{await w.move(630,538);for(const [i,c] of CODE.entries())await w.type(s,[607.5+52*i,515.5,44,44],c,{center:1,size:20,r:7,per:140});await w.wait(200);await w.click(760,609);},
 information:async w=>{await w.wait(500);await w.click(1037,921);},
 // no documents yet: skip with Upload Later, then on
 business_docs:async w=>{await w.wait(600);await w.click(873,752);},
 // the owner's documents are checked digitally, then the result
 verification:async w=>{await w.wait(500);await w.click(760,545);w.hide();
  // line icons, 24 px grid
  const ID='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="5" width="20" height="14" rx="2.5"/><circle cx="8.5" cy="11" r="2"/><path d="M5.5 15.5a3.2 3.2 0 0 1 6 0M14.5 10h4M14.5 13.5h2.5"/></svg>';
  const PP='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="4.5" y="2.5" width="15" height="19" rx="2.5"/><circle cx="12" cy="10" r="3.25"/><path d="M8.75 10h6.5M12 6.75c-.85.9-1.3 2-1.3 3.25s.45 2.35 1.3 3.25M12 6.75c.85.9 1.3 2 1.3 3.25s-.45 2.35-1.3 3.25M9.5 17h5"/></svg>';
  const tile=(ic,n)=>`<div class="qp-dvt"><div class="qp-dva"><svg class="qp-ring" viewBox="0 0 76 76"><circle cx="38" cy="38" r="35"/><circle class="a" cx="38" cy="38" r="35" pathLength="100"/></svg><i>${ic}</i><span class="qp-ok"><svg viewBox="0 0 24 24"><path d="m6.5 12.5 3.5 3.5 7.5-8" fill="none" stroke="#fff" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg></span></div><b>${n}</b><span class="qp-dvs"><em></em>Checking</span></div>`;
  const dlg=`<div class="qp-dv"><h4>Digital Verification</h4><p>Checking the business owner’s documents. This takes a few seconds.</p><div class="qp-dvg">${tile(ID,'Emirates ID')}${tile(PP,'Passport')}</div></div>`;
  const W=560,H=330,top=w.VH/(2*w.view.z)-H/2;await w.modalHTML(dlg,760-W/2,top,W);
  for(const t of w.ml.querySelectorAll('.qp-dvt')){await w.wait(1500);t.classList.add('ok');t.querySelector('.qp-dvs').innerHTML='Verified';}
  await w.wait(1000);await w.unmodal();}};
const GREEN={x:420,y:292,w:680,h:68};

const w=new Win(root),S=ONB.map(screen);
// on phones the sign-up screens open on the form (left half) rather than the middle of the screen
const F=i=>{const [z,x,y]=ONB[i].f;return [z,w.P&&ONB[i].full?400:x,y];};S.forEach(s=>w.pg.insertBefore(s,w.ml));
w.show(S[0]);w.cam(...F(0),0);
async function play(){
 for(let i=0;i<7;i++){if(i){w.show(S[i]);await w.cam(...F(i),800);}else await w.wait(500);await ACT[ONB[i].k](w,S[i]);}
 w.show(S[7]);await w.cam(...ONB[7].f,600);await w.wait(500);await w.spot(S[7],GREEN);}
function reset(){w.reset(S[0]);w.ml.innerHTML='';w.cam(...F(0),0);}
if(RM){w.show(S[7]);w.cam(...ONB[7].f,0);w.spot(S[7],GREEN);return;}
w.watch(play,reset);
})();

// the strategy graphics are laid out for their 456 px column at 1440; scale each one to its column so nothing overflows at other widths
(()=>{const ph=matchMedia('(max-width:599px)'),D=()=>ph.matches?380:456; // the design width; narrower on phones (qf/m.css)
document.querySelectorAll('.scene.flw').forEach(s=>{const p=s.parentElement,f=()=>{s.style.zoom=Math.min(1.3,p.clientWidth/D());};new ResizeObserver(f).observe(p);f();});})();
}
