# SIRE — Teknisk status og implementeringsdelta
**Projekt:** Y.dk / Story Intelligence Rating Engine  
**Opdateret:** 4. juni 2026  
**Kilde:** Bygget i SN-DeepDive / y-test-lab

---

## Status

MVP-testmiljøet er i aktiv drift: **sndeepdive.web.app/y-test-lab**

Det er ikke en wireframe eller prototype. Det er en kørende applikation med reel AI-analyse og adgang til 25 live RSS-feeds. En redaktør kan åbne den i dag og analysere gårsdagens artikler.

---

## 1. Stack

| Lag | Teknologi |
|---|---|
| Frontend | React + TypeScript, Vite |
| Hosting | Firebase Hosting (`sndeepdive.web.app`) |
| Backend | Cloud Run (Node/Express/TypeScript) — europe-west1 |
| AI | Gemini 2.5 Flash Lite (primær) — fallback: DeepSeek (`deepseek-chat`) |
| Feeds | 25 RSS-feeds konfigureret og testet |

**Valg af Gemini 2.5 Flash Lite som primær model:** Hurtig og billig — aktiveres hvis `GEMINI_API_KEY` eller `API_KEY` er sat. Fallback til DeepSeek (`deepseek-chat`) hvis Gemini-nøgle mangler. DeepSeek-model kan overstyres via `DEEPSEEK_MODEL`-miljøvariabel.

---

## 2. API-ruter (Cloud Run)

```
/api/y-test-lab/rate          ← SIRE-analyse (Gemini 2.5 Flash Lite / DeepSeek fallback)
/api/y-test-lab/summary       ← Asynkron resumégenerering
/api/y-test-lab/search        ← Inline kildesøgning
/api/y-test-lab/feeds         ← Feed-liste (25 kilder)
/api/y-test-lab/rss-items     ← RSS-hentning med datofilter
/api/y-test-lab/prompt        ← Hent/gem SIRE-systempromt
/api/y-test-lab/prompt/reset  ← Nulstil til standardpromt
```

**Responstid:** ~3–6 sekunder pr. artikel.

---

## 3. Scoremodel

Dimensionsvægte følger PRD v1.1:

| Dimension | Vægt |
|---|---|
| Audience Relevance | 20 % |
| Impact | 20 % |
| Counter-Narrative Value | 15 % |
| Perspective Value | 15 % |
| Decision Value | 15 % |
| Trust | 10 % |
| Production Potential | 5 % |

**Y's interessezone:** Score 65+. Hele spektret 0–100 er synligt og filtrerbart — 65 er en redaktionel reference, ikke en teknisk grænse. Markeres visuelt i score-kurven.

**Prioritetsfarver (Y.dk brand):**

| Niveau | Farve |
|---|---|
| Critical (85–100) | `#C43A49` crimson |
| High (70–84) | `#B5552C` rust |
| Watch (55–69) | `#9C7A24` guld |
| Low (40–54) | `#5E6675` |
| Ignore (0–39) | `#9C998F` |

---

## 4. Journalistiske funktioner — 11

Solution er implementeret som fuld 11. funktion. Den repræsenterer Y's tredje indholdspille (*Inspire / Fremtiden er lys*) og sikrer at løsningsorienterede historier ikke systematisk taber til Challenge- og Threat-stof.

---

## 5. Udvidelser ud over original PRD

### 5.1 `how_to_elevate` — "Y's Vinkel"
Konkret redaktionelt råd om hvad der mangler for at løfte inputtet til en stærk Y-historie, inkl. kildetyper og eksperter.

### 5.2 `summary` — asynkron resumégenerering
Neutral sammenfatning adskilt fra `why_it_matters`. Genereres asynkront og blokerer ikke scorevisningen.

### 5.3 Kilde-intelligens — tre nye SIRE-felter *(ny)*

**`source_originality`** — Er feedkilden ophavsmand eller videreformidler?
- `original` — kilden producerede historien selv
- `republished` — kilden videreformidler en andens historie
- `aggregated` — indhold samlet fra flere kilder

**`source_origin_name`** — Navn på original kilde ved videreformidling.

**`pairing_potential`** — 2–3 konkrete historietyper/kildetyper der styrker historien journalistisk, med `impact`-vurdering (high/medium/low).

### 5.4 Inline kildesøgning med semantisk søgning *(opdateret)*
Klik på manglende kilde → realtidssøgning inline. Søgningen bruger `keywordify()` der udtrækker 3–5 semantiske nøgleord og fjerner stopord, boilerplate og alle specialtegn/anførselstegn. Gælder også søgelinks under "Mulige vinkler" og "Manglende kilder".

### 5.5 Manuel score-override
Klik på scoreblok → ret score → Enter. PRD listede dette som Fase 2; implementeret fordi redaktørens korrektioner er MVP-fasen eneste feedback-mekanisme.

### 5.6 Prompt-editor i UI
Adgang til aktiv systempromt runtime — uden kodedeploy. Det vigtigste kalibreringsværktøj i MVP-fasen.

### 5.7 Bulk-analyse
1–100 artikler pr. kørsel fra RSS-feed.

### 5.8 25 RSS-feeds
**Danske:** DR (Alle/Indland/Udland), Ekstra Bladet, BT, Altinget, Arbejderen, Globalnyt, POV International, Version2, Ingeniøren, Videnskab.dk, Jyllands-Posten

**Internationale:** Politico Europe, NYT, CNN, Washington Post, Al Jazeera (EN + AR), El País, Le Monde, BBC World

**Niche:** Pew Research Center, MIT Technology Review, McKinsey Insights, Electronic Frontier Foundation

---

## 6. Filtrering og navigation *(ny)*

### 6.1 Multi-select funktionsfilter
Redaktøren vælger én eller flere journalistiske funktioner som chips. En artikel med høj Mythbuster-score men lav samlet Y Score kan fremsøges målrettet. Funktions-score-tærskel kan sættes pr. filter-session.

### 6.2 Topic clusters
AI-returnerede topics mappes til 6 foruddefinerede clusters:

| Cluster | Eksempel-topics |
|---|---|
| Politik & Magt | Politics, EU, Defense, Regulation |
| Erhverv & Økonomi | Business, SME, Finance, Startups |
| Teknologi & AI | Technology, AI, Data |
| Klima & Bæredygtighed | Climate, Energy, Sustainability |
| Sundhed & Forskning | Health, Research |
| Kultur & Samfund | Culture, Society, Education, Media |

### 6.3 Dismissible filter-chips
Aktive filtre vises som chips med ×. Klik fjerner kun det pågældende filter.

### 6.4 Y Score-slider
Slider fra 0–100 med 65-markør ("↑ Y satser her"). Live farveskift efter prioritetsband.

### 6.5 Score curve
Animeret SVG-visualisering øverst i feedlisten: alle artikler som farvede punkter på 0–100-akse. Stiplet markør ved Y = 65.

---

## 7. Design og brugeroplevelse

**Designsystem:** Y.dk brand — aubergine `#361352`, Playfair Display (titler), Newsreader (citater), Schibsted Grotesk (UI), papirfarve `#FAFAF8`.

**Split-panel (desktop):** Feedliste venstre (320px), fuld analyse højre.

**Mobil (< 768px):** Master/detail-navigation. Feed og detalje aldrig simultant. "← Feed" navigerer tilbage. Filterbar er collapsible chip. Modal-padding responsiv. Efter analyse åbnes detaljevisning automatisk.

**To tilføj-indgange:** Knap i TopBar + kompakt knap i feedlisten. Tom tilstand viser CTA centreret i panelet.

---

## 8. Hvad mangler

| Feature | PRD-reference | Næste fase |
|---|---|---|
| CMS-integration | § 9, § 12 | CMS eksisterer ikke endnu — testmiljøet er bridgen |
| Thumbs up/down-tracking | § 13 | Fase 2 |
| Feedback-loop (klikrate, læsetid) | § 5 | Fase 2 — mediet ikke online |
| Notifikationer ved Critical-score | § 5 | Fase 2 |
| Prediktiv model | Fase 3 | Kræver historisk data |

---

## 9. Næste skridt inden CMS-integration

1. **Redaktionel spot-test** — kør 20–30 reelle artikler, valider at scorerækkefølgen matcher intuitionen
2. **Vægtningsvalidering** — er 20 % Audience Relevance + 20 % Impact korrekt? Chefredaktøren bør forholde sig til formlen
3. **Prompt-kalibrering** — brug prompt-editoren baseret på fejlanalyser fra spot-test
4. **Kildetypekalibrering** — scorer pressemeddelelser og rapporter korrekt forskelligt?
5. **Define feedback-loop** — hvem ejer koblingen af Y Score til publiceringsperformance, og hvornår starter Fase 2?
