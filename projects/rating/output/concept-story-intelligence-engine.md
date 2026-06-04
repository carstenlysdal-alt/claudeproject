# Story Intelligence Rating Engine — Konceptdokument

**Projekt:** Y.dk / Rating  
**Dato:** 3. juni 2026 (MVP deployed 4. juni 2026)  
**Status:** MVP i drift — testmiljø: sndeepdive.web.app/y-test-lab

---

## Konklusion

Y har brug for et ratingsystem, der ikke måler popularitet — men journalistisk potentiale. Story Intelligence Rating Engine (SIRE) er en LLM-drevet scoremodel, der vurderer eksternt indhold *inden* publicering og rangerer det i redaktionelle køer baseret på Y's redaktionelle DNA: modpol, blind vinkel, faktabaseret udfordring af dogmer og beslutningsværdi for SMV-læseren.

Systemet erstatter manuel redaktørvurdering med et struktureret beslutningsgrundlag. Det er ikke en anbefalingsmotor — det er et journalistisk prioriteringsværktøj.

---

## Hvad er problemet

Indhold strømmer ind via et feed fra op mod 14 kildetyper: nyhedsmedier, pressemeddelelser, rapporter, myndigheder, sociale medier, tænketanke m.fl. Uden et ratingsystem er redaktørens eneste prioriteringsprincip kronologi eller mavefornemmelse. Begge dele skalerer dårligt og er blinde for Y's særkende.

**Kerneproblemet:** Journalisterne kan ikke hurtigt identificere, hvilke input der bærer potentiale til de historier, Y eksisterer for at lave — og hvilke der er støj.

---

## Hvad systemet gør

SIRE modtager et eksternt input og returnerer:

1. **Emneklassifikation** — hvilke topics dækker inputtet (25 primære topics)
2. **Funktionsscoring** — hvilke af 11 journalistiske funktioner aktiverer inputtet (0–100 pr. funktion)
3. **Ratingdimensioner** — 7 vægtede dimensioner beregner Y Score (0–100)
4. **Prioritetsniveau** — Critical / High / Watch / Low / Ignore
5. **Editorial pillar** — understand / challenge / inspire
6. **Kildekritik** — source risk (low/medium/high) + editorial warning
7. **Redaktørhjælp** — mulige vinkler, anbefalede formater, manglende kilder
8. **How to elevate ("Y's Vinkel")** — konkret råd om hvad der mangler for at løfte inputtet
9. **Summary** — neutral sammenfatning, genereret asynkront

Systemet vurderer ikke om kilden har skrevet en god artikel.  
Det vurderer: **Kan dette input blive til en stærk Y-historie?**

---

## Systemarkitektur: tre lag

```
INPUT
(nyhedsmedie, pressemeddelelse, rapport, myndighed, blog, sociale medier m.fl.)
        ↓
LAG 1 — Topic Classification
Hvad handler inputtet om?
(25 primære topics, kan have flere samtidigt)
        ↓
LAG 2 — Journalistic Function Scoring
Hvilken journalistisk funktion aktiverer inputtet?
(11 funktioner, 0–100 pr. funktion)
        ↓
LAG 3 — Y Rating
Hvad er inputtets samlede værdi for Y?
(7 vægtede dimensioner → Y Score 0–100)
        ↓
OUTPUT
Prioritet + køplacering + redaktørhjælp
```

---

## De 11 journalistiske funktioner

| Funktion | Kernespørgsmål | Pille |
|---|---|---|
| **Challenge** | Udfordrer dette et dogme, en konsensus eller en etableret fortælling? | Challenge |
| **Blind Spot** | Hvad mangler i den eksisterende dækning? | Challenge |
| **Mythbuster** | Viser data eller forskning, at en udbredt antagelse er forkert? | Challenge |
| **Perspective** | Løfter dette en hændelse ind i større sammenhæng? | Understand |
| **Signal** | Er dette et tidligt tegn på en større udvikling? | Understand |
| **Threat** | Hvad kan skade læseren, virksomheden, markedet eller samfundet? | Understand |
| **Curiosity** | Hvad gør historien fascinerende eller overraskende? | Understand |
| **Opportunity** | Hvilken mulighed kan læseren udnytte? | Inspire |
| **Inspiration** | Hvad kan læseren lære, kopiere eller bruge? | Inspire |
| **Guide** | Kan dette omsættes til konkrete råd eller handlingsanvisninger? | Inspire |
| **Solution** | Tilbyder dette en konkret løsning, et håb eller et positivt fremtidsperspektiv? | Inspire |

En historie kan score højt på flere funktioner samtidigt. Solution er tilføjet som 11. funktion for at sikre at Y's tredje indholdspille — *Fremtiden er lys* — er eksplicit repræsenteret i scoremodellen.

---

## Y Score — formel og vægtning

| Dimension | Vægt | Begrundelse |
|---|---|---|
| Audience Relevance | 20 % | Ikke relevant for Y's læser = ingen Y-historie |
| Impact | 20 % | Løftet fra 15 % — vigtige Understand-historier må ikke systematisk underscores |
| Counter-Narrative Value | 15 % | Sænket fra 20 % — Y er counter-narrative, men ikke udelukkende |
| Perspective Value | 15 % | Y's analysedybde og forklaringsjournalistik |
| Decision Value | 15 % | Centralt for Y Business: hjælper læseren beslutte |
| Trust / Source Strength | 10 % | Lav trust → verificering, ikke fravælgelse |
| Production Potential | 5 % | Let at omsætte = lavere friktion i produktion |

**Formel:**  
`Y Score = AR×0.20 + I×0.20 + CNV×0.15 + PV×0.15 + DV×0.15 + T×0.10 + PP×0.05`

---

## Prioritetsniveauer

| Score | Niveau | Redaktøraktion |
|---|---|---|
| 85–100 | **Critical** | Behandles hurtigt — stærk vinkel, høj relevans, klar beslutningsværdi |
| 70–84 | **High Priority** | Indgår i redaktionel prioritering — kræver evt. modkilde eller verificering |
| 55–69 | **Watch / Develop** | Gemmes, overvåges eller kombineres med andre kilder |
| 40–54 | **Low Priority** | Begrænset værdi — kan bruges som baggrundsmateriale |
| 0–39 | **Ignore** | Ikke relevant for Y |

---

## Feed og køstruktur

Alt indhold lever i **ét feed**. Placeringen bestemmes af Y Score — høj score rykker op. Redaktøren arbejder i samme oversigt hele tiden.

Hvert element i feedet bærer attributter redaktøren kan filtrere og sortere på:

| Attribut | Eksempel |
|---|---|
| `y_score` | 85 |
| `priority` | critical |
| `primary_function` | blind_spot |
| `secondary_functions` | challenge · perspective |
| `topics` | Business · Regulation · SME |
| `source_risk` | medium |
| `source_type` | interest_organization_press_release |

**Variation sikres via filtrering** — ikke via separate køer. En redaktør der vil finde dagens bedste Signal-historier filtrerer på `primary_function = signal`. En redaktør der vil se alt med `y_score > 70` sorterer på score.

---

## Kildekritisk lag

Alle inputs klassificeres med source risk: **low / medium / high**.

Lav trust betyder ikke fravælgelse — det betyder markering til verificering.

Typiske advarsler: partsinteresse · manglende dokumentation · ensidig fremstilling · ingen modkilde · kommerciel interesse · clickbait · uklart ophav.

---

## UI-specifikation — kortdesign (låst)

Rating integreres direkte i det eksisterende CMS-kort. Den farvede scoreblok erstatter det nuværende AI Evaluation-tekstpanel.

### Kortlayout

```
┌─────────────────────────────────────────────────────────────────┐
│ [ IMG ]   Titel på artikel eller kilde                         │
│           Manchet / uddrag...                                  │
│                                                                 │
│           ┌────┐  Blind Spot · Challenge · Perspective         │
│           │ 84 │  Historien afdækker en overset konsekvens     │
│           └────┘  for SMV'er i forsvarsdebatten.               │
│           (orange)  ⚠️ Medium risk — kræver modkilde.          │
│                                                                 │
│ kilde.dk  👁 💬 🔗   [Business] [Regulation] [SME]             │
│ 3. Jun    👍 👎                                                 │
│ [Processed]                                                     │
└─────────────────────────────────────────────────────────────────┘
```

### Farveskala (låst)

| Score | Niveau | Farve | Hex |
|---|---|---|---|
| 85–100 | Critical | Crimson | `#C43A49` |
| 70–84 | High | Rust | `#B5552C` |
| 55–69 | Watch | Guld/oliven | `#9C7A24` |
| 40–54 | Low | Grå | `#5E6675` |
| 0–39 | Ignore | Lysgrå | `#9C998F` |

### Tilstandsmodel (låst)

| Tilstand | Visning |
|---|---|
| Rating kørt, score 85–100 | Rød blok med tal |
| Rating kørt, score 70–84 | Orange blok med tal |
| Rating kørt, score 55–69 | Gul blok med tal |
| Rating kørt, score 40–54 | Grå blok med tal |
| Rating kørt, score 0–39 | Lysgrå blok med tal — vises i feedet |
| Rating ikke kørt endnu | Kortet skjules |

### Sortering og filtrering (låst)

- **Standardsortering:** Y Score faldende
- **Eksisterende filtre** (Sort, Filter by) udvides til at inkludere Y Score og primær funktion
- **Intet indhold kasseres automatisk** — lav score vises nedtonet, ikke fjernet

---

## Teknisk implementering — tre faser

**Fase 1 — MVP (deployed 4. juni 2026)**

```
Browser (React + TypeScript, Vite)
    ↓ fetch
Cloud Run API (Node/Express/TypeScript) — europe-west1
    ├── /api/y-test-lab/rate        ← SIRE-analyse (Gemini 2.0 Flash)
    ├── /api/y-test-lab/summary     ← Asynkron resumégenerering
    ├── /api/y-test-lab/search      ← Inline kildesøgning
    ├── /api/y-test-lab/feeds       ← 25 RSS-feeds
    ├── /api/y-test-lab/rss-items   ← RSS-hentning med datofilter
    ├── /api/y-test-lab/prompt      ← Hent/gem systemprompat
    └── /api/y-test-lab/prompt/reset

Firebase Hosting → sndeepdive.web.app
```

LLM-klassifikation · faste scoring prompts · regelbaserede justeringer · 25 testede RSS-feeds.

**Fase 2 — Feedback-loop**  
Publiceringer kobles til faktisk performance: klikrate, læsetid, scroll depth, konvertering, retention, delinger.  
Formål: Lær hvilke input der faktisk bliver til værdifulde Y-historier.

**Fase 3 — Prediktiv model**  
Når der er tilstrækkeligt historisk data: forudsig sandsynlig klikrate, læsetid, konvertering og redaktionel værdi pr. input.

---

## MVP-scope (implementeret)

MVP indeholder:
- Topic classification (25 topics)
- Function scoring (11 funktioner)
- Y Score (7 dimensioner, vægtet)
- Editorial pillar (understand / challenge / inspire)
- Source risk + editorial warning
- Why it matters · How to elevate ("Y's Vinkel")
- Summary (asynkron)
- Mulige vinkler · Anbefalet format · Manglende kilder
- Manuel score-override
- Prompt-editor i UI
- Bulk-analyse (op til 100 artikler)
- Inline kildesøgning
- 25 konfigurerede RSS-feeds
- Split-panel layout + mobiltilpasning

MVP indeholder **ikke** endnu: feedback-loop, prediktiv model, brugeradfærdsdata, CMS-integration.

---

## Intern taksonomi: engelsk klassifikation, dansk output

LLM-klassifikationen skrives på engelsk (stabilitet, internationale kilder, skalerbarhed). Output vises på dansk i brugerfladen.

---

## Hvad systemet ikke må gøre

- Forveksle borgerlig profil med partipolitisk bias
- Belønne provokation uden dokumentation
- Forveksle konflikt med kvalitet
- Lade pressemeddelelser passere uden kildekritik
- Belønne clickbait
- Nedprioritere historier der udfordrer Y's egne antagelserne

Y skal udfordre mainstream-fortællinger — og bevare troværdighed ved også at kunne udfordre sine egne læseres forventninger.

---

## Åbne spørgsmål — kræver beslutning

1. **Vægtning er et redaktionelt valg.** De 7 dimensioner er foreslået vægtet — men bør valideres med chefredaktøren. Særligt: er 20 % til Counter-Narrative Value korrekt for alle input-typer, eller bør breaking news-stof have en anden formel?

2. **Køer vs. samlet liste.** Parallelle køer er anbefalet for at sikre variation. Kræver en UI-beslutning: ser redaktøren alle køer simultant, eller arbejder de i én kø ad gangen?

3. **Tærskel for editorial warning.** Hvornår udløser en lav trust-score en blokering vs. en advarsel? Grænseværdi skal defineres.

4. **Feedback-loop-ansvar.** Hvem ejer kobling af rating til performance i Fase 2 — redaktion eller tech?

5. **Menneskelig override.** Kan en redaktør manuelt omrangere eller tilsidesætte Y Score? Og hvis ja — skal det logges og bruges til at forbedre modellen?

---

## Næste skridt

| Handling | Status | Ejer |
|---|---|---|
| Validér vægtningsformel med chefredaktør | ✅ Besluttet: Impact 20 %, CNV 15 % | PM + Chefredaktør |
| Solution som 11. funktion | ✅ Besluttet: Ja | PM + Chefredaktør |
| editorial_pillar i output | ✅ Besluttet: Ja | PM + Chefredaktør |
| MVP deployed og i drift | ✅ sndeepdive.web.app/y-test-lab | Tech |
| Redaktionel spot-test: 20–30 artikler | Åbent | Chefredaktør + PM |
| Prompt-kalibrering via prompt-editor | Åbent | PM + Chefredaktør |
| Feedback-loop-ansvar (Fase 2) | Åbent | CEO + PM |
| CMS-integration | Åbent — CMS eksisterer ikke endnu | Tech Lead |
