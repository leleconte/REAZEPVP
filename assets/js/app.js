(() => {
  const root = document.documentElement;
  const nav = document.querySelector('[data-nav]');
  const toggle = document.querySelector('[data-menu-toggle]');
  const mobileMenu = document.querySelector('[data-mobile-menu]');

  const syncNav = () => nav?.classList.toggle('scrolled', scrollY > 24);
  syncNav();
  addEventListener('scroll', syncNav, { passive: true });

  if (toggle && mobileMenu) {
    toggle.addEventListener('click', () => {
      const open = mobileMenu.classList.toggle('open');
      toggle.classList.toggle('open', open);
      toggle.setAttribute('aria-expanded', String(open));
      document.body.classList.toggle('menu-open', open);
    });
    mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      toggle.classList.remove('open');
      toggle.setAttribute('aria-expanded','false');
      document.body.classList.remove('menu-open');
    }));
  }

  const reveal = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        reveal.unobserve(entry.target);
      }
    });
  }, { threshold: .12 });
  document.querySelectorAll('.reveal').forEach(el => reveal.observe(el));

  document.querySelectorAll('.faq-item').forEach(item => {
    const btn = item.querySelector('.faq-question');
    btn?.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(open => open.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  });

  const heroStage = document.querySelector('[data-logo-stage]');
  if (heroStage && matchMedia('(pointer:fine)').matches) {
    heroStage.addEventListener('pointermove', e => {
      const r = heroStage.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - .5;
      const y = (e.clientY - r.top) / r.height - .5;
      heroStage.style.setProperty('--rx', `${(-y * 8).toFixed(2)}deg`);
      heroStage.style.setProperty('--ry', `${(x * 10).toFixed(2)}deg`);
      heroStage.style.setProperty('--mx', `${(x * 22).toFixed(2)}px`);
      heroStage.style.setProperty('--my', `${(y * 18).toFixed(2)}px`);
    });
    heroStage.addEventListener('pointerleave', () => {
      heroStage.style.setProperty('--rx','0deg');
      heroStage.style.setProperty('--ry','0deg');
      heroStage.style.setProperty('--mx','0px');
      heroStage.style.setProperty('--my','0px');
    });
  }

  const pointer = document.querySelector('.pointer-glow');
  if (pointer && matchMedia('(pointer:fine)').matches) {
    addEventListener('pointermove', e => {
      pointer.animate({ transform:`translate3d(${e.clientX - 160}px,${e.clientY - 160}px,0)` }, { duration: 450, fill:'forwards' });
    }, { passive:true });
  }

  const canvas = document.querySelector('#particle-canvas');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (canvas && !reduced) {
    const ctx = canvas.getContext('2d');
    let w = 0, h = 0, dpr = 1, particles = [];
    const mouse = { x:-9999, y:-9999 };
    const resize = () => {
      w = innerWidth; h = innerHeight; dpr = Math.min(devicePixelRatio || 1, 2);
      canvas.width = w*dpr; canvas.height = h*dpr; canvas.style.width = `${w}px`; canvas.style.height = `${h}px`;
      ctx.setTransform(dpr,0,0,dpr,0,0);
      const count = Math.max(30, Math.min(95, Math.floor(w*h/17000)));
      particles = Array.from({length:count}, () => ({
        x:Math.random()*w, y:Math.random()*h,
        vx:(Math.random()-.5)*.24, vy:(Math.random()-.5)*.24,
        r:Math.random()*1.35+.35, a:Math.random()*.45+.12
      }));
    };
    addEventListener('resize',resize);
    addEventListener('pointermove',e => { mouse.x=e.clientX; mouse.y=e.clientY; }, {passive:true});
    resize();
    const frame = () => {
      ctx.clearRect(0,0,w,h);
      for (const p of particles) {
        p.x += p.vx; p.y += p.vy;
        if (p.x < -5 || p.x > w+5) p.vx *= -1;
        if (p.y < -5 || p.y > h+5) p.vy *= -1;
        const dx = p.x-mouse.x, dy = p.y-mouse.y, dist = Math.hypot(dx,dy) || 1;
        if (dist < 120) { p.x += dx/dist*.45; p.y += dy/dist*.45; }
        ctx.beginPath();
        ctx.fillStyle = `rgba(228,86,255,${p.a})`;
        ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
        ctx.fill();
      }
      requestAnimationFrame(frame);
    };
    frame();
  }

  const cfg = window.REAZE_CONFIG || {};
  const statusRoot = document.querySelector('[data-status-root]');
  if (statusRoot && cfg.statusEndpoint) {
    fetch(cfg.statusEndpoint, {cache:'no-store'})
      .then(r => r.ok ? r.json() : Promise.reject())
      .then(data => {
        statusRoot.querySelector('[data-state]').textContent = data.online ? 'Online' : 'Offline';
        statusRoot.querySelector('[data-state-card]')?.classList.toggle('online', !!data.online);
        statusRoot.querySelector('[data-players]').textContent = data.players ?? '—';
        statusRoot.querySelector('[data-max]').textContent = data.maxPlayers ?? '—';
        statusRoot.querySelector('[data-queue]').textContent = data.queue ?? '—';
        statusRoot.querySelector('[data-uptime]').textContent = data.uptime ?? '—';
        statusRoot.querySelector('[data-ping]').textContent = data.ping != null ? `${data.ping} ms` : '—';
      }).catch(() => {});
  }
})();
