# Y.dk Business — Kravspecifikation: Features og funktioner

**Version:** 0.1 — arbejdsdokument
**Ejer:** PM
**Primær læser:** Tech Lead
**Status:** Under udarbejdelse — afventer afklaring på åbne spørgsmål

---

## Scope og afgrænsning

### Inkluderet i fase 1 (Launch — invited beta, oktober 2026)

- Personaliseret nyhedsfeed og morgenbrief (tekst + lyd)
- Markedsovervågning med regulatory-kategori
- Branchetrends (ugentlig rapport)
- B2B-briefs (on-demand)
- Leadgenerering — signal-baseret (primær) og CVR-baseret (sekundær)
- Onboarding-profil og grundlæggende personalisering
- Lukket community (modereret forum)
- Web (desktop + mobil) — tekst og lyd

### Ikke inkluderet i fase 1

- Video-format
- API-integration til CRM og egne systemer
- Avanceret personalisering med løbende machine learning
- Internationalt indhold og interface

---

## Adgangsstruktur — tier-model

Eksakt prisstruktur afklares i fællesskab i juni. Kravspecifikationen opererer med to lag:

| Tier | Arbejdsnavn | Indhold | Prisindikation |
|---|---|---|---|
| Basis | Y.dk Business Basis | Nyhedsfeed + morgenbrief | 50 DKK/md |
| Fuld | Y.dk Business Pro | Alle seks lag inkl. community og leadgenerering | 500 DKK/md / 5.000 DKK/år |

**Regel:** Intet indhold vises bag betalingsmur, uden at brugeren har set eksempel på produktet.
Onboarding må ikke kræve betaling, inden brugeren har oplevet mindst ét morgenbrief.

---

## Lag 1 — Erhvervsnyheder

### Funktionelle krav

**F1.1 — Personaliseret nyhedsfeed**
- Feed viser nyheder filtreret på brugerens branche, marked og interesseprofil
- Minimum 5 nye feed-elementer pr. dag for enhver gyldig brancheprofil
- To indholdsspor kombineres i feedet:
  - **Originalt indhold:** Egne historier og analyser produceret af redaktionen
  - **Aggregeret indhold:** Nyheder fra nationale og internationale medier, bureauer (Reuters, AP, Bloomberg m.fl.), organisationer og virksomheder — AI-sorteret og bearbejdet med redaktionel vinkel. "AI producerer, mennesker verificerer" — alle aggregerede nyheder passerer redaktionelt verificeringslag
- Redaktionel vinkel: modpol og nuance som standard — ikke neutralt referat
- Sortering: relevans (personalisering) som standard; dato som alternativ

**F1.2 — Morgenbrief**
- Genereres dagligt kl. 06:00
- Indeholder 5–8 nyheder med direkte relevans for brugerens profil
- Format tekst: overskrift + 3–5 linjer brødtekst pr. nyhed
- Format lyd: oplæst version af tekstversionen (TTS eller studieoptaget)
- Leveres via: push-notifikation (app) + e-mail

**F1.3 — Løbende feed-opdatering**
- Feed opdateres minimum hvert 30. minut i tidsrummet 06:00–22:00
- Nye elementer markeres visuelt (badge eller "Ny"-tag)
- Brugeren kan sætte feed på pause uden at miste nye elementer

**F1.4 — Artikelvisning**
- Fuldt brødtekst tilgængeligt for betalende abonnenter
- Relaterede briefs og trends vises under artiklen (cross-sell til lag 3 og 4)
- Del-funktion: kopi af link (ikke native share)

### Acceptkriterier

- Morgenbrief genereres og leveres senest kl. 06:30 hver dag
- Feed indlæses under 2 sekunder på 4G-forbindelse
- Minimum 95% uptime på leveringskanal (e-mail + push)
- Ingen artikler uden redaktionel verifikation må publiceres

### Tekniske krav

- Supertrends API leverer rådata — dansk SMV-output kræver enten rekonfiguration (Valg A) eller LLM-lag (Valg B)
- Via Ritzau API (2.800 kr./mdr.) supplerer med realtids pressemeddelelser og selskabsmeddelelser
- TTS-motor til lyd: ekstern service kræves (Supertrends understøtter kun pre-recorded podcasts)
- E-mail-leverandør: afklares
- Push-notifikation: native app (Circle eller Discourse) — PWA er ikke sufficient

### Tier-adgang

| Feature | Basis | Pro |
|---|---|---|
| Morgenbrief (tekst) | ✓ | ✓ |
| Morgenbrief (lyd) | — | ✓ |
| Nyhedsfeed (begrænset) | ✓ (5/dag) | ✓ (ubegrænset) |
| Fuld artikelvisning | — | ✓ |
| AI & tech-sektion (Pro + potentielt sponsoreret af IT-Branchen m.fl.) | — | ✓ |
| C-level intelligence — national og international dækning (Reuters, AP, Bloomberg m.fl.) | — | ✓ |

---

## Lag 2 — Markedsovervågning

### Funktionelle krav

**F2.1 — Watchlist-opsætning**
- Brugeren kan oprette overvågning på: konkurrenter (virksomhedsnavn), nøgleord, brancher, navngivne politikere, reguleringsemner
- **Enkeltpersoner:** eksperter, analytikere og indflydelsesrige skikkelser inden for specifikke fagområder — særligt tech og AI fra erhvervsperspektiv. Feature-request til Supertrends — afventer teknisk vurdering.
- Minimum 5 watchlist-elementer pr. bruger i Basis; ubegrænset i Pro
- Hvert element kan tildeles prioritet (høj / normal / lav) der påvirker notifikationsfrekvens

**F2.2 — Regulatory-kategori (obligatorisk)**
- Dedikeret kategori til lovændringer, nye krav, kommunale udbud og EU-direktiver med direkte SMV-konsekvens
- Alle abonnenter aktiveres automatisk med regulatory-overvågning ved onboarding — kan slås fra, men ikke skjules
- Regulatory-hits markeres med separat ikon/farve i feed og notifikationer

**F2.3 — Alerts**
- Push-notifikation ved nyt hit på watchlist-element med prioritet "høj"
- E-mail-notifikation ved nyt hit: øjeblikkeligt (høj prioritet) eller samlet dagligt (normal prioritet)
- Brugeren styrer notifikationsfrekvens pr. watchlist-element

**F2.4 — Ugentlig overvågningsdigest**
- Samlet rapport over ugens hits pr. watchlist-element
- Leveres mandage kl. 07:00 via e-mail
- Digest kan deaktiveres af brugeren

**F2.5 — Kilde-bredde**

Overvågning bygger udelukkende på direkte offentlige endpoints — ingen mellemleverandører.

| Datakilde | Indhold | Endpoint (direkte) | Omkostning |
|---|---|---|---|
| Retsinformation | Danske love, bekendtgørelser, cirkulærer, vejledninger | `retsinformation.dk/api` (REST/JSON + ELI Atom-feeds) | Gratis |
| EUR-Lex | EU-direktiver, forordninger, CELEX-dokumenter | `eur-lex.europa.eu` (SOAP XML + Cellar REST) | Gratis |
| udbud.dk | Alle offentlige udbud: kommunale, regionale, statslige, EU-udbud | Erhvervsstyrelsens API (REST) | Gratis |
| Folketing ODA | Lovforslag, høringer, udvalgsmøder, afstemninger | `oda.ft.dk/api` (REST/JSON) | Gratis |
| Danmarks Statistik | Erhvervsstatistik, beskæftigelse, priser, konjunktur | `api.statbank.dk/v1/` (REST/JSON) | Gratis |
| CVR | Virksomhedsstamdata, ejerskab, koncernstruktur, bestyrelser | ElasticSearch API via Erhvervsstyrelsen | Gratis |
| XBRL-regnskab | Årsrapporter og regnskabsdata for alle registrerede selskaber | `/xbrl/indberet` — Erhvervsstyrelsen | Gratis |
| BBR + Ejerfortegnelse | Ejendoms- og ejerdata | `datafordeler.dk` — Geodatastyrelsen | Gratis |
| Tinglysning | Pant, skøder, servitutter | Tinglysningsrettens HTTP API | Gratis |
| Dansk presse (RSS) | Nyheder fra åbne danske medier og branchemedier | Direkte RSS-feeds pr. medie | Gratis |
| Supertrends API | Globale trends og brancheanalyse | Intern (ejerkreds) | Intern |

**Note:** DAWA-adresse-API'et udfases 1. juli 2026 — erstattes af `datafordeler.dk`. Tech Lead må ikke bygge mod DAWA.

**Ikke inkluderet i fase 1:** Overvågning af private selskabshandlinger, sociale medier og indhold bag betalingsmure.

### Acceptkriterier

- Nyt watchlist-element aktivt inden for 15 minutter efter oprettelse
- Alert leveret inden for 5 minutter efter kilden er crawlet
- Digest leveret senest kl. 07:30 mandage

### Tekniske krav

- Regulatory: direkte integration mod `retsinformation.dk/api` (Civilstyrelsen) — ikke via mellemmand
- EU-regulering: direkte mod EUR-Lex Cellar REST API
- Udbud: direkte mod Erhvervsstyrelsens udbud.dk API
- Folketing: direkte mod `oda.ft.dk/api`
- Statistik: direkte mod `api.statbank.dk/v1/`
- Nyheder: RSS-feeds crawles direkte fra kildemedier
- Supertrends API supplerer med trend-signaler (intern infrastruktur)
- Watchlist-konfiguration gemmes i brugerprofil og synkroniseres på tværs af enheder
- Via Ritzau og øvrige mellemleverandører er fravalgt — alle datakilder skal have kendte, direkte endpoints

### Tier-adgang

| Feature | Basis | Pro |
|---|---|---|
| Watchlist (maks. elementer) | 5 | Ubegrænset |
| Regulatory-kategori | ✓ | ✓ |
| Øjeblikkelige alerts | — | ✓ |
| Daglige alerts | ✓ | ✓ |
| Ugentlig digest | ✓ | ✓ |

---

## Lag 3 — Branchetrends

### Funktionelle krav

**F3.1 — Ugentlig trendrapport**
- Genereres pr. valgt branche
- Indhold: 3–5 identificerede trends med kilde, status og tidshorisont
- Leveres torsdage kl. 06:00 via e-mail og i app

**F3.2 — Trend-radar**
- Visuel oversigt over trends sorteret efter fase: Emerging / Peak / Fading
- Filtrerbar på tidshorisont: Nu (0–3 mdr.) / Kortere sigt (3–12 mdr.) / Langt sigt (1–3 år)
- Klikbar: hvert trendelement åbner detaljeside med kildehenvisninger

**F3.3 — Branche-scope**
- Brugeren vælger primær og sekundær branche ved onboarding
- Kan justeres i profil efterfølgende
- Tilgængelige brancher ved launch: [afklares — se åbne spørgsmål Q3]

**F3.4 — Kobling til nyheder og briefs**
- Hvert trendelement linker til relaterede nyheder i feed (lag 1)
- "Generer brief om denne trend" — direkte entry til B2B-brief (lag 4)

### Acceptkriterier

- Trendrapport genereret og leveret inden kl. 06:30 torsdage
- Minimum 3 trends pr. rapport for enhver aktiv branche
- Trend-radar opdateres minimum én gang ugentligt

### Tekniske krav

- Supertrends-motoren leverer trend-aggregering på tværs af 5.000 kilder
- Trend-klassificering (Emerging / Peak / Fading) udføres af motor eller PM-defineret heuristik: [afklares — Q4]
- Detaljeside kræver kildevisning — ikke blot trend-label

### Tier-adgang

| Feature | Basis | Pro |
|---|---|---|
| Ugentlig trendrapport (1 branche) | ✓ | ✓ |
| Trendrapport (flere brancher) | — | ✓ |
| Trend-radar (fuld) | — | ✓ |
| Kobling til briefs | — | ✓ |

---

## Lag 4 — B2B-Briefs

### Funktionelle krav

**F4.1 — On-demand brief-generering**
- Brugeren søger et emne: virksomhed, marked, branche, konkurrent, reguleringsområde
- Brief genereres og vises inden for 60 sekunder
- Formatkrav pr. brief:
  - Emne og baggrund (2–3 linjer)
  - Nøgletal (3–5 tal med kilde)
  - Aktuelle nyheder (3 seneste)
  - Risici (2–3 punkter)
  - Muligheder (2–3 punkter)
  - Samlet: maks. 1 A4-side

**F4.2 — Lyt til brief**
- TTS-version tilgængeligt for alle genererede briefs
- Spilletid: maks. 4 minutter

**F4.3 — Gem og historik**
- Genererede briefs gemmes i brugerens bibliotek i 90 dage
- Brugeren kan mærke briefs som favoritter
- Historik tilgængeligt på tværs af enheder

**F4.4 — Del brief**
- Kopier link: delt link er adgangskontrolleret (kræver login)
- Download som PDF: [fase 2 — ikke fase 1]
- Team-deling: [fase 2 — ikke fase 1]

### Acceptkriterier

- Brief genereres inden for 60 sekunder for 95% af søgninger
- Nøgletal i brief er maksimalt 30 dage gamle
- TTS-version tilgængeligt inden for 90 sekunder efter brief er genereret
- Ingen brief uden kildehenvisning på mindst ét nøgletal

### Tekniske krav

- On-demand brief-generering kræver separat LLM-lag (Claude/OpenAI API) — Supertrends understøtter ikke on-demand queries
- Rådata til briefs hentes fra Supertrends API + Via Ritzau + udbud.dk efter emne
- TTS-motor: ekstern service (ElevenLabs, Google Cloud TTS eller Azure Neural TTS — beslutning afventer)
- PDF-eksport: ikke fase 1

### Tier-adgang

| Feature | Basis | Pro |
|---|---|---|
| Briefs (antal/mdr.) | 3 | Ubegrænset |
| Lyt til brief | — | ✓ |
| Gem og historik | — | ✓ |
| Del link | — | ✓ |

---

## Lag 5 — Abonnentfællesskab

### Funktionelle krav

**F5.1 — Lukket forum**
- Adgang kun for betalende Pro-abonnenter
- Modereret: alle indlæg godkendes inden for 4 timer i hverdage
- Brugernavn vises; fulde profil valgfrit

**F5.2 — Branchespecifikke rum**
- Separate rum pr. branche (baseret på brugerens valg ved onboarding)
- Minimum: Handel, Industri, Teknologi, Bygge & Anlæg, Professionelle services
- Generelt rum for tværfaglig sparring

**F5.3 — Redaktionel kanal**
- Dedikeret rum til direkte spørgsmål til redaktionen
- Redaktionen besvarer inden for 48 timer i hverdage
- Svar er synlige for alle abonnenter i forummet

**F5.4 — Notifikationer**
- Brugeren kan følge specifikke rum og modtage notifikation ved ny aktivitet
- Daglig digest af forum-aktivitet (valgfrit, deaktiveret som standard)

### Acceptkriterier

- Ny bruger kan oprette indlæg inden for 5 minutter efter adgang
- Moderationsrespons inden for 4 timer i hverdage (08:00–18:00)
- Ingen teknisk begrænsning på antal rum-deltagere

### Tekniske krav

- Forum-platform: Circle.so ($298/mdr., SSO via OAuth 2.0 med e-mail-invitation-friktion) eller Discourse managed ($100/mdr., friktionsfri SSO via DiscourseConnect — anbefalet hvis Tech Lead kan håndtere opsætning)
- SSO med Y.dk Business-abonnement: betalingsstatus verificeres ved login
- Moderationsværktøj integreret i redaktionel arbejdsgang
- Selvhostet Discourse er ikke realistisk uden dedikeret DevOps-ressource

### Tier-adgang

| Feature | Basis | Pro |
|---|---|---|
| Læseadgang til forum | — | ✓ |
| Skriveadgang til forum | — | ✓ |
| Redaktionel kanal | — | ✓ |

---

## Lag 6 — Leadgenerering

### Rationale

Overvågningslaget registrerer markedssignaler. Leadgenereringslaget omsætter dem til salgsmuligheder. Når en reguleringsændring rammer en branche, en virksomhed annoncerer ekspansion, eller en leder skifter job — er det et signal med kommerciel værdi for abonnenten. Y.dk Business er det eneste produkt der kobler markedsintelligens direkte til leadgenerering.

Primær differentiator mod LassoX: LassoX leverer statiske virksomhedsdata fra CVR. Y.dk Business leverer dynamiske signaler der identificerer *hvornår* en virksomhed er klar til at købe, ekspandere eller handle.

---

### F6.1 — Signal-baseret leadgenerering (primær)

**Beskrivelse:** Platformen detekterer markedssignaler i overvågningslaget og identificerer automatisk virksomheder der er påvirkede — og dermed potentielle leads.

**Signaltyper:**
- Reguleringsændring der rammer specifik branche → virksomheder i den branche der mangler compliance-løsning
- Virksomhed annoncerer ekspansion eller ny afdeling → potentiel køber af services
- Lederskifte (ny CEO, CFO, indkøbschef) → ny beslutningstager med nye prioriteter
- EU-forordning vedtaget med implementeringsfrist → virksomheder i scope der skal handle inden deadline
- Branchen reagerer på megatrend (AI, bæredygtighed, digitalisering) → åbningsvinkel for relevante udbydere

**Funktionelle krav:**
- Brugeren definerer hvilke signaltyper der er relevante for hans forretning
- Platformen genererer automatisk en "lead-alert" når et signal matcher brugerens profil
- Lead-alert indeholder: signal-beskrivelse, berørte virksomheder (navn, CVR, størrelse, branche), anbefalet timing og åbningsvinkel
- Brugeren kan gemme, mærke og eksportere leads

**F6.1a — Ekspert- og personovervågning som leadsignal**
- Nøglepersoner (eksperter, C-level, analytikere) overvåges for udtalelser og aktivitet
- Relevante udtalelser om tech, AI og marked flagges som signal
- Feature-request til Supertrends — afventer teknisk vurdering

---

### F6.2 — CVR-baseret virksomhedssøgning (sekundær)

**Beskrivelse:** Brugeren kan søge og filtrere i danske virksomheder baseret på strukturerede data fra CVR og regnskabsregistret.

**Funktionelle krav:**
- Søgning på: branche (DB07-kode), geografi (kommune/region), virksomhedsstørrelse (ansatte), omsætning, stiftelsesår, ejerstruktur
- Visning af: virksomhedsnavn, CVR-nummer, adresse, kontaktoplysninger, seneste regnskabstal
- Eksport af resultatliste (CSV)
- Maks. 500 resultater pr. søgning i Pro

**Tekniske krav:**
- Datakilde: CVR ElasticSearch API (Erhvervsstyrelsen) — gratis
- Regnskabsdata: XBRL-regnskab via Erhvervsstyrelsen — gratis
- Opdateringsfrekvens: daglig synkronisering

---

### Acceptkriterier

- Signal-alert leveret inden for 30 minutter efter kilden er crawlet
- CVR-søgning returnerer resultater under 3 sekunder
- Lead-alert indeholder minimum: virksomhedsnavn, CVR, branche og signal-beskrivelse

### Tekniske krav

- Signal-matching bygger oven på Supertrends' overvågningsmotor + egne regulatory-API'er
- CVR-integration: direkte mod Erhvervsstyrelsens ElasticSearch API
- Lead-data gemmes i brugerprofil og kan eksporteres

### Tier-adgang

| Feature | Basis | Pro |
|---|---|---|
| Signal-alerts (maks. pr. mdr.) | 5 | Ubegrænset |
| CVR-søgning | — | ✓ |
| Lead-eksport (CSV) | — | ✓ |
| Gem og mærk leads | — | ✓ |

---

## Lag 7 — Artikel-deling og brugsrettigheder

Besluttet juni 2026: Bygges af Y.dk. Gælder hele Y.dk-platformen — ikke kun Business. Tænkes ind som del af Y.dk's samlede produkt- og engagementstrategi.

### F7.1 — Artikel-deling via tokeniserede links

**Beskrivelse:** Abonnenter kan videresende et antal artikler bag betalingsmuren til modtagere uden abonnement.

**Funktionelle krav:**
- Hvert delt link er bundet til én specifik modtager (token-baseret adgang)
- Linket kan ikke videresendes — åbnes det af en anden end den tilsigtede modtager, afvises adgang
- Brugeren ser sin resterende kvote af delbare artikler i sin profil
- Teknisk udfordring: link-caching ved deling på sociale medier skal håndteres

**Kvote pr. tier:**

| Tier | Artikler pr. måned |
|---|---|
| Erhverv | 5 |
| Erhverv+ | 25 |
| Premium | 100 |

### F7.2 — Brugsret til artikler i markedsføring

**Beskrivelse:** Abonnenter får ret til at bruge artikler, hvor de eller deres virksomhed nævnes, i egen markedsføring (SoMe, nyhedsbreve, hjemmesider, investor-/PR-materiale).

**Tier-adgang:**

| Tier | Brugsret |
|---|---|
| Erhverv | Ingen |
| Erhverv+ | Ca. 5 artikler/år |
| Premium | Ca. 20 artikler/år |

**Tekniske og juridiske krav:** Klare vilkår for tilladt brug. Redaktionen godkender ikke aktivt — brug er begrænset til tilfælde, hvor virksomheden er nævnt i artiklen.

### F7.3 — Marketing kick-back

**Beskrivelse:** Erhverv+ og Premium inkluderer annonceringsværdi på platformen — bannerannoncer, nyhedsbrevsannonce eller sponsoreret artikel.

| Tier | Marketingværdi inkluderet |
|---|---|
| Erhverv | 0 kr. |
| Erhverv+ | 5.000 kr. |
| Premium | 7.500–9.500 kr. |

**Note:** Kick-back-annoncering håndteres af Commercial Lead og må ikke gribe ind i den redaktionelle indholdsplanlægning.

### F7.4 — Reklamefri adgang

**Beskrivelse:** Erhverv+ og Premium er fri for annoncer — herunder pre-roll, mid-roll og out-stream/videoannoncer.

| Tier | Reklamefri |
|---|---|
| Erhverv | Nej |
| Erhverv+ | ✓ |
| Premium | ✓ |

---

## Tværgående krav

### Personalisering

**P1 — Onboarding-profil (obligatorisk ved tilmelding)**
Brugeren angiver:
- Primær branche (obligatorisk)
- Sekundær branche (valgfrit)
- Virksomhedsstørrelse: 1–4 / 5–50 / 51–250 ansatte
- Geografi: Danmark + op til 3 eksportmarkeder
- Konkurrenter at overvåge (fri tekst, min. 0 — maks. 10)
- Interesseområder (flervalg): Regulering, Finans, Teknologi, Arbejdsmarked, Handel, Bæredygtighed, Geopolitik

**P2 — Friktion-regel**
Onboarding må maksimalt have 3 trin og maks. 5 minutters samlet tidsforbrug.
Brugeren ser første morgenbrief inden profil er 100% udfyldt.

**P3 — Løbende læring (fase 1: eksplicit)**
- Brugeren kan markere artikler og trends som "Ikke relevant"
- Eksplicitte fravalg opdaterer feed inden for 24 timer
- Implicit adfærdsdata (klikfrekvens) gemmes men påvirker ikke feed i fase 1

**P4 — Profiljustering**
- Alle onboarding-valg kan ændres i profilindstillinger
- Ændringer træder i kraft ved næste feed-opdatering (maks. 30 min.)

### Notifikationer

**N1 — Kanalers prioritet (brugerstyret)**
Push > E-mail. Brugeren kan deaktivere push og beholde e-mail.

**N2 — Notifikationstyper og standardindstilling**

| Notifikation | Standard | Kan deaktiveres |
|---|---|---|
| Morgenbrief (e-mail) | Til | Ja |
| Morgenbrief (push) | Til | Ja |
| Watchlist-alert høj prioritet (push) | Til | Ja |
| Watchlist-alert normal prioritet (e-mail, daglig) | Til | Ja |
| Ugentlig overvågningsdigest | Til | Ja |
| Ugentlig trendrapport | Til | Ja |
| Forum-aktivitet (daglig digest) | Fra | Ja |

**N3 — Stille timer**
Brugeren definerer tidsrum uden push-notifikationer. Standard: ingen stille timer.

### Performance

| Krav | Mål |
|---|---|
| Feed-indlæsning | Under 2 sek. på 4G |
| Brief-generering | Under 60 sek. (95. percentil) |
| Søgerespons i overvågning | Under 1 sek. |
| Oppetid (platform) | 99,5% månedligt |
| Oppetid (morgenbrief-levering) | 99,5% (maks. 2 fejl/mdr.) |

### Sikkerhed og adgangskontrol

- Betalingsstatus verificeres ved hvert login — ikke kun ved session-start
- Deaktiveret abonnement afskærer øjeblikkeligt adgang til Pro-indhold
- Basis-abonnenter kan ikke tilgå Pro-URLs direkte
- Forum-adgang kræver aktiv Pro-session

---

## Designkrav fra markedsvalidering

Disse krav er ikke forhandlingsbare og gælder på tværs af alle features:

1. **AI kommunikeres aktivt — ikke skjult.** Y's redaktionelle retning: "Vi er fronten af AI i mediebranchen." Formlen er "AI producerer, mennesker verificerer" — skalaen kommer fra teknologien, troværdigheden fra det redaktionelle lag. AI-ikonet og "Powered by Supertrends"-branding vises der, hvor det er relevant. Barrieren hos de 53%, der er utrygge ved AI-journalistik, håndteres med kompetent kommunikation om verificeringsprocessen — ikke med tavshed om AI.

2. **Produktet kommunikeres som virksomhedsudgift.** Checkout, faktura og onboarding bruger altid firmasprog: "Tilmeld din virksomhed" — ikke "Tilmeld dig selv". Faktura udstedes til virksomhed, ikke person.

3. **Ingen friktion i onboarding.** Maks. 3 trin. Brugeren oplever produkt inden betaling er gennemført.

---

## Åbne spørgsmål til Tech Lead

Opdateret efter platformsundersøgelse maj 2026. Spørgsmål der er besvaret af research er markeret.

| ID | Spørgsmål | Påvirker | Status |
|---|---|---|---|
| Q1 | TTS: Supertrends understøtter kun pre-recorded podcasts — ikke dynamisk TTS. Kræver ekstern service. Hvilken vælges: ElevenLabs, Google Cloud TTS eller Azure Neural TTS? | Lag 1 + Lag 4 | **Åbent — beslutning afventer** |
| Q2 | Regulatory: syv.ai Retsinformation API (gratis, JSON) og EUR-Lex (gratis) dækker dansk og EU-lovgivning. Kan Tech Lead integrere disse inden launch? Rate limits: 20 kald/time (syv.ai). | Lag 2 | **Løsning identificeret — afklar kapacitet** |
| Q3 | Supertrends' taksonomi dækker 170 brancher globalt — men er dansk SMV-branchedækning tilstrækkelig til min. 3 trends/uge? Afklares direkte med Lars Tvede. | Lag 3 | **Åbent — kræver afklaring med Supertrends** |
| Q4 | Supertrends leverer struktureret taksonomi (trends, innovationer, milepæle). Emerging/Peak/Fading-klassificering bygges oven på dette — er det Tech Leads ansvar eller PM's? | Lag 3 | **Åbent — ansvarsfordeling** |
| Q5 | On-demand briefs: Supertrends understøtter IKKE on-demand queries. Kræver separat LLM-lag (Claude/OpenAI API) oven på Supertrends-rådata. Er dette i scope for fase 1? | Lag 4 | **Kritisk — beslutning afventer** |
| Q6 | Community: Circle.so ($298/mdr., SSO-friktion) vs. Discourse managed ($100/mdr., friktionsfri SSO via DiscourseConnect). Hvad er Tech Leads præference og DevOps-kapacitet? | Lag 5 | **Løsning identificeret — Tech Lead vælger** |
| Q7 | Watchlist-elementer: teknisk grænse pr. bruger uden performance-forringelse i Supertrends-API? | Lag 2 | **Åbent — afklares med Supertrends** |
| Q8 | Mobilapp: Bettermode (ingen native app) er fravalgt. Circle og Discourse har native app på standardplan. PWA er ikke sufficient — push-notifikationer kræver native app. Bekræft valg. | Tværgående | **Afklaret: native app er krav** |

### Arkitekturafklaring — Supertrends (besluttet juni 2026)

**Valg A er bekræftet.** Møde med Supertrends 3. juni 2026 afklarede at Supertrends leverer CMS, datastruktur og overvågningsmotor. Y.dk Business bygger oven på denne infrastruktur.

**Hvad Supertrends leverer:**
- CMS som Y.dk arbejder i og med
- Datastruktur (på plads — kildekobling til nyheder bygges af Y.dk)
- Brancheovervågning: nyheder, forordninger, jura, regulærer fra danske og internationale kilder
- Smart Scans: monitorering af hovedemner med brugerstyrede notifikationer
- Præferencebaserede automatiserede briefs
- AI-genereret kontekstanalyse ("Det her er vigtigt, fordi...")
- Regulatorisk overvågning: dekreter, lovforslag, EU-forordninger

**Branding:** Features leveret af Supertrends brandes "Powered by Supertrends" i UI.

**Y.dk's tekniske ansvar:**
- Kildekobling — integrere nyhedskilder i Supertrends' datastruktur
- Frontend og interface — udvikles af Y.dk
- Landing page / platform for premium-kunder

**Stadig åbent:**
- On-demand briefs (ad hoc, brugerinitieret, 60 sek.) dækkes ikke af præferencebaseret automatisering — kræver sandsynligvis separat LLM-lag. Afklares med Tech Lead inden kravspec v1.0.
- Rammeaftale med Supertrends: prissætning (fee/procent/hybrid) afklares efter kildeaftale er defineret.
- API-dokumentation, rate limits og SLA: indhentes i teknisk opfølgning.

---

## Go/no-go-kriterier for launch — invited beta (oktober 2026)

Fase 1 launcher kun hvis samtlige nedenstående er opfyldt:

- Morgenbrief genereres og leveres til 100% af abonnenter senest kl. 06:30 dagligt
- Feed indeholder minimum 5 personaliserede elementer pr. dag for alle aktive branche-profiler
- Watchlist-alerts leveres inden for 5 minutter for høj-prioritet hits
- Onboarding gennemføres af testbruger på under 5 minutter
- Platform holder 99,5% oppetid i 14-dages beta-periode
- Ingen critical bugs i beta

---

## Ejer og næste skridt

| Opgave | Ansvarlig | Deadline |
|---|---|---|
| Redaktionelt koncept — forudsætning for features spec v1.0 | Lysdal + Dyrby | 22. juni 2026 |
| Afklaring Q1–Q5 med Tech Lead (Supertrends-kapabilitet) | PM + Tech Lead | 30. juni 2026 |
| Afklaring Q6 (community-platform) | Tech Lead | 30. juni 2026 |
| Afklaring Q8 (app vs. PWA) | Tech Lead + PM | 30. juni 2026 |
| Tier-feature-allokering — præcis indhold per tier | CEO + Commercial Lead + PM | 30. juni 2026 |
| Artikel-deling: teknisk scope og Y.dk-bredde | Tech Lead + PM | 30. juni 2026 |
| Kravspec v1.0 — final version | PM | 15. juli 2026 |

---

## Udeståender

| # | Spørgsmål | Status |
|---|---|---|
| U3 | **Partner governance** — præcise grænser for kommerciel adgang vs. redaktionel uafhængighed. Skal formaliseres inden partnerpakken sælges. | Udestående |
| U5 | **Artikel-deling** — tokeniseret link-model gælder hele Y.dk. Teknisk scope og caching-håndtering afklares med Tech Lead. | Tænkes ind tidligt |
| — | **Internationale versioner** — development track. Ikke vedtaget endeligt. Kræver mere end maskinoversættelse. | Speculative |
