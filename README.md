# Habit Arena

Habit Arena is a PvP habit battle platform. Two users commit to the same habit for N days, check in daily, and the first missed day loses.

## Project Structure

```txt
client/   React + Vite + Tailwind CSS frontend
server/   Node.js + Express backend
```

## Prerequisites

- Node.js 20 or newer
- npm
- A Supabase project later, when auth and database work begins

## Run The Frontend

Open a terminal:

```bash
cd client
npm install
cp .env.example .env.local
npm run dev
```

The frontend runs at `http://localhost:5173`.

## Run The Backend

Open a second terminal:

```bash
cd server
npm install
cp .env.example .env
npm run dev
```

The backend runs at `http://localhost:5050`.

Available API routes:

- `GET /` returns API status
- `GET /health` returns a health check response

## Environment Variables

Do not commit real keys. Use the example files as templates:

- `client/.env.example`
- `server/.env.example`

For Week 1, Supabase is only prepared. Full auth, database tables, check-ins, battles, emails, and cron jobs come later.
