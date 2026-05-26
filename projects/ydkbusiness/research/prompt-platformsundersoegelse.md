# Research-prompt: Platformsundersøgelse — Y.dk Business

**Brug:** Indsæt denne prompt direkte i Claude (deep research), Perplexity eller ChatGPT med deep search aktiveret.
**Formål:** Kortlæg de teknologier og konkurrerende produkter der definerer og muliggør Y.dk Business-platformen.
**Output bruges til:** Kravspecifikation, tech-valg og åbne spørgsmål til Tech Lead.

---

## Prompt (klar til brug)

---

<context>
Jeg er ved at definere en ny AI-drevet erhvervsintelligensplatform for det danske SMV-segment.
Platformen skal kombinere personaliserede erhvervsnyheder, markedsovervågning, branchetrends
og on-demand briefs i ét abonnement til 5.000 kr./år.

Platformen bygger på en eksisterende nyhedsmotor (Supertrends). Jeg har brug for at kortlægge
to ting: (1) hvilke eksisterende konkurrerende produkter der allerede løser dele af problemet,
og (2) hvilke teknologiske bygge-blokke (APIs, services) der kan drive platformens kernefunktioner.

Undersøgelsen er grundlaget for valg af teknologistack og kravspecifikation til Tech Lead.
</context>

<instructions>
Du er en teknologianalytiker med speciale i medietech, B2B SaaS og informationsplatforme.

Udfør en struktureret undersøgelse af de fem emneområder nedenfor. For hvert område:
- Angiv de tre til fem mest relevante produkter eller services
- Beskriv præcist hvad de kan — ikke markedsføringssprog
- Angiv verificerede priser hvor muligt, eller prisindikation og prismodel
- Vurdér relevans og begrænsninger specifikt for et dansk SMV-segment og dansksprogede brugere
- Angiv kilde og dato for priser og features

Undgå:
- Generiske beskrivelser der ikke er specifikke for produktet
- Priser uden kildeangivelse
- Anbefalinger uden begrundelse i konkrete funktioner eller priser
</instructions>

---

### Emne 1 — Markedstrends og trend intelligence-platforme

**Spørgsmål:**
- Hvad tilbyder Supertrends.com præcist — funktioner, outputformater, prismodel og API-adgang?
  Er Supertrends egnet til daglig nyhedsproduktion på dansk, eller er det primært trend intelligence til investorer?
- Hvilke andre trend intelligence-platforme findes (Exploding Topics, Glimpse, Treendly, SparkToro m.fl.)?
  Har de API-adgang? Dækker de danske kilder?
- Er der platforme der specifikt aggregerer dansk erhvervsinformation på tværs af kilder?

**Output for dette emne:**
Tabel med: Platform | Kernefunktion | Dansk kildebredde | API tilgængeligt | Pris/år | Egnet til nyhedsproduktion (ja/nej/delvis)

---

### Emne 2 — Medieovervågning og monitoring-services

**Spørgsmål:**
- Meltwater: Hvad indeholder Essentials-pakken præcist? Hvad er listeprisen for én bruger i Danmark?
  Dækker den Retsinformation og offentlige dokumenter?
- Retriever: Hvad tilbyder de og til hvilken pris for SMV-segmentet?
- Infomedia: Hvad tilbyder de og til hvilken pris?
- Alternativerne Brand24, Mention, Talkwalker: er de realistische alternativer for et dansk produkt?
- Regulatory monitoring specifikt: hvilke services overvåger lovændringer, EU-direktiver og
  kommunale udbud på dansk? Har Retsinformation og EUR-Lex API-adgang?

**Output for dette emne:**
Tabel med: Service | Dækker regulatory | Dansk kildedybde | SMV-egnet pris | API til integration | Noter

---

### Emne 3 — Text-to-speech (TTS) til dansk

**Spørgsmål:**
- ElevenLabs, Google Cloud TTS, Azure Neural TTS, OpenAI TTS: hvad er prisen pr. tegn eller minut?
- Hvilken af disse leverer den bedste danske stemme i 2026 — er der hørte eksempler eller benchmarks?
- Understøtter de streaming (real-time playback mens teksten genereres) eller kun batch?
- Er der dedikerede danske TTS-løsninger (fx fra danske udbydere) der er overlegne til dansk udtale?

**Output for dette emne:**
Tabel med: Service | Pris pr. 1M tegn | Dansk stemme-kvalitet (1-5) | Streaming | Minimum månedlig udgift | Anbefaling til >500 brugere/dag

---

### Emne 4 — Community-platforme til lukket abonnentfællesskab

**Kontekst:** Vi har brug for en lukket community-platform til betalende abonnenter.
Krav: SSO med eksisterende login, push-notifikationer på mobil, moderation-workflow,
branchespecifikke rum, dansk sprogunderstøttelse.

**Spørgsmål:**
- Circle.so, Discourse, Bettermode, Mighty Networks, Hivebrite: hvad koster de og hvad kan de præcist?
- Hvilke understøtter SSO/OAuth-integration med eksisterende brugerdatabase?
- Hvilke har native mobilapp med push-notifikationer (ikke PWA)?
- Hvilke har been brugt af skandinaviske medier eller B2B SaaS-virksomheder?
- Selvhostet Discourse vs. managed: hvad er reel totalomkostning for 0-2.000 brugere?

**Output for dette emne:**
Tabel med: Platform | Pris/mdr. ved 500 brugere | SSO | Native app + push | Moderationsværktøj | Anbefalet til dette use case (ja/nej + begrundelse)

---

### Emne 5 — Nyheds- og indholds-API'er

**Spørgsmål:**
- Hvilke API'er leverer dansk erhvervsnyheder i struktureret form (NewsAPI, GDELT, Ritzau, Newscatcher)?
  Hvad koster de og hvad er deres dækning af danske medier?
- Hvad er forskellen på en indholds-API og Supertrends som platform — er de komplementære eller overlappende?
- Er der API'er der specifikt aggregerer SMV-relevant regulering, udbud og offentlige dokumenter?

**Output for dette emne:**
Tabel med: API / Service | Dansk mediedækning | Pris/mdr. | Realtids-dækning | Struktureret data (JSON/RSS) | Relevant for platformen (ja/nej)

---

<output>
Lever dit svar i fem sektioner — én pr. emne — med:

1. Tabellen som specificeret
2. To til tre sætningers konklusion: hvad er det stærkeste valg, og hvad er den primære risiko eller begrænsning
3. Flagér eksplicit hvis en pris er udateret eller uverificeret

Afslut med en samlet anbefaling på maks. 10 linjer:
- Hvilken tech-stack er mest realistisk for fase 1 (launch oktober 2026)?
- Hvad er de tre vigtigste afklaringer der skal ske inden 30. juni?
</output>
