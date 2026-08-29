(() => {
  const KEY = 'reaze_cookie_notice_v2';
  const banner = document.querySelector('[data-cookie-banner]');
  const reopen = document.querySelector('[data-cookie-reopen]');
  if (!banner) return;

  const dismissed = localStorage.getItem(KEY) === 'dismissed';
  if (!dismissed) banner.classList.add('show');
  else reopen?.classList.add('show');

  banner.querySelector('[data-cookie-ok]')?.addEventListener('click', () => {
    localStorage.setItem(KEY, 'dismissed');
    banner.classList.remove('show');
    reopen?.classList.add('show');
  });

  reopen?.addEventListener('click', () => {
    banner.classList.add('show');
    reopen.classList.remove('show');
  });
})();
