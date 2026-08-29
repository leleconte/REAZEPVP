(() => {
  const cfg = window.REAZE_CONFIG || {};
  const page = (location.pathname.split('/').pop() || 'index.html').toLowerCase();

  const navItems = [
    ['index.html', 'Home'],
    ['regolamento.html', 'Regolamento'],
    ['shop.html', 'Shop'],
    ['faq.html', 'FAQ'],
    ['status.html', 'Status']
  ];

  const navSlot = document.querySelector('[data-nav-slot]');
  if (navSlot) {
    navSlot.innerHTML = `
      <header class="site-nav" data-nav>
        <div class="nav-shell">
          <a class="brand" href="index.html" aria-label="REAZE PVP Home">
            <img src="assets/img/reaze-pvp-logo.png" alt="REAZE PVP">
            <span class="brand-word"><b>REAZE</b><small>PVP</small></span>
          </a>
          <nav class="nav-links" aria-label="Navigazione principale">
            ${navItems.map(([href,label]) => `<a class="${page === href ? 'active' : ''}" href="${href}">${label}</a>`).join('')}
            <a href="${cfg.discordUrl || '#'}" data-discord>Discord</a>
          </nav>
          <div class="nav-actions">
            <a class="nav-cta" href="${cfg.connectUrl || '#'}" data-connect>Gioca ora <span>↗</span></a>
            <button class="menu-toggle" type="button" aria-label="Apri menu" aria-expanded="false" data-menu-toggle>
              <span></span><span></span>
            </button>
          </div>
        </div>
        <div class="mobile-menu" data-mobile-menu>
          ${navItems.map(([href,label]) => `<a class="${page === href ? 'active' : ''}" href="${href}">${label}</a>`).join('')}
          <a href="${cfg.discordUrl || '#'}" data-discord>Discord</a>
          <a class="mobile-play" href="${cfg.connectUrl || '#'}" data-connect>Gioca ora</a>
        </div>
      </header>`;
  }

  const footerSlot = document.querySelector('[data-footer-slot]');
  if (footerSlot) {
    footerSlot.innerHTML = `
      <footer class="site-footer">
        <div class="footer-grid">
          <div class="footer-brand">
            <img src="assets/img/reaze-pvp-logo.png" alt="REAZE PVP">
            <p>Competizione, fair play e una community costruita attorno al PvP.</p>
          </div>
          <div>
            <h3>Link rapidi</h3>
            <a href="index.html">Home</a>
            <a href="regolamento.html">Regolamento</a>
            <a href="shop.html">Shop</a>
            <a href="faq.html">FAQ</a>
            <a href="status.html">Status</a>
          </div>
          <div>
            <h3>Community</h3>
            <a href="${cfg.discordUrl || '#'}" data-discord>Discord</a>
            <a href="regolamento.html">Regole PvP</a>
            <a href="faq.html">Supporto</a>
          </div>
          <div>
            <h3>Legale</h3>
            <a href="privacy.html">Privacy Policy</a>
            <a href="cookie-policy.html">Cookie Policy</a>
            <a href="termini.html">Termini d'uso</a>
          </div>
        </div>
        <div class="footer-bottom">
          <span>© <span data-current-year></span> REAZE PVP</span>
          <span>GIOCA • COMBATTI • RISPETTA</span>
        </div>
      </footer>`;
  }

  document.querySelectorAll('[data-current-year]').forEach(el => el.textContent = new Date().getFullYear());

  document.querySelectorAll('[data-discord]').forEach(el => {
    el.setAttribute('href', cfg.discordUrl || '#');
    if ((cfg.discordUrl || '#') === '#') {
      el.addEventListener('click', e => e.preventDefault());
    } else {
      el.setAttribute('target','_blank');
      el.setAttribute('rel','noopener noreferrer');
    }
  });

  document.querySelectorAll('[data-connect]').forEach(el => {
    el.setAttribute('href', cfg.connectUrl || '#');
    if ((cfg.connectUrl || '#') === '#') {
      el.addEventListener('click', e => e.preventDefault());
    }
  });
})();
