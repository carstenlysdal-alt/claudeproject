# Story Intelligence Rating Engine
### Et pitch til kollegamødet — 4. juni 2026

---

## Problemet ingen taler om

Hvert eneste minut lander der nyt indhold i feedet. Pressemeddelelser fra interesseorganisationer. Rapporter fra tænketanke. Nyheder fra internationale medier. Analyser fra databaser. Opslag fra sociale medier. Artikler fra branchemedier. En uendelig strøm af råt materiale — og ingen systematisk måde at vide, hvad der er guld, og hvad der er støj.

I dag sorterer redaktøren enten manuelt eller efter kronologi. Den seneste historie flyder øverst. Det er ikke redaktionel prioritering. Det er tilfældighed.

Problemet er ikke mængden af indhold. Problemet er fraværet af et system der kan stille det afgørende spørgsmål om hvert eneste input: *Kan dette blive til en stærk Y-historie?*

Det er præcis det spørgsmål vi nu bygger et svar på.

---

## Hvad vi bygger

Story Intelligence Rating Engine — SIRE — er en LLM-drevet ratingmotor der analyserer eksternt indhold, inden det når redaktøren. Den vurderer ikke om kilden har skrevet en god artikel. Den vurderer det journalistiske, samfundsmæssige og forretningsmæssige potentiale i råmaterialet.

Hver kilde, der lander i feedet, sendes automatisk igennem tre lag af analyse:

**Første lag** identificerer, hvad inputtet handler om. En kilde kan tilhøre flere emner på én gang — AI og økonomi og regulering — og systemet klassificerer det på tværs af 25 primære topics fra geopolitik til iværksætteri.

**Andet lag** er det centrale: systemet spørger ikke bare hvad, men hvorfor. Det scorer inputtet på 11 journalistiske funktioner, der tilsammen udgør Y's redaktionelle DNA. Hver funktion scores fra 0 til 100.

**Tredje lag** beregner en samlet Y Score fra 0 til 100 baseret på syv vægtede dimensioner og returnerer et struktureret output til CMS'et med score, prioritet, mulige vinkler og redaktøranbefalinger.

Alt dette sker automatisk, inden redaktøren åbner feedet.

---

## De 11 journalistiske funktioner

Systemets hjerte er de 11 journalistiske funktioner. De er ikke vilkårlige — de er designet direkte ud af Y's redaktionelle identitet og dækker de tre indholdspillars: *Understand*, *Challenge* og *Inspire*.

**Challenge** scorer historier der udfordrer dogmer, konsensus og fastlåste fortolkningsrammer. Det er historien der vender debatten om, der bringer ny dokumentation mod gammel antagelse, der stiller spørgsmålet ingen andre stiller.

**Blind Spot** er måske Y's vigtigste funktion. Den leder aktivt efter det, der mangler i den eksisterende dækning: den fraværende modkilde, den tavse konsekvens, den pris ingen taler om, de andenordenseffekter der aldrig diskuteres.

**Perspective** løfter en hændelse ud af det øjeblikkelige og ind i en større sammenhæng. Historisk kontekst. Strukturelle mønstre. Bagvedliggende årsager. Det er forklaringsjournalistikken.

**Mythbuster** er historien der viser, at noget mange tror er forkert. Data mod fordom. Forskning mod mavefornemmelse.

**Signal** er tidlige tegn på en større udvikling. Ikke breaking news — men det mønster der peger frem, den tendens der er ved at blive noget.

**Threat** scorer risici, kriser og sårbarhed. Det der kan skade læseren, virksomheden, markedet eller samfundet.

**Opportunity** er spejlbilledet: hvilken mulighed kan læseren udnytte? Vækst, effektivisering, strategisk fordel.

**Inspiration** er dokumenteret læring og konkrete erfaringer der kan kopieres. Evidensbaseret, ikke fluffy.

**Guide** er indhold der kan omsættes til råd, tjeklister eller handlingsanvisninger — hvad skal læseren gøre efter at have læst historien?

**Curiosity** scorer det fascinerende, det overraskende, det der vækker undren.

**Solution** er den 11. og nyeste funktion — og den eksisterer af én årsag: Y er et optimistisk medie. *Fremtiden er lys* er ikke bare et slogan; det er Y's tredje indholdspille. Solution scorer historier der tilbyder en konkret vej frem, et håb eller et positivt fremtidsperspektiv. Uden den funktion vil Challenge- og Threat-historier systematisk flyde øverst i feedet, og Y's løsningsorienterede identitet vil forsvinde i algoritmen.

Et input kan score højt på flere funktioner samtidigt. Den funktion med højest score bliver primær funktion og vises tydeligt på kortet. Op til tre sekundære funktioner med score over 50 vises dæmpet.

---

## Y Score — hvad der vejer tungest

Y Score er ikke et gennemsnit. Det er en vægtet sum af syv dimensioner der tilsammen afspejler, hvad Y er som medie.

**Audience Relevance** vejer 20 %. Er dette relevant for Y's læser — SMV-ejeren, erhvervslederen, den borgerlige dansker der søger modperspektiver? Ingen relevans, ingen Y-historie.

**Impact** vejer 20 %. Påvirker historien mange mennesker? Virksomheder? Økonomi? Regulering? En vigtig, faktabaseret nyhed der ikke er counter-narrative fortjener stadig at flyde op i feedet — og det er Impact der sikrer det.

**Counter-Narrative Value** vejer 15 %. Udfordrer inputtet en dominerende fortælling? Bringer det modpolen? Afdækker det ideologisk slagside eller skjulte magtstrukturer? Dette er Y's særkende — men det er sat til 15 % og ikke 20 % af en bevidst årsag: Y er counter-narrative, men Y er ikke *udelukkende* counter-narrative. Vigtige Understand-historier må ikke systematisk underscores.

**Perspective Value** vejer 15 %. Tilføjer inputtet dybere forståelse? Stærk kontekst? Analysepotentiale?

**Decision Value** vejer 15 %. Hjælper dette læseren med at træffe bedre beslutninger? Kan det påvirke strategi, investering eller drift? For Y Business er dette centralt.

**Trust / Source Strength** vejer 10 %. Myndighedskilder, publicerede forskningsartikler og officielle statistikker scorer højt. Pressemeddelelser fra interesseorganisationer scorer lavt — ikke fordi historien er ubrugelig, men fordi den kræver verificering. Lav trust er en advarsel, ikke en kassering.

**Production Potential** vejer 5 %. Kan inputtet let omsættes til en stærk Y-historie? Er vinklen tydelig? Er tallene stærke? Har den en klar konflikt?

Formlen er:

> Y Score = AR×0,20 + I×0,20 + CNV×0,15 + PV×0,15 + DV×0,15 + T×0,10 + PP×0,05

Resultatet er et tal mellem 0 og 100. Det er ikke magisk. Det er redaktionel logik, gjort eksplicit.

---

## Fra score til prioritet

Y Score oversættes til fem prioritetsniveauer der vises direkte i feedet som en farvet talblok på hvert kort:

En score på **85–100** er kritisk — rød blok, behandles hurtigt. Her er den stærke modfortælling, den høje målgrupperelevans, den klare beslutningsværdi.

**70–84** er høj prioritet — orange blok. Stærk vinkel, god relevans, kræver måske verificering eller en modkilde.

**55–69** er Watch — gul blok. Tidligt signal, interessant men ikke stærkt nok alene, brugbart i en større analyse.

**40–54** er lav prioritet — grå blok. Begrænset værdi, men kan bruges som baggrundsmateriale.

**0–39** er Ignore — lysegrå blok. Ikke relevant nok — men stadig synligt i feedet, så intet kasseres automatisk og uden menneskelig vurdering.

Indhold der endnu ikke er processet af ratingmotoren, vises slet ikke. Feedet sorteres som standard på Y Score faldende. Den bedste historie flyder øverst — ikke den nyeste.

---

## Hvad redaktøren ser

Tallene alene er ikke nok. Redaktøren skal vide *hvorfor* en historie scorer, hvad den kan bruges til, og hvad der mangler.

Hvert kort i CMS'et viser derfor — ud over den farvede scoreblok — den primære journalistiske funktion, op til tre sekundære funktioner, en enkelt sætning om hvorfor historien er relevant for Y, og en advarsel hvis kilden har partsinteresse eller mangler dokumentation.

Kortet viser også mulige vinkler til Y-historier og hvilke kilder der mangler, inden historien kan publiceres.

Derudover klassificeres hvert input i en af Y's tre indholdspillars — *understand*, *challenge* eller *inspire* — så redaktøren øjeblikkeligt ved, hvilken tone og hvilket format historien kalder på.

Et eksempel på hvad et veldigt kort ser ud:

```
[ 84 · ORANGE ]  Blind Spot · Challenge · Perspective

Historien afdækker en overset økonomisk konsekvens i en 
ellers ensidig dækning af ny EU-regulering.

⚠️ Medium source risk — partsinteresse, kræver modkilde.

Mulige vinkler:
1. Hvem betaler prisen for den nye regulering?
2. Den skjulte regning for grøn omstilling
3. Fem ting SMV'er bør forberede sig på nu

Manglende kilder: uafhængig ekspert · myndighed · konkret SMV-case
Anbefalet format: analyse + guide
Redaktionel pille: challenge
```

---

## Det systemet ikke må gøre

Et ratingsystem er ikke neutralt. Det kan reproducere bias, forveksle provokation med kvalitet og lade clickbait passere som journalistik. Derfor er der en eksplicit liste over hvad systemet ikke må:

Det må ikke forveksle Y's borgerlige profil med partipolitisk bias. Det må ikke belønne ren provokation uden dokumentation. Det må ikke forveksle konflikt med kvalitet. Det må ikke lade pressemeddelelser passere uden kildekritisk markering. Det må ikke tvinge alle historier ind i én kategori. Og — vigtigst — det må ikke nedprioritere historier der udfordrer Y's egne antagelser.

Y's troværdighed hviler på evnen til at udfordre mainstream-fortællinger og bevare retten til at udfordre sine egne læseres forventninger. Det skal algoritmen afspejle.

---

## Hvad vi bygger først

MVP'en indeholder: topic classification, scoring på alle 11 funktioner, Y Score med alle syv dimensioner, source risk og editorial warning, mulige vinkler, anbefalet format, editorial pillar og placering i feedet med farvet scoreblok.

MVP'en indeholder ikke: feedback-loop koblet til klikrate og læsetid, prediktiv model baseret på historisk performance, brugeradfærdsdata. Mediet er ikke online endnu. Det kommer i Fase 2, når der er noget at lære af.

Teknisk bygges MVP'en som en kombination af LLM-klassifikation, faste scoring prompts, keyword-matching på engelske og danske signalord og regelbaserede justeringer. Intern klassifikation sker på engelsk for stabilitet og international skalerbarhed. Output vises på dansk i CMS'et.

---

## Tre beslutninger vi ikke kan tage for jer

Ratingmotoren er teknisk specificeret. Men tre beslutninger er redaktionelle og tilhører chefredaktøren:

Skal Solution-funktionen med? Skal Counter-Narrative Value veje 15 % eller 20 %? Skal `editorial_pillar` — understand, challenge, inspire — vises på hvert kort?

Ingen af disse er tekniske spørgsmål. De er svar på, hvad slags medie Y vil være. Og det svar er ikke vores at give.

---

## Den korte version

Story Intelligence Rating Engine finder ikke bare nyheder. Den finder signaler, modpoler, blinde vinkler og beslutningsrelevant viden — og viser redaktøren, hvad der er guld, og hvad der kan vente til i morgen.

Hvert input vurderes på hvad det handler om, hvilken journalistisk funktion det har, hvor meget det udfordrer etablerede fortællinger, hvor relevant det er for Y's læser, hvor stærkt kildegrundlaget er, og hvilke vinkler det kan blive til.

Målet er at identificere de input, der kan blive til den journalistik, Y eksisterer for at lave: faktabaseret, nuanceret, løsningsorienteret og udfordrende.

Det er ikke en nyhedsalgoritme. Det er et redaktionelt instrument.
