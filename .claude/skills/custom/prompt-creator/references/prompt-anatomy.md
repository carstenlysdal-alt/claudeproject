# Prompt Anatomy — Strukturguide og skabeloner

## Den universelle prompt-struktur

En stærk prompt har op til seks lag. Ikke alle er nødvendige — brug dem der er relevante.

```
[ROLLE]       Hvem er modellen i denne prompt?
[KONTEKST]    Hvorfor eksisterer opgaven? Hvad er baggrunden?
[INSTRUKTION] Hvad skal modellen præcist gøre?
[INPUT]       Det materiale modellen arbejder med
[EKSEMPLER]   Demonstration af ønsket output (few-shot)
[OUTPUT]      Eksakt format, længde og struktur på svaret
```

---

## Skabelon 1 — Enkelt bruger-prompt (Claude)

```xml
<context>
[Beskriv situationen og hvorfor opgaven er vigtig. 2-4 sætninger.]
</context>

<instructions>
Du er [rolle med specifik ekspertise].

Din opgave er at [præcis handling].

Krav:
- [Krav 1]
- [Krav 2]
- [Krav 3]

Undgå:
- [Uønsket adfærd 1]
- [Uønsket adfærd 2]
</instructions>

<document>
[Input-materiale der skal arbejdes med]
</document>

Svar i følgende format:
[Præcis beskrivelse af outputformat]
```

---

## Skabelon 2 — System prompt til agent/assistent (Claude)

```xml
Du er [navn/rolle] — [kort beskrivelse af identitet og formål].

<persona>
- Ekspertise: [domæne og niveau]
- Tone: [adjektiver der beskriver kommunikationsstil]
- Sprog: [dansk/engelsk/andet]
</persona>

<capabilities>
Du kan:
- [Kapabilitet 1]
- [Kapabilitet 2]
- [Kapabilitet 3]
</capabilities>

<constraints>
Du må ikke:
- [Begrænsning 1]
- [Begrænsning 2]
</constraints>

<output_standards>
- Format: [foretrukket output-format]
- Længde: [kort/medium/lang — eller eksakt antal ord/tegn]
- Struktur: [overskrifter/liste/prose/JSON]
</output_standards>
```

---

## Skabelon 3 — Few-shot prompt

```
Du er [rolle]. Din opgave er at [handling].

Her er eksempler på godt output:

EKSEMPEL 1:
Input: [input 1]
Output: [ønsket output 1]

EKSEMPEL 2:
Input: [input 2]
Output: [ønsket output 2]

EKSEMPEL 3:
Input: [input 3]
Output: [ønsket output 3]

Nu:
Input: [faktisk input]
Output:
```

**Regel:** Vælg eksempler der dækker variation i input, ikke bare den nemme case.
Negative eksempler (hvad der er forkert) er ofte mere effektive end positive alene.

---

## Skabelon 4 — Kædet prompt (multi-step workflow)

```
# Prompt A — Analyse

[Instruktion til trin 1]

Output: Returnér kun [specifik struktur], ikke forklaringer.
Format: JSON med felterne: { "felt1": ..., "felt2": ... }

---

# Prompt B — Transformation (bruger output fra A)

Du modtager følgende analyse:
<input>
[OUTPUT FRA PROMPT A INDSÆTTES HER]
</input>

Din opgave er nu at [handling baseret på analysen].
```

---

## Skabelon 5 — Meta-prompt (prompt der genererer prompts)

```xml
<instructions>
Du er en prompt-arkitekt med dyb forståelse af [målmodel].

Din opgave er at skrive en produktionsklar prompt baseret på følgende briefing.
</instructions>

<briefing>
Formål: [hvad prompten skal opnå]
Målmodel: [Claude / GPT-4o / Gemini / andet]
Målgruppe for output: [hvem læser det endelige output]
Tone: [formel / uformel / teknisk / journalistisk]
Format på output: [prose / JSON / liste / rapport]
Begrænsninger: [domæne, sprog, lengde, persona]
</briefing>

Skriv prompten direkte. Ingen forklaring, ingen indledning.
Start prompten med de vigtigste instruktioner.
```

---

## Prefill-teknik (Claude-specifik)

Prefill tvinger modellen til at starte outputtet på en bestemt måde.
Bruges til at låse format og undgå uønskede indledninger.

```
[Din prompt her]