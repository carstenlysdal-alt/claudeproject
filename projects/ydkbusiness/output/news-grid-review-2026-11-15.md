# News grid: fokuseret review

Kanonisk fil: ybusiness-di-artikler.html. Det oprindelige review nedenfor er et øjebliksbillede før ændringerne. Se implementeringsstatus øverst for den seneste version.

Vurderingen bygger på CSS-beregninger, de faktiske indholdsmængder og browserbilleder fra det foregående samlede review. Nye browserhandlinger blev afbrudt af samtidige brugerændringer; nedenstående mål er beregninger fra koden, ikke nye browsermålinger.

## Implementeringsstatus efter Y.dk-gennemgang

Business og Business Pro er opdateret med Y.dk som konkret reference (https://y.dk/, besøgt 15. november 2026). Den levende forside og dens HTML/CSS er gennemgået. Identitet, eksisterende artikler og branchehierarki er bevaret.

- Fælles 12-kolonnegrid med 32 px mellemrum, stor billedhistorie og mindre billedkort. Business bruger 4+4+4 og 8+4 på desktop. Pro viser tre kort, DI-modulet og en fuldbredde feature.
- Under 768 px stables kortene. På Business-tablet spænder analysemodulet hele rækken, og de to billedkort deler næste række. Minimumsbredderne, der gav overflow, er fjernet.
- DI-modulet prioriterer rapport og international opinion over de fem supplerende historier. Alle syv rubrikker er omskrevet og er ens på kort og artikler. Howard Marks fremgår af opinion-rubrikken; artiklen er fortsat formidling af hans notat.
- Brancher indeholder kun Byggeri under Business Pro. DI har en særskilt direkte indgang.

Verifikation: JavaScript-syntaks godkendt; en separat teknisk agent har renderet alle 29 visninger i et let DOM-harness uden exceptions, fundet én h1 pr. visning og ingen ugyldige interne links. Desktopvisninger af Business og Pro er kontrolleret visuelt i Safari. Mobil/tablet er i denne ændringsrunde kontrolleret i CSS og DOM; en fuld visuel kontrol af alle skærmstørrelser og begge temaer er ikke udført.

De tre HTML-leveringsfiler er synkroniseret byte for byte; ZIP-indholdet er verificeret og opdateret. Den færdige mockup er også publiceret under masterkonceptets fane DI-mockup. Masteren og de to eksisterende mockup-adresser er hentet over HTTP efter publicering og verificeret byte for byte mod leverancerne. Delingsknappen bruger fortsat den særskilte offentlige mockup-adresse.

## Oprindeligt review før rettelser

## Konkrete fund

| Område | Nuværende resultat | Anbefalet rettelse inden for designet |
|---|---|---|
| Business, 320 px | 288 px indholdsplads, men første gridkolonne kræver mindst 300 px. 12 px overflow skjules af body. | Lad minimum være min(100%, 300px), og brug én kolonne på mobil. |
| Business, tablet | Ved 768 px giver 736 px indhold to kolonner. De tre hovedblokke placeres 2+1; den kompakte nyhedsliste fylder kun halvdelen af sidste række. | Lad listen spænde hele rækken på tablet, eventuelt med de to små historier side om side. |
| Pro Byggeri | Fire kort lander 3+1 på både tablet og desktop. Fire kolonner kræver 926 px; beholderen er højst 880 px. | Brug et balanceret 2×2-grid og én kolonne på mobil. |
| DI-fotokort i Pro, 320 px | DI-boksens indre bredde er 248 px, men fotogriddet kræver mindst 280 px. | Brug min(100%, 280px) som minimum eller en eksplicit mobilkolonne. |
| Business, flugt mellem rækker | Øverste række har gap 40 px; anden række og nederste kort bruger 32 px. Anden rækkes forhold 2,1:1 giver også en anden kolonnelinje. | Del et trekolonnegrid med samme gutter. Lad den brede historie spænde to kolonner og Dagens tal én; nulstil spans ved stabling. |

## Målsat kontrol af eksisterende CSS

| Viewport | Business, første række | Pro, fire artikler | DI-fotokort i Pro |
|---|---|---|---|
| 320 px | 1 kolonne, 12 px for bred | 1 kolonne | 1 kolonne, 32 px for bred |
| 390 px | 1 kolonne | 1 kolonne | 1 kolonne |
| 768 px | 2 kolonner, tredje blok alene | 3+1 | 2 kolonner |
| 1024 px | 3 kolonner | 3+1 | 2 kolonner |
| 1440 px | 3 kolonner | 3+1 | 2 kolonner |

Ved 1440 px starter højre kolonne 3,05 px forskelligt mellem Business' to øverste rækker. Ved 1024 px er forskellen 5,81 px. Dette er en flugt-/konsistensforbedring, ikke en blokerende overflowfejl.

## Redaktionel prioritering

DI-boksen i Pro har den rigtige overordnede struktur: den eksklusive rapport og klummen er to fremhævede fotokort over de fem supplerende historier. Bevar dette hierarki og den lilla medlemsflade.

Fem supplerende kort i 3+2 er en legitim redaktionel fordeling. Der skal ikke opfindes et sjette kort for at fylde rækken. Kategorisidernes sidste række afhænger også af indholdsmængden og er ikke automatisk en fejl.

## Kodeplaceringer

- Business første række: linje 275; mobilpadding: 324.
- Business anden række: linje 298; nederste kort: 443.
- Pro-beholder: 361; Pro-kort: 377.
- DI-fotokort i Pro: 390; mobilpadding i DI-boksen: 403.
- DI-forsidens tekstkort: 153; indholdsprioritering: FRONT og PRO.diPhotos.

## Verifikation efter en rettelse

Kontroller 320, 390, 768, 1024 og 1440 px: ingen afskæring, bevaret læserækkefølge, fuldbredde tablet-liste, 2×2 Pro-kort og fælles gridlinjer på Business. Kontroller både lyse og mørke temaer uden at ændre identitet, tekster eller DI-eksklusivitet.

## Railway-master verificeret

Den autoritative masteradresse er https://ybusiness-dashboard-production.up.railway.app/#dimock. Rettelsen er publiceret fra GitHub `main` i commit `3bc502a9fa123f1e19756fc4c571f4da193ab71c`. Efter deployment er både Railway-roden og `/ybusiness-di-artikler.html` hentet med HTTP 200 og sammenlignet med de færdige filer (kun dynamisk deploytid normaliseret i masteren). Business-artikler1–10, inklusive den seneste Ørsted-rettelse, er bevaret i alle felter fra seneste remote-kilde.

## Artikel- og DI-opdatering · 16. november 2026

Alle artikeltyper bruger nu centreret brødtekst på 680 px, rubrikområde på 720 px, større læseskrift, tydelige mellemrubrikker og rummelige bokse. Længere artikler har en tastaturbetjent indholdsfortegnelse med fokus og rul til afsnit uden at ændre SPA-ruten.

DI-forsiden har et 8+4-grid til egenanalyse og international opinion over fem udfoldede cases i 2+3. De seks leverede tekster er indarbejdet som DI/FORCE-analysen og cases om Arla, Viking Malt, Ringsted Forsyning, Aarsleff og ReUseX. Aarsleff og ReUseX indgår også i Business Pro/Byggeri. Howard Marks er fortsat tydeligt formidling af et offentligt notat. Kildeangivelser og forbehold om estimerede gevinster og forsøg er bevaret.

Verifikation: 29 visninger renderet uden fejl af separat teknisk review, én h1 pr. visning, ingen dublerede IDs eller ugyldige interne links. Alle 60 indholdsfortegnelsesknapper har fungerende fokus- og rulhåndtering. JavaScript-syntaks og git diff-kontrol bestået. Business-data, kategorier og forside er uændrede fra seneste remote-version. Visuel Safari-kontrol af DI-grid, artikelhoved, læsesøjle, overbliksboks, faktaboks, graf og afsnitsnavigation; mobiltilpasninger er kontrolleret i CSS, ikke gennem en fuld visuel enhedstest.

Publiceret fra commit `275f25b` til Railway-masteren. Både master og mockup er hentet med HTTP 200 og verificeret mod de færdige filer (kun dynamisk deploytid normaliseret i masteren). Begge eksisterende Firebase-delingsstier er ligeledes opdateret og verificeret byte for byte. Tre lokale HTML-leverancer og ZIP-indhold er synkroniseret.

Mellemrubrikker i alle artikeltyper er efterfølgende sat eksplicit til `font-weight: 800`, så fed skrift er ens i Business, Business Pro og DI. Rettelsen publiceres i commit `f172b44`.

## DI-boks i Business Pro · 16. november 2026

DI-modulet bruger samme lilla medlemsintroduktion som DI-forsiden med rubrikken “Industriens næste træk”, medlemsløfte, logo og direkte indgang til DI-universet. Analyse og opinion prioriteres 8+4 med frie billedkort og større rubrikker. Fem cases bruger forsidenes fælles kortdesign med manchetter og læselinks i 2+3; under 768 px stables kortene.

Visuelt kontrolleret i Safari i lys og mørk visning, inklusive hovedkort og fem casekort. Linket til DI-forsiden er afprøvet. JavaScript-syntaks og diff-kontrol bestået; HTML-kopier og ZIP synkroniseret. Udgivelsescommit: `941046b`.

DI-labels er ensrettet til ét format pr. artikel: Analyse for DI/FORCE, Opinion for Howard Marks og Case for de fem virksomhedshistorier. Samme label bruges på DI-forsiden, i Pro-modulet og i DI-artiklen. Læsetid står særskilt. Visuelt verificeret i Safari. Commit `fd122ca`.

## Varierede casekort · 16. november 2026

De fem DI-cases bruger en fælles renderer i DI-forside og Pro-modul: Arla fremhæver forsøgets standardafvigelse (ca.6→3procent), Viking Malt og Aarsleff bruger eksisterende illustrationsfotos med kredit, Ringsted viser op til14timers tidligere varsling i test, og materialecasen får en dekorativ vektorillustration. Korte manchetter gør kortene lettere at skimme; fulde artikler er bevaret. Ét formatmærke og læsetid adskilt som før. Layoutet bevarer2+3på desktop og én kolonne på mobil.

Safari har vist alle fem kort med billeder, tal og illustration; begge placeringer renderer uden fejl. JavaScript-syntaks og diff-kontrol bestået; leverancer synkroniseret. Commit `61da179`.

De ekstra linjer om redaktionelt samarbejde og AI-godkendelse er fjernet fra artikel- og forsidefødder efter brugerens ønske. Kildeangivelser og den eksisterende markering ved artikelhovedet er bevaret. JavaScript-syntaks og diff-kontrol bestået. Commit `23adc22`.

Hele disclaimerboksen nederst på DI-forsiden er derefter fjernet efter brugerens præcisering. Ubrugt CSS for boksen er fjernet; artikelkilder er bevaret. Syntaks og diff kontrolleret. Commit `cd419bc`.

## Formatering af rubrikker og artikeltekst · 16. november 2026

Alle29visninger har én hovedrubrik. DI-forsidens hovedrubrik er “Industriens næste træk”; hovedhistorien står som h2. Artikelafsnit, boksheads og graftitler bruger h2; faktaboksgrupper bruger h3 med normal casing og fed skrift. Specifik CSS holder boksoverskrifter adskilt fra de store mellemrubrikker. Rubrikvægten er ensrettet til800, og ubrugt Pro-rendering er fjernet.

Notattitlen i Howard Marks-artiklen vises nu med rigtig kursiv. En lille DOM-renderer håndterer flad fed/kursiv i tekst og lister uden at fortolke HTML. Teksten i ARTICLES, BARTICLES, PRO ogBCAT er bevaret. DI-datoens gamle mockupfallback er opdateret til16november2026, så Marks-artiklen ikke er dateret før det omtalte notat. Businessdatoen er uændret.

Kontrol:29visninger,60TOC-knapper,ingen renderfejl eller ugyldige interne links. Separate agentchecks af headingstruktur og kursiv/HTML-escaping samt visuel Safari-kontrol af mellemrubrikker, faktaboksgrupper og notattitel. TreHTML-kopier ogZIP er synkroniseret. Commit `bdff219`.

## Brugerens reference: DI · Nyhedsgrid.html

De stærkeste greb fra den vedlagte fil er indarbejdet i DI-forsiden og DI-modulet i Pro: større medlemsåbning, tydelig topregel og spaltedeler mellem analyse og opinion, billedkreditering under leadfotoet, fælles læsefod samt større rubrikker og mere læsbare manchetter i casegriddet. Diskret billedzoom og pilbevægelse følger brugerens indstilling for reduceret bevægelse. De enkelte formatlabels, fungerende artikelruter og fraværet af disclaimerbokse er bevaret. Referencefilens scripts, tomme links og sammensatte labels er ikke kopieret.

Smalle layouts stables ved 860 px; mastheadens logo og tekst tilpasses ved 600 px. En eksisterende pladsfejl i topmenuen ved mobilbredde er rettet under 480 px. Visuel kontrol er udført i Safari på desktop og med browserzoom, som aktiverer de smalle CSS-layouts. Det er ikke en fuld fysisk enhedstest.

Validering: 29 visninger, 60 afsnitsknapper, ingen fejl i DOM-gennemgangen. Separat teknisk review bekræfter bevarede data, links, h1-struktur og nulstilling af spaltedeler og kolonnespænd på små skærme. Syntaks og diff-kontrol er bestået. HTML-leverancer og ZIP er synkroniseret. Commit `6c8e3e7`.

## Navneensretning og normal visningsstørrelse

Business Pro er nu det gennemgående produktnavn i 14 aktive HTML-sider, i masterkonceptet, i bylines, browserfaner, partnerundersider og morgenbrief. Navnerettelsen er også synkroniseret til fem publicerede Firebase-konceptfiler. Kildernes artikeltekster er bevaret bortset fra produktnavnet. Tekniske filstier er stabile.

45 JavaScript-blokke og serverens syntaks er kontrolleret. Alle 29 mockupvisninger og 60 afsnitsknapper består DOM-kontrollen. Alle 14 aktive sider er hentet fra Railway med HTTP 200 og sammenlignet med de færdige filer. De fem spejlkopier er verificeret byte for byte. Commit da87462.

Browserzoom var efterladt forstørret efter min skærmkontrol og gav den store visning på brugerens screenshot. Den er nulstillet via Safaris Faktisk størrelse, og den publicerede master er kontrolleret visuelt i normal størrelse.
