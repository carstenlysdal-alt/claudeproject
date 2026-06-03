# Signal- og keyword-reference — Journalistiske funktioner

**Projekt:** Y.dk / Rating  
**Formål:** Operationel reference til LLM-prompt og regelmotor. Definerer præcist hvilke mønstre, signalord og kontekster der trigger hver af de 11 journalistiske funktioner.  
**Sprog:** Intern klassifikation på engelsk. Output til CMS på dansk.

---

## Overblik

| Funktion | Kernespørgsmål | Pille |
|---|---|---|
| Challenge | Udfordrer dette et dogme eller etableret fortælling? | Challenge |
| Blind Spot | Hvad mangler i den eksisterende dækning? | Challenge |
| Perspective | Hvad betyder dette i en større sammenhæng? | Understand |
| Mythbuster | Hvad tror mange forkert om? | Challenge |
| Signal | Er dette et tidligt tegn på noget større? | Understand |
| Threat | Hvad kan skade læseren eller samfundet? | Understand |
| Opportunity | Hvilken mulighed kan læseren udnytte? | Inspire |
| Inspiration | Hvad kan læseren lære eller kopiere? | Inspire |
| Guide | Hvad kan brugeren gøre efter at have læst? | Inspire |
| Curiosity | Hvad gør historien fascinerende? | Understand |
| Solution | Tilbyder dette en løsning eller et fremtidshåb? | Inspire |

---

## 1. Challenge

**Definition:** Historier der udfordrer dogmer, konsensus, fastlåste meninger, institutionelle sandheder eller etablerede fortolkningsrammer.

**Trigger-spørgsmål:** Hvad udfordrer dette input?

**Modellen leder efter:**
- Dogmebrud
- Modstridende forskning
- Uenighed mellem eksperter
- Modpoler og værdiclash
- Kritik af etableret praksis
- Ny dokumentation mod gammel antagelse
- Konsensus under pres
- "Alle tror X, men data viser Y"

**Engelske signalord:**
challenging conventional wisdom · counterintuitive · rethinking · orthodoxy challenged · consensus questioned · established narrative challenged · dogma challenged · unexpected findings · new evidence suggests · what everyone got wrong · controversial findings · myth vs reality · policy failure · expert consensus questioned · contradiction · assumption · overturns · questions

**Danske signalord:**
udfordrer konsensus · går imod gængs opfattelse · stiller spørgsmål ved · punkterer myte · vender debatten på hovedet · ny dokumentation viser · fastlåst fortælling · politisk dogme · uventet konsekvens · modstridende holdninger · kritikere mener · eksperter er uenige · opgør med

**Eksempel:**
> Input: Ny forskning viser, at hjemmearbejde ikke nødvendigvis sænker produktiviteten.
> `challenge: 91` — udfordrer ledelsesantagelsen om fysisk tilstedeværelse.

---

## 2. Blind Spot

**Definition:** Det der mangler i den eksisterende dækning — den oversete vinkel, den fraværende modkilde, den skjulte konsekvens, den tavse part eller den pris ingen taler om. Et særkende for Y.

**Trigger-spørgsmål:** Hvad mangler i den almindelige fortælling?

**Modellen leder efter:**
- Ensidig dækning uden modpart
- Tavse konsekvenser
- Skjulte økonomiske effekter
- Ideologiske blinde vinkler
- Underbelyste grupper
- Hvem vinder? Hvem betaler?
- Hvad bliver ikke sagt?
- Hvilke andenordenseffekter overses?

**Engelske signalord:**
underreported · overlooked · ignored · blind spot · missing context · one-sided · rarely discussed · neglected · absent perspective · hidden cost · unintended consequences · second-order effects · who benefits · who pays · what is not being said · what the debate misses

**Danske signalord:**
overset vinkel · blind vinkel · manglende modkilde · skjult konsekvens · tavs part · ufortalt side · den pris ingen taler om · hvem betaler? · hvem vinder? · hvad mangler i debatten? · underbelyst · ensidig dækning · fraværende perspektiv · utilsigtede konsekvenser

**Eksempel:**
> Input: Flere medier skriver, at ny grøn regulering vil accelerere den grønne omstilling.
> `blind_spot: 89` — dækningen mangler konsekvenser for SMV'er, konkurrenceevne og dokumentation for effekt.

---

## 3. Perspective

**Definition:** Løfter en hændelse ud af det øjeblikkelige og ind i en større sammenhæng. Ikke holdning — forklaring, kontekst, analyse og forståelse.

**Trigger-spørgsmål:** Hvad betyder dette i en større sammenhæng?

**Modellen leder efter:**
- Historisk kontekst
- Strukturelle mønstre
- Bagvedliggende årsager
- Langsigtede konsekvenser
- Større trends
- Forklaringsbehov
- Andenordenseffekter
- Sammenhæng med økonomi, kultur, teknologi eller politik

**Engelske signalord:**
analysis · context · explanation · trend · implications · drivers · historical · structural · long-term · underlying causes · broader trend · what it means · why it matters · second-order effects

**Danske signalord:**
perspektiv · forklaring · baggrund · større sammenhæng · tendens · mønster · udvikling · konsekvenser · bagvedliggende årsager · strukturel · historisk · langsigtet · hvad betyder det? · hvorfor sker det?

**Eksempel:**
> Input: Flere unge fravælger universitetsuddannelser.
> `perspective: 78` — peger på strukturelt uddannelsesskifte og ændringer i arbejdsmarkedet.

---

## 4. Mythbuster

**Definition:** Historier hvor data, forskning eller dokumentation viser, at en udbredt antagelse er forkert eller stærkt forsimplet.

**Trigger-spørgsmål:** Hvad tror mange forkert om?

**Modellen leder efter:**
- Data der modsiger fordom
- Forskning der afkræfter antagelse
- "Alle tror X, men..."
- Dokumentation mod mavefornemmelse

**Engelske signalord:**
myth · misconception · what everyone gets wrong · contrary to popular belief · debunked · reality · false assumption · new evidence · surprising data · misunderstood · myth vs reality

**Danske signalord:**
myte · misforståelse · sandheden om · i virkeligheden · mange tror · data viser noget andet · fejlagtig antagelse · modsat hvad mange tror · ny forskning viser · myte eller virkelighed

**Eksempel:**
> Input: Data viser, at ældre medarbejdere ikke er mindre omstillingsparate end yngre.
> `mythbuster: 92` — dokumentation mod udbredt alders-fordom på arbejdsmarkedet.

---

## 5. Signal

**Definition:** Tidlige tegn på en større udvikling. Ikke breaking news — det mønster der peger frem. Særligt vigtigt for Y, der skal opdage tendenser før andre.

**Trigger-spørgsmål:** Er dette et tegn på noget større, der er på vej?

**Modellen leder efter:**
- Nye adfærdsmønstre
- Acceleration af eksisterende tendenser
- Teknologisk eller social adoption
- Skift i markedet
- Inflection points

**Engelske signalord:**
emerging · trend · shift · changing · growing · early signs · pattern · rising · accelerating · decline · new behavior · movement · adoption · inflection point

**Danske signalord:**
tendens · nyt mønster · tegn på · voksende · stigende · skifte · ændring · bevægelse · accelererer · under forandring · tidlige signaler · ny adfærd · gennembrud

**Eksempel:**
> Input: Flere små virksomheder begynder at bruge AI til kundeservice.
> `signal: 84` — tidlig adoption peger på strukturelt skift i SMV-segmentet.

---

## 6. Threat

**Definition:** Risiko, krise, skade, tab, regulering, sårbarhed eller disruption der kan ramme læseren, virksomheden, markedet eller samfundet.

**Trigger-spørgsmål:** Hvad kan skade læseren, virksomheden, markedet eller samfundet?

**Modellen leder efter:**
- Risici og advarsler
- Kriser og sårbarhed
- Regulering med negative konsekvenser
- Markedsdisruption
- Sikkerhedstrusler
- Tab, konkurs, nedgang

**Engelske signalord:**
risk · threat · warning · disruption · crisis · uncertainty · vulnerability · decline · attack · failure · pressure · regulatory burden · bankruptcy · shortage

**Danske signalord:**
risiko · trussel · advarsel · krise · sårbarhed · usikkerhed · nedgang · fald · pres · angreb · konkurs · mangel · regulering · byrde · konsekvens · tab

**Eksempel:**
> Input: Ny rapport viser stigende cyberangreb mod danske virksomheder.
> `threat: 95` — direkte risiko for Y's kernemålgruppe af SMV-ejere.

---

## 7. Opportunity

**Definition:** Muligheder, vækst, produktivitet, investering, effektivisering eller strategisk fordel læseren kan udnytte.

**Trigger-spørgsmål:** Hvilken mulighed kan læseren udnytte?

**Modellen leder efter:**
- Ny teknologi med kommercielt potentiale
- Markedsåbninger
- Effektiviseringspotentiale
- Investeringsmuligheder
- Konkurrencemæssige fordele
- Nye forretningsmodeller

**Engelske signalord:**
opportunity · growth · expansion · adoption · investment · efficiency · emerging market · competitive advantage · potential · new market · productivity gain · savings · scaling

**Danske signalord:**
mulighed · vækst · potentiale · fordel · gevinst · effektivisering · investering · ekspansion · skalering · nyt marked · produktivitetsløft · besparelse · konkurrencefordel

**Eksempel:**
> Input: Ny teknologi reducerer energiforbruget i produktion.
> `opportunity: 81` — konkret besparelsespotentiale for produktionsvirksomheder.

---

## 8. Inspiration

**Definition:** Dokumenteret læring, konkrete erfaringer og eksempler der kan kopieres. Y's inspirationsstof skal være evidensbaseret — ikke fluffy.

**Trigger-spørgsmål:** Hvad kan læseren lære, kopiere eller bruge?

**Modellen leder efter:**
- Casestories med konkrete resultater
- Dokumenterede metoder
- Erfaringer der kan overføres
- Evidensbaserede adfærdsændringer
- Eksempler på hvad der virker i praksis

**Engelske signalord:**
evidence-based · lessons learned · best practices · what works · successful intervention · case study · replicable model · practical lessons · science-backed · habits · productivity · improvement · strategy · successful people do · behavior change · high performers

**Danske signalord:**
sådan gjorde de · dokumenteret effekt · læring · bedste praksis · metode · erfaringer · konkret råd · kan kopieres · virker i praksis · forskningen viser · fem greb · vaner · selvudvikling · produktivitet · forbedring · personlig succes

**Eksempel:**
> Input: En virksomhed halverer sygefravær gennem fleksibel arbejdstid.
> `inspiration: 88` — konkret og replikerbar case med dokumenterede resultater.

---

## 9. Guide

**Definition:** Indhold der kan omsættes direkte til råd, tjeklister, forklaringer eller handlingsanvisninger. Læseren ved hvad de skal gøre, når de er færdige.

**Trigger-spørgsmål:** Hvad kan brugeren gøre efter at have læst historien?

**Modellen leder efter:**
- Trin-for-trin-logik
- Tjeklistepotentiale
- Praktiske råd
- Lovgivning eller regler med konkrete implikationer
- "Fem ting du bør gøre"

**Engelske signalord:**
how-to · guide · checklist · tips · practical advice · step-by-step · recommendations · what to do · playbook · framework · toolkit · key takeaways · actionable insights

**Danske signalord:**
guide · sådan gør du · trin for trin · tjekliste · råd · tips · anbefalinger · praktisk · værktøj · metode · hvad skal du gøre? · de vigtigste pointer · konkret hjælp

**Eksempel:**
> Input: Nye regler for arbejdsmiljø træder i kraft.
> `guide: 86` — klar implikation for virksomheder med direkte handlingsbehov.

---

## 10. Curiosity

**Definition:** Historier der vækker opdagelseslyst, fascination eller undren. Skal sjældent stå alene, men kan gøre komplekst stof mere tilgængeligt.

**Trigger-spørgsmål:** Hvad gør historien fascinerende?

**Modellen leder efter:**
- Overraskende fund eller sammenhænge
- Uventede resultater
- Skjulte mønstre
- Forskning der overrasker
- Det sjældne eller ukendte

**Engelske signalord:**
surprising · unusual · fascinating · unexpected · mystery · strange · hidden · rare · unknown · discovery · researchers surprised

**Danske signalord:**
overraskende · uventet · fascinerende · mærkeligt · sjældent · skjult · mystisk · opdagelse · forskere overrasket · hvorfor? · hvordan kan det være?

**Eksempel:**
> Input: Forskere opdager uventet sammenhæng mellem søvn og beslutningstagning.
> `curiosity: 79` — counterintuitivt fund med erhvervsrelevans.

---

## 11. Solution

**Definition:** Historier der tilbyder en konkret løsning, et fremtidshåb eller et positivt perspektiv på et problem. Repræsenterer Y's tredje indholdspille — *Fremtiden er lys* — og sikrer at løsningsorienteret journalistik ikke systematisk nedprioriteres ift. Challenge- og Threat-historier.

**Trigger-spørgsmål:** Tilbyder dette en konkret vej frem, et håb eller et positivt fremtidsperspektiv?

**Modellen leder efter:**
- Konkrete løsninger på kendte problemer
- Politiske eller teknologiske gennembrud
- Dokumenterede fremskridt
- Positivt fremtidsperspektiv med evidens
- "Det virker"-historier på samfundsniveau
- Løsninger der giver håb — ikke blot inspirerer individuelt

**Engelske signalord:**
solution · breakthrough · progress · resolved · fixed · works · proven · improvement · success · positive outcome · hope · future · innovation solves · way forward · answer · path forward · demonstrated results · reversal · recovery · turnaround

**Danske signalord:**
løsning · gennembrud · fremskridt · virker · bevist · forbedring · succes · positivt resultat · håb · fremtiden · innovation løser · vej frem · svar · vendt · opsving · dokumenterede resultater · det lykkedes · optimistisk · fremtidshåb

**Eksempel:**
> Input: Ny behandlingsmetode halverer tilbagefald hos patienter med angst.
> `solution: 88` — konkret og dokumenteret løsning på et velkendt problem med bred samfundsrelevans.

---

## Regler for primær funktion

Den funktion med den højeste score tildeles som `primary_function`. Sekundære funktioner med score > 50 inkluderes i `secondary_functions` (maks. 3).

**Tiebreak-regel:** Hvis to funktioner scorer ens, prioriteres i denne rækkefølge:
Challenge → Blind Spot → Solution → Threat → Signal → Perspective → Mythbuster → Opportunity → Inspiration → Guide → Curiosity

---

## Mapping: funktion → editorial pillar

| Primær funktion | Editorial pillar |
|---|---|
| Challenge | challenge |
| Blind Spot | challenge |
| Mythbuster | challenge |
| Perspective | understand |
| Signal | understand |
| Threat | understand |
| Opportunity | inspire |
| Inspiration | inspire |
| Guide | inspire |
| Solution | inspire |
| Curiosity | understand |

---

## Mapping: funktion → anbefalet format

| Funktion | Primære formater |
|---|---|
| Challenge | Analyse · Mythbuster-artikel · Debatforklaring |
| Blind Spot | Kritisk analyse · Explainer · Counter-narrative artikel |
| Perspective | Explainer · Analyse · Baggrundsstykke |
| Mythbuster | Dataartikel · Forskningsbrief · Faktjek |
| Signal | Trendbrief · Analyse |
| Threat | Alert · Guide · Risikobrief |
| Opportunity | Guide · Case · Business brief |
| Inspiration | Case · Liste · "What works"-artikel |
| Guide | Tjekliste · Trin-for-trin · Eksplainer |
| Curiosity | Kort artikel · Video · Social-format |
| Solution | Analyse · Case · Fremtidsartikel |
