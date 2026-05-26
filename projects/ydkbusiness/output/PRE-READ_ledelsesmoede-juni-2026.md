---
**SKAL LÆSES INDEN MØDET**
Dette dokument er pre-read til ledelsesmødet og kræver aktiv forberedelse.
Mødets formål er at træffe tre konkrete beslutninger — ikke at diskutere dem.
Kom forberedt med en holdning til hvert punkt.
---

# Y.dk Business — Beslutningsdokument
### Ledelsesmøde, juni 2026

**Til:** CEO, Tech Lead, Commercial Lead
**Fra:** PM
**Formål:** Tre beslutninger der låser produktudviklingen op. Alle tre skal foreligge ved mødets afslutning.

---

## Situation

Y.dk Business er klar til at gå fra koncept til eksekvering. Produktvision, positionering, datastackarkitektur og kravspecifikation er på plads. Tech-teamet venter på tre beslutninger fra ledelsen inden de kan konfigurere motoren og starte build.

Uden beslutningerne i denne uge kan design, kommunikation og tech-konfiguration ikke starte — og soft launch i oktober er i fare.

---

## Beslutning 1 — AI-paradoks: Hvad kommunikerer vi?

**Situation**
Y.dk Business er drevet af AI. 53% af danskerne er utrygge ved AI-journalistik, og kun 9% mener AI gør nyheder mere pålidelige (RUC 2024). Produktet kan ikke kommunikere sin teknologi direkte uden at skade troværdighed og betalingsvillighed.

Samtidig: Y er first-mover i AI-journalistik i Danmark. Hvis konkurrenter eller medier afslører det, og vi ikke har en kommunikeret position, mister vi kontrollen over fortællingen.

**Tre muligheder**

| Mulighed | Beskrivelse | Risiko |
|---|---|---|
| **A — Teknologien er usynlig** | AI nævnes aldrig i produkt, UI eller marketing. Front-end er redaktionel kvalitet og menneskelig stemme. | Konkurrenter afslører det — vi er uforberedte |
| **B — Eje det selektivt** | "Redaktionelt verificeret indhold fra 5.000 kilder" i produkt-UI. AI nævnes i pressemateriale og investor-kommunikation, ikke over for abonnenter. | Kræver præcis kommunikationsdisciplin |
| **C — Fuld transparens** | "AI producerer, mennesker verificerer" som eksplicit USP. Differentierer på ærlighed. | Modvirker betalingsvillighed i SMV-segment i dag |

**Anbefaling:** Mulighed A i fase 1. Kommunikationsplatform: "Redaktionelt verificeret erhvervsintelligens fra 5.000 kilder." AI er back-end motor — aldrig front-end identitet. Genovervejes til fuld lancering baseret på beta-feedback.

**Konsekvens ved manglende beslutning:** Design og UI-copy kan ikke produceres. Tech Lead ved ikke hvad der må vises i brugerfladen. Kommunikationsplatform til Commercial Lead er blokeret.

---

## Beslutning 2 — Tier-struktur: Hvad koster hvad?

**Situation**
Produktet har to naturlige adgangsniveauer. Prisargumentet er dokumenteret: selv fuldt abonnement til 5.000 kr./år er billigere end Finans.dk alene (4.500 kr./år) uden overvågnings- og BI-lag.

Betalingsvillighed for B2B SaaS-driftsværktøjer er høj — forudsat at produktet kommunikeres som virksomhedsudgift, ikke personligt medieabonnement.

**To modeller**

| Model | Tier 1 (Basis) | Tier 2 (Pro) | Anbefaling |
|---|---|---|---|
| **To-tier** | Nyheder + morgenbrief — ~1.500 kr./år | Alle fem lag inkl. community — ~4.500 kr./år | ✓ Anbefalet |
| **Tre-tier** | Nyheder — ~999 kr./år | Nyheder + overvågning — ~2.500 kr./år | Fuld pakke — ~4.500 kr./år |

**Anbefaling:** To-tier. Lav adgangsbarriere med klar opgraderingssti. Tre-tier øger ARR-potentialet men øger kommunikationskompleksiteten i fase 1 — og vi har ikke brugeradfærdsdata til at prissætte mellemtrinnet korrekt endnu. Virksomhedsabonnement med team-adgang tilføjes i fase 2.

**Hvad der skal besluttes:**
1. Er to-tier den rigtige model for soft launch?
2. Præcist prisniveau for hvert tier (de angivne er indikationer)
3. Hvad der specifikt er i Basis vs. Pro — kravspecen har et forslag, men det kræver ledelsens godkendelse

**Konsekvens ved manglende beslutning:** Onboarding og checkout kan ikke designes. Commercial Lead kan ikke sætte acquisition-mål. Tech Lead ved ikke hvad der gatekeeper hvad.

---

## Beslutning 3 — Produktgodkendelse: Hvad bygger vi?

**Situation**
Scope for soft launch oktober 2026 er defineret. Nedenfor er det der er med — og det der ikke er. Ledelsens godkendelse af dette scope er forudsætningen for at tech-teamet kan estimere og planlægge build.

**Inkluderet i soft launch (oktober 2026)**

- Personaliseret nyhedsfeed med original redaktionel vinkel
- Morgenbrief — tekst og lyd — leveret kl. 06:00
- Markedsovervågning baseret på 11 direkte offentlige API-endpoints (regulatory, udbud, CVR, selskabsdata m.fl.)
- Branchetrends — ugentlig rapport
- B2B-briefs — on-demand på under 60 sekunder
- Lukket abonnentfællesskab
- Web og mobil

**Ikke inkluderet i fase 1**

- Video-format
- Virksomhedsabonnement med team-adgang
- Avanceret personalisering (machine learning)
- API-integration til CRM og egne systemer
- Internationalt indhold

**Kritisk afhængighed der kræver separat afklaring med Lars Tvede (Supertrends)**
Supertrends-motoren producerer i dag primært engelsksprogede outputs til investor-segmentet. For dansk SMV-indhold kræves enten rekonfiguration af motoren eller et selvstændigt LLM-lag oven på API'et. Denne beslutning træffes på separat teknisk møde med Lars Tvede — men ledelsen skal godkende at denne afhængighed er accepteret som risiko.

**Konsekvens ved manglende beslutning:** Tech Lead kan ikke estimere build. Designer kan ikke briefes. Soft launch i oktober er spekulativ.

---

## Hvad vi beder om

| Beslutning | Ejer | Deadline |
|---|---|---|
| AI-paradoks: Mulighed A, B eller C | CEO | Dette møde |
| Tier-model: to-tier bekræftet, priser godkendt | CEO + Commercial Lead | Dette møde |
| Scope for soft launch: godkendt | CEO + Tech Lead | Dette møde |
| Supertrends-møde bookes med Lars Tvede | CEO + PM | Senest 7. juni |
| Designer-ressource til august identificeret | CEO | Senest 30. juni |

---

**Næste skridt efter mødet**
Med de tre beslutninger på plads starter PM og Chefredaktør arbejdet med det redaktionelle koncept samme uge. Tech Lead kan parallelt starte konfigurationsplanlægning. Leverance: redaktionelt koncept klar til tech-teamet senest 30. juni.
