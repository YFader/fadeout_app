// api/router.js (ESM, единая Serverless-функция)
import { URL } from 'node:url';

// Подключаем все хендлеры из api_handlers/* (каждый экспортирует default (req,res))
import * as health from '../api_handlers/health.js';
import * as me from '../api_handlers/me.js';
import * as rooms from '../api_handlers/rooms.js';
import * as availability from '../api_handlers/availability.js';
import * as book from '../api_handlers/book.js';
import * as bookings from '../api_handlers/bookings.js';
import * as myBookings from '../api_handlers/my-bookings.js';
import * as pay from '../api_handlers/pay.js';
import * as paymentStatus from '../api_handlers/payment-status.js';
import * as adminPromos from '../api_handlers/admin-promos.js';
import * as myVinyls from '../api_handlers/my-vinyls.js';
import * as yookassaWebhook from '../api_handlers/yookassa-webhook.js';

const R = (m, re, h) => ({ m, re, h });
const routes = [
  R('GET',    /^\/health$/,                health.default),
  R('GET',    /^\/me$/,                    me.default),
  R('GET',    /^\/rooms$/,                 rooms.default),
  R('GET',    /^\/availability$/,          availability.default),
  R('POST',   /^\/book$/,                  book.default),
  R('DELETE', /^\/bookings$/,              bookings.default),
  R('GET',    /^\/my-bookings$/,           myBookings.default),
  R('POST',   /^\/pay$/,                   pay.default),
  R('GET',    /^\/payment-status$/,        paymentStatus.default),
  R('GET',    /^\/admin-promos$/,          adminPromos.default),
  R('POST',   /^\/admin-promos$/,          adminPromos.default),
  R('DELETE', /^\/admin-promos$/,          adminPromos.default),
  R('GET',    /^\/my-vinyls$/,             myVinyls.default),
  // Юкасса вебхук тоже внутри роутера (одна функция на всё)
  R('POST',   /^\/yookassa-webhook$/,      yookassaWebhook.default),
];

export default async function handler(req, res) {
  try {
    const url = new URL(req.url, `http://${req.headers.host}`);
    const path = url.pathname.replace(/^\/api/, '') || '/';
    for (const r of routes) {
      if (req.method === r.m && r.re.test(path)) {
        return r.h(req, res);
      }
    }
    res.statusCode = 404;
    res.end('Not Found');
  } catch (e) {
    res.statusCode = 500;
    res.end('Router error: ' + e.message);
  }
}
