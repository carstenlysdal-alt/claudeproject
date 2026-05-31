# outcome-analyse

Struktureret PM-refleksion over et afsluttet initiativ: hvad forventede vi, hvad skete der, og hvad gør vi nu.

## Hvornår aktiveres denne skill

Når et initiativ, en feature, en kampagne eller en fase er afsluttet — og vi skal evaluere hvad der skete.
Aktiveres med: `/outcome-analyse`, "lav en outcome-analyse", "hvad lærte vi af", "evaluer resultatet af", "iterér/pivotér/stop-beslutning".
Ikke til fremadrettede roadmap-beslutninger — brug `prioritization-advisor` til det.

## Fem trin — udføres altid i denne rækkefølge

### Trin 1 — Forventet outcome
Dokumentér hvad vi forventede da initiativet blev sat i gang:
- Hvilken adfærdsændring hos brugerne?
- Hvilken forretningseffekt (ARR, aktivering, retention, NPS)?
- Hvilken tidshorisont?
- Hvad var success-kriteriet?

Hvis forventningerne ikke er dokumenterede: rekonstruér dem fra beslutningsdokumenter, OKR'er eller stakeholder-kommunikation. Vær eksplicit om hvad der er rekonstrueret vs. hvad der var skrevet ned.

### Trin 2 — Faktisk outcome
Dokumentér hvad der faktisk skete i den samme periode:
- Målte adfærdsændringer (med konkrete tal og enheder)
- Faktisk forretningseffekt
- Uventede effekter — positive eller negative

Brug kun tal der er observerede. Marker eksplicit hvad der er estimeret.

### Trin 3 — Gap-analyse
Kvantificér og karakterisér gabet:
- Størrelsen: "Nåede 40% af forventet mål" / "Overskred målet med 2×"
- Retningen: underperformance, overperformance, forkert metric, ingen effekt
- Tidspunktet: skete gabet fra dag 1 eller opstod det undervejs?

### Trin 4 — Årsagshypoteser
Generér 3-5 hypoteser om hvorfor gabet opstod. For hver hypotese:
- Årsag (hvad vi tror skete)
- Evidens der understøtter den (data, observationer, brugerfeedback)
- Evidens der taler imod den
- Verifikationsmulighed (kan vi teste den?)

Undgå singleårsags-forklaringer. Skeln skarpt mellem "vi ved" og "vi antager".

### Trin 5 — Anbefaling
Ét af tre udfald — vælg det mest underbyggede:

**Iterér** — fundamentet er rigtigt, eksekveringen mangler. Specificér præcist hvad der ændres, hvornår og hvem der ejer det.

**Pivotér** — problemet er reelt, løsningen er forkert. Beskriv hvad vi nu ved om problemrummet og hvilke nye løsningshypoteser der er mest lovende.

**Stop** — problemet er ikke stort nok, eller vi har ikke fordelen til at løse det. Beskriv hvad ressourcerne bruges på i stedet.

## Output-format

```
## Outcome-analyse: [initiativnavn]
**Periode:** [start] → [slut]
**Ejer:** [navn]

### Forventet outcome
[konkret beskrivelse med tal og tidshorisont]

### Faktisk outcome
[konkret beskrivelse med tal]

### Gap
[størrelse og karakter]

### Årsagshypoteser
1. [hypotese] — evidens: [...] — mod: [...]
2. [hypotese] — evidens: [...] — mod: [...]
3. [hypotese] — evidens: [...] — mod: [...]

### Anbefaling: Iterér / Pivotér / Stop
[præcis formulering med ansvarlig og deadline]
```

Producér altid et komplet dokument klar til præsentation for CEO og Tech Lead.
Ingen indledende forklaringer. Ingen afsluttende meta-kommentarer.
