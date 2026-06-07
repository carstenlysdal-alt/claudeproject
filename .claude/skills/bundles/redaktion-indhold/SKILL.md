---
name: redaktion-indhold
description: "Aktivér dette bundle ved redaktionelt arbejde, artikler, SoMe-opslag, e-mails, pitches, pressemeddelelser og content-produktion på dansk. Trigger: 'skriv en artikel', 'klumme', 'leder', 'SoMe-opslag', 'pressemeddelelse', 'nyhedsbrev', 'pitch', 'redaktionel tekst'."
metadata:
  version: 1.0.0
  type: bundle
---

# Redaktion & Indhold Bundle

Samler alle skills til professionel tekstproduktion og indholdsstrategi på dansk.

## Skills i dette bundle

### Redaktionel tekstproduktion
| Skill | Aktivér når |
|---|---|
| `redaktionel-tekst` | Artikler, klummer, ledere, pitches, pressemeddelelser på dansk |
| `copywriting` | Konverteringstekst: headlines, CTAs, landing pages (primært engelsk) |
| `copy-editing` | Korrektur og sprogrensning af eksisterende tekst |
| `doc-coauthoring` | Fælles redigering og iterativ dokumentudvikling |

### Distribution og strategi
| Skill | Aktivér når |
|---|---|
| `social` | SoMe-opslag til LinkedIn, Twitter/X, Instagram |
| `content-strategy` | Content pillars, topic clusters, redaktionel kalender |
| `emails` | Nyhedsbreve, drip-kampagner, redaktionelle e-mails |

### Prompts og AI-assisteret produktion
| Skill | Aktivér når |
|---|---|
| `prompt-creator` | Lav en skarp prompt til Claude, GPT eller Gemini |
| `design-prompt` | Designprompt til Gamma, Midjourney, Canva AI |

## Teksttyper og hvilken skill der bruges

| Teksttype | Primær skill | Supplement |
|---|---|---|
| Artikel / klumme / leder | `redaktionel-tekst` | `copy-editing` til revision |
| SoMe-opslag (LinkedIn, X) | `social` | `redaktionel-tekst` til langt format |
| Nyhedsbrev / e-mail | `emails` | `redaktionel-tekst` til editorial tone |
| Pressemeddelelse | `redaktionel-tekst` | `product-manager-skills:press-release` |
| Landing page copy | `copywriting` | `cro` til konverteringsoptimering |
| Pitch til CEO/investor | `sales-enablement` | `redaktionel-tekst` til narrativ |

## Brugsanvisning

1. Brug altid `redaktionel-tekst` til dansk redaktionelt indhold — ikke den generiske `copywriting`.
2. Kør `copy-editing` som afslutningstrin på vigtige dokumenter.
3. Kobl med `content-strategy` når enkeltteksten er del af en større plan.
