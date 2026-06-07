# Y.dk Business — Roadmap

## Strategisk kontekst

PM-engagement løber 1. juni – 30. september 2026.
3 effektive arbejdsmåneder: juni, august, september. Juli er sommerferie — PM er ikke tilgængelig.
Launch: 1. oktober 2026. Nyhedsmotoren er i drift. PM-leverancerne aktiverer og konfigurerer platformen.

**Kritisk konsekvens af juli-ferie:** Juni-leverancerne skal pakkes så Tech Lead kan eksekvere selvstændigt hele juli uden PM-sparring. Ufuldstændige leverancer ved udgangen af juni = stilstand i juli = forsinkelse af 1. oktober.

---

## Y.dk platform-kontekst

Y Business er ét produkt på en bredere platform. Nedenstående milepæle tilhører Y.dk som helhed — ikke Y Business specifikt — men de definerer den ramme Y Business lanceres inden for.

| Milepæl | Dato | Ejer |
|---|---|---|
| Y.dk internal soft launch | 10. juni 2026 | Tech Lead + Redaktion |
| Y.dk public launch (fri adgang + annoncer) | 10. august 2026 | CEO + Commercial Lead |
| **Y Business launch (invited beta)** | **1. oktober 2026** | **PM + Tech Lead** |
| Paywall live – Private & Business | 1. november 2026 | Tech Lead + Commercial Lead |
| Y Rails – full product launch | 1. december 2026 | Tech Lead |

Y Business aktiveres altså på en platform der allerede har kørt i åbent beta i 2,5 måned og bygget trafik inden paywall.

---

## Del 1 — PM-leverance-roadmap

Hvad PM leverer hvornår, og hvem der låses op af det.

### Uge 5 maj / inden PM-engagement starter (nu)

| Aktivitet | Ejer | Status |
|---|---|---|
| Features spec v0.1 | PM | ✓ Done — 26. maj |
| Datastackarkitektur: 11 direkte offentlige endpoints | PM | ✓ Done — 26. maj |
| Book Supertrends-møde med Lars Tvede | PM + CEO | ✓ Done — 3. juni |
| Book ledelsesmøde uge 1 juni | PM + CEO | Skal bookes nu |
| Identificér designer-ressource til august | CEO + PM | Skal afklares inden juli |

---

### Juni — Definition og alignment

| Uge | Leverance | Ejer | Låser op for |
|---|---|---|---|
| 1 | Ledelsesmøde: AI-paradoks, tier-struktur, produktgodkendelse | PM + CEO | Alt efterfølgende |
| 1-2 | Supertrends-møde: tre tekniske afklaringer med Lars Tvede | PM + Tech Lead | ✓ Done 3. juni — se output/supertrends-moedereferat.md |
| 2-3 | Redaktionelt koncept (kilder, vinkler, outputformat, produktionsarkitektur) | PM + Chefredaktør | Tech-konfiguration af motor |
| 3-4 | Commercial Lead briefet: acquisition-budget og kanalvalg | PM + Commercial Lead | GTM-plan |
| 3-4 | Behovsafdækning igangsat: møder med SMVdanmark, Dansk Erhverv, DI, IT-Branchen, Landbrug & Fødevarer og TEKNIQ — validerer behov, identificerer beta-kandidater og lægger fundament for kommercielle aftaler | PM + Commercial Lead | Beta-rekruttering og partnerkanaler |
| 4 | Features spec v1.0 — final (lukker åbne punkter fra Supertrends-møde) | PM + Tech Lead | Design og build |
| 4 | Konceptdokument — final version til stakeholders | PM | Stakeholder-alignment |

**Juni-milestone:** Redaktionelt koncept + features spec v1.0 afleveret til tech-teamet senest 30. juni.

**Tre beslutninger, der SKAL afklares i fællesskab:**
1. AI-kommunikation — præcist sprogbrug i UI og marketing. Formlen "AI producerer, mennesker verificerer" er bekræftet retning — vi afklarer konkret implementering i UI og kanalerne (blokerer design og kommunikation)
2. Tier-struktur — Basis vs. Pro, hvad der er i hvilken pakke, prisniveau
3. Produktgodkendelse — CEO bekræfter scope og retning

---

### Juli — Sommerferie (PM utilgængelig)

Tech Lead eksekverer selvstændigt baseret på juni-leverancerne. PM er ikke tilgængelig.
Hvis redaktionelt koncept og features spec v1.0 ikke er fuldt pakket ved udgangen af juni, stopper fremdriften her.

| Aktivitet | Ejer | Note |
|---|---|---|
| Tech-konfiguration af motor baseret på redaktionelt koncept | Tech Lead | Eksekveres selvstændigt — kræver at juni-leverancerne er komplette |
| Design brief klar til august | PM | Produceres inden ferie og overleveres til designer |

---

### August — Design og build (start)

**Forudsætning:** Designer-ressource identificeret inden august. Ikke opfyldt = august-leverancer i fare.

| Uge | Leverance | Ejer | Låser op for |
|---|---|---|---|
| 1-2 | UI-wireframes: onboarding, dashboard, morgenbrief | PM + Designer | Frontend-build |
| 2-3 | UI-wireframes: overvågning, trends, B2B-briefs, community | PM + Designer | Frontend-build |
| 3-4 | Teknologisk platform-spec (arkitektur, Supertrends-integration, skalering) | PM + Tech Lead | Backend-build |
| 3-4 | Commercial Lead: acquisition-budget bekræftet, kanalvalg besluttet | PM + Commercial Lead | GTM-eksekvering |
| 4 | Stakeholder-præsentation: concept + design + tech + GTM | PM | Go/no-go beslutning |
| 4+ | Frontend-build påbegyndes — fortsætter ind i september | Tech Lead + Designer | Launch 1. oktober |

**August-milestone:** Go/no-go bekræftet senest 31. august. Build er i gang.

---

### September — Build (afslutning) og launch-forberedelse

Launch er 1. oktober. September har nul buffer — alle leverancer skal holde. Build fra august fortsætter i september parallelt med launch-forberedelse.

| Uge | Leverance | Ejer | Note |
|---|---|---|---|
| 1 | Launch-plan og GTM-brief færdig | PM + Commercial Lead | Acquisition-strategi klar til eksekvering |
| 1-2 | Frontend-build færdiggøres — kritiske features til launch | Tech Lead + Designer | Parallelt med launch-forberedelse |
| 1-2 | Beta-test: 10-20 udvalgte SMV-ejere inviteret og onboardet | PM + Tech Lead | Kvalitativ validering inden launch |
| 3 | Justeringer baseret på beta-feedback implementeret | PM + Tech Lead | Kun kritiske fixes — ikke ny funktionalitet |
| 4 | Platform klar til 1. oktober. Overlevering til drift | PM | PM-engagement afsluttet |

**September-milestone:** Platform stabil og klar senest 28. september. Launch 1. oktober.

---

## Del 2 — Produkt-launch-roadmap

Hvad der er med hvornår — og hvad der afventer næste fase.

### 1. oktober 2026 — Launch (invited beta)

**Hvad er med:**
- Personaliseret nyhedsfeed + morgenbrief (tekst + lyd)
- Markedsovervågning med regulatory-kategori
- Branchetrends (ugentlig rapport)
- B2B-briefs (præferencebaseret automatisering)
- Leadgenerering — signal-baseret + CVR-søgning
- Grundlæggende personalisering (onboarding-profil)
- Lukket community (modereret forum)

**Hvad er ikke med:**
- Video-format
- Team-/virksomhedsabonnement
- Avanceret personalisering (løbende læring)
- API-integration

**Mål:** Indsaml NPS og kvalitativ feedback fra invited beta.

---

### November 2026 — Paywall live og fuld lancering

Paywall aktiveres 1. november for både Private og Business. Y Business-subscribers overgår fra invited beta til betalende abonnenter.

**Y.dk platform-trafik ved paywall-lancering (acquisition-grundlag):**

| Metrik | Mål (september) | Note |
|---|---|---|
| VPD (Visits per Day) | 25.000 | Y.dk platform — ikke Business-specifikt |
| RPM (Revenue per Mille) | 50 DKK | Annonce-revenue på fri adgang |
| PVV (Pageviews per visit) | 3 | Engagement-indikator |
| Net Growth MoM (efter churn) | 2,5% | Platformvækst inden paywall |

25.000 daglige besøg i september er det pool begge segmenter rekrutteres fra. Private-abonnementet (50 DKK/md) er lavtærskels-indgangen der bygger vaner og kan konvertere til Business (500 DKK/md) over tid. De to segmenter konkurrerer ikke — de forstærker hinanden i funnelen. Målet er 1.500 Business og 1.500 Private subscribers ved paywall 1. november.

**Nyt ved fuld lancering:**
- Fuld acquisition-kampagne (LinkedIn, PR, partnerkanaler)
- Forbedret onboarding baseret på beta-feedback
- Virksomhedsabonnement med team-adgang (hvis besluttet)
- Video-format (hvis motor understøtter det)

**Mål:** Afventer validering mod godkendt grundlag.

---

### Q1 2027 — Skalering

**Fokus:** Retention, referral-program, B2B-salg mod mellemstore virksomheder. Kvantitative mål afventer validering.

---

## Afhængigheder

| Afhængighed | Risiko | Mitigation |
|---|---|---|
| Fælles afklaringsmøde uge 1 juni — tre beslutninger skal ud | Forsinkelse her forsinker hele kæden | Book mødet nu. Send beslutningsdokument som pre-read. |
| Supertrends — Jens/Supertrends undersøger nu konkret hvad platformen kan levere til dansk SMV-segment | Features spec v1.0 lukkes når kapabilitetsrapport foreligger | Opfølgende teknisk møde med Tech Lead og Lars Tvede |
| Designer ikke identificeret | August-leverancer i fare | CEO afklarer ressource inden udgangen af juni |
| Redaktionelt koncept → tech-konfiguration | Tech kan ikke konfigurere motor uden det | Lever senest 30. juni |
| Commercial Lead involveres for sent | GTM-brief i september = for lidt tid til acquisition | Bring Commercial Lead ind i august-præsentation |
| Go/no-go august | Forsent beslutning = forsent launch | Stakeholder-præsentation klar 25. august |

---

## Risici

| Risiko | Sandsynlighed | Konsekvens | Handling |
|---|---|---|---|
| AI-kommunikationsbeslutning forsinkes | Medium | Blokerer UI-sprogbrug og kanalimplementering | Tag det som punkt 1 på fælles afklaringsmøde |
| Juli: Tech Lead mangler input og stopper | Høj | Motor ikke konfigureret til august | Juni-leverancerne skal være selveksekverende — ingen åbne spørgsmål |
| Beta-feedback kræver større justeringer | Medium | Forsinker 1. oktober | September har nul buffer — kun kritiske fixes går ind |
| 1.500 abonnenter kræver acquisition-investering der ikke er budgetteret | Ukendt | Mål nås ikke år 1 | Afklar budget med Commercial Lead i august |

---

## Tidshorisont-status

| Initiativ | Status |
|---|---|
| Redaktionelt koncept | Committed — leveres juni |
| Features spec | Committed — leveres juni |
| UI-wireframes | Committed — leveres august |
| Tech platform-spec | Committed — leveres august |
| Launch (invited beta) | Committed — 1. oktober 2026 |
| Fuld lancering | Directional — november/december 2026 |
| 1.500 Business + 1.500 Private subscribers | Committed — 1. november 2026 (paywall) |
| Video-format | Speculative — afhænger af motor |
| Internationalisering | Speculative — fase 2 |
