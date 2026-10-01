# Deep research-prompt: Y Business × DI

Status 1. oktober 2026: erstattet af `DI-deep-research-prompts-v2.md`. Denne version kortlægger DI's rapporter, hvilket ikke længere er formålet. Bevares som reference.

Kædet prompt i to trin. Trin 1 er en scrape-specifikation til dig. Trin 2 er selve deep research-prompten, som modtager scrape-resultatet. Prompten er skrevet modelneutralt (XML-sektioner) og kører i Claude Research, ChatGPT Deep Research og Gemini Deep Research. Dækker gap 1, 2 (kun offentlige kilder) og 5 i `DI-research-brief.md`. Gap 3 og 4 kræver dialog med DI og interviews.

Tilpasning: i Gemini kan modul D udelades, hvis den finder for lidt. I ChatGPT bør scrape-filen vedhæftes som fil, ikke indsat i teksten.

---

## Trin 1 — Scrape-specifikation

Scrape kun offentlige sider. Tjek `robots.txt` og DI's vilkår først, hold lav hastighed (højst én forespørgsel pr. sekund), og gå aldrig bag medlemslogin. Brug materialet internt til analyse.

Startpunkter, alle under danskindustri.dk:

- `/arkiv/analyser/`
- `/di-business/arkiv/nyheder/`
- `/brancher/di-digital/nyhedsarkiv/nyheder/`
- `/vi-radgiver-dig/virksomhedsregler-og-varktojer/ai/indsigter-og-analyser/`
- `/om-di/kontakt-os/presse/arkiv/pressemeddelelser/`
- `/arrangementer/` (kun AI for Alle og andre AI-relaterede)

Periode: 1. oktober 2025 til i dag. Hent også de ti seneste udgivelser før perioden som reference.

Felter pr. side, én række pr. udgivelse (CSV eller JSONL):

| Felt | Indhold |
|---|---|
| url | Fuld adresse |
| titel | Overskrift |
| dato | Publiceringsdato, ISO-format |
| sektion | Hvilken af ovenstående startpunkter |
| forfatter | Byline og afdeling, hvis angivet |
| type | nyhed, analyse, rapport, guide, pressemeddelelse, event, andet |
| ordtal | Antal ord i brødteksten |
| tal_i_teksten | Antal procent- og kronetal i brødteksten |
| pdf_url | Link til vedhæftet rapport eller datafil, ellers tom |
| ekstern_afsender | Navn på medforfatter, sponsor eller kilde, fx Siemens, ellers tom |
| emner | Tags eller overskrifter fra DI's egen kategorisering |
| medlemslogin | ja eller nej, hvis siden kræver login |
| brødtekst | Hele teksten, som ren tekst |

Gem PDF'erne i en mappe med samme filnavn som rækkens url-slug.

---

## Trin 2 — Deep research-prompt

Indsæt scrape-filen mellem `<scrape>`-tagsene. Har du ingen scrape endnu, så slet tagget og lad modellen selv browse. Resultatet bliver mindre fuldstændigt.

```xml
<context>
Y.dk Business er en ny, AI-drevet erhvervsintelligensplatform med uafhængig redaktion, rettet mod danske SMV'er og erhvervsledere. Vi forhandler om en pilot med Dansk Industri (DI). Idéen er, at Y bliver et ekstra lag ovenpå DI's eget udbud: Y læser og vurderer DI's rapporter og analyser og skriver journalistik ud fra dem, så de når flere medlemmer og får større troværdighed.

DI har allerede en egen nyheds- og analyseplatform (DI Business), en digital brancheforening (DI Digital) og AI-initiativet AI for Alle. Før vi går i møde med DI's ledelse, skal vi vide præcis, hvad DI udgiver, hvad DI's ledelse prioriterer, og om de tal, vi vil bygge historier på, holder. Resultatet bruges som beslutningsgrundlag for et ledelsesnotat. Det må derfor ikke indeholde spekulation.
</context>

<instructions>
Du er en erfaren erhvervsanalytiker og faktatjekker med speciale i danske erhvervsorganisationer og medier. Løs fire moduler. Hold dem adskilt i svaret.

Modul A — DI's udgivelsesportefølje.
Kortlæg alle analyser, rapporter, barometre og AI-relaterede udgivelser fra DI, DI Digital og DI Business fra 1. oktober 2025 til i dag. Brug <scrape>, hvis den er vedlagt, og supplér med egen søgning, hvor den har huller. For hver udgivelse angiv: dato, titel, type, afsender (DI eller ekstern partner), om der er tal og datagrundlag (antal respondenter, population, periode), og om rådata eller PDF er offentligt tilgængelige. Marker derefter hver udgivelse som enten politisk (høringssvar, finanslov, positionspapir) eller operationel (guide, barometer, case, event). Afslut med de ti udgivelser, der har størst potentiale for uafhængig journalistisk bearbejdning, og begrund hver med ét til to konkrete forhold i selve udgivelsen. Rangér ikke ud fra din opfattelse af emnet.

Modul B — Faktatjek af tre påstande.
1. DI Digital formidlede i april 2026 en rapport fra Siemens om AI i danske industrivirksomheder. Det hedder, at 37,6 pct. arbejder med AI, op fra 21 pct. i 2024. Find selve Siemens-rapporten. Er de to tal målt med samme spørgsmål, på samme population og med samme definition af "arbejder med AI"? Angiv stikprøvestørrelse og metode for begge år.
2. Svensk industri ligger foran dansk i AI-implementering. Find sammenlignelige tal fra Eurostat, Danmarks Statistik, SCB, AI Sweden eller tilsvarende, som bekræfter eller afkræfter det. Hvis tallene ikke er sammenlignelige, så sig det og forklar hvorfor.
3. DI Business skriver, at Junckers med 150.000 kr. til AI-markedsføring opnåede en værdi på 2,3 mio. kr. Find ud af, hvordan værdien er opgjort ifølge de offentligt tilgængelige kilder, hvad der er medregnet, og hvad der ikke fremgår.

Modul C — DI-ledelsens prioriteter.
Ud fra offentlige kilder fra 2025-2026 (årsberetning, strategi- og positionspapirer, høringssvar, pressemeddelelser, taler og interviews med DI's ledelse): hvilke tre til fem emner prioriterer DI's ledelse inden for AI, digitalisering og medlemsværdi? Giv for hvert emne en direkte henvisning med dato. Angiv også, hvem hos DI der taler på ledelsens vegne om AI og digital politik, og hvilken afdeling der ejer DI Business. Sig det, hvis kilder mangler.

Modul D — Præcedens.
Find dokumenterede eksempler fra Danmark eller Norden på, at en erhvervs- eller brancheorganisation har samarbejdet formelt med et uafhængigt medie eller en redaktion om at formidle organisationens analyser. Beskriv for hvert eksempel samarbejdets form, hvordan uafhængigheden blev sikret, og hvad der er offentligt kendt om resultatet. Er der ingen veldokumenterede eksempler, så skriv det i stedet for at gætte.
</instructions>

<rules>
- Hver påstand skal have en kilde med URL og dato. Påstande uden kilde skrives ikke.
- Mærk hver konklusion som Verificeret (primærkilde fundet), Indikation (kun sekundær kilde eller delvise data) eller Ikke fundet.
- Skeln tydeligt mellem, hvad en rapport selv siger, og hvad DI skriver om den.
- Brug kun primærkilder, når de findes. Nyhedsmedier og bloggere tæller som sekundære kilder.
- Giv ingen anbefalinger om, hvad Y skal gøre, og skriv ikke i marketingsprog. Opgaven er fakta og kortlægning.
- Gæt aldrig tal. Er et tal uklart, så citér kilden og skriv, hvad der er uklart.
</rules>

<scrape>
[INDSÆT SCRAPE-FIL HER ELLER VEDHÆFT]
</scrape>

<output_format>
Skriv på dansk. Struktur: ét afsnit pr. modul med overskrifterne Modul A til D.
Modul A: tabel med kolonnerne dato, titel, type, afsender, tal og datagrundlag, rådata tilgængelig, politisk eller operationel. Derefter en rangeret liste med de ti udgivelser og begrundelse.
Modul B: tre underafsnit. Hvert starter med et ja, nej eller uafklaret og en sætning, derefter dokumentationen.
Modul C: nummereret liste med emne, citat eller henvisning, dato og URL.
Modul D: kort afsnit pr. eksempel, eller én sætning, hvis der ingen er.
Slut med en tabel over alt, der er markeret Indikation eller Ikke fundet, så jeg ved, hvad der mangler.
Maksimalt 2.500 ord ud over tabellerne.
</output_format>
```

---

## Efter kørslen

Læg resultatet i `research/` og send det til mig. Modul B afgør, om historiebud 1 og 3 kan gå videre. Modul A og C afgør, hvilke tre historier der får prøveudkast, og om vi starter med verificeringsmærket eller reguleringsradaren.
