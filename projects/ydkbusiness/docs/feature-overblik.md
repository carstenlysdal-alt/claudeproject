# Y.dk Business — Feature-overblik

## Hvad platformen kan

Y.dk Business er et dagligt arbejdsredskab for SMV-ejere og erhvervsledere.
Platformen kombinerer originalt redaktionelt indhold med AI-bearbejdede nyheder fra
nationale og internationale medier, nyhedsbureauer, organisationer og virksomheder.
Alt personaliseret på branche, marked og interesseprofil. Vinklen er det der mangler
i den dominerende dækning — og det der har direkte konsekvens for virksomheder med 5-250 ansatte.

En bruger kan:

**Starte dagen orienteret**
Modtage et personaliseret morgenbrief kl. 06:00 med dagens vigtigste erhvervsnyheder
for sin branche og sit marked — som tekst i indbakken og som lyd i appen.

**Følge sit marked løbende**
Overvåge konkurrenter, reguleringsændringer, EU-direktiver, offentlige udbud,
selskabshandlinger og politiske initiativer med direkte SMV-konsekvens.
Alerts ved vigtige ændringer. Ugentlig digest mandage.

**Forstå sin branche strategisk**
Modtage ugentlig trendrapport med de tendenser der vil påvirke branchen på
kort og langt sigt — med kilde, status og tidshorisont.

**Forberede sig på 60 sekunder**
Generere et handlingsorienteret situationsbrief om en virksomhed, et marked,
en konkurrent eller et reguleringsemne — inden et møde, en forhandling eller en beslutning.

**Identificere leads fra markedssignaler**
Se automatisk hvilke virksomheder der er påvirkede af en reguleringsændring,
en ekspansion eller et lederskifte — og hvornår timing er rigtig til at kontakte dem.
Understøttes af CVR-søgning på branche, størrelse og geografi.

**Spare med ligesindede**
Deltage i et lukket forum for betalende abonnenter med branchespecifikke rum
og direkte adgang til redaktionen.

---

## Arkitektur

```
┌───────────────────────────────────────────────────────────────────────┐
│                          Y.dk BUSINESS                                │
├──────────────┬───────────────┬───────────┬───────────┬───────────────┤
│  NYHEDER     │  OVERVÅGNING  │  TRENDS   │  BRIEFS   │  LEADS        │
└──────────────┴───────────────┴───────────┴───────────┴───────────────┘
                                     ↑
                 PERSONALISERING (branche · virksomhed · marked)
                                     ↑
          ┌──────────────────────────┴───────────────────────┐
          │  SUPERTRENDS               OFFENTLIGE APIs        │
          │  CMS + datastruktur        Retsinformation        │
          │  Overvågningsmotor         EUR-Lex                │
          │  AI-analyse                udbud.dk               │
          │  Automatiserede briefs     Folketing ODA          │
          │  "Powered by Supertrends"  CVR + XBRL             │
          │                            Danmarks Statistik     │
          │  Y.dk bygger:              Via Ritzau API         │
          │  Frontend + interface      RSS (signalinput)      │
          │  Redaktionelt lag                                 │
          └──────────────────────────────────────────────────┘
```

**Arkitekturstatus (besluttet juni 2026):** Supertrends leverer CMS, datastruktur og overvågningsmotor. Y.dk bygger frontend og interface oven på. Se `output/supertrends-moedereferat.md`.

---

## Lag 1 — Erhvervsnyheder

**Hvad det er:** Erhvervsnyheder på tværs af kildetyper — verificeret og vinklet af redaktionen.
Ikke kapitalmarked og C25 — men det der påvirker virksomheder med 5-250 ansatte.

To indholdsspor:
- **Originalt indhold:** Egne historier og analyser produceret af redaktionen
- **Aggregeret indhold:** Nyheder fra nationale medier, internationale bureauer (Reuters, AP, Bloomberg m.fl.), organisationer og virksomheder — AI-sorteret og bearbejdet med redaktionel vinkel

**Funktioner:**
- Personaliseret nyhedsfeed baseret på branche, marked og interesseprofil
- Morgenbrief: dagens vigtigste nyheder samlet (tekst + lyd)
- Løbende opdatering i løbet af dagen
- Redaktionel vinkel: modpol og nuance som standard
- Formater: tekst, lyd — video fase 2

**Premium-indhold bag Pro-adgangsvæg**
To dedikerede sektioner med adgang kun for Pro-abonnenter:

- **AI & tech for erhverv** — dybdegående dækning af AI og teknologi med direkte erhvervsrelevans
- **C-level intelligence** — strategiske analyser, datadrevet research, credibel ekspertopinion og trendrapporter til topledelsen. Indhold der kræver fordybelse, ikke scanning. Rettet mod CEO, COO, CFO og seniorledere i SMV og mellemstore virksomheder.

**Brugerflow:**
```
Log ind → Morgenbrief (push/mail) → Feed browsing → Artikel → Relaterede briefs
                                                         ↓
                                              [Pro] AI & tech-sektion
```

---

## Lag 2 — Markedsovervågning

**Hvad det er:** Erstatning for Retriever/Meltwater til SMV-priser.
Systematisk overvågning af det der er relevant for brugerens virksomhed.

**Funktioner:**
- Opsæt overvågning på: konkurrenter, nøgleord, brancher, virksomheder, politikere, regulering
- Push-notifikationer ved nye hits (mail + app)
- Ugentlig overvågningsrapport (digest-format)
- Kilde-bredde: medier, offentlige dokumenter, EU-regulering, brancheorganisationer

**Obligatorisk kilde-kategori (baseret på markedsvalidering):**
Regulering og erhvervspolitik med direkte SMV-konsekvens — nye krav, lovændringer,
kommunale udbud, EU-direktiver. Statsrelateret papirarbejde koster SMV'erne
16,5 mia. kr./år. Overvågning af regulatory change er ikke nice-to-have — det er
det behov der er nærmest pengeværdien for målgruppen.

**Brugerflow:**
```
Onboarding → Opsæt watchlist → Løbende alerts → Ugentlig digest → Juster profil
```

---

## Lag 3 — Branchetrends

**Hvad det er:** AI-aggregeret trendanalyse på tværs af brugerens branche og markeder.
Det der normalt kræver en dedikeret analytiker.

**Funktioner:**
- Ugentlig trendrapport pr. branche
- Trend-radar: hvad er på vej, hvad er ved at toppe
- Kobling til konkrete virksomheder og markeder (Supertrends-lag)
- Filtrerbart på tidshorisont: nu / 6 måneder / 1-3 år

**Brugerflow:**
```
Vælg branche(r) → Modtag ugentlig trendrapport → Dyk ned i enkelttrends → Gem til brief
```

---

## Lag 4 — B2B-Briefs

**Hvad det er:** Kortfattede, handlingsorienterede situationsbriefs.
On-demand eller planlagt — til møder, forhandlinger, markedsindgange, due diligence.

**Funktioner:**
- Søg brief om: virksomhed, marked, branche, konkurrent, regulering
- Autogenereret brief på under 60 sekunder
- Format: 1 side — baggrund, nøgletal, aktuelle nyheder, risici, muligheder
- Gem og del briefs (fase 2: team-funktionalitet)

**Brugerflow:**
```
Søg emne → Generer brief → Læs / lyt → Download / del
```

---

## Personalisering — tværgående lag

Personalisering er det der binder de fire lag sammen og adskiller Y.dk Business
fra et generisk erhvervsmedie.

**Onboarding-profil (opsættes ved tilmelding):**
- Branche (primær + sekundær)
- Virksomhedsstørrelse
- Geografi (Danmark + eksportmarkeder)
- Konkurrenter at overvåge
- Interesseområder (regulering, finans, teknologi, arbejdsmarked m.fl.)

**Løbende læring:**
- Hvad brugeren klikker på og gemmer påvirker feed
- Eksplicitte fravalg ("vis mig ikke mere om X")

---

## Brugerrejse — fra tilmelding til daglig brug

```
TILMELDING
    ↓
ONBOARDING (5 min)
Branche · Virksomhed · Konkurrenter · Interesser
    ↓
DAG 1
Morgenbrief · Personaliseret feed · Første overvågningsalert
    ↓
DAGLIG RYTME
07:00  Morgenbrief (mail + app)
       → Dagens vigtigste nyheder for din branche
Løbende  Feed-opdatering + overvågningsalerts
Ugentligt  Trendrapport + overvågningsdigest
On-demand  B2B-brief ved behov
    ↓
FASTHOLDELSE
Ugentlig digest · Personalisering der forbedres · Brief-historik
```

---

## Lag 5 — Abonnentfællesskab

---

## Lag 6 — Leadgenerering

**Hvad det er:** Overvågningssignaler omsættes automatisk til salgsmuligheder.
Ingen konkurrent kobler markedsintelligens direkte til leadgenerering.

**Signal-baseret (primær):**
- Reguleringsændring → virksomheder i scope identificeres som leads
- Ekspansionsmeddelelse → potentiel køber af services
- Lederskifte → ny beslutningstager med nye prioriteter
- EU-direktiv med implementeringsfrist → timing til kontakt

**CVR-baseret (sekundær):**
- Søg og filtrer danske virksomheder på branche, størrelse, geografi, økonomi
- Datakilde: Erhvervsstyrelsens CVR API (gratis)

**Brugerflow:**
```
Signal detekteres → Lead-alert med berørte virksomheder → Gem / eksporter → Kontakt
```

---

**Hvorfor:** Trends.co dokumenterede at lukket community er primær fastholdelsesmekanisme.
SMV-ejere betaler allerede 12.000 kr./år for ejerledernetværk. Fællesskab øger retention markant.

**Hvad det er:** Lukket, modereret forum for abonnenter — sparring, videndeling og netværk
på tværs af brancher. Adgang kun for betalende abonnenter.

**Minimumsfunktioner fase 1:**
- Lukket forum/gruppe (modereret)
- Branchespecifikke rum
- Mulighed for direkte spørgsmål til redaktionen

---

## Designkrav fra markedsvalidering

**AI må aldrig fremgå i brugerflade eller kommunikation.**
53% af danskerne er utrygge ved AI-journalistik. AI er back-end motor — ikke front-end identitet.
Produktet kommunikerer redaktionel kvalitet og menneskelig stemme.

**Produktet kommunikeres altid som virksomhedsudgift.**
Betalingsvillighed for personlige nyheder (35-54 år): 11-12%.
5.000 kr./år er en firmabetalt driftsomkostning — ikke et personligt medie-abonnement.
Gælder onboarding, checkout, faktura-format og al kommunikation.

**Ingen friktion i onboarding.**
30% af SMV'er opgiver digitale værktøjer pga. kompleksitet.
Platformen leverer værdi i indbakken fra dag 1 — brugeren konfigurerer ikke algoritmer.

---

## Hvad der ikke er med (fase 1)

- Video-format
- API-integration til CRM og egne systemer
- Avanceret benchmarking mod konkurrenter
- Internationalt indhold og interface

---

## Feature-validering mod dokumenterede behov (markedsvalidering maj 2026)

| Dokumenteret behov | Feature der dækker det | Status |
|---|---|---|
| Tidsmangel — 2-5 t/uge på informationssøgning | Morgenbrief + B2B-briefs | ✓ Dækket |
| Informationsoverflod — 35% overvældet | Personaliseret feed + filtrering | ✓ Dækket |
| Fragmenterede værktøjer (kludetæppe) | Ét samlet login — alle lag | ✓ Dækket |
| "Videnskoordinator" som intern workaround | Morgenbrief + automatiserede briefs | ✓ Dækket |
| Sparring med ligesindede | Community (lag 5) | ✓ Dækket |
| Branchespecifik relevans | Personalisering på branche | ✓ Dækket |
| Strategisk intelligence — ingen BI-adgang til SMV-priser | Trends + B2B-briefs | ✓ Dækket |
| Konkurrentovervågning | Overvågning (lag 2) | ✓ Dækket |
| Regulering og policy med direkte SMV-konsekvens | Overvågning — regulatory kategori | ✓ Dækket |
| Leadidentificering fra markedssignaler | Leadgenerering (lag 6) | ✓ Tilføjet |
| CVR-baseret virksomhedssøgning | Leadgenerering (lag 6) | ✓ Tilføjet |

---

## Åbne spørgsmål

| Spørgsmål | Påvirker | Status |
|---|---|---|
| On-demand briefs (ad hoc, 60 sek.) — kræver LLM-lag? | B2B-briefs | Åbent — afklares med Tech Lead |
| Person- og ekspertovervågning — kan Supertrends understøtte det? | Overvågning + Leads | Åbent — feature-request sendt til Supertrends |
| Rammeaftale Supertrends: fee, procent eller hybrid | Økonomi | Åbent — afventer kildeaftale |
| Designer-ressource til august | Design + UI | Åbent — CEO afklarer
