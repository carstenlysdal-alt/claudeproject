# Newzy — Projektkontekst

## Hvad er Newzy

Personlig nyhedsbrevslæser og redaktionel aggregator til Carsten Lysdal.
Henter nyhedsbreve fra Gmail og RSS-feeds, opsummerer dem med Gemini AI og genererer daglige redaktionelle briefings.

Repoet: https://github.com/carstenlysdal-alt/Newzy  
Lokalt: `~/GITS/Newzy`  
Hosting: Railway — https://railway.com/project/cf487329-1606-489d-a1af-50dc6b5c91e2

---

## Tech-stack

| Lag | Teknologi |
|---|---|
| Frontend | React 19 + TypeScript + Vite + Tailwind CSS v4 |
| Backend | Express + TypeScript (`server.ts`) |
| AI | Google Gemini API (`gemini-3.6-flash`, `gemini-3.5-flash`) |
| Auth | Firebase Google OAuth med Gmail-scope |
| Storage | Browser localStorage (ingen database endnu) |
| Package manager | Bun (`bun.lock`) |
| Port | `process.env.PORT \|\| 3000` |

---

## Nøglefiler

| Fil | Indhold |
|---|---|
| `server.ts` | Alle API-endpoints: `/api/ai/summarize`, `/api/ai/briefing`, `/api/ai/topic-search`, `/api/rss/fetch`, `/api/gmail/sync` |
| `src/utils/storage.ts` | localStorage-abstraktionslag for nyhedsbreve, kilder, bannede afsendere |
| `src/utils/auth.ts` | Firebase Google Auth + Gmail OAuth-token-håndtering |
| `src/types.ts` | Alle TypeScript-interfaces: `NewsletterItem`, `AISummary`, `DailyBriefing` m.fl. |
| `firebase-applet-config.json` | Firebase-projektkonfiguration (bundtes med Vite til frontend) |
| `.env.example` | `GEMINI_API_KEY`, `APP_URL` |

---

## Build og deploy

```bash
# Lokalt dev
bun run dev

# Produktion-build
bun run build   # → dist/server.cjs + dist/ (Vite-frontend)
bun run start   # → node dist/server.cjs
```

Railway deployes automatisk ved push til `main`.

---

## Miljøvariabler (Railway)

| Variabel | Beskrivelse |
|---|---|
| `GEMINI_API_KEY` | Google AI Studio API-nøgle |
| `APP_URL` | Railway-URL efter første deploy |
| `NODE_ENV` | `production` |

---

## Nuværende begrænsninger

- **Ingen database**: Al data lever i browser localStorage. Railway-databasen er provisioneret men ikke koblet til koden endnu.
- **Single user**: Hardkodet til carstenlysdal@gmail.com i auth.ts og storage.ts.
- **Firebase OAuth**: Railway-domæne skal tilføjes i Firebase Console → Authentication → Authorized domains.

---

## Dokumenter

- `docs/railway-opsætning.md` — trin-for-trin Railway-opsætning og tjekliste
