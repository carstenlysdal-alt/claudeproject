# Story Intelligence Rating Engine
### Pitch — 4. juni 2026

---

## Problemet ingen taler om

Hvert eneste minut lander der nyt indhold i feedet. Pressemeddelelser fra interesseorganisationer. Rapporter fra tænketanke. Nyheder fra internationale medier. Analyser fra databaser. Artikler fra branchemedier. En uendelig strøm af råt materiale — og ingen systematisk måde at afgøre, hvad der er guld, og hvad der er støj.

I dag sorterer redaktøren enten manuelt eller efter kronologi. Den seneste historie flyder øverst. Det er ikke redaktionel prioritering. Det er tilfældighed.

Problemet er ikke mængden af indhold. Problemet er fraværet af et system der kan stille det afgørende spørgsmål om hvert eneste input: *Kan dette blive til en stærk Y-historie?*

Det er præcis det spørgsmål vi nu bygger et svar på.

---

## Hvad vi bygger

Story Intelligence Rating Engine — SIRE — er en LLM-drevet ratingmotor der analyserer eksternt indhold, inden det når redaktøren. Den vurderer ikke om kilden har skrevet en god artikel. Den vurderer det journalistiske, samfundsmæssige og forretningsmæssige potentiale i råmaterialet.

Hvert input der lander i feedet sendes automatisk igennem tre lag:

**Første lag** identificerer hvad inputtet handler om. En kilde kan tilhøre flere emner på én gang — AI og økonomi og regulering — og systemet klassificerer det på tværs af 25 primære emneområder, fra geopolitik til iværksætteri.

**Andet lag** er systemets hjerte: det spørger ikke bare *hvad*, men *hvorfor*. Det scorer inputtet på 11 journalistiske funktioner — præcise kategorier der tilsammen udgør Y's redaktionelle DNA. Hver funktion scores fra 0 til 100, og et input kan score højt på flere funktioner samtidigt.

**Tredje lag** beregner en samlet Y Score baseret på syv vægtede dimensioner og returnerer et struktureret output til CMS'et: score, prioritet, mulige vinkler, kildekritisk advarsel og redaktøranbefalinger.

Alt dette sker automatisk, inden redaktøren åbner feedet.

---

## De 11 journalistiske funktioner

Funktionerne er ikke vilkårlige. De er designet direkte ud af Y's redaktionelle identitet og dækker de tre indholdspillars: *Understand* — det vigtige og aktuelle. *Challenge* — det der vender debatten om. *Inspire* — det der peger fremad.

Her er alle 11, forklaret med de signalord og mønstre systemet konkret leder efter.

---

### 1. Challenge — *Udfordrer dette et dogme?*

**Pille: Challenge**

Challenge er en af Y's vigtigste kategorier. Den scorer historier der sætter spørgsmålstegn ved det, de fleste tager for givet — dogmer, konsensus, institutionelle sandheder og fastlåste fortolkningsrammer.

Systemet leder efter mønstre som dogmebrud, modstridende forskning, eksperter der er uenige, ny dokumentation der går mod gammel antagelse og formuleringer der signalerer "alle tror X, men data viser Y."

Et input om ny forskning der viser, at hjemmearbejde ikke nødvendigvis sænker produktiviteten, scorer højt her — det udfordrer en udbredt ledelsesantagelse direkte.

*Systemet reagerer på ord og fraser som:*
`challenging conventional wisdom` · `counterintuitive` · `rethinking` · `orthodoxy challenged` · `consensus questioned` · `established narrative challenged` · `unexpected findings` · `new evidence suggests` · `what everyone got wrong` · `policy failure` · `expert consensus questioned` · `overturns` — og på dansk: `udfordrer konsensus` · `stiller spørgsmål ved` · `punkterer myte` · `ny dokumentation viser` · `eksperter er uenige` · `opgør med` · `fastlåst fortælling`

---

### 2. Blind Spot — *Hvad mangler i fortællingen?*

**Pille: Challenge**

Blind Spot er måske Y's vigtigste funktion og bør være et redaktionelt særkende. Den leder ikke efter historier der er forkerte — den leder efter det der mangler i historier der allerede cirkulerer.

Den fraværende modkilde. Den tavse konsekvens. Den pris ingen taler om. De andenordenseffekter der aldrig diskuteres. Hvem vinder, når alle andre taber? Hvem betaler prisen, når ingen ser på?

Et klassisk eksempel: Mange medier skriver, at ny grøn regulering vil accelerere den grønne omstilling. Blind Spot-funktionen spørger: hvad mangler i den fortælling? Konsekvenserne for SMV'er. Konkurrenceevnen. Den manglende dokumentation for effekt. Det er dér, Y's vinkel ligger.

*Systemet reagerer på:*
`underreported` · `overlooked` · `ignored` · `missing context` · `one-sided` · `rarely discussed` · `hidden cost` · `unintended consequences` · `second-order effects` · `who benefits` · `who pays` · `what is not being said` · `what the debate misses` — og på dansk: `overset vinkel` · `blind vinkel` · `manglende modkilde` · `skjult konsekvens` · `tavs part` · `ufortalt side` · `den pris ingen taler om` · `hvad mangler i debatten?` · `utilsigtede konsekvenser`

---

### 3. Perspective — *Hvad betyder dette egentlig?*

**Pille: Understand**

Perspective løfter en hændelse ud af det øjeblikkelige og ind i en større sammenhæng. Det er ikke holdning. Det er forklaring, kontekst, analyse og forståelse — den journalistik der hjælper læseren til at forstå, ikke bare vide.

Systemet leder efter historisk kontekst, strukturelle mønstre, bagvedliggende årsager og langsigtede konsekvenser. En artikel om, at flere unge fravælger universitetsuddannelser, scorer højt her — ikke fordi det er breaking news, men fordi det peger på et strukturelt skift i uddannelsessystemet og arbejdsmarkedet der fortjener forklaring.

*Systemet reagerer på:*
`analysis` · `context` · `explanation` · `implications` · `drivers` · `historical` · `structural` · `long-term` · `underlying causes` · `broader trend` · `what it means` · `why it matters` · `second-order effects` — og på dansk: `perspektiv` · `forklaring` · `baggrund` · `større sammenhæng` · `bagvedliggende årsager` · `strukturel` · `langsigtet` · `hvad betyder det?` · `hvorfor sker det?`

---

### 4. Mythbuster — *Hvad tror mange forkert om?*

**Pille: Challenge**

Mythbuster er Perspective's skarpeste søster. Her er det ikke nok at tilbyde kontekst — her skal der data, forskning eller dokumentation til, der direkte afkræfter en udbredt antagelse.

Systemet leder specifikt efter formuleringer der indikerer modsætningen mellem folkelig tro og faktisk evidens: det alle tror, overfor det data faktisk viser.

Et input om, at ældre medarbejdere ikke er mindre omstillingsparate end yngre, scorer højt — det er direkte dokumentation mod en udbredt fordom med store konsekvenser for ansættelsesbeslutninger.

*Systemet reagerer på:*
`myth` · `misconception` · `what everyone gets wrong` · `contrary to popular belief` · `debunked` · `false assumption` · `new evidence` · `surprising data` · `misunderstood` · `myth vs reality` — og på dansk: `myte` · `misforståelse` · `sandheden om` · `i virkeligheden` · `mange tror` · `data viser noget andet` · `fejlagtig antagelse` · `modsat hvad mange tror` · `ny forskning viser`

---

### 5. Signal — *Er dette et tegn på noget større?*

**Pille: Understand**

Signal er ikke breaking news. Signal er det tidlige mønster der peger frem — tendensen der er ved at blive til noget, adoptionen der ikke er nyheden endnu, men om seks måneder vil være det.

Det er særligt vigtigt for Y, fordi mediet ikke skal gengive nyheder — det skal opdage mønstre før andre. Systemet leder efter tidlig adoption, acceleration af eksisterende tendenser og inflection points.

Når flere små virksomheder begynder at bruge AI til kundeservice, er det ikke en nyhed. Det er et signal om et strukturelt skift der vil forandre hele SMV-segmentet.

*Systemet reagerer på:*
`emerging` · `trend` · `shift` · `early signs` · `pattern` · `rising` · `accelerating` · `new behavior` · `adoption` · `inflection point` — og på dansk: `tendens` · `nyt mønster` · `tegn på` · `voksende` · `skifte` · `accelererer` · `tidlige signaler` · `ny adfærd` · `gennembrud`

---

### 6. Threat — *Hvad kan skade læseren?*

**Pille: Understand**

Threat scorer risici, kriser og sårbarhed. Det der kan ramme læseren, virksomheden, markedet eller samfundet — regulering med negative konsekvenser, stigende cybertrusler, markedsdisruption, finansiel usikkerhed.

Systemet leder ikke bare efter alarmistisk tone. Det leder efter reel konsekvens for Y's målgruppe: SMV-ejeren, erhvervslederen, den borgerlige dansker der har brug for at vide, hvad der er på vej mod ham.

En rapport om stigende cyberangreb mod danske virksomheder scorer typisk 90+ her — det er en direkte og dokumenteret trussel mod kernemålgruppen.

*Systemet reagerer på:*
`risk` · `threat` · `warning` · `disruption` · `crisis` · `uncertainty` · `vulnerability` · `attack` · `failure` · `pressure` · `regulatory burden` · `bankruptcy` · `shortage` — og på dansk: `risiko` · `trussel` · `advarsel` · `krise` · `sårbarhed` · `usikkerhed` · `nedgang` · `pres` · `angreb` · `konkurs` · `regulering` · `byrde` · `tab`

---

### 7. Opportunity — *Hvilken mulighed kan læseren udnytte?*

**Pille: Inspire**

Opportunity er Threat's modpol. Vækst, effektivisering, investering, ny teknologi med kommercielt potentiale, strategiske fordele der kan gribes nu. Systemet leder efter historier der giver Y's erhvervslæser en handlingsorienteret fordel.

Det handler ikke om hype. Det handler om konkret og dokumenteret potentiale — den teknologi der faktisk reducerer energiforbruget, den markedsåbning der rent faktisk er der.

*Systemet reagerer på:*
`opportunity` · `growth` · `expansion` · `investment` · `efficiency` · `emerging market` · `competitive advantage` · `potential` · `new market` · `productivity gain` · `savings` · `scaling` — og på dansk: `mulighed` · `vækst` · `potentiale` · `fordel` · `gevinst` · `effektivisering` · `investering` · `skalering` · `nyt marked` · `produktivitetsløft` · `besparelse` · `konkurrencefordel`

---

### 8. Inspiration — *Hvad kan læseren kopiere?*

**Pille: Inspire**

Inspiration er dokumenteret læring og konkrete erfaringer der kan overføres direkte. Y's inspirationsstof skal være evidensbaseret — ikke motivationsforedrag. Det er casestories med målbare resultater, metoder der er afprøvet og virker, adfærdsændringer der er dokumenterede.

En virksomhed der halverer sygefravær gennem fleksibel arbejdstid scorer højt — fordi den case er konkret, replikerbar og direkte relevant for Y's læsere.

*Systemet reagerer på:*
`evidence-based` · `lessons learned` · `best practices` · `what works` · `case study` · `replicable model` · `practical lessons` · `science-backed` · `high performers` · `behavior change` — og på dansk: `sådan gjorde de` · `dokumenteret effekt` · `bedste praksis` · `erfaringer` · `kan kopieres` · `virker i praksis` · `forskningen viser` · `fem greb`

---

### 9. Guide — *Hvad skal læseren gøre nu?*

**Pille: Inspire**

Guide scorer indhold der kan omsættes direkte til råd, tjeklister eller handlingsanvisninger. Spørgsmålet er enkelt: Hvad gør læseren, når han er færdig med at læse?

Nye regler for arbejdsmiljø scorer her — ikke fordi de er interessante i sig selv, men fordi de har konkrete og umiddelbare handlingsimplikationer for enhver virksomhedsleder.

*Systemet reagerer på:*
`how-to` · `guide` · `checklist` · `tips` · `practical advice` · `step-by-step` · `recommendations` · `what to do` · `playbook` · `toolkit` · `actionable insights` — og på dansk: `guide` · `sådan gør du` · `trin for trin` · `tjekliste` · `råd` · `anbefalinger` · `praktisk` · `værktøj` · `hvad skal du gøre?` · `de vigtigste pointer` · `konkret hjælp`

---

### 10. Curiosity — *Hvad gør historien fascinerende?*

**Pille: Understand**

Curiosity scorer det overraskende, det mærkelige, det der vækker opdagelseslyst. Det er ikke en stærk funktion alene — men den kan løfte komplekst stof og gøre det læsbart for et bredere publikum.

Systemet leder specifikt efter uventede fund, overraskende sammenhænge og den type formuleringer der signalerer, at verden er lidt anderledes end vi troede.

En undersøgelse der viser en uventet sammenhæng mellem søvn og beslutningstagning scorer her — fordi den vækker undren og åbner for en Y-vinkel om, hvad dårlig søvn egentlig koster erhvervslederen.

*Systemet reagerer på:*
`surprising` · `unusual` · `fascinating` · `unexpected` · `mystery` · `strange` · `hidden` · `rare` · `unknown` · `discovery` · `researchers surprised` — og på dansk: `overraskende` · `uventet` · `fascinerende` · `mærkeligt` · `sjældent` · `skjult` · `mystisk` · `opdagelse` · `forskere overrasket` · `hvordan kan det være?`

---

### 11. Solution — *Tilbyder dette en vej frem?*

**Pille: Inspire**

Solution er den 11. funktion — og den eksisterer af én præcis årsag: Y er et optimistisk medie. *Fremtiden er lys* er ikke bare et slogan. Det er Y's tredje indholdspille og en aktiv redaktionel beslutning om ikke at lade nyheder reducere sig til en strøm af problemer uden svar.

Solution adskiller sig fra Inspiration ved at operere på et større niveau. Inspiration handler om hvad én læser kan lære og kopiere. Solution handler om konkrete løsninger på kendte samfundsproblemer — teknologiske gennembrud, velfungerende politikker, dokumenterede fremskridt der giver grund til reelt håb.

Uden Solution-funktionen vil Challenge- og Threat-historier systematisk flyde øverst i feedet. Y's løsningsorienterede identitet vil langsomt forsvinde i algoritmen.

*Systemet reagerer på:*
`solution` · `breakthrough` · `progress` · `resolved` · `proven` · `positive outcome` · `hope` · `innovation solves` · `way forward` · `path forward` · `demonstrated results` · `recovery` · `turnaround` — og på dansk: `løsning` · `gennembrud` · `fremskridt` · `virker` · `bevist` · `positivt resultat` · `håb` · `vej frem` · `dokumenterede resultater` · `det lykkedes` · `fremtidshåb` · `opsving`

---

## Y Score — hvad der vejer tungest

De 11 funktioner fortæller *hvad slags* indhold et input er. Y Score fortæller *hvor vigtigt* det er for Y at bearbejde det.

Y Score er ikke et gennemsnit. Det er en vægtet sum af syv dimensioner der tilsammen afspejler, hvad Y er som medie — og hvad Y's læser har brug for.

**Audience Relevance** vejer 20 %. Intet andet spørgsmål er vigtigere: Er dette relevant for Y's læser? SMV-ejeren, erhvervslederen, den borgerlige dansker der søger modperspektiver? Ingen relevans, ingen Y-historie.

**Impact** vejer 20 %. Påvirker historien mange mennesker? Virksomheder? Økonomi? Regulering? En vigtig, faktabaseret nyhed der ikke er counter-narrative fortjener stadig at flyde op i feedet — og det er Impact der sikrer det.

**Counter-Narrative Value** vejer 15 %. Udfordrer inputtet en dominerende fortælling? Bringer det modpolen frem? Afdækker det ideologisk slagside eller skjulte magtstrukturer? Dette er Y's særkende — men det er bevidst sat til 15 % og ikke højere, fordi Y er counter-narrative, men ikke *udelukkende* counter-narrative. Vigtige Understand-historier må ikke systematisk underscores.

**Perspective Value** vejer 15 %. Tilføjer inputtet dybere forståelse? Stærk kontekst? Analysepotentiale der rækker ud over det øjeblikkelige?

**Decision Value** vejer 15 %. Hjælper dette læseren med at træffe bedre beslutninger? Kan det påvirke strategi, investering eller drift? For Y Business er dette en central dimension.

**Trust / Source Strength** vejer 10 %. Myndighedskilder, publicerede forskningsartikler og officielle statistikker scorer højt. Pressemeddelelser fra interesseorganisationer scorer lavt — ikke fordi historien er ubrugelig, men fordi den kræver verificering. Lav trust er en advarsel, ikke en kassering.

**Production Potential** vejer 5 %. Kan inputtet let omsættes til en stærk Y-historie? Er vinklen tydelig? Er tallene stærke? Har den en klar konflikt der kan bæres?

Formlen:

> Y Score = Audience Relevance×0,20 + Impact×0,20 + Counter-Narrative Value×0,15 + Perspective Value×0,15 + Decision Value×0,15 + Trust×0,10 + Production Potential×0,05

Resultatet er et tal mellem 0 og 100. Det er ikke magisk. Det er redaktionel logik, gjort eksplicit og konsistent.

---

## Fra score til handling

Y Score oversættes til fem prioritetsniveauer der vises som en farvet talblok på hvert kort i feedet:

**85–100 — Kritisk** (rød). Behandles hurtigt. Her er den stærke modfortælling, den høje målgrupperelevans, den klare beslutningsværdi.

**70–84 — Høj prioritet** (orange). Stærk vinkel, god relevans — kræver måske verificering eller en modkilde, men bør med i dagens redaktionelle prioritering.

**55–69 — Watch** (gul). Tidligt signal, interessant men ikke stærkt nok alene. Gemmes, overvåges eller kombineres med andre kilder.

**40–54 — Lav prioritet** (grå). Begrænset selvstændig værdi — kan bruges som baggrundsmateriale.

**0–39 — Ignore** (lysgrå). Ikke relevant nok — men stadig synligt i feedet. Intet kasseres automatisk og uden menneskelig vurdering.

Indhold der endnu ikke er processet af ratingmotoren vises slet ikke. Feedet sorteres som standard på Y Score faldende. Den bedste histoire flyder øverst — ikke den nyeste.

---

## Hvad redaktøren ser

Tallene alene er ikke nok. Redaktøren skal vide *hvorfor* en historie scorer, hvad den kan bruges til, og hvad der mangler, inden den kan publiceres.

Hvert kort viser den primære journalistiske funktion, op til tre sekundære funktioner med score over 50, én sætning om hvorfor historien er relevant for Y, og en advarsel hvis kilden har partsinteresse eller mangler dokumentation.

Kortet viser også konkrete vinkler til Y-historier, hvilke kilder der mangler og hvilket format historien kalder på — analyse, guide, mythbuster-artikel, trendbrief eller alert.

Endelig klassificeres hvert input eksplicit i en af Y's tre redaktionelle pillars — *understand*, *challenge* eller *inspire* — så redaktøren øjeblikkeligt ved, hvilken tone og hvilket format historien kalder på.

Et eksempel på et færdigt kort:

```
[ 84 · ORANGE ]  Blind Spot · Challenge · Perspective
Pille: Challenge

Historien afdækker en overset økonomisk konsekvens i en
ellers ensidig dækning af ny EU-regulering.

⚠️ Medium source risk — partsinteresse, kræver modkilde.

Mulige vinkler:
1. Hvem betaler prisen for den nye regulering?
2. Den skjulte regning for grøn omstilling
3. Fem ting SMV'er bør forberede sig på nu

Manglende kilder: uafhængig ekspert · myndighed · konkret SMV-case
Anbefalet format: analyse + guide
```

---

## Det systemet ikke må gøre

Et ratingsystem er ikke neutralt. Uden eksplicitte grænser kan det reproducere bias, forveksle provokation med kvalitet og lade clickbait passere som journalistik.

Systemet må ikke forveksle Y's borgerlige profil med partipolitisk bias. Det må ikke belønne ren provokation uden dokumentation. Det må ikke forveksle konflikt med kvalitet. Det må ikke lade pressemeddelelser passere uden kildekritisk markering. Det må ikke tvinge alle historier ind i én kategori. Og — vigtigst — det må ikke nedprioritere historier der udfordrer Y's egne antagelser.

Y's troværdighed hviler på evnen til at udfordre mainstream-fortællinger og bevare retten til at udfordre sine egne læseres forventninger. Det skal algoritmen afspejle.

---

## Hvad vi bygger først

MVP'en indeholder topic classification, scoring på alle 11 funktioner, Y Score med alle syv dimensioner, source risk og redaktionel advarsel, mulige vinkler, anbefalet format, redaktionel pillar og placering i feedet med farvet scoreblok.

MVP'en indeholder ikke feedback-loop koblet til klikrate og læsetid, prediktiv model baseret på historisk performance eller brugeradfærdsdata. Mediet er ikke online endnu. Det kommer i Fase 2, når der er noget at lære af.

Teknisk bygges MVP'en som en kombination af LLM-klassifikation, faste scoring prompts, keyword-matching på engelske og danske signalord og regelbaserede justeringer. Intern klassifikation sker på engelsk for stabilitet og international skalerbarhed. Output vises på dansk i CMS'et.

---

## Den korte version

Story Intelligence Rating Engine finder ikke bare nyheder. Den finder signaler, modpoler, blinde vinkler og beslutningsrelevant viden — og viser redaktøren, hvad der er guld, og hvad der kan vente til i morgen.

Hvert input vurderes på hvad det handler om, hvilken journalistisk funktion det aktiverer, hvor meget det udfordrer etablerede fortællinger, hvor relevant det er for Y's læser, hvor stærkt kildegrundlaget er, og hvilke vinkler det kan blive til.

Målet er at identificere de input der kan blive til den journalistik, Y eksisterer for at lave: faktabaseret, nuanceret, løsningsorienteret og udfordrende.

Det er ikke en nyhedsalgoritme. Det er et redaktionelt instrument.
