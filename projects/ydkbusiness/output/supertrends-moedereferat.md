# Supertrends — Mødereferat og arkitekturkonklusioner
**Dato:** 3. juni 2026
**Deltagere:** PM + Supertrends
**Status:** Arbejdsdokument — afventer rammeaftale

---

## Konklusion øverst

Supertrends er dybere integreret i Y.dk Business end antaget inden mødet. De leverer ikke blot data via API — de leverer CMS, datastruktur og overvågningsmotor. Valg A er bekræftet: Y.dk Business bygger oven på Supertrends' infrastruktur. Y.dk's tekniske ansvar er frontend, interface og kildekobling. Supertrends er rygraden.

---

## Hvad Supertrends leverer

| Kapabilitet | Bekræftet | Note |
|---|---|---|
| CMS til Y.dk | ✓ | Supertrends leverer det CMS Y.dk arbejder i og med |
| Datastruktur | ✓ | På plads — kildekobling til nyheder skal bygges |
| Danske og internationale nyhedskilder | ✓ | Dækker begge — sprog løst via kildedækning |
| Brancheovervågning | ✓ | Nyheder, forordninger, jura, regulærer, regler |
| Smart Scans | ✓ | Monitorerer hovedemner — medarbejdere vælger notifikationsemner |
| Automatiseret brief | ✓ | Brugerkonfigureret — automatiseres ud fra præferencer i alle lag |
| Notifikationer | ✓ | Understøttet |
| AI-genereret kontekstanalyse | ✓ | "Det her er vigtigt, fordi..." — analyse af emner og nyheder inden for kundens område |
| Regulatorisk overvågning | ✓ | Dekreter, juridiske regulativer, lovforslag, EU-forordninger |

---

## Arkitekturbeslutning — Valg A bekræftet

**Valg A: Byg oven på Supertrends' infrastruktur.**

Valg B (selvstændigt LLM-lag oven på Supertrends API) er frafaldet som primær arkitektur. Supertrends leverer CMS, datastruktur og overvågningsmotor. Y.dk's tekniske opgave er:

1. **Kildekobling** — integrere nyhedskilder i Supertrends' datastruktur
2. **Frontend og interface** — bygges af Y.dk (dette er udvikling, ikke konfiguration)
3. **Landing page / platform** — konfigureres som hovedværktøj for premium-kunder

---

## Branding: "Powered by Supertrends"

Features og indhold leveret direkte af Supertrends brandes som **"Powered by Supertrends"** i produktet. Beslutning: bedre end at introducere tredjepart. Konsekvent med Y.dk Business' transparente AI-kommunikation ("AI producerer, mennesker verificerer").

Implikation for UI: "Powered by Supertrends" vises på overvågnings-, brief- og trend-komponenter der trækker direkte på Supertrends-motor. Egenproduceret redaktionelt indhold brandes udelukkende som Y.dk.

---

## Briefs — brugerautomatiserede præferencebriefs

Briefs automatiseres af brugerne selv ud fra præferencer i alle lag:
- Bruger konfigurerer emner, brancher, konkurrenter og reguleringsområder
- Systemet genererer og leverer briefs automatisk når konfigurerede kriterier er opfyldt
- Ikke ren on-demand (bruger spørger ad hoc) — men præferencebaseret automatisering

**Implikation:** On-demand briefs til mødeforberedelse (genereret på 60 sekunder) er en separat feature der sandsynligvis kræver et LLM-lag oven på Supertrends-data. Skal afklares med Tech Lead.

---

## Åbne punkter

| Punkt | Ansvarlig | Deadline | Note |
|---|---|---|---|
| Rammeaftale — prissætning | CEO + PM + Supertrends | Afventer kildeaftale | Fee, procentdel eller hybrid — besluttes efter kilder og bidrag er defineret |
| Kildekobling — nyheder | Tech Lead + PM | Afklares juli | Datastruktur på plads, kobling skal bygges |
| Frontend og interface | Tech Lead | Roadmap august | Y.dk's ansvar — dette er udvikling |
| Landing page for premium-kunder | Tech Lead + PM | Roadmap august | Konfigureres som primært brugerværktøj |
| On-demand briefs (ad hoc, 60 sek.) | PM + Tech Lead | Afklares inden kravspec v1.0 | Kræver sandsynligvis separat LLM-lag — ikke dækket af præferencebaseret automatisering |

---

## Hvad der ikke blev afklaret

- Konkret API-dokumentation og rate limits — indhentes i teknisk opfølgningsmøde med Tech Lead
- Supertrends' SLA på oppetid og leveringspålidelighed
- Taksonomi: dansk SMV-branchedækning tilstrækkelig til min. 3 trends/uge per branche
- Kapacitetsloft: antal samtidige brugere og API-kald

Disse afklares i teknisk opfølgning med Lars Tvede og Tech Lead.
