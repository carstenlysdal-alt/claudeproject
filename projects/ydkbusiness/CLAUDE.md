# Projekt: Y.dk Business-sektion

## Projektbeskrivelse

Konceptualisering, udvikling og planlægning af en ny business-sektion
for Y.dk rettet mod erhvervslæsere og SMV-ejere i hele Danmark.

## Positionering (låst)

Y.dk Business er en AI-drevet erhvervsintelligensplatform der leverer nyheder,
markedsovervågning, trends, B2B-briefs og leadgenerering i ét abonnement.
Primærkonkurrenter: Finans.dk (4.500–7.200 kr./år), Retriever (15.000–50.000+ kr./år)
og Meltwater (50.000–140.000+ kr./år) — Y Business samler og erstatter alle tre
til 7.500 kr./år (intro: 5.000 kr. år 1).
Konkurrerer ikke primært med erhvervsmedier — ejer en ubesat kategori
for SMV-segmentet: AI-drevet erhvervsintelligens til SMV-priser.

Se: `docs/positioning-statement.md`

## Målgruppe

Primær: SMV-ejere (5-50 ansatte), ledere i mellemstore virksomheder (50-250 ansatte),
iværksættere under 5 år — i hele Danmark
Sekundær (fase 2): Internationale erhvervslæsere
Kommercielle partnere: Annoncører og samarbejdspartnere i erhvervssegmentet

Geografisk scope: Danmark (lancering) → internationalt (senere fase)

## Stakeholders

- CEO — strategisk godkendelse og investering
- Tech Lead — teknologisk platform og arkitektur
- Commercial Lead — kommerciel model og partnerskaber
- Chefredaktør — redaktionelt koncept og kvalitet

## PM-rolle og scope

Primært fokus: Platformen — produktvision, features, brugeroplevelse, tech-arkitektur og roadmap.
Kommerciel model og forretningstal bruges som kontekst for platformsbeslutninger, ikke som primært leveranceområde.
Tal og budgetter kan diskuteres, men output er altid platform-orienteret.

## Strategisk mål

Etablere Y.dk Business som den primære AI-drevne erhvervsintelligens-platform
for SMV-segmentet i Danmark — med redaktionel dybde, kommerciel bæredygtighed
og en teknologisk platform der skalerer.

## Kommercielle rammer (kontekst)

Tier-model:
- Erhverv (indgang): 500 kr./md
- Erhverv+ (anbefalet): 7.500 kr./år · intro: 5.000 kr. år 1
- Premium: 12.500 kr./år · intro: 9.500 kr. år 1
- Kampagne-deadline: 20. november 2026

Abonnentmål år 1: 1.500 Business-abonnenter
ARR-baseline: 9M DKK (1.500 × 500 kr./md run-rate)
ARR-konceptmodel: 7,5M DKK (1.500 × 5.000 kr./år ved årsabonnement)
ARR-opside: 11–14M DKK ved tier-opgradering

Indhold: erhvervsnyheder + markedsovervågning + trends + B2B-briefs + leadgenerering + artikel-deling

## Nuværende fase

Discovery og konceptualisering — Etape 1
Positioning-workshop: afsluttet

## PM-scope (tre spor)

**Spor 1 — Redaktion**
AI-orkestrering, kildevalg, redaktionelle vinkler, outputformat og verificeringsmodel.
Dette er det kritiske dokument tech-teamet venter på for at konfigurere motoren.

**Spor 2 — Produkt og features**
Hvad platformen kan: funktionsset, brugerflows, produktlag (nyheder, overvågning, trends, B2B-briefs).
Adgangsstruktur og pakkeopdeling. Informeres af redaktionskonceptet.

**Spor 3 — Design og UI**
Hvordan platformen ser ud og fungerer for brugeren.
Wireframes, brugeroplevelse, navigationsmønstre, komponenter.
Informeres af funktionssettet.

## Tidsramme

3 effektive måneder (4 måneder minus 1 sommerferie).
Spor 1 og 2 køres parallelt i måned 1.
Spor 3 følger i måned 2-3.

## Teknisk udgangspunkt

Y.dk Business bygger eget CMS og eget system baseret på direkte datakilder.
Supertrends er ude af planen — beslutning bekræftet. Platformen bruger
udelukkende egne systemer og direkte datakilder (CVR, Retsinformation,
EUR-Lex, RSS m.fl.), ikke ekstern crawling-infrastruktur.

Jesper (Tech Lead) har ansvar for specifikationer og udviklingsprioritering.
tech involveres i overvågnings- og intelligensarbejdet.
Kildeidentifikation og -struktur er i gang.

## Leverancer

1. Konceptdokument — produktvision og strategisk fundament (næsten færdigt)
2. Redaktionelt koncept — AI-orkestrering, kilder, vinkler, format (prioritet 1)
3. Features og produktlag — funktionsset, brugerflows, pakkestruktur
4. Design og UI — wireframes og brugeroplevelse

## Mappestruktur

- `docs/` — arbejdsdokumenter under udarbejdelse
- `output/` — færdige leverancer klar til stakeholders
- `research/` — research-input og videngab fra /research-brief

## Nøgledokumenter

- `Journalistisk-retning.md` — autoritativt redaktionelt fundament for hele Y, inkl. Business.
- `docs/Produktvision.md` — masterkonceptet: alle seks lag, kommerciel model, tech, lanceringsplan
- `docs/Strategi - Positionering.md` — Geoffrey Moore-statement og konkurrentanalyse
- `docs/Produkt - Kravspecifikation.md` — funktionelle krav, tech-spec, tier-adgang (Tech Lead)
- `docs/Produkt - Roadmap.md` — PM-leverancer, milepæle, afhængigheder
- `docs/Redaktion - Editorial-model.md` — pillars, segmenter, løfter, dogmer
- `docs/Redaktion - AI-motorspecifikation.md` — AI-orkestrering, kildestruktur, outputformat
- `docs/Redaktion - Formater-og-klummer.md` — signaturformater, klummer, kildetaksonomi
- `møder/` — alle mødereferater
