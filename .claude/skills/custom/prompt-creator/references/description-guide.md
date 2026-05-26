# Description Guide — Skriv skill-descriptions der triggerer præcist

## Formål

En skill-description er det Claude læser for at afgøre om en skill er relevant
for brugerens query. En svag description giver fejlaktivering eller ingen aktivering.
En stærk description triggerer præcist på de rigtige queries.

---

## Anatomien i en stærk description

En god skill-description har tre dele:

```
[HVAD SKILLEN GØR] — ét klart udsagn om formål
[HVORNÅR DEN AKTIVERES] — de scenarier der kalder på skillen
[HVAD DEN PRODUCERER] — det konkrete output
```

---

## Eksempel: Svag vs. stærk description

**Svag:**
```
Hjælper med at skrive bedre prompts til AI-modeller.
```

**Stærk:**
```
Transforms vague ideas and raw instructions into sharp, well-structured prompts 
ready for use with Claude, GPT, Gemini, or local models. Activate when the user 
asks to write, improve, or structure a prompt — or when a prompt they've written 
isn't producing the desired output.
```

Forskellen: Den stærke version specificerer input (vague ideas), output (structured prompts),
målmodeller og de eksakte triggersituationer.

---

## Triggerord og fraser at inkludere

Inkludér de ord brugeren faktisk skriver — ikke kun fagtermer.

| Brugerens sprog | Fagterm |
|---|---|
| "skriv en prompt til..." | prompt engineering |
| "få Claude til at..." | instruction design |
| "min prompt virker ikke" | prompt debugging |
| "forbedre denne prompt" | prompt optimization |
| "lav en system prompt" | system prompt design |
| "få AI til at svare som..." | persona/role prompting |

---

## Regler for descriptions

**1. Skriv i tredje person eller imperativ — aldrig første person.**
Forkert: "Jeg hjælper med at skrive prompts."
Korrekt: "Transforms raw instructions into production-ready prompts."

**2. Vær specifik om hvad skillen IKKE gør.**
Hvis skillen kun dækker Claude, skriv det. Hvis den ikke debugger kode, skriv det.
Negative afgrænsninger reducerer fejlaktivering.

**3. Inkludér output-formatet.**
"Returns a complete, ready-to-use prompt" er bedre end "helps with prompts".
Brugeren skal vide hvad de får.

**4. Maksimum 3-4 sætninger.**
Lange descriptions bliver ikke læst fuldt ud. Kortere er stærkere.

**5. Inkludér eksplicitte aktiveringsfraser.**
"Activate when..." eller "Use when the user asks to..." hjælper Claude
til at matche description mod query.

---

## Skabelon

```
[Verb] [input] into [output] for use with [målmodel/kontekst].

Activate when the user:
- [Triggersituation 1]
- [Triggersituation 2]
- [Triggersituation 3]

Returns [konkret beskrivelse af output]. Does not [eksplicit afgrænsning].
```

---

## Eksempel udfyldt

```
Transforms vague ideas, raw instructions, or broken prompts into sharp,
production-ready prompts for Claude, GPT, Gemini, or local models.

Activate when the user:
- Asks to write a new prompt for any AI model
- Wants to improve or debug an existing prompt
- Needs a system prompt for an agent or assistant
- Asks why their prompt isn't working as expected

Returns a complete, structured prompt with role, context, instructions, 
and output format. Does not execute the prompt — only writes it.
```

---

## Test din description

Stil disse spørgsmål inden du færdiggør:

1. **Falsk positiv** — Er der queries der ikke er relevante, men som ville aktivere skillen? Afgræns.
2. **Falsk negativ** — Er der relevante queries der ikke ville aktivere skillen? Tilføj triggerord.
3. **Outputklarhed** — Kan brugeren se hvad de får, inden de aktiverer? Præcisér output.
4. **Overlaptest** — Overlapper denne description med en anden skill? Differentier eksplicit.
