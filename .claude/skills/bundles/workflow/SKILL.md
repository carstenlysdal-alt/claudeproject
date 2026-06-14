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

## Brugsanvisning

Disse skills aktiveres typisk ikke ved sessionsstart — de bruges som afslutning eller justering:

- Afslut altid lange arbejdssessioner med `handoff`
- Brug `research-brief` når du opdager et videngab midt i en opgave
- Brug `caveman` til teknisk dialog og iteration — skift tilbage til fuldt sprog ved leverancer
- Brug `prompt-creator` inden du sender en opgave videre til et andet AI-miljø
