# Y.dk Business — Roadmap

## Strategisk kontekst

PM-engagement løber 1. juni – 30. september 2026 (4 måneder, 1 sommerferie).
3 effektive arbejdsmåneder: juni, august, september. Juli er reduceret kapacitet.
Nyhedsmotoren er i drift. PM-leverancerne aktiverer og konfigurerer platformen.

---

## Del 1 — PM-leverance-roadmap

Hvad PM leverer hvornår, og hvem der låses op af det.

### Uge 5 maj / inden PM-engagement starter (nu)

| Aktivitet | Ejer | Status |
|---|---|---|
| Features spec v0.1 | PM | ✓ Done — 26. maj |
| Datastackarkitektur: 11 direkte offentlige endpoints | PM | ✓ Done — 26. maj |
| Book Supertrends-møde med Lars Tvede | PM + CEO | Skal bookes nu |
| Book ledelsesmøde uge 1 juni | PM + CEO | Skal bookes nu |
| Identificér designer-ressource til august | CEO + PM | Skal afklares inden juli |

---

### Juni — Definition og alignment

| Uge | Leverance | Ejer | Låser op for |
|---|---|---|---|
| 1 | Ledelsesmøde: AI-paradoks, tier-struktur, produktgodkendelse | PM + CEO | Alt efterfølgende |
| 1-2 | Supertrends-møde: tre tekniske afklaringer med Lars Tvede | PM + Tech Lead | Features spec v1.0 + tech-konfiguration |
| 2-3 | Redaktionelt koncept (kilder, vinkler, outputformat, produktionsarkitektur) | PM + Chefredaktør | Tech-konfiguration af motor |
| 3-4 | Commercial Lead briefet: acquisition-budget og kanalvalg | PM + Commercial Lead | GTM-plan |
| 4 | Features spec v1.0 — final (lukker åbne punkter fra Supertrends-møde) | PM + Tech Lead | Design og build |
| 4 | Konceptdokument — final version til stakeholders | PM | Stakeholder-alignment |

**Juni-milestone:** Redaktionelt koncept + features spec v1.0 afleveret til tech-teamet senest 30. juni.

**Tre beslutninger der SKAL ud af ledelsesmødet:**
1. AI-paradoks — præcist sprogbrug i UI og marketing (blokerer al kommunikation og design)
2. Tier-struktur — Basis vs. Pro, hvad der er i hvilken pakke, prisniveau
3. Produktgodkendelse — CEO bekræfter scope og retning

---

### Juli — Sommerferie (reduceret kapacitet)

| Aktivitet | Ejer | Note |
|---|---|---|
| Tech-konfiguration af motor baseret på redaktionelt koncept | Tech Lead | Kører parallelt med PM-ferie |
| Design brief klar til august | PM | Forberedes inden ferie |

---

### August — Design og tech-spec

**Forudsætning:** Designer-ressource identificeret inden august. Ikke opfyldt = august-leverancer i fare.

| Uge | Leverance | Ejer | Låser op for |
|---|---|---|---|
| 1-2 | UI-wireframes: onboarding, dashboard, morgenbrief | PM + Designer | Frontend-build |
| 2-3 | UI-wireframes: overvågning, trends, B2B-briefs, community | PM + Designer | Frontend-build |
| 3-4 | Teknologisk platform-spec (arkitektur, Supertrends-integration, skalering) | PM + Tech Lead | Backend-build |
| 3-4 | Commercial Lead: acquisition-budget bekræftet, kanalvalg besluttet | PM + Commercial Lead | GTM-eksekvering |
| 4 | Stakeholder-præsentation: concept + design + tech + GTM | PM | Go/no-go beslutning |

**August-milestone:** Go/no-go fra ledelsen senest 31. august.

---

### September — Launch-forberedelse

| Uge | Leverance | Ejer | Note |
|---|---|---|---|
| 1-2 | Launch-plan og GTM-brief | PM + Commercial Lead | Acquisition-strategi |
| 2-3 | Beta-test med udvalgte brugere (10-20 SMV-ejere) | PM + Tech Lead | Validering inden fuld launch |
| 3-4 | Justeringer baseret på beta-feedback | PM + Tech Lead | — |
| 4 | PM-engagement afsluttet — overlevering | PM | Drift og videreudvikling |

**September-milestone:** Beta live og feedback indsamlet senest 30. september.

---

## Del 2 — Produkt-launch-roadmap

Hvornår platformen er klar, og hvad der er med hvornår.

### Oktober 2026 — Soft launch (invited beta)

**Hvad er med:**
- Personaliseret nyhedsfeed + morgenbrief (tekst + lyd)
- Markedsovervågning med regulatory-kategori
- Branchetrends (ugentlig rapport)
- B2B-briefs (on-demand)
- Grundlæggende personalisering (onboarding-profil)
- Lukket community (modereret forum)

**Hvad er ikke med:**
- Video-format
- Team-/virksomhedsabonnement
- Avanceret personalisering (løbende læring)
- API-integration

**Mål:** 100-200 beta-abonnenter. Indsaml NPS og kvalitativ feedback.

---

### November–December 2026 — Fuld lancering

**Tilføjet:**
- Fuld acquisition-kampagne (LinkedIn, PR, partnerkanaler)
- Forbedret onboarding baseret på beta-feedback
- Virksomhedsabonnement med team-adgang (hvis besluttet)
- Video-format (hvis motor understøtter det)

**Mål:** 500 betalende abonnenter ved årets udgang.

---

### Q1 2027 — Skalering

**Mål:** 1.500 betalende abonnenter (7,5M DKK ARR)
**Fokus:** Retention, referral-program, B2B-salg mod mellemstore virksomheder

---

## Afhængigheder

| Afhængighed | Risiko | Mitigation |
|---|---|---|
| Ledelsesmøde uge 1 juni — tre beslutninger skal ud | Forsinkelse her forsinker hele kæden | Book mødet nu. Send beslutningsdokument som pre-read. |
| Supertrends-møde med Lars Tvede — tre tech-spørgsmål | Features spec v1.0 kan ikke lukkes uden svar | Book som separat møde, ikke "parallel aktivitet" |
| Designer ikke identificeret | August-leverancer i fare | CEO afklarer ressource inden udgangen af juni |
| Redaktionelt koncept → tech-konfiguration | Tech kan ikke konfigurere motor uden det | Lever senest 30. juni |
| Commercial Lead involveres for sent | GTM-brief i september = for lidt tid til acquisition | Bring Commercial Lead ind i august-præsentation |
| Go/no-go august | Forsent beslutning = forsent launch | Stakeholder-præsentation klar 25. august |

---

## Risici

| Risiko | Sandsynlighed | Konsekvens | Handling |
|---|---|---|---|
| AI-paradoks-beslutning forsinkes | Medium | Blokerer kommunikation og UI-sprogbrug | Tag det som punkt 1 på ledelsesmøde |
| Sommerferie reducerer tech-kapacitet mere end forventet | Høj | Motor ikke konfigureret til august | Sæt klare leverancer til tech inden juli |
| Beta-feedback kræver større justeringer | Medium | Forsinker fuld lancering | Byg 2-ugers buffer i oktober |
| 1.500 abonnenter kræver acquisition-investering der ikke er budgetteret | Ukendt | Mål nås ikke år 1 | Afklar budget med Commercial Lead i august |

---

## Tidshorisont-status

| Initiativ | Status |
|---|---|
| Redaktionelt koncept | Committed — leveres juni |
| Features spec | Committed — leveres juni |
| UI-wireframes | Committed — leveres august |
| Tech platform-spec | Committed — leveres august |
| Soft launch | Committed — oktober 2026 |
| Fuld lancering | Directional — november/december 2026 |
| 1.500 abonnenter | Directional — Q1 2027 |
| Video-format | Speculative — afhænger af motor |
| Internationalisering | Speculative — fase 2 |
