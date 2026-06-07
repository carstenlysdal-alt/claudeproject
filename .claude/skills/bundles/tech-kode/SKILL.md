---
name: tech-kode
description: "Aktivér dette bundle ved kodeopgaver, arkitektur, debugging, tests, performance og tekniske reviews. Trigger: 'byg', 'implementér', 'refaktorer', 'test', 'debugging', 'arkitektur', 'performance', 'kodegennemgang', 'deploy'."
metadata:
  version: 1.0.0
  type: bundle
---

# Tech & Kode Bundle

Samler alle tekniske skills til udvikling, test og arkitektur.

## Skills i dette bundle

### Udvikling og arkitektur
| Skill | Aktivér når |
|---|---|
| `improve-codebase-architecture` | Refaktorere og forbedre arkitektur |
| `best-practices` | Tjekke mod best practices for det givne teknologistack |
| `vercel-react-best-practices` | React/Next.js/Vercel-specifikke best practices |
| `subagent-driven-development` | Komplekse opgaver der kræver parallel agent-eksekvering |

### Test og kvalitet
| Skill | Aktivér når |
|---|---|
| `tdd` | Test-drevet udvikling med red-green-refactor |
| `webapp-testing` | End-to-end og integrationstests til webapps |
| `web-quality-audit` | Kvalitetsaudit af eksisterende webapp |
| `diagnose` | Diagnosticere fejl og uventede behaviours |

### Performance og core web vitals
| Skill | Aktivér når |
|---|---|
| `performance` | Performance-optimering: rendering, bundling, caching |
| `core-web-vitals` | LCP, FID/INP, CLS — Google-metrics til web |
| `accessibility` | WCAG-compliance og tilgængelighed |

### Code review og validering
| Skill | Aktivér når |
|---|---|
| `grill-with-docs` | Stress-teste teknisk beslutning mod eksisterende dokumentation |
| `requesting-code-review` | Strukturere og bede om code review |

### Refaktorering og cleanup
| Skill | Aktivér når |
|---|---|
| `refactoring-ui` | Refaktorere UI-komponenter og struktur |
| `extract-design-system` | Ekstrahere designsystem fra eksisterende kodebase |

## Brugsanvisning

1. Brug `tdd` til ny funktionalitet — test først.
2. Brug `diagnose` til fejlfinding inden løsning forsøges.
3. Tjek `best-practices` inden PR sendes.
4. Brug `performance` + `core-web-vitals` til frontend-optimering.
5. Afslut med `web-quality-audit` for samlet kvalitetstjek.
