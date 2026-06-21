# PRD — Story Intelligence Rating Engine, MVP

**Projekt:** Y.dk / Rating  
**Version:** 1.1  
**Dato:** 3. juni 2026 (MVP deployed 4. juni 2026)  
**Ejer:** PM  
**Status:** MVP i drift — testmiljø: sndeepdive.web.app/y-test-lab

---

## 1. Executive Summary

Y's redaktionelle CMS modtager indhold fra op mod 14 kildetyper — men har ingen systematisk måde at vurdere, hvilke input der bærer journalistisk potentiale for Y. Redaktører sorterer i dag manuelt eller efter kronologi.

MVP'en er en LLM-drevet ratingmotor — Story Intelligence Rating Engine (SIRE) — der analyserer hvert indkommende input og returnerer et struktureret JSON-output med emneklassifikation, funktionsscoring og en samlet Y Score (0–100). Scoren vises som en farvet talblok direkte i CMS-kortets eksisterende AI Evaluation-felt. Feedet sorteres på Y Score som standard.

Målet er at give redaktøren et øjeblikkeligt, konsistent beslutningsgrundlag — uden at ændre arbejdsgangen.

---

## 2. Problem

Indhold strømmer ind fra nyhedsmedier, pressemeddelelser, rapporter, myndigheder, tænketanke og sociale medier. Uden et ratingsystem er redaktørens eneste prioriteringsprincip **kronologi eller mavefornemmelse**. Begge dele skalerer dårligt og er blinde for Y's særkende: modpol, blind vinkel og beslutningsværdi.

**Kerneproblemet:** Journalisterne kan ikke hurtigt identificere, hvilke input der bærer potentiale til de historier Y eksisterer for at lave — og hvilke der er støj.

**Hvad systemet ikke løser i MVP:** Det har ingen brugeradfærdsdata, ingen klikrate, ingen performancemetrikker. MVP'en bygger udelukkende på redaktionelle kriterier defineret i Y's DNA.

---

## 3. Målgruppe

**Primær bruger:** Redaktør og journalist der arbejder i Y's CMS-feed.

**Job-to-be-done:** "Når nyt indhold ankommer, vil jeg hurtigt kunne se hvilke historier der har højest journalistisk potentiale for Y — så jeg kan prioritere min arbejdstid rigtigt og ikke overse vigtige vinkler."

**Sekundær bruger:** Chefredaktør der ønsker overblik over dagens mest relevante input på tværs af kildetyper.

---

## 4. Løsningsoverblik

SIRE modtager et eksternt input og kører det igennem tre lag:

```
INPUT (nyhedsmedie, pressemeddelelse, rapport, myndighed m.fl.)
        ↓
LAG 1 — Topic Classification
        ↓
LAG 2 — Journalistic Function Scoring (11 funktioner, 0–100)
        ↓
LAG 3 — Y Rating (7 dimensioner, vægtet → Y Score 0–100)
        ↓
JSON OUTPUT → CMS
```

Outputtet vises i det eksisterende CMS-kort. Kortet ændrer ikke struktur — kun AI Evaluation-feltet befolkes med struktureret data i stedet for fri tekst.

---

## 5. MVP-scope

### Inkluderet i MVP

| Funktion | Beskrivelse |
|---|---|
| Topic classification | 25 primære topics, kan have flere pr. input |
| Function scoring | 11 journalistiske funktioner, 0–100 pr. funktion |
| Y Score | Vægtet sum af 7 ratingdimensioner, 0–100 |
| Source risk | low / medium / high |
| Editorial warning | Fritekst-advarsel ved medium/high source risk |
| Primær funktion | Den funktion med højest score |
| Sekundære funktioner | Op til 3 yderligere funktioner med score > 50 |
| Editorial pillar | understand / challenge / inspire — udledes af primær funktion |
| Why it matters | Én sætning: hvorfor dette input er relevant for Y |
| How to elevate ("Y's Vinkel") | Konkret redaktionelt råd om hvad der mangler for at løfte inputtet til en stærk Y-historie |
| Summary | Neutral sammenfatning af inputtets faktuelle indhold — genereres asynkront |
| Mulige vinkler | 2–3 konkrete vinkler til Y-historier |
| Anbefalet format | Ét format (analysis, guide, mythbuster osv.) |
| Farvet scoreblok i CMS | Tal i farvet blok, integreret i kortvisning |
| Standardsortering | Y Score faldende |
| Skjul ubehandlet indhold | Kort vises ikke før ratingmotoren har kørt |
| Manuel score-override | Redaktøren kan korrigere score — loggable feedback-signal |
| Prompt-editor i UI | Redigér og gem aktiv systempromptat runtime uden kodedeploy |
| Bulk-analyse | Vælg 1–100 artikler fra et RSS-feed, kør alle sekventielt |
| Inline kildesøgning | Klik på manglende kilde → realtidssøgning vises inline |
| RSS-feeds | 25 konfigurerede og testede feeds (danske + internationale + niche) |

### Ikke inkluderet i MVP

| Funktion | Begrundelse |
|---|---|
| Feedback-loop (klikrate, læsetid) | Mediet er ikke online endnu — Fase 2 |
| Prediktiv model | Kræver historisk data — Fase 3 |
| Brugeradfærdsdata | Ikke tilgængeligt i MVP-fasen |
| Notifikationer ved Critical-score | Fase 2 |
| Automatisk publicering | Udenfor scope — redaktøren beslutter altid |
| CMS-integration | CMS eksisterer ikke endnu — testmiljøet er bridgen |

---

## 6. Journalistiske funktioner (scoringsmodel)

Hvert input scores på 10 funktioner fra 0–100. En historie kan score højt på flere funktioner samtidigt.

| Funktion | Kernespørgsmål |
|---|---|
| Challenge | Udfordrer dette et dogme eller en etableret fortælling? |
| Blind Spot | Hvad mangler i den eksisterende dækning? |
| Perspective | Løfter dette en hændelse ind i større sammenhæng? |
| Mythbuster | Viser data at en udbredt antagelse er forkert? |
| Signal | Er dette et tidligt tegn på en større udvikling? |
| Threat | Hvad kan skade læseren, virksomheden eller samfundet? |
| Opportunity | Hvilken mulighed kan læseren udnytte? |
| Inspiration | Hvad kan læseren lære eller kopiere? |
| Guide | Kan dette omsættes til konkrete råd eller handlingsanvisninger? |
| Curiosity | Hvad gør historien fascinerende eller overraskende? |
| **Solution** | **Tilbyder dette en konkret løsning, et håb eller et positivt fremtidsperspektiv?** |

**Primær funktion:** Den funktion med højest score.  
**Sekundære funktioner:** Op til 3 funktioner med score > 50, vises dæmpet.

**Solution-funktionen** sikrer at Y's tredje indholdspille — *Fremtiden er lys / Inspire* — er eksplicit repræsenteret i scoringsmodellen og ikke systematisk nedprioriteres ift. Challenge- og Threat-historier.

---

## 7. Y Score — formel og vægtning

| Dimension | Vægt | Rationale |
|---|---|---|
| Audience Relevance | 20 % | Ikke relevant for Y's læser = ingen Y-historie |
| Impact | 20 % | Løftet fra 15 % — vigtige Understand-historier må ikke systematisk underscores |
| Counter-Narrative Value | 15 % | Sænket fra 20 % — Y er counter-narrative, men ikke udelukkende |
| Perspective Value | 15 % | Y's analysedybde og forklaringsjournalistik |
| Decision Value | 15 % | Hjælper læseren beslutte — centralt for Y Business |
| Trust / Source Strength | 10 % | Lav trust = verificering, ikke fravælgelse |
| Production Potential | 5 % | Let at omsætte = lavere friktion i produktion |

**Formel:**
```
Y Score = AR×0.20 + I×0.20 + CNV×0.15 + PV×0.15 + DV×0.15 + T×0.10 + PP×0.05
```

**Vægtningen afspejler Y's tre pillars:** Understand (Impact), Challenge (Counter-Narrative Value) og Inspire (implicit via Solution-funktion). Skal valideres med chefredaktøren inden implementering.

---

## 8. Prioritetsniveauer og kortvisning

| Score | Niveau | Farve | Hex | Redaktøraktion |
|---|---|---|---|---|
| 85–100 | Critical | Crimson | `#C43A49` | Behandles hurtigt |
| 70–84 | High | Rust | `#B5552C` | Indgår i prioritering |
| 55–69 | Watch | Guld/oliven | `#9C7A24` | Overvåg eller kombiner |
| 40–54 | Low | Grå | `#5E6675` | Bruges som baggrund |
| 0–39 | Ignore | Lysgrå | `#9C998F` | Vises nedtonet |
| Ikke kørt | — | Skjules | — | Vises ikke i feedet |

---

## 9. Kortdesign — CMS-integration

Rating integreres i det eksisterende AI Evaluation-felt. Kortets struktur ændres ikke.

```
┌─────────────────────────────────────────────────────────────────┐
│ [ IMG ]   Titel                                                 │
│           Manchet...                                            │
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

**Standardsortering:** Y Score faldende.  
**Filtrering:** Eksisterende Sort og Filter by-funktioner udvides med Y Score og primær funktion.

---

## 10. API-output (JSON)

Ratingmotoren returnerer følgende struktur til CMS:

```json
{
  "y_score": 84,
  "priority": "high",
  "primary_function": "blind_spot",
  "secondary_functions": ["challenge", "perspective"],
  "topics": ["Business", "Regulation", "SME"],
  "source_type": "interest_organization_press_release",
  "editorial_pillar": "challenge",
  "summary": "En erhvervsorganisation advarer om, at nye EU-krav til emballageregulering vil pålægge danske SMV'er betydelige compliance-omkostninger fra 2026.",
  "functions": {
    "challenge": 69,
    "blind_spot": 82,
    "perspective": 76,
    "mythbuster": 44,
    "signal": 73,
    "threat": 88,
    "opportunity": 28,
    "inspiration": 12,
    "guide": 61,
    "curiosity": 35,
    "solution": 22
  },
  "ratings": {
    "audience_relevance": 92,
    "impact": 84,
    "counter_narrative_value": 78,
    "perspective_value": 76,
    "decision_value": 81,
    "trust": 58,
    "production_potential": 86
  },
  "source_risk": "medium",
  "editorial_warning": "Partsinteresse. Kræver modkilde fra myndighed, uafhængig ekspert eller konkret virksomhed.",
  "recommended_format": "analysis + guide",
  "possible_angles": [
    "Hvem betaler prisen for den nye regulering?",
    "Den oversete konsekvens for små virksomheder",
    "Fem ting SMV'er bør forberede sig på nu"
  ],
  "why_it_matters": "Historien afdækker en overset økonomisk konsekvens i en ellers ensidig dækning.",
  "how_to_elevate": "Find uafhængige erhvervsøkonomer og konkrete SMV-cases til at dokumentere påstanden. Stil EU-Kommissionen til ansvar: Hvad er det forventede compliance-tab sat op mod den klimaeffekt regulering skal levere?",
  "missing_sources": [
    "uafhængig ekspert",
    "myndighed",
    "konkret SMV-case"
  ]
}
```

---

## 11. LLM-prompt (grundskabelon)

```
You are the Story Intelligence Rating Engine for Projekt Y.

Your task is not to judge whether the input is well-written.
Your task is to assess whether the input contains journalistic,
intellectual, business or counter-narrative potential for Projekt Y.

Projekt Y is an AI-first media outlet. Its editorial DNA is fact-based,
solution-oriented, and focused on nuance, counter-perspectives, blind spots,
overlooked sources, and challenges to fixed opinions, dogmas and hidden
power structures.

Analyze the input and return structured JSON.

Score all functions from 0-100:
challenge, blind_spot, perspective, mythbuster, signal,
threat, opportunity, inspiration, guide, curiosity, solution

Score all rating dimensions from 0-100:
audience_relevance, impact, counter_narrative_value,
perspective_value, decision_value, trust, production_potential

Calculate y_score:
audience_relevance×0.20 + impact×0.20 +
counter_narrative_value×0.15 + perspective_value×0.15 +
decision_value×0.15 + trust×0.10 + production_potential×0.05

Return full JSON including:
topics, source_type, functions, ratings, y_score, priority,
primary_function, secondary_functions, editorial_pillar,
source_risk, editorial_warning, recommended_format,
possible_angles, why_it_matters, how_to_elevate,
missing_sources, summary
```

---

## 12. Teknisk implementering — Fase 1 (MVP)

**Implementeret stack (deployed 4. juni 2026):**

```
Browser (React + TypeScript, Vite)
    ↓ fetch
Cloud Run API (Node/Express/TypeScript) — europe-west1
    ├── /api/y-test-lab/rate          ← SIRE-analyse (Gemini 2.5 Flash Lite / DeepSeek fallback)
    ├── /api/y-test-lab/summary       ← Asynkron resumégenerering
    ├── /api/y-test-lab/search        ← Inline kildesøgning (Google Search)
    ├── /api/y-test-lab/feeds         ← Feed-liste (25 kilder)
    ├── /api/y-test-lab/rss-items     ← RSS-hentning med datofilter
    ├── /api/y-test-lab/prompt        ← Hent/gem SIRE-systemprompat
    └── /api/y-test-lab/prompt/reset  ← Nulstil til standardprompt

Firebase Hosting → sndeepdive.web.app
```

**AI-model:** Gemini 2.5 Flash Lite (primær) — aktiveres hvis `GEMINI_API_KEY` eller `API_KEY` er sat. Fallback til DeepSeek (`deepseek-chat`) hvis Gemini-nøgle mangler. DeepSeek-model kan overstyres via `DEEPSEEK_MODEL`-miljøvariabel. Prompten returnerer struktureret JSON direkte.

**Intern taksonomi:** Engelsk (stabilitet, internationale kilder, skalerbarhed).  
**Output i CMS:** Dansk.

**Regeleksempler (implementeret):**
```
if source_type == "press_release" and trust < 60:
    editorial_warning = "Partsinteresse — kræver uafhængig verificering"

if functions.blind_spot > 80 and ratings.audience_relevance > 80:
    primary_function = "blind_spot"

if functions.threat > 85 and ratings.decision_value > 80:
    recommended_format = "alert + guide"
```

**Responstid:** ~3–6 sekunder pr. artikel.

**Hvad CMS-integration skal håndtere (når CMS er klar):**
- Modtage JSON fra ratingmotor
- Vise farvet scoreblok i AI Evaluation-feltet
- Sortere feed på `y_score` som standard
- Skjule kort hvor `y_score` ikke eksisterer endnu

---

## 13. Success metrics for MVP

| Metric | Mål | Måles via |
|---|---|---|
| Dækning | 100 % af Processed-indhold scores inden for X min efter ingest | CMS-log |
| Konsistens | Samme input giver ±3 point ved genkørsel | Spot-test |
| Redaktørtilfredshed | Redaktøren oplever scoringen som meningsfuld | Kvalitativ interview efter 2 ugers brug |
| Fejlrate | < 5 % af scores udløser manuel korrektion fra redaktøren | Thumbs down-tracking |

**Ingen klikrate eller performancemål i MVP** — mediet er ikke online endnu.

---

## 14. Risici

| Risiko | Sandsynlighed | Konsekvens | Mitigering |
|---|---|---|---|
| LLM scorer inkonsistent på tværs af inputtyper | Medium | Lav tillid fra redaktionen | Kør 50 testinputs og valider manuelt inden launch |
| Vægtningsformlen afspejler ikke chefredaktørens prioriteter | Medium | Forkert sortering | Valider formel med chefredaktør inden implementering |
| Engelske signalord fanger ikke dansk kontekst | Lav | Blind vinkler i dansk stof | Tilføj danske signalord i prompt — allerede defineret |
| CMS kan ikke modtage struktureret JSON | Lav | Blokerer hele MVP | Afklar med Tech Lead inden sprint-start |

---

## 15. Åbne spørgsmål

| Spørgsmål | Status | Ejer |
|---|---|---|
| Valider vægtningsformel med chefredaktør | ✅ Besluttet: Impact 20 %, CNV 15 % | PM + Chefredaktør |
| Solution som 11. funktion? | ✅ Besluttet: Ja | PM + Chefredaktør |
| editorial_pillar i output? | ✅ Besluttet: Ja | PM + Chefredaktør |
| Er ~3–6 sek. pr. artikel acceptable responstider? | Åbent | Tech Lead |
| Skal thumbs up/down logges og kobles til Y Score (Fase 2)? | Åbent | PM + Tech Lead |
| Feedback-loop-ansvar i Fase 2 — redaktion eller tech? | Åbent | CEO + PM |

---

## 16. Go/no-go-kriterier for CMS-integration

MVP-testmiljøet er deployed og i drift. Go/no-go-kriterierne nedenfor gælder **CMS-integrationen** — næste fase.

**Go** når:
- Redaktionel spot-test: 20–30 artikler scoret, rækkefølge matcher intuition
- Prompt-kalibrering: systemprompten justeret baseret på fejlanalyser
- Tech Lead bekræfter JSON-integration med det kommende CMS
- Chefredaktør validerer outputfelter (primær funktion, how_to_elevate, editorial_pillar)

**No-go** hvis:
- LLM-scoring er inkonsistent (> ±10 point ved genkørsel af samme artikel)
- Responstid overstiger acceptabelt niveau for produktionsbrug

---

## 17. Ejere og næste skridt

| Handling | Ejer | Fase |
|---|---|---|
| Redaktionel spot-test: 20–30 artikler | Chefredaktør + PM | Nu |
| Prompt-kalibrering via prompt-editor | PM + Chefredaktør | Nu |
| Kildetypekalibrering: presse vs. forskning | PM | Nu |
| Beslut feedback-loop-ansvar (Fase 2) | CEO + PM | Inden Fase 2 |
| CMS-integration: JSON-modtagelse og kortvisning | Tech Lead | Fase 2 |
| Thumbs up/down-tracking koblet til Y Score | Tech Lead | Fase 2 |
| Kvalitativ redaktørtest | PM | Post-CMS-launch |
