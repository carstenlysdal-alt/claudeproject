# Y.dk Business — Opgaver pr. stakeholder
### Juni–september 2026 · Launch 1. oktober

**Kontekst:** PM er utilgængelig i juli. Alt der kræver PM-input skal være afklaret senest 30. juni.

---

## Commercial Lead

### Juni

**Tier-struktur og prissætning — beslutning**
Produktet har to naturlige adgangsniveauer. PM anbefaler to-tier:
- Basis: nyheder + morgenbrief — ca. 1.500 kr./år
- Pro: alle fem lag inkl. community — ca. 4.500 kr./år

Commercial Lead afklarer: er to-tier den rigtige model, hvad er de præcise prisniveauer, og kommunikeres prisen som måneds- eller årsbeløb?

**Acquisition-input til PM**
PM producerer GTM-brief i september. Commercial Lead leverer inden udgangen af juni:
- Acquisition-budget for soft launch og fuld lancering
- Prioriterede kanaler: LinkedIn, PR, direkte salg, partnerkanaler
- Eksisterende relationer der kan bruges til beta-rekruttering (10-20 SMV-ejere)
- Plan for kommercielle partnere og annoncørmodel

### August

**Acquisition-budget bekræftet**
Budget og kanalvalg skal være besluttet inden stakeholder-præsentationen sidst i august.
Uden bekræftet budget kan launch-planen ikke produceres.

### September

**GTM-brief godkendt og klar til eksekvering**
PM producerer dokumentet. Commercial Lead godkender og overtager eksekvering fra 1. oktober.

---

## Tech Lead

### Juni

**Supertrends-afklaring med Lars Tvede**
Tre spørgsmål skal besvares — de blokerer al tech-konfiguration i juli:
1. Kan API'et levere råt dansksproget indhold direkte?
2. Understøtter motoren on-demand queries med svar under 60 sekunder?
3. Tilbyder Supertrends TTS til on-demand audio?

Baseret på svarene besluttes arkitektur:
- **Valg A:** Lars Tvede rekonfigurerer motoren til dansk SMV-output
- **Valg B:** Y.dk bygger et LLM-lag oven på Supertrends-rådata

**Community-platform — valg og opsætning planlagt**
To muligheder:

| Platform | Pris/mdr. | SSO | Native app + push |
|---|---|---|---|
| Circle.so | $298 (inkl. Email Hub) | OAuth 2.0 (friktion ved oprettelse) | Ja |
| Discourse (managed) | $100–$500 | Friktionsfri via DiscourseConnect | Ja |

Tech Lead vælger platform og bekræfter kapacitet til opsætning.

**TTS-service — valg truffet**
Ekstern service kræves til morgenbrief-lyd og on-demand brief-audio.
Vælg mellem ElevenLabs, Google Cloud TTS og Azure Neural TTS baseret på dansk stemmekvalitet og pris.

**Features spec v1.0 — review og godkendelse**
PM producerer v1.0 baseret på Supertrends-afklaringen. Tech Lead reviewer og bekræfter at spec er eksekverbar. Åbne spørgsmål eller mangler markeres inden 30. juni — må ikke overleveres til juli.

**Konfigurationsplan for juli leveret senest 30. juni**
Konkret plan for hvad der konfigureres i juli, i hvilken rækkefølge og hvad der er forudsætningerne. PM er ikke tilgængelig i juli — planen skal være selvstændig.

### Juli

**Motor-konfiguration — selvstændig eksekvering**
Tech Lead konfigurerer Supertrends-motoren (Valg A) eller LLM-laget (Valg B) til dansk SMV-output.
Input: redaktionelt koncept + features spec v1.0, begge leveret af PM senest 30. juni.
Output: konfigureret motor klar til UI-integration i august.

**Integration mod 11 direkte offentlige API-endpoints**

| Endpoint | Indhold |
|---|---|
| `retsinformation.dk/api` | Danske love og bekendtgørelser |
| `eur-lex.europa.eu` (Cellar REST) | EU-direktiver og forordninger |
| Erhvervsstyrelsens udbud.dk API | Offentlige udbud |
| `oda.ft.dk/api` | Folketing: lovforslag, høringer, afstemninger |
| `api.statbank.dk/v1/` | Danmarks Statistik |
| CVR ElasticSearch (Erhvervsstyrelsen) | Virksomhedsstamdata og ejerskab |
| XBRL `/xbrl/indberet` (Erhvervsstyrelsen) | Årsrapporter og regnskabsdata |
| `datafordeler.dk` (Geodatastyrelsen) | BBR og Ejerfortegnelse |
| Tinglysningsrettens HTTP API | Pant, skøder, servitutter |
| RSS-feeds (direkte pr. medie) | Nyheder som signalinput |
| Supertrends API | Trends og branchedata |

**Vigtigt:** DAWA-adresse-API'et udfases 1. juli 2026. Brug `datafordeler.dk`.

### August

**Frontend-build**
UI-wireframes leveres af PM + Designer i august uge 1-2. Tech Lead starter frontend-build herefter.

**Teknologisk platform-spec**
Arkitektur, Supertrends-integration og skaleringsplan produceres i samarbejde med PM.
Klar inden stakeholder-præsentationen sidst i august.

### September

**Platform klar til beta**
10-20 udvalgte SMV-ejere inviteres og onboardes i uge 1-2.

**Kritiske fixes fra beta**
Kun kritiske fejl — ingen ny funktionalitet i september.

**Go/no-go bekræftet senest 28. september**
Tech Lead bekræfter at platformen er klar til launch 1. oktober.
