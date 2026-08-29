(()=>{
  const KEY='reaze_consent_v1'; const banner=document.querySelector('.cookie-banner'); const fab=document.querySelector('.cookie-fab'); const settings=document.querySelector('.cookie-settings');
  if(!banner)return;
  const read=()=>{try{return JSON.parse(localStorage.getItem(KEY)||'null')}catch{return null}};
  const save=(type)=>{localStorage.setItem(KEY,JSON.stringify({necessary:true,analytics:type==='all',marketing:type==='all',savedAt:new Date().toISOString()}));banner.classList.remove('show');fab?.classList.add('show')};
  if(!read()) banner.classList.add('show'); else fab?.classList.add('show');
  banner.querySelector('[data-reject]')?.addEventListener('click',()=>save('necessary'));
  banner.querySelector('[data-accept]')?.addEventListener('click',()=>save('all'));
  banner.querySelector('[data-customize]')?.addEventListener('click',()=>settings?.classList.toggle('open'));
  banner.querySelector('[data-save]')?.addEventListener('click',()=>save('necessary'));
  fab?.addEventListener('click',()=>{banner.classList.add('show');fab.classList.remove('show')});
})();
