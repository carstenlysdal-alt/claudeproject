---
target: Hele Y Business-mockuppet, nuværende design med Business Pro, branchevalg og DI
total_score: 24
p0_count: 0
p1_count: 3
timestamp: 2026-11-15T16-02-27Z
slug: ects-ydkbusiness-output-ybusiness-di-artikler-html
---
# Review af Y Business-mockup, 15. november 2026

## Konklusion

Bevar designet. Mockuppet har en tydelig redaktionel identitet, et varieret nyhedshierarki og en genkendelig DI-flade. De væsentlige problemer er mobiladfærd, indholdets troværdighedssignaler og enkelte ufuldstændige interaktioner.

Tre agents har vurderet visuelt design/UX, teknisk kvalitet og produktstruktur/redaktionel sammenhæng. Designvurderingen var færdig, før detektorens resultater indgik i syntesen. Impeccable critique/audit samt Web Interface Guidelines er anvendt. Den oprindelige QA-session-skill blev læst, men ikke anvendt: den handler om at oprette GitHub-issues, hvilket ikke er denne opgave.

Reviewet ændrer ikke mockuppets kode. Projektets allerede dokumenterede kontekst og brugerens seneste struktur er fastholdt i projects/ydkbusiness/PRODUCT.md. Det er ingen ny produktbeslutning.

## Omfang og evidens

Brugerpræcisering efter reviewet: DI-boksens vigtigste opgave er at give DI-medlemmer eksklusivt stof gennem unikke rapporter og indsigt fra indflydelsesrige klummeskribenter. Dette er det styrende kriterium for indhold og prioritering. Eksklusive rapporter og klummer er dermed den tilsigtede produktværdi; kilde- og metadatafundene nedenfor handler om udførelsen, ikke om at fravælge dette koncept.

Kanonisk fil: projects/ydkbusiness/output/ybusiness-di-artikler.html.

Alle 29 visninger er gennemlæst i kode: Business-forside, tre kategorier, 11 Business-artikler, Pro-forside, fem Pro-artikelsider, DI-forside og syv DI-artikler. Et simpelt DOM-konstruktionsharness kunne opbygge alle 29 uden undtagelser. Det er en renderkontrol, ikke en browserlayouttest.

Browseren er brugt til repræsentative rejser og komponenter: Business, branchemenu, Pro, Pro-pladsholder, Pro-artikel, DI, DI-artikel, grafer, faktabokse og mockup-panelet. Smalle formater 320 og 390 px, tablet 768 px og desktop 1440 px er inspiceret; tidligere desktopbilleder supplerer. Lyse og mørke temaer er set. Escape-lukning og valg af Byggeri er kontrolleret. Chrome DevTools blev lukket efter skærmtesten, og lyst tema blev gendannet.

Ikke udført: eksternt faktatjek af artiklernes påstande, fuld skærmlæsertest, Lighthouse/netværksmåling eller browserinspektion af hver enkelt artikel. Der konkluderes derfor ikke, at manglende kildedokumentation betyder falske påstande, eller at et langsomt foto er en 404.

## Designvurdering, Nielsen

| Heuristik | Score | Konkret vurdering |
|---|---:|---|
| Systemstatus | 2/4 | Aktiv indgang vises; læsefokus følger ikke indholdsskift |
| Sammenhæng med brugerens verden | 3/4 | Branche og DI-medlemsindhold er forståelige |
| Kontrol og frihed | 3/4 | Historik, links og Escape understøttes |
| Konsistens | 2/4 | Pro/Pro+ og knaplignende tekst blandes |
| Fejlforebyggelse | 2/4 | Færdige og ufærdige funktioner ligner hinanden |
| Genkendelse | 3/4 | Gode indholdssignaler, men DI-introduktion kommer sent |
| Effektivitet | 2/4 | Ingen skip-link eller fokusflytning ved navigation |
| Æstetik og enkelhed | 3/4 | Sammenhængende identitet; toppen bruger meget plads |
| Fejlretning | 2/4 | Ukendt hash lander lydløst på Business |
| Hjælp | 2/4 | Interne noter hjælper, men hjælpelignende links er statiske |
| **Samlet** | **24/40** | Sammenhængende design med konkrete brugbarhedsmangler |

Teknisk audit: tilgængelighed 2/4, performance 3/4, responsivitet 2/4, temaer 3/4 og anti-patterns 3/4. **13/20**. Performance er kildekodebaseret; der foreligger ingen målt indlæsningstid.

## Hvad der fungerer

- Business-forsiden veksler mellem analyse, stor billedhistorie og korte nyheder. Det giver et klart redaktionelt hierarki.
- Business Pro, branchevalg med kun Byggeri og direkte DI-indgang følger nu brugerens ønskede struktur. Ingen ekstra brancheforsider er opfundet.
- DI's lilla flade, logo og medlemsmærkning giver området sin egen identitet inden for Y.
- Brødtekst, grafer og faktabokse er læsbare i de undersøgte formater. Tekstlige grafalternativer, fokusmarkering og reduceret bevægelse er allerede implementeret.
- Native details/summary, almindeligt branchelink samt Escape- og klik-udenfor-lukning er gode grundvalg.

## Fem vigtigste fund

### 1. [P1] Branchemenuen klippes på mobil

Placering: linje 333–360 og 1976–1981. Ved 390 px ligger Brancher i højre del af anden navigationslinje. Dropdownen er mindst 220 px bred og positioneres med left:0 fra fanen. Den løber ud over skærmens højre kant; både panel og forklaring klippes. Det er visuelt verificeret. Fejlen blev indført i den seneste menuændring.

Konsekvens: et centralt branchevalg virker ufærdigt og giver afskåret information.

Rettelse inden for designet: lad panelet holde sig inden for viewporten, fx en mobilplacering i navigationscontainerens bredde med 16 px sideafstand eller en højrejusteret, viewportbegrænset dropdown. Bevar fanen, farverne og Byggeri som eneste valgmulighed. Kontroller 320, 375 og 390 px samt tastatur. Relevant kommando: impeccable adapt.

Topheaderen passer ved 390 px; agenternes mistanke om afskårne kontrolknapper dér er ikke godkendt som fund. Ved 320 px forsvinder Y-logoet dog visuelt, mens tekstlinks og knapper optager headeren. DI-kortgriddets 280 px minimum er desuden en kodebaseret risiko i den smalleste container, som skal genkontrolleres med layoutmåling før en præcis overflowpåstand.

### 2. [P1 før DI-præsentation] Artiklernes dato og dokumentationsstatus modsiger oplevelsen

Placering: linje 491, 907–924, 980–1042, 1255 og 1966.

DI-opinionen #a6 vises med dato 6. oktober 2026, men omtaler et kildenotat offentliggjort 11. november 2026. Det er en intern kronologisk fejl uanset kildens faktiske gyldighed.

DI-hovedrapporten #a7 fremlægger en eksklusiv undersøgelse af 340 virksomheder, præcise tal og citater, men har kun et kildenavn og ingen konkret rapportreference eller tydelig angivelse af illustrative tal. Dette beviser ikke, at rapporten er opdigtet; filen etablerer blot ikke dens grundlag.

Pro-artiklerne #p1–#p4 beskriver bestemte forskningsprojekter, mens deres fælles footer siger, at tal, citater og eksempler er opdigtede. Status er derfor uklar.

Konsekvens: DI-modtageren kan ikke vurdere, hvad demonstrationen dokumenterer.

Rettelse: metadata pr. artikel, dato efter kildens dato og entydig status for dokumenteret stof versus illustrative eksempler. Knyt rapportreference på, hvis den findes. Opfind ikke dokumentation. Relevant kommando: impeccable clarify.

### 3. [P1] Små labels har for lav kontrast

Placering: linje 336, 395, 429 og 431.

#857E88 på lys #F4F2F1 giver 3,53:1; på mørk #221F21 4,15:1. Begge er under 4,5:1 for den lille tekst. DI-kortenes metadata #6E6771 på #EAE8E7 giver ca. 4,48:1 og ligger lige under grænsen.

Konsekvens: især små kategoritekster og metadata bliver svære at læse.

Rettelse: brug den eksisterende --ydk-muted til de almindelige labels og mørkn DI-metadata ganske lidt. Farvesystemet kan bevares. Hovedbrødtekst og primær CTA har tilfredsstillende kontrast i de kontrollerede par. Relevant kommando: impeccable audit.

### 4. [P2] Artikelrenderingen mister formatering

Placering: linje 1015, 1040–1042, 1049–1101, 1241 og 1942.

#a6/#a7 viser rå Markdown-stjerner. Brancherapportens nummererede anbefalinger samles i et tekstafsnit. #p4's almindelige punktliste understøttes heller ikke som liste.

Konsekvens: det centrale handlingsafsnit bliver sværere at skimme, og indholdet ligner ufærdig produktion.

Rettelse: understøt begrænset inlineformattering og semantiske lister, eller tilpas teksterne til de blokke, parseren allerede understøtter. Bevar typografi, bokse og spacing. Relevant kommando: impeccable harden.

### 5. [P2] DI-boksens eksklusive indholdsværdi skal stå tydeligere

Placering: linje 1277–1301 og billedstyling fra linje 127.

DI-forsiden starter med et stort foto, en meget lang rapporttitel og endnu en historie. Den egentlige DI-boks kommer senere. På mobil står navigationen i fire rækker før indholdet; på desktop dominerer fotoet første skærm. Boksen skal bedømmes på, om medlemmerne genkender de konkrete eksklusive tilbud: unikke rapporter og indsigt fra indflydelsesrige mennesker.

Konsekvens: læseren ser medlemsmærkning, men får ikke tilstrækkeligt hurtigt et klart overblik over det særlige stof og dets afsendere.

Rettelse: lad DI-boksen fremhæve en unik medlemsrapport og en klumme med tydelig skribent, rolle og synspunkt. Rapportens særlige indsigt skal fremgå af kortet. Fasthold den lilla DI-flade, rapportkortene og Y-headeren. Begræns pladsforbruget, så de eksklusive tilbud bliver synlige tidligere. En tredjepersonsomtale af en indflydelsesrig persons notat demonstrerer ikke alene løftet om en klumme fra vedkommende. Relevant kommando: impeccable layout/clarify.

## Øvrige syv fund

6. **[P2] Knaplignende elementer er statiske.** Linje 472, 1490–1505, 1561 og 1988. Liveblogs, Mit yBusiness Pro og redaktionslinks lover handling; flere er spans. Hamburgermenuen er en erklæret mockfunktion. Vis konsekvent, hvad der er demo, eller forbind til eksisterende mockvisninger. Ingen produktionsbackend efterspørges her. Kommando: clarify/harden.

7. **[P2] Navigationsfokus følger ikke den nye side.** Linje 478 og 2078–2087. Indhold og undermenu udskiftes uden fokusflytning; den fokuserede undermenulink-node kan blive fjernet. Tilføj skip-link og flyt fokus til hovedindhold ved brugerinitieret sidenavigation. Fuld skærmlæseradfærd er ikke testet. Kommando: harden.

8. **[P2] Pro-fotos har dobbelte nøgler.** Linje 1576–1580. c1/c2 indlejres og overskrives af URL'er. Ca. 147.566 indlejrede tegn bruges derfor ikke, og fotos kræver uventet netværk. Behold én definition pr. foto, helst det allerede indlejrede billede til denne filbaserede demo. Kommando: optimize.

9. **[P2, erklæret pladsholder] Pro-hovedhistorien lover otte minutters læsning, men er ufærdig.** Linje 1586, 1949, 1961–1964 og 2003. #p0 forklarer ærligt manglen efter klik. Markér det på forsiden, eller brug en komplet historie som hovedhistorie. Kommando: clarify.

10. **[P2] Kilder kan ikke åbnes.** Linje 1264. Alle 18 Business-/DI-artikler bruger tekststrenge som kilder uden direkte links. Tilføj konkrete rapport-/artikellinks, især i DI's sammenligninger og grafer. Det er en sporbarhedsmangel, ikke et faktatjek. Kommando: harden.

11. **[P2] Produkt- og genremærkning er ujævn.** Business Pro/Pro+ bruges side om side. #a6 er en tredjepersonsgengivelse af Howard Marks' notat, men kaldes klumme; en faktaboks om 11 spørgsmål viser tre. Brug præcist produktnavn og tydelig afsender/genre, og marker udvalget af spørgsmål. Linje 470, 907, 957–963 og 1986. Kommando: clarify.

12. **[P2] Overskriftshierarkiet er ufuldstændigt.** Business-forsiden mangler h1; Pro går fra h1 til kortenes h3 uden sektionens h2. Linje 1490–1571 og 2003–2005. Tilføj meningsfulde, eventuelt visuelt skjulte side-/sektionsoverskrifter uden visuel omlægning. Kommando: harden.

I alt: 12 grupperede fund, 0 P0, 3 P1 og 9 P2. P1 betyder væsentlig mangel eller rettelse før ekstern DI-præsentation; det betyder ikke, at hele mockuppet er utilgængeligt.

## Personaer og kognitiv belastning

**DI-medlem på første besøg:** finder den direkte indgang, men skal afkode forholdet mellem Y, Pro og DI. Rapportens kilde-/datostatus svækker den ellers troværdige indpakning.

**Byggeleder på mobil:** finder branchefanen, men dropdownen klippes. Navigation, liveblogpiller og topbilleder bruger meget plads før overblikket.

**Tastaturbruger:** får native menu, Escape og fokusmarkering. Fokus følger ikke udskiftet sideindhold, og flere synlige handlinger findes ikke som tastaturmål.

Den øverste navigation har mere end fire samtidige valg plus to Pro-handlingssignaler. Det er ikke i sig selv en fejl på et nyhedsmedie. På mobil giver indpakningen i flere rækker dog ekstra søgearbejde. Den følelsesmæssige rejse starter med et professionelt medieudtryk, men falder ved klippet menu, døde kontroller og Pro-pladsholder. DI's første skærm bør hurtigt bekræfte, at medlemmet er landet rigtigt.

## Anti-patterns og detektor

Designet fremstår som et redaktionelt medie og kræver ingen ny æstetisk retning. Detektorens eneste match er side-tab ved linje 172, en 3 px venstrestreg i en intern redaktionel note. Matchningen er korrekt, men det er ikke en væsentlig brugbarhedsfejl og prioriteres ikke.

Fire fontfamilier, dekorative sliderprikker og mange mono-versaler er mindre konsistenspunkter. De begrunder ikke et skift af identitet. DI's lilla flade og lyse kort på mørk baggrund er et bevidst partnerelement, ikke automatisk et ødelagt tema. Filen på ca. 3,12 MB er primært indlejrede fotos; det er et forståeligt portabilitetsvalg i en enkeltfilsmockup.

## Rettelsesrækkefølge inden for det nuværende design

1. Mobilmenu og kontrast: impeccable adapt/audit.
2. DI-datoer, kildegrundlag og entydig mockstatus: impeccable clarify.
3. Artikelrendering og ærlige kontroltilstande: impeccable harden.
4. DI-boksens unikke rapporter, indflydelsesrige klummeskribenter og pladsforbrug: impeccable layout/clarify.
5. Afsluttende impeccable polish og gentaget review af de ændrede områder.

Der er ingen uafklarede designpræferencer i reviewet: brugeren har allerede valgt det nuværende design og prioriteret DI. Derfor er yderligere spørgsmål om farver, stil eller nye features sprunget over.

## Anvendt ekstern retningslinje

Web Interface Guidelines: https://raw.githubusercontent.com/vercel-labs/web-interface-guidelines/main/command.md . Bruges som kontrolramme for fokus, semantik og øvrig grænsefladekvalitet. Konkrete fund bygger på dette mockups kode og browserobservationer.
