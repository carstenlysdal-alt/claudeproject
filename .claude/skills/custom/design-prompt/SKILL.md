# design-prompt

Producerer koncise kontekstpakker og designprompts klar til direkte brug
i Gamma, Beautiful.ai, Midjourney, DALL-E, Mermaid, Canva AI og andre
AI-design-platforme.

## Hvornår aktiveres denne skill

Når brugeren skal bruge et visuelt output der produceres i et eksternt
AI-designværktøj. Aktiveres med: `/design-prompt` eller "lav en designprompt til X"

## Spørg om platform og formål

Stil disse to spørgsmål inden du producerer prompten:
1. Hvilken platform skal prompten bruges til? (Gamma, Midjourney, Mermaid, Canva AI, DALL-E, Beautiful.ai, andet)
2. Hvad skal designet vise eller kommunikere?

Hvis konteksten er tydelig fra samtalen, spring spørgsmålene over og producér direkte.

## Format per platform

### Gamma / Beautiful.ai (præsentationer)
Strukturprompt med: emne, antal slides, tone (professionel / minimalistisk / data-drevet),
farvepalette (primær + sekundær), centrale budskaber per slide.
Format: nummererede slides med overskrift + bullet-indhold + visuelt forslag.

### Midjourney / DALL-E (billeder)
Enkelt afsnit uden linjeskift. Inkludér:
subjekt, stil (fotorealistisk / illustration / diagram), farver, komposition, lys, format.
Undgå adjektiver der ikke er visuelt konkrete.

### Mermaid (diagrammer)
Producér klar Mermaid-syntaks klar til indsæt. Angiv diagramtype:
flowchart, sequenceDiagram, gantt, pie, quadrantChart, xychart.

### Canva AI
Beskriv layout, brand-farver, skrifttype-stil og indholdsblokke.
Specificér format: Instagram, LinkedIn, præsentation, rapport-forside.

## Output

Én kontekstpakke per platform. Ingen forklaring af hvad prompten gør.
Kun den færdige prompt — klar til kopiering og brug.
