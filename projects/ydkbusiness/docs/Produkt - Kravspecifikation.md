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
- B2B-briefs (præferencebaseret automatisering)
- Onboarding-profil og grundlæggende personalisering
- Web (desktop + mobil) — tekst og lyd

### Ikke inkluderet i fase 1

- Lukket community (modereret forum) — udskydes til fase 2, scopedefinition afventer
- Leadgenerering — signal-baseret og CVR-baseret — udskydes til fase 2
- Video-format
- API-integration til CRM og egne systemer
- Avanceret personalisering med løbende machine learning
- Internationalt indhold og interface

---

## Adgangsstruktur — tier-model

Eksakt prisstruktur afklares i fællesskab i juni. Kravspecifikationen opererer med to lag:

| Tier | Arbejdsnavn | Indhold | Prisindikation |
|---|---|---|---|
| Erhverv | Y.dk Business Erhverv | Nyhedsfeed + morgenbrief | 500 DKK/md |
| Erhverv+ | Y.dk Business Erhverv+ | Alle seks lag inkl. lyd, community og leadgenerering | 500 DKK/md / 5.000 DKK/år |
| Premium | Y.dk Business Premium | Erhverv+ inkl. reklamefri adgang, udvidet artikel-deling og marketingværdi | Afklares |

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

- Eget nyhedsaggregerings-lag bygges af Y.dk — direkte mod RSS-feeds, Via Ritzau og offentlige APIs
- Via Ritzau (nyhedskilde, ikke mellemmand til regulatory-data) supplerer med realtids pressemeddelelser og selskabsmeddelelser
- TTS-motor til lyd: ekstern service kræves (ElevenLabs, Google Cloud TTS eller Azure Neural TTS — beslutning afventer)
- E-mail-leverandør: afklares
- Push-notifikation: native app (Circle eller Discourse) — PWA er ikke sufficient

### Tier-adgang

| Feature | Erhverv | Erhverv+ |
|---|---|---|
| Morgenbrief (tekst) | ✓ | ✓ |
| Morgenbrief (lyd) | — | ✓ |
| Nyhedsfeed (begrænset) | ✓ (5/dag) | ✓ (ubegrænset) |
| Fuld artikelvisning | — | ✓ |
| AI & tech-sektion (Pro + potentielt sponsoreret af IT-Branchen m.fl.) | — | ✓ |
| C-level intelligence — national og international dækning (Reuters, AP, Bloomberg m.fl.) | — | ✓ |

---

## Lag 2a — Medieovervågning

Selvstændigt produkt. Følger omtale på tværs af medier i realtid.

### Funktionelle krav

**F2a.1 — Medieovervågning**
- Op til **5 brugere** fra abonnentvirksomheden modtager notifikationer
- Følger omtale af eget brand, produktnavne og nøglepersoner på tværs af medier
- Realtidsnotifikationer ved nævnelse i 50.000+ scannede kilder inkl. danske nyhedsmedier
- Sammenligningsvisning: egen omtale vs. konkurrenter
- Månedlig PR impact-rapport
- Reference: Infomedia / digitalt udklipsbureau til SMV-pris

**F2a.2 — Alerts og digest**
- Push-notifikation ved nyt hit (høj prioritet)
- Daglig/ugentlig digest

**F2a.3 — Integrationer**
- HubSpot, Slack, Salesforce (scope afklares med tech)

**Tekniske krav:** Datakilder og realtids-løsning afklares med tech (Q7).

**Tier-adgang:** Inkluderet i Erhverv+ og Premium. Ikke tilkøb i Erhverv — skal drive upgrade.

---

## Lag 2b — Markedsovervågning

Selvstændigt produkt. Følger markedsudvikling — ikke medieomtale.

### Funktionelle krav

**F2b.1 — Watchlist-opsætning**
- Op til **5 brands** kan overvåges pr. abonnement
- Brugeren kan oprette overvågning på: konkurrenter (virksomhedsnavn), nøgleord, brancher, reguleringsemner
- CVR-ændringer: regnskaber, nye bestyrelsesmedlemmer, direktørskift, ejerandele
- **Enkeltpersoner:** analytikere og nøglepersoner — teknisk løsning afklares med tech.
- Minimum 5 watchlist-elementer pr. bruger i Erhverv; ubegrænset i Erhverv+
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
| Eget trend-aggregerings-lag | Trends og brancheanalyse — bygges internt | Direkte kildeintegration | Afklares |

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
- Eget overvågningssystem bygges mod direkte endpoints (CVR, RSS, Retsinformation, EUR-Lex)
- Watchlist-konfiguration gemmes i brugerprofil og synkroniseres på tværs af enheder
- Via Ritzau er fravalgt som kilde til regulatory-data — alle regulatory-endpoints skal integreres direkte (retsinformation.dk, EUR-Lex, oda.ft.dk). Via Ritzau bruges som nyhedskilde i Lag 1, ikke i Lag 2.

### Tier-adgang

| Feature | Erhverv | Erhverv+ |
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

| Feature | Erhverv | Erhverv+ |
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

| Feature | Erhverv | Erhverv+ |
|---|---|---|
| Briefs (antal/mdr.) | 3 | Ubegrænset |
| Lyt til brief | — | ✓ |
| Gem og historik | — | ✓ |
| Del link | — | ✓ |

---

## Lag 5 — Abonnentfællesskab

### Funktionelle krav

**F5.1 — Lukket forum**
- Adgang kun for betalende Erhverv+-abonnenter
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

| Feature | Erhverv | Erhverv+ |
|---|---|---|
| Læseadgang til forum | — | ✓ |
| Skriveadgang til forum | — | ✓ |
| Redaktionel kanal | — | ✓ |

---

## Lag 6 — Leadgenerering *(Fase 2 — ikke i oktober-launch)*

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
- Maks. 500 resultater pr. søgning i Erhverv+

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

| Feature | Erhverv | Erhverv+ |
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
| Erhverv+ | 10 |
| Premium | 50 |

### F7.2 — Brugsret til artikler i markedsføring

**Beskrivelse:** Abonnenter kan bruge artikler og andet indhold, hvori de eller deres virksomhed nævnes, til egen markedsføring — inkl. at poste indholdet på sociale medier uden om betalingsmur.

**Tier-adgang:**

| Tier | Brugsret |
|---|---|
| Erhverv | Ingen |
| Erhverv+ | ✓ |
| Premium | ✓ |

**Note:** Brug er begrænset til indhold, hvor virksomheden er nævnt. Klare vilkår for tilladt brug defineres inden launch.

### F7.3 — Marketing kick-back

**Beskrivelse:** Erhverv+ og Premium inkluderer annonceringsværdi på platformen — bannerannoncer, nyhedsbrevsannonce eller sponsoreret artikel.

| Tier | Marketingværdi inkluderet |
|---|---|
| Erhverv | 0 kr. |
| Erhverv+ | 5.000 kr. |
| Premium | 7.500–9.500 kr. |

**Note:** Kick-back-annoncering håndteres af Commercial Lead og må ikke gribe ind i den redaktionelle indholdsplanlægning.

### F7.4 — Reklamefri adgang

**Beskrivelse:** Premium er fri for annoncer — herunder pre-roll, mid-roll og out-stream/videoannoncer. Erhverv og Erhverv+ vises annoncer.

| Tier | Reklamefri |
|---|---|
| Erhverv | Nej |
| Erhverv+ | Nej |
| Premium | ✓ |

---

## Tværgående krav

### Personalisering

**P1 — Onboarding-profil (trin 1 — obligatorisk ved tilmelding)**
Brugeren angiver ved registrering:
- Rolle og ansvarsområde (obligatorisk): SMV-ejer / C-level / Iværksætter / Kommunikation & marketing / Rådgiver & investor / Medarbejder
- Primær branche (obligatorisk)

Alle øvrige data indsamles via progressivt profileringsforløb de første 7 dage (se P2).

**P2 — Progressivt profileringsforløb (dag 1–7)**
Resten af profilen opbygges løbende via kontekstuelle nudges i platformen:
- Dag 1: Virksomhedsstørrelse + geografi (efter første morgenbrief)
- Dag 2–3: Konkurrenter at overvåge (ved første feed-visning)
- Dag 3–5: Interesseområder + foretrukket format (ved anden morgenbrief)
- Dag 5–7: Eksportmarkeder + brief-frekvens (ved første trendrapport)

Friktion-regel: onboarding må maksimalt have 3 trin og maks. 5 minutters samlet tidsforbrug.
Trin 1 (rolle + branche) er obligatorisk. Brugeren ser første morgenbrief inden profil er 100% udfyldt.
Progressiv dataindsamling må aldrig blokere adgang til indhold.

**P3 — Løbende adfærdslæring (fase 1: eksplicit + passiv registrering)**
- Brugeren kan markere artikler og trends som "Ikke relevant"
- Eksplicitte fravalg opdaterer feed inden for 24 timer
- Implicit adfærdsdata registreres: klik, gem, del, scroll-dybde, lyttetid
- Adfærdsdata påvirker ikke feed aktivt i fase 1 — gemmes til fase 2

**P4 — Redaktionel filterboble-sikkerhed**
Personalisering må aldrig lukke brugeren inde i eget interesserum.
Regulatory-alerts, redaktionelt prioriterede historier og signaler med
bredere erhvervsmæssig relevans bryder altid igennem uanset brugerprofil.

**P5 — Profiljustering**
- Alle onboarding-valg kan ændres i profilindstillinger
- Ændringer træder i kraft ved næste feed-opdatering (maks. 30 min.)
- Personaliseringsdeklaration: brugeren kan altid se hvorfor et indhold anbefales

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
- Deaktiveret abonnement afskærer øjeblikkeligt adgang til Erhverv+-indhold
- Erhverv-abonnenter kan ikke tilgå Erhverv+-URLs direkte
- Forum-adgang kræver aktiv Erhverv+-session

---

## Designkrav fra markedsvalidering

Disse krav er ikke forhandlingsbare og gælder på tværs af alle features:

1. **AI kommunikeres aktivt — ikke skjult.** Y's redaktionelle retning: "Vi er fronten af AI i mediebranchen." Formlen er "AI producerer, mennesker verificerer" — skalaen kommer fra teknologien, troværdigheden fra det redaktionelle lag. Barrieren hos de 53%, der er utrygge ved AI-journalistik, håndteres med kompetent kommunikation om verificeringsprocessen — ikke med tavshed om AI.

2. **Produktet kommunikeres som virksomhedsudgift.** Checkout, faktura og onboarding bruger altid firmasprog: "Tilmeld din virksomhed" — ikke "Tilmeld dig selv". Faktura udstedes til virksomhed, ikke person.

3. **Ingen friktion i onboarding.** Maks. 3 trin. Brugeren oplever produkt inden betaling er gennemført.

---

## Åbne spørgsmål til Tech Lead

Opdateret efter platformsundersøgelse maj 2026. Spørgsmål der er besvaret af research er markeret.

| ID | Spørgsmål | Påvirker | Status |
|---|---|---|---|
| Q1 | TTS: Kræver ekstern service. Hvilken vælges: ElevenLabs, Google Cloud TTS eller Azure Neural TTS? | Lag 1 + Lag 4 | **Åbent — beslutning afventer** |
| Q2 | Regulatory: Retsinformation API (gratis, JSON) og EUR-Lex (gratis) dækker dansk og EU-lovgivning. Kan Jesper integrere inden launch? | Lag 2 | **Løsning identificeret — afklar kapacitet** |
| Q3 | Branchetrends: Eget trend-aggregerings-lag kræver tilstrækkelig dansk SMV-branchedækning. Minimum 3 trends/uge pr. aktiv branche. Afklares med tech. | Lag 3 | **Åbent — afklares med tech** |
| Q4 | Emerging/Peak/Fading-klassificering: Er det Jespers ansvar eller PM's at definere heuristikken? | Lag 3 | **Åbent — ansvarsfordeling** |
| Q5 | On-demand briefs: Kræver separat LLM-lag (Claude/OpenAI API). Er dette i scope for fase 1? | Lag 4 | **Kritisk — beslutning afventer** |
| Q6 | Community: udskydes til fase 2 — spørgsmål om platform udgår. | Lag 5 | **Udgår — community er fase 2** |
| Q7 | Medieovervågning i realtid: hvilke datakilder og hvilken teknisk løsning? Afklares med tech. | Lag 2a | **Åbent — afklares med tech** |
| Q8 | Mobilapp: PWA er ikke sufficient — push-notifikationer kræver native app. Bekræft valg. | Tværgående | **Afklaret: native app er krav** |

### Arkitekturstatus

**Y.dk kører eget CMS og egne systemer.** Supertrends er ikke en del af den aktuelle plan. Det undersøges om Supertrends eller lignende eksterne motorer kan bidrage til specifikke formater (f.eks. trend-aggregering) på et senere tidspunkt — men primær tilgang er eget system baseret på direkte datakilder.

**Y.dk's tekniske ansvar:**
- Eget CMS
- Kildeidentifikation og -kobling — i gang
- Frontend og interface
- Overvågningssystem mod direkte offentlige endpoints
- LLM-lag til on-demand briefs (beslutning afventer)

---

## Go/no-go-kriterier for launch (1. november 2026)

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
| Afklaring Q1 (TTS-service) | PM + Jesper | Snarest |
| Afklaring Q3 + Q7 med tech (overvågning og trends) | PM + tech | Snarest |
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
