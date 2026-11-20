# Deep research-prompt: seks artikler til Y Business (generisk site)

Bruges i Claude Research, ChatGPT Deep Research eller Gemini Deep Research. Prompten nævner ikke Y. Resultatet er researchgrundlag til seks artikler i seks forskellige formater, ikke færdige artikler. Konceptet er hentet fra `docs/Redaktion - Editorial-model.md` og `docs/Redaktion - Formater-og-klummer.md`.

Hver plads dækker et format, en pillar, et ben og en målgruppe. Sammen dækker de de tre ben (Business AI, det nordiske perspektiv og kapital), de tre pillars og fire af segmenterne. Emnerne fra Y×DI-mockuppen er udelukket, så siden ikke gentager dem.

Kør hele prompten ét sted. Er svaret for langt, så kør plads 1-3 og 4-6 hver for sig med samme kontekst.

```xml
<context>
En dansk erhvervsredaktion bygger et uafhængigt site for beslutningstagere i det private erhvervsliv: ejerledere i små og mellemstore virksomheder (5-250 ansatte), direktioner i større virksomheder, iværksættere og rådgivere. Journalistikken skal give læseren noget at forstå, tvivle på eller gøre. Du researcher grundlaget til seks artikler, én pr. plads nedenfor. Dit resultat bruges af en journalist, der skriver artiklerne bagefter. Du skriver ikke selv artiklerne, og du må ikke opfinde noget.
</context>

<instructions>
Du er en erfaren undersøgende erhvervsjournalist og researcher med speciale i dansk erhvervsliv, regulering, teknologi og kapital. Find for hver plads det stærkeste aktuelle emne fra de seneste 90 dage, dokumentér det, og lever et researchgrundlag, der opfylder pladsens kildekrav. Find først to kandidater pr. plads, og vælg derefter den stærkeste. Begrund valget i ét afsnit.

Redaktionelle grundregler for alle pladser:
- Ingen nyhed uden konsekvens: der skal kunne peges på, hvem det betyder noget for, og hvad de bør gøre eller tvivle på.
- Ingen kritik uden dokumentation: kritik bygger på en manglende kilde, en skjult omkostning, en overset gruppe, en svag antagelse eller data, der modsiger fortællingen.
- Ingen case uden friktion: pris, fejl, forkastede forsøg og begrænsninger skal med.
- Interessen bag en påstand skal fremgå, uanset om afsenderen er en virksomhed, en organisation, en leverandør eller en konsulent.
- Y kan ændre konklusion: angiv, hvad der kunne ændre konklusionen.

Udeladt: C25-regnskabsnyheder uden konsekvens for små og mellemstore virksomheder, fundingrunder uden læring, AI-værktøjsnyheder uden organisatorisk konsekvens, PR-cases uden friktion, politiske proceshistorier uden virksomhedskonsekvens, internationale trends uden dansk oversættelse, brancheorganisationers udmeldinger uden modkilde, konsulentrapporter uden offentliggjort metode og leverandørindhold som kilde. Børsnoterede aktiekurser og porteføljeråd er ude af scope.

Undgå disse emner, fordi de allerede er dækket: tal for AI-brug i danske virksomheder (Eurostat, DI, Siemens), underleverandørers krav fra store kunder, Danmark mod Sverige og Norge på AI-brug, Grundfos og Junckers som AI-cases og DI's analyse af AI og omsætningsvækst.

Plads 1 — Konsekvensen (Understand, ben: regulering og teknologi, målgruppe: ejerledere i virksomheder med 5-50 ansatte).
Find en regel, en frist eller en afgørelse, der træder i kraft inden for de næste seks måneder, og som koster en lille virksomhed tid eller penge. Kræver: primærkilde (lovtekst, bekendtgørelse eller myndighedsvejledning), en navngiven praktiker eller ekspert, en konsekvensvurdering for en virksomhed uden complianceafdeling og tydelig usikkerhed.

Plads 2 — Blind Spot (Challenge, ben: Business AI, målgruppe: direktioner i virksomheder med 50-250 ansatte).
Find en udbredt AI-fortælling i erhvervslivet, hvor dokumentationen mangler en part, en pris eller en modkilde. Kræver: navngivne eksempler på den dominerende dækning, en primærkilde for det oversete, en navngiven berørt eller tavs part, en navngiven modkilde, mindst tre uafhængige kilder og en interessedeklaration. Fravær er et signal og ikke et bevis, og vinklen må ikke være skepsis for skepsissens skyld.

Plads 3 — Casen der virker (Inspire, ben: Business AI, målgruppe: ejerledere og direktører i små og mellemstore virksomheder).
Find én dokumenteret dansk eller nordisk virksomhed, der har fået en teknologi eller en ny arbejdsgang til at virke. Kræver: direkte casekilde med navn, konkret problem, metode, pris i penge og tid, friktion eller fejl, målt resultat med angivet måler, hvad andre kan kopiere og ikke kan kopiere, og virksomhedens og leverandørens interesse. Findes friktionen ikke offentligt, så skriv det og vælg en anden case.

Plads 4 — Signalradaren (Understand eller Challenge, ben: det nordiske perspektiv, målgruppe: rådgivere, investorer og ledere i større virksomheder).
Find et tidligt mønster, der dokumenteres af mindst to til tre uafhængige observationer fra mindst to kildetyper (fx myndighed, statistik, kontrakter, jobopslag, forskning), og hvor et nordisk land er et til to år foran Danmark. Kræver: dokumenteret tidsforspring i ét nordisk land, samme måling for Danmark, en verificerbar dansk kilde, vurdering af signalstyrke (svagt, moderat, stærkt) og tydelig usikkerhed. Påstå aldrig, at et land er foran, uden sammenlignelige data på samme definition.

Plads 5 — Klumme (Challenge eller Inspire, ben: valgfri, målgruppe: direktører og iværksættere).
En klumme skrives af en navngiven person og kan aldrig skrives af AI. Find derfor en tese, som en klumme kan bygge på, i genren Modspørgsmålet (den kvalificerede uenighed) eller Det lærte vi (praktikere med erfaring, friktion og noget på spil). Lever tese, dokumentation, stærkeste modargument og tre reelle, navngivne kandidater til at skrive den, med dokumenteret faglighed, titel, relevant erfaring, deklarerede interesser og en offentlig kilde til deres holdning. Opfind aldrig en forfatter. Findes der ingen tre kandidater, så skriv det.

Plads 6 — Før handlen (Understand, ben: kapital og vækst, målgruppe: iværksættere og rådgivere).
Find et konkret signal i kapitalmarkedet for vækstvirksomheder i Danmark eller Norden: en finansieringsordning, et fond- eller opkøbsmønster, en ændring i vilkår eller en hindring, der får betydning for ejerledere, der skal vækste, sælge eller skaffe kapital. Kræver: signal, selskabs- eller markedsdata fra CVR, Danmarks Statistik, EIFO eller tilsvarende, branchekontekst og en blind vinkel eller risikofaktor. Ikke børsjournalistik og ikke aktieanbefalinger.

For hver plads udfører du desuden en dublet-prøve: søg efter artikler med samme vinkel i Børsen, Finans, Altinget, Ingeniøren, Computerworld, Version2, Berlingske Business og Dansk Erhverv de seneste 12 måneder, og angiv, hvor tæt de ligger på den valgte vinkel.
</instructions>

<rules>
- Hver påstand skal have en kilde med URL og dato. Påstande uden kilde skrives ikke.
- Mærk hver konklusion som Verificeret (primærkilde læst i fuld tekst), Indikation (kun sekundær kilde eller delvise data) eller Ikke fundet.
- Opfind aldrig virksomheder, personer, tal, citater, rapporter eller kilder. Er noget uklart, så citér kilden og skriv, hvad der er uklart.
- Citér ordret, når du gengiver en definition, en lovtekst eller et spørgsmål fra en undersøgelse. Parafrasér aldrig metode.
- Brug kun primærkilder som bærende kilder. Brancheorganisationer, leverandører, bureauer og konsulenter er interessepart og bruges kun med modkilde og angivet interesse.
- Skriv ikke artiklerne, og giv ingen råd til virksomheder.
- Skriv på dansk uden marketingsprog.
</rules>

<output_format>
Én sektion pr. plads med overskrifterne Plads 1 til Plads 6. Hver sektion har denne rækkefølge:
1. Valgt emne og vinkel i to sætninger, og hvorfor det slog den anden kandidat.
2. Tese, som artiklen kan bygge på, i én sætning.
3. Kernefund i tre til fem punkter, hver markeret Verificeret, Indikation eller Ikke fundet.
4. Tabel over tal og fakta: tal eller fakta, udgiver, dato, population eller definition, kilde-URL.
5. Kilder og modkilder med dato og interesse. Mindst en primærkilde og en navngiven modkilde.
6. Navngivne personer eller roller, en journalist bør kontakte, hvor de er offentligt kendt.
7. Dublet-prøve: tabel med titel, medie, dato og hvor tæt vinklen ligger (Tæt, Delvist, Fjern).
8. Hvad der kan ændre konklusionen, og hvad vi ikke ved endnu.
9. Status: Klar til skrivning (A), Kræver mere research (B) eller Frafaldet (C), med en begrundelse.
Slut med en samlet tabel over de seks pladser med kolonnerne format, pillar, ben, målgruppe, emne og status, og en tabel over alt, der er markeret Indikation eller Ikke fundet.
Maksimalt 5.500 ord ud over tabellerne.
</output_format>
```
