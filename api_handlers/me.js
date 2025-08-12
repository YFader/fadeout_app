import { validateTelegramInitData, isAdmin } from '../shared/auth.js';
export default async function handler(req,res){
  try{ const raw=req.headers['x-telegram-initdata-raw']||req.query.initData; const { user } = validateTelegramInitData(raw, process.env.BOT_TOKEN, { maxAge:Number(process.env.INITDATA_MAX_AGE)||86400 }); res.status(200).json({ user, is_admin: isAdmin(String(user.id)) }); }
  catch(e){ res.status(401).json({ error: e.message }); }
}