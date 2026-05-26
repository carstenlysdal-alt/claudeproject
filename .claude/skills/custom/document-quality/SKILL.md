# document-quality

Løfter PM-dokumenter til C-suite-niveau med pletfrit dansk.

## Hvornår aktiveres denne skill

Når brugeren beder om at kvalitetstjekke, forbedre eller løfte et dokument.
Aktiveres med: `/document-quality` eller "kør document-quality på dette"

## Fem trin — udføres altid i denne rækkefølge

### Trin 1 — Diagnostik
Identificér dokumentets type (PRD, roadmap, strategibrief, outcome-analyse, præsentation).
List de tre til fem mest kritiske problemer: sprogfejl, strukturfejl, indholdsgab, tone-afvigelser.

### Trin 2 — Sprogrensning
Ret alle grammatik-, kommaterings- og kongruensfejl.
Erstat passiv stemme med aktiv: "det besluttes" → "vi beslutter".
Fjern unødige anglicismer: "ensure" → "sikre", "aligned" → "enige".
Erstat vage størrelser: "snart" → konkret dato, "mange" → konkret tal.

### Trin 3 — Indholdsmæssig revision
Verificér at konklusionen er placeret først — ikke sidst.
Tilføj manglende ansvarlige og deadlines på alle beslutninger.
Fjern generiske råd og erstat med handlingsklare formuleringer.
Kontrollér at alle tal har enheder.

### Trin 4 — Strukturel revision
Tilpas struktur til dokumenttypen fra CLAUDE.md:
- PRD: problemformulering → scope → metrics → krav → risici → ejere
- Roadmap: kontekst → RICE → tidshorisont → risici
- Strategibrief: situation → complication → anbefaling → næste skridt
- Præsentation: konklusion → evidens → anbefaling → hvad vi beder om
Skær 20-30% af teksten uden at miste præcision.

### Trin 5 — Final quality check
Verificér tone: autorativ, direkte, aldrig akademisk, aldrig entusiastisk.
Bekræft at dokumentet starter med konklusion og ikke med introduktion.
Bekræft at dokumentet slutter med næste skridt — ikke med opsummering.

## Output

Producér altid et komplet revideret dokument — aldrig en liste af forslag.
Ingen kommentarer i marginen. Ingen forklaringer af hvad der er ændret.
Kun det færdige, reviderede dokument.
