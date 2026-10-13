// three.js is passed in, so it loads only on this page.
export function tradelingHero(THREE, RoomEnvironment) {
// Hero: the three home screens turn in one by one while the camera pulls back,
// then rest side by side, facing front. Plays once.
const H=document.querySelector('.hv');
const SW=1,SH=1624/750,RS=.1,BW=1.08,BH=SH+.085,BD=.085,FOV=22,TAN=Math.tan(FOV/2*Math.PI/180);
const RM=matchMedia('(prefers-reduced-motion: reduce)').matches;
const clamp=x=>x<0?0:x>1?1:x,eo=x=>1-Math.pow(1-x,3),eio=x=>x<.5?4*x*x*x:1-Math.pow(-2*x+2,3)/2;
const LEN=3.9;

let renderer=null;
try{const c=document.createElement('canvas');if(c.getContext('webgl2')||c.getContext('webgl'))renderer=new THREE.WebGLRenderer({antialias:true,alpha:true});}catch(e){renderer=null}
if(H&&renderer)init();

function init(){
H.classList.add('gl');
renderer.setPixelRatio(Math.min(devicePixelRatio,2));renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.toneMapping=THREE.ACESFilmicToneMapping;
H.prepend(renderer.domElement);renderer.domElement.setAttribute('aria-hidden','true');
const scene=new THREE.Scene();scene.environment=new THREE.PMREMGenerator(renderer).fromScene(new RoomEnvironment(),.04).texture;scene.environmentIntensity=.7;
const cam=new THREE.PerspectiveCamera(FOV,1,.1,100);
const accent=()=>new THREE.Color(getComputedStyle(document.documentElement).getPropertyValue('--color-accent').trim()||'#D9A441');
const key=new THREE.DirectionalLight(0xffffff,1.5);key.position.set(2,3,6);scene.add(key);
const rim=new THREE.PointLight(accent(),6,16,1.4);rim.position.set(-3,2,-2);scene.add(rim);

function rr(w,h,r){const s=new THREE.Shape(),x=-w/2,y=-h/2;s.moveTo(x+r,y);s.lineTo(x+w-r,y);s.absarc(x+w-r,y+r,r,-Math.PI/2,0);s.lineTo(x+w,y+h-r);s.absarc(x+w-r,y+h-r,r,0,Math.PI/2);s.lineTo(x+r,y+h);s.absarc(x+r,y+h-r,r,Math.PI/2,Math.PI);s.lineTo(x,y+r);s.absarc(x+r,y+r,r,Math.PI,1.5*Math.PI);return s;}
function flat(w,h,r){const g=new THREE.ShapeGeometry(rr(w,h,r),16),p=g.attributes.position,uv=g.attributes.uv;for(let i=0;i<p.count;i++)uv.setXY(i,(p.getX(i)+w/2)/w,(p.getY(i)+h/2)/h);return g;}
function slab(w,h,r,d,b){const g=new THREE.ExtrudeGeometry(rr(w-2*b,h-2*b,r),{depth:d-2*b,bevelEnabled:true,bevelSize:b,bevelThickness:b,bevelSegments:5,curveSegments:24});g.translate(0,0,-(d-2*b)/2);return g;}

let dirty=true;
const tex=[...H.querySelectorAll('.hv-fb img')].map(im=>{const t=new THREE.Texture(im);t.colorSpace=THREE.SRGBColorSpace;t.anisotropy=renderer.capabilities.getMaxAnisotropy();const up=()=>{t.needsUpdate=true;dirty=true;};if(im.complete&&im.naturalWidth)up();else im.addEventListener('load',up);return t;});
const bodyMat=new THREE.MeshPhysicalMaterial({color:0x2a2b2f,metalness:.85,roughness:.34,clearcoat:.5,clearcoatRoughness:.25});
const glassMat=new THREE.MeshPhysicalMaterial({color:0x040405,roughness:.08,clearcoat:1});
const lensMat=new THREE.MeshPhysicalMaterial({color:0x0a0a0c,roughness:.05,metalness:.2,clearcoat:1});
const sc=document.createElement('canvas');sc.width=sc.height=128;{const x=sc.getContext('2d'),g=x.createRadialGradient(64,64,0,64,64,64);g.addColorStop(0,'rgba(0,0,0,.4)');g.addColorStop(1,'rgba(0,0,0,0)');x.fillStyle=g;x.fillRect(0,0,128,128);}
const shadowMat=new THREE.MeshBasicMaterial({map:new THREE.CanvasTexture(sc),transparent:true,depthWrite:false});

const phones=tex.map(t=>{const rig=new THREE.Group(),body=new THREE.Group();rig.add(body);
 body.add(new THREE.Mesh(slab(BW,BH,.15,BD,.018),bodyMat));
 const glass=new THREE.Mesh(flat(SW+.024,SH+.024,RS+.012),glassMat);glass.position.z=BD/2+.001;body.add(glass);
 const scr=new THREE.Mesh(flat(SW,SH,RS),new THREE.MeshBasicMaterial({map:t,toneMapped:false}));scr.position.z=BD/2+.003;body.add(scr);
 const bump=new THREE.Mesh(slab(.36,.36,.08,.03,.008),bodyMat);bump.position.set(-BW/2+.27,BH/2-.27,-BD/2-.012);body.add(bump);
 for(const [x,y] of [[-.08,.08],[.08,-.08],[-.08,-.08]]){const l=new THREE.Mesh(new THREE.CylinderGeometry(.055,.055,.02,32),lensMat);l.rotation.x=Math.PI/2;l.position.set(-BW/2+.27+x,BH/2-.27+y,-BD/2-.03);body.add(l);}
 const sh=new THREE.Mesh(new THREE.PlaneGeometry(1.7,.4),shadowMat.clone());sh.rotation.x=-Math.PI/2;sh.position.y=-BH/2-.12;rig.add(sh);
 rig.userData={body,shadow:sh};scene.add(rig);return rig;});

const labs=H.querySelector('.hv-labs'),lab=[...labs.querySelectorAll('span')],line=H.querySelector('.hv-line');
let W=1,Hh=1,narrow=false,D=8,F=[],t=0,raf=0,last=0,started=false;
// resting layout: side by side on desktop; on a phone, a tight fan with IR in front
function layout(){const a=W/Hh;narrow=a<1;
 if(!narrow){const SP=BW*1.1;F=[-SP,0,SP].map(x=>({x,z:0,ry:0}));
  D=Math.max(((2*SP+BW)/.93)/(2*TAN*a),(BH/.8)/(2*TAN));}
 else{const SP=BW*.6;F=[{x:-SP,z:-.35,ry:.22},{x:0,z:.2,ry:0},{x:SP,z:-.35,ry:-.22}];
  D=Math.max(((2*SP+BW*1.15)/.94)/(2*TAN*a),(BH/.8)/(2*TAN));}}
const LOOK=()=>new THREE.Vector3(0,narrow?-.06:-.14,0);

function update(){
 if(!F.length)return;
 phones.forEach((P,i)=>{const f=F[i],t0=.15+i*.7,p=clamp((t-t0)/1.35),e=eo(p);
  P.visible=p>0;P.position.set(f.x,0,f.z-(1-e)*.35);
  P.userData.body.rotation.set(0,f.ry-(1-e)*Math.PI/2,0);
  P.userData.shadow.material.opacity=e;});
 // camera: starts close on the Grocery phone, pulls back to the full set
 const m=eio(clamp(t/LEN)),fin=new THREE.Vector3(0,.12,D),tg=LOOK();
 const s0=new THREE.Vector3(F[0].x*.45,.08,D*.86),tg0=new THREE.Vector3(F[0].x*.45,-.03,0);
 cam.position.lerpVectors(s0,fin,m);cam.lookAt(tg0.lerp(tg,m));cam.updateMatrixWorld();
 labs.classList.toggle('on',t>=LEN-.4);if(line)line.classList.toggle('on',t>=LEN-.4);
 const v=new THREE.Vector3();
 let low=0;
 phones.forEach((P,i)=>{v.set(F[i].x,-BH/2-.16,F[i].z).project(cam);const y=(1-v.y)/2*Hh;low=Math.max(low,y);lab[i].style.transform=`translate(${(v.x+1)/2*W}px,${y}px) translateX(-50%)`;});
 // the line always sits under the labels, wherever the camera puts them
 if(line)line.style.top=Math.min(Hh-24,low+(narrow?4:30))+'px';
}
function render(){update();renderer.render(scene,cam);dirty=false;}
function frame(now){const dt=last?Math.min((now-last)/1000,.05):0;last=now;t=Math.min(t+dt,LEN);render();
 if(t<LEN)raf=requestAnimationFrame(frame);else{raf=0;last=0;}}
function play(){t=0;started=true;if(RM){t=LEN;dirty=true;return;}if(!raf){last=0;raf=requestAnimationFrame(frame);}}
setInterval(()=>{if(!raf&&dirty)render();},200);
new ResizeObserver(([e])=>{W=e.contentRect.width;Hh=e.contentRect.height;renderer.setSize(W,Hh,false);cam.aspect=W/Hh;cam.updateProjectionMatrix();layout();dirty=true;}).observe(H);
{const r=H.getBoundingClientRect();W=r.width;Hh=r.height;renderer.setSize(W,Hh,false);cam.aspect=W/Hh;cam.updateProjectionMatrix();layout();}
play();
new MutationObserver(()=>{rim.color.copy(accent());dirty=true;}).observe(document.documentElement,{attributes:true,attributeFilter:['data-theme']});
window.__hv={get t(){return t},set t(v){t=v;dirty=true}};
}
}
