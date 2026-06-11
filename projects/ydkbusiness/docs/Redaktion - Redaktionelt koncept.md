# Y.dk Business — Redaktionelt Koncept

**Version:** 0.2 — revideret udkast  
**Dato:** 10. juni 2026  
**Ansvarlig:** Lysdal + Dyrby  
**Deadline:** 22. juni 2026  
**Modtager:** Tech Lead (motorkonfiguration), CEO (godkendelse), Commercial Lead (pakkestruktur)

---

## Formål

Dette dokument er den primære tekniske input til konfigurationen af Y.dk Business-motoren.
Det besvarer tre spørgsmål, som Tech Lead ikke kan løse uden det:

1. Hvilke kilder skal motoren crawle og prioritere?
2. Hvilken AI-orkestrering skal gælde per outputtype?
3. Hvad må auto-publiseres, og hvad kræver menneskelig godkendelse?

Dokumentet definerer ikke redaktionel linje — det er fastlagt i `Journalistisk-retning.md`.
Det omsætter den redaktionelle linje til konfigurerbare parametre.

---

## Strategisk ramme

Den strategiske ramme definerer de redaktionelle principper, som alle tekniske parametre
er afledt af. Enhver konfigurationsbeslutning — kildevalg, pillar-klassificering,
verificeringsniveau — er en operationalisering af denne ramme.

### Redaktionel identitet — tre pillars i Business-kontekst

Y's tre indholdspillarer (Understand / Challenge / Inspire) er tekniske parametre i motoren.
Hvert inkommende signal klassificeres på pillar og routes til korrekt prompt og
verificeringsniveau. Pillar-fordelingen i nyhedsfeedet er: Understand 60 %, Challenge 25 %,
Inspire 15 %.

**Understand — "Hvad sker der, og hvad betyder det for min virksomhed?"**

Den direkte erhvervsmæssige konsekvens af aktuelle nyheder.
Ikke "her er nyheden" — men "her er nyheden, og det betyder X for din branche."

Typisk stof: ny regulering med deadline og krav; politisk beslutning med erhvervsmæssig
implikation; makroøkonomisk indikator med sektorkonsekvens; virksomhedshændelse
(fusion, konkurs, ekspansion) med branchekonsekvens.

Tone: Saglig, konkret, faktatung. Ingen kommentar — kun konsekvensanalyse.  
AI-produktionsgrad: Høj. Den eneste pillar hvor AI-assisteret produktion er bredt accepteret
i det danske marked — se AI-troværdighed nedenfor.

---

**Challenge — "Hvad er den vinkel, du ikke har set?"**

Den underrepræsenterede stemme, den tilbageholdte kilde, myten der holder
unødigt mange virksomheder tilbage. Y er ikke et korrektiv til andre medier — Y er sig selv,
og Challenge er ikke polemik, men systematisk søgning efter det, der mangler i den
dominerende fortolkningsramme.

Typisk stof: den ekspert der siger noget andet end konsensus — med belæg; den regulering
der viser sig at have modsatrettede effekter af intentionen; den branchetrend der har
nået toppen uden nogen har opdaget det.

Tone: Forundret, nysgerrig, faktabaseret. Aldrig ideologisk.  
AI-produktionsgrad: Lav. Kræver altid navngivet menneskelig analyse. Publiceres aldrig automatisk.

---

**Inspire — "Hvad kan vi gøre?"**

Løsningen, muligheden, casen der virker. SMV-ejeren vil ikke kun forstå markedet
— han vil vide, hvad han skal gøre ved det.

Typisk stof: casestory — virksomhed der løste et problem på en uventet måde; guide til
håndtering af ny regulering eller mulighed; fremtidsanalyse der åbner muligheder for
specifikke sektorer; teknologi eller forretningsmodel der er klar til adoption.

Tone: Optimistisk, konkret, handlingsorienteret. Aldrig: "det kunne måske" eller "potentielt."  
AI-produktionsgrad: Middel. Struktureret caseindsamling kan AI-assisteres;
vurdering og byline kræver menneske.

---

### Segmentstrategi — pillar-prioritering per læsertype

Y.dk Business skriver til seks identificerede læsersegmenter. Segmenterne er ikke
udelukkelseskriterier — én abonnent kan tilhøre flere. De er redaktionelle
prioriteringslinser der styrer, hvilken pillar der vægtes højest i prompt-generering
og indholdsmix.

Analysen bygger på to parallelle segmentanalyser (juni 2026) med udgangspunkt i dansk
medieforskning, Reuters Institute-data og internationale forbilleder som Morning Brew,
Axios Smart Brevity, Sifted og HBR.

| Segment | Primær pillar | Sekundær pillar | AI-produktionsgrad |
|---|---|---|---|
| SMV-ejere (5–50 ansatte) | Understand | Inspire | Høj |
| C-level, mellemstore virksomheder (50–250) | Challenge | Understand | Lav |
| Iværksættere under 5 år | Challenge | Inspire | Lav |
| Kommunikations- og marketingfolk | Inspire | Understand | Middel |
| Investorer, rådgivere og bureauer | Challenge | Understand | Middel |
| Medarbejdere i større virksomheder (250+) | Understand | — | Høj |

**SMV-ejere:** Understand bæres af regulatory oversættelse og regional erhvervsdynamik —
systematisk underdækket i dansk erhvervsjournalistik, overladt til interesseorganisationer.
Inspire er den differentierende konkurrencefordel: peer-cases fra ejerledere i samme størrelse
og branche i "smarteste ven"-registret. Produktionsprioritet fase 1: Understand.
Redaktionel differentiering på sigt: Inspire.

**C-level, mellemstore virksomheder:** Denne leder har adgang til nyheder — men mangler
den velunderbyggede vinkel der bryder konsensus. Challenge som "strategic blind-spot
reporting": faktatjek af de antagelser dansk ledelse tager for givne. HBR-filteret:
"vores læsere ved det her allerede." Navngivet menneskelig analyse krævet. Aldrig auto-publisering.

**Iværksættere:** Startup-dækning er hype-drevet og succesfikseret. Det founders faktisk
mangler: kapital- og sektorbriefs, regulatory traps, fejlanalyser og exit-realiteter.
Challenge som "founder intelligence": myteknusning med data frem for startup-PR.
Navngivne kilder og menneskelig vurdering krævet.

**Kommunikations- og marketingfolk:** Disciplinens AI-skifte og krisecases dækkes som
trendstof — ikke som håndværksjournalistik. Inspire som "case deconstruction": hvad
de besluttede, hvad de målte, hvad der gik galt, hvad der faktisk virkede. Fast beat i
tre spor: krisekommunikation, platform og rækkevidde, AI i kommunikation.

**Investorer, rådgivere og bureauer:** Segmentet er informationsmættet men redaktionelt
underserviceret — de betaler for bedre dømmekraft. Challenge som "signal before deal":
ledelsesudskiftninger, reguleringsvindue, sektorrotation — inden det bliver til
pressemeddelelse. Datadrevet overblik egner sig til AI-assisteret produktion; analyse
ovenpå kræver menneskelig vurdering.

**Medarbejdere i større virksomheder:** Erhvervsstof er skrevet til topledere eller den
brede offentlighed — sjældent til den fagligt engagerede medarbejder der vil forstå
sin branches kontekst. Understand som "arbejdsdagsjournalistik": hvad sker der i min
branche, og hvad betyder det for mit arbejde? Axios' "Why it matters"-logik, dansk og
sektorspecifik. Det segment, hvor AI-assisteret Understand-indhold har højest troværdighed.

---

### AI-troværdighed — empirisk grundlag for verificeringsmodellen

Reuters Institute *Generative AI and News Report 2025* (seks lande inkl. Danmark,
~2.000 respondenter per land) dokumenterer en klar troværdighedsskala:

| Produktionsform | Andel komfortable |
|---|---|
| Rent AI-produceret | 12 % |
| Menneskeligt tilsyn (human in the loop) | 21 % |
| Menneskeledet med AI-hjælp | 43 % |
| Rent menneskeskabt | 62 % |

Danmark er blandt de mest AI-skeptiske lande. Back-end-brug accepteres bredere:
stavning/grammatik (55 %), oversættelse (53 %), datastrukturering (45 %).
AI-labeling alene skaber ikke automatisk tillid — i nogle studier sænker det
tillidsvurderingen. Publikum forventer, at AI gør nyheder billigere men
mindre troværdige.

Konsekvens: Understand er den eneste genre, hvor AI-assisteret produktion er bredt
accepteret. Challenge og Inspire kræver navngivet menneskelig ophav — ikke som
redaktionel forsigtighedspolitik, men som forudsætning for produktets troværdighed
i det danske marked. Verificeringsmodellen i afsnit 4 er en direkte operationalisering
af dette.

---

## 1. Kildestruktur

Y.dk Business-motoren opererer med fem kildelag.

### 1.1 Supertrends-infrastruktur (primær motor)

Supertrends crawler 5.000 globale og nationale kilder 24/7. Det er
platformens primære signalkilde til branchetrends, international erhvervsudvikling
og fremtidsscenarier. Supertrends-indhold brandes "Powered by Supertrends".

**Konfiguration:** [AFVENTER KAPABILITETSRAPPORT FRA JENS/SUPERTRENDS]
- Hvilke af de 5.000 kilder er relevante for dansk SMV-segment?
- Kan kildeudvalg konfigureres per branche?
- Leverer motoren klassificerede feeds eller rådata?

### 1.2 Nationale nyhedskilder

| Kilde | Type | Integration | Prioritet |
|---|---|---|---|
| Ritzau | Nyhedsbureau | API/RSS | Kritisk |
| DR | Public service | RSS | Høj |
| TV2 Lorry / regionale | Regional | RSS | Middel |
| Berlingske, Politiken | Dagblade | RSS (offentlige feeds) | Middel |
| Børsen | Erhvervsmedie | RSS (offentlige feeds) | Lav — begrænset overlap |
| Finans.dk | Erhvervsmedie | RSS (offentlige feeds) | Lav — begrænset overlap |
| Branchemedier (per sektor) | Fagmedier | RSS | Høj — sektorspecifik |

**Note:** Dagblade og erhvervsmedier aggregeres til kontekst og signaldetektion
— ikke til genpublikation. Originalt indhold er Y's.

### 1.3 Regulatoriske og offentlige datakilder

Lovgivning, regulering og offentlige data er en central del af Y.dk Business'
value proposition. Disse kilder er gratis og udgør en konkurrencemæssig fordel,
der ikke kræver partnerskab.

| Kilde | Datatype | Relevans |
|---|---|---|
| Erhvervsstyrelsen CVR-API | Virksomhedsdata, direktørskifte, kapitalændringer | Markedsovervågning + leadgenerering |
| Erhvervsstyrelsen — lovgivning | Nye bekendtgørelser, lovforslag | Regulatory-alerts |
| Finanstilsynet | Tilladelser, sanktioner, cirkulærer | Finans + forsikring |
| Konkurrence- og Forbrugerstyrelsen | Fusioner, godkendelser, sager | C-level intelligence |
| Skatteforvaltningen (SKM) | Bindende svar, styresignaler | Compliance-alerts |
| EU-Tidende (EUR-Lex) | EU-forordninger, direktiver | Regulatory + eksport |
| Udbudsportalen (udbud.dk) | Offentlige udbud | Leadgenerering — særligt relevant |
| Statistik Danmark | Makroøkonomiske indikatorer | Branchetrends |

**[AFVENTER DYRBY]:** Prioritering af regulatoriske kildelag —
hvilke sektorer dækkes i fase 1 (oktober 2026)?

### 1.4 Internationale nyhedskilder (C-level og branchetrends)

| Kilde | Adgang | Note |
|---|---|---|
| Reuters | API (betalt) | Kritisk til C-level og international kontekst |
| Associated Press (AP) | API (betalt) | Supplerer Reuters |
| Bloomberg | RSS/syndikat (afventer aftale) | Finansielle nøgletal og markeder |
| Financial Times | RSS (offentlige feeds) | Strategisk analyse |
| Economist | RSS (offentlige feeds) | Makrotrends |

**[AFVENTER TECH LEAD]:** Reuters og AP — eksisterende aftaler på Y.dk-platformen?

### 1.5 Brancheorganisationer og erhvervskilder

| Kilde | Segment | Integration |
|---|---|---|
| DI Nyt, Dansk Erhverv | Industri og service | RSS / nyhedsbrev |
| IT-Branchen | Tech | RSS |
| Landbrug & Fødevarer | Agro/food | RSS |
| TEKNIQ | Byggeri og installation | RSS |
| SMVdanmark | SMV generelt | RSS |
| Dansk Industri — analyseudgivelser | Makro og erhvervspolitik | PDF-download + AI-bearbejdning |

---

## 2. AI-orkestrering — produktionspipeline

### 2.1 Overordnet pipeline

```
INGESTION → KLASSIFICERING → GENERERING → VERIFICERING → DISTRIBUTION
```

**Trin 1 — Ingestion**
Alle kilder crawles kontinuerligt. Supertrends-infrastrukturen håndterer
den tunge crawling. Regulatoriske og offentlige API'er polles med
fastsatte intervaller (se afsnit 2.2).

**Trin 2 — Klassificering**
Hvert inkommende signal klassificeres automatisk på:

| Parameter | Mulige værdier | Formål |
|---|---|---|
| Outputtype | Morgenbrief / Nyhedsfeed / Branchetrends / B2B-brief / Overvågningsalert / C-level | Routing til korrekt format |
| Redaktionel pillar | Understand / Challenge / Inspire | Vinkelprompt til AI |
| Branchetag | 12 primære sektorer (se 2.3) | Personalisering |
| Geografisk scope | Danmark / EU / International | Relevansstyring |
| Urgency | Breaking / Same day / Weekly | Publiseringstidsplan |
| Verificeringsniveau | Auto / Human review required | Redaktionelt filter |

**Trin 3 — Generering**
AI-prompten konfigureres per outputtype (se afsnit 3). Prompten injiceres med:
- Klassificeringsresultatet
- Brugerprofil (ved personaliseret output)
- Redaktionel pillar-instruktion
- Formatspecifikation (længde, struktur, tone)

**Trin 4 — Verificering**
Se afsnit 4.

**Trin 5 — Distribution**
Godkendt indhold distribueres til:
- Webfeed (real-time)
- Morgenbrief (kl. 06:30 dagligt)
- Push-notifikation (urgency-styret)
- Lyd (TTS-generering afslutter efter tekstgodkendelse)
- Ugentlig trendrapport (fredag kl. 12:00)

### 2.2 Polling-intervaller per kildetype

| Kildetype | Interval | Rationale |
|---|---|---|
| Ritzau API | Kontinuerligt (event-drevet) | Breaking news kræver real-time |
| CVR-API | Dagligt kl. 03:00 | Nok til overnight-ændringer |
| Regulatoriske myndigheder | 2x dagligt (06:00 + 14:00) | Bekendtgørelser udkommer typisk om morgenen |
| Udbud.dk | Dagligt kl. 04:00 | Udbudsfrister er dagsspecifikke |
| Statistik Danmark | Ugentligt + ved udgivelse | Indikatorudgivelser er planlagte |
| Supertrends | Kontinuerligt (motorinternt) | Supertrends' eget crawl-interval |
| Branchemedier / RSS | Hver 2. time | Tilstrækkeligt for ikke-breaking |
| Internationale RSS | Hver 4. time | Relevans falder ikke med timing |

### 2.3 Primære sektorer — fase 1

Motoren konfigureres til tolv sektorer ved launch:

1. Handel og e-handel
2. Byggeri og ejendom
3. IT og teknologi
4. Fødevarer og restauration
5. Finans og forsikring
6. Transport og logistik
7. Sundhed og velfærd
8. Industri og produktion
9. Energi og bæredygtighed
10. Marketing og kommunikation
11. Landbrug og agro
12. Rådgivning og jura

**[AFVENTER DYRBY]:** Er tolv sektorer det rigtige scope ved launch,
eller reduceres til 6-8 sektorer for at sikre tilstrækkelig dybde per sektor?

---

## 3. Outputformat per produktlag

### 3.1 Morgenbrief

**Formål:** Daglig prioriteret sammenfatning klar kl. 06:30.  
**Frekvens:** Dagligt (mandag–fredag).  
**Format:** Tekst + lyd (TTS).

**Struktur:**
```
OVERSKRIFT: [Dato] — Det vigtigste til din arbejdsdag

LEAD (40-60 ord): En sætning om hvad der er den vigtigste erhvervsnyhed i dag
og én sætning om hvad der er det relevante udbytte for abonnenten.

3-5 ITEMS:
- [BRANCHETAG] Overskrift — 2-3 sætninger. Pillar: Understand/Challenge/Inspire.
- [BRANCHETAG] Overskrift — 2-3 sætninger.
...

LUKKE: Én sætning. Ikke en opsummering — en vinkel fremad.
```

**Længde:** 350–500 ord (tekst). Lyd: 2–3 minutter.  
**Personalisering:** Items rangeres efter brugerprofil — branchetags og
sektortilhørsforhold vægtes højest.  
**Verificeringsniveau:** Human review krævet — se afsnit 4.2.

**[AFVENTER DYRBY]:** Skal morgenbrief have et fast redaktionelt "highlight"
(ét valgt primæritem udvalgt af redaktionen dagligt) eller er al rangering algoritmisk?

---

### 3.2 Nyhedsfeed

**Formål:** Løbende feed med erhvervsrelevante nyheder hele dagen.  
**Frekvens:** Kontinuerligt — estimeret 15–30 items dagligt.  
**Format:** Tekst + lyd (TTS).

**Struktur per item:**
```
OVERSKRIFT (maks. 10 ord)
RUBRIK (1 sætning — hvad skete der + hvad betyder det)
BRØDTEKST (150–300 ord): fakta, kontekst, konsekvens for virksomheder
KILDE-TAGS: [Kilde] / [Branche] / [Pillar: Understand/Challenge/Inspire]
```

**Pillar-fordeling (mål):**
- Understand: 60% af feed
- Challenge: 25% af feed
- Inspire: 15% af feed

**Verificeringsniveau:** Blandet — se afsnit 4.

---

### 3.3 Branchetrends

**Formål:** Ugentlig strategisk trendrapport per sektor.  
**Frekvens:** Én per sektor per uge (tolv sektorer = tolv rapporter ugentligt).  
**Format:** HTML-artikel + PDF-download + lyd.

**Struktur:**
```
OVERSKRIFT: [Sektor] — Uge [nr.], [år]

RESUMÉ (3 bullets, maks. 2 linjer per bullet)

SEKTIONERNE:
1. Hvad skete der — faktaresumé af ugens vigtigste bevægelser (200 ord)
2. Hvad driver det — underliggende kræfter og kontekst (150 ord)
3. Hvad betyder det for dig — implikationer for virksomheder i sektoren (150 ord)
4. Hvad sker der næste uge — regulatory, planlagte udgivelser, begivenheder (100 ord)
```

**Samlet længde:** 700–800 ord. Lyd: 4–5 minutter.  
**Verificeringsniveau:** Human review krævet — se afsnit 4.2.

**[AFVENTER DYRBY]:** Udgives alle tolv branchetrends på samme dag,
eller distribueres de over ugen (2-3 per dag)?

---

### 3.4 B2B-briefs

**Formål:** On-demand, handlingsorienterede situationsbriefs.  
**Frekvens:** On-demand (bruger-triggeret) + redaktionelt udvalgte (2-3/uge).  
**Format:** Tekst. Ingen lyd-version (on-demand = øjeblikkelig).

**Tre brieftyper:**

**Type A — Situationsbrief (on-demand)**
Trigger: bruger spørger om specifik virksomhed, konkurrent, regulering eller marked.

```
SITUATION: Hvad er tilfældet — fakta (50 ord)
KONTEKST: Baggrund og drivere (75 ord)
KONSEKVENS: Hvad det betyder for virksomheder i [branche] (75 ord)
HANDLING: Tre konkrete handlingsmuligheder (3 bullets)
KILDE: [primær kilde] + [dato]
```

**Type B — Regulatory brief (automatisk ved ny regulering)**
Trigger: ny regulering, bekendtgørelse eller EU-direktiv detekteret.

```
HVAD ER VEDTAGET: [reguleringstype], [ikrafttrædelsesdato]
HVEM BERØRES: Virksomheder i [sektorer] med [kriterier]
HVAD KRÆVES: Konkrete krav og frister (bullets)
RISIKO VED MANGLENDE HANDLING: Bøde/sanktionsniveau
HVEM KAN HJÆLPE: Relevante rådgivere / organisationer (ikke kommerciel)
```

**Type C — Markedssignalbrief (automatisk ved signal)**
Trigger: CVR-ændring, udbud annonceret, konkurrent-event detekteret.

```
SIGNAL: [hvad skete der] — [dato]
HVEM: [virksomhed/branche/marked]
MULIGHED: Konkret handlingsvinkel for abonnenten (50 ord)
```

**Verificeringsniveau:** Type A og C — auto (lav menneskelig review-belastning).
Type B (regulatory) — human review krævet inden publisering.

---

### 3.5 Markedsovervågning

**Formål:** Personaliseret overvågning af definerede brands, virksomheder og søgeord.  
**Format:** Push-notifikation + ugentlig sammenfatning.

**Konfiguration per bruger:**
- Op til 5 brands/personer/virksomheder (Erhverv+)
- Op til 10 brands/virksomheder + CVR-overvågning (Erhverv Premium)

**Alert-typer:**

| Triggertype | Kilde | Urgency |
|---|---|---|
| Medieomtale (brand/person) | Nationale og internationale medier | Same day |
| CVR-ændring (direktørskifte, kapital, fusioner) | CVR-API | Same day |
| Regulatory-nævnelse | Myndighedskilder | Same day |
| Udbud (branche-match) | Udbud.dk | Same day |
| Konkurrentsignal (CV, ekspansion, nedlukning) | Medier + CVR | Same day |

**Ugentlig sammenfatning:** Auto-genereret. Ingen human review.  
**Breaking alert:** Auto-push. Ingen human review (kilden er verificerbar og faktuel).

---

### 3.6 C-level indhold

**Formål:** Dybdegående strategisk analyse og research til topledelser.  
**Frekvens:** 3–5 stykker ugentligt.  
**Format:** Tekst (800–1.200 ord) + lyd. Kun tilgængeligt i Erhverv+ og Premium.

**Indholdsprofil:**
- Strategisk analyse: makroøkonomiske og geopolitiske tendenser med
  direkte konsekvens for dansk erhvervsliv
- Ekspertopinion: navngivne kommentatorer — ikke anonyme "eksperter"
- Datadrevet research: statistisk grundlag, ikke assertions
- International kontekst: Reuters, AP og Bloomberg som primære inputkilder

**[AFVENTER DYRBY]:** Kommentatornetværk — hvem er Y's navngivne stemmer
i C-level-sektionen? DI-økonom? Erhvervsjurist? International analytiker?

**Verificeringsniveau:** Human review krævet for al C-level indhold.

---

## 4. Verificeringsmodel

### 4.1 Princip

"AI producerer, mennesker verificerer" er ikke et disclaimer — det er
produktets redaktionelle model. Verificeringsmodellen definerer præcist
hvad der kræver menneskelig godkendelse, og hvad der kan auto-publiseres.

Modellen er designet til to mål:
1. Skalering: ikke alt kan menneskereviewes — men alt med juridisk,
   etisk eller troværdighedsmæssig risiko skal det.
2. Transparens: brugeren ved hvad der er AI-genereret og hvad der er
   redaktionelt kurateret — det er en styrke, ikke en svaghed.

Det empiriske grundlag for skellet mellem auto-publisering og human review
er dokumenteret i den strategiske ramme (AI-troværdighed): Understand kan
AI-produceres bredt; Challenge og Inspire kræver navngivet menneskelig ophav.

### 4.2 Verificeringsniveauer

**Niveau 0 — Auto-publisering (ingen human review)**
Indhold der auto-publiseres uden redaktionel gennemgang:

- Markedsovervågnings-alerts (kilden er faktuel og verificerbar — CVR, mediecitat)
- Type C B2B-briefs (signal-baserede — præcis faktakilde)
- Ugentlige overvågningssammenfatninger
- Statistik Danmark-nøgletal med automatisk kontekstsætning

**Niveau 1 — Spot-check (stikprøvevis human review)**
Indhold der publiseres automatisk, men undergår stikprøvekontrol:

- Nyhedsfeed-items (Understand-pillar, indenlandske nyheder)
- Branchetrends-resuméer (statistisk baserede)

**Niveau 2 — Human review krævet inden publisering**
Indhold der ikke publiseres uden redaktionel godkendelse:

- Morgenbrief (dagligt — ansvarlig redaktør godkender senest kl. 06:00)
- Alle Challenge-vinkler (myteafvisning, modperspektiv)
- C-level indhold
- Type B regulatory briefs
- Alt indhold med navngivne privatpersoner i potentielt kritisk kontekst
- Alt indhold om politiske partier eller politikere
- Alt internationalt indhold der oversætter eller fortolker udenlandsk regulering

**Niveau 3 — Chefredaktør-eskalation**
Indhold der eskaleres til chefredaktørens godkendelse:

- Enhver artikel der kan medføre juridisk risiko (ærekrænkelse, GDPR)
- Indhold om ejerkredsen eller direkte interessenter i Y
- Enhver Challenge-artikel der navngiver privatpersoner negativt
- Indhold der berører redaktionens uafhængighed af kommercielle partnere

### 4.3 Redaktionel bemanding

**[AFVENTER DYRBY]:** Hvem er ansvarlig for daglig verificering, og
hvad er den tilgængelige kapacitet (timer per dag)?

Følgende stillinger/roller skal mappes til verificeringsmodellen:

| Opgave | Frekvens | Tidsestimat | Ansvarlig |
|---|---|---|---|
| Morgenbrief-godkendelse | Dagligt kl. 05:45–06:00 | 15 min | [Afventer] |
| Nyhedsfeed spot-check | 2x dagligt | 20 min/gang | [Afventer] |
| Branchetrends-godkendelse | Ugentligt | 45 min/rapport | [Afventer] |
| C-level godkendelse | 3-5x ugentligt | 20 min/stk. | [Afventer] |
| Regulatory briefs | Ad hoc | 15 min/stk. | [Afventer] |
| Chefredaktør-eskalation | Sjældent | 30 min/sag | Dyrby |

**Samlet estimeret redaktionel kapacitet (fase 1):** [AFVENTER DYRBY]

---

## 5. Produktionsvolumen — målsætninger ved launch

Estimaterne forudsætter teknisk konfigurering afsluttet juli 2026
og testperiode august 2026.

| Outputtype | Frekvens | Dagligt volumen |
|---|---|---|
| Morgenbrief | 1 per dag (mandag–fredag) | 1 |
| Nyhedsfeed-items | Løbende | 15–25 items |
| Branchetrends | 12/uge (fordelt 3 per dag) | Ca. 2 |
| B2B-briefs (auto) | Triggerbaseret | 5–15 |
| C-level analyser | 3–5/uge | Ca. 1 |
| Markedsovervågning-alerts | Triggerbaseret | Varierer |

**[AFVENTER DYRBY]:** Er volumen realistisk givet Tech Leads estimat
på motor-kapacitet? Skal vi specificere et minimum og et mål-niveau?

---

## 6. Åbne beslutninger (kræver Dyrby-input inden 22. juni)

| # | Beslutning | Konsekvens ved manglende afklaring |
|---|---|---|
| D1 | Redaktionel bemanding og kapacitet (timer/dag) | Verificeringsmodellen kan ikke designes endeligt |
| D2 | Sektor-scope ved launch — 6-8 eller 12 sektorer | Motorkonfiguration og datavolumen påvirkes |
| D3 | Morgenbrief — algoritmisk rangering vs. redaktionelt "highlight" | Produktionspipeline-design |
| D4 | Kommentatornetværk til C-level sektionen | C-level indhold kan ikke specificeres endeligt |
| D5 | Branchetrends — distribueret over ugen eller samlet fredag | Redaktionsplan og motorkonfiguration |
| D6 | Produktionsvolumen — minimum vs. mål | SLA-aftale med Supertrends |

---

## 7. Udeståender — Tech Lead-afklaringer

| # | Afklaring | Blokerer |
|---|---|---|
| T1 | Reuters/AP — eksisterende API-aftaler på Y.dk-platformen? | Kildestruktur kan ikke lukkes |
| T2 | TTS-integration — hvilken engine, og hvad er latency? | Lyd-format i morgenbrief og feed |
| T3 | CVR-API — direkte adgang eller via tredjepart? | Markedsovervågning og leadgenerering |
| T4 | Personaliserings-lag — hvad understøtter platformen i dag? | Morgenbrief og feed personalisering |
| T5 | Supertrends kapabilitetsrapport — hvornår leveres den? | Kildestruktur afsnit 1.1 kan ikke lukkes |

---

*Næste version (0.3) integrerer Dyrby-input og lukker åbne beslutninger.*  
*Final version (1.0) leveres senest 22. juni 2026 til Tech Lead og CEO.*
