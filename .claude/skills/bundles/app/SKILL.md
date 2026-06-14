---
name: app
description: "Aktivér dette bundle ved app- og fullstack-udvikling: backend, databaser, mobil, DevOps, auth og app-UI. Trigger: 'byg en app', 'backend', 'API', 'database', 'React Native', 'Flutter', 'mobil', 'deploy', 'Docker', 'CI/CD', 'authentication', 'server'."
metadata:
  version: 1.0.0
  type: bundle
---

# App Bundle

Samler alle skills til fullstack app-udvikling — fra backend og database til mobil, DevOps og app-UI.
Komplementerer `bundle-kode` (web, tests, arkitektur) og `bundle-design` (visuel audit og polish).

## Skills i dette bundle

### Backend og API
| Skill | Aktivér når |
|---|---|
| `dev-rest-api-designer` | Designe REST API: endpoints, versioning, kontrakter |
| `dev-graphql-builder` | Bygge GraphQL API: schema, resolvers, subscriptions |
| `dev-express-guide` | Node.js/Express backend med TypeScript |
| `dev-nestjs-guide` | NestJS: modulær, enterprise-grade Node.js backend |
| `dev-fastapi-guide` | Python FastAPI: hurtig REST API med async support |
| `dev-django-guide` | Python Django: fullstack web framework |
| `dev-python-best-practices` | Python-kodekvalitet, struktur og patterns |
| `dev-microservices-designer` | Microservices-arkitektur: services, kommunikation, grænser |
| `dev-event-driven-architect` | Event-drevet arkitektur: queues, pub/sub, sagas |
| `dev-system-design-helper` | Systemdesign: skalerbarhed, CAP, load balancing |

### Database og datapersistens
| Skill | Aktivér når |
|---|---|
| `database-database-design-advisor` | Designe databaseskema: normalisering, relationer, indexes |
| `database-postgres-expert` | PostgreSQL: queries, indexes, performance, partitioning |
| `database-mongodb-guide` | MongoDB: dokumentmodel, aggregation, sharding |
| `database-redis-patterns` | Redis: caching, sessions, pub/sub, data structures |
| `dev-prisma-expert` | Prisma ORM: schema, migrations, queries i TypeScript |
| `dev-database-migration-helper` | Database-migrationer: strategi, rollback, zero-downtime |
| `dev-database-query-optimizer` | Query-optimering: EXPLAIN, indexes, N+1-problemer |

### Mobil
| Skill | Aktivér når |
|---|---|
| `dev-react-native-guide` | React Native: komponenter, navigation, native modules |
| `react-native-best-practices` | RN best practices: performance, arkitektur, animationer (Software Mansion) |
| `expo-horizon` | Expo: managed workflow, OTA updates, native APIs |
| `dev-flutter-helper` | Flutter: widgets, state management, platform channels |
| `dev-ios-swift-advisor` | iOS/SwiftUI: native iOS-udvikling |
| `dev-android-kotlin-advisor` | Android/Kotlin: Jetpack Compose, native Android |
| `dev-mobile-app-architect` | Mobil-arkitektur: navigation, state, offline, push |

### DevOps og deployment
| Skill | Aktivér når |
|---|---|
| `dev-docker-composer` | Docker Compose: multi-container setup, netværk, volumes |
| `devops-github-actions-expert` | GitHub Actions: CI/CD workflows, secrets, environments |
| `devops-gitlab-ci-guide` | GitLab CI/CD pipelines |
| `devops-terraform-guide` | Terraform: infrastructure as code |
| `devops-helm-chart-builder` | Helm charts til Kubernetes deployment |
| `dev-kubernetes-helper` | Kubernetes: pods, services, ingress, scaling |
| `cloud-aws-architect` | AWS: arkitektur, services, cost optimization |
| `cloud-serverless-designer` | Serverless: Lambda, Edge functions, Vercel Functions |
| `devops-prometheus-grafana-setup` | Monitoring og alerting med Prometheus og Grafana |

### Auth og sikkerhed
| Skill | Aktivér når |
|---|---|
| `dev-oauth2-oidc-advisor` | OAuth2/OIDC: flows, tokens, providers, implementering |
| `dev-owasp-checker` | OWASP Top 10: sikkerhedsaudit af applikation |
| `dev-security-auditor` | Fuld sikkerhedsgennemgang af kodebase |
| `dev-secrets-scanner` | Find og fjern secrets i kode og git-historik |

### App-UI og interaktion
| Skill | Aktivér når |
|---|---|
| `dev-ui-design-system-builder` | Byg designsystem i kode: tokens, komponenter, dokumentation |
| `dev-react-component-builder` | React-komponenter: struktur, props, tilgængelighed |
| `dev-responsive-design-helper` | Responsivt design på tværs af skærmstørrelser |
| `dev-user-flow-designer` | Brugerflows og navigation i appen |
| `dev-wireframe-advisor` | Wireframes til app-flows inden implementering |
| `make-interfaces-feel-better` | Mikro-interaktioner, animation og UX-forbedringer |
| `data-visualization` | Visualisering: chart-valg, D3/Recharts, dashboard-layout |

## Arbejdsflow

```
System design (dev-system-design-helper)
  ↓
API-kontrakt (dev-rest-api-designer / dev-openapi-contract-first)
  ↓
Database-design (database-database-design-advisor + dev-prisma-expert)
  ↓
Backend (dev-express-guide / dev-nestjs-guide / dev-fastapi-guide)
  ↓
Mobil/Frontend (dev-react-native-guide / react-native-best-practices)
  ↓
Auth (dev-oauth2-oidc-advisor)
  ↓
Deploy (dev-docker-composer + devops-github-actions-expert)
  ↓
Monitor (devops-prometheus-grafana-setup)
```

## Brugsanvisning

1. Start med `dev-system-design-helper` ved nye apps — definer arkitektur inden kode skrives.
2. Brug `database-database-design-advisor` tidligt — databaseskemaet er svært at ændre senere.
3. Kombiner `dev-react-native-guide` + `react-native-best-practices` til React Native-projekter.
4. Kør `dev-owasp-checker` inden release — ikke som eftertanke.
5. Se `bundle-kode` for tests, code review og web-specifikke skills.
