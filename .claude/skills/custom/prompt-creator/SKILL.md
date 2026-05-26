# prompt-creator

Forvandl løse idéer og rå instruktioner til skarpe, velstrukturerede prompts klar til brug.

## Hvornår aktiveres denne skill

Aktiveres med `/prompt-creator` eller når brugeren beder om hjælp til at skrive, forbedre
eller strukturere en prompt til Claude, GPT, Gemini eller andre AI-modeller.

---

## Kerneprincipper (gælder alle modeller)

- **Vær klar og direkte** — Instruer eksplicit. Hint ikke, instruer. Skriv hvad modellen skal gøre, ikke hvad du håber den gør.
- **Giv kontekst** — Forklar hvorfor opgaven er vigtig, ikke kun hvad der skal gøres. Kontekst former bedre svar.
- **Brug eksempler (multishot)** — 3-5 velvalgte eksempler styrer format, tone og ræsonnering mere effektivt end instruktioner alene.
- **Strukturér med markup** — XML-tags til Claude (`<instructions>`, `<context>`, `<examples>`, `<document>`), Markdown+XML til OpenAI, ren Markdown til generiske modeller.
- **Angiv outputformat eksplicit** — Fortæl modellen nøjagtigt hvilken form svaret skal have: JSON, liste, rapport, tabel, prose osv.
- **Én opgave per prompt** — Komplekse flows brydes ned i kædede prompts fremfor én mega-prompt.

Se `references/prompt-anatomy.md` for den fulde strukturguide med eksempler og skabeloner.

---

## Workflow

### Trin 1 — Forstå opgaven

Stil mindst disse spørgsmål (eller aflæs svaret fra samtalen):

1. Hvad skal prompten få AI'en til at gøre?
2. Hvilken model er målet (Claude, GPT, Gemini, lokal)?
3. Hvad er outputtet — format, længde, tone?
4. Er der eksempler på godt/dårligt output?
5. Er der begrænsninger (sprog, stil, domæne, persona)?

### Trin 2 — Vælg prompttype

| Type | Brug når |
|---|---|
| System prompt | Du sætter en agents/assistents grundadfærd |
| Enkelt bruger-prompt | Én afgrænset opgave |
| Kædet prompt | Flertrins-workflow (output fra A → input til B) |
| Few-shot prompt | Output-format og stil skal demonstreres via eksempler |
| Meta-prompt | Prompten skal selv generere prompts |

### Trin 3 — Skriv udkastet

Brug skabelonen fra `references/prompt-anatomy.md` som udgangspunkt.
Tilpas til målmodel (se modelspecifikke noter nedenfor).

### Trin 4 — Test og iterer

Kør prompten og vurdér:

- Følger outputtet instruktionerne nøjagtigt?
- Er tonen rigtig?
- Er formatet korrekt?
- Er der edge cases der fejler?

Justér og gentag. Dokumentér hvad der ændrede sig og hvorfor.

### Trin 5 — Optimér triggering (hvis det er en skill-prompt)

Brug `references/description-guide.md` til at skrive en stærk skill-description
der triggerer på de rigtige queries.

---

## Modelspecifikke noter

### Claude

- Foretræk XML-tags som semantiske grænser: `<context>`, `<instructions>`, `<examples>`, `<document>`
- Brug developer-rollen (system prompt) til høj-prioritets instruktioner
- Prefill assistant-svaret for at styre outputformat: start med `{` for JSON, `<analysis>` for struktureret output
- Til kompleks ræsonnering: inkludér `<thinking>`-blokke i few-shot eksempler
- Claude er direkte responsiv på eksplicit rollegivning: "Du er en erfaren X med Y års erfaring i Z"

### OpenAI (GPT-4o, o3 m.fl.)

- Kombiner Markdown-overskrifter med XML-tags
- `system`-rollen sætter adfærd; `user`-rollen giver opgaven
- Chain-of-thought fungerer godt med "Tænk trin for trin" eller "Let's think step by step"
- Temperature 0 for determinisme, 0.7+ for kreativitet

### Gemini

- Stærk på multimodal input — beskriv billeder/dokumenter direkte i prompten
- Foretræk klare sektionsoverskrifter i Markdown
- Brug "Think step by step" eksplicit for reasoning-opgaver

---

## Hurtigreference: Teknikker

| Teknik | Hvornår | Eksempel |
|---|---|---|
| Zero-shot | Simpel, klar opgave | "Oversæt til dansk:" |
| Few-shot (3-5 eks.) | Nyt format eller stil skal demonstreres | Se `references/prompt-anatomy.md` |
| Chain-of-thought | Kompleks ræsonnering, matematik, analyse | "Tænk trin for trin, før du svarer" |
| Prefill | Styr outputformat stramt | Assistentsvar starter med `{` |
| Role prompting | Ekspertise og tone | "Du er en erfaren redaktør..." |
| Negative constraints | Undgå uønsket adfærd | "Svar ALDRIG med..." |
| XML-struktur | Claude; multi-sektion prompts | `<context>...</context>` |
| Persona + constraints | Agents og chatbots | System prompt sætter identitet + grænser |

---

## Fejlfinding

- **Modellen ignorerer instruktioner** → Flyt instruktionen til starten. Brug imperativ form. Tilføj "Det er vigtigt at...".
- **Outputformat er forkert** → Vær mere eksplicit. Giv et eksempel på det ønskede format. Brug prefill.
- **Tonen er forkert** → Tilføj stil-eksempler (few-shot). Beskriv tonen med adjektiver + eksempler.
- **For langt/kort output** → Angiv eksakt længde: "Svar i max 3 sætninger" / "Skriv min. 500 ord".
- **Hallucinationer** → Tilføj "Svar kun baseret på den givne tekst. Hvis svaret ikke fremgår, skriv 'Ikke angivet'."
- **Inkonsistent output** → Sæt temperature lavere. Brug few-shot eksempler. Vær mere specifik i instruktionen.

---

## Reference-filer

- `references/prompt-anatomy.md` — Fulde skabeloner og strukturguide med eksempler
- `references/description-guide.md` — Skriv skill-descriptions der triggerer præcist
