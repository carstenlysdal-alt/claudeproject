# Y.dk – designsystem (udtrukket fra y.dk, 19. nov. 2026)

Teknisk grundlag: Next.js + Tailwind v4 (utility-klasser og `@theme`-variabler). Et ældre Bootstrap 5-lag (`--bs-*`) ligger stadig i bundlen, men styrer ikke det synlige design. Font Awesome 6 bruges til ikoner. Widgets fra tredjepart (fx den blå fane `aiinhbfoop-*`) hører ikke til designsystemet.

## Principper
- Mørkt som standard: varm, næsten sort baggrund (#231f20), lys varm grå tekst (#eeeded). Ingen rene hvide eller sorte flader.
- Tre skrifttyper med faste roller: Public Sans (overskrifter og kort), IBM Plex Mono (versal-labels), systemfont til løbende tekst. Alice (serif) er defineret til redaktionelle citater.
- Stram negativ letter-spacing på store overskrifter (-1,44 px til -2,56 px), positiv på små versale labels (+0,78 px).
- Billeder og kort har 12 px radius, filtre og status har helt runde piller.
- Én accentfarve for "live" (grøn), øvrige accenter bruges kun til medietyper.

## Farver
| Rolle | Token | Værdi |
|---|---|---|
| Baggrund | `--background-primary` | #231f20 |
| Tekst primær | `--text-primary` | #eeeded |
| Tekst sekundær | `--text-secondary` | #d7d6d7 |
| Tekst tertiær | `--text-tertiary` | #c0bcc0 |
| Brødtekst i artikler | `--text-post-paragraph` | #ccc9c6 |
| Dæmpet tekst | `--text-muted` | #eeeded80 |
| Flade aktiv / pillebar | `--surface-active` | #322f32 |
| Flade hævet / pille | `--surface-elevated` | #403c40 |
| Skillelinje | `--divider` | #403c40 |
| Aktiv pille (invers) | `--surface-pill-active` / `--text-pill-active` | #eeeded / #221c1c |
| Live-grøn | `--live-green` | #6fee9c |
| Live-pille flade / kant | `--surface-live-pill` / `--border-live-pill` | #2e3e33 / #7add9d |
| Live-rød accent | `--live-accent` | #fc7373 |
| Video | `--video-accent` | #fd5643 |
| Lyd | `--audio-accent` | #4257f5 |
| Guide | `--guide` | #a970ff |

Lys variant (bruges bl.a. i dele af UI'et): baggrund #eeeded, forgrund #231f20, divider #d7d6d7, dæmpet tekst #231f2080.

## Typografi
| Brug | Font | Størrelse / vægt | Linjehøjde | Letter-spacing |
|---|---|---|---|---|
| Hero-overskrift (desktop) | Public Sans | 56 px / 700 | 1,2 | -2,24 px |
| Hero-overskrift (mobil) | Public Sans | 36 px / 700 | 1,2 | -1,44 px |
| Korttitel (h3) | Public Sans | 16 px / 600 | 1,3 | -0,32 px |
| Label / kategori | IBM Plex Mono | 13 px / 500, versaler | 1,5 | +0,78 px |
| Brødtekst | system-ui | 16 px / 400 | 1,5 | normal |

Størrelsesskala ud over Tailwinds standard: 9, 10, 11, 13, 22, 28, 32, 34, 36, 40 og 64 px. Linjehøjder: `--leading-nav` 1,3, `--leading-article` 1,2, `--leading-post-hero` 1,1, `--leading-caption` 1,4, `--leading-related` 1,6.

## Rum, radius og layout
- Basisenhed 4 px (`--spacing: .25rem`). Kortets indre afstand er `gap-4` (16 px), navigationen bruger `gap-5` og `xl:gap-8`.
- Radius: kort 12 px, piller fuld rundede, toggle-pille 3,75 rem.
- Header-højde 4,5 rem. Maksimal indholdsbredde 80 rem (`container-7xl`).
- Breakpoints: Tailwind standard (640 / 768 / 1024 / 1280 px). Typografien skifter ved 768 px.

## Komponenter
- **Artikelkort**: `article`, lodret flex, gap 16 px, radius 12 px, titel i Public Sans 600.
- **Filterpille**: 40 px høj, fuld radius, 16 px sidepadding, flade #403c40. Aktiv: inverteret (lys flade, mørk tekst).
- **Live-pille**: som filterpille, men med grøn flade og grøn kant.
- **Navigation**: flex, gap 20 px (32 px fra 1280 px), 24 px sidepadding, letter-spacing -0,48 px.

## Filer
- `ydk-tokens.css`: alle tokens som CSS-variabler samt basisstil og de fire komponenter ovenfor, klar til brug.

## Forbehold
Værdierne er læst fra den live CSS og de beregnede stilarter på forsiden, ikke fra en officiel stilguide. Komponenterne i `ydk-tokens.css` er rekonstrueret ud fra de observerede værdier og er ikke Y.dks egen kildekode. Logo og billeder er ikke medtaget. Public Sans, IBM Plex Mono og Alice er åbne Google Fonts.
