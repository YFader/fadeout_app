
(function promoUrgency(){
  const banner = document.querySelector('.promo-banner');
  const timerEl = document.getElementById('promoTimer');
  if (!banner || !timerEl) return;
  let total = 3*60*60;
  let left = total;
  const progress = document.getElementById('promoProgress');
  const tick = () => {
    left = Math.max(0, left - 1);
    if (progress) progress.style.width = `${(1 - left/total)*100}%`;
    if (left <= 5*60) banner.classList.add('urgent');
    timerEl.textContent = new Date(left*1000).toISOString().substring(11,19);
  };
  setInterval(tick, 1000);
})();

(function enhanceSlots(){
  const scroller = document.getElementById('timelineScroller');
  if (!scroller) return;
  scroller.addEventListener('click', (e)=>{
    const card = e.target.closest('.time-slot, .slot');
    if (!card || card.classList.contains('busy')) return;
    scroller.querySelectorAll('.time-slot.selected, .slot.selected').forEach(n=> n.classList.remove('selected'));
    card.classList.add('selected');
  });
})();

(function performanceHint(){
  const isLowEnd = navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4;
  if (isLowEnd) document.documentElement.classList.add('low-end');
})();

(function tuneForIOS(){
  const ua = navigator.userAgent || "";
  const isiOS = /iPad|iPhone|iPod/.test(ua);
  if (isiOS) {
    document.querySelectorAll('.btn').forEach(b => b.classList.add('btn-lg'));
  }
})();
