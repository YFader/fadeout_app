const TG = window.Telegram?.WebApp; try{TG?.expand(); TG?.ready();}catch{}
const initDataRaw = TG?.initData || '';

async function api(url, opts={}){
  const r = await fetch(url, { ...opts, headers: { 'Content-Type':'application/json', 'X-Telegram-InitData-Raw': initDataRaw, ...(opts.headers||{}) } });
  if (!r.ok) throw new Error((await r.json().catch(()=>({}))).error || r.statusText);
  return r.json();
}

async function ensureAdmin(){
  const me = await api('/api/me').catch(()=>null);
  if (!me?.is_admin) { document.body.innerHTML = '<div style="padding:20px">Доступ запрещён</div>'; throw new Error('forbidden'); }
}

async function load(){
  const rows = await api('/api/admin-promos');
  const tb = document.getElementById('rows');
  tb.innerHTML = rows.map(p=>`<tr>
    <td>${p.code}</td><td>${p.discount}</td><td>${p.expires_at||''}</td><td>${p.usage_limit||''}</td><td>${p.used_count||0}</td>
    <td><button data-del="${p.code}" class="secondary">Удалить</button></td>
  </tr>`).join('');
  tb.querySelectorAll('button[data-del]').forEach(b=> b.onclick = async()=>{ await api('/api/admin-promos?code='+encodeURIComponent(b.dataset.del), { method:'DELETE' }); load(); });
}

document.getElementById('reload').onclick = load;
document.getElementById('save').onclick = async ()=>{
  const code = document.getElementById('code').value.trim();
  const discount = Number(document.getElementById('discount').value||0);
  const expires = document.getElementById('expires').value || null;
  const limit = document.getElementById('limit').value || null;
  await api('/api/admin-promos', { method:'POST', body: JSON.stringify({ code, discount, expires_at: expires, usage_limit: limit }) });
  load();
};

ensureAdmin().then(load);
