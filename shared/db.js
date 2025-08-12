import { createClient as createLibsql } from '@libsql/client';
import { neon as createNeon } from '@neondatabase/serverless';

let adapter = null;
const provider = (process.env.DB_PROVIDER || 'libsql').toLowerCase();

async function getLibsql() {
  const c = createLibsql({ url: process.env.LIBSQL_URL, authToken: process.env.LIBSQL_AUTH_TOKEN });
  return { execute: (sql, args = []) => c.execute({ sql, args }), query: (sql, args = []) => c.execute({ sql, args }) };
}

async function getNeon() {
  const sql = createNeon(process.env.POSTGRES_URL);
  return {
    execute: async (q, a = []) => { const t = typeof q === 'string' ? q : q.sql; const rows = await sql(t)(...a); return { rows, rowsAffected: rows.count || 0 }; },
    query: async (q, a = []) => { const t = typeof q === 'string' ? q : q.sql; const rows = await sql(t)(...a); return { rows }; }
  };
}

export async function client(){ if (adapter) return adapter; adapter = provider==='postgres' ? await getNeon() : await getLibsql(); return adapter; }

export async function migrate(){
  const db = await client();
  if (provider === 'postgres') {
    await db.execute(`CREATE TABLE IF NOT EXISTS rooms(id SERIAL PRIMARY KEY,name TEXT,code TEXT,hourly_rate_cents INTEGER)`);
    await db.execute(`CREATE TABLE IF NOT EXISTS bookings(id SERIAL PRIMARY KEY,room_id INTEGER,start_utc TIMESTAMPTZ,end_utc TIMESTAMPTZ,status TEXT DEFAULT 'confirmed',user_id TEXT,promo_code TEXT,total_price_cents INTEGER,payment_id TEXT,payment_status TEXT DEFAULT 'unpaid')`);
    await db.execute(`CREATE TABLE IF NOT EXISTS promos(code TEXT PRIMARY KEY,discount INTEGER,expires_at TIMESTAMPTZ,usage_limit INTEGER,used_count INTEGER DEFAULT 0)`);
    await db.execute(`CREATE TABLE IF NOT EXISTS booking_invites(id SERIAL PRIMARY KEY,booking_id INTEGER,invite_code TEXT UNIQUE,invited_user_id TEXT,status TEXT DEFAULT 'pending')`);
    await db.execute(`CREATE TABLE IF NOT EXISTS vinyl_covers(id SERIAL PRIMARY KEY,name TEXT,image_url TEXT,rarity TEXT DEFAULT 'common')`);
    await db.execute(`CREATE TABLE IF NOT EXISTS user_vinyls(id SERIAL PRIMARY KEY,user_id TEXT,cover_id INTEGER,booking_id INTEGER,received_at TIMESTAMPTZ DEFAULT now())`);
    await db.execute(`CREATE TABLE IF NOT EXISTS daily_rewards(id SERIAL PRIMARY KEY,user_id TEXT,reward_type TEXT,reward_value TEXT,date_claimed DATE)`);
  } else {
    await db.execute(`CREATE TABLE IF NOT EXISTS rooms(id INTEGER PRIMARY KEY AUTOINCREMENT,name TEXT,code TEXT,hourly_rate_cents INTEGER)`);
    await db.execute(`CREATE TABLE IF NOT EXISTS bookings(id INTEGER PRIMARY KEY AUTOINCREMENT,room_id INTEGER,start_utc TEXT,end_utc TEXT,status TEXT DEFAULT 'confirmed',user_id TEXT,promo_code TEXT,total_price_cents INTEGER,payment_id TEXT,payment_status TEXT DEFAULT 'unpaid')`);
    await db.execute(`CREATE TABLE IF NOT EXISTS promos(code TEXT PRIMARY KEY,discount INTEGER,expires_at TEXT,usage_limit INTEGER,used_count INTEGER DEFAULT 0)`);
    await db.execute(`CREATE TABLE IF NOT EXISTS booking_invites(id INTEGER PRIMARY KEY AUTOINCREMENT,booking_id INTEGER,invite_code TEXT UNIQUE,invited_user_id TEXT,status TEXT DEFAULT 'pending')`);
    await db.execute(`CREATE TABLE IF NOT EXISTS vinyl_covers(id INTEGER PRIMARY KEY AUTOINCREMENT,name TEXT,image_url TEXT,rarity TEXT DEFAULT 'common')`);
    await db.execute(`CREATE TABLE IF NOT EXISTS user_vinyls(id INTEGER PRIMARY KEY AUTOINCREMENT,user_id TEXT,cover_id INTEGER,booking_id INTEGER,received_at TEXT DEFAULT (datetime('now')))`);
    await db.execute(`CREATE TABLE IF NOT EXISTS daily_rewards(id INTEGER PRIMARY KEY AUTOINCREMENT,user_id TEXT,reward_type TEXT,reward_value TEXT,date_claimed TEXT)`);
  }
  const r=await db.query('SELECT COUNT(*) as c FROM rooms'); const c=r.rows[0].c ?? r.rows[0].count ?? 0; if(Number(c)===0){ await db.execute(`INSERT INTO rooms (name,code,hourly_rate_cents) VALUES ('Комната A','A',2500),('Комната B','B',3000)`); }
  const p=await db.query('SELECT COUNT(*) as c FROM promos'); const pc=p.rows[0].c ?? p.rows[0].count ?? 0; if(Number(pc)===0){ await db.execute(`INSERT INTO promos (code,discount,expires_at,usage_limit,used_count) VALUES ('FADE10',10,'2099-12-31',100,0)`); }
}

export function cents(n){ return Math.round(Number(n)*100); }
