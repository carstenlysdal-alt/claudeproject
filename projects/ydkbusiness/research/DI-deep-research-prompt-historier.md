# Deep research-prompt: seks historier til Y × DI (version 2)

Bruges i Claude Research, ChatGPT Deep Research eller Gemini Deep Research. Prompten nævner ikke Y. Resultatet er researchgrundlag til de seks første artikler i Y×DI-formaterne, ikke færdige artikler. Tal og navne i prompten stammer fra DI's egne sider den 6. oktober 2026 og er ikke verificeret.

Ændringer fra version 1: rækkefølgen sætter de historier først, hvor læseren får mest og DI er kontekst (nu historie 1-3). De to historier, der handler om DI's egne tal og cases, er omskrevet fra afprøvning til metodeforståelse (historie 5 og 6). Hver historie har en dublet-prøve mod andre medier, og hver slutter med, hvad en industrileder kan bruge den til.

Kør hele prompten ét sted. Er svaret for langt, så kør historie 1-3 og 4-6 hver for sig med samme kontekst.

```xml
<context>
En dansk erhvervsredaktion forbereder seks uafhængige analyseartikler til industriledere. Artiklerne skal give læseren mere, end brancheorganisationer og leverandører selv leverer: tal der kan sammenlignes, perspektiv fra uafhængige data, dokumenteret friktion i praksis og nordiske spejle. Dansk Industri (DI) og dets analyser er kontekst og anledning, og i to af historierne også genstand, men DI må aldrig være enkeltkilde til en påstand. Dit resultat er researchgrundlag for en journalist. Det må ikke indeholde spekulation, og du skriver ikke artiklerne.
</context>

<instructions>
Du er en erfaren undersøgende erhvervsjournalist og dataanalytiker med speciale i dansk og europæisk virksomhedsstatistik. Løs seks historier i den angivne rækkefølge og hold dem adskilt. For hver historie læser du først de angivne primærkilder i fuld tekst og finder derefter uafhængige kilder. Mangler en primærkilde eller kan den ikke læses i fuld tekst, så skriv det og markér konklusionen som Indikation.

For hver historie skal du desuden udføre en dublet-prøve: søg på Børsen, Finans, Ingeniøren, Altinget, Computerworld, Dansk Erhverv og DI's egne sider efter artikler med samme vinkel de seneste 12 måneder, og angiv titel, medie, dato og hvor tæt vinklen ligger på den foreslåede.

Historie 1 — Tre tal for AI-brug, tre definitioner.
DI har offentliggjort flere tal for AI-brug: "7 ud af 10 virksomheder bruger generativ AI" (DI Future of Work, juni 2025, https://www.danskindustri.dk/arkiv/analyser/2025/6/7-ud-af-10-virksomheder-bruger-generativ-AI/), 37,6 pct. i industrien arbejder aktivt med industriel AI mod 21 pct. i 2024 (Siemens-rapporten, formidlet af DI Digital i april 2026, https://www.danskindustri.dk/brancher/di-digital/nyhedsarkiv/nyheder/2026/4/ny-rapport-ai-er-noglen-til-succes-i-danske-industrivirksomheder/), og fordelingen i en DI-analyse fra september 2026 (10 pct. næsten alle afdelinger, 25 pct. udvalgte afdelinger, 45 pct. ad hoc, 19 pct. ingen, https://www.danskindustri.dk/arkiv/analyser/2026/09/ai-virksomheder-har-oget-bade-vakst-og-beskaftigelse/).
- Find de tre kilder og angiv for hver: udgiver, dato, antal besvarelser, population, præcis spørgsmålsformulering og definition af AI-brug.
- Hvilke tal kan sammenlignes, og hvilke kan ikke? Er 21 pct. i 2024 og 37,6 pct. i 2026 målt ens og på samme population?
- Hvad viser Eurostat (virksomheders brug af AI, efter størrelse, hvor tilgængeligt) og Danmarks Statistik for Danmark på en sammenlignelig definition?
- Giv en tabel, der stiller de tre tal og Eurostat-tallet ved siden af hinanden med definitioner.

Historie 2 — Den digitale underleverandørfælde.
Mellemstore industrivirksomheder risikerer at blive underleverandører til store kunder, der stiller krav om AI-compliance, dokumentation og dataadgang.
- Hvilke krav fra EU's AI-forordning, CSRD, CSDDD og cybersikkerhedsregler forplanter sig konkret fra store kunder til underleverandører i kontrakter? Find juridiske analyser fra advokathuse, myndigheder eller forskning med dato.
- Find dokumenterede eksempler på kontraktvilkår, leverandørkodeks eller krav, store industrivirksomheder stiller til leverandører om AI, data eller sikkerhed.
- Find tal for, hvor mange danske SMV'er der oplever kundekrav om dokumentation, og hvad det koster dem.
- Hvilke navngivne danske underleverandører eller organisationer har udtalt sig offentligt om det? DI har guides og en side om digital suverænitet. Angiv, hvad de dækker, og hvad der ikke er dækket.

Historie 3 — Danmark, Sverige og Norge: AI i industrien.
- Hvad viser Eurostat og de nationale statistikbureauer (Danmarks Statistik, SCB, SSB) om AI-brug i virksomheder, helst i industrien, for de tre lande på ens definition og i samme år?
- DI Digital omtaler i februar 2026 en rapport, der kalder Danmark en digital frontløber (https://www.danskindustri.dk/brancher/di-digital/nyhedsarkiv/nyheder/2026/2/ny-rapport-om-digital-udvikling-cementerer-danmark-som-digital-frontlober-pa-europaisk-jord/). Hvad måler den, og hvad siger sammenlignelige data om de tre lande? Gengiv, hvor Danmark ligger bedst, og hvor ikke.
- Hvilke nordiske kilder dokumenterer konkrete mønstre med tidsforspring (AI Sweden, SCB, ETLA, nationale ministerier)? Angiv dato, resultat og om det kan sammenlignes med Danmark.
- Understøtter data ikke, at et land er foran, så skriv det.

Historie 4 — Applied AI i industrien: pris og friktion.
Find dokumenterede danske eller nordiske industrivirksomheder, der har brugt AI i drift og offentligt har fortalt om omkostninger, tid, fejlslagne forsøg, ændrede arbejdsgange eller lukkede projekter.
- Giv op til otte eksempler. For hvert: virksomhed, anvendelse, leverandør, investering, tid, målt resultat, hvem der har målt, dokumenteret friktion eller fejl, kilde og dato.
- Skeln mellem sager med dokumenteret friktion og sager uden. De sidste er ikke relevante og skal kun nævnes i én sætning.
- Angiv for hver sag, om en navngiven projektejer har udtalt sig offentligt, så en journalist kan kontakte vedkommende.
- Hvis Junckers og bureauet No Zebra er blandt eksemplerne (se historie 6), så markér dem særskilt.

Historie 5 — AI-vækst: sådan bør tallet læses.
DI's analyse "AI-virksomheder har øget både vækst og beskæftigelse" (se URL i historie 1, september 2026) angiver ifølge DI's side 6,5 pct. højere omsætningsvækst 2021-2025 for virksomheder med systematisk AI-brug og 13,3 pct. ved intensiv brug.
- Beskriv metoden og populationen: Danmarks Statistiks registre, DI's survey fra juni 2026, antal virksomheder, svarprocent, population (virksomheder med over 5 ansatte, der kan matches med registerdata), definition af systematisk og intensiv brug og konstruktion af kontrolgruppen.
- Hvad siger analysen selv om kausalitet? Citér ordret.
- Hvilken uafhængig dansk eller international forskning belyser sammenhængen mellem AI-brug og virksomhedsvækst? Dæk omvendt kausalitet og selektion, og angiv hvad der taler for og imod.
- Hvilken andel af danske industrivirksomheder (antal og beskæftigelse) falder uden for populationen, ifølge Danmarks Statistik?
- Formulér dit fund som en metodeforståelse (hvad tallet viser, og hvad det ikke viser), ikke som en vurdering af, om afsenderen har ret.

Historie 6 — Junckers og 2,3 mio. kr.: hvad tallet består af.
DI Business (https://www.danskindustri.dk/di-business/arkiv/nyheder/2026/1/150.000-kr.-til-ai-giver-junckers-vardi-for-23-mio.-kr, 21. januar 2026) og DI's casearkiv (https://www.danskindustri.dk/vi-radgiver-dig/virksomhedsregler-og-varktojer/ai/cases-og-eksempler/casearkiv-ai-for-alle/sadan-skabte-junckers-og-no-zebra-vakst-med-ai/) beskriver et AI-projekt hos Junckers med bureauet No Zebra: 150.000 kr. investeret, ca. 400.000 kr. i sparet annoncetrafik og en værdi på 2,3 mio. kr. ved fuld skalering.
- Hvordan er hvert tal regnet, og hvilke er realiserede, og hvilke er estimerede? Hvem har regnet dem?
- Hvad er offentligt kendt om projektet andre steder: No Zebras og Junckers' egen omtale, pressedækning, konferenceoplæg? Hvad står der om tid, omkostninger, fejl og ændrede arbejdsgange?
- Hvad er No Zebras og Junckers' kommercielle interesse i fortællingen?
- Formulér dit fund som en forklaring af, hvad tallet består af og hvad der mangler for at kunne kopiere casen, ikke som en vurdering af, om afsenderen har overdrevet.
</instructions>

<rules>
- Hver påstand skal have en kilde med URL og dato. Påstande uden kilde skrives ikke.
- Mærk hver konklusion som Verificeret (primærkilde læst i fuld tekst), Indikation (kun sekundær kilde eller delvise data) eller Ikke fundet.
- Tallene og påstandene i denne prompt stammer fra opsummeringer af DI's sider og er ikke verificeret. Kontrollér dem mod originalen og angiv eventuelle afvigelser.
- DI, brancheorganisationer, leverandører og bureauer er interessepart. Brug dem som anledning og kontekst, aldrig som enkeltkilde, og angiv altid kildens interesse.
- Skeln mellem et metodeforbehold (analysen har en begrænsning, som den selv oplyser eller som er tydelig af metoden) og en fejl (tallet er forkert). Skriv aldrig fejl uden dokumentation fra en uafhængig kilde.
- Citér ordret, når du gengiver en definition, et spørgsmål eller en konklusion. Parafrasér aldrig metode og definitioner.
- Gæt aldrig tal, definitioner eller sammenhænge. Er noget uklart, så citér kilden og skriv, hvad der er uklart.
- Opfind aldrig navne på virksomheder, personer eller rapporter.
- Vurder ikke motiver hos DI eller andre afsendere. Beskriv, hvad tallene og metoderne viser.
- Giv ingen anbefalinger, og skriv ikke artiklerne.
</rules>

<output_format>
Skriv på dansk. Ét afsnit pr. historie med overskrifterne Historie 1 til Historie 6. Hver historie har denne rækkefølge:
1. Kernefund i tre til fem punkter, hver markeret Verificeret, Indikation eller Ikke fundet.
2. Tabel over tal og definitioner: tal, udgiver, dato, population, definition, kilde-URL.
3. Uafhængige kilder og modkilder med dato og interesse.
4. Dublet-prøve: tabel med titel, medie, dato og hvor tæt vinklen ligger på den foreslåede (Tæt, Delvist, Fjern). Findes ingen, så skriv det.
5. Det, der mangler, og hvem en journalist bør kontakte (navngivne personer eller roller, hvor de er offentligt kendt).
6. Hvad en industrileder kan bruge historien til: to til tre konkrete spørgsmål, læseren kan tage med til ledelse eller bestyrelse.
7. Én sætning om, hvorvidt historien står, falder eller skal omformuleres, baseret på fundene.
Slut med en samlet tabel over alt, der er markeret Indikation eller Ikke fundet.
Maksimalt 4.500 ord ud over tabellerne.
</output_format>
```
