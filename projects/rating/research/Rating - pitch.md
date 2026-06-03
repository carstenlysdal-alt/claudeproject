Projekt Y — koncept for rating-system
Story Intelligence Rating Engine
1. Formål

Projekt Y skal ikke bare sortere nyheder. Projekt Y skal finde de historier, vinkler og signaler, som andre overser.

Rating-systemet skal derfor ikke primært vurdere, om et indholdsstykke er velskrevet, populært eller klassisk nyhedsbærende. Det skal vurdere:

Hvor stort journalistisk, samfundsmæssigt, forretningsmæssigt og intellektuelt potentiale ligger der gemt i dette input?

Projekt Y’s redaktionelle DNA er, at AI producerer artikler døgnet rundt, mens mennesker redigerer og verificerer. Kerneopgaven er at finde “modpolen, nuancen, den kilde der går tabt” — og afdække blinde vinkler i det nuværende mediebillede.

Rating-systemet skal derfor fungere som en Story Intelligence Engine:

Den modtager eksterne kilder.
Den analyserer emne, funktion, kilde og potentiale.
Den identificerer skjulte vinkler.
Den vurderer, om historien passer til Y’s målgruppe.
Den foreslår relevante journalistiske formater.
Den prioriterer, hvad redaktionen eller AI-systemet bør arbejde videre med.
2. Hvad skal rates?

Systemet skal rate eksternt indhold, som kommer ind i feedet fra eksempelvis:

nyhedsmedier
internationale publishers
pressemeddelelser
interesseorganisationer
virksomheder
myndigheder
tænketanke
forskningsinstitutioner
blogs
rapporter
sociale medier
branchemedier
analysehuse
databaser

Systemet skal ikke primært vurdere, om kilden selv har produceret en god artikel.

Det skal vurdere:

Kan dette input blive til en stærk Y-historie?

3. Grundprincip

Ratingen bygges op i tre lag:

Input → Topic classification → Journalistic function → Y Rating

Med andre ord:

Hvad handler inputtet om?
Hvorfor er det journalistisk interessant?
Hvor vigtigt er det for Y?
Hvilken vinkel kan Y skabe ud af det?
4. Intern sprogmodel: Engelsk taksonomi, dansk output

Det anbefales, at den interne klassifikation skrives på engelsk.

Årsager:

Mange kilder er internationale.
Mange stærke signalord findes på engelsk.
LLM’er arbejder ofte mere stabilt med engelske kategorier.
Det gør systemet lettere at skalere internationalt.
Output kan stadig vises på dansk i brugerfladen.

Eksempel:

{
  "topics": ["AI", "Business", "Regulation"],
  "functions": {
    "challenge": 88,
    "threat": 72,
    "opportunity": 65
  },
  "danish_label": "Udfordrer det etablerede"
}
5. Topic Classification

Første lag er emneklassifikation.

En kilde kan have flere topics samtidigt.

Primære topics
AI
Business
Leadership
Economics
Technology
Politics
Society
Health
Science
Education
Energy
Environment
Markets
Entrepreneurship
Regulation
Work
Productivity
Media
Culture
Security
Cybersecurity
Geopolitics
Consumer
Finance
Innovation
Eksempel

Input:

OECD-rapport om AI’s effekt på arbejdsmarkedet.

Topics:

["AI", "Work", "Economics", "Regulation", "Productivity"]
6. Journalistiske funktioner

Y skal ikke kun vide, hvad en historie handler om. Systemet skal vide, hvorfor historien er relevant for læseren.

Derfor scores hvert input på en række journalistiske funktioner fra 0-100.

En historie kan score højt på flere funktioner samtidigt.

6.1 Challenge
Definition

Challenge handler om historier, der udfordrer dogmer, konsensus, fastlåste meninger, institutionelle sandheder eller etablerede fortolkningsrammer.

Det er en af Y’s vigtigste kategorier.

Spørgsmål

Hvad udfordrer dette input?

Modellen skal lede efter
dogmebrud
modstridende forskning
uenighed
modpoler
værdiclash
kritik af etableret praksis
ny dokumentation mod gammel antagelse
konsensus under pres
“alle tror X, men data viser Y”
Engelske signalord
challenging conventional wisdom
counterintuitive
rethinking
orthodoxy challenged
consensus questioned
established narrative challenged
dogma challenged
unexpected findings
new evidence suggests
what everyone got wrong
controversial findings
myth vs reality
policy failure
expert consensus questioned
contradiction
assumption
overturns
questions
Danske signalord
udfordrer konsensus
går imod gængs opfattelse
stiller spørgsmål ved
punkterer myte
vender debatten på hovedet
ny dokumentation viser
fastlåst fortælling
politisk dogme
uventet konsekvens
modstridende holdninger
kritikere mener
eksperter er uenige
opgør med
Eksempel

Input:

Ny forskning viser, at hjemmearbejde ikke nødvendigvis sænker produktiviteten.

Output:

{
  "challenge": 91,
  "mythbuster": 84,
  "perspective": 76,
  "why": "Inputtet udfordrer den udbredte ledelsesantagelse om, at fysisk tilstedeværelse er nødvendig for høj produktivitet."
}

Mulige vinkler:

“Ny forskning udfordrer chefernes mavefornemmelse”
“Myten om kontoret: Produktivitet handler ikke nødvendigvis om fremmøde”
“Ledelsesdogme under pres: Hjemmearbejde kan styrke produktiviteten”
6.2 Blind Spot
Definition

Blind Spot handler om det, der mangler i den eksisterende dækning.

Det kan være en overset vinkel, en fraværende modkilde, en skjult konsekvens, en tavs part eller en pris, som ingen taler om.

Denne kategori bør være et særkende for Projekt Y.

Spørgsmål

Hvad mangler i den almindelige fortælling?

Modellen skal lede efter
ensidig dækning
manglende modpart
tavse konsekvenser
skjulte økonomiske effekter
ideologiske blinde vinkler
underbelyste grupper
hvem vinder?
hvem betaler?
hvad bliver ikke sagt?
hvilke andenordenseffekter overses?
Engelske signalord
underreported
overlooked
ignored
blind spot
missing context
one-sided
rarely discussed
neglected
absent perspective
hidden cost
unintended consequences
second-order effects
who benefits
who pays
what is not being said
what the debate misses
Danske signalord
overset vinkel
blind vinkel
manglende modkilde
skjult konsekvens
tavs part
ufortalt side
den pris, ingen taler om
hvem betaler?
hvem vinder?
hvad mangler i debatten?
underbelyst
ensidig dækning
fraværende perspektiv
utilsigtede konsekvenser
Eksempel

Input:

Flere medier skriver, at ny grøn regulering vil accelerere den grønne omstilling.

Mulig Y-analyse:

{
  "blind_spot": 89,
  "challenge": 74,
  "threat": 68,
  "why": "Dækningen fokuserer på klimaeffekten, men mangler konsekvenser for SMV’er, omkostninger, konkurrenceevne og dokumentation for effekt."
}

Mulige vinkler:

“Regningen for grøn regulering lander hos små virksomheder”
“Hvem betaler prisen for den grønne omstilling?”
“Den oversete konsekvens af ny klimapolitik”
6.3 Perspective
Definition

Perspective handler om at løfte en hændelse ind i en større sammenhæng.

Det er ikke holdning. Det er forklaring, kontekst, analyse og forståelse.

Spørgsmål

Hvad betyder dette i en større sammenhæng?

Modellen skal lede efter
historisk kontekst
strukturelle mønstre
bagvedliggende årsager
langsigtede konsekvenser
større trends
forklaringsbehov
andenordenseffekter
sammenhæng med økonomi, kultur, teknologi eller politik
Engelske signalord
analysis
context
explanation
trend
implications
drivers
historical
structural
long-term
underlying causes
broader trend
what it means
why it matters
second-order effects
Danske signalord
perspektiv
forklaring
baggrund
større sammenhæng
tendens
mønster
udvikling
konsekvenser
bagvedliggende årsager
strukturel
historisk
langsigtet
hvad betyder det?
hvorfor sker det?
Eksempel

Input:

Flere unge fravælger universitetsuddannelser.

Mulig Y-vinkel:

“Universitetets status er under forandring”
“Unge vælger løn, sikkerhed og fleksibilitet frem for akademisk prestige”
“Et uddannelsesskifte peger på en større ændring i arbejdsmarkedet”
6.4 Mythbuster
Definition

Mythbuster handler om historier, hvor data, forskning eller dokumentation viser, at en udbredt antagelse er forkert eller stærkt forsimplet.

Spørgsmål

Hvad tror mange forkert om?

Engelske signalord
myth
misconception
what everyone gets wrong
contrary to popular belief
debunked
reality
false assumption
new evidence
surprising data
misunderstood
myth vs reality
Danske signalord
myte
misforståelse
sandheden om
i virkeligheden
mange tror
data viser noget andet
fejlagtig antagelse
modsat hvad mange tror
ny forskning viser
myte eller virkelighed
Eksempel

Input:

Data viser, at ældre medarbejdere ikke er mindre omstillingsparate end yngre.

Output:

{
  "mythbuster": 92,
  "challenge": 78,
  "perspective": 64
}

Mulige vinkler:

“Myten om de ældre medarbejdere holder ikke”
“Data udfordrer fordom om alder på arbejdsmarkedet”
“Ældre medarbejdere kan være mere omstillingsparate end antaget”
6.5 Signal
Definition

Signal handler om tidlige tegn på en større udvikling.

Det er særligt vigtigt for Y, fordi mediet ikke kun skal gengive nyheder, men opdage mønstre før andre.

Spørgsmål

Er dette et tegn på noget større, der er på vej?

Engelske signalord
emerging
trend
shift
changing
growing
early signs
pattern
rising
accelerating
decline
new behavior
movement
adoption
inflection point
Danske signalord
tendens
nyt mønster
tegn på
voksende
stigende
skifte
ændring
bevægelse
accelererer
under forandring
tidlige signaler
ny adfærd
gennembrud
Eksempel

Input:

Flere små virksomheder begynder at bruge AI til kundeservice.

Mulige vinkler:

“AI rykker fra eksperiment til drift i små virksomheder”
“Et nyt mønster i dansk erhvervsliv”
“Kundeservice bliver første AI-front i SMV’er”
6.6 Threat
Definition

Threat handler om risiko, krise, skade, tab, regulering, sårbarhed eller disruption.

Spørgsmål

Hvad kan skade læseren, virksomheden, markedet eller samfundet?

Engelske signalord
risk
threat
warning
disruption
crisis
uncertainty
vulnerability
decline
attack
failure
pressure
regulatory burden
bankruptcy
shortage
Danske signalord
risiko
trussel
advarsel
krise
sårbarhed
usikkerhed
nedgang
fald
pres
angreb
konkurs
mangel
regulering
byrde
konsekvens
tab
Eksempel

Input:

Ny rapport viser stigende cyberangreb mod danske virksomheder.

Output:

{
  "threat": 95,
  "guide": 80,
  "signal": 86,
  "decision_value": 88
}

Mulige vinkler:

“Cyberangreb rammer rekordmange virksomheder”
“Fem ting din virksomhed bør gøre nu”
“Eksperter advarer mod ny angrebsmetode”
6.7 Opportunity
Definition

Opportunity handler om muligheder, vækst, produktivitet, investering, effektivisering eller strategisk fordel.

Spørgsmål

Hvilken mulighed kan læseren udnytte?

Engelske signalord
opportunity
growth
expansion
adoption
investment
efficiency
emerging market
competitive advantage
potential
new market
productivity gain
savings
scaling
Danske signalord
mulighed
vækst
potentiale
fordel
gevinst
effektivisering
investering
ekspansion
skalering
nyt marked
produktivitetsløft
besparelse
konkurrencefordel
Eksempel

Input:

Ny teknologi reducerer energiforbruget i produktion.

Mulige vinkler:

“Ny teknologi kan spare virksomheder millioner”
“Energikrisen åbner for nyt marked”
“Sådan kan SMV’er reducere energiforbruget”
6.8 Inspiration
Definition

Inspiration handler om dokumenteret læring, konkrete erfaringer og eksempler, der kan kopieres.

Y’s inspirationsstof bør være evidensbaseret, ikke fluffy.

Spørgsmål

Hvad kan læseren lære, kopiere eller bruge?

Engelske signalord
evidence-based
lessons learned
best practices
what works
successful intervention
case study
replicable model
practical lessons
science-backed
habits
productivity
improvement
strategy
successful people do
behavior change
high performers
Danske signalord
sådan gjorde de
dokumenteret effekt
læring
bedste praksis
metode
erfaringer
konkret råd
kan kopieres
virker i praksis
forskningen viser
fem greb
vaner
selvudvikling
produktivitet
forbedring
personlig succes
Eksempel

Input:

En virksomhed halverer sygefravær gennem fleksibel arbejdstid.

Output:

{
  "inspiration": 88,
  "guide": 74,
  "opportunity": 62,
  "business_value": 81
}

Mulige vinkler:

“Virksomhed halverede sygefravær med ét ledelsesgreb”
“Kan fleksibel arbejdstid blive en konkurrencefordel?”
“Fem læringer fra virksomheden, der knækkede fraværskurven”
6.9 Guide
Definition

Guide handler om indhold, der kan omsættes til konkrete råd, tjeklister, forklaringer eller handlingsanvisninger.

Spørgsmål

Hvad kan brugeren gøre efter at have læst historien?

Engelske signalord
how-to
guide
checklist
tips
practical advice
step-by-step
recommendations
what to do
playbook
framework
toolkit
key takeaways
actionable insights
Danske signalord
guide
sådan gør du
trin for trin
tjekliste
råd
tips
anbefalinger
praktisk
værktøj
metode
hvad skal du gøre?
de vigtigste pointer
konkret hjælp
Eksempel

Input:

Nye regler for arbejdsmiljø træder i kraft.

Mulige vinkler:

“Tjekliste: Sådan forbereder du din virksomhed”
“Fem ændringer ledere skal kende”
“Det betyder de nye regler i praksis”
6.10 Curiosity
Definition

Curiosity handler om historier, der vækker opdagelseslyst, fascination eller undren.

Denne kategori skal ikke stå alene for ofte, men kan gøre komplekst stof mere læsbart.

Spørgsmål

Hvad gør historien fascinerende?

Engelske signalord
surprising
unusual
fascinating
unexpected
mystery
strange
hidden
rare
unknown
discovery
researchers surprised
Danske signalord
overraskende
uventet
fascinerende
mærkeligt
sjældent
skjult
mystisk
opdagelse
forskere overrasket
hvorfor?
hvordan kan det være?
Eksempel

Input:

Forskere opdager uventet sammenhæng mellem søvn og beslutningstagning.

Mulige vinkler:

“Din søvn kan påvirke dine forretningsbeslutninger”
“Forskere overrasket: Søvn spiller større rolle end antaget”
“Den skjulte faktor bag dårlige beslutninger”
7. Ratingdimensioner

Efter funktionerne beregnes en samlet Y-score.

Her anbefales følgende dimensioner.

7.1 Audience Relevance
Spørgsmål

Hvor relevant er inputtet for Y’s målgruppe?

Y’s primære målgrupper er dels det borgerlige segment, der føler sig underserveret af mainstream-medier, dels SMV-ejere, erhvervsledere og iværksættere.

Vurderes ud fra
Erhvervsrelevans
Samfundsrelevans
Borgerlig/principiel relevans
Beslutningstagerrelevans
Relevans for SMV’er
Relevans for ledere
Relevans for iværksættere
Relevans for almindelige borgere med interesse for modperspektiver

Score: 0-100

7.2 Impact
Spørgsmål

Hvor stor betydning har historien?

Høj score ved
påvirker mange mennesker
påvirker virksomheder
påvirker økonomi
påvirker regulering
påvirker arbejdsmarked
påvirker sundhed, sikkerhed eller frihed
har konsekvenser over tid

Score: 0-100

7.3 Counter-Narrative Value
Spørgsmål

Udfordrer inputtet en dominerende fortælling?

Dette er en af Y’s vigtigste scoringer.

Høj score ved
udfordrer mainstream-vinkel
bringer modpol
udfordrer konsensus
afdækker ideologisk slagside
viser utilsigtede konsekvenser
stiller kritiske spørgsmål til magtstrukturer
tilbyder alternativ forklaring

Score: 0-100

7.4 Perspective Value
Spørgsmål

Tilføjer inputtet dybere forståelse?

Høj score ved
stærk kontekst
historisk forklaring
analysepotentiale
større samfundsperspektiv
strukturel udvikling
andenordenseffekter
mulighed for forklarende journalistik

Score: 0-100

7.5 Decision Value
Spørgsmål

Hjælper dette input brugeren med at træffe bedre beslutninger?

Dette er centralt for Y Business.

Høj score ved
kan påvirke strategi
kan påvirke investering
kan påvirke drift
kan reducere risiko
kan spare penge
kan skabe vækst
kan give ledelsesmæssig fordel
kan ændre adfærd

Score: 0-100

7.6 Trust / Source Strength
Spørgsmål

Hvor stærkt er kildegrundlaget?

Vurderes ud fra
kildetype
dokumentation
afsenderinteresse
data
uafhængighed
forskningskvalitet
myndighedskilde
citater
transparens
risiko for partsinteresse

Score: 0-100

Kildetyper med typisk højere trust
myndigheder
publicerede forskningsartikler
officielle statistikker
domstole
årsrapporter
internationale institutioner
flere uafhængige medier
Kildetyper med typisk lavere trust
rene pressemeddelelser
interesseorganisationer
virksomhedskommunikation
anonyme sociale medier
blogs uden dokumentation
rapporter uden metode

Lav trust betyder ikke nødvendigvis, at historien skal fravælges. Det betyder, at den skal markeres til verificering.

7.7 Production Potential
Spørgsmål

Hvor let kan inputtet omsættes til stærkt Y-indhold?

Høj score ved
tydelig vinkel
stærke tal
klar konflikt
god case
praktisk relevans
mulighed for guide
mulighed for analyse
mulighed for kort video
mulighed for lydbrief
let at verificere

Score: 0-100

8. Foreslået vægtning

Den samlede Y-score kan beregnes sådan:

Dimension	Vægt
Audience Relevance	20 %
Impact	15 %
Counter-Narrative Value	20 %
Perspective Value	15 %
Decision Value	15 %
Trust / Source Strength	10 %
Production Potential	5 %
Formel
Y Score =
Audience Relevance * 0.20 +
Impact * 0.15 +
Counter-Narrative Value * 0.20 +
Perspective Value * 0.15 +
Decision Value * 0.15 +
Trust * 0.10 +
Production Potential * 0.05
Hvorfor denne vægtning?

Fordi Y’s særkende ikke bare er aktualitet eller klikpotentiale.

Y’s særkende er:

modpol
nuance
blind vinkel
faktabaseret udfordring af dogmer
løsningsorienteret journalistik
brugerrelevant beslutningsværdi

Det følger direkte af Y’s redaktionelle DNA: faktabaseret, løsningsorienteret, udfordrende over for fastlåste meninger, dogmer og skjulte magtstrukturer.

9. Prioritetsniveauer
Y Score 85-100: Critical / Top Priority

Inputtet bør behandles hurtigt.

Typisk:

stærk modfortælling
høj målgrupperelevans
stor betydning
klar vinkel
høj beslutningsværdi
Y Score 70-84: High Priority

Inputtet bør indgå i redaktionel prioritering.

Typisk:

stærk vinkel
god relevans
kræver verificering eller modkilde
Y Score 55-69: Watch / Develop

Inputtet bør gemmes, overvåges eller kombineres med andre kilder.

Typisk:

tidligt signal
interessant, men ikke stærkt nok alene
brugbart i større analyse
Y Score 40-54: Low Priority

Inputtet har begrænset værdi, men kan bruges som baggrund.

Y Score 0-39: Ignore

Inputtet vurderes ikke relevant nok.

10. Outputformat

For hvert input bør systemet returnere et struktureret output.

Standardoutput
{
  "y_score": 84,
  "priority": "high",
  "topics": ["Business", "Regulation", "SME"],
  "source_type": "interest_organization_press_release",
  "functions": {
    "challenge": 69,
    "blind_spot": 82,
    "perspective": 76,
    "mythbuster": 44,
    "signal": 73,
    "threat": 88,
    "opportunity": 28,
    "inspiration": 12,
    "guide": 61,
    "curiosity": 35
  },
  "ratings": {
    "audience_relevance": 92,
    "impact": 84,
    "counter_narrative_value": 78,
    "perspective_value": 76,
    "decision_value": 81,
    "trust": 58,
    "production_potential": 86
  },
  "source_risk": "medium",
  "editorial_warning": "Partsinteresse. Kræver modkilde fra myndighed, uafhængig ekspert eller konkret virksomhed.",
  "recommended_format": "analysis + guide",
  "possible_angles": [
    "Nye EU-krav kan ramme små virksomheder hårdere end ventet",
    "Hvem betaler prisen for den nye regulering?",
    "Fem ting SMV’er bør forberede sig på nu"
  ],
  "missing_sources": [
    "uafhængig ekspert",
    "myndighed",
    "konkret SMV-case"
  ]
}
11. Redaktionskøer

Y bør ikke have én samlet bunke med “mest relevante historier”.

Systemet bør oprette parallelle køer.

Foreslåede køer
Top Challenge
Top Blind Spots
Top Threats
Top Opportunities
Top Signals
Top Perspective
Top Inspiration / What Works
Top Guides
Top Mythbusters

Det sikrer variation.

Ellers vil klassisk konfliktstof, breaking news eller trusselsstof ofte dominere hele feedet.

12. Eksempler på fuld rating
Eksempel 1: EU-regulering og SMV’er
Input

En erhvervsorganisation udsender en pressemeddelelse om, at nye EU-krav bliver dyre for danske SMV’er.

Analyse
{
  "topics": ["Business", "Regulation", "EU", "SME"],
  "source_type": "interest_organization_press_release",
  "functions": {
    "threat": 88,
    "blind_spot": 82,
    "perspective": 76,
    "challenge": 69,
    "guide": 61,
    "signal": 73,
    "opportunity": 28,
    "inspiration": 12,
    "curiosity": 35,
    "mythbuster": 44
  },
  "ratings": {
    "audience_relevance": 92,
    "impact": 84,
    "counter_narrative_value": 78,
    "perspective_value": 76,
    "decision_value": 81,
    "trust": 58,
    "production_potential": 86
  },
  "y_score": 81,
  "priority": "high"
}
Redaktørnote

Kilden har partsinteresse. Historien bør ikke publiceres uden modkilder.

Mulige vinkler
“Nye EU-krav kan ramme små virksomheder hårdere end ventet”
“Hvem betaler prisen for den nye regulering?”
“Fem ting SMV’er bør forberede sig på nu”
Anbefalet format
Analyse + guide
Eksempel 2: Fire-dages arbejdsuge
Input

Ny forskning viser, at fire-dages arbejdsuge kan øge produktiviteten.

Analyse
{
  "topics": ["Work", "Leadership", "Productivity"],
  "functions": {
    "challenge": 94,
    "mythbuster": 91,
    "perspective": 82,
    "inspiration": 77,
    "guide": 64,
    "opportunity": 59,
    "signal": 71,
    "threat": 18,
    "blind_spot": 66,
    "curiosity": 73
  },
  "ratings": {
    "audience_relevance": 86,
    "impact": 76,
    "counter_narrative_value": 91,
    "perspective_value": 83,
    "decision_value": 78,
    "trust": 82,
    "production_potential": 88
  },
  "y_score": 84,
  "priority": "high"
}
Mulige vinkler
“Ny forskning udfordrer dogmet om arbejdstid”
“Fire dage kan give mere produktivitet end fem”
“Hvad danske ledere kan lære af forsøg med kortere arbejdsuge”
Anbefalet format
Mythbuster + ledelsesanalyse
Eksempel 3: Cyberangreb mod virksomheder
Input

Rapport viser stigende antal cyberangreb mod små og mellemstore virksomheder.

Analyse
{
  "topics": ["Cybersecurity", "Business", "SME", "Technology"],
  "functions": {
    "threat": 96,
    "guide": 82,
    "signal": 84,
    "perspective": 69,
    "opportunity": 41,
    "challenge": 52,
    "blind_spot": 61,
    "mythbuster": 48,
    "inspiration": 20,
    "curiosity": 58
  },
  "ratings": {
    "audience_relevance": 94,
    "impact": 88,
    "counter_narrative_value": 62,
    "perspective_value": 71,
    "decision_value": 92,
    "trust": 79,
    "production_potential": 91
  },
  "y_score": 83,
  "priority": "high"
}
Mulige vinkler
“Cyberangreb rammer SMV’er: Fem ting du bør gøre nu”
“Små virksomheder er blevet hackernes nye mål”
“Derfor undervurderer mange ledere cybertruslen”
Anbefalet format
Threat + practical guide
Eksempel 4: AI i kundeservice
Input

Flere små virksomheder begynder at bruge AI-chatbots til kundeservice.

Analyse
{
  "topics": ["AI", "Business", "Customer Service", "SME"],
  "functions": {
    "signal": 89,
    "opportunity": 83,
    "guide": 72,
    "inspiration": 70,
    "perspective": 68,
    "challenge": 45,
    "threat": 39,
    "blind_spot": 57,
    "mythbuster": 31,
    "curiosity": 61
  },
  "ratings": {
    "audience_relevance": 91,
    "impact": 73,
    "counter_narrative_value": 51,
    "perspective_value": 70,
    "decision_value": 84,
    "trust": 74,
    "production_potential": 86
  },
  "y_score": 76,
  "priority": "high"
}
Mulige vinkler
“AI rykker fra hype til drift i små virksomheder”
“Kundeservice bliver første AI-front i SMV’er”
“Sådan vurderer du, om din virksomhed bør bruge AI-chatbot”
Anbefalet format
Signal + opportunity + guide
Eksempel 5: Mainstream-fortælling om grøn omstilling
Input

Flere medier skriver, at ny grøn regulering vil accelerere den grønne omstilling.

Analyse
{
  "topics": ["Environment", "Regulation", "Business", "Politics"],
  "functions": {
    "blind_spot": 91,
    "challenge": 82,
    "perspective": 84,
    "threat": 71,
    "signal": 70,
    "mythbuster": 64,
    "opportunity": 38,
    "guide": 46,
    "inspiration": 18,
    "curiosity": 42
  },
  "ratings": {
    "audience_relevance": 88,
    "impact": 86,
    "counter_narrative_value": 92,
    "perspective_value": 87,
    "decision_value": 76,
    "trust": 70,
    "production_potential": 82
  },
  "y_score": 85,
  "priority": "critical"
}
Mulige vinkler
“Den oversete regning for grøn regulering”
“Hvem betaler prisen for den grønne omstilling?”
“Klimapolitikkens blinde vinkel: Små virksomheder presses”
Anbefalet format
Blind Spot + Perspective + Challenge
13. Kildekritisk lag

Ratingmotoren skal altid identificere kilderisiko.

Source Risk

Mulige niveauer:

low
medium
high
Eksempel
{
  "source_risk": "medium",
  "reason": "Kilden er en interesseorganisation med mulig partsinteresse. Påstande om økonomiske konsekvenser kræver verificering."
}
Typiske advarsler
Partsinteresse
Manglende dokumentation
Manglende metode
Ensidig fremstilling
Ingen modkilde
Manglende data
Forældet kilde
Clickbait
Uklart ophav
Politisk interesse
Kommerciel interesse
14. Foreslåede journalistiske formater

Systemet bør ikke kun prioritere input. Det bør også foreslå format.

Mulige formater
News brief
Analysis
Explainer
Guide
Checklist
Mythbuster
Blind spot article
Counter-narrative article
Case story
Data story
Interview
Quote story
Video script
Audio brief
Newsletter item
Debate explainer
Formatvalg efter funktion
Funktion	Typisk format
Challenge	Analyse, mythbuster, debatforklaring
Blind Spot	Analyse, kritisk artikel, explainervinkel
Perspective	Explainer, analyse, baggrund
Threat	Alert, guide, risikobrief
Opportunity	Guide, case, business brief
Inspiration	Case, liste, “what works”
Signal	Trendbrief, analyse
Mythbuster	Dataartikel, forskningsbrief
Guide	Tjekliste, trin-for-trin
Curiosity	Kort artikel, video, social version
15. Teknisk implementering
Fase 1: LLM + regelmotor

Første version bør bygges som en kombination af:

LLM-klassifikation
faste scoring prompts
keyword/signalord
metadataudtræk
regelbaserede justeringer

Eksempel:

Hvis source_type = press_release og trust < 60:
  editorial_warning = "Requires independent verification"
Hvis functions.blind_spot > 80 og audience_relevance > 80:
  priority_queue += "Top Blind Spots"
Hvis threat > 85 og decision_value > 80:
  recommended_format = "Alert + Guide"
Fase 2: Feedback-loop

Når historier publiceres, kobles ratingen til faktisk performance.

Metrikker:

klikrate
læsetid
scroll depth
konvertering
abonnementsværdi
retention
nyhedsbrevsklik
delinger
genbesøg
redaktionel vurdering
antal efterfølgende artikler
om historien blev citeret af andre

Formålet er at lære:

Hvilke input bliver faktisk til værdifulde Y-historier?

Fase 3: Prediktiv model

Når der er nok historiske data, kan Y træne en model, der forudsiger:

sandsynlig klikrate
sandsynlig læsetid
sandsynlig konvertering
sandsynlig abonnementsværdi
sandsynlig redaktionel værdi
sandsynlig relevans for bestemte brugersegmenter
16. Promptskabelon til klassifikation

Nedenstående kan bruges som grundprompt til LLM’en.

You are the Story Intelligence Rating Engine for Projekt Y.

Your task is not to judge whether the input is well-written.
Your task is to assess whether the input contains journalistic, intellectual, business or counter-narrative potential for Projekt Y.

Projekt Y is an AI-first media outlet. Its editorial DNA is fact-based, solution-oriented, and focused on nuance, counter-perspectives, blind spots, overlooked sources, and challenges to fixed opinions, dogmas and hidden power structures.

Analyze the input and return structured JSON.

Assess:
1. Topics
2. Source type
3. Journalistic functions
4. Rating dimensions
5. Source risk
6. Editorial potential
7. Recommended formats
8. Possible angles
9. Missing sources or verification needs

Score all functions from 0-100:
- challenge
- blind_spot
- perspective
- mythbuster
- signal
- threat
- opportunity
- inspiration
- guide
- curiosity

Score all rating dimensions from 0-100:
- audience_relevance
- impact
- counter_narrative_value
- perspective_value
- decision_value
- trust
- production_potential

Calculate y_score using:
audience_relevance * 0.20 +
impact * 0.15 +
counter_narrative_value * 0.20 +
perspective_value * 0.15 +
decision_value * 0.15 +
trust * 0.10 +
production_potential * 0.05

Return:
{
  "topics": [],
  "source_type": "",
  "functions": {},
  "ratings": {},
  "y_score": 0,
  "priority": "",
  "source_risk": "",
  "editorial_warning": "",
  "recommended_format": "",
  "possible_angles": [],
  "missing_sources": [],
  "one_sentence_summary": "",
  "why_it_matters": ""
}
17. Datamodel
Minimumfelter
{
  "id": "string",
  "source_url": "string",
  "source_name": "string",
  "source_type": "string",
  "language": "string",
  "published_at": "datetime",
  "ingested_at": "datetime",
  "title": "string",
  "body": "string",
  "topics": ["string"],
  "entities": {
    "people": [],
    "organizations": [],
    "companies": [],
    "locations": [],
    "policies": []
  },
  "functions": {
    "challenge": 0,
    "blind_spot": 0,
    "perspective": 0,
    "mythbuster": 0,
    "signal": 0,
    "threat": 0,
    "opportunity": 0,
    "inspiration": 0,
    "guide": 0,
    "curiosity": 0
  },
  "ratings": {
    "audience_relevance": 0,
    "impact": 0,
    "counter_narrative_value": 0,
    "perspective_value": 0,
    "decision_value": 0,
    "trust": 0,
    "production_potential": 0
  },
  "y_score": 0,
  "priority": "string",
  "source_risk": "string",
  "recommended_format": "string",
  "possible_angles": [],
  "missing_sources": [],
  "editorial_warning": "string"
}
18. UI-princip

I brugerfladen bør redaktøren ikke kun se en score.

Redaktøren bør se:

Y Score: 85
Prioritet: Critical
Primær funktion: Blind Spot
Sekundære funktioner: Challenge, Perspective, Threat
Hvorfor: Historien afdækker en overset økonomisk konsekvens i en ellers ensidig dækning.
Kilderisiko: Medium
Næste skridt: Find konkret virksomhedscase + uafhængig ekspert.
Eksempel på kort redaktørkort
Y SCORE 85 · CRITICAL

Primær funktion:
Blind Spot

Hvorfor vigtig:
Dækningen fokuserer på politisk intention, men overser økonomiske konsekvenser for små virksomheder.

Mulige vinkler:
1. Hvem betaler prisen?
2. Den skjulte regning for reguleringen
3. Fem ting SMV’er bør forberede sig på

Kilderisiko:
Medium — partsinteresse, kræver modkilde.
19. Hvad systemet ikke må gøre

Systemet må ikke:

forveksle borgerlig profil med partipolitisk bias
belønne ren provokation uden dokumentation
forveksle konflikt med kvalitet
lade pressemeddelelser passere uden kildekritik
belønne clickbait
tvinge alle historier ind i én kategori
ignorere nuancer, fordi en historie passer ideologisk
nedprioritere historier, der udfordrer Y’s egne antagelser

Særligt vigtigt:

Y skal udfordre mainstream-fortællinger, men også kunne udfordre sine egne læseres forventninger.

Det er sådan systemet bevarer troværdighed.

20. Den korte konceptformel
Projekt Y’s rating-system finder ikke bare nyheder.
Det finder signaler, modpoler, blinde vinkler og beslutningsrelevant viden.

Hver kilde vurderes på:
- hvad den handler om
- hvilken journalistisk funktion den har
- hvor meget den udfordrer etablerede fortællinger
- hvor relevant den er for Y’s målgruppe
- hvor stærkt kildegrundlaget er
- hvilke vinkler den kan blive til

Målet er at identificere de input, der kan blive til den journalistik, Y eksisterer for at lave:
faktabaseret, nuanceret, løsningsorienteret og udfordrende journalistik.
21. Anbefalet MVP

Første version bør indeholde:

Topic classification
Function scoring
Y Score
Source risk
Editorial warning
Possible angles
Recommended format
Queue placement
MVP-output
{
  "y_score": 84,
  "priority": "high",
  "primary_function": "blind_spot",
  "secondary_functions": ["challenge", "perspective"],
  "topics": ["Business", "Regulation"],
  "why_it_matters": "Historien afdækker en overset konsekvens for små virksomheder.",
  "source_risk": "medium",
  "recommended_format": "analysis + guide",
  "possible_angles": [
    "Hvem betaler prisen?",
    "Den oversete regning",
    "Fem ting virksomheder bør gøre nu"
  ]
}
22. Samlet anbefaling

Projekt Y bør bygge rating-systemet som en counter-narrative story intelligence engine.

Ikke som en klassisk nyhedsalgoritme.

Ikke som en ren engagementmodel.

Ikke som en klikmaskine.

Men som et system, der identificerer:

det vigtige
det oversete
det overraskende
det handlingsrelevante
det, der udfordrer dogmer
det, der giver brugeren en bedre forståelse af verden

Det er her, Y kan adskille sig fra både traditionelle medier, AI-aggregatorer og generiske nyhedsfeeds.