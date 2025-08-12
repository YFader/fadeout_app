// Node runtime (default from vercel.json); read body and update DB
import { migrate, client } from '../shared/db.js';

export default async function handler(req, res){
  try {
    await migrate();
    const body = req.body || (await new Promise((resolve, reject)=>{
      let data=''; req.on('data', c=> data+=c); req.on('end', ()=> resolve(JSON.parse(data||'{}'))); req.on('error', reject);
    }));
    const event = body?.event;
    const payment = body?.object;
    if (!payment?.id) return res.status(400).send('bad');

    let status = 'unpaid';
    if (event === 'payment.succeeded') status = 'succeeded';
    else if (event === 'payment.canceled') status = 'canceled';
    else if (event === 'payment.waiting_for_capture') status = 'pending';

    const db = await client();
    await db.execute('UPDATE bookings SET payment_status=? WHERE payment_id=?',[status, payment.id]);
    res.status(200).send('ok');
  } catch(e){
    res.status(200).send('err');
  }
}
