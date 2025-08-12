import { migrate, client } from '../shared/db.js';
import { validateTelegramInitData, isAdmin } from '../shared/auth.js';

export default async function handler(req,res){
  try{
    await migrate();
    const raw = req.headers['x-telegram-initdata-raw'] || req.query.initData;
    const { user } = validateTelegramInitData(raw, process.env.BOT_TOKEN, { maxAge: Number(process.env.INITDATA_MAX_AGE) || 86400 });
    if (!isAdmin(String(user.id))) return res.status(403).json({ error:'forbidden' });
    const db = await client();
    if (req.method === 'GET') {
      const { rows } = await db.query('SELECT * FROM promos ORDER BY code');
      return res.status(200).json(rows);
    }
    if (req.method === 'POST') {
      const { code, discount, expires_at, usage_limit } = req.body || {};
      if (!code || !discount) return res.status(400).json({ error:'code, discount' });
      await db.execute(`INSERT INTO promos (code, discount, expires_at, usage_limit)
         VALUES (?,?,?,?)
         ON CONFLICT (code) DO UPDATE SET 
           discount=excluded.discount,
           expires_at=excluded.expires_at,
           usage_limit=excluded.usage_limit (code, discount, expires_at, usage_limit, used_count) VALUES (?,?,?,?, COALESCE((SELECT used_count FROM promos WHERE code=?),0))`,
        [code, Number(discount), expires_at || null, usage_limit || null, code]);
      return res.status(200).json({ success:true });
    }
    if (req.method === 'DELETE') {
      const { code } = req.query;
      await db.execute('DELETE FROM promos WHERE code=?', [code]);
      return res.status(200).json({ success:true });
    }
    res.status(405).end();
  } catch(e){
    res.status(500).json({ error:e.message });
  }
}
