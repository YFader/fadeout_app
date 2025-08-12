// Telegram init & helpers
const TG = window.Telegram?.WebApp; try{ TG?.expand(); TG?.ready(); }catch{}
const initDataRaw = TG?.initData || '';

const $ = s => document.querySelector(s);
const roomSelect = $('#roomSelect');
const dateInput = $('#dateInput');
const scroller = $('#timelineScroller');
const todayHint = $('#todayHint');
const summaryText = $('#summaryText');
const bookBtn = $('#bookBtn');
const myList = $('#myList');
const myListSkeleton = $('#myListSkeleton');
const toastEl = document.getElementById('toast');

function showToast(text, ms=2200){ if(!toastEl) return; toastEl.textContent=text; toastEl.hidden=false; clearTimeout(showToast._t); showToast._t=setTimeout(()=> toastEl.hidden=true, ms); }

async function api(url, opts={}){
  const r = await fetch(url, { ...opts, headers: { 'Content-Type':'application/json', 'X-Telegram-InitData-Raw': initDataRaw, ...(opts.headers||{}) } });
  if (!r.ok) throw new Error((await r.json().catch(()=>({}))).error || r.statusText);
  return r.json();
}

async function initAdminButton(){
  const btn = document.getElementById('adminBtn');
  if (!btn) return;
  try{ const me = await api('/api/me'); if (me?.is_admin){ btn.style.display='inline-flex'; btn.onclick = ()=> location.href='/admin.html'; } else { btn.remove(); } } catch { btn.remove(); }
}

// Animations: counters & timers
const easeOutCubic = t => 1 - Math.pow(1 - t, 3);
function animateCount(el, to, { from = 0, duration = 800, formatter } = {}) {
  if (!el) return;
  const start = performance.now();
  function tick(now) {
    const p = Math.min(1, (now - start) / duration);
    const v = from + (to - from) * easeOutCubic(p);
    el.textContent = formatter ? formatter(v) : Math.round(v);
    if (p < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}
function createFlipCounter(el, initial = '000') {
  el.classList.add('counter'); el.innerHTML = '';
  String(initial).split('').forEach(ch => {
    const d = document.createElement('span'); d.className = 'digit';
    const sheet = document.createElement('div'); sheet.className = 'sheet';
    const set = (ch === '.' || ch === ':') ? [ch] : ['0','1','2','3','4','5','6','7','8','9'];
    sheet.innerHTML = set.map(n => `<div class="num">${n}</div>`).join('');
    d.dataset.set = (ch === '.' ? 'dot' : (ch === ':' ? 'colon' : 'num'));
    d.appendChild(sheet); if (ch === '.' || ch === ':') d.style.width = '.35em';
    el.appendChild(d);
  });
  updateFlipCounter(el, initial);
}
function updateFlipCounter(el, value) {
  const str = String(value);
  const digits = el.querySelectorAll('.digit');
  if (digits.length !== str.length) { createFlipCounter(el, str); return; }
  [...digits].forEach((d, i) => { const ch = str[i]; if (d.dataset.set !== 'num') return; const idx = Number(ch); d.classList.add('flip'); d.firstChild.style.transform = `translateY(${-idx * 1.2}em)`; });
}
function startCountdown(el, seconds, { onEnd } = {}) {
  if (!el) return () => {};
  let left = seconds;
  const fmt = s => { const m=Math.floor(s/60), ss=String(s%60).padStart(2,'0'); return `${String(m).padStart(2,'0')}:${ss}`; };
  el.classList.add('counter'); createFlipCounter(el, fmt(left));
  const t = setInterval(() => { left -= 1; if (left <= 0) { clearInterval(t); updateFlipCounter(el, '00:00'); el.closest('.promo-banner')?.classList.remove('urgent'); onEnd?.(); return; } updateFlipCounter(el, fmt(left)); if (left <= 5*60) el.closest('.promo-banner')?.classList.add('urgent'); }, 1000);
  return () => clearInterval(t);
}

// Time helpers: local date+hour -> UTC ISO
function localSlotToIso(dateStr, hour){
  const [y,m,d] = dateStr.split('-').map(Number);
  const dt = new Date(y, m-1, d, hour, 0, 0, 0);
  return new Date(dt.getTime() - dt.getTimezoneOffset()*60000).toISOString();
}

// Rooms & timeline
async function loadRooms(){ const rooms=await api('/api/rooms'); roomSelect.innerHTML = rooms.map(r=>`<option value="${r.id}">${r.name} (${r.code})</option>`).join(''); }
function setDefaultDate(){ const d=new Date(); const y=d.getFullYear(), m=String(d.getMonth()+1).padStart(2,'0'), dd=String(d.getDate()).padStart(2,'0'); dateInput.value=`${y}-${m}-${dd}`; }

let selectedHour = null, appliedPromo = null;

async function buildTimeline(){
  const roomId = roomSelect.value; const dateStr = dateInput.value; if (!roomId || !dateStr) return;
  document.getElementById('timelineSkeleton').style.display='flex'; scroller.innerHTML='';
  const dayStart = localSlotToIso(dateStr, 0); const dayEnd = localSlotToIso(dateStr, 23);
  const busy = await api(`/api/availability?roomId=${roomId}&from=${dayStart}&to=${dayEnd}`).catch(()=>({busy:[]}));
  document.getElementById('timelineSkeleton').style.display='none';
  const busyRanges = busy.busy.map(b=>[new Date(b.start_utc), new Date(b.end_utc)]);
  const hours=[...Array(24).keys()];
  const isBusy=(h)=>{ const s=new Date(localSlotToIso(dateStr, h)); const e=new Date(localSlotToIso(dateStr, h+1)); return busyRanges.some(([S,E])=> !(e<=S || s>=E)); };
  scroller.innerHTML='';
  hours.forEach(h=>{ const el=document.createElement('div'); el.className='time-slot'+(isBusy(h)?' busy':''); el.dataset.hour=h; el.innerHTML=`<div style="font-size:12px;color:var(--muted)">час</div><div style="font-weight:600">${String(h).padStart(2,'0')}:00</div>`; if(!isBusy(h)){ el.onclick=()=>selectHour(h,el); } scroller.appendChild(el); });
  const now=new Date(); const selDate=new Date(dateStr+'T00:00'); todayHint.textContent = selDate.toDateString()===now.toDateString() ? `Сейчас: ${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}` : '';
  selectedHour=null; updateSummary();
}

function selectHour(h, el){ [...scroller.children].forEach(x=>x.classList.remove('selected')); el.classList.add('selected'); selectedHour=h; updateSummary(); }

async function updateSummary(){
  if (selectedHour == null) { summaryText.textContent='Время не выбрано'; bookBtn.disabled=true; return; }
  const roomId=roomSelect.value; const dateStr=dateInput.value;
  const startIso = localSlotToIso(dateStr, selectedHour);
  const endIso = localSlotToIso(dateStr, selectedHour+1);
  try{
    const resp = await api(`/api/check-promo?roomId=${roomId}&hours=1${appliedPromo?`&code=${encodeURIComponent(appliedPromo)}`:''}`);
    summaryText.innerHTML = `Старт: <b>${new Date(startIso).toLocaleString()}</b> • Конец: <b>${new Date(endIso).toLocaleString()}</b> • Итог: `;
    const priceEl = document.createElement('span'); summaryText.appendChild(priceEl);
    animateCount(priceEl, resp.finalPriceCents/100, { from:0, duration:700, formatter: v => v.toFixed(2)+' '+(resp.currency||'') });
  }catch{ summaryText.innerHTML = `Старт: <b>${new Date(startIso).toLocaleString()}</b> • Конец: <b>${new Date(endIso).toLocaleString()}</b> • Итог: будет на шаге оплаты`; }
  bookBtn.disabled=false;
}

document.getElementById('applyPromo').addEventListener('click', async ()=>{
  appliedPromo = document.getElementById('promoInput').value.trim() || null;
  document.getElementById('promoSkel').style.display=''; document.getElementById('applyPromo').disabled=true;
  try { await updateSummary(); } finally { document.getElementById('promoSkel').style.display='none'; document.getElementById('applyPromo').disabled=false; }
});

bookBtn.addEventListener('click', async ()=>{
  if (selectedHour == null) return;
  const dateStr = dateInput.value;
  const startIso = localSlotToIso(dateStr, selectedHour);
  const endIso = localSlotToIso(dateStr, selectedHour+1);
  try{
    const r = await api('/api/book', { method:'POST', body: JSON.stringify({ roomId: roomSelect.value, startUtc: startIso, endUtc: endIso, promoCode: appliedPromo }) });
    showToast('Бронь создана #' + (r.bookingId || '')); await refreshMy();
  } catch(e){ showToast('Ошибка: ' + e.message); }
});

async function refreshMy(){
  myListSkeleton.style.display=''; myList.innerHTML='';
  const list = await api('/api/my-bookings').catch(()=>[]);
  myListSkeleton.style.display='none';
  if (!list.length){ myList.innerHTML='<div class="muted">Пока пусто</div>'; return; }
  list.forEach(b=>{
    const div=document.createElement('div'); div.className='my-card';
    const s=new Date(b.start_utc), e=new Date(b.end_utc);
    div.innerHTML=`<strong>${b.name} (${b.code})</strong>
      <div>${s.toLocaleString()} → ${e.toLocaleString()}</div>
      <div class="muted">Статус: ${b.status} • Оплата: ${b.payment_status||'unpaid'}</div>
      <div class="actions"></div>`;
    const act=div.querySelector('.actions');
    if (b.status==='confirmed' && b.payment_status!=='succeeded'){
      const payBtn=document.createElement('button'); payBtn.textContent='Оплатить'; payBtn.onclick=()=>startPay(b.id); act.appendChild(payBtn);
    }
    const delBtn=document.createElement('button'); delBtn.className='secondary'; delBtn.textContent='Отменить'; delBtn.onclick=async()=>{ try{ await api('/api/bookings?id='+b.id,{method:'DELETE'}); refreshMy(); }catch(e){ showToast('Ошибка отмены'); } }; act.appendChild(delBtn);
    myList.appendChild(div);
  });
}

// YooKassa embedded
async function loadYooWidgetScript(){
  if (window.YooMoneyCheckoutWidget) return;
  await new Promise((res,rej)=>{ const s=document.createElement('script'); s.src='https://yookassa.ru/checkout-widget/v1/checkout-widget.js'; s.onload=res; s.onerror=rej; document.head.appendChild(s); });
}
async function startPay(bookingId){
  try{
    const resp = await api('/api/pay?id='+bookingId,{method:'POST'});
    if (resp.alreadyPaid){ showToast('Уже оплачено'); return refreshMy(); }
    const token = resp.confirmationToken;
    const ykModal = document.getElementById('yk-modal'); const ykSkeleton = document.getElementById('ykSkeleton');
    ykModal.hidden=false; ykSkeleton.style.display='';
    await loadYooWidgetScript();
    const widget = new window.YooMoneyCheckoutWidget({
      confirmation_token: token,
      customization: { modal:false, colors:{ control_primary:'#308a2f', control_primary_content:'#fff', background:'#101010', border:'#222', text:'#fff' } },
      error_callback: e => console.error(e)
    });
    widget.render('yk-widget').then(()=> ykSkeleton.style.display='none');
    document.getElementById('yk-close').onclick = ()=> ykModal.hidden=true;
    (async function poll(){ for(let i=0;i<20;i++){ await new Promise(r=>setTimeout(r,2000)); try{ const st=await api('/api/payment-status?id='+bookingId); if(st.payment_status==='succeeded'){ showToast('Оплата прошла'); ykModal.hidden=true; await refreshMy(); return; } if(st.payment_status==='canceled'){ showToast('Оплата отменена'); ykModal.hidden=true; return; } }catch{} } })();
  }catch(e){ showToast('Ошибка оплаты: '+e.message); }
}

// Collection & Support
document.getElementById('btnCollection')?.addEventListener('click', async()=>{
  const m=document.getElementById('collectionModal'); const list = document.getElementById('collectionList'); const sk = document.getElementById('collectionSkeleton');
  m.hidden=false; sk.style.display=''; list.innerHTML='';
  try{ const items = await api('/api/my-vinyls'); sk.style.display='none'; list.innerHTML = items.map(v=>`<div class="vinyl-card"><img src="${v.image_url||''}" alt="${v.name||''}" style="width:100%;aspect-ratio:1/1;object-fit:cover;border-radius:8px"><div class="vinyl-meta"><strong>${v.name||''}</strong><br>${v.rarity||''}</div></div>`).join(''); }catch{ sk.style.display='none'; list.innerHTML='<p class="muted">Ошибка загрузки</p>'; }
});
document.getElementById('collectionClose')?.addEventListener('click', ()=> document.getElementById('collectionModal').hidden=true);

document.getElementById('btnSupport')?.addEventListener('click', ()=> document.getElementById('supportModal').hidden=false);
document.getElementById('supportClose')?.addEventListener('click', ()=> document.getElementById('supportModal').hidden=true);
document.getElementById('supportOpenTG')?.addEventListener('click', ()=> window.Telegram?.WebApp?.openTelegramLink ? Telegram.WebApp.openTelegramLink('https://t.me/fadeout_manages') : window.open('https://t.me/fadeout_manages','_blank'));
document.getElementById('supportCopy')?.addEventListener('click', async()=>{ try{ await navigator.clipboard.writeText('@fadeout_manages'); showToast('Ник скопирован'); }catch{ showToast('Скопируйте: @fadeout_manages'); } });

// Stats
async function initHoursThisMonthCounter(){
  const el = document.getElementById('hoursCounter');
  if (!el) return;
  createFlipCounter(el,'000');
  let hours = 0;
  try{
    const list = await api('/api/my-bookings');
    const now=new Date(); const y=now.getFullYear(), m=now.getMonth();
    const monthStart=new Date(Date.UTC(y,m,1,0,0,0)); const nextMonth=new Date(Date.UTC(y,m+1,1,0,0,0));
    for (const b of list){ const s=new Date(b.start_utc), e=new Date(b.end_utc); const from=(s>monthStart?s:monthStart), to=(e<nextMonth?e:nextMonth); const dur=Math.max(0,(to-from)/3600000); hours+=dur; }
  }catch{}
  updateFlipCounter(el, String(Math.round(hours)).padStart(3,'0'));
}
function initPromoBanner(){ const timer=document.getElementById('promoTimer'); if (timer) startCountdown(timer, 3*60*60, { onEnd: ()=> document.querySelector('.promo-banner')?.remove() }); }

async function init(){ await initAdminButton(); await loadRooms(); setDefaultDate(); await buildTimeline(); await refreshMy(); await initHoursThisMonthCounter(); initPromoBanner(); roomSelect.onchange = buildTimeline; dateInput.onchange = buildTimeline; }
document.addEventListener('DOMContentLoaded', init);
