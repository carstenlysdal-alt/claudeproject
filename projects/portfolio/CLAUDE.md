# Projekt: Digital Portfolio — Carsten Lysdal

## Projektbeskrivelse

Et executive case-site der erstatter det analoge CV. Portfolien demonstrerer —
ikke bare fortæller — at Carsten Lysdal omsætter journalistik, data, AI og
strategi til produkter, workflows og adfærdsændring i virkelige redaktionelle
organisationer.

## Positionering (låst)

**Én-linjepitch:**
Jeg bygger bro mellem journalistik, data, AI og organisation — og får strategi til at virke i redaktionel praksis.

**Tagline:**
Redaktionel transformation · AI-enablement · Data til beslutninger · Produkter og workflows

**Tone og æstetik:**
Editorial intelligence — ikke cyberpunk.
Mørkt, præcist, metodisk, menneskeligt.

## Primær modtager

Chefredaktør, udviklingschef, direktør eller rekrutterer i medie- og videnorganisationer.

Ønsket tanke efter besøg:
"Han er ikke bare en journalist med AI-interesse. Han har faktisk bygget, ledet, implementeret og forandret."

## De tre lag

1. **Hvem er du?** — Mediechef, redaktionel AI-/data-/transformationsprofil
2. **Hvad kan du?** — AI-enablement, redaktionel udvikling, data/indsigt, produkt/workflow, ledelse og forandring
3. **Hvad har du bevist?** — Chatty, redaktionelle workflows, KPI/OKR, korte formater, dashboards, Y Business/prototyper, data→beslutning, AI→drift

## Den personlige model: Relevans · Resonans · Relation

**Relevans** — Hvad betyder noget for brugeren, virksomheden, borgeren eller redaktionen?
**Resonans** — Hvordan får indhold, data eller teknologi faktisk gennemslag?
**Relation** — Hvordan skaber man tillid, følgeskab og adfærdsændring?

## Navigation

| Sektion | Indhold |
|---|---|
| Forside | Position, visuel identitet, pitch, tre kompetencer |
| Cases | 5–6 dokumenterede eksempler |
| Metode | Relevans/Resonans/Relation + arbejdsform |
| AI & Data | Chatty, dashboards, prototyping, datakilder, prompts, AI-governance |
| Ledelse & Transformation | Følgeskab, implementering, adfærdsændring |
| CV | Kompakt, interaktivt, downloadbart PDF |
| Kontakt | Kort og professionelt |

## Cases (oplagte)

1. **Chatty** — AI fra prototype til redaktionel drift
2. **Redaktionel transformation, Sjællandske Medier** — data, AI, prioritering
3. **Data til redaktionelle beslutninger** — KPI, OKR, relevanskriterier, content performance
4. **Skalering af korte formater** — output, effektivitet, AI-workflows
5. **Y Business / AI-medieprodukt** — konceptudvikling, ratingmodeller, AI-arkitektur
6. **Research, OSINT og metode** — digitale kilder, åbne data, journalistisk systematik

## Artefakter der skal vises

- Screenshots af dashboards/prototyper
- Korte videoer/gifs af workflows
- Diagrammer over AI-flow
- Før/efter-eksempler på processer
- Anonymiserede prompt- eller workflow-eksempler
- Links til dokumenter og præsentationer
- "Toolbox"-side med metoder og værktøjer

## Interaktiv element (v2)

"Vælg en udfordring"-model:
- Vi har AI-piloter, men ingen drift
- Vi har data, men mangler beslutningskraft
- Vi har formater, men mangler brugerindsigt
- Vi har strategi, men ingen adfærdsændring
- Vi har redaktionelle behov, men mangler teknisk oversættelse

## v2 — "The Operating System of Carsten Lysdal"

Sitet rebuildes som et interaktivt karriere-dashboard, ikke en redaktionel
scroll-side. Metafor: intelligent kontrolpanel over karrieren.

**Fra → Til:** Portfolio med sektioner → interaktivt CV som produktinterface.
Tekstflader → infografiske, klikbare, bevægelige moduler. Topnav → side-rail/
bottom-nav. Accordions → bento-grid. Timeline → career stack. Kompetence-liste
→ radar.

### Ny struktur (8 scener)

01 Start (hero-dashboard) → 02 Impact (klikbare nøgletal) → 03 AI-systemet
(interaktiv værdikæde med Chatty) → 04 Transformation Map (før/efter) →
05 Cases (bento-grid) → 06 Kompetence-radar (6 akser) → 07 Career Stack
(progression) → 08 Mennesket (kort) → Kontakt.

### Låste designbeslutninger

| Punkt | Beslutning |
|---|---|
| Baggrund | Hybrid — kulsort #0E0C09 i hero/impact/AI/transformation. Varmere paneler i cases/karriere/menneske. |
| Brand-accent | Rust #A9503A |
| AI/data-accent | Elektrisk blå #3DD5F3 (ny) |
| Typografi | Newsreader (display) · Instrument Sans (body/interface) · JetBrains Mono (labels/metrics) |
| Tech | Ren HTML/CSS/JS + SVG. Ingen build. |
| Navigation | Side-rail (desktop venstre) + bottom-nav (mobil) |
| OSINT-case | Foldes ind i radar + AI-system. Ikke selvstændig case-kort. |
| Cases i bento | Chatty (featured), Transformation, Data, Skalering, Produkt/discovery (5 kort) |
| Mennesket | Halveres vs v1. Portræt + 3 punkter (timing, samspil, mestring). |

### 6 infografiske moduler

1. Impact Dashboard — klikbare animerede nøgletal
2. AI Value Chain — interaktiv flow med Chatty som central node
3. Transformation Map — før/efter-diagram med animeret overgang
4. Kompetence-radar — SVG-radar, 6 akser, vælg akse → beviser
5. Case Cards — bento-grid, åbner 5-trins flow
6. Career Stack — progression der låser kompetencer op

### Motion-princip

Motion skal have funktion: retning, prioritering, årsag/virkning. Ikke pynt.
AI bevæger sig gennem værdikæden. Tal tæller op. Cases folder ud som flows.
Kompetencer forbinder til resultater.

## Tech-stack

Format: Statisk HTML/CSS/JS — ingen framework, ingen build-step
Hosting: Beslutning mangler — Vercel, Netlify eller eget domæne
Domæne: Ikke fastlagt endnu

## Mappestruktur

- `docs/` — brief, kravspec, wireframe-noter, content.md (SSOT)
- `output/` — færdige leverancer og eksport
- `research/` — research-input og videngab
- `site/` — den faktiske hjemmeside
  - `lysdal-portfolio.html` — v1 (beholdes som reference)
  - `os.html` — v2 "OS" (aktiv build)
  - `css/os.css` — v2 stylesheet
  - `js/os.js` — v2 interaktioner

## Nuværende fase

v2-build: "The Operating System of Carsten Lysdal"
