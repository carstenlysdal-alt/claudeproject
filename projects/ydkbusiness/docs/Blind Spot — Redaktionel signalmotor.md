# Blind Spot — Redaktionel signalmotor

**Version:** 0.1  
**Dato:** 15. juni 2026  
**Status:** Konceptdokument — klar til teknisk review  
**Primær læser:** Journalist, redaktør  
**Sekundær læser:** Tech Lead, produktudvikler  
**Sprog:** Dansk prosa. Engelsk i tekniske specs, JSON og promptstruktur.

---

## Koncept

Erhvervsmedierne dækker det samme. De citerer de samme kilder, bruger de samme fortolkningsrammer og stiller de samme spørgsmål. Det er ikke ondsindet — det er strukturelt. Kildehierarkiet favoriserer topchefer og brancheorganisationer. Beat-strukturen skaber blinde vinkler i grænselandet mellem stofområder. Nyhedspresset belønner det hurtige og det konfliktdrevne frem for det komplekse og det langsomme.

Blind Spot er et redaktionelt værktøj, der systematisk afdækker disse huller og giver journalisten et beslutningsklart signal: her er, hvad ingen har skrevet — og her er den sandsynlige forklaring på, hvorfor.

Det er ikke mediekritik. Det er redaktionel service.

Blind Spot spørger ikke, om de andre er gode nok. Det spørger, hvad deres nyhedslogik gør usynligt — og om det usynlige er en historie.

---

## Formål

Blind Spot er et redaktionelt værktøj til journalister. Det hjælper med systematisk at identificere, hvad erhvervsmedierne ikke dækker — og forklarer, hvorfor hullet sandsynligvis er der.

Formålet er ikke at finde emner, andre medier har glemt. Formålet er at opdage mønstre:

- emner med ingen eller lav dækning
- emner med disproportionalt lav dækning
- emner der dækkes ensidigt
- emner hvor bestemte kilder, aktører eller konsekvenser er fraværende
- emner hvor en venstre/højre-konflikt skjuler en mere interessant strukturel forklaring

Blind Spot fungerer som en redaktionel vejrhane: den måler ikke kun, hvad der sker i verden, men hvordan nyhedsmedierne vælger at se verden.

---

## Hvad systemet er — og hvad det ikke er

Blind Spot er et **triggerbaseret** journalistværktøj. Det kører ikke autonomt. Det aktiveres af journalisten og returnerer et beslutningsklart signal, der kan bruges som input til redaktionel vurdering, research og publicering.

Systemet leverer:

```
Blind Spot Signal
```

Systemet leverer ikke:

```
Blind Spot Artikel
```

AI-systemet kan konkludere:

> Dette er et sandsynligt Blind Spot med høj signalstyrke.

AI-systemet konkluderer ikke alene:

> Dette er sandheden, og sådan publicerer vi det.

---

## Grunddefinition

Et Blind Spot er et dokumenterbart emne, signal eller framingmønster med væsentlig erhvervsmæssig betydning, som i den relevante periode ikke er blevet dækket selvstændigt, proportionelt eller perspektivmæssigt balanceret af det definerede konkurrentunivers — og hvor fraværet eller skævheden kan forklares med en identificerbar redaktionel, strukturel, institutionel eller ideologisk mekanisme.

---

## De seks typer

### 1. Dækningsblindhed

Et væsentligt emne dækkes ikke.

> Eksempel: En ny myndighedsvejledning får stor betydning for danske SMV'er, men ingen erhvervsmedier omtaler den.

### 2. Proportionalitetsblindhed

Et væsentligt emne dækkes kun overfladisk.

> Eksempel: Et reguleringsindgreb med stor økonomisk betydning dækkes kun som kort notits.

### 3. Vinkelblindhed

Et emne dækkes, men kun gennem én dominerende fortolkningsramme.

> Eksempel: Grøn industristøtte dækkes som konkurrenceevne, men ikke som magtforskydning mellem store virksomheder og SMV'er.

### 4. Kildeblindhed

Bestemte kildetyper dominerer dækningen, mens andre relevante kilder er fraværende.

> Eksempel: Topchefer og brancheorganisationer citeres bredt, mens underleverandører, arbejdstagere eller kunder ikke indgår.

### 5. Konsekvensblindhed

Nogle konsekvenser beskrives detaljeret, mens andre er usynlige.

> Eksempel: Omkostninger for virksomheder dækkes grundigt, mens konsekvenser for lokalsamfund, lønmodtagere eller konkurrencestruktur ikke dækkes.

### 6. Spektrumblindhed

Et emne placeres automatisk i en kendt venstre/højre-konflikt, selv om en anden forklaringsmodel er mere relevant.

> Eksempel: Arbejdsmiljøkrav dækkes som enten byrde for erhvervslivet eller beskyttelse af ansatte, mens den strukturelle vinkel om automatisering og underleverandøransvar overses.

---

## Journalistens rolle

Blind Spot trigges af journalisten. Ikke af en scheduler, ikke af en algoritme.

Journalisten bestemmer:

- hvilket emne eller hvilken uge der analyseres
- hvilke konkurrenter der indgår i analysen
- om signalet er stærkt nok til at gå videre med
- hvad der publiceres, og hvornår

Systemet leverer beslutningsgrundlag. Journalisten træffer beslutningen.

Typisk trigger-scenarie:

> Journalisten har set en uge med intensiv dækning af ét emne og vil vide, hvilken vinkel ingen har taget.

> Journalisten har modtaget et kildesignal og vil vide, om det allerede er dækket — og i givet fald hvordan.

> Redaktøren vil have et ugentligt overblik over ugens underbelyste erhvervssignaler.

---

## Systemets inputlag

Systemet arbejder med to inputlag.

### A. Konkurrentlaget

Systemet overvåger et fast defineret konkurrentunivers.

**Primære erhvervsmedier (forslag):**

| Medie | Type |
|---|---|
| Børsen | Dagligt erhvervsmedie |
| Finans | Dagligt erhvervsmedie |
| Berlingske Business | Dagligt erhvervsmedie |
| InsideBusiness | Premium B2B |
| MarketWire | Finansnyheder |
| FinansWatch | Branchespecifikt |
| Computerworld / Version2 | Tech og digitalisering |
| EjendomsWatch / EnergiWatch | Branchespecifikt |
| Altinget Erhverv | Politisk-erhverv |

**Sekundære medier:**

DR, TV 2, Ritzau, Politiken Erhverv, Jyllands-Posten Finans, Information, lokale erhvervssektioner.

For hver artikel gemmes:

```json
{
  "document_id": "string",
  "source": "string",
  "source_type": "competitor_news | secondary_news | agency",
  "published_at": "ISO8601",
  "retrieved_at": "ISO8601",
  "title": "string",
  "text": "string",
  "entities": ["string"],
  "topics": ["string"],
  "document_role": "telegram | notits | nyhed | artikel | analyse | interview | kommentar | opfølgning",
  "language": "da",
  "url": "string",
  "hash": "string"
}
```

Systemet skelner mellem dokumentroller. En blind vinkel forsvinder ikke, fordi et medie har bragt en kort notits.

**Om betalingsmursindhold:**  
Systemet har begrænset adgang til indhold bag betalingsmure. Signaler baseret på konkurrentlaget markeres med `paywall_coverage_risk: true`, når der er risiko for, at relevant dækning eksisterer, men ikke er indlæst. Journalisten verificerer manuelt ved behov.

### B. Signallaget

Systemet overvåger kilder, der viser, hvad der faktisk sker i erhvervslivet.

**Institutionelle kilder:**

CVR, regnskaber, selskabsmeddelelser, Finanstilsynet, Konkurrence- og Forbrugerstyrelsen, Erhvervsstyrelsen, EU-Kommissionen, Folketinget, ministerier, høringsportalen, domstole, udbudsportaler, tilsynsrapporter.

**Markedskilder:**

Nasdaq Copenhagen, kapitalmarkedsmeddelelser, konkursdata, jobopslag, patentdata, ejendomstransaktioner.

**Branche- og ekspertkilder:**

Brancheorganisationer, fagforeninger, tænketanke, analysehuse, rapporter, konferencer.

**Alternative signaler:**

LinkedIn-posts fra nøglepersoner, podcast-transskriptioner, niche-nyhedsbreve, investorpræsentationer, kommunale dagsordener.

For hvert signal gemmes:

```json
{
  "signal_id": "string",
  "source": "string",
  "source_type": "institutional | market | industry | expert | alternative",
  "published_at": "ISO8601",
  "topic": "string",
  "entities": ["string"],
  "industry": "string",
  "geography": "string",
  "signal_type": "string",
  "business_consequence": "string",
  "newsworthiness_score": 0.0,
  "documentation_grade": "low | medium | high",
  "uniqueness": 0.0,
  "time_sensitivity": "low | medium | high"
}
```

---

## Analysemoduler

### 1. Entity and Topic Engine

Normaliserer aktører og emner på tværs af kilder.

```
"Novo", "Novo Nordisk", "Novo Nordisk A/S", "NVO" → samme entitet
"AI-regulering", "EU AI Act", "kunstig intelligens-lovgivning" → beslægtet emnecluster
```

Output: `entity_id`, `topic_id`, branche, geografi, relationer.

### 2. Signal Clustering Engine

Samler ugens signaler i emneclusters og identificerer mønstre, hvor flere svage signaler peger i samme retning uden at nogen har skrevet historien.

> Eksempel: Nationalbank-analyse + revisionshusrapport + konkursstatistik + bankdirektørinterview peger alle mod refinansieringsvanskeligheder i SMV-segmentet. Ingen erhvervsmedier har samlet det.

### 3. Coverage Gap Engine

Måler dækningsniveau per emne:

| Niveau | Beskrivelse |
|---|---|
| 0 | Ingen dækning |
| 1 | Perifer omtale |
| 2 | Faktuel notits |
| 3 | Selvstændig journalistisk behandling |
| 4 | Dybdegående analyse eller opfølgning |

Vægtet efter dokumentrolle:

```
telegram/notits:       0.2
kort nyhed:            0.4
selvstændig artikel:   0.7
analyse/interview:     1.0
serie/opfølgning:      1.3
```

### 4. Framing Engine

For hver artikel identificeres:

- problemdefinition
- årsagsforklaring
- ansvarsplacering
- løsningslogik
- primære og sekundære kilder
- berørte aktører
- sprogmarkører
- udeladte perspektiver

```json
{
  "dominant_frame": "market_competitiveness",
  "secondary_frames": ["geopolitical_industrial_race"],
  "missing_frames": ["distributional_effects", "labour_market_effects", "market_concentration"],
  "right_market_lean": 0.74,
  "left_distributional_lean": 0.18,
  "technocratic_governance_lean": 0.41,
  "confidence": 0.69
}
```

### 5. Political Lean / Spectrum Engine

Systemet måler framingindikatorer, ikke partipolitisk intention.

**Framingkategorier:**

| Kategori | Typiske sprogmarkører |
|---|---|
| Markedsframing | byrder, konkurrenceevne, vækst, investeringer, rammevilkår |
| Fordelingsframing | ulighed, rettigheder, løn, magtforhold, social konsekvens |
| Styringsframing | samfundsansvar, kontrol, tilsyn, offentlig interesse |
| Teknokratisk framing | effektivitet, data, incitamenter, produktivitet, governance |
| Anti-elite-framing | magtelite, lukkethed, særinteresser, systemet beskytter sig selv |

Systemet skriver:

> Dækningen er domineret af markeds- og konkurrenceevneframing.

Systemet skriver ikke:

> Mediet har højrebias.

### 6. Source Diversity Engine

Måler kildefordeling og identificerer overrepræsentation og fravær.

```json
{
  "source_mix": {
    "ceo": 6,
    "industry_org": 5,
    "minister": 3,
    "economist": 3,
    "worker_org": 1,
    "sme": 0,
    "consumer_org": 0,
    "municipality": 0,
    "independent_researcher": 1
  },
  "source_concentration_score": 0.81,
  "missing_source_classes": ["SME", "worker_org", "consumer_org"]
}
```

Bias opdages ofte bedre gennem kildefordelingen end gennem ordvalget.

### 7. Institutional Cause Engine

Systemet foreslår en institutionel forklaring på hullet baseret på observerbare mønstre — ikke fri fortolkning.

**Mulige årsagskategorier:**

| Årsag | Beskrivelse |
|---|---|
| Kildeadgang | Sagen ligger i tekniske dokumenter og nichekilder |
| Redaktionsøkonomi | Lav umiddelbar klikværdi, høj researchtid |
| Beat-struktur | Sagen falder mellem klassiske stofområder |
| Narrative bias | Sagen passer dårligt til ugens dominerende fortælling |
| Timing | Sagen druknede i større nyheder |
| Kompleksitet | Sagen kræver forklaring af mekanismer og regulering |
| Geografisk bias | Sagen opstår uden for København/Aarhus |
| Kildehierarki | Sagen kommer fra lavstatuskilder trods høj substans |
| Manglende konfliktperson | Ingen tydelig skurk, offer eller kendt topchef |
| Forvekslet med niche | Sagen ligner brancheniche men har bred erhvervsrelevans |

```json
{
  "likely_cause": "beat_structure_gap",
  "cause_explanation": "The issue sits between industrial policy, competition law and labour market coverage.",
  "evidence": [
    "coverage appears in policy and business sections but not labour market coverage",
    "dominant sources are CEOs and industry organisations",
    "underlying documents are regulatory rather than press-release driven"
  ],
  "confidence": 0.62
}
```

---

## Kerneobjekt: Blind Spot Signal

Systemets centrale output er et struktureret signalobjekt.

```json
{
  "signal_id": "BS-2026-W24-003",
  "title": "Grøn industristøtte dækkes som konkurrenceevne, ikke som magtforskydning",
  "status": "active",
  "confidence": 0.78,
  "blind_spot_type": ["framing_gap", "source_gap", "consequence_gap"],
  "topic_cluster": "green_industrial_policy",
  "first_detected": "2026-06-10T09:42:00",
  "last_updated": "2026-06-12T07:10:00",
  "signal_strength": 0.84,
  "coverage_gap": 0.63,
  "framing_skew": 0.71,
  "business_relevance": 0.88,
  "verification_burden": "medium",
  "paywall_coverage_risk": false,
  "recommended_action": "review_for_weekly_blind_spot"
}
```

---

## Systemarkitektur

```
[Supertrends + RSS + kildelister + nyhedskilder]
        ↓
[Ingestion og deduplikering]
        ↓
[Raw document store]
        ↓
[Metadata enrichment]
        ↓
[Entity extraction + topic clustering]
        ↓
[Embedding index]
        ↓
[Coverage Gap Engine]
        ↓
[Framing Engine]
        ↓
[Source Diversity Engine]
        ↓
[Institutional Cause Engine]
        ↓
[Scoring Engine]
        ↓
[Versioning / Event Log]
        ↓
[Journalist trigger → Signal output]
```

---

## Trigger og pipeline

Systemet kører ikke autonomt. Det aktiveres af journalisten.

**Trigger-flow:**

```
Journalist trigger
        ↓
System henter ugens dokumenter fra raw store
        ↓
Kører analysemoduler på det valgte tidsvindue og emnerum
        ↓
Scorer kandidater
        ↓
Returnerer top-signals til journalist
        ↓
Journalist vurderer og beslutter
```

**Tidsvindue:** Journalisten definerer tidsvinduet (typisk seneste 7 dage). Systemet kan søge 90-180 dage tilbage for at vurdere historisk dækning og undgå falske positiver.

**Emnerum:** Journalisten kan afgrænse til specifikke brancher, emner, geografi eller konkurrentmedier.

---

## Scoring

Blind Spot-score beregnes som vægtet sum:

| Parameter | Vægt |
|---|---|
| Erhvervsrelevans | 25 % |
| Dokumentationsgrad | 20 % |
| Signalstyrke | 15 % |
| Dækningsgab | 15 % |
| Framing-skævhed | 10 % |
| Aktualitet | 10 % |
| Strategisk relevans | 5 % |

```json
{
  "business_relevance": 0.88,
  "documentation_strength": 0.76,
  "signal_strength": 0.84,
  "coverage_gap": 0.63,
  "framing_skew": 0.71,
  "novelty_score": 0.67,
  "overall_blind_spot_score": 0.82
}
```

Kun kandidater med `overall_blind_spot_score > 0.65` præsenteres for journalisten.

---

## Beslutningslogik

Et signal oprettes, når:

```
business_relevance > 0.70
AND documentation_strength > 0.55
AND (
    coverage_gap > 0.65
    OR framing_skew > 0.70
    OR source_concentration > 0.75
)
AND novelty_score > 0.50
```

Et signal opgraderes, når nye kilder bekræfter mønsteret, eller konkurrenter gentager den dominerende framing uden at tilføje nye perspektiver.

Et signal nedgraderes, når en konkurrent dækker den manglende vinkel, dokumentationsgraden falder, eller emnet er forældet.

Et signal arkiveres, når:

```
coverage_gap < 0.30
OR age > 14 dage
OR documentation_strength < 0.40
```

---

## Versionering

Hvert signal versioneres. Journalisten kan se, hvordan signalet har udviklet sig:

```json
{
  "signal_id": "BS-2026-W24-003",
  "version": 4,
  "timestamp": "2026-06-12T07:10:00",
  "change_type": "coverage_update",
  "previous_score": 0.82,
  "new_score": 0.71,
  "reason": "Finans published an analysis including SME access to support schemes.",
  "changed_fields": ["coverage_gap", "missing_frames", "confidence"],
  "new_documents": ["DOC-849923"]
}
```

Versionering besvarer spørgsmålet:

> Var dette et blind spot hele ugen, eller kun indtil nogen dækkede det torsdag?

---

## Outputformat til journalist

Hvert signal præsenteres på én skærm:

```
Titel
Kort påstand
Blind spot-type
Score
Hvorfor nu?
Kildesignaler
Konkurrentstatus
Framingdiagnose
Kildegap
Konsekvensgap
Mulig institutionel årsag
Hvad har ændret sig siden seneste version?
Risiko for falsk positiv
Anbefalet journalistisk handling
```

---

## Standardprompt

### System prompt

```
Du er et redaktionelt analysesystem for et dansk erhvervsmedie. Din opgave er at analysere kildesignaler og nyhedsdækning, identificere mulige Blind Spots og levere beslutningsklare signaler til journalisten.

Du skriver ikke færdige artikler. Du genererer strukturerede Blind Spot Signals.

Et Blind Spot kan være:
- Et væsentligt emne der ikke er dækket
- Et væsentligt emne der er underdækket
- Et emne der dækkes gennem ensidig framing
- Et emne hvor bestemte kilder, aktører eller konsekvenser mangler
- Et emne hvor dækningen har et tydeligt framing-lean på et politisk, økonomisk eller institutionelt spektrum

Du tilskriver aldrig medierne politisk intention. Du beskriver observerbare framingmønstre, kildefordeling, dækningsgrad og fravær.

Du skelner altid tydeligt mellem:
- observation
- fortolkning
- evidens
- usikkerhed
- anbefalet handling

Du er konservativ i dine konklusioner. Brug formuleringer som:
- "systemet indikerer"
- "muligt framing-gap"
- "sandsynligt source-gap"
- "dækningen er domineret af"
- "begrænset repræsentation af"

Undgå:
- "medierne har bias"
- "medierne skjuler"
- "medierne overser bevidst"
- "pressen sov i timen"
- "dækningen er højreorienteret"
```

### Task prompt

```
Analyser de indlæste kildesignaler og nyhedsdækning for det angivne tidsvindue og emnerum.

Identificér potentielle Blind Spot Signals.

For hvert signal vurderes:

1. Hvad er emnet?
2. Hvad er det primære kildesignal?
3. Hvilken erhvervsmæssig betydning har det?
4. Hvordan er emnet dækket i nyhedsmedierne?
5. Er der et dækningsgab?
6. Er der et proportionalitetsgab?
7. Er der et framinggab?
8. Hvilke kilder dominerer dækningen?
9. Hvilke kilder mangler?
10. Hvilke konsekvenser dominerer?
11. Hvilke konsekvenser mangler?
12. Hvilken framing dominerer?
13. Hvilken mulig institutionel årsag forklarer hullet?
14. Hvad er evidensen?
15. Hvor sikker er vurderingen?
16. Hvad har ændret sig siden seneste version?
17. Hvad bør journalisten gøre?

Returnér kun signaler med dokumenterbar erhvervskonsekvens og et dæknings-, framing- eller kildegab.

Outputformat:

## Blind Spot Signal

### Titel
[Præcis titel]

### Signal-ID
[Unik ID: BS-YYYY-WNN-NNN]

### Status
[emerging | active | persistent | decaying | archived]

### Kort påstand
[Én præcis sætning]

### Blind spot-type
[dækningsgab | proportionalitetsgab | framinggab | source-gap | consequence-gap | spektrumgab]

### Hvorfor nu?
[Hvad udløste signalet?]

### Kildesignaler
- [Kilde 1]
- [Kilde 2]

### Konkurrentdækning
[Hvem har dækket hvad og hvordan]

### Dækningsvurdering
[ingen | perifer | notits | selvstændig | analyse | underdækket]

### Framingdiagnose
[Dominerende framing og manglende framing]

### Spektrumindikator
[fx markedsorienteret, fordelingsorienteret, teknokratisk, styringsorienteret, blandet]

### Kildegap
[Hvad dominerer, hvad mangler]

### Konsekvensgap
[Hvad dominerer, hvad mangler]

### Mulig institutionel årsag
[Kategori + forklaring + evidens]

### Score
- Erhvervsrelevans: [0-100]
- Dokumentationsgrad: [0-100]
- Dækningsgab: [0-100]
- Framing-skævhed: [0-100]
- Kildekoncentration: [0-100]
- Samlet Blind Spot-score: [0-100]

### Usikkerhed
[lav | middel | høj]

### Risiko for falsk positiv
[Hvad kan gøre signalet forkert?]

### Betalingsmursrisiko
[true | false — er der risiko for at relevant konkurrentdækning ikke er indlæst?]

### Version
[Nummer]

### Ændring siden seneste version
[Hvad er nyt?]

### Anbefalet handling
[review | monitor | escalate | archive]
```

---

## Eksempel: færdigt Blind Spot Signal

```
## Blind Spot Signal

### Titel
Grøn industristøtte dækkes som konkurrenceevne, ikke som magtforskydning

### Signal-ID
BS-2026-W24-003

### Status
Active

### Kort påstand
Ugens erhvervsdækning af grøn industristøtte er domineret af konkurrenceevne- og rammevilkårsframing, mens spørgsmål om markedsmagt, adgangsbarrierer og underleverandørers position er svagt belyst.

### Blind spot-type
Framinggab, source-gap, consequence-gap

### Hvorfor nu?
EU-vejledning, brancheudmeldinger og virksomhedsreaktioner har sat grøn industristøtte på dagsordenen, og flere erhvervsmedier har dækket emnet i samme uge.

### Kildesignaler
- EU-vejledning om statsstøtte til grøn industri
- DI-udmelding om industrikonkurrence
- Virksomhedsudmelding om mulig udflytning
- Tænketanksanalyse om støtteordningers fordeling
- Fagforbundsudmelding om lokale jobeffekter

### Konkurrentdækning
Børsen: 3 artikler — konkurrenceevne, rammevilkår.
Finans: 2 artikler — udflytningstrussel, politisk handling.
Berlingske Business: 1 analyse — EU's industrikapløb.
MarketWire: 2 telegrammer — virksomhedsudmelding.
Watch-medier: 1 artikel — energitunge virksomheders støttebehov.

### Dækningsvurdering
Emnet er dækket, men underbelyst fra fordelings-, konkurrence- og arbejdsmarkedsperspektiv.

### Framingdiagnose
Dominerende: markeds- og konkurrenceevneframing.
Manglende: markedsmagt, støttefordeling, SMV-adgang, underleverandørafhængighed, lokale arbejdsmarkedseffekter.

### Spektrumindikator
Markedsorienteret: høj. Fordelingsorienteret: lav. Teknokratisk: middel.

### Kildegap
Dominerende: topchefer, brancheorganisationer, økonomer, politiske aktører.
Manglende: SMV'er, underleverandører, fagforbund, kommuner, konkurrenceretseksperter.

### Konsekvensgap
Dækket: konkurrenceevne, industriarbejdspladser, erhvervslivets rammevilkår.
Udækket: effekt på markedsstruktur, afhængighed i værdikæder, adgangsbarrierer for mindre virksomheder.

### Mulig institutionel årsag
Sagen passer naturligt ind i erhvervsmediernes rammevilkårslogik. Den alternative vinkel krydser beat-grænser mellem industri, regulering, konkurrence, arbejdsmarked og SMV-stof og kræver kildetyper, der ikke indgår i den faste kildestruktur.

### Score
- Erhvervsrelevans: 88
- Dokumentationsgrad: 76
- Dækningsgab: 63
- Framing-skævhed: 71
- Kildekoncentration: 81
- Samlet Blind Spot-score: 84

### Usikkerhed
Middel

### Risiko for falsk positiv
Der kan eksistere dybere konkurrentdækning bag betalingsmure, som systemet ikke har indlæst fuldt. Mulige relaterede artikler er identificeret men ikke verificeret.

### Betalingsmursrisiko
true

### Version
4

### Ændring siden seneste version
Signalet steg fra 76 til 84 — tre nye konkurrentartikler gentog konkurrenceevneframing uden at tilføje nye kildetyper eller behandle adgangsbarrierer.

### Anbefalet handling
Review for weekly Blind Spot.
```

**Foreslået redaktionel formulering til publicering:**

> Ugens underbelyste erhvervssignal var ikke, at grøn industristøtte mangler dækning. Den blev dækket bredt. Det underbelyste var, at dækningen næsten udelukkende bar en konkurrenceevne- og rammevilkårslogik. Dermed fyldte spørgsmålet om, hvem der faktisk kan udnytte støtteordningerne — og hvad det betyder for SMV'er, underleverandører og markedsmagt — meget lidt.

---

## Redaktionelle guardrails

Systemet er konservativt i sproget.

| Brug | Undgå |
|---|---|
| "Systemet indikerer et sandsynligt framing-gap" | "Medierne har bias" |
| "Dækningen er domineret af markedsorienterede kilder" | "Dækningen er højreorienteret" |
| "Denne sag bør vurderes af en journalist" | "Denne sag er klar til publicering" |
| "Ugens underbelyste erhvervssignal..." | "De andre medier overså..." |
| "Emnet fik begrænset selvstændig erhvervsdækning" | "Pressen sov i timen" |

---

## Fejlkilder og designkrav

### Fejlkilde 1: Falsk blind spot på grund af dårligt konkurrentmatch

Systemet tror, noget ikke er dækket, fordi konkurrenterne bruger andre ord.

**Designkrav:** Semantisk søgning, ikke keyword-søgning. Entitetsnormalisering. Historisk søgning 90-180 dage tilbage. Felt for "muligt beslægtede artikler".

Systemet skriver: *"Muligt beslægtede artikler fundet."*  
Ikke: *"Ingen dækning fundet."*

### Fejlkilde 2: AI forveksler niche med væsentlighed

Systemet finder noget udækket, men udækket af en god grund: det er for småt.

**Designkrav:** Minimumskrav til berørte aktører og erhvervsmæssig konsekvens.

Hård regel: Ingen Blind Spot-kandidat uden formulerbar erhvervskonsekvens. Hvis systemet ikke kan udfylde sætningen *"Det betyder noget for [aktører], fordi [konsekvens]"* — går kandidaten ikke videre.

### Fejlkilde 3: Institutionel årsag bliver gætteri

AI kan opfinde en elegant forklaring på, hvorfor medier ikke har dækket noget.

**Designkrav:** Årsagskategorier med evidenskrav. Eksplicit usikkerhedsniveau. Adskillelse mellem observation og fortolkning.

Systemet skriver:

> Observation: Ingen selvstændig dækning i primære erhvervsmedier.  
> Mulig forklaring: Sagen falder mellem regulering og brancheøkonomi.  
> Evidens: Kilderne ligger i høringsmateriale og ikke i pressemeddelelser.  
> Sikkerhed: Middel.

---

## MVP-definition

Det mindste setup, der leverer et troværdigt Blind Spot Signal fra uge 1:

**Konkurrentmedier (15):**
Børsen, Finans, Berlingske Business, InsideBusiness, MarketWire, FinansWatch, EnergiWatch, EjendomsWatch, ShippingWatch, FødevareWatch, Computerworld, Altinget Erhverv, DR Erhverv, TV 2 Business, Ritzau.

**Kilder (prioriterede):**
Erhvervsstyrelsen, CVR, Finanstilsynet, Konkurrence- og Forbrugerstyrelsen, Nasdaq Copenhagen, Folketingets erhvervsudvalg, EU-Kommissionen, høringsportalen, Nationalbanken, Danmarks Statistik, udvalgte brancheorganisationer og revisionshuse, udbudsportaler, kommunale dagsordener i udvalgte vækstkommuner.

**Erhvervstemaer (8):**
Regulering, kapital og finansiering, arbejdsmarked, SMV-pres, energi og infrastruktur, digitalisering og AI, ejendomme, forsyningskæder.

**MVP-pipeline:**

```
1. Journalist trigger med tidsvindue og emnerum
2. System henter og klyngegruppperer ugens signaler
3. Matcher hvert cluster mod konkurrentdækning
4. Scorer væsentlighed og dækningsgab
5. Analyserer framing og kildefordeling
6. Returnerer top 5 Blind Spot Signals til journalist
```

**MVP-score (låst):**

```
Væsentlighed:            1-5
Dokumentation:           1-5
Konkurrentunderdækning:  1-5
Framing-skævhed:         1-5
Verificerbarhed:         1-5

Tærskel: ≥ 18/25 går videre til journalist
```

---

## Kerneprincip

Blind Spot er ikke en automatisk publiceringskonklusion. Det er et redaktionelt arbejdsredskab.

Systemets stærkeste værdi er ikke at sige:

> De andre tog fejl.

Men at sige:

> Ugens nyhedslogik gjorde bestemte perspektiver synlige — og andre usynlige.

Det er journalistens opgave at afgøre, om det betyder noget.
