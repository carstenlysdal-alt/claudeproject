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
| `qa` | Struktureret QA-gennemgang af feature eller release |
| `diagnose` | Diagnosticere fejl og uventede behaviours |
| `dev-bug-debugger` | Debugge konkrete bugs med reproduktion og root cause |
| `dev-unit-test-generator` | Generere fokuserede unit tests |
| `dev-integration-test-builder` | Bygge integrationstests på tværs af services |
| `dev-test-coverage-analyzer` | Analysere testdækning og risikoområder |
| `dev-tdd-coach` | Guide TDD-processen trin for trin |
| `testing-mock-designer` | Designe mocks, fakes og test doubles |
| `testing-selenium-guide` | Selenium-baserede browser-tests |
| `test-scenarios` | Udfolde testscenarier og edge cases |

### Performance og core web vitals
| Skill | Aktivér når |
|---|---|
| `performance` | Performance-optimering: rendering, bundling, caching |
| `core-web-vitals` | LCP, FID/INP, CLS — Google-metrics til web |
| `accessibility` | WCAG-compliance og tilgængelighed |
| `dev-performance-profiler` | Profilere runtime, CPU, memory og bottlenecks |
| `dev-web-performance-optimizer` | Optimere frontend performance og bundle size |
| `dev-caching-strategy` | Designe caching på app-, CDN- og datalag |

### Code review og validering
| Skill | Aktivér når |
|---|---|
| `grill-with-docs` | Stress-teste teknisk beslutning mod eksisterende dokumentation |
| `requesting-code-review` | Strukturere og bede om code review |
| `request-refactor-plan` | Anmod om en struktureret refaktoreringsplan inden kode ændres |
| `to-issues` | Nedbryde en plan, spec eller PRD til independently-grabbable GitHub issues |
| `dev-code-reviewer` | Gennemføre struktureret code review med findings |
| `agent-code-review-subagent` | Bruge specialiseret subagent til code review |
| `dev-code-documentation-pro` | Dokumentere kode, API'er og arkitekturbeslutninger |
| `dev-api-doc-generator` | Generere API-dokumentation |
| `dev-clean-architecture-guide` | Vurdere clean architecture og dependency boundaries |
| `dev-design-patterns-advisor` | Vælge eller evaluere design patterns |
| `dev-technical-writing-guide` | Skrive teknisk dokumentation og guides |
| `docs-adr-writer` | Skrive Architecture Decision Records |
| `develop-adr` | Udvikle en ADR fra problem til beslutning |
| `develop-solution-brief` | Skrive teknisk solution brief |
| `develop-spike-summary` | Opsummere teknisk spike |

### Git og CI/CD
| Skill | Aktivér når |
|---|---|
| `git-guardrails-claude-code` | Sæt sikkerhedsregler for git-operationer i Claude Code |
| `setup-pre-commit` | Konfigurér pre-commit hooks for kvalitetssikring ved hvert commit |
| `dev-git-workflow-helper` | Designe git-flow, branching og PR-praksis |
| `dev-cicd-pipeline-builder` | Bygge CI/CD pipeline uafhængigt af platform |
| `devops-github-actions-expert` | GitHub Actions workflows og checks |
| `devops-gitlab-ci-guide` | GitLab CI pipelines |
| `azure-pipelines-validator` | Validere Azure Pipelines |

### Refaktorering og cleanup
| Skill | Aktivér når |
|---|---|
| `refactoring-ui` | Refaktorere UI-komponenter og struktur |
| `extract-design-system` | Ekstrahere designsystem fra eksisterende kodebase |
| `dev-feature-flag-system` | Designe feature flag system |
| `dev-feature-flags-manager` | Administrere og rydde op i feature flags |
| `dev-regex-builder` | Bygge og forklare regex sikkert |
| `dev-log-analyzer` | Analysere logs for fejlmønstre |
| `dev-secrets-scanner` | Finde hardcodede secrets |
| `dev-vulnerability-analyzer` | Analysere sårbarheder og exploitability |
| `dev-security-auditor` | Gennemføre teknisk sikkerhedsaudit |
| `dev-owasp-checker` | Tjekke mod OWASP Top 10 |
| `dev-pentest-assistant` | Planlægge defensiv pentest og fundgennemgang |

### Scripting og generatorer
| Skill | Aktivér når |
|---|---|
| `bash-script-generator` | Generere shell scripts |
| `bash-script-validator` | Validere shell scripts |
| `makefile-generator` | Generere Makefiles |
| `makefile-validator` | Validere Makefiles |
| `dockerfile-generator` | Generere Dockerfiles |
| `dockerfile-validator` | Validere Dockerfiles |
| `helm-generator` | Generere Helm charts |
| `helm-validator` | Validere Helm charts |
| `k8s-yaml-generator` | Generere Kubernetes manifests |
| `k8s-yaml-validator` | Validere Kubernetes manifests |
| `k8s-debug` | Debugge Kubernetes workloads og manifests |

## Brugsanvisning

1. Brug `tdd` til ny funktionalitet — test først.
2. Brug `diagnose` til fejlfinding inden løsning forsøges.
3. Tjek `best-practices` inden PR sendes.
4. Brug `performance` + `core-web-vitals` til frontend-optimering.
5. Afslut med `web-quality-audit` for samlet kvalitetstjek.
