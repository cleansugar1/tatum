// ============================================================
// STARS
// ============================================================
(function(){
  const c=document.getElementById('stars');
  for(let i=0;i<80;i++){
    const s=document.createElement('div');s.className='star';
    s.style.cssText=`left:${Math.random()*100}%;top:${Math.random()*100}%;width:${Math.random()*2+1}px;height:${s.style.width};--d:${(Math.random()*4+2).toFixed(1)}s;--o:${(Math.random()*.7+.2).toFixed(2)};animation-delay:${(Math.random()*4).toFixed(1)}s`;
    c.appendChild(s);
  }
})();

// ============================================================
// AUDIO ENGINE — sound effects only, no music
// ============================================================
let audioCtx=null;
function getAudio(){
  if(!audioCtx) audioCtx=new(window.AudioContext||window.webkitAudioContext)();
  if(audioCtx.state==='suspended') audioCtx.resume();
  return audioCtx;
}
function beep(freq,dur=0.1,type='square',vol=0.18,delay=0){
  try{
    const ctx=getAudio();
    const o=ctx.createOscillator(),g=ctx.createGain();
    o.connect(g);g.connect(ctx.destination);
    o.type=type;o.frequency.setValueAtTime(freq,ctx.currentTime+delay);
    g.gain.setValueAtTime(vol,ctx.currentTime+delay);
    g.gain.exponentialRampToValueAtTime(0.001,ctx.currentTime+delay+dur);
    o.start(ctx.currentTime+delay);o.stop(ctx.currentTime+delay+dur+0.01);
  }catch(e){}
}
function playJump(){ beep(300,0.07,'sine',0.25);beep(500,0.05,'sine',0.2,0.06); }
function playHit(){ beep(80,0.15,'sawtooth',0.3);beep(60,0.1,'sawtooth',0.2,0.1); }
function playDiamond(){ beep(800,0.05,'sine',0.2);beep(1000,0.05,'sine',0.2,0.05);beep(1200,0.07,'sine',0.2,0.1); }
function playWhack(){ beep(400,0.04,'square',0.25);beep(200,0.08,'square',0.2,0.03); }
function playMiss(){ beep(150,0.1,'sawtooth',0.2); }
function playCraft(){ [500,600,800,1000].forEach((f,i)=>beep(f,0.1,'sine',0.2,i*0.07)); }
function playCorrect(){ beep(600,0.07,'sine',0.2);beep(800,0.09,'sine',0.2,0.07); }
function playWrong(){ beep(200,0.14,'sawtooth',0.25); }
function playGameOver(){ beep(300,0.1,'sawtooth',0.3);beep(200,0.15,'sawtooth',0.3,0.1);beep(100,0.25,'sawtooth',0.3,0.22); }
function playCombo(){ beep(700,0.05,'sine',0.2);beep(900,0.05,'sine',0.2,0.05);beep(1100,0.07,'sine',0.25,0.1); }
function playWin(){ [500,600,700,800,900,1000,1100].forEach((f,i)=>beep(f,0.15,'sine',0.25,i*0.08)); }
function playBossHit(){ beep(500,0.04,'square',0.22);beep(300,0.07,'square',0.18,0.03); }
function playBossAttack(){ beep(100,0.18,'sawtooth',0.3);beep(80,0.18,'sawtooth',0.25,0.1); }
function playShield(){ beep(800,0.09,'sine',0.2);beep(600,0.07,'sine',0.15,0.07); }
function playHeal(){ beep(600,0.07,'sine',0.2);beep(700,0.05,'sine',0.2,0.06);beep(800,0.07,'sine',0.2,0.12); }
function playSecretUnlock(){ [300,400,500,600,700,800,900,1000,1100,1200].forEach((f,i)=>beep(f,0.1,'sine',0.2,i*0.06)); }
function playGlass(stage){
  if(stage===1){ beep(400,0.1,'square',0.2);beep(300,0.08,'sawtooth',0.15,0.08); }
  else if(stage===2){ beep(250,0.15,'sawtooth',0.25);beep(180,0.12,'sawtooth',0.2,0.1); }
  else { beep(100,0.3,'sawtooth',0.4);beep(80,0.25,'sawtooth',0.35,0.1);beep(150,0.2,'sawtooth',0.3,0.2); }
}
// Shooter sounds
function playShootFire(){ beep(600,0.03,'square',0.2);beep(400,0.04,'square',0.15,0.02); }
function playShootHit(){ beep(300,0.05,'square',0.3);beep(500,0.04,'square',0.25,0.04);beep(200,0.06,'square',0.2,0.07); }
function playShootMiss(){ beep(200,0.08,'sine',0.15);beep(150,0.1,'sine',0.1,0.07); }
// Mining layer sounds
function playMineBlock(layerIdx){
  const sounds=[
    ()=>{ beep(120,0.08,'sine',0.2);beep(100,0.1,'sine',0.15,0.06); }, // dirt - soft thud
    ()=>{ beep(180,0.06,'square',0.18);beep(220,0.05,'square',0.15,0.04);beep(160,0.07,'square',0.12,0.08); }, // gravel - crunch
    ()=>{ beep(250,0.08,'square',0.2);beep(200,0.06,'square',0.15,0.06); }, // wood - hollow knock
    ()=>{ beep(350,0.06,'sawtooth',0.22);beep(280,0.08,'sawtooth',0.18,0.05); }, // stone - hard clunk
    ()=>{ beep(150,0.1,'sawtooth',0.22);beep(120,0.08,'sawtooth',0.18,0.08); }, // coal - deep crack
    ()=>{ beep(500,0.05,'square',0.2);beep(600,0.04,'square',0.15,0.04);beep(400,0.06,'sawtooth',0.12,0.07); }, // iron - metallic clang
    ()=>{ beep(800,0.05,'sine',0.2);beep(1000,0.04,'sine',0.18,0.04);beep(700,0.06,'sine',0.15,0.08); }, // gold - bright ring
    ()=>{ beep(1200,0.04,'sine',0.2);beep(1400,0.04,'sine',0.18,0.04);beep(1600,0.05,'sine',0.15,0.08); }, // diamond - crystal ping
    ()=>{ beep(60,0.2,'sawtooth',0.35);beep(50,0.18,'sawtooth',0.3,0.1); }, // obsidian - deep boom
    ()=>{ beep(80,0.15,'sawtooth',0.3);beep(100,0.1,'sawtooth',0.25,0.08);beep(60,0.12,'sine',0.2,0.15); }, // nether - dark eerie
  ];
  const fn=sounds[Math.min(layerIdx,sounds.length-1)];
  if(fn) fn();
}

// ============================================================
// CONFETTI
// ============================================================
let confettiParts=[];
function launchConfetti(){
  const canvas=document.getElementById('confetti-canvas');
  canvas.width=window.innerWidth;canvas.height=window.innerHeight;
  const colors=['#ff2d78','#00d4ff','#ffe600','#39ff14','#bf5fff','#ff7b00'];
  for(let i=0;i<120;i++) confettiParts.push({x:Math.random()*canvas.width,y:-10,vx:(Math.random()-.5)*6,vy:Math.random()*4+2,color:colors[Math.floor(Math.random()*colors.length)],size:Math.random()*10+5,rot:Math.random()*360,rotV:Math.random()*8-4,alpha:1});
  animConf();
}
function animConf(){
  const canvas=document.getElementById('confetti-canvas');const ctx=canvas.getContext('2d');
  ctx.clearRect(0,0,canvas.width,canvas.height);
  confettiParts=confettiParts.filter(p=>p.alpha>0.01);
  confettiParts.forEach(p=>{p.x+=p.vx;p.y+=p.vy;p.rot+=p.rotV;p.vy+=0.1;p.alpha-=0.008;ctx.save();ctx.globalAlpha=p.alpha;ctx.fillStyle=p.color;ctx.translate(p.x,p.y);ctx.rotate(p.rot*Math.PI/180);ctx.fillRect(-p.size/2,-p.size/4,p.size,p.size/2);ctx.restore();});
  if(confettiParts.length) requestAnimationFrame(animConf);
  else ctx.clearRect(0,0,canvas.width,canvas.height);
}
function showCombo(txt){
  const el=document.createElement('div');el.className='combo-pop';el.textContent=txt;
  document.body.appendChild(el);setTimeout(()=>el.remove(),900);
}

// ============================================================
// NAV
// ============================================================
let activeCleanup=null;
function goGame(id,initFn){
  if(activeCleanup){activeCleanup();activeCleanup=null;}
  document.querySelectorAll('.screen').forEach(s=>s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  if(initFn) initFn();
}
function goHome(){
  if(activeCleanup){activeCleanup();activeCleanup=null;}
  document.querySelectorAll('.screen').forEach(s=>s.classList.remove('active'));
  document.getElementById('home-screen').classList.add('active');
}

// ============================================================
// MATH PASSWORD
// ============================================================
let mathAnswer=0;
const MATH_TYPES=['add','sub','mult'];
// Avoid numbers 6,7,69,21 in questions
function safeNum(min,max,avoid=[]){
  let n;
  const bad=[...avoid,6,7,21,69];
  do{ n=Math.floor(Math.random()*(max-min+1))+min; }while(bad.includes(n));
  return n;
}
function genMathQuestion(){
  const type=MATH_TYPES[Math.floor(Math.random()*MATH_TYPES.length)];
  let q='',ans=0;
  if(type==='add'){
    const a=safeNum(12,55),b=safeNum(12,55);
    q=`${a} + ${b} = ?`;ans=a+b;
  } else if(type==='sub'){
    const a=safeNum(25,80),b=safeNum(5,20);
    q=`${a} - ${b} = ?`;ans=a-b;
  } else {
    const a=safeNum(2,12,[]),b=safeNum(2,12,[]);
    q=`${a} × ${b} = ?`;ans=a*b;
  }
  mathAnswer=ans;
  document.getElementById('pw-math-q').textContent=q;
  document.getElementById('pw-hint').textContent='';
  document.getElementById('pw-err').style.display='none';
  document.getElementById('pw-input').value='';
}
genMathQuestion();
document.getElementById('pw-input').addEventListener('keydown',e=>{if(e.key==='Enter') checkPw();});
function checkPw(){
  const v=parseInt(document.getElementById('pw-input').value);
  if(v===mathAnswer){
    // Show glass shatter screen
    document.querySelectorAll('.screen').forEach(s=>s.classList.remove('active'));
    document.getElementById('glass-screen').classList.add('active');
    initGlass();
    fetchGreeting();
    initSecretClues();
  } else {
    document.getElementById('pw-err').style.display='block';
    document.getElementById('pw-input').value='';
    document.getElementById('pw-hint').textContent=`Hint: the answer is between ${mathAnswer-5} and ${mathAnswer+5}`;
    playWrong();
  }
}

// ============================================================
// SCRATCHPAD
// ============================================================
let scratchColor='#ffffff',scratchSize=3,scratchDrawing=false;
function initScratch(){
  const canvas=document.getElementById('scratch-canvas');if(!canvas)return;
  const ctx=canvas.getContext('2d');ctx.lineCap='round';ctx.lineJoin='round';
  function getPos(e){const rect=canvas.getBoundingClientRect();const scaleX=canvas.width/rect.width,scaleY=canvas.height/rect.height;const src=e.touches?e.touches[0]:e;return{x:(src.clientX-rect.left)*scaleX,y:(src.clientY-rect.top)*scaleY};}
  const startDraw=e=>{e.preventDefault();scratchDrawing=true;const p=getPos(e);ctx.beginPath();ctx.moveTo(p.x,p.y);};
  const draw=e=>{e.preventDefault();if(!scratchDrawing)return;const p=getPos(e);ctx.strokeStyle=scratchColor;ctx.lineWidth=scratchSize;ctx.lineTo(p.x,p.y);ctx.stroke();};
  const endDraw=()=>{scratchDrawing=false;};
  canvas.addEventListener('mousedown',startDraw);canvas.addEventListener('mousemove',draw);canvas.addEventListener('mouseup',endDraw);canvas.addEventListener('mouseleave',endDraw);
  canvas.addEventListener('touchstart',startDraw,{passive:false});canvas.addEventListener('touchmove',draw,{passive:false});canvas.addEventListener('touchend',endDraw);
}
function setScratchColor(c,el){scratchColor=c;document.querySelectorAll('.scratch-color').forEach(b=>b.classList.remove('active'));el.classList.add('active');}
function setScratchSize(s,el){scratchSize=s;document.querySelectorAll('.size-dot').forEach(b=>b.classList.remove('active'));el.classList.add('active');}
function clearScratch(){const canvas=document.getElementById('scratch-canvas');if(canvas){canvas.getContext('2d').clearRect(0,0,canvas.width,canvas.height);}}

// ============================================================
// GLASS SHATTER
// ============================================================
let glassTaps=0,glassCtx=null,glassCracks=[];
function initGlass(){
  glassTaps=0;glassCracks=[];
  const canvas=document.getElementById('glass-canvas');
  canvas.width=window.innerWidth;canvas.height=window.innerHeight;
  glassCtx=canvas.getContext('2d');
  drawGlass();
  document.getElementById('glass-hint').textContent='TAP TO CRACK THE GLASS ✊';
}
function drawGlass(){
  const canvas=document.getElementById('glass-canvas');
  const ctx=glassCtx;const W=canvas.width,H=canvas.height;
  ctx.clearRect(0,0,W,H);
  // Frosted glass background
  const grad=ctx.createLinearGradient(0,0,W,H);
  grad.addColorStop(0,'rgba(0,180,255,0.18)');grad.addColorStop(1,'rgba(0,100,180,0.12)');
  ctx.fillStyle=grad;ctx.fillRect(0,0,W,H);
  // Glass sheen
  ctx.fillStyle='rgba(255,255,255,0.06)';ctx.fillRect(0,0,W,H/2);
  // Draw cracks
  ctx.strokeStyle='rgba(255,255,255,0.9)';ctx.lineWidth=2;
  glassCracks.forEach(crack=>{
    crack.lines.forEach(line=>{
      ctx.beginPath();ctx.moveTo(line.x1,line.y1);ctx.lineTo(line.x2,line.y2);ctx.stroke();
      // Secondary cracks
      ctx.lineWidth=1;ctx.strokeStyle='rgba(255,255,255,0.5)';
      line.subs&&line.subs.forEach(s=>{ctx.beginPath();ctx.moveTo(s.x1,s.y1);ctx.lineTo(s.x2,s.y2);ctx.stroke();});
      ctx.lineWidth=2;ctx.strokeStyle='rgba(255,255,255,0.9)';
    });
  });
  // Tatum's Zone text visible through glass
  ctx.fillStyle='rgba(255,230,0,0.4)';ctx.font='bold 48px Boogaloo, sans-serif';ctx.textAlign='center';ctx.textBaseline='middle';
  ctx.fillText("TATUM'S ZONE 🎮",W/2,H/2);
}
function generateCrack(cx,cy,W,H,count){
  const lines=[];const numRays=8+count*4;
  for(let i=0;i<numRays;i++){
    const angle=(Math.PI*2/numRays)*i+Math.random()*0.4;
    const len=60+Math.random()*(120+count*60);
    const x2=cx+Math.cos(angle)*len,y2=cy+Math.sin(angle)*len;
    const subs=[];
    // Add sub-cracks
    for(let j=0;j<3;j++){
      const t=0.3+Math.random()*0.5;
      const sx=cx+(x2-cx)*t,sy=cy+(y2-cy)*t;
      const sa=angle+(Math.random()-.5)*1.5;const sl=20+Math.random()*50;
      subs.push({x1:sx,y1:sy,x2:sx+Math.cos(sa)*sl,y2:sy+Math.sin(sa)*sl});
    }
    lines.push({x1:cx,y1:cy,x2,y2,subs});
  }
  return{cx,cy,lines};
}
function tapGlass(){
  glassTaps++;
  const canvas=document.getElementById('glass-canvas');
  const W=canvas.width,H=canvas.height;
  const cx=W*0.3+Math.random()*W*0.4,cy=H*0.25+Math.random()*H*0.5;
  glassCracks.push(generateCrack(cx,cy,W,H,glassTaps));
  playGlass(glassTaps);
  drawGlass();
  const hint=document.getElementById('glass-hint');
  if(glassTaps===1) hint.textContent='KEEP GOING! TAP AGAIN! 💥';
  else if(glassTaps===2) hint.textContent='ONE MORE! BREAK IT! 🔨';
  else if(glassTaps>=3){
    hint.textContent='';
    // Shatter animation
    shatterGlass();
  }
}
function shatterGlass(){
  const canvas=document.getElementById('glass-canvas');
  const ctx=glassCtx;const W=canvas.width,H=canvas.height;
  let alpha=1;
  function anim(){
    ctx.clearRect(0,0,W,H);
    ctx.globalAlpha=alpha;
    drawGlass();
    ctx.globalAlpha=1;
    // White flash
    ctx.fillStyle=`rgba(255,255,255,${(1-alpha)*0.8})`;
    ctx.fillRect(0,0,W,H);
    alpha-=0.06;
    if(alpha>0) requestAnimationFrame(anim);
    else {
      // Go home
      document.querySelectorAll('.screen').forEach(s=>s.classList.remove('active'));
      document.getElementById('home-screen').classList.add('active');
    }
  }
  anim();
}

// ============================================================
// GREETING
// ============================================================
async function fetchGreeting(){
  const box=document.getElementById('greeting');
  const fallbacks=["YO TATUM, the legend returns! 🔥","TATUM IS IN THE CHAT! 🎮","Welcome back king Tatum! 👑","TATUM DETECTED 🚨 Let's gooo! 💪","The brainrot king has arrived! 🦈"];
  try{
    const r=await fetch('/api/greeting',{method:'POST',headers:{'Content-Type':'application/json'}});
    const d=await r.json();box.textContent=d.greeting||fallbacks[0];
  }catch{box.textContent=fallbacks[Math.floor(Math.random()*fallbacks.length)];}
}

// ============================================================
// SECRET CODE — 5 clues, kid-friendly, no bad numbers
// ============================================================
let secretCode='';
const CLUE_POOL=[
  {clue:"The first letter of your first name",ans:'T'},
  {clue:"How many fingers on BOTH hands",ans:'10'},
  {clue:"How many legs does a dog have",ans:'4'},
  {clue:"How many wheels does a bike have",ans:'2'},
  {clue:"How many sides does a triangle have",ans:'3'},
  {clue:"How many eyes do you have",ans:'2'},
  {clue:"How many toes on ONE foot",ans:'5'},
  {clue:"How many letters in the word CAT",ans:'3'},
  {clue:"How many sides on a square",ans:'4'},
  {clue:"2 × 4",ans:'8'},
  {clue:"10 - 2",ans:'8'},
  {clue:"3 + 5",ans:'8'},
  {clue:"How many legs does a spider have",ans:'8'},
  {clue:"How many months in a year",ans:'12'},
  {clue:"How many hours in half a day",ans:'12'},
  {clue:"How many players on a basketball team",ans:'5'},
  {clue:"The last letter of the word GAME",ans:'E'},
  {clue:"The first letter of MINECRAFT",ans:'M'},
  {clue:"How many wheels on a tricycle",ans:'3'},
  {clue:"2 + 2",ans:'4'},
];
function initSecretClues(){
  const shuffled=[...CLUE_POOL].sort(()=>Math.random()-.5).slice(0,5);
  secretCode=shuffled.map(c=>c.ans).join('');
  const container=document.getElementById('secret-clues');
  container.innerHTML=shuffled.map((c,i)=>`
    <div class="clue-badge">
      <span class="clue-num">${i+1}.</span>
      <span>${c.clue} = <strong style="color:var(--yellow)">?</strong></span>
    </div>`).join('');
  document.getElementById('secret-feedback').textContent='';
  document.getElementById('secret-input').value='';
}
function checkSecretCode(){
  const val=document.getElementById('secret-input').value.trim().toUpperCase();
  const fb=document.getElementById('secret-feedback');
  if(val===secretCode.toUpperCase()){
    fb.innerHTML='<span style="color:var(--green)">✅ CODE CRACKED! Unlocking secret game... 🎉</span>';
    playSecretUnlock();launchConfetti();
    setTimeout(()=>goGame('boss-screen',initBoss),1800);
  } else {
    fb.innerHTML='<span style="color:var(--pink)">❌ Not quite... put all answers together with no spaces!</span>';
    playWrong();
  }
}

// ============================================================
// LEADERBOARD UTILS
// ============================================================
function getLB(key){try{return JSON.parse(localStorage.getItem(key)||'[]');}catch{return[];}}
function saveLB(key,entries){localStorage.setItem(key,JSON.stringify(entries.slice(0,8)));}
function addToLB(key,name,score){const lb=getLB(key);lb.push({name,score});lb.sort((a,b)=>b.score-a.score);saveLB(key,lb);return lb;}
function renderLB(containerId,key,color){
  const lb=getLB(key);const el=document.getElementById(containerId);if(!el)return;
  if(!lb.length){el.innerHTML='<div class="lb-empty">No scores yet!</div>';return;}
  el.innerHTML=lb.slice(0,8).map((e,i)=>`<div class="lb-entry"><span class="lb-rank">${i+1}.</span><span class="lb-name">${e.name}</span><span style="color:${color||'var(--text)'};font-weight:700;font-size:.8rem">${e.score}</span></div>`).join('');
}

// ============================================================
// DODGE OR DIE
// ============================================================
let dodgeRAF=null,dodgeRunning=false;
function initDodge(){renderLB('dodge-lb','dodge-lb','var(--pink)');document.getElementById('dodge-overlay').style.display='flex';document.getElementById('d-score').textContent='0';document.getElementById('d-diamonds').textContent='0';document.getElementById('d-lives').textContent='❤️❤️❤️';}
function startDodge(){
  const ov=document.getElementById('dodge-overlay');
  ov.innerHTML=`<h2 style="color:var(--pink)">Enter Your Name</h2><input class="name-prompt-input" id="dodge-name-input" value="Tatum" maxlength="16"><button class="gbtn gbtn-pink" style="margin-top:8px" onclick="launchDodge()">GO! 🚀</button>`;
  document.getElementById('dodge-name-input').focus();document.getElementById('dodge-name-input').select();
}
function launchDodge(){
  const name=document.getElementById('dodge-name-input')?.value.trim()||'Tatum';
  document.getElementById('dodge-overlay').style.display='none';
  if(dodgeRAF)cancelAnimationFrame(dodgeRAF);
  dodgeRunning=true;
  const canvas=document.getElementById('dodge-canvas');const ctx=canvas.getContext('2d');
  const W=canvas.width,H=canvas.height;
  let score=0,diamonds=0,lives=3,frame=0,invincible=0,playerX=W/2-20;
  const pW=40,pH=40,pSpeed=8;let mouseX=W/2;const keys={};const enemies=[],gems=[];
  const ENEMIES=['💣','👾','💥','🕷️','💀','🪲'];
  const onKey=e=>{keys[e.code]=e.type==='keydown';};
  const onMouse=e=>{const r=canvas.getBoundingClientRect();mouseX=(e.clientX-r.left)*(W/r.width);};
  const onTouch=e=>{e.preventDefault();const r=canvas.getBoundingClientRect();mouseX=(e.touches[0].clientX-r.left)*(W/r.width);};
  window.addEventListener('keydown',onKey);window.addEventListener('keyup',onKey);
  canvas.addEventListener('mousemove',onMouse);canvas.addEventListener('touchmove',onTouch,{passive:false});
  function livesStr(){return'❤️'.repeat(Math.max(0,lives))+'🖤'.repeat(Math.max(0,3-lives));}
  activeCleanup=()=>{dodgeRunning=false;cancelAnimationFrame(dodgeRAF);window.removeEventListener('keydown',onKey);window.removeEventListener('keyup',onKey);};
  function loop(){
    if(!dodgeRunning)return;dodgeRAF=requestAnimationFrame(loop);frame++;
    const useKeys=keys['ArrowLeft']||keys['ArrowRight'];
    if(useKeys){if(keys['ArrowLeft'])playerX-=pSpeed;if(keys['ArrowRight'])playerX+=pSpeed;}
    else{playerX+=(mouseX-playerX-pW/2)*0.18;}
    playerX=Math.max(0,Math.min(W-pW,playerX));
    const sr=Math.max(22,55-Math.floor(score/300));
    if(frame%sr===0)enemies.push({x:Math.random()*(W-32),y:-32,w:32,h:32,speed:2+Math.random()*(2+score/600),emoji:ENEMIES[Math.floor(Math.random()*ENEMIES.length)]});
    if(frame%240===0)gems.push({x:Math.random()*(W-28),y:-28,w:28,h:28,speed:1.2+Math.random()*.8});
    for(let i=enemies.length-1;i>=0;i--){
      enemies[i].y+=enemies[i].speed;
      if(enemies[i].y>H){enemies.splice(i,1);continue;}
      if(invincible<=0){const e=enemies[i];if(e.x<playerX+pW&&e.x+e.w>playerX&&e.y<H-20&&e.y+e.h>H-20-pH){lives--;invincible=90;enemies.splice(i,1);document.getElementById('d-lives').textContent=livesStr();playHit();if(lives<=0){dodgeOver();return;}}}
    }
    if(invincible>0)invincible--;
    for(let i=gems.length-1;i>=0;i--){
      gems[i].y+=gems[i].speed;
      if(gems[i].y>H){gems.splice(i,1);continue;}
      const g=gems[i];
      if(g.x<playerX+pW&&g.x+g.w>playerX&&g.y<H-20&&g.y+g.h>H-20-pH){diamonds++;score+=50;gems.splice(i,1);document.getElementById('d-diamonds').textContent=diamonds;playDiamond();}
    }
    score++;document.getElementById('d-score').textContent=score;
    ctx.clearRect(0,0,W,H);
    ctx.strokeStyle='rgba(255,45,120,0.04)';ctx.lineWidth=1;
    for(let gx=0;gx<W;gx+=40){ctx.beginPath();ctx.moveTo(gx,0);ctx.lineTo(gx,H);ctx.stroke();}
    for(let gy=0;gy<H;gy+=40){ctx.beginPath();ctx.moveTo(0,gy);ctx.lineTo(W,gy);ctx.stroke();}
    ctx.save();if(invincible>0&&Math.floor(invincible/8)%2===0)ctx.globalAlpha=0.3;
    ctx.font=`${pW}px serif`;ctx.textBaseline='top';ctx.fillText('🧍',playerX,H-20-pH);ctx.restore();
    ctx.textBaseline='top';
    enemies.forEach(e=>{ctx.font=`${e.w}px serif`;ctx.fillText(e.emoji,e.x,e.y);});
    gems.forEach(g=>{ctx.font=`${g.w}px serif`;ctx.fillText('💎',g.x,g.y);});
  }
  function dodgeOver(){
    dodgeRunning=false;cancelAnimationFrame(dodgeRAF);window.removeEventListener('keydown',onKey);window.removeEventListener('keyup',onKey);
    playGameOver();addToLB('dodge-lb',name,score);renderLB('dodge-lb','dodge-lb','var(--pink)');
    const ov=document.getElementById('dodge-overlay');ov.style.display='flex';
    ov.innerHTML=`<h2 style="color:var(--pink)">💀 GAME OVER</h2><p>Score: <strong style="color:var(--pink)">${score}</strong> | 💎 ${diamonds}</p><button class="gbtn gbtn-pink" onclick="startDodge()">PLAY AGAIN 🔄</button>`;
  }
  loop();
}

// ============================================================
// BIG BRAIN QUIZ
// ============================================================
const ALL_QUESTIONS=[
  {q:"What is the hardest block in Minecraft?",o:["Obsidian","Bedrock","Crying Obsidian","Ancient Debris"],a:1},
  {q:"What do you use to make a Crafting Table?",o:["2 wood planks","4 wood planks","8 wood planks","1 log"],a:1},
  {q:"What ore glows in the dark in Minecraft?",o:["Redstone","Lapis Lazuli","Glowstone","Nether Quartz"],a:2},
  {q:"What is Minecraft's main trading currency?",o:["Gold","Diamonds","Emeralds","Iron"],a:2},
  {q:"What tool is best for mining stone?",o:["Axe","Shovel","Pickaxe","Sword"],a:2},
  {q:"What drops from a skeleton?",o:["Gunpowder","Bones & arrows","String","Leather"],a:1},
  {q:"What do you need to enter The Nether?",o:["Diamond key","Obsidian portal","Iron door","Ender pearl"],a:1},
  {q:"What is the name of Minecraft's final boss?",o:["Wither","Elder Guardian","Ender Dragon","Shulker"],a:2},
  {q:"What animal gives you wool in Minecraft?",o:["Pig","Cow","Sheep","Chicken"],a:2},
  {q:"Which Minecraft mob explodes?",o:["Zombie","Skeleton","Creeper","Spider"],a:2},
  {q:"What structure spawns in the ocean in Minecraft?",o:["Ocean Temple","Ocean Monument","Water Castle","Deep Ruin"],a:1},
  {q:"What does Silk Touch do?",o:["Makes blocks sparkle","Lets you mine blocks without breaking","Makes tools sharper","Gives extra drops"],a:1},
  {q:"Which animal can you ride in Minecraft?",o:["Cow","Wolf","Horse","Parrot"],a:2},
  {q:"What is Roblox's in-game currency called?",o:["Gems","Coins","Robux","Credits"],a:2},
  {q:"Who created Roblox?",o:["Mojang","David Baszucki and Erik Cassel","Microsoft","Notch"],a:1},
  {q:"What language do Roblox games use?",o:["JavaScript","Python","Lua","C++"],a:2},
  {q:"What building tool do Roblox developers use?",o:["Roblox Builder","Roblox Studio","Dev Console","Lua Editor"],a:1},
  {q:"In 'Adopt Me', what is the rarest pet type?",o:["Legendary","Mythic","Ultra Rare","Ancient"],a:0},
  {q:"What game on Roblox lets you be a fruit devil?",o:["Blox Fruits","Fruit Wars","Devil Fruits","Roblox One Piece"],a:0},
  {q:"In 'Tower of Hell', what is the main goal?",o:["Defeat the boss","Reach the top of an obby","Kill enemies","Collect stars"],a:1},
  {q:"What is the goal in 'Murder Mystery 2'?",o:["Find treasure","Survive or eliminate players","Build the biggest house","Race to the finish"],a:1},
  {q:"In 'Jailbreak', which team tries to escape?",o:["Police","Criminals","Guards","Bounty Hunters"],a:1},
  {q:"What Roblox game has you roleplaying as a family?",o:["MeepCity","Blox Fruits","Adopt Me","Work at a Pizza Place"],a:2},
  {q:"What does 'obby' stand for in Roblox?",o:["Object obstacle","Obstacle course","Open building","Official battle"],a:1},
  {q:"In 'Piggy', what is the main threat?",o:["A giant pig chasing you","A zombie","A ghost","A robot"],a:0},
  {q:"Which brainrot character is a shark?",o:["Bombardiro Crocodilo","Tralalero Tralala","Tung Tung Tung Sahur","Brrr Brrr Patapim"],a:1},
  {q:"Which brainrot character is a crocodile?",o:["Tralalero Tralala","Bombardiro Crocodilo","Tung Tung Tung Sahur","Lirili Larila"],a:1},
  {q:"What does 'rizz' mean in internet slang?",o:["Being fast","Charm or ability to attract people","Being rich","A type of dance"],a:1},
  {q:"What does 'no cap' mean in slang?",o:["Don't wear a hat","No lie / for real","Not allowed","Never stop"],a:1},
  {q:"What does 'bussin' mean?",o:["Driving a bus","Really good / delicious","Being busy","Busting a move"],a:1},
  {q:"What does 'slay' mean as internet slang?",o:["To defeat an enemy","To do something amazingly well","To sleep","To run fast"],a:1},
  {q:"What does 'W' mean in gaming slang?",o:["Wrong","Win / good outcome","Wait","Wow"],a:1},
  {q:"What does 'L' mean in gaming slang?",o:["Level up","Late","Loss / bad outcome","Legendary"],a:2},
  {q:"What does 'goated' mean in slang?",o:["Being a goat farmer","Being the greatest of all time","Being scared","Being hungry"],a:1},
  {q:"What does 'HP' stand for in video games?",o:["High Power","Hero Points","Hit Points","Hyper Play"],a:2},
  {q:"What does 'NPC' stand for in games?",o:["New Player Character","Non-Playable Character","Night Player Controller","New Power Cell"],a:1},
  {q:"What does 'AFK' stand for?",o:["Always Fighting Kings","Away From Keyboard","Another Free Kill","Advanced Fighter Kick"],a:1},
  {q:"What does 'GG' mean in games?",o:["Get Going","Good Game","Great Gear","Gigantic Grab"],a:1},
  {q:"What does 'XP' stand for in games?",o:["Extra Power","Experience Points","Extreme Play","X-ray Power"],a:1},
  {q:"What company owns Minecraft now?",o:["Sony","Nintendo","Microsoft","Activision"],a:2},
  {q:"What is the Minecraft Nether boss called?",o:["Ender Dragon","Elder Guardian","Wither","Blaze King"],a:2},
  {q:"What is needed to summon the Wither?",o:["3 wither skulls + 4 soul sand","3 wither skulls + soul soil","2 wither skulls + obsidian","4 blaze rods + soul sand"],a:0},
  {q:"What is the name of the deep dark biome guardian?",o:["Warden","Deep Guardian","Cave Spider","Shrieker"],a:0},
  {q:"Which mob can teleport in Minecraft?",o:["Blaze","Zombie","Enderman","Spider"],a:2},
  {q:"How do you tame a cat in Minecraft?",o:["Bones","Raw fish","Cooked chicken","String"],a:1},
  {q:"What mob guards the End City?",o:["Enderman","Endermite","Shulker","Phantom"],a:2},
  {q:"How do you make a book in Minecraft?",o:["3 paper","3 paper + 1 leather","2 paper + 1 leather","4 paper"],a:1},
  {q:"What does Fortune enchantment do?",o:["Gives you luck","Increases drops from blocks","Makes you run faster","Increases durability"],a:1},
  {q:"What do dolphins do in Minecraft?",o:["Attack players","Guide you to treasure","Sell items","Fly"],a:1},
  {q:"What replaced Builders Club in Roblox?",o:["Roblox Plus","Premium","Pro Account","Creator Pass"],a:1},
  {q:"What was Roblox called before Roblox?",o:["DynaBlocks","BlockWorld","Lego Online","VoxelGame"],a:0},
  {q:"What does 'POV' mean?",o:["Point of View","Power of Voice","Play on Vibe","Power over Victory"],a:0},
  {q:"What does 'IRL' mean?",o:["In Roblox Land","In Real Life","I Really Laugh","Inside Roblox Lobby"],a:1},
  {q:"What does 'based' mean in internet slang?",o:["Something foundational","Confidently doing your own thing","Being basic","A type of music"],a:1},
  {q:"What does 'op' mean in gaming slang?",o:["Original Post","Overpowered","Open Player","One Player"],a:1},
  {q:"What does 'meta' mean in gaming?",o:["A secret level","The most effective strategy","Metadata","A game developer"],a:1},
  {q:"What is 'Minecraft Hardcore' mode?",o:["A harder difficulty","Death is permanent","A PvP mode","A speedrun mode"],a:1},
  {q:"What block emits the most light in Minecraft?",o:["Torch","Lantern","Glowstone","Sea Lantern"],a:2},
  {q:"What mob drops Ender Pearls?",o:["Endermite","Enderman","Silverfish","Shulker"],a:1},
  {q:"How do you make Netherite gear?",o:["Mine it directly","Combine ancient debris with gold in smithing table","Find it in chests","Smelt netherack"],a:1},
  {q:"In Roblox's 'Doors', what entity chases you if you don't hide?",o:["Figure","Rush","Seek","Glitch"],a:1},
  {q:"What Roblox game has you clicking to hatch pets?",o:["Pet World","Pet Simulator X","Hatch Universe","Adopt Me"],a:1},
  {q:"What is the main use of Redstone in Minecraft?",o:["Making red dye","Creating circuits and machines","Powering torches","Healing players"],a:1},
  {q:"What does 'clutch' mean in gaming?",o:["A type of bag","Pulling off something impressive last second","Grabbing an item","A hidden area"],a:1},
  {q:"What does 'toxic' mean in gaming?",o:["Poisonous items","Rude or unsportsmanlike behavior","A difficult level","A special weapon"],a:1},
  {q:"What are Phantoms and when do they appear?",o:["Sky monsters appearing when you haven't slept","Cave monsters at night","Ocean monsters","Boss mobs in the End"],a:0},
  {q:"What do axolotls eat in Minecraft?",o:["Fish","Tropical fish","Squid","Seagrass"],a:1},
  {q:"What does 'NPC behavior' mean as an insult?",o:["Playing like a computer with no personality","Being very good at games","Playing a lot","Being a developer"],a:0},
  {q:"In 'Blox Fruits', what are the three fruit types?",o:["Fire, Water, Wind","Paramecia, Zoan, Logia","Attack, Defense, Speed","Red, Blue, Yellow"],a:1},
  {q:"What is the first thing you should do in any survival game?",o:["Find diamonds","Build a shelter and collect resources","Fight a boss","Make a sword"],a:1},
  {q:"What Minecraft block is used to play music discs?",o:["Chest","Jukebox","Note Block","Music Box"],a:1},
  {q:"What is the Nether made of mostly?",o:["Lava and ice","Netherrack","Obsidian","Bedrock"],a:1},
  {q:"What does 'DLC' stand for?",o:["Digital Level Content","Downloadable Content","Direct Level Code","Daily Level Challenge"],a:1},
  {q:"What does 'speedrun' mean?",o:["A running minigame","Completing a game as fast as possible","A type of racing game","Running from enemies"],a:1},
];
let quizState={current:0,score:0,questions:[]};
function initQuiz(){quizState.questions=[...ALL_QUESTIONS].sort(()=>Math.random()-.5).slice(0,10);quizState.current=0;quizState.score=0;renderQuiz();}
function renderQuiz(){
  const box=document.getElementById('quiz-box');
  if(quizState.current>=quizState.questions.length){
    const pct=Math.round((quizState.score/quizState.questions.length)*100);
    const emoji=pct===100?'🏆':pct>=80?'🔥':pct>=60?'😎':'💪';
    if(pct===100){launchConfetti();playWin();}
    box.innerHTML=`<div class="quiz-result"><h2>${emoji} Done!</h2><div class="result-num">${quizState.score}/${quizState.questions.length}</div><p>${pct===100?'PERFECT SCORE! BUILT DIFFERENT! 🧠':pct>=80?'Big brain Tatum! 🧠':pct>=60?'Not bad! Play again!':'Keep grinding!'}</p><button class="gbtn gbtn-yellow" onclick="initQuiz()">PLAY AGAIN 🔄</button></div>`;
    return;
  }
  const q=quizState.questions[quizState.current];
  const prog=((quizState.current/quizState.questions.length)*100).toFixed(0);
  box.innerHTML=`<div class="quiz-top"><span>Q${quizState.current+1} of ${quizState.questions.length}</span><span>⭐ ${quizState.score}</span></div><div class="prog-bar"><div class="prog-fill" style="width:${prog}%"></div></div><div class="quiz-q">${q.q}</div><div class="quiz-opts">${q.o.map((opt,i)=>`<button class="quiz-opt" onclick="answerQuiz(${i})">${opt}</button>`).join('')}</div><div class="quiz-feedback" id="quiz-fb"></div><button class="quiz-next" id="quiz-next" onclick="nextQuiz()">Next ➡️</button>`;
}
function answerQuiz(idx){
  const q=quizState.questions[quizState.current];
  const opts=document.querySelectorAll('.quiz-opt');opts.forEach(o=>o.disabled=true);
  opts[q.a].classList.add('correct');
  if(idx===q.a){quizState.score++;document.getElementById('quiz-fb').innerHTML='<span style="color:var(--green)">✅ CORRECT! 🧠</span>';playCorrect();}
  else{opts[idx].classList.add('wrong');document.getElementById('quiz-fb').innerHTML=`<span style="color:var(--pink)">❌ It was: ${q.o[q.a]}</span>`;playWrong();}
  document.getElementById('quiz-next').style.display='block';
}
function nextQuiz(){quizState.current++;renderQuiz();}

// ============================================================
// ENDLESS RUNNER
// ============================================================
let runnerRAF=null,runnerRunning=false;
function initRunner(){document.getElementById('runner-overlay').style.display='flex';document.getElementById('r-score').textContent='0';document.getElementById('r-best').textContent=localStorage.getItem('tatum-runner-best')||'0';}
function startRunner(){
  document.getElementById('runner-overlay').style.display='none';
  if(runnerRAF)cancelAnimationFrame(runnerRAF);runnerRunning=true;
  const canvas=document.getElementById('runner-canvas');
  // Fix retina blur
  const dpr=window.devicePixelRatio||1;
  const W=700,H=260;
  canvas.width=W*dpr;canvas.height=H*dpr;
  canvas.style.width=W+'px';canvas.style.height=H+'px';
  const ctx=canvas.getContext('2d');ctx.scale(dpr,dpr);
  const GROUND=H-38,PLAYER_X=80;
  let score=0,frame=0,speed=3.5,jumping=false,jumpVel=0,playerY=GROUND-46,jumpHeld=false;
  const obstacles=[],floaters=[];let groundOff=0,nextSpawn=90;
  const CHARS=['👾','💣','🕷️','💀','🪲','🦈','🐊','🦛'];
  const FLOAT=['🦅','👻','🦇','💥'];
  const onDown=()=>{if(!jumping&&runnerRunning){jumping=true;jumpVel=-13;jumpHeld=true;playJump();}};
  const onUp=()=>{jumpHeld=false;};
  const onKey=e=>{if(e.code==='Space'||e.code==='ArrowUp'){if(e.type==='keydown')onDown();else onUp();}};
  window.addEventListener('keydown',onKey);window.addEventListener('keyup',onKey);
  canvas.addEventListener('touchstart',e=>{e.preventDefault();onDown();},{passive:false});
  canvas.addEventListener('touchend',onUp);canvas.addEventListener('mousedown',onDown);canvas.addEventListener('mouseup',onUp);
  activeCleanup=()=>{runnerRunning=false;cancelAnimationFrame(runnerRAF);window.removeEventListener('keydown',onKey);window.removeEventListener('keyup',onKey);};
  function loop(){
    if(!runnerRunning)return;runnerRAF=requestAnimationFrame(loop);frame++;
    if(frame%6===0)score++;speed=Math.min(9,3.5+score*0.007);groundOff=(groundOff+speed)%(W*2);
    if(jumping){playerY+=jumpVel;const g=jumpHeld&&jumpVel<0?0.55:0.85;jumpVel+=g;if(playerY>=GROUND-46){playerY=GROUND-46;jumping=false;jumpVel=0;}}
    nextSpawn--;
    if(nextSpawn<=0){
      if(Math.random()<0.25)floaters.push({x:W+20,y:GROUND-90,w:36,h:36,emoji:FLOAT[Math.floor(Math.random()*FLOAT.length)],speed:speed+Math.random()*.5});
      else obstacles.push({x:W+20,y:GROUND-40,w:36,h:36,emoji:CHARS[Math.floor(Math.random()*CHARS.length)]});
      nextSpawn=Math.floor((W*0.5)/speed)+Math.floor(Math.random()*(W*0.2)/speed);
    }
    for(let i=obstacles.length-1;i>=0;i--){
      obstacles[i].x-=speed;if(obstacles[i].x<-50){obstacles.splice(i,1);continue;}
      const o=obstacles[i];if(o.x+10<PLAYER_X+28&&o.x+o.w-10>PLAYER_X+8&&o.y+8<playerY+40&&o.y+o.h-4>playerY+6){dieRunner();return;}
    }
    for(let i=floaters.length-1;i>=0;i--){
      floaters[i].x-=floaters[i].speed;if(floaters[i].x<-50){floaters.splice(i,1);continue;}
      const f=floaters[i];if(jumping&&f.x+8<PLAYER_X+28&&f.x+f.w-8>PLAYER_X+8&&f.y+8<playerY+40&&f.y+f.h-4>playerY+6){dieRunner();return;}
    }
    document.getElementById('r-score').textContent=score;
    ctx.clearRect(0,0,W,H);
    const sky=ctx.createLinearGradient(0,0,0,H);sky.addColorStop(0,'#001830');sky.addColorStop(1,'#0a1e30');ctx.fillStyle=sky;ctx.fillRect(0,0,W,H);
    ctx.fillStyle='rgba(0,212,255,0.1)';for(let gx=(groundOff%70)-70;gx<W;gx+=70){ctx.beginPath();ctx.arc(gx,GROUND+14,3,0,Math.PI*2);ctx.fill();}
    ctx.strokeStyle='rgba(0,212,255,0.5)';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(0,GROUND);ctx.lineTo(W,GROUND);ctx.stroke();
    ctx.strokeStyle='rgba(255,123,0,0.08)';ctx.lineWidth=1;ctx.setLineDash([6,6]);ctx.beginPath();ctx.moveTo(0,GROUND-100);ctx.lineTo(W,GROUND-100);ctx.stroke();ctx.setLineDash([]);
    ctx.save();ctx.scale(-1,1);ctx.font='40px serif';ctx.textBaseline='top';ctx.fillText('🏃',-(PLAYER_X+44),playerY);ctx.restore();
    ctx.textBaseline='top';obstacles.forEach(o=>{ctx.font=`${o.w}px serif`;ctx.fillText(o.emoji,o.x,o.y);});
    floaters.forEach(f=>{ctx.font=`${f.w}px serif`;ctx.fillText(f.emoji,f.x,f.y);ctx.fillStyle='rgba(255,123,0,0.5)';ctx.font='14px serif';ctx.fillText('⬇️',f.x+10,f.y-18);});
    ctx.fillStyle='rgba(0,212,255,0.5)';ctx.font='bold 13px Nunito';ctx.textBaseline='top';ctx.fillText(`SCORE: ${score}`,8,8);
    ctx.fillStyle='rgba(255,255,255,0.2)';ctx.fillText(`SPD: ${speed.toFixed(1)}`,W-70,8);
  }
  function dieRunner(){
    runnerRunning=false;cancelAnimationFrame(runnerRAF);window.removeEventListener('keydown',onKey);window.removeEventListener('keyup',onKey);
    playGameOver();const best=Math.max(parseInt(localStorage.getItem('tatum-runner-best')||'0'),score);localStorage.setItem('tatum-runner-best',best);document.getElementById('r-best').textContent=best;
    const ov=document.getElementById('runner-overlay');ov.style.display='flex';
    ov.innerHTML=`<h2 style="color:var(--blue)">💀 GAME OVER</h2><p>Score: <strong style="color:var(--blue)">${score}</strong> | Best: <strong style="color:var(--green)">${best}</strong></p><button class="gbtn gbtn-blue" onclick="startRunner()">TRY AGAIN 🔄</button>`;
  }
  loop();
}

// ============================================================
// WHACK-A-CREEPER
// ============================================================
const WHACK_CHARS=['🐊','🦈','🦛','🐘','💣','👾','🪲','💀','🕷️','😈'];
let whackState=null,whackInterval=null,whackTimerInterval=null;
function initWhack(){
  const grid=document.getElementById('whack-grid');grid.innerHTML='';
  for(let i=0;i<9;i++){const h=document.createElement('div');h.className='hole';h.textContent='🕳️';h.addEventListener('click',()=>whackHole(i));h.addEventListener('touchstart',e=>{e.preventDefault();whackHole(i);},{passive:false});grid.appendChild(h);}
  document.getElementById('whack-overlay').style.display='flex';document.getElementById('w-best').textContent=localStorage.getItem('tatum-whack-best')||'0';
}
function startWhack(){
  document.getElementById('whack-overlay').style.display='none';
  whackState={score:0,misses:0,combo:0,active:[],timeLeft:45};
  document.getElementById('w-score').textContent='0';document.getElementById('w-misses').textContent='0';document.getElementById('w-combo').textContent='0';
  activeCleanup=()=>{clearInterval(whackInterval);clearInterval(whackTimerInterval);};
  whackTimerInterval=setInterval(()=>{whackState.timeLeft--;document.getElementById('w-timer-fill').style.width=(whackState.timeLeft/45*100)+'%';if(whackState.timeLeft<=0){clearInterval(whackTimerInterval);clearInterval(whackInterval);endWhack();}},1000);
  function spawnMole(){
    if(!whackState)return;const holes=document.querySelectorAll('.hole');
    const available=[...Array(9).keys()].filter(i=>!whackState.active.includes(i));if(!available.length)return;
    const idx=available[Math.floor(Math.random()*available.length)];whackState.active.push(idx);
    const hole=holes[idx];hole.className='hole active';hole.textContent=WHACK_CHARS[Math.floor(Math.random()*WHACK_CHARS.length)];
    const t=setTimeout(()=>{if(hole.className.includes('active')){hole.className='hole missed';hole.textContent='🕳️';whackState.active=whackState.active.filter(a=>a!==idx);whackState.misses++;whackState.combo=0;document.getElementById('w-misses').textContent=whackState.misses;document.getElementById('w-combo').textContent='0';playMiss();if(whackState.misses>=5){clearInterval(whackInterval);clearInterval(whackTimerInterval);endWhack();}setTimeout(()=>{if(hole.className.includes('missed')){hole.className='hole';hole.textContent='🕳️';}},300);}},Math.max(500,900-whackState.score*2));
    hole._timeout=t;
  }
  whackInterval=setInterval(spawnMole,600);
}
function whackHole(idx){
  if(!whackState)return;const hole=document.querySelectorAll('.hole')[idx];if(!hole.className.includes('active'))return;
  clearTimeout(hole._timeout);whackState.combo++;
  const pts=10*(whackState.combo>=5?3:whackState.combo>=3?2:1);whackState.score+=pts;
  whackState.active=whackState.active.filter(a=>a!==idx);document.getElementById('w-score').textContent=whackState.score;document.getElementById('w-combo').textContent=whackState.combo;
  hole.className='hole';hole.textContent='🕳️';playWhack();
  if(whackState.combo===3)showCombo('COMBO! 💥');else if(whackState.combo===5){showCombo('x3 COMBO! 🔥');playCombo();}else if(whackState.combo===10){showCombo('GOATED! 👑');playCombo();}
}
function endWhack(){
  const score=whackState?whackState.score:0;const best=Math.max(parseInt(localStorage.getItem('tatum-whack-best')||'0'),score);localStorage.setItem('tatum-whack-best',best);document.getElementById('w-best').textContent=best;
  if(score>=200)launchConfetti();playGameOver();
  const ov=document.getElementById('whack-overlay');ov.style.display='flex';
  ov.innerHTML=`<h2 style="color:var(--green)">⏰ TIME'S UP!</h2><p>Score: <strong style="color:var(--green)">${score}</strong> | Best: <strong style="color:var(--yellow)">${best}</strong></p><button class="gbtn gbtn-green" onclick="startWhack()">PLAY AGAIN 🔄</button>`;
  whackState=null;
}

// ============================================================
// MINING CLICKER
// ============================================================
const MINE_LAYERS=[
  {name:'Dirt',color:'#8B5E3C',darkColor:'#6B4423',label:'🌿 Layer 1: Dirt',hp:2,drop:'Dirt'},
  {name:'Gravel',color:'#888888',darkColor:'#666666',label:'🪨 Layer 2: Gravel',hp:3,drop:'Gravel'},
  {name:'Wood',color:'#6B4423',darkColor:'#4a2e0f',label:'🌲 Layer 3: Wood',hp:3,drop:'Wood'},
  {name:'Stone',color:'#777777',darkColor:'#555555',label:'🪨 Layer 4: Stone',hp:5,drop:'Stone'},
  {name:'Coal Ore',color:'#555555',darkColor:'#333333',label:'🔲 Layer 5: Coal',hp:6,drop:'Coal'},
  {name:'Iron Ore',color:'#8a7060',darkColor:'#6a5040',label:'⚙️ Layer 6: Iron',hp:8,drop:'Iron'},
  {name:'Gold Ore',color:'#b8860b',darkColor:'#8a6400',label:'🥇 Layer 8: Gold',hp:10,drop:'Gold'},
  {name:'Diamond Ore',color:'#1a6b8a',darkColor:'#0f4a60',label:'💎 Layer 8: Diamond',hp:14,drop:'Diamond'},
  {name:'Obsidian',color:'#2a1a3a',darkColor:'#1a0a2a',label:'🌑 Layer 9: Obsidian',hp:20,drop:'Obsidian'},
  {name:'Nether',color:'#8B0000',darkColor:'#5a0000',label:'🔥 Layer 10: Nether',hp:25,drop:'Netherite'},
];
const MINE_TOOLS=[
  {name:'Fists',emoji:'✊',dmg:1,recipe:null},
  {name:'Wooden Pickaxe',emoji:'🪵⛏️',dmg:2,recipe:{Dirt:4,Wood:2}},
  {name:'Stone Pickaxe',emoji:'🪨⛏️',dmg:4,recipe:{Stone:4,Wood:2}},
  {name:'Iron Pickaxe',emoji:'🔩⛏️',dmg:8,recipe:{Iron:3,Wood:2}},
  {name:'Golden Pickaxe',emoji:'🟡⛏️',dmg:6,recipe:{Gold:3,Wood:2}},
  {name:'Diamond Pickaxe',emoji:'💎⛏️',dmg:18,recipe:{Diamond:3,Wood:2}},
  {name:'Netherite Pickaxe',emoji:'🔥⛏️',dmg:40,recipe:{Netherite:2,Diamond:1}},
];
const MINE_COLS=4,MINE_ROWS=4,BLOCK_SIZE=56;
let mineS={running:false,layerIdx:0,toolIdx:0,inventory:{},blocks:[],timerLeft:90,timerTotal:90,gameOver:false,won:false,startTime:0};
let mineTimerInterval=null;
function initMining(){renderMineLB();document.getElementById('mine-overlay').style.display='flex';}
function startMining(){
  document.getElementById('mine-overlay').style.display='none';clearInterval(mineTimerInterval);
  mineS={running:true,layerIdx:0,toolIdx:0,inventory:{},blocks:[],timerLeft:90,timerTotal:90,gameOver:false,won:false,startTime:Date.now()};
  MINE_LAYERS.forEach(l=>{mineS.inventory[l.drop]=0;});mineS.inventory.Wood=0;
  spawnMineLayer();
  mineTimerInterval=setInterval(()=>{if(!mineS.running)return;mineS.timerLeft--;document.getElementById('m-timer').textContent=mineS.timerLeft;document.getElementById('m-timer-fill').style.width=(mineS.timerLeft/mineS.timerTotal*100)+'%';if(mineS.timerLeft<=0)mineGameOver();},1000);
  renderMining2();activeCleanup=()=>{clearInterval(mineTimerInterval);mineS.running=false;};
}
function spawnMineLayer(){const layer=MINE_LAYERS[mineS.layerIdx];mineS.blocks=[];for(let i=0;i<MINE_COLS*MINE_ROWS;i++)mineS.blocks.push({hp:layer.hp,maxHp:layer.hp,broken:false});}
function mineBlockClick(i){
  if(!mineS.running||mineS.gameOver||mineS.won)return;const b=mineS.blocks[i];if(b.broken)return;
  const tool=MINE_TOOLS[mineS.toolIdx];const layer=MINE_LAYERS[mineS.layerIdx];
  b.hp-=tool.dmg;playMineBlock(mineS.layerIdx);
  if(b.hp<=0){b.broken=true;b.hp=0;mineS.inventory[layer.drop]=(mineS.inventory[layer.drop]||0)+1;
    if(mineS.blocks.every(bl=>bl.broken)){mineS.layerIdx++;if(mineS.layerIdx>=MINE_LAYERS.length){mineWin();return;}mineS.timerLeft=Math.min(mineS.timerLeft+20,120);mineS.timerTotal=120;document.getElementById('m-timer').textContent=mineS.timerLeft;spawnMineLayer();}}
  renderMining2();
}
function renderMining2(){
  const layer=MINE_LAYERS[Math.min(mineS.layerIdx,MINE_LAYERS.length-1)];const tool=MINE_TOOLS[mineS.toolIdx];
  document.getElementById('m-layer').textContent=mineS.layerIdx+1;document.getElementById('m-layer-label').textContent=layer.label;
  document.getElementById('m-tool-emoji').textContent=tool.emoji;document.getElementById('m-tool-name').textContent=tool.name;document.getElementById('m-tool-dmg').textContent=`${tool.dmg} dmg/tap`;
  const canvas=document.getElementById('mine-canvas');const ctx=canvas.getContext('2d');ctx.clearRect(0,0,canvas.width,canvas.height);
  mineS.blocks.forEach((b,i)=>{
    const col=i%MINE_COLS,row=Math.floor(i/MINE_COLS),x=col*BLOCK_SIZE,y=row*BLOCK_SIZE;
    if(b.broken){ctx.fillStyle='rgba(0,0,0,0.4)';ctx.fillRect(x+1,y+1,BLOCK_SIZE-2,BLOCK_SIZE-2);return;}
    ctx.fillStyle=layer.color;ctx.fillRect(x,y,BLOCK_SIZE,BLOCK_SIZE);ctx.fillStyle=layer.darkColor;ctx.fillRect(x+4,y+4,BLOCK_SIZE-8,BLOCK_SIZE-8);
    ctx.fillStyle='rgba(0,0,0,0.12)';for(let px=0;px<4;px++)for(let py=0;py<4;py++)if((px+py+i)%3===0)ctx.fillRect(x+4+px*12,y+4+py*12,8,8);
    ctx.fillStyle='rgba(255,255,255,0.22)';ctx.fillRect(x,y,BLOCK_SIZE,3);ctx.fillRect(x,y,3,BLOCK_SIZE);
    ctx.fillStyle='rgba(0,0,0,0.32)';ctx.fillRect(x,y+BLOCK_SIZE-3,BLOCK_SIZE,3);ctx.fillRect(x+BLOCK_SIZE-3,y,3,BLOCK_SIZE);
    ctx.strokeStyle='rgba(0,0,0,0.55)';ctx.lineWidth=1;ctx.strokeRect(x,y,BLOCK_SIZE,BLOCK_SIZE);
    const pct=b.hp/b.maxHp;
    if(pct<0.75){ctx.strokeStyle='rgba(0,0,0,0.55)';ctx.lineWidth=pct<0.33?3:pct<0.55?2:1;ctx.beginPath();ctx.moveTo(x+BLOCK_SIZE*.3,y+BLOCK_SIZE*.2);ctx.lineTo(x+BLOCK_SIZE*.6,y+BLOCK_SIZE*.7);ctx.stroke();if(pct<0.5){ctx.beginPath();ctx.moveTo(x+BLOCK_SIZE*.6,y+BLOCK_SIZE*.2);ctx.lineTo(x+BLOCK_SIZE*.2,y+BLOCK_SIZE*.6);ctx.stroke();}}
    const barW=(BLOCK_SIZE-8)*(b.hp/b.maxHp);ctx.fillStyle='rgba(0,0,0,0.5)';ctx.fillRect(x+4,y+BLOCK_SIZE-10,BLOCK_SIZE-8,6);ctx.fillStyle=pct>0.6?'#39ff14':pct>0.3?'#ffe600':'#ff2d78';ctx.fillRect(x+4,y+BLOCK_SIZE-10,barW,6);
  });
  const invEl=document.getElementById('m-inventory');invEl.innerHTML=Object.entries(mineS.inventory).filter(([k,v])=>v>0).map(([k,v])=>`<div class="mine-inv-row"><span>${k}</span><span>${v}</span></div>`).join('')||'<div style="color:var(--dim);font-size:.75rem">Start mining!</div>';
  const nextToolIdx=mineS.toolIdx+1;const craftEl=document.getElementById('m-recipe');const craftBtn=document.getElementById('m-craft-btn');
  if(nextToolIdx>=MINE_TOOLS.length){craftEl.innerHTML='<div style="color:var(--green);font-size:.8rem;font-weight:700">Max tool! 🔥</div>';craftBtn.disabled=true;}
  else{const next=MINE_TOOLS[nextToolIdx];const recipe=next.recipe;let canCraft=true;craftEl.innerHTML=`<div style="color:var(--purple);font-size:.82rem;font-weight:700;margin-bottom:4px">${next.emoji} ${next.name}</div>`+Object.entries(recipe).map(([item,need])=>{const have=mineS.inventory[item]||0;const ok=have>=need;if(!ok)canCraft=false;return`<div class="mine-recipe-item"><span class="recipe-need">${item} x${need}</span><span class="recipe-have ${ok?'ok':'no'}">${have}/${need}</span></div>`;}).join('');craftBtn.disabled=!canCraft;}
}
function craftTool(){const nextIdx=mineS.toolIdx+1;if(nextIdx>=MINE_TOOLS.length)return;const next=MINE_TOOLS[nextIdx];Object.entries(next.recipe).forEach(([item,need])=>{mineS.inventory[item]-=need;});mineS.toolIdx=nextIdx;playCraft();renderMining2();}
function mineGameOver(){clearInterval(mineTimerInterval);mineS.running=false;mineS.gameOver=true;playGameOver();const ov=document.getElementById('mine-overlay');ov.style.display='flex';ov.innerHTML=`<h2 style="color:var(--pink)">⏰ TIME'S UP!</h2><p>You reached Layer ${mineS.layerIdx+1}!</p><button class="gbtn gbtn-purple" onclick="startMining()">TRY AGAIN ⛏️</button>`;}
function mineWin(){
  clearInterval(mineTimerInterval);mineS.running=false;mineS.won=true;
  const elapsed=Math.round((Date.now()-mineS.startTime)/1000);const lb=getLB('mine-lb');lb.push({name:'Tatum',score:elapsed,display:formatTime(elapsed)});lb.sort((a,b)=>a.score-b.score);saveLB('mine-lb',lb);renderMineLB();
  launchConfetti();playWin();const ov=document.getElementById('mine-overlay');ov.style.display='flex';
  ov.innerHTML=`<h2 style="color:var(--yellow)">🏆 YOU WIN!</h2><p>🎉 NETHERITE REACHED! 🎉</p><p>Time: <strong style="color:var(--green)">${formatTime(elapsed)}</strong></p><div style="font-size:2.5rem">🔥💎⛏️🏆</div><button class="gbtn gbtn-purple" onclick="startMining()">PLAY AGAIN ⛏️</button>`;
}
function formatTime(s){return`${Math.floor(s/60)}:${String(s%60).padStart(2,'0')}`;}
function renderMineLB(){const lb=getLB('mine-lb');const el=document.getElementById('m-lb');if(!el)return;if(!lb.length){el.innerHTML='<div style="color:var(--dim);font-size:.75rem">No completions yet!</div>';return;}el.innerHTML=lb.slice(0,5).map((e,i)=>`<div class="mine-lb-row"><span>${i+1}. ${e.name||'Tatum'}</span><span>${e.display||formatTime(e.score)}</span></div>`).join('');}
document.addEventListener('DOMContentLoaded',()=>{
  const canvas=document.getElementById('mine-canvas');
  if(canvas){
    const handler=e=>{if(!mineS.running)return;const rect=canvas.getBoundingClientRect();const scaleX=canvas.width/rect.width,scaleY=canvas.height/rect.height;const cx=(e.clientX||(e.touches&&e.touches[0].clientX)||0)-rect.left;const cy=(e.clientY||(e.touches&&e.touches[0].clientY)||0)-rect.top;const col=Math.floor(cx*scaleX/BLOCK_SIZE),row=Math.floor(cy*scaleY/BLOCK_SIZE);if(col>=0&&col<MINE_COLS&&row>=0&&row<MINE_ROWS)mineBlockClick(row*MINE_COLS+col);};
    canvas.addEventListener('click',handler);canvas.addEventListener('touchstart',e=>{e.preventDefault();handler(e);},{passive:false});
  }
  initScratch();
});

// ============================================================
// TARGET SHOOTER
// ============================================================
let shooterRAF=null,shooterRunning=false;
function initShooter(){document.getElementById('shooter-overlay').style.display='flex';document.getElementById('sh-score').textContent='0';document.getElementById('sh-lives').textContent='❤️❤️❤️';document.getElementById('sh-combo').textContent='0';document.getElementById('sh-best').textContent=localStorage.getItem('tatum-shooter-best')||'0';}
function startShooter(){
  document.getElementById('shooter-overlay').style.display='none';if(shooterRAF)cancelAnimationFrame(shooterRAF);shooterRunning=true;
  const canvas=document.getElementById('shooter-canvas');
  const dpr=window.devicePixelRatio||1;const CW=680,CH=360;
  canvas.width=CW*dpr;canvas.height=CH*dpr;canvas.style.width=CW+'px';canvas.style.height=CH+'px';
  const ctx=canvas.getContext('2d');ctx.scale(dpr,dpr);
  const W=CW,H=CH;let score=0,lives=3,frame=0,combo=0;
  const entities=[],splats=[],projectiles=[];
  const BADDIES=['🦈','🐊','🦛','🐘','👾','💀','💣','🕷️','🪲','😈'];
  const GOODIES=['💎','⭐','🌟'];
  function livesStr(){return'❤️'.repeat(Math.max(0,lives))+'🖤'.repeat(Math.max(0,3-lives));}
  function spawnEntity(){
    const isGood=Math.random()<0.25;const fromLeft=Math.random()<0.5;const size=40;
    const spd=Math.min(1.5+score/800+Math.random()*0.8,5);
    entities.push({x:fromLeft?-size:W+size,y:30+Math.random()*(H-80),w:size,h:size,speed:(fromLeft?1:-1)*spd,emoji:isGood?GOODIES[Math.floor(Math.random()*GOODIES.length)]:BADDIES[Math.floor(Math.random()*BADDIES.length)],good:isGood,hit:false,alpha:1});
  }
  const splatColors=['#ff2d78','#ff7b00','#ffe600','#39ff14','#00d4ff','#bf5fff'];
  const onTap=e=>{
    if(!shooterRunning)return;
    const rect=canvas.getBoundingClientRect();const scaleX=W/rect.width,scaleY=H/rect.height;
    const tapX=((e.clientX||e.touches[0].clientX)-rect.left)*scaleX;
    const tapY=((e.clientY||e.touches[0].clientY)-rect.top)*scaleY;
    // Fire projectile from center-bottom
    projectiles.push({x:W/2,y:H-20,tx:tapX,ty:tapY,alpha:1,color:splatColors[Math.floor(Math.random()*splatColors.length)]});
    playShootFire();
    splats.push({x:tapX,y:tapY,r:10,maxR:36,color:splatColors[Math.floor(Math.random()*splatColors.length)],alpha:1,spikes:6+Math.floor(Math.random()*4)});
    let hitSomething=false;
    for(let i=entities.length-1;i>=0;i--){
      const en=entities[i];if(en.hit)continue;
      if(tapX>en.x&&tapX<en.x+en.w&&tapY>en.y&&tapY<en.y+en.h){
        en.hit=true;hitSomething=true;
        if(en.good){combo=0;lives--;document.getElementById('sh-lives').textContent=livesStr();document.getElementById('sh-combo').textContent='0';playGoodieHit();if(lives<=0){shooterOver();return;}}
        else{combo++;score+=10*(combo>=10?5:combo>=5?3:combo>=3?2:1);document.getElementById('sh-score').textContent=score;document.getElementById('sh-combo').textContent=combo;playShootHit();if(combo===3)showCombo('COMBO! 💥');else if(combo===5){showCombo('x3 COMBO! 🔥');playCombo();}else if(combo===10){showCombo('UNSTOPPABLE! 👑');playCombo();}}
        break;
      }
    }
    if(!hitSomething) playShootMiss();
  };
  canvas.addEventListener('click',onTap);canvas.addEventListener('touchstart',e=>{e.preventDefault();onTap(e);},{passive:false});
  activeCleanup=()=>{shooterRunning=false;cancelAnimationFrame(shooterRAF);canvas.removeEventListener('click',onTap);};
  function loop(){
    if(!shooterRunning)return;shooterRAF=requestAnimationFrame(loop);frame++;
    if(frame%Math.max(50,110-Math.floor(score/80)*3)===0)spawnEntity();
    for(let i=entities.length-1;i>=0;i--){
      const en=entities[i];if(en.hit){en.alpha-=0.08;if(en.alpha<=0)entities.splice(i,1);continue;}
      en.x+=en.speed;
      if((en.speed>0&&en.x>W+en.w)||(en.speed<0&&en.x<-en.w)){entities.splice(i,1);if(!en.good){combo=0;lives--;document.getElementById('sh-lives').textContent=livesStr();document.getElementById('sh-combo').textContent='0';playShootMiss();if(lives<=0){shooterOver();return;}}}}
    for(let i=splats.length-1;i>=0;i--){const s=splats[i];s.r=Math.min(s.r+3,s.maxR);s.alpha-=0.04;if(s.alpha<=0)splats.splice(i,1);}
    for(let i=projectiles.length-1;i>=0;i--){const p=projectiles[i];const dx=p.tx-p.x,dy=p.ty-p.y;const d=Math.sqrt(dx*dx+dy*dy);if(d<8){projectiles.splice(i,1);continue;}const spd=Math.min(18,d);p.x+=dx/d*spd;p.y+=dy/d*spd;p.alpha-=0.05;if(p.alpha<=0)projectiles.splice(i,1);}
    ctx.clearRect(0,0,W,H);const grad=ctx.createLinearGradient(0,0,0,H);grad.addColorStop(0,'#1a0a00');grad.addColorStop(1,'#0a0c14');ctx.fillStyle=grad;ctx.fillRect(0,0,W,H);
    ctx.strokeStyle='rgba(255,123,0,0.04)';ctx.lineWidth=1;for(let gx=0;gx<W;gx+=48){ctx.beginPath();ctx.moveTo(gx,0);ctx.lineTo(gx,H);ctx.stroke();}for(let gy=0;gy<H;gy+=48){ctx.beginPath();ctx.moveTo(0,gy);ctx.lineTo(W,gy);ctx.stroke();}
    splats.forEach(s=>{ctx.save();ctx.globalAlpha=s.alpha;ctx.fillStyle=s.color;ctx.beginPath();for(let sp=0;sp<s.spikes*2;sp++){const angle=(sp/s.spikes/2)*Math.PI*2-Math.PI/2;const r=sp%2===0?s.r:s.r*0.5;ctx.lineTo(s.x+Math.cos(angle)*r,s.y+Math.sin(angle)*r);}ctx.closePath();ctx.fill();ctx.restore();});
    // Draw projectiles as little stars
    projectiles.forEach(p=>{ctx.save();ctx.globalAlpha=p.alpha;ctx.fillStyle=p.color;ctx.beginPath();ctx.arc(p.x,p.y,5,0,Math.PI*2);ctx.fill();ctx.restore();});
    ctx.textBaseline='top';entities.forEach(en=>{ctx.save();ctx.globalAlpha=en.alpha;if(en.good){ctx.shadowColor='#39ff14';ctx.shadowBlur=14;}ctx.font=`${en.w}px serif`;ctx.fillText(en.emoji,en.x,en.y);ctx.restore();});
    // Crosshair
    ctx.strokeStyle='rgba(255,123,0,0.15)';ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(W/2,0);ctx.lineTo(W/2,H);ctx.stroke();ctx.beginPath();ctx.moveTo(0,H/2);ctx.lineTo(W,H/2);ctx.stroke();
  }
  function shooterOver(){shooterRunning=false;cancelAnimationFrame(shooterRAF);playGameOver();const best=Math.max(parseInt(localStorage.getItem('tatum-shooter-best')||'0'),score);localStorage.setItem('tatum-shooter-best',best);document.getElementById('sh-best').textContent=best;const ov=document.getElementById('shooter-overlay');ov.style.display='flex';ov.innerHTML=`<h2 style="color:var(--orange)">💀 GAME OVER</h2><p>Score: <strong style="color:var(--orange)">${score}</strong> | Best: <strong style="color:var(--green)">${best}</strong></p><button class="gbtn gbtn-orange" onclick="startShooter()">TRY AGAIN 🔄</button>`;}
  loop();
}

// ============================================================
// BOSS BATTLE — Hard mode, projectiles, snack bag
// ============================================================
const BOSSES=[
  {name:'Creeper King',emoji:'💚',maxHp:600,atk:20,atkInterval:2800,phase:'Phase 1 of 3',color:'#39ff14',proj:'💣',desc:'The Creeper King throws bombs!'},
  {name:'Ender Dragon',emoji:'🐉',maxHp:900,atk:28,atkInterval:2200,phase:'Phase 2 of 3',color:'#bf5fff',proj:'🔮',desc:'The Ender Dragon blasts you!'},
  {name:'Tralalero Tralala',emoji:'🦈',maxHp:1400,atk:38,atkInterval:1600,phase:'FINAL BOSS 😱',color:'#ff2d78',proj:'🦈',desc:'THE BRAINROT SHARK ATTACKS!'},
];
const WEAPONS=[
  {name:'Iron Sword',emoji:'🗡️',dmg:5,cost:0},
  {name:'Diamond Sword',emoji:'💎🗡️',dmg:18,cost:5},
  {name:'Bow & Arrow',emoji:'🏹',dmg:14,cost:4},
  {name:'TNT Cannon',emoji:'💣',dmg:35,cost:8},
  {name:'Ender Pearl',emoji:'💠',dmg:50,cost:12},
];
const STORE_ITEMS=[
  {name:'HP Potion',emoji:'❤️',desc:'+50 HP',cost:4,action:'potion'},
  {name:'Diamond Sword',emoji:'💎🗡️',desc:'18 dmg',cost:5,action:'weapon',wIdx:1},
  {name:'Bow & Arrow',emoji:'🏹',desc:'14 dmg',cost:4,action:'weapon',wIdx:2},
  {name:'TNT Cannon',emoji:'💣',desc:'35 dmg',cost:8,action:'weapon',wIdx:3},
  {name:'Ender Pearl',emoji:'💠',desc:'50 dmg',cost:12,action:'weapon',wIdx:4},
  {name:'+1 Shield',emoji:'🛡️',desc:'Extra charge',cost:3,action:'shield'},
];
let bossState=null,bossAtkTimeout=null,bossSnackTimeout=null,bossRAF=null;
function initBoss(){document.getElementById('boss-overlay').style.display='flex';renderStore();}
function startBoss(){
  document.getElementById('boss-overlay').style.display='none';
  bossState={bossIdx:0,bossHp:BOSSES[0].maxHp,playerHp:100,playerMaxHp:100,snacks:0,shieldCharges:3,maxShield:3,shielded:false,weaponIdx:0,log:[],animFrame:0,running:true,bossAnim:0,hit:false,playerHit:false,projectiles:[],playerProjectiles:[],warnActive:false};
  updateBossUI();renderStore();bossAttackLoop();bossSnackLoop();drawBossCanvas();
  activeCleanup=()=>{bossState&&(bossState.running=false);clearTimeout(bossAtkTimeout);clearTimeout(bossSnackTimeout);cancelAnimationFrame(bossRAF);};
}
function bossLog(msg){if(!bossState)return;bossState.log.unshift(msg);if(bossState.log.length>8)bossState.log.pop();document.getElementById('boss-log').innerHTML=bossState.log.join('<br>');}
function bossAttackLoop(){
  if(!bossState||!bossState.running)return;
  const boss=BOSSES[bossState.bossIdx];
  // Warning phase first
  bossState.warnActive=true;
  const warn=document.getElementById('boss-warning');warn.classList.add('active');
  bossLog(`⚠️ ${boss.name} is charging up...`);
  bossAtkTimeout=setTimeout(()=>{
    if(!bossState||!bossState.running)return;
    warn.classList.remove('active');bossState.warnActive=false;
    // Launch projectile toward player
    bossState.projectiles.push({x:230,y:120,tx:230,ty:420,alpha:1,emoji:boss.proj,speed:6,frame:0});
    if(bossState.shielded){
      bossLog('🛡️ Shield blocked the attack!');bossState.shielded=false;
      document.getElementById('shield-btn').style.background='var(--blue)';playShield();
    } else {
      const dmg=boss.atk+Math.floor(Math.random()*10);
      bossState.playerHp=Math.max(0,bossState.playerHp-dmg);bossState.playerHit=true;
      setTimeout(()=>{if(bossState)bossState.playerHit=false;},400);
      bossLog(`💥 ${boss.name} hits you for ${dmg} dmg!`);playBossAttack();updateBossUI();
      if(bossState.playerHp<=0){bossGameOver();return;}
    }
    bossAttackLoop();
  },boss.atkInterval);
}
function bossSnackLoop(){
  if(!bossState||!bossState.running)return;
  bossSnackTimeout=setTimeout(()=>{
    if(!bossState||!bossState.running)return;
    bossState.snacks++;updateSnackDisplay();bossLog('🍎 A snack dropped! (+1)');renderStore();bossSnackLoop();
  },5000+Math.random()*3000);
}
function updateSnackDisplay(){
  if(!bossState)return;
  document.getElementById('snack-count').textContent=bossState.snacks;
  document.getElementById('heal-btn').disabled=bossState.snacks<1;
  // Animate apple falling into bag
  const wrap=document.getElementById('snack-bag-wrap');
  const apple=document.createElement('div');apple.className='falling-apple';apple.textContent='🍎';apple.style.left=(Math.random()*60+20)+'%';wrap.appendChild(apple);setTimeout(()=>apple.remove(),900);
}
function attackBoss(){
  if(!bossState||!bossState.running)return;
  const weapon=WEAPONS[bossState.weaponIdx];const dmg=weapon.dmg+Math.floor(Math.random()*8);
  bossState.bossHp=Math.max(0,bossState.bossHp-dmg);bossState.hit=true;
  // Launch player projectile toward boss
  bossState.playerProjectiles.push({x:230,y:430,tx:230,ty:100,alpha:1,emoji:weapon.emoji,speed:8,frame:0});
  setTimeout(()=>{if(bossState)bossState.hit=false;},300);
  bossLog(`⚔️ You hit ${BOSSES[bossState.bossIdx].name} for ${dmg} dmg!`);playBossHit();updateBossUI();
  if(bossState.bossHp<=0){
    bossState.bossIdx++;
    if(bossState.bossIdx>=BOSSES.length){bossWin();return;}
    const newBoss=BOSSES[bossState.bossIdx];bossState.bossHp=newBoss.maxHp;bossState.snacks+=5;updateSnackDisplay();
    const banner=document.getElementById('boss-phase-banner');banner.textContent=`${newBoss.emoji} ${newBoss.name}!`;banner.style.display='block';setTimeout(()=>banner.style.display='none',2500);
    bossLog(`🎉 BOSS DEFEATED! Next: ${newBoss.name}!`);launchConfetti();playWin();updateBossUI();
  }
}
function bossHeal(){if(!bossState||bossState.snacks<1)return;bossState.snacks--;bossState.playerHp=Math.min(bossState.playerMaxHp,bossState.playerHp+30);updateSnackDisplay();bossLog('🍎 You healed! +30 HP');playHeal();updateBossUI();renderStore();}
function bossShield(){if(!bossState||bossState.shieldCharges<=0)return;bossState.shieldCharges--;bossState.shielded=true;document.getElementById('shield-count').textContent=`${bossState.shieldCharges} charges left`;document.getElementById('shield-btn').style.background='var(--green)';document.getElementById('shield-btn').style.color='#000';bossLog(`🛡️ Shield up! (${bossState.shieldCharges} left)`);playShield();if(bossState.shieldCharges<=0)document.getElementById('shield-btn').disabled=true;}
function buyStoreItem(idx){
  if(!bossState)return;const item=STORE_ITEMS[idx];if(bossState.snacks<item.cost)return;
  bossState.snacks-=item.cost;updateSnackDisplay();
  if(item.action==='potion'){bossState.playerHp=Math.min(bossState.playerMaxHp,bossState.playerHp+50);bossLog('❤️ HP Potion! +50 HP');playHeal();}
  else if(item.action==='weapon'){bossState.weaponIdx=item.wIdx;bossLog(`⚔️ Equipped ${item.emoji} ${item.name}!`);playCraft();}
  else if(item.action==='shield'){bossState.shieldCharges=Math.min(bossState.shieldCharges+1,5);document.getElementById('shield-count').textContent=`${bossState.shieldCharges} charges left`;document.getElementById('shield-btn').disabled=false;bossLog('🛡️ +1 shield charge!');playShield();}
  updateBossUI();renderStore();
}
function renderStore(){
  const el=document.getElementById('store-items');if(!el)return;
  el.innerHTML=STORE_ITEMS.map((item,i)=>{const canAfford=bossState&&bossState.snacks>=item.cost;return`<div class="store-item"><span class="store-item-name">${item.emoji} ${item.name}<br><small style="color:var(--dim)">${item.desc} · ${item.cost}🍎</small></span><button class="store-buy-btn" ${!canAfford?'disabled':''} onclick="buyStoreItem(${i})">BUY</button></div>`;}).join('');
}
function updateBossUI(){
  if(!bossState)return;
  const boss=BOSSES[bossState.bossIdx];
  const bHpPct=Math.max(0,bossState.bossHp/boss.maxHp*100);const pHpPct=Math.max(0,bossState.playerHp/bossState.playerMaxHp*100);
  document.getElementById('boss-hp-fill').style.width=bHpPct+'%';document.getElementById('boss-hp-fill').style.background=bHpPct>50?'var(--pink)':bHpPct>25?'var(--orange)':'#ff0000';
  document.getElementById('boss-hp-text').textContent=`${bossState.bossHp}/${boss.maxHp}`;
  document.getElementById('player-hp-fill').style.width=pHpPct+'%';document.getElementById('player-hp-fill').style.background=pHpPct>50?'var(--green)':pHpPct>25?'var(--yellow)':'var(--pink)';
  document.getElementById('player-hp-text').textContent=`${bossState.playerHp}/${bossState.playerMaxHp}`;
  const weapon=WEAPONS[bossState.weaponIdx];document.getElementById('weapon-display').textContent=weapon.emoji;document.getElementById('weapon-name').textContent=weapon.name;document.getElementById('weapon-dmg').textContent=`${weapon.dmg} dmg/hit`;
  document.getElementById('boss-name-display').textContent=`${boss.emoji} ${boss.name}`;document.getElementById('boss-phase-display').textContent=boss.phase;
  document.getElementById('shield-count').textContent=`${bossState.shieldCharges} charges left`;document.getElementById('shield-btn').disabled=bossState.shieldCharges<=0;
  document.getElementById('heal-btn').disabled=bossState.snacks<1;
}
function drawBossCanvas(){
  if(!bossState||!bossState.running){cancelAnimationFrame(bossRAF);return;}
  bossRAF=requestAnimationFrame(drawBossCanvas);bossState.animFrame++;
  const canvas=document.getElementById('boss-canvas');const ctx=canvas.getContext('2d');const W=canvas.width,H=canvas.height;
  const boss=BOSSES[bossState.bossIdx];
  ctx.clearRect(0,0,W,H);
  const grad=ctx.createRadialGradient(W/2,H/2,50,W/2,H/2,W/2);grad.addColorStop(0,'#2a0010');grad.addColorStop(1,'#0a0c14');ctx.fillStyle=grad;ctx.fillRect(0,0,W,H);
  ctx.strokeStyle='rgba(255,45,120,0.04)';ctx.lineWidth=1;for(let i=0;i<W;i+=40){ctx.beginPath();ctx.moveTo(i,0);ctx.lineTo(i,H);ctx.stroke();}for(let i=0;i<H;i+=40){ctx.beginPath();ctx.moveTo(0,i);ctx.lineTo(W,i);ctx.stroke();}

  // Warning flash overlay
  if(bossState.warnActive&&Math.floor(bossState.animFrame/8)%2===0){ctx.fillStyle='rgba(255,0,0,0.12)';ctx.fillRect(0,0,W,H);}

  // Boss
  const bossY=H*0.22+Math.sin(bossState.animFrame*0.04)*10;
  ctx.save();ctx.translate(W/2,bossY);ctx.scale(bossState.hit?0.85:1,bossState.hit?0.85:1);if(bossState.hit)ctx.globalAlpha=0.5;
  ctx.font='110px serif';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText(boss.emoji,0,0);ctx.restore();

  // Boss HP bar
  const barW=200,barH=14,bx=W/2-barW/2,by=18;
  ctx.fillStyle='rgba(0,0,0,0.5)';ctx.fillRect(bx,by,barW,barH);
  const bpct=Math.max(0,bossState.bossHp/boss.maxHp);
  ctx.fillStyle=bpct>0.5?'#ff2d78':bpct>0.25?'#ff7b00':'#ff0000';ctx.fillRect(bx,by,barW*bpct,barH);
  ctx.strokeStyle='rgba(255,255,255,0.2)';ctx.lineWidth=1;ctx.strokeRect(bx,by,barW,barH);
  ctx.fillStyle='#fff';ctx.font='bold 10px Nunito';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText(`${boss.name} — ${bossState.bossHp} HP`,W/2,by+barH/2);

  // Enemy projectiles (boss → player)
  bossState.projectiles=bossState.projectiles.filter(p=>{
    p.frame++;const dy=p.ty-p.y;if(dy<6){return false;}p.y+=p.speed;p.alpha=Math.max(0,p.alpha-0.02);
    ctx.save();ctx.globalAlpha=p.alpha;ctx.font='24px serif';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText(p.emoji,p.x,p.y);ctx.restore();
    return p.y<H+30;
  });

  // Player projectiles (player → boss)
  bossState.playerProjectiles=bossState.playerProjectiles.filter(p=>{
    p.frame++;const dy=p.ty-p.y;if(Math.abs(dy)<8){return false;}p.y-=p.speed;p.alpha=Math.max(0,p.alpha-0.02);
    ctx.save();ctx.globalAlpha=p.alpha;ctx.font='22px serif';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText(p.emoji,p.x,p.y);ctx.restore();
    return p.y>-20;
  });

  // Player
  const playerY2=H-80+(bossState.playerHit?-10:0);
  ctx.save();if(bossState.playerHit)ctx.globalAlpha=0.4;if(bossState.shielded){ctx.shadowColor='#00d4ff';ctx.shadowBlur=20;}
  ctx.scale(-1,1);ctx.font='60px serif';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText('🧍',-(W/2),playerY2);ctx.restore();

  // Player HP bar above player
  const phW=100,phH=10,phx=W/2-phW/2,phy=H-100;
  ctx.fillStyle='rgba(0,0,0,0.5)';ctx.fillRect(phx,phy,phW,phH);
  const phpct=Math.max(0,bossState.playerHp/bossState.playerMaxHp);ctx.fillStyle=phpct>0.5?'#39ff14':phpct>0.25?'#ffe600':'#ff2d78';ctx.fillRect(phx,phy,phW*phpct,phH);
  ctx.strokeStyle='rgba(255,255,255,0.2)';ctx.lineWidth=1;ctx.strokeRect(phx,phy,phW,phH);
  ctx.fillStyle='rgba(255,255,255,0.6)';ctx.font='9px Nunito';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText(`${bossState.playerHp} HP`,W/2,phy+phH/2);

  // TAP TO ATTACK button area
  ctx.fillStyle='rgba(255,45,120,0.12)';ctx.beginPath();ctx.roundRect&&ctx.roundRect(W/2-65,H-36,130,28,8)||ctx.fillRect(W/2-65,H-36,130,28);ctx.fill();
  ctx.strokeStyle='rgba(255,45,120,0.5)';ctx.lineWidth=1;ctx.strokeRect(W/2-65,H-36,130,28);
  ctx.fillStyle='rgba(255,45,120,0.9)';ctx.font='bold 12px Nunito';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText('TAP TO ATTACK ⚔️',W/2,H-22);
}
document.addEventListener('DOMContentLoaded',()=>{
  const bc=document.getElementById('boss-canvas');if(bc){bc.addEventListener('click',attackBoss);bc.addEventListener('touchstart',e=>{e.preventDefault();attackBoss();},{passive:false});}
});
function bossGameOver(){
  bossState.running=false;clearTimeout(bossAtkTimeout);clearTimeout(bossSnackTimeout);cancelAnimationFrame(bossRAF);playGameOver();
  document.getElementById('boss-warning').classList.remove('active');
  const ov=document.getElementById('boss-overlay');ov.style.display='flex';
  ov.innerHTML=`<h2 style="color:var(--pink)">💀 YOU WERE DEFEATED!</h2><p>You fought ${BOSSES[bossState.bossIdx].name}!<br>Use your snacks and shield better next time!</p><button class="gbtn gbtn-pink" onclick="startBoss()">TRY AGAIN ⚔️</button>`;
}
function bossWin(){
  bossState.running=false;clearTimeout(bossAtkTimeout);clearTimeout(bossSnackTimeout);cancelAnimationFrame(bossRAF);
  document.getElementById('boss-warning').classList.remove('active');
  launchConfetti();playWin();
  setTimeout(()=>{
    document.querySelectorAll('.screen').forEach(s=>s.classList.remove('active'));
    document.getElementById('secret-win-screen').classList.add('active');
    // Reset item positions
    ['win-goat','win-title','win-msg','win-back'].forEach(id=>{const el=document.getElementById(id);if(el)el.classList.remove('fallen');});
  },2000);
}

// ============================================================
// SECRET WIN SCREEN — fall animation
// ============================================================
function winFallAndGoHome(){
  // Trigger fall
  ['win-goat','win-title','win-msg','win-back'].forEach((id,i)=>{
    setTimeout(()=>{const el=document.getElementById(id);if(el)el.classList.add('fallen');},i*120);
  });
  // Sound
  playGameOver();
  // Navigate after animation
  setTimeout(()=>{
    ['win-goat','win-title','win-msg','win-back'].forEach(id=>{const el=document.getElementById(id);if(el)el.classList.remove('fallen');});
    goHome();
  },1600);
}
