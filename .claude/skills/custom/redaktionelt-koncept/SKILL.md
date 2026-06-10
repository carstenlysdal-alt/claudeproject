# redaktionelt-koncept

Omsætter redaktionel linje og segmentstrategi til konfigurerbare tekniske parametre
for AI-drevne indholds- og nyhedsplatforme. Output er et komplet dokument klar til
Tech Lead (motorkonfiguration), CEO (godkendelse) og Commercial Lead (pakkestruktur).

## Hvornår aktiveres denne skill

Når en redaktion, et mediehus eller en indholdsplatform skal definere hvordan
AI-motoren konfigureres: hvilke kilder, hvilken AI-orkestrering, hvad auto-publiseres,
og hvilken redaktionel strategi der gælder per læsersegment.

Aktiveres med: `/redaktionelt-koncept`, "lav et redaktionelt koncept", "definer vores
redaktionelle model", "konfigurer indholdsmotoren", "redaktionel strategi for platformen".

**Ikke til:**
- Redaktionel linje og værdier — fastlæg dem først i et separat dokument
- Kommerciel model — informeres af konceptet, men er et separat arbejde
- Content marketing og brandindhold — brug `content-strategy`

## Forudsætninger — afklar inden start

1. **Redaktionel linje** — platformens journalistiske værdier og indholdsprincipper
2. **Målgruppe** — primære læsersegmenter er identificerede
3. **Teknologisk platform** — hvilket system konfigureres?

Mangler ét af disse: stop og afklar inden konceptet skrives.

---

## Syv trin — udføres altid i denne rækkefølge

### Trin 1 — Redaktionel identitet og segmentstrategi

**Pillars:** Definér 2-4 redaktionelle indholdspillarer. For hver pillar:

- Navn og det spørgsmål den besvarer ("Understand — Hvad sker der, og hvad betyder det?")
- Typisk stof (3-4 konkrete eksempler)
- Tone (én sætning — ikke "troværdig og nuanceret", men hvad der konkret inkluderes og ekskluderes)
- **Searchable vs. shareable:** Er pillarens primære funktion at besvare søgeintention
  (Understand → searchable) eller at skabe deling og samtale (Challenge/Inspire → shareable)?
  Begge har plads, men det afgør distribution og format.
- AI-produktionsgrad: Høj / Middel / Lav — altid med begrundelse knyttet til
  troværdighedsrisiko, ikke til teknisk kapabilitet

*Empirisk reference:* Reuters Institute *Generative AI and News Report 2025*:
kun 12 % er komfortable med rent AI-producerede nyheder; 43 % ved menneskeledet
med AI-hjælp. Searchable/Understand-genrer tolererer AI-assistering bredest.

**Segmentstrategi:** For hvert læsersegment:
- Primær og sekundær pillar
- Det primære redaktionelle hul (hvad dækker ingen andre i dag?)
- Prioriteret vinkel (én sætning — operationel, ikke aspirerende)
- AI-produktionsgrad for segmentet

Output: oversigtstabel + ét fokuseret afsnit per segment.

**Topic cluster-mapping:** For hvert pillar — identificér 3-5 topic clusters der
definerer redaktionelt territorium. Clusters er ikke emner, men spørgsmål læseren
har: "Hvordan påvirker ny regulering min branche?" er et cluster.
Kortlæg hvordan clusters overlapper og forstærker hinanden på tværs af pillars.

---

### Trin 2 — Kildestruktur

Definér kildelagene. For hvert lag: er kilden til kontekst/signaldetektion
eller til genpublikation? Vær eksplicit — aldrig begge dele i samme kilde.

| Kildelag | Indhold |
|---|---|
| Primær motor | Aggregator/API — hvad crawler den, hvad leverer den, hvilket brand? |
| Nationale nyhedskilder | Tabel: kilde · type · integration · prioritet |
| Regulatoriske og offentlige datakilder | Tabel: kilde · datatype · relevans |
| Internationale kilder | Tabel: kilde · adgang · note |
| Branche- og interesseorganisationer | Tabel: kilde · segment · integration |

---

### Trin 3 — AI-orkestrering og produktionspipeline

Definér pipelinen som eksplicit sekvens og Production Swimlanes:

```
INGESTION → KLASSIFICERING → GENERERING → VERIFICERING → DISTRIBUTION
```

Beskriv hvert trin konkret — ikke hvad systemet "kan", men hvad der faktisk sker.

**Klassificeringsparametre:** Tabel over de parametre hvert inkommende signal
klassificeres på, med mulige værdier og formål for hvert parameter.

**Polling-intervaller:** Tabel med kildetype, interval og rationale.
Rationale skal begrunde intervallet — ikke blot beskrive det.

**Sektorer ved launch:** Konkret liste. Angiv om scope er fuldt eller reduceret
og konsekvensen for dybde per sektor.

---

### Trin 4 — Outputformat og Cadence Grid

For hvert outputformat:
- **Formål** (én sætning)
- **Frekvens** (konkret — ikke "løbende" uden definition)
- **Format** (tekst / lyd / PDF / push — og kombinationer)
- **Struktur** (navngivne felter med ordgrænser)
- **Verificeringsniveau** (reference til trin 5's niveauer)
- **Åbne beslutninger** der blokerer færdiggørelse af dette format

Typiske outputformater at vurdere: morgenbrief, nyhedsfeed, branchetrends,
B2B-briefs (situationsbrief / regulatory brief / markedssignalbrief),
markedsovervågning, C-level/dybdeanalyser.

**Cadence Grid:** Saml alle outputformater i ét overblik med kanal, frekvens
og redaktionel ejerskab. Formålet er at afsløre overlap, huller og
ressourcepres inden motoren konfigureres:

| Outputformat | Kanal | Frekvens | Ejer | Pillar-mix |
|---|---|---|---|---|
| Morgenbrief | Email + web | Dagligt | Redaktør | Understand 70% / Challenge 30% |
| Nyhedsfeed | Web + push | Løbende | Motor (auto) | Understand 60% / Challenge 25% / Inspire 15% |
| [osv.] | | | | |

---

### Trin 5 — Verificeringsmodel

**Princip:** Definér skellet mellem auto-publisering og human review.
Begrundelsen skal knyttes til juridisk, etisk og troværdighedsmæssig risiko —
ikke til redaktionel kapacitet.

**Fire niveauer:**

| Niveau | Betegnelse | Hvad publiceres her |
|---|---|---|
| 0 | Auto-publisering | Faktuelt, verificerbart, lavrisiko — CVR-data, statistik, signaler |
| 1 | Spot-check | Auto-publisering med stikprøvekontrol |
| 2 | Human review | Kræver redaktionel godkendelse inden publisering |
| 3 | Chefredaktør-eskalation | Juridisk risiko, navngivne privatpersoner kritisk, redaktionel uafhængighed |

**Verificeringsflow per indholdstype** (tilpasset fra fact-check-workflow):
For indhold på niveau 2 og 3 gælder dette syv-trins flow:

```
1. IDENTIFICÉR PÅSTAND — hvad hævdes konkret?
2. RESEARCH — primærkilder identificeret og tilgået
3. EVIDENS — understøttende og modstridende evidens samlet
4. KILDEBEKRÆFTELSE — er centrale kilder kontaktet / verificerbare?
5. VURDERING — faktuelt korrekt / delvist korrekt / forkert / ikke verificerbart
6. DOKUMENTATION — beslutning og evidensgrundlag dokumenteret
7. GODKENDELSE — publicér / korrektér / hold tilbage
```

**Bemanding:** Tabel med opgave · frekvens · tidsestimat · ansvarlig.
Ingen felter må stå tomme — brug [AFVENTER navn] med deadline.

---

### Trin 6 — Redaktionel måling

Et redaktionelt koncept uden måling er en holdningserklæring, ikke en strategi.
Definér KPI'er for konceptets succes — adskilt fra kommercielle metrics.

**Tre niveauer af redaktionelle KPI'er:**

**Reach og engagement** (målbart fra dag 1):
- Åbningsrate morgenbrief (benchmark: 40 %+ for curateret B2B-nyhedsbrev)
- Gennemsnitlig læsetid per artikel (Axios-benchmark: 26 sekunder — hvad er vores mål?)
- Push-notifikations CTR
- Returnerende læsere (ugentlig/månedlig)

**Redaktionel kvalitet** (målbart løbende):
- Pillar-fordeling: faktisk vs. planlagt (Understand/Challenge/Inspire-mix)
- Verificeringsfejl: antal korrektioner per måned
- Human review-belastning: faktisk tid brugt vs. estimeret

**Strategisk impact** (målbart kvartalsvis):
- Andel abonnenter der angiver "Y.dk Business" som primær erhvervskilde
- NPS specifikt for redaktionelt indhold (adskilt fra platform-NPS)
- Sektor-dækning: dækker vi de sektorer vi planlagde, og med hvilken dybde?

Alle KPI'er har en baseline (ved launch), et 3-månedersmål og en ansvarlig.

---

### Trin 7 — Åbne beslutninger og udeståender

To separate tabeller — aldrig blandet:

**Redaktionelle/PM-beslutninger:**
Kolonne: # · beslutning · konsekvens ved manglende afklaring · ansvarlig · deadline

**Tekniske afklaringer:**
Kolonne: # · afklaring · blokerer (hvad kan ikke lukkes?) · ansvarlig

Ingen åbent punkt uden konsekvens. "TBD" er ikke acceptabelt — brug
"[AFVENTER navn] — blokerer X inden [dato]".

---

## Output-struktur

```
# [Platform] — Redaktionelt Koncept

**Version:** [nr.]
**Dato:** [dato]
**Ansvarlig:** [navn(e)]
**Deadline:** [dato]
**Modtager:** Tech Lead / CEO / Commercial Lead

## Formål
[De tre spørgsmål dokumentet besvarer for Tech Lead]

## Strategisk ramme
### Redaktionel identitet — [antal] pillars + searchable/shareable-profil
### Segmentstrategi — pillar-prioritering + topic clusters per segment
### AI-troværdighed — empirisk grundlag for verificeringsmodellen

## 1. Kildestruktur
## 2. AI-orkestrering — produktionspipeline
## 3. Outputformat og Cadence Grid
## 4. Verificeringsmodel
## 5. Redaktionel måling — KPI'er og baselines
## 6. Produktionsvolumen
## 7. Åbne beslutninger
## 8. Udeståender — Tech Lead-afklaringer

[Versionsnote: hvornår leveres næste version, hvad integreres]
```

Producér altid et komplet dokument. Ingen generiske råd. Alle felter er
udfyldte eller markeret [AFVENTER navn/dato] med konkret begrundelse.

---

## Tjekliste — færdigt dokument

- [ ] Alle pillars har searchable/shareable-profil og AI-produktionsgrad med begrundelse
- [ ] Topic clusters identificerede per pillar (3-5 per pillar)
- [ ] Hvert segment har ét præcist redaktionelt hul og én operationel prioriteret vinkel
- [ ] Alle kildelag specificerede med integrationstype og formål
- [ ] Cadence Grid udfyldt med kanal, frekvens, ejer og pillar-mix
- [ ] Verificeringsmodellens fire niveauer udfyldt med konkrete eksempler
- [ ] 7-trins verificeringsflow specificeret for niveau 2 og 3-indhold
- [ ] Redaktionelle KPI'er defineret med baseline og 3-månedersmål
- [ ] Alle åbne beslutninger har navn og deadline
- [ ] Dokumentet starter med formål — ikke med introduktion
- [ ] Tone: autorativ, konkret, direkte. Aldrig akademisk

---

## Navngivne faldgruber

**Faldgrube 1 — Pillars som abstrakte værdier**
"Vi skriver troværdigt og nuanceret" er ikke en pillar — det er en selvfølge.
En pillar er et konkret redaktionelt filter: hvad inkluderes, hvad ekskluderes,
hvilken vinkel prioriteres og hvilken tone afvises?

**Faldgrube 2 — AI-produktionsgrad uden begrundelse**
"AI kan skrive det meste" er ikke en verificeringsmodel. Begrundelsen skal
knyttes til genrens troværdighedsrisiko og publicums forventning — ikke til
hvad teknologien teknisk set er i stand til.

**Faldgrube 3 — Segmentstrategi som persona-øvelse**
Segmenter er redaktionelle linser — ikke demografier. "SMV-ejere, 40-60 år"
er en persona. "SMV-ejere mangler regulatory-oversættelse — det er vores
primære Understand-vinkel" er en redaktionel strategi.

**Faldgrube 4 — Cadence Grid uden ejer**
En redaktionsplan uden navngivne ejere er en ønskeliste. Hvert outputformat
skal have én ansvarlig — ikke "redaktionen" eller "motoren".

**Faldgrube 5 — Ingen redaktionelle KPI'er**
Kommercielle metrics (ARR, abonnenter) måler om produktet sælger.
Redaktionelle metrics måler om produktet er det, det lover at være.
Begge er nødvendige — og de er ikke det samme.

**Faldgrube 6 — Åbne beslutninger uden konsekvens**
Et åbent punkt uden "blokerer X" er et hul i dokumentet, ikke et åbent punkt.
Alle udeståender skal have en konkret konsekvens for motorkonfigurationen
eller en downstream-leverance.

---

## Inspirationskilder bag denne skill

- `coreyhaines31/marketingskills@content-strategy` — searchable/shareable-distinktion og topic cluster-logik
- `gtmagents/gtm-agents@editorial-ops` — Cadence Grid og Measurement Layer
- `jamditis/claude-skills-journalism@fact-check-workflow` — syv-trins verificeringsflow
- Produktionserfaringer fra Y.dk Business redaktionelt koncept, juni 2026
