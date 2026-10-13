// QFunder hero: a dark laptop rises open and the landing page lights up. three.js is passed in, so it loads only here.
export function qfunderHero(THREE, RoomEnvironment) {

const box=document.querySelector('.qh');
const cv=box&&box.querySelector('canvas');
const IMG=window.QF_IMG||{},SRC=IMG.hero_base;
if(box&&cv){
const RM=matchMedia('(prefers-reduced-motion: reduce)').matches;
let R;try{R=new THREE.WebGLRenderer({canvas:cv,antialias:true,alpha:true});}catch(e){box.querySelector('img').src=IMG.hero_screen;box.classList.add('qh-flat');}
if(R){
R.setPixelRatio(Math.min(devicePixelRatio,2));R.toneMapping=THREE.ACESFilmicToneMapping;R.toneMappingExposure=1.1;R.outputColorSpace=THREE.SRGBColorSpace;
const scene=new THREE.Scene();
const pm=new THREE.PMREMGenerator(R);scene.environment=pm.fromScene(new RoomEnvironment(),.03).texture;
const key=new THREE.DirectionalLight(0xffffff,.7);key.position.set(-3,6,5);scene.add(key);
const rim=new THREE.DirectionalLight(0xdfe6ff,.9);rim.position.set(3,1.5,-6);scene.add(rim);
const cam=new THREE.PerspectiveCamera(22,1.5,.1,100);

// a slim dark laptop; the screen is the landing page at a 1520 × 988 viewport
const SA=1520/988,W=3,D=2.08,T=.05,LT=.02,SIDE=.055,TOPB=.055,CHIN=.075,SW=W-2*SIDE,SH=SW/SA,H=CHIN+SH+TOPB;
const body=new THREE.MeshStandardMaterial({color:0x16171a,metalness:.2,roughness:.78,envMapIntensity:.18});
const glass=new THREE.MeshBasicMaterial({color:0x060607});
function rr(w,h,r){const s=new THREE.Shape(),x=-w/2,y=-h/2;s.moveTo(x+r,y);s.lineTo(x+w-r,y);s.quadraticCurveTo(x+w,y,x+w,y+r);s.lineTo(x+w,y+h-r);s.quadraticCurveTo(x+w,y+h,x+w-r,y+h);s.lineTo(x+r,y+h);s.quadraticCurveTo(x,y+h,x,y+h-r);s.lineTo(x,y+r);s.quadraticCurveTo(x,y,x+r,y);return s;}
function slab(w,d,t,r,b){const g=new THREE.ExtrudeGeometry(rr(w,d,r),{depth:t-2*b,bevelEnabled:true,bevelThickness:b,bevelSize:b,bevelSegments:5,curveSegments:20});g.rotateX(-Math.PI/2);g.translate(0,b,0);return g;}
function tex(w,h,draw){const c=document.createElement('canvas');c.width=w;c.height=h;draw(c.getContext('2d'),w,h);const t=new THREE.CanvasTexture(c);t.colorSpace=THREE.SRGBColorSpace;t.anisotropy=8;return t;}
function rrect(g,x,y,w,h,r){g.beginPath();g.moveTo(x+r,y);g.arcTo(x+w,y,x+w,y+h,r);g.arcTo(x+w,y+h,x,y+h,r);g.arcTo(x,y+h,x,y,r);g.arcTo(x,y,x+w,y,r);g.closePath();}

const laptop=new THREE.Group();scene.add(laptop);
const base=new THREE.Mesh(slab(W,D,T,.11,.012),body);laptop.add(base);
// deck: only a hint of the keys, it mostly sits below the frame
const CW=2048,CH=Math.round(CW*D/W);
const deck=tex(CW,CH,(g,w,h)=>{g.clearRect(0,0,w,h);
 const kx=w*.105,kw=w*.79,ky=h*.115,kh=h*.4,gap=11;
 const rows=[[1.5,...Array(12).fill(1),1],[...Array(13).fill(1),1.5],[1.5,...Array(13).fill(1)],[1.8,...Array(11).fill(1),1.7],[2.3,...Array(10).fill(1),2.2],[1,1,1,1.25,5,1.25,1,3]];
 const hr=[.55,1,1,1,1,1],u=(kh-gap*5)/hr.reduce((a,b)=>a+b);let y=ky;g.fillStyle='#050506';
 rows.forEach((row,ri)=>{const kh2=u*hr[ri],sum=row.reduce((a,b)=>a+b,0),unit=(kw-gap*(row.length-1))/sum;let x=kx;for(const k of row){rrect(g,x,y,unit*k,kh2,7);g.fill();x+=unit*k+gap;}y+=kh2+gap;});
 const tw=w*.44,th=h*.32,tx=(w-tw)/2,ty=ky+kh+h*.075;g.strokeStyle='rgba(255,255,255,.08)';g.lineWidth=3;rrect(g,tx,ty,tw,th,22);g.stroke();});
const dk=new THREE.Mesh(new THREE.PlaneGeometry(W-.03,D-.03),new THREE.MeshStandardMaterial({map:deck,transparent:true,roughness:.9,metalness:0,envMapIntensity:.25,polygonOffset:true,polygonOffsetFactor:-2}));
dk.rotation.x=-Math.PI/2;dk.position.y=T+.0005;laptop.add(dk);
const HY=T+.004,HZ=-D/2+.035;
const hb=new THREE.Mesh(new THREE.CylinderGeometry(.026,.026,W*.82,24),new THREE.MeshStandardMaterial({color:0x111113,metalness:.5,roughness:.45}));hb.rotation.z=Math.PI/2;hb.position.set(0,HY,HZ);laptop.add(hb);
// lid
const hinge=new THREE.Group();hinge.position.set(0,HY,HZ);laptop.add(hinge);
const lidG=slab(W,H,LT,.1,.006);lidG.rotateX(Math.PI/2);lidG.translate(0,H/2,-LT);hinge.add(new THREE.Mesh(lidG,body));
const gl=new THREE.Mesh(new THREE.ShapeGeometry(rr(W-.018,H-.018,.095),16),glass);gl.position.set(0,H/2,.0008);hinge.add(gl);
const sg=new THREE.ShapeGeometry(rr(SW,SH,.03),12),pos=sg.attributes.position,uv=sg.attributes.uv;
for(let i=0;i<pos.count;i++)uv.setXY(i,pos.getX(i)/SW+.5,pos.getY(i)/SH+.5);
const smat=new THREE.MeshBasicMaterial({color:0x000000,toneMapped:false});
const scr=new THREE.Mesh(sg,smat);scr.position.set(0,CHIN+SH/2,.0016);hinge.add(scr);

// ── the page on the screen comes alive: photos slide into their blocks, the three icons draw themselves ──
// figma px of the landing page (viewport x 200–1720, y 0–988) to screen-plane coordinates
const sx=fx=>(fx-200)/1520*SW-SW/2,sy=fy=>CHIN+SH-fy/988*SH;
function layer(fx,fy,fw,fh,cw,ch,transparent){const c=document.createElement('canvas');c.width=cw;c.height=ch;const t=new THREE.CanvasTexture(c);t.colorSpace=THREE.SRGBColorSpace;t.anisotropy=8;
 const m=new THREE.Mesh(new THREE.PlaneGeometry(fw/1520*SW,fh/988*SH),new THREE.MeshBasicMaterial({map:t,color:0x000000,toneMapped:false,transparent:!!transparent}));
 m.position.set(sx(fx+fw/2),sy(fy+fh/2),.0024);hinge.add(m);return {c,g:c.getContext('2d'),t,m};}
const BLUE='rgb(35,91,214)',CARD='rgb(247,249,251)';
const IMS=['ph40','ph42','ph41'].map(k=>{const im=new Image();im.src=IMG[k];return im;});
// cur: the photo in the block (-1 = empty), nxt: the one sliding in; dir -1 enters from the top, 1 from the bottom
const PH=[{x:1014,y:76,dir:-1,at:2800},{x:1458,y:76,dir:-1,at:2950,tr:1},{x:1236,y:376,dir:1,at:3100}].map((p,i)=>({...p,...layer(p.x,p.y,222,300,444,600,p.tr),cur:-1,nxt:i,last:-1}));
function drawPhoto(p,e){if(Math.abs(e-p.last)<.001)return;p.last=e;const g=p.g;g.clearRect(0,0,444,600);g.save();
 if(p.tr){g.beginPath();g.roundRect(0,0,444,600,[0,48,0,0]);g.clip();}
 g.fillStyle=BLUE;g.fillRect(0,0,444,600);
 if(p.cur>=0)g.drawImage(IMS[p.cur],0,-p.dir*600*e,444,600);
 g.drawImage(IMS[p.nxt],0,p.dir*600*(1-e),444,600);g.restore();p.t.needsUpdate=true;}
// the Figma icons are images, so they are redrawn here as line art: [path, colour or 'fade' for a grey line that fades out to the left, width]
const K='#222',BL='#2490f4';
const IC=[{x:403.33,at:3300,s:[['M69 5.5h30v10.5H69z',K,2.2],['M84 16v9',K,2.2],['M43 44.5A55 55 0 1 1 43 114',K,2.2],['M85 79 117 60.5',BL,2.8],['M11 55H58','fade',2],['M2 80H48','fade',2],['M11 104H58','fade',2]]},
 {x:890,at:3550,s:[['M36 24.5A57.5 57.5 0 0 1 127.5 69',K,2.2],['M103 115A57.5 57.5 0 0 1 12.5 71',K,2.2],['M17.5 95 122 43','fade',1.8],['M36 62 70 118','fade',1.8],
  ['M61.5 13a8.5 8.5 0 1 0 17 0a8.5 8.5 0 1 0-17 0',K,2.2,1],['M113.5 43a8.5 8.5 0 1 0 17 0a8.5 8.5 0 1 0-17 0',K,2.2,1],['M9 95a8.5 8.5 0 1 0 17 0a8.5 8.5 0 1 0-17 0',K,2.2,1],['M61.5 127a8.5 8.5 0 1 0 17 0a8.5 8.5 0 1 0-17 0',K,2.2,1],
  ['M10 30H25',BL,2.4],['M4.5 36V50',BL,2.4],['M10 57H25',BL,2.4],['M31 36V50',BL,2.4],['M115 82H130',BL,2.4],['M109.5 88V102',BL,2.4],['M115 109H130',BL,2.4],['M136 88V102',BL,2.4]]},
 {x:1376.67,at:3800,s:[['M131 24V4.5H9V75C9 110 36 135 70 135C104 135 131 110 131 75V50',K,2.2],['M70 4.5V24',K,2.2],['M70 50V135',K,2.2],['M70 70H131',K,2.2],['M70 92H128.5',K,2.2],['M70 114H117',K,2.2],
  ['M70 32V41',BL,2.6],['M131 32V41',BL,2.6],['M76 26H125',BL,2.6],['M76 47.5H125',BL,2.6]]}];
const svgNS='http://www.w3.org/2000/svg',meas=document.createElementNS(svgNS,'path');
const ICL=IC.map(ic=>{const L=layer(ic.x,736,140,140,280,280);const parts=ic.s.map(([d,c,w,fill])=>{meas.setAttribute('d',d);return {p:new Path2D(d),len:meas.getTotalLength(),d,c,w,fill};});
 const tot=parts.reduce((a,b)=>a+b.len,0);return {...ic,...L,parts,tot,last:-1};});
function drawIcon(ic,e){if(Math.abs(e-ic.last)<.001)return;ic.last=e;const g=ic.g;g.setTransform(1,0,0,1,0,0);g.fillStyle=CARD;g.fillRect(0,0,280,280);g.setTransform(2,0,0,2,0,0);g.lineCap='round';g.lineJoin='round';
 let left=e*ic.tot;for(const q of ic.parts){if(left<=0)break;const n=Math.min(q.len,left);left-=q.len;
  if(q.fill){g.fillStyle=CARD;g.fill(q.p);}
  if(q.c==='fade'){const m=q.d.match(/[-\d.]+/g).map(Number),gr=g.createLinearGradient(m[0],m[1],m[2]??m[0],m[3]??m[1]);gr.addColorStop(0,'rgba(34,34,34,0)');gr.addColorStop(1,'rgba(34,34,34,.8)');g.strokeStyle=gr;}else g.strokeStyle=q.c;
  g.lineWidth=q.w;g.setLineDash([n,1e4]);g.stroke(q.p);}
 g.setLineDash([]);ic.t.needsUpdate=true;}
const LAY=[...PH,...ICL];
new THREE.TextureLoader().load(SRC,t=>{t.colorSpace=THREE.SRGBColorSpace;t.anisotropy=R.capabilities.getMaxAnisotropy();smat.map=t;smat.needsUpdate=true;ready();});

// the camera faces the open screen straight on: along the screen's normal, aimed at a point on the lid
const A1=100,th=THREE.MathUtils.degToRad(90-A1),U=new THREE.Vector3(0,Math.cos(th),Math.sin(th)),N=new THREE.Vector3(0,-Math.sin(th),Math.cos(th)),HP=new THREE.Vector3(0,HY,HZ);
const TAN=Math.tan(THREE.MathUtils.degToRad(11));let DIST=8,AIM=new THREE.Vector3();
// the lid takes about 82% of the frame height, its top just inside the frame; narrower frames fit by width
const YAW=-8;
// the lid takes about 87% of the frame height with its top just inside the frame, the keyboard runs off the bottom;
// the camera keeps facing the straight-on direction while the laptop is turned a little, which gives the angle
function fit(){const w=box.clientWidth,h=box.clientHeight;if(!w||!h)return;R.setSize(w,h,false);cam.aspect=w/h;cam.updateProjectionMatrix();
 const dt=Math.max(H/1.74,(W/2)/(.86*cam.aspect));DIST=dt/TAN;pose(A1,YAW,1,1);laptop.updateMatrixWorld(true);AIM.set(0,H-.9*dt,0);hinge.localToWorld(AIM);}
const P=new THREE.Vector3();
function pose(a,yaw,df,on){for(const l of LAY)l.m.material.color.setScalar(on);hinge.rotation.x=THREE.MathUtils.degToRad(90-a);laptop.rotation.y=THREE.MathUtils.degToRad(yaw);
 P.copy(AIM).addScaledVector(N,DIST*df);cam.position.copy(P);cam.up.copy(U);cam.lookAt(AIM);smat.color.setScalar(on);}
const ease=t=>t<.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2,out=t=>1-Math.pow(1-t,3),cl=t=>Math.min(1,Math.max(0,t)),lerp=(a,b,t)=>a+(b-a)*t;
const LEN=5100;let t0=0,done=false,started=false;
function draw(t){const pa=ease(cl((t-150)/2400)),pc=out(cl(t/3000)),on=cl((t-2450)/450);
 for(const p of PH)drawPhoto(p,out(cl((t-p.at)/750)));for(const ic of ICL)drawIcon(ic,ease(cl((t-ic.at)/1200)));
 pose(lerp(52,A1,pa),lerp(-26,YAW,pc),lerp(1.2,1,pc),on);R.render(scene,cam);}
function frame(now){const t=now-t0;draw(t);if(t<LEN)requestAnimationFrame(frame);else{done=true;for(const p of PH){p.cur=p.nxt;}queue(2400);}}
let vis=true,timer=0,busy=false;
function queue(ms){clearTimeout(timer);timer=vis&&!RM?setTimeout(swap,ms):0;}
function swap(){if(!vis||busy)return;busy=true;for(const p of PH){p.nxt=(p.cur+1)%3;p.last=-1;}const s0=performance.now();
 const f=now=>{const t=now-s0;PH.forEach((p,i)=>drawPhoto(p,ease(cl((t-i*170)/850))));R.render(scene,cam);
  if(t<850+2*170+40)requestAnimationFrame(f);else{for(const p of PH)p.cur=p.nxt;busy=false;queue(3200);}};requestAnimationFrame(f);}
new IntersectionObserver(es=>{vis=es[0].intersectionRatio>.3;if(vis&&done&&!busy&&!timer)queue(1500);if(!vis){clearTimeout(timer);timer=0;}},{threshold:[0,.3,.6]}).observe(box);
window.__qhAt=t=>{window.__qhHold=1;draw(t);};
function still(){draw(LEN+1);}
async function ready(){await Promise.all(IMS.map(im=>new Promise(r=>{if(im.complete&&im.naturalWidth)return r();im.onload=im.onerror=r;setTimeout(r,2500);})));fit();box.classList.add('qh-on');if(RM){done=true;still();return;}if(started)return;started=true;t0=performance.now();requestAnimationFrame(frame);}
new ResizeObserver(()=>{if(window.__qhHold)return;fit();if(done||!started)still();}).observe(box);
}}

}
