# Newzy — Railway-opsætning

## Hvad Newzy er

React 19 + TypeScript + Vite (frontend) med Express + TypeScript (backend, `server.ts`).
Gemini AI til nyhedsbrevsopdeling og daglige briefings. Firebase til Google OAuth og Gmail-adgang.
Bun som package manager. Data gemmes i dag i **browser localStorage** — ingen database i kodebasen endnu.

---

## Trin 1 — Ret PORT i server.ts

Railway injicerer sin egen `PORT`-variabel. Den er pt. hardkodet til 3000 og vil fejle i produktion.

Åbn [server.ts](../../../Newzy/server.ts) og ændr linje 9:

```ts
// Før
const PORT = 3000;

// Efter
const PORT = process.env.PORT || 3000;
```

Commit og push til GitHub:

```bash
cd ~/GITS/Newzy
git add server.ts
git commit -m "fix: brug PORT env var fra Railway"
git push origin main
```

---

## Trin 2 — Build- og start-kommandoer på Railway

Gå til dit Railway-service-dashboard → **Settings** → **Build & Deploy**.

| Felt | Værdi |
|---|---|
| **Build Command** | `bun run build` |
| **Start Command** | `bun run start` |
| **Watch Paths** | *(lad stå tom)* |

Railway bruger Nixpacks og detekterer automatisk Bun via `bun.lock`. Ingen `railway.json` er nødvendig.

---

## Trin 3 — Miljøvariabler på Railway

Gå til **Variables** i dit service-dashboard og tilføj:

| Variabel | Værdi |
|---|---|
| `NODE_ENV` | `production` |
| `GEMINI_API_KEY` | Din Gemini API-nøgle fra Google AI Studio |
| `APP_URL` | Din Railway-URL (fx `https://newzy-production.up.railway.app`) — sættes efter første deploy |

Firebase-konfigurationen (`firebase-applet-config.json`) er committed til repoet og bundtes automatisk med Vite-buildet til frontend — ingen yderligere opsætning er nødvendig der.

---

## Trin 4 — Kobl GitHub-repoet

Gå til **Settings** → **Source** → vælg **GitHub** → `carstenlysdal-alt/Newzy`.

Slå **Auto-deploy** til. Herefter deployes automatisk ved hvert push til `main`.

---

## Trin 5 — Første deploy

Klik **Deploy** manuelt første gang. Følg build-loggen og verificér:

```
Newzy backend server is running on http://0.0.0.0:[PORT]
```

Sæt herefter `APP_URL`-variablen til din tildelte Railway-URL og redeploy.

---

## Trin 6 — PostgreSQL på Railway (fremadrettet)

Du har sat en Railway-database op — men **Newzy bruger i dag ingen database**. Al brugerdata (nyhedsbreve, kilder, bannede afsendere) gemmes i browser localStorage.

Hvis du vil flytte data til PostgreSQL:

1. **Tilføj PostgreSQL-service** i Railway-projektet (New Service → Database → PostgreSQL)
2. Railway injicerer automatisk `DATABASE_URL` i dit service-miljø
3. Installér en ORM i Newzy-repoet — anbefalet: [Prisma](https://www.prisma.io/)
4. Erstat `src/utils/storage.ts`-funktionerne med API-kald til nye backend-endpoints
5. Kør `prisma migrate deploy` som del af build-processen

Dette er et separat udviklingsforløb. Selve Railway-databasen kan du allerede nu provisionere — den venter blot på at kodebasen kobler sig på.

---

## Tjekliste

- [ ] PORT-ændring i server.ts committed og pushet
- [ ] Build/start-kommandoer sat på Railway
- [ ] `GEMINI_API_KEY` tilføjet som variabel
- [ ] `NODE_ENV=production` tilføjet
- [ ] GitHub-repo koblet med auto-deploy
- [ ] Første deploy gennemført og server starter korrekt
- [ ] `APP_URL` sat til Railway-URL efter første deploy
- [ ] (Fremadrettet) PostgreSQL-service koblet til kodebasen

---

## Kendte begrænsninger

**Firebase OAuth og Railway-URL**: Google OAuth-callback skal tilføjes i Firebase Console → Authentication → Authorized domains. Tilføj din Railway-domæne (`*.up.railway.app`).

**Gmail-sync**: Fungerer via brugerens browser-OAuth-token — ingen server-side Gmail-adgang. Virker uændret i produktion.

**Gemini-model**: `server.ts` bruger `gemini-3.6-flash` — verificér at dette er en gyldig model-ID i din Gemini API-konto, da navne ændres. Fallback er `gemini-2.0-flash`.
