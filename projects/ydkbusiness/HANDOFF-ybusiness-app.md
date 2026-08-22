# Handoff — Sammenlægning af Intern/Ekstern/Redaktionelt koncept til ét dokument

**Status:** Ikke færdig. Læs dette før du gør noget som helst andet.

## Hvad opgaven er

Brugeren oplevede at headeren "blinkede"/ændrede sig en smule hver gang man
skiftede mellem Intern, Ekstern og Redaktionelt koncept via switcheren
øverst til højre. Årsag: de tre visninger er tre separate HTML-filer, og
skift mellem dem er en fuld sidegenindlæsning i browseren — uundgåeligt
med tre separate dokumenter. Brugeren bad om at lægge alle tre sammen i
**ét** HTML-dokument med JS-styret visningsskift (ingen sidegenindlæsning),
så headeren er ét permanent DOM-element der aldrig genindlæses.

## Hvor filerne er

- **Byggeskript (kilde til sandhed for hvordan filen er samlet):**
  `/private/tmp/claude-501/-Users-Lysdal-GITS-claudeproject/2e37d0ac-1ff6-455d-99e7-3d2103a260d9/scratchpad/`
  - `merge_build.py` — kerne-hjælpefunktioner: `rename_id`, `rename_keyframe`, `scope_css`, `extract_root_block`
  - `assemble.py` — `process_view()`, som tager én kilde-fil og returnerer `{body, css, root_inner, scripts}` klar til indsættelse
  - `final_build.py` — selve samlingen: kalder `process_view()` for alle tre filer, bygger den delte header, skriver `ybusiness-app.html`
  - **VIGTIGT:** disse scriptfiler ligger i en midlertidig scratchpad-mappe, ikke i repoet. De overlever formentlig ikke til en ny session. Hvis du skal fortsætte arbejdet, skal du enten genskabe logikken derfra (beskrevet nedenfor) eller spørge brugeren om scratchpad-stien stadig findes.
  - **Kør ordren hver gang:** slet `__pycache__`-mapper i scratchpad før hver kørsel af `final_build.py` — der var et reelt cache-problem hvor Python kørte en forældet version af `merge_build.py` efter redigeringer (`find . -name "__pycache__" -exec rm -rf {} +`).
- **Output (det samlede dokument):**
  `projects/ydkbusiness/output/ybusiness-app.html` — genereres af `final_build.py`. **Rediger IKKE denne fil direkte** — alle ændringer skal ske i kildefilerne eller i byggescriptet, ellers overskrives de ved næste kørsel.
- **Kildefiler (urørte, bortset fra én rettelse — se nedenfor):**
  - `projects/ydkbusiness/output/ybusiness-dashboard.html` (Intern)
  - `projects/ydkbusiness/output/yredaktion-dashboard.html` (Redaktionelt koncept) — **én reel rettelse lavet heri, se "Rettelser lavet i kildefiler" nedenfor**
  - `projects/ydkbusiness/output/ybusiness-ekstern.html` (Ekstern præsentation)
- **Server til lokal preview:** `projects/ydkbusiness/output/server.js` (allerede eksisterende, deployet på Railway: `https://ybusiness-dashboard-production.up.railway.app`). Kør med `node projects/ydkbusiness/output/server.js` fra repo-roden, eller via `.claude/launch.json`-konfigurationen `"ybusiness-app"` som blev tilføjet denne session (port 3000). Åbn `http://localhost:3000/ybusiness-app.html`.

## Hvordan sammenlægningen virker (arkitektur)

Hver kildefil scopes under sin egen CSS-wrapper (`#view-intern`,
`#view-redaktion`, `#view-ekstern`) — **hver eneste selector** i hver fils
`<style>` bliver prefixet mekanisk, ingen undtagelser, for at undgå at
gætte forkert om hvilke klasser der er "sikre at dele" (to dashboards har
fx `.dash-nav-item`/`.hub-tile`/`.tile-*` med reelt forskellige værdier).

Kollisioner der er håndteret:
- **Element-id'er** der findes i mere end én fil (`stage`, `hub`,
  `hub-disc-ring`, `glow-1`–`glow-5`) omdøbes med suffiks pr. visning
  (`stage-intern`, `stage-redaktion` osv.) — inkl. opdatering af
  `getElementById(...)`, `url(#...)`, CSS `#id`-selektorer.
- **Eksterns sektions-id'er** `s1`–`s5` kolliderer med Redaktionelt koncepts
  `s1`–`s8` → omdøbt til `s1-ek`...`s5-ek` i Ekstern.
- **`@keyframes`-navne** der går igen i flere filer (`bg-flow`, `disc-spin`,
  `ellipse-orbit`, `node-rise`, `spoke-in`) omdøbes pr. visning, både i CSS
  og i inline `style="animation:..."`-attributter i markup.
- **`html`/`body`-selektorer** — dette var en reel bug jeg fandt og rettede:
  `scope_css()` prefixede oprindeligt `html {...}` til `#view-ekstern html
  {...}`, hvilket ALDRIG matcher noget (html er en forfader, ikke et
  efterkommer-element, af `#view-ekstern`). Rettet i `merge_build.py` til
  at erstatte `html`/`body` med selve wrapper-selectoren
  (`#view-ekstern {...}`) i stedet for at prefixe den som efterkommer.
  **Denne rettelse er kritisk og skal bevares hvis logikken genskabes.**
- **`:root`-tokens** forenes til ét sæt i `final_build.py`'s
  `UNIFIED_ROOT`-variabel. Eksterns `--accent10`/`--accent20` (uden
  bindestreg) omdøbes til `--accent-10`/`--accent-20` for at matche
  dashboardsne konsekvent.
- **Header/switcher** — hver fils gamle `<header>` fjernes helt (regex
  `<header class="dash-header" id="mainHeader">.*?</header>` for
  dashboardsne, `<header class="site-header">.*?</header>` for Ekstern).
  Én ny delt header bygges i `final_build.py`'s `header`-variabel, med tre
  `<nav>`-varianter (kun én synlig ad gangen via `style="display:none"`) og
  `showView(name)`-funktionen der skifter `.active`-klasse på de tre
  `#view-X`-containere, opdaterer nav/undertekst/switcher-aktiv-tilstand, og
  kalder `window.dispatchEvent(new Event('resize'))` for at tvinge
  dashboardsnes egne `scale()`-funktioner til at genberegne uden at skulle
  eksportere ekstra globale funktioner.
- **`vt-fixed`/`page-veil`** (bruges i original til at maskere
  sidegenindlæsning) fjernes helt fra alle tre kilder — unødvendige når der
  ikke sker en reel navigation længere.

## UAFSLUTTET — det reelle problem lige nu

**Symptom:** Når man skifter til Ekstern-visningen (`showView('ekstern')`),
er headeren korrekt, men **selve indholdsområdet er tomt/hvidt** — ingen
hero-tekst, intet synligt indhold, selvom `getComputedStyle()` via
JavaScript bekræfter at `.hero` har `display:grid` og korrekte mål, og
`document.body` har korrekt tekstindhold i DOM'en (bekræftet via
`get_page_text` på et tidligere, næsten-identisk tidspunkt i debugging).

Jeg har brugt betydelig tid på at forsøge at diagnosticere dette og fandt
undervejs TO ægte bugs (begge rettet, se nedenfor), men det **oprindelige
symptom (tomt indholdsområde ved Ekstern) er stadig ikke bekræftet løst**
efter sidste rettelse — sidste skærmbillede viste stadig en tom side under
headeren efter klik på "Ekstern".

### To bugs fundet og rettet undervejs (bevar disse rettelser)

**1. `html`/`body`-scoping-bug i `scope_css()`** (i `merge_build.py`) —
beskrevet ovenfor. Bekræftet rettet og virkede korrekt i test.

**2. Pre-eksisterende `<div>`/`</div>`-ubalance i `yredaktion-dashboard.html`s
S8-sektion** — IKKE indført af nogen session denne uge, bekræftet til
stede i `git show HEAD` før nogen ændringer overhovedet. Placeringen: lige
før `<div class="vt-fixed" id="vt-fixed">` (søg efter
`<!-- /s8-prompt-section -->` for at finde stedet). Jeg fjernede 3
`</div>`-tags der (linje ~3315-3320 i den daværende fil), baseret på en
Python `html.parser.HTMLParser`-analyse — **denne analyse var delvist
fejlbehæftet** (jeg tjekkede kun S8-segmentet isoleret, ikke fra dokumentets
reelle start, hvilket gav et forkert billede af hvor mange
lukke-tags der reelt var "for meget"). Den efterfølgende, mere korrekte
analyse (kørt på HELE `<body>` fra start, med scripts fjernet) fandt kun
**waltz ét** ægte problem i den oprindelige fil (`EXTRA CLOSE </div>` ét
sted, ikke tre) — og efter min 3-tags-fjernelse viser en frisk analyse af
`redaktion['body']` fra `process_view()` nu **2 uafsluttede `<div>`
(`.deck-viewport` og `.deck-stage`)** ved dokumentets slutning i stedet.

**Vigtig positiv observation før jeg stoppede:** Efter min S8-rettelse
bekræftede jeg via `document.getElementById('ed-research-overlay')`'s
forældre-kæde, at dette modal-element (som tidligere "undslap" til at blive
et direkte barn af `<body>`, hvilket var det oprindelige synlige symptom
brugeren ikke bad om at jeg skulle jage — jeg fandt det selv under
verifikation) **nu korrekt er indlejret** i
`#stage-redaktion → #view-redaktion → BODY`. Så S8-rettelsen løste i hvert
fald DEN specifikke escape-bug, selvom den globale div-balance ikke er
teoretisk perfekt.

**Det jeg IKKE nåede at afklare:** om det tomme Ekstern-indholdsområde,
jeg så i det allersidste skærmbillede, er (a) et resterende ægte bug
relateret til `.deck-viewport`/`.deck-stage` der nu er uafsluttede og
måske "sluger" Eksterns indhold ind i sig selv strukturelt, (b) en
midlertidig browser-artefakt (jeg oplevede FLERE gange denne session at
browser-preview-værktøjet viste indefrosne/forældede skærmbilleder — bl.a.
efter at brugerens computer gik i dvale midt i en handling — som ikke
afspejlede den faktiske side, bekræftet ved at JS-forespørgsler mod samme
side viste korrekte værdier mens skærmbilledet var forkert), eller (c) en
tredje, endnu ikke fundet årsag.

## Anbefalet næste skridt

1. **Start med at bekræfte om bug (2) fra sidst reelt er et problem.** Kør
   `process_view()` for `yredaktion-dashboard.html` og tjek med
   `html.parser.HTMLParser` (kør fra `<body>`s reelle start, IKKE et
   isoleret segment) om der stadig er strukturelle fejl. Hvis
   `.deck-viewport`/`.deck-stage` er uafsluttede, find ud af om det er en
   reel konsekvens af min 3-tags-fjernelse (måske skulle jeg kun have
   fjernet 1, ikke 3) — overvej at reversere min S8-redigering i
   `yredaktion-dashboard.html` og i stedet finde og rette KUN den ene
   sande `EXTRA CLOSE`-linje som blev identificeret i den mere pålidelige
   fulde-body-analyse.
2. **Uafhængigt af (1):** genskab en RIGTIG, frisk browser-fane (ikke en
   der har været åben under en eventuel dvale/lang pause) og test
   `http://localhost:3000/ybusiness-app.html` → klik "Ekstern" → tag et
   skærmbillede. Hvis den STADIG er tom, brug
   `document.querySelector('#view-ekstern .hero').getBoundingClientRect()`
   og `document.querySelector('#view-ekstern main').innerHTML.length` for
   at afgøre om indholdet reelt er der men usynligt (CSS-problem) eller
   reelt mangler (assembly-problem).
3. Når Ekstern-visningen er bekræftet korrekt: test alle 6 retninger i
   switcheren (intern→red, red→ekstern, ekstern→intern, osv.), tjek
   browser-konsollen for fejl efter hvert skift, og bekræft at
   `window.scrollTo(0,0)` i `showView()` rent faktisk nulstiller scroll
   (det gjorde det i test, men dobbelttjek).
4. Når alt virker: opret de tre gamle filnavne som redirect-stubs til
   `ybusiness-app.html#intern` osv. (planlagt, ikke påbegyndt), så
   `ybusiness-onboarding.html`s switcher (som er uden for scope og IKKE må
   røres) fortsat virker.
5. Ryd op: fjern den midlertidige `<!-- samlet app: ... -->`-kommentar jeg
   tilføjede i `ybusiness-app.html`s `<html>`-tag (kosmetisk, ikke
   nødvendigt at fjerne, men ryddeligt). Fjern `.claude/launch.json`s
   `"ybusiness-app"`-indgang hvis den ikke længere er nødvendig, eller
   behold den — den er nyttig til fremtidig preview.

## Andre ting lavet denne session (færdige, ikke en del af det uafsluttede)

- Persistent, ikke-blinkende header inde i HVER ENKELT dashboard for sig
  (før sammenlægningen) — dette virker og er verificeret. Det er selve
  SAMMENLÆGNINGEN til ét dokument der er uafsluttet.
- Viewport-fix så hvert dashboard fylder skærmen uden scroll, med ensartet
  24px padding-ramme — færdigt og verificeret.
- Accent-bar/bg-grid-konsistens mellem de to dashboards — færdigt.
- Ekstern-siden fik samme 24px-ramme og flydende gradient-baggrund som
  dashboardsne — færdigt (i kildefilen, før sammenlægning).
- Nordisk fokus tilføjet til Signalradaren i Redaktionelt koncept, samt
  dokumentation-alignment i `docs/Redaktion - Formater-og-klummer.md` og
  `docs/Redaktion - Editorial-model.md` — færdigt, committet ikke, men
  filerne er ændret på disk.
- S8 Morgenbriefet-redesign (farvekodede bløde kort) — færdigt, virker,
  **bekræftet stadig korrekt efter S8-div-rettelsen** (skærmbillede taget).
- Design-audit leveret som artifact tidligere i sessionen (kuratering og
  disposition) — afsluttet, ikke en del af dette uafsluttede arbejde.

## Vigtigt at vide om værktøjsmiljøet

- Browser-preview-værktøjet i denne session har flere gange vist
  indefrosne/forældede skærmbilleder der IKKE afspejlede den faktiske
  side — bekræftet ved sideløbende JS-forespørgsler. Stol IKKE blindt på
  et enkelt skærmbillede; kryds-tjek altid med
  `getComputedStyle()`/`get_page_text()`/en helt frisk fane, hvis noget
  ser forkert ud men "burde" virke.
- `file://`-adgang til `ybusiness-app.html` direkte (uden serveren) fejlede
  konsekvent i denne session ("the user declined access") — årsagen blev
  aldrig endeligt afklaret, men brug af den lokale Node-server
  (`http://localhost:3000/...`) via `.claude/launch.json` løste det.
