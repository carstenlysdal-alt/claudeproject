---
name: metrics-eksperimenter
description: "Aktivér dette bundle ved metrics-design, A/B-tests, eksperimenter, surveys, dashboards, North Star Metric og outcome-evaluering. Trigger: 'definer metrics', 'A/B-test', 'North Star', 'survey-resultater', 'eksperiment', 'hvad skal vi måle', 'KPI', 'dashboard'."
metadata:
  version: 1.0.0
  type: bundle
---

# Metrics & Eksperimenter Bundle

Samler alle frameworks til at definere, designe og analysere metrics og eksperimenter.

## Skills i dette bundle

### Metrics og måling
| Skill | Aktivér når |
|---|---|
| `north-star-metric` | Definere North Star Metric og input-metrics |
| `metrics-dashboard` | Designe et metrics-dashboard med KPI'er og alert-tærskler |
| `product-manager-skills:finance-metrics-quickref` | Hurtig reference til finansielle metrics |
| `product-manager-skills:saas-revenue-growth-metrics` | SaaS-vækstmetrics og -benchmarks |
| `product-manager-skills:saas-economics-efficiency-metrics` | Effektivitets- og unit economics-metrics |

### Eksperimenter og tests
| Skill | Aktivér når |
|---|---|
| `ab-test-analysis` | Analysere A/B-testresultater og ship/extend/stop-beslutning |
| `measure-experiment-design` | Designe et rigorøst eksperiment med hypotese og sample size |
| `brainstorm-experiments-existing` | Generere eksperiment-hypoteser og pretotypes |

### Brugerindsigt og feedback
| Skill | Aktivér når |
|---|---|
| `measure-survey-analysis` | Syntetisere survey-resultater til PM-beslutning |
| `feedback-analyse` | Syntetisere interviews, surveys og support til PM-beslutning |
| `outcome-analyse` | Evaluere afsluttet initiativ: iterér/pivotér/stop |

### OKR og målstyring
| Skill | Aktivér når |
|---|---|
| `pm-okrs` | Definere OKR'er, mid-cycle check-in, end-of-quarter scoring |

## Bemærkning om installation

Følgende skills er dokumenteret i CLAUDE.md men endnu ikke installeret lokalt:
- `north-star-metric`, `ab-test-analysis`, `measure-experiment-design`, `measure-survey-analysis`, `metrics-dashboard`, `pm-okrs`

Brug `feedback-analyse` og `outcome-analyse` (custom) som alternative.
Se `.claude/SETUP-NOTES.md` for installationsvejledning.

## Brugsanvisning

1. Start altid med at definere *hvad* der skal måles (`north-star-metric`) inden du designer test (`measure-experiment-design`).
2. Analysér resultater med `ab-test-analysis` og konkludér med `outcome-analyse`.
3. Syntetisér kvalitativ feedback med `feedback-analyse` og kvantitativ med `measure-survey-analysis`.
