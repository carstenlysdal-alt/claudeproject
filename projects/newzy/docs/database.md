# Newzy — Database

## Forbindelsesoplysninger

| Felt | Værdi |
|---|---|
| Host (ekstern) | `sakura.proxy.rlwy.net` |
| Port | `14052` |
| Database | `railway` |
| Bruger | `postgres` |
| Password | Se Railway → Newzy-projekt → PostgreSQL → Variables → `DATABASE_URL` |
| Intern host (kun Railway) | `postgres.railway.internal:5432` |

## Adgang

**GUI:** TablePlus eller DBeaver — brug ovenstående oplysninger.

**Terminal:**
```bash
psql "postgresql://postgres:<PASSWORD>@sakura.proxy.rlwy.net:14052/railway"
```

**Prisma Studio (lokalt — kræver `.env` med DATABASE_URL):**
```bash
cd ~/GITS/Newzy
npx prisma studio
```
Åbner browser-GUI på `localhost:5555` med alle tabeller.

## Tabeller

| Tabel | Indhold |
|---|---|
| `Newsletter` | Alle nyhedsbreve med AI-resuméer |
| `Source` | RSS-feeds og Gmail-konfiguration |
| `BannedSender` | Bandlyste afsendere |
| `UserRole` | Brugerprofil |
| `DailyBriefing` | Daglige AI-briefings |

## Nyttige queries

```sql
-- Antal nyhedsbreve
SELECT COUNT(*) FROM "Newsletter";

-- Ulæste nyhedsbreve
SELECT subject, "senderName", date FROM "Newsletter"
WHERE "caughtAt" IS NULL AND "deletedAt" IS NULL
ORDER BY date DESC;

-- Gemte nyhedsbreve
SELECT subject, "senderName", "savedAt" FROM "Newsletter"
WHERE "savedAt" IS NOT NULL AND "deletedAt" IS NULL
ORDER BY "savedAt" DESC;

-- Ryd slettede nyhedsbreve permanent
DELETE FROM "Newsletter" WHERE "deletedAt" IS NOT NULL;
```

## Migration

Nye skemaændringer:
```bash
cd ~/GITS/Newzy
npx prisma migrate dev --name beskrivelse-af-ændring
git add prisma/migrations/
git push origin main
```
Railway kører `prisma migrate deploy` automatisk ved næste deploy.
