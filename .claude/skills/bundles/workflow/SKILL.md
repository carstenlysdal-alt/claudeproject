---
name: workflow
description: "Aktivér dette bundle ved sessionstyring, arbejdsflow, prompt-design, skill-søgning og token-effektivitet. Trigger: 'afslut session', 'lav en handoff', 'find den rigtige skill', 'lav en prompt', 'hvad mangler jeg af viden', 'eksekvér denne plan', 'komprimér', 'hvilke skills har jeg'."
metadata:
  version: 1.0.0
  type: bundle
---

# Workflow Bundle

Samler meta-skills der styrer hvordan du arbejder — ikke hvad du arbejder på.
Disse skills er domæne-agnostiske og relevante på tværs af alle projekter.

## Skills i dette bundle

### Sessionsstyring
| Skill | Aktivér når |
|---|---|
| `handoff` | Afslut en session med struktureret overdragelsesdokument — hvad blev lavet, hvad er åbent, hvad starter næste session med |
| `context-mode` | Gendan session-kontekst automatisk når Claude resetter midt i en lang workflow |
| `executing-plans` | Eksekvér en skriftlig plan trin for trin med checkpoints og verifikation |

### Prompt og skill-design
| Skill | Aktivér når |
|---|---|
| `prompt-creator` | Forvandl løse idéer til skarpe, velstrukturerede prompts til Claude, GPT, Gemini |
| `skill-creator` | Byg en komplet skill-mappe med SKILL.md, frontmatter og triggers via interaktivt Q&A |
| `write-a-skill` | Byg en ny SKILL.md fra bunden — hurtigere, mindre guidet end skill-creator |
| `skill-soeg` | Find det rigtige bundle eller skill til en given opgave |
| `find-skills` | Søg i installerede skills og beskriv hvad de gør |
| `triage` | Prioritér og sortér en liste af opgaver, issues eller idéer hurtigt |
| `teach` | Forklar et koncept, en beslutning eller et system til en specifik målgruppe |

### Vidensstyring
| Skill | Aktivér når |
|---|---|
| `research-brief` | Specificér præcist hvad der mangler af ekstern viden — med kilder, formål og hvilken beslutning der venter |

### Token-effektivitet
| Skill | Aktivér når |
|---|---|
| `caveman` | Korteste præcise svar — teknisk substans bevares, fyld fjernes |
| `caveman-compress` | Komprimér eksisterende output uden tab af indhold |
| `full-output-enforcement` | Tving komplet output — ingen `// resten her`-fragmenter |

### Agent-workflows og orkestrering
| Skill | Aktivér når |
|---|---|
| `agent-multi-agent-orchestrator` | Designe multi-agent workflows med supervisor, swarm eller hierarchy |
| `agent-supervisor-builder` | Bygge en supervisor-agent der styrer specialiserede underagenter |
| `agent-hierarchy-designer` | Designe agenthierarkier: orchestrator, managers og workers |
| `agent-subagent-delegator` | Delegere opgaver fra parent-agent til specialiserede subagents |
| `agent-task-decomposer` | Nedbryde komplekse opgaver til subagent-egnede delopgaver |
| `agent-pipeline-composer` | Kæde agents sammen i sekventielle pipelines |
| `agent-result-aggregator` | Samle og syntetisere resultater fra flere agents |
| `agent-conflict-resolver` | Håndtere modstridende agent-output og vælge beslutningsregel |
| `agent-consensus-builder` | Designe voting, debate eller consensus mellem agents |
| `agent-load-balancer` | Fordele opgaver mellem flere agents eller worker-pools |
| `agent-pool-manager` | Genbruge og styre pools af pre-warmed agents |
| `agent-retry-strategist` | Definere retries, fallback og recovery når agents fejler |
| `agent-state-synchronizer` | Synkronisere delt state mellem parallelle agents |
| `agent-handoff-designer` | Designe kontekstoverdragelse mellem agents |
| `agent-message-protocol` | Definere beskedformater og routing mellem agents |
| `agent-a2a-protocol-guide` | Bruge Agent-to-Agent-protokoller og interoperabilitet |

### Agent-building og platforme
| Skill | Aktivér når |
|---|---|
| `agent-coding-agent-builder` | Bygge en agent der læser, skriver og ændrer kode |
| `agent-browser-agent-builder` | Bygge en browser-agent til DOM-interaktion og webnavigation |
| `agent-web-scraper-subagent` | Bygge en specialiseret web-scraping subagent |
| `agent-api-caller-subagent` | Bygge en subagent til REST/GraphQL API-kald |
| `agent-database-query-subagent` | Bygge en subagent til SQL/databaseforespørgsler |
| `agent-file-processor-subagent` | Bygge en subagent til dokument- og filbehandling |
| `agent-data-analyst-agent` | Bygge en agent til dataanalyse og visualisering |
| `agent-research-agent-designer` | Designe en agent til research og informationsindsamling |
| `agent-customer-support-agent` | Bygge support- eller helpdesk-agent |
| `agent-sales-agent-builder` | Bygge salgsagent til prospektering og follow-up |
| `agent-email-agent-builder` | Bygge email-agent til triage, svar og klassifikation |
| `agent-voice-agent-builder` | Bygge voice-agent med STT/TTS og dialogstyring |
| `agent-workflow-automation-agent` | Bygge agent til proces- og workflow-automatisering |
| `agent-openai-assistants-builder` | Bygge OpenAI Assistants med threads, tools og file search |
| `agent-autogen-guide` | Bygge multi-agent flows med Microsoft AutoGen |
| `agent-crewai-expert` | Bygge crews og agent-teams med CrewAI |
| `agent-langgraph-designer` | Designe stateful agent-graphs med LangGraph |
| `agent-semantic-kernel-guide` | Bygge agents med Microsoft Semantic Kernel |

### Agent-drift, kvalitet og sikkerhed
| Skill | Aktivér når |
|---|---|
| `agent-agent-observability` | Observability for agent-systemer: traces, metrics og dashboards |
| `agent-monitoring-setup` | Monitoring, alerts og logs for agents i produktion |
| `agent-evaluation-framework` | Evaluere og benchmarke agents systematisk |
| `agent-testing-framework` | Teste agents med unit, integration og adversarial tests |
| `agent-cost-optimizer` | Reducere agent-omkostninger: tokens, calls, caching og modelvalg |
| `agent-memory-designer` | Designe short-term, long-term og vector memory til agents |
| `agent-context-manager` | Styre context windows, compression og RAG for agents |
| `agent-prompt-tuner` | Optimere prompts for agent-performance og reliability |
| `agent-security-hardener` | Sikre agents mod prompt injection, abuse og data leaks |
| `agent-deployment-guide` | Deploye agents robust i produktion |
| `agent-tool-calling-architect` | Designe tool/function calling til agents |
| `agent-mcp-server-builder` | Bygge MCP-servere til tools, resources og prompts |
| `agent-marketplace-creator` | Designe agent-registries eller marketplaces |
| `agent-claude-code-extension-builder` | Bygge Claude Code extensions, commands, hooks og skills |
| `agent-skill-creator` | Oprette nye Claude/Codex skills fra et behov |
| `agent-skill-router` | Route mellem skills og agent-specialister |

### Context-værktøjer
| Skill | Aktivér når |
|---|---|
| `context-mode-ops` | Vedligeholde eller fejlfinde context-mode workflows |
| `ctx-search` | Søge i gemt kontekst og tidligere beslutninger |
| `ctx-index` | Indeksere kontekstmateriale til senere genfinding |
| `ctx-insight` | Udlede mønstre og indsigter fra gemt kontekst |
| `ctx-stats` | Måle context-brug, tokenforbrug og dækningsgrad |
| `ctx-doctor` | Diagnosticere problemer i context-systemet |
| `ctx-upgrade` | Opgradere context-struktur eller metadata |
| `ctx-purge` | Rydde op i forældet eller støjende context |

### Skill- og PM-værktøjer
| Skill | Aktivér når |
|---|---|
| `utility-pm-skill-builder` | Bygge eller forbedre PM-skills |
| `utility-pm-skill-validate` | Validere skill-struktur, frontmatter og output-kontrakt |
| `utility-update-pm-skills` | Opdatere PM-skill-biblioteket systematisk |
| `utility-pm-workflow-builder` | Bygge nye PM-workflows |
| `utility-pm-workflow-orchestrator` | Orkestrere flere PM-skills i en samlet workflow |
| `utility-pm-release-conductor` | Koordinere release af skill- eller workflow-ændringer |
| `tool-design-sprint-readiness` | Vurdere readiness for design sprint |
| `tool-design-sprint-sketch` | Facilitere sketch-fasen i design sprint |
| `tool-design-sprint-test-and-score` | Teste og score sprint-løsninger |
| `tool-foundation-sprint-readiness` | Vurdere readiness for foundation sprint |
| `tool-foundation-sprint-founding-hypothesis` | Formulere founding hypothesis |
| `tool-foundation-sprint-differentiation` | Afklare differentiering |
| `tool-foundation-sprint-approach-options` | Sammenligne strategiske approach options |
| `template-skill` | Bruge en standard-skabelon til nye skills |

## Brugsanvisning

Disse skills aktiveres typisk ikke ved sessionsstart — de bruges som afslutning eller justering:

- Afslut altid lange arbejdssessioner med `handoff`
- Brug `research-brief` når du opdager et videngab midt i en opgave
- Brug `caveman` til teknisk dialog og iteration — skift tilbage til fuldt sprog ved leverancer
- Brug `prompt-creator` inden du sender en opgave videre til et andet AI-miljø
