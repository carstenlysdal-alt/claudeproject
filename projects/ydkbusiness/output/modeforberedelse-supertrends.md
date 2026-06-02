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

## Ønsket output fra mødet

Tre beslutninger skal kunne træffes efter mødet:

1. **Valg A eller B** — rekonfigurér Supertrends eller byg LLM-lag. Beslutning kræver svar på spørgsmål 1, 2 og 3.
2. **Tech Lead-briefing** — præcis liste over hvad Supertrends leverer, hvad det ikke leverer, og hvad der suppleres udefra. Kræver svar på spørgsmål 4, 5 og 6.
3. **Integrationstidslinje** — hvornår er API-adgang klar til Tech Lead at bygge imod. Kræver svar på spørgsmål 8.

---

## Hvad vi ikke spørger om i dette møde

- Supertrends' kommercielle prismodel over for eksterne kunder — ikke relevant
- Investor-produktet og globale trend intelligence-use cases — ikke vores scope
- Generel platform-demo — vi kender produktet. Vi vil have API-dybde og konfigurationsfleksibilitet
