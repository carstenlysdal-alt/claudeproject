# Y.dk Business — Feature-overblik

## Platformens fire lag

```
┌─────────────────────────────────────────────────────────┐
│                    Y.dk BUSINESS                        │
├───────────────┬───────────────┬──────────┬──────────────┤
│  NYHEDER      │  OVERVÅGNING  │  TRENDS  │  B2B-BRIEFS  │
└───────────────┴───────────────┴──────────┴──────────────┘
                        ↑
         PERSONALISERING (branche · virksomhed · marked)
                        ↑
              SUPERTRENDS-MOTOREN (5.000 kilder, 24/7)
```

---

## Lag 1 — Erhvervsnyheder

**Hvad det er:** AI-producerede erhvervsnyheder verificeret af redaktører.
Ikke kapitalmarked og C25 — men det der påvirker virksomheder med 5-250 ansatte.

**Funktioner:**
- Personaliseret nyhedsfeed baseret på branche, marked og interesseprofil
- Morgenbrief: dagens vigtigste nyheder samlet (tekst + lyd)
- Løbende opdatering i løbet af dagen
- Redaktionel vinkel: modpol og nuance som standard
- Formater: tekst, lyd — video fase 2

**Brugerflow:**
```
Log ind → Morgenbrief (push/mail) → Feed browsing → Artikel → Relaterede briefs
```

---

## Lag 2 — Markedsovervågning

**Hvad det er:** Erstatning for Retriever/Meltwater til SMV-priser.
Systematisk overvågning af det der er relevant for brugerens virksomhed.

**Funktioner:**
- Opsæt overvågning på: konkurrenter, nøgleord, brancher, virksomheder, politikere, regulering
- Push-notifikationer ved nye hits (mail + app)
- Ugentlig overvågningsrapport (digest-format)
- Kilde-bredde: medier, offentlige dokumenter, EU-regulering, brancheorganisationer

**Brugerflow:**
```
Onboarding → Opsæt watchlist → Løbende alerts → Ugentlig digest → Juster profil
```

---

## Lag 3 — Branchetrends

**Hvad det er:** AI-aggregeret trendanalyse på tværs af brugerens branche og markeder.
Det der normalt kræver en dedikeret analytiker.

**Funktioner:**
- Ugentlig trendrapport pr. branche
- Trend-radar: hvad er på vej, hvad er ved at toppe
- Kobling til konkrete virksomheder og markeder (Supertrends-lag)
- Filtrerbart på tidshorisont: nu / 6 måneder / 1-3 år

**Brugerflow:**
```
Vælg branche(r) → Modtag ugentlig trendrapport → Dyk ned i enkelttrends → Gem til brief
```

---

## Lag 4 — B2B-Briefs

**Hvad det er:** Kortfattede, handlingsorienterede situationsbriefs.
On-demand eller planlagt — til møder, forhandlinger, markedsindgange, due diligence.

**Funktioner:**
- Søg brief om: virksomhed, marked, branche, konkurrent, regulering
- Autogenereret brief på under 60 sekunder
- Format: 1 side — baggrund, nøgletal, aktuelle nyheder, risici, muligheder
- Gem og del briefs (fase 2: team-funktionalitet)

**Brugerflow:**
```
Søg emne → Generer brief → Læs / lyt → Download / del
```

---

## Personalisering — tværgående lag

Personalisering er det der binder de fire lag sammen og adskiller Y.dk Business
fra et generisk erhvervsmedie.

**Onboarding-profil (opsættes ved tilmelding):**
- Branche (primær + sekundær)
- Virksomhedsstørrelse
- Geografi (Danmark + eksportmarkeder)
- Konkurrenter at overvåge
- Interesseområder (regulering, finans, teknologi, arbejdsmarked m.fl.)

**Løbende læring:**
- Hvad brugeren klikker på og gemmer påvirker feed
- Eksplicitte fravalg ("vis mig ikke mere om X")

---

## Brugerrejse — fra tilmelding til daglig brug

```
TILMELDING
    ↓
ONBOARDING (5 min)
Branche · Virksomhed · Konkurrenter · Interesser
    ↓
DAG 1
Morgenbrief · Personaliseret feed · Første overvågningsalert
    ↓
DAGLIG RYTME
07:00  Morgenbrief (mail + app)
       → Dagens vigtigste nyheder for din branche
Løbende  Feed-opdatering + overvågningsalerts
Ugentligt  Trendrapport + overvågningsdigest
On-demand  B2B-brief ved behov
    ↓
FASTHOLDELSE
Ugentlig digest · Personalisering der forbedres · Brief-historik
```

---

## Lag 5 — Abonnentfællesskab (tilføjet efter markedsvalidering)

**Hvorfor:** Trends.co dokumenterede at lukket community er primær fastholdelsesmekanisme.
SMV-ejere betaler allerede 12.000 kr./år for ejerledernetværk. Fællesskab øger retention markant.

**Hvad det er:** Lukket, modereret forum for abonnenter — sparring, videndeling og netværk
på tværs af brancher. Adgang kun for betalende abonnenter.

**Minimumsfunktioner fase 1:**
- Lukket forum/gruppe (modereret)
- Branchespecifikke rum
- Mulighed for direkte spørgsmål til redaktionen

---

## Designkrav fra markedsvalidering

**AI må aldrig fremgå i brugerflade eller kommunikation.**
53% af danskerne er utrygge ved AI-journalistik. AI er back-end motor — ikke front-end identitet.
Produktet kommunikerer redaktionel kvalitet og menneskelig stemme.

**Produktet kommunikeres altid som virksomhedsudgift.**
Betalingsvillighed for personlige nyheder (35-54 år): 11-12%.
5.000 kr./år er en firmabetalt driftsomkostning — ikke et personligt medie-abonnement.
Gælder onboarding, checkout, faktura-format og al kommunikation.

**Ingen friktion i onboarding.**
30% af SMV'er opgiver digitale værktøjer pga. kompleksitet.
Platformen leverer værdi i indbakken fra dag 1 — brugeren konfigurerer ikke algoritmer.

---

## Hvad der ikke er med (fase 1)

- Video-format
- Team- og virksomhedsabonnement med delt adgang
- API-integration til CRM og egne systemer
- Avanceret benchmarking mod konkurrenter

---

## Åbne spørgsmål til afklaring

| Spørgsmål | Påvirker |
|---|---|
| Hvilke specifikke kilder dækker Supertrends-motoren i dag? | Overvågning og trends |
| Understøtter motoren on-demand brief-generering? | B2B-briefs |
| Er lyd-format tilgængeligt i dag eller kræver det ny produktion? | Nyheder |
| Hvad er onboarding-flowets tekniske grænser (profil-opsætning)? | Personalisering |
