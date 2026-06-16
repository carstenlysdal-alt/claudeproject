---
target: s-prd produkt
total_score: 26
p0_count: 0
p1_count: 0
timestamp: 2026-06-16T22-00-59Z
slug: ydkbusiness-output-ybusiness-dashboard-html-s-prd
---
## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3 | Supertrends-status klart markeret. Mangler: intet signal på hvilke scope-items der er bekræftet vs. usikre |
| 2 | Match System / Real World | 2 | "Valg A", "LLM-lag", "ML-personalisering", "Scope" — fire jargon-lækager i en stakeholder-præsentation |
| 3 | User Control and Freedom | 3 | Nav + back-btn + tastatur til enhver tid |
| 4 | Consistency and Standards | 3 | Layout matcher øvrige sektioner. "Scope" er engelsk i et ellers dansk deck |
| 5 | Error Prevention | 3 | "Valg A" er uforklaret for nye læsere |
| 6 | Recognition Rather Than Recall | 2 | 13-punkts scope-liste uden gruppering. Features angiver ikke tier-tilhørsforhold |
| 7 | Flexibility and Efficiency | 3 | Tastaturnavigation og nav-bar dækker behovet |
| 8 | Aesthetic and Minimalist Design | 2 | Sidst lag er markant længere og indeholder fremmed indhold. 13-item scope ugrupperet |
| 9 | Error Recovery | 3 | Feedback-modal tilgængelig |
| 10 | Help and Documentation | 2 | "LLM-lag", "Valg A" og "ML-personalisering" udefinerede |
| **Total** | | **26/40** | **Acceptable** |

## Anti-Patterns Verdict

LLM: Em-dash-kadens dominerer. Alle seks layers har nøjagtigt samme visuelle vægt med →.
Detector: 88 em-dashes (warning), numbered markers 01-05 (advisory).

## Priority Issues

[P2] Sidst lag blander C-level feature med sponsor-copy fra s-ai. Split og fjern redundansen.
[P2] 13-punkts scope-liste uden gruppering — overbelaster working memory. Gruppér i 3 kategorier.
[P2] "Valg A bekræftet" er udefineret jargon. Erstat med beslutnings-formulering.
[P3] Features viser ikke tier-tilhørsforhold — memory bridge til Business model.
[P3] Em-dash-kadens i layer-copy — varier tegnsætningen.

## Minor Observations

- Redundant inline style="color:var(--green)" på ibox-t — CSS-klassen håndterer det.
- "Scope" er engelsk label i dansk deck.
- Layer-pil → giver alle features identisk prioritet.
