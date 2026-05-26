# Y.dk Business — Udestående opgaver
### Commercial Lead og Tech Lead, juni 2026

**Kontekst:** Soft launch 1. oktober 2026. PM er utilgængelig i juli.
Alt der skal produceres i juli kræver at input er klar senest 30. juni.

---

## Commercial Lead

### Beslutninger der skal træffes på ledelsesmødet (juni uge 1)

**Tier-struktur og prissætning**
Produktet har to naturlige adgangsniveauer. PM anbefaler to-tier:
- Basis: nyheder + morgenbrief — prisniveau ca. 1.500 kr./år
- Pro: alle fem lag inkl. community — prisniveau ca. 4.500 kr./år

Commercial Lead skal inden mødet tage stilling til:
- Er to-tier den rigtige model for soft launch, eller skal der være tre tiers?
- Hvad er det præcise prisniveau for hvert tier?
- Kommunikeres prisen som måneds- eller årsbeløb over for kunden?
- Er der en rabatstruktur for tidlige brugere (early access)?

**Positionering som virksomhedsudgift**
Betalingsvillighed for personlige nyheder i målgruppen (35-54 år): 11-12%.
Betalingsvillighed for B2B SaaS-driftsværktøjer: høj.
Alt salg, onboarding og kommunikation skal konsekvent bruge firmasprog.
Commercial Lead bekræfter at salgsmateriale og acquisition-kommunikation følger denne linje.

---

### Leverancer juni

**Uge 3-4: Brief til PM om acquisition-budget og kanalvalg**
PM producerer GTM-brief i september — men ikke uden Commercial Leads input på:
- Hvad er acquisition-budgettet for soft launch (oktober) og fuld lancering (november/december)?
- Hvilke kanaler prioriteres: LinkedIn-annoncering, PR, direkte salg, partnerkanaler?
- Er der eksisterende kommercielle relationer der kan aktiveres til beta-rekruttering (10-20 SMV-ejere til september-test)?
- Annoncørmodel: hvornår og hvordan aktiveres kommercielle partnere?

---

### Leverancer august

**Uge 3-4: Acquisition-budget bekræftet og kanalvalg besluttet**
Skal foreligge inden stakeholder-præsentationen uge 4 august, som inkluderer GTM-plan.
Uden bekræftet budget kan launch-planen ikke produceres.

---

### Leverancer september

**Uge 1: GTM-brief godkendt**
PM producerer dokumentet. Commercial Lead godkender og ejer eksekvering fra 1. oktober.

---

## Tech Lead

### Beslutninger der skal træffes i juni uge 1-2

**Supertrends-møde med Lars Tvede**
Tre spørgsmål skal besvares — de blokerer features spec v1.0 og al tech-konfiguration:

1. Kan Supertrends API levere råt dansksproget indhold direkte?
2. Understøtter motoren on-demand queries med svar under 60 sekunder?
3. Tilbyder Supertrends TTS til on-demand audio?

Baseret på svarene træffes én arkitekturbeslutning:
- **Valg A:** Lars Tvede rekonfigurerer motoren til dansk SMV-output og on-demand queries
- **Valg B:** Y.dk bygger et LLM-lag (Claude/OpenAI API) oven på Supertrends-rådata

Valg A er foretrukket. Valg B er fallback. Beslutningen skal foreligge senest juni uge 2.

**Community-platform**
To realistiske muligheder identificeret:

| Platform | Pris/mdr. | SSO | Native app + push | Anbefaling |
|---|---|---|---|---|
| Circle.so | $298 (inkl. Email Hub) | OAuth 2.0 (e-mail-invitation-friktion ved oprettelse) | Ja (standard) | Mest modne SaaS-løsning |
| Discourse (managed) | $100–$500 | Friktionsfri via DiscourseConnect | Ja (generisk app) | Bedste SSO, laveste pris |

Tech Lead vælger platform og bekræfter DevOps-kapacitet til opsætning. Selvhostet Discourse er fravalgt — kræver dedikeret DevOps-ressource vi ikke har.

**TTS-service**
Supertrends understøtter ikke dynamisk TTS. Ekstern service kræves til morgenbrief (lyd) og on-demand brief-audio. Tech Lead vælger mellem ElevenLabs, Google Cloud TTS og Azure Neural TTS — med dansk stemmekvalitet og pris pr. 1M tegn som primære kriterier.

---

### Leverancer juni (selvstændig eksekvering starter her)

**Uge 3-4: Features spec v1.0 review og godkendelse**
PM producerer v1.0 baseret på Supertrends-mødets output. Tech Lead reviewer og bekræfter at spec er eksekverbar inden 30. juni. Åbne spørgsmål eller mangler markeres eksplicit — de må ikke overleveres til juli.

**Senest 30. juni: Konfigurationsplan for juli**
Tech Lead leverer en konkret plan for hvad der konfigureres i juli, i hvilken rækkefølge og hvad der kræves for at starte. PM er ikke tilgængelig i juli — planen skal være selvstændig.

---

### Leverancer juli (PM utilgængelig)

**Motor-konfiguration baseret på redaktionelt koncept**
Tech Lead konfigurerer Supertrends-motoren (eller LLM-laget) til dansk SMV-output.
Input: redaktionelt koncept + features spec v1.0 — begge leveret af PM senest 30. juni.
Output: konfigureret motor klar til UI-integration i august.

**Integration mod offentlige API-endpoints**
Alle 11 direkte endpoints opsættes og testes:

| Endpoint | Indhold |
|---|---|
| `retsinformation.dk/api` | Danske love og bekendtgørelser |
| `eur-lex.europa.eu` (Cellar REST) | EU-direktiver og forordninger |
| Erhvervsstyrelsens udbud.dk API | Offentlige udbud |
| `oda.ft.dk/api` | Folketing: lovforslag, høringer, afstemninger |
| `api.statbank.dk/v1/` | Danmarks Statistik |
| CVR ElasticSearch (Erhvervsstyrelsen) | Virksomhedsstamdata, ejerskab |
| XBRL `/xbrl/indberet` (Erhvervsstyrelsen) | Årsrapporter og regnskabsdata |
| `datafordeler.dk` (Geodatastyrelsen) | BBR + Ejerfortegnelse |
| Tinglysningsrettens HTTP API | Pant, skøder, servitutter |
| RSS-feeds (direkte pr. medie) | Nyheder som signalinput |
| Supertrends API | Trends og branchedata |

**Vigtigt:** DAWA-adresse-API'et udfases 1. juli 2026. Må ikke bruges — brug `datafordeler.dk`.

---

### Leverancer august

**Uge 3-4: Teknologisk platform-spec**
Arkitektur, Supertrends-integration og skaleringsplan. Produceres i samarbejde med PM.
Skal foreligge inden stakeholder-præsentation uge 4 august.

**Uge 1-3: Frontend-build**
UI-wireframes leveres af PM + Designer i august uge 1-2. Tech Lead starter frontend-build herefter.

---

### Leverancer september

**Uge 1-2: Platform klar til beta**
10-20 udvalgte SMV-ejere inviteres og onboardes. Platform skal holde under reel brugerlast.

**Uge 3: Kritiske fixes fra beta implementeret**
Kun kritiske fejl — ingen ny funktionalitet i september.

**28. september: Platform klar til launch**
Go/no-go bekræftes af Tech Lead senest 28. september.
