# Projekt: Digital Portfolio — Carsten Lysdal

## Projektbeskrivelse

Et executive case-site der erstatter det analoge CV. Portfolien demonstrerer —
ikke bare fortæller — at Carsten Lysdal omsætter journalistik, data, AI og
strategi til produkter, workflows og adfærdsændring i virkelige redaktionelle
organisationer.

## Positionering (låst)

**Bærende sætning (alt indhold måles op mod denne):**
Jeg forbinder journalistisk dømmekraft, brugerbehov, data, teknologi og mennesker — så idéer bliver til redaktionel praksis, stærkere beslutninger og organisationer, der kan flytte sig.

**Tagline:**
AI, data og mennesker. Sat i system.

**Hierarki (må aldrig brydes):**
Niveau 1 Carsten (person, blik, rolle, erfaring, stemme) → Niveau 2 Kapabiliteter
(ledelse, strategi, dømmekraft, organisation, AI, platforme, formidling) →
Niveau 3 Dokumentation (chefredaktion, 150 medarbejdere, OKR/KPI, brugerbehov,
Chatty, cases, trafikvækst, oplæg) → Niveau 4 Features/værktøjer (Den Korte
Version, rating-systemer, recommender, SEO-tool, 500-600 enheder). Features må
aldrig ligge i niveau 1 eller 2 — kun optræde som dokumentation under en
kompetence eller case. Chatty, Den Korte Version og AI-værktøjer må aldrig
være sitets hovedcase eller hero-emne.

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

## Navigation (v9, nuværende)

| Sektion | Indhold |
|---|---|
| Start | Filmisk full-bleed hero: identitet, kort positionering, CTA og smal proof-rail |
| Overblik | Executive index, dokumenterede resultater og kildeforankret evidence ledger |
| Profil | Executive brief med tematiske faner og kompakt faktaboks |
| Erfaring | Mørk executive timeline med mandat, udvalgte resultater og sekundært værktøjs-drawer |
| Cases | Filtrerbart dossier-register: ledelse, publikum, produkt, transformation og AI i drift |
| Kompetencer | Kapabiliteter koblet direkte til roller, cases og dokumenterede resultater |
| Scene | Filmisk menneskeligt kapitel med oplæg, workshops, moderation og sparring |
| Ledelse | Ledelsesprotokol og AI-ledelse som dokumenteret anvendelsesspor |
| Kontakt | Stor, direkte afslutning med mail, LinkedIn og CV |

## Cases (låst, v6)

1. **Digital indholdsstrategi i drift** — brugerbehov, relevanskriterier, SEO, performance (Den Korte Version som dokumentation)
2. **Organisationsudvikling og ledelse** — 150 medarbejdere, OKR/KPI, mellemlederudvikling
3. **AI-implementering og enablement** — Chatty som dokumentation, ikke hovedcase
4. **Platforme og redaktionelle systemer** — rating-systemer, recommender, roadmap, discovery
5. **Nyhedsdrift, samfundsblik og formidling** — journalistisk grundmotor, oplæg, moderation

## Artefakter der skal vises

- Screenshots af dashboards/prototyper
- Korte videoer/gifs af workflows
- Diagrammer over AI-flow
- Før/efter-eksempler på processer
- Anonymiserede prompt- eller workflow-eksempler
- Links til dokumenter og præsentationer
- "Toolbox"-side med metoder og værktøjer

## v9 — Cinematic Command Index

Den nuværende retning kombinerer et filmisk identitetsrum med et kompakt
executive dokumentationsinterface. Heroen er dramatisk, mørk og full-bleed;
resten af siden veksler mellem dybe blågrønne flader og varme dokumentflader.
Typografien bæres af Barlow Condensed, Inter og Geist Mono. Brændt orange
`#FF5A35` bruges som signalaccent.

Siden må ikke ligne et opskaleret mobildashboard eller et AI-showroom. Små
UI-formater bruges til at kuratere ansvar, effekt og dokumentation. Cases er
dossiers, kompetencer er bevisnavigation, og karrieren er en executive
timeline. AI er et tydeligt filter og et dokumenteret ledelsesspor — aldrig
den samlede identitet.

Motion skal forklare rækkefølge, relation eller fokus. Elementer entrer i små
grupper med forskudt timing; heroen bygges op i lag. Al bevægelse har
`prefers-reduced-motion`-fallback.

## Navigationsmodel: filmisk åbning + dokumentationsrejse

Topnavigationen ligger transparent over heroen og skifter til en mørk,
kompakt navigation efter første viewport. På mobil suppleres den af en fast
bottom tab bar. Executive index og casefiltre giver resultatorienteret
navigation inde i indholdet. Siden bruger almindelig, fri scroll uden
scroll-hijacking.

## Tech-stack

Format: Statisk HTML/CSS/JS — ingen framework, ingen build-step
Hosting: Firebase Hosting (projekt `portfolio-36137`)
Domæne: `carstenlysdal.dk` (DNS via Cloudflare, se `docs/firebase-hosting-setup.md`)

## Mappestruktur

- `docs/` — brief, kravspec, wireframe-noter, content.md (SSOT)
- `output/` — færdige leverancer og eksport
- `research/` — research-input og videngab
- `site/` — den faktiske hjemmeside
  - `lysdal-portfolio.html` — eneste live site
  - `css/style.css` — stylesheet
  - `js/main.js` — interaktioner

## Nuværende fase

v9: Cinematic Command Index — visuelt system, progressive disclosure og
skarpere binding mellem markdownkilder, roller, cases og resultater.
