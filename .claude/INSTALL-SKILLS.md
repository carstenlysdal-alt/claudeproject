# install-skill-bundle — hurtig reference

Script: `~/.local/bin/install-skill-bundle`  
Kilde i repo: `.claude/bin/install-skill-bundle`

---

## Ny maskine — kør dette først

```bash
git clone https://github.com/carstenlysdal-alt/claudeproject pm-platform
cd pm-platform
bash .claude/bootstrap.sh
source ~/.zshrc
```

Bootstrap installerer de universelle skills globalt og gør `install-skill-bundle` tilgængeligt overalt.

---

## Nyt projekt — installér det du har brug for

```bash
install-skill-bundle frontend       # UI, design engineering, polish
install-skill-bundle web-quality    # Accessibility, performance, SEO, best practices
install-skill-bundle architecture   # TDD, diagnose, refaktorering, output-enforcement
install-skill-bundle meta           # find-skills, caveman, grill-with-docs, executing-plans
install-skill-bundle pm             # deanpeters 46 PM-frameworks
install-skill-bundle pm-metrics     # OKR, North Star, A/B-test, vækst-loops, dashboards
install-skill-bundle gtm            # Launch, sales enablement, revops, content, email, ads
install-skill-bundle presentation   # SlideSpeak (PPTX) + HTML-slides
```

### Samlede bundter

```bash
install-skill-bundle all-dev        # frontend + web-quality + architecture
install-skill-bundle all-pm         # pm + pm-metrics + gtm + presentation
install-skill-bundle all            # alt
```

### Installer globalt (tilgængeligt i alle projekter)

```bash
install-skill-bundle frontend --global
install-skill-bundle architecture --global
```

---

## Hvad ligger i hvert bundt

| Bundt | Skills |
|---|---|
| `frontend` | frontend-design, web-design-guidelines, make-interfaces-feel-better, emil-design-eng, refactoring-ui, impeccable, data-visualization |
| `web-quality` | web-quality-audit, accessibility, core-web-vitals, performance, best-practices, seo |
| `architecture` | improve-codebase-architecture, tdd, diagnose, full-output-enforcement, to-issues, to-prd |
| `meta` | find-skills, caveman, grill-with-docs, zoom-out, executing-plans |
| `pm` | deanpeters 46 skills (roadmap, PRD, discovery, positioning, JTBD m.fl.) |
| `pm-metrics` | pm-okrs, north-star-metric, ab-test-analysis, measure-experiment-design, stakeholder-map, pre-mortem, growth-loops, measure-survey-analysis, metrics-dashboard |
| `gtm` | launch, sales-enablement, revops, content-strategy, cold-email, emails, cro, ads, ad-creative, social, analytics |
| `presentation` | slidespeak, frontend-slides |

---

## Se alle kategorier

```bash
install-skill-bundle --help
```
