---
name: app-optimering
description: "Struktureret audit og optimering af frontend-apps med fokus på mobiloplevelse, UI-tekst, padding, responsivt layout, performance og accessibility. Aktivér når noget ser forkert ud på mobil, tekst er uklar, eller UI mangler polish."
metadata:
  version: 1.0.0
  type: custom
---

# App-optimering

Systematisk gennemgang og optimering af en app eller side efter gældende principper for mobiloplevelse, UI-kvalitet og performance. Producerer en prioriteret handlingsliste og anvender rettelserne direkte i koden.

## Hvornår aktiveres denne skill

Aktiveres med `/app-optimering` eller når brugeren nævner:
- "noget ser forkert ud på mobil"
- "man skal scrolle til siden" / "horizontal scroll"
- "padding er forkert" / "teksten er for stor / for lille"
- "UI ser rodet ud" / "polish mangler"
- "optimer appen"

---

## Seks trin — udføres altid i denne rækkefølge

### Trin 1 — Mobiloplevelse og viewport

Kontrollér at appen ikke udløser horizontal scroll på nogen skærmbredde.

Tjekliste:
- `max-width: 100%` og `overflow-x: hidden` på body og container
- Ingen faste pixel-bredder på elementer der overskrider viewport-bredden
- `viewport` meta-tag sat korrekt: `width=device-width, initial-scale=1`
- Ingen elementer med `position: absolute` der skaber overflow
- Billeder og medier sat til `max-width: 100%`

Padding-standarder på mobil:
- Horisontal padding/margin på hovedelementer: minimum 16px (1rem), anbefalet 20–24px
- Touch-targets (knapper, links): minimum 44×44px hitbox
- Ingen tekst der rammer kant til kant uden luft

### Trin 2 — Sprog og UI-tekst

Gennemgå al synlig tekst i interfacet: labels, knapper, overskrifter, fejlmeddelelser, placeholders, tooltips.

Standarder:
- Kortest mulige ord der bevarer præcisionen — "Gem" ikke "Gem dine ændringer"
- Knapper navngives med handling, ikke substantiv — "Log ind" ikke "Login"
- Fejlmeddelelser fortæller hvad brugeren skal gøre, ikke hvad der gik galt teknisk
- Placeholders erstatter ikke labels — brug begge, eller kun label
- Konsistent store/små bogstaver: vælg én konvention og hold den
- Dansk: ingen unødige anglicismer i brugervendt tekst

### Trin 3 — Visuelt hierarki og spacing

Kontrollér at layout kommunikerer prioritet tydeligt og at spacing er konsistent.

Tjekliste:
- Typografisk skala: maksimalt 4 størrelser i ét layout
- Linjehøjde på brødtekst: minimum 1.5
- Farvekontrast: minimum 4.5:1 for brødtekst (WCAG AA), 3:1 for store overskrifter
- Spacing følger et system (4px / 8px grid eller tilsvarende) — ingen vilkårlige værdier
- Hvidt rum bruges aktivt til at gruppere og adskille — ikke udfyldt med indhold

### Trin 4 — Responsivt layout

Verificér at layoutet fungerer fra 320px til 1440px uden brud.

Tjekliste:
- Test ved 320px, 375px, 414px, 768px, 1024px og 1440px
- Flexbox og grid bruges frem for floats og faste bredder
- Billeder: `srcset` eller CSS `object-fit` bruges korrekt
- Navigation kollapser til hamburgermenu eller tilsvarende ved < 768px
- Formularer er brugbare med mobilkeyboard — ingen felt skjult bag keyboard

### Trin 5 — Core Web Vitals og performance

Fokus på de tre målbare brugeroplevelsesmål.

**LCP (Largest Contentful Paint) — mål: < 2.5s**
- Største synlige element (typisk hero-billede eller H1) loades tidligt
- Billeder præloadet med `<link rel="preload">` hvis kritiske
- Ingen render-blocking scripts i `<head>` uden `defer` eller `async`

**CLS (Cumulative Layout Shift) — mål: < 0.1**
- Billeder og embeds har eksplicit `width` og `height`
- Ingen indhold injecteret over eksisterende indhold efter load
- Fonte loadet med `font-display: swap`

**INP (Interaction to Next Paint) — mål: < 200ms**
- Event handlers er ikke blokerende
- Tunge operationer køres i `requestAnimationFrame` eller web workers

### Trin 6 — Accessibility (WCAG 2.2 AA)

Minimumskrav der ikke forhandles.

Tjekliste:
- Alle billeder har meningsfuld `alt`-tekst (eller `alt=""` hvis dekorativt)
- Formularfelter har associerede `<label>` elementer
- Fokusindikator er synlig på alle interaktive elementer (ingen `outline: none` uden erstatning)
- Farveinformation bruges aldrig alene til at formidle mening
- Sidens sprogattribut er sat: `<html lang="da">`
- Overskriftshierarki er logisk: ét `<h1>`, derefter `<h2>` osv.
- Interaktive elementer er tilgængelige med tastatur alene

---

## Output

Producér to ting:

**1. Prioriteret handlingsliste** — sorteret efter brugersynlig effekt:
- Kritisk (blokerer brugere): løses nu
- Vigtig (forringer oplevelsen): løses i denne session
- Nice-to-have: noteres til backlog

**2. Direkte rettelser i koden** — anvend alle kritiske og vigtige rettelser inline uden at vente på bekræftelse, medmindre en rettelse kræver arkitekturændring.

Ingen lange forklaringer af hvad der er gjort. Vis kodeændringerne og den opdaterede handlingsliste.
