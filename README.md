# FADEOUT — Telegram Mini App (Vercel)

Готовое приложение студии звукозаписи с бронированием, оплатой через Юкассу и админкой промокодов.

## Стек
- Frontend: чистый JS/HTML/CSS (тёмная тема), Telegram Mini App API
- Backend: Serverless (Vercel Functions, Node 18)
- БД: Turso (LibSQL) **или** Neon Postgres (`DB_PROVIDER`)
- Платёжка: YooKassa (встроенный виджет)
- Безопасность: CSP, валидация `initData`

## Быстрый старт (Vercel + GitHub)
1. Создай репозиторий на GitHub и **импортируй** этот проект.
2. В Vercel нажми **Add New → Project → Import Git Repository** и выбери репозиторий.
3. В Vercel → **Settings → Environment Variables** добавь переменные:

**Telegram**
- `BOT_TOKEN`
- `INITDATA_MAX_AGE` = `86400`
- `ADMIN_IDS` — список Telegram user id через запятую

**Платежи**
- `CURRENCY` = `RUB`
- `YK_SHOP_ID`, `YK_SECRET_KEY`

**База данных**
- Вариант A (Turso): `DB_PROVIDER=libsql`, `LIBSQL_URL`, `LIBSQL_AUTH_TOKEN`
- Вариант B (Neon): `DB_PROVIDER=postgres`, `POSTGRES_URL` (с `sslmode=require`)

4. Нажми **Deploy**. Проверь `/health` → `{"ok":true}`.

## Подключение Mini App в BotFather
- Menu Button → Edit Menu Button → Web App URL → `https://<ваш‑домен>.vercel.app/`

## YooKassa Webhook
В личном кабинете Юкассы добавь:
```
POST https://<ваш‑домен>.vercel.app/api/yookassa-webhook
```

## CI/CD (GitHub Actions → Vercel)
В проекте уже есть `.github/workflows/vercel.yml`.  
Добавь в Secrets репозитория **`VERCEL_TOKEN`** (персональный токен из Vercel).

## Структура
- `public/` — фронтенд, модалки, анимации, тёмная тема
- `api/` — серверлесс‑эндпоинты (бронирование, оплата, промокоды, вебхук)
- `shared/` — общие модули (БД, валидация initData)
- `vercel.json` — маршруты, функции, CSP‑заголовки
- `.env.example` — список переменных окружения

## Команды
Локально (только статическое, API требует Vercel):
```
npm i -g vercel
vercel dev
```

## Лицензиb
MIT
