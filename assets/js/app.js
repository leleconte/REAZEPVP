(()=>{
  const cfg=window.REAZE_CONFIG||{};
  document.querySelectorAll('[data-discord]').forEach(a=>a.href=cfg.discordUrl||'#');
  document.querySelectorAll('[data-connect]').forEach(a=>a.href=cfg.connectUrl||'#');
  document.querySelectorAll('[data-legal]').forEach(el=>{const key=el.dataset.legal; if(cfg.legal&&cfg.legal[key])el.textContent=cfg.legal[key]});

  const nav=document.querySelector('.nav'); const toggle=document.querySelector('.mobile-toggle'); const links=document.querySelector('.nav-links');
  addEventListener('scroll',()=>nav?.classList.toggle('scrolled',scrollY>20),{passive:true});
  toggle?.addEventListener('click',()=>links?.classList.toggle('open'));
  links?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>links.classList.remove('open')));

  document.querySelectorAll('.faq-q').forEach(btn=>btn.addEventListener('click',()=>btn.closest('.faq-item').classList.toggle('open')));
  const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.14});
  document.querySelectorAll('.reveal').forEach(el=>io.observe(el));

  // pointer parallax logo
  const stage=document.querySelector('.logo-stage');
  if(stage && !matchMedia('(prefers-reduced-motion: reduce)').matches){
    addEventListener('pointermove',e=>{const x=(e.clientX/innerWidth-.5)*10,y=(e.clientY/innerHeight-.5)*-10;stage.style.transform=`rotateY(${x}deg) rotateX(${y}deg)`},{passive:true});
  }

  // Lightweight reactive particles; no third-party trackers or libraries.
  const c=document.getElementById('particle-canvas');
  if(c && !matchMedia('(prefers-reduced-motion: reduce)').matches){
    const ctx=c.getContext('2d'); let dpr=Math.min(devicePixelRatio||1,2),w=0,h=0; const mouse={x:-9999,y:-9999}; let dots=[];
    function resize(){w=innerWidth;h=innerHeight;c.width=w*dpr;c.height=h*dpr;c.style.width=w+'px';c.style.height=h+'px';ctx.setTransform(dpr,0,0,dpr,0,0);dots=Array.from({length:Math.min(95,Math.floor(w*h/15000))},()=>({x:Math.random()*w,y:Math.random()*h,vx:(Math.random()-.5)*.22,vy:(Math.random()-.5)*.22,r:Math.random()*1.3+.35,a:Math.random()*.45+.12}))}
    addEventListener('resize',resize); addEventListener('pointermove',e=>{mouse.x=e.clientX;mouse.y=e.clientY},{passive:true}); resize();
    function frame(){ctx.clearRect(0,0,w,h);for(const p of dots){p.x+=p.vx;p.y+=p.vy;if(p.x<0||p.x>w)p.vx*=-1;if(p.y<0||p.y>h)p.vy*=-1;const dx=p.x-mouse.x,dy=p.y-mouse.y,dist=Math.hypot(dx,dy);if(dist<130){p.x+=dx/dist*.5;p.y+=dy/dist*.5}ctx.beginPath();ctx.fillStyle=`rgba(226,91,255,${p.a})`;ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fill()}requestAnimationFrame(frame)}frame();
  }

  // Optional future status endpoint: expected {online:boolean, players:number,maxPlayers:number,uptime:string}
  const status=document.querySelector('[data-status-root]');
  if(status && cfg.statusEndpoint){fetch(cfg.statusEndpoint,{cache:'no-store'}).then(r=>r.json()).then(d=>{
    status.querySelector('[data-state]').textContent=d.online?'Operativo':'Offline';
    status.querySelector('[data-players]').textContent=d.players??'—';
    status.querySelector('[data-max]').textContent=d.maxPlayers??'—';
    status.querySelector('[data-uptime]').textContent=d.uptime??'—';
  }).catch(()=>{});}
})();
