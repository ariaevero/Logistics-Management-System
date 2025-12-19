# Nigerian Navy PER 206 Digital Form

A Next.js + NestJS + Prisma prototype implementing a seven-page interactive Nigerian Navy Performance Evaluation Report with signature capture, auto-save, and sharing links. The backend now persists records to a SQLite database (portable for a standalone deployment) and can be pointed at PostgreSQL/MySQL later to handle thousands of concurrent records without code changes.

## How to run and test the form locally

### 1) Start the backend (NestJS)

- From `per-app/backend`: `npm install`, `npx prisma migrate deploy` (after copying `.env.example` to `.env`), then `npm run start:dev` (defaults to port **5001**).
- Endpoints:
  - `PUT /form/:id` saves or updates a submission in the Prisma-backed store.
  - `GET /form/:id` retrieves a saved submission.
  - Prisma schema lives in `backend/prisma/schema.prisma`; switch `DATABASE_URL` in `.env` to a cloud Postgres URL when you need to store 3,000+ officers' records with built-in migrations and connection pooling.

### 2) Start the frontend (Next.js 13 app directory)

- From `per-app/frontend`: `npm install` then `npm run dev` (defaults to port **3000**).
- Environment: set `NEXT_PUBLIC_API_BASE` if you run the API on a different host/port (defaults to `http://localhost:5001`).
- Open `http://localhost:3000` and the seven-page wizard will load automatically.

### 3) Manual test checklist

- Navigate through all seven pages with **Next/Previous**; the page auto-scrolls to top on each change.
- Pick **ranks**, **states**, **LGAs**, **Commands**, and **Units** from the dropdowns to see dependent options populate.
- Capture signatures using the canvas pad (pick a color, clear, save, and try the full-screen modal).
- Leave a required field blank and attempt Next/Submit to confirm validation messages appear.
- Refresh the page mid-way to verify **draft auto-save** restores your progress.
- Click **Save/Share** to persist to the backend and copy the generated link; open it in a new tab to confirm the form resumes with saved data.

## Backend (NestJS + Prisma)

- Located in `backend/`
- Run `npm install`, copy `.env.example` to `.env` (defaults to SQLite), run `npx prisma migrate deploy`, then `npm run start:dev`.
- Provides `PUT /form/:id` and `GET /form/:id` backed by Prisma for durable persistence; use `npx prisma studio` to inspect data locally.

## Key Features

- Seven-page wizard with navigation, validation, auto-scroll, and Nigerian Navy branding.
- Ranks, states, LGAs, commands, and units are dynamically populated.
- Canvas-based signature capture with color selection, clear/save, full-screen modal, and auto timestamp.
- Auto-save to LocalStorage, resumable drafts, and shareable URLs once saved.
- Backend saves/retrieves reports to support collaboration and external sharing.

## Notes

- The backend now uses Prisma for durable storage (SQLite by default, drop in Postgres/MySQL via `DATABASE_URL` for larger deployments).
- Add additional LGAs in `frontend/lib/constants.ts` for full coverage.
- Current CI limitation: `npm install` for both backend and frontend fails in this environment with a 403 response from the npm registry, so the full end-to-end run could not be executed here. Retry in an environment with npm registry access to verify the app boots (`npm install && npx prisma migrate deploy && npm run start:dev` in `backend/`, `npm install && npm run dev` in `frontend/`).

### Windows PowerShell 403/ExecutionPolicy errors

If PowerShell blocks `npm` with a `PSSecurityException` (ExecutionPolicy prevents loading `npm.ps1`), use one of the following fixes:

1. **Relax the policy for your user only (recommended):** run PowerShell as Administrator and execute:
   ```powershell
   Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned -Force
   ```
   Then restart PowerShell and retry `npm install` / `npm run dev` / `npm run start:dev`.

2. **Bypass the policy for a single shell:** start PowerShell with bypass mode:
   ```powershell
   powershell -ExecutionPolicy Bypass
   ```
   and run the npm commands inside that shell.

3. **Use Command Prompt to avoid the PowerShell shim:** open **cmd.exe** and run the same commands; npm will execute via `npm.cmd` instead of the blocked `npm.ps1` shim:
   ```cmd
   cd per-app\backend
   npm install
   npx prisma migrate deploy
   npm run start:dev
   ```
   Repeat from `per-app\frontend` for `npm install` and `npm run dev`.

4. **If a proxy or corporate registry is required:** configure the proper registry/token in `%USERPROFILE%\.npmrc` (see the earlier “How to run” section) after fixing ExecutionPolicy.
