# feedback-analyse

Syntese af råt bruger-feedback til handlingsklar PM-indsigt: smertepunkter, JTBD-mønstre, kundesprog og prioriterede produktanbefalinger.

## Hvornår aktiveres denne skill

Når vi har indsamlet bruger-feedback og skal omsætte den til PM-beslutninger.
Input kan være: brugerinterviews, surveys, support-tickets, NPS-kommentarer, app-anmeldelser, salgssamtaler, churn-interviews.
Aktiveres med: `/feedback-analyse`, "analyser denne feedback", "hvad siger brugerne", "syntesér interviews", "hvad klager de over", "lav en feedback-syntese".
Ikke til kvantitatif analyse af metrics — brug `analytics` til det.

## Fem trin — udføres altid i denne rækkefølge

### Trin 1 — Top smertepunkter (frekvens × intensitet)
Identificér de problemer brugerne nævner. For hvert smertepunkt:
- Frekvens: hvor mange nævner det (antal / % af sample)
- Intensitet: hvor stærkt udtrykkes det (frustreret, blokeret, forlader produktet)
- Kontekst: hvornår opstår det (onboarding, daglig brug, specifik feature)

Rangér efter frekvens × intensitet — ikke efter hvad der lyder mest interessant.

### Trin 2 — JTBD-mapping
For hvert top-smertepunkt: hvad forsøger brugeren at opnå?
Format: "Når [situation], vil jeg [motivation], så jeg kan [forventet outcome]."

Skeln mellem:
- Funktionelle jobs (hvad vil de udføre?)
- Emotionelle jobs (hvad vil de føle?)
- Sociale jobs (hvad vil de signalere til andre?)

Undgå at projicere løsninger. Beskriv jobbet, ikke implementeringen.

### Trin 3 — Mønstre i kundesprog
Dokumentér de eksakte fraser og ord brugerne bruger om problemet.
Disse er guld for:
- Produktnavn og kategori-framing
- Onboarding-copy og feature-beskrivelser
- Salgs- og marketing-materiale

Format:
> "De bruger aldrig ordet [vores term] — de siger [deres term]"
> "Det ord der går igen: [...]"
> "Den metafor de bruger: [...]"

### Trin 4 — Årsagshypoteser
Hvorfor eksisterer disse smertepunkter? For hvert top-3 smertepunkt:
- Er det et produkt-problem, et UX-problem, et kommunikationsproblem eller et forventningsproblem?
- Hvad tyder feedbacken på som rod-årsag?
- Hvad ville vi skulle teste for at bekræfte hypotesen?

### Trin 5 — Prioriterede produktanbefalinger
Maksimalt 5 anbefalinger — rangerede. For hver anbefaling:
- Hvad vi anbefaler (konkret, ikke generisk)
- Hvilket smertepunkt det adresserer
- Estimeret impact (høj / medium / lav) og hvorfor
- Næste skridt med ejer og tidshorisont

## Output-format

```
## Feedback-analyse: [produkt / feature / segment]
**Sample:** [antal respondenter, metode, periode]
**Udført af:** [navn]

### Top smertepunkter
| # | Smertepunkt | Frekvens | Intensitet |
|---|---|---|---|
| 1 | [...] | X/Y (Z%) | Høj: blokerer use case |
| 2 | [...] | X/Y (Z%) | Medium: frustration |

### JTBD-mapping
**Job 1:** "Når [...], vil jeg [...], så jeg kan [...]."
**Job 2:** "Når [...], vil jeg [...], så jeg kan [...]."

### Kundesprog
- De siger "[...]" — ikke "[vores term]"
- Genkommende metafor: "[...]"
- Stærkeste negative udsagn: "[direkte citat]"

### Årsagshypoteser
1. [hypotese] — rod-årsag: [...] — test: [...]
2. [hypotese] — rod-årsag: [...] — test: [...]

### Produktanbefalinger
1. [anbefaling] — adresserer: [...] — impact: høj — ejer: [...] — frist: [...]
2. [anbefaling] — adresserer: [...] — impact: medium — ejer: [...] — frist: [...]
```

Producér altid et komplet dokument klar til præsentation.
Ingen indledende forklaringer. Ingen afsluttende meta-kommentarer.
Direkte citater fra brugerne er obligatoriske i Kundesprog-sektionen.

## Eksempel — godt vs. dårligt

**Dårligt (fortolker i stedet for at observere):**
> "Brugerne ønsker en bedre oplevelse og vil have funktionen til at virke hurtigere."

**Rigtigt (JTBD + kundesprog + citat):**
> "Smertepunkt #1: Kan ikke finde tilbage til øvelser de har lavet (11/14, høj intensitet — 3 nævnte det som årsag til at de stoppede med at bruge appen). JTBD: 'Når jeg vil øve videre på noget jeg lærte for to uger siden, vil jeg finde det hurtigt, så jeg ikke spilder tid på at søge.' Kundesprog: De siger aldrig 'historik' — de siger 'mine ting' eller 'det jeg har lavet'. Direkte citat: 'Jeg gider ikke rode rundt i det hele — jeg vil bare finde det igen.' Anbefaling: Tilføj 'Nyligt besøgt'-sektion på dashboard. Impact: høj. Ejer: [navn]. Frist: [dato]."

## Navngivne faldgruber

**Faldgrube 1 — Løsningsskred i JTBD-fasen**
Det er fristende at skrive: "Brugeren vil have en søgefunktion." Det er en løsning, ikke et job. Skriv jobbet: "Brugeren vil hurtigt genfinde noget de tidligere har engageret sig med." Løsningen er åben — det er jobbet der er stabilt.

**Faldgrube 2 — Sample-bias usynliggjort**
Feedback fra de mest aktive brugere repræsenterer ikke dem der churner. Feedback fra support-tickets repræsenterer ikke dem der forlader stiltiende. Angiv altid hvem der IKKE er i dit sample, og hvad det betyder for konklusionerne.
