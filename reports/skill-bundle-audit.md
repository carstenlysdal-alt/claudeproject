# Skill Bundle Audit

Dato: 2026-07-01

## Formaal

Udvide de 9 bundle-samlinger, saa de daekker flere af de lokale skills uden at goere bundles stoerende eller redundante. Dette dokument er fase 1: overblik, coverage og oprydningsforslag. Selve bundle-filerne boer foerst opdateres efter denne audit er accepteret.

## Kilder

- Projektbundles: `.claude/skills/bundles/*/SKILL.md`
- Lokale Codex/Claude Code skills: `.agents/skills/*/SKILL.md`
- Supplerende Claude-skills: `.claude/skills/**/SKILL.md`
- Global Claude-mappe findes ogsaa, men dette projekts bundle-samlinger ligger i `.claude/skills/bundles/`.

## Nuværende billede

Der er 9 bundle-samlinger:

| Bundle | Direkte skill-referencer i bundle |
|---|---:|
| `app` | 44 |
| `pm-strategi` | 29 |
| `tech-kode` | 20 |
| `design-ui` | 20 |
| `gtm-kommerciel` | 18 |
| `redaktion-indhold` | 15 |
| `metrics-eksperimenter` | 15 |
| `workflow` | 14 |
| `praesentation` | 7 |

Bundle-filerne refererer samlet til ca. 166 unikke skill-navne. Af dem matcher 128 direkte en mappe i `.agents/skills`. Der er 610 lokale `.agents/skills` i alt, saa de fleste lokale skills er endnu ikke eksplicit placeret i en bundle-samling.

## Status efter batch 1

Batch 1 udvidede alle 9 bundle-filer med kuraterede specialist-sektioner. Fokus var de mest oplagte udækkede familier: `agent-*`, `dev-*`, `api-gateway-*`, `cloud-*`, `data-*`, `ai-ml-*`, `define-*`, `discover-*`, `writing-*`, `communication-*`, `automation-*` og generator/validator-skills.

Efter batch 1:

| Metric | Før | Efter batch 1 |
|---|---:|---:|
| Unikke bundle-referencer | ca. 166 | 402 |
| Direkte matches til `.agents/skills` | 128 | 363 |
| Lokale `.agents/skills` uden bundle-reference | 482 | 247 |

Antal direkte tabelrækker pr. bundle efter batch 1:

| Bundle | Skill-rækker |
|---|---:|
| `app` | 104 |
| `workflow` | 86 |
| `tech-kode` | 67 |
| `pm-strategi` | 58 |
| `design-ui` | 31 |
| `gtm-kommerciel` | 28 |
| `redaktion-indhold` | 28 |
| `metrics-eksperimenter` | 26 |
| `praesentation` | 14 |

To bundle-referencer er fortsat ikke fundet som lokale `SKILL.md`-mapper i de scannede lag: `high-end-visual-design` og `redaktionel-tekst`. De var allerede en del af bundle-routingens navngivne skill-logik og er derfor bevaret.

## Stoerste udækkede familier

De stoerste grupper af lokale `.agents/skills`, som ikke er direkte refereret af bundles:

| Familie/prefix | Udækkede skills | Sandsynlig bundle |
|---|---:|---|
| `dev-*` | 78 | `app`, `tech-kode`, delvist `design-ui` |
| `agent-*` | 53 | `workflow`, evt. ny undersektion i `app` |
| `health-*` | 16 | ikke oplagt i nuvaerende 9; kraever beslutning |
| `tool-*` | 15 | `workflow`, evt. `pm-strategi` for sprint/foundation |
| `utility-*` | 12 | `workflow` |
| `psy-*` | 12 | ikke oplagt i nuvaerende 9; kraever beslutning |
| `security-*` | 8 | `tech-kode`, `app` |
| `foundation-*` | 8 | `pm-strategi`, `metrics-eksperimenter` |
| `data-*` | 8 | `metrics-eksperimenter`, `app` |
| `ctx-*` | 7 | `workflow` |
| `ai-ml-*` | 7 | `app`, evt. `tech-kode` |

## Anbefalet oprydningsmodel

Brug fire statusser pr. skill:

| Status | Betydning | Handling |
|---|---|---|
| Primary | Skill er en naturlig del af et bundle | Tilfoej til bundle-tabellen |
| Secondary | Skill er specialiseret og boer ligge under en undersektion | Tilfoej som specialist-skill, ikke top-anbefaling |
| Duplicate/variant | Skill overlapper tydeligt med anden skill | Vaelg canonical skill og naevn alternativ kun hvis noedvendigt |
| Out-of-scope | Skill passer ikke i de 9 nuvaerende bundles | Lad den staa uden bundle eller opret senere ny bundle |

## Foreloebig mapping

### `app`

Udvid med flere fullstack-, cloud-, database-, API-, mobile-, DevOps- og auth-skills.

Kandidater:

- `api-gateway-*`
- `cloud-*`
- `database-*`
- `dev-*` naar de handler om frameworks, backend, mobil, auth, infra eller API
- `devops-*`
- `k8s-*`, `terraform-*`, `terragrunt-*`, `ansible-*`
- `ai-ml-*` naar de handler om produktionssystemer eller pipelines

### `tech-kode`

Udvid med generelle engineering-, test-, debugging-, review-, performance-, security- og scripting-skills.

Kandidater:

- `dev-*` naar de handler om kodekvalitet, test, arkitektur, performance eller reviews
- `testing-*`
- `security-*`
- `bash-*`, `makefile-*`
- `refactor*`, `review*`, `diagnose`, `best-practices`

### `workflow`

Udvid med agent-, context-, prompt-, utility- og orchestration-skills.

Kandidater:

- alle `agent-*` som undersektioner: builders, orchestration, evaluation, monitoring, memory, safety
- `ctx-*`
- `prompt-*`
- `utility-*`
- `tool-*` naar de handler om skill- eller workflow-vedligehold
- `caveman*`, `handoff`, `executing-plans`

### `pm-strategi`

Udvid med produkt-, strategi-, discovery-, prioritering-, roadmap-, stakeholder- og business-model-skills.

Kandidater:

- `define-*`
- `discover-*`
- `prioritize-*`
- `brainstorm-ideas-*`
- `business-model`, `ansoff-matrix`, `competitor-analysis`, `competitive-battlecard`
- `customer-journey-map`, `beachhead-segment`, `value-prop*`

### `metrics-eksperimenter`

Udvid med analytics-, data-, experiment-, cohort-, survey-, OKR- og measurement-skills.

Kandidater:

- `measure-*`
- `data-*` naar de handler om analyse, datakvalitet eller visualisering
- `cohort-analysis`
- `ab-test-analysis`
- `analytics`
- `brainstorm-experiments-*`

### `gtm-kommerciel`

Udvid med marketing-, sales-, ads-, SEO-, email-, launch-, commercial proposal- og growth-skills.

Kandidater:

- `ads`, `ad-creative`
- `marketing-*`
- `seo-*`, `programmatic-seo`
- `cold-email`, `emails`
- `sales-*`, `revops`, `launch`
- `business-commercial-proposal-*`

### `redaktion-indhold`

Udvid med writing-, copy-, editorial-, communication- og content-skills.

Kandidater:

- `writing-*`
- `copy-*`
- `content-*`
- `communication-*` naar outputtet er tekst, pitch eller storytelling
- `arabic-*` hvis sprog-/lokaliseringsarbejde skal med i dette bundle

### `design-ui`

Udvid med UI-, UX-, accessibility-, frontend-design-, wireframe-, visual-, theme- og artifact-skills.

Kandidater:

- `design-*`
- `dev-design-*`, `dev-ui-*`, `dev-wireframe-*`, `dev-responsive-*`
- `accessibility`
- `canvas-design`, `algorithmic-art`, `theme-factory`
- `web-design-guidelines`, `web-artifacts-builder`

### `praesentation`

Udvid med presentation-, deck-, document-, slideshow-, PDF/DOCX/PPTX/XLSX- og executive communication-skills.

Kandidater:

- `communication-pitch-deck-designer`
- `communication-presentation-builder`
- `utility-slideshow-creator`
- `docx`, `pptx`, `pdf`, `xlsx`
- `document-quality`, `frontend-slides`

## Redundansfamilier der skal gennemgaas foer bulk-opdatering

1. `agent-*`: mange er specialiserede arkitekturvarianter. De boer samles under `workflow` med undersektioner i stedet for alle at blive top-level anbefalinger.
2. `dev-*`: meget bred familie. Skal deles mellem `app`, `tech-kode` og `design-ui`.
3. `data-*`: skal deles mellem analytics/metrics og app/data-engineering.
4. `writing-*`, `copy*`, `content*`, `communication-*`: overlapper mellem redaktion, GTM og praesentation.
5. `health-*`, `psy-*`, `legal-*`, `finance-*`, `travel-*`, `parenting-*`, `education-*`: passer ikke rent i de 9 eksisterende PM/platform bundles. Enten skal de blive out-of-scope, eller ogsaa skal der oprettes en ny "personlig/raadgivning" bundle senere.

## Anbefalet naeste skridt

1. Gennemgaa de resterende 247 udækkede `.agents/skills`.
2. Beslut om out-of-scope-domæner som `health-*`, `psy-*`, `legal-*`, `finance-*`, `travel-*`, `parenting-*` og `education-*` skal have egne bundle-samlinger eller forblive udenfor PM-platformens 9 bundles.
3. Gennemgaa de resterende `dev-*`, `security-*`, `testing-*`, `tool-*` og `utility-*` manuelt for dubletter og canonical/variant-status.
4. Opdater `skill-soeg` og `CLAUDE.md`, hvis bundle-beskrivelserne skal afspejle de udvidede specialist-sektioner mere eksplicit.
5. Kør en afsluttende duplicate/missing-reference scan efter næste batch.
