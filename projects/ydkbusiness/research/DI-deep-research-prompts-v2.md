# Deep research-prompts, version 2: Y Business × DI

Erstatter `DI-deep-research-prompt.md`. Udgangspunktet er nu et Y Business-produkt til DI's medlemmer som ekstra lag, ikke en kortlægning af DI's rapporter. Kør de to prompts sideløbende i Claude Research, ChatGPT Deep Research eller Gemini Deep Research. Prompterne nævner ikke Y.

Prompt A (medlemmer, tilbud, distribution) er kørt 1. oktober 2026. Resultatet indgår i `output/DI-produktkoncept.md`. Prompt B (datakilder, konkurrenter, præcedens) er endnu ikke kørt.

---

## Prompt A — Medlemmer, tilbud og distribution

```xml
<context>
En dansk erhvervsplatform med uafhængig redaktion udvikler et abonnementsprodukt til industrivirksomheder, der skal tilbydes som medlemsfordel gennem Dansk Industri (DI). Produktet skal give medlemmerne noget, de ikke får fra DI i forvejen, og det skal være noget, DI selv ønsker at fremhæve over for medlemmerne. Før vi designer produktet, skal vi vide, hvad medlemmerne mangler at vide om deres marked, hvad DI allerede leverer på tjenesteniveau, og hvordan DI normalt løfter tredjepartsprodukter ud til medlemmerne, og hvorfor. Resultatet er beslutningsgrundlag for produktdesign og et forslag til DI's ledelse og må ikke indeholde spekulation.
</context>

<instructions>
Du er en erfaren analytiker med speciale i danske erhvervsorganisationer, SMV'ers informationsadfærd og medlemsværdi. Løs tre moduler. Hold dem adskilt i svaret.

Modul A — Medlemmerne og deres informationsbehov.
1. Beskriv DI's medlemssammensætning: antal medlemsvirksomheder, fordeling på virksomhedsstørrelse og brancher, og hvordan kontingentet beregnes. Brug DI's egne oplysninger.
2. Kortlæg dokumenterede informationsbehov hos industrivirksomheder på 20-250 ansatte: hvordan de i dag følger kunder, konkurrenter, leverandører, eksportmarkeder, udbud og regulering, hvilke kilder de bruger, hvor meget tid det tager, og hvor de selv siger, at de er blinde. Brug undersøgelser fra fx Danmarks Statistik, Teknologisk Institut, Industriens Fond, SMVdanmark, Dansk Erhverv, EU-Kommissionens SMV-undersøgelser, Udenrigsministeriet og relevant akademisk forskning. Rangér de ti stærkest dokumenterede behov efter bevisstyrke. Er der ingen data for et tema, så skriv det.

Modul B — Hvad medlemmerne allerede får fra DI.
Kortlæg DI's medlemstilbud på tjenesteniveau, ikke rapport for rapport: rådgivningsområderne under "Vi rådgiver dig", netværk, nyhedsbreve, DI Business, kurser og arrangementer, analyser som kategori, og medlemsfordele. For hver kategori angiv, hvad medlemmet får, om det er gratis eller kontingentbetalt eller særskilt betalt, og hvad kategorien ikke dækker. Vurder særskilt, om DI i dag leverer virksomhedsspecifik markedsinformation, som overvågning af en virksomheds egne konkurrenter, kunder, udbud eller eksportmarkeder. Svar ja, nej eller delvist med kilde.

Modul C — Distribution og DI's incitament.
1. Hvordan løfter DI tredjepartsprodukter og -tjenester ud til medlemmerne? Dæk medlemsfordele, partneraftaler, rabatordninger, sponsorater og samarbejder med private udbydere (fx inden for software, forsikring, energi eller juridisk bistand). For hvert eksempel angiv: udbyder, form (rabat, co-branding, white label, anbefaling), hvem hos DI der ejer ordningen, vilkår for at blive partner, og hvad DI selv får ud af det, så vidt det er offentligt kendt.
2. Hvad siger DI offentligt om medlemsstrategi, medlemsværdi, fastholdelse og rekruttering de seneste to år?
3. Er der dokumenterede betænkeligheder hos DI eller dets medlemmer ved at fremhæve kommercielle produkter fra tredjepart, fx krav til neutralitet, brug af DI's navn eller datadeling?
4. Find eksempler fra andre nordiske eller europæiske brancheorganisationer, der har givet medlemmerne en informations- eller overvågningstjeneste fra en uafhængig udbyder som medlemsfordel. Beskriv for hvert eksempel, hvem der betaler, hvordan det distribueres, og hvad der er kendt om brug og resultater. Er der ingen, så skriv det.
</instructions>

<rules>
- Hver påstand skal have en kilde med URL og dato. Påstande uden kilde skrives ikke.
- Mærk hver konklusion som Verificeret (primærkilde fundet), Indikation (kun sekundær kilde eller delvise data) eller Ikke fundet.
- Brug kun primærkilder, hvor de findes. Konsulentblogs og SEO-sider tæller som svage sekundære kilder og må ikke mærkes Verificeret.
- Skeln mellem, hvad DI selv skriver, og hvad tredjepart skriver om DI.
- Giv ingen anbefalinger, og skriv ikke i marketingsprog. Opgaven er fakta og kortlægning.
- Gæt aldrig tal, priser eller vilkår. Er noget uklart, så citér kilden og skriv, hvad der er uklart.
</rules>

<output_format>
Skriv på dansk. Ét afsnit pr. modul med overskrifterne Modul A til C.
Modul A: kort afsnit om medlemssammensætning, derefter en rangeret tabel over de ti behov med kolonnerne behov, bevis, kilde og dato, status.
Modul B: tabel med kolonnerne kategori, hvad medlemmet får, betaling, dækker ikke. Afslut med svaret ja, nej eller delvist på virksomhedsspecifik markedsinformation.
Modul C: tabel over tredjepartsordninger med kolonnerne udbyder, form, ejer hos DI, vilkår, hvad DI får. Derefter korte afsnit om medlemsstrategi, betænkeligheder og eksempler fra andre organisationer, eller én sætning, hvis der ingen er.
Slut med en tabel over alt, der er markeret Indikation eller Ikke fundet.
Maksimalt 2.500 ord ud over tabellerne.
</output_format>
```

---

## Prompt B — Datakilder, eksisterende produkter og nordisk præcedens

```xml
<context>
En dansk erhvervsplatform planlægger et abonnementsprodukt til industrivirksomheder med 20-250 ansatte. Produktet leverer hver morgen signaler om virksomhedens eget marked: konkurrenters og kunders regnskaber, direktørskift og jobopslag, offentlige udbud, eksportmarkedsnyt og regulering. Redaktionen forklarer, hvad signalerne betyder, og platformen tilbydes via en brancheorganisation som medlemsfordel.

Før produktet kan specificeres og prissættes, skal vi vide tre ting: hvilke offentlige data vi må bygge på, hvad industrivirksomheder allerede kan købe i dag, og om nogen brancheorganisation har gjort noget tilsvarende. Resultatet bruges som beslutningsgrundlag for en teknisk specifikation og et prisforslag. Det må derfor ikke indeholde spekulation.
</context>

<instructions>
Du er en erfaren analytiker med speciale i dansk og europæisk erhvervsdata, markedsovervågning og medie- og informationsprodukter. Løs tre moduler. Hold dem adskilt i svaret.

Modul A — Datakilder.
Kortlæg, hvilke offentlige og halvoffentlige datakilder der kan give signaler om en dansk industrivirksomheds marked. Start med: CVR og regnskaber (Erhvervsstyrelsen/Virk), udbud (udbud.dk, TED), udenrigshandel og eksport (Danmarks Statistik, Eurostat Comext, Toldstyrelsen), offentlige høringer (Folketinget, høringsportalen, EU-Kommissionens Have Your Say), lovgivning (Retsinformation, EUR-Lex), jobopslag (åbne kilder og vilkår for brug), og patenter og varemærker. Tilføj andre kilder, du finder, hvis de er relevante og åbne. For hver kilde angiv: hvad der er i den, opdateringsfrekvens, adgangsform (åben, API, aftale eller betalt), pris, licens eller vilkår for videreanvendelse i et betalt, kommercielt abonnementsprodukt, og om kilden indeholder personoplysninger (fx direktørers navne), som kræver GDPR-vurdering. Marker, hvad der kræver juridisk vurdering, før det bruges.

Modul B — Eksisterende produkter og efterspørgsel.
Kortlæg, hvilke betalte produkter en dansk industrivirksomhed på 20-250 ansatte kan købe til medie-, marked-, konkurrent- og virksomhedsovervågning i dag. Dæk som minimum Retriever, Lasso, Meltwater og de mest brugte leverandører af virksomhedsdata og udbudsovervågning i Danmark, og tilføj andre, du finder. For hvert produkt angiv: offentligt oplyst pris (med dato og om det er listepris eller tilbud), målgruppe, hvad det dækker, og hvad det ikke dækker for en industrivirksomhed i forhold til konkurrent-, kunde-, udbuds- og eksportmarkedssignaler. Find derefter dokumenterede undersøgelser af, hvor mange SMV'er og industrivirksomheder der bruger sådanne værktøjer, hvad de betaler for informationsprodukter, og hvilke behov de selv angiver som uopfyldte. Er der ingen undersøgelser, så skriv det.

Modul C — Præcedens i Norden.
Find dokumenterede eksempler fra Danmark, Sverige, Norge og Finland på, at en brancheorganisation eller en erhvervsorganisation giver medlemmerne markedsintelligens ud over rådgivning, netværk og juridisk støtte. Tænk på fx konkurrent- eller markedsdata, eksportintelligens, udbudsovervågning eller personlige nyhedsbreve. Se blandt andet på Svenskt Näringsliv, Teknikföretagen, Norsk Industri, Teknologiindustrien og Teknologiateollisuus og tilsvarende danske organisationer. For hvert eksempel angiv: hvad medlemmerne får, om det er gratis eller betalt, om det drives af organisationen selv eller af en partner, og hvad der er offentligt kendt om brug og resultater. Er der ingen veldokumenterede eksempler, så skriv det.
</instructions>

<rules>
- Hver påstand skal have en kilde med URL og dato. Påstande uden kilde skrives ikke.
- Mærk hver konklusion som Verificeret (primærkilde fundet), Indikation (kun sekundær kilde eller delvise data) eller Ikke fundet.
- Skeln mellem listepris, tilbudspris og skønnet pris. Skriv altid prisdatoen.
- Brug primærkilder (myndigheders og leverandørers egne sider, licens- og vilkårstekster), når de findes. Nyhedsmedier og bloggere tæller som sekundære kilder.
- Vurder ikke juridisk. Skriv, hvad vilkårene siger, og marker, hvad der kræver en jurists vurdering.
- Giv ingen anbefalinger, og skriv ikke i marketingsprog. Opgaven er fakta og kortlægning.
- Gæt aldrig tal, priser eller vilkår. Er noget uklart, så citér kilden og skriv, hvad der er uklart.
</rules>

<output_format>
Skriv på dansk. Ét afsnit pr. modul med overskrifterne Modul A til C.
Modul A: tabel med kolonnerne kilde, indhold, opdatering, adgangsform, pris, videreanvendelse i betalt produkt, personoplysninger, status (Verificeret, Indikation eller Ikke fundet). Derefter en kort liste over kilder, der kræver juridisk vurdering.
Modul B: tabel over produkter med kolonnerne produkt, pris og dato, målgruppe, dækker, dækker ikke for industri. Derefter en kort opsummering af, hvad undersøgelserne viser om efterspørgsel og uopfyldte behov.
Modul C: kort afsnit pr. eksempel, eller én sætning, hvis der ingen er.
Slut med en tabel over alt, der er markeret Indikation eller Ikke fundet.
Maksimalt 2.500 ord ud over tabellerne.
</output_format>
```
