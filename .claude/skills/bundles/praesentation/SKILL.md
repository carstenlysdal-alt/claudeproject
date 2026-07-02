---
name: praesentation
description: "Aktivér dette bundle ved præsentationer, slides, decks og PM-dokumenter til CEO, Tech Lead eller Commercial Lead. Trigger: 'lav en præsentation', 'slides', 'PowerPoint', 'deck', 'løft dokumentet', 'C-suite præsentation', 'forbered til ledelsen'."
metadata:
  version: 1.0.0
  type: bundle
---

# Præsentation Bundle

Samler alle skills til præsentationer og dokumenter klar til ledelsesniveau.

## Skills i dette bundle

### Præsentationsformat
| Skill | Aktivér når |
|---|---|
| `slidespeak` | PowerPoint/PPTX-filer direkte fra Claude Code (kræver API-nøgle) |
| `pptx` | Generer PPTX-filer direkte via Python — ingen API-nøgle nødvendig |
| `frontend-slides` | HTML-præsentation deployet til URL, eksportérbar til PDF |

### Dokumentfiler
| Skill | Aktivér når |
|---|---|
| `pdf` | Generer PDF-filer direkte fra Claude Code |
| `docx` | Generer Word-dokumenter (.docx) klar til deling |
| `xlsx` | Generer Excel-filer med data, formler og formatering |

### Dokumentkvalitet
| Skill | Aktivér når |
|---|---|
| `document-quality` | Løfte PM-dokument til C-suite-niveau — dansk, præcist, handlingsklart |
| `communication-pitch-deck-designer` | Designe pitch deck til investorer, ledelse eller salg |
| `communication-presentation-builder` | Bygge struktureret præsentation fra budskab og audience |
| `communication-public-speaking-coach` | Forberede mundtlig levering og speaker notes |
| `communication-storytelling-expert` | Skærpe narrativ og dramaturgi i decket |
| `business-commercial-proposal-generic` | Omsætte tilbud/proposal til præsentationsformat |
| `business-it-commercial-proposal` | Omsætte IT-tilbud til deck eller executive summary |
| `utility-slideshow-creator` | Oprette slideshow-struktur og slide-flow |

### SlideSpeak layout-typer
`BIG_NUMBER` · `FUNNEL` · `TIMELINE` · `SWOT` · `PESTEL` · `TABLE` · `COMPARISON`
`AGENDA` · `QUOTE` · `IMAGE` · `CHART` · `PROCESS` · `MATRIX` · `MAP` · `TEAM`

## Valg af præsentationsformat

| Situation | Brug |
|---|---|
| Præsentation til fysisk møde (PowerPoint) | `slidespeak` |
| Præsentation til URL/web (deles som link) | `frontend-slides` |
| Ingen adgang til SlideSpeak API | `frontend-slides` |
| PDF-eksport nødvendig | `frontend-slides` (Playwright-eksport) |

## Dokumentflow til C-suite

```
Udkast (PRD, strategi, roadmap)
  ↓
document-quality (fem trin: diagnostik → sprogrensning → indhold → struktur → final)
  ↓
Klar til CEO / Tech Lead / Commercial Lead
```

## Brugsanvisning

1. Brug `document-quality` *inden* du laver slides — stærkt indhold først.
2. Vælg `slidespeak` til PowerPoint, `frontend-slides` til URL-deling.
3. Præsentationsprincip: konklusion først → evidens → anbefaling → hvad vi beder om.
