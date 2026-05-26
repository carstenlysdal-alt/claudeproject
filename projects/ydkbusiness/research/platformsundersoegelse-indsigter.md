# Platformsundersøgelse — Nøgleindsigter

Kilde: Deep research maj 2026 (fuld rapport i Google Drive: YDK/indsigter)

---

## Emne 1 — Supertrends: dokumenterede kapabiliteter og begrænsninger

### Kapabiliteter (verificeret)
- Crawler 40+ sprog på tværs af 5.000 kilder 24/7
- API-adgang dokumenteret via Atlas Global Macro app-integration
- Struktureret taksonomi: klassificerer automatisk trends, innovationer, milepæle og selskaber
- Producerer tekst og traditionelle podcasts (pre-recorded, ikke dynamisk TTS)

### Begrænsninger (verificeret)
- **Output er næsten udelukkende på engelsk** — trods flersproget crawling
- **Konfigureret til langsigtet global trend intelligence** — investor-orienteret, ikke dagsaktuelt SMV-nyhedsfeed
- **Ingen on-demand brief-generering** — al output følger periodiske redaktionelle cyklusser
- **Ingen dynamisk TTS** — kun pre-recorded podcasts (samarbejde med Dansk Erhverv/Podimo)

### Kritisk implikation
Supertrends-motoren kan i sin nuværende form ikke levere dagsaktuelle, dansksprogede SMV-nyheder.
Platformen kræver enten rekonfiguration af motoren (afklares med Lars Tvede) eller et selvstændigt LLM-lag
oven på rådata fra Supertrends-API'et til at producere dansk SMV-indhold og on-demand briefs.

### Tre afklaringer der skal ske med Supertrends inden 30. juni
1. Kan API'et levere råt dansksproget indhold direkte?
2. Understøtter motoren on-demand forespørgsler med svar under 60 sekunder?
3. Tilbyder de indbygget TTS til on-demand audio?

---

## Emne 2 — Medie- og lovovervågning

### Kommercielle tjenester (ikke SMV-relevante)

| Service | Pris/år | Dækker regulatory | API | SMV-relevant |
|---|---|---|---|---|
| Meltwater Essentials | ~48.000–50.000 kr. (uverificeret listepris, 2026) | Nej | Nej (låst bag enterprise) | Nej |
| Infomedia Erhverv | Custom (min. 20 brugere, custom pricing) | Nej | Ja (tillægsgebyr) | Nej |

**Note:** Meltwater er markant dyrere end tidligere antaget (48-50k, ikke 24k+). Begge tjenester er prissat og struktureret til presseafdelinger — ikke SMV-segmentet.

### Gratis API'er til regulatory monitoring (alle relevante)

| Service | Pris | Dækker | API-format | Begrænsninger |
|---|---|---|---|---|
| Civilstyrelsen Retsinformation | Gratis | Danske love, bekendtgørelser, cirkulærer | REST/JSON + ELI Atom-feeds | Lukket kl. 23:45–03:00; maks. 1 kald/10 sek.; 24-timers forsinkelse for ændringer efter kl. 03:00 |
| Retsinformation API (syv.ai) | Gratis | Dansk lovgivning + Folketing ODA-data | Fuldt struktureret JSON, versionshistorik, diff | 20 kald/time, 50/dag pr. IP |
| EUR-Lex | Gratis (kræver godkendt registrering) | EU-ret, direktiver, forordninger | SOAP XML + Cellar REST API | — |
| Karnov "Samlet Basis" | 10.150 kr./år pr. licens | Moms, skat, afgifter | Ingen API på basis-niveau | Kun manuel opslag |

**Anbefaling fase 1:** syv.ai Retsinformation API (gratis, struktureret JSON) + EUR-Lex til EU-regulering. Rate limits er acceptable i fase 1 ved 100–200 beta-brugere.

---

## Emne 3 — Community-platforme

### Sammenligning ved 500 og 2.000 brugere

| Platform | Pris/mdr. (500 brugere) | Pris/mdr. (2.000 brugere) | SSO/OAuth | Native app + push | Anbefalet |
|---|---|---|---|---|---|
| Circle.so | $298 (inkl. Email Hub) | $298 (ubegrænset) | Ja (OAuth 2.0) — men kræver e-mail-invitation og adgangskode i Circles database (bryder 3-trins-regel) | Ja (standard-app; custom branding kræver Circle Plus = enterprise-pris) | **Ja** — mest modne SaaS-økosystem, trods SSO-friktion |
| Mighty Networks | $354 (Growth plan) | $354 | Ja (Growth+) | Ja (standard-app; custom branding = Mighty Pro = custom pris) | Nej — for komplekst socialt feed-interface til SMV-segment |
| Bettermode | $1.500 (Growth plan) | $1.500 | Ja — men kun på Growth ($1.500/mdr.) | Nej (kun browser-PWA; native kræver ekstern wrapper) | Nej — uforholdsmæssig prisbarriere for SSO |
| Discourse (managed) | $100 (Pro plan) | $500 (Business plan) | **Ja — friktionsfri via DiscourseConnect** (ingen adgangskode-oprettelse hos slutbruger) | Ja (generisk app; white-label kræver kodebase-ændring) | **Ja** — bedste SSO, laveste pris. Selvhosting urealistisk uden DevOps |

**Anbefaling fase 1:** Circle.so på $298/mdr. (SSO-friktion kan håndteres ved invite-flow) eller Discourse managed på $100/mdr. (friktionsfri SSO, men kræver teknisk opsætning). Beslutning afhænger af Tech Leads DevOps-kapacitet.

---

## Emne 4 — Danske nyheds-API'er og udbudsdata

| API/Kilde | Dansk dækning | Realtid | Pris/mdr. | Komplementerer Supertrends |
|---|---|---|---|---|
| NewsAPI (Business) | Åbne danske onlinemedier (ingen betalingsmure) | Ja (headlines) | $449 (~3.100 DKK) | Ja — dagsaktuelle nyheder som supplement til makro-fokus |
| Newscatcher (Scale) | Åbne kilder + NLP-metadata, NER, AI-resumeer | Ja (opdateres hver 6. time) | $500 (~3.450 DKK) | Ja — beriger med strukturerede metadata og sentiment |
| Via Ritzau API | 100% af officielle presse- og selskabsmeddelelser fra danske aktører | Ja (øjeblikkelig) | 2.800 kr. | Ja — rå B2B-virksomhedssignaler direkte i feed |
| udbud.dk API | Alle kommunale, regionale og statslige udbud og indkøbsplaner | Ja (daglige opdateringer) | **Gratis** (Erhvervsstyrelsen) | Ja — direkte forretningsmuligheder for SMV-ejere |
| GDELT | Bred global, ustruktureret | Ja (15 min) | Gratis | Nej — for støjfyldt og mangler dansk formatering |

**Anbefaling fase 1:**
- **udbud.dk API** (gratis) — høj SMV-værdi, ingen omkostning
- **Via Ritzau** (2.800 kr./mdr.) — realtids pressemeddelelser og selskabsmeddelelser
- NewsAPI eller Newscatcher som supplement afhænger af budget

---

## Samlet tech-stack — anbefaling fase 1

| Funktion | Løsning | Månedlig omkostning |
|---|---|---|
| Nyhedsmotor og trenddata | Supertrends API (rekonfigureres eller LLM-lag oven på) | Intern (ejerkreds) |
| Dagsaktuelle danske nyheder | Via Ritzau API | 2.800 kr. |
| Udbudsdata | udbud.dk API | Gratis |
| Regulatory monitoring | syv.ai Retsinformation + EUR-Lex | Gratis |
| On-demand brief-generering | Eksternt LLM-lag (Claude/OpenAI) | Afhænger af volumen |
| TTS til audio | Ekstern TTS-service (ElevenLabs, Google, Azure) | Afklares |
| Community-platform | Circle.so eller Discourse managed | $100–$298 |
