---
name: skill-soeg
description: "Aktivér når brugeren spørger om tilgængelige skills eller bundles, ikke ved hvad han vil bruge, eller beder om hjælp til at finde det rigtige bundle. Trigger: 'hvilke bundles', 'hvad kan jeg bruge', 'vis mine skills', 'hvad har jeg til', 'find et bundle', 'skill menu', 'hvilke skills har jeg', 'hjælp mig med at finde'."
metadata:
  version: 1.0.0
  type: custom
---

# Skill-søg

Interaktiv skill-browser der præsenterer alle installerede bundles og projektspecifikke skills — og enten spørger hvad brugeren skal lave eller selv vælger det rigtige bundle, når opgavens genre allerede er tydelig.

## Instruktion

Når denne skill aktiveres:

1. **Vurdér om brugerens opgavegenre er tydelig.**
   - Hvis ja: vælg selv det mest relevante bundle ud fra rutingtabel og svar med anbefalet bundle.
   - Hvis nej: stil ét spørgsmål — præcist og direkte:

> **Hvad skal du lave?** Beskriv opgaven kort — fx "skrive et PRD", "designe en landing page", "planlægge en launch", "analysere et A/B-test" eller "skrive en artikel til LinkedIn.

2. **Vent på svaret hvis du har spurgt** — afbryd ikke med en liste af muligheder endnu.

3. **Kortlæg svaret til et bundle** og præsentér:
   - Det anbefalede bundle (fed, med kommando)
   - De 2-3 mest relevante enkelt-skills inden for bundlet
   - Ét linjers forklaring på hvorfor dette bundle passer

4. **Spørg om projektkontekst** hvis svaret er tvetydigt — fx "Er det til ydkbusiness, pocket-drummer eller rating?"

---

## Bundleoversigt — platform-niveau

Disse bundles er tilgængelige i alle projekter:

### `/pm-strategi`
PRD, roadmap, discovery, OKR, JTBD, positionering, stakeholder-alignment.
Brug: "Hvad skal vi bygge?", "Skriv et PRD", "Prioritér initiativer", "Lav en roadmap".

### `/metrics-eksperimenter`
North Star Metric, A/B-test, eksperimenter, survey-analyse, OKR-scoring.
Brug: "Hvad skal vi måle?", "Analyser A/B-testen", "Design et eksperiment", "Definer KPI'er".

### `/gtm-kommerciel`
GTM-plan, launch-faser, salg, SEO, email, cold outreach, CRO, analytics.
Brug: "Gå til markedet", "Lav en launch-plan", "Skriv et sales deck", "Sæt analytics op".

### `/redaktion-indhold`
Artikler, klummer, SoMe-opslag, nyhedsbreve, pitches, pressemeddelelser på dansk.
Brug: "Skriv en artikel", "Lav et LinkedIn-opslag", "Skriv et nyhedsbrev", "Pitch til CEO".

### `/design-ui`
Design-audit, polish, typografi, UI-komponenter, frontend-implementering.
Brug: "Design en skærm", "Audit layoutet", "Implementér en komponent", "Tjek typografien".

### `/praesentation`
PowerPoint/PPTX, HTML-slides, dokumentkvalitet til C-suite.
Brug: "Lav en præsentation", "Slides til ledelsen", "Løft dokumentet", "PPTX-deck".

### `/tech-kode`
TDD, tests, arkitektur, performance, debugging, code review.
Brug: "Byg en feature", "Skriv tests", "Refaktorér koden", "Debug dette", "Performance-optimer".

### `/app`
Fullstack app-udvikling: backend, databaser, mobil, DevOps, auth og sikkerhed.
Brug: "Byg en app", "Design et API", "Sæt auth op", "Lav database-model", "Deploy backend".

### `/workflow`
Sessionstyring, prompt-design, skill-søgning, token-effektivitet og plan-eksekvering.
Brug: "Find det rigtige bundle", "Lav en prompt", "Eksekvér denne plan", "Lav et handoff".

---

## Projektspecifikke skills — pocket-drummer

Disse skills er kun installeret i `projects/pocket-drummer/`:

| Skill | Hvornår |
|---|---|
| `design-taste-frontend` | Production-grade marketing sites og portfolios |
| `sleek-design-mobile-apps` | Mobilapp-design og -polish |
| `vercel-react-best-practices` | React/Next.js/Vercel best practices |
| `tdd` | Test-drevet udvikling |
| `webapp-testing` | End-to-end tests |
| `improve-codebase-architecture` | Arkitektur-refaktorering |
| `subagent-driven-development` | Komplekse parallelle opgaver |
| `requesting-code-review` | Struktureret code review |

---

## Rutingtabel — fra opgave til bundle

| Nøgleord i brugerens svar | Anbefal |
|---|---|
| PRD, roadmap, discovery, OKR, prioriter, strategi, JTBD, features | `/pm-strategi` |
| Metrics, A/B-test, North Star, eksperiment, KPI, dashboard, måle | `/metrics-eksperimenter` |
| Launch, GTM, salg, SEO, email, cold outreach, CRO, konvertering | `/gtm-kommerciel` |
| Artikel, klumme, SoMe, opslag, LinkedIn, nyhedsbrev, pitch, tekst | `/redaktion-indhold` |
| Design, wireframe, audit, komponent, layout, typografi, farver, UI | `/design-ui` |
| Præsentation, slides, PowerPoint, deck, ledelsen, CEO | `/praesentation` |
| Kode, byg, test, debug, arkitektur, performance, refaktor | `/tech-kode` |
| App, backend, API, database, mobil, DevOps, auth, sikkerhed | `/app` |
| Workflow, prompt, plan, handoff, skill-søgning, context, token | `/workflow` |

---

## Output-format

```
**Anbefalet bundle: `/[bundle-navn]`**

Passer til din opgave fordi [ét konkret argument].

Skills der er mest relevante her:
- `[skill-1]` — [hvad den gør i denne kontekst]
- `[skill-2]` — [hvad den gør i denne kontekst]
- `[skill-3]` — [hvad den gør i denne kontekst]

Klar til at starte? Sig bare hvad du har brug for.
```

Ingen lange forklaringer. Ingen liste af alle 9 bundles med mindre brugeren eksplicit beder om det.
