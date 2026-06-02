# Mødeforberedelse — Supertrends
**Dato:** 3. juni 2026
**Formål:** Teknisk afdækning — kapabiliteter, API, leveringsmodel og konfigurationsmuligheder til Y.dk Business
**Varighed:** 60-90 minutter

---

## Hvad vi ved inden mødet

Supertrends er en schweizisk platform grundlagt 2019 af Lars Tvede. Platformen er del af ejerkredsen bag Y.dk Business og stilles til rådighed til intern kostpris — den skal ikke prisevalueres som ekstern leverandør.

| Kapabilitet | Status |
|---|---|
| Crawling | 5.000 kilder, 40+ sprog, 24/7 |
| Taksonomi | 170 brancher, 150 lande — trends, innovationer, milepæle, selskaber |
| Outputformater | Dashboard, tidslinje, selskabsprofiler, trend cards, artikler, briefs, rapporter, pre-recorded podcasts |
| Redaktionelt lag | Menneskelig validering oven på AI-scanning |
| API | Dokumenteret adgang via Atlas Global Macro-integration |

**Kendte begrænsninger (verificeret via research):**
- Output er næsten udelukkende på engelsk
- Konfigureret til langsigtet global trend intelligence — investor-orienteret, ikke dagsaktuelle SMV-nyheder
- Ingen on-demand brief-generering — al output følger periodiske redaktionelle cyklusser
- Ingen dynamisk TTS — kun pre-recorded podcasts

**Arkitekturbeslutning der afventer dette møde:**

| Valg | Beskrivelse |
|---|---|
| **A — Rekonfigurér Supertrends** | Lars Tvede konfigurerer motoren til dansk SMV-output og on-demand queries |
| **B — LLM-lag oven på API** | Y.dk bygger selvstændigt LLM-lag der trækker rådata fra Supertrends API |

Valg A er foretrukket. Valg B er fallback. Beslutning skal foreligge inden udgangen af juni-uge 2.

---

## Hvad vi bygger — præmis for mødet

Y.dk Business er en AI-drevet erhvervsplatform der erstatter kludetæppet af Børsen + Retriever + LassoX i ét virksomhedsabonnement til 5.000 kr./år. Supertrends er rygraden i intelligence-laget. Platformen leverer fem sammenhængende produktlag:

| Lag | Hvad brugeren får | Supertrends' forventede rolle |
|---|---|---|
| **Erhvervsnyheder** | Personaliseret nyhedsfeed + morgenbrief kl. 06:00 dagligt (tekst + lyd) | Primær datakilde — konfigureret til dagsaktuelle SMV-nyheder |
| **Markedsovervågning** | Watchlist på konkurrenter, søgeord, reguleringsemner — alerts ved hits | Crawling og signaldetektering — suppleret med direkte regulatory-API'er |
| **Branchetrends** | Ugentlig trendrapport med Emerging/Peak/Fading-klassificering | Kerne-kapabilitet — 5.000 kilders trend-aggregering |
| **B2B-briefs** | On-demand situationsbriefs genereret på under 60 sekunder | Rådata-leverandør — on-demand output kræver enten rekonfiguration eller LLM-lag |
| **C-level indhold** | Dybdegående analyser, research og credibel ekspertopinion | Sekundær rolle — suppleres med redaktionel produktion |

Redaktionel DNA: tre indholdstilstande — **Understand** (hvad sker der og hvorfor), **Challenge** (modpolen og den manglende kilde), **Inspire** (løsningen der virker). Supertrends skal enten understøtte denne klassificering eller levere rådata til at vi kan anvende den.

Formlen er: *AI producerer, mennesker verificerer.* Supertrends er AI-laget. Det redaktionelle verificeringslag er Y.dk's.

---

## Mødestruktur og spørgsmål

### 1. Sprog og output (kritisk)

- Kan API'et levere råt dansksproget indhold direkte — eller er alt output på engelsk?
- Kan outputsproget konfigureres per deployment eller per bruger?
- Hvis rådata er flersprogede og output er engelsk: sker oversættelsen i motoren eller i et separat lag?
- Kan vi få adgang til det rå, ikke-oversatte kildemateriale via API?

---

### 2. On-demand kapabilitet (kritisk)

- Understøtter motoren on-demand queries — dvs. brugeriniterede forespørgsler med svar under 60 sekunder?
- Hvad er den reelle latenstid fra query til response i dag?
- Kan platformen generere situationsbriefs om en specifik virksomhed, branche eller reguleringsemne on-demand?
- Hvis on-demand ikke er understøttet i dag: hvad kræver det at bygge det, og er det inden for roadmap?

---

### 3. Nyheds- og SMV-relevans

- Hvad er crawl-to-publish latenstid — fra kildehændelse til tilgængeligt i API?
- Er platformen konfigureret til realtidsnyheder eller trend intelligence med længere tidshorisont?
- Kan den rekonfigureres til at levere dagsaktuelle danske SMV-nyheder?
- Hvad er den korteste overvågningsgranularitet: søgeord, virksomhedsnavn, reguleringsemne, geografisk marked?
- Dækker taksonomien danske SMV-sektorer tilstrækkeligt — eller er dækningen primært global/enterprise?

---

### 4. Overvågning og alerts

- Kan individuelle brugere konfigurere egne watchlists: konkurrenter, søgeord, reguleringsemner?
- Hvad er alert-latenstiden fra kildebegivenhed til notifikation?
- Kan vi integrere direkte regulatory-datakilder i overvågningen: Retsinformation, EUR-Lex, Folketing ODA, udbud.dk?
- Hvis nej: kan vi sende data fra disse kilder ind i motoren via API?
- Hvad er den tekniske grænse for antal watchlist-elementer per bruger uden performance-forringelse?

---

### 5. API og integration

- Hvilken API-arkitektur: REST? GraphQL? Webhooks?
- Autentificering: API-nøgle, OAuth 2.0 eller andet?
- Rate limits per endpoint — konkrete tal?
- Dataformater: JSON, XML eller andet?
- Adgang til rådata (ikke-processeret kildemateriale) eller kun processeret output?
- Sandbox- eller testmiljø tilgængeligt?
- Dokumentationskvalitet og completeness — er der en developer portal?
- Hvem er teknisk kontaktperson for API-integration?

---

### 6. Lyd og TTS

- Pre-recorded podcasts er bekræftet. Understøttes dynamisk TTS til on-demand audio?
- Hvis ikke: hvad er roadmap for dynamisk audio-output?
- Accepterer platformen ekstern TTS-pipeline (ElevenLabs, Google, Azure) der modtager Supertrends-tekst og returnerer audio?

---

### 7. Taksonomi og konfiguration

- Kan taksonomien udvides med danske SMV-specifikke sektornoder?
- Hvem definerer og vedligeholder Emerging / Peak / Fading-klassificeringen af trends?
- Kan vi konfigurere trending-heuristikker per deployment?
- Kan vi tilføje branchedefinitioner der matcher dansk SMV-virkelighed: håndværk, detail, byggeri, landbrug, professionelle services?

---

### 8. Kommercielle og tekniske rammer

- Hvad er SLA for API-oppetid og leveringspålidelighed?
- Hvad er kapacitetsmodellen: delt infrastruktur eller dedikeret kapacitet til Y.dk Business?
- Hvad er integrationstidslinjen for et nyt deployment fra aftale til produktionsklar?
- Hvad er den interne kostprismodel — hvad faktureres, og hvad er gratis som del af ejerskabet?

---

### 9. Use cases og roadmap

- Hvilke eksisterende kunder bruger platformen til noget der ligner vores use case: nyhedsproduktion, overvågning eller SMV-intelligence?
- Hvad er de primære use cases i dag — og hvad bruges mindst?
- Hvad er 12-måneders roadmap for on-demand, realtid og sproglig fleksibilitet?
- Er der partnere eller kunder der allerede bruger API'et til dagsaktuelt nyhedsindhold?

---

### 10. Personalisering per bruger

Produktet kræver Netflix-model: indhold tilpasset den individuelle bruger baseret på branche, virksomhedsstørrelse, geografi og konkurrenter.

- Understøtter API'et per-bruger-personalisering — dvs. forskelligt output til to brugere med forskellige profiler?
- Eller er personalisering et lag vi skal bygge oven på en generisk data-stream?
- Kan vi sende en brugerprofil (branche, søgeord, konkurrenter) som parameter og få filtreret output tilbage?
- Hvordan håndteres cold start — ny bruger der endnu ikke har adfærdsdata? Leveres generisk brancheindhold som default?
- Er der en implicit læringsmekanisme der forbedrer relevans over tid, eller er det udelukkende eksplicit konfiguration?
- Kan vi garantere minimum 5 personaliserede feed-elementer per dag for enhver aktiv brancheprofil?

---

### 11. Redaktionel konfiguration og indholdskvalitet

Y.dk's redaktionelle DNA kræver tre indholdstilstande: Understand (fakta og kontekst), Challenge (modpolen og den manglende kilde), Inspire (løsningen der virker). Supertrends skal understøtte eller muliggøre dette.

- Kan indhold tagges eller klassificeres efter redaktionel tilstand — eller er det altid neutralt aggregeret?
- Kan motoren konfigureres til aktivt at søge minoritetssynspunkter og kontraræ signaler — ikke blot mainstream-dækning?
- Kan vi konfigurere kildehierarkier: bestemte medier og organisationer vægtes højere end andre?
- Kan vi blackliste kilder vi ikke ønsker indholdet fra?
- Kan vi whiteliste specifikke kilder der altid inkluderes?
- Hvad er Supertrends' interne kvalitetssikring af kildeindhold — og er det dokumenteret?
- Hvordan håndteres deduplicering: når 20 medier skriver om samme nyhed, hvad vises i feedet?
- Understøtter motoren clustering af beslægtede nyheder til ét feed-element med kildehenvisninger?

---

### 12. Morgenbrief og scheduleret levering

Produktet kræver dagligt morgenbrief genereret og leveret senest kl. 06:30 — personaliseret per bruger.

- Kan Supertrends generere schedulerede, personaliserede digests på et givent tidspunkt?
- Eller skal morgenbrief assembleres eksternt via API-kald og formateres i vores eget lag?
- Hvad er den seneste tidsfrist for at kildeindhold er tilgængeligt i API'et inden kl. 06:00?
- Er der SLA på content-freshness: garanteres indhold fra de seneste 24 timer i hver morgenbrief?
- Kan vi tilgå historiske data — dvs. hvad ville en bruger have modtaget i sin morgenbrief for 30 dage siden? Relevant for onboarding-demos.

---

### 13. White-labeling og brandidentitet

Y.dk Business præsenteres uden Supertrends-branding i brugerfladen. AI kommunikeres som back-end motor, ikke front-end identitet.

- Kan Supertrends-indhold leveres fuldt white-labeled — ingen reference til Supertrends i output eller metadata?
- Indgår der krav om attribution i aftalevilkårene for API-adgang?
- Kan vi bruge Supertrends-genereret indhold som grundlag for Y.dk-signerede artikler og analyser?

---

### 14. Skalering og international fase 2

Fase 2 kræver internationale erhvervslæsere. Infrastrukturen skal skalere uden genopbygning.

- Understøtter platformen multi-sprog output i dag — dvs. samme query returnerer svar på fx dansk og engelsk?
- Kan vi konfigurere geografisk scope per bruger: dansk SMV-ejer får dansk fokus, international bruger får globalt fokus?
- Hvad er kapacitetsloftet for antal samtidige brugere og API-kald?
- Har Supertrends eksisterende deployments med 10.000+ brugere der kan tjene som reference for skaleringsadfærd?

---

## Ønsket output fra mødet

Fire beslutninger skal kunne træffes efter mødet:

1. **Valg A eller B** — rekonfigurér Supertrends eller byg LLM-lag. Kræver svar på kategori 1, 2 og 3.
2. **Personaliseringsarkitektur** — leverer Supertrends per-bruger-output eller bygger vi personaliseringslaget eksternt. Kræver svar på kategori 10.
3. **Tech Lead-briefing** — præcis kortlægning af hvad Supertrends leverer, hvad det ikke leverer, og hvad der suppleres udefra (TTS, regulatory-API'er, LLM, nyheds-API'er). Kræver svar på kategori 4, 5, 6, 11 og 12.
4. **Integrationstidslinje** — hvornår er API-adgang klar til Tech Lead at bygge imod. Kræver svar på kategori 8.

---

## Hvad vi ikke spørger om i dette møde

- Supertrends' kommercielle prismodel over for eksterne kunder — ikke relevant
- Investor-produktet og globale trend intelligence-use cases — ikke vores scope
- Generel platform-demo — vi kender produktet. Vi vil have API-dybde og konfigurationsfleksibilitet
