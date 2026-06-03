# Brief til chefredaktør — tre redaktionelle beslutninger i ratingmodellen

**Til:** Michael Dyrby  
**Fra:** PM  
**Dato:** 3. juni 2026  
**Kræver:** Svar inden sprint-start

---

## Baggrund

Vi har bygget en ratingmotor — Story Intelligence Rating Engine — der analyserer eksternt indhold inden publicering og giver hvert input en score fra 0–100. Scoren bestemmer placeringen i redaktionernes feed.

Motoren er teknisk specificeret og klar til implementering. Men tre beslutninger i modellen er redaktionelle, ikke tekniske. Du skal tage dem — ingen andre kan.

---

## Beslutning 1 — Skal *Fremtiden er lys* have sin egen funktion?

**Baggrund:**
Ratingmotoren scorer inputs på 10 journalistiske funktioner: Challenge, Blind Spot, Perspective, Mythbuster, Signal, Threat, Opportunity, Inspiration, Guide og Curiosity.

Y har tre indholdspillars: *Understand*, *Challenge* og *Inspire*. Challenge-pillen er godt dækket af flere funktioner. Inspire-pillen — løsningsorienteret, optimistisk, fremadskuende journalistik — er kun delvist dækket af Inspiration og Guide.

Resultatet er at en stærk Threat- eller Challenge-historie konsekvent vil score højere end en stærkt løsningsorienteret historie, selvom begge er ligeværdige i Y's redaktionelle identitet.

**Forslag:**
Tilføj `Solution` som 11. funktion med spørgsmålet: *Tilbyder dette en konkret løsning, et håb eller et positivt fremtidsperspektiv?*

**Dine to valg:**
1. **Ja** — Solution tilføjes som selvstændig funktion. Inspire-historier får en eksplicit signal i modellen.
2. **Nej** — Inspiration og Guide er tilstrækkeligt. Redaktøren vurderer selv om en historie er Inspire-stof.

---

## Beslutning 2 — Hvor meget vejer *modfortællingen*?

**Baggrund:**
Y Score beregnes af syv vægtede dimensioner. I den nuværende model vægter Counter-Narrative Value 20 % — samme som Audience Relevance.

Y er counter-narrative. Men Y er også bredt: vigtige, faktabaserede nyheder der ikke udfordrer en dominerende fortælling hører også hjemme i feedet (*Understand*-pillen). Med 20 % til Counter-Narrative Value risikerer vi at systematisk underscorse vigtige historier der ikke har en klar modfortælling.

**Forslag:**
Sæt Counter-Narrative Value til 15 % og løft Impact til 20 %. Det giver plads til alle tre pillars i scoringsmodellen uden at svække Y's counter-narrative profil.

**Dine to valg:**
1. **Ja til ændringen** — Impact 20 %, Counter-Narrative Value 15 %. Balancerer Y's tre pillars.
2. **Bevar original vægtning** — Counter-Narrative Value 20 %, Impact 15 %. Understreger at Y primært er et counter-narrative medie.

**Ingen af valgene er forkerte** — de afspejler to forskellige redaktionelle prioriteter.

---

## Beslutning 3 — Skal redaktøren se hvilken pille en historie tilhører?

**Baggrund:**
I dag returnerer motoren en Y Score, en primær funktion (f.eks. Blind Spot) og mulige vinkler. Den siger ikke eksplicit om historien er *Understand*-, *Challenge*- eller *Inspire*-stof.

Det betyder at redaktøren selv skal koble funktionen til den rette pille og det rette format — og det kan variere fra redaktør til redaktør.

**Forslag:**
Tilføj `editorial_pillar` som felt i output:

```
"editorial_pillar": "challenge"
// understand | challenge | inspire
```

Feltets værdi afgøres automatisk af hvilke funktioner der dominerer:
- Challenge/Mythbuster/Blind Spot → *challenge*
- Inspiration/Guide/Solution → *inspire*
- Perspective/Signal/Threat/Opportunity → *understand*

Det giver redaktøren øjeblikkelig kontekst og gør det lettere at vælge format og tone uden at tænke over det.

**Dine to valg:**
1. **Ja** — `editorial_pillar` tilføjes. Redaktøren ser straks hvilken pille historien tilhører.
2. **Nej** — Redaktøren vurderer pille og format selv ud fra primær funktion. Mere fleksibelt, mere subjektivt.

---

## Opsummering — hvad vi beder om

| Beslutning | Dit valg |
|---|---|
| Tilføj Solution som 11. funktion? | Ja / Nej |
| Counter-Narrative Value 15 % og Impact 20 %? | Ja / Nej |
| Tilføj editorial_pillar i output? | Ja / Nej |

Vi kan implementere uanset hvilke valg du træffer. Men vi kan ikke begynde sprint-start uden svar på alle tre.
