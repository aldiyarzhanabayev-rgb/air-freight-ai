# AI Air Freight Platform

Готовый MVP-проект для Vercel без Bitrix.

## Что внутри

- Next.js 14
- Роль клиента: вводит маршрут, вес, тип груза, срочность
- API `/api/quote`: генерирует demo AI-рекомендации
- Роль логиста: видит варианты, выбирает маршрут, меняет цену, утверждает
- Готово для деплоя на Vercel

## Запуск локально

```bash
npm install
npm run dev
```

Открыть: http://localhost:3000

## Деплой на Vercel

```bash
git init
git add .
git commit -m "Initial AI freight platform"
git branch -M main
git remote add origin https://github.com/USERNAME/REPO.git
git push -u origin main
```

Потом импортировать репозиторий в Vercel.

## Как подключить настоящий ИИ позже

В production можно заменить demo-логику в `app/api/quote/route.ts` на:

- OpenAI API для объяснения и ранжирования вариантов
- Flight Schedule API для реальных расписаний
- Базу тарифов PostgreSQL/Supabase
- Авторизацию клиента и логиста

## Важно

Текущая версия — MVP/demo. Она показывает бизнес-логику и интерфейс, но не использует реальные рейсы и не хранит заявки на сервере.
