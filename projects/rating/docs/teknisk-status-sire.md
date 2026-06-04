# SIRE — Teknisk status og implementeringsdelta
**Projekt:** Y.dk / Story Intelligence Rating Engine  
**Dato:** 4. juni 2026  
**Kilde:** Bygget i SN-DeepDive / y-test-lab — dokumenterer hvad der er implementeret, hvad der afviger fra spec, og hvad der mangler.

---

## Status

MVP-testmiljøet er i drift: **sndeepdive.web.app/y-test-lab**

Det er ikke en wireframe eller prototype. Det er en kørende applikation med reel AI-analyse og adgang til 25 live RSS-feeds. En redaktør kan åbne den i dag og analysere gårsdagens artikler.

---

## 1. Stack

| Lag | Teknologi |
|---|---|
| Frontend | React + TypeScript, Vite |
| Hosting | Firebase Hosting (`sndeepdive.web.app`) |
| Backend | Cloud Run (Node/Express/TypeScript) — europe-west1 |
| AI | Gemini 2.0 Flash via Google AI SDK |
| Feeds | 25 RSS-feeds konfigureret og testet |

**Valg af Gemini frem for OpenAI:** bevidst — Google-infrastruktur, lav latens, stærk dansk sprogforståelse.

---

## 2. API-ruter (Cloud Run)

```
/api/y-test-lab/rate          ← SIRE-analyse (Gemini 2.0 Flash)
/api/y-test-lab/summary       ← Asynkron resumégenerering
/api/y-test-lab/search        ← Inline kildesøgning (Google Search)
/api/y-test-lab/feeds         ← Feed-liste (25 kilder)
/api/y-test-lab/rss-items     ← RSS-hentning med datofilter
/api/y-test-lab/prompt        ← Hent/gem SIRE-systemprompat
/api/y-test-lab/prompt/reset  ← Nulstil til standardprompt
```

**Responstid:** ~3–6 sekunder pr. artikel.

---

## 3. Scoremodel — implementeret med justeringer

Dimensionsvægtene afviger fra det originale konceptdokument, men følger PRD v1.1:

| Dimension | Konceptdok. | PRD v1.1 | Implementeret |
|---|---|---|---|
| Audience Relevance | 20 % | 20 % | 20 % |
| Impact | 15 % | 20 % | 20 % |
| Counter-Narrative Value | 20 % | 15 % | 15 % |
| Perspective Value | 15 % | 15 % | 15 % |
| Decision Value | 15 % | 15 % | 15 % |
| Trust | 10 % | 10 % | 10 % |
| Production Potential | 5 % | 5 % | 5 % |

**Begrundelse for justering:** Y er counter-narrative, men ikke udelukkende. Understand-historier med bred samfundsmæssig rækkevidde må ikke systematisk underscores.

---

## 4. Journalistiske funktioner — 11 (ikke 10)

Solution er implementeret som fuld 11. funktion. Den repræsenterer Y's tredje indholdspille (*Inspire / Fremtiden er lys*) og sikrer at løsningsorienterede historier ikke systematisk taber til Challenge- og Threat-stof.

---

## 5. Prioritetsfarver — Y.dk brand (afviger fra original spec)

| Niveau | Original spec | Implementeret |
|---|---|---|
| Critical | `#DC2626` | `#C43A49` (crimson) |
| High | `#EA580C` | `#B5552C` (rust) |
| Watch | `#CA8A04` | `#9C7A24` (guld/oliven) |
| Low | `#64748B` | `#5E6675` |
| Ignore | `#9CA3AF` | `#9C998F` |

De originale farver var generiske web-farver. De nye er tonet ind i Y.dk's varme brandpalette.

---

## 6. Udvidelser ud over original PRD

Alle er implementeret ud fra praktisk testbrug:

### 6.1 `how_to_elevate` — "Y's Vinkel"
PRD specificerede `possible_angles` og `missing_sources` som tekstfelter. Implementeringen tilføjer `how_to_elevate`: et konkret redaktionelt råd om hvad der specifikt mangler for at løfte inputtet til en stærk Y-historie.

Eksempel:
> *"Find uafhængige HR- og forsvarsforskere til at validere påstanden — kilden har partsinteresse. Søg konkrete tal på rekruttering og afgang. Stil regeringen til ansvar: Hvad er planen?"*

### 6.2 `summary` — asynkron resumégenerering
En neutral sammenfatning af inputtets faktuelle indhold, adskilt fra `why_it_matters` (som er en Y-specifik redaktionel vurdering). Genereres asynkront og blokerer ikke scorevisningen.

### 6.3 Inline kildesøgning
En redaktør kan klikke direkte på en manglende kilde og trigge en realtidssøgning. Resultater vises inline under kildefeltet. Gør `missing_sources` fra passiv liste til aktivt arbejdsværktøj.

### 6.4 Manuel score-override
PRD listede dette som "Fase 2". Implementeret i MVP. Begrundelse: redaktørens evne til at korrigere en score og se at den ikke matcher intuitionen er det første manuelle lag af feedback-loopet.

### 6.5 Prompt-editor i UI
Redigeringsadgang til den aktive systemprompat runtime — uden kodedeploy. Det vigtigste redaktionelle kalibreringsværktøj i MVP-fasen.

### 6.6 Bulk-analyse
PRD beskrev én artikel ad gangen. Implementeringen understøtter 1–100 artikler pr. kørsel.

### 6.7 25 RSS-feeds
PRD nævnte "op mod 14 kildetyper" som abstraktion. Konkret konfigureret:

**Danske medier:** DR (Alle/Indland/Udland), Ekstra Bladet, BT, Altinget, Arbejderen, Globalnyt, POV International, Version2, Ingeniøren, Videnskab.dk, Jyllands-Posten

**Internationale:** Politico Europe, NYT, CNN, Washington Post, Al Jazeera (EN + AR), El País, Le Monde, BBC World

**Niche:** Pew Research Center, MIT Technology Review, McKinsey Insights, Electronic Frontier Foundation

Tre feeds er udskiftet: TV2 Nyheder (fjernede RSS), Harvard Business Review (feed nede), WEF (blokerer automatisk adgang).

### 6.8 Split-panel layout + mobiltilpasning
Feed (venstre) og fuld SIRE-analyse (højre) i ét skærmbillede. Under 768 px: master/detail-navigation.

---

## 7. Designsystem — Y.dk brand

- **Primær accent:** Aubergine `#361352`
- **Baggrund:** Varm papirfarve `#FAFAF8`
- **Typografi:** Schibsted Grotesk (UI) · Playfair Display (artikeltitler) · Newsreader (citater)
- **AI-deklarationslinje:** *"Analyseret af SIRE · godkendt af [redaktør]"* (krav fra Y.dk designmanual)

---

## 8. Hvad mangler

| Feature | PRD-reference | Næste fase |
|---|---|---|
| CMS-integration | § 9, § 12 | CMS eksisterer ikke endnu — testmiljøet er bridgen |
| Thumbs up/down-tracking | § 13 | Fase 2 |
| Feedback-loop (klikrate, læsetid) | § 5 | Fase 2 — mediet er ikke online |
| Notifikationer ved Critical-score | § 5 | Fase 2 |
| Prediktiv model | Fase 3 | Kræver historisk data |

---

## 9. Næste skridt inden CMS-integration

1. **Redaktionel spot-test** — kør 20–30 reelle artikler og valider at scorerækkefølgen matcher redaktørens intuition
2. **Prompt-kalibrering** — brug prompt-editoren til at justere SIRE's instruktioner baseret på fejlanalyser
3. **Kildetypekalibrering** — scorer systemet pressemeddelelser og forskningsrapporter forskelligt på den forventede måde?
4. **Decide feedback-loop** — hvem ejer koblingen af Y Score til faktisk publiceringsperformance, og hvornår starter Fase 2?
