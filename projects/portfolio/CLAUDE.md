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

## Navigation (v6, låst)

| Sektion | Indhold |
|---|---|
| Start | Split hero: eyebrow, H1, pitch, proof-line, portræt — intet system/infografik på første skærm |
| Meritter | "Det korte overblik" — 6-korts merit-dashboard, ingen talbokse |
| Kompetencer | "Det jeg kan få til at ske" — 5 kapabiliteter, interaktiv matrix |
| Cases | "Udvalgte beviser" — 5 kort navngivet efter kapabilitet, ikke værktøj |
| Erfaring | "Erfaring bygget i lag" — 8-lags career stack + værktøjs-drawer |
| Menneske | "Rytme, retning og samspil" — portræt, 3 kort (Timing/Samspil/Mestring) |
| Kontakt | Kort og professionelt |

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

## v6 — Content/IA-rewrite (nuværende retning, afløser v2 "OS")

Den tidligere "OS"-vision (8-scene interaktivt dashboard, side-rail-navigation,
kompetence-radar, elektrisk blå AI-accent, Newsreader/Instrument Sans) blev
aldrig bygget færdig (intet `os.html` blev nogensinde oprettet) og er nu
opgivet til fordel for denne retning: **samme visuelle sprog som v5**
(Cormorant Garamond / Schibsted Grotesk / Geist Mono, cream/charcoal/rust
#A9503A) — men en fuld omskrivning af indhold og informationsarkitektur, så
siden læses som en strategisk præsentation af Carsten, ikke et feature- eller
værktøjsshowroom. Se `docs/content.md` for den fulde, låste tekst.

Motion-princip fastholdes: motion skal have funktion (retning, prioritering,
årsag/virkning), ikke pynt. Cases og kompetencer folder ud som paneler;
career stack viser progression.

## Tech-stack

Format: Statisk HTML/CSS/JS — ingen framework, ingen build-step
Hosting: Beslutning mangler — Vercel, Netlify eller eget domæne
Domæne: Ikke fastlagt endnu

## Mappestruktur

- `docs/` — brief, kravspec, wireframe-noter, content.md (SSOT)
- `output/` — færdige leverancer og eksport
- `research/` — research-input og videngab
- `site/` — den faktiske hjemmeside
  - `lysdal-portfolio.html` — eneste live site
  - `css/style.css` — stylesheet
  - `js/main.js` — interaktioner

## Nuværende fase

v6-rewrite: content/IA-omskrivning til strategisk præsentation (se
"v6 — Content/IA-rewrite" ovenfor og `docs/content.md`).
