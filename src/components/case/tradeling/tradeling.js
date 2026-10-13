// Tradeling's case study scripts: the vertical machine, the negotiation chat, the activity panel, the brand pills
// and the card carousel. Called on every page load, so it works after a client-side navigation too.
export function tradeling() {
if (!document.querySelector('.cs-tradeling')) return;
const MAP=[["Rice, Pasta & Pulses", [["Food & Beverages", "Grains & Pulses"]]], ["Cooking & Baking", [["Food & Beverages", "Oils & Fats"], ["Food & Beverages", "Baking Ingredients"], ["Food & Beverages", "Baking Decorations"], ["Food & Beverages", "Sugar & Sugar Alternatives"], ["Food & Beverages", "Stock"]]], ["Cleaning & Laundry", [["Home & Garden", "Cleaning Supplies"], ["Home & Garden", "Cleaning Tools"]]], ["Electronics", [["Home & Garden", "Small Kitchen Appliances"], ["Office & Stationery", "Batteries"], ["Consumer Electronics", "Electrical & Electronic Accessories"]]], ["Dairy", [["Food & Beverages", "Dairy"]]], ["Condiments", [["Food & Beverages", "Dips & Condiments"], ["Food & Beverages", "Spices & Seasonings"]]], ["Cereals", [["Food & Beverages", "Cereals"]]], ["Chips, Biscuits & Snacks", [["Food & Beverages", "Snacks"]]], ["Disposables", [["Home & Garden", "Disposable Tableware"], ["Home & Garden", "Disposable Hygiene Products"], ["Home & Garden", "Kitchen Essentials"]]], ["Beverages", [["Food & Beverages", "Beverages"]]], ["Baby Care", [["Baby Center", "All of Baby Center"]]], ["Personal Care", [["Personal Care", "Bath & Body"], ["Personal Care", "Oral & Dental Care"], ["Personal Care", "Hair Care"], ["Personal Care", "Hair Coloring"], ["Personal Care", "Hair Styling"], ["Personal Care", "Skincare"], ["Personal Care", "Shaving & Hair Removal"]]], ["Bakery", [["Food & Beverages", "Bakery & Pastry"]]], ["Cans, Jars & Packets", [["Food & Beverages", "Canned Food"], ["Food & Beverages", "Jams & Spreads"], ["Food & Beverages", "Olives & Pickles"], ["Food & Beverages", "Instant Food"], ["Food & Beverages", "Honey & Syrups"]]], ["Chocolates & Biscuits", [["Food & Beverages", "Confectionery"]]]];// Spotlight for the last frame of each phone animation: the rest of the screen dims, and a copy of the
// key element lifts out of the phone (it sits outside the screen's clip, so it can grow past the bezel).
window.__spot=(()=>{
 const off=(stage,app)=>{stage.querySelectorAll(':scope>.spot').forEach(x=>x.remove());if(app)app.querySelectorAll('.spot-dim').forEach(x=>x.remove());stage.__spot=null;};
 function place(stage){const o=stage.__spot;if(!o)return;const{el,w,inner,S,pad}=o;
  const sr=stage.getBoundingClientRect(),r=el.getBoundingClientRect(),p=pad*S;
  w.style.left=(r.left-sr.left-p)+'px';w.style.top=(r.top-sr.top-p)+'px';w.style.width=(r.width+2*p)+'px';w.style.height=(r.height+2*p)+'px';
  inner.style.width=el.offsetWidth+'px';inner.style.transform=`scale(${S})`;inner.style.margin=p+'px';}
 function on(stage,app,el,{S=1,root='',radius=12,pad=0,bg='',instant=false}={}){
  off(stage,app);
  const dim=document.createElement('div');dim.className='spot-dim';app.appendChild(dim);
  const w=document.createElement('div');w.className='spot';w.style.borderRadius=(radius+pad)*S+'px';if(bg)w.style.background=bg;
  const inner=document.createElement('div');inner.className=root+' spot-in';inner.appendChild(el.cloneNode(true));w.appendChild(inner);stage.appendChild(w);
  stage.__spot={el,w,inner,S,pad};place(stage);
  if(instant){dim.style.transition=w.style.transition='none';dim.classList.add('on');w.classList.add('up');return;}
  setTimeout(()=>{dim.classList.add('on');setTimeout(()=>w.classList.add('up'),260);},30);
 }
 return {on,off,place};
})();
// Negotiation chat: the Figma flow played once, with taps shown. Built from frames 13392:6536 → 13392:6795.
(()=>{
const host=document.querySelector('.nx-phone');if(!host)return;
const RM=matchMedia('(prefers-reduced-motion: reduce)').matches;
const X='<svg viewBox="0 0 24 24"><path fill="#0B0C0D" fill-rule="evenodd" d="M5.116 5.116a1.25 1.25 0 0 1 1.768 0L12 10.232l5.116-5.116a1.25 1.25 0 1 1 1.768 1.768L13.768 12l5.116 5.116a1.25 1.25 0 0 1-1.768 1.768L12 13.768l-5.116 5.116a1.25 1.25 0 0 1-1.768-1.768L10.232 12 5.116 6.884a1.25 1.25 0 0 1 0-1.768Z"/></svg>';
const CHECK='<svg viewBox="0 0 16 16"><path fill="#fff" fill-rule="evenodd" d="M13.923 3.411a.833.833 0 0 1 0 1.178l-7.334 7.334a.833.833 0 0 1-1.178 0L2.077 8.589a.833.833 0 1 1 1.179-1.178L6 10.155l6.744-6.744a.833.833 0 0 1 1.179 0Z"/></svg>';
const DEL='<svg viewBox="0 0 32 32"><path d="M15.214 13.525a.75.75 0 0 1 1.061-1.06l2.475 2.474 2.475-2.475a.75.75 0 1 1 1.06 1.061L19.811 16l2.474 2.475a.75.75 0 1 1-1.06 1.06L18.75 17.061l-2.475 2.475a.75.75 0 1 1-1.06-1.061l2.474-2.475-2.475-2.475Z"/><path fill-rule="evenodd" d="M12.121 8.379 4.5 16l7.621 7.621a3 3 0 0 0 2.122.879H24.5a3 3 0 0 0 3-3v-11a3 3 0 0 0-3-3H14.243a3 3 0 0 0-2.122.879ZM24.5 23.2H14.243a1.7 1.7 0 0 1-1.202-.498L6.338 16l6.703-6.702a1.7 1.7 0 0 1 1.202-.498H24.5c.939 0 1.7.761 1.7 1.7v11c0 .939-.761 1.7-1.7 1.7Z"/></svg>';
const PROD=host.dataset.img||'';

const offer=(label,u,q,t,off)=>`<div class="nx-ob${off?' off':''}"><div class="nx-oh"><i></i><span>${label}</span></div><div class="nx-rows"><div class="nx-r"><span>Unit Price:</span><span>${u}</span></div><div class="nx-r"><span>Quantity:</span><span>${q}</span></div></div><div class="nx-r t"><span>Total:</span><span>${t}</span></div></div>`;
const col=(inner,cls='')=>{const c=document.createElement('div');c.className='nx-col '+cls;c.innerHTML='<div class="nx-ci">'+inner+'</div>';return c;};
const keys=[['1',''],['2','ABC'],['3','DEF'],['4','GHI'],['5','JKL'],['6','MNO'],['7','PQRS'],['8','TUV'],['9','WXYZ']];

host.innerHTML=`<div class="nx-scr"><div class="nx-app" aria-hidden="true">
 <div class="nx-sb"><span class="nx-time">9:41</span><span class="nx-ic"><svg width="18" height="12" viewBox="0 0 18 12"><rect x="0" y="8" width="3" height="4" rx="1"/><rect x="5" y="5.5" width="3" height="6.5" rx="1"/><rect x="10" y="3" width="3" height="9" rx="1"/><rect x="15" y="0" width="3" height="12" rx="1"/></svg><svg width="16" height="12" viewBox="0 0 16 12"><path d="M8 2.6c2.2 0 4.2.8 5.7 2.2l1.1-1.1A9.6 9.6 0 0 0 8 1 9.6 9.6 0 0 0 1.2 3.7l1.1 1.1A8 8 0 0 1 8 2.6Zm0 3.2c1.3 0 2.5.5 3.4 1.3l1.1-1.1A6.4 6.4 0 0 0 8 4.2c-1.7 0-3.3.7-4.5 1.8l1.1 1.1c.9-.8 2.1-1.3 3.4-1.3Zm0 3.2c.5 0 .9.2 1.2.5L8 10.7 6.8 9.5c.3-.3.7-.5 1.2-.5Z"/></svg><svg width="27" height="13" viewBox="0 0 27 13"><rect x=".5" y=".5" width="22" height="12" rx="3.5" fill="none" stroke="#000" stroke-opacity=".35"/><rect x="2" y="2" width="19" height="9" rx="2"/><path d="M24 4.5v4c.8-.3 1.3-1.1 1.3-2s-.5-1.7-1.3-2Z" fill-opacity=".4"/></svg></span></div>
 <div class="nx-hd"><span class="x">${X}</span><div class="nx-ttl">Negotiation</div></div>
 <div class="nx-pr"><span class="nx-th"><img src="${PROD}" alt=""></span><div class="nx-pt"><div class="nx-pa">Unit price:<b>4,793.70</b></div><div class="nx-pb">(5,046 Incl. VAT)</div><div class="nx-pc">Min. Order: 5 pcs</div></div></div>
 <div class="nx-body"><div class="nx-chats"></div></div>
 <div class="nx-bot"></div>
 <div class="nx-kbw"><div><div class="nx-kb">${keys.map(([n,l])=>`<span class="nx-k" data-k="${n}"><b>${n}</b>${l?`<small>${l}</small>`:''}</span>`).join('')}<span class="nx-k bare" data-k="."><b>.</b></span><span class="nx-k" data-k="0"><b>0</b></span><span class="nx-k bare">${DEL}</span></div></div></div>
 <div class="nx-hiw"><div><div class="nx-hi"></div></div></div>
 <span class="nx-tap"></span>
</div></div>`;
const scr=host.querySelector('.nx-scr'),app=host.querySelector('.nx-app'),chats=app.querySelector('.nx-chats'),bot=app.querySelector('.nx-bot'),kbw=app.querySelector('.nx-kbw'),hiw=app.querySelector('.nx-hiw'),tapEl=app.querySelector('.nx-tap');
let S=1;
const fit=()=>{const w=scr.clientWidth;S=w/375;scr.style.height=(812*S)+'px';app.style.transform=`scale(${S})`;const st=host.closest('.nx-stage');if(st)__spot.place(st);};
new ResizeObserver(fit).observe(host);fit();

let instant=RM,token=0;const SLOW=1.45;
const wait=ms=>{if(instant)return Promise.resolve();const t=token;return new Promise((res,rej)=>setTimeout(()=>t===token?res():rej('reset'),ms*SLOW));};
const add=async(inner,cls)=>{const c=col(inner,cls);chats.appendChild(c);c.offsetHeight;c.classList.add('on');await wait(340);return c;};
const drop=async c=>{c.classList.remove('on');await wait(330);c.remove();};
const fmt=s=>{const [i,d]=s.split('.');const n=i.replace(/\B(?=(\d{3})+(?!\d))/g,',');return d!==undefined?n+'.'+d:n;};
async function tap(el){
 if(instant)return;
 const a=app.getBoundingClientRect(),r=el.getBoundingClientRect();
 tapEl.style.left=((r.left+r.width/2-a.left)/S)+'px';tapEl.style.top=((r.top+r.height/2-a.top)/S)+'px';
 tapEl.classList.add('on');await wait(140);tapEl.classList.add('press');el.classList.add('down','dn');await wait(130);
 tapEl.classList.remove('press');el.classList.remove('down','dn');await wait(60);tapEl.classList.remove('on');await wait(90);
}
async function type(input,str){
 const val=input.querySelector('.v'),ph=input.querySelector('.nx-ph');let s='';
 for(const ch of str){const k=app.querySelector(`.nx-k[data-k="${ch}"]`);
  if(!instant){k.classList.add('dn');await wait(85);}
  s+=ch;val.textContent=fmt(s);if(ph)ph.style.display='none';
  if(!instant){k.classList.remove('dn');await wait(45);}}
}
const kb=on=>{kbw.classList.toggle('on',on);hiw.classList.toggle('off',on);};
const field=(label,ph,pre)=>`<div class="nx-fld"><label>${label}</label><div class="nx-in">${pre?`<span class="v">${pre}</span>`:`<span class="v"></span>`}<i class="cur"></i>${pre?'':`<span class="nx-ph">${ph}</span>`}</div></div>`;
const setBot=async html=>{const old=bot.firstElementChild;const c=col(html);if(old){old.classList.remove('on');}bot.appendChild(c);c.offsetHeight;c.classList.add('on');await wait(330);if(old)old.remove();};

// the deal card's box: no dot, its own colours
const st=document.createElement('style');st.textContent='.nx-ob.dl{background:#f2fcf0}.nx-ob.dl i{display:none}.nx-ob.dl .nx-oh span{color:#236d21}.nx-ob.dl .nx-r{color:#0b0c0d}';document.head.appendChild(st);

// frame 1, shown at once
function frame1(){
 const c=col('<div class="nx-row"><div class="nx-b">Hello! Please tell me how many units you need and your target price per unit.</div></div>');c.classList.add('on');chats.appendChild(c);
 const b=col(`<div class="nx-pnl"><div class="nx-flds">${field('Price per unit','Enter')+field('Total Quantities','Enter')}</div><div class="nx-acts"><span class="nx-bt">Submit request</span></div></div>`);b.classList.add('on');bot.appendChild(b);
}
// from the first tap to the deal
async function play(){
 const [p1,q1]=bot.querySelectorAll('.nx-in'),sub1=bot.querySelector('.nx-bt');
 await tap(p1);p1.classList.add('f');kb(true);await wait(320);
 await type(p1,'4500');await wait(120);
 await tap(q1);p1.classList.remove('f');q1.classList.add('f');
 await type(q1,'10');sub1.classList.add('go');await wait(260);
 await tap(sub1);q1.classList.remove('f');kb(false);
 await rest();
}
async function rest(){
 await add('<div class="nx-row me"><div class="nx-b">I need 10 qty at 4,500 /pc.</div></div>');
 const w1=await add('<div class="nx-row"><div class="nx-b nx-wait"><b>You’ve sent an offer to the seller. Awaiting response.</b><div class="nx-p">You’ll receive an email notification once there’s an update, or you can check the status anytime in your Messages.</div></div></div>');
 await setBot('<div class="nx-pnl cn"><span class="nx-bt ol">Cancel Negotiation</span></div>');
 await wait(950);
 await drop(w1);
 const c1=await add(`<div class="nx-row"><div class="nx-b nx-card"><div class="msg">The seller has proposed a new price. Review and respond.</div>${offer('Counter Offer','4,900','10','49,000')}<div class="nx-col on nx-bw"><div class="nx-ci"><div class="nx-btns"><span class="nx-btn o">Counter offer</span><span class="nx-btn p">Add to cart</span></div></div></div></div></div>`);
 await setBot('<div class="nx-foot">The above offer will expire in 8h:20m</div>');
 await wait(650);
 await tap(c1.querySelector('.nx-btn.o'));
 c1.querySelector('.nx-bw').classList.remove('on');
 await setBot(`<div class="nx-pnl"><div class="nx-flds">${field('Price per unit','Your Target Price')+field('Total Quantities','','Qty: 10')}</div><div class="nx-acts"><span class="nx-close">Close</span><span class="nx-bt">Submit request</span></div></div>`);
 const p2=bot.querySelector('.nx-in'),sub2=bot.querySelector('.nx-bt');p2.classList.add('f');kb(true);await wait(340);
 await type(p2,'4600.80');sub2.classList.add('go');await wait(260);
 await tap(sub2);p2.classList.remove('f');kb(false);
 c1.querySelector('.msg').textContent='Seller has sent a counter offer.';
 const ob=c1.querySelector('.nx-ob');ob.classList.add('off');ob.querySelector('.nx-oh span').textContent='Counter Offer (Superseded)';
 await setBot('');
 await add('<div class="nx-row me"><div class="nx-b">I’d like to counter with 4,600.80 /pc for 10 qty.</div></div>');
 const w2=await add('<div class="nx-row"><div class="nx-b nx-wait"><b>You’ve sent a counter offer to the seller. Awaiting their response.</b><div class="nx-p">You’ll receive an email notification once there’s an update, or you can check the status anytime in your Messages.</div></div></div>');
 await wait(950);
 await drop(w2);
 const c2=await add(`<div class="nx-row"><div class="nx-b nx-card"><div class="msg">Seller has accepted your offer. Click “Add to Cart” to confirm and proceed with checkout.</div>${offer('Seller Accepted','4,600.80','10','46,008')}<div class="nx-col on nx-bw"><div class="nx-ci"><div class="nx-btns"><span class="nx-btn o">Reject</span><span class="nx-btn p">Add to Cart</span></div></div></div></div></div>`);
 await setBot('<div class="nx-foot">The above offer will expire in 1h:20m</div>');
 await wait(700);
 await tap(c2.querySelector('.nx-btn.p'));
 c2.querySelector('.nx-bw').classList.remove('on');
 const ob2=c2.querySelector('.nx-ob');ob2.classList.add('off');ob2.querySelector('.nx-oh span').textContent='Final Offer';
 await add(`<div class="nx-row me"><div class="nx-deal"><div class="nx-dh"><i>${CHECK}</i>Deal accepted</div>${offer('Product Added to Cart','4,600.80','10','46,008').replace('nx-ob','nx-ob dl')}<span class="nx-btn p">View Cart</span></div></div>`);
 await setBot('<div class="nx-foot">The offer is valid for 30 mins. Checkout now!</div>');
 await wait(700);liftDeal();
}
// the Deal accepted card lifts out of the phone
const nxStage=host.closest('.nx-stage')||host.parentElement;
function liftDeal(){__spot.on(nxStage,app,app.querySelector('.nx-deal'),{S,root:'nx-app',radius:12,instant});}

app.classList.add('instant');frame1();
if(RM){play();}
else{
 requestAnimationFrame(()=>requestAnimationFrame(()=>{app.classList.remove('instant');instant=false;}));
 // same rule as the other animations: play when 80% is in view, reset when it is mostly out of view
 let state='idle';
 const reset=()=>{token++;__spot.off(nxStage,app);app.classList.add('instant');chats.innerHTML='';bot.innerHTML='';kb(false);tapEl.className='nx-tap';frame1();
  requestAnimationFrame(()=>requestAnimationFrame(()=>app.classList.remove('instant')));state='idle';};
 new IntersectionObserver(es=>{for(const e of es){
  if(e.intersectionRatio>=.8&&state==='idle'){state='playing';const t=token;wait(300).then(play).then(()=>{if(t===token)state='done';}).catch(()=>{});}
  else if(e.intersectionRatio<.3&&state!=='idle')reset();}},{threshold:[0,.3,.8]}).observe(host);
}
})();
// Activity panel options (Feature 02), built from Figma frames 13356:1533 / 1589 / 1603 / 1615.
(()=>{
const wrap=document.querySelector('.av');if(!wrap)return;
const stage=wrap.querySelector('.av-stage'),note=wrap.querySelector('.av-note');
const RM=matchMedia('(prefers-reduced-motion: reduce)').matches;
const IC=JSON.parse(wrap.dataset.icons),P1=wrap.dataset.p1,P2=wrap.dataset.p2;
const HOME=()=>{const i=document.querySelector('.hv-fb img');return i?i.src:'';};

const card=(icon,text,btn,cls='')=>`<div class="av-cd ${cls}"><div class="av-ct"><div class="av-ic">${IC[icon]}<span class="av-tx">${text}</span></div>${btn?`<span class="av-bt">${btn}</span>`:''}</div></div>`;
const order=(img,pos,n,st,ofd)=>`<div class="av-or"><span class="av-im"><img src="${img}" alt="" style="${pos}"></span><div class="av-om"><b>${n}</b><span class="av-bd${ofd?' ofd':''}">${st}</span></div></div>`;
const ship=`<div class="av-cd shp"><div class="av-ct"><div class="av-ic">${IC.pkg}<span class="av-tx">5 upcoming shipments</span></div>${IC.chevr}</div>
 <div class="av-items">${order(P1,'left:9.22%;top:9.01%;width:81.56%;height:81.98%','+7 items','Out for Delivery',1)}${order(P2,'inset:0;width:100%;height:100%;object-fit:cover','+30 items','Placed')}${order(P2,'inset:0;width:100%;height:100%;object-fit:cover','+30 items','Placed')}</div></div>`;
const col=(inner,cls,on)=>`<div class="av-col ${cls}${on?' on':''}"><div class="av-ci">${inner}</div></div>`;
// one panel with every part, so a state is just which parts are on
function panel({sum=false,trunc=false,wg=false,w1=false,w2=false,w3=false,od=false}={}){
 const sumTxt=trunc?'20K credit due<i></i>2 documents expired<i></i><span class="tr">5 upcoming shipments</span>':'20K credit due<i></i>5 upcoming shipments';
 const credit=od?card('receipt','201.7K overdue since 18 Nov','Pay now','od'):card('receipt','20K credit due by 10 Dec','Pay now');
 return `<div class="av-fr"><div class="av-pn"><div class="av-tt"><span>Activity</span>${IC.chevup}</div>
  ${col(`<div class="av-sr">${sumTxt}</div>`,'sum',sum)}
  ${col(`<div class="av-ws">${col(card('file','2 documents expired','Upload'),'w1',w1)}${col(credit,'w2',w2)}${col(ship,'w3',w3)}</div>`,'wg',wg)}
 </div></div>`;}

// the home screen, cut a little below the collapsed panel; the status bar stays pinned and the page scrolls under it
const SHOW=480,PANEL_TOP=225; // in app px
const OPT={
 c:{note:'Plays when it comes into view: a tap on the chevron opens the panel, the page scrolls to show all of it, then the panel is lifted out.',
  init:()=>{const h=HOME();return `<div class="av-phone"><div class="av-scr"><div class="av-app av-root"><div class="av-sb" style="background-image:url(${h})"></div><div class="av-pgw"><div class="av-pg"><div class="av-sl1" style="background-image:url(${h})"></div>${panel({sum:true})}<div class="av-sl2" style="background-image:url(${h})"></div></div></div><span class="av-tap"></span></div></div></div>`;},
  fit:st=>{const s=st.querySelector('.av-scr'),a=st.querySelector('.av-app'),p=st.querySelector('.av-phone');if(!s)return;const S=s.clientWidth/375;
   s.style.height=812*S+'px';a.style.transform=`scale(${S})`;a.dataset.s=S;
   const pad=parseFloat(getComputedStyle(st).paddingTop),bz=parseFloat(getComputedStyle(p).paddingTop);
   st.style.height=Math.round(pad+bz+SHOW*S)+'px';__spot.place(st);},
  run:async r=>{await wait(800);await tap(r.querySelector('.av-tt svg'));
   on(r,'.sum',false);on(r,'.wg',true);for(const w of['.w1','.w2','.w3']){on(r,w,true);await wait(170);}
   await wait(900);fitPanel(r);await wait(1500);await scrollItems(r);await wait(500);lift(r,false);}}
};
// scroll the page just enough that the whole open panel sits above the cut
function fitPanel(r){const fr=r.querySelector('.av-fr');const y=Math.max(0,PANEL_TOP+fr.offsetHeight-(SHOW-30));r.querySelector('.av-pg').style.transform=`translateY(${-y}px)`;}
function lift(r,instant){__spot.on(stage,r,r.querySelector('.av-pn'),{S:+r.dataset.s,root:'av-root',radius:20,instant});}
let token=0,cur='c',state='idle',inView=false;
const wait=ms=>{const t=token;return new Promise((res,rej)=>setTimeout(()=>t===token?res():rej('reset'),ms));};
const on=(r,sel,v)=>r.querySelector(sel).classList.toggle('on',v);
async function tap(el){
 const root=el.closest('.av-root'),dot=root.querySelector('.av-tap'),S=+(root.dataset.s||1);
 const a=root.getBoundingClientRect(),b=el.getBoundingClientRect();
 dot.style.left=(b.left+b.width/2-a.left)/S+'px';dot.style.top=(b.top+b.height/2-a.top)/S+'px';
 dot.classList.add('on');await wait(200);dot.classList.add('press');await wait(180);dot.classList.remove('press');await wait(80);dot.classList.remove('on');await wait(120);
}
async function scrollItems(r){const it=r.querySelector('.av-items');it.style.transform='translateX(-128px)';await wait(1700);it.style.transform='';}

function render(){
 token++;state='idle';__spot.off(stage);const o=OPT[cur];
 stage.innerHTML=o.init();if(note)note.textContent=o.note;
 const r=stage.querySelector('.av-root');
 if(o.fit){o.fit(stage);if(!stage.__ro){stage.__ro=new ResizeObserver(()=>{const f=OPT[cur].fit;if(f)f(stage);});stage.__ro.observe(stage);}}
 if(o.run&&RM){r.classList.add('instant');finish(r);}
 else if(inView)play();
}
function finish(r){ // the end state, for reduced motion
 on(r,'.sum',false);['.wg','.w1','.w2','.w3'].forEach(s=>on(r,s,true));fitPanel(r);lift(r,true);
}
function play(){const o=OPT[cur];if(!o.run||RM||state!=='idle')return;state='playing';const t=token;
 o.run(stage.querySelector('.av-root')).then(()=>{if(t===token)state='done';}).catch(()=>{});}
// same rule as the other animations: play when 80% is in view, start over when it is mostly out of view
new IntersectionObserver(es=>{for(const e of es){
 if(e.intersectionRatio>=.8){inView=true;play();}
 else if(e.intersectionRatio<.3){inView=false;if(state!=='idle')render();}}},{threshold:[0,.3,.8]}).observe(stage);
render();
})();
// Brand pills (Feature 03): the axiom For You page, and what changes when Samsung or mycandy is selected.
// Layout, type, pill logos, category photos, banners and brand logos come from Figma (13360:1810).
// Figma has no product photos, so products are line-icon tiles; names and prices are mock data.
(()=>{
const host=document.querySelector('.bp');if(!host)return;
const stage=host.querySelector('.bp-stage');
const A=JSON.parse(host.dataset.a);
const RM=matchMedia('(prefers-reduced-motion: reduce)').matches;
const L={phone:'<rect x="7" y="2.5" width="10" height="19" rx="2"/><path d="M11 18.5h2"/>',
 buds:'<circle cx="7.5" cy="8" r="3.5"/><path d="M9.5 10.8V19"/><circle cx="16.5" cy="8" r="3.5"/><path d="M14.5 10.8V19"/>',
 charger:'<rect x="6" y="8" width="12" height="13" rx="2"/><path d="M10 8V3M14 8V3M12 13v3"/>',
 camera:'<circle cx="12" cy="10" r="6.5"/><circle cx="12" cy="10" r="2.5"/><path d="M8.5 21h7M12 16.5V21"/>',
 power:'<rect x="5" y="3" width="14" height="18" rx="2.5"/><path d="M12.5 7.5 10 12h4l-2.5 4.5"/>',
 cable:'<path d="M6 3v4M10 3v4M5 7h6v4a3 3 0 0 1-6 0V7zM8 14v3a4 4 0 0 0 8 0V9a2 2 0 0 1 4 0v12"/>',
 tablet:'<rect x="3.5" y="4" width="17" height="16" rx="2"/><path d="M11 17h2"/>',
 watch:'<rect x="7" y="7" width="10" height="10" rx="3"/><path d="M9 7l1-4h4l1 4M9 17l1 4h4l1-4"/>'};
const ic=(k,extra='')=>`<svg viewBox="0 0 24 24" fill="none" stroke-linecap="round" stroke-linejoin="round" ${extra}>${L[k]}</svg>`;
const CART='<svg viewBox="0 0 24 24" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M3 4h2l2 11h10l2-8H6.5"/><circle cx="9" cy="19" r="1.3"/><circle cx="16" cy="19" r="1.3"/></svg>';
const ARR='<svg viewBox="0 0 24 24" fill="none" stroke="#0b0c0d" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';

const D={
 fy:{cats:[['img',A.cat_phone,'Mobile Phones'],['img',A.cat_acc,'Accessories'],['img',A.cat_head,'Headphones'],['img',A.cat_tab,'Tablets'],['img',A.cat_watch,'Wearables']],
  bans:[`<div class="bp-ban w1" style="background:linear-gradient(68deg,#00384c 5%,#00739c 107%)"><img src="${A.ban_gaming}" alt="" style="height:100%;left:-44.41%;top:0;width:233.67%"></div>`,
        `<div class="bp-ban w2"><img src="${A.ban_cashback}" alt="" style="inset:0;width:100%;height:100%;object-fit:cover"></div>`],
  prods:[['Samsung Galaxy S24 Ultra Dual SIM Titanium Gray 12GB','2,969','phone',1],['Galaxy A55 Dual SIM Awesome Lilac 8GB 256GB','1,149','phone'],['C6N Wi-Fi Camera 1080P Smart Indoor','82.10','camera']],
  brands:true},
 sm:{cats:[['ln','phone','Galaxy Phones'],['ln','tablet','Galaxy Tab'],['ln','buds','Galaxy Buds'],['ln','watch','Galaxy Watch'],['ln','charger','Chargers']],
  bans:[`<div class="bp-ban w1" style="background:linear-gradient(68deg,#00384c 5%,#00739c 107%)"><img src="${A.ban_phones}" alt="" style="inset:0;width:100%;height:100%;object-fit:contain"></div>`,
        `<div class="bp-ban w2" style="background:linear-gradient(135deg,#0b1f6b,#1428a0);color:#fff"><div class="bp-cb"><span class="lg"><img class="sm" src="${A.samsung}" alt=""></span><b>Galaxy Buds FE</b><span>Bulk price for retailers</span><i>SHOP NOW</i>${ic('buds','stroke="rgba(255,255,255,.55)"')}</div></div>`],
  prods:[['Samsung Galaxy S24 Ultra Dual SIM Titanium Gray 12GB','2,969','phone',1],['Samsung Galaxy Tab S9 FE Wi-Fi 128GB Gray','1,299','tablet'],['Samsung Galaxy Buds FE Graphite','249','buds'],['Samsung 25W USB-C Travel Adapter','39','charger']],
  brands:false},
 mc:{cats:null,
  bans:[`<div class="bp-ban w1" style="background:linear-gradient(135deg,#e9fbf5,#b9eedc);color:#0b3b30"><div class="bp-cb"><span class="lg"><img src="${A.mycandy}" alt=""></span><b>Chargers and power banks</b><span>Bulk prices, next-day delivery</span><i>SHOP NOW</i>${ic('power','stroke="rgba(11,59,48,.35)"')}</div></div>`,
        `<div class="bp-ban w2" style="background:linear-gradient(135deg,#2c2c34,#4a4a56);color:#fff"><div class="bp-cb"><span class="lg"><img src="${A.mycandy}" alt=""></span><b>Wireless earbuds</b><span>New in for your shop</span><i>SHOP NOW</i>${ic('buds','stroke="rgba(255,255,255,.4)"')}</div></div>`],
  prods:[['mycandy 20W USB-C Fast Charger White','29','charger',1],['mycandy 10000mAh Power Bank Black','69','power'],['mycandy Wireless Earbuds with Charging Case','89','buds'],['mycandy USB-C to USB-C Cable 1m','15','cable']],
  brands:false}};

const cats=c=>`<div class="bp-sec"><div class="bp-h"><b>Shop by Category</b></div><div class="bp-cats">${c.map(([t,v,l])=>`<div class="bp-cat"><div class="bp-ci${t==='ln'?' ln':''}">${t==='img'?`<img src="${v}" alt="">`:ic(v)}</div><div class="bp-cl">${l}</div></div>`).join('')}</div></div>`;
const prods=p=>`<div class="bp-sec"><div class="bp-h"><b>Next Day Delivery</b>${ARR}</div><div class="bp-cards">${p.map(([n,pr,i,t])=>`<div class="bp-card">${t?'<span class="bp-tier">Buy More, Save More</span>':''}<div class="bp-img">${ic(i)}<span class="bp-cart">${CART}</span></div><div class="bp-ct"><div class="bp-nm">${n}</div><div class="bp-pr">${pr}</div><div class="bp-dl"><em>express</em>Today</div></div></div>`).join('')}</div></div>`;
const brands=`<div class="bp-sec"><div class="bp-h"><b>Shop by Brand</b></div><div class="bp-brs"><span class="bp-br"><img src="${A.br_apple}" alt=""></span><span class="bp-br dk"><img src="${A.br_lg}" alt=""></span><span class="bp-br"><img src="${A.br_nokia}" alt=""></span><span class="bp-br"><img src="${A.br_sony}" alt=""></span></div></div>`;
const SB='<div class="bp-sb"><span class="t">9:41</span><span class="i"><svg width="18" height="12" viewBox="0 0 18 12"><rect x="0" y="8" width="3" height="4" rx="1"/><rect x="5" y="5.5" width="3" height="6.5" rx="1"/><rect x="10" y="3" width="3" height="9" rx="1"/><rect x="15" y="0" width="3" height="12" rx="1"/></svg><svg width="16" height="12" viewBox="0 0 16 12"><path d="M8 2.6c2.2 0 4.2.8 5.7 2.2l1.1-1.1A9.6 9.6 0 0 0 8 1 9.6 9.6 0 0 0 1.2 3.7l1.1 1.1A8 8 0 0 1 8 2.6Zm0 3.2c1.3 0 2.5.5 3.4 1.3l1.1-1.1A6.4 6.4 0 0 0 8 4.2c-1.7 0-3.3.7-4.5 1.8l1.1 1.1c.9-.8 2.1-1.3 3.4-1.3Zm0 3.2c.5 0 .9.2 1.2.5L8 10.7 6.8 9.5c.3-.3.7-.5 1.2-.5Z"/></svg><svg width="27" height="13" viewBox="0 0 27 13"><rect x=".5" y=".5" width="22" height="12" rx="3.5" fill="none" stroke="#000" stroke-opacity=".35"/><rect x="2" y="2" width="19" height="9" rx="2"/><path d="M24 4.5v4c.8-.3 1.3-1.1 1.3-2s-.5-1.7-1.3-2Z" fill-opacity=".4"/></svg></span></div>';
const SRCH='<div class="bp-srch"><div class="bp-sf"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0b0c0d" stroke-width="2.2" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg><span class="sp">Search</span><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0b0c0d" stroke-width="1.8" stroke-linecap="round"><path d="M4 8V5a1 1 0 0 1 1-1h3M16 4h3a1 1 0 0 1 1 1v3M20 16v3a1 1 0 0 1-1 1h-3M8 20H5a1 1 0 0 1-1-1v-3M8 9v6M11 9v6M14 9v6M17 9v6"/></svg><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0b0c0d" stroke-width="1.8" stroke-linecap="round"><rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5.5 11a6.5 6.5 0 0 0 13 0M12 17.5V21"/></svg></div></div>';

const TOP=54+52+72,SHOW=480; // sticky top in app px; how much of the screen shows above the cut
let token=0,state='idle',inView=false,cur='fy',S=1;
const wait=ms=>{const t=token;return new Promise((res,rej)=>setTimeout(()=>t===token?res():rej('reset'),ms));};
const $=s=>stage.querySelector(s);

function build(){
 stage.innerHTML=`<div class="bp-phone"><div class="bp-scr"><div class="bp-app">
  <div class="bp-top">${SB}<div class="bp-pills"><span class="bp-pill on" data-k="fy">For You</span><span class="bp-pill" data-k="sm"><img src="${A.samsung}" alt="Samsung"></span><span class="bp-pill" data-k="mc"><img src="${A.mycandy}" alt="mycandy"></span></div>${SRCH}</div>
  <div class="bp-view"><div class="bp-pg">
   <div class="bp-col c-cats on"><div><div class="bp-fd f-cats">${cats(D.fy.cats)}</div></div></div>
   <div class="bp-fd f-bans"><div class="bp-bans">${D.fy.bans.join('')}</div></div>
   <div class="bp-fd f-prods">${prods(D.fy.prods)}</div>
   <div class="bp-col c-brands on"><div>${brands}</div></div>
  </div></div>
  <span class="bp-tap"></span></div></div></div>`;
 cur='fy';fit();
}
function fit(){const s=$('.bp-scr'),a=$('.bp-app'),p=$('.bp-phone');if(!s)return;S=s.clientWidth/375;
 s.style.height=812*S+'px';a.style.transform=`scale(${S})`;
 const pad=parseFloat(getComputedStyle(stage).paddingTop),bz=parseFloat(getComputedStyle(p).paddingTop);
 stage.style.height=Math.round(pad+bz+SHOW*S)+'px';__spot.place(stage);}
new ResizeObserver(fit).observe(stage);

async function tap(el){
 const a=$('.bp-app').getBoundingClientRect(),b=el.getBoundingClientRect(),dot=$('.bp-tap');
 dot.style.left=(b.left+b.width/2-a.left)/S+'px';dot.style.top=(b.top+b.height/2-a.top)/S+'px';
 dot.classList.add('on');await wait(220);dot.classList.add('press');el.classList.add('down');await wait(170);
 dot.classList.remove('press');el.classList.remove('down');await wait(80);dot.classList.remove('on');await wait(100);
}
const maxScroll=()=>Math.max(0,$('.bp-pg').offsetHeight-(SHOW-TOP));
const scrollTo=y=>{$('.bp-pg').style.transform=`translateY(${-y}px)`;};
async function swap(sel,html){const el=$(sel);el.classList.add('out');await wait(230);el.innerHTML=html;el.classList.remove('out');}
async function select(k){
 const d=D[k];cur=k;
 stage.querySelectorAll('.bp-pill').forEach(p=>p.classList.toggle('on',p.dataset.k===k));
 const jobs=[swap('.f-bans',`<div class="bp-bans">${d.bans.join('')}</div>`),swap('.f-prods',prods(d.prods))];
 if(d.cats){$('.c-cats').classList.add('on');jobs.push(swap('.f-cats',cats(d.cats)));}else $('.c-cats').classList.remove('on');
 $('.c-brands').classList.toggle('on',d.brands);
 await Promise.all(jobs);
}
async function browse(){const m=maxScroll();if(m<24)return wait(1400);scrollTo(m);await wait(1400+1100);scrollTo(0);await wait(1500);}
async function play(){
 await wait(900);await browse();
 await tap($('.bp-pill[data-k="sm"]'));await select('sm');await wait(1300);await browse();
 await tap($('.bp-pill[data-k="mc"]'));await select('mc');await wait(1300);await browse();
 await wait(300);lift(false);
}
// the pills row, with mycandy selected, lifts out of the phone
function lift(instant){__spot.on(stage,$('.bp-app'),$('.bp-pills'),{S,root:'bp-app',radius:12,pad:10,bg:'#fff6db',instant});}
function render(){token++;state='idle';__spot.off(stage);build();if(RM){finalState();}else if(inView)go();}
function finalState(){const a=$('.bp-app');a.classList.add('instant');const d=D.mc;stage.querySelectorAll('.bp-pill').forEach(p=>p.classList.toggle('on',p.dataset.k==='mc'));
 $('.f-bans').innerHTML=`<div class="bp-bans">${d.bans.join('')}</div>`;$('.f-prods').innerHTML=prods(d.prods);$('.c-cats').classList.remove('on');$('.c-brands').classList.remove('on');lift(true);}
function go(){if(state!=='idle'||RM)return;state='playing';const t=token;play().then(()=>{if(t===token)state='done';}).catch(()=>{});}
// same rule as the other animations: play when 80% is in view, start over when mostly out of view
new IntersectionObserver(es=>{for(const e of es){
 if(e.intersectionRatio>=.8){inView=true;go();}
 else if(e.intersectionRatio<.3){inView=false;if(state!=='idle')render();}}},{threshold:[0,.3,.8]}).observe(stage);
render();
})();
// Card Carousel and its props (Background, Header Type, Cards), from Figma App Components 97:10348.
// A cursor works the panel once when in view; after that, or as soon as someone clicks, the panel is theirs.
(()=>{
const root=document.querySelector('.cc');if(!root)return;
const stage=root.querySelector('.cc-stage'),panel=root.querySelector('.cc-panel');
const RM=matchMedia('(prefers-reduced-motion: reduce)').matches;
const BANNER=root.dataset.banner;
const L={phone:'<rect x="7" y="2.5" width="10" height="19" rx="2"/><path d="M11 18.5h2"/>',
 buds:'<circle cx="7.5" cy="8" r="3.5"/><path d="M9.5 10.8V19"/><circle cx="16.5" cy="8" r="3.5"/><path d="M14.5 10.8V19"/>',
 charger:'<rect x="6" y="8" width="12" height="13" rx="2"/><path d="M10 8V3M14 8V3M12 13v3"/>',
 watch:'<rect x="7" y="7" width="10" height="10" rx="3"/><path d="M9 7l1-4h4l1 4M9 17l1 4h4l1-4"/>'};
const ic=k=>`<svg viewBox="0 0 24 24">${L[k]}</svg>`;
const CART='<svg viewBox="0 0 24 24" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M3 4h2l2 11h10l2-8H6.5"/><circle cx="9" cy="19" r="1.3"/><circle cx="16" cy="19" r="1.3"/></svg>';
const ARR='<svg viewBox="0 0 24 24" fill="none" stroke="#0b0c0d" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';
// mock content
const PRODUCTS=[['Samsung Galaxy S24 Ultra 12GB','2,969','3,499','-15%','phone',1],['Galaxy A55 Dual SIM 8GB','1,149','1,299','-12%','phone'],['Galaxy Buds FE Graphite','249','299','-17%','buds'],['25W USB-C Travel Adapter','39','49','-20%','charger']];
const FEATURED=[['Mobile Phones','Samsung, Apple','20% OFF','phone'],['Earbuds','Samsung, mycandy','15% OFF','buds'],['Chargers','mycandy, Anker','25% OFF','charger'],['Smart Watches','Samsung, Huawei','10% OFF','watch']];
const pc=([n,p,was,off,i,tier])=>`<div class="cc-pc"><div class="cc-tile">${tier?'<span class="cc-tier">Save More</span>':''}${ic(i)}<span class="cc-cart">${CART}</span></div><div class="cc-pt"><div class="cc-nm">${n}</div><div class="cc-pr"><b>${p}</b> /pc</div><div class="cc-ds"><s>${was}</s><span>${off}</span></div><div class="cc-dl"><em>express</em>Today</div></div></div>`;
const fc=([a,b,t,i])=>`<div class="cc-fc"><div class="cc-tile">${ic(i)}</div><div class="cc-fb"><div><b>${a}</b><span>${b}</span></div><i>${t}</i></div></div>`;
const slots=k=>(k==='Product card'?PRODUCTS.map(pc):FEATURED.map(fc)).map(h=>`<div class="cc-slot">${h}</div>`).join('');

const CHEV='<svg viewBox="0 0 10 10" fill="none" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3.5 5 6.5 8 3.5"/></svg>';
const dd=(key,val,opts)=>`<div class="cc-dd" data-p="${key}"><button type="button" class="cc-db" aria-haspopup="listbox"><span>${val}</span>${CHEV}</button><div class="cc-menu" role="listbox">${opts.map(o=>`<button type="button" class="cc-mi" data-v="${o}">${o}</button>`).join('')}</div></div>`;
panel.innerHTML=`<div class="cc-ph">Card Carousel <svg viewBox="0 0 10 10" fill="none" stroke="#fff" stroke-width="1.4"><path d="M2 3.5 5 6.5 8 3.5"/></svg></div>
 <div class="cc-from"><svg viewBox="0 0 12 12" fill="none" stroke-width="1.3"><path d="M6 1.2 10.8 6 6 10.8 1.2 6z"/></svg>From this file</div>
 <div class="cc-row"><label>Background</label><button type="button" class="cc-tg" data-p="bg" role="switch" aria-checked="false" aria-label="Background"></button></div>
 <div class="cc-sep"></div>
 <div class="cc-row"><label>Header Type</label>${dd('hdr','Text',['Text','Image'])}</div>
 <div class="cc-rcol on"><div><div class="cc-row sub"><label>↳ Action</label><button type="button" class="cc-tg on" data-p="act" role="switch" aria-checked="true" aria-label="Action"></button></div></div></div>
 <div class="cc-row"><label>Cards</label>${dd('cards','Product card',['Product card','Featured card'])}</div>
 <p class="cc-hint">Try it: switch the props.</p>
 <span class="cc-cur"><svg width="18" height="22" viewBox="0 0 18 22"><path d="M1 1v17l4.6-4.3 3 7 3-1.3-3-6.8H15z" fill="#fff" stroke="#000" stroke-width="1.2" stroke-linejoin="round"/></svg></span>`;
stage.innerHTML=`<div class="cc-fit"><div class="cc-comp"><div class="cc-sec txt">
  <div class="cc-col cc-txt on"><div><div class="cc-ht"><b>Next Day Delivery</b>${ARR}</div></div></div>
  <div class="cc-col cc-img"><div><div class="cc-hi"><img src="${BANNER}" alt=""></div></div></div>
  <div class="cc-body">${slots('Product card')}</div>
 </div></div><span class="cc-sel"><i></i><i></i><i></i><i></i></span><span class="cc-size">375 × 320 Hug</span></div>`;
const fitBox=stage.querySelector('.cc-fit'),comp=stage.querySelector('.cc-comp'),size=stage.querySelector('.cc-size');
// scale the 375 px component down when its canvas is narrower, never up
function fit(){const w=stage.clientWidth-parseFloat(getComputedStyle(stage).paddingLeft)*2;fitBox.style.zoom=Math.min(1,w/375);}
function measure(){size.textContent=`375 × ${Math.round(comp.offsetHeight)} Hug`;}
new ResizeObserver(fit).observe(stage);fit();
new ResizeObserver(measure).observe(comp);measure();
const S={bg:false,hdr:'Text',cards:'Product card',act:true};
const sec=stage.querySelector('.cc-sec'),body=stage.querySelector('.cc-body');
function apply(k,v){
 S[k]=v;
 const tg=p=>panel.querySelector(`.cc-tg[data-p="${p}"]`);
 if(k==='bg'||k==='act'){const t=tg(k);t.classList.toggle('on',v);t.setAttribute('aria-checked',v);}
 if(k==='bg')sec.classList.toggle('bg',v);
 if(k==='act')stage.querySelector('.cc-ht').classList.toggle('noact',!v);
 if(k==='hdr'){const txt=v==='Text';sec.classList.toggle('txt',txt);stage.querySelector('.cc-txt').classList.toggle('on',txt);stage.querySelector('.cc-img').classList.toggle('on',!txt);panel.querySelector('.cc-rcol').classList.toggle('on',txt);}
 if(k==='cards'){body.classList.add('out');setTimeout(()=>{body.innerHTML=slots(v);body.classList.toggle('fc',v==='Featured card');body.classList.remove('out');},250);}
 if(k==='hdr'||k==='cards')panel.querySelector(`.cc-dd[data-p="${k}"] .cc-db span`).textContent=v;
}
// people can use the panel at any time; a click stops the cursor
function stopDemo(){touched=true;token++;state='done';cur.classList.remove('on');panel.querySelectorAll('.cc-dd').forEach(d=>d.classList.remove('open'));}
panel.querySelectorAll('.cc-tg').forEach(t=>t.addEventListener('click',e=>{if(e.isTrusted)stopDemo();const p=t.dataset.p;apply(p,!S[p]);}));
panel.querySelectorAll('.cc-dd').forEach(d=>{
 d.querySelector('.cc-db').addEventListener('click',e=>{if(e.isTrusted)stopDemo();const open=!d.classList.contains('open');panel.querySelectorAll('.cc-dd').forEach(x=>x.classList.remove('open'));d.classList.toggle('open',open);});
 d.querySelectorAll('.cc-mi').forEach(m=>m.addEventListener('click',e=>{if(e.isTrusted)stopDemo();d.classList.remove('open');apply(d.dataset.p,m.dataset.v);}));});
document.addEventListener('click',e=>{if(!panel.contains(e.target))panel.querySelectorAll('.cc-dd').forEach(x=>x.classList.remove('open'));});

// the demo
const cur=panel.querySelector('.cc-cur');
let token=0,state='idle',touched=false;
const wait=ms=>{const t=token;return new Promise((res,rej)=>setTimeout(()=>t===token?res():rej('stop'),ms));};
async function moveTo(el){const p=panel.getBoundingClientRect(),r=el.getBoundingClientRect();cur.style.left=(r.left-p.left+r.width*.6)+'px';cur.style.top=(r.top-p.top+r.height*.55)+'px';cur.classList.add('on');await wait(650);}
async function click(el){await moveTo(el);cur.classList.add('press');await wait(140);cur.classList.remove('press');}
async function toggle(p){await click(panel.querySelector(`.cc-tg[data-p="${p}"]`));apply(p,!S[p]);await wait(1300);}
async function choose(k,v){const d=panel.querySelector(`.cc-dd[data-p="${k}"]`);await click(d.querySelector('.cc-db'));d.classList.add('open');await wait(380);
 const m=d.querySelector(`.cc-mi[data-v="${v}"]`);await moveTo(m);m.classList.add('hov');await wait(200);cur.classList.add('press');await wait(140);cur.classList.remove('press');
 m.classList.remove('hov');d.classList.remove('open');apply(k,v);await wait(1500);}
async function play(){
 await wait(700);
 await toggle('bg');
 await choose('hdr','Image');
 await choose('cards','Featured card');
 await choose('hdr','Text');
 await toggle('act');
 await choose('cards','Product card');
 await toggle('act');
 await toggle('bg');
 cur.classList.remove('on');
}
function reset(){token++;state='idle';root.classList.add('cc-instant');cur.classList.remove('on');panel.querySelectorAll('.cc-dd').forEach(d=>d.classList.remove('open'));
 if(S.bg)apply('bg',false);if(!S.act)apply('act',true);if(S.hdr!=='Text')apply('hdr','Text');
 if(S.cards!=='Product card'){S.cards='Product card';body.innerHTML=slots('Product card');body.classList.remove('fc');panel.querySelector('.cc-dd[data-p="cards"] .cc-db span').textContent='Product card';}
 setTimeout(()=>root.classList.remove('cc-instant'),50);}
function go(){if(state!=='idle'||RM)return;state='playing';const t=token;play().then(()=>{if(t===token)state='done';}).catch(()=>{});}
// same rule as the other animations: play when 80% is in view, start over when mostly out of view
new IntersectionObserver(es=>{for(const e of es){
 if(e.intersectionRatio>=.8)go();
 else if(e.intersectionRatio<.3&&!touched&&state!=='idle')reset();}},{threshold:[0,.3,.8]}).observe(stage);
})();

const root=document.documentElement;

// the vertical machine
const M=document.querySelector('.machine');const cases=[{k:'g',type:'Supermarket',sells:'Grocery',v:'Grocery'},{k:'e',type:'Mobile shop',sells:'Electronics',v:'IR'},{k:'d',type:'Salon',sells:'Beauty',v:'Default'}];
let i=0;const set=c=>{M.dataset.on=c.k;for(const f of ['type','sells','v'])M.querySelector('[data-f='+f+']').textContent=c[f];};
set(cases[0]);
clearInterval(window.__trMachine);
if(!matchMedia('(prefers-reduced-motion: reduce)').matches)window.__trMachine=setInterval(()=>{i=(i+1)%3;M.classList.add('swap');setTimeout(()=>{set(cases[i]);M.classList.remove('swap');},220);},3000);
}
