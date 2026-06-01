# Projekt: Y.dk Business-sektion

## Projektbeskrivelse

Konceptualisering, udvikling og planlægning af en ny business-sektion
for Y.dk rettet mod erhvervslæsere og SMV-ejere i hele Danmark.

## Positionering (låst)

Y.dk Business er en AI-drevet erhvervsplatform der leverer nyheder,
markedsovervågning, trends og B2B-briefs i ét abonnement til 5.000 kr./år.
Erstatter kludetæppet af Børsen + LassoX + separate BI-tjenester.
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

Abonnementspris år 1: 5.000 kr./år
Abonnentmål år 1: 1.500
ARR ved målopfyldelse: 7,5M DKK
Indhold: erhvervsnyheder + markedsovervågning + trends + B2B-briefs

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

Nyhedsmotoren og Supertrends-infrastrukturen er i drift i dag på Y.dk.
Y.dk Business konfigurerer og udvider den eksisterende motor — bygger ikke fra bunden.
Redaktionskonceptet er den primære tekniske input til konfigurationen.

## Supertrends — ejerskab og implikationer

Supertrends (Lars Tvede) er del af ejerkredsen bag Y.dk Business. Platformen stilles
til rådighed til nogenlunde kostpris — ikke en ekstern leverandør der skal prisevalueres.

Supertrends behandles som given teknologisk infrastruktur. Spørgsmålet er ikke
"kan vi have råd til den" men "hvad kan den præcist, og hvad mangler den" — så vi
ved hvad der skal suppleres med ekstern tech (TTS, community-platform, nyheds-API'er).

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

- `Journalistisk-retning.md` — **autoritativt redaktionelt fundament** for hele Y, inkl. Business. Tre indholdspillarer: Understand / Challenge / Inspire. Definerer værdier, value proposition ("DU BESTEMMER SELV") og AI som kommende USP.
- `docs/positioning-statement.md` — positioneringsstatement (låst fundament)
- `docs/projekt-y-kontekst.md` — mission, team, SWOT, konkurrenter
