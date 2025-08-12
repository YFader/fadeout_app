import crypto from 'crypto';

export function validateTelegramInitData(initDataRaw, botToken, { maxAge = 86400 } = {}) {
  if (!initDataRaw) throw new Error('initData отсутствует');
  if (!botToken) throw new Error('BOT_TOKEN не задан');
  const sp = new URLSearchParams(initDataRaw);
  const hash = sp.get('hash'); if (!hash) throw new Error('hash отсутствует');
  const pairs = []; sp.forEach((v,k)=>{ if(k!=='hash') pairs.push(`${k}=${v}`); }); pairs.sort();
  const dataCheckString = pairs.join('\n');
  const secretKey = crypto.createHash('sha256').update(botToken).digest();
  const computed = crypto.createHmac('sha256', secretKey).update(dataCheckString).digest('hex');
  if (!crypto.timingSafeEqual(Buffer.from(computed), Buffer.from(hash))) throw new Error('подпись невалидна');
  const authDate = Number(sp.get('auth_date') || 0);
  const now = Math.floor(Date.now()/1000); if (!authDate || now - authDate > maxAge) throw new Error('истёк срок initData');
  const userJson = sp.get('user'); const user = userJson ? JSON.parse(userJson) : null; if (!user?.id) throw new Error('user.id отсутствует');
  const startParam = sp.get('start_param') || sp.get('startapp') || null;
  return { user, auth_date: authDate, start_param: startParam, data: Object.fromEntries(sp.entries()) };
}
export function requireAuth(req){ const raw=req.headers['x-telegram-initdata-raw']||req.query.initData; const {user}=validateTelegramInitData(raw, process.env.BOT_TOKEN, { maxAge:Number(process.env.INITDATA_MAX_AGE)||86400 }); return String(user.id); }
export function isAdmin(userId){ const ids=String(process.env.ADMIN_IDS||'').split(',').map(s=>s.trim()).filter(Boolean); return ids.includes(String(userId)); }
