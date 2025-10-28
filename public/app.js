const FALLBACK_CSS = `:root {
  color-scheme: dark;
  --bg: #050709;
  --surface: #0b1114;
  --surface-soft: #10171b;
  --surface-pop: #131d22;
  --border: rgba(255, 255, 255, 0.08);
  --border-strong: rgba(99, 240, 153, 0.45);
  --text: #f4f6f8;
  --muted: rgba(244, 246, 248, 0.64);
  --accent: #63f099;
  --accent-text: #021d0d;
  --accent-soft: rgba(99, 240, 153, 0.18);
  --danger: #ff6b6b;
  --radius-lg: 20px;
  --radius-md: 16px;
  --radius-sm: 12px;
  --shadow: 0 24px 60px rgba(3, 12, 19, 0.45);
  font-family: 'Inter', 'SF Pro Display', 'Manrope', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  min-height: 100vh;
  background: radial-gradient(120% 120% at 50% 0%, rgba(24, 46, 38, 0.28), transparent 60%), var(--bg);
  color: var(--text);
  font-family: inherit;
  -webkit-font-smoothing: antialiased;
}

a {
  color: inherit;
  text-decoration: none;
}

button,
input,
select {
  font: inherit;
  color: inherit;
}

button {
  cursor: pointer;
  border: none;
  padding: 0 18px;
  height: 46px;
  border-radius: var(--radius-sm);
  background: linear-gradient(135deg, var(--accent), #49c97d);
  color: var(--accent-text);
  font-weight: 600;
  transition: transform 0.15s ease, box-shadow 0.3s ease;
  box-shadow: 0 10px 32px rgba(75, 212, 128, 0.35);
}

button:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: 0 18px 42px rgba(75, 212, 128, 0.45);
}

button:active:not(:disabled) {
  transform: translateY(1px);
}

button.secondary {
  background: rgba(255, 255, 255, 0.06);
  color: var(--text);
  border: 1px solid var(--border);
  box-shadow: none;
}

button.secondary:hover:not(:disabled) {
  border-color: rgba(255, 255, 255, 0.18);
}

button:disabled {
  opacity: 0.55;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

header.app-header {
  position: sticky;
  top: 0;
  z-index: 10;
  backdrop-filter: blur(12px);
  background: rgba(5, 7, 9, 0.72);
  border-bottom: 1px solid rgba(255, 255, 255, 0.04);
  padding: 18px clamp(16px, 4vw, 32px);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.brand {
  display: flex;
  align-items: center;
  gap: 14px;
}

.brand .logo {
  width: 48px;
  height: 48px;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.06);
  object-fit: cover;
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.08);
}

.brand .titles h1 {
  margin: 0;
  font-size: clamp(22px, 3vw, 30px);
  letter-spacing: 0.4px;
}

.brand .subtitle {
  margin-top: 2px;
  font-size: 14px;
  color: var(--muted);
}

nav.top-actions {
  display: flex;
  align-items: center;
  gap: 12px;
}

nav.top-actions button {
  height: 42px;
}

.admin-btn {
  width: 42px;
  height: 42px;
  padding: 0;
  display: grid;
  place-items: center;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.admin-btn svg {
  width: 20px;
  height: 20px;
  fill: var(--text);
}

.admin-btn.hidden {
  display: none;
}

.promo-banner {
  margin: clamp(16px, 4vw, 32px) auto 0;
  width: min(1080px, calc(100% - 32px));
  background: linear-gradient(135deg, rgba(99, 240, 153, 0.12), rgba(99, 240, 153, 0.04));
  border: 1px solid rgba(99, 240, 153, 0.25);
  border-radius: var(--radius-lg);
  padding: 18px clamp(16px, 4vw, 28px);
  display: flex;
  align-items: center;
  gap: 18px;
  position: relative;
  overflow: hidden;
}

.promo-banner strong {
  font-size: clamp(16px, 2.2vw, 20px);
}

.promo-banner span#promoTimer {
  font-variant-numeric: tabular-nums;
  font-weight: 600;
  color: var(--accent);
}

.promo-banner .chip {
  margin-left: auto;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.12);
  color: var(--text);
  height: 38px;
  padding: 0 16px;
  border-radius: 999px;
  font-size: 14px;
  font-weight: 500;
  transition: background 0.2s ease;
}

.promo-banner .chip:hover {
  background: rgba(255, 255, 255, 0.15);
}

.promo-progress {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 3px;
  background: rgba(99, 240, 153, 0.16);
  overflow: hidden;
}

.promo-progress span {
  display: block;
  height: 100%;
  width: 0;
  background: linear-gradient(90deg, rgba(99, 240, 153, 0.9), rgba(75, 185, 118, 0.9));
  transition: width 0.6s ease;
}

.promo-banner.urgent {
  box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.1), 0 12px 60px rgba(99, 240, 153, 0.25);
}

main.content {
  width: min(1080px, calc(100% - 32px));
  margin: 28px auto 60px;
  display: grid;
  gap: 28px;
  grid-template-columns: minmax(0, 2fr) minmax(0, 1fr);
}

section.controls {
  background: var(--surface);
  border-radius: var(--radius-lg);
  padding: 22px clamp(16px, 3vw, 28px);
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  align-items: flex-end;
  box-shadow: var(--shadow);
}

label.control {
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-width: 180px;
}

label.control span {
  color: var(--muted);
  font-size: 13px;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

label.control select,
label.control input {
  background: var(--surface-soft);
  border-radius: var(--radius-sm);
  border: 1px solid rgba(255, 255, 255, 0.08);
  padding: 12px 14px;
  color: var(--text);
  min-height: 46px;
}

.quick {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.quick button {
  background: rgba(255, 255, 255, 0.06);
  color: var(--text);
  height: 38px;
  padding: 0 16px;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: none;
}

section.timeline {
  background: var(--surface);
  border-radius: var(--radius-lg);
  padding: 24px clamp(16px, 3vw, 28px);
  display: flex;
  flex-direction: column;
  gap: 18px;
  box-shadow: var(--shadow);
}

.timeline-head {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
}

.timeline-head strong {
  font-size: 18px;
}

.timeline-head .muted {
  color: var(--muted);
  font-size: 14px;
  text-transform: capitalize;
}

#timelineSkeleton {
  display: none;
}

#timelineSkeleton .skel-slot {
  flex: 1;
  min-height: 80px;
}

.timeline-scroller {
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: minmax(150px, 1fr);
  gap: 14px;
  overflow-x: auto;
  padding-bottom: 4px;
  scrollbar-width: thin;
}

.timeline-scroller::-webkit-scrollbar {
  height: 6px;
}

.timeline-scroller::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.18);
  border-radius: 999px;
}

.time-slot {
  background: var(--surface-soft);
  border-radius: var(--radius-md);
  border: 1px solid rgba(255, 255, 255, 0.08);
  padding: 18px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: flex-start;
  transition: border-color 0.2s ease, transform 0.18s ease, background 0.2s ease;
}

.time-slot .time {
  font-weight: 600;
}

.time-slot .price {
  color: var(--accent);
  font-size: 15px;
}

.time-slot .meta {
  color: var(--muted);
  font-size: 13px;
}

.time-slot:hover {
  border-color: rgba(255, 255, 255, 0.2);
  transform: translateY(-2px);
}

.time-slot.selected {
  border-color: var(--border-strong);
  background: linear-gradient(160deg, rgba(99, 240, 153, 0.18), rgba(99, 240, 153, 0.04));
  box-shadow: 0 12px 34px rgba(99, 240, 153, 0.22);
}

.time-slot.busy,
.time-slot.past {
  opacity: 0.45;
  pointer-events: none;
  filter: grayscale(0.4);
}

.summary {
  margin-top: 12px;
  padding: 18px;
  border-radius: var(--radius-md);
  background: var(--surface-pop);
  display: flex;
  flex-direction: column;
  gap: 14px;
  position: sticky;
  bottom: 12px;
}

.summary .actions {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.summary input {
  flex: 1;
  min-width: 180px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: var(--radius-sm);
  padding: 12px 14px;
}

.summary .muted {
  color: var(--muted);
}

aside.my {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

aside.my h2 {
  margin: 0;
  font-size: 20px;
}

.my-list {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.booking-card {
  background: var(--surface);
  border-radius: var(--radius-lg);
  padding: 18px;
  border: 1px solid rgba(255, 255, 255, 0.06);
  box-shadow: var(--shadow);
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.booking-head {
  display: flex;
  justify-content: space-between;
  gap: 12px;
}

.booking-head span {
  color: var(--muted);
  font-size: 14px;
}

.booking-meta {
  display: flex;
  align-items: center;
  gap: 12px;
  color: var(--accent);
  font-weight: 600;
}

.status.pending {
  color: #f9b54c;
  font-size: 13px;
  font-weight: 500;
  background: rgba(249, 181, 76, 0.12);
  border-radius: 999px;
  padding: 4px 10px;
}

.stat {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  border-radius: var(--radius-md);
  background: var(--surface);
  border: 1px solid rgba(255, 255, 255, 0.06);
}

.stat .muted {
  color: var(--muted);
}

.modal {
  position: fixed;
  inset: 0;
  display: grid;
  place-items: center;
  z-index: 200;
}

.modal[hidden] {
  display: none;
}

.modal-backdrop {
  position: absolute;
  inset: 0;
  background: rgba(5, 7, 9, 0.72);
  backdrop-filter: blur(6px);
}

.modal-sheet {
  position: relative;
  width: min(480px, calc(100% - 40px));
  max-height: calc(100vh - 80px);
  border-radius: var(--radius-lg);
  background: var(--surface);
  padding: 24px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: var(--shadow);
  overflow: hidden auto;
}

.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 18px;
  margin-bottom: 18px;
}

.modal-header button {
  width: 32px;
  height: 32px;
  padding: 0;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.12);
  color: var(--text);
  box-shadow: none;
}

.vinyl-grid {
  display: grid;
  gap: 16px;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
}

.vinyl-card {
  background: var(--surface-soft);
  border-radius: var(--radius-md);
  border: 1px solid rgba(255, 255, 255, 0.08);
  padding: 14px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
  text-align: center;
}

.vinyl-card .cover {
  width: 100%;
  padding-top: 100%;
  border-radius: var(--radius-sm);
  background: rgba(255, 255, 255, 0.04);
  background-size: cover;
  background-position: center;
}

.vinyl-card .title {
  font-weight: 600;
}

.vinyl-card .rarity {
  font-size: 13px;
  color: var(--muted);
}

.vinyl-card.legendary {
  border-color: rgba(255, 196, 0, 0.45);
  box-shadow: 0 0 32px rgba(255, 196, 0, 0.18);
}

.support-actions {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.support-actions button {
  width: 100%;
}

.toast {
  position: fixed;
  bottom: 28px;
  left: 50%;
  transform: translateX(-50%) translateY(30px);
  background: rgba(12, 20, 24, 0.92);
  padding: 14px 22px;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  opacity: 0;
  transition: opacity 0.25s ease, transform 0.25s ease;
  z-index: 300;
}

.toast[data-type='success'] {
  border-color: rgba(99, 240, 153, 0.4);
}

.toast[data-type='error'] {
  border-color: rgba(255, 107, 107, 0.45);
}

.toast.visible {
  opacity: 1;
  transform: translateX(-50%) translateY(0);
}

.modal-open {
  overflow: hidden;
}

.skel {
  background: linear-gradient(90deg, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.02), rgba(255, 255, 255, 0.08));
  background-size: 200% 100%;
  animation: shimmer 1.4s ease-in-out infinite;
  border-radius: 12px;
}

.skel-card {
  padding: 18px;
  border-radius: var(--radius-lg);
  background: rgba(255, 255, 255, 0.04);
  margin-bottom: 10px;
}

.skel-line {
  height: 12px;
  margin-top: 8px;
}

.skel-grid {
  display: grid;
  gap: 12px;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
}

.skel-thin {
  height: 12px;
}

.empty-state {
  padding: 20px;
  border-radius: var(--radius-md);
  background: rgba(255, 255, 255, 0.04);
  color: var(--muted);
  text-align: center;
}

.muted {
  color: var(--muted);
}

@keyframes shimmer {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}

@media (max-width: 1024px) {
  main.content {
    grid-template-columns: 1fr;
  }
  aside.my {
    order: -1;
  }
}

@media (max-width: 720px) {
  header.app-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }
  nav.top-actions {
    width: 100%;
    justify-content: flex-start;
    flex-wrap: wrap;
  }
  .promo-banner {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
  .promo-banner .chip {
    margin-left: 0;
  }
  section.controls {
    flex-direction: column;
    align-items: stretch;
  }
  label.control {
    width: 100%;
  }
  .timeline-scroller {
    grid-auto-columns: minmax(180px, 1fr);
  }
  .summary .actions {
    flex-direction: column;
  }
  .summary button {
    width: 100%;
  }
}
`;

const mainStylesheet = document.querySelector('link[rel="stylesheet"][href*="style.css"]');
let mainStylesApplied = false;

function primaryStylesAreReady() {
  if (mainStylesApplied) {
    return true;
  }

  if (!mainStylesheet) {
    return false;
  }

  try {
    const sheet = mainStylesheet.sheet;
    if (sheet && sheet.cssRules && sheet.cssRules.length > 0) {
      mainStylesApplied = true;
    }
  } catch (err) {
    // Accessing cssRules before the stylesheet is ready can throw; ignore and retry later.
  }

  return mainStylesApplied;
}

const TG = window.Telegram?.WebApp;
try {
  TG?.expand();
  TG?.ready();
} catch (err) {
  console.warn('Telegram WebApp init failed', err);
}

function ensureGlobalStyles() {
  const fallbackStyle = document.getElementById('app-fallback-style');
  const rootStyles = getComputedStyle(document.documentElement);
  const hasThemeVariables = rootStyles.getPropertyValue('--bg').trim();
  const mainStylesReady = primaryStylesAreReady();

  if (hasThemeVariables && mainStylesReady) {
    fallbackStyle?.remove();
    return;
  }

  if (fallbackStyle) {
    return;
  }

  const inlineStyle = document.createElement('style');
  inlineStyle.id = 'app-fallback-style';
  inlineStyle.textContent = FALLBACK_CSS;
  document.head.appendChild(inlineStyle);
}

ensureGlobalStyles();

mainStylesheet?.addEventListener('load', () => {
  mainStylesApplied = true;
  ensureGlobalStyles();
});

mainStylesheet?.addEventListener('error', () => {
  mainStylesApplied = false;
  ensureGlobalStyles();
});

if ('fonts' in document) {
  document.fonts.ready.then(ensureGlobalStyles).catch(() => {});
}

window.addEventListener('load', () => {
  ensureGlobalStyles();
  window.setTimeout(ensureGlobalStyles, 400);
  window.setTimeout(ensureGlobalStyles, 1500);
});

const params = new URLSearchParams(window.location.search);
const storedInit = sessionStorage.getItem('tgInitDataRaw');
const initDataRaw = TG?.initData || params.get('initData') || storedInit || '';
if (initDataRaw) {
  sessionStorage.setItem('tgInitDataRaw', initDataRaw);
}

const els = {
  roomSelect: document.getElementById('roomSelect'),
  dateInput: document.getElementById('dateInput'),
  todayHint: document.getElementById('todayHint'),
  timelineSkeleton: document.getElementById('timelineSkeleton'),
  timelineScroller: document.getElementById('timelineScroller'),
  summaryText: document.getElementById('summaryText'),
  bookBtn: document.getElementById('bookBtn'),
  promoInput: document.getElementById('promoInput'),
  applyPromo: document.getElementById('applyPromo'),
  promoSkel: document.getElementById('promoSkel'),
  myList: document.getElementById('myList'),
  myListSkeleton: document.getElementById('myListSkeleton'),
  hoursCounter: document.getElementById('hoursCounter'),
  collectionModal: document.getElementById('collectionModal'),
  collectionList: document.getElementById('collectionList'),
  collectionSkeleton: document.getElementById('collectionSkeleton'),
  supportModal: document.getElementById('supportModal'),
  ykModal: document.getElementById('yk-modal'),
  toast: document.getElementById('toast'),
  promoBanner: document.querySelector('.promo-banner'),
  promoTimer: document.getElementById('promoTimer'),
  promoProgress: document.getElementById('promoProgress'),
  adminBtn: document.getElementById('adminBtn'),
  btnCollection: document.getElementById('btnCollection'),
  btnSupport: document.getElementById('btnSupport'),
  collectionClose: document.getElementById('collectionClose'),
  supportClose: document.getElementById('supportClose'),
  supportOpenTG: document.getElementById('supportOpenTG'),
  supportCopy: document.getElementById('supportCopy'),
};

const state = {
  rooms: [],
  selectedRoomId: null,
  selectedDate: null,
  busySlots: [],
  selection: null,
  preselect: null,
  appliedPromo: null,
  currency: 'RUB',
  me: null,
  vinylsLoaded: false,
};

const dateFmt = new Intl.DateTimeFormat('ru-RU', { weekday: 'long', day: 'numeric', month: 'long' });
const timeFmt = new Intl.DateTimeFormat('ru-RU', { hour: '2-digit', minute: '2-digit' });
const shortDateFmt = new Intl.DateTimeFormat('ru-RU', { day: 'numeric', month: 'short' });
let moneyFmt = new Intl.NumberFormat('ru-RU', { style: 'currency', currency: state.currency, maximumFractionDigits: 0 });

function updateMoneyFormatter(code) {
  state.currency = code || 'RUB';
  try {
    moneyFmt = new Intl.NumberFormat('ru-RU', { style: 'currency', currency: state.currency, maximumFractionDigits: 0 });
  } catch (err) {
    moneyFmt = new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB', maximumFractionDigits: 0 });
    state.currency = 'RUB';
  }
}

function formatMoney(cents) {
  return moneyFmt.format((cents || 0) / 100);
}

function showToast(message, type = 'info') {
  if (!els.toast) return;
  els.toast.textContent = message;
  els.toast.dataset.type = type;
  els.toast.hidden = false;
  els.toast.classList.remove('visible');
  requestAnimationFrame(() => {
    els.toast.classList.add('visible');
  });
  clearTimeout(showToast.hideTimer);
  showToast.hideTimer = setTimeout(() => {
    els.toast.classList.remove('visible');
    setTimeout(() => { els.toast.hidden = true; }, 220);
  }, 3200);
}

async function api(path, { method = 'GET', body, headers = {}, silent = false } = {}) {
  const opts = { method, headers: { ...headers } };
  if (initDataRaw) {
    opts.headers['X-Telegram-InitData-Raw'] = initDataRaw;
  }
  if (body instanceof FormData) {
    opts.body = body;
  } else if (body !== undefined) {
    opts.headers['Content-Type'] = 'application/json';
    opts.body = JSON.stringify(body);
  }
  const res = await fetch(path, opts);
  const isJson = res.headers.get('content-type')?.includes('application/json');
  const data = isJson ? await res.json().catch(() => ({})) : await res.text();
  if (!res.ok) {
    const error = (data && (data.error || data.message)) || res.statusText || 'Ошибка запроса';
    if (!silent) {
      showToast(error, 'error');
    }
    throw new Error(error);
  }
  return data;
}

function toDateInputValue(date) {
  return date.toISOString().slice(0, 10);
}

function startOfDay(date) {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
}

function addHours(date, hours) {
  const d = new Date(date);
  d.setHours(d.getHours() + hours);
  return d;
}

function overlap(aStart, aEnd, bStart, bEnd) {
  return aStart < bEnd && aEnd > bStart;
}

function renderTimeline() {
  const scroller = els.timelineScroller;
  if (!scroller) return;
  scroller.innerHTML = '';
  const busy = state.busySlots;
  const room = state.rooms.find((r) => r.id === state.selectedRoomId);
  if (!room) {
    els.summaryText.textContent = 'Нет доступных комнат';
    els.bookBtn.disabled = true;
    return;
  }
  const baseDay = startOfDay(state.selectedDate);
  const startHour = 8;
  const endHour = 23;
  const slots = [];
  const now = new Date();
  const todayKey = toDateInputValue(new Date());
  const selectedKey = toDateInputValue(baseDay);
  for (let hour = startHour; hour < endHour; hour++) {
    const slotStart = new Date(baseDay);
    slotStart.setHours(hour, 0, 0, 0);
    const slotEnd = addHours(slotStart, 1);
    const isPast = selectedKey === todayKey && slotEnd <= now;
    const isBusy = busy.some((b) => overlap(slotStart, slotEnd, b.start, b.end));
    slots.push({ start: slotStart, end: slotEnd, past: isPast, busy: isBusy });
  }

  if (!slots.length) {
    const empty = document.createElement('div');
    empty.className = 'empty-state';
    empty.textContent = 'Нет доступных интервалов на эту дату';
    scroller.appendChild(empty);
    return;
  }

  const selected = state.selection;
  for (const slot of slots) {
    const el = document.createElement('button');
    el.className = 'time-slot';
    if (slot.busy) el.classList.add('busy');
    if (slot.past) el.classList.add('past');
    el.dataset.start = slot.start.toISOString();
    el.dataset.end = slot.end.toISOString();
    el.innerHTML = `
      <span class="time">${timeFmt.format(slot.start)} — ${timeFmt.format(slot.end)}</span>
      <span class="price">${formatMoney(room.hourly_rate_cents)}</span>
      <span class="meta">${shortDateFmt.format(slot.start)}</span>
    `;
    if (selected && selected.start === el.dataset.start && selected.end === el.dataset.end) {
      el.classList.add('selected');
    }
    if (!slot.busy && !slot.past) {
      el.addEventListener('click', () => selectSlot(slot.start, slot.end, el));
    } else {
      el.disabled = true;
    }
    scroller.appendChild(el);
  }

  if (state.preselect) {
    const target = Array.from(scroller.querySelectorAll('.time-slot')).find(
      (btn) => btn.dataset.start === state.preselect.start && btn.dataset.end === state.preselect.end,
    );
    if (target) {
      selectSlot(new Date(target.dataset.start), new Date(target.dataset.end), target);
    }
    state.preselect = null;
  }
}

function selectSlot(start, end, element) {
  state.selection = { start: start.toISOString(), end: end.toISOString() };
  els.timelineScroller.querySelectorAll('.time-slot.selected').forEach((btn) => btn.classList.remove('selected'));
  element?.classList.add('selected');
  state.appliedPromo = null;
  els.promoInput.value = els.promoInput.value.trim();
  updateSummary();
}

function updateSummary() {
  const room = state.rooms.find((r) => r.id === state.selectedRoomId);
  if (!room) return;
  if (!state.selection) {
    els.summaryText.textContent = 'Время не выбрано';
    els.bookBtn.disabled = true;
    els.bookBtn.textContent = 'Забронировать';
    return;
  }
  const start = new Date(state.selection.start);
  const end = new Date(state.selection.end);
  const hours = Math.max(1, Math.round((end - start) / 3600000));
  const basePrice = room.hourly_rate_cents * hours;
  let finalPrice = basePrice;
  let promoLine = '';
  if (state.appliedPromo?.valid) {
    finalPrice = state.appliedPromo.finalPriceCents;
    promoLine = ` • промокод ${state.appliedPromo.code} (-${state.appliedPromo.discount}%)`;
  }
  els.summaryText.innerHTML = `
    <strong>${room.name}</strong> • ${shortDateFmt.format(start)} ${timeFmt.format(start)}–${timeFmt.format(end)}${promoLine}
  `;
  els.bookBtn.disabled = false;
  els.bookBtn.textContent = `Забронировать за ${formatMoney(finalPrice)}`;
}

function showTimelineSkeleton(show) {
  if (!els.timelineSkeleton) return;
  els.timelineSkeleton.style.display = show ? 'flex' : 'none';
}

function showPromoSkeleton(show) {
  if (els.promoSkel) {
    els.promoSkel.style.display = show ? 'block' : 'none';
  }
}

async function loadAvailability() {
  if (!state.selectedRoomId || !state.selectedDate) return;
  showTimelineSkeleton(true);
  els.timelineScroller.innerHTML = '';
  try {
    const dayStart = startOfDay(state.selectedDate);
    const dayEnd = addHours(dayStart, 24);
    const data = await api(
      `/api/availability?roomId=${state.selectedRoomId}&from=${encodeURIComponent(dayStart.toISOString())}&to=${encodeURIComponent(dayEnd.toISOString())}`,
    );
    state.busySlots = (data.busy || []).map((b) => ({ start: new Date(b.start_utc || b.startUTC), end: new Date(b.end_utc || b.endUTC) }));
  } catch (err) {
    state.busySlots = [];
  } finally {
    showTimelineSkeleton(false);
    renderTimeline();
    updateSummary();
  }
}

async function loadRooms() {
  try {
    const data = await api('/api/rooms');
    state.rooms = data || [];
    els.roomSelect.innerHTML = state.rooms
      .map((room) => `<option value="${room.id}">${room.name} · ${formatMoney(room.hourly_rate_cents)}</option>`)
      .join('');
    if (state.rooms.length) {
      state.selectedRoomId = state.rooms[0].id;
      els.roomSelect.value = String(state.selectedRoomId);
    }
  } catch (err) {
    els.roomSelect.innerHTML = '<option>Ошибка загрузки комнат</option>';
  }
}

async function loadMe() {
  try {
    const data = await api('/api/me');
    state.me = data.user;
    if (data.is_admin) {
      els.adminBtn?.classList.remove('hidden');
    } else {
      els.adminBtn?.classList.add('hidden');
    }
  } catch (err) {
    els.adminBtn?.classList.add('hidden');
  }
}

async function loadMyBookings() {
  if (!els.myList) return;
  els.myListSkeleton.style.display = 'block';
  els.myList.innerHTML = '';
  try {
    const data = await api('/api/my-bookings');
    state.myBookings = data || [];
    renderBookings();
  } catch (err) {
    els.myList.innerHTML = '<div class="empty-state">Не удалось загрузить бронирования</div>';
  } finally {
    els.myListSkeleton.style.display = 'none';
  }
}

function renderBookings() {
  els.myList.innerHTML = '';
  if (!state.myBookings.length) {
    els.myList.innerHTML = '<div class="empty-state">Бронирования пока отсутствуют</div>';
    els.hoursCounter.textContent = '0 ч';
    return;
  }
  let totalHours = 0;
  for (const booking of state.myBookings) {
    const start = new Date(booking.start_utc || booking.startUtc);
    const end = new Date(booking.end_utc || booking.endUtc);
    const hours = Math.max(1, Math.round((end - start) / 3600000));
    totalHours += hours;
    const card = document.createElement('article');
    card.className = 'booking-card';
    const status = booking.payment_status && booking.payment_status !== 'paid' ? '<span class="status pending">Ожидает оплату</span>' : '';
    card.innerHTML = `
      <div class="booking-head">
        <strong>${booking.name || 'Комната'}</strong>
        <span>${shortDateFmt.format(start)}, ${timeFmt.format(start)}–${timeFmt.format(end)}</span>
      </div>
      <div class="booking-meta">
        <span>${formatMoney(booking.total_price_cents || 0)}</span>
        ${status}
      </div>
    `;
    els.myList.appendChild(card);
  }
  els.hoursCounter.textContent = `${totalHours} ч`;
}

async function ensureVinylsLoaded() {
  if (state.vinylsLoaded) return;
  els.collectionSkeleton.style.display = 'grid';
  els.collectionList.innerHTML = '';
  try {
    const rows = await api('/api/my-vinyls');
    if (!rows.length) {
      els.collectionList.innerHTML = '<div class="empty-state">Коллекция пуста</div>';
    } else {
      els.collectionList.innerHTML = rows
        .map(
          (row) => `
            <div class="vinyl-card ${row.rarity || 'common'}">
              <div class="cover" style="background-image:url('${row.image_url || ''}')"></div>
              <div class="title">${row.name}</div>
              <div class="rarity">${row.rarity || ''}</div>
            </div>
          `,
        )
        .join('');
    }
    state.vinylsLoaded = true;
  } catch (err) {
    els.collectionList.innerHTML = '<div class="empty-state">Не удалось загрузить коллекцию</div>';
  } finally {
    els.collectionSkeleton.style.display = 'none';
  }
}

function openModal(modal) {
  if (!modal) return;
  modal.hidden = false;
  document.body.classList.add('modal-open');
}

function closeModal(modal) {
  if (!modal) return;
  modal.hidden = true;
  document.body.classList.remove('modal-open');
}

async function applyPromo() {
  if (!state.selection) {
    showToast('Сначала выберите время', 'error');
    return;
  }
  const code = els.promoInput.value.trim();
  if (!code) {
    state.appliedPromo = null;
    updateSummary();
    return;
  }
  showPromoSkeleton(true);
  try {
    const start = new Date(state.selection.start);
    const end = new Date(state.selection.end);
    const hours = Math.max(1, Math.round((end - start) / 3600000));
    const data = await api(
      `/api/check-promo?roomId=${state.selectedRoomId}&code=${encodeURIComponent(code)}&hours=${hours}`,
    );
    updateMoneyFormatter(data.currency);
    if (data.valid) {
      state.appliedPromo = data;
      showToast(`Промокод ${data.code} применён`, 'success');
    } else {
      state.appliedPromo = null;
      showToast('Промокод недействителен', 'error');
    }
  } catch (err) {
    state.appliedPromo = null;
  } finally {
    showPromoSkeleton(false);
    updateSummary();
  }
}

async function book() {
  if (!state.selection) return;
  const room = state.rooms.find((r) => r.id === state.selectedRoomId);
  if (!room) return;
  const payload = {
    roomId: room.id,
    startUtc: state.selection.start,
    endUtc: state.selection.end,
  };
  if (state.appliedPromo?.valid) {
    payload.promoCode = state.appliedPromo.code;
  }
  els.bookBtn.disabled = true;
  const originalText = els.bookBtn.textContent;
  els.bookBtn.textContent = 'Бронируем…';
  try {
    const res = await api('/api/book', { method: 'POST', body: payload });
    showToast('Бронирование создано', 'success');
    await loadAvailability();
    await loadMyBookings();
    state.selection = null;
    state.appliedPromo = null;
    els.promoInput.value = '';
    updateSummary();
    if (res?.finalPriceCents) {
      showToast(`К оплате ${formatMoney(res.finalPriceCents)}`, 'info');
    }
  } catch (err) {
    // handled in api
  } finally {
    els.bookBtn.disabled = false;
    els.bookBtn.textContent = originalText;
  }
}

function setupQuickButtons() {
  const quickMap = {
    qNow: () => {
      const now = new Date();
      const minutes = now.getMinutes();
      now.setMinutes(0, 0, 0);
      if (minutes > 0) {
        now.setHours(now.getHours() + 1);
      }
      return now;
    },
    qPlus1: () => {
      const base = state.selection ? new Date(state.selection.start) : new Date();
      base.setMinutes(0, 0, 0);
      base.setHours(base.getHours() + 1);
      return base;
    },
    qTonight: () => {
      const base = new Date();
      base.setHours(20, 0, 0, 0);
      return base;
    },
    qTomorrow: () => {
      const base = new Date();
      base.setDate(base.getDate() + 1);
      base.setHours(10, 0, 0, 0);
      return base;
    },
  };
  Object.entries(quickMap).forEach(([id, fn]) => {
    const btn = document.getElementById(id);
    if (!btn) return;
    btn.addEventListener('click', async () => {
      const start = fn();
      const end = addHours(start, 1);
      state.preselect = { start: start.toISOString(), end: end.toISOString() };
      state.selectedDate = startOfDay(start);
      els.dateInput.value = toDateInputValue(state.selectedDate);
      await loadAvailability();
    });
  });
}

function setupModals() {
  els.btnCollection?.addEventListener('click', async () => {
    openModal(els.collectionModal);
    await ensureVinylsLoaded();
  });
  els.collectionClose?.addEventListener('click', () => closeModal(els.collectionModal));
  els.collectionModal?.addEventListener('click', (e) => {
    if (e.target === e.currentTarget || e.target.classList.contains('modal-backdrop')) {
      closeModal(els.collectionModal);
    }
  });

  els.btnSupport?.addEventListener('click', () => openModal(els.supportModal));
  els.supportClose?.addEventListener('click', () => closeModal(els.supportModal));
  els.supportModal?.addEventListener('click', (e) => {
    if (e.target === e.currentTarget || e.target.classList.contains('modal-backdrop')) {
      closeModal(els.supportModal);
    }
  });

  els.supportOpenTG?.addEventListener('click', () => {
    const url = 'https://t.me/fadeout_manages';
    if (TG?.openTelegramLink) {
      TG.openTelegramLink(url);
    } else {
      window.open(url, '_blank');
    }
  });

  els.supportCopy?.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText('@fadeout_manages');
      showToast('Скопировано');
    } catch (err) {
      showToast('Не удалось скопировать', 'error');
    }
  });
}

function setupAdmin() {
  if (!els.adminBtn) return;
  els.adminBtn.addEventListener('click', () => {
    if (TG?.openLink) {
      TG.openLink('/admin.html', { try_instant_view: true });
    } else {
      window.location.href = '/admin.html';
    }
  });
}

function setupPromoBanner() {
  if (!els.promoBanner) return;
  const rewardBtn = document.createElement('button');
  rewardBtn.id = 'dailyRewardBtn';
  rewardBtn.className = 'chip';
  rewardBtn.textContent = 'Ежедневный подарок';
  rewardBtn.addEventListener('click', async () => {
    try {
      const data = await api('/api/daily-reward', { method: 'POST' });
      if (data.message === 'already_claimed') {
        showToast('Сегодняшний подарок уже получен');
      } else {
        const rewardText = data.reward_type === 'discount'
          ? `Скидка ${data.reward_value}`
          : data.reward_type === 'hours'
            ? `+${data.reward_value} час`
            : 'Подарок студии';
        showToast(`Подарок: ${rewardText}`, 'success');
      }
    } catch (err) {
      // handled globally
    }
  });
  const progressContainer = els.promoProgress?.parentElement;
  if (progressContainer && progressContainer.parentElement === els.promoBanner) {
    progressContainer.insertAdjacentElement('beforebegin', rewardBtn);
  } else {
    els.promoBanner.appendChild(rewardBtn);
  }
}

function startPromoTimer() {
  if (!els.promoTimer) return;
  const total = 3 * 60 * 60;
  let left = total;
  const update = () => {
    left = Math.max(0, left - 1);
    if (els.promoProgress) {
      els.promoProgress.style.width = `${((total - left) / total) * 100}%`;
    }
    if (left <= 5 * 60) {
      els.promoBanner?.classList.add('urgent');
    }
    const hours = String(Math.floor(left / 3600)).padStart(2, '0');
    const minutes = String(Math.floor((left % 3600) / 60)).padStart(2, '0');
    const seconds = String(left % 60).padStart(2, '0');
    els.promoTimer.textContent = `${hours}:${minutes}:${seconds}`;
    if (left === 0) {
      clearInterval(update.timerId);
    }
  };
  update();
  update.timerId = setInterval(update, 1000);
}

function updateTodayHint() {
  if (!els.todayHint) return;
  els.todayHint.textContent = dateFmt.format(state.selectedDate);
}

async function init() {
  setupQuickButtons();
  setupModals();
  setupAdmin();
  setupPromoBanner();
  startPromoTimer();

  if (!initDataRaw) {
    showToast('Откройте мини‑приложение через Telegram для авторизации', 'error');
  }

  const today = new Date();
  state.selectedDate = startOfDay(today);
  els.dateInput.value = toDateInputValue(today);
  updateTodayHint();

  els.dateInput.addEventListener('change', async () => {
    const value = els.dateInput.value;
    if (!value) return;
    state.selectedDate = startOfDay(new Date(`${value}T00:00:00`));
    state.selection = null;
    state.appliedPromo = null;
    updateTodayHint();
    await loadAvailability();
  });

  els.roomSelect.addEventListener('change', async (e) => {
    state.selectedRoomId = Number(e.target.value);
    state.selection = null;
    state.appliedPromo = null;
    updateSummary();
    await loadAvailability();
  });

  els.applyPromo.addEventListener('click', applyPromo);
  els.bookBtn.addEventListener('click', book);
  els.promoInput.addEventListener('input', () => {
    if (!els.promoInput.value.trim()) {
      state.appliedPromo = null;
      updateSummary();
    }
  });

  await Promise.all([loadMe(), loadRooms()]);
  if (state.rooms.length) {
    await loadAvailability();
  }
  await loadMyBookings();
}

init().catch((err) => {
  console.error('Init failed', err);
});
